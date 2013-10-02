define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');

    var viewOptions = ['el', 'id', 'attributes', 'className', 'tagName'];

    /**
     * Get view class
     *
     * @param {string} subPage
     * @param {object} views
     * @returns {null|BaseView}
     * @private
     */
    var _getView = function(subPage, views) {
        var viewClass = views.default;

        var key;

        for (key in views) {
            if (!views.hasOwnProperty(key) || key === 'default') {
                continue;
            }

            if (subPage === key) {
                viewClass = views[key];
                break;
            }
        }

        return viewClass;
    };

    /**
     * @class ViewController
     */
    var ViewController = function(options) {
        _.extend(this, _.pick(options, viewOptions));
        this._ensureElement();
        return this.initialize(options);
    };

    _.extend(ViewController.prototype, Backbone.Events, {

        views: {},

        /**
         * @defulat div
         * @type {string}
         */
        tagName: 'div',

        /**
         * @default false
         * @type {boolean}
         */
        isEnabled: false,

        /**
         * Call update with options
         *
         * @param {object} options
         * @param {string} options.tagName
         * @returns {ViewController}
         */
        initialize: function(options) {
            return this
                .setupHandlers()
                .createChildren()
                .update(options);
        },

        /**
         * Create event handlers
         *
         * @returns {ViewController}
         */
        setupHandlers: function() {
            return this;
        },

        /**
         * Create children items
         *
         * @returns {ViewController}
         */
        createChildren: function() {
            return this;
        },

        /**
         * Get element
         *
         * @returns {jQuery}
         */
        getElement: function() {
            return this.$el;
        },

        /**
         * Get current subView class.
         * If a class currently exists, it will be removed from the view
         *
         * @param {BaseView} viewClass
         * @returns {ViewController}
         * @private
         */
        setView: function(viewClass) {
            var currentView = this.getCurrentView();

            if (currentView instanceof viewClass) {
                currentView.update(this.options);
            } else {
                var view = new viewClass(this.options);
                this.setCurrentView(view);
            }

            return this;
        },

        /**
         * Remove current view
         *
         * @returns {ViewController}
         */
        removeCurrentView: function() {
            var currentView = this.getCurrentView();
            if (currentView) {
                currentView.remove();
                if (currentView.destroy) {
                    currentView.destroy();
                }
            }

            return this;
        },

        /**
         * Set current view class
         *
         * @param {BaseView} view
         * @returns {ViewController}
         */
        setCurrentView: function(view) {
            this.removeCurrentView();

            /**
             * Current child view class
             *
             * @name ViewController#currentView
             * @type {BaseView}
             */
            this.currentView = view;

            this.$el.append(view.getElement());

            view.enabled(true);

            return this;
        },

        /**
         * Get current sub view class
         *
         * @returns {BaseView}
         */
        getCurrentView: function() {
            return this.currentView;
        },

        /**
         * Update current sub view with options
         *
         * @param {object} options
         * @return {ViewController}
         */
        update: function(options) {

            /**
             * @type {Object}
             */
            this.options = this.parseOptions(options);

            var viewClass = _getView(options.subPage, this.views || {});

            if (viewClass) {
                this.setView(viewClass);
            }

            return this;
        },

        /**
         * Filter/adjust options if needed before setting them
         *
         * @param {object} options
         * @returns {object}
         */
        parseOptions: function(options) {
            return options;
        },

        /**
         * Pass enabled state to current subView
         *
         * @param {boolean} [state=true]
         * @returns {ViewController}
         */
        enabled: function(state) {
            state = state !== false;

            if (state === this.isEnabled) {
                return this;
            }

            this.isEnabled = state;

            this.getCurrentView().enabled(state);

            return this;
        },

        /**
         * Remove view controller from DOM
         *
         * @returns {ViewController}
         */
        remove: function() {
            this
                .enabled(false)
                .removeCurrentView();

            this.$el.remove();

            return this;
        },

        /**
         * Destroy view controller
         *
         * @returns {ViewController}
         */
        destroy: function() {
            return this
                .remove()
                .off()
                .stopListening();
        },

        setElement: Backbone.View.prototype.setElement,

        _ensureElement: Backbone.View.prototype._ensureElement

    });

    ViewController.extend = Backbone.extend;

    return ViewController;

});
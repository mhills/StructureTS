define(function(require) {
    'use strict';

    var _ = require('underscore');
    require('libs/jquery.touch');
    var Backbone = require('backbone');

    /**
     * BaseView is meant to be extended by all application views.
     * BaseView should not contain applications specific properties, methods or logic.
     * BaseView extends Backbone View to add more functionality and structure.
     *
     * @class BaseView
     * @extends Backbone.View
     */
    var BaseView = Backbone.View.extend({

        /**
         * Keep track if view is enabled or disabled. See the enabled method.
         * @default false
         * @type {boolean}
         */
        isEnabled: false,

        /**
         * Override parent to prevent delegateEvents from being called outside of `enabled()`
         *
         * @param {object} [options]
         * @returns {BaseView}
         */
        constructor: function(options) {
            this.cid = _.uniqueId('view');
            this._configure(options || {});
            this._ensureElement();
            this.initialize.apply(this, arguments);
            return this;
        },

        /**
         * The constructor is meant to setup the main properties for the view from arguments being passed in.
         * The base view template will be in the constructor with setElement.
         * The constructor will also call the createChildren and render upon instantiation.
         * @constructor
         *
         * @returns {BaseView}
         */
        initialize: function(options) {
            options || (options = {});

            this
                .setupHandlers()
                .createChildren();

            if (options.render !== false) {
                this.render();
            }

            return this;
        },

        /**
         * Create and add children to the view.
         * @returns {BaseView}
         */
        createChildren: function() {
            return this;
        },

        /**
         * Create event handlers
         * @returns {BaseView}
         */
        setupHandlers: function() {
            return this;
        },

        /**
         * Public method for accessing a view's jQuery element
         * @returns {jQuery}
         */
        getElement: function() {
            return this.$el;
        },

        /**
         * Update the view and children views.
         * @returns {BaseView}
         */
        render: function() {
            return this;
        },

        /**
         * Allows an easy way to append one Backbone.View to another.
         * @param {BaseView} baseView
         * @returns {BaseView}
         */
        addChild: function(baseView) {
            this.$el.append(baseView.getElement());
            return this;
        },

        /**
         * Allows an easy way to add/move a BaseView to a certain index with in the DOM.
         * @param {BaseView} baseView
         * @param {number} index
         * @returns {BaseView}
         */
        addChildAt: function (baseView, index) {
            var children = this.$el.children();
            var length = this.getChildLength();

            if (index < 0 || index > length) {
                throw new Error("[BaseView] The addChildAt method needs an index.");
            }

            if (!length || length === index) {
                this.addChild(baseView);
            } else {
                children.eq(index).before(baseView.getElement());
            }

            return this;
        },

        /**
         * Allows an easy way to remove one Backbone.View from another.
         * Remove listeners of the view removed by calling the enabled method.
         * @param baseView
         * @returns {BaseView}
         */
        removeChild: function(baseView) {
            baseView.remove();
            return this;
        },

        /**
         * Allows an easy way to remove all children of the view.
         * @returns {BaseView}
         */
        removeChildren: function() {
            //TODO: May need to disable BaseView's before calling jQuery empty method if there is issues.
            this.$el.empty();
            return this;
        },

        /**
         * Allows an easy way to retrieve a single element and return it as a BaseView.
         * @param {string} selector
         * @returns {BaseView}
         */
        getChild: function(selector) {
            return new BaseView({ el: this.$(selector + ':first') });
        },

        /**
         * Get length of children
         * @returns {number}
         */
        getChildLength: function() {
            return this.$el.children().length;
        },

        /**
         * Allows an easy way to add and remove listeners in one method for the view.
         * Users can enable or disable sub(s) views with in the view.
         * Disable/Enabling a view can trickle down to all sub views.
         * Prevents event listeners getting added multiple times.
         *
         * @example
         *  Example for views that extend (BaseView):
         *
         *      enabled: function(state) {
         *              if (state === this.isEnabled) return this;
         *
         *              if (state) {
         *                  this.delegateEvents();//Backbone method
         *                  this.$on('click', this.showModalHandler.bind(this));
         *                  this.aSubView.on('customevent', this.onCompleteHandler.bind(this));
         *              } else {
         *                  this.undelegateEvents();//Backbone method
         *                  this.$off('click');
         *                  this.aSubView.off('customevent');
         *              }
         *
         *              this.aSubView.enabled(state);//Allows us to disable all children in the view but also will disable sub(s) views.
         *
         *              BaseView.prototype.enabled.call(this, state);
         *      }
         *
         * @param {Boolean} [state=true]
         * @returns {BaseView}
         */
        enabled: function(state) {
            state = state !== false;

            if (state === this.isEnabled) {
                return this;
            }

            this.isEnabled = state;

            if (state) {
                this.delegateEvents();
            } else {
                this.undelegateEvents();
            }

            return this;
        },

        /**
         * Only delegate events if view is enabled
         *
         * @returns {BaseView}
         */
        delegateEvents: function() {
            if (this.isEnabled) {
                Backbone.View.prototype.delegateEvents.call(this);
            }

            return this;
        },

        /**
         * Only undelegate events if view is enabled
         *
         * @returns {BaseView}
         */
        undelegateEvents: function() {
            if (!this.isEnabled) {
                Backbone.View.prototype.undelegateEvents.call(this);
            }

            return this;
        },

        /**
         * Attach event listener to view
         *
         * @param {string} event
         * @param {string|function} selector
         * @param {function} [callback]
         * @returns {BaseView}
         */
        $on: function(event, selector, callback) {
            this.$el.on(event, selector, callback);
            return this;
        },

        /**
         * Remove event listener from view
         *
         * @param {string} event
         * @param {string|function} selector
         * @param {function} [callback]
         * @returns {BaseView}
         */
        $off: function(event, selector, callback) {
            this.$el.off(event, selector, callback);
            return this;
        },

        /**
         * Helper method to clear the references to other objects,
         * remove event listeners and help prevent memory leaks.
         */
        destroy: function() {
            this.remove();
            this.options = null;

            return this
                .off()
                .stopListening();
        },

        /**
         * Disable view before removing
         * @returns {BaseView}
         */
        remove: function() {
            this.enabled(false);

            return Backbone.View.prototype.remove.call(this);
        }

    });

    return BaseView;

});
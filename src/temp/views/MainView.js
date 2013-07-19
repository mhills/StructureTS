define(function(require) {
    'use strict';

    var _ = require('underscore');
    var AppView = require('views/AppView');

    /**
     * @class MainView
     * @extends AppView
     */
    var MainView = AppView.extend({

        /**
         * @type {BaseView}
         */
        currentSubView: null,

        /**
         * Call update with options
         *
         * @param {object} [options]
         * @returns {MainView}
         */
        initialize: function(options) {
            AppView.prototype.initialize.call(this, options);

            return this.update(options);
        },

        /**
         * Create subView from current options
         *
         * @returns {MainView}
         */
        createSubView: function() {
            var views = this.views || {};
            var viewClass = views.default;
            var subPage = this.options.subPage;
            var currentView = this.getCurrentView();

            _.forOwn(views, function(view, key) {
                if (key === 'default') {
                    return;
                }
                if (subPage === key) {
                    viewClass = view;
                    return false;
                }
            });

            if (!currentView || (viewClass && !(currentView instanceof viewClass))) {
                this.setCurrentView(new viewClass(this.options));
            } else if (currentView && currentView instanceof viewClass) {
                currentView.update(this.options);
            } else {
                throw new Error('[MainView]: No SubView');
            }

            return this;
        },

        /**
         * Get current subView class.
         * If a class currently exists, it will be removed from the view
         *
         * @param {BaseView} view
         * @returns {MainView}
         */
        setCurrentView: function(view) {
            var currentView = this.getCurrentView();
            if (currentView) {
                this.removeChild(currentView);
            }

            this.currentSubView = view;
            return this.addChild(view);
        },

        /**
         * Get current sub view class
         *
         * @returns {BaseView}
         */
        getCurrentView: function() {
            return this.currentSubView;
        },

        /**
         * Update current sub view with options
         *
         * @param {object} options
         * @return {MainView}
         */
        update: function(options) {
            this.options = options;

            return this.createSubView();
        },

        /**
         * Pass enabled state to current subView
         *
         * @param {boolean} state
         * @returns {ProjectView}
         */
        enabled: function(state) {
            state  = state !== false;

            if (state === this.isEnabled) {
                return this;
            }

            this.getCurrentView().enabled(state);

            return AppView.prototype.enabled.call(this, state);
        }

    });

    return MainView;

});
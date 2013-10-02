define(function(require) {
        'use strict';

        var Backbone = require('backbone');
        var BaseView = require('components/views/BaseView');
        var PageEvent = require('events/PageEvent');

        var _titlePrefix = 'Window : ';

        /**
         * @class AppView
         */
        var AppView = BaseView.extend({

            /**
             * Set page title if it exists
             *
             * @returns {AppView}
             */
            initialize: function() {
                BaseView.prototype.initialize.apply(this, arguments);

                if (this.PAGE_TITLE) {
                    this.setPageTitle(this.PAGE_TITLE);
                }

                return this;
            },

            /**
             * Set page title
             *
             * @param {string} title
             * @returns AppView
             */
            setPageTitle: function(title) {
                document.title = _titlePrefix + title;
                Backbone.trigger(PageEvent.CHANGE, new PageEvent(PageEvent.CHANGE, this, title));

                return this;
            }

        });

        return AppView;
    }
);
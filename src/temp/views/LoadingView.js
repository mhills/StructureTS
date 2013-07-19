define(function(require) {
    'use strict';

    var BaseView = require('components/views/BaseView');
    var LoadingTemplate = require('tpl!templates/LoadingTemplate.tpl');

    var LoadingView = BaseView.extend({

        /**
         * Render loading template
         *
         * @returns {LoadingView}
         */
        render: function() {
            this.$el.html(LoadingTemplate());

            return this;
        }

    }, {

        /**
         * Get cached instance of loading view
         * @returns {LoadingView}
         */
        getInstance: function() {
            if (!this._instance) {
                this._instance = new this();
            }

            return this._instance;
        }

    });

    return LoadingView;

});
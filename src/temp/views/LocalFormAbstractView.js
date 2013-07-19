define(function(require) {
    'use strict';

    var FormAbstractView = require('views/FormAbstractView');
    var $ = require('jquery');

    var Global = require('constants/Global');

    /**
     * @class
     * @name LocalFormAbstractView
     * @extends AppView
     */
    var LocalFormAbstractView = FormAbstractView.extend({

        /**
         * View events on callback method names
         *
         * @type {object}
         */
        events: {
            'change input, textarea, select': 'onChange'
        },

        /**
         * View template
         *
         * @type {function}
         */
        template: function() {},

        /**
         * Get data object to be user when rendering the view template
         *
         * @returns {object}
         */
        getTemplateData: function(options) {
            return {};
        },

        /**
         * Render view with data from request.
         * Return early if no data from request is found.
         *
         * @returns {LocalFormAbstractView}
         */
        render: function(options) {
            this.$el.html(this.template(this.getTemplateData(options)));

            return this;
        },

        /**
         * Save user VO to backend
         *
         * @param {object} data
         * @returns {LocalFormAbstractView}
         */
        save: function(data) {
            return this;
        }

    });

    return LocalFormAbstractView;
});
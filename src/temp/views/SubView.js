define(function(require) {
    'use strict';

    var AppView = require('views/AppView');

    /**
     * @class SubView
     * @extends AppView
     */
    var SubView = AppView.extend({

        /**
         * Call update wih options
         *
         * @param {object} [options]
         * @returns {SubView}
         */
        initialize: function(options) {
            AppView.prototype.initialize.call(this, options);

            return this.update(options);
        },

        /**
         * Update current sub view with options
         *
         * @param {object} [options]
         * @return {SubView}
         */
        update: function(options) {
            this.options = options;

            return this;
        }

    });

    return SubView;

});
define(function(require) {
    'use strict';

    var RouterController = require('controllers/RouterController');
    var BaseVO = require('components/models/BaseVO');

    /**
     * @class RouteVO
     * @extends BaseVO
     */
    var RouteVO = BaseVO.extend({

        voType: 'RouteVO',

        /**
         * Generate url
         *
         * @param {string} type
         * @param {boolean} [includeHash=true]
         * @returns {string}
         */
        url: function(type, includeHash) {
            throw new Error('Abstract Error: url method must be overridden.');
        },

        /**
         *
         * @param {string} type
         * @param {object} [options]
         * @returns {RouteVO}
         */
        navigate: function(type, options) {
            var route = this.url(type, false);

            if (route) {
                RouterController.navigate(route, options);
            }

            return this;
        }

    });

    return RouteVO;

});
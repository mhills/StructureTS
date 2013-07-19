define(function(require) {
    'use strict';

    var BaseVO = require('components/models/BaseVO');
    var UserModel = require('models/UserModel');

    /**
     * @class SendVO
     * @extends BaseVO
     */
    var SendVO = BaseVO.extend({

        voType: 'SendVO',

        defaults: {

            /**
             * @type {string}
             */
            token: null

        },

        /**
         * Set user token
         *
         * @returns {SendVO}
         */
        initialize: function() {
            return this.set('token', UserModel.token);
        }

    });

    return SendVO;

});
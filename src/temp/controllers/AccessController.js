define(function(require) {
        "use strict"
        var $ = require('jquery');
        var _ = require('underscore');
        var Backbone = require('backbone');
        var BaseController = require('components/controllers/BaseController');

        /**
         * @class AccessController
         */
        var AccessController = BaseController.extend({

            grantDictionary: [],

            initialize: function() {
            },

            /**
             * Creates a list of acceptable items for the value key.
             * @param {String} value  Key to setup a Dictionary.
             * @param {Array} accessList  List of items to be stored in the Dictionary.
             */
            grant: function(value, accessList) {
                var list = this.grantDictionary[value];
                if (!list) {
                    this.grantDictionary[value] = accessList;
                } else {
                    this.grantDictionary[value] = list.concat(accessList);
                }
            },

            /**
             * Check if the accessItem is located in the value's Dictionary.
             * @param {String} value  Key to retrieve the Dictionary.
             * @param {String} accessItem
             * @returns {boolean} Returns true if the access item match something in the list array.
             */
            allow: function(value, accessItem) {
                var list = this.grantDictionary[value];

                if (!list) {
                    return true;
                }

                var len = list.length;
                for (var i = 0; i < len; i++) {
                    if (accessItem == list[i]) {
                        return true;
                    }
                }

                return false;
            }

        });

        return new AccessController;
    }
);

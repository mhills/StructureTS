define(function(require) {
        "use strict"
        var $ = require('jquery');
        var _ = require('underscore');
        var Backbone = require('backbone');
        var Loader = require('components/net/Loader');
        var Global = require('constants/Global');
        var RequestMethodType = require('components/requests/RequestMethodType');
        var RequestDataType = require('components/requests/RequestDataType');
        var RequestStatusType = require('components/requests/RequestStatusType');

        /**
         * @class JsonLoader
         */
        var JsonLoader = Loader.extend({

            requestType: RequestMethodType.GET,
            dataType: RequestDataType.JSON,

            initialize: function(jsonPath) {
                Loader.prototype.initialize.call(this, jsonPath);
            },

            /**
             * Triggers the load request to load the json file.
             */
            load: function() {
                Loader.prototype.load.call(this);
            },

            /**
             * Converts json string data into an Object.
             * @returns {object}
             */
            parseJSON: function() {
                return JSON.parse(this.data);
            }

        });

        return JsonLoader;
    }
);
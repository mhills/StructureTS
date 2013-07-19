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
        var XML = require('components/utils/XML');

        /**
         * @class XmlLoader
         */
        var XmlLoader = Loader.extend({

            requestType: RequestMethodType.GET,
            dataType: RequestDataType.XML,

            initialize: function(xmlPath) {
                Loader.prototype.initialize.call(this, xmlPath);
            },

            /**
             * Triggers the load request to load the xml file.
             */
            load: function() {
                Loader.prototype.load.call(this);
            },

            /**
             * Converts xml data to a Object.
             * @returns {object}
             */
            parseXML: function() {
                return XML.parse(this.data);
            },

            /**
             * Converts xml data into a JSON string.
             * @returns {string}
             */
            xml2JsonString: function() {
                return XML.toJSON( this.parseXML() );
            },

            /**
             * Converts xml data into aN Object.
             * @returns {object}
             */
            xml2Object: function() {
                return JSON.parse( this.xml2JsonString() );
            }

        });

        return XmlLoader;
    }
);
define(function(require) {
    'use strict';

    var Global = require('constants/Global');
    require('libs/Date');

    /**
     * @namespace StringUtil
     */
    var StringUtil = {};

    /**
     * Converts a query string into a object.
     * @param queryString
     * @returns {Object}
     */
    StringUtil.queryStringToObject = function(queryString) {
        var params = {};
        var temp = null;

        // Split into key/value pairs
        var queries = queryString.substring(1).split("&");

        // Convert the array of strings into an object
        var len = queries.length;
        for (var i = 0; i < len; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    };

    /**
     * Creates a universally unique identifier.
     * @returns {string}
     */
    StringUtil.createUUID = function() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

        return uuid;
    };

    /**
     * Capitalizes the first letter of all words in a string.
     * @param {string} str
     * @returns {string}
     */
    StringUtil.toTitleCase = function(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    /**
     * Capitalizes the first letter of the string being passed in.
     * @param {string} str
     * @returns {string}
     */
    StringUtil.capitalizeFirstWord = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    /**
     * Format date
     *
     * @param {string|Date} date
     * @param {string} format
     * @returns {string}
     */
    StringUtil.formatDate = function(date, format) {
        if (date == null) {
            return '';
        }
        return (new Date(date)).format(format || Global.DEFAULT_DATE_FORMAT);
    };

    return StringUtil;

});
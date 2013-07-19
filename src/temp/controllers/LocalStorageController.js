define(function(require) {
    'use strict';

    var BaseController = require('components/controllers/BaseController');
    var ValueObjectType = require('constants/ValueObjectType');

    /**
     * @class LocalStorageController
     * @extends BaseController
     */
    var LocalStorageController = BaseController.extend({

        /**
         * Current user namespace
         *
         * @type {string}
         */
        namespace: '',

        /**
         * Adds an event listener to the window and calls the onLocalStorageEvent method
         * when a 'storage' event is dispatch.
         * @constructor
         */
        initialize: function() {
            window.addEventListener('storage', this.onLocalStorageEvent.bind(this));

            return this;
        },

        /**
         * Set storage namespace
         *
         * @param namespace
         * @returns {string}
         */
        setNamespace: function(namespace) {
            this.namespace = namespace;

            return this;
        },

        /**
         * Get storage namespace
         *
         * @returns {string}
         */
        getNamespace: function() {
            return this.namespace;
        },

        /**
         * Saves an item to Local Storage by a key value.
         * The data passed in will be converted into and saved as a JSON string.
         * @param {string} key
         * @param {Object} data
         * @param {boolean} [useNamespace=false]
         */
        setItem: function(key, data, useNamespace) {
            if (useNamespace) {
                key += this.getNamespace();
            }

            localStorage.setItem(key, data.toJSONString());

            return this;
        },

        /**
         * Returns an item from Local Storage as a JSON/JavaScript object.
         * @param {string} key
         * @param {boolean} [useNamespace=false]
         * @returns {*}
         */
        getItem: function(key, useNamespace) {
            if (useNamespace) {
                key += this.getNamespace();
            }

            var value = localStorage.getItem(key);

            if (value) {
                value = JSON.parse(value);
            }

            return value;
        },

        /**
         * Removes an item from Local Storage by the key.
         * @param {string} key
         * @param {boolean} [useNamespace=false]
         */
        removeItem: function(key, useNamespace) {
            if (useNamespace) {
                key += this.getNamespace();
            }

            localStorage.removeItem(key);

            return this;
        },

        /**
         * Deletes all data from Local Storage.
         */
        clear: function() {
            return this
                .removeItem(ValueObjectType.USER_SESSION)
                .removeItem(ValueObjectType.USER);
        },

        /**
         * Returns the size of the Local Storage.
         * @returns {number}
         */
        getSize: function() {
            return encodeURIComponent(JSON.stringify(localStorage)).length;
        },

        /**
         * Re-Dispatches the StorageEvent.
         * @param {StorageEvent} event
         */
        onLocalStorageEvent: function(event) {
            this.trigger('change', event);

            return this;
        }

    });

    return new LocalStorageController;

});
define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');

    var XML = require('components/utils/XML');

    var _undefined = void 0;

    /**
     *
     * @class BaseVO
     * @extends Backbone.Model
     */
    var BaseVO = Backbone.Model.extend({

        voType: 'BaseVO',

        /**
         * Only allow setting values that are defined in the defaults object
         *
         * @param {string|object} key
         * @param {*} [value]
         * @param {object} [options]
         * @returns {BaseVO}
         */
        set: function(key, value, options) {
            var attrs;

            // Normalize the key-value into an object
            if (_.isObject(key) || key == null) {
                attrs = _.clone(key);
                options = value;
            } else {
                attrs = {};
                attrs[key] = value;
            }

            _.forOwn(
                attrs,
                function(value, key) {
                    if (!this.isset(key)) {
                        delete attrs[key];
                    }
                },
                this
            );

            return Backbone.Model.prototype.set.call(this, attrs, options);
        },

        /**
         * Determine if key is been set and is not null
         *
         * @param {string} key
         * @returns {boolean}
         */
        has: function(key) {
            var value = this.attributes[key];

            return (value && value !== null && value !== _undefined);
        },

        /**
         * Check if key exists in the defaults object
         *
         * @param {string} key
         * @returns {boolean}
         */
        isset: function(key) {
            return this.defaults.hasOwnProperty(key);
        },

        /**
         * Get emun values setup in defaultValues property
         *
         * @reutrns {null|object}
         */
        enum: function(key) {
            var value = null;

            if (this.defaultValues.hasOwnProperty(key)) {
                value = this.defaultValues[key];
            }

            return value;
        },

        /**
         * Convert VO to a JSON string
         *
         * @returns {string}
         */
        toJSONString: function() {
            return JSON.stringify(this.toJSON());
        },

        /**
         * Convert VO to plain object
         *
         * @param {object} [options]
         * @returns {object}
         */
        toJSON: function(options) {
            var json = Backbone.Model.prototype.toJSON.call(this, options);
            json.voType = this.voType;
            return _.forOwn(json, function(value, key, object) {
                if (value && _.isFunction(value.toJSON)) {
                    object[key] = value.toJSON();
                }
            });
        },

//        /**
//         * Convert VO to an XML doc
//         *
//         * @returns {string}
//         */
//        toXML: function() {
//            return XML.fromJSON(this.toJSON());
//        },

        /**
         * Reset changed state
         *
         * @returns {BaseVO}
         */
        resetChangedState: function() {
            this.changed = {};
            this._previousAttributes = _.clone(this.attributes);

            return this;
        },

        /**
         * Trigger destroy
         *
         * @param {object} [options]
         * @returns {BaseVO}
         */
        destroy: function(options) {
            this.trigger('destroy', this, null, options);
            this.off().stopListening();

            return this;
        }

    });

    return BaseVO;

});
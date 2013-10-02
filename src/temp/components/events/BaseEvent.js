define(function(require) {
    'use strict';

    var BaseController = require('components/controllers/BaseController');

    /**
     * @class BaseEvent
     * @extends BaseController
     */
    var BaseEvent = BaseController.extend({

        /**
         * Event string name usually a constant below the event class
         *
         * @type {string}
         */
        type: null,

        /**
         * Usually a reference to the object that dispatched the event.
         * Basically the property 'this' would be passed in.
         *
         * @type {object}
         */
        target: null,

        /**
         * Can be anything you need to send with the event
         *
         * @type {*}
         */
        data: null,

        /**
         * Set error parameters
         *
         * @param {string} type
         * @param {object} target
         * @param {*} data
         * @returns {BaseEvent}
         */
        initialize: function(type, target, data) {
            this.type = type;
            this.target = target;
            this.data = data;

            return this;
        }

    });

    return BaseEvent;
});

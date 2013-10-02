define(function(require) {
    'use strict';
    
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var BaseController = require('components/controllers/BaseController');
    var RequestMethodType = require('components/requests/RequestMethodType');
    var RequestStatusType = require('components/requests/RequestStatusType');
    var RequestDataType = require('components/requests/RequestDataType');
    
    var Event = require('components/events/Event');
    var State = require('constants/State');

    var NetworkMonitorEvent = require('components/events/NetworkMonitorEvent');

    /**
     * Remove network status listener
     *
     * @param {object} data
     * @private
     */
    var _onRequestComplete = function(data) {
        this.ready = true;
        Backbone.off(NetworkMonitorEvent.STATUS, this.onConnectionError, this);
        this.onCompleteHandler(data);
    };

    /**
     * @class Loader
     * @extends BaseController
     */
    var Loader = BaseController.extend({

        /**
         * Flag to determine if the request is complete
         *
         * @default true
         * @type {boolean}
         */
        ready: true,

        /**
         * Parsed data from request (success or fail)
         *
         * @type {*}
         */
        data: null,

        /**
         * URL to submit request to
         *
         * @type {string}
         */
        loaderUrl: null,

        /**
         * Defer object of current request
         *
         * @type {jQuery.Deferred}
         */
        defer: null,

        /**
         * Request type (POST or GET)
         *
         * @default GET
         * @type {string}
         */
        requestType: RequestMethodType.GET,

        /**
         * Request response type
         *
         * @default JSON
         * @type {string}
         */
        dataType: RequestDataType.JSON,

        /**
         * Current state of request
         *
         * @default -1
         * @type {number}
         * @private
         */
        _state: State.WAITING,

        /**
         * Set loader url and call setupHandlers
         *
         * @param {string} url
         * @returns {Loader}
         */
        initialize: function(url) {
            this.loaderUrl = url;
            
            return this.setupHandlers();
        },

        /**
         * Create callback handlers
         *
         * @returns {Loader}
         */
        setupHandlers: function() {

            /**
             * @name Loader#onBeforeSendHandler
             * @type {function}
             */
            this.onBeforeSendHandler = this.onBeforeSend.bind(this);
            
            /**
             * @name Loader#onCompleteHandler
             * @type {function}
             */
            this.onCompleteHandler = this.onComplete.bind(this);

            /**
             * @name Loader#onRequestCompleteHandler
             * @type {function}
             */
            this.onRequestCompleteHandler = _onRequestComplete.bind(this);
            
            return this;
        },

        /**
         * Load request with requestData
         *
         * @param {object} requestData
         * @returns {Loader}
         */
        load: function(requestData) {
            if (!this.ready) {
                return this;
            }

            this.reset();

            Backbone.on(NetworkMonitorEvent.STATUS, this.onConnectionError, this);

            this.ready = false;
            this.defer = this._createRequest(requestData);

            return this;
        },

        /**
         * Return deferred object
         *
         * @returns {jQuery.Deferred}
         */
        getDeferred: function() {
            return this.defer;
        },

        /**
         * Add a piped callback to the deferred object
         *
         * @param {function} callback
         * @returns {Loader}
         */
        pipe: function(callback) {
            if (this.defer && _.isFunction(callback)) {
                this.defer = this.defer.then(callback);
            }

            return this;
        },

        /**
         * Abort request
         *
         * @param {string} [stateText]
         * @returns {Loader}
         */
        abort: function(stateText) {
            if (this.getState() === State.PENDING && this.defer && _.isFunction(this.defer.abort)) {
                this.defer.abort(stateText);
            }

            this.ready = true;

            return this;
        },

        /**
         * Reset request
         *
         * @returns {Loader}
         */
        reset: function() {
            this.abort();

            this.defer = null;
            this.data = null;

            this._setState(State.WAITING);

            return this;
        },

        /**
         * Get the current state of the request.
         * Returns enum value
         *
         * @returns {number}
         */
        getState: function() {
            return this._state;
        },

        /**
         * Destroy loader and abort request
         *
         * @returns {Loader}
         */
        destroy: function() {
            return this
                .reset()
                .off()
                .stopListening();
        },

        /**
         * Before request callback
         *
         * @returns {Loader}
         */
        onBeforeSend: function() {
            return this;
        },

        /**
         * Request complete callback
         *
         * @param {object} data
         * @returns {Loader}
         */
        onComplete: function(data) {
            this._setState(State.SUCCESS);

            this.data = data.responseText;

            return this.trigger(Event.REQUEST_COMPLETE, this.data, this);
        },

        /**
         * Abort request if online connection is lost
         *
         * @param {NetworkMonitorEvent} event
         * @returns {Loader}
         */
        onConnectionError: function(event) {
            if (this.getState() === State.PENDING && event.status === NetworkMonitorEvent.OFFLINE) {
                this.abort('Connection Lost');
            }

            return this;
        },

        /**
         * Create AJAX request and return promise
         *
         * @param {object} [requestData]
         * @returns {jQuery.Deferred}
         * @private
         */
        _createRequest: function(requestData) {
            this._setState(State.PENDING);

            return $.ajax({
                type: this.requestType,
                url: this.loaderUrl,
                data: requestData || '',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: this.dataType,
                cache: false,
                beforeSend: this.onBeforeSendHandler,
                complete: this.onRequestCompleteHandler
                //success: function () {console.log(arguments)},
                //error: function () {console.log(arguments)}
            });
        },

        /**
         * Set the current state of the Request
         *
         * @param {number} state
         * @returns {Loader}
         * @private
         */
        _setState: function(state) {
            if (state > State.SUCCESS || state < State.WAITING) {
                throw new Error('Invalid state value: ' + state);
            }

            this._state = state;

            return this;
        }

    });

    return Loader;
});
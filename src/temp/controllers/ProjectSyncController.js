define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');

    var Event = require('components/events/Event');
    var ModalEvent = require('events/ModalEvent');
    var State = require('constants/State');

    var ProjectSyncSendController = require('controllers/projectsync/ProjectSyncSendController');
    var ProjectSyncGetController = require('controllers/projectsync/ProjectSyncGetController');

    var ErrorEvent = require('events/ErrorEvent');
    var ErrorVO = require('models/valueobjects/ErrorVO');
    var NetworkMonitor = require('components/net/NetworkMonitor');

    /**
     * @name ProjectSyncController
     *
     * @constructor
     */
    var ProjectSyncController = function() {
        return this
            .initialize()
            .enabled(true);
    };

    _.extend(ProjectSyncController.prototype, Backbone.Events, {

        /**
         * @type {boolean}
         */
        isEnabled: false,

        /**
         * Create conflict modal
         *
         * @returns {ProjectSyncController}
         */
        initialize: function() {
            this.sendController = new ProjectSyncSendController();
            this.getController = new ProjectSyncGetController();

            return this;
        },

        /**
         * Add/Remove event listeners
         *
         * @param {boolean} [state=true]
         * @returns {ProjectSyncController}
         */
        enabled: function(state) {
            state = state !== false;

            if (this.isEnabled === state) {
                return this;
            }

            this.isEnabled = state;

            this.sendController.enabled(state);
            this.getController.enabled(state);

            if (state) {
                Backbone.on('sync', this.onSync, this);
                this.sendController
                    .on(Event.PROJECT_SYNC_SEND_SUCCESS, this.onSendSuccess, this)
                    .on(Event.PROJECT_SYNC_CANCEL, this._onSuccess, this)
                    .on(Event.PROJECT_SYNC_SEND_ERROR, this.onError, this);
                this.getController
                    .on(Event.PROJECT_SYNC_GET_SUCCESS, this.onGetSuccess, this)
                    .on(Event.PROJECT_SYNC_CANCEL, this._onSuccess, this)
                    .on(Event.PROJECT_SYNC_GET_ERROR, this.onError, this);
            } else {
                Backbone.off('sync', this.onSync, this);
                this.sendController
                    .off(Event.PROJECT_SYNC_SEND_SUCCESS, this.onSendSuccess, this)
                    .off(Event.PROJECT_SYNC_CANCEL, this._onSuccess, this)
                    .off(Event.PROJECT_SYNC_SEND_ERROR, this.onError, this);
                this.getController
                    .off(Event.PROJECT_SYNC_GET_SUCCESS, this.onGetSuccess, this)
                    .off(Event.PROJECT_SYNC_CANCEL, this._onSuccess, this)
                    .off(Event.PROJECT_SYNC_GET_ERROR, this.onError, this);
            }

            return this;
        },

        /**
         * Set project collection
         *
         * @param {LocalProjectCollection} collection
         * @returns {ProjectSyncController}
         */
        setProjectCollection: function(collection) {
            this.projectCollection = collection;

            this.sendController.setProjectCollection(collection);
            this.getController.setProjectCollection(collection);

            return this;
        },

        /**
         * Start requests
         *
         * @param {boolean} [fullSync=false] Should we also pull project from the server?
         * @returns {ProjectSyncController}
         */
        sync: function(fullSync) {
            if (this.isPending()) {
                return this;
            }

            if (!NetworkMonitor.connected()) {
                Backbone.trigger(ModalEvent.OFFLINE, new ModalEvent(ModalEvent.OFFLINE, this));

                // Reset the sync state
                return this._onSuccess();
            }

            this.sendController.getRequest().each(function(request) {
                request.project.setSyncState(true);
            });

            this._fullSync = fullSync === true;

            this.sendController.sync();

            return this;
        },

        /**
         * Check the state of the current request (if any). Stop if the current state is pending
         *
         * @param {Array.<ProjectVO>|ProjectVO} projects
         * @param {boolean} [force]
         * @returns {ProjectSyncController}
         */
        add: function(projects, force) {
            this.sendController.add(projects, force);

            return this;
        },

        /**
         * Get the current state of the sync request
         *
         * @returns {number} State enum
         */
        getState: function() {
            var sendState = this.sendController.getState();
            var getState = this.sendController.getState();

            if (sendState === State.PENDING || getState === State.PENDING) {
                return State.PENDING;
            }

            if (sendState >= State.PENDING) {
                return sendState;
            }

            return State.WAITING;
        },

        /**
         * Determine if request is currently pending
         *
         * @returns {boolean}
         */
        isPending: function() {
            return this.getState() === State.PENDING;
        },

        /**
         * Abort current request
         *
         * @returns {ProjectSyncController}
         */
        abort: function() {
            this.sendController.abort();
            this.getController.abort();

            return this;
        },

        /**
         * Reset controller. Abort and remove all listeners.
         *
         * @returns {ProjectSyncController}
         */
        reset: function() {
            this.sendController.reset();
            this.getController.reset();

            // Reset all projects ignore state
            this.projectCollection.invoke('setSyncState', false);

            return this
                .trigger(Event.PROJECT_SYNC_RESET)
                .off();
        },

        /**
         *
         * @fires Event.PROJECT_SYNC_ERROR
         *
         * @returns {ProjectSyncController}
         */
        onError: function(data) {
            return this.trigger(Event.PROJECT_SYNC_ERROR, data).reset();
        },

        /**
         * @returns {ProjectSyncController}
         */
        onSuccess: function() {
            // Resave all projects to localstorage
            this.projectCollection.invoke('store');
            this.projectCollection.removeArchived();

            return this._onSuccess();
        },

        /**
         * Trigger sync success and reset
         *
         * @fires Event.PROJECT_SYNC_SUCCESS
         *
         * @returns {ProjectSyncController}
         * @private
         */
        _onSuccess: function() {
            return this.trigger(Event.PROJECT_SYNC_SUCCESS).reset();
        },

        /**
         * If this is a fullSync, start getController
         *
         * @returns {ProjectSyncController}
         */
        onSendSuccess: function() {
            if (this._fullSync) {
                this.getController.sync();
            } else {
                this.onSuccess();
            }

            return this;
        },

        /**
         * Call onSuccess
         *
         * @param {Array.<ProjectVO>} projects
         * @returns {ProjectSyncController}
         */
        onGetSuccess: function(projects) {
            if (projects && projects.length) {
                this._fullSync = false;
                this.sendController
                    .reset()
                    .add(projects, false)
                    .sync();
            } else {
                this.onSuccess();
            }

            return this;
        },

        /**
         * Sync projects
         *
         * @param {Array|ProjectVO} projects
         * @returns {ProjectSyncController}
         */
        onSync: function(projects) {
            if (this.isPending()) {
                return this;
            }

            return this
                .add(projects)
                .sync();
        }

    });

    return new ProjectSyncController();

});
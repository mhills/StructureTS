define(function(require) {
    'use strict';
    
    var BaseEvent = require('components/events/BaseEvent');

    /**
     * @class Event
     */
    var Event = BaseEvent.extend({

        initialize: function(type, target, data) {
            BaseEvent.prototype.initialize.call(this, type, target, data);
        }

    },
    //Static Properties/Methods
    {
        ERROR: 'error',
        ACTIVATE: 'activate',
        ADDED: 'added',
        CANCEL: 'cancel',
        CLEAR: 'clear',
        CLOSE: 'close',
        CLOSING: 'closing',
        COMPLETE: 'complete',
        CONNECT: 'connect',
        COPY: 'copy',
        CUT: 'cut',
        DEACTIVATE: 'deactivate',
        EXITING: 'exiting',
        HTML_RENDER: 'htmlRender',
        FULL_SCREEN: 'fullScreen',
        INIT: 'init',
        NETWORK_CHANGE: 'networkChange',
        PASTE: 'paste',
        RENDER: 'render',
        RESIZE: 'resize',
        SCROLL: 'scroll',
        SELECT: 'select',
        UNLOAD: 'unload',

        /**
         * Collection add event
         *
         * @events
         * @name Event.Add
         * @param {*} child
         */
        ADD: 'add',
        REMOVE: 'remove',
        CHANGE: 'change',
        READY: 'ready',

        CONNECTION_CONNECT: 'connection/connect',
        CONNECTION_LOST: 'connection/lost',

        NETWORK_STATUS: 'network/status',

        DELETE_MODAL_DELETE: 'modal/delete/delete',
        DELETE_MODAL_CANCEL: 'modal/delete/cancel',

        ARCHIVE_MODAL_CANCEL: 'modal/archive/cancel',
        ARCHIVE_MODAL_CONFIRM: 'modal/archive/confirm',

        PROJECT_UNARCHIVE: 'project/unarchive',

        USER_TOKEN_SET: 'user/token/set',
        USER_USER_SET: 'user/set',

        REQUEST_SUCCESS: 'request/success',
        REQUEST_ERROR: 'request/error',
        REQUEST_CONNECTION_ERROR: 'request/connection/error',
        REQUEST_COMPLETE: 'request/complete',

        CONFLICT_MODAL_CANCEL: 'modal/conflict/cancel',
        CONFLICT_MODAL_SUBMIT: 'modal/conflict/submit',

        PROJECT_UPDATE: 'project/update',
        PROJECT_SAVE: 'project/save',
        PROJECT_COLLECTION_SAVE: 'project/collection/save',
        PROJECT_SYNC: 'project/sync',

        PROJECT_SYNC_ERROR: 'project/sync/error',
        PROJECT_SYNC_SUCCESS: 'project/sync/success',

        PROJECT_SYNC_GET_SUCCESS: 'project/sync/get/success',
        PROJECT_SYNC_GET_ERROR: 'project/sync/get/error',

        PROJECT_SYNC_SEND_SUCCESS: 'project/sync/send/success',
        PROJECT_SYNC_SEND_ERROR: 'project/sync/send/error',

        PROJECT_SYNC_COMPLETE: 'project/sync/complete',
        PROJECT_SYNC_CONFLICT: 'project/sync/conflict',
        PROJECT_SYNC_CANCEL: 'project/sync/cancel',
        PROJECT_SYNC_RESET: 'project/sync/reset',

        PROJECT_TOTALS_CALCULATED: 'project/totals/calculated',

        WINDOW_TYPE_UPDATE: 'windowtype/update',
        WINDOW_TYPE_SAVE: 'windowtype/save',

        EXPORT_MODAL_DOWNLOAD: 'modal/export/download',
        EXPORT_MODAL_SEND: 'modal/export/send'
    });

    return Event;
});

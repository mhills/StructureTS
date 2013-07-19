define(function(require) {
    'use strict';
    
    var Backbone = require('backbone');
    var BaseController = require('components/controllers/BaseController');
    var NetworkMonitorEvent = require('components/events/NetworkMonitorEvent');

    /**
     * @class NetworkMonitor
     */
    var NetworkMonitor = BaseController.extend({

        initialize: function() {
            window.addEventListener(NetworkMonitorEvent.ONLINE, this.onNetworkMonitorEvent.bind(this), false);
            window.addEventListener(NetworkMonitorEvent.OFFLINE, this.onNetworkMonitorEvent.bind(this), false);

            var event = new NetworkMonitorEvent(NetworkMonitorEvent.STATUS, this, this.getStatus(), this.connected());
            Backbone.trigger(NetworkMonitorEvent.STATUS, event);
            this.trigger(NetworkMonitorEvent.STATUS, event);

            return this;
        },

        connected: function() {
            return window.navigator.onLine;
        },

        getStatus: function() {
            return (this.connected()) ? NetworkMonitor.ONLINE : NetworkMonitor.OFFLINE;
        },

        onNetworkMonitorEvent: function(event) {
            var errorEvent = new NetworkMonitorEvent(NetworkMonitorEvent.STATUS, this, event.type, this.connected());
            Backbone.trigger(NetworkMonitorEvent.STATUS, errorEvent);
            this.trigger(NetworkMonitorEvent.STATUS, errorEvent);
        }

    },
    {
        ONLINE: 'online',
        OFFLINE: 'offline'
    });

    return new NetworkMonitor();
});
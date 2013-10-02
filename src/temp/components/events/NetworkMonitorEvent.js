define(function(require) {
        "use strict"
        var BaseEvent = require('components/events/BaseEvent');

        /**
         * @class NetworkMonitorEvent
         */
        var NetworkMonitorEvent = BaseEvent.extend({

            status: null,
            connected: null,

            initialize: function(type, target, status, connected) {
                this.status = status;
                this.connected = connected;

                BaseEvent.prototype.initialize.call(this, type, target);
            }

        },
        //Static Properties/Methods
        {
            STATUS: "NetworkMonitorEvent.status",
            ONLINE: "online",
            OFFLINE: "offline"
        });

        return NetworkMonitorEvent;
    }
);

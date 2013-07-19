define(function(require) {
    "use strict"
    var BaseEvent = require('components/events/BaseEvent');

    /**
     * @class ApplicationCacheEvent
     */
    var ApplicationCacheEvent = BaseEvent.extend({

            initialize: function(type, target, data) {
                BaseEvent.prototype.initialize.call(this, type, target, data);
            }

        },
        //Static Properties/Methods
        {
            /**
             * The browser is checking for an update, or is attempting to download
             * the cache manifest for the first time. This is always the first event
             * in the sequence.
             *
             * @events
             * @name ApplicationCacheEvent.CHECKING
             */
            CHECKING: "checking",

            /**
             * The cache manifest hadn't changed.
             *
             * @events
             * @name NO_UPDATE
             */
            NO_UPDATE: "noupdate",

            /**
             * The browser has started to download the cache manifest, either for the
             * first time or because changes have been detected.
             *
             * @events
             * @name DOWNLOADING
             */
            DOWNLOADING: "downloading",

            /**
             * The browser had downloaded and cached an asset. This is fired once for
             * every file that is downloaded (including the current page which is cached implicitly).
             *
             * @events
             * @name PROGRESS
             */
            PROGRESS: "progress",

            /**
             * The resources listed in the manifest have been fully downloaded, and the application is
             * now cached locally.
             *
             * @events
             * @name CACHED
             */
            CACHED: "cached",

            /**
             * The resources listed in the manifest have been newly re-downloaded, and the script can
             * use swapCache() to switch to the new cache.
             *
             * @events
             * @name UPDATE_READY
             */
            UPDATE_READY: "updateready",

            /**
             * The cache manifest file could not be found, indicating that the cache is no longer needed.
             * The application cache is being deleted.
             *
             * @events
             * @name OBSOLETE
             */
            OBSOLETE: "obsolete",

            /**
             * An error occurred at some point - this could be caused by a number of things. This will
             * always be the last event in the sequence.
             *
             * @events
             * @name ERROR
             */
            ERROR: "error"

        });

    return ApplicationCacheEvent;
});
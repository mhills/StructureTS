define(function (require) {
        "use strict"
        var $ = require('jquery');
        var _ = require('underscore');
        var Backbone = require('backbone');
        var BaseController = require('components/controllers/BaseController');
        var ApplicationCacheEvent = require('components/events/ApplicationCacheEvent');

        /**
         * @class ApplicationCacheController
         */
        var ApplicationCacheController = BaseController.extend({

            isEnabled: false,

            appCache: null,

            initialize: function () {
                this.appCache = window.applicationCache;
                //Fix for IE9
                if (this.appCache) {
                    this.enabled(true);
                }
            },

            update: function () {
                this.appCache.update();
            },

            enabled: function (value) {
                if (value === this.isEnabled) return this;

                if (value) {
                    this.appCache.addEventListener(ApplicationCacheEvent.CACHED, this.onCached.bind(this), false);
                    this.appCache.addEventListener(ApplicationCacheEvent.CHECKING, this.onChecking.bind(this), false);
                    this.appCache.addEventListener(ApplicationCacheEvent.DOWNLOADING, this.onDownloading.bind(this), false);
                    this.appCache.addEventListener(ApplicationCacheEvent.NO_UPDATE, this.onNoUpdate.bind(this), false);
                    this.appCache.addEventListener(ApplicationCacheEvent.OBSOLETE, this.onObsolete.bind(this), false);
                    this.appCache.addEventListener(ApplicationCacheEvent.PROGRESS, this.onProgress.bind(this), false);
                    this.appCache.addEventListener(ApplicationCacheEvent.UPDATE_READY, this.onUpdateReady.bind(this), false);
                    this.appCache.addEventListener('on' + ApplicationCacheEvent.UPDATE_READY, this.onUpdateReady.bind(this), false);//FireFox Hack. See index.phtml file for second part of the hack.
                    this.appCache.addEventListener(ApplicationCacheEvent.ERROR, this.onError.bind(this), false);
                } else {
                    this.appCache.removeEventListener(ApplicationCacheEvent.CACHED, this.onCached.bind(this), false);
                    this.appCache.removeEventListener(ApplicationCacheEvent.CHECKING, this.onChecking.bind(this), false);
                    this.appCache.removeEventListener(ApplicationCacheEvent.DOWNLOADING, this.onDownloading.bind(this), false);
                    this.appCache.removeEventListener(ApplicationCacheEvent.NO_UPDATE, this.onNoUpdate.bind(this), false);
                    this.appCache.removeEventListener(ApplicationCacheEvent.OBSOLETE, this.onObsolete.bind(this), false);
                    this.appCache.removeEventListener(ApplicationCacheEvent.PROGRESS, this.onProgress.bind(this), false);
                    this.appCache.removeEventListener(ApplicationCacheEvent.UPDATE_READY, this.onUpdateReady.bind(this), false);
                    this.appCache.removeEventListener('on' + ApplicationCacheEvent.UPDATE_READY, this.onUpdateReady.bind(this), false);//FireFox Hack.
                    this.appCache.removeEventListener(ApplicationCacheEvent.ERROR, this.onError.bind(this), false);
                }

                this.isEnabled = value;
                return this;
            },

            getStatus: function () {
                switch (this.appCache.status) {
                    case this.appCache.UNCACHED:    // UNCACHED == 0
                        return 'UNCACHED';
                        break;
                    case this.appCache.IDLE:        // IDLE == 1
                        return 'IDLE';
                        break;
                    case this.appCache.CHECKING:    // CHECKING == 2
                        return 'CHECKING';
                        break;
                    case this.appCache.DOWNLOADING: // DOWNLOADING == 3
                        return 'DOWNLOADING';
                        break;
                    case this.appCache.UPDATEREADY: // UPDATEREADY == 4
                        return 'UPDATEREADY';
                        break;
                    case this.appCache.OBSOLETE:    // OBSOLETE == 5
                        return 'OBSOLETE';
                        break;
                    default:
                        return 'UKNOWN CACHE STATUS';
                        break;
                }
            },

            onCached: function (event) {
                //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.CACHED, event);
                this.trigger(ApplicationCacheEvent.CACHED, new ApplicationCacheEvent(ApplicationCacheEvent.CACHED, this, event));
            },

            onChecking: function (event) {
                //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.CHECKING, event);
                this.trigger(ApplicationCacheEvent.CHECKING, new ApplicationCacheEvent(ApplicationCacheEvent.CHECKING, this, event));
            },

            onDownloading: function (event) {
                //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.DOWNLOADING, event);
                this.trigger(ApplicationCacheEvent.DOWNLOADING, new ApplicationCacheEvent(ApplicationCacheEvent.DOWNLOADING, this, event));
            },

            onError: function (event) {
                //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.ERROR, event);
                this.trigger(ApplicationCacheEvent.ERROR, new ApplicationCacheEvent(ApplicationCacheEvent.ERROR, this, event));
            },

            onNoUpdate: function (event) {
                //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.NO_UPDATE, event);
                this.trigger(ApplicationCacheEvent.NO_UPDATE, new ApplicationCacheEvent(ApplicationCacheEvent.NO_UPDATE, this, event));
            },

            onObsolete: function (event) {
                //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.OBSOLETE, event);
                this.trigger(ApplicationCacheEvent.OBSOLETE, new ApplicationCacheEvent(ApplicationCacheEvent.OBSOLETE, this, event));
            },

            onProgress: function (event) {
                //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.PROGRESS, event);
                this.trigger(ApplicationCacheEvent.PROGRESS, new ApplicationCacheEvent(ApplicationCacheEvent.PROGRESS, this, event));
            },

            onUpdateReady: function (event) {
                //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.UPDATE_READY, event);
                this.trigger(ApplicationCacheEvent.UPDATE_READY, new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY, this, event));
            }

        });

        return new ApplicationCacheController;
    }
);
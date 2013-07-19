define(function(require) {
        "use strict"
        var $ = require('jquery');
        var _ = require('underscore');
        var Backbone = require('backbone');
        var BaseController = require('components/controllers/BaseController');
        var ErrorEvent = require('events/ErrorEvent');
        var ModalEvent = require('events/ModalEvent');
        var GenericModal = require('views/modals/GenericModal');

        /**
         * @class ModalController
         */
        var ModalController = BaseController.extend({

            appController: null,

            initialize: function(options) {
                this.appController = options.controller;

                Backbone.on(ErrorEvent.ERROR, this.onErrorEvent.bind(this));
                Backbone.on(ModalEvent.GENERIC, this.onGenericModalEvent.bind(this));
                Backbone.on(ModalEvent.OFFLINE, this.onOfflineModalEvent.bind(this));
                Backbone.on(ModalEvent.CONNECTION_ERROR, this.onConnectionErrorModalEvent.bind(this));
            },

            onErrorEvent: function(errorEvent) {
                var errorVO = errorEvent.data;

                var modal = new GenericModal();
                modal.titleText = 'Warning : ' + errorVO.get('code');
                modal.bodyText = errorVO.get('message');
                modal.render();
                modal.show();
            },

            /**
             *
             * @param {ModalEvent} event
             * @param {Object} event.data
             * @param {String} event.data.title
             * @param {String} event.data.body
             */
            onGenericModalEvent: function(event) {
                var modal = new GenericModal();
                modal.titleText = event.title;
                modal.bodyText = event.message;
                modal.render();
                modal.show();
            },

            /**
             *
             * @param {ModalEvent} event
             */
            onConnectionErrorModalEvent: function(event) {
                var modal = new GenericModal();
                modal.titleText = event.title  || 'Offline/Connection Warning';
                modal.bodyText = event.message || 'The application cannot determine if you are connect to the internet or not. <br/>Please make sure you are connected to the internet.';
                modal.render();
                modal.show();
            },

            /**
             *
             * @param {ModalEvent} event
             */
            onOfflineModalEvent: function(event) {
                var modal = new GenericModal();
                modal.titleText = event.title  || 'Offline Warning';
                modal.bodyText = event.message || 'You need to be connected to the internet to complete this action. <br/>Please connect to the internet and try again.';
                modal.render();
                modal.show();
            }

        });

        return ModalController;
    }
);

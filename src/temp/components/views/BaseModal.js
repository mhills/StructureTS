define(function(require) {
    'use strict';

    var BaseView = require('components/views/BaseView');

    /**
     * @class BaseModal
     */
    var BaseModal = BaseView.extend({

        //events will be overwritten by class that extends this class. Add events in enabled method.
        events: {},

        initialize:function(template) {
            this.setElement(template);

            this.$el.modal({
                show: false,
                keyboard: false,
                backdrop: 'static'//Disables the backdrop from closing the modal on click
            });

            return BaseView.prototype.initialize.call(this);
        },

        render:function() {
            return this;
        },

        enabled: function(state) {
            state = state !== false;

            if (state === this.isEnabled) {
                return this;
            }

            if (state) {
                this
                    .on('show', this.onModalShow, this)
                    .on('shown', this.onModalShown, this)
                    .on('hide', this.onModalHide, this)
                    .on('hidden', this.onModalHidden, this);
            } else {
                this
                    .off('show', this.onModalShow, this)
                    .off('shown', this.onModalShown, this)
                    .off('hide', this.onModalHide, this)
                    .off('hidden', this.onModalHidden, this);
            }

            return BaseView.prototype.enabled.call(this, state);
        },

        show: function() {
            this.enabled(true);

            this.$el.modal('show');

            return this;
        },

        hide: function() {
            this.$el.modal('hide');

            return this;
        },

        onModalShow: function(event) {
            //console.log('onModalShow');

            return this.trigger(event.type);
        },

        onModalShown: function(event) {
            //console.log('onModalShown');

            return this.trigger(event.type);
        },

        onModalHide: function(event) {
            //console.log('onModalHide');

            return this.trigger(event.type);
        },

        onModalHidden: function(event) {
            //console.log('onModalHidden');

            return this
                .enabled(false)
                .remove()
                .trigger(event.type);
        }

    });

    return BaseModal;
});

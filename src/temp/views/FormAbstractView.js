define(function(require) {
    'use strict';

    var _ = require('underscore');
    var AppView = require('views/AppView');
    var Event = require('components/events/Event');

    var UserVODataMap = require('json!data/datamap/UserVO.json');

    /**
     * @class
     * @name FormAbstractView
     * @extends AppView
     */
    var FormAbstractView = AppView.extend({

        /**
         * Current request object
         *
         * @type {Loader}
         */
        _request: null,

        /**
         * View events on callback method names
         *
         * @type {object}
         */
        events: {
            'submit form': 'onSubmit'
        },

        /**
         * Form key mutators. Take any keys from the form data that start with the keys in this
         * object and place them all a separate object under the value in this object as the parameter.
         *
         * @example
         *  'customer-': 'customer'
         *
         *  For form data like this:
         *      id: 111
         *      name: test
         *      customer-name: Bill
         *      customer-phone: 555-5555
         *
         *  It will become:
         *      id: 111
         *      name: test
         *      customer:
         *          name: Bill
         *          phone: 555-5555
         *
         * @type {object}
         */
        formDataMutators: {},

        /**
         * Flag to determine if we are currently performing a request
         *
         * @type {boolean}
         */
        isRequesting: false,

        /**
         * View template
         *
         * @type {function}
         */
        template: function() {},

        /**
         * Get data object to be user when rendering the view template
         *
         * @returns {object}
         */
        getTemplateData: function() {
            return {
                countries: UserVODataMap.COUNTRY
            };
        },

        /**
         * Render view with data from request.
         * Return early if no data from request is found.
         *
         * @returns {FormAbstractView}
         */
        render: function() {
            this.$el.html(this.template(this.getTemplateData()));

            return this;
        },

        /**
         * Instantiate a new request
         *
         * @throws {Error} If not overridden in child classes
         *
         * @returns {UserAddRequest}
         */
        getRequest: function() {
            throw new Error('Abstract Error: getRequest must be overridden in child classes');
        },

        /**
         * Hook to modify data before it is send in the request
         *
         * @param {object} data
         * @returns {object}
         */
        beforeSubmit: function(data) {
            return data;
        },

        /**
         * Save user VO to backend
         *
         * @param {object} data
         * @returns {FormAbstractView}
         */
        save: function(data) {
            if (this.isRequesting) {
                return this;
            }

            this.isRequesting = true;

            var request = this._request = this.getRequest();

            request
                .on(Event.REQUEST_SUCCESS, this.onSaveSuccess, this)
                .on(Event.REQUEST_COMPLETE, this.onSaveComplete, this)
                .setData(this.beforeSubmit(data))
                .load();

            return this;
        },

        /**
         * Get form valid state
         *
         * @returns {boolean}
         */
        isValid: function() {
            return this.$('form').validate().form();
        },

        /**
         * Get form data
         *
         * @returns {object}
         */
        getFormData: function() {
            var data = this.$('form').serializeObject();

            _.forOwn(this.formDataMutators, function(mutator, replacer) {
                var hoisted = {};

                _.forOwn(data, function (value, key) {
                    if (key.indexOf(replacer) === 0) {
                        hoisted[key.replace(replacer, '')] = value;
                        delete data[key];
                    }
                });

                if (_.size(hoisted)) {
                    data[mutator] = hoisted;
                }

            });

            return data;
        },

        /**
         * Method to store new data
         *
         * @param {object} data
         * @returns {FormAbstractView}
         */
        change: function(data) {
            return this;
        },

        /**
         * Destroy view.
         * Abort request is one is currently performing
         *
         * @returns {FormAbstractView}
         */
        destroy: function() {
            if (this.isRequesting) {
                this._request.abort();
            }
            return AppView.prototype.destroy.call(this);
        },

        /**
         * Submit user changes
         *
         * @param {jQuery.Event} event
         * @returns {FormAbstractView}
         */
        onSubmit: function(event) {
            event.preventDefault();

            if (!this.isValid()) {
                //console.log("[FormAbstractView] Form not valid.")
                return this;
            }

            var formData = this.getFormData();

            return this
                .change(formData)
                .save(formData);
        },

        /**
         * Check if form is valid, get form data and pass to change event
         *
         * @returns {}
         */
        onChange: function() {
            if (!this.isValid()) {
                return this;
            }

            var formData = this.getFormData();

            return this.change(formData);
        },

        /**
         * Reset requesting flag
         *
         * @returns {FormAbstractView}
         */
        onSaveComplete: function() {
            this._request = null;
            this.isRequesting = false;
            return this;
        },

        /**
         * Display request success message
         *
         * @param {*} data
         */
        onSaveSuccess: function(data) {
            alert('[UserFormAppView] Request success');
            //console.log('[UserFormAppView] Request success', data);
        }

    });

    return FormAbstractView;
});
define(function(require) {
    'use strict';

    var $ = require('jquery');
    var Backbone = require('backbone');

    var PaginationComponent = require('components/views/PaginationComponent');
    var AppView = require('views/AppView');

    var Event = require('components/events/Event');
    var UserListRequest = require('requests/UserListRequest');
    var NetworkMonitor = require('components/net/NetworkMonitor');
    var ModalEvent = require('events/ModalEvent');

    var GetListVO = require('models/valueobjects/GetListVO');
    var UserListFiltersVO = require('models/valueobjects/user/UserListFiltersVO');
    var ListSortVO = require('models/valueobjects/ListSortVO');
    var UserModel = require('models/UserModel');
    var UserVoDataMap = require('json!data/datamap/UserVO.json');

    /**
     * @class ListView
     * @extends AppView
     */
    var ListView = AppView.extend({

        /**
         * @type {string}
         */
        PAGE_TITLE: 'User List',

        /**
         * Is a request currently running?
         *
         * @default false
         * @type {boolean}
         */
        isRequesting: false,

        /**
         * @type {BaseVO}
         */
        requestData: null,

        /**
         * Current page number
         * 
         * @name ListView#currentPage
         * @type {number}
         */
        currentPage: 1,

        /**
         * Current search string
         * 
         * @name ListView#search
         * @type {string}
         */
        search: null,

        /**
         * Pagination component view
         *
         * @name ListView#pagination
         * @type {PaginationComponent}
         */
        pagination: null,

        /**
         * Render template
         *
         * @type {function}
         */
        el: function() {},

        /**
         * List item template
         *
         * @type {function}
         */
        detailTemplate: function() {},

        /**
         * View events
         * 
         * @name ListView#events
         * @type {object}
         */
        events: {
            'tap thead .sortable': 'onSortClick',
            'submit .js-filter': 'onFilterChange'
        },

        /**
         * Setup view
         * 
         * @param {object} options
         * @returns {ListView}
         */
        initialize: function(options) {

            /**
             * Filter form
             *
             * @name ListView#$form
             * @type {jQuery}
             */
            this.$form = this.$('.js-filter');

            /**
             * Filter Form elements
             *
             * @name ListView#$formElements
             * @type {jQuery}
             */
            this.$formElements = $(this.$form.get(0).elements);

            /**
             * Application controller
             * 
             * @name ListView#appController
             * @type {AppController}
             */
            this.appController = options.controller;

            return AppView.prototype.initialize.call(this);
        },

        /**
         * Create VO objects and child elements
         * 
         * @returns {ListView}
         */
        createChildren: function() {

            /**
             * Filter VO
             * 
             * @name ListView#filterVO
             * @type {UserListFiltersVO}
             */
            this.filterVO = new UserListFiltersVO();

            /**
             * Sort VO
             * 
             * @name ListView#sortVO
             * @type {ListSortVO}
             */
            this.sortVO = this.createSortVO();

            /**
             * Container to set user list to
             * 
             * @name ListView#listContainer
             * @type {BaseView}
             */
            this.$listContainer = this.$('tbody');


            var listArea = this.getChild('.js-list-container');

            this.pagination = new PaginationComponent();
            listArea.addChild(this.pagination);

            return this.fetchList();
        },

        /**
         * Create sort VO
         *
         * @returns {ListSortVO}
         */
        createSortVO: function() {
            return new ListSortVO();
        },

        /**
         * Create new request object
         *
         * @returns {UserListRequest}
         */
        getRequest: function() {
            throw new Error('AbstractError: getRequest must be overridden');
        },

        /**
         * Render users into view
         * 
         * @returns {ListView}
         */
        render: function() {
            this.enabled(false);

            this.$listContainer.html(this.detailTemplate({ items: this.getListItems(), userStatus: UserVoDataMap.STATUS }));
            this.pagination.update(this.getPaginationData());

            this.enabled(true);
            return this;
        },

        /**
         * Set enabled state
         * 
         * @param {boolean} state
         * @returns {ListView}
         */
        enabled: function(state) {
            state = state !== false;
            
            if (state === this.isEnabled) {
                return this;
            }
            
            if (state) {
                this.pagination.on(PaginationComponent.CHANGE_PAGE, this.setCurrentPage, this);
            } else {
                this.pagination.off(PaginationComponent.CHANGE_PAGE, this.setCurrentPage, this);
            }

            this.pagination.enabled(state);

            return AppView.prototype.enabled.call(this, state);
        },

        /**
         * Fetch user list from server
         * 
         * @returns {ListView}
         */
        fetchList: function() {
            var vo = new GetListVO({
                page: this.currentPage,
                token: UserModel.token,
                filters: this.filterVO,
                search: this.search,
                sort: this.sortVO
            });

            this.toggleFilterForm(false);

            this.isRequesting = true;
            
            var request = this.getRequest();
            
            request
                .on(Event.REQUEST_SUCCESS, this.onListSuccess, this)
                .setData(vo)
                .load();

            return this;
        },

        /**
         * Set requested VO data and render view
         *
         * @param {BaseVO} data
         * @returns {ListView}
         */
        setRequestedVO: function(data) {
            this.requestData = data;
            
            return this.render();
        },

        /**
         * Get requested list VO data
         *
         * @returns {BaseVO}
         */
        getRequestedVO: function() {
            return this.requestData;
        },

        /**
         * Get list items
         * 
         * @returns {Array}
         */
        getListItems: function() {
            var vo = this.getRequestedVO();
            if (vo) {
                return vo.get('users');
            } else {
                return [];
            }
        },

        /**
         * Get PaginationVO
         * 
         * @returns {PaginationVO|null}
         */
        getPaginationData: function() {
            var vo = this.getRequestedVO();
            if (vo) {
                return vo.get('pagination');
            } else {
                return null;
            }
        },

        /**
         * Toggle enable/disabled state of filter form elements
         *
         * @param {boolean} [state=true]
         * @returns {ListView}
         */
        toggleFilterForm: function(state) {
            this.$formElements.prop('disabled', state === false);

            return this;
        },

        /**
         * Set current page number and request new user list
         *
         * @param {number} pageNumber
         * @returns {ListView}
         */
        setCurrentPage: function(pageNumber) {
            this.currentPage = pageNumber;

            return this.fetchList();
        },

        /**
         * Set new list data from request
         *
         * @param {BaseVO} data
         * @param {Loader} request
         * @returns {ListView}
         */
        onListSuccess: function(data, request) {
            this.toggleFilterForm(true);

            this.isRequesting = false;

            return this.setRequestedVO(data);
        },

        /**
         * Update filterVO and reload list
         *
         * @param {jQuery.Event} event
         * @returns {ListView}
         */
        onFilterChange: function(event) {
            event.preventDefault();

            return this.setCurrentPage(1);
        },

        /**
         * Update sort VO and update user list
         *
         * @param {jQuery.Event} event
         * @param {HTMLElement} event.currentTarget
         * @returns {ListView}
         */
        onSortClick: function(event) {
            if (this.isRequesting) {
                return this;
            }

            if (!NetworkMonitor.connected()) {
                Backbone.trigger(ModalEvent.OFFLINE, new ModalEvent(ModalEvent.OFFLINE, this));
                return this;
            }

            var $el = $(event.currentTarget);
            var sort = $el.data('sort') || null;

            if (this.sortVO.get('field') === sort) {
                this.sortVO.toggleSortDirection();
            } else {
                this.sortVO.set('field', sort);
            }

            $el
                .parent()
                .children()
                .removeClass('active ascending descending');

            $el
                .addClass('active')
                .addClass(this.sortVO.get('direction'));

            return this.setCurrentPage(1);
        },

        destroy: function() {
            this.remove();
            this.off();
            this.stopListening();
            this.pagination.destroy();

            return this;
        }

    });

    return ListView;
});
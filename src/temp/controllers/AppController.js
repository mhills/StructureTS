define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var BaseController = require('components/controllers/BaseController');
    var RouterController = require('controllers/RouterController');
    var GlassChecklistModel = require('models/glasschecklist/GlassChecklistModel');
    var DestroySessionRequest = require('requests/DestroySessionRequest');
    var AppModel = require('models/AppModel');

    /**
     * @class AppController
     */
    var AppController = BaseController.extend({

        /**
         * @type {AppModel}
         */
        appModel: null,

        /**
         * @type {GlassChecklistModel}
         */
        glassChecklistModel: null,

        /**
         * @type {string}
         */
        redirectRoute: null,

        /**
         * Create app model and glass checklist controller
         *
         * @returns {AppController}
         */
        initialize: function() {
            this.appModel = new AppModel();
            this.glassChecklistModel = new GlassChecklistModel();

            return this;
        },

        /**
         * Get ProjectVO by ID
         *
         * @param {number} id
         * @returns {ProjectVO}
         */
        getProjectById: function(id) {
            return this.getProjectCollection().get(id);
        },

        /**
         * Delete project by ID
         *
         * @param {number} id
         * @returns {AppController}
         */
        deleteProjectById: function(id) {
            Backbone.trigger('project:remove', this.getProjectById(id));

            return this;
        },

        /**
         * Get project collection
         *
         * @returns {LocalProjectCollection}
         */
        getProjectCollection: function() {
            return this.appModel.projectCollection;
        },

        /**
         * Sends the userVO to the AppModel.
         * @param {UserVO} userVO
         */
        setUser: function(userVO) {
            this.appModel.setUser(userVO);

            return this;
        },

        /**
         * Sends the user session data to the AppModel.
         * @param {Object} userSessionData
         */
        setUserSession: function(userSessionData) {
            this.appModel.setUserSession(userSessionData);

            return this;
        },

        /**
         * Update user
         *
         * @returns {AppController}
         */
        updateLocalUser: function() {
            this.appModel.updateLocalUser();

            return this;
        },

        /**
         * Returns the stored UserVO from the AppModel.
         * @returns {UserVO}
         */
        getUser: function() {
            return this.appModel.getUser()
        },

        /**
         * Returns the user session token from the AppModel.
         * @returns {string}
         */
        getSessionToken: function() {
            return this.appModel.getUserSession().get('token');
        },

        /**
         * Get current UserSessionVO
         *
         * @returns {UserSessionVO|null}
         */
        getUserSession: function() {
            return this.appModel.getUserSession();
        },

        /**
         * Clear user session
         *
         * @returns {AppController}
         */
        destroyUserSession: function() {
            this.appModel.destroyUserSession();

            return this;
        },

        /**
         * Calls clear on the AppModel.
         * Routes the user the login page.
         *
         * @returns {AppController}
         */
        logOut: function() {
            new DestroySessionRequest()
                .setData(this.getUserSession())
                .load();

            this.appModel.clear();
            return this.redirectToLogin();
        },

        /**
         * Save the current url hash to be used later.
         * If the current url hash is 'login/' we do not save it because the user will already be on the login screen.
         *
         * @returns {AppController}
         */
        saveRedirectRoute: function() {
            var currentRoute = RouterController.getCurrentRoute();
            this.redirectRoute = (currentRoute !== 'login/') ? currentRoute : null;

            return this;
        },

        /**
         * Redirect to redirectRoute
         *
         * @returns {AppController}
         */
        gotoRedirectRoute: function() {
            var route = this.redirectRoute;
            this.redirectRoute = null;
            RouterController.navigate(route, true);

            return this;
        },

        /**
         * Redirect to user login page
         *
         * @returns {AppController}
         */
        redirectToLogin: function() {
            RouterController.navigate('login/', true);

            return this;
        },

        /**
         * Check if a user session is set
         *
         * @returns {boolean}
         */
        isUserLoggedIn : function() {
            return !!this.getUserSession();
        }

    });

    return AppController;
});

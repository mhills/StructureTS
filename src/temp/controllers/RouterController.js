define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Global = require('constants/Global');
    var PageTypes = require('constants/PageTypes');

    var _keyRegex = /\/:(\w+)\//g;
    var _keyCleanupRegex = /^\/:|\/$/g;
    var _fullUrlRegex = /^https?:\/\//i;

    /**
     * Create a function to generate a URL with dynamic params
     *
     * @param {string} pattern
     * @returns {Function}
     * @private
     */
    var _createURLGenerator = function(pattern) {
        var keys = {};
        _.each(
            pattern.match(_keyRegex),
            function(value) {
                keys[value.replace(_keyCleanupRegex, '')] = value;
            }
        );

        return function(values) {
            var url = pattern;
            _.each(keys, function(value, key) {
                if (!values.hasOwnProperty(key) || values[key] === null) {
                    throw new Error('URL parameter required: ' + key);
                }
                url = url.replace(value, '/' + values[key] + '/');
            });

            return url;
        };
    };

    var routes = {};

    routes['(/)'] = Global.ROUTE_NAME.LOGIN;
    routes['(/)' + PageTypes.LOGIN + '(/)'] = Global.ROUTE_NAME.LOGIN;
    routes['(/)' + PageTypes.FORGOT_PASSWORD + '(/)'] = Global.ROUTE_NAME.FORGOT_PASSWORD;
    routes['(/)' + PageTypes.RESET_PASSWORD + '/:code(/)'] = Global.ROUTE_NAME.RESET_PASSWORD;
    routes['(/)' + PageTypes.REGISTER + '/:code(/)'] = Global.ROUTE_NAME.REGISTER;
    routes['(/)' + PageTypes.HOME + '(/)'] = Global.ROUTE_NAME.HOME;
    routes['(/)' + PageTypes.HELP + '(/)'] = Global.ROUTE_NAME.HELP;

    routes['(/)' + PageTypes.USER.BASE + '(/)'] = Global.ROUTE_NAME.USER;
    routes['(/)' + PageTypes.USER.BASE + '/:id(/)'] = Global.ROUTE_NAME.USER;
    routes['(/)' + PageTypes.USER.BASE + '/:id/:subpage(/)'] = Global.ROUTE_NAME.USER;
    routes['(/)' + PageTypes.USER.BASE + '/:id/:subpage/:id(/)'] = Global.ROUTE_NAME.USER;
    routes['(/)' + PageTypes.USER.BASE + '/:userId/' + PageTypes.PROJECT.BASE + '/:projectId/' + PageTypes.WINDOW_TYPE.BASE + '/:windowId/' + PageTypes.WINDOW_TYPE.GLASS_CHECKLIST_VIEW + '(/)'] = Global.ROUTE_NAME.GLASS_CHECKLIST_VIEW;

    routes['(/)' + PageTypes.DEALER.BASE + '(/)'] = Global.ROUTE_NAME.DEALER;
    routes['(/)' + PageTypes.DEALER.BASE + '/:id(/)'] = Global.ROUTE_NAME.DEALER;
    routes['(/)' + PageTypes.DEALER.BASE + '/:id/:subpage(/)'] = Global.ROUTE_NAME.DEALER;

    routes['(/)' + PageTypes.PROFILE + '(/)'] = Global.ROUTE_NAME.EDIT_PROFILE;

    routes['(/)' + PageTypes.PROJECT_ARCHIVE.BASE + '(/)'] = Global.ROUTE_NAME.PROJECT_ARCHIVE;
    routes['(/)' + PageTypes.PROJECT_ARCHIVE.BASE + '/:id(/)'] = Global.ROUTE_NAME.PROJECT_ARCHIVE;
    routes['(/)' + PageTypes.PROJECT_ARCHIVE.BASE + '/:projectId/window-type/:id/' + PageTypes.WINDOW_TYPE.GLASS_CHECKLIST + '(/)'] = Global.ROUTE_NAME.GLASS_CHECKLIST_VIEW;
    routes['(/)' + PageTypes.PROJECT_ARCHIVE.BASE + '/:id/:subpage(/)'] = Global.ROUTE_NAME.PROJECT_ARCHIVE;

    routes['(/)' + PageTypes.PROJECT.BASE + '/:id/' + PageTypes.WINDOW_TYPE.BASE + '(/)'] = Global.ROUTE_NAME.WINDOW_TYPE;
    routes['(/)' + PageTypes.PROJECT.BASE + '/:id/' + PageTypes.WINDOW_TYPE.BASE + '/:subpage(/)'] = Global.ROUTE_NAME.WINDOW_TYPE;

    routes['(/)' + PageTypes.PROJECT.BASE + '/:id/' + PageTypes.WINDOW_TYPE.BASE + '/:subpage/' + PageTypes.WINDOW_TYPE.GLASS_CHECKLIST + '(/)'] = Global.ROUTE_NAME.GLASS_CHECKLIST;

    routes['(/)' + PageTypes.PROJECT.BASE + '(/)'] = Global.ROUTE_NAME.PROJECT;
    routes['(/)' + PageTypes.PROJECT.BASE + '/:id(/)'] = Global.ROUTE_NAME.PROJECT;
    routes['(/)' + PageTypes.PROJECT.BASE + '/:id/:subpage(/)'] = Global.ROUTE_NAME.PROJECT;

    routes['(/)' + PageTypes.CALCULATOR + '(/)'] = Global.ROUTE_NAME.ENERGY_CALCULATOR;
    routes['(/)' + PageTypes.WINDOW_TYPE.GLASS_CHECKLIST + '(/)'] = Global.ROUTE_NAME.GLASS_CHECKLIST;
    routes['*notFound'] = Global.ROUTE_NAME.NOT_FOUND;

    /**
     * @class RouterController
     * @extends Backbone.Router
     * Router Controller uses the Singleton pattern.
     */
    var RouterController = Backbone.Router.extend({

        /**
         * @type {object}
         */
        routes: routes,

        /**
         * Route patterns used to generate URLs.
         *
         * @type {object}
         */
        routePatterns: {
            'login': '/' + PageTypes.LOGIN + '/',
            'forgot-password': '/' + PageTypes.FORGOT_PASSWORD + '/',
            'register': '/' + PageTypes.REGISTER + '/:code/',

            'home': '/' + PageTypes.HOME + '/',
            'help': '/' + PageTypes.HELP + '/',

            'projects': '/' + PageTypes.PROJECT.BASE + '/',
            'project-new': '/' + PageTypes.PROJECT.BASE + '/' + PageTypes.PROJECT.NEW + '/',
            'project-view': '/' + PageTypes.PROJECT.BASE + '/:id/' + PageTypes.PROJECT.VIEW + '/',
            'project-edit': '/' + PageTypes.PROJECT.BASE + '/:id/' + PageTypes.PROJECT.EDIT + '/',

            'project-archives': '/' + PageTypes.PROJECT_ARCHIVE.BASE + '/',
            'project-archive-glass-checklist-view': '/' + PageTypes.PROJECT_ARCHIVE.BASE + '/:projectId/window-type/:id/' + PageTypes.WINDOW_TYPE.GLASS_CHECKLIST + '/',
            'project-archive-view': '/' + PageTypes.PROJECT_ARCHIVE.BASE + '/:id/' + PageTypes.PROJECT_ARCHIVE.VIEW + '/',

            'dealers': '/' + PageTypes.DEALER.BASE + '/',
            'dealer-new': '/' + PageTypes.DEALER.BASE + '/' + PageTypes.DEALER.NEW + '/',
            'dealer-view': '/' + PageTypes.DEALER.BASE + '/:id/' + PageTypes.DEALER.VIEW + '/',
            'dealer-edit': '/' + PageTypes.DEALER.BASE + '/:id/' + PageTypes.DEALER.EDIT + '/',

            'users': '/' + PageTypes.USER.BASE + '/',
            'user-new': '/' + PageTypes.USER.BASE + '/' + PageTypes.USER.NEW + '/',
            'user-view': '/' + PageTypes.USER.BASE + '/:id/' + PageTypes.USER.VIEW + '/',
            'user-edit': '/' + PageTypes.USER.BASE + '/:id/' + PageTypes.USER.VIEW + '/' + PageTypes.USER.EDIT + '/',
            'user-view-project': '/' + PageTypes.USER.BASE + '/:id/' + PageTypes.USER.VIEW + '/:projectid/',

            'window-types': '/' + PageTypes.PROJECT.BASE + '/:projectId/' + PageTypes.WINDOW_TYPE.BASE + '/',
            'window-type-new': '/' + PageTypes.PROJECT.BASE + '/:projectId/' + PageTypes.WINDOW_TYPE.BASE + '/' + PageTypes.WINDOW_TYPE.NEW + '/',
            'window-type-edit': '/' + PageTypes.PROJECT.BASE + '/:projectId/' + PageTypes.WINDOW_TYPE.BASE + '/:id/',

            'glass-checklist' : '/' + PageTypes.PROJECT.BASE + '/:projectId/' + PageTypes.WINDOW_TYPE.BASE + '/:id/' + PageTypes.WINDOW_TYPE.GLASS_CHECKLIST + '/',
            'glass-checklist-view': '/' + PageTypes.USER.BASE + '/:id/' + PageTypes.PROJECT.BASE + '/:projectId/' + PageTypes.WINDOW_TYPE.BASE + '/:windowId/' + PageTypes.WINDOW_TYPE.GLASS_CHECKLIST_VIEW + '/',

            'calculator' : '/' + PageTypes.CALCULATOR + '/',
            'checklist' : '/' + PageTypes.WINDOW_TYPE.GLASS_CHECKLIST + '/',
            'profile': '/' + PageTypes.PROFILE + '/'
        },

        /**
         * Generate a route by ID
         *
         * @param {string} id
         * @param {object} [params]
         * @param {boolean} [includeHash=true]
         * @returns {string}
         */
        generateUrl: function(id, params, includeHash) {
            params || (params = {});

            if (!this.routePatterns.hasOwnProperty(id)) {
                throw new Error('[RouterController] Invalid url ID: ' + id);
            }

            var url = this.routePatterns[id](params);

            if (includeHash !== false && !url.match(_fullUrlRegex)) {
                url = '#' + url;
            }

            return url;
        },

        /**
         * Create route generation methods
         *
         * @returns {RouterController}
         */
        initialize: function() {
            window.t = this;
            _.forOwn(this.routePatterns, function(value, key, obj) {
                obj[key] = _createURLGenerator(value);
            });

            return this;
        },

        /**
         * Start router. If route does not start with a `/`, add it
         *
         * @returns {RouterController}
         */
        start: function() {
            var fragment = this.getCurrentRoute();

            if (!fragment || fragment.indexOf('/') !== 0) {
                this.navigate('/' + fragment, { trigger: false, replace: true });
            }

            Backbone.history.start();

            return this;
        },

        /**
         * Get current url
         *
         * @returns {string}
         */
        getCurrentRoute: function() {
            return Backbone.history.fragment;
        },

        /**
         * Check if frag is a valid route ID. If so, generate the route.
         *
         * @param {string} frag
         * @param {object} [options]
         * @param {object} [otherOptions]
         * @returns {RouterController}
         */
        navigate: function(frag, options, otherOptions) {
            if (this.routePatterns.hasOwnProperty(frag)) {
                frag = this.generateUrl(frag, options, false);
                options = otherOptions;
            }

            return Backbone.Router.prototype.navigate.call(this, frag, options);
        },

        /**
         * Called before callback and events from a route a triggered
         * To cancel the route, return false
         *
         * @param {string} routeName Nmae of route specified in Backbone.Router.routes
         * @param {string} fragment Current url fragment
         * @param {Array} args Arguments extrapolated from fragment based on rout regex
         */
        validate: function(routeName, fragment, args) {
            //This function being set in the RootView.
        }

    });

    var router = new RouterController();

    _.mixin({

        /**
         * Underscore shortcut to RouterController.generateUrl
         *
         * @param {string} type
         * @param {object} [params]
         * @param {boolean} [includeHash=true]
         * @returns {string}
         */
        route: function(type, params, includeHash) {
            return router.generateUrl(type, params, includeHash);
        }
    });

    return router;

});
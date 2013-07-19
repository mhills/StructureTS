define(function(require) {
    'use strict';

    var ViewController = require('controllers/viewcontroller/ViewController');
    var PageTypes = require('constants/PageTypes');

    var UserProjectListLayoutView = require('views/userproject/UserProjectListLayoutView');
    var UserListView = require('views/user/UserListView');
    var UserEditView = require('views/user/UserEditView');
    var UserInviteView = require('views/user/UserInviteView');

    /**
     * Project views
     *
     * @type {object}
     */
    var views = {
        default: UserListView
    };

    views[PageTypes.USER.NEW] = UserInviteView;
    views[PageTypes.USER.EDIT] = UserEditView;
    views[PageTypes.USER.VIEW] = UserProjectListLayoutView;


    /**
     * @class UserProjectViewController
     * @extends ViewController
     */
    var UserProjectViewController = ViewController.extend({

        /**
         * @type {boolean}
         */
        views: views,

        /**
         * Check if userId is new, if so, set as subPage
         *
         * @param {object} options
         * @param {string} options.userId
         * @param {string} options.subPage
         * @returns {object}
         */
        parseOptions: function(options) {
            if (options.userId === PageTypes.USER.NEW) {
                options.subPage = options.userId;
                options.userId = null;
            }
            return options;
        }

    });

    return UserProjectViewController;

});
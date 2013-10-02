define(function(require) {
    'use strict';

    var PageTypes = require('constants/PageTypes');
    var ViewController = require('controllers/viewcontroller/ViewController');

    var ProjectListLayoutView = require('views/project/ProjectListLayoutView');
    var ProjectNewView = require('views/project/ProjectNewView');

    /**
     * Project views
     *
     * @type {object}
     */
    var views = {
        default: ProjectListLayoutView
    };

    views[PageTypes.PROJECT.NEW]  = ProjectNewView;
    // These are the same value as default, so unless they change, it is not needed to define them
//    views[PageTypes.PROJECT.LIST] = ProjectListLayoutView;
//    views[PageTypes.PROJECT.VIEW] = ProjectListLayoutView;

    /**
     * @class ProjectViewController
     * @extends ViewController
     */
    var ProjectViewController = ViewController.extend({

        /**
         * @type {boolean}
         */
        views: views,

        parseOptions: function(options) {
            if (options.projectId === PageTypes.PROJECT.NEW) {
                options.projectId = '';
                options.subPage = PageTypes.PROJECT.NEW;
            }
            return options;
        }

    });

    return ProjectViewController;

});
define(function(require) {
    'use strict';

    var PageTypes = require('constants/PageTypes');
    var ViewController = require('controllers/viewcontroller/ViewController');

    var ProjectArchiveListLayoutView = require('views/projectarchive/ProjectArchiveListLayoutView');

    /**
     * Project views
     *
     * @type {object}
     */
    var views = {
        default: ProjectArchiveListLayoutView
    };

    /**
     * @class ProjectArchiveViewController
     * @extends ViewController
     */
    var ProjectArchiveViewController = ViewController.extend({

        /**
         * @type {boolean}
         */
        views: views

    });

    return ProjectArchiveViewController;

});
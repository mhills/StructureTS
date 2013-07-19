define(function(require) {
    'use strict';

    var ViewController = require('controllers/viewcontroller/ViewController');

    var WindowTypeListLayoutView = require('views/windowType/WindowTypeLayoutView');

    /**
     * Project views
     *
     * @type {object}
     */
    var views = {
        default: WindowTypeListLayoutView
    };

    /**
     * @class WindowTypeViewController
     * @extends ViewController
     */
    var WindowTypeViewController = ViewController.extend({

        /**
         * @type {boolean}
         */
        views: views

    });

    return WindowTypeViewController;

});
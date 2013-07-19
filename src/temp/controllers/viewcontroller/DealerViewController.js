define(function(require) {
    'use strict';

    var PageTypes = require('constants/PageTypes');
    var ViewController = require('controllers/viewcontroller/ViewController');

    var DealerListView = require('views/dealer/DealerListView');
    var DealerEditView = require('views/dealer/DealerEditView');
    var DealerNewView = require('views/dealer/DealerNewView');
    var DealerUsersView = require('views/dealer/DealerUsersView');

    /**
     * Project views
     *
     * @type {object}
     */
    var views = {
        default: DealerListView
    };

    views[PageTypes.DEALER.EDIT] = DealerEditView;
    views[PageTypes.DEALER.NEW]  = DealerNewView;
    views[PageTypes.DEALER.VIEW]  = DealerUsersView;

    /**
     * @class DealerViewController
     * @extends ViewController
     */
    var DealerViewController = ViewController.extend({

        /**
         * @type {object}
         */
        views: views,

        parseOptions: function(options) {
            if (options.dealerId === PageTypes.DEALER.NEW) {
                options.dealerId = '';
                options.subPage = PageTypes.DEALER.NEW;
            }
            return options;
        }

    });

    return DealerViewController;

});
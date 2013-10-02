define(function(require) {
    "use strict"

    var Event = require('components/events/Event');
    var AppView = require('views/AppView');
    var ProjectGetRequest = require('requests/project/ProjectGetRequest');
    var LoadingView = require('views/LoadingView');
    var GlassChecklistView = require('views/glasschecklist/GlassChecklistView');

    /**
     * @class GlassChecklistViewController
     */
    var GlassChecklistViewController = AppView.extend({

        _loadingView: null,
        _projectRequest: null,
        _glassChecklist: null,

        initialize: function(options) {
            AppView.prototype.initialize.call(this);

            if (this._projectRequest) {
                this._projectRequest.abort();
            }

            this._projectRequest = new ProjectGetRequest();

            this._projectRequest
                .on(Event.REQUEST_SUCCESS, this.onLoadProject, this)
                .setData({
                    id: options.projectId,
                    token: options.controller.getSessionToken()
                })
                .load();
        },

        createChildren: function() {
            this._loadingView = new LoadingView();
            this.addChild(this._loadingView);
        },

        onLoadProject: function(project) {
            this._projectRequest = null;

            this.removeChild(this._loadingView);

            this._glassChecklist = new GlassChecklistView({
                archiveView: !this.options.userId,
                controller: this.options.controller,
                projectId: this.options.projectId,
                windowTypeId: this.options.windowTypeId,
                projectVO: project
            });

            this.addChild(this._glassChecklist);
            this._glassChecklist.enabled(true);

            return this;
        }

    });

    return GlassChecklistViewController;
});
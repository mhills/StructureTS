define(function(require) {
    "use strict"

    var Event = require('components/events/Event');
    var BaseController = require('components/controllers/BaseController');
    var UserRegisterRequest = require('requests/UserRegisterRequest');
    var RequestMethodType = require('components/requests/RequestMethodType');
    var RegisterView = require('views/login/RegisterView');
    var UserProfileVO = require('models/valueobjects/user/UserProfileVO');

    /**
     * @class RegisterViewController
     */
    var RegisterViewController = BaseController.extend({

        view: null,
        rootView: null,
        registerCode: null,
        registerRequest: null,

        initialize: function(options) {
            BaseController.prototype.initialize.call(this);

            this.rootView = options.rootView;
            this.registerCode = options.code;

            this.registerRequest = new UserRegisterRequest();
            this.registerRequest.requestType = RequestMethodType.GET;
            this.registerRequest
                .on(Event.REQUEST_SUCCESS, this.onValidRegisterCodeHandler)
                .setData({ code: this.registerCode })
                .load();
        },

        onValidRegisterCode: function(event) {
            var userProfileVO = new UserProfileVO(this.registerRequest.data.user);

            this.view = new RegisterView({userProfileVO: userProfileVO, code: this.registerCode});
            this.rootView.changeView(this.view);

            this.registerRequest
                .off(Event.REQUEST_SUCCESS)
                .destroy();
        },

        setupHandlers: function() {
            /**
             * onValidRegisterCode handler
             * @name UserEditView#onValidRegisterCodeHandler
             * @function
             */
            this.onValidRegisterCodeHandler = this.onValidRegisterCode.bind(this);
        },

        destroy: function() {
            this.options = null;
            this.view = null;
            this.rootView = null;
            this.registerRequest.destroy();
            this.registerRequest = null;
        }

    });

    return RegisterViewController;
});
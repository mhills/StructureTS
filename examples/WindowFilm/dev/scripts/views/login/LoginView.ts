///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

/**
 * YUIDoc_comment
 *
 * @class LoginView
 * @constructor
 **/
class LoginView extends DOMElement {

    public CLASS_NAME:string = 'LoginView';

    constructor() {
        super();
    }

    public createChildren():DOMElement {
        super.createChildren('templates/login/LoginTemplate.tpl', {title: 'Sign In'});

        return this;
    }

}


//define(function(require) {
//        "use strict"
//
//        var Event = require('components/events/Event');
//        var AppView = require('views/AppView');
//        var LoginTemplate = require('tpl!templates/login/LoginTemplate.tpl');
//
//        var AuthenticateVO = require('models/valueobjects/user/AuthenticateVO');
//        var UserVO = require('models/valueobjects/user/UserVO');
//
//        var LoginRequest = require('requests/LoginRequest');
//        var RouterController = require('controllers/RouterController');
//
//        /**
//         * @class LoginView
//         */
//        var LoginView = AppView.extend({
//
//            PAGE_TITLE: ' ',
//
//            appController: null,
//            loginRequest: null,
//
//            loginForm: null,
//
//            initialize: function(options) {
//                this.setElement( LoginTemplate({title: 'Sign In'}) );
//
//                this.appController = options.controller;
//
//                AppView.prototype.initialize.call(this);
//            },
//
//            createChildren: function() {
//                this.loginRequest = new LoginRequest();
//
//                this.loginForm = this.getChild('#js-login-form');
//
//                return this;
//            },
//
//            render: function() {
//                return this;
//            },
//
//            enabled: function(state) {
//                state = state !== false;
//
//                if (state === this.isEnabled) {
//                    return this;
//                }
//
//                if (state) {
//                    this.loginForm.$on('submit', this.loginButtonHandler.bind(this));
//                    this.loginRequest.on(Event.REQUEST_SUCCESS, this.onLoginSuccess.bind(this));
//                } else {
//                    this.loginForm.$off('submit');
//                    this.loginRequest.off(Event.REQUEST_SUCCESS);
//                }
//
//                this.loginForm.enabled(state)
//
//                AppView.prototype.enabled.call(this, state);
//                return this;
//            },
//
//            loginButtonHandler: function(event) {
//                event.preventDefault();
//
//                var isValid = this.loginForm.$el.validate()
//                    .form();
//
//                if(isValid){
//                    var formData = this.loginForm.$el.serializeObject();
//                    var authenticateVO = new AuthenticateVO(formData);
//                    this.loginRequest.setData(authenticateVO).load();
//                }
//            },
//
//            /**
//             * Data received from the success of the loginRequest.
//             * @param data {Object}
//             * @param data.user {Object}
//             * @param data.userSession {Object}
//             */
//            onLoginSuccess: function(data) {
//                this.appController.setUser( new UserVO(data.user) );
//                this.appController.setUserSession(data.userSession);
//
//                var redirectRoute = this.appController.redirectRoute;
//                if (redirectRoute) {
//                    this.appController.gotoRedirectRoute();
//                } else {
//                    RouterController.navigate('home', { replace: true, trigger: true });
//                }
//            }
//
//        });
//
//        return LoginView;
//    }
//);
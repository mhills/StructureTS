define(function(require) {
        'use strict';

        var Backbone = require('backbone');
        var Add2Home = require('add2Home');

        var Global = require('constants/Global');
        var UserVODataMap = require('json!data/datamap/UserVO.json');

        var BaseView = require('components/views/BaseView');
        var RouterController = require('controllers/RouterController');
        var StringUtil = require('components/utils/StringUtil');
        var TopNavigationView = require('views/topbar/TopNavigationView');
        var GlassChecklistView = require('views/glasschecklist/GlassChecklistView');
        var ProfileEditView = require('views/profile/ProfileEditView');
        var ForgotPasswordView = require('views/login/ForgotPasswordView');
        var ResetPasswordView = require('views/login/ResetPasswordView');
        var LoginView = require('views/login/LoginView');
        var HomeView = require('views/home/HomeView');
        var HelpView = require('views/help/HelpView');
        var EnergyCalculatorCommercialUsaView = require('views/calculator/EnergyCalculatorCommercialUsaView');

        var PageTypes = require('constants/PageTypes');

        var AccessController = require('controllers/AccessController');
        var RegisterViewController = require('controllers/viewcontroller/RegisterViewController');
        var ProjectViewController = require('controllers/viewcontroller/ProjectViewController');
        var ProjectArchiveViewController = require('controllers/viewcontroller/ProjectArchiveViewController');
        var DealerViewController = require('controllers/viewcontroller/DealerViewController');
        var WindowTypeViewController = require('controllers/viewcontroller/WindowTypeViewController');
        var GlassChecklistViewController = require('controllers/viewcontroller/GlassChecklistViewController');
        var UserViewController = require('controllers/viewcontroller/UserViewController');

        var NetworkMonitor = require('components/net/NetworkMonitor');
        var NetworkMonitorEvent = require('components/events/NetworkMonitorEvent');
        var ModalEvent = require('events/ModalEvent');

        /**
         * @class RootView
         */
        var RootView = BaseView.extend({

            appController: null,

            topBar: null,
            contentContainer: null,

            currentViewController: null,
            currentView: null,

            initialize: function(options) {
                this.appController = options.controller;
                this.accessSetup();

                this.topBar = new TopNavigationView({controller: this.appController});
                this.topBar.enabled(true);
                this.addChild(this.topBar);

                this.contentContainer = new BaseView();
                this.addChild(this.contentContainer);

                RouterController.validate = this.validRoute.bind(this);

                RouterController.on('route:' + Global.ROUTE_NAME.LOGIN, this.loginRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.HOME, this.homeRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.HELP, this.helpRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.USER, this.userRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.DEALER, this.dealerRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.REGISTER, this.registerRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.EDIT_PROFILE, this.editProfileRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.RESET_PASSWORD, this.resetPasswordRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.FORGOT_PASSWORD, this.forgotPasswordRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.PROJECT, this.projectRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.PROJECT_ARCHIVE, this.projectArchiveRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.WINDOW_TYPE, this.windowTypeRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.ENERGY_CALCULATOR, this.energyCalculatorRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.GLASS_CHECKLIST, this.glassChecklistRoute.bind(this));
                RouterController.on('route:' + Global.ROUTE_NAME.GLASS_CHECKLIST_VIEW, this.glassChecklistViewRoute.bind(this));
                //RouterController.on('route:' + Global.ROUTE_NAME.NOT_FOUND, this.notFoundRoute.bind(this));
                RouterController.start();

                this.$el.on('tap', '.online-only', this.onOnlineOnlyHandler.bind(this));
            },

            loginRoute: function() {
                if (!this.isUserLoggedIn()) {
                    var loginView = new LoginView({controller: this.appController});
                    this.changeView(loginView);
                } else {
                    RouterController.navigate('home', { replace: true, trigger: true });
                }

                Add2Home.show();
            },

            onOnlineOnlyHandler: function(event) {
                if (!NetworkMonitor.connected()) {
                    event.preventDefault();

                    Backbone.trigger(ModalEvent.OFFLINE, new ModalEvent(ModalEvent.OFFLINE, this));
                }
            },

            notFoundRoute: function() {
                this.loginRoute();
            },

            homeRoute: function() {
                if (!this.isUserLoggedIn()) return;

                var homeView = new HomeView({controller: this.appController});
                this.changeView(homeView);
            },

            helpRoute: function() {
                if (!this.isUserLoggedIn()) return;

                var helpView = new HelpView({controller: this.appController});
                this.changeView(helpView);
            },

            registerRoute: function(code) {
                this.currentViewController = new RegisterViewController({controller: this.appController, rootView: this, code: code})
            },

            resetPasswordRoute: function(code) {
                var resetPasswordView = new ResetPasswordView({controller: this.appController, code: code});
                this.changeView(resetPasswordView);
            },

            forgotPasswordRoute: function() {
                var forgotPasswordView = new ForgotPasswordView({controller: this.appController});
                this.changeView(forgotPasswordView);
            },

            editProfileRoute: function(userId) {
                if (!this.isUserLoggedIn()) return;

                var profileEditView = new ProfileEditView({controller: this.appController, userId: userId});
                this.changeView(profileEditView);
            },

            userRoute: function(userId, subPage, projectId) {
                if (!this.isUserLoggedIn()) {
                    return this;
                }

                var options = {
                    controller: this.appController,
                    subPage: subPage,
                    userId: userId,
                    projectId: projectId
                };

                if (this.currentView instanceof UserViewController) {
                    this.currentView.update(options);
                } else {
                    this.changeView(new UserViewController(options));
                }

                return this;
            },

            dealerRoute: function(dealerId, subPage) {
                if (!this.isUserLoggedIn()) return this;

                var options = {
                    controller: this.appController,
                    subPage: subPage,
                    dealerId: dealerId
                };

                if (this.currentView instanceof DealerViewController) {
                    this.currentView.update(options);
                } else {
                    this.changeView(new DealerViewController(options));
                }

                return this;
            },

            /**
             * @param projectId
             * @param subPage
             */
            projectRoute: function(projectId, subPage) {
                if (!this.isUserLoggedIn()) return this;

                var options = {
                    controller: this.appController,
                    subPage: subPage,
                    projectId: projectId
                };

                if (this.currentView instanceof ProjectViewController) {
                    this.currentView.update(options);
                } else {
                    this.changeView(new ProjectViewController(options));
                }

                return this;
            },

            /**
             * @param projectId
             * @param subPage
             */
            projectArchiveRoute: function(projectId, subPage) {
                if (!this.isUserLoggedIn()) return this;

                var options = {
                    controller: this.appController,
                    subPage: subPage,
                    projectId: projectId
                };

                if (this.currentView instanceof ProjectArchiveViewController) {
                    this.currentView.update(options);
                } else {
                    this.changeView(new ProjectArchiveViewController(options));
                }

                return this;
            },

            /**
             * @param projectId
             * @param subPage
             */
            windowTypeRoute: function(projectId, subPage) {
                if (!this.isUserLoggedIn()) return this;

                var options = {
                    controller: this.appController,
                    subPage: subPage,
                    projectId: projectId
                };

                if (this.currentView instanceof WindowTypeViewController) {
                    this.currentView.update(options);
                } else {
                    this.changeView(new WindowTypeViewController(options));
                }

                return this;
            },

            glassChecklistRoute: function(projectId, windowTypeId) {
                if (!this.isUserLoggedIn()) return;

                var project = this.appController.getProjectById(projectId);

                var glassChecklistView = new GlassChecklistView({
                    controller: this.appController,
                    projectId: projectId,
                    windowTypeId: windowTypeId,
                    projectVO: project
                });

                this.changeView(glassChecklistView);
            },

            glassChecklistViewRoute: function(userId, projectId, windowTypeId) {
                if (!this.isUserLoggedIn()) return;

                if (!windowTypeId) {
                    windowTypeId = projectId;
                    projectId = userId;
                    userId = null;
                }

                var glassChecklistView = new GlassChecklistViewController({
                    controller: this.appController,
                    userId: userId,
                    projectId: projectId,
                    windowTypeId: windowTypeId
                });

                this.changeView(glassChecklistView);
            },

            energyCalculatorRoute: function() {
                var energyCalculator = new EnergyCalculatorCommercialUsaView() ;
                this.changeView(energyCalculator);
            },

            changeView: function(view) {
                //If the current view exists then do anything.
                //If there is a current view the disable it and then remove it.
                //Enable a new view and add it to the contentContainer.
                if (this.currentView != view) {

                    if (this.currentView) {
                        this.contentContainer.removeChild(this.currentView);
                        if (this.currentView.destroy) {
                            this.currentView.destroy();
                        }
                    }

                    if (this.currentViewController && this.currentViewController.view !== view) {
                        this.currentViewController.destroy();
                        this.currentViewController = null;
                    }

                    this.currentView = view;
                    this.currentView.enabled(true);
                    this.contentContainer.addChild(this.currentView);
                }

                return this;
            },

            isUserLoggedIn : function() {
                var isValidUserSession = !!this.appController.isUserLoggedIn();
                if (!isValidUserSession) {
                    RouterController.navigate('login/', true);
                }
                return isValidUserSession;
            },

            validRoute: function(routeName, fragment, args) {
                var pass = true;

                var userVO = this.appController.getUser();
                if (userVO) {
                    pass = AccessController.allow(routeName, userVO.get('role'));
                }

                //console.log('validRoute', routeName, fragment, args, 'pass:', pass)
                return pass;
            },

            /**
             * Main setup area for access levels throughout application.
             * @returns {AppController}
             */
            accessSetup: function() {
                var role = UserVODataMap.ROLE;

                AccessController.grant(Global.ROUTE_NAME.USER, [role.super_admin, role.admin, role.dealer_sales_manager]);
                AccessController.grant(Global.ROUTE_NAME.DEALER, [role.super_admin, role.admin]);
                AccessController.grant(Global.DEALER_CODE_REQUIRED, [role.dealer_sales_manager, role.dealer_sales_user]);

                return this;
            }

        });

        return RootView;
    }
);
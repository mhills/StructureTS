///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/controller/RouterController.ts'/>

///<reference path='footer/FooterView.ts'/>
///<reference path='header/HeaderView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import RouterController = StructureTS.RouterController;

    export class RootView extends DOMElement
    {
        /**
         * @overridden DisplayObjectContainer.CLASS_NAME
         */
        public CLASS_NAME:string = 'RootView';

        private _router:RouterController = null;

        private _headerView:HeaderView = null;
        private _contentContainer:DOMElement = null;
        private _footerView:FooterView = null;

        private _currentView:DOMElement = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden DisplayObjectContainer.createChildren
         */
        public createChildren():void
        {
            super.createChildren('div', {"id": "pageWrapper"});

            this._headerView = new HeaderView();
            this.addChild(this._headerView);

            this._contentContainer = new DOMElement('div');
            this.addChild(this._contentContainer);

            this._footerView = new FooterView();
            this.addChild(this._footerView);


            this._router = new RouterController();
            this._router.addRoute('', this.homeRouterHandler, this);
//            this._router.addRoute(RoutePath.HOME.BASE, this.homeRouterHandler, this);
//            this._router.addRoute(RoutePath.PRODUCT.BASE, this.filtekProductsRouterHandler, this);
//            this._router.addRoute(RoutePath.PRODUCT.BASE + ':product:', this.productRouterHandler, this);
//            this._router.addRoute(RoutePath.CLASSES.BASE + '{class}', this.classRouterHandler, this);
//            this._router.addRoute('{?query}', this.resetRouterHandler, this);
            this._router.start();
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        public layoutChildren():void
        {
//            this._titleBar.layoutChildren();
//
//            if (this._currentView)
//            {
//                this._currentView.layoutChildren();
//            }
        }

        /**
         * @overridden DisplayObjectContainer.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

//            this.addEventListener(RouterEvent.CHANGE, this.changeRoute, this);
//
//            this._titleBar.enable();
//
//            this._subNav.addEventListener(BaseEvent.CHANGE, this.onSubNavChange, this);
//            this._subNav.enable();

            super.enable();
        }

        /**
         * @overridden DisplayObjectContainer.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

//            this.removeEventListener(RouterEvent.CHANGE, this.changeRoute, this);
//
//            this._titleBar.enable();
//
//            this._subNav.removeEventListener(BaseEvent.CHANGE, this.onSubNavChange, this);
//            this._subNav.enable();

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

//            this._titleBar.destroy();
//            this._titleBar = null;
//            this._subNav.destroy();
//            this._subNav = null;
//            this._contentContainer.destroy();
//            this._contentContainer = null;
//            this._router.destroy();
//            this._router = null;
//            this._transitionManager.destroy();
//            this._transitionManager = null;
//            this._currentView.destroy();
//            this._currentView = null;
        }

//        private changeRoute(event:RouterEvent):void
//        {
//            event.stopPropagation();
//            this._direction = event.data || TransitionType.PUSH_DOWN;
//
//            this._router.navigateTo(event.url, event.silent);
//        }

        private homeRouterHandler():void
        {
            if (!(this._currentView instanceof DOMElement))
            {
                var view:DOMElement = new DOMElement('templates/home/homeTemplate.hbs');
                this.changeView(view);
            }
        }
//
//        private filtekProductsRouterHandler():void
//        {
//            if (!(this._currentView instanceof FiltekProductsViewController))
//            {
//                var view:FiltekProductsViewController = new FiltekProductsViewController();
//                this.changeView(view);
//            }
//            this._currentView.update();
//        }
//
//        private productRouterHandler(id:number = null):void
//        {
//            if (!(this._currentView instanceof ProductViewController))
//            {
//                var view:ProductViewController = new ProductViewController();
//                this.changeView(view);
//            }
//            this._currentView.update(id);
//        }
//
//        private classRouterHandler(classId:string):void
//        {
//            if (!(this._currentView instanceof ClassViewController))
//            {
//                var view:ClassViewController = new ClassViewController();
//                this.changeView(view);
//            }
//            this._currentView.update(classId);
//        }
//
//        private resetRouterHandler(queryObject:any):void
//        {
//            if (queryObject.reset === false) return;
//
//            var yesNo:boolean = confirm("Are you sure you want to reset the application?");
//            if (yesNo === true)
//            {
//                localStorage.clear();
//                this._router.navigateTo(RoutePath.HOME.BASE);
//                window.location.reload();
//            }
//        }
//
        private changeView(view:DOMElement):void
        {
            if (this._currentView)
            {
                this.removeChild(this._currentView)
            }

            this._currentView = view;
            this.addChildAt(this._currentView, 1);
        }
//
//        private hideShowSubNav():void
//        {
//            if (this._currentView instanceof HomeViewController)
//            {
//                this._titleBar.show();
//                this._subNav.hideUpArrow();
//                this._subNav.hideSideArrows();
//            }
//            else if (this._currentView instanceof FiltekProductsViewController)
//            {
//                this._titleBar.hide();
//                this._subNav.showUpArrow();
//                this._subNav.hideSideArrows();
//            }
//            else
//            {
//                this._titleBar.hide();
//                this._subNav.showUpArrow();
//                this._subNav.showSideArrows();
//            }
//        }
//
//        private onSubNavChange(event:BaseEvent):void
//        {
//            switch (event.data)
//            {
//                case 'up':
//                    this._currentView.up();
//                    break;
//                case 'right':
//                    this._currentView.next();
//                    break;
//                case 'left':
//                    this._currentView.previous();
//                    break;
//            }
//        }

    }
}
///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/controller/RouterController.ts'/>

///<reference path='footer/FooterView.ts'/>
///<reference path='header/HeaderView.ts'/>
///<reference path='about/AboutView.ts'/>
///<reference path='contact/ContactView.ts'/>
///<reference path='home/HomeView.ts'/>
///<reference path='menu/MenuView.ts'/>
///<reference path='services/ServicesView.ts'/>

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

            this._footerView = new FooterView();
            this.addChild(this._footerView);

            this._router = new RouterController();
            this._router.addRoute('', this.homeRouterHandler, this);
            this._router.addRoute('home/', this.homeRouterHandler, this);
            this._router.addRoute('about/', this.aboutRouterHandler, this);
            this._router.addRoute('contact/', this.contactRouterHandler, this);
            this._router.addRoute('services/', this.servicesRouterHandler, this);
            this._router.addRoute('menu/', this.menuRouterHandler, this);
//            this._router.addRoute('{?query}', this.resetRouterHandler, this);
            this._router.start();
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        public layoutChildren():void
        {
            if (this._currentView)
            {
                this._currentView.layoutChildren();
            }
        }

        /**
         * @overridden DisplayObjectContainer.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @overridden DisplayObjectContainer.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._router.destroy();
            this._router = null;
            this._currentView.destroy();
            this._currentView = null;
        }

        private homeRouterHandler():void
        {
            if (!(this._currentView instanceof HomeView))
            {
                var view:HomeView = new HomeView();
                this.changeView(view);
            }
        }

        private aboutRouterHandler():void
        {
            if (!(this._currentView instanceof AboutView))
            {
                var view:AboutView = new AboutView();
                this.changeView(view);
            }
        }

        private contactRouterHandler():void
        {
            if (!(this._currentView instanceof ContactView))
            {
                var view:ContactView = new ContactView();
                this.changeView(view);
            }
        }

        private servicesRouterHandler():void
        {
            if (!(this._currentView instanceof ServicesView))
            {
                var view:ServicesView = new ServicesView();
                this.changeView(view);
            }
        }

        private menuRouterHandler():void
        {
            if (!(this._currentView instanceof MenuView))
            {
                var view:MenuView = new MenuView();
                this.changeView(view);
            }
        }

        private changeView(view:DOMElement):void
        {
            if (this._currentView)
            {
                this.removeChild(this._currentView);
            }

            this._currentView = view;
            this.addChildAt(this._currentView, 1);
        }

    }
}
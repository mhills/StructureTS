///<reference path='../com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../com/codebelt/structurets/controller/RouterController.ts'/>
///<reference path='../com/codebelt/structurets/controller/TransitionManager.ts'/>
///<reference path='../com/codebelt/structurets/constants/TransitionType.ts'/>
///<reference path='../com/codebelt/structurets/events/RouterEvent.ts'/>

///<reference path='Windows8View.ts'/>
///<reference path='../constants/RoutePath.ts'/>

/**
 * The RootView main view container for the whole application and manages which
 * subviews should be displayed.
 *
 * @class RootView
 * @extends DOMElement
 * @constructor
 **/
class RootView extends Windows8View {

    /**
     * @copy DisplayObjectContainer.CLASS_NAME
     */
    public CLASS_NAME:string = 'RootView';

    /**
     * A reference to the container that will be used to help manage the transitions to different page views.
     *
     * @property _contentContainer
     * @type {DOMElement}
     * @private
     */
    private _contentContainer:DOMElement = null;

    /**
     * A reference the the router controller.
     *
     * @property _router
     * @type {RouterController}
     * @private
     */

    private _router:RouterController = null;

    /**
     * A reference to the transition manager to help animate the main page views on and off the stage.
     *
     * @property _transitionManager
     * @type {TransitionManager}
     * @private
     */
    private _transitionManager:TransitionManager = null;

    /**
     * A reference to the current page view which all the of the page vies extend HondaViewController.
     *
     * @property _currentView
     * @type {HondaViewController}
     * @private
     */
    private _currentView:HondaViewController = null;

    /**
     * A reference to the current transition type.
     *
     * @property _direction
     * @type [string]
     * @default TransitionType.PUSH_DOWN
     * @private
     */
    private _direction:string = TransitionType.PUSH_LEFT;


    private _nav:MainNavView = null;

    constructor() {
        super();
    }

    /**
     * @copy DisplayObjectContainer.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren('div', {"class": "wrapper"});

        this._contentContainer = new DOMElement('div', {id: 'contentContainer'});
        this._contentContainer.setSize(1920, 900);
        this.addChild(this._contentContainer);

        this._nav = new MainNavView();
        this.addChild(this._nav);

        this._transitionManager = new TransitionManager(this._contentContainer);

        this._router = new RouterController();
        this._router.addRoute('', this.modelLinesRouterHandler, this);
        this._router.addRoute(RoutePath.ADMIN.BASE, this.adminRouterHandler, this);
        this._router.addRoute(RoutePath.MODEL_LINES.BASE, this.modelLinesRouterHandler, this);
        this._router.addRoute(RoutePath.DEALER_LOCATOR.BASE, this.dealerLocatorRouterHandler, this);
        this._router.addRoute(RoutePath.DEALER_CONTACT.BASE, this.dealerContactRouterHandler, this);
        this._router.addRoute(RoutePath.REQUEST_BROCHURE.BASE, this.requestBrochureRouterHandler, this);
        this._router.addRoute(RoutePath.TECHNOLOGY.BASE, this.technologyRouterHandler, this);
        this._router.addRoute(RoutePath.VISIT.BASE, this.visitRouterHandler, this);
        this._router.addRoute(RoutePath.ENTER_CONTEST.BASE, this.enterContestRouterHandler, this);
        this._router.start();
    }

    /**
     * @copy DOMElement.layoutChildren
     * @overridden
     */
    public layoutChildren():void {
        if (this._currentView) {
            this._currentView.layoutChildren();
        }
    }

    /**
     * @copy DisplayObjectContainer.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        this.addEventListener(RouterEvent.CHANGE, this.changeRoute, this);

        this._nav.enable();

        super.enable();
    }

    /**
     * @copy DisplayObjectContainer.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this.removeEventListener(RouterEvent.CHANGE, this.changeRoute, this);

        this._nav.disable();

        super.disable();
    }

    /**
     * @copy DOMElement.destroy
     * @overridden
     */
    public destroy():void {
        super.destroy();

        this._contentContainer.destroy();
        this._contentContainer = null;
        this._router.destroy();
        this._router = null;
        this._transitionManager.destroy();
        this._transitionManager = null;
        this._currentView.destroy();
        this._currentView = null;
    }

    /**
     * Event handler for the RouterEvent. Child views can dispatch events that bubble up to this one
     * method to tell the router to navigate to a new page.
     *
     * @method changeRoute
     * @param event {RouterEvent}
     * @private
     */
    private changeRoute(event:RouterEvent) {
        event.stopPropagation();
        this._direction = event.data || TransitionType.PUSH_LEFT;
        this._router.navigateTo(event.url, event.silent);
    }

    private adminRouterHandler():void
    {
        if (!(this._currentView instanceof AdminViewController)) {
            var view:AdminViewController = new AdminViewController();
            this.changeView(view);
        }
        this._currentView.update();
    }

    private modelLinesRouterHandler():void
    {
        if (!(this._currentView instanceof ModelLinesViewController)) {
            var view:ModelLinesViewController = new ModelLinesViewController();
            this.changeView(view);
        }
        this._currentView.update();
    }

    private dealerLocatorRouterHandler():void
    {
        if (!(this._currentView instanceof DealerLocatorViewController)) {
            var view:DealerLocatorViewController = new DealerLocatorViewController();
            this.changeView(view);
        }
        this._currentView.update();
    }

    private dealerContactRouterHandler():void
    {
        if (!(this._currentView instanceof DealerContactViewController)) {
            var view:DealerContactViewController = new DealerContactViewController();
            this.changeView(view);
        }
        this._currentView.update();
    }

    private requestBrochureRouterHandler():void
    {
        if (!(this._currentView instanceof RequestBrochureViewController)) {
            var view:RequestBrochureViewController = new RequestBrochureViewController();
            this.changeView(view);
        }
        this._currentView.update();
    }

    private technologyRouterHandler():void
    {
        if (!(this._currentView instanceof TechnologyViewController)) {
            var view:TechnologyViewController = new TechnologyViewController();
            this.changeView(view);
        }
        this._currentView.update();
    }

    private visitRouterHandler():void
    {
        if (!(this._currentView instanceof VisitViewController)) {
            var view:VisitViewController = new VisitViewController();
            this.changeView(view);
        }
        this._currentView.update();
    }

    private enterContestRouterHandler():void
    {
        if (!(this._currentView instanceof EnterContestViewController)) {
            var view:EnterContestViewController = new EnterContestViewController();
            this.changeView(view);
        }
        this._currentView.update();
    }

    /**
     * This method is responsible for transiting the current view of the stage and animating the new view onto the stage.
     *
     * @method changeView
     * @param view {HondaViewController}
     * @private
     */
    private changeView(view:HondaViewController):void
    {
        view.setSize(this._contentContainer.unscaledWidth, this._contentContainer.unscaledHeight);

        if (this._currentView) {
            this._transitionManager.transitionToNextView(view, this._direction);
        } else {
            this._transitionManager.setCurrentView(view);
        }

        this._currentView = view;
    }
}
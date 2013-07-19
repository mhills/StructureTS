///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/controller/RouterController.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/utils/HtmlLoader.ts'/>

///<reference path='home/HomeView.ts'/>
///<reference path='artists/ArtistsView.ts'/>
///<reference path='contact/ContactView.ts'/>
///<reference path='about/AboutView.ts'/>

class MainView extends DOMElement {

    private _router:RouterController = null;
    private _currentView:DOMElement = null;
    private _homeView:HomeView = null;
    private _artistsView:ArtistsView = null;
    private _contactView:ContactView = null;
    private _aboutView:AboutView = null;

    constructor(type:string, params:any, router:RouterController)
    {
        super(type, params);

        this._router = router;
    }

    public createChildren():void
    {
        super.createChildren();

        this._homeView = new HomeView();
        this._artistsView = new ArtistsView();
        this._contactView = new ContactView();
        this._aboutView = new AboutView();

        this.setupRoutes();
    }

    public layoutChildren():void
    {
    }

    public setupRoutes():void
    {
        this._router.addRoute("", this.homeRouterHandler, this);
        this._router.addRoute("home", this.homeRouterHandler, this);
        this._router.addRoute('about/{id}', this.aboutMeRouterHandler, this);
        this._router.addRoute('artists/:name:/:album:', this.artistsRouterHandler, this);
        this._router.addRoute('contact{?query}', this.contactRouterHandler, this);
        this._router.start();
    }

    /**
     * @copy DisplayObject.enable
     */
    public enable():void {
        if (this.isEnabled === true) return;

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     */
    public disable():void {
        if (this.isEnabled === false) return;

        super.disable();
    }

    private homeRouterHandler():void
    {
        console.log("homeRouterHandler", arguments)
        this.changeViewTo(this._homeView);
    }

    private aboutMeRouterHandler():void
    {
        console.log("aboutMeRouterHandler", arguments)
        this.changeViewTo(this._aboutView);
    }

    private artistsRouterHandler(artist?:number, album?:number):void
    {
        console.log("artistsRouterHandler", artist, album)

        this.changeViewTo(this._artistsView);
        this._artistsView.update(artist, album);
    }

    private contactRouterHandler():void
    {
        console.log("contactRouterHandler", arguments)
        this.changeViewTo(this._contactView);
    }

    private changeViewTo(view:DOMElement):void
    {
        if (this._currentView) {
            this._currentView.disable();
            this.removeChild(this._currentView);
        }

        this._currentView = view;
        this.addChild(this._currentView);
        this._currentView.enable();
    }
}
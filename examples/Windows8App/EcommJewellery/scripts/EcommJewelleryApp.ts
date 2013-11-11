///<reference path='com/codebelt/structurets/display/Stage.ts'/>
///<reference path='com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='com/codebelt/structurets/events/LoaderEvent.ts'/>

///<reference path='_declare/SQLite3JS.d.ts'/>
///<reference path='_declare/plugins.d.ts'/>
///<reference path='_declare/externalClasses.d.ts'/>

///<reference path='controllers/WinJSController.ts'/>
///<reference path='views/RootView.ts'/>
///<reference path='events/ModalEvent.ts'/>

/**
 *
 * @class HondaApp
 * @extends Stage
 * @constructor
 **/
class HondaApp extends Stage {

    /**
     * @copy Stage.CLASS_NAME
     */
    public CLASS_NAME:string = 'HondaApp';

    /**
     * The RootView contains all the children views for the application.
     *
     * @property _rootView
     * @type {RootView}
     * @private
     */
    private _rootView:RootView = null;

    private _preloader:DOMElement = null;

    private _winJSController:WinJSController = null;

    constructor() {
        super();

        //Used to handle Surface scaling issues.
        if (window.screen.availWidth != 1371) {
            $('#js-screenSurface').remove();
        }

        this._winJSController = new WinJSController();
        this._winJSController.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onAppDataLoaded, this);
    }

    /**
     * @copy DOMElement.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren();

        this._preloader = new DOMElement('templates/preloader/AppPreloaderTemplate.hbs');
        this.addChild(this._preloader);

//        this._modalController = new ModalController(this);
    }

    /**
     * @copy DOMElement.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        if (this._rootView) {
            this._rootView.enable();
        }

        super.enable();
    }

    /**
     * @copy DOMElement.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this._rootView.disable();

        super.disable();
    }

    /**
     * @copy DOMElement.destroy
     * @overridden
     */
    public destroy():void {
        super.destroy();

        this._rootView.destroy();
        this._rootView = null;
    }

    private onAppDataLoaded(event:LoaderEvent) {
        this._rootView = new RootView;
        this.addChild(this._rootView);
        this._rootView.enable();

        this.removeChild(this._preloader);
        this._preloader.destroy();
        this._preloader = null;
    }

    /**
     * A ModalEvent will carry a modal view object from a child the dispatched the event and will add the modal view to
     * the modal controller to manage.
     *
     * @method showModal
     * @param event {ModalEvent}
     * @private
     */
    private showModal(event:ModalEvent) {
    }


//http://msdn.microsoft.com/en-us/library/windows/apps/dn263112.aspx#window_size_model
    //http://blog.loicrebours.fr/2013/09/08/developing-a-windows-8-1-application-48-windowing/
    onSizeChanged() {
        // Get the window orientation
        var winOrientation = ApplicationView.getForCurrentView().orientation;

        if (winOrientation === ApplicationViewOrientation.landscape) {
            // Landscape layouts

        } else if (winOrientation === ApplicationViewOrientation.portrait) {
            // Portrait layouts

        }


        // Get window size
        var windowWidth = document.documentElement.offsetWidth;

        // App code to change layout based on window width*
    }

}






///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/events/native/MouseEvents.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/events/RequestEvent.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/utils/TemplateFactory.ts'/>

///<reference path='views/topbar/TopNavigationView.ts'/>
///<reference path='views/login/LoginView.ts'/>
///<reference path='views/SelectBoxTemp.ts'/>

class WindowFilmApp extends Stage {

    private _topBar:TopNavigationView;
    private _contentContainer:DOMElement;
    private _currentView:DOMElement;

    private _selectBoxTemp:SelectBoxTemp;

    constructor() {
        super();
    }

    public createChildren():DOMElement {
        super.createChildren();

        this._topBar = new TopNavigationView();//({controller: this.appController});
        this.addChild(this._topBar);

        this._contentContainer = new DOMElement('div', {id: 'content-container'});
        this.addChild(this._contentContainer);

        this._selectBoxTemp = new SelectBoxTemp();
//        this._contentContainer.addChild(this._selectBoxTemp);

        var loginView = new LoginView();//({controller: this.appController});
        this.changeView(loginView);

        return this;
    }

    /**
     * @copy DisplayObject.enable
     */
    public enable():DOMElement {
        if (this.isEnabled === true) return this;

        this._topBar.enable();

        super.enable();
        return this;
    }

    /**
     * @copy DisplayObject.disable
     */
    public disable():DOMElement {
        if (this.isEnabled === false) return this;

        this._topBar.disable();

        super.disable();
        return this;
    }

    private changeView(view):void {
        //If the current view exists then do anything.
        //If there is a current view the disable it and then remove it.
        //Enable a new view and add it to the contentContainer.
        if (this._currentView != view) {

            if (this._currentView) {
                this._contentContainer.removeChild(this._currentView);
                if (this._currentView.destroy) {
                    this._currentView.destroy();
                }
            }

//            if (this._currentViewController && this._currentViewController.view !== view) {
//                this._currentViewController.destroy();
//                this._currentViewController = null;
//            }

            this._currentView = view;
            this._currentView.enable();
            this._contentContainer.addChild(this._currentView);
        }
    }

}
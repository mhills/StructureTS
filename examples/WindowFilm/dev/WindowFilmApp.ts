///<reference path='../../../src/_declare/jquery.d.ts'/>
///<reference path='../../../src/_declare/underscore.d.ts'/>

///<reference path='../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/display/Stage.ts'/>
///<reference path='../../../src/com/codebelt/events/MouseEventType.ts'/>
///<reference path='../../../src/com/codebelt/events/RequestEvent.ts'/>
///<reference path='../../../src/com/codebelt/utils/TemplateFactory.ts'/>

///<reference path='views/topbar/TopNavigationView.ts'/>
///<reference path='views/SelectBoxTemp.ts'/>

class WindowFilmApp extends Stage
{
    public static BASE_PATH:string = 'images/';

    private _topBar:TopNavigationView;
    private _contentContainer:DOMElement;

    private _selectBoxTemp:SelectBoxTemp;

    constructor(selector:string) {
        super(selector);
    }

    public createChildren():void {
        super.createChildren();

        this._topBar = new TopNavigationView();//({controller: this.appController});
        this.addChild(this._topBar);

        this._contentContainer = new DOMElement('div', {id: 'content-container'});
        this.addChild(this._contentContainer);

        this._selectBoxTemp = new SelectBoxTemp();
        this._contentContainer.addChild(this._selectBoxTemp);

    }

    public enabled(value:boolean):void {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        this._topBar.enabled(value);

        super.enabled(value);
    }

}
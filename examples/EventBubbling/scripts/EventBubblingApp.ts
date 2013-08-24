///<reference path='../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/structurets/display/Stage.ts'/>

///<reference path='views/RootView.ts'/>

/**
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
class EventBubblingApp extends Stage {

    private _rootView:RootView = null;

    constructor() {
        super();
    }

    /**
     * @copy DOMElement.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren();

        this._rootView = new RootView();
        this.addChild(this._rootView);
    }

    /**
     * @copy DisplayObject.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        this._rootView.enable();

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this._rootView.disable();

        super.disable();
    }

    /**
     * @copy DisplayObject.destroy
     * @overridden
     */
    public destroy():void {
        this._rootView.destroy();
        this._rootView = null;

        super.destroy();
    }

}
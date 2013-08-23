///<reference path='../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/structurets/display/Stage.ts'/>

///<reference path='views/GrandpaView.ts'/>

/**
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
class EventBubblingApp extends Stage {

    private _grandpaView:GrandpaView = null;

    constructor() {
        super();
    }

    /**
     * @copy DOMElement.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren();

        this._grandpaView = new GrandpaView();
        this.addChild(this._grandpaView);
    }

    /**
     * @copy DisplayObject.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        this._grandpaView.enable();

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this._grandpaView.disable();

        super.disable();
    }

}
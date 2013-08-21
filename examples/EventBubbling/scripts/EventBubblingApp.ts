///<reference path='../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/structurets/display/Stage.ts'/>

///<reference path='views/ContainerView.ts'/>
/**
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
class EventBubblingApp extends Stage {

    private _sonView:ContainerView = null;

    constructor() {
        super();
    }

    /**
     * @copy DOMElement.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren();
//                     alert("asdf")
//        this._sonView = new ContainerView();
//        this.addChild(this._sonView);
    }

    /**
     * @copy DisplayObject.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        super.disable();
    }

}
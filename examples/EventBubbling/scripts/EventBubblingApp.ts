///<reference path='../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/structurets/display/Stage.ts'/>

///<reference path='views/family/GrandpaView.ts'/>

/**
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
class EventBubblingApp extends Stage {

    private _grandpaView:GrandpaView = null;
    private _clearButton:DOMElement = null;
    private _stageMessage:DOMElement = null;

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

        this._clearButton = this.getChild('#js-clearButton');
        this._stageMessage = this.getChild('.js-message');
    }

    /**
     * @copy DisplayObject.layoutChildren
     * @overridden
     */
    public layoutChildren():void {
        this._stageMessage.$element.css('opacity', 0);
        this._grandpaView.layoutChildren();
    }

    /**
     * @copy DisplayObject.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

        this._clearButton.$element.addEventListener(MouseEvents.CLICK, this.onClearClick, this);
        this._grandpaView.enable();

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

        this._clearButton.$element.removeEventListener(MouseEvents.CLICK, this.onClearClick, this);
        this._grandpaView.disable();

        super.disable();
    }

    private onClearClick(event:JQueryEventObject):void {
        this.layoutChildren();
    }

    private onBubbled(event:BaseEvent):void {
        this._stageMessage.$element.css('opacity', 1);
    }

}
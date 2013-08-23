///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/events/MouseEventType.ts'/>

/**
 * YUIDoc_comment
 *
 * @class SonView
 * @constructor
 **/
class SonView extends DOMElement {

    public CLASS_NAME:string = 'SonView';

    private _dispatchButton:DOMElement = null;

    constructor() {
        super();
    }

    /**
     * @copy DisplayObject.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren('#containerTemplate', {title: this.getQualifiedClassName()});

        this._dispatchButton = new DOMElement('button', {'class': 'button_dispatch', text: 'Dispatch Event'});
        this.addChild(this._dispatchButton);
    }

    /**
     * @copy DisplayObject.layoutChildren
     * @overridden
     */
    public layoutChildren():void {

    }

    /**
     * @copy DisplayObject.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        this._dispatchButton.$el.addEventListener(MouseEventType.CLICK, this.onButtonClick, this);

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this._dispatchButton.$el.removeEventListener(MouseEventType.CLICK, this.onButtonClick, this);

        super.disable();
    }

    private onButtonClick(event:JQueryEventObject):void {
        event.preventDefault();

        this._dispatchButton.$el.text('Event Sent!');

        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true));
    }

}
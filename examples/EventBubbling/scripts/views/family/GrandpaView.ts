///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='DadView.ts'/>

/**
 * YUIDoc_comment
 *
 * @class GrandpaView
 * @constructor
 **/
class GrandpaView extends DOMElement {

    public CLASS_NAME:string = 'GrandpaView';

    private _childrenContainer:DOMElement = null;
    private _dadView:DadView = null;
    private _grandpaMessage:DOMElement = null;

    constructor() {
        super();
    }

    /**
     * @copy DisplayObject.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren('#containerTemplate', {title: this.getQualifiedClassName()});

        this._childrenContainer = this.getChild('.js-childrenArea');

        this._dadView = new DadView();
        this._childrenContainer.addChild(this._dadView);

        this._grandpaMessage = this.getChild('.js-message');
    }

    /**
     * @copy DisplayObject.layoutChildren
     * @overridden
     */
    public layoutChildren():void {
        this._grandpaMessage.$el.css('opacity', 0);
        this._dadView.layoutChildren();
    }

    /**
     * @copy DisplayObject.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

        this._dadView.enable();

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

        this._dadView.disable();

        super.disable();
    }

    /**
     * @copy DisplayObject.destroy
     * @overridden
     */
    public destroy():void {
        this._dadView.destroy();
        this._dadView = null;

        this._childrenContainer.destroy();
        this._childrenContainer = null;

        super.destroy();
    }

    private onBubbled(event:BaseEvent):void {
        var checkbox:boolean = this._childrenContainer.$el.find('[type=checkbox]')
                                                          .first()
                                                          .prop('checked');

        if (checkbox == true) {
            event.stopPropagation();
        }

        this._grandpaMessage.$el.css('opacity', 1);
    }

}
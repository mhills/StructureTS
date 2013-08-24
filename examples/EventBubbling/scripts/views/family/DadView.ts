///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='SonView.ts'/>

/**
 * YUIDoc_comment
 *
 * @class DadView
 * @constructor
 **/
class DadView extends DOMElement {

    public CLASS_NAME:string = 'DadView';

    private _childrenContainer:DOMElement = null;
    private _sonView:SonView = null;

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

        this._sonView = new SonView();
        this._childrenContainer.addChild(this._sonView);
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

        this._sonView.enable();

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this._sonView.disable();

        super.disable();
    }

    /**
     * @copy DisplayObject.destroy
     * @overridden
     */
    public destroy():void {
        this._sonView.destroy();
        this._sonView = null;

        this._childrenContainer.destroy();
        this._childrenContainer = null;

        super.destroy();
    }

}
///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='family/GrandpaView.ts'/>

/**
 * YUIDoc_comment
 *
 * @class RootView
 * @constructor
 **/
class RootView extends DOMElement {

    public CLASS_NAME:string = 'RootView';

    private _grandpaView:GrandpaView = null;

    constructor() {
        super();
    }

    /**
     * @copy DOMElement.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren('#wrapperTemplate');

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
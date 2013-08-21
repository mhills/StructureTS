///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

/**
 * YUIDoc_comment
 *
 * @class SonView
 * @constructor
 **/
class SonView extends DOMElement {

    public CLASS_NAME:string = 'SonView';

    constructor() {
        super();
    }

    /**
     * @copy DisplayObject.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren('#containerTemplate', {title: this.getQualifiedClassName()});
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
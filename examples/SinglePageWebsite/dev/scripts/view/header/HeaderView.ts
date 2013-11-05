///<reference path='com/codebelt/display/DOMElement.ts'/>

/**
 * YUIDoc_comment
 *
 * @class HeaderView
 * @constructor
 **/
class HeaderView extends DOMElement
{

    public CLASS_NAME:string = 'HeaderView';

    constructor()
    {
        super();

    }

    /**
     * @copy DisplayObject.createChildren
     * @overridden
     */
    public createChildren():void
    {
        super.createChildren();

    }

    /**
     * @copy DisplayObject.layoutChildren
     * @overridden
     */
    public layoutChildren():void
    {

    }

    /**
     * @copy DisplayObject.enable
     * @overridden
     */
    public enable():void
    {
        if (this.isEnabled === true) return;

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void
    {
        if (this.isEnabled === false) return;

        super.disable();
    }

}
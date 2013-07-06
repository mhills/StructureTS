///<reference path='DOMElement.ts'/>

/**
 * The Stage class should be extended by your main or root class.
 *
 * @class Stage
 * @extends DOMElement
 * @constructor
 **/
class Stage extends DOMElement
{

    constructor(type:string)
    {
        super();

        this.$el = jQuery(type);

        // Sine this class is main or root class it is never added to another DOMElement and the createChildren method is never called.
        // We need to call it here.
        this.createChildren();
    }

}

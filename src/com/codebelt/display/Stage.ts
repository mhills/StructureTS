///<reference path='DOMElement.ts'/>

/**
 * The Stage...
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
        this.createChildren();
    }

}

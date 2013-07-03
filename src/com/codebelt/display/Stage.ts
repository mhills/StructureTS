///<reference path='DOMElement.ts'/>

class Stage extends DOMElement
{

    constructor(type:string)
    {
        super();

        this.$el = jQuery(type);
        this.createChildren();
    }

}

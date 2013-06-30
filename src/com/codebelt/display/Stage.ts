///<reference path='DOMElement.ts'/>

class Stage extends DOMElement
{
    public template:any;

    constructor(type:string)
    {
        super();

        this.$el = jQuery(type);
        this.createChildren();
    }

}

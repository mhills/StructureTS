///<reference path='DOMElement.ts'/>

class Stage extends DOMElement
{
    private _type:string;

    public template:any;

    constructor(type?:string)
    {
        super(type);

        this._type = type;//TODO: change how this class works.
        this.createChildren();
    }

    public createChildren():void
    {
        this.$el = jQuery(this._type);
    }

}

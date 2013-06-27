///<reference path='CanvasElement.ts'/>
///<reference path='DOMElement.ts'/>

class Canvas extends CanvasElement {

    public element:any = null;

    constructor(canvas:DOMElement)
    {
        super();

        this.stage = this;
        this.element = canvas.element[0];
        this.context = this.element.getContext("2d");

        this.width = this.element.width;
        this.height = this.element.height;
    }

    /**
     * @override
     */
    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {

        } else {

        }

        super.enabled(value);
    }

    /**
     * @override
     */
    public addChild(displayObject:CanvasElement):void
    {
        displayObject.parent = this.stage;
        displayObject.stage = this.stage;
        displayObject.context = this.context;
        displayObject.createChildren();
    }

    public removeChild(displayObject:CanvasElement):void
    {
        displayObject.stage = null;
        displayObject.context = null;
    }

    public render():void
    {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    //Override event listeners becuase Canvas is both and CanvasElement and DOMElement.
    public addEventListener(type:string, callback:Function, scope:any)
    {
        if (document.addEventListener) {
            this.element.addEventListener(type, callback, false);
        } else if (document.attachEvent)  {
            this.element.attachEvent("on" + type, callback);
        } else {
            this.element["on" + type] = callback;
        }
    }

    //Override event listeners becuase Canvas is both and CanvasElement and DOMElement.
    public removeEventListener(type:string, callback:Function)
    {
        if (document.removeEventListener) {
            this.element[0].removeEventListener(type, callback, false);
        } else if (document.detachEvent)  {
            this.element[0].detachEvent("on" + type, callback);
        } else {
            this.element[0]["on" + type] = null;
        }
    }

}
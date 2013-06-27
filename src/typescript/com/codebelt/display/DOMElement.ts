///<reference path='../../../_declare/jaml.d.ts'/>
///<reference path='DisplayObject.ts'/>

class DOMElement extends DisplayObject
{
    public CLASS_NAME:string = 'DOMElement';

    private _node:string = null;
    public _options:any = {};//TODO: fix this. it should not be public or should it?

    public templateName:string = "DOMElement";
    private _isVisible:boolean = true;

    public el:Element = null;
    public $el:JQuery = null;

    constructor(type?:string, params:any={})
    {
        super();

        this._node = type;
        this._options = params;
    }

    public createChildren():void
    {
        if (this._node && !this.$el) {
            this.$el = jQuery("<" +  this._node + "/>", this._options);//.get(0);//Gets raw html
        } else if (!this._node && !this.$el) {
            this.$el = jQuery(Jaml.render(this.templateName, this._options));
        }

        this.el = this.$el[0];
    }

    public addChild(displayObject:DOMElement):DOMElement
    {
        super.addChild(displayObject);

        if(!displayObject.isCreated) {
            displayObject.createChildren();// Render the item before adding to the DOM
            displayObject.isCreated = true;
        }
        displayObject.layoutChildren();
        this.$el.append(displayObject.$el);

        return this;
    }

    public addChildAt(displayObject:DOMElement, displayIndex:number):DOMElement
    {
        var children = this.$el.children();
        var length = children.length;

        // If the displayIndex passed in is less than 0 and greater than
        // the total number of children then place the item at the end.
        if(displayIndex < 0 || displayIndex >= length)
        {
            this.addChild(displayObject);
        }
        // Else get the child in the children array by the
        // displayIndex passed in and place the item before that child.
        else
        {
            displayObject.parent = this;
            if(!displayObject.isCreated) {
                displayObject.createChildren();// Render the item before adding to the DOM
                displayObject.isCreated = true;
            }
            displayObject.layoutChildren();
            jQuery(children.get(displayIndex)).before(displayObject.$el);

            super.addChildAt(displayObject, displayIndex);
        }

        return this;
    }

    public getChild(selector:string):DOMElement
    {
        var jQueryElement = this.$el.find(selector);

        if (jQueryElement.length == 0) {
            throw new Error('[DOMElement] getChild("' + selector + '") Cannot find DOM $el');
        }

        for (var index in this.children) {
            var displayObject = this.children[index];
            if ( jQueryElement.is(displayObject.$el) ) {
                return <DOMElement>displayObject;
            }
        }
        //Else
        var domElement:DOMElement = new DOMElement();
        domElement.$el = jQueryElement;
        domElement.el = jQueryElement[0];
        return domElement;
    }

//    public getChildAt(index:number):DisplayObject
//    {
//        //TODO: Need to figure out. What if the user is looking for and dom $el and not an $el in "this.children" array.
//    }

//    public getChildren(selector:string=""):DOMElement[]
//    {
//        //TODO: Need to figure out.
//        //TODO: return array of display object if jquery does.
//        console.log(this.$el.children(selector));
//        return null;
//    }

    public removeChild(displayObject:DOMElement):DOMElement
    {
        displayObject.enabled(false);
        displayObject.$el.unbind();
        displayObject.$el.remove();

        super.removeChild(displayObject);

        return this;
    }

    public removeChildren():DOMElement
    {
        super.removeChildren();

        this.$el.empty();

        return this;
    }

    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        super.enabled(value);
    }

    public invalidateLayout():void
    {
        this.layoutChildren();
    }

    public layoutChildren():void
    {
    }

    /*public addEventListener(type:string, callback:Function, scope:any)
    {
        if (document.addEventListener) {
            this.$el.addEventListener(type, callback, false);
        } else if (document.attachEvent)  {
            this.$el.attachEvent("on" + type, callback);
        } else {
            this.$el["on" + type] = callback;
        }
    }

    public removeEventListener(type:string, callback:Function)
    {
        if (document.removeEventListener) {
            this.$el.removeEventListener(type, callback, false);
        } else if (document.detachEvent)  {
            this.$el.detachEvent("on" + type, callback);
        } else {
            this.$el["on" + type] = null;
        }
    }*/

    public alpha(number):DOMElement
    {
        this.$el.css('opacity', number);
        return this;
    }

    public visible(value:boolean):any
    {
        if (value == false) {
            this._isVisible = false;
            this.$el.hide();
        } else if (value == true) {
            this._isVisible = true;
            this.$el.show();
        } else if (value == undefined) {
            return this._isVisible;
        }
        return this;
    }
}
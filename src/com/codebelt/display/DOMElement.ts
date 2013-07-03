///<reference path='../../../_declare/jaml.d.ts'/>
///<reference path='DisplayObject.ts'/>

class DOMElement extends DisplayObject {

    public CLASS_NAME:string = 'DOMElement';

    private _node:string = null;
    public _options:any = {};//TODO: fix this. it should not be public or should it?

    private _isVisible:boolean = true;

    public el:Element = null;
    public $el:JQuery = null;

    constructor(type:string='div', params:any = {}) {
        super();

        this._node = type;
        this._options = params;
    }

    /**
     *
     * @method createChildren
     * @override
     * @public
     */
    public createChildren(jaml?:Function):void {
        if (jaml)
        {
            Jaml.register(this.CLASS_NAME, jaml);
            this.$el = jQuery(Jaml.render(this.CLASS_NAME, this._options));
        }
        else if (this._node && !this.$el)
        {
            this.$el = jQuery("<" + this._node + "/>", this._options);
        }

        this.el = this.$el[0];
    }

    /**
     *
     * @method addChild
     * @param displayObject {DOMElement}
     * @returns {DOMElement}
     * @override
     * @public
     */
    public addChild(displayObject:DOMElement):DOMElement {
        super.addChild(displayObject);

        if (!displayObject.isCreated) {
            displayObject.createChildren();// Render the item before adding to the DOM
            displayObject.isCreated = true;
        }
        displayObject.layoutChildren();

        // Adds the cid to the DOM element so we can know what what Class object the element belongs too.
        displayObject.$el.attr('data-cid', displayObject.cid);

        this.$el.append(displayObject.$el);

        return this;
    }

    /**
     *
     * @method addChildAt
     * @param displayObject {DOMElement}
     * @param displayIndex {int}
     * @returns {DOMElement}
     * @override
     * @public
     */
    public addChildAt(displayObject:DOMElement, displayIndex:number):DOMElement {
        var children = this.$el.children();
        var length = children.length;

        // If the displayIndex passed in is less than 0 and greater than
        // the total number of children then place the item at the end.
        if (displayIndex < 0 || displayIndex >= length) {
            this.addChild(displayObject);
        }
        // Else get the child in the children array by the
        // displayIndex passed in and place the item before that child.
        else {
            displayObject.parent = this;
            if (!displayObject.isCreated) {
                displayObject.createChildren();// Render the item before adding to the DOM
                displayObject.isCreated = true;
            }
            displayObject.layoutChildren();
            jQuery(children.get(displayIndex)).before(displayObject.$el);

            // TODO: super addChildAt is not working how it should.
            super.addChildAt(displayObject, displayIndex);
        }

        return this;
    }

    /**
     * Allows two different types of arguments.
     * If the argument is of type string then it assumed the method is looking for a DOM id name, DOM class name or a DOM tag name.
     * If the argument is of type number then it assumed the method is looking for a DOMElement by its cid and will loop through the children array looking for a match.
     *
     * @method getChild
     * @param selector {string|number}
     * @returns {DOMElement}
     * @override
     * @public
     */
    public getChild(selector:any):DOMElement {
        var domElement:DOMElement;

        // If a selector is a number which should be the cid of the object then this will find the object with the same cid value in the children array.
        if (typeof selector === 'number') {
            domElement = <DOMElement>_.find(this.children, function (domElement) {
                return domElement.cid == selector;
            });
        }
        // Create and new DOMElement object from the found jQuery element.
        else {
            var jQueryElement:JQuery = this.$el.find(selector + ':first');// Gets the first match.
            if (jQueryElement.length == 0) {
                throw new TypeError('[DOMElement] getChild(' + selector + ') Cannot find DOM $el');
            }

            // Loop through the children array to see if the cid found on the jQueryElement matches any in the children array.
            var cid:number = jQueryElement.data('cid');
            domElement = <DOMElement>_.find(this.children, function (domElement) {
                return domElement.cid == cid;
            });

            // Create a DOMElement from the jQueryElement.
            if (!domElement) {
                domElement = new DOMElement();
                domElement.$el = jQueryElement;
                domElement.$el.attr('data-cid', domElement.cid);
                domElement.el = jQueryElement[0];

                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                super.addChild(domElement);
            }
        }

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

    /**
     *
     * @method removeChild
     * @param displayObject {DOMElement}
     * @returns {DOMElement}
     * @override
     * @public
     */
    public removeChild(displayObject:DOMElement):DOMElement {
        displayObject.enabled(false);
        displayObject.$el.unbind();
        displayObject.$el.remove();

        super.removeChild(displayObject);

        return this;
    }

    /**
     *
     * @method removeChildren
     * @returns {DOMElement}
     * @override
     * @public
     */
    public removeChildren():DOMElement {
        super.removeChildren();

        this.$el.empty();

        return this;
    }

    /**
     *
     * @param value {boolean}
     * @method enabled
     * @override
     * @public
     */
    public enabled(value:boolean):void {
        if (value == this.isEnabled) {
            return;
        }

        if (value) {
        }
        else {
        }

        super.enabled(value);
    }

    public invalidateLayout():void {
        this.layoutChildren();
    }

    public layoutChildren():void {
    }

    public alpha(number):DOMElement {
        this.$el.css('opacity', number);
        return this;
    }

    public visible(value:boolean):any {
        if (value == false) {
            this._isVisible = false;
            this.$el.hide();
        }
        else if (value == true) {
            this._isVisible = true;
            this.$el.show();
        }
        else if (value == undefined) {
            return this._isVisible;
        }
        return this;
    }
}
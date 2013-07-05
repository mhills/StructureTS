///<reference path='../../../_declare/jaml.d.ts'/>
///<reference path='DisplayObject.ts'/>
///<reference path='../events/BaseEvent.ts'/>
///<reference path='../utils/TemplateFactory.ts'/>

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
    public createChildren(template?:any) {
        if (typeof template === 'function')
        {
            Jaml.register(this.CLASS_NAME, template);
            this.$el = jQuery(Jaml.render(this.CLASS_NAME, this._options));
        }
        else if (typeof template === 'string')
        {
            this.$el = TemplateFactory.createTemplate(template);
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
     * @param child {DOMElement}
     * @returns {DOMElement}
     * @override
     * @public
     */
    public addChild(child:DOMElement):DOMElement {
        super.addChild(child);

        if (!child.isCreated) {
            child.createChildren();// Render the item before adding to the DOM
            child.isCreated = true;
        }
        child.layoutChildren();

        // Adds the cid to the DOM element so we can know what what Class object the element belongs too.
        child.$el.attr('data-cid', child.cid);

        this.$el.append(child.$el);

        this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));

        return this;
    }

    /**
     *
     * @method addChildAt
     * @param child {DOMElement}
     * @param index {int}
     * @returns {DOMElement}
     * @override
     * @public
     */
    public addChildAt(child:DOMElement, index:number):DOMElement {
        //TODO:test this out.
        var children = this.$el.children();
        var length = children.length;

        // If the index passed in is less than 0 and greater than
        // the total number of children then place the item at the end.
        if (index < 0 || index >= length) {
            this.addChild(child);
        }
        // Else get the child in the children array by the
        // index passed in and place the item before that child.
        else {
            child.parent = this;
            if (!child.isCreated) {
                child.createChildren();// Render the item before adding to the DOM
                child.isCreated = true;
            }
            child.layoutChildren();
            jQuery(children.get(index)).before(child.$el);

            // TODO: super addChildAt is not working how it should.
            super.addChildAt(child, index);
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
     * Removes the specified child object instance from the child list of the parent object instance.
     * The parent property of the removed child is set to null , and the object is garbage collected if no other references
     * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
     *
     * @method removeChild
     * @param child {DOMElement} The DisplayObject instance to remove.
     * @returns {DOMElement} The DisplayObject instance that you pass in the child parameter.
     * @override
     * @public
     */
    public removeChild(child:DOMElement):DOMElement {
        child.enabled(false);
        child.$el.unbind();
        child.$el.remove();

        super.removeChild(child);

        return child;
    }

    /**
     * Removes all child object instances from the child list of the parent object instance.
     * The parent property of the removed children is set to null , and the objects are garbage collected if no other
     * references to the children exist.
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
/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

///<reference path='../../../_declare/jaml.d.ts'/>
///<reference path='DisplayObject.ts'/>
///<reference path='../events/BaseEvent.ts'/>
///<reference path='../utils/TemplateFactory.ts'/>

/**
 * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base class for all objects that can be placed into the HTML DOM.
 *
 * @class DOMElement
 * @extends DisplayObject
 * @constructor
 **/
class DOMElement extends DisplayObject {

    /**
     * @copy DisplayObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'DOMElement';

    private _node:string = null;
    public _options:any = {};//TODO: fix this. it should not be public or should it?

    /**
     * Whether or not the display object is visible. Display objects that are not visible are disabled.
     * For example, if visible=false for an InteractiveObject instance, it cannot be clicked.
     *
     * @property _isVisible
     * @type {boolean}
     * @default true
     * @private
     */
    private _isVisible:boolean = true;

    /**
     * A cached of the DOM Element.
     *
     * @property el
     * @type {Element}
     * @default null
     */
    public el:Element = null;

    /**
     * A cached jQuery object for the view's element.
     *
     * @property $el
     * @type {JQuery}
     * @default null
     */
    public $el:JQuery = null;

    constructor(type:string = 'div', params:any = {}) {
        super();

        this._node = type;
        this._options = params;
    }

    /**
     * @copy DisplayObject.createChildren
     * @overridden
     */
    public createChildren(template?:any, data?:any) {
        if (typeof template === 'function') {
            Jaml.register(this.CLASS_NAME, template);
            this.$el = jQuery(Jaml.render(this.CLASS_NAME, this._options));
        }
        else if (typeof template === 'string') {
            this.$el = TemplateFactory.createTemplate(template, data);
        }
        else if (this._node && !this.$el) {
            this.$el = jQuery("<" + this._node + "/>", this._options);
        }

        this.el = this.$el[0];
    }

    /**
     * @copy DisplayObject.addChild
     *
     * @method addChild
     * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
     * @returns {DOMElement} The DOMElement instance that you pass in the child parameter.
     * @overridden
     * @example
     *      container.addChild(domElementInstance);
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

        return child;
    }

    /**
     * @copy DisplayObject.addChildAt
     * @overridden
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
                domElement.isCreated = true;

                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                super.addChild(domElement);
            }
        }

        return domElement;
    }

    /**
     * Gets all the HTML elements children of this object.
     *
     * @method getChildren
     * @param [selector] {string} You can pass in any type of jQuery selector.
     * @returns {Array} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
     * If the 'data-cid' property exists is on an HTML element a DOMElement will not be create for that element because it will be assumed it already exists as a DOMElement.
     */
    public getChildren(selector:string = ''):DOMElement[] {
        //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
        var $child:JQuery;
        var domElement:DOMElement;
        var $list:JQuery = this.$el.children(selector || '');

        //TODO: Make sure elements that are in this.children are not duplicated.
        _.each($list, (item, index) => {
            $child = jQuery(item);
            // If the jQuery element already has cid data property then must be an existing DisplayObject (DOMElement).
            if (!$child.data('cid')) {
                domElement = new DOMElement();
                domElement.$el = $child;
                domElement.$el.attr('data-cid', domElement.cid);
                domElement.el = item;
                domElement.isCreated = true;

                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                super.addChild(domElement);
            }
        });

        return <DOMElement[]>this.children;
    }

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

//    /**
//     * @copy DisplayObject.enabled
//     */
//    public enabled(value:boolean):void {
//        if (value == this.isEnabled) {
//            return;
//        }
//
//        if (value) {
//        }
//        else {
//        }
//
//        super.enabled(value);
//    }

    /**
     * @copy DisplayObject.enable
     */
    public enable():void {
        if (this.isEnabled === true) return;

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     */
    public disable():void {
        if (this.isEnabled === false) return;

        super.disable();
    }

    /**
     * @copy DisplayObject.layoutChildren
     */
    public layoutChildren():void {
    }

    /**
     * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent)
     * to 1 (fully opaque). The default value is 1. Display objects with alpha set to 0 are active, even though
     * they are invisible.
     *
     * @method alpha
     * @param number
     * @returns {DOMElement}
     */
    public alpha(number):DOMElement {
        this.$el.css('opacity', number);
        return this;
    }

    /**
     *
     * @method visible
     * @param value
     * @returns {*}
     */
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
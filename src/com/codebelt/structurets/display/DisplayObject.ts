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

///<reference path='../events/EventDispatcher.ts'/>

/**
 * The {{#crossLink "DisplayObject"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
 *
 * @class DisplayObject
 * @extends EventDispatcher
 * @module StructureTS
 * @submodule view
 * @constructor
 **/
class DisplayObject extends EventDispatcher
{
    /**
     * @copy EventDispatcher.CLASS_NAME
     */
    public CLASS_NAME:string = 'DisplayObject';

    /**
     * The isCreated property is used to keep track if it is the first time this DisplayObject is created.
     *
     * @property isCreated
     * @type {boolean}
     * @default false
     * @protected
     */
    public isCreated:boolean = false;

    /**
     * Returns the number of children of this object.
     *
     * @property numChildren
     * @type {init}
     * @default 0
     * @readonly
     */
    public numChildren:number = 0;

    /**
     * A reference to the child DisplayObject instances to this parent object instance.
     *
     * @property children
     * @type {array}
     * @readonly
     */
    public children:DisplayObject[] = [];


    /**
     * A property providing access to the unscaledWidth.
     *
     * @property unscaledWidth
     * @type {number}
     * @default 100
     */
    public unscaledWidth:number = 100;

    /**
     * A property providing access to the unscaledHeight.
     *
     * @property unscaledHeight
     * @type {number}
     * @default 100
     */
    public unscaledHeight:number = 100;

    constructor()
    {
        super();
    }

    /**
     * The createChildren function is intended to provide a consistent place for the creation and adding
     * of children to the view. It will automatically be called the first time that the view is added
     * to another DisplayObject. It is critical that all subclasses call the super for this function in
     * their overridden methods.
     *
     * @method createChildren
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     */
    public createChildren():any
    {
        return this;
    }

    /**
     * Adds a child DisplayObject instance to this parent object instance. The child is added to the front (top) of all other
     * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
     *
     * If you add a child object that already has a different parent, the object is removed from the child
     * list of the other parent object.
     *
     * @method addChild
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
     * @returns {DisplayObject} Returns an instance of itself.
     */
    public addChild(child:DisplayObject):any
    {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent)
        {
            child.parent.removeChild(child);
        }

        this.children.push(child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
    }

    /**
     * Adds a child DisplayObject instance to this DisplayObjectContainer instance.
     * The child is added at the index position specified. An index of 0 represents the back
     * (bottom) of the display list for this DisplayObjectContainer object.
     *
     * @method addChildAt
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this object instance.
     * @param index {int} The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
     * @returns {DisplayObject} Returns an instance of itself.
     */
    public addChildAt(child:DisplayObject, index:number):any
    {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent)
        {
            child.parent.removeChild(child);
        }

        this.children.splice(index, 0, child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
    }

    /**
     * Removes the specified child object instance from the child list of the parent object instance.
     * The parent property of the removed child is set to null , and the object is garbage collected if no other references
     * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
     *
     * @method removeChild
     * @param child {DisplayObject} The DisplayObject instance to remove.
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     */
    public removeChild(child:DisplayObject):any
    {
        var index = this.children.indexOf(child);
        if (index !== -1)
        {
            this.children.splice(index, 1);
        }
        child.disable();
        child.parent = null;

        this.numChildren = this.children.length;

        return this;
    }

    /**
     * Removes all child DisplayObject instances from the child list of the DisplayObjectContainer instance.
     * The parent property of the removed children is set to null , and the objects are garbage collected if
     * no other references to the children exist.
     *
     * @method removeChildren
     * @returns {DisplayObject} Returns an instance of itself.
     */
    public removeChildren():any
    {
        while (this.children.length > 0)
        {
            this.removeChild(<DisplayObject>this.children.pop());
        }

        this.numChildren = this.children.length;

        return this;
    }

    /**
     *
     * @method getChild
     * @param child
     */
    public getChild(child:any):DisplayObject
    {
        var index = this.children.indexOf(child);
        // TODO: throw error in child is not found.
        return this.children[index];
    }

    /**
     * Returns the child display object instance that exists at the specified index.
     *
     * @method getChildAt
     * @param index {int} The index position of the child object.
     * @returns {DisplayObject} The child display object at the specified index position.
     */
    public getChildAt(index:number):DisplayObject
    {
        return this.children[index];
    }

    /**
     * The setSize method sets the bounds within which the containing DisplayObject would
     * like that component to lay itself out. It is expected that calling setSize will automatically
     * call {{#crossLink "DisplayObject/layoutChildren:method"}}{{/crossLink}}.
     *
     * @param unscaledWidth {number} The width within which the component should lay itself out.
     * @param unscaledHeight {number} The height within which the component should lay itself out.
     * @returns {DisplayObject} Returns an instance of itself.
     */
    public setSize(unscaledWidth:number, unscaledHeight:number):any
    {
        this.unscaledWidth = unscaledWidth;
        this.unscaledHeight = unscaledHeight;
        this.layoutChildren();

        return this;
    }

    /**
     * The layoutComponent method provides a common function to handle updating child objects.
     *
     * @method layoutChildren
     * @returns {DisplayObject} Returns an instance of itself.
     */
    public layoutChildren():any
    {

        return this;
    }

    /**
     * @copy EventDispatcher.destroy
     * @overridden
     */
    public destroy():void
    {
        this.disable();
        this.children = [];
        this.numChildren = 0;

        super.destroy();
    }

}
///<reference path='../events/EventDispatcher.ts'/>

/**
 * The DisplayObject class is the base class for all objects that can be placed on the display list.
 *
 * @class DisplayObject
 * @namespace com.codebelt.DisplayObject
 * @extends EventDispatcher
 * @constructor
 **/
class DisplayObject extends EventDispatcher
{
    /**
     * @property CLASS_NAME
     * @type {string}
     * @final
     */
    public CLASS_NAME:string = 'DisplayObject';

    public isEnabled:boolean = false;
    public isCreated:boolean = false;

    /**
     * Returns the number of children of this object.
     *
     * @property numChildren
     * @type {init}
     * @readonly
     */
    public numChildren:number = 0;
    public children:DisplayObject[] = [];

    constructor()
    {
        super();
    }

    public createChildren():void
    {
        //Meant to be overridden.
    }

    /**
     * Adds a child DisplayObject instance to this parent object instance. The child is added to the front (top) of all other
     * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
     *
     * If you add a child object that already has a different parent, the object is removed from the child
     * list of the other parent object.
     *
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
     * @returns {DisplayObject} The DisplayObject instance that you pass in the child parameter.
     */
    public addChild(child:DisplayObject):DisplayObject
    {
        //If the child being passed in already has a parent the remove the reference from there.
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this.children.unshift(child);
        this.numChildren = this.children.length;

        child.parent = this;


//        added:Event — Dispatched when a display object is added to the display list.


        return child;
    }

    public removeChild(child:DisplayObject):DisplayObject
    {
        var index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        child.enabled(false);
        child.parent = null;

        this.numChildren = this.children.length;

        return this;
    }

    public removeChildren():DisplayObject
    {
        while (this.children.length > 0) {
            this.removeChild( <DisplayObject>this.children.pop() );
        }

        this.numChildren = this.children.length;

        return this;
    }

    public addChildAt(child:DisplayObject, index:number):DisplayObject
    {
        this.children.unshift(child);//Temp fix.

        this.numChildren = this.children.length;

        return this;
    }

    public getChild(child:any):DisplayObject
    {
        var index = this.children.indexOf(child);
        // TODO: throw error in child is not found.
        return this.children[index];
    }

    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    }

    public invalidateLayout():void
    {
        this.layoutChildren();
    }

    public layoutChildren():void
    {
    }

}
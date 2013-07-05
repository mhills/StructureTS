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

    public addChild(displayObject:DisplayObject):DisplayObject
    {
        //If the displayObject being passed in already has a parent the remove the reference from there.
        if (displayObject.parent) {
            displayObject.parent.removeChild(displayObject);
        }

        this.children.unshift(displayObject);
        this.numChildren = this.children.length;

        displayObject.parent = this;

        return this;
    }

    public removeChild(displayObject:DisplayObject):DisplayObject
    {
        var index = this.children.indexOf(displayObject);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        displayObject.enabled(false);
        displayObject.parent = null;

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

    public addChildAt(displayObject:DisplayObject, displayIndex:number):DisplayObject
    {
        //TODO: Figure out nice way to manage StructureTS children and actual dom children.
        // All siblings need to be DisplayObjects but there could be a case where the parent doesn't have all dom children.
        this.children.unshift(displayObject);//Temp fix.

        this.numChildren = this.children.length;

        return this;
    }

    public getChild(displayObject:any):DisplayObject
    {
        var index = this.children.indexOf(displayObject);
        // TODO: throw error in displayObject is not found.
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
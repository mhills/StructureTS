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

///<reference path='BaseObject.ts'/>

/**
 * The {{#crossLink "CollectiveObject"}}{{/crossLink}}...
 *
 * @class CollectiveObject
 * @extends BaseObject
 * @module StructureTS
 * @submodule view
 * @constructor
 **/
class CollectiveObject extends BaseObject
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'CollectiveObject';

    /**
     * The isEnabled property is used to keep track of the enabled state of the object.
     *
     * @property isEnabled
     * @type {boolean}
     * @default false
     * @protected
     */
    public isEnabled:boolean = false;

    constructor()
    {
        super();
    }

    /**
     * The enable method is responsible for enabling event listeners and/or children of the containing objects.
     * @example
     *      public enable():void {
     *          if (this.isEnabled === true) return;
     *
     *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.enable();
     *
     *          super.enable();
     *      }
     * @method enable
     * @chainable
     * @public
     */
    public enable():any
    {
        if (this.isEnabled === true) return this;

        this.isEnabled = true;
        return this;
    }

    /**
     * The disable method is responsible for disabling event listeners and/or children of the containing objects.
     * @example
     *      public disable():void {
     *          if (this.isEnabled === false) return;
     *
     *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.disable();
     *
     *          super.enable();
     *      }
     * @method disable
     * @chainable
     * @public
     */
    public disable():any
    {
        if (this.isEnabled === false) return this;

        this.isEnabled = false;
        return this;
    }

    /**
     * @copy BaseObject.destroy
     * @overridden
     */
    public destroy():void
    {
        super.destroy();

        this.disable();
        this.isEnabled = false;
    }

}
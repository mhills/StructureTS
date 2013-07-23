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

///<reference path='_declare/jaml.d.ts'/>
///<reference path='_declare/jquery.d.ts'/>
///<reference path='_declare/handlebars.d.ts'/>
///<reference path='_declare/underscore.d.ts'/>
///<reference path='_declare/crossroads.d.ts'/>
///<reference path='_declare/signals.d.ts'/>
///<reference path='_declare/route.d.ts'/>
///<reference path='_declare/hasher.d.ts'/>

/**
 * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureTS classes.
 *
 * @class BaseObject
 * @module StructureTS
 * @submodule core
 * @constructor
 **/
class BaseObject {

    /**
     * The actually class name for the object.
     *
     * @property CLASS_NAME
     * @type {string}
     * @final
     * @protected
     */
    public CLASS_NAME:string = 'BaseObject';

    /**
     * The cid or client id is a unique identifier automatically assigned to all StructureTS objects
     * when they're first created.
     *
     * @property cid
     * @type {int}
     */
    public cid:number;

    /**
     * The isEnabled property is used to keep track of the enabled state.
     *
     * @property isEnabled
     * @type {boolean}
     * @default false
     * @protected
     */
    public isEnabled:boolean = false;

    constructor() {
        //TODO: why is it converting to a string and not a number?
        this.cid = _.uniqueId();
    }

    /**
     * Returns the fully qualified class name of an object.
     *
     * @method getQualifiedClassName
     * @returns {string}
     * @public
     */
    public getQualifiedClassName():string
    {
        return this.CLASS_NAME;
    }

    /**
     * The enable method is responsible for enabling all event listeners and enabling children.
     *
     * @method enable
     * @public
     */
    public enable():void
    {
        if (this.isEnabled === true) return;

        this.isEnabled = true;
    }

    /**
     * The disable method is responsible for disabling all event listeners and disabling children.
     *
     * @method disable
     * @public
     */
    public disable():void
    {
        if (this.isEnabled === false) return;

        this.isEnabled = false;
    }

    /**
     * The purpose of the destroy method is to make an object ready for garbage collection. This
     * should be thought of as a one way function. Once destroy is called no further methods should be
     * called on the object or properties accessed. It is the responsibility of those who implement this
     * function to stop all running Timers, all running Sounds, remove any event
     * listeners and take any other steps necessary to make an object eligible for garbage collection.
     * It is critical that all subclasses call the super for this function in their overridden methods.
     *
     * @method destroy
     */
    public destroy():void
    {
        /*
        // Removing this code for now because if any class has a reference any other non-children classes then those class destroy method will be called and that would be bad.
        var key:string;
        for (key in this) {
            // Loop through all Objects and call the destroy function if it has one.
            if (typeof this[key]['destroy'] === 'function') {
                this[key].destroy();
            }

            this[key] = null;
        }
        */
    }

}
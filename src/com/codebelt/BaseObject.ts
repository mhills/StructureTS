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

///<reference path=''/>

/**
 * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureTS classes.
 *
 * @class BaseObject
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

}
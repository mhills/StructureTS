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
 * The Util...
 *
 * @class Util
 * @module StructureTS
 * @submodule util
 * @constructor
 **/
class Util {

    /**
     * @copy BaseObject.CLASS_NAME
     */
    public static CLASS_NAME:string = 'Util';

    /**
     * YUIDoc_comment
     *
     * @property idCounter
     * @type {init}
     * @private
     */
    private static _idCounter:number = 0;

    constructor() {}

    /**
     * Generates a unique ID. If prefix is passed, the ID will be appended to it.
     *
     * @param [prefix]
     * @returns {init|string}
     */
    public static uniqueId(prefix:string = null):any
    {
        var id:number = ++Util._idCounter;

        if (prefix != null) {
            return String(prefix + id);
        } else {
            return id;
        }
    }

    public static getRandomBoolean():boolean
    {
        return (Math.random() > .5) ? true : false;
    }

}
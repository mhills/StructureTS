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

/**
 * A Utility class that has several static methods to assist in development.
 *
 * @class Util
 * @module StructureTS
 * @submodule util
 * @constructor
 **/
class Util
{
    /**
     * @overridden BaseObject.CLASS_NAME
     */
    public static CLASS_NAME:string = 'Util';

    /**
     * Keeps track of the count for the uniqueId method.
     *
     * @property _idCounter
     * @type {init}
     * @private
     * @static
     */
    private static _idCounter:number = 0;

    constructor()
    {
    }

    /**
     * Generates a unique ID. If a prefix is passed in, the value will be appended to it.
     * @example
     *      var property:number = Util.uniqueId();
     *      // 1
     *
     *      var property:string = Util.uniqueId('yomama_');
     *      // yomama_1
     * @method uniqueId
     * @param [prefix] {string} The string value used for the prefix.
     * @returns {init|string} Returns the unique identifier.
     * @public
     * @static
     */
    public static uniqueId(prefix:string = null):any
    {
        var id:number = ++Util._idCounter;

        if (prefix != null)
        {
            return String(prefix + id);
        }
        else
        {
            return id;
        }
    }

    /**
     * @method deletePropertyFromObject
     * @param object {Object} The object you want to remove properties from.
     * @param list {array} A list of property names you want to remove from the object.
     * @returns {any} Returns the object passed in without the removed the properties.
     * @public
     * @static
     */
    public static deletePropertyFromObject(object:any, list:any[]):any
    {
        // Loop through the object properties.
        for (var key in object)
        {
            // If the key is a property and not function.
            if (object.hasOwnProperty(key))
            {
                var value:any = object[key];
                // If the property is an Array.
                if (value instanceof Array)
                {
                    // Loop through the Array and call the Util.deletePropertyFromObject method on each object in the array.
                    var array:any[] = value;
                    for (var index in array)
                    {
                        // Recursive function call.
                        Util.deletePropertyFromObject(array[index], list);
                    }
                }
                else
                {
                    // Loop through the list of property name.
                    for (var listIndex in list)
                    {
                        // If the key(property name) equals the property name in the list array.
                        if (key === list[listIndex])
                        {
                            // Delete the property from the object.
                            delete value;
                        }
                    }

                }
            }
        }

        return object;
    }

}
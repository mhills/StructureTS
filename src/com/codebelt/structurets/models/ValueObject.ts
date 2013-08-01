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

///<reference path='../interfaces/IValueObject.ts'/>
///<reference path='../BaseObject.ts'/>

/**
 * The ValueObject...
 *
 * @class ValueObject
 * @param [data] {any} Provide a way to update the value object upon initialization.
 * @module StructureTS
 * @submodule model
 * @constructor
 **/
class ValueObject extends BaseObject implements IValueObject
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'ValueObject';

    constructor(data:any = null)
    {
        super();

        if (data)
        {
            this.update(data);
        }
    }

    /**
     * Provide a way to update the value object.
     *
     * @method update
     * @param data {any}
     */
    public update(data:any):any
    {

        return this;
    }

    /**
     * ...
     *
     * @method toJSON
     * @returns {string}
     */
    public toJSON():string
    {
        return JSON.stringify(this.copy());
    }

    /**
     * Converts the string json data into an Object and calls the {{#crossLink "ValueObject/update:method"}}{{/crossLink}} method with the converted Object.
     *
     * @method fromJSON
     * @param json {string}
     */
    public fromJSON(json:string):any
    {
        var parsedData:any = JSON.parse(json);
        this.update(parsedData);

        return this;
    }

    /**
     * ...
     *
     * @method clone
     * @returns {Object}
     */
    public clone():Object
    {
        return _.cloneDeep(this);
    }

    /**
     * ...
     * TODO: make it return an IValueObject. Right now it only returns an Object.
     *
     * @method copy
     * @returns {IValueObject}
     */
    public copy():IValueObject
    {
        var copy:Object = new Object();

        for (var key in this)
        {
            if (key !== 'isEnabled' && this.hasOwnProperty(key))
            {
                copy[key] = this[key];
            }
        }

        return <IValueObject>copy;
    }

    /*public set(prop:any, value?:any):any
     {
     if (!prop) throw new Error('You must pass a argument into the set method.')

     if (typeof(prop) === "object")
     {
     for(var key in prop)
     {
     this[key] = prop[key];
     }
     }
     else if (typeof(prop) === "string")
     {
     this[prop] = value;
     }

     console.log("Event.change, todo: make it dispatch event?");
     return this;
     }*/

    /*public get(prop:string):any
     {
     if (!prop) return this;
     return this[prop];
     }*/

}
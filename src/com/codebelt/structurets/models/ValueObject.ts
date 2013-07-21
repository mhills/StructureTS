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

///<reference path='../interfaces/ICore.ts'/>
///<reference path='../BaseObject.ts'/>

/**
 * The ValueObject...
 *
 * @class ValueObject
 * @module StructureTS
 * @submodule model
 * @constructor
 **/
class ValueObject extends BaseObject implements ICore {

    public CLASS_NAME:string = 'ValueObject';

    public id:string;

    constructor()
    {
        super();
    }

    public toJsonString()
    {
        return JSON.stringify(this);
    }

    public toJSON()
    {
        return JSON.parse( JSON.stringify(this) );//TODO: don't stringify, make and deep clone.
    }

    public clone()
    {
        //TODO: deep clone object.
    }

    public copy(data) {
        for (var key in this) {
            if (key !== 'id' && this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }

    public set(prop:any, value?:any):any
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
    }

    public get(prop:string):any
    {
        if (!prop) return this;
        return this[prop];
    }

}
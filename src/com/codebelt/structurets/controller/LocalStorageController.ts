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

///<reference path='BaseController'/>
///<reference path='../events/LocalStorageEvent.ts'/>
///<reference path='../models/ValueObject.ts'/>

/**
 * The LocalStorageController...
 *
 * @class LocalStorageController
 * @module StructureTS
 * @submodule controller
 * @constructor
 **/
class LocalStorageController extends BaseController
{
    /**
     * @overridden EventDispatcher.CLASS_NAME
     */
    public CLASS_NAME:string = 'LocalStorageController';

    /**
     * Current user namespace. The namespace is optional.
     *
     * @property _namespace
     * @type {string}
     * @optional
     * @private
     */
    private _namespace:string = '';

    constructor()
    {
        super();

        window.addEventListener('storage', this.onLocalStorageEvent.bind(this));
    }

    /**
     * Set storage namespace
     *
     * @method setNamespace
     * @param namespace
     * @returns {string}
     */
    public setNamespace(namespace:string):void
    {
        this._namespace = namespace;
    }

    /**
     * Get storage namespace
     *
     * @method getNamespace
     * @returns {string}
     */
    public getNamespace():string
    {
        return this._namespace;
    }

    /**
     * Sets a key/value pair.
     *
     * @method setItem
     * @param key {string}
     * @param data {Object}
     * @param useNamespace {boolean}
     */
    public setItem(key:string, data:any, useNamespace:boolean = false):void
    {
        if (useNamespace)
        {
            key += this.getNamespace();
        }

        if (data instanceof ValueObject)
        {
            data = <ValueObject>data.toJSON();
        }
        else
        {
            data = JSON.stringify(data);
        }

        localStorage.setItem(key, data);
    }

    /**
     * Retrieves the current value associated with the Local Storage key.
     *
     * @method getItem
     * @param key {string}
     * @param [useNamespace=false] {string}
     * @returns {string}
     */
    public getItem(key:string, useNamespace:boolean = false):string
    {
        if (useNamespace)
        {
            key += this.getNamespace();
        }

        var value = localStorage.getItem(key);
        if (value)
        {
            value = JSON.parse(value);
        }

        return value;
    }

    /**
     * Deletes a key/value pair from the Local Storage collection.
     *
     * @method removeItem
     * @param key {string}
     * @param [useNamespace=false] {string}
     */
    public removeItem(key:string, useNamespace:boolean = false):void
    {
        if (useNamespace)
        {
            key += this.getNamespace();
        }

        localStorage.removeItem(key);
    }

    /**
     * Returns the size of the Local Storage.
     *
     * @method getSize
     * @returns {number}
     */
    public getSize():number
    {
        return encodeURIComponent(JSON.stringify(localStorage)).length;
    }

    /**
     * Removes all key/value pairs from the Local Storage area.
     *
     * @method clear
     */
    public clear():void
    {
        localStorage.clear();
    }

    /**
     *
     *
     * @method onLocalStorageEvent
     * @param event {StorageEvent} The native browser event for Web Storage.
     * @private
     */
    private onLocalStorageEvent(event:StorageEvent)
    {
        this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
    }

}
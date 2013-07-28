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

///<reference path='../interfaces/ICollection.ts'/>
///<reference path='../models/ValueObject.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/BaseEvent.ts'/>

/**
 * YUIDoc_comment
 *
 * @class Collection
 * @extends EventDispatcher
 * @module StructureTS
 * @submodule model
 * @constructor
 **/
class Collection extends EventDispatcher implements ICollection {

    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'Collection';

    /**
     * YUIDoc_comment
     *
     * @property _items
     * @type {array}
     * @protected
     */
    public _items:IValueObject[];

    /**
     * YUIDoc_comment
     *
     * @property length
     * @type {init}
     * @default 0
     * @readonly
     * @public
     */
    public length:number = 0;

    constructor() {
        super();

        this._items = [];
    }

    /**
     * Add an item to the current collection
     * Requires that the item must be an instance of {{#crossLink "IValueObject"}}{{/crossLink}} or extends the {{#crossLink "ValueObject"}}{{/crossLink}} class.
     *
     * @method addItem
     * @param item {IValueObject} The item or {{#crossLink "ValueObject"}}{{/crossLink}} to add.
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     */
    public addItem(item:IValueObject, silent:boolean = false):void {
        if (!(item instanceof ValueObject)) {
            throw new TypeError('Item must be of the IValueObject type');
        }

        if (!this.hasItem(item)) {
            this._items.push(item);
            this.length = this._items.length;
        }

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        }
    }

    /**
     * Removes an item from the collection, maintaining its current sort
     * If the collection doesn't have the item, it throws an error
     *
     * @method removeItem
     * @param item {IValueObject} Item to remove
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     */

    public removeItem(item:IValueObject, silent:boolean = false):void {
        if (!(item instanceof ValueObject)) {
            throw new TypeError('Item must be of the IValueObject type');
        }

        if (!this.hasItem(item)) {
            throw new Error('Collection does not have item ' + item);
        }

        this._items.splice(this._items.indexOf(item), 1);
        this.length = this._items.length;

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
        }
    }

    /**
     * Removes an array of items from the collection
     *
     * @method removeItems
     * @param items {IValueObject[]} List of items to add to the current collection
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     */
    public removeItems(items:IValueObject[], silent:boolean = false):void {
        var len:number = items.length;
        for (var i = 0; i < len; i++) {
            this.removeItem(items[i]);
        }

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
        }
    }

    /**
     * Checks if a collection has an item.
     *
     * @method hasItem
     * @param item {IValueObject} Item to check
     * @return {boolean}
     * @public
     */
    public hasItem(items:IValueObject):boolean {
        return !this._items.indexOf(items);
    }

    /**
     * Adds an array of items to the collection
     *
     * @method addItems
     * @param items {IValueObject[]} List of items to add to the current collection.
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     */
    public addItems(items:IValueObject[], silent:boolean = false):void {
        var len:number = items.length;
        for (var i = 0; i < len; i++) {
            this.addItem(items[i]);
        }

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        }
    }

    /**
     * Finds an object by an index value.
     * If the index is out of bounds, the collection will clamp it.
     *
     * @method getItemByIndex
     * @param index {init} The index integer of the item to get
     * @return {IValueObject} item to find
     * @public
     *
     */
    public getItemByIndex(index:number):IValueObject {
        if (index < 0) {
            index = 0;
        }

        if (index >= this._items.length) {
            index = this._items.length - 1;
        }

        // Return the item by the index. It will return null if the array is empty.
        return this._items[index] || null;
    }

    /**
     * Loops through each object in the collection and performs some function from it
     *
     * @method forEach
     * @param operation {Function} Operation to perform, provides 2 parameters element, and index
     * @public
     */
    public forEach(operation:any):void {
//        _.each(this._items, operation);
    }

    /**
     * Examines each element in a collection, returning an array of all elements that have the given properties.
     * When checking properties, this method performs a deep comparison between values to determine if they are equivalent to each other.
     *
     * @method find
     * @public
     */
    public find(properties:any):IValueObject[] {
        return _.where(this._items, properties);
    }

    /**
     * Sorts the collection based on the sort function provided
     *
     * @method sort
     * @param sort {Function} Sort to use, provides 2 users
     * @public
     */
    //TODO: figure out to set the type to Function with out getting error: Type '(x: IValueObject) => boolean' requires a call signature, but type 'Function' lacks one.
    public sort(sort:any):void {
//        this._items.sort(sort);
    }

    /**
     * Filters the collection based on the filter test operation provided
     *
     * @method filter
     * @param filter {Function} Operation to perform, provides 2 parameters element, and index

     * @public
     */
    //TODO: figure out to set the type to Function with out getting error: Type '(x: IValueObject) => boolean' requires a call signature, but type 'Function' lacks one.
    public filter(filter:any, removeItems:boolean = false):IValueObject[] {
        if (removeItems) {
//            _.filter(this._items, filter);
//            this.length = this._items.length;
//            return this._items;
        } else {
//            var collection:ICollection = this.copy();
//            collection.filter(filter, true);
//            _.filter(collection._items, filter);
//            return
        }
        return null;
    }

    /**
     * Applies a function to each of the items in the list
     *
     * @method map
     * @param {Function} map Operation to perform, provides 2 parameters element, and index
     */
    public map(map:any) {
//        this._items = _.map(this._items, map);
    }

//    /**
//     * YUIDoc_comment
//     *
//     * @method clone
//     * @public
//     */
//    public clone():void {
//
//    }

    /**
     * YUIDoc_comment
     *
     * @method copy
     * @public
     */
    public copy():ICollection {
        var collection:ICollection = new Collection();
        collection.addItems(this._items.slice(0));
        return collection;
    }

    /**
     * YUIDoc_comment
     *
     * @method clear
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     */
    public clear(silent:boolean = false):void {
        this._items = [];
        this.length = 0;

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.CLEAR));
        }
    }

    /**
     * @copy BaseObject.destroy
     * @overridden
     */
    public destroy():void {
        this._items = null;
        this.length = null;

        super.destroy();
    }

}
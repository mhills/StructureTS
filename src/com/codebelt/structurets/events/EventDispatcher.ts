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

///<reference path='../BaseObject.ts'/>
///<reference path='BaseEvent.ts'/>

/**
 * The EventDispatcher class is the base class for all classes that dispatch events and is the base class for the DisplayObject class.
 * The EventDispatcher class allows any object on the display list to be an event target.
 * The EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
 * {{#crossLink "DisplayObject"}}{{/crossLink}} classes dispatch events.
 *
 * @class EventDispatcher
 * @extends BaseObject
 * @module StructureTS
 * @submodule event
 * @constructor
 **/
class EventDispatcher extends BaseObject
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'EventDispatcher';

    /**
     * Holds a reference to added listeners.
     *
     * @property _listeners
     * @type {array}
     * @private
     */
     private _listeners:any[] = null;

    /**
     * Indicates the object that contains child object. Use the parent property
     * to specify a relative path to display objects that are above the current display object in the display
     * list hierarchy.
     *
     * @property parent
     * @type {any}
     */
    public parent:any = null;

    constructor()
    {
        super();

        this._listeners = [];
    }

    /**
     * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
     * @example
     *      instance.addEventListener(BaseEvent.CHANGE, handlerMethod, this);
     *      private handlerMethod(event:BaseEvent):void {
     *          console.log(event.target + " sent the event.");
     *      }
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     */
    public addEventListener(type:string, callback:Function, scope:any, priority:number=0):any
    {
        var list = this._listeners[type];
        if (list == null) {
            this._listeners[type] = list = [];
        }
        var index:number = 0;
        var listener;
        var i:number = list.length;
        while (--i > -1) {
            listener = list[i];
            if (listener.c === callback && listener.s === scope) {
                list.splice(i, 1);//If same callback and scope is found remove it. Then add the current one below.
            } else if (index === 0 && listener.pr < priority) {
                index = i + 1;
            }
        }
        list.splice(index, 0, {c: callback, s: scope, pr: priority});

        return this;
    }

    /**
     * Removes a specified listener from the EventDispatcher object.
     * @example
     *      instance.removeEventListener(BaseEvent.CHANGE, handlerMethod, this);
     *      private handlerMethod(event:BaseEvent):void {
     *          console.log(event.target + " sent the event.");
     *      }
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener object to remove.
     * @param scope {any} The scope of the listener object to be removed.
     * @hide This was added because it was need for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
     */
    public removeEventListener(type:string, callback:Function, scope:any):any
    {
        var list = this._listeners[type];
        if (list) {
            var i = list.length;
            while (--i > -1) {
                if (list[i].c === callback && list[i].s === scope) {
                    list.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    }

    /**
     * <p>Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the dispatchEvent() method is called.</p>
     * TODO: show this example: http://www.rubenswieringa.com/blog/eventbubbles-eventcancelable-and-eventcurrenttarget
     * @example
     *      var event:BaseEvent = new BaseEvent(BaseEvent.CHANGE);
     *      instance.dispatchEvent(event);
     *
     *      // Here is a common inline event being dispatched
     *      instance.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
     * @method dispatchEvent
     * @param event {BaseEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
     * extend the {{#crossLink "BaseEvent"}}{{/crossLink}}.
     */
    public dispatchEvent(event:BaseEvent):any
    {
        if (event.target == null) {
            event.target = this;
        }

        var list = this._listeners[event.type];
        if (list) {
            var i:number = list.length;
            var listener:any;
            while (--i > -1) {
                // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                if (event.cancelable && event.isImmediatePropagationStopped) break;

                listener = list[i];
                listener.c.call(listener.s, event);
            }
        }

        //Dispatches up the chain of classes that have a parent.
        if (this.parent && event.bubble) {
            // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
            if (event.cancelable && event.isPropagationStopped) return this;

            this.parent.dispatchEvent(event);
        }

        return this;
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
        this.parent = null;
        this._listeners = [];

        // TODO: maybe do what is Destruction Lifecycle: http://js.nerderylabs.com/best-practices/view-objects-in-javascript/
    }

}
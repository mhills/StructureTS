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
 * The EventDispatcher class is the base class for all classes that dispatch events and is the base class for the DisplayObjectContainer class.
 * The EventDispatcher class allows any object on the display list to be an event target.
 * The EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
 * {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} classes dispatch events.
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

        this._listeners = [];
    }

    /**
     * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
     * @example
     *      instance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *      private handlerMethod(event:BaseEvent):void {
     *          console.log(event.target + " sent the event.");
     *      }
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @chainable
     */
    public addEventListener(type:string, callback:Function, scope:any, priority:number = 0):EventDispatcher
    {
        // Get the list of event listener(s) by the associated type value that is passed in.
        var list = this._listeners[type];
        if (list == null)
        {
            // If a list of event listener(s) do not exist for the type value passed in then create a new empty array.
            this._listeners[type] = list = [];
        }
        var index:number = 0;
        var listener;
        var i:number = list.length;
        while (--i > -1)
        {
            listener = list[i];
            if (listener.c === callback && listener.s === scope)
            {
                // If same callback and scope is found then remove it. Then add the current one below.
                list.splice(i, 1);
            }
            else if (index === 0 && listener.pr < priority)
            {
                index = i + 1;
            }
        }
        // Add the event listener to the list array at the index value.
        list.splice(index, 0, {c: callback, s: scope, pr: priority});

        return this;
    }

    /**
     * Removes a specified listener from the EventDispatcher object.
     * @example
     *      instance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *      private handlerMethod(event:BaseEvent):void {
     *          console.log(event.target + " sent the event.");
     *      }
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener object to remove.
     * @param scope {any} The scope of the listener object to be removed.
     * @hide This was added because it was need for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
     * @chainable
     */
    public removeEventListener(type:string, callback:Function, scope:any):EventDispatcher
    {
        // Get the list of event listener(s) by the associated type value that is passed in.
        var list = this._listeners[type];
        if (list)
        {
            var i = list.length;
            while (--i > -1)
            {
                // If the callback and the scope are the same then remove the event listener.
                if (list[i].c === callback && list[i].s === scope)
                {
                    list.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    }

    /**
     * <p>Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the dispatchEvent() method is called.</p>
     * @example
     *      var event:BaseEvent = new BaseEvent(BaseEvent.CHANGE);
     *      instance.dispatchEvent(event);
     *
     *      // Here is a common inline event being dispatched
     *      instance.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
     * @method dispatchEvent
     * @param event {BaseEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
     * extend the {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @chainable
     */
    public dispatchEvent(event:BaseEvent):EventDispatcher
    {
        // If target is null then set it to the object that dispatched the event.
        if (event.target == null)
        {
            event.target = this;
        }

        // Assign the current object that is currently processing the event (i.e. bubbling at) in the display list hierarchy.
        event.currentTarget = this;

        // Get the list of event listener(s) by the associated type value.
        var list = this._listeners[event.type];
        if (list)
        {
            var i:number = list.length;
            var listener:any;
            while (--i > -1)
            {
                // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                if (event.cancelable && event.isImmediatePropagationStopped) break;

                listener = list[i];
                listener.c.call(listener.s, event);
            }
        }

        //Dispatches up the chain of classes that have a parent.
        if (this.parent && event.bubble)
        {
            // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
            if (event.cancelable && event.isPropagationStopped) return this;

            // Pass the event to the parent (event bubbling).
            this.parent.dispatchEvent(event);
        }

        return this;
    }

    /**
     * @copy CollectiveObject.destroy
     * @overridden
     */
    public destroy():void
    {
        super.destroy();

        this.disable();
        this.isEnabled = false;

        this.parent = null;
        this._listeners = null;
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

}
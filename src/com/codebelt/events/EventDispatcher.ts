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
     *
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @returns {EventDispatcher}
     * @example
     *      instance.addEventListener(BaseEvent.CHANGE, handlerMethod, this);
     *      private handlerMethod(event:BaseEvent):void {
     *          console.log(event.target + " sent the event.");
     *      }
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
            if (listener.c === callback) {
                list.splice(i, 1);//If same callback is found remove it. It will be add back below.
            } else if (index === 0 && listener.pr < priority) {
                index = i + 1;
            }
        }
        list.splice(index, 0, {c: callback, s: scope, pr: priority});

        return this;
    }

    /**
     * Removes a specified listener from the EventDispatcher object.
     *
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener object to remove.
     * @returns {EventDispatcher}
     * @example
     *      instance.removeEventListener(BaseEvent.CHANGE, handlerMethod);
     *      private handlerMethod(event:BaseEvent):void {
     *          console.log(event.target + " sent the event.");
     *      }
     */
    public removeEventListener(type:string, callback:Function):any
    {
        var list = this._listeners[type];
        if (list) {
            var i = list.length;
            while (--i > -1) {
                if (list[i].c === callback) {
                    list.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    }

    /**
     * Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the dispatchEvent() method is called.
     *
     * @method dispatchEvent
     * @param event {BaseEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
     * extend the {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @returns {EventDispatcher}
     * @example
     *      var event:BaseEvent = new BaseEvent(BaseEvent.CHANGE);
     *      instance.dispatchEvent(event);
     *
     *      // Here is a common inline event being dispatched
     *      instance.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
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
                if (event.isImmediatePropagationStopped == false) break;
                listener = list[i];
                listener.c.call(listener.s, event);
            }
        }

        //Dispatches up the chain of classes that have a parent.
        if (this.parent && event.isPropagationStopped) {
            this.parent.dispatchEvent(event);
        }

        return this;
    }

}
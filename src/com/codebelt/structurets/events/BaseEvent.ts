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
///<reference path='../interfaces/ICore.ts'/>

/**
 * <p>The {{#crossLink "BaseEvent"}}{{/crossLink}} class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.</p>
 *
 * <p>The properties of the {{#crossLink "BaseEvent"}}{{/crossLink}} class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.
 * For many events, such as the events represented by the Event class constants, this basic information is sufficient. Other events, however, may require more
 * detailed information.</p>
 *
 * @class BaseEvent
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: Bubbling will only work with DisplayObject classes throw the display list hierarchy. Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [data=null] {any}
 * @extends BaseObject
 * @requires ICore
 * @module StructureTS
 * @submodule event
 * @constructor
 **/
class BaseEvent extends BaseObject implements ICore {

    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'BaseEvent';

    /**
     * The BaseEvent.ACTIVATE constant defines the value of the type property of an activate event object.
     *
     * @event BaseEvent.ACTIVATE
     * @type {string}
     * @static
     */
    public static ACTIVATE:string = 'BaseEvent.activate';

    /**
     * The BaseEvent.ADDED constant defines the value of the type property of an added event object.
     *
     * @event BaseEvent.ADDED
     * @type {string}
     * @static
     */
    public static ADDED:string = 'BaseEvent.added';

    /**
     * The BaseEvent.ADDED_TO_STAGE constant defines the value of the type property of an addedToStage event object.
     *
     * @event BaseEvent.ADDED_TO_STAGE
     * @type {string}
     * @static
     */
    public static ADDED_TO_STAGE:string = 'BaseEvent.addedToStage';

    /**
     * The BaseEvent.CANCEL constant defines the value of the type property of a cancel event object.
     *
     * @event BaseEvent.CANCEL
     * @type {string}
     * @static
     */
    public static CANCEL:string = 'BaseEvent.cancel';

    /**
     * The BaseEvent.CHANGE constant defines the value of the type property of a change event object.
     *
     * @event BaseEvent.CHANGE
     * @type {string}
     * @static
     */
    public static CHANGE:string = 'BaseEvent.change';

    /**
     * The BaseEvent.CLEAR constant defines the value of the type property of a clear event object.
     *
     * @event BaseEvent.CLEAR
     * @type {string}
     * @static
     */
    public static CLEAR:string = 'BaseEvent.clear';

    /**
     * The BaseEvent.CLOSE constant defines the value of the type property of a close event object.
     *
     * @event BaseEvent.CLOSE
     * @type {string}
     * @static
     */
    public static CLOSE:string = 'BaseEvent.close';

    /**
     * The BaseEvent.CLOSING constant defines the value of the type property of a closing event object.
     *
     * @event BaseEvent.CLOSING
     * @type {string}
     * @static
     */
    public static CLOSING:string = 'BaseEvent.closing';

    /**
     * The BaseEvent.COMPLETE constant defines the value of the type property of a complete event object.
     *
     * @event BaseEvent.COMPLETE
     * @type {string}
     * @static
     */
    public static COMPLETE:string = 'BaseEvent.complete';

    /**
     * The BaseEvent.CONNECT constant defines the value of the type property of a connect event object.
     *
     * @event BaseEvent.CONNECT
     * @type {string}
     * @static
     */
    public static CONNECT:string = 'BaseEvent.connect';

    /**
     * Defines the value of the type property of a copy event object.
     *
     * @event BaseEvent.COPY
     * @type {string}
     * @static
     */
    public static COPY:string = 'BaseEvent.copy';

    /**
     * Defines the value of the type property of a cut event object.
     *
     * @event BaseEvent.CUT
     * @type {string}
     * @static
     */
    public static CUT:string = 'BaseEvent.cut';

    /**
     * The BaseEvent.DEACTIVATE constant defines the value of the type property of a deactivate event object.
     *
     * @event BaseEvent.DEACTIVATE
     * @type {string}
     * @static
     */
    public static DEACTIVATE:string = 'BaseEvent.deactivate';

    /**
     * The BaseEvent.DISPLAYING constant defines the value of the type property of a displaying event object.
     *
     * @event BaseEvent.DISPLAYING
     * @type {string}
     * @static
     */
    public static DISPLAYING:string = 'BaseEvent.displaying';

    /**
     * The BaseEvent.ENTER_FRAME constant defines the value of the type property of an enterFrame event object.
     *
     * @event BaseEvent.ENTER_FRAME
     * @type {string}
     * @static
     */
    public static ENTER_FRAME:string = 'BaseEvent.enterFrame';

    /**
     * The BaseEvent.EXIT_FRAME constant defines the value of the type property of an exitFrame event object.
     *
     * @event BaseEvent.EXIT_FRAME
     * @type {string}
     * @static
     */
    public static EXIT_FRAME:string = 'BaseEvent.exitFrame';

    /**
     * The BaseEvent.EXITING constant defines the value of the type property of an exiting event object.
     *
     * @event BaseEvent.EXITING
     * @type {string}
     * @static
     */
    public static EXITING:string = 'BaseEvent.exiting';

    /**
     * The BaseEvent.FULL_SCREEN constant defines the value of the type property of a fullScreen event object.
     *
     * @event BaseEvent.FULLSCREEN
     * @type {string}
     * @static
     */
    public static FULLSCREEN:string = 'BaseEvent.fullScreen';

    /**
     * The BaseEvent.INIT constant defines the value of the type property of an init event object.
     *
     * @event BaseEvent.INIT
     * @type {string}
     * @static
     */
    public static INIT:string = 'BaseEvent.init';

    /**
     * The BaseEvent.NETWORK_CHANGE constant defines the value of the type property of a networkChange event object.
     *
     * @event BaseEvent.NETWORK_CHANGE
     * @type {string}
     * @static
     */
    public static NETWORK_CHANGE:string = 'BaseEvent.networkChange';

    /**
     * The BaseEvent.OPEN constant defines the value of the type property of an open event object.
     *
     * @event BaseEvent.OPEN
     * @type {string}
     * @static
     */
    public static OPEN:string = 'BaseEvent.open';

    /**
     * The BaseEvent.PASTE constant defines the value of the type property of a paste event object.
     *
     * @event BaseEvent.PASTE
     * @type {string}
     * @static
     */
    public static PASTE:string = 'BaseEvent.paste';

    /**
     * The BaseEvent.PREPARING constant defines the value of the type property of a preparing event object.
     *
     * @event BaseEvent.PREPARING
     * @type {string}
     * @static
     */
    public static PREPARING:string = 'BaseEvent.preparing';

    /**
     * The BaseEvent.REMOVED constant defines the value of the type property of a removed event object.
     *
     * @event BaseEvent.REMOVED
     * @type {string}
     * @static
     */
    public static REMOVED:string = 'BaseEvent.removed';

    /**
     * The BaseEvent.RENDER constant defines the value of the type property of a render event object.
     *
     * @event BaseEvent.RENDER
     * @type {string}
     * @static
     */
    public static RENDER:string = 'BaseEvent.render';

    /**
     * The BaseEvent.RESIZE constant defines the value of the type property of a resize event object.
     *
     * @event BaseEvent.RESIZE
     * @type {string}
     * @static
     */
    public static RESIZE:string = 'BaseEvent.resize';

    /**
     * The type of event.
     *
     * @property type
     * @type {string}
     * @default null
     * @readOnly
     */
    public type:string = null;

    /**
     * The event target.
     *
     * @property target
     * @type {any}
     * @default null
     * @readOnly
     */
    public target:any = null;

    /**
     *
     * @property data
     * @type {any}
     * @default null
     * @readOnly
     */
    public data:any = null;

    /**
     * Indicates whether an event is a bubbling event.
     *
     * @property bubble
     * @type {boolean}
     * @default false
     * @readOnly
     */
    public bubble:boolean = false;

    /**
     * Indicates whether the behavior associated with the event can be prevented.
     *
     * @property cancelable
     * @type {boolean}
     * @default false
     * @readOnly
     */
    public cancelable:boolean = false;

    /**
     *
     * @property isPropagationStopped
     * @type {boolean}
     * @default false
     * @readOnly
     */
    public isPropagationStopped:boolean = false;

    /**
     *
     * @property isImmediatePropagationStopped
     * @type {boolean}
     * @default false
     * @readOnly
     */
    public isImmediatePropagationStopped:boolean = false;

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null) {
        super();

        this.type = type;
        this.bubble = bubbles;
        this.cancelable = cancelable;
        this.data = data;
    }

    /**
     * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
     * This method does not affect any event listeners in the current node (currentTarget). In contrast, the stopImmediatePropagation()
     * method prevents processing of event listeners in both the current node and subsequent nodes. Additional calls to this method have no effect.
     * This method can be called in any phase of
     *
     * @method stopPropagation
     */
    stopPropagation():void {
        this.isPropagationStopped = true;
    }

    /**
     * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
     * This method takes effect immediately, and it affects event listeners in the current node. In contrast, the stopPropagation()
     * method doesn't take effect until all the event listeners in the current node finish processing.
     *
     * @method stopImmediatePropagation
     */
    stopImmediatePropagation():void {
        this.stopPropagation();
        this.isImmediatePropagationStopped = true;
    }

}
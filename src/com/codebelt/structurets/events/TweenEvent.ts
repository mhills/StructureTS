///<reference path='BaseEvent.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TweenEvent
 * @extends BaseEvent
 * @module StructureTS
 * @submodule event
 * @constructor
 **/
class TweenEvent extends BaseEvent
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'TweenEvent';

    /**
     * YUIDoc_comment
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static START:string = "TweenEvent.start";

    /**
     * YUIDoc_comment
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static UPDATE:string = "TweenEvent.update";

    /**
     * YUIDoc_comment
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static COMPLETE:string = "TweenEvent.complete";

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, tweenObject:any = null)
    {
        super(type, bubbles, cancelable, tweenObject);
    }

}
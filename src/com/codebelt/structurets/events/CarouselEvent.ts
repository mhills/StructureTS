///<reference path='BaseEvent.ts'/>

/**
 * YUIDoc_comment
 *
 * @class CarouselEvent
 * @extends BaseEvent
 * @module StructureTS
 * @submodule event
 * @constructor
 **/
class CarouselEvent extends BaseEvent
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'CarouselEvent';

    /**
     * YUIDoc_comment
     *
     * @event START
     * @type {string}
     * @static
     */
    public static START:string = "CarouselEvent.start";

    /**
     * YUIDoc_comment
     *
     * @event END
     * @type {string}
     * @static
     */
    public static END:string = "CarouselEvent.end";

    /**
     * YUIDoc_comment
     *
     * @event NEXT
     * @type {string}
     * @static
     */
    public static NEXT:string = "CarouselEvent.next";

    /**
     * YUIDoc_comment
     *
     * @event PREVIOUS
     * @type {string}
     * @static
     */
    public static PREVIOUS:string = "CarouselEvent.previous";

    /**
     * YUIDoc_comment
     *
     * @event CHANGE
     * @type {string}
     * @static
     */
    public static CHANGE:string = "CarouselEvent.change";

    /**
     * YUIDoc_comment
     *
     * @event PROGRESS
     * @type {string}
     * @static
     */
    public static PROGRESS:string = "CarouselEvent.progress";

    /**
     * YUIDoc_comment
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static COMPLETE:string = "CarouselEvent.complete";

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type, bubbles, cancelable, data);
    }

}
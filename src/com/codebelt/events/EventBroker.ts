///<reference path='EventDispatcher.ts'/>

/**
 * YUIDoc_comment
 *
 * @class EventBroker
 * @static
 **/
class EventBroker {

    public static CLASS_NAME:string = 'EventBroker';

    public static _eventDispatcher:EventDispatcher = new EventDispatcher();

    constructor() {}

    public static addEventListener(type:string, callback:Function, scope:any, priority:number=0):any
    {
        EventBroker._eventDispatcher.addEventListener(type, callback, scope, priority);
    }

    public static removeEventListener(type:string, callback:Function):any
    {
        EventBroker._eventDispatcher.removeEventListener(type, callback);
    }

    public static dispatchEvent(event:BaseEvent):any
    {
        EventBroker._eventDispatcher.dispatchEvent(event);
    }

}
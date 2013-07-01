///<reference path='EventDispatcher.ts'/>

/**
 * YUIDoc_comment
 *
 * @class EventBroker
 * @constructor
 **/
class EventBroker {

    public CLASS_NAME:string = 'EventBroker';

    private _eventDispatcher:EventDispatcher;

    constructor() {
        this._eventDispatcher = new EventDispatcher();
    }

    public static addEventListener(type:string, callback:Function, scope:any, priority:number=0):any
    {
//        var list = this._listeners[type];
//        if (list == null) {
//            this._listeners[type] = list = [];
//        }
//        var index:number = 0;
//        var listener;
//        var i:number = list.length;
//        while (--i > -1) {
//            listener = list[i];
//            if (listener.c === callback) {
//                list.splice(i, 1);//If same callback is found remove it. It will be add back below.
//            } else if (index === 0 && listener.pr < priority) {
//                index = i + 1;
//            }
//        }
//        list.splice(index, 0, {c: callback, s: scope, pr: priority});
//
//        return this;
    }

    public static removeEventListener(type:string, callback:Function):any
    {
//        var list = this._listeners[type];
//        if (list) {
//            var i = list.length;
//            while (--i > -1) {
//                if (list[i].c === callback) {
//                    list.splice(i, 1);
//                    break;
//                }
//            }
//        }
//
//        return this;
    }

    public static dispatchEvent(event:BaseEvent):any
    {
//        if (event.target == null) {
//            event.target = this;
//        }
//
//        var list = this._listeners[event.type];
//        if (list) {
//            var i:number = list.length;
//            var listener:any;
//            while (--i > -1) {
//                if (event.isImmediatePropagationStopped == false) break;
//                listener = list[i];
//                listener.c.call(listener.s, event);
//            }
//        }
//
//        //Dispatches up the chain of classes that have a parent.
//        if (this.parent && event.isPropagationStopped) {
//            this.parent.dispatchEvent(event);
//        }
//
//        return this;
    }
}
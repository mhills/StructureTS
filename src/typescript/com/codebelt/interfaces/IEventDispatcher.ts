///<reference path='ICore.ts'/>
///<reference path='../events/BaseEvent.ts'/>

interface IEventDispatcher extends ICore
{
    addEventListener(type:string, func:Function, scope:any, priority?:number);
    removeEventListener(type:string, func:Function);
    dispatchEvent(event:BaseEvent);
}

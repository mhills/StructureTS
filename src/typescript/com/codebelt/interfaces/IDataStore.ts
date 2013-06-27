///<reference path='IEventDispatcher.ts'/>

interface IDataStore extends IEventDispatcher
{
    data:any;
    src:string;
    complete:boolean;
    load():void;
}
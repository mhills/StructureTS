///<reference path='BaseEvent.ts'/>

/**
 * The LoaderEvent...
 *
 * @class LoaderEvent
 * @constructor
 **/
class LoaderEvent extends BaseEvent {

    public CLASS_NAME:string = 'LoaderEvent';

    static COMPLETE:string = "LoaderEvent.complete";
    static LOAD_COMPLETE:string = "LoaderEvent.loadComplete";

    constructor(type:string, data:any=null)
    {
        super(type, data);
    }

}
///<reference path='BaseEvent.ts'/>

class RequestEvent extends BaseEvent {

    public CLASS_NAME:string = 'RequestEvent';

    static SUCCESS:string = "RequestEvent.success";
    static ERROR:string = "RequestEvent.error";

    constructor(type:string, data:any=null)
    {
        super(type, data);
    }

}
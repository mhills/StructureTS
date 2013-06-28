///<reference path='../interfaces/ICore.ts'/>

class BaseEvent implements ICore  {

    public CLASS_NAME:string = 'BaseEvent';

    static CHANGE:string = "BaseEvent.change";
    static COMPLETE:string = "BaseEvent.complete";
    static ENTER_FRAME:string = "BaseEvent.enterFrame";

    public type:string = null;
    public target:any = null;
    public data:any = null;

    public bubble:boolean = true;
    public isPropagationStopped:boolean = true;
    public isImmediatePropagationStopped:boolean = true;

    constructor(type:string, data:any=null)
    {
        this.type = type;
//        this.target = target;
        this.data = data;
    }

    stopPropagation():void
    {
        this.isPropagationStopped = false;
    }

    stopImmediatePropagation():void
    {
        this.stopPropagation();
        this.isImmediatePropagationStopped = false;
    }

    /**
     * Returns the fully qualified class name of an object.
     *
     * @returns {string}
     */
    public getQualifiedClassName():string
    {
        return this.CLASS_NAME;
    }

}
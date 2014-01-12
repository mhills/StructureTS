///<reference path='../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

module codeBelt
{
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * YUIDoc_comment
     *
     * @class ListItemEvent
     * @extends BaseEvent
     * @constructor
     **/
    export class ListItemEvent extends BaseEvent
    {

        public CLASS_NAME:string = 'ListItemEvent';

        static LIST_SUCCESS:string = "ListItemEvent.listSuccess";
        static ADD_SUCCESS:string = "ListItemEvent.addSuccess";
        static REMOVE_SUCCESS:string = "ListItemEvent.removeSuccess";

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
        {
            super(type, bubbles, cancelable, data);
        }

    }
}
///<reference path='../../../../../src/com/codebelt/models/ValueObject.ts'/>

///<reference path='../../../../../src/com/codebelt/events/BaseEvent.ts'/>
///<reference path='../../../../../src/com/codebelt/events/EventBroker.ts'/>

/**
 * YUIDoc_comment
 *
 * @class ListItemVO
 * @extends ValueObject
 * @constructor
 **/
class ListItemVO extends ValueObject {

    public CLASS_NAME:string = 'ListItemVO';

    /**
     * @type {string}
     */
    public content:string = null;

    /**
     * @type {boolean}
     * @default false
     */
    public isComplete:boolean = false;

    constructor() {
        super();
        EventBroker.addEventListener(BaseEvent.CHANGE, this.eventBrokerExample, this);

        console.log(EventBroker._eventDispatcher)
    }

    private eventBrokerExample(event:BaseEvent):void
    {
        console.log(event, this.cid, typeof this.cid);
    }

}
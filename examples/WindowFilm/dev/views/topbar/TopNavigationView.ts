///<reference path='../../../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/events/BaseEvent.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TopNavigationView
 * @constructor
 **/
class TopNavigationView extends DOMElement {

    public CLASS_NAME:string = 'TopNavigationView';

    constructor() {
        super();
    }

    public createChildren():void {
        super.createChildren('templates/topbar/TopNavigationTemplate.tpl');

        this.dispatchEvent(new BaseEvent(BaseEvent.ACTIVATE, true, false, null));
    }

}
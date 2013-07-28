///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/events/BaseEvent.ts'/>

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

    public createChildren():DOMElement {
        super.createChildren('templates/topbar/TopNavigationTemplate.tpl');

        return this;
    }

}
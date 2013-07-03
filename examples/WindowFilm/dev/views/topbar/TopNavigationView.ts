///<reference path='../../../../../src/com/codebelt/display/DOMElement.ts'/>

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
    }

}
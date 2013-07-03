///<reference path='../../../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/utils/TemplateFactory.ts'/>

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

//        this.useTemplate('templates/topbar/TopNavigationTemplate.tpl');
//        this.createChildren('templates/topbar/TopNavigationTemplate.tpl');

        this.$el = TemplateFactory.createTemplate('templates/topbar/TopNavigationTemplate.tpl');
        this.el = this.$el[0];
    }

}
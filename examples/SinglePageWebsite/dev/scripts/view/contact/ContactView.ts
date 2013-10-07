///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/util/TemplateFactory.ts'/>

class ContactView extends DOMElement
{
    private TITLE:string = "Contact View";

    constructor()
    {
        super();
    }

    public createChildren():DOMElement
    {
        super.createChildren('templates/ContactTemplate.tpl', {name: "Robert"});
        return this;
    }

    public layoutChildren():DOMElement
    {
        document.title = this.TITLE;
        return this;
    }

}
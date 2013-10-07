///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/util/TemplateFactory.ts'/>

class AboutView extends DOMElement
{
    private TITLE:string = "About View";

    constructor()
    {
        super();
    }

    public createChildren():DOMElement
    {
        super.createChildren('templates/AboutTemplate.tpl', {name: "Robert"});

        return this;
    }

    public layoutChildren():DOMElement
    {
        document.title = this.TITLE;
        return this;
    }

}
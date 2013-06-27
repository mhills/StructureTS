///<reference path='../../../../../src/typescript/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/typescript/com/codebelt/utils/TemplateFactory.ts'/>

class ContactView extends DOMElement
{
    private TITLE:string = "Contact View";

    constructor()
    {
        super();
    }

    public createChildren():void
    {
        this.$el = TemplateFactory.createTemplate('templates/ContactTemplate.tpl', {name: "Robert"});

        super.createChildren();
    }

    public layoutChildren():void
    {
        document.title = this.TITLE;
    }

    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    }

}
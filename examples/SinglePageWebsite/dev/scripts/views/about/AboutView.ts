///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/utils/TemplateFactory.ts'/>

class AboutView extends DOMElement
{
    private TITLE:string = "About View";

    constructor()
    {
        super();
    }

    public createChildren():void
    {
        this.$el = TemplateFactory.createTemplate('templates/AboutTemplate.tpl', {name: "Robert"});

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
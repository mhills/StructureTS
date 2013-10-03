///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/utils/TemplateFactory.ts'/>


class HomeBodyTemp extends DOMElement
{
    constructor()
    {
        super();
    }

    createChildren()
    {
        this.$element = TemplateFactory.createTemplate('templates/HomeBody.tpl', {name: "Robert"});

        super.createChildren();
    }

    public layoutChildren():void
    {
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

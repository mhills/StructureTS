///<reference path='../../../../../src/typescript/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/typescript/com/codebelt/utils/BulkLoader.ts'/>
///<reference path='../../../../../src/typescript/com/codebelt/utils/TemplateFactory.ts'/>


class HomeBodyTemp extends DOMElement
{
    constructor()
    {
        super();
    }

    createChildren()
    {
        this.$el = TemplateFactory.createTemplate('templates/HomeBody.tpl', {name: "Robert"});

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

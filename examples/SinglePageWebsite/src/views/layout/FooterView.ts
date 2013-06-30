///<reference path='../../../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/utils/BulkLoader.ts'/>
///<reference path='../../../../../src/com/codebelt/utils/TemplateFactory.ts'/>

///<reference path='LanguageSelect.ts'/>

class FooterView extends DOMElement
{
    constructor()
    {
        super();
    }

    public createChildren()
    {
        this.$el = TemplateFactory.createTemplate('templates/Footer.tpl');

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
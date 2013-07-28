///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/utils/BulkLoader.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/utils/TemplateFactory.ts'/>

///<reference path='LanguageSelect.ts'/>

class FooterView extends DOMElement
{
    constructor()
    {
        super();
    }

    public createChildren():DOMElement
    {
        super.createChildren('templates/Footer.tpl');

        return this;
    }

}
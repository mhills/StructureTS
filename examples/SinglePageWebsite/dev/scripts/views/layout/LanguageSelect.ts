///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/events/LanguageEvent.ts'/>

///<reference path='../../models/MainLanguageModel.ts'/>

class LanguageSelect extends DOMElement {

    public CLASS_NAME:string = 'LanguageSelect';

    constructor()
    {
        super();
    }

    public createChildren():DOMElement
    {
        var languageManagerData = MainLanguageModel.getInstance().data;
        super.createChildren(function(data)
        {
            select(
                option({value: 'en'}, 'English'),
                option({value: 'fr'}, 'French'),
                option({value: 'sp'}, 'Spanish')
            )
        });

       return this;
    }

    /**
     * @overridden DOMElement.enable
     */
    public enable():DOMElement {
        if (this.isEnabled === true) return this;

        this.$element.on('change', this.onLanguageChange.bind(this));

        super.enable();
        return this;
    }

    /**
     * @overridden DOMElement.disable
     */
    public disable():DOMElement {
        if (this.isEnabled === false) return this;

        this.$element.off('change', this.onLanguageChange.bind(this));

        super.disable();
        return this;
    }

    public onLanguageChange(event):void
    {
        var languageId:string = $(event.currentTarget).val();
        this.dispatchEvent(new LanguageEvent(LanguageEvent.LANGUAGE_CHANGE, false, false, languageId));
    }

    public value(value:any):void
    {
        this.$element.val(value);
    }

}
///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/models/LanguageModel.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/events/LanguageEvent.ts'/>

class LanguageSelect extends DOMElement {

    public CLASS_NAME:string = 'LanguageSelect';

    constructor()
    {
        super();

        var languageManagerData = LanguageModel.getInstance().data;
    }

    public createChildren():DOMElement
    {
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
     * @copy DOMElement.enable
     */
    public enable():DOMElement {
        if (this.isEnabled === true) return this;

        this.$el.on('change', this.onLanguageChange.bind(this));

        super.enable();
        return this;
    }

    /**
     * @copy DOMElement.disable
     */
    public disable():DOMElement {
        if (this.isEnabled === false) return this;

        this.$el.off('change', this.onLanguageChange.bind(this));

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
        this.$el.val(value);
    }

}
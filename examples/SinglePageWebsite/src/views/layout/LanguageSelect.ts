///<reference path='../../../../../src/typescript/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/typescript/com/codebelt/utils/LanguageManager.ts'/>
///<reference path='../../../../../src/typescript/com/codebelt/events/LanguageEvent.ts'/>

class LanguageSelect extends DOMElement {

    constructor()
    {
        super();

        var languageManagerData = LanguageManager.getInstance().data;

        console.log(languageManagerData)

        this.templateName = 'LanguageSelect';
        this._options = {
        }
    }

    public createChildren():void
    {
        Jaml.register(this.templateName, function(data)
        {
            select(
                option({value: 'en'}, 'English'),
                option({value: 'fr'}, 'French'),
                option({value: 'sp'}, 'Spanish')
            )
        });

        super.createChildren();

        this.enabled(true);
    }

    public layoutChildren():void
    {
    }

    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
            this.$el.on('change', this.onLanguageChange.bind(this));
        } else {
        }

        this.isEnabled = value;
    }

    public onLanguageChange(event):void
    {
        var languageId:string = $(event.currentTarget).val();
        this.dispatchEvent(new LanguageEvent(LanguageEvent.LANGUAGE_CHANGE, languageId));
    }

    public value(value:any):void
    {
        this.$el.val(value);
    }

}
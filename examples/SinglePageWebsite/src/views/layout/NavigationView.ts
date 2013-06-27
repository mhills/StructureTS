///<reference path='../../../../../src/typescript/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/typescript/com/codebelt/utils/BulkLoader.ts'/>
///<reference path='../../../../../src/typescript/com/codebelt/utils/LanguageManager.ts'/>
///<reference path='../../../../../src/typescript/com/codebelt/controller/LocalStorageController.ts'/>

///<reference path='LanguageSelect.ts'/>

class NavigationView extends DOMElement
{
    private _languageSelect:LanguageSelect = null;

    constructor()
    {
        super();

        var languageManagerData = LanguageManager.getInstance().data;

        this.templateName = 'HeaderView';
        this._options = {
            title: languageManagerData.mainTitle,
            link1: languageManagerData.mainNavigation.home,
            link2: languageManagerData.mainNavigation.aboutUs,
            link3: languageManagerData.mainNavigation.artists,
            link4: languageManagerData.mainNavigation.reservations,
            link5: languageManagerData.mainNavigation.contact
        }
    }

    public createChildren():void
    {
        Jaml.register(this.templateName, function(data)
        {
            div({id: 'header'},
                div({cls: 'background'},
                    h1(
                        a({ href: '#home', html: 'DelliStore'})
                    ),
                    ul(
                        li( a({cls: 'active', href: '#home'}, data.link1) ),
                        li( a({href: '#about/robert'}, data.link2) ),
                        li( a({href: '#artists/'}, data.link3) ),
                        li( a({href: '#reservations/'}, data.link4) ),
                        li( a({href: '#contact?name=robert&age=34'}, data.link5) )
                    )
                )
            )
        });

        super.createChildren();

//        this._languageSelect = new LanguageSelect();
//        this.addChildAt(this._languageSelect, 0);

        this.enabled(true);
    }

    public layoutChildren():void
    {
//        this._languageSelect.value( LocalStorageController.getInstance().getItem('language') );
    }

    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
//            this._languageSelect.addEventListener(LanguageEvent.LANGUAGE_CHANGE, this.onLanguageChange, this);
        } else {
//            this._languageSelect.removeEventListener(LanguageEvent.LANGUAGE_CHANGE, this.onLanguageChange);
        }

        this.isEnabled = value;
    }

    public onLanguageChange(event):void
    {
        var ls = LocalStorageController.getInstance();
        ls.setItem('language', event.data);

        document.location.reload(false);
    }

}
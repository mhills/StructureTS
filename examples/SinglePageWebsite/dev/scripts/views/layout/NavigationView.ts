///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/utils/BulkLoader.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/models/LanguageModel.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/controller/LocalStorageController.ts'/>

///<reference path='LanguageSelect.ts'/>
///<reference path='../../models/MainLanguageModel.ts'/>

class NavigationView extends DOMElement
{
    public CLASS_NAME:string = 'NavigationView';

    private _data:any = null;

    constructor()
    {
        super();

        var languageManagerData = MainLanguageModel.getInstance().data;

        this._data = {
            title: languageManagerData.mainTitle,
            link1: languageManagerData.mainNavigation.home,
            link2: languageManagerData.mainNavigation.aboutUs,
            link3: languageManagerData.mainNavigation.artists,
            link4: languageManagerData.mainNavigation.reservations,
            link5: languageManagerData.mainNavigation.contact
        }
    }

    public createChildren():DOMElement
    {
        super.createChildren(function(data)
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
        }, this._data);

        return this;
    }

    public layoutChildren():DOMElement
    {
        return this;
    }

    /**
     * @copy DisplayObject.enable
     */
    public enable():DOMElement {
        if (this.isEnabled === true) return this;

        super.enable();
        return this;
    }

    /**
     * @copy DisplayObject.disable
     */
    public disable():DOMElement {
        if (this.isEnabled === false) return this;

        super.disable();
        return this;
    }

    public onLanguageChange(event):void
    {
        var ls = new LocalStorageController();
        ls.setItem('language', event.data);

        document.location.reload(false);
    }

}
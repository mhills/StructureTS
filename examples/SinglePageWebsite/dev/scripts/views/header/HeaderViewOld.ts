///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='BannerAd.ts'/>

class HeaderViewOld extends DOMElement
{
    private _canvasBannerAd:BannerAd = null;

    constructor()
    {
        super();

        this.templateName = "HeaderViewOld";
        this._options = {
            title: "Dynamic Deep Linking JavaScript Site Example"
        }
    }

    public createChildren():void
    {
        Jaml.register(this.templateName, function(data)
        {
            div({cls: 'header'},
                h1(
                    a({ href: "#home"}, data.title)
                ),
                ul({cls: "navigation"},
                    li( a({href: "#home"}, "Home") ),
                    li( a({href: "#about/robert"}, "about/{robert}") ),
                    li( a({href: "#about/adam"}, "about/{adam}") ),
                    li( a({href: "#artists/"}, "artists/") ),
                    li( a({href: "#artists/matthew-good"}, "artists/matthew-good") ),
                    li( a({href: "#contact?name=robert&age=34"}, "contact?name=robert&age=34") )
                )
            )
        });

        super.createChildren();

        this._canvasBannerAd = new BannerAd();
        this.addChildAt(this._canvasBannerAd, 1);
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
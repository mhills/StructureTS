///<reference path='../../../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/net/URLLoader.ts'/>
///<reference path='../../../../../src/com/codebelt/net/URLRequestMethod.ts'/>
///<reference path='../../../../../src/com/codebelt/net/URLLoaderDataFormat.ts'/>
///<reference path='../../../../../src/com/codebelt/events/LoaderEvent.ts'/>
///<reference path='../../../../../src/com/codebelt/utils/TemplateFactory.ts'/>

///<reference path='../../models/ArtistVO.ts'/>

class ArtistsView extends DOMElement
{
    private TITLE:string = "Artists View";

    private _artistVOList:any[] = [];
    private _container:DOMElement = null;

    public urlLoader:URLLoader = null;

    constructor()
    {
        super();

        this.templateName = "ArtistsView";
        this._options = {}
    }

    public createChildren():void
    {
        Jaml.register(this.templateName, function(data)
        {
            div({id: 'bodyPan'},
                h1("Artists View"),
                div({id: "dynamic-container"},"Robert is cool this is the home view")
            )
        });

        super.createChildren();

        this._container = this.getChild("#dynamic-container");
    }

    public layoutChildren():void
    {
        document.title = this.TITLE;
    }

    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    }

    public requestData():void
    {
        var request:URLRequest = new URLRequest();
        request.url = "data/artist-album.json";
        request.method = URLRequestMethod.GET;
        request.contentType = "application/json";

        this.urlLoader = new URLLoader();
        this.urlLoader.addEventListener(LoaderEvent.COMPLETE, this.loaderCompleteHandler, this);
        this.urlLoader.dataFormat = URLLoaderDataFormat.JSON;
        this.urlLoader.load(request);
    }

    private loaderCompleteHandler(event:LoaderEvent):void
    {
        console.log("loaderCompleteHandler")
        var urlLoader:URLLoader = event.target;

        var parsedData:any[] = JSON.parse(urlLoader.data);
        var len:number = parsedData.length;
        for (var i:number = 0; i < len; i++) {
            this._artistVOList.push( new ArtistVO(parsedData[i]) );
        }

        var hasherData = hasher.getHashAsArray();//TODO: remove this and make the Router Controller a Singleton.
        this.update(hasherData[1], hasherData[2])
    }

    public update(artist?:number, album?:number):void
    {
        if (!this.urlLoader || this.urlLoader.ready == false) {
            this.requestData();
            return;
        }

        //Show all the albums for a artist.
        if(artist && !album)
        {
            var artistMarkup = new DOMElement();
            artistMarkup.$el = TemplateFactory.createTemplate('templates/Albums.tpl', {data: this._artistVOList[artist]});
            this._container.removeChildren();
            this._container.addChild(artistMarkup);
        }
        //Show album so user can buy it.
        else if (artist && album)
        {
            var artistMarkup = new DOMElement();
            artistMarkup.$el = TemplateFactory.createTemplate('templates/BuyAlbum.tpl', {data: this._artistVOList[artist].albumList[album]});
            this._container.removeChildren();
            this._container.addChild(artistMarkup);
        }
        //Default view of all artists
        else
        {
            var artistMarkup = new DOMElement();
            artistMarkup.$el = TemplateFactory.createTemplate('templates/Artists.tpl', {data: this._artistVOList});
//            artistMarkup.visible(false);
            this._container.removeChildren();
            this._container.addChild(artistMarkup);
        }
    }

}
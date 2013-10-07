///<reference path='../../../../../../src/com/codebelt/structurets/util/AssetLoader.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/util/ImageLoader.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/display/Canvas.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/display/Bitmap.ts'/>

///<reference path='../../WebsiteApp.ts'/>

class BannerAd extends DOMElement {

    private _assetLoader:AssetLoader = null;

    private _canvas:Canvas = null;
    private _cherry:Bitmap = null;
    private _cherryDipped:Bitmap = null;
    private _logo:Bitmap = null;
    private _boxOfCandy:Bitmap = null;

    constructor()
    {
        super("canvas", {width: "738px", height: "90px", id: "banner-ad"});
    }

    public createChildren():void
    {
        super.createChildren();

        this.loadBannerImages();
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

    public loadBannerImages():void
    {
        this._assetLoader = AssetLoader.getInstance();
        this._assetLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onLoadComplete, this);
        this._assetLoader.addFile(new ImageLoader(WebsiteApp.BASE_PATH + "cherry.png"), "cherry");
        this._assetLoader.addFile(new ImageLoader(WebsiteApp.BASE_PATH + "cherry-dipped.png"), "cherry-dipped");
        this._assetLoader.addFile(new ImageLoader(WebsiteApp.BASE_PATH + "logo.png"), "logo");
        this._assetLoader.addFile(new ImageLoader(WebsiteApp.BASE_PATH + "box.png"), "box");
        this._assetLoader.load();
    }

    public onLoadComplete():void
    {
        this._assetLoader.removeEventListener(LoaderEvent.LOAD_COMPLETE, this.onLoadComplete);

        this._canvas = new Canvas(this);//TODO:Come up with a better way to have Canvas objects

        this._cherry = new Bitmap( this._assetLoader.getImage("cherry") );
        this._cherry.x = 83;
        this._cherry.y = 3;
        this._canvas.addChild(this._cherry);

        this._cherryDipped = new Bitmap( this._assetLoader.getImage("cherry-dipped") );
        this._cherryDipped.x = 83;
        this._cherryDipped.y = 37;
        this._cherryDipped.visible = false;
        this._canvas.addChild(this._cherryDipped);

        this._logo = new Bitmap( this._assetLoader.getImage("logo") );
        this._logo.x = 222;
        this._logo.y = 27;
        this._canvas.addChild(this._logo);

        this._boxOfCandy = new Bitmap( this._assetLoader.getImage("box") );
        this._boxOfCandy.x = 598;
        this._boxOfCandy.y = 2;
        this._boxOfCandy.alpha = 0;
        this._boxOfCandy.scaleX = 0;
        this._boxOfCandy.scaleY = 0;
        this._canvas.addChild(this._boxOfCandy);

        TweenLite.to(this._boxOfCandy, 1, {delay: 0.5, alpha:1, scaleX:1, scaleY:1, ease:Cubic.easeOut});
        TweenLite.to(this._cherry, 0.5, {delay: 1, y:37, ease:Cubic.easeOut, onComplete: this.onCherryComplete.bind(this)});
    }

    private onCherryComplete():void
    {
        this._cherryDipped.visible = true;
        this._canvas.removeChild(this._cherry);

        TweenLite.to(this._cherryDipped, 0.5, {y:3, ease:Cubic.easeInOut, onComplete: this.onCherryDippedComplete.bind(this)});
    }

    private onCherryDippedComplete():void
    {
        TweenLite.to(this._logo, 1, { rotation:720, scaleX:0.5, scaleY:0.5, ease:Bounce.easeOut});
    }

}
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../net/URLRequest.ts'/>
///<reference path='../net/URLLoader.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

class BaseRequest extends EventDispatcher {

    private _baseUrl:string = "";
    private _endpoint:string = "";
    private _request:URLRequest;
    private _loader:URLLoader;

    public data:any = null;
    public complete:boolean = false;

    constructor(baseUrl:string, endpoint:string)
    {
        super();

        this._baseUrl = baseUrl;
        this._endpoint = endpoint;
        this.configureRequest();
    }

    private configureRequest():void
    {
        this._request = new URLRequest(this._baseUrl + this._endpoint);
        this._request.method = URLRequestMethod.GET;

        this._loader = new URLLoader();
        this._loader.addEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete, this);
        this._loader.dataFormat = URLLoaderDataFormat.HTML;
    }

    private onLoaderComplete(event:LoaderEvent):void
    {
        this.complete = true;
        this.data = this._loader.data;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));

        this._loader.removeEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete);
        this._loader = null;
    }

    public load():void
    {
        if (this.complete) return;

        this._loader.load(this._request);
    }
}
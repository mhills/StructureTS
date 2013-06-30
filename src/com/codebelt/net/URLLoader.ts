///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/LoaderEvent.ts'/>
///<reference path='URLRequest.ts'/>
///<reference path='URLLoaderDataFormat.ts'/>

class URLLoader extends EventDispatcher{

    public data:any = null;
    public dataFormat:string = URLLoaderDataFormat.TEXT;
    public ready:boolean = false;

    constructor(request:URLRequest=null)
    {
        super();

        if (request) {
            this.load(request);
        }
    }

    public load(request:URLRequest):void
    {
        this.ready = false;
        var self:URLLoader = this;

        jQuery.ajax({
           type: request.method,
           url: request.url,
           data: request.data,
           contentType: request.contentType,
           dataType: self.dataFormat,
           beforeSend: self.onBeforeSend.bind(this),
           success: self.onLoadSuccess.bind(this),
           error: self.onLoadError.bind(this),
           complete: self.onComplete.bind(this)
         });
    }

    public onLoadSuccess():void
    {
        //console.log("onLoadSuccess", arguments);
    }

    public onBeforeSend():void
    {
        //console.log("onBeforeSend", arguments);
    }
    public onLoadError():void
    {
        console.log("[URLLoader] - onLoadError", arguments);
    }
    public onComplete(data):void
    {
        this.ready = true;
//        console.log("[URLLoader] - onComplete", data);
        this.data = data.responseText;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
    }

}
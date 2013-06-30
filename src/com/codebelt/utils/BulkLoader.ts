///<reference path='../interfaces/IDataStore.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

class BulkLoader extends EventDispatcher {

    private static _instance:BulkLoader;
    public _dataStores:IDataStore[] = [];

    constructor()
    {
        super();

        this.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
    }

    public static getInstance():BulkLoader
    {
        if(this._instance == null) {
            this._instance = new BulkLoader();
        }
        return this._instance;
    }

    public addFile(dataStore:IDataStore, key:string):void
    {
        this._dataStores[key] = dataStore;
    }

    public getFile(key:string):IDataStore
    {
        return this._dataStores[key];
    }

    public getImage(key:string):HTMLImageElement
    {
        return this._dataStores[key].data;
    }

    public getHtmlTemplate(key:string, templateId:string):string
    {
        var rawHtml:string = jQuery( this._dataStores[key].data ).filter("#" + templateId).html();
        return rawHtml;
    }

    public load():void
    {
        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];
            dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
            dataStore.load();
        }
    }

    private onLoadComplete(event:LoaderEvent):void
    {
        event.target.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete);

        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];
            if(!dataStore.complete) {
                return;
            }
        }

        this.dispatchEvent(new LoaderEvent(LoaderEvent.LOAD_COMPLETE));
    }
}

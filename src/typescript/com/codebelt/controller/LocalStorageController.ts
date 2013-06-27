///<reference path='../events/EventDispatcher.ts'/>

class LocalStorageController extends EventDispatcher {

    private static _instance:LocalStorageController = null;

    constructor()
    {
        super();
    }

    public static getInstance():LocalStorageController
    {
        if(this._instance == null) {
            this._instance = new LocalStorageController();
        }
        return this._instance;
    }

    public setItem(key:string, data:string):void
    {
        localStorage.setItem(key, data);
    }

    public getItem(key:string):string
    {
        return localStorage.getItem(key);
    }

    public removeItem(key:string):void
    {
        localStorage.removeItem(key);
    }

    public clear():void
    {
        localStorage.clear();
    }

}
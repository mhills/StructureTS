/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

///<reference path='../interfaces/IDataStore.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/LoaderEvent.ts'/>
///<reference path='../requests/BaseRequest.ts'/>
///<reference path='../models/vo/LanguageConfigVO.ts'/>

/**
 * The LanguageManager...
 *
 * @class LanguageManager
 * @module StructureTS
 * @submodule util
 * @constructor
 **/
class LanguageManager extends EventDispatcher {

    private static _instance:LanguageManager;

    private _request:BaseRequest = null;
    private _availableLanguagesDictionary:any[] = [];

    public currentLanguage:string = null;
    public data:any = null;

    constructor()
    {
        super();
    }

    public static getInstance():LanguageManager
    {
        if(this._instance == null) {
            this._instance = new LanguageManager();
        }
        return this._instance;
    }

    private getLangConfigById(id:string):LanguageConfigVO
    {
        return this._availableLanguagesDictionary[id];
    }

    private onConfigLoaded(event:LoaderEvent):void
    {
        var jsonData = JSON.parse( event.target.data );
        var len:number = jsonData.data.length
        for(var i:number = 0; i < len; i++) {
            var vo:LanguageConfigVO = new LanguageConfigVO( jsonData.data[i] );
            this._availableLanguagesDictionary[vo.id] = vo;
        }

        this._request.removeEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded);

        var currentLanguageVO:LanguageConfigVO = this.getLangConfigById( this.currentLanguage );
        this.loadLanguageData( currentLanguageVO.path );
    }

    public loadConfig(path:string):void
    {
        this._request = new BaseRequest(path, '');
        this._request.addEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded, this);
        this._request.load();
    }

    public setLang(value:string):void
    {
        this.currentLanguage = value;
    }

    public loadLanguageData(path:string):void
    {
        this._request = new BaseRequest(path, '');
        this._request.addEventListener(LoaderEvent.COMPLETE, this.onLanguageDataLoad, this);
        this._request.load();
    }

    private onLanguageDataLoad(event:LoaderEvent):void
    {
        this.data = JSON.parse( event.target.data );
        this._request.removeEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded);
        this._request = null

        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
    }

}

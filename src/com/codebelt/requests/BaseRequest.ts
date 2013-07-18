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

///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../net/URLRequest.ts'/>
///<reference path='../net/URLLoader.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

/**
 * The BaseRequest...
 *
 * @class BaseRequest
 * @constructor
 **/
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
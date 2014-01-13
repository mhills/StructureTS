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

///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../interface/IDataStore.ts'/>
///<reference path='../net/URLRequest.ts'/>
///<reference path='../net/URLLoader.ts'/>
///<reference path='../event/RequestEvent.ts'/>
///<reference path='../event/LoaderEvent.ts'/>

module StructureTS
{
    /**
     * The BaseRequest...
     *
     * @class BaseRequest
     * @module StructureTS
     * @submodule net
     * @constructor
     * @version 0.1.0
     **/
    export class BaseRequest extends EventDispatcher implements IDataStore
    {
        /**
         * @overridden BaseObject.CLASS_NAME
         */
        public CLASS_NAME:string = 'BaseRequest';

        /**
         * YUIDoc_comment
         *
         * @property _baseUrl
         * @type {string}
         * @protected
         */
        public _baseUrl:string = null;

        /**
         * YUIDoc_comment
         *
         * @property _endpoint
         * @type {string}
         * @protected
         */
        public _endpoint:string = null;

        /**
         * YUIDoc_comment
         *
         * @property _request
         * @type {URLRequest}
         * @protected
         */
        public _request:URLRequest = null;

        /**
         * YUIDoc_comment
         *
         * @property _loader
         * @type {URLLoader}
         * @readonly
         * @protected
         */
        public _loader:URLLoader = null;

        /**
         * YUIDoc_comment
         *
         * @property data
         * @type {any}
         * @public
         */
        public data:any = null;

        /**
         * YUIDoc_comment
         *
         * @property complete
         * @type {boolean}
         * @default false
         * @public
         */
        public complete:boolean = false;

        /**
         * YUIDoc_comment
         *
         * @property src
         * @type {string}
         * @public
         */
        public src:string = null;


        constructor(baseUrl:string, endpoint:string = '')
        {
            super();

            this._baseUrl = baseUrl;
            this._endpoint = endpoint;
        }

        /**
         * YUIDoc_comment
         *
         * @method getloader
         * @public
         */
        public getloader():URLLoader
        {
            return this._loader;
        }

        /* ---------------------------------------------------------------------
         Protected Methods
         ------------------------------------------------------------------------ */
        /**
         * YUIDoc_comment
         *
         * @method configureRequest
         * @protected
         */
        public configureRequest():void
        {
            this.src = this._baseUrl + this._endpoint;
            this._request = new URLRequest(this.src);
        }

        /**
         * YUIDoc_comment
         *
         * @method load
         * @protected
         */
        public load():void
        {
            this._loader = new URLLoader();
            this._loader.addEventListener(LoaderEvent.COMPLETE, this.onDataLoadComplete, this);
            this._loader.addEventListener(LoaderEvent.ERROR, this.onDataLoadError, this);

            if(this._request){
                this._loader.load(this._request);
            }else{
                throw new Error('[' + this.getQualifiedClassName() + '] Error: No request object created for proxy. Override configureRequest');
            }
        }

        /**
         * YUIDoc_comment
         *
         * @method parseData
         * @protected
         */
        public parseData():void
        {
            this.data = this._loader.data;

            this.cleanupListeners();
        }

        /**
         * YUIDoc_comment
         *
         * @method cleanupListeners
         * @protected
         */
        public cleanupListeners():void
        {
            this._loader.removeEventListener(LoaderEvent.COMPLETE, this.onDataLoadComplete, this);
            this._loader.removeEventListener(LoaderEvent.ERROR, this.onDataLoadError, this);
        }

        /**
         * YUIDoc_comment
         *
         * @method onDataLoadComplete
         * @param event {LoaderEvent}
         * @protected
         */
        public onDataLoadComplete(event:LoaderEvent):void
        {
            this.parseData();
            this.dispatchEvent(new RequestEvent(RequestEvent.SUCCESS, false, false, this.data))
        }

        /**
         * YUIDoc_comment
         *
         * @method onDataLoadComplete
         * @param event {LoaderEvent}
         * @protected
         */
        public onDataLoadError(event:LoaderEvent):void
        {
            this.dispatchEvent(new RequestEvent(RequestEvent.ERROR, false, false, this.data))
        }

        /**
         * @overridden EventDispatcher.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._request = null;

            this._loader.destroy();
            this._loader = null;
        }

    }
}
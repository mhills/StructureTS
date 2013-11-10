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

///<reference path='BaseController.ts'/>
///<reference path='../util/BrowserUtils.ts'/>
///<reference path='../event/RouterEvent.ts'/>

///<reference path='../../../millermedeiros/hasher/Hasher.ts'/>
///<reference path='../../../millermedeiros/crossroads/Crossroads.ts' />

module StructureTS
{
    import Hasher = MillerMedeiros.Hasher;
    import Crossroads = MillerMedeiros.Crossroads;

    /**
     * The RouterController...
     *
     * @class RouterController
     * @module StructureTS
     * @submodule controller
     * @constructor
     * @version 0.1.0
     **/
    export class RouterController extends BaseController
    {
        /**
         * @overridden BaseObject.CLASS_NAME
         */
        public CLASS_NAME:string = 'RouterController';

        /**
         * YUIDoc_comment
         *
         * @property _crossroads
         * @type {Crossroads}
         * @private
         */
        private _crossroads:Crossroads = null;

        constructor()
        {
            super();

            this._crossroads = new Crossroads();

        }

        public addRoute(pattern:string, handler:Function, scope:any, priority:number = 0):void
        {
            this._crossroads.addRoute(pattern, handler.bind(scope), priority);
        }

        /**
         *
         * @method start
         */
        public start():void
        {
            if (Hasher.isActive())
            {
                return;
            }

            this._crossroads.routed.add(this.onAllRoutesHandler, this);

//        Hasher.prependHash = '!';
            Hasher.initialized.add(this.parseHash.bind(this)); //parse initial hash
            Hasher.changed.add(this.parseHash.bind(this)); //parse hash changes
            Hasher.init(); //start listening for hash changes
        }

        public onAllRoutesHandler():void
        {
            //console.log("all", arguments);
            this.dispatchEvent(new RouterEvent(RouterEvent.CHANGE));
        }

        /**
         *
         * @method parseHash
         * @param newHash {string}
         * @param oldHash {string}
         */
        public parseHash(newHash, oldHash):void
        {
            this._crossroads.parse(newHash);
        }

        /**
         *
         * @method navigateTo
         * @param hash {string}
         * @param [silently=false] {boolean}
         */
        public navigateTo(hash:string, silently:boolean = false):void
        {
            hash = hash.replace('#/', '');
            if (silently)
            {
                Hasher.changed.active = false;
                Hasher.setHash(hash);
                Hasher.changed.active = true;
            }
            else
            {
                Hasher.setHash(hash);
            }

        }

        /**
         *
         * @method getHash
         * @returns {string}
         */
        public getHash():string
        {
            return Hasher.getHash();
        }

        /**
         *
         * @method getHashAsArray
         * @returns {array}
         */
        public getHashAsArray():any[]
        {
            return Hasher.getHashAsArray();
        }

        /**
         *
         * @method getURL
         * @returns {string}
         */
        public getURL():string
        {
            return Hasher.getURL();
        }

        /**
         *
         * @method getBaseURL
         * @returns {string}
         */
        public getBaseURL():string
        {
            return Hasher.getBaseURL();
        }

    }
}
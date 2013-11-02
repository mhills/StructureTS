///<reference path='../signals/Signal.ts'/>

module MillerMedeiros
{
    /**
     * Hasher is a history manager for rich-media applications.
     *
     * @class Hasher
     * @constructor
     * @author Miller Medeiros
     * @module MillerMedeiros
     * @submodule Hasher
     * @static
     **/
    export class Hasher
    {

        /**
         * Hasher Version Number.
         *
         * @property VERSION
         * @type {string}
         * @public
         * @static
         * @final
         */
        public static VERSION:string = '1.1.4';

        /**
         * Frequency that it will check hash value on IE 6-7 since it doesn't support the hashchange event.
         *
         * @property POOL_INTERVAL
         * @type {number}
         * @default 25
         * @private
         * @static
         * @final
         */
        private static POOL_INTERVAL:number = 25;

        /**
         * A reference to the document object for brevity and better compression.
         *
         * @property _document
         * @type {Document}
         * @private
         * @static
         * @final
         */
        private static _document:Document = window.document;

        /**
         * A reference to the window history object for brevity and better compression.
         *
         * @property _history
         * @type {History}
         * @private
         * @static
         * @final
         */
        private static _history:History = window.history;

        /**
         * Parsed full URL.
         *
         * @property _hash
         * @type {string}
         * @private
         * @static
         */
        private static _hash:string = '';

        /**
         * A reference to a setInterval.
         *
         * @property _checkInterval
         * @type {setInterval}
         * @private
         * @static
         */
        private static _checkInterval:any = null;

        /**
         * A boolean to determine if Hasher has been initialized or not.
         *
         * @property _isActive
         * @type {boolean}
         * @default false
         * @private
         * @static
         */
        private static _isActive:boolean = false;

        /**
         * A reference to an iframe used for legacy IE (6-7).
         *
         * @property _frame
         * @type {HTMLIFrameElement}
         * @private
         * @static
         */
        private static _frame:HTMLIFrameElement = null;

        /**
         * Regular Expression that selects everything including pound (#) symbol to the end of the url.
         *
         * @example
         *      // Example:
         *      http://example.org/#/page1?title=products
         *      // Would select:
         *      #/page1?title=products
         * @property _hashValRegexp
         * @type {RegExp}
         * @readOnly
         * @private
         * @static
         */
        private static _hashValRegexp:RegExp = /#(.*)$/;

        /**
         * Regular Expression that selects everything including pound (#) symbol to the end of the url or
         * selects everything including question mark (?) symbol to the end of the url.
         *
         * @example
         *      // Example:
         *      http://example.org/#/page1?title=products
         *      // Would select:
         *      #/page1?title=products
         *
         *      // Or
         *
         *      // Example:
         *      http://example.org/page1?title=products
         *      // Would select:
         *      ?title=products
         * @property _baseUrlRegexp
         * @type {RegExp}
         * @readOnly
         * @private
         * @static
         */
        private static _baseUrlRegexp:RegExp = /(\?.*)|(\#.*)/;

        /**
         * Regular Expression that selects the pound (#) symbol only if it is the first character in the string.
         *
         * @example
         *      // Example:
         *      #/page1?title=products
         *      // Would select:
         *      #
         * @property _hashRegexp
         * @type {RegExp}
         * @readOnly
         * @private
         * @static
         */
        private static _hashRegexp:RegExp = /^\#/;

        /**
         * Determines if the browser is Internet Explorer.<br/>
         * Hack based on this: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
         *
         * @property _isIE
         * @type {boolean}
         * @readOnly
         * @private
         * @static
         */
        private static _isIE:boolean = (!+"\v1");

        /**
         * Determines if the browser supports the hashchange event.<br/>
         * hashchange is supported by FF3.6+, IE8+, Chrome 5+, Safari 5+ but feature detection fails on IE compatibility
         * mode, so we need to check documentMode.
         *
         * @property _isHashChangeSupported
         * @type {boolean}
         * @default true
         * @private
         * @static
         */
        private static _isHashChangeSupported:boolean = true;

        /**
         * Check if is IE6-7 since hash change is only supported on IE8+ and changing hash value on IE6-7 doesn't
         * generate history record.
         *
         * @property _isLegacyIE
         * @type {boolean}
         * @default false
         * @readOnly
         * @private
         * @static
         */
        private static _isLegacyIE:boolean = false;

        /**
         *
         *
         * @property _isLocal
         * @type {boolean}
         * @readOnly
         * @private
         * @static
         */
        private static _isLocal:boolean = (location.protocol === 'file:');

        /**
         * String that should always be added to the end of Hash value.
         * <ul>
         * <li>default value: '';</li>
         * <li>will be automatically removed from `Hasher.getHash()`</li>
         * <li>avoid conflicts with elements that contain ID equal to hash value;</li>
         * </ul>
         *
         * @property appendHash
         * @type {string}
         * @default ''
         * @public
         * @static
         */
        public static appendHash:string = '';

        /**
         * String that should always be added to the beginning of Hash value.
         * <ul>
         * <li>default value: '/';</li>
         * <li>will be automatically removed from `Hasher.getHash()`</li>
         * <li>avoid conflicts with elements that contain ID equal to hash value;</li>
         * </ul>
         * <strong>To making hash tag content crawlable you should should prepend your hash url with an exclamation mark '!'. So your hash URL will look like '#!'.</strong>
         *
         * @property appendHash
         * @type {string}
         * @default '/'
         * @public
         * @static
         */
        public static prependHash:string = '/';

        /**
         * String used to split hash paths; used by `Hasher.getHashAsArray()` to split paths.
         * <ul>
         * <li>default value: '/';</li>
         * </ul>
         *
         * @property separator
         * @type {string}
         * @default '/'
         * @public
         * @static
         */
        public static separator:string = '/';

        /**
         * Signal dispatched when hash value changes.
         * - pass current hash as 1st parameter to listeners and previous hash value as 2nd parameter.
         *
         * @property changed
         * @type {Signal}
         * @public
         * @static
         */
        public static changed:Signal = new Signal();

        /**
         * Signal dispatched when Hasher is stopped.
         * -  pass current hash as first parameter to listeners
         *
         * @property stopped
         * @type {Signal}
         * @public
         * @static
         */
        public static stopped:Signal = new Signal();

        /**
         * Signal dispatched when Hasher is initialized.
         * - pass current hash as first parameter to listeners
         *
         * @property initialized
         * @type {Signal}
         * @public
         * @static
         */
        public static initialized:Signal = new Signal();

        constructor()
        {
        }

        /**
         * Start listening/dispatching changes in the hash/history.
         * <ul>
         *   <li>Hasher won't dispatch CHANGE events by manually typing a new value or pressing the
         *   back/forward buttons before calling this method.</li>
         * </ul>
         *
         * @method init
         * @return {void}
         * @public
         * @static
         */
        public static init():void
        {
            if (this._isActive)
            {
                return;
            }

            Hasher._isHashChangeSupported = ('onhashchange' in window) && Hasher._document.documentMode !== 7;
            Hasher._isLegacyIE = Hasher._isIE && !Hasher._isHashChangeSupported;
            Hasher._hash = Hasher._getWindowHash();

            //thought about branching/overloading Hasher.init() to avoid checking multiple times but
            //don't think worth doing it since it probably won't be called multiple times.
            if (Hasher._isHashChangeSupported)
            {
                Hasher._addListener(window, 'hashchange', Hasher._checkHistory.bind(this));
            }
            else
            {
                if (Hasher._isLegacyIE)
                {
                    if (!Hasher._frame)
                    {
                        Hasher._createFrame();
                    }
                    Hasher._updateFrame();
                }
                Hasher._checkInterval = setInterval(Hasher._checkHistory.bind(this), Hasher.POOL_INTERVAL);
            }

            Hasher._isActive = true;
            //console.log('[Hasher]', 'initialized', Hasher._trimHash(Hasher._hash));
            Hasher.initialized.dispatch(Hasher._trimHash(Hasher._hash));
        }

        /**
         * Stop listening/dispatching changes in the hash/history.
         * <ul>
         *   <li>Hasher won't dispatch CHANGE events by manually typing a new value or pressing the back/forward buttons after calling this method,
         *   unless you call Hasher.init() again.</li>
         *   <li>Hasher will still dispatch changes made programmatically by calling Hasher.setHash();</li>
         * </ul>
         *
         * @method stop
         * @return {void}
         * @public
         * @static
         */
        public static stop():void
        {
            if (!Hasher._isActive)
            {
                return;
            }

            if (Hasher._isHashChangeSupported)
            {
                //TODO: test that removeListener is getting removed.
                Hasher._removeListener(window, 'hashchange', Hasher._checkHistory.bind(this));
            }
            else
            {
                clearInterval(Hasher._checkInterval);
                Hasher._checkInterval = null;
            }

            Hasher._isActive = false;

            //console.log('[Hasher]', 'stopped', Hasher._trimHash(Hasher._hash))
            Hasher.stopped.dispatch(Hasher._trimHash(Hasher._hash));
        }

        /**
         * If Hasher is listening to changes on the browser history and/or hash value.
         *
         * @method isActive
         * @return {boolean}
         * @public
         * @static
         */
        public static isActive():boolean
        {
            return Hasher._isActive;
        }

        /**
         * Returns full URL.
         *
         * @method getURL
         * @return {string}
         * @public
         * @static
         */
        public static getURL():string
        {
            return window.location.href;
        }

        /**
         * Retrieve URL without query string and hash.
         *
         * @method getBaseURL
         * @return {string}
         * @public
         * @static
         */
        public static getBaseURL():string
        {
            // Removes everything after '?' and/or '#'
            return Hasher.getURL().replace(Hasher._baseUrlRegexp, '');
        }

        /**
         * Set Hash value, generating a new history record.
         * @example
         *      Hasher.setHash('lorem', 'ipsum', 'dolor') -> '#/lorem/ipsum/dolor'
         *
         * @method setHash
         * @param path {...rest} Hash value without '#'. Hasher will join path segments using `Hasher.separator` and prepend/append hash value
         * with `Hasher.appendHash` and `Hasher.prependHash`
         * @return {string}
         * @public
         * @static
         */
        public static setHash(...path):void
        {
            var pathString:string = Hasher._makePath(path);
            if (pathString !== Hasher._hash)
            {
                // we should store raw value
                Hasher._registerChange(pathString);
                if (pathString === Hasher._hash)
                {
                    // we check if pathString is still === _hash to avoid error in
                    // case of multiple consecutive redirects [issue #39]
                    window.location.hash = '#' + Hasher._encodePath(pathString);
                }
            }
        }

        /**
         * Set Hash value without keeping previous hash on the history record.
         * Similar to calling `window.location.replace("#/hash")` but will also work on IE6-7.
         * @param {...string} path    Hash value without '#'. Hasher will join
         * path segments using `Hasher.separator` and prepend/append hash value
         * with `Hasher.appendHash` and `Hasher.prependHash`
         * @example Hasher.replaceHash('lorem', 'ipsum', 'dolor') -> '#/lorem/ipsum/dolor'
         */
        public static replaceHash(...path):void
        {
            var stringPath:string = Hasher._makePath(path);
            if (stringPath !== Hasher._hash)
            {
                // we should store raw value
                Hasher._registerChange(stringPath, true);
                if (stringPath === Hasher._hash)
                {
                    // we check if path is still === _hash to avoid error in
                    // case of multiple consecutive redirects [issue #39]
                    window.location.replace('#' + Hasher._encodePath(stringPath));
                }
            }
        }

        /**
         * @return {string} Hash value without '#', `Hasher.appendHash` and `Hasher.prependHash`.
         */
        public static getHash():string
        {
            //didn't used actual value of the `window.location.hash` to avoid breaking the application in case `window.location.hash` isn't available and also because value should always be synched.
            return Hasher._trimHash(Hasher._hash);
        }

        /**
         * @return {Array.<string>} Hash value split into an Array.
         */
        public static getHashAsArray():string[]
        {
            return Hasher.getHash().split(Hasher.separator);
        }

        /**
         * Removes all event listeners, stops Hasher and destroy Hasher object.
         * - IMPORTANT: Hasher won't work after calling this method, Hasher Object will be deleted.
         */
        public static dispose():void
        {
            Hasher.stop();
            Hasher.initialized.dispose();
            Hasher.initialized = null;
            Hasher.stopped.dispose();
            Hasher.stopped = null;
            Hasher.changed.dispose();
            Hasher.changed = null;
            Hasher._frame = window['Hasher'] = null;
        }

        /**
         * @return {string} A string representation of the object.
         */
        public static toString():string
        {
            return '[Hasher version="' + Hasher.VERSION + '" hash="' + Hasher.getHash() + '"]';
        }


        // PRIVATE METHODS
        private static _escapeRegExp(str:string):string
        {
            return String(str || '').replace(/[\\.+*?\^$\[\](){}\/'#]/g, "\\$&");
        }

        private static _trimHash(hash:string):string
        {
            if (!hash)
            {
                return '';
            }
            var regexp = new RegExp('^' + Hasher._escapeRegExp(Hasher.prependHash) + '|' + Hasher._escapeRegExp(Hasher.appendHash) + '$', 'g');
            return hash.replace(regexp, '');
        }

        /**
         * Parsed full URL instead of getting window.location.hash because Firefox decode hash value (and all the other browsers don't)
         * Also because of IE8 bug with hash query in local file [issue #6]
         *
         * @method _getWindowHash
         * @returns {string}
         * @private
         * @static
         */
        private static _getWindowHash():string
        {
            var result = Hasher._hashValRegexp.exec(Hasher.getURL());
            return (result && result[1]) ? decodeURIComponent(result[1]) : '';
        }

        private static _getFrameHash()
        {
            // Need to cast contentWindow as <any> because frameHash is a dynamic property added by Hasher.
            return (Hasher._frame) ? (<any>Hasher._frame.contentWindow).frameHash : null;
        }

        private static _createFrame():void
        {
            Hasher._frame = Hasher._document.createElement('iframe');
            Hasher._frame.src = 'about:blank';
            Hasher._frame.style.display = 'none';
            Hasher._document.body.appendChild(Hasher._frame);
        }

        private static _updateFrame():void
        {
            if (Hasher._frame && Hasher._hash !== Hasher._getFrameHash())
            {
                var frameDoc = Hasher._frame.contentWindow.document;
                frameDoc.open();
                //update iframe content to force new history record.
                //based on Really Simple History, SWFAddress and YUI.history.
                frameDoc.write('<html><head><title>' + Hasher._document.title + '</title><script type="text/javascript">var frameHash="' + Hasher._hash + '";</script></head><body>&nbsp;</body></html>');
                frameDoc.close();
            }
        }

        private static _registerChange(newHash:string, isReplace:boolean = false):void
        {
            if (Hasher._hash !== newHash)
            {
                var oldHash = Hasher._hash;
                Hasher._hash = newHash; //should come before event dispatch to make sure user can get proper value inside event handler
                if (Hasher._isLegacyIE)
                {
                    if (!isReplace)
                    {
                        Hasher._updateFrame();
                    }
                    else
                    {
                        // Need to cast contentWindow as <any> because frameHash is a dynamic property added by Hasher.
                        (<any>Hasher._frame.contentWindow).frameHash = newHash;
                    }
                }

                //console.log('[Hasher]', 'changed', Hasher._trimHash(newHash), Hasher._trimHash(oldHash));
                Hasher.changed.dispatch(Hasher._trimHash(newHash), Hasher._trimHash(oldHash));
            }
        }

        private static _checkHistory():void
        {
            var windowHash = Hasher._getWindowHash();
            if (Hasher._isLegacyIE)
            {
                var frameHash = Hasher._getFrameHash();
                if (frameHash !== Hasher._hash && frameHash !== windowHash)
                {
                    //detect changes made pressing browser history buttons.
                    //Workaround since history.back() and history.forward() doesn't
                    //update hash value on IE6/7 but updates content of the iframe.
                    //needs to trim hash since value stored already have
                    //prependHash + appendHash for fast check.
                    Hasher.setHash(Hasher._trimHash(frameHash));
                }
                else if (windowHash !== Hasher._hash)
                {
                    //detect if hash changed (manually or using setHash)
                    Hasher._registerChange(windowHash);
                }
            }
            else
            {
                if (windowHash !== Hasher._hash)
                {
                    Hasher._registerChange(windowHash);
                }
            }
        }

        private static _addListener(elm, eType, fn)
        {
            if (elm.addEventListener)
            {
                elm.addEventListener(eType, fn, false);
            }
            else if (elm.attachEvent)
            {
                elm.attachEvent('on' + eType, fn);
            }
        }

        private static _removeListener(elm, eType, fn)
        {
            if (elm.removeEventListener)
            {
                elm.removeEventListener(eType, fn, false);
            }
            else if (elm.detachEvent)
            {
                elm.detachEvent('on' + eType, fn);
            }
        }

        private static _makePath(paths):string
        {
            var path:string = paths.join(Hasher.separator);
            path = path ? Hasher.prependHash + path.replace(Hasher._hashRegexp, '') + Hasher.appendHash : path;
            return path;
        }

        private static _encodePath(path:string):string
        {
            //used encodeURI instead of encodeURIComponent to preserve '?', '/',
            //'#'. Fixes Safari bug [issue #8]
            path = encodeURI(path);
            if (Hasher._isIE && Hasher._isLocal)
            {
                //fix IE8 local file bug [issue #6]
                path = path.replace(/\?/, '%3F');
            }
            return path;
        }

    }
}
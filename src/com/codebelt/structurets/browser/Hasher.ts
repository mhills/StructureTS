///<reference path='../events/EventDispatcher.ts'/>

/**
 * YUIDoc_comment
 *
 * @class Hasher
 * @extends EventDispatcher
 * @constructor
 **/
class Hasher extends EventDispatcher {

    public CLASS_NAME:string = 'Hasher';

    /**
     * hasher Version Number
     *
     * @type {string}
     * @final
     */
    public static VERSION:string = '1.1.4';

    /**
     * Frequency that it will check hash value on IE 6-7 since it doesn't support the hashchange event.
     * @property POOL_INTERVAL
     * @type {number}
     * @private
     * @final
     */
    private POOL_INTERVAL:number = 25;

    // local storage for brevity and better compression --------------------------------
    /**
     *
     * @property document
     * @type {HTMLDocument}
     * @private
     * @final
     */
    private document = window.document;

    /**
     *
     * @property history
     * @type {History}
     * @private
     * @final
     */
    private history = window.history;

    /**
     *
     * @property Signal
     * @type {signals.Signal}
     * @private
     * @final
     */
//    private Signal = signals.Signal;

    // local vars ----------------------------------------------------------------------
    /**
     *
     * @property hasher
     * @type {}
     * @private
     */
//    private hasher;

    /**
     *
     * @property _hash
     * @type {}
     * @private
     */
    private _hash;

    /**
     *
     * @property _checkInterval
     * @type {}
     * @private
     */
    private _checkInterval;

    /**
     *
     * @property _isActive
     * @type {}
     * @private
     */
    private _isActive;

    /**
     * iframe used for legacy IE (6-7)
     *
     * @property _frame
     * @type {}
     * @private
     */
    private _frame;

    /**
     *
     * @property _checkHistory
     * @type {}
     * @private
     */
//    private _checkHistory;

    /**
     *
     * @property _hashValRegexp
     * @type {RegExp}
     * @readonly
     * @private
     */
    private _hashValRegexp:RegExp = /#(.*)$/;

    /**
     *
     * @property _baseUrlRegexp
     * @type {RegExp}
     * @readonly
     * @private
     */
    private _baseUrlRegexp:RegExp = /(\?.*)|(\#.*)/;

    /**
     *
     * @property _hashRegexp
     * @type {RegExp}
     * @readonly
     * @private
     */
    private _hashRegexp:RegExp = /^\#/;

    // sniffing/feature detection -------------------------------------------------------
    /**
     * Hack based on this: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
     *
     * @property _isIE
     * @type {boolean}
     * @readonly
     * @private
     */
    private _isIE:boolean = (!+"\v1");

    /**
     * hashchange is supported by FF3.6+, IE8+, Chrome 5+, Safari 5+ but feature detection fails on IE compatibility mode, so we need to check documentMode.
     * @property _isHashChangeSupported
     * @type {boolean}
     * @readonly
     * @private
     */
    private _isHashChangeSupported:boolean = ('onhashchange' in window) && document.documentMode !== 7;

    /**
     * Check if is IE6-7 since hash change is only supported on IE8+ and changing hash value on IE6-7 doesn't generate history record.
     * @property _hashRegexp
     * @type {boolean}
     * @readonly
     * @private
     */
    private _isLegacyIE:boolean = false;

    /**
     *
     * @property _isLocal
     * @type {boolean}
     * @readonly
     * @private
     */
    private _isLocal:boolean = (location.protocol === 'file:');


    /**
     * String that should always be added to the end of Hash value.
     * <ul>
     * <li>default value: '';</li>
     * <li>will be automatically removed from `hasher.getHash()`</li>
     * <li>avoid conflicts with elements that contain ID equal to hash value;</li>
     * </ul>
     * @type string
     */
    public appendHash:string = '';

    /**
     * String that should always be added to the beginning of Hash value.
     * <ul>
     * <li>default value: '/';</li>
     * <li>will be automatically removed from `hasher.getHash()`</li>
     * <li>avoid conflicts with elements that contain ID equal to hash value;</li>
     * </ul>
     * @type string
     */
    public prependHash:string = '/';

    /**
     * String used to split hash paths; used by `hasher.getHashAsArray()` to split paths.
     * <ul>
     * <li>default value: '/';</li>
     * </ul>
     * @type string
     */
    public separator:string = '/';

    /**
     * Signal dispatched when hash value changes.
     * - pass current hash as 1st parameter to listeners and previous hash value as 2nd parameter.
     * @type signals.Signal
     */
//    public changed:signals.Signal = new Signal();

    /**
     * Signal dispatched when hasher is stopped.
     * -  pass current hash as first parameter to listeners
     * @type signals.Signal
     */
//    public stopped:signals.Signal = new Signal();

    /**
     * Signal dispatched when hasher is initialized.
     * - pass current hash as first parameter to listeners.
     * @type signals.Signal
     */
//    public initialized:signals.Signal = new Signal();

    constructor()
    {
        super();
        this._isLegacyIE = this._isIE && !this._isHashChangeSupported;
    }


    /**
     * Start listening/dispatching changes in the hash/history.
     * <ul>
     *   <li>hasher won't dispatch CHANGE events by manually typing a new value or pressing the back/forward buttons before calling this method.</li>
     * </ul>
     */

        //TODO: rename start()
    public init()
    {
        if (this._isActive) return;

        this._hash = this._getWindowHash();

        //thought about branching/overloading hasher.init() to avoid checking multiple times but
        //don't think worth doing it since it probably won't be called multiple times.
        if (this._isHashChangeSupported)
        {
            this._addListener(window, 'hashchange', this._checkHistory.bind(this));
        }
        else
        {
            if (this._isLegacyIE)
            {
                if (!this._frame)
                {
                    this._createFrame();
                }
                this._updateFrame();
            }
            this._checkInterval = setInterval(this._checkHistory.bind(this), this.POOL_INTERVAL);
        }

        this._isActive = true;
        console.log('[Hasher]', 'initialized', this._trimHash(this._hash));
        this.dispatchEvent(new BaseEvent(BaseEvent.ACTIVATE, false, false, this._trimHash(this._hash)));
//        this.initialized.dispatch(this._trimHash(this._hash));
    }

    /**
     * Stop listening/dispatching changes in the hash/history.
     * <ul>
     *   <li>hasher won't dispatch CHANGE events by manually typing a new value or pressing the back/forward buttons after calling this method, unless you call hasher.init() again.</li>
     *   <li>hasher will still dispatch changes made programatically by calling hasher.setHash();</li>
     * </ul>
     */
    public stop()
    {
        if (!this._isActive) return;

        if (this._isHashChangeSupported)
        {
            //TODO: test that removeListener is getting removed.
            this._removeListener(window, 'hashchange', this._checkHistory.bind(this));
        }
        else
        {
            clearInterval(this._checkInterval);
            this._checkInterval = null;
        }

        this._isActive = false;

        console.log('[Hasher]', 'stopped', this._trimHash(this._hash))
        this.dispatchEvent(new BaseEvent(BaseEvent.DEACTIVATE, false, false, this._trimHash(this._hash)));
//        hasher.stopped.dispatch(this._trimHash(this._hash));
    }

    /**
     * @return {boolean}    If hasher is listening to changes on the browser history and/or hash value.
     */
    public isActive()
    {
        return this._isActive;
    }

    /**
     * @return {string} Full URL.
     */
    public getURL()
    {
        return window.location.href;
    }

    /**
     * @return {string} Retrieve URL without query string and hash.
     */
    public getBaseURL()
    {
        return this.getURL().replace(this._baseUrlRegexp, ''); //removes everything after '?' and/or '#'
    }

    /**
     * Set Hash value, generating a new history record.
     * @param {...string} path    Hash value without '#'. Hasher will join
     * path segments using `hasher.separator` and prepend/append hash value
     * with `hasher.appendHash` and `hasher.prependHash`
     * @example hasher.setHash('lorem', 'ipsum', 'dolor') -> '#/lorem/ipsum/dolor'
     */
    public setHash(path)
    {
        path = this._makePath.apply(null, arguments);
        if (path !== this._hash)
        {
            // we should store raw value
            this._registerChange(path);
            if (path === this._hash)
            {
                // we check if path is still === _hash to avoid error in
                // case of multiple consecutive redirects [issue #39]
                window.location.hash = '#' + this._encodePath(path);
            }
        }
    }

    /**
     * Set Hash value without keeping previous hash on the history record.
     * Similar to calling `window.location.replace("#/hash")` but will also work on IE6-7.
     * @param {...string} path    Hash value without '#'. Hasher will join
     * path segments using `hasher.separator` and prepend/append hash value
     * with `hasher.appendHash` and `hasher.prependHash`
     * @example hasher.replaceHash('lorem', 'ipsum', 'dolor') -> '#/lorem/ipsum/dolor'
     */
    public replaceHash(path)
    {
        path = this._makePath.apply(null, arguments);
        if (path !== this._hash)
        {
            // we should store raw value
            this._registerChange(path, true);
            if (path === this._hash)
            {
                // we check if path is still === _hash to avoid error in
                // case of multiple consecutive redirects [issue #39]
                window.location.replace('#' + this._encodePath(path));
            }
        }
    }

    /**
     * @return {string} Hash value without '#', `hasher.appendHash` and `hasher.prependHash`.
     */
    public getHash()
    {
        //didn't used actual value of the `window.location.hash` to avoid breaking the application in case `window.location.hash` isn't available and also because value should always be synched.
        return this._trimHash(this._hash);
    }

    /**
     * @return {Array.<string>} Hash value split into an Array.
     */
    public getHashAsArray()
    {
        return this.getHash().split(this.separator);
    }

    /**
     * Removes all event listeners, stops hasher and destroy hasher object.
     * - IMPORTANT: hasher won't work after calling this method, hasher Object will be deleted.
     */
    public dispose()
    {
        this.stop();
//        this.initialized.dispose();
//        this.stopped.dispose();
//        this.changed.dispose();
        this._frame = window['hasher'] = null;
    }

    /**
     * @return {string} A string representation of the object.
     */
    public toString()
    {
        return '[hasher version="' + Hasher.VERSION + '" hash="' + this.getHash() + '"]';
    }


    // PRIVATE METHODS
    private _escapeRegExp(str)
    {
        return String(str || '').replace(/[\\.+*?\^$\[\](){}\/'#]/g, "\\$&");
    }

    private _trimHash(hash)
    {
        if (!hash) return '';
        var regexp = new RegExp('^' + this._escapeRegExp(this.prependHash) + '|' + this._escapeRegExp(this.appendHash) + '$', 'g');
        return hash.replace(regexp, '');
    }

    private _getWindowHash()
    {
        //parsed full URL instead of getting window.location.hash because Firefox decode hash value (and all the other browsers don't)
        //also because of IE8 bug with hash query in local file [issue #6]
        var result = this._hashValRegexp.exec(this.getURL());
        return (result && result[1]) ? decodeURIComponent(result[1]) : '';
    }

    private _getFrameHash()
    {
        return (this._frame) ? this._frame.contentWindow.frameHash : null;
    }

    private _createFrame()
    {
        this._frame = document.createElement('iframe');
        this._frame.src = 'about:blank';
        this._frame.style.display = 'none';
        document.body.appendChild(this._frame);
    }

    private _updateFrame()
    {
        if (this._frame && this._hash !== this._getFrameHash())
        {
            var frameDoc = this._frame.contentWindow.document;
            frameDoc.open();
            //update iframe content to force new history record.
            //based on Really Simple History, SWFAddress and YUI.history.
            frameDoc.write('<html><head><title>' + document.title + '</title><script type="text/javascript">var frameHash="' + this._hash + '";</script></head><body>&nbsp;</body></html>');
            frameDoc.close();
        }
    }

    private _registerChange(newHash:string, isReplace:boolean = false)
    {
        if (this._hash !== newHash)
        {
            var oldHash = this._hash;
            this._hash = newHash; //should come before event dispatch to make sure user can get proper value inside event handler
            if (this._isLegacyIE)
            {
                if (!isReplace)
                {
                    this._updateFrame();
                }
                else
                {
                    this._frame.contentWindow.frameHash = newHash;
                }
            }

            console.log('[Hasher]', 'changed', this._trimHash(newHash), this._trimHash(oldHash));
            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, false, false, {newHash: this._trimHash(newHash), oldHash: this._trimHash(oldHash)}));
//            hasher.changed.dispatch(this._trimHash(newHash), this._trimHash(oldHash));
        }
    }

    private _checkHistory()
    {
        if (this._isLegacyIE)
        {
//            _checkHistory = function(){
            var windowHash = this._getWindowHash(),
                frameHash = this._getFrameHash();
            if (frameHash !== this._hash && frameHash !== windowHash)
            {
                //detect changes made pressing browser history buttons.
                //Workaround since history.back() and history.forward() doesn't
                //update hash value on IE6/7 but updates content of the iframe.
                //needs to trim hash since value stored already have
                //prependHash + appendHash for fast check.
                hasher.setHash(this._trimHash(frameHash));
            }
            else if (windowHash !== this._hash)
            {
                //detect if hash changed (manually or using setHash)
                this._registerChange(windowHash);
            }
//            };
        }
        else
        {
//            _checkHistory = function(){
            var windowHash = this._getWindowHash();
            if (windowHash !== this._hash)
            {
                this._registerChange(windowHash);
            }
//            };
        }
    }

    private _addListener(elm, eType, fn)
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

    private _removeListener(elm, eType, fn)
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

    private _makePath(paths)
    {
        paths = Array.prototype.slice.call(arguments);

        var path = paths.join(hasher.separator);
        path = path ? this.prependHash + path.replace(this._hashRegexp, '') + hasher.appendHash : path;
        return path;
    }

    private _encodePath(path)
    {
        //used encodeURI instead of encodeURIComponent to preserve '?', '/',
        //'#'. Fixes Safari bug [issue #8]
        path = encodeURI(path);
        if (this._isIE && this._isLocal)
        {
            //fix IE8 local file bug [issue #6]
            path = path.replace(/\?/, '%3F');
        }
        return path;
    }

}
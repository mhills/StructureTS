var BaseObject = (function () {
    function BaseObject() {
        this.CLASS_NAME = 'BaseObject';
        this.cid = _.uniqueId();
    }
    BaseObject.prototype.getQualifiedClassName = function () {
        return this.CLASS_NAME;
    };
    return BaseObject;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseEvent = (function (_super) {
    __extends(BaseEvent, _super);
    function BaseEvent(type, bubbles, cancelable, data) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof data === "undefined") { data = null; }
        _super.call(this);
        this.CLASS_NAME = 'BaseEvent';
        this.type = null;
        this.target = null;
        this.data = null;
        this.bubble = false;
        this.cancelable = false;
        this.isPropagationStopped = false;
        this.isImmediatePropagationStopped = false;

        this.type = type;
        this.bubble = bubbles;
        this.cancelable = cancelable;
        this.data = data;
    }
    BaseEvent.prototype.stopPropagation = function () {
        this.isPropagationStopped = true;
    };

    BaseEvent.prototype.stopImmediatePropagation = function () {
        this.stopPropagation();
        this.isImmediatePropagationStopped = true;
    };
    BaseEvent.ACTIVATE = 'BaseEvent.activate';

    BaseEvent.ADDED = 'BaseEvent.added';

    BaseEvent.ADDED_TO_STAGE = 'BaseEvent.addedToStage';

    BaseEvent.CANCEL = 'BaseEvent.cancel';

    BaseEvent.CHANGE = 'BaseEvent.change';

    BaseEvent.CLEAR = 'BaseEvent.clear';

    BaseEvent.CLOSE = 'BaseEvent.close';

    BaseEvent.CLOSING = 'BaseEvent.closing';

    BaseEvent.COMPLETE = 'BaseEvent.complete';

    BaseEvent.CONNECT = 'BaseEvent.connect';

    BaseEvent.COPY = 'BaseEvent.copy';

    BaseEvent.CUT = 'BaseEvent.cut';

    BaseEvent.DEACTIVATE = 'BaseEvent.deactivate';

    BaseEvent.DISPLAYING = 'BaseEvent.displaying';

    BaseEvent.ENTER_FRAME = 'BaseEvent.enterFrame';

    BaseEvent.EXIT_FRAME = 'BaseEvent.exitFrame';

    BaseEvent.EXITING = 'BaseEvent.exiting';

    BaseEvent.FULLSCREEN = 'BaseEvent.fullScreen';

    BaseEvent.INIT = 'BaseEvent.init';

    BaseEvent.NETWORK_CHANGE = 'BaseEvent.networkChange';

    BaseEvent.OPEN = 'BaseEvent.open';

    BaseEvent.PASTE = 'BaseEvent.paste';

    BaseEvent.PREPARING = 'BaseEvent.preparing';

    BaseEvent.REMOVED = 'BaseEvent.removed';

    BaseEvent.RENDER = 'BaseEvent.render';

    BaseEvent.RESIZE = 'BaseEvent.resize';
    return BaseEvent;
})(BaseObject);
var EventDispatcher = (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        _super.call(this);
        this.CLASS_NAME = 'EventDispatcher';
        this._listeners = null;
        this.parent = null;

        this._listeners = [];
    }
    EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
        if (typeof priority === "undefined") { priority = 0; }
        var list = this._listeners[type];
        if (list == null) {
            this._listeners[type] = list = [];
        }
        var index = 0;
        var listener;
        var i = list.length;
        while (--i > -1) {
            listener = list[i];
            if (listener.c === callback) {
                list.splice(i, 1);
            } else if (index === 0 && listener.pr < priority) {
                index = i + 1;
            }
        }
        list.splice(index, 0, { c: callback, s: scope, pr: priority });

        return this;
    };

    EventDispatcher.prototype.removeEventListener = function (type, callback) {
        var list = this._listeners[type];
        if (list) {
            var i = list.length;
            while (--i > -1) {
                if (list[i].c === callback) {
                    list.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    };

    EventDispatcher.prototype.dispatchEvent = function (event) {
        if (event.target == null) {
            event.target = this;
        }

        var list = this._listeners[event.type];
        if (list) {
            var i = list.length;
            var listener;
            while (--i > -1) {
                if (event.cancelable && event.isImmediatePropagationStopped)
                    break;

                listener = list[i];
                listener.c.call(listener.s, event);
            }
        }

        if (this.parent && event.bubble) {
            if (event.cancelable && event.isPropagationStopped)
                return this;

            this.parent.dispatchEvent(event);
        }

        return this;
    };
    return EventDispatcher;
})(BaseObject);
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        _super.call(this);
        this.CLASS_NAME = 'DisplayObject';
        this.isEnabled = false;
        this.isCreated = false;
        this.numChildren = 0;
        this.children = [];
    }
    DisplayObject.prototype.createChildren = function () {
    };

    DisplayObject.prototype.addChild = function (child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this.children.unshift(child);
        this.numChildren = this.children.length;

        child.parent = this;

        return child;
    };

    DisplayObject.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        child.disable();
        child.parent = null;

        this.numChildren = this.children.length;

        return this;
    };

    DisplayObject.prototype.removeChildren = function () {
        while (this.children.length > 0) {
            this.removeChild(this.children.pop());
        }

        this.numChildren = this.children.length;

        return this;
    };

    DisplayObject.prototype.addChildAt = function (child, index) {
        this.children.unshift(child);

        this.numChildren = this.children.length;

        return child;
    };

    DisplayObject.prototype.getChild = function (child) {
        var index = this.children.indexOf(child);

        return this.children[index];
    };

    DisplayObject.prototype.getChildAt = function (index) {
        return this.children[index];
    };

    DisplayObject.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        this.isEnabled = true;
    };

    DisplayObject.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this.isEnabled = false;
    };

    DisplayObject.prototype.layoutChildren = function () {
    };

    DisplayObject.prototype.destroy = function () {
        this.disable();
        this.children = [];
        this.numChildren = 0;
    };
    return DisplayObject;
})(EventDispatcher);
var TemplateFactory = (function () {
    function TemplateFactory() {
    }
    TemplateFactory.createTemplate = function (templatePath, data) {
        var template = TemplateFactory.create(templatePath, data);

        return jQuery(template);
    };

    TemplateFactory.createView = function (templatePath, data) {
        var template = TemplateFactory.create(templatePath, data);

        var view = new DOMElement();
        view.$el = jQuery(template);
        return view;
    };

    TemplateFactory.create = function (templatePath, data) {
        var regex = /^([.#])(.+)/;
        var template;
        var isClassOrIdName = regex.test(templatePath);

        if (isClassOrIdName) {
            var templateMethod = _.template($(templatePath).html());
            template = templateMethod(data);
        } else {
            var templateObj = window[TemplateFactory.templateNamespace];
            if (!templateObj) {
                throw new ReferenceError('[TemplateFactory] Make sure the TemplateFactory.templateNamespace value is correct. Currently the value is ' + TemplateFactory.templateNamespace);
            }

            var templateFunction = templateObj[templatePath];
            if (!templateFunction) {
                throw new ReferenceError('[TemplateFactory] Template not found for ' + templatePath);
            }

            template = templateFunction(data);
        }

        if (!template) {
            throw new ReferenceError('[TemplateFactory] Template not found for ' + templatePath);
        }

        return template;
    };
    TemplateFactory.templateNamespace = 'JST';
    return TemplateFactory;
})();
var DOMElement = (function (_super) {
    __extends(DOMElement, _super);
    function DOMElement(type, params) {
        if (typeof type === "undefined") { type = 'div'; }
        if (typeof params === "undefined") { params = {}; }
        _super.call(this);
        this.CLASS_NAME = 'DOMElement';
        this._node = null;
        this._options = {};
        this._isVisible = true;
        this.el = null;
        this.$el = null;

        this._node = type;
        this._options = params;
    }
    DOMElement.prototype.createChildren = function (template, data) {
        if (typeof template === 'function') {
            Jaml.register(this.CLASS_NAME, template);
            this.$el = jQuery(Jaml.render(this.CLASS_NAME, this._options));
        } else if (typeof template === 'string') {
            this.$el = TemplateFactory.createTemplate(template, data);
        } else if (this._node && !this.$el) {
            this.$el = jQuery("<" + this._node + "/>", this._options);
        }

        this.el = this.$el[0];
    };

    DOMElement.prototype.addChild = function (child) {
        _super.prototype.addChild.call(this, child);

        if (!child.isCreated) {
            child.createChildren();
            child.isCreated = true;
        }
        child.layoutChildren();

        child.$el.attr('data-cid', child.cid);

        this.$el.append(child.$el);

        this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));

        return child;
    };

    DOMElement.prototype.addChildAt = function (child, index) {
        var children = this.$el.children();
        var length = children.length;

        if (index < 0 || index >= length) {
            this.addChild(child);
        } else {
            child.parent = this;
            if (!child.isCreated) {
                child.createChildren();
                child.isCreated = true;
            }
            child.layoutChildren();
            jQuery(children.get(index)).before(child.$el);

            _super.prototype.addChildAt.call(this, child, index);
        }

        return this;
    };

    DOMElement.prototype.getChild = function (selector) {
        var domElement;

        if (typeof selector === 'number') {
            domElement = _.find(this.children, function (domElement) {
                return domElement.cid == selector;
            });
        } else {
            var jQueryElement = this.$el.find(selector + ':first');
            if (jQueryElement.length == 0) {
                throw new TypeError('[DOMElement] getChild(' + selector + ') Cannot find DOM $el');
            }

            var cid = jQueryElement.data('cid');
            domElement = _.find(this.children, function (domElement) {
                return domElement.cid == cid;
            });

            if (!domElement) {
                domElement = new DOMElement();
                domElement.$el = jQueryElement;
                domElement.$el.attr('data-cid', domElement.cid);

                domElement.el = jQueryElement[0];
                domElement.isCreated = true;

                _super.prototype.addChild.call(this, domElement);
            }
        }

        return domElement;
    };

    DOMElement.prototype.getChildren = function (selector) {
        if (typeof selector === "undefined") { selector = ''; }
        var _this = this;
        var $child;
        var domElement;
        var $list = this.$el.children(selector || '');

        _.each($list, function (item, index) {
            $child = jQuery(item);

            if (!$child.data('cid')) {
                domElement = new DOMElement();
                domElement.$el = $child;
                domElement.$el.attr('data-cid', domElement.cid);
                domElement.el = item;
                domElement.isCreated = true;

                _super.prototype.addChild.call(_this, domElement);
            }
        });

        return this.children;
    };

    DOMElement.prototype.removeChild = function (child) {
        child.$el.unbind();
        child.$el.remove();

        _super.prototype.removeChild.call(this, child);

        return child;
    };

    DOMElement.prototype.removeChildren = function () {
        _super.prototype.removeChildren.call(this);

        this.$el.empty();

        return this;
    };

    DOMElement.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        _super.prototype.enable.call(this);
    };

    DOMElement.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        _super.prototype.disable.call(this);
    };

    DOMElement.prototype.layoutChildren = function () {
    };

    DOMElement.prototype.alpha = function (number) {
        this.$el.css('opacity', number);
        return this;
    };

    DOMElement.prototype.visible = function (value) {
        if (value == false) {
            this._isVisible = false;
            this.$el.hide();
        } else if (value == true) {
            this._isVisible = true;
            this.$el.show();
        } else if (value == undefined) {
            return this._isVisible;
        }
        return this;
    };
    return DOMElement;
})(DisplayObject);
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        _super.call(this);
        this.CLASS_NAME = 'Stage';
    }
    Stage.prototype.appendTo = function (type, enabled) {
        if (typeof enabled === "undefined") { enabled = true; }
        this.$el = jQuery(type);

        if (!this.isCreated) {
            this.createChildren();
            this.isCreated = true;
        }

        if (enabled) {
            this.enable();
        } else {
            this.disable();
        }
    };
    return Stage;
})(DOMElement);
var BrowserUtils = (function () {
    function BrowserUtils() {
    }
    BrowserUtils.hasBrowserHistory = function () {
        return !!(window.history && history.pushState);
    };

    BrowserUtils.hasLocalStorage = function () {
        try  {
            return ('localStorage' in window) && window.localStorage !== null;
        } catch (error) {
            return false;
        }
    };

    BrowserUtils.hasSessionStorage = function () {
        try  {
            return ('sessionStorage' in window) && window.sessionStorage !== null;
        } catch (error) {
            return false;
        }
    };
    return BrowserUtils;
})();
var RouterController = (function () {
    function RouterController() {
    }
    RouterController.prototype.addRoute = function (pattern, handler, scope, priority) {
        crossroads.addRoute(pattern, handler.bind(scope), priority);
    };

    RouterController.prototype.start = function () {
        hasher.initialized.add(this.parseHash);
        hasher.changed.add(this.parseHash);
        hasher.init();
    };

    RouterController.prototype.parseHash = function (newHash, oldHash) {
        crossroads.parse(newHash);
    };
    return RouterController;
})();
var LoaderEvent = (function (_super) {
    __extends(LoaderEvent, _super);
    function LoaderEvent(type, data) {
        if (typeof data === "undefined") { data = null; }
        _super.call(this, type, data);
        this.CLASS_NAME = 'LoaderEvent';
    }
    LoaderEvent.COMPLETE = "LoaderEvent.complete";
    LoaderEvent.LOAD_COMPLETE = "LoaderEvent.loadComplete";
    return LoaderEvent;
})(BaseEvent);
var BulkLoader = (function (_super) {
    __extends(BulkLoader, _super);
    function BulkLoader() {
        _super.call(this);
        this._dataStores = [];

        this.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
    }
    BulkLoader.getInstance = function () {
        if (this._instance == null) {
            this._instance = new BulkLoader();
        }
        return this._instance;
    };

    BulkLoader.prototype.addFile = function (dataStore, key) {
        this._dataStores[key] = dataStore;
    };

    BulkLoader.prototype.getFile = function (key) {
        return this._dataStores[key];
    };

    BulkLoader.prototype.getImage = function (key) {
        return this._dataStores[key].data;
    };

    BulkLoader.prototype.getHtmlTemplate = function (key, templateId) {
        var rawHtml = jQuery(this._dataStores[key].data).filter("#" + templateId).html();
        return rawHtml;
    };

    BulkLoader.prototype.load = function () {
        for (var key in this._dataStores) {
            var dataStore = this._dataStores[key];
            dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
            dataStore.load();
        }
    };

    BulkLoader.prototype.onLoadComplete = function (event) {
        event.target.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete);

        for (var key in this._dataStores) {
            var dataStore = this._dataStores[key];
            if (!dataStore.complete) {
                return;
            }
        }

        this.dispatchEvent(new LoaderEvent(LoaderEvent.LOAD_COMPLETE));
    };
    return BulkLoader;
})(EventDispatcher);
var URLRequestMethod = (function () {
    function URLRequestMethod() {
    }
    URLRequestMethod.DELETE = "DELETE";
    URLRequestMethod.GET = "GET";
    URLRequestMethod.POST = "POST";
    URLRequestMethod.PUT = "PUT";
    URLRequestMethod.HEAD = "HEAD";
    URLRequestMethod.OPTIONS = "OPTIONS";
    return URLRequestMethod;
})();
var URLContentType = (function () {
    function URLContentType() {
    }
    URLContentType.DEFAULT = "application/x-www-form-urlencoded";
    URLContentType.ATOM = "application/atom+xml";
    URLContentType.JSON = "application/json";
    URLContentType.PDF = "application/pdf";
    URLContentType.RDF = "application/rdf+xml";
    URLContentType.RSS = "application/rss+xml";
    URLContentType.SOAP = "application/soap+xml";
    URLContentType.FONT_WOFF = "application/font-woff";
    URLContentType.XML = "application/xml";
    URLContentType.XHTML = "application/xhtml+xml";
    URLContentType.ZIP = "application/zip";
    URLContentType.GZIP = "application/gzip";

    URLContentType.BASIC = "audio/basic";
    URLContentType.L24 = "audio/L24";
    URLContentType.MP4 = "audio/mp4";
    URLContentType.MP3 = "audio/mpeg";
    URLContentType.MPEG = "audio/mpeg";
    URLContentType.OGG = "audio/ogg";
    URLContentType.VORBIS = "audio/vorbis";
    URLContentType.REAL_AUDIO = "audio/vnd.rn-realaudio";
    URLContentType.WAV = "audio/vnd.wave";
    URLContentType.WEBM = "audio/webm";
    return URLContentType;
})();
var URLRequest = (function () {
    function URLRequest(url) {
        if (typeof url === "undefined") { url = null; }
        this.url = null;
        this.method = URLRequestMethod.GET;
        this.contentType = URLContentType.DEFAULT;
        this.data = null;
        this.url = url;
    }
    return URLRequest;
})();
var URLLoaderDataFormat = (function () {
    function URLLoaderDataFormat() {
    }
    URLLoaderDataFormat.XML = "xml";
    URLLoaderDataFormat.HTML = "html";
    URLLoaderDataFormat.SCRIPT = "script";
    URLLoaderDataFormat.JSON = "json";
    URLLoaderDataFormat.JSONP = "jsonp";
    URLLoaderDataFormat.TEXT = "text";
    return URLLoaderDataFormat;
})();
var URLLoader = (function (_super) {
    __extends(URLLoader, _super);
    function URLLoader(request) {
        if (typeof request === "undefined") { request = null; }
        _super.call(this);
        this.data = null;
        this.dataFormat = URLLoaderDataFormat.TEXT;
        this.ready = false;

        if (request) {
            this.load(request);
        }
    }
    URLLoader.prototype.load = function (request) {
        this.ready = false;
        var self = this;

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
    };

    URLLoader.prototype.onLoadSuccess = function () {
    };

    URLLoader.prototype.onBeforeSend = function () {
    };
    URLLoader.prototype.onLoadError = function () {
        console.log("[URLLoader] - onLoadError", arguments);
    };
    URLLoader.prototype.onComplete = function (data) {
        this.ready = true;

        this.data = data.responseText;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
    };
    return URLLoader;
})(EventDispatcher);
var BaseRequest = (function (_super) {
    __extends(BaseRequest, _super);
    function BaseRequest(baseUrl, endpoint) {
        _super.call(this);
        this._baseUrl = "";
        this._endpoint = "";
        this.data = null;
        this.complete = false;

        this._baseUrl = baseUrl;
        this._endpoint = endpoint;
        this.configureRequest();
    }
    BaseRequest.prototype.configureRequest = function () {
        this._request = new URLRequest(this._baseUrl + this._endpoint);
        this._request.method = URLRequestMethod.GET;

        this._loader = new URLLoader();
        this._loader.addEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete, this);
        this._loader.dataFormat = URLLoaderDataFormat.HTML;
    };

    BaseRequest.prototype.onLoaderComplete = function (event) {
        this.complete = true;
        this.data = this._loader.data;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));

        this._loader.removeEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete);
        this._loader = null;
    };

    BaseRequest.prototype.load = function () {
        if (this.complete)
            return;

        this._loader.load(this._request);
    };
    return BaseRequest;
})(EventDispatcher);
var JsonRequest = (function (_super) {
    __extends(JsonRequest, _super);
    function JsonRequest() {
        _super.call(this, "asdf", "sdfg");
    }
    return JsonRequest;
})(BaseRequest);
var ValueObject = (function (_super) {
    __extends(ValueObject, _super);
    function ValueObject() {
        _super.call(this);
        this.CLASS_NAME = 'ValueObject';
    }
    ValueObject.prototype.toJsonString = function () {
        return JSON.stringify(this);
    };

    ValueObject.prototype.toJSON = function () {
        return JSON.parse(JSON.stringify(this));
    };

    ValueObject.prototype.clone = function () {
    };

    ValueObject.prototype.copy = function (data) {
        for (var key in this) {
            if (key !== 'id' && this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    };

    ValueObject.prototype.set = function (prop, value) {
        if (!prop)
            throw new Error('You must pass a argument into the set method.');

        if (typeof (prop) === "object") {
            for (var key in prop) {
                this[key] = prop[key];
            }
        } else if (typeof (prop) === "string") {
            this[prop] = value;
        }

        console.log("Event.change, todo: make it dispatch event?");
        return this;
    };

    ValueObject.prototype.get = function (prop) {
        if (!prop)
            return this;
        return this[prop];
    };
    return ValueObject;
})(BaseObject);
var LanguageConfigVO = (function (_super) {
    __extends(LanguageConfigVO, _super);
    function LanguageConfigVO(data) {
        _super.call(this);
        this.id = null;
        this.type = null;
        this.path = null;

        if (data) {
            this.update(data);
        }
    }
    LanguageConfigVO.prototype.update = function (data) {
        this.id = data.id;
        this.type = data.type;
        this.path = data.path;
    };
    return LanguageConfigVO;
})(ValueObject);
var LanguageManager = (function (_super) {
    __extends(LanguageManager, _super);
    function LanguageManager() {
        _super.call(this);
        this._request = null;
        this._availableLanguagesDictionary = [];
        this.currentLanguage = null;
        this.data = null;
    }
    LanguageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LanguageManager();
        }
        return this._instance;
    };

    LanguageManager.prototype.getLangConfigById = function (id) {
        return this._availableLanguagesDictionary[id];
    };

    LanguageManager.prototype.onConfigLoaded = function (event) {
        var jsonData = JSON.parse(event.target.data);
        var len = jsonData.data.length;
        for (var i = 0; i < len; i++) {
            var vo = new LanguageConfigVO(jsonData.data[i]);
            this._availableLanguagesDictionary[vo.id] = vo;
        }

        this._request.removeEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded);

        var currentLanguageVO = this.getLangConfigById(this.currentLanguage);
        this.loadLanguageData(currentLanguageVO.path);
    };

    LanguageManager.prototype.loadConfig = function (path) {
        this._request = new BaseRequest(path, '');
        this._request.addEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded, this);
        this._request.load();
    };

    LanguageManager.prototype.setLang = function (value) {
        this.currentLanguage = value;
    };

    LanguageManager.prototype.loadLanguageData = function (path) {
        this._request = new BaseRequest(path, '');
        this._request.addEventListener(LoaderEvent.COMPLETE, this.onLanguageDataLoad, this);
        this._request.load();
    };

    LanguageManager.prototype.onLanguageDataLoad = function (event) {
        this.data = JSON.parse(event.target.data);
        this._request.removeEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded);
        this._request = null;

        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
    };
    return LanguageManager;
})(EventDispatcher);
var LocalStorageController = (function (_super) {
    __extends(LocalStorageController, _super);
    function LocalStorageController() {
        _super.call(this);
        this.CLASS_NAME = 'LocalStorageController';
    }
    LocalStorageController.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LocalStorageController();
        }
        return this._instance;
    };

    LocalStorageController.prototype.setItem = function (key, data) {
        localStorage.setItem(key, data);
    };

    LocalStorageController.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };

    LocalStorageController.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };

    LocalStorageController.prototype.clear = function () {
        localStorage.clear();
    };
    LocalStorageController._instance = null;
    return LocalStorageController;
})(EventDispatcher);
var LanguageEvent = (function (_super) {
    __extends(LanguageEvent, _super);
    function LanguageEvent(type, bubbles, cancelable, data) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof data === "undefined") { data = null; }
        _super.call(this, type, bubbles, cancelable, data);
        this.CLASS_NAME = 'LanguageEvent';
    }
    LanguageEvent.LANGUAGE_CHANGE = "LanguageEvent.languageChange";
    return LanguageEvent;
})(BaseEvent);
var LanguageSelect = (function (_super) {
    __extends(LanguageSelect, _super);
    function LanguageSelect() {
        _super.call(this);
        this.CLASS_NAME = 'LanguageSelect';

        var languageManagerData = LanguageManager.getInstance().data;
    }
    LanguageSelect.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, function (data) {
            select(option({ value: 'en' }, 'English'), option({ value: 'fr' }, 'French'), option({ value: 'sp' }, 'Spanish'));
        });

        this.enabled(true);
    };

    LanguageSelect.prototype.layoutChildren = function () {
    };

    LanguageSelect.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
            this.$el.on('change', this.onLanguageChange.bind(this));
        } else {
        }

        this.isEnabled = value;
    };

    LanguageSelect.prototype.onLanguageChange = function (event) {
        var languageId = $(event.currentTarget).val();
        this.dispatchEvent(new LanguageEvent(LanguageEvent.LANGUAGE_CHANGE, false, false, languageId));
    };

    LanguageSelect.prototype.value = function (value) {
        this.$el.val(value);
    };
    return LanguageSelect;
})(DOMElement);
var NavigationView = (function (_super) {
    __extends(NavigationView, _super);
    function NavigationView() {
        _super.call(this);
        this.CLASS_NAME = 'NavigationView';
        this._languageSelect = null;

        var languageManagerData = LanguageManager.getInstance().data;

        this._options = {
            title: languageManagerData.mainTitle,
            link1: languageManagerData.mainNavigation.home,
            link2: languageManagerData.mainNavigation.aboutUs,
            link3: languageManagerData.mainNavigation.artists,
            link4: languageManagerData.mainNavigation.reservations,
            link5: languageManagerData.mainNavigation.contact
        };
    }
    NavigationView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, function (data) {
            div({ id: 'header' }, div({ cls: 'background' }, h1(a({ href: '#home', html: 'DelliStore' })), ul(li(a({ cls: 'active', href: '#home' }, data.link1)), li(a({ href: '#about/robert' }, data.link2)), li(a({ href: '#artists/' }, data.link3)), li(a({ href: '#reservations/' }, data.link4)), li(a({ href: '#contact?name=robert&age=34' }, data.link5)))));
        });
    };

    NavigationView.prototype.layoutChildren = function () {
    };

    NavigationView.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        _super.prototype.enable.call(this);
    };

    NavigationView.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        _super.prototype.disable.call(this);
    };

    NavigationView.prototype.onLanguageChange = function (event) {
        var ls = LocalStorageController.getInstance();
        ls.setItem('language', event.data);

        document.location.reload(false);
    };
    return NavigationView;
})(DOMElement);
var FooterView = (function (_super) {
    __extends(FooterView, _super);
    function FooterView() {
        _super.call(this);
    }
    FooterView.prototype.createChildren = function () {
        this.$el = TemplateFactory.createTemplate('templates/Footer.tpl');

        _super.prototype.createChildren.call(this);
    };

    FooterView.prototype.layoutChildren = function () {
    };

    FooterView.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    };
    return FooterView;
})(DOMElement);
var HtmlLoader = (function (_super) {
    __extends(HtmlLoader, _super);
    function HtmlLoader(path) {
        _super.call(this);
        this._urlLoader = null;
        this.complete = false;

        this.src = path;

        this._urlLoader = new URLLoader();
        this._urlLoader.addEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete, this);
        this._urlLoader.dataFormat = URLLoaderDataFormat.HTML;
    }
    HtmlLoader.prototype.load = function () {
        if (this.complete)
            return;

        var request = new URLRequest(this.src);
        request.method = URLRequestMethod.GET;

        this._urlLoader.load(request);
    };

    HtmlLoader.prototype.onLoaderComplete = function (event) {
        this.complete = true;
        this.data = this._urlLoader.data;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));

        this._urlLoader.removeEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete);
        this._urlLoader = null;
    };
    return HtmlLoader;
})(EventDispatcher);
var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        _super.call(this);
        this.TITLE = "Home View";
    }
    HomeView.prototype.createChildren = function () {
        this.$el = TemplateFactory.createTemplate('templates/HomeBody.tpl', { name: "Robert" });

        _super.prototype.createChildren.call(this);
    };

    HomeView.prototype.layoutChildren = function () {
        document.title = this.TITLE;
    };

    HomeView.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    };
    return HomeView;
})(DOMElement);
var AlbumVO = (function (_super) {
    __extends(AlbumVO, _super);
    function AlbumVO(data) {
        _super.call(this);
        this.pid = null;
        this.artist = "";
        this.image = "";
        this.large_image = "";
        this.price = "";
        this.title = "";
        this.url = "";

        if (data) {
            this.update(data);
        }
    }
    AlbumVO.prototype.update = function (data) {
        this.pid = data.pid;
        this.artist = data.artist;
        this.image = data.image;
        this.large_image = data.large_image;
        this.price = data.price;
        this.title = data.title;
        this.url = data.url;
    };
    return AlbumVO;
})(ValueObject);
var ArtistVO = (function (_super) {
    __extends(ArtistVO, _super);
    function ArtistVO(data) {
        _super.call(this);
        this.pid = null;
        this.artist = "";
        this.title = "";
        this.years = "";
        this.url = "";
        this.image = "";
        this.albumList = [];

        if (data) {
            this.update(data);
        }
    }
    ArtistVO.prototype.update = function (data) {
        this.pid = data.pid;
        this.artist = data.artist;
        this.title = data.title;
        this.years = data.years;
        this.url = data.url;
        this.image = data.image;

        var len = data.albums.length;
        for (var i = 0; i < len; i++) {
            this.albumList.push(new AlbumVO(data.albums[i]));
        }
    };
    return ArtistVO;
})(ValueObject);
var ArtistsView = (function (_super) {
    __extends(ArtistsView, _super);
    function ArtistsView() {
        _super.call(this);
        this.CLASS_NAME = 'ArtistsView';
        this.TITLE = "Artists View";
        this._artistVOList = [];
        this._container = null;
        this.urlLoader = null;

        this._options = {};
    }
    ArtistsView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, function (data) {
            div({ id: 'bodyPan' }, h1("Artists View"), div({ id: "dynamic-container" }, "Robert is cool this is the home view"));
        });

        this._container = this.getChild("#dynamic-container");
    };

    ArtistsView.prototype.layoutChildren = function () {
        document.title = this.TITLE;
    };

    ArtistsView.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    };

    ArtistsView.prototype.requestData = function () {
        var request = new URLRequest();
        request.url = "data/artist-album.json";
        request.method = URLRequestMethod.GET;
        request.contentType = "application/json";

        this.urlLoader = new URLLoader();
        this.urlLoader.addEventListener(LoaderEvent.COMPLETE, this.loaderCompleteHandler, this);
        this.urlLoader.dataFormat = URLLoaderDataFormat.JSON;
        this.urlLoader.load(request);
    };

    ArtistsView.prototype.loaderCompleteHandler = function (event) {
        console.log("loaderCompleteHandler");
        var urlLoader = event.target;

        var parsedData = JSON.parse(urlLoader.data);
        var len = parsedData.length;
        for (var i = 0; i < len; i++) {
            this._artistVOList.push(new ArtistVO(parsedData[i]));
        }

        var hasherData = hasher.getHashAsArray();
        this.update(hasherData[1], hasherData[2]);
    };

    ArtistsView.prototype.update = function (artist, album) {
        if (!this.urlLoader || this.urlLoader.ready == false) {
            this.requestData();
            return;
        }

        if (artist && !album) {
            var artistMarkup = new DOMElement();
            artistMarkup.$el = TemplateFactory.createTemplate('templates/Albums.tpl', { data: this._artistVOList[artist] });
            this._container.removeChildren();
            this._container.addChild(artistMarkup);
        } else if (artist && album) {
            var artistMarkup = new DOMElement();
            artistMarkup.$el = TemplateFactory.createTemplate('templates/BuyAlbum.tpl', { data: this._artistVOList[artist].albumList[album] });
            this._container.removeChildren();
            this._container.addChild(artistMarkup);
        } else {
            var artistMarkup = new DOMElement();
            artistMarkup.$el = TemplateFactory.createTemplate('templates/Artists.tpl', { data: this._artistVOList });

            this._container.removeChildren();
            this._container.addChild(artistMarkup);
        }
    };
    return ArtistsView;
})(DOMElement);
var ContactView = (function (_super) {
    __extends(ContactView, _super);
    function ContactView() {
        _super.call(this);
        this.TITLE = "Contact View";
    }
    ContactView.prototype.createChildren = function () {
        this.$el = TemplateFactory.createTemplate('templates/ContactTemplate.tpl', { name: "Robert" });

        _super.prototype.createChildren.call(this);
    };

    ContactView.prototype.layoutChildren = function () {
        document.title = this.TITLE;
    };

    ContactView.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    };
    return ContactView;
})(DOMElement);
var AboutView = (function (_super) {
    __extends(AboutView, _super);
    function AboutView() {
        _super.call(this);
        this.TITLE = "About View";
    }
    AboutView.prototype.createChildren = function () {
        this.$el = TemplateFactory.createTemplate('templates/AboutTemplate.tpl', { name: "Robert" });

        _super.prototype.createChildren.call(this);
    };

    AboutView.prototype.layoutChildren = function () {
        document.title = this.TITLE;
    };

    AboutView.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    };
    return AboutView;
})(DOMElement);
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView(type, params, router) {
        _super.call(this, type, params);
        this._router = null;
        this._currentView = null;
        this._homeView = null;
        this._artistsView = null;
        this._contactView = null;
        this._aboutView = null;

        this._router = router;
    }
    MainView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._homeView = new HomeView();
        this._artistsView = new ArtistsView();
        this._contactView = new ContactView();
        this._aboutView = new AboutView();

        this.setupRoutes();
    };

    MainView.prototype.layoutChildren = function () {
    };

    MainView.prototype.setupRoutes = function () {
        this._router.addRoute("", this.homeRouterHandler, this);
        this._router.addRoute("home", this.homeRouterHandler, this);
        this._router.addRoute('about/{id}', this.aboutMeRouterHandler, this);
        this._router.addRoute('artists/:name:/:album:', this.artistsRouterHandler, this);
        this._router.addRoute('contact{?query}', this.contactRouterHandler, this);
        this._router.start();
    };

    MainView.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        _super.prototype.enable.call(this);
    };

    MainView.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        _super.prototype.disable.call(this);
    };

    MainView.prototype.homeRouterHandler = function () {
        console.log("homeRouterHandler", arguments);
        this.changeViewTo(this._homeView);
    };

    MainView.prototype.aboutMeRouterHandler = function () {
        console.log("aboutMeRouterHandler", arguments);
        this.changeViewTo(this._aboutView);
    };

    MainView.prototype.artistsRouterHandler = function (artist, album) {
        console.log("artistsRouterHandler", artist, album);

        this.changeViewTo(this._artistsView);
        this._artistsView.update(artist, album);
    };

    MainView.prototype.contactRouterHandler = function () {
        console.log("contactRouterHandler", arguments);
        this.changeViewTo(this._contactView);
    };

    MainView.prototype.changeViewTo = function (view) {
        if (this._currentView) {
            this._currentView.disable();
            this.removeChild(this._currentView);
        }

        this._currentView = view;
        this.addChild(this._currentView);
        this._currentView.enable();
    };
    return MainView;
})(DOMElement);
var WebsiteApp = (function (_super) {
    __extends(WebsiteApp, _super);
    function WebsiteApp() {
        _super.call(this);
        this._router = null;
        this._pageContainer = null;
        this._navigationView = null;
        this._footerView = null;
        this._mainView = null;

        var ls = LocalStorageController.getInstance();
        var languageId = ls.getItem('language') || 'en';

        this._languageManager = LanguageManager.getInstance();
        this._languageManager.addEventListener(LoaderEvent.COMPLETE, this.init, this);
        this._languageManager.setLang(languageId);
        this._languageManager.loadConfig('data/languages/languages.json');

        this._router = new RouterController();

        this._request = new JsonRequest();
    }
    WebsiteApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };

    WebsiteApp.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        _super.prototype.enable.call(this);
    };

    WebsiteApp.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        _super.prototype.disable.call(this);
    };

    WebsiteApp.prototype.init = function (event) {
        this._pageContainer = new DOMElement("div", { id: "page" });
        this.addChild(this._pageContainer);

        this._navigationView = new NavigationView();
        this._pageContainer.addChild(this._navigationView);
        this._navigationView.enable();

        this._mainView = new MainView("div", { id: "content" }, this._router);
        this._pageContainer.addChild(this._mainView);

        this._footerView = new FooterView();
        this._pageContainer.addChild(this._footerView);
    };
    WebsiteApp.BASE_PATH = "images/";
    return WebsiteApp;
})(Stage);

var Util = (function () {
    function Util() {
    }
    Util.uniqueId = function (prefix) {
        if (typeof prefix === "undefined") { prefix = null; }
        var id = ++Util._idCounter;

        if (prefix != null) {
            return String(prefix + id);
        } else {
            return id;
        }
    };

    Util.getRandomBoolean = function () {
        return (Math.random() > .5) ? true : false;
    };
    Util.CLASS_NAME = 'Util';

    Util._idCounter = 0;
    return Util;
})();
var BaseObject = (function () {
    function BaseObject() {
        this.CLASS_NAME = 'BaseObject';
        this.isEnabled = false;
        this.cid = Util.uniqueId();
    }
    BaseObject.prototype.getQualifiedClassName = function () {
        return this.CLASS_NAME;
    };

    BaseObject.prototype.enable = function () {
        if (this.isEnabled === true)
            return this;

        this.isEnabled = true;
        return this;
    };

    BaseObject.prototype.disable = function () {
        if (this.isEnabled === false)
            return this;

        this.isEnabled = false;
        return this;
    };

    BaseObject.prototype.destroy = function () {
        this.isEnabled = false;
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
            if (listener.c === callback && listener.s === scope) {
                list.splice(i, 1);
            } else if (index === 0 && listener.pr < priority) {
                index = i + 1;
            }
        }
        list.splice(index, 0, { c: callback, s: scope, pr: priority });

        return this;
    };

    EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
        var list = this._listeners[type];
        if (list) {
            var i = list.length;
            while (--i > -1) {
                if (list[i].c === callback && list[i].s === scope) {
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

    EventDispatcher.prototype.destroy = function () {
        this.parent = null;
        this._listeners = null;

        _super.prototype.destroy.call(this);
    };
    return EventDispatcher;
})(BaseObject);
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        _super.call(this);
        this.CLASS_NAME = 'DisplayObject';
        this.isCreated = false;
        this.numChildren = 0;
        this.children = [];
    }
    DisplayObject.prototype.createChildren = function () {
        return this;
    };

    DisplayObject.prototype.addChild = function (child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this.children.unshift(child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
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

        return this;
    };

    DisplayObject.prototype.getChild = function (child) {
        var index = this.children.indexOf(child);

        return this.children[index];
    };

    DisplayObject.prototype.getChildAt = function (index) {
        return this.children[index];
    };

    DisplayObject.prototype.layoutChildren = function () {
        return this;
    };

    DisplayObject.prototype.destroy = function () {
        this.disable();
        this.children = [];
        this.numChildren = 0;

        _super.prototype.destroy.call(this);
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
            if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                var templateMethod = _.template($(templatePath).html());
                template = templateMethod(data);
            } else {
                var templateMethod = Handlebars.compile($(templatePath).html());
                template = templateMethod(data);
            }
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
    TemplateFactory.CLASS_NAME = 'TemplateFactory';

    TemplateFactory.UNDERSCORE = 'underscore';
    TemplateFactory.HANDLEBARS = 'handlebars';

    TemplateFactory.templateEngine = TemplateFactory.HANDLEBARS;
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

        return this;
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

        return this;
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

        return this;
    };

    DOMElement.prototype.removeChildren = function () {
        _super.prototype.removeChildren.call(this);

        this.$el.empty();

        return this;
    };

    DOMElement.prototype.enable = function () {
        if (this.isEnabled === true)
            return this;

        _super.prototype.enable.call(this);
        return this;
    };

    DOMElement.prototype.disable = function () {
        if (this.isEnabled === false)
            return this;

        _super.prototype.disable.call(this);
        return this;
    };

    DOMElement.prototype.layoutChildren = function () {
        return this;
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

    DOMElement.prototype.destroy = function () {
        this.el = null;
        this.$el = null;
        this._options = null;

        _super.prototype.destroy.call(this);
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
    BrowserUtils.CLASS_NAME = 'BrowserUtils';
    return BrowserUtils;
})();
var RouterController = (function (_super) {
    __extends(RouterController, _super);
    function RouterController() {
        _super.call(this);
        this.CLASS_NAME = 'RouterController';
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

    RouterController.prototype.navigate = function (hash) {
    };
    return RouterController;
})(BaseObject);
var LoaderEvent = (function (_super) {
    __extends(LoaderEvent, _super);
    function LoaderEvent(type, bubbles, cancelable, data) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof data === "undefined") { data = null; }
        _super.call(this, type, bubbles, cancelable, data);
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
        this.CLASS_NAME = 'BulkLoader';
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
        event.target.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);

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
    URLRequestMethod.CLASS_NAME = 'URLRequestMethod';

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
    URLContentType.CLASS_NAME = 'URLContentType';

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
var URLRequest = (function (_super) {
    __extends(URLRequest, _super);
    function URLRequest(url) {
        if (typeof url === "undefined") { url = null; }
        _super.call(this);
        this.CLASS_NAME = 'URLRequest';
        this.url = null;
        this.method = URLRequestMethod.GET;
        this.contentType = URLContentType.DEFAULT;
        this.data = null;
        this.url = url;
    }
    return URLRequest;
})(BaseObject);
var URLLoaderDataFormat = (function () {
    function URLLoaderDataFormat() {
    }
    URLLoaderDataFormat.CLASS_NAME = 'URLLoaderDataFormat';

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
        this.CLASS_NAME = 'URLLoader';
        this.dataFormat = URLLoaderDataFormat.TEXT;
        this.data = null;
        this.ready = false;
        this._defer = null;

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

    URLLoader.prototype.destroy = function () {
        this._defer = null;
        this.data = null;
    };
    return URLLoader;
})(EventDispatcher);
var BaseRequest = (function (_super) {
    __extends(BaseRequest, _super);
    function BaseRequest(url) {
        _super.call(this);
        this.CLASS_NAME = 'BaseRequest';
        this._path = '';
        this.data = null;
        this.complete = false;

        this._path = url;
        this.configureRequest();
    }
    BaseRequest.prototype.configureRequest = function () {
        this._request = new URLRequest(this._path);
        this._request.method = URLRequestMethod.GET;

        this._loader = new URLLoader();
        this._loader.addEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete, this);
        this._loader.dataFormat = URLLoaderDataFormat.HTML;
    };

    BaseRequest.prototype.onLoaderComplete = function (event) {
        this.complete = true;
        this.data = this._loader.data;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));

        this._loader.removeEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete, this);
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
        _super.call(this, "asdf");
        this.CLASS_NAME = 'JsonRequest';
    }
    return JsonRequest;
})(BaseRequest);
var ValueObject = (function (_super) {
    __extends(ValueObject, _super);
    function ValueObject(data) {
        if (typeof data === "undefined") { data = null; }
        _super.call(this);
        this.CLASS_NAME = 'ValueObject';

        if (data) {
            this.update(data);
        }
    }
    ValueObject.prototype.update = function (data) {
        return this;
    };

    ValueObject.prototype.toJSON = function () {
        return JSON.stringify(this.copy());
    };

    ValueObject.prototype.fromJSON = function (json) {
        var parsedData = JSON.parse(json);
        this.update(parsedData);

        return this;
    };

    ValueObject.prototype.clone = function () {
        return _.cloneDeep(this);
    };

    ValueObject.prototype.copy = function () {
        var copy = new Object();

        for (var key in this) {
            if (key !== 'isEnabled' && this.hasOwnProperty(key)) {
                copy[key] = this[key];
            }
        }

        return copy;
    };
    return ValueObject;
})(BaseObject);
var LanguageConfigVO = (function (_super) {
    __extends(LanguageConfigVO, _super);
    function LanguageConfigVO(data) {
        if (typeof data === "undefined") { data = null; }
        _super.call(this, data);
        this.CLASS_NAME = 'LanguageConfigVO';
    }
    LanguageConfigVO.prototype.update = function (data) {
        this.id = data.id;
        this.lang = data.lang;
        this.text = data.text;
        this.path = data.path;

        return this;
    };

    LanguageConfigVO.prototype.copy = function () {
        var data = _super.prototype.copy.call(this);
        return new LanguageConfigVO(data);
    };
    return LanguageConfigVO;
})(ValueObject);
var LanguageModel = (function (_super) {
    __extends(LanguageModel, _super);
    function LanguageModel() {
        _super.call(this);
        this.CLASS_NAME = 'LanguageModel';
        this._request = null;
        this._availableLanguagesDictionary = [];
        this.currentLanguage = null;
        this.data = null;
    }
    LanguageModel.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LanguageModel();
        }
        return this._instance;
    };

    LanguageModel.prototype.getLangConfigById = function (id) {
        return this._availableLanguagesDictionary[id];
    };

    LanguageModel.prototype.onConfigLoaded = function (event) {
        this._request.removeEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded, this);

        var firstLanguageId;
        var jsonData = JSON.parse(event.target.data);
        var vo;
        var len = jsonData.data.length;
        for (var i = 0; i < len; i++) {
            vo = new LanguageConfigVO(jsonData.data[i]);
            this._availableLanguagesDictionary[vo.id] = vo;

            if (!firstLanguageId) {
                firstLanguageId = vo.id;
            }
        }

        this.currentLanguage = (this.currentLanguage) ? this.currentLanguage : firstLanguageId;

        var currentLanguageVO = this.getLangConfigById(this.currentLanguage);
        this.loadLanguageData(currentLanguageVO.path);
    };

    LanguageModel.prototype.loadConfig = function (path) {
        this._request = new BaseRequest(path);
        this._request.addEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded, this);
        this._request.load();
    };

    LanguageModel.prototype.setLang = function (value) {
        this.currentLanguage = value;
    };

    LanguageModel.prototype.loadLanguageData = function (path) {
        this._request = new BaseRequest(path);
        this._request.addEventListener(LoaderEvent.COMPLETE, this.onLanguageDataLoad, this);
        this._request.load();
    };

    LanguageModel.prototype.onLanguageDataLoad = function (event) {
        this.data = JSON.parse(event.target.data);
        this._request.removeEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded, this);
        this._request = null;

        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this.data));
    };
    return LanguageModel;
})(EventDispatcher);
var LocalStorageEvent = (function (_super) {
    __extends(LocalStorageEvent, _super);
    function LocalStorageEvent(type, bubbles, cancelable, nativeEvent) {
        _super.call(this, type, bubbles, cancelable, nativeEvent);
        this.CLASS_NAME = 'LocalStorageEvent';

        if (nativeEvent) {
            this.key = nativeEvent.key;
            this.oldValue = nativeEvent.oldValue;
            this.newValue = nativeEvent.newValue;
            this.url = nativeEvent.url;
        }
    }
    LocalStorageEvent.STORAGE = 'storage';
    return LocalStorageEvent;
})(BaseEvent);
var LocalStorageController = (function (_super) {
    __extends(LocalStorageController, _super);
    function LocalStorageController() {
        _super.call(this);
        this.CLASS_NAME = 'LocalStorageController';
        this._namespace = '';

        window.addEventListener('storage', this.onLocalStorageEvent.bind(this));
    }
    LocalStorageController.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LocalStorageController();
        }
        return this._instance;
    };

    LocalStorageController.prototype.setNamespace = function (namespace) {
        this._namespace = namespace;
    };

    LocalStorageController.prototype.getNamespace = function () {
        return this._namespace;
    };

    LocalStorageController.prototype.setItem = function (key, data, useNamespace) {
        if (typeof useNamespace === "undefined") { useNamespace = false; }
        if (useNamespace) {
            key += this.getNamespace();
        }

        if (data instanceof ValueObject) {
            data = data.toJSON();
            console.log("in");
        } else {
            data = JSON.stringify(data);
            console.log("out");
        }

        localStorage.setItem(key, data);
    };

    LocalStorageController.prototype.getItem = function (key, useNamespace) {
        if (typeof useNamespace === "undefined") { useNamespace = false; }
        if (useNamespace) {
            key += this.getNamespace();
        }

        var value = localStorage.getItem(key);
        if (value) {
            value = JSON.parse(value);
        }

        return value;
    };

    LocalStorageController.prototype.removeItem = function (key, useNamespace) {
        if (typeof useNamespace === "undefined") { useNamespace = false; }
        if (useNamespace) {
            key += this.getNamespace();
        }

        localStorage.removeItem(key);
    };

    LocalStorageController.prototype.getSize = function () {
        return encodeURIComponent(JSON.stringify(localStorage)).length;
    };

    LocalStorageController.prototype.clear = function () {
        localStorage.clear();
    };

    LocalStorageController.prototype.onLocalStorageEvent = function (event) {
        this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
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

        var languageManagerData = LanguageModel.getInstance().data;
    }
    LanguageSelect.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, function (data) {
            select(option({ value: 'en' }, 'English'), option({ value: 'fr' }, 'French'), option({ value: 'sp' }, 'Spanish'));
        });

        return this;
    };

    LanguageSelect.prototype.enable = function () {
        if (this.isEnabled === true)
            return this;

        this.$el.on('change', this.onLanguageChange.bind(this));

        _super.prototype.enable.call(this);
        return this;
    };

    LanguageSelect.prototype.disable = function () {
        if (this.isEnabled === false)
            return this;

        this.$el.off('change', this.onLanguageChange.bind(this));

        _super.prototype.disable.call(this);
        return this;
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

        var languageManagerData = LanguageModel.getInstance().data;

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

        return this;
    };

    NavigationView.prototype.layoutChildren = function () {
        return this;
    };

    NavigationView.prototype.enable = function () {
        if (this.isEnabled === true)
            return this;

        _super.prototype.enable.call(this);
        return this;
    };

    NavigationView.prototype.disable = function () {
        if (this.isEnabled === false)
            return this;

        _super.prototype.disable.call(this);
        return this;
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
        _super.prototype.createChildren.call(this, 'templates/Footer.tpl');

        return this;
    };
    return FooterView;
})(DOMElement);
var HtmlLoader = (function (_super) {
    __extends(HtmlLoader, _super);
    function HtmlLoader(path) {
        _super.call(this);
        this.CLASS_NAME = 'HtmlLoader';
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

        this._urlLoader.removeEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete, this);
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
        _super.prototype.createChildren.call(this, 'templates/HomeBody.tpl', { name: "Robert" });

        return this;
    };

    HomeView.prototype.layoutChildren = function () {
        document.title = this.TITLE;
        return this;
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

        return this;
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

        return this;
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
    }
    ArtistsView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, function (data) {
            div({ id: 'bodyPan' }, h1("Artists View"), div({ id: "dynamic-container" }, "Robert is cool this is the home view"));
        });

        this._container = this.getChild("#dynamic-container");
        return this;
    };

    ArtistsView.prototype.layoutChildren = function () {
        document.title = this.TITLE;
        return this;
    };

    ArtistsView.prototype.requestData = function () {
        var request = new URLRequest();
        request.url = WebsiteApp.BASE_PATH + "data/artist-album.json";
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
        _super.prototype.createChildren.call(this, 'templates/ContactTemplate.tpl', { name: "Robert" });
        return this;
    };

    ContactView.prototype.layoutChildren = function () {
        document.title = this.TITLE;
        return this;
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
        _super.prototype.createChildren.call(this, 'templates/AboutTemplate.tpl', { name: "Robert" });

        return this;
    };

    AboutView.prototype.layoutChildren = function () {
        document.title = this.TITLE;
        return this;
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

        return this;
    };

    MainView.prototype.setupRoutes = function () {
        this._router.addRoute("", this.homeRouterHandler, this);
        this._router.addRoute("home", this.homeRouterHandler, this);
        this._router.addRoute('about/{id}', this.aboutMeRouterHandler, this);
        this._router.addRoute('artists/:name:/:album:', this.artistsRouterHandler, this);
        this._router.addRoute('contact{?query}', this.contactRouterHandler, this);
        this._router.start();
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

        this._languageManager = LanguageModel.getInstance();
        this._languageManager.addEventListener(LoaderEvent.COMPLETE, this.init, this);
        this._languageManager.setLang(languageId);
        this._languageManager.loadConfig(WebsiteApp.BASE_PATH + 'data/languages/languages.json');

        this._router = new RouterController();

        this._request = new JsonRequest();
    }
    WebsiteApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        return this;
    };

    WebsiteApp.prototype.enable = function () {
        if (this.isEnabled === true)
            return this;

        _super.prototype.enable.call(this);
        return this;
    };

    WebsiteApp.prototype.disable = function () {
        if (this.isEnabled === false)
            return this;

        _super.prototype.disable.call(this);
        return this;
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
    WebsiteApp.BASE_PATH = "prod/";
    return WebsiteApp;
})(Stage);

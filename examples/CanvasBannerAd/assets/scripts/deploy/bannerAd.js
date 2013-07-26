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
            return;

        this.isEnabled = true;
    };

    BaseObject.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this.isEnabled = false;
    };

    BaseObject.prototype.destroy = function () {
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
        this._listeners = [];

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

    DisplayObject.prototype.layoutChildren = function () {
    };

    DisplayObject.prototype.destroy = function () {
        this.disable();
        this.children = [];
        this.numChildren = 0;

        _super.prototype.destroy.call(this);
    };
    return DisplayObject;
})(EventDispatcher);
var CanvasElement = (function (_super) {
    __extends(CanvasElement, _super);
    function CanvasElement() {
        _super.call(this);
        this.CLASS_NAME = 'CanvasElement';
        this.stage = null;
        this.context = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.alpha = 1;
        this.visible = true;
        TweenLite.ticker.addEventListener("tick", this.layoutChildren.bind(this), this);
    }
    CanvasElement.prototype.createChildren = function () {
    };

    CanvasElement.prototype.render = function () {
    };

    CanvasElement.prototype.readerStart = function () {
        this.context.save();
    };

    CanvasElement.prototype.layoutChildren = function () {
        if (!this.context || this.alpha <= 0 || !this.visible)
            return;

        this.readerStart();
        this.context.globalAlpha = this.alpha;
        this.render();
        this.renderEnd();
    };

    CanvasElement.prototype.renderEnd = function () {
        this.context.restore();
    };

    CanvasElement.prototype.addChild = function (child) {
        child.parent = this;
        child.stage = this.stage;
        child.context = this.context;
        child.createChildren();

        return this;
    };

    CanvasElement.prototype.removeChild = function (child) {
        child.stage = null;
        child.context = null;

        return this;
    };
    return CanvasElement;
})(DisplayObject);
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
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas() {
        _super.call(this);
        this.CLASS_NAME = 'Canvas';
        this.element = null;

        this.stage = this;
    }
    Canvas.prototype.appendTo = function (type, enabled) {
        if (typeof enabled === "undefined") { enabled = true; }
        this.element = document.getElementById(type);
        this.context = this.element.getContext("2d");

        this.width = this.element.width;
        this.height = this.element.height;

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

    Canvas.prototype.addChild = function (child) {
        child.parent = this.stage;
        child.stage = this.stage;
        child.context = this.context;
        child.createChildren();

        return this;
    };

    Canvas.prototype.removeChild = function (child) {
        child.stage = null;
        child.context = null;

        return this;
    };

    Canvas.prototype.render = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };

    Canvas.prototype.addEventListener = function (type, callback, scope) {
    };

    Canvas.prototype.removeEventListener = function (type, callback, scope) {
    };
    return Canvas;
})(CanvasElement);
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
var NumberUtil = (function () {
    function NumberUtil() {
    }
    NumberUtil.degreesToRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };

    NumberUtil.radiansToDegrees = function (radians) {
        return radians * 180 / Math.PI;
    };

    NumberUtil.bytesToMegabytes = function (bytes) {
        return bytes / 1048576;
    };

    NumberUtil.centimeterToInch = function (cm) {
        return cm * 0.39370;
    };

    NumberUtil.inchToCentimeter = function (inch) {
        return inch * 2.54;
    };

    NumberUtil.feetToMeter = function (feet) {
        return feet / 3.2808;
    };
    NumberUtil.CLASS_NAME = 'NumberUtil';
    return NumberUtil;
})();
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap(image) {
        _super.call(this);
        this.CLASS_NAME = 'Bitmap';
        this._image = null;
        this.ready = false;

        this._image = image;
        this.width = this._image.width;
        this.height = this._image.height;
    }
    Bitmap.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };

    Bitmap.prototype.render = function () {
        this.context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
        this.context.scale(this.scaleX, this.scaleY);
        this.context.rotate(NumberUtil.degreesToRadians(this.rotation));
        this.context.translate(-this.width * 0.5, -this.height * 0.5);

        this.context.drawImage(this._image, 0, 0);
    };
    return Bitmap;
})(CanvasElement);
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
var ImageLoader = (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader(path) {
        _super.call(this);
        this.CLASS_NAME = 'ImageLoader';
        this._image = null;
        this.complete = false;

        this.src = path;

        var self = this;
        this._image = new Image();
        this._image.onload = function () {
            self.onImageLoad();
        };
    }
    ImageLoader.prototype.load = function () {
        if (this.complete)
            return;

        this._image.src = this.src;
    };

    ImageLoader.prototype.onImageLoad = function () {
        this.complete = true;
        this.data = this._image;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
    };
    return ImageLoader;
})(EventDispatcher);
var BannerAd = (function (_super) {
    __extends(BannerAd, _super);
    function BannerAd() {
        _super.call(this);
        this._cherry = null;
        this._cherryDipped = null;
        this._logo = null;
        this._boxOfCandy = null;
        this._bulkLoader = null;

        this._bulkLoader = new BulkLoader();
        this._bulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.init, this);
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "cherry.png"), "cherry");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "cherry-dipped.png"), "cherry-dipped");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "logo.png"), "logo");
        this._bulkLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "box.png"), "box");
        this._bulkLoader.load();
    }
    BannerAd.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };

    BannerAd.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        _super.prototype.enable.call(this);
    };

    BannerAd.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        _super.prototype.disable.call(this);
    };

    BannerAd.prototype.init = function (event) {
        this._bulkLoader.removeEventListener(LoaderEvent.LOAD_COMPLETE, this.init, this);

        this._cherry = new Bitmap(this._bulkLoader.getImage("cherry"));
        this._cherry.x = 83;
        this._cherry.y = 3;
        this.addChild(this._cherry);

        this._cherryDipped = new Bitmap(this._bulkLoader.getImage("cherry-dipped"));
        this._cherryDipped.x = 83;
        this._cherryDipped.y = 37;
        this._cherryDipped.visible = false;
        this.addChild(this._cherryDipped);

        this._logo = new Bitmap(this._bulkLoader.getImage("logo"));
        this._logo.x = 222;
        this._logo.y = 27;
        this.addChild(this._logo);

        this._boxOfCandy = new Bitmap(this._bulkLoader.getImage("box"));
        this._boxOfCandy.x = 598;
        this._boxOfCandy.y = 2;
        this._boxOfCandy.alpha = 0;
        this._boxOfCandy.scaleX = 0;
        this._boxOfCandy.scaleY = 0;
        this.addChild(this._boxOfCandy);

        TweenLite.to(this._boxOfCandy, 1, { delay: 0.5, alpha: 1, scaleX: 1, scaleY: 1, ease: Cubic.easeOut });
        TweenLite.to(this._cherry, 0.5, { delay: 1, y: 37, ease: Cubic.easeOut, onComplete: this.onCherryComplete.bind(this) });
    };

    BannerAd.prototype.onCherryComplete = function () {
        this._cherryDipped.visible = true;
        this.removeChild(this._cherry);

        TweenLite.to(this._cherryDipped, 0.5, { y: 3, ease: Cubic.easeInOut, onComplete: this.onCherryDippedComplete.bind(this) });
    };

    BannerAd.prototype.onCherryDippedComplete = function () {
        TweenLite.to(this._logo, 1, { rotation: 720, scaleX: 0.5, scaleY: 0.5, ease: Bounce.easeOut });
    };
    BannerAd.BASE_PATH = "assets/images/";
    return BannerAd;
})(Canvas);

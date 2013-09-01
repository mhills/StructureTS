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

    Util.deletePropertyFromObject = function (object, list) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                var value = object[key];

                if (value instanceof Array) {
                    var array = value;
                    for (var index in array) {
                        Util.deletePropertyFromObject(array[index], list);
                    }
                } else {
                    for (var listIndex in list) {
                        if (key === list[listIndex]) {
                            delete value;
                        }
                    }
                }
            }
        }

        return object;
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
        this.cid = null;
        this.cid = Util.uniqueId();
    }
    BaseObject.prototype.getQualifiedClassName = function () {
        return this.CLASS_NAME;
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
var CollectiveObject = (function (_super) {
    __extends(CollectiveObject, _super);
    function CollectiveObject() {
        _super.call(this);
        this.CLASS_NAME = 'CollectiveObject';
        this.isEnabled = false;
    }
    CollectiveObject.prototype.enable = function () {
        if (this.isEnabled === true)
            return this;

        this.isEnabled = true;
        return this;
    };

    CollectiveObject.prototype.disable = function () {
        if (this.isEnabled === false)
            return this;

        this.isEnabled = false;
        return this;
    };

    CollectiveObject.prototype.destroy = function () {
        _super.prototype.destroy.call(this);

        this.disable();
        this.isEnabled = false;
    };
    return CollectiveObject;
})(BaseObject);
var BaseEvent = (function () {
    function BaseEvent(type, bubbles, cancelable, data) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof data === "undefined") { data = null; }
        this.CLASS_NAME = 'BaseEvent';
        this.type = null;
        this.target = null;
        this.currentTarget = null;
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
})();
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

        event.currentTarget = this;

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
        _super.prototype.destroy.call(this);

        this.parent = null;
        this._listeners = null;
    };
    return EventDispatcher;
})(CollectiveObject);
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.call(this);
        this.CLASS_NAME = 'DisplayObjectContainer';
        this.isCreated = false;
        this.numChildren = 0;
        this.children = [];
        this.unscaledWidth = 100;
        this.unscaledHeight = 100;
    }
    DisplayObjectContainer.prototype.createChildren = function () {
        return this;
    };

    DisplayObjectContainer.prototype.addChild = function (child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this.children.push(child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
    };

    DisplayObjectContainer.prototype.addChildAt = function (child, index) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this.children.splice(index, 0, child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
    };

    DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
        return this;
    };

    DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
        if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
        }

        var child1 = this.getChildAt(index1);
        var child2 = this.getChildAt(index2);

        this.swapChildren(child1, child2);

        return this;
    };

    DisplayObjectContainer.prototype.getChildIndex = function (child) {
        return this.children.indexOf(child);
    };

    DisplayObjectContainer.prototype.removeChild = function (child) {
        var index = this.getChildIndex(child);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        child.disable();
        child.parent = null;

        this.numChildren = this.children.length;

        return this;
    };

    DisplayObjectContainer.prototype.removeChildren = function () {
        while (this.children.length > 0) {
            this.removeChild(this.children.pop());
        }

        this.numChildren = this.children.length;

        return this;
    };

    DisplayObjectContainer.prototype.getChildAt = function (index) {
        return this.children[index];
    };

    DisplayObjectContainer.prototype.setSize = function (unscaledWidth, unscaledHeight) {
        this.unscaledWidth = unscaledWidth;
        this.unscaledHeight = unscaledHeight;
        if (this.isCreated) {
            this.layoutChildren();
        }

        return this;
    };

    DisplayObjectContainer.prototype.layoutChildren = function () {
        return this;
    };

    DisplayObjectContainer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);

        this.children = [];
        this.numChildren = 0;
    };
    return DisplayObjectContainer;
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
        return this;
    };

    CanvasElement.prototype.render = function () {
        return this;
    };

    CanvasElement.prototype.readerStart = function () {
        this.context.save();
        return this;
    };

    CanvasElement.prototype.layoutChildren = function () {
        if (!this.context || this.alpha <= 0 || !this.visible)
            return this;

        this.readerStart();
        this.context.globalAlpha = this.alpha;
        this.render();
        this.renderEnd();

        return this;
    };

    CanvasElement.prototype.renderEnd = function () {
        this.context.restore();
        return this;
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
})(DisplayObjectContainer);
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.stringToBoolean = function (str) {
        return (str.toLowerCase() == "true" || str.toLowerCase() == "1");
    };

    StringUtil.getExtension = function (filename) {
        return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
    };

    StringUtil.hyphenToCamelCase = function (str) {
        return str.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase();
        });
    };

    StringUtil.hyphenToPascalCase = function (str) {
        return str.replace(/(\-|^)([a-z])/gi, function (match, delimiter, hyphenated) {
            return hyphenated.toUpperCase();
        });
    };

    StringUtil.camelCaseToHyphen = function (str) {
        return str.replace(/([a-z][A-Z])/g, function (g) {
            return g[0] + '-' + g[1].toLowerCase();
        });
    };

    StringUtil.createUUID = function () {
        var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = (c == 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return uuid;
    };

    StringUtil.queryStringToObject = function (queryString) {
        var params = {};
        var temp = null;

        var queries = queryString.substring(1).split("&");

        var len = queries.length;
        for (var i = 0; i < len; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    };

    StringUtil.removeAllWhitespace = function (str) {
        return str.replace(/\s+/g, '');
    };

    StringUtil.removeLeadingTrailingWhitespace = function (str) {
        return str.replace(/(^\s+|\s+$)/g, '');
    };
    StringUtil.CLASS_NAME = 'StringUtil';
    return StringUtil;
})();
var TemplateFactory = (function () {
    function TemplateFactory() {
    }
    TemplateFactory.createTemplate = function (templatePath, data) {
        return TemplateFactory.create(templatePath, data);
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
            var htmlString = $(templatePath).html();
            htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);

            if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                var templateMethod = _.template(htmlString);
                template = templateMethod(data);
            } else {
                var templateMethod = Handlebars.compile(htmlString);
                template = templateMethod(data);
            }
        } else {
            var templateObj = window[TemplateFactory.templateNamespace];
            if (!templateObj) {
                return template;
            }

            var templateFunction = templateObj[templatePath];
            if (!templateFunction) {
                template = null;
            } else {
                template = templateFunction(data);
            }
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
        if (typeof type === "undefined") { type = null; }
        if (typeof params === "undefined") { params = null; }
        _super.call(this);
        this.CLASS_NAME = 'DOMElement';
        this._isVisible = true;
        this.el = null;
        this.$el = null;
        this._type = null;
        this._params = null;

        if (type) {
            this._type = type;
            this._params = params;
        }
    }
    DOMElement.prototype.createChildren = function (type, params) {
        if (typeof type === "undefined") { type = 'div'; }
        if (typeof params === "undefined") { params = null; }
        type = this._type || type;
        params = this._params || params;

        if (typeof type === 'function' && !this.$el) {
            Jaml.register(this.CLASS_NAME, type);
            this.$el = jQuery(Jaml.render(this.CLASS_NAME, params));
        } else if (typeof type === 'string' && !this.$el) {
            var html = TemplateFactory.createTemplate(type, params);
            if (html) {
                this.$el = $(html);
            } else {
                this.$el = jQuery("<" + type + "/>", params);
            }
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

        child.$el.attr('data-cid', child.cid);

        this.$el.append(child.$el);

        child.layoutChildren();

        child.dispatchEvent(new BaseEvent(BaseEvent.ADDED));

        return this;
    };

    DOMElement.prototype.addChildAt = function (child, index) {
        var children = this.$el.children();
        var length = children.length - 1;

        if (index < 0 || index >= length) {
            this.addChild(child);
        } else {
            if (!child.isCreated) {
                child.createChildren();
                child.isCreated = true;
            }
            child.layoutChildren();

            _super.prototype.addChildAt.call(this, child, index);

            jQuery(children.get(index)).before(child.$el);
        }

        return this;
    };

    DOMElement.prototype.swapChildren = function (child1, child2) {
        var child1Index = child1.$el.index();
        var child2Index = child2.$el.index();

        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);

        return this;
    };

    DOMElement.prototype.getChildAt = function (index) {
        return _super.prototype.getChildAt.call(this, index);
    };

    DOMElement.prototype.getChildByCid = function (cid) {
        var domElement = _.find(this.children, function (child) {
            return child.cid == cid;
        });

        return domElement || null;
    };

    DOMElement.prototype.getChild = function (selector) {
        var jQueryElement = this.$el.find(selector).first();
        if (jQueryElement.length == 0) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $el');
        }

        var cid = jQueryElement.data('cid');
        var domElement = _.find(this.children, function (domElement) {
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

        return domElement;
    };

    DOMElement.prototype.getChildren = function (selector) {
        if (typeof selector === "undefined") { selector = ''; }
        var _this = this;
        var $child;
        var domElement;
        var $list = this.$el.children(selector);

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
        _super.prototype.destroy.call(this);

        this.$el = null;
        this.el = null;
    };
    return DOMElement;
})(DisplayObjectContainer);
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
        }

        return this;
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

        return this;
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
        this.$el.attr('data-cid', this.cid);

        if (!this.isCreated) {
            this.createChildren();
            this.isCreated = true;
            this.layoutChildren();
        }

        if (enabled) {
            this.enable();
        }

        return this;
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

        return this;
    };

    Bitmap.prototype.render = function () {
        this.context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
        this.context.scale(this.scaleX, this.scaleY);
        this.context.rotate(NumberUtil.degreesToRadians(this.rotation));
        this.context.translate(-this.width * 0.5, -this.height * 0.5);

        this.context.drawImage(this._image, 0, 0);

        return this;
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
        return this;
    };

    BulkLoader.prototype.getFile = function (key) {
        return this._dataStores[key];
    };

    BulkLoader.prototype.getImage = function (key) {
        return this._dataStores[key].data;
    };

    BulkLoader.prototype.getHtmlTemplate = function (key, templateId) {
        console.log(this.getQualifiedClassName(), 'TODO: check if you need to change this to user the TemplateFactory');
        var rawHtml = jQuery(this._dataStores[key].data).filter("#" + templateId).html();
        return rawHtml;
    };

    BulkLoader.prototype.load = function () {
        for (var key in this._dataStores) {
            var dataStore = this._dataStores[key];
            dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
            dataStore.load();
        }

        return this;
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
        TweenLite.to(this._cherry, 0.5, { delay: 1, y: 37, ease: Cubic.easeOut, onComplete: this.onCherryComplete, onCompleteScope: this });
    };

    BannerAd.prototype.onCherryComplete = function () {
        this._cherryDipped.visible = true;
        this.removeChild(this._cherry);

        TweenLite.to(this._cherryDipped, 0.5, { y: 3, ease: Cubic.easeInOut, onComplete: this.onCherryDippedComplete, onCompleteScope: this });
    };

    BannerAd.prototype.onCherryDippedComplete = function () {
        TweenLite.to(this._logo, 1, { rotation: 720, scaleX: 0.5, scaleY: 0.5, ease: Bounce.easeOut });
    };
    BannerAd.BASE_PATH = "assets/images/";
    return BannerAd;
})(Canvas);

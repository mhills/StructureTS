(function ($, window, document) {
    $.fn.addEventListener = function (type, selector, data, callback, scope) {
        var _callback;
        var _scope;
        switch (arguments.length) {
            case 3:
                _callback = selector;
                _scope = data;
                this.on(type, $.proxy(_callback, _scope));
                break;
            case 4:
                _callback = data;
                _scope = callback;
                this.on(type, selector, $.proxy(_callback, _scope));
                break;
            case 5:
                this.on(type, selector, data, $.proxy(callback, scope));
                break;
            default:
                throw new Error('jQuery addEventListener plugin requires at least 3 arguments.');
        }
        return this;
    };

    $.fn.removeEventListener = function (type, selector, callback, scope) {
        switch (arguments.length) {
            case 3:
                var _callback = selector;
                var _scope = callback;
                this.off(type, $.proxy(_callback, _scope));
                break;
            case 4:
                this.off(type, selector, $.proxy(callback, scope));
                break;
            default:
                throw new Error('jQuery removeEventListener plugin requires at least 3 arguments.');
        }
        return this;
    };
})(jQuery, window, document);
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventDispatcher = (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        _super.call(this);
        this.CLASS_NAME = 'EventDispatcher';
        this._listeners = null;
        this.parent = null;
        this.isEnabled = false;

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

        this.disable();
        this.isEnabled = false;

        this.parent = null;
        this._listeners = null;
    };

    EventDispatcher.prototype.enable = function () {
        if (this.isEnabled === true)
            return this;

        this.isEnabled = true;
        return this;
    };

    EventDispatcher.prototype.disable = function () {
        if (this.isEnabled === false)
            return this;

        this.isEnabled = false;
        return this;
    };
    return EventDispatcher;
})(BaseObject);
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

    StringUtil.truncate = function (text, length) {
        if (text.length <= length) {
            return text;
        } else {
            return text.substr(0, length) + "...";
        }
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
        view.$element = jQuery(template);
        return view;
    };

    TemplateFactory.create = function (templatePath, data) {
        if (typeof data === "undefined") { data = null; }
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
        this.element = null;
        this.$element = null;
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

        if (typeof type === 'function' && !this.$element) {
            Jaml.register(this.CLASS_NAME, type);
            this.$element = jQuery(Jaml.render(this.CLASS_NAME, params));
        } else if (typeof type === 'string' && !this.$element) {
            var html = TemplateFactory.createTemplate(type, params);
            if (html) {
                this.$element = $(html);
            } else {
                this.$element = jQuery("<" + type + "/>", params);
            }
        }

        this.element = this.$element[0];

        return this;
    };

    DOMElement.prototype.addChild = function (child) {
        _super.prototype.addChild.call(this, child);

        if (!child.isCreated) {
            child.createChildren();
            child.isCreated = true;
        }

        child.$element.attr('data-cid', child.cid);

        child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
        this.$element.append(child.$element);

        child.layoutChildren();

        return this;
    };

    DOMElement.prototype.onAddedToDom = function (event) {
        var child = event.data;
        child.$element.removeEventListener('DOMNodeInsertedIntoDocument', this.onAddedToDom, this);
        child.layoutChildren();
        child.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
    };

    DOMElement.prototype.addChildAt = function (child, index) {
        var children = this.$element.children();
        var length = children.length - 1;

        if (index < 0 || index >= length) {
            this.addChild(child);
        } else {
            if (!child.isCreated) {
                child.createChildren();
                child.isCreated = true;
            }
            child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
            child.layoutChildren();

            _super.prototype.addChildAt.call(this, child, index);

            jQuery(children.get(index)).before(child.$element);
        }

        return this;
    };

    DOMElement.prototype.swapChildren = function (child1, child2) {
        var child1Index = child1.$element.index();
        var child2Index = child2.$element.index();

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
        var jQueryElement = this.$element.find(selector).first();
        if (jQueryElement.length == 0) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
        }

        var cid = jQueryElement.data('cid');
        var domElement = _.find(this.children, function (domElement) {
            return domElement.cid == cid;
        });

        if (!domElement) {
            domElement = new DOMElement();
            domElement.$element = jQueryElement;
            domElement.$element.attr('data-cid', domElement.cid);
            domElement.element = jQueryElement[0];
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
        var $list = this.$element.children(selector);

        _.each($list, function (item, index) {
            $child = jQuery(item);

            if (!$child.data('cid')) {
                domElement = new DOMElement();
                domElement.$element = $child;
                domElement.$element.attr('data-cid', domElement.cid);
                domElement.element = item;
                domElement.isCreated = true;

                _super.prototype.addChild.call(_this, domElement);
            }
        });

        return this.children;
    };

    DOMElement.prototype.removeChild = function (child) {
        child.$element.unbind();
        child.$element.remove();

        _super.prototype.removeChild.call(this, child);

        return this;
    };

    DOMElement.prototype.removeChildren = function () {
        _super.prototype.removeChildren.call(this);

        this.$element.empty();

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
        this.$element.css('opacity', number);
        return this;
    };

    DOMElement.prototype.visible = function (value) {
        if (value == false) {
            this._isVisible = false;
            this.$element.hide();
        } else if (value == true) {
            this._isVisible = true;
            this.$element.show();
        } else if (value == undefined) {
            return this._isVisible;
        }
        return this;
    };

    DOMElement.prototype.destroy = function () {
        _super.prototype.destroy.call(this);

        this.$element = null;
        this.element = null;
    };
    return DOMElement;
})(DisplayObjectContainer);
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        _super.call(this);
        this.CLASS_NAME = 'Stage';
    }
    Stage.prototype.appendTo = function (type, enabled) {
        if (typeof enabled === "undefined") { enabled = true; }
        this.$element = jQuery(type);
        this.$element.attr('data-cid', this.cid);

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
var MouseEvents = (function () {
    function MouseEvents() {
    }
    MouseEvents.CLICK = 'click';

    MouseEvents.DBL_CLICK = 'dblclick';

    MouseEvents.MOUSE_DOWN = 'mousedown';

    MouseEvents.MOUSE_MOVE = 'mousemove';

    MouseEvents.MOUSE_OVER = 'mouseover';

    MouseEvents.MOUSE_OUT = 'mouseout';

    MouseEvents.MOUSE_UP = 'mouseup';

    MouseEvents.TAP = 'tap';
    return MouseEvents;
})();
var EventBroker = (function () {
    function EventBroker() {
        throw new Error('[EventBroker] Do instantiation the EventBroker class because it is a static class.');
    }
    EventBroker.addEventListener = function (type, callback, scope, priority) {
        if (typeof priority === "undefined") { priority = 0; }
        EventBroker._eventDispatcher.addEventListener(type, callback, scope, priority);
    };

    EventBroker.removeEventListener = function (type, callback, scope) {
        EventBroker._eventDispatcher.removeEventListener(type, callback, scope);
    };

    EventBroker.dispatchEvent = function (event) {
        EventBroker._eventDispatcher.dispatchEvent(event);
    };
    EventBroker.CLASS_NAME = 'EventBroker';

    EventBroker._eventDispatcher = new EventDispatcher();
    return EventBroker;
})();
var ListItemEvent = (function (_super) {
    __extends(ListItemEvent, _super);
    function ListItemEvent(type, bubbles, cancelable, data) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof data === "undefined") { data = null; }
        _super.call(this, type, bubbles, cancelable, data);
        this.CLASS_NAME = 'ListItemEvent';
    }
    ListItemEvent.LIST_SUCCESS = "ListItemEvent.listSuccess";
    ListItemEvent.ADD_SUCCESS = "ListItemEvent.addSuccess";
    ListItemEvent.REMOVE_SUCCESS = "ListItemEvent.removeSuccess";
    return ListItemEvent;
})(BaseEvent);
var RequestEvent = (function (_super) {
    __extends(RequestEvent, _super);
    function RequestEvent(type, bubbles, cancelable, data) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof data === "undefined") { data = null; }
        _super.call(this, type, bubbles, cancelable, data);
        this.CLASS_NAME = 'RequestEvent';
    }
    RequestEvent.SUCCESS = "RequestEvent.success";

    RequestEvent.ERROR = "RequestEvent.error";
    return RequestEvent;
})(BaseEvent);
var ValueObject = (function (_super) {
    __extends(ValueObject, _super);
    function ValueObject() {
        _super.call(this);
        this.CLASS_NAME = 'ValueObject';
    }
    ValueObject.prototype.update = function (data) {
        return this;
    };

    ValueObject.prototype.toJSON = function () {
        var clone = this.clone();
        return Util.deletePropertyFromObject(clone, ['cid']);
    };

    ValueObject.prototype.toJSONString = function () {
        return JSON.stringify(this.toJSON());
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
            if (this.hasOwnProperty(key)) {
                copy[key] = this[key];
            }
        }

        return copy;
    };
    return ValueObject;
})(BaseObject);
var ListItemVO = (function (_super) {
    __extends(ListItemVO, _super);
    function ListItemVO() {
        _super.call(this);
        this.CLASS_NAME = 'ListItemVO';
        this.isComplete = false;
    }
    return ListItemVO;
})(ValueObject);
var AppModel = (function (_super) {
    __extends(AppModel, _super);
    function AppModel() {
        _super.call(this);
        this.CLASS_NAME = 'AppModel';
        this.APP_ID = '5tfOk1NPi4KxQwWDbGdaw0eY0GFKAnrp3upTzRo8';
        this.REST_KEY = 'Tz2OgC9TZTEgGvMQhtk7IHQT6c46mBuCbF545Dgn';
        this.JS_KEY = 'NM7u0mZxJbr41J9SrX3qGQA45BNmAnhMqLyw9UsR';
        this.LIST_ITEM = 'ListItem';

        Parse.initialize(this.APP_ID, this.JS_KEY);
    }
    AppModel.prototype.getListItems = function () {
        this._query = new Parse.Query(this.LIST_ITEM);
        this._query.equalTo('isComplete', false);
        this._query.limit(10);
        this._query.descending('createdAt');
        this._query.find({
            success: this.onQuerySuccess.bind(this),
            error: this.onParseError.bind(this)
        });
    };

    AppModel.prototype.addListItem = function (text) {
        var ParseListItem = Parse.Object.extend("ListItem");
        var item = new ParseListItem();
        item.set('content', text);
        item.set('isComplete', false);
        item.save(null, {
            success: this.onItemAddSuccess.bind(this),
            error: this.onParseError.bind(this)
        });
    };

    AppModel.prototype.markItemComplete = function (id) {
        if (id == '') {
            throw new Error('[AppModel] The markItemComplete argument can not be an empty string.');
        }

        this._query = new Parse.Query(this.LIST_ITEM);
        this._query.get(id, {
            success: this.onGetSuccess.bind(this),
            error: this.onParseError.bind(this)
        });
    };

    AppModel.prototype.onGetSuccess = function (item) {
        item.set('isComplete', true);
        item.save();

        var listItemVO = new ListItemVO();
        listItemVO.id = item.id;
        listItemVO.content = item.get('content');
        listItemVO.isComplete = item.get('isComplete');

        this.dispatchEvent(new ListItemEvent(ListItemEvent.REMOVE_SUCCESS, false, false, listItemVO));
    };

    AppModel.prototype.onItemAddSuccess = function (item) {
        var listItemVO = new ListItemVO();
        listItemVO.id = item.id;
        listItemVO.content = item.get('content');
        listItemVO.isComplete = item.get('isComplete');

        this.dispatchEvent(new ListItemEvent(ListItemEvent.ADD_SUCCESS, false, false, listItemVO));
    };

    AppModel.prototype.onQuerySuccess = function (results) {
        var listItem;
        var list = [];

        _.each(results, function (item) {
            listItem = new ListItemVO();
            listItem.id = item.id;
            listItem.content = item.get('content');
            listItem.isComplete = item.get('isComplete');

            list.push(listItem);
        });

        this.dispatchEvent(new ListItemEvent(ListItemEvent.LIST_SUCCESS, false, false, list));
        this._query = null;
    };

    AppModel.prototype.onParseError = function (error) {
        alert('onParseError: ' + error.code + ' ' + error.message);
    };
    return AppModel;
})(EventDispatcher);
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp() {
        _super.call(this);
    }
    TodoApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._appModel = new AppModel();

        this._input = this.getChild('#js-todo-input');
        this._submitBtn = this.getChild('#js-submit-button');
        this._noTasksMessage = TemplateFactory.createView('#noTodoItemsTemplate');

        this._incompleteItemList = this.getChild('#js-incomplete-items');
        this._incompleteItemList.addChild(this._noTasksMessage);

        this.updateItemList();
    };

    TodoApp.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        this._submitBtn.$element.addEventListener(MouseEvents.CLICK, this.onSubmitButton, this);
        this._incompleteItemList.$element.addEventListener(MouseEvents.CLICK, '.list-item', this.onTodoSelected, this);

        this._appModel.addEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved, this);
        this._appModel.addEventListener(ListItemEvent.ADD_SUCCESS, this.onAddItemSuccess, this);
        this._appModel.addEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess, this);

        _super.prototype.enable.call(this);
    };

    TodoApp.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this._submitBtn.$element.removeEventListener(MouseEvents.CLICK, this.onSubmitButton, this);
        this._incompleteItemList.$element.removeEventListener(MouseEvents.CLICK, '.list-item', this.onTodoSelected, this);

        this._appModel.removeEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved, this);
        this._appModel.removeEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess, this);

        _super.prototype.disable.call(this);
    };

    TodoApp.prototype.onSubmitButton = function (event) {
        var text = this._input.$element.val();

        this._appModel.addListItem(text);
    };

    TodoApp.prototype.onTodoSelected = function (event) {
        var $element = $(event.currentTarget);

        var cid = $element.data('cid');
        var domElement = this._incompleteItemList.getChildByCid(cid);
        var id = domElement.$element.children('input').data('id');

        this._appModel.markItemComplete(id);
        this._incompleteItemList.removeChild(domElement);
    };

    TodoApp.prototype.onRemoveItemSuccess = function (event) {
        if (this._incompleteItemList.numChildren <= 0) {
            this._incompleteItemList.addChild(this._noTasksMessage);
        }
    };

    TodoApp.prototype.onAddItemSuccess = function (event) {
        this._input.$element.val('').focus();

        this.updateItemList();
    };

    TodoApp.prototype.updateItemList = function () {
        this._appModel.getListItems();
    };

    TodoApp.prototype.onListRecieved = function (event) {
        var listItems = event.data;

        if (listItems.length > 0) {
            this._incompleteItemList.removeChildren();
        }

        _.each(listItems, function (item) {
            var view = TemplateFactory.createView('#todoItemsTemplate', {
                id: item.id,
                content: item.content,
                isComplete: item.isComplete
            });

            this._incompleteItemList.addChild(view);
        }.bind(this));
    };
    return TodoApp;
})(Stage);

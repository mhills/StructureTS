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
                            delete object[key];
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
var TodoItemVO = (function (_super) {
    __extends(TodoItemVO, _super);
    function TodoItemVO(data) {
        if (typeof data === "undefined") { data = null; }
        _super.call(this);
        this.CLASS_NAME = 'TodoItemVO';
        this.id = null;
        this.completed = false;
        this.text = null;

        if (data) {
            this.update(data);
        }
    }
    TodoItemVO.prototype.update = function (data) {
        this.id = data.id;
        this.completed = data.completed;
        this.text = data.text;
    };

    TodoItemVO.prototype.copy = function () {
        var data = _super.prototype.copy.call(this);
        return new TodoItemVO(data);
    };
    return TodoItemVO;
})(ValueObject);
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        _super.call(this);
        this.CLASS_NAME = 'Collection';
        this.items = [];
        this.length = 0;
    }
    Collection.prototype.addItem = function (item, silent) {
        if (typeof silent === "undefined") { silent = false; }
        if (!(item instanceof ValueObject)) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] Item must be of the IValueObject type');
        }

        if (!this.hasItem(item)) {
            this.items.push(item);
            this.length = this.items.length;
        }

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        }
    };

    Collection.prototype.removeItem = function (item, silent) {
        if (typeof silent === "undefined") { silent = false; }
        if (!(item instanceof ValueObject)) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] Item must be of the IValueObject type');
        }

        if (!this.hasItem(item)) {
            throw new Error('[' + this.getQualifiedClassName() + '] Collection does not have item ' + item);
        }

        this.items.splice(this.items.indexOf(item), 1);
        this.length = this.items.length;

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
        }
    };

    Collection.prototype.removeItems = function (items, silent) {
        if (typeof silent === "undefined") { silent = false; }
        var len = items.length;
        for (var i = 0; i < len; i++) {
            this.removeItem(items[i]);
        }

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
        }
    };

    Collection.prototype.hasItem = function (items) {
        return !this.items.indexOf(items);
    };

    Collection.prototype.indexOf = function (items) {
        return this.items.indexOf(items);
    };

    Collection.prototype.addItems = function (items, silent) {
        if (typeof silent === "undefined") { silent = false; }
        var len = items.length;
        for (var i = 0; i < len; i++) {
            this.addItem(items[i]);
        }

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        }
    };

    Collection.prototype.getItemByIndex = function (index) {
        if (index < 0) {
            index = 0;
        }

        if (index >= this.items.length) {
            index = this.items.length - 1;
        }

        return this.items[index] || null;
    };

    Collection.prototype.forEach = function (operation) {
    };

    Collection.prototype.find = function (arg) {
        arg = (arg instanceof Array) ? arg : [arg];

        var foundItems = [];
        var len = arg.length;
        var prop;
        for (var i = 0; i < len; i++) {
            prop = arg[i];

            if ((typeof prop === 'string') || (typeof prop === 'number') || (typeof prop === 'boolean')) {
                foundItems = foundItems.concat(this.findPropertyValue(prop));
            } else {
                foundItems = foundItems.concat(_.where(this.items, prop));
            }
        }

        return _.uniq(foundItems);
    };

    Collection.prototype.findPropertyValue = function (arg) {
        arg = (arg instanceof Array) ? arg : [arg];

        var foundItems = [];
        var itemsLength = this.items.length;
        var itemsToFindLength = arg.length;

        for (var i = 0; i < itemsLength; i++) {
            var valueObject = this.items[i];

            for (var key in valueObject) {
                if (valueObject.hasOwnProperty(key)) {
                    var propertyValue = valueObject[key];

                    for (var j = 0; j < itemsToFindLength; j++) {
                        var value = arg[j];

                        if (propertyValue === value) {
                            foundItems.push(valueObject);
                            break;
                        }
                    }
                }
            }
        }
        return foundItems;
    };

    Collection.prototype.sort = function (sort) {
    };

    Collection.prototype.filter = function (filter, removeItems) {
        if (typeof removeItems === "undefined") { removeItems = false; }
        if (removeItems) {
        } else {
        }
        return null;
    };

    Collection.prototype.map = function (map) {
    };

    Collection.prototype.copy = function () {
        var collection = new Collection();
        collection.addItems(this.items.slice(0));
        return collection;
    };

    Collection.prototype.clear = function (silent) {
        if (typeof silent === "undefined") { silent = false; }
        this.items = [];
        this.length = 0;

        if (!silent) {
            this.dispatchEvent(new BaseEvent(BaseEvent.CLEAR));
        }
    };

    Collection.prototype.destroy = function () {
        _super.prototype.destroy.call(this);

        this.items = null;
        this.length = null;
    };
    return Collection;
})(EventDispatcher);
var BaseController = (function (_super) {
    __extends(BaseController, _super);
    function BaseController() {
        _super.call(this);
        this.CLASS_NAME = 'BaseController';
    }
    return BaseController;
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
        this._namespace = 'defaultNamespace';
        this._localStorage = null;

        this._localStorage = window.localStorage;

        window.addEventListener('storage', this.onLocalStorageEvent.bind(this));
    }
    LocalStorageController.prototype.setNamespace = function (namespace) {
        this._namespace = namespace;
    };

    LocalStorageController.prototype.getNamespace = function () {
        return this._namespace;
    };

    LocalStorageController.prototype.addItem = function (key, data, useNamespace) {
        if (typeof useNamespace === "undefined") { useNamespace = false; }
        if (useNamespace) {
            key = this.getNamespace() + key;
        }

        if (data instanceof ValueObject) {
            data = data.toJSON();
        }

        data = JSON.stringify(data);

        this._localStorage.setItem(key, data);
    };

    LocalStorageController.prototype.getItem = function (key, useNamespace) {
        if (typeof useNamespace === "undefined") { useNamespace = false; }
        if (useNamespace) {
            key = this.getNamespace() + key;
        }

        var value = this._localStorage.getItem(key);
        if (value) {
            try  {
                value = JSON.parse(value);
            } catch (error) {
                value = value;
            }
        }

        return value;
    };

    LocalStorageController.prototype.getItemsWithNamespace = function (namespace) {
        if (typeof namespace === "undefined") { namespace = this._namespace; }
        var list = [];
        var length = this.getLength();
        for (var i = 0; i < length; i++) {
            var key = this._localStorage.key(i);
            if (key.indexOf(namespace) > -1) {
                var value = this.getItem(key);
                var obj = {
                    key: key,
                    value: value
                };

                list.push(obj);
            }
        }
        return list;
    };

    LocalStorageController.prototype.getAllItems = function () {
        var list = [];
        var length = this.getLength();
        for (var i = 0; i < length; i++) {
            var key = this._localStorage.key(i);
            var value = this.getItem(key);
            var obj = {
                key: key,
                value: value
            };

            list.push(obj);
        }
        return list;
    };

    LocalStorageController.prototype.removeItem = function (key, useNamespace) {
        if (typeof useNamespace === "undefined") { useNamespace = false; }
        if (useNamespace) {
            key = this.getNamespace() + key;
        }

        this._localStorage.removeItem(key);
    };

    LocalStorageController.prototype.getLength = function () {
        return this._localStorage.length;
    };

    LocalStorageController.prototype.getSize = function () {
        return encodeURIComponent(JSON.stringify(this._localStorage)).length;
    };

    LocalStorageController.prototype.clear = function () {
        this._localStorage.clear();
    };

    LocalStorageController.prototype.destroy = function () {
        _super.prototype.destroy.call(this);

        this._localStorage = null;
    };

    LocalStorageController.prototype.onLocalStorageEvent = function (event) {
        this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
    };
    return LocalStorageController;
})(BaseController);
var TodoCollection = (function (_super) {
    __extends(TodoCollection, _super);
    function TodoCollection() {
        _super.call(this);
        this.CLASS_NAME = 'TodoCollection';
        this._localStorage = null;

        var vo = new TodoItemVO();
        var namespace = vo.getQualifiedClassName() + ".";

        this._localStorage = new LocalStorageController();
        this._localStorage.setNamespace(namespace);

        this.getItemsFromLocalStorage();
    }
    TodoCollection.prototype.addItem = function (item, silent) {
        if (typeof silent === "undefined") { silent = false; }
        _super.prototype.addItem.call(this, item, silent);

        this._localStorage.addItem(item.id, item, true);
    };

    TodoCollection.prototype.removeCompletedItems = function () {
    };

    TodoCollection.prototype.getItemsFromLocalStorage = function () {
        var items = this._localStorage.getItemsWithNamespace();
        var itemsLength = items.length;
        var todoItemVO;

        for (var i = 0; i < itemsLength; i++) {
            todoItemVO = new TodoItemVO(items[i].value);
            _super.prototype.addItem.call(this, todoItemVO, true);
        }
    };
    return TodoCollection;
})(Collection);
var ZombieApp = (function (_super) {
    __extends(ZombieApp, _super);
    function ZombieApp() {
        _super.call(this);
        this.CLASS_NAME = 'ZombieApp';
        this._$todoButton = null;
        this._$removeTasksButton = null;
        this._todoContainer = null;
        this._todoCollection = null;
    }
    ZombieApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._todoCollection = new TodoCollection();

        var backgroundAndButtons = new DOMElement('templates/MainTemplate.hbs');
        this.addChild(backgroundAndButtons);

        this._$todoButton = this.$element.find('#js-addTodoButton');
        this._$removeTasksButton = this.$element.find('#js-removeTasksButton');

        this._todoContainer = this.getChild('#js-todoContainer');

        for (var i = 0; i < this._todoCollection.length; i++) {
            var vo = this._todoCollection.getItemByIndex(i);
            this.addTodoView(vo);
        }
    };

    ZombieApp.prototype.layoutChildren = function () {
    };

    ZombieApp.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        this._$todoButton.addEventListener('click', this.addTodoHandler, this);
        this._$removeTasksButton.addEventListener('click', this.removeTasksHandler, this);

        this._todoContainer.$element.addEventListener('click', 'input', this.todoItemHandler, this);

        _super.prototype.enable.call(this);
    };

    ZombieApp.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this._$todoButton.removeEventListener('click', this.addTodoHandler, this);
        this._$removeTasksButton.removeEventListener('click', this.removeTasksHandler, this);

        this._todoContainer.$element.removeEventListener('click', 'input', this.todoItemHandler, this);

        _super.prototype.disable.call(this);
    };

    ZombieApp.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };

    ZombieApp.prototype.onDeviceReady = function (event) {
        console.log('Received Event: ' + 'deviceready');
    };

    ZombieApp.prototype.addTodoHandler = function (event) {
        var todoDictionary = {};

        var todoText = prompt("To-Do", "");
        if (todoText != null) {
            if (todoText == "") {
                alert("To-Do can't be empty!");
            } else {
                this.addTodo(todoText);
            }
        }
    };

    ZombieApp.prototype.removeTasksHandler = function (event) {
    };

    ZombieApp.prototype.addTodoView = function (todoVO) {
        var todoItem = new DOMElement('templates/TodoItemTemplate.hbs', todoVO);
        this._todoContainer.addChild(todoItem);
    };

    ZombieApp.prototype.addTodo = function (todoText) {
        var todoVO = new TodoItemVO();
        todoVO.id = StringUtil.createUUID();
        todoVO.text = todoText;

        this._todoCollection.addItem(todoVO);
        this.addTodoView(todoVO);
    };

    ZombieApp.prototype.todoItemHandler = function (event) {
        var $currentTarget = $(event.currentTarget);
        var $parentContainer = $currentTarget.parents('tr');

        var todoItemId = $parentContainer.data('id');
        var todoItemCid = $parentContainer.data('cid');

        var className = $currentTarget.attr("class");
        console.log("className", className);
        switch (className) {
            case 'checkbox':
                $parentContainer.toggleClass('completed');
                console.log("$currentTarget.next()", $parentContainer);

                this.checkboxClicked();
                break;
            case 'textbox':
                break;
            case 'viewButton':
                break;
            case 'deleteButton':
                this.deleteTodo(todoItemId, todoItemCid);
                break;
            default:
        }
    };

    ZombieApp.prototype.deleteTodo = function (voId, cid) {
        var child = this._todoContainer.getChildByCid(cid);

        var vo = this._todoCollection.find({ id: voId });
        console.log(voId, vo);
        this._todoContainer.removeChild(child);
    };

    ZombieApp.prototype.todoChangeHandler = function (event) {
        console.log("todoChangeHandler");
    };

    ZombieApp.prototype.checkboxClicked = function () {
    };

    ZombieApp.prototype.viewSelectedRow = function (todoTextField) {
    };

    ZombieApp.prototype.deleteSelectedRow = function (deleteButton) {
    };

    ZombieApp.prototype.saveToDoList = function () {
    };

    ZombieApp.prototype.loadToDoList = function () {
    };

    ZombieApp.prototype.deleteAllRows = function () {
    };
    return ZombieApp;
})(Stage);

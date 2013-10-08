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
var BaseController = (function (_super) {
    __extends(BaseController, _super);
    function BaseController() {
        _super.call(this);
        this.CLASS_NAME = 'BaseController';
    }
    return BaseController;
})(EventDispatcher);
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
var millermedeiros;
(function (millermedeiros) {
    var SignalBinding = (function () {
        function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this._isOnce = false;
            this._signal = null;
            this.listener = null;
            this.context = null;
            this.priority = 0;
            this.active = true;
            this.params = null;
            this.listener = listener;
            this._isOnce = isOnce;
            this.context = listenerContext;
            this._signal = signal;
            this.priority = priority;
        }
        SignalBinding.prototype.execute = function (paramsArr) {
            if (typeof paramsArr === "undefined") { paramsArr = []; }
            var handlerReturn = null;
            var params = null;

            if (this.active && !!this.listener) {
                params = this.params ? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this.listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        };

        SignalBinding.prototype.detach = function () {
            return this.isBound() ? this._signal.remove(this.listener, this.context) : null;
        };

        SignalBinding.prototype.isBound = function () {
            return (!!this._signal && !!this.listener);
        };

        SignalBinding.prototype.isOnce = function () {
            return this._isOnce;
        };

        SignalBinding.prototype.getListener = function () {
            return this.listener;
        };

        SignalBinding.prototype.getSignal = function () {
            return this._signal;
        };

        SignalBinding.prototype.destroy = function () {
            this._signal = null;
            this.listener = null;
            this.context = null;
        };

        SignalBinding.prototype.toString = function () {
            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
        };
        return SignalBinding;
    })();
    millermedeiros.SignalBinding = SignalBinding;
})(millermedeiros || (millermedeiros = {}));
var millermedeiros;
(function (millermedeiros) {
    var Signal = (function () {
        function Signal() {
            this._bindings = [];
            this._prevParams = [];
            this._shouldPropagate = true;
            this.memorize = false;
            this.active = true;
        }
        Signal.prototype.has = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            return this._indexOfListener(listener, context) !== -1;
        };

        Signal.prototype.add = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this._validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        };

        Signal.prototype.addOnce = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this._validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        };

        Signal.prototype.remove = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            this._validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i].destroy();
                this._bindings.splice(i, 1);
            }
            return listener;
        };

        Signal.prototype.removeAll = function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n].destroy();
            }
            this._bindings.length = 0;
        };

        Signal.prototype.getNumListeners = function () {
            return this._bindings.length;
        };

        Signal.prototype.halt = function () {
            this._shouldPropagate = false;
        };

        Signal.prototype.dispatch = function () {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                params[_i] = arguments[_i + 0];
            }
            if (!this.active) {
                return;
            }

            var n = this._bindings.length;
            var bindings = null;

            if (this.memorize) {
                this._prevParams = params;
            }

            if (!n) {
                return;
            }

            bindings = this._bindings.slice(0);
            this._shouldPropagate = true;

            do {
                n--;
            } while(bindings[n] && this._shouldPropagate && bindings[n].execute(params) !== false);
        };

        Signal.prototype.forget = function () {
            this._prevParams = null;
        };

        Signal.prototype.dispose = function () {
            this.removeAll();
            this._bindings = null;
            this._prevParams = null;
        };

        Signal.prototype.toString = function () {
            return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
        };

        Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            var prevIndex = this._indexOfListener(listener, listenerContext);
            var binding = null;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                }
            } else {
                binding = new millermedeiros.SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if (this.memorize && this._prevParams) {
                binding.execute(this._prevParams);
            }

            return binding;
        };

        Signal.prototype._addBinding = function (binding) {
            var n = this._bindings.length;
            do {
                --n;
            } while(this._bindings[n] && binding.priority <= this._bindings[n].priority);
            this._bindings.splice(n + 1, 0, binding);
        };

        Signal.prototype._indexOfListener = function (listener, context) {
            var n = this._bindings.length;
            var cur = null;
            while (n--) {
                cur = this._bindings[n];
                if (cur.listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        };

        Signal.prototype._validateListener = function (listener, fnName) {
            if (typeof listener !== 'function') {
                throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
            }
        };
        Signal.VERSION = '1.0.0';
        return Signal;
    })();
    millermedeiros.Signal = Signal;
})(millermedeiros || (millermedeiros = {}));
var millermedeiros;
(function (millermedeiros) {
    var Hasher = (function () {
        function Hasher() {
        }
        Hasher.init = function () {
            if (this._isActive)
                return;

            Hasher._isHashChangeSupported = ('onhashchange' in window) && Hasher._document.documentMode !== 7;
            Hasher._isLegacyIE = Hasher._isIE && !Hasher._isHashChangeSupported;
            Hasher._hash = Hasher._getWindowHash();

            if (Hasher._isHashChangeSupported) {
                Hasher._addListener(window, 'hashchange', Hasher._checkHistory.bind(this));
            } else {
                if (Hasher._isLegacyIE) {
                    if (!Hasher._frame) {
                        Hasher._createFrame();
                    }
                    Hasher._updateFrame();
                }
                Hasher._checkInterval = setInterval(Hasher._checkHistory.bind(this), Hasher.POOL_INTERVAL);
            }

            Hasher._isActive = true;

            Hasher.initialized.dispatch(Hasher._trimHash(Hasher._hash));
        };

        Hasher.stop = function () {
            if (!Hasher._isActive)
                return;

            if (Hasher._isHashChangeSupported) {
                Hasher._removeListener(window, 'hashchange', Hasher._checkHistory.bind(this));
            } else {
                clearInterval(Hasher._checkInterval);
                Hasher._checkInterval = null;
            }

            Hasher._isActive = false;

            Hasher.stopped.dispatch(Hasher._trimHash(Hasher._hash));
        };

        Hasher.isActive = function () {
            return Hasher._isActive;
        };

        Hasher.getURL = function () {
            return window.location.href;
        };

        Hasher.getBaseURL = function () {
            return Hasher.getURL().replace(Hasher._baseUrlRegexp, '');
        };

        Hasher.setHash = function () {
            var path = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                path[_i] = arguments[_i + 0];
            }
            var pathString = Hasher._makePath(path);
            if (pathString !== Hasher._hash) {
                Hasher._registerChange(pathString);
                if (pathString === Hasher._hash) {
                    window.location.hash = '#' + Hasher._encodePath(pathString);
                }
            }
        };

        Hasher.replaceHash = function () {
            var path = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                path[_i] = arguments[_i + 0];
            }
            var stringPath = Hasher._makePath(path);
            if (stringPath !== Hasher._hash) {
                Hasher._registerChange(stringPath, true);
                if (stringPath === Hasher._hash) {
                    window.location.replace('#' + Hasher._encodePath(stringPath));
                }
            }
        };

        Hasher.getHash = function () {
            return Hasher._trimHash(Hasher._hash);
        };

        Hasher.getHashAsArray = function () {
            return Hasher.getHash().split(Hasher.separator);
        };

        Hasher.dispose = function () {
            Hasher.stop();
            Hasher.initialized.dispose();
            Hasher.initialized = null;
            Hasher.stopped.dispose();
            Hasher.stopped = null;
            Hasher.changed.dispose();
            Hasher.changed = null;
            Hasher._frame = window['Hasher'] = null;
        };

        Hasher.toString = function () {
            return '[Hasher version="' + Hasher.VERSION + '" hash="' + Hasher.getHash() + '"]';
        };

        Hasher._escapeRegExp = function (str) {
            return String(str || '').replace(/[\\.+*?\^$\[\](){}\/'#]/g, "\\$&");
        };

        Hasher._trimHash = function (hash) {
            if (!hash)
                return '';
            var regexp = new RegExp('^' + Hasher._escapeRegExp(Hasher.prependHash) + '|' + Hasher._escapeRegExp(Hasher.appendHash) + '$', 'g');
            return hash.replace(regexp, '');
        };

        Hasher._getWindowHash = function () {
            var result = Hasher._hashValRegexp.exec(Hasher.getURL());
            return (result && result[1]) ? decodeURIComponent(result[1]) : '';
        };

        Hasher._getFrameHash = function () {
            return (Hasher._frame) ? (Hasher._frame.contentWindow).frameHash : null;
        };

        Hasher._createFrame = function () {
            Hasher._frame = Hasher._document.createElement('iframe');
            Hasher._frame.src = 'about:blank';
            Hasher._frame.style.display = 'none';
            Hasher._document.body.appendChild(Hasher._frame);
        };

        Hasher._updateFrame = function () {
            if (Hasher._frame && Hasher._hash !== Hasher._getFrameHash()) {
                var frameDoc = Hasher._frame.contentWindow.document;
                frameDoc.open();

                frameDoc.write('<html><head><title>' + Hasher._document.title + '</title><script type="text/javascript">var frameHash="' + Hasher._hash + '";</script></head><body>&nbsp;</body></html>');
                frameDoc.close();
            }
        };

        Hasher._registerChange = function (newHash, isReplace) {
            if (typeof isReplace === "undefined") { isReplace = false; }
            if (Hasher._hash !== newHash) {
                var oldHash = Hasher._hash;
                Hasher._hash = newHash;
                if (Hasher._isLegacyIE) {
                    if (!isReplace) {
                        Hasher._updateFrame();
                    } else {
                        (Hasher._frame.contentWindow).frameHash = newHash;
                    }
                }

                Hasher.changed.dispatch(Hasher._trimHash(newHash), Hasher._trimHash(oldHash));
            }
        };

        Hasher._checkHistory = function () {
            var windowHash = Hasher._getWindowHash();
            if (Hasher._isLegacyIE) {
                var frameHash = Hasher._getFrameHash();
                if (frameHash !== Hasher._hash && frameHash !== windowHash) {
                    Hasher.setHash(Hasher._trimHash(frameHash));
                } else if (windowHash !== Hasher._hash) {
                    Hasher._registerChange(windowHash);
                }
            } else {
                if (windowHash !== Hasher._hash) {
                    Hasher._registerChange(windowHash);
                }
            }
        };

        Hasher._addListener = function (elm, eType, fn) {
            if (elm.addEventListener) {
                elm.addEventListener(eType, fn, false);
            } else if (elm.attachEvent) {
                elm.attachEvent('on' + eType, fn);
            }
        };

        Hasher._removeListener = function (elm, eType, fn) {
            if (elm.removeEventListener) {
                elm.removeEventListener(eType, fn, false);
            } else if (elm.detachEvent) {
                elm.detachEvent('on' + eType, fn);
            }
        };

        Hasher._makePath = function (paths) {
            var path = paths.join(Hasher.separator);
            path = path ? Hasher.prependHash + path.replace(Hasher._hashRegexp, '') + Hasher.appendHash : path;
            return path;
        };

        Hasher._encodePath = function (path) {
            path = encodeURI(path);
            if (Hasher._isIE && Hasher._isLocal) {
                path = path.replace(/\?/, '%3F');
            }
            return path;
        };
        Hasher.VERSION = '1.1.4';

        Hasher.POOL_INTERVAL = 25;

        Hasher._document = window.document;

        Hasher._history = window.history;

        Hasher._hash = '';

        Hasher._checkInterval = null;

        Hasher._isActive = false;

        Hasher._frame = null;

        Hasher._hashValRegexp = /#(.*)$/;

        Hasher._baseUrlRegexp = /(\?.*)|(\#.*)/;

        Hasher._hashRegexp = /^\#/;

        Hasher._isIE = (!+"\v1");

        Hasher._isHashChangeSupported = true;

        Hasher._isLegacyIE = false;

        Hasher._isLocal = (location.protocol === 'file:');

        Hasher.appendHash = '';

        Hasher.prependHash = '/';

        Hasher.separator = '/';

        Hasher.changed = new millermedeiros.Signal();

        Hasher.stopped = new millermedeiros.Signal();

        Hasher.initialized = new millermedeiros.Signal();
        return Hasher;
    })();
    millermedeiros.Hasher = Hasher;
})(millermedeiros || (millermedeiros = {}));
var millermedeiros;
(function (millermedeiros) {
    var PatternLexer = (function () {
        function PatternLexer() {
            this.LOOSE_SLASH = 1;
            this.STRICT_SLASH = 2;
            this.LEGACY_SLASH = 3;
            this._slashMode = null;
            this.UNDEF = null;
            this.ESCAPE_CHARS_REGEXP = /[\\.+*?\^$\[\](){}\/'#]/g;
            this.LOOSE_SLASHES_REGEXP = /^\/|\/$/g;
            this.LEGACY_SLASHES_REGEXP = /\/$/g;
            this.PARAMS_REGEXP = /(?:\{|:)([^}:]+)(?:\}|:)/g;
            this.TOKENS = {
                'OS': {
                    rgx: /([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,
                    save: '$1{{id}}$2',
                    res: '\\/?'
                },
                'RS': {
                    rgx: /([:}])\/?(\{)/g,
                    save: '$1{{id}}$2',
                    res: '\\/'
                },
                'RQ': {
                    rgx: /\{\?([^}]+)\}/g,
                    res: '\\?([^#]+)'
                },
                'OQ': {
                    rgx: /:\?([^:]+):/g,
                    res: '(?:\\?([^#]*))?'
                },
                'OR': {
                    rgx: /:([^:]+)\*:/g,
                    res: '(.*)?'
                },
                'RR': {
                    rgx: /\{([^}]+)\*\}/g,
                    res: '(.+)'
                },
                'RP': {
                    rgx: /\{([^}]+)\}/g,
                    res: '([^\\/?]+)'
                },
                'OP': {
                    rgx: /:([^:]+):/g,
                    res: '([^\\/?]+)?\/?'
                }
            };
            this._slashMode = this.LOOSE_SLASH;
            this.precompileTokens();
        }
        PatternLexer.prototype.precompileTokens = function () {
            var key = null;
            var cur = null;
            for (key in this.TOKENS) {
                if (this.TOKENS.hasOwnProperty(key)) {
                    cur = this.TOKENS[key];
                    cur.id = '__CR_' + key + '__';
                    cur.save = ('save' in cur) ? cur.save.replace('{{id}}', cur.id) : cur.id;
                    cur.rRestore = new RegExp(cur.id, 'g');
                }
            }
        };

        PatternLexer.prototype.captureVals = function (regex, pattern) {
            var vals = [], match;

            regex.lastIndex = 0;
            while (match = regex.exec(pattern)) {
                vals.push(match[1]);
            }
            return vals;
        };

        PatternLexer.prototype.getParamIds = function (pattern) {
            return this.captureVals(this.PARAMS_REGEXP, pattern);
        };

        PatternLexer.prototype.getOptionalParamsIds = function (pattern) {
            return this.captureVals(this.TOKENS.OP.rgx, pattern);
        };

        PatternLexer.prototype.compilePattern = function (pattern, ignoreCase) {
            pattern = pattern || '';

            if (pattern) {
                if (this._slashMode === this.LOOSE_SLASH) {
                    pattern = pattern.replace(this.LOOSE_SLASHES_REGEXP, '');
                } else if (this._slashMode === this.LEGACY_SLASH) {
                    pattern = pattern.replace(this.LEGACY_SLASHES_REGEXP, '');
                }

                pattern = this.replaceTokens(pattern, 'rgx', 'save');

                pattern = pattern.replace(this.ESCAPE_CHARS_REGEXP, '\\$&');

                pattern = this.replaceTokens(pattern, 'rRestore', 'res');

                if (this._slashMode === this.LOOSE_SLASH) {
                    pattern = '\\/?' + pattern;
                }
            }

            if (this._slashMode !== this.STRICT_SLASH) {
                pattern += '\\/?';
            }
            return new RegExp('^' + pattern + '$', ignoreCase ? 'i' : '');
        };

        PatternLexer.prototype.replaceTokens = function (pattern, regexpName, replaceName) {
            var cur, key;
            for (key in this.TOKENS) {
                if (this.TOKENS.hasOwnProperty(key)) {
                    cur = this.TOKENS[key];
                    pattern = pattern.replace(cur[regexpName], cur[replaceName]);
                }
            }
            return pattern;
        };

        PatternLexer.prototype.getParamValues = function (request, regexp, shouldTypecast) {
            var vals = regexp.exec(request);
            if (vals) {
                vals.shift();
                if (shouldTypecast) {
                    vals = this.typecastArrayValues(vals);
                }
            }
            return vals;
        };

        PatternLexer.prototype.typecastArrayValues = function (values) {
            var n = values.length, result = [];
            while (n--) {
                result[n] = this.typecastValue(values[n]);
            }
            return result;
        };

        PatternLexer.prototype.typecastValue = function (val) {
            var r;
            if (val === null || val === 'null') {
                r = null;
            } else if (val === 'true') {
                r = true;
            } else if (val === 'false') {
                r = false;
            } else if (val === this.UNDEF || val === 'undefined') {
                r = this.UNDEF;
            } else if (val === '' || isNaN(val)) {
                r = val;
            } else {
                r = parseFloat(val);
            }
            return r;
        };

        PatternLexer.prototype.interpolate = function (pattern, replacements) {
            if (typeof pattern !== 'string') {
                throw new Error('Route pattern should be a string.');
            }

            var replaceFn = function (match, prop) {
                var val;
                prop = (prop.substr(0, 1) === '?') ? prop.substr(1) : prop;
                if (replacements[prop] != null) {
                    if (typeof replacements[prop] === 'object') {
                        var queryParts = [];
                        for (var key in replacements[prop]) {
                            queryParts.push(encodeURI(key + '=' + replacements[prop][key]));
                        }
                        val = '?' + queryParts.join('&');
                    } else {
                        val = String(replacements[prop]);
                    }

                    if (match.indexOf('*') === -1 && val.indexOf('/') !== -1) {
                        throw new Error('Invalid value "' + val + '" for segment "' + match + '".');
                    }
                } else if (match.indexOf('{') !== -1) {
                    throw new Error('The segment ' + match + ' is required.');
                } else {
                    val = '';
                }
                return val;
            };

            if (!this.TOKENS.OS.trail) {
                this.TOKENS.OS.trail = new RegExp('(?:' + this.TOKENS.OS.id + ')+$');
            }

            return pattern.replace(this.TOKENS.OS.rgx, this.TOKENS.OS.save).replace(this.PARAMS_REGEXP, replaceFn).replace(this.TOKENS.OS.trail, '').replace(this.TOKENS.OS.rRestore, '/');
        };

        PatternLexer.prototype.strict = function () {
            this._slashMode = this.STRICT_SLASH;
        };

        PatternLexer.prototype.loose = function () {
            this._slashMode = this.LOOSE_SLASH;
        };

        PatternLexer.prototype.legacy = function () {
            this._slashMode = this.LEGACY_SLASH;
        };
        return PatternLexer;
    })();
    millermedeiros.PatternLexer = PatternLexer;
})(millermedeiros || (millermedeiros = {}));
var millermedeiros;
(function (millermedeiros) {
    var Route = (function () {
        function Route(pattern, callback, priority, router) {
            if (typeof priority === "undefined") { priority = 0; }
            if (typeof router === "undefined") { router = null; }
            this._router = null;
            this._pattern = null;
            this._paramsIds = null;
            this._optionalParamsIds = null;
            this._matchRegexp = null;
            this.priority = 0;
            this.matched = null;
            this.switched = null;
            this.greedy = false;
            this.rules = null;
            this._hasOptionalGroupBug = (/t(.+)?/).exec('t')[1] === '';
            this.UNDEF = null;
            var isRegexPattern = this.isRegExp(pattern);
            var patternLexer = router.patternLexer;

            this._router = router;
            this._pattern = pattern;
            this._paramsIds = isRegexPattern ? null : patternLexer.getParamIds(pattern);
            this._optionalParamsIds = isRegexPattern ? null : patternLexer.getOptionalParamsIds(pattern);
            this._matchRegexp = isRegexPattern ? pattern : patternLexer.compilePattern(pattern, router.ignoreCase);
            this.matched = new millermedeiros.Signal();
            this.switched = new millermedeiros.Signal();
            if (callback) {
                this.matched.add(callback);
            }
        }
        Route.prototype.match = function (request) {
            if (typeof request === "undefined") { request = ''; }
            return this._matchRegexp.test(request) && this._validateParams(request);
        };

        Route.prototype._validateParams = function (request) {
            var rules = this.rules, values = this._getParamsObject(request), key;
            for (key in rules) {
                if (key !== 'normalize_' && rules.hasOwnProperty(key) && !this._isValidParam(request, key, values)) {
                    return false;
                }
            }
            return true;
        };

        Route.prototype._isValidParam = function (request, prop, values) {
            var validationRule = this.rules[prop], val = values[prop], isValid = false, isQuery = (prop.indexOf('?') === 0);

            if (val == null && this._optionalParamsIds && this.arrayIndexOf(this._optionalParamsIds, prop) !== -1) {
                isValid = true;
            } else if (this.isRegExp(validationRule)) {
                if (isQuery) {
                    val = values[prop + '_'];
                }
                isValid = validationRule.test(val);
            } else if (this.isArray(validationRule)) {
                if (isQuery) {
                    val = values[prop + '_'];
                }
                isValid = this._isValidArrayRule(validationRule, val);
            } else if (this.isFunction(validationRule)) {
                isValid = validationRule(val, request, values);
            }

            return isValid;
        };

        Route.prototype._isValidArrayRule = function (arr, val) {
            if (!this._router.ignoreCase) {
                return this.arrayIndexOf(arr, val) !== -1;
            }

            if (typeof val === 'string') {
                val = val.toLowerCase();
            }

            var n = arr.length, item, compareVal;

            while (n--) {
                item = arr[n];
                compareVal = (typeof item === 'string') ? item.toLowerCase() : item;
                if (compareVal === val) {
                    return true;
                }
            }
            return false;
        };

        Route.prototype._getParamsObject = function (request) {
            var shouldTypecast = this._router.shouldTypecast, values = this._router.patternLexer.getParamValues(request, this._matchRegexp, shouldTypecast), o = {}, n = values.length, param, val;
            while (n--) {
                val = values[n];
                if (this._paramsIds) {
                    param = this._paramsIds[n];
                    if (param.indexOf('?') === 0 && val) {
                        o[param + '_'] = val;

                        val = this.decodeQueryString(val, shouldTypecast);
                        values[n] = val;
                    }

                    if (this._hasOptionalGroupBug && val === '' && this.arrayIndexOf(this._optionalParamsIds, param) !== -1) {
                        val = void (0);
                        values[n] = val;
                    }
                    o[param] = val;
                }

                o[n] = val;
            }
            o.request_ = shouldTypecast ? this.typecastValue(request) : request;
            o.vals_ = values;
            return o;
        };

        Route.prototype.decodeQueryString = function (str, shouldTypecast) {
            var queryArr = (str || '').replace('?', '').split('&'), n = queryArr.length, obj = {}, item, val;
            while (n--) {
                item = queryArr[n].split('=');
                val = shouldTypecast ? this.typecastValue(item[1]) : item[1];
                obj[item[0]] = (typeof val === 'string') ? decodeURIComponent(val) : val;
            }
            return obj;
        };

        Route.prototype.arrayIndexOf = function (arr, val) {
            if (arr.indexOf) {
                return arr.indexOf(val);
            } else {
                var n = arr.length;
                while (n--) {
                    if (arr[n] === val) {
                        return n;
                    }
                }
                return -1;
            }
        };

        Route.prototype.isKind = function (val, kind) {
            return '[object ' + kind + ']' === Object.prototype.toString.call(val);
        };

        Route.prototype.isRegExp = function (val) {
            return this.isKind(val, 'RegExp');
        };

        Route.prototype.isArray = function (val) {
            return this.isKind(val, 'Array');
        };

        Route.prototype.isFunction = function (val) {
            return typeof val === 'function';
        };

        Route.prototype.typecastValue = function (val) {
            var r;
            if (val === null || val === 'null') {
                r = null;
            } else if (val === 'true') {
                r = true;
            } else if (val === 'false') {
                r = false;
            } else if (val === this.UNDEF || val === 'undefined') {
                r = this.UNDEF;
            } else if (val === '' || isNaN(val)) {
                r = val;
            } else {
                r = parseFloat(val);
            }
            return r;
        };

        Route.prototype._getParamsArray = function (request) {
            var norm = this.rules ? this.rules.normalize_ : null, params;
            norm = norm || this._router.normalizeFn;
            if (norm && this.isFunction(norm)) {
                params = norm(request, this._getParamsObject(request));
            } else {
                params = this._getParamsObject(request).vals_;
            }
            return params;
        };

        Route.prototype.interpolate = function (replacements) {
            var str = this._router.patternLexer.interpolate(this._pattern, replacements);
            if (!this._validateParams(str)) {
                throw new Error('Generated string doesn\'t validate against `Route.rules`.');
            }
            return str;
        };

        Route.prototype.dispose = function () {
            this._router.removeRoute(this);
        };

        Route.prototype.destroy = function () {
            this.matched.dispose();
            this.switched.dispose();
            this.matched = this.switched = this._pattern = this._matchRegexp = null;
        };

        Route.prototype.toString = function () {
            return '[Route pattern:"' + this._pattern + '", numListeners:' + this.matched.getNumListeners() + ']';
        };
        return Route;
    })();
    millermedeiros.Route = Route;
})(millermedeiros || (millermedeiros = {}));
var millermedeiros;
(function (millermedeiros) {
    var Crossroads = (function () {
        function Crossroads() {
            this._routes = [];
            this._prevRoutes = [];
            this._piped = [];
            this._prevMatchedRequest = null;
            this._prevBypassedRequest = null;
            this.normalizeFn = null;
            this.greedy = false;
            this.greedyEnabled = true;
            this.ignoreCase = true;
            this.ignoreState = false;
            this.shouldTypecast = false;
            this.bypassed = new millermedeiros.Signal();
            this.routed = new millermedeiros.Signal();
            this.patternLexer = new millermedeiros.PatternLexer();
        }
        Crossroads.prototype.resetState = function () {
            this._prevRoutes.length = 0;
            this._prevMatchedRequest = null;
            this._prevBypassedRequest = null;
        };

        Crossroads.prototype.create = function () {
            return new Crossroads();
        };

        Crossroads.prototype.addRoute = function (pattern, callback, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            var route = new millermedeiros.Route(pattern, callback, priority, this);
            this._sortedInsert(route);
            return route;
        };

        Crossroads.prototype.removeRoute = function (route) {
            this.arrayRemove(this._routes, route);
            route.destroy();
        };

        Crossroads.prototype.arrayRemove = function (arr, item) {
            var i = this.arrayIndexOf(arr, item);
            if (i !== -1) {
                arr.splice(i, 1);
            }
        };

        Crossroads.prototype.arrayIndexOf = function (arr, val) {
            if (arr.indexOf) {
                return arr.indexOf(val);
            } else {
                var n = arr.length;
                while (n--) {
                    if (arr[n] === val) {
                        return n;
                    }
                }
                return -1;
            }
        };

        Crossroads.prototype.removeAllRoutes = function () {
            var n = this.getNumRoutes();
            while (n--) {
                this._routes[n].destroy();
            }
            this._routes.length = 0;
        };

        Crossroads.prototype.parse = function (request, defaultArgs) {
            if (typeof request === "undefined") { request = ''; }
            if (typeof defaultArgs === "undefined") { defaultArgs = []; }
            if (!this.ignoreState && (request === this._prevMatchedRequest || request === this._prevBypassedRequest)) {
                return;
            }

            var routes = this._getMatchedRoutes(request);
            var i = 0;
            var n = routes.length;
            var cur = null;

            if (n) {
                this._prevMatchedRequest = request;

                this._notifyPrevRoutes(routes, request);
                this._prevRoutes = routes;

                while (i < n) {
                    cur = routes[i];
                    cur.route.matched.dispatch.apply(cur.route.matched, defaultArgs.concat(cur.params));
                    cur.isFirst = !i;
                    this.routed.dispatch.apply(this.routed, defaultArgs.concat([request, cur]));
                    i += 1;
                }
            } else {
                this._prevBypassedRequest = request;
                this.bypassed.dispatch.apply(this.bypassed, defaultArgs.concat([request]));
            }

            this._pipeParse(request, defaultArgs);
        };

        Crossroads.prototype._notifyPrevRoutes = function (matchedRoutes, request) {
            var i = 0, prev;
            while (prev = this._prevRoutes[i++]) {
                if (prev.route.switched && this._didSwitch(prev.route, matchedRoutes)) {
                    prev.route.switched.dispatch(request);
                }
            }
        };

        Crossroads.prototype._didSwitch = function (route, matchedRoutes) {
            var matched, i = 0;
            while (matched = matchedRoutes[i++]) {
                if (matched.route === route) {
                    return false;
                }
            }
            return true;
        };

        Crossroads.prototype._pipeParse = function (request, defaultArgs) {
            var i = 0, route;
            while (route = this._piped[i++]) {
                route.parse(request, defaultArgs);
            }
        };

        Crossroads.prototype.getNumRoutes = function () {
            return this._routes.length;
        };

        Crossroads.prototype._sortedInsert = function (route) {
            var routes = this._routes, n = routes.length;
            do {
                --n;
            } while(routes[n] && route.priority <= routes[n].priority);
            routes.splice(n + 1, 0, route);
        };

        Crossroads.prototype._getMatchedRoutes = function (request) {
            var res = [], routes = this._routes, n = routes.length, route;

            while (route = routes[--n]) {
                if ((!res.length || this.greedy || route.greedy) && route.match(request)) {
                    res.push({
                        route: route,
                        params: route._getParamsArray(request)
                    });
                }
                if (!this.greedyEnabled && res.length) {
                    break;
                }
            }
            return res;
        };

        Crossroads.prototype.pipe = function (otherRouter) {
            this._piped.push(otherRouter);
        };

        Crossroads.prototype.unpipe = function (otherRouter) {
            this.arrayRemove(this._piped, otherRouter);
        };

        Crossroads.prototype.toString = function () {
            return '[crossroads numRoutes:' + this.getNumRoutes() + ']';
        };
        Crossroads.VERSION = '0.12.0';

        Crossroads.NORM_AS_ARRAY = function (req, vals) {
            return [vals.vals_];
        };

        Crossroads.NORM_AS_OBJECT = function (req, vals) {
            return [vals];
        };
        return Crossroads;
    })();
    millermedeiros.Crossroads = Crossroads;
})(millermedeiros || (millermedeiros = {}));
var Hasher = millermedeiros.Hasher;
var Crossroads = millermedeiros.Crossroads;

var RouterController = (function (_super) {
    __extends(RouterController, _super);
    function RouterController() {
        _super.call(this);
        this.CLASS_NAME = 'RouterController';
        this._crossroads = null;

        this._crossroads = new Crossroads();
    }
    RouterController.prototype.addRoute = function (pattern, handler, scope, priority) {
        this._crossroads.addRoute(pattern, handler.bind(scope), priority);
    };

    RouterController.prototype.start = function () {
        if (Hasher.isActive())
            return;

        Hasher.initialized.add(this.parseHash.bind(this));
        Hasher.changed.add(this.parseHash.bind(this));
        Hasher.init();
    };

    RouterController.prototype.parseHash = function (newHash, oldHash) {
        this._crossroads.parse(newHash);
    };

    RouterController.prototype.navigateTo = function (hash, silently) {
        if (typeof silently === "undefined") { silently = false; }
        hash = hash.replace('#/', '');
        if (silently) {
            Hasher.changed.active = false;
            Hasher.setHash(hash);
            Hasher.changed.active = true;
        } else {
            Hasher.setHash(hash);
        }
    };

    RouterController.prototype.getHash = function () {
        return Hasher.getHash();
    };

    RouterController.prototype.getHashAsArray = function () {
        return Hasher.getHashAsArray();
    };

    RouterController.prototype.getURL = function () {
        return Hasher.getURL();
    };

    RouterController.prototype.getBaseURL = function () {
        return Hasher.getBaseURL();
    };
    return RouterController;
})(BaseController);
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
        _super.prototype.destroy.call(this);

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
        this.src = '';
        this.data = null;
        this.complete = false;

        this.src = url;
        this.configureRequest();
    }
    BaseRequest.prototype.configureRequest = function () {
        this._request = new URLRequest(this.src);
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
        _super.call(this, "");
        this.CLASS_NAME = 'JsonRequest';
    }
    return JsonRequest;
})(BaseRequest);
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
var LocalStorageController = (function (_super) {
    __extends(LocalStorageController, _super);
    function LocalStorageController() {
        _super.call(this);
        this.CLASS_NAME = 'LocalStorageController';
        this._namespace = '';

        window.addEventListener('storage', this.onLocalStorageEvent.bind(this));
    }
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
        } else {
            data = JSON.stringify(data);
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
    return LocalStorageController;
})(BaseController);
var LanguageEvent = (function (_super) {
    __extends(LanguageEvent, _super);
    function LanguageEvent(type, bubbles, cancelable, data) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof data === "undefined") { data = null; }
        _super.call(this, type, bubbles, cancelable, data);
        this.CLASS_NAME = 'LanguageEvent';
    }
    LanguageEvent.CONFIG_LOADED = "LanguageEvent.configLoaded";

    LanguageEvent.LANGUAGE_LOADED = "LanguageEvent.languageLoaded";

    LanguageEvent.LANGUAGE_CHANGE = "LanguageEvent.languageChange";
    return LanguageEvent;
})(BaseEvent);
var LanguageConfigVO = (function (_super) {
    __extends(LanguageConfigVO, _super);
    function LanguageConfigVO(data) {
        if (typeof data === "undefined") { data = null; }
        _super.call(this);
        this.CLASS_NAME = 'LanguageConfigVO';

        if (data) {
            this.update(data);
        }
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
        this._localStorageController = null;
        this.currentLanguage = null;
        this.data = null;

        this._localStorageController = new LocalStorageController();
        this._localStorageController.setNamespace('.StructureTS');
        this.currentLanguage = this._localStorageController.getItem('language', true);
    }
    LanguageModel.prototype.loadConfig = function (path) {
        this._request = new BaseRequest(path);
        this._request.addEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded, this);
        this._request.load();
    };

    LanguageModel.prototype.setLang = function (value) {
        this.currentLanguage = value;
    };

    LanguageModel.prototype.loadLanguageData = function (vo) {
        this._localStorageController.setItem('language', vo.id, true);

        this._request = new BaseRequest(vo.path);
        this._request.addEventListener(LoaderEvent.COMPLETE, this.onLanguageDataLoad, this);
        this._request.load();
    };

    LanguageModel.prototype.getSupportedLanguages = function () {
        var temp = [];
        for (var key in this._availableLanguagesDictionary) {
            temp.push(this._availableLanguagesDictionary[key]);
        }
        return temp;
    };

    LanguageModel.prototype.loadLanguageById = function (id) {
        var vo = this.getLangConfigById(id);
        this.loadLanguageData(vo);
    };

    LanguageModel.prototype.getLangConfigById = function (id) {
        return this._availableLanguagesDictionary[id];
    };

    LanguageModel.prototype.onConfigLoaded = function (event) {
        this._request.removeEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded, this);

        var firstLanguageId = null;
        var jsonData = JSON.parse(event.target.data);
        var vo;
        var len = jsonData.data.length;
        for (var i = 0; i < len; i++) {
            vo = new LanguageConfigVO(jsonData.data[i]);
            this._availableLanguagesDictionary[vo.id] = vo;

            if (firstLanguageId == null) {
                firstLanguageId = vo.id;
            }
        }

        var languageIdFound = this.hasLanguage(this.currentLanguage);

        this.currentLanguage = (languageIdFound) ? this.currentLanguage : firstLanguageId;

        this.dispatchEvent(new LoaderEvent(LanguageEvent.CONFIG_LOADED, false, false, this.data));

        var currentLanguageVO = this.getLangConfigById(this.currentLanguage);
        this.loadLanguageData(currentLanguageVO);
    };

    LanguageModel.prototype.onLanguageDataLoad = function (event) {
        this.data = JSON.parse(event.target.data);
        this._request.removeEventListener(LoaderEvent.COMPLETE, this.onConfigLoaded, this);
        this._request = null;

        this.dispatchEvent(new LoaderEvent(LanguageEvent.LANGUAGE_LOADED, false, false, this.data));
    };

    LanguageModel.prototype.hasLanguage = function (languageId) {
        return !!this._availableLanguagesDictionary[languageId];
    };
    return LanguageModel;
})(EventDispatcher);
var MainLanguageModel = (function (_super) {
    __extends(MainLanguageModel, _super);
    function MainLanguageModel() {
        _super.call(this);
        this.CLASS_NAME = 'MainLanguageModel';
        if (MainLanguageModel._instance) {
            throw new Error('[' + this.getQualifiedClassName() + '] Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.');
        }
        MainLanguageModel._instance = this;
    }
    MainLanguageModel.getInstance = function () {
        if (MainLanguageModel._instance == null) {
            MainLanguageModel._instance = new MainLanguageModel();
        }
        return MainLanguageModel._instance;
    };

    MainLanguageModel.prototype.onLanguageDataLoad = function (event) {
        var data = JSON.parse(event.target.data);

        console.log(data);

        _super.prototype.onLanguageDataLoad.call(this, event);
    };
    return MainLanguageModel;
})(LanguageModel);
var LanguageSelect = (function (_super) {
    __extends(LanguageSelect, _super);
    function LanguageSelect() {
        _super.call(this);
        this.CLASS_NAME = 'LanguageSelect';
    }
    LanguageSelect.prototype.createChildren = function () {
        var languageManagerData = MainLanguageModel.getInstance().data;
        _super.prototype.createChildren.call(this, function (data) {
            select(option({ value: 'en' }, 'English'), option({ value: 'fr' }, 'French'), option({ value: 'sp' }, 'Spanish'));
        });

        return this;
    };

    LanguageSelect.prototype.enable = function () {
        if (this.isEnabled === true)
            return this;

        this.$element.on('change', this.onLanguageChange.bind(this));

        _super.prototype.enable.call(this);
        return this;
    };

    LanguageSelect.prototype.disable = function () {
        if (this.isEnabled === false)
            return this;

        this.$element.off('change', this.onLanguageChange.bind(this));

        _super.prototype.disable.call(this);
        return this;
    };

    LanguageSelect.prototype.onLanguageChange = function (event) {
        var languageId = $(event.currentTarget).val();
        this.dispatchEvent(new LanguageEvent(LanguageEvent.LANGUAGE_CHANGE, false, false, languageId));
    };

    LanguageSelect.prototype.value = function (value) {
        this.$element.val(value);
    };
    return LanguageSelect;
})(DOMElement);
var NavigationView = (function (_super) {
    __extends(NavigationView, _super);
    function NavigationView() {
        _super.call(this);
        this.CLASS_NAME = 'NavigationView';
        this._data = null;

        var languageManagerData = MainLanguageModel.getInstance().data;

        this._data = {
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
        }, this._data);

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
        var ls = new LocalStorageController();
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
    };

    ArtistsView.prototype.update = function (artist, album) {
        if (!this.urlLoader || this.urlLoader.ready == false) {
            this.requestData();
            return;
        }

        if (artist && !album) {
            var artistMarkup = new DOMElement('templates/Albums.tpl', { data: this._artistVOList[artist] });
            this._container.removeChildren();
            this._container.addChild(artistMarkup);
        } else if (artist && album) {
            var artistMarkup = new DOMElement('templates/BuyAlbum.tpl', { data: this._artistVOList[artist].albumList[album] });
            this._container.removeChildren();
            this._container.addChild(artistMarkup);
        } else {
            var artistMarkup = new DOMElement('templates/Artists.tpl', { data: this._artistVOList });

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
        this._languageManager = null;
        this._request = null;

        this._languageManager = MainLanguageModel.getInstance();
        this._languageManager.addEventListener(LanguageEvent.LANGUAGE_LOADED, this.init, this);
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

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
        this.cid = null;
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
        this.unscaledWidth = 100;
        this.unscaledHeight = 100;
    }
    DisplayObject.prototype.createChildren = function () {
        return this;
    };

    DisplayObject.prototype.addChild = function (child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this.children.push(child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
    };

    DisplayObject.prototype.addChildAt = function (child, index) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this.children.splice(index, 0, child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
    };

    DisplayObject.prototype.swapChildren = function (child1, child2) {
        return this;
    };

    DisplayObject.prototype.swapChildrenAt = function (index1, index2) {
        if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
        }

        var child1 = this.getChildAt(index1);
        var child2 = this.getChildAt(index2);

        this.swapChildren(child1, child2);

        return this;
    };

    DisplayObject.prototype.getChildIndex = function (child) {
        return this.children.indexOf(child);
    };

    DisplayObject.prototype.removeChild = function (child) {
        var index = this.getChildIndex(child);
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

    DisplayObject.prototype.getChildAt = function (index) {
        return this.children[index];
    };

    DisplayObject.prototype.setSize = function (unscaledWidth, unscaledHeight) {
        this.unscaledWidth = unscaledWidth;
        this.unscaledHeight = unscaledHeight;
        if (this.isCreated) {
            this.layoutChildren();
        }

        return this;
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
        if (typeof params === "undefined") { params = {}; }
        _super.call(this);
        this.CLASS_NAME = 'DOMElement';
        this._isVisible = true;
        this.el = null;
        this.$el = null;

        if (type) {
            this.$el = jQuery("<" + type + "/>", params);
        }
    }
    DOMElement.prototype.createChildren = function (template, data) {
        if (typeof template === "undefined") { template = 'div'; }
        if (typeof data === "undefined") { data = null; }
        if (typeof template === 'function' && !this.$el) {
            Jaml.register(this.CLASS_NAME, template);
            this.$el = jQuery(Jaml.render(this.CLASS_NAME, data));
        } else if (typeof template === 'string' && !this.$el) {
            var html = TemplateFactory.createTemplate(template, data);
            if (html) {
                this.$el = $(html);
            } else {
                this.$el = jQuery("<" + template + "/>", data);
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

    DOMElement.prototype.getChild = function (selector) {
        var domElement = null;

        if (typeof selector === 'number') {
            domElement = _.find(this.children, function (domElement) {
                return domElement.cid == selector;
            });
        } else {
            var jQueryElement = this.$el.find(selector).first();
            if (jQueryElement.length == 0) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $el');
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
        this.el = null;
        this.$el = null;

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
        this.$el.attr('data-cid', this.cid);

        if (!this.isCreated) {
            this.createChildren();
            this.isCreated = true;
        }

        if (enabled) {
            this.enable();
        } else {
            this.disable();
        }

        return this;
    };
    return Stage;
})(DOMElement);
var MouseEventType = (function () {
    function MouseEventType() {
    }
    MouseEventType.CLASS_NAME = 'MouseEventType';

    MouseEventType.CLICK = 'click';

    MouseEventType.DBL_CLICK = 'dblclick';

    MouseEventType.MOUSE_DOWN = 'mousedown';

    MouseEventType.MOUSE_MOVE = 'mousemove';

    MouseEventType.MOUSE_OVER = 'mouseover';

    MouseEventType.MOUSE_OUT = 'mouseout';

    MouseEventType.MOUSE_UP = 'mouseup';

    MouseEventType.TAP = 'tap';
    return MouseEventType;
})();
var SonView = (function (_super) {
    __extends(SonView, _super);
    function SonView() {
        _super.call(this);
        this.CLASS_NAME = 'SonView';
        this._childrenContainer = null;
        this._dispatchButton = null;
    }
    SonView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

        this._childrenContainer = this.getChild('.js-childrenArea');

        this._dispatchButton = new DOMElement('button', { 'class': 'button_dispatch', text: 'Dispatch Event' });
        this._childrenContainer.addChild(this._dispatchButton);
    };

    SonView.prototype.layoutChildren = function () {
    };

    SonView.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        this._dispatchButton.$el.addEventListener(MouseEventType.CLICK, this.onButtonClick, this);

        _super.prototype.enable.call(this);
    };

    SonView.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this._dispatchButton.$el.removeEventListener(MouseEventType.CLICK, this.onButtonClick, this);

        _super.prototype.disable.call(this);
    };

    SonView.prototype.destroy = function () {
        this._dispatchButton.destroy();
        this._dispatchButton = null;

        this._childrenContainer.destroy();
        this._childrenContainer = null;

        _super.prototype.destroy.call(this);
    };

    SonView.prototype.onButtonClick = function (event) {
        event.preventDefault();

        this._dispatchButton.$el.text('Event Sent!');

        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true));
    };
    return SonView;
})(DOMElement);
var DadView = (function (_super) {
    __extends(DadView, _super);
    function DadView() {
        _super.call(this);
        this.CLASS_NAME = 'DadView';
        this._childrenContainer = null;
        this._sonView = null;
    }
    DadView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

        this._childrenContainer = this.getChild('.js-childrenArea');

        this._sonView = new SonView();
        this._childrenContainer.addChild(this._sonView);
    };

    DadView.prototype.layoutChildren = function () {
    };

    DadView.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        this._sonView.enable();

        _super.prototype.enable.call(this);
    };

    DadView.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this._sonView.disable();

        _super.prototype.disable.call(this);
    };

    DadView.prototype.destroy = function () {
        this._sonView.destroy();
        this._sonView = null;

        this._childrenContainer.destroy();
        this._childrenContainer = null;

        _super.prototype.destroy.call(this);
    };
    return DadView;
})(DOMElement);
var GrandpaView = (function (_super) {
    __extends(GrandpaView, _super);
    function GrandpaView() {
        _super.call(this);
        this.CLASS_NAME = 'GrandpaView';
        this._childrenContainer = null;
        this._dadView = null;
    }
    GrandpaView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

        this._childrenContainer = this.getChild('.js-childrenArea');

        this._dadView = new DadView();
        this._childrenContainer.addChild(this._dadView);
    };

    GrandpaView.prototype.layoutChildren = function () {
    };

    GrandpaView.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        this._dadView.enable();

        _super.prototype.enable.call(this);
    };

    GrandpaView.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this._dadView.disable();

        _super.prototype.disable.call(this);
    };

    GrandpaView.prototype.destroy = function () {
        this._dadView.destroy();
        this._dadView = null;

        this._childrenContainer.destroy();
        this._childrenContainer = null;

        _super.prototype.destroy.call(this);
    };
    return GrandpaView;
})(DOMElement);
var RootView = (function (_super) {
    __extends(RootView, _super);
    function RootView() {
        _super.call(this);
        this.CLASS_NAME = 'RootView';
        this._grandpaView = null;
    }
    RootView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, '#wrapperTemplate');

        this._grandpaView = new GrandpaView();
        this.addChild(this._grandpaView);
    };

    RootView.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        this._grandpaView.enable();

        _super.prototype.enable.call(this);
    };

    RootView.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this._grandpaView.disable();

        _super.prototype.disable.call(this);
    };
    return RootView;
})(DOMElement);
var EventBubblingApp = (function (_super) {
    __extends(EventBubblingApp, _super);
    function EventBubblingApp() {
        _super.call(this);
        this._rootView = null;
    }
    EventBubblingApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._rootView = new RootView();
        this.addChild(this._rootView);
    };

    EventBubblingApp.prototype.enable = function () {
        if (this.isEnabled === true)
            return;

        this._rootView.enable();

        _super.prototype.enable.call(this);
    };

    EventBubblingApp.prototype.disable = function () {
        if (this.isEnabled === false)
            return;

        this._rootView.disable();

        _super.prototype.disable.call(this);
    };

    EventBubblingApp.prototype.destroy = function () {
        this._rootView.destroy();
        this._rootView = null;

        _super.prototype.destroy.call(this);
    };
    return EventBubblingApp;
})(Stage);

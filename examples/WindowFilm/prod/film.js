var BaseEvent = (function () {
    function BaseEvent(type, data) {
        if (typeof data === "undefined") { data = null; }
        this.CLASS_NAME = 'BaseEvent';
        this.type = null;
        this.target = null;
        this.data = null;
        this.bubble = true;
        this.isPropagationStopped = true;
        this.isImmediatePropagationStopped = true;
        this.type = type;
        this.data = data;
    }
    BaseEvent.CHANGE = "Event.change";
    BaseEvent.COMPLETE = "Event.complete";
    BaseEvent.ENTER_FRAME = "Event.enterFrame";
    BaseEvent.prototype.stopPropagation = function () {
        this.isPropagationStopped = false;
    };
    BaseEvent.prototype.stopImmediatePropagation = function () {
        this.stopPropagation();
        this.isImmediatePropagationStopped = false;
    };
    BaseEvent.prototype.getQualifiedClassName = function () {
        return this.CLASS_NAME;
    };
    return BaseEvent;
})();
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.CLASS_NAME = 'EventDispatcher';
        this._listeners = [];
        this.parent = null;
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
        while(--i > -1) {
            listener = list[i];
            if (listener.c === callback) {
                list.splice(i, 1);
            } else if (index === 0 && listener.pr < priority) {
                index = i + 1;
            }
        }
        list.splice(index, 0, {
            c: callback,
            s: scope,
            pr: priority
        });
        return this;
    };
    EventDispatcher.prototype.removeEventListener = function (type, callback) {
        var list = this._listeners[type];
        if (list) {
            var i = list.length;
            while(--i > -1) {
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
            while(--i > -1) {
                if (event.isImmediatePropagationStopped == false) {
                    break;
                }
                listener = list[i];
                listener.c.call(listener.s, event);
            }
        }
        if (this.parent && event.isPropagationStopped) {
            this.parent.dispatchEvent(event);
        }
        return this;
    };
    EventDispatcher.prototype.getQualifiedClassName = function () {
        return this.CLASS_NAME;
    };
    return EventDispatcher;
})();
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        _super.call(this);
        this.CLASS_NAME = 'DisplayObject';
        this.name = null;
        this.isEnabled = false;
        this.isCreated = false;
        this.children = [];
    }
    DisplayObject.prototype.createChildren = function () {
    };
    DisplayObject.prototype.addChild = function (displayObject) {
        if (displayObject.parent) {
            displayObject.parent.removeChild(displayObject);
        }
        this.children.unshift(displayObject);
        displayObject.parent = this;
        return this;
    };
    DisplayObject.prototype.removeChild = function (displayObject) {
        console.log(displayObject);
        var index = this.children.indexOf(displayObject);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        displayObject.enabled(false);
        displayObject.parent = null;
        return this;
    };
    DisplayObject.prototype.removeChildren = function () {
        while(this.children.length > 0) {
            this.removeChild(this.children.pop());
        }
        return this;
    };
    DisplayObject.prototype.addChildAt = function (displayObject, displayIndex) {
        this.children.unshift(displayObject);
        return this;
    };
    DisplayObject.prototype.getChild = function (displayObject) {
        var index = this.children.indexOf(displayObject);
        return this.children[index];
    };
    DisplayObject.prototype.enabled = function (value) {
        if (value == this.isEnabled) {
            return;
        }
        if (value) {
        } else {
        }
        this.isEnabled = value;
    };
    DisplayObject.prototype.invalidateLayout = function () {
        this.layoutChildren();
    };
    DisplayObject.prototype.layoutChildren = function () {
    };
    return DisplayObject;
})(EventDispatcher);
var DOMElement = (function (_super) {
    __extends(DOMElement, _super);
    function DOMElement(type, params) {
        if (typeof params === "undefined") { params = {}; }
        _super.call(this);
        this.CLASS_NAME = 'DOMElement';
        this._node = null;
        this._options = {};
        this.templateName = "DOMElement";
        this._isVisible = true;
        this.el = null;
        this.$el = null;
        this._node = type;
        this._options = params;
    }
    DOMElement.prototype.createChildren = function () {
        if (this._node && !this.$el) {
            this.$el = jQuery("<" + this._node + "/>", this._options);
        } else if (!this._node && !this.$el) {
            this.$el = jQuery(Jaml.render(this.templateName, this._options));
        }
        this.el = this.$el[0];
    };
    DOMElement.prototype.addChild = function (displayObject) {
        _super.prototype.addChild.call(this, displayObject);
        if (!displayObject.isCreated) {
            displayObject.createChildren();
            displayObject.isCreated = true;
        }
        displayObject.layoutChildren();
        this.$el.append(displayObject.$el);
        return this;
    };
    DOMElement.prototype.addChildAt = function (displayObject, displayIndex) {
        var children = this.$el.children();
        var length = children.length;
        if (displayIndex < 0 || displayIndex >= length) {
            this.addChild(displayObject);
        } else {
            displayObject.parent = this;
            if (!displayObject.isCreated) {
                displayObject.createChildren();
                displayObject.isCreated = true;
            }
            displayObject.layoutChildren();
            jQuery(children.get(displayIndex)).before(displayObject.$el);
            _super.prototype.addChildAt.call(this, displayObject, displayIndex);
        }
        return this;
    };
    DOMElement.prototype.getChild = function (selector) {
        var jQueryElement = this.$el.find(selector);
        if (jQueryElement.length == 0) {
            throw new Error('[DOMElement] getChild("' + selector + '") Cannot find DOM $el');
        }
        for(var index in this.children) {
            var displayObject = this.children[index];
            if (jQueryElement.is(displayObject.$el)) {
                return displayObject;
            }
        }
        var domElement = new DOMElement();
        domElement.$el = jQueryElement;
        domElement.el = jQueryElement[0];
        return domElement;
    };
    DOMElement.prototype.removeChild = function (displayObject) {
        displayObject.enabled(false);
        displayObject.$el.unbind();
        displayObject.$el.remove();
        _super.prototype.removeChild.call(this, displayObject);
        return this;
    };
    DOMElement.prototype.removeChildren = function () {
        _super.prototype.removeChildren.call(this);
        this.$el.empty();
        return this;
    };
    DOMElement.prototype.enabled = function (value) {
        if (value == this.isEnabled) {
            return;
        }
        if (value) {
        } else {
        }
        _super.prototype.enabled.call(this, value);
    };
    DOMElement.prototype.invalidateLayout = function () {
        this.layoutChildren();
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
    function Stage(type) {
        _super.call(this, type);
        this._type = type;
        this.createChildren();
    }
    Stage.prototype.createChildren = function () {
        this.$el = jQuery(this._type);
    };
    return Stage;
})(DOMElement);
var MouseEventType = (function () {
    function MouseEventType() { }
    MouseEventType.CLICK = "click";
    MouseEventType.DBL_CLICK = "dblclick";
    MouseEventType.MOUSE_DOWN = "mousedown";
    MouseEventType.MOUSE_MOVE = "mousemove";
    MouseEventType.MOUSE_OVER = "mouseover";
    MouseEventType.MOUSE_OUT = "mouseout";
    MouseEventType.MOUSE_UP = "mouseup";
    return MouseEventType;
})();
var RequestEvent = (function (_super) {
    __extends(RequestEvent, _super);
    function RequestEvent(type, data) {
        if (typeof data === "undefined") { data = null; }
        _super.call(this, type, data);
        this.CLASS_NAME = 'RequestEvent';
    }
    RequestEvent.SUCCESS = "RequestEvent.success";
    RequestEvent.ERROR = "RequestEvent.error";
    return RequestEvent;
})(BaseEvent);
var TemplateFactory = (function () {
    function TemplateFactory() {
    }
    TemplateFactory.createTemplate = function createTemplate(templatePath, data) {
        var template = TemplateFactory.create(templatePath, data);
        return jQuery(template);
    };
    TemplateFactory.createView = function createView(templatePath, data) {
        var template = TemplateFactory.create(templatePath, data);
        var view = new DOMElement();
        view.$el = jQuery(template);
        return view;
    };
    TemplateFactory.create = function create(templatePath, data) {
        var regex = /^([.#])(.+)/;
        var template;
        var isClassOrIdName = regex.test(templatePath);
        if (isClassOrIdName) {
            var templateMethod = _.template($(templatePath).html());
            template = templateMethod(data);
        } else {
            template = window['JST'][templatePath](data);
        }
        return template;
    };
    return TemplateFactory;
})();
var WindowFilmBootstrap = (function (_super) {
    __extends(WindowFilmBootstrap, _super);
    function WindowFilmBootstrap() {
        _super.call(this, '.js-todo');
    }
    WindowFilmBootstrap.BASE_PATH = 'images/';
    WindowFilmBootstrap.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    WindowFilmBootstrap.prototype.enabled = function (value) {
        if (value == this.isEnabled) {
            return;
        }
        if (value) {
        } else {
        }
        _super.prototype.enabled.call(this, value);
    };
    return WindowFilmBootstrap;
})(Stage);
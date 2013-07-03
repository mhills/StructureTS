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
    BaseEvent.CHANGE = "BaseEvent.change";
    BaseEvent.COMPLETE = "BaseEvent.complete";
    BaseEvent.ENTER_FRAME = "BaseEvent.enterFrame";
    return BaseEvent;
})();
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.CLASS_NAME = 'EventDispatcher';
        this.parent = null;
        this._listeners = [];
        this.cid = _.uniqueId();
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
                if (event.isImmediatePropagationStopped == false)
                    break;
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
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
        this.numChildren = 0;
        this.children = [];
    }
    DisplayObject.prototype.createChildren = function () {
    };

    DisplayObject.prototype.addChild = function (displayObject) {
        if (displayObject.parent) {
            displayObject.parent.removeChild(displayObject);
        }

        this.children.unshift(displayObject);
        this.numChildren = this.children.length;

        displayObject.parent = this;

        return this;
    };

    DisplayObject.prototype.removeChild = function (displayObject) {
        var index = this.children.indexOf(displayObject);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        displayObject.enabled(false);
        displayObject.parent = null;

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

    DisplayObject.prototype.addChildAt = function (displayObject, displayIndex) {
        this.children.unshift(displayObject);

        this.numChildren = this.children.length;

        return this;
    };

    DisplayObject.prototype.getChild = function (displayObject) {
        var index = this.children.indexOf(displayObject);

        return this.children[index];
    };

    DisplayObject.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

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
    DOMElement.prototype.createChildren = function (jaml) {
        if (jaml) {
            Jaml.register(this.CLASS_NAME, jaml);
            this.$el = jQuery(Jaml.render(this.CLASS_NAME, this._options));
        } else if (this._node && !this.$el) {
            this.$el = jQuery("<" + this._node + "/>", this._options);
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

        displayObject.$el.attr('data-cid', displayObject.cid);

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

                _super.prototype.addChild.call(this, domElement);
            }
        }

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
        _super.call(this);

        this.$el = jQuery(type);
        this.createChildren();
    }
    return Stage;
})(DOMElement);
var MouseEventType = (function () {
    function MouseEventType() {
    }
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
            if (!window[TemplateFactory.templateNamespace]) {
                throw new ReferenceError('[TemplateFactory] Make sure the TemplateFactory.templateNamespace value is correct. Currently the value is ' + TemplateFactory.templateNamespace);
            }

            template = window[TemplateFactory.templateNamespace][templatePath](data);
        }

        return template;
    };
    TemplateFactory.templateNamespace = 'TEMPLATES';
    return TemplateFactory;
})();
var TopNavigationView = (function (_super) {
    __extends(TopNavigationView, _super);
    function TopNavigationView() {
        _super.call(this);
        this.CLASS_NAME = 'TopNavigationView';
    }
    TopNavigationView.prototype.createChildren = function () {
        this.$el = TemplateFactory.createTemplate('templates/topbar/TopNavigationTemplate.tpl');
        this.el = this.$el[0];
    };
    return TopNavigationView;
})(DOMElement);
var SelectBoxTemp = (function (_super) {
    __extends(SelectBoxTemp, _super);
    function SelectBoxTemp() {
        _super.call(this);
        this.CLASS_NAME = 'SelectBoxTemp';

        this._options = {
            car: "red"
        };
    }
    SelectBoxTemp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, function (data) {
            select(option({ value: 'en' }, 'English'), option({ value: 'fr' }, data.car), option({ value: 'sp' }, 'Spanish'));
        });
    };
    return SelectBoxTemp;
})(DOMElement);
var WindowFilmApp = (function (_super) {
    __extends(WindowFilmApp, _super);
    function WindowFilmApp(selector) {
        _super.call(this, selector);
    }
    WindowFilmApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._topBar = new TopNavigationView();
        this.addChild(this._topBar);

        var did = TemplateFactory.createView('templates/topbar/TopNavigationTemplate.tpl');

        this._contentContainer = new DOMElement('div', { id: 'content-container' });
        this.addChild(this._contentContainer);

        this._selectBoxTemp = new SelectBoxTemp();
        this._contentContainer.addChild(this._selectBoxTemp);
    };

    WindowFilmApp.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        this._topBar.enabled(value);

        _super.prototype.enabled.call(this, value);
    };
    WindowFilmApp.BASE_PATH = 'images/';
    return WindowFilmApp;
})(Stage);

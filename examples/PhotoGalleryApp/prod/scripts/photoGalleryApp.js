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
        child.enabled(false);
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

    DisplayObject.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    };

    DisplayObject.prototype.layoutChildren = function () {
    };

    DisplayObject.prototype.destroy = function () {
        this.enabled(false);
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
    TemplateFactory.templateNamespace = 'TEMPLATES';
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
    DOMElement.prototype.createChildren = function (template) {
        if (typeof template === 'function') {
            Jaml.register(this.CLASS_NAME, template);
            this.$el = jQuery(Jaml.render(this.CLASS_NAME, this._options));
        } else if (typeof template === 'string') {
            this.$el = TemplateFactory.createTemplate(template);
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
        child.enabled(false);
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

    DOMElement.prototype.enabled = function (value) {
        if (value == this.isEnabled) {
            return;
        }

        if (value) {
        } else {
        }

        _super.prototype.enabled.call(this, value);
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
var PhotoGalleryApp = (function (_super) {
    __extends(PhotoGalleryApp, _super);
    function PhotoGalleryApp(selector) {
        _super.call(this, selector);
    }
    PhotoGalleryApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        var thumbnails = this.getChild('.gallery-thumbnails');
        var images = thumbnails.getChildren();
        console.log(thumbnails.numChildren);
        console.log(images);
    };

    PhotoGalleryApp.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        _super.prototype.enabled.call(this, value);
    };
    return PhotoGalleryApp;
})(Stage);

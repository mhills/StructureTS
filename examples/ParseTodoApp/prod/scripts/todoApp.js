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
var BaseEvent = (function () {
    function BaseEvent(type, bubbles, cancelable, data) {
        if (typeof bubbles === "undefined") { bubbles = false; }
        if (typeof cancelable === "undefined") { cancelable = false; }
        if (typeof data === "undefined") { data = null; }
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

    DisplayObject.prototype.getChild = function (child) {
        var index = this.children.indexOf(child);

        return this.children[index];
    };

    DisplayObject.prototype.getChildAt = function (index) {
        return this.children[index];
    };

    DisplayObject.prototype.setSize = function (unscaledWidth, unscaledHeight) {
        this.unscaledWidth = unscaledWidth;
        this.unscaledHeight = unscaledHeight;
        this.layoutChildren();

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

    DOMElement.prototype.getChild = function (selector) {
        var domElement = null;

        if (typeof selector === 'number') {
            domElement = _.find(this.children, function (domElement) {
                return domElement.cid == selector;
            });
        } else {
            var jQueryElement = this.$el.find(selector).first();
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

    DOMElement.prototype.getChildAt = function (index) {
        return _super.prototype.getChildAt.call(this, index);
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

        return this;
    };
    return Stage;
})(DOMElement);
var MouseEventType = (function () {
    function MouseEventType() {
    }
    MouseEventType.CLASS_NAME = 'MouseEventType';

    MouseEventType.CLICK = "click";

    MouseEventType.DBL_CLICK = "dblclick";

    MouseEventType.MOUSE_DOWN = "mousedown";

    MouseEventType.MOUSE_MOVE = "mousemove";

    MouseEventType.MOUSE_OVER = "mouseover";

    MouseEventType.MOUSE_OUT = "mouseout";

    MouseEventType.MOUSE_UP = "mouseup";
    return MouseEventType;
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

        return this;
    };

    TodoApp.prototype.enable = function () {
        var _this = this;
        if (this.isEnabled === true)
            return this;

        this._submitBtn.el.addEventListener(MouseEventType.CLICK, function (event) {
            return _this.onSubmitButton(event);
        }, false);

        this._incompleteItemList.$el.on(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this));

        this._appModel.addEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved, this);
        this._appModel.addEventListener(ListItemEvent.ADD_SUCCESS, this.onAddItemSuccess, this);
        this._appModel.addEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess, this);

        _super.prototype.enable.call(this);
        return this;
    };

    TodoApp.prototype.disable = function () {
        var _this = this;
        if (this.isEnabled === false)
            return this;

        this._submitBtn.el.removeEventListener(MouseEventType.CLICK, function (event) {
            return _this.onSubmitButton(event);
        }, false);

        this._incompleteItemList.$el.off(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this));

        this._appModel.removeEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved, this);
        this._appModel.removeEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess, this);

        _super.prototype.disable.call(this);
        return this;
    };

    TodoApp.prototype.onSubmitButton = function (event) {
        var text = this._input.$el.val();

        this._appModel.addListItem(text);
    };

    TodoApp.prototype.onTodoSelected = function (event) {
        var $element = $(event.currentTarget);

        var cid = $element.data('cid');
        var domElement = this._incompleteItemList.getChild(cid);
        var id = domElement.$el.children('input').data('id');

        this._appModel.markItemComplete(id);
        this._incompleteItemList.removeChild(domElement);
    };

    TodoApp.prototype.onRemoveItemSuccess = function (event) {
        if (this._incompleteItemList.numChildren <= 0) {
            this._incompleteItemList.addChild(this._noTasksMessage);
        }
    };

    TodoApp.prototype.onAddItemSuccess = function (event) {
        this._input.$el.val('').focus();

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

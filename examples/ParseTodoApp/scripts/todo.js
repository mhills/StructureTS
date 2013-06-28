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
        var index = this.children.indexOf(displayObject);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        displayObject.enabled(false);
        displayObject.parent = null;

        return this;
    };

    DisplayObject.prototype.removeChildren = function () {
        while (this.children.length > 0) {
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

        for (var index in this.children) {
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
        if (value == this.isEnabled)
            return;

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
            template = window['JST'][templatePath](data);
        }

        return template;
    };
    return TemplateFactory;
})();
var ListItemEvent = (function (_super) {
    __extends(ListItemEvent, _super);
    function ListItemEvent(type, data) {
        if (typeof data === "undefined") { data = null; }
        _super.call(this, type, data);
        this.CLASS_NAME = 'ListItemEvent';
    }
    ListItemEvent.LIST_SUCCESS = "ListItemEvent.listSuccess";
    ListItemEvent.ADD_SUCCESS = "ListItemEvent.addSuccess";
    ListItemEvent.REMOVE_SUCCESS = "ListItemEvent.removeSuccess";
    return ListItemEvent;
})(BaseEvent);
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
var ValueObject = (function () {
    function ValueObject() {
        this.CLASS_NAME = 'ValueObject';
    }
    ValueObject.prototype.toJsonString = function () {
        return JSON.stringify(this);
    };

    ValueObject.prototype.toJSON = function () {
        return JSON.parse(JSON.stringify(this));
    };

    ValueObject.prototype.clone = function () {
    };

    ValueObject.prototype.copy = function (data) {
        for (var key in this) {
            if (key !== 'id' && this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    };

    ValueObject.prototype.set = function (prop, value) {
        if (!prop)
            throw new Error('You must pass a argument into the set method.');

        if (typeof (prop) === "object") {
            for (var key in prop) {
                this[key] = prop[key];
            }
        } else if (typeof (prop) === "string") {
            this[prop] = value;
        }

        console.log("Event.change, todo: make it dispatch event?");
        return this;
    };

    ValueObject.prototype.get = function (prop) {
        if (!prop)
            return this;
        return this[prop];
    };

    ValueObject.prototype.getQualifiedClassName = function () {
        return this.CLASS_NAME;
    };
    return ValueObject;
})();
var ListItemVO = (function (_super) {
    __extends(ListItemVO, _super);
    function ListItemVO() {
        _super.call(this);
        this.CLASS_NAME = 'ListItemVO';
        this.content = null;
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

        this.dispatchEvent(new ListItemEvent(ListItemEvent.REMOVE_SUCCESS, listItemVO));
    };

    AppModel.prototype.onItemAddSuccess = function (item) {
        var listItemVO = new ListItemVO();
        listItemVO.id = item.id;
        listItemVO.content = item.get('content');
        listItemVO.isComplete = item.get('isComplete');

        this.dispatchEvent(new ListItemEvent(ListItemEvent.ADD_SUCCESS, listItemVO));
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

        this.dispatchEvent(new ListItemEvent(ListItemEvent.LIST_SUCCESS, list));
        this._query = null;
    };

    AppModel.prototype.onParseError = function (error) {
        alert('onParseError: ' + error.code + ' ' + error.message);
    };
    return AppModel;
})(EventDispatcher);
var TodoBootstrap = (function (_super) {
    __extends(TodoBootstrap, _super);
    function TodoBootstrap() {
        _super.call(this, '.js-todo');
    }
    TodoBootstrap.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._appModel = new AppModel();

        this._submitBtn = this.getChild('#js-submit-button');
        this._noTasksMessage = this.getChild('#js-none-message');
        this._incompleteItemList = this.getChild('#js-incomplete-items');
        this._input = this.getChild('#js-todo-input');
        this._completeItemList = this.getChild('#js-submit-button');

        this.updateItemList();
    };

    TodoBootstrap.prototype.enabled = function (value) {
        var _this = this;
        if (value == this.isEnabled)
            return;

        if (value) {
            this._submitBtn.el.addEventListener(MouseEventType.CLICK, function (event) {
                return _this.onSubmitButton(event);
            }, false);

            this._incompleteItemList.$el.on(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this));

            this._appModel.addEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved, this);
            this._appModel.addEventListener(ListItemEvent.ADD_SUCCESS, this.onAddItemSuccess, this);
            this._appModel.addEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess, this);
        } else {
            this._submitBtn.el.removeEventListener(MouseEventType.CLICK, function (event) {
                return _this.onSubmitButton(event);
            }, false);

            this._incompleteItemList.$el.off(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this));

            this._appModel.removeEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved);
            this._appModel.removeEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess);
        }

        _super.prototype.enabled.call(this, value);
    };

    TodoBootstrap.prototype.onSubmitButton = function (event) {
        var text = this._input.$el.val();

        this._appModel.addListItem(text);
    };

    TodoBootstrap.prototype.onTodoSelected = function (event) {
        this._$selectedItem = $(event.currentTarget);

        var id = this._$selectedItem.children('input').data('id');
        this._appModel.markItemComplete(id);
    };

    TodoBootstrap.prototype.onRemoveItemSuccess = function (event) {
        var removedListItem = event.data;
        console.log("onRemoveItemSuccess", event);
        this._$selectedItem.remove();
        this._$selectedItem = null;
    };

    TodoBootstrap.prototype.onAddItemSuccess = function (event) {
        this._input.$el.val('').focus();

        this.updateItemList();
    };

    TodoBootstrap.prototype.updateItemList = function () {
        this._appModel.getListItems();
    };

    TodoBootstrap.prototype.onListRecieved = function (event) {
        var listItems = event.data;

        this._incompleteItemList.removeChildren();

        if (listItems.length > 0) {
            this._noTasksMessage.$el.addClass('hidden');
        }

        _.each(listItems, function (item) {
            var view = TemplateFactory.createView('#todo-items-template', {
                id: item.id,
                content: item.content,
                isComplete: item.isComplete
            });

            this._incompleteItemList.addChild(view);
        }.bind(this));
    };
    return TodoBootstrap;
})(Stage);

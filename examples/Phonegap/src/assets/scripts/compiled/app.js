var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var codeBelt;
(function (codeBelt) {
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
    codeBelt.TodoItemVO = TodoItemVO;
})(codeBelt || (codeBelt = {}));
var codeBelt;
(function (codeBelt) {
    var LocalStorageController = StructureTS.LocalStorageController;

    var TodoCollection = (function (_super) {
        __extends(TodoCollection, _super);
        function TodoCollection() {
            _super.call(this);
            this.CLASS_NAME = 'TodoCollection';
            this._localStorage = null;

            var vo = new codeBelt.TodoItemVO();

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

        TodoCollection.prototype.removeItem = function (item, silent) {
            if (typeof silent === "undefined") { silent = false; }
            _super.prototype.removeItem.call(this, item, silent);

            this._localStorage.removeItem(item.id, true);
        };

        TodoCollection.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._localStorage.destroy();
            this._localStorage = null;
        };

        TodoCollection.prototype.saveItem = function (item) {
            this._localStorage.addItem(item.id, item, true);
        };

        TodoCollection.prototype.getItemsFromLocalStorage = function () {
            var items = this._localStorage.getItemsWithNamespace();
            var itemsLength = items.length;
            var todoItemVO;

            for (var i = 0; i < itemsLength; i++) {
                todoItemVO = new codeBelt.TodoItemVO(items[i].value);
                _super.prototype.addItem.call(this, todoItemVO, true);
            }
        };
        return TodoCollection;
    })(Collection);
    codeBelt.TodoCollection = TodoCollection;
})(codeBelt || (codeBelt = {}));
var codeBelt;
(function (codeBelt) {
    var DOMElement = StructureTS.DOMElement;
    var StringUtil = StructureTS.StringUtil;

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

            this._todoCollection = new codeBelt.TodoCollection();

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
            this._todoContainer.$element.addEventListener('change', 'input[type=text]', this.todoItemHandler, this);

            _super.prototype.enable.call(this);
        };

        ZombieApp.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            this._$todoButton.removeEventListener('click', this.addTodoHandler, this);
            this._$removeTasksButton.removeEventListener('click', this.removeTasksHandler, this);

            this._todoContainer.$element.removeEventListener('click', 'input', this.todoItemHandler, this);
            this._todoContainer.$element.removeEventListener('change', 'input[type=text]', this.todoItemHandler, this);

            _super.prototype.disable.call(this);
        };

        ZombieApp.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._$todoButton = null;
            this._$removeTasksButton = null;

            this._todoContainer.destroy();
            this._todoContainer = null;

            this._todoCollection.destroy();
            this._todoCollection = null;
        };

        ZombieApp.prototype.onDeviceReady = function (event) {
            console.log('Received Event: ' + 'deviceready');
        };

        ZombieApp.prototype.addTodoHandler = function (event) {
            var todoText = prompt('Enter Todo:', '');
            if (todoText != null && todoText !== '') {
                this.addTodo(todoText);
            }
        };

        ZombieApp.prototype.removeTasksHandler = function (event) {
            var completedItems = this._todoContainer.$element.find('.completed');
            var length = completedItems.length;

            var $todo;
            var todoItemId;
            var todoItemCid;
            for (var i = 0; i < length; i++) {
                $todo = $(completedItems[i]);
                todoItemId = $todo.data('id');
                todoItemCid = $todo.data('cid');

                this.deleteTodo(todoItemId, todoItemCid);
            }
        };

        ZombieApp.prototype.addTodoView = function (todoVO) {
            var todoItem = new DOMElement('templates/TodoItemTemplate.hbs', todoVO);
            this._todoContainer.addChild(todoItem);
        };

        ZombieApp.prototype.addTodo = function (todoText) {
            var todoVO = new codeBelt.TodoItemVO();
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
            switch (className) {
                case 'checkbox':
                    $parentContainer.toggleClass('completed');
                    var isChecked = $currentTarget.prop('checked');
                    this.checkboxClicked(todoItemId, isChecked);
                    break;
                case 'textbox':
                    this.todoChangeHandler(todoItemId, $currentTarget.val());
                    break;
                case 'viewButton':
                    this.viewTodo(todoItemId);
                    break;
                case 'deleteButton':
                    this.deleteTodo(todoItemId, todoItemCid);
                    break;
                default:
            }
        };

        ZombieApp.prototype.deleteTodo = function (voId, cid) {
            var child = this._todoContainer.getChildByCid(cid);
            var vo = this._todoCollection.find({ id: voId })[0];

            this._todoCollection.removeItem(vo);
            this._todoContainer.removeChild(child);
        };

        ZombieApp.prototype.todoChangeHandler = function (voId, newText) {
            var vo = this._todoCollection.find({ id: voId })[0];
            vo.text = newText;

            this._todoCollection.saveItem(vo);
        };

        ZombieApp.prototype.checkboxClicked = function (voId, isChecked) {
            var vo = this._todoCollection.find({ id: voId })[0];
            vo.completed = isChecked;

            this._todoCollection.saveItem(vo);
        };

        ZombieApp.prototype.viewTodo = function (voId) {
            var vo = this._todoCollection.find({ id: voId })[0];
            alert(vo.text);
        };
        return ZombieApp;
    })(Stage);
    codeBelt.ZombieApp = ZombieApp;
})(codeBelt || (codeBelt = {}));
//# sourceMappingURL=app.js.map

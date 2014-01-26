///<reference path='../../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/util/StringUtil.ts'/>

///<reference path='model/vo/TodoItemVO.ts'/>
///<reference path='model/TodoCollection.ts'/>


module codeBelt
{
    import Stage = StructureTS.Stage;
    import DOMElement = StructureTS.DOMElement;
    import StringUtil = StructureTS.StringUtil;

    export class ZombieApp extends Stage
    {
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'ZombieApp';

        private _$todoButton:JQuery = null;
        private _$removeTasksButton:JQuery = null;
        private _todoContainer:DOMElement = null;
        private _todoCollection:TodoCollection = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden Stage.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            this._todoCollection = new TodoCollection();

            var backgroundAndButtons:DOMElement = new DOMElement('templates/MainTemplate.hbs');
            this.addChild(backgroundAndButtons);

            this._$todoButton = this.$element.find('#js-addTodoButton');
            this._$removeTasksButton = this.$element.find('#js-removeTasksButton');

            this._todoContainer = this.getChild('#js-todoContainer');

            // Add all the todoItems that where stored in local storage.
            for (var i:number = 0; i < this._todoCollection.length; i++)
            {
                var vo:TodoItemVO = <TodoItemVO>this._todoCollection.getItemByIndex(i);
                this.addTodoView(vo);
            }
        }

        /**
         * @overridden Stage.layoutChildren
         */
        public layoutChildren():void
        {

        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

            this._$todoButton.addEventListener('click', this.addTodoHandler, this);
            this._$removeTasksButton.addEventListener('click', this.removeTasksHandler, this);

            this._todoContainer.$element.addEventListener('click', 'input', this.todoItemHandler, this);
            this._todoContainer.$element.addEventListener('change', 'input[type=text]', this.todoItemHandler, this);

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._$todoButton.removeEventListener('click', this.addTodoHandler, this);
            this._$removeTasksButton.removeEventListener('click', this.removeTasksHandler, this);

            this._todoContainer.$element.removeEventListener('click', 'input', this.todoItemHandler, this);
            this._todoContainer.$element.removeEventListener('change', 'input[type=text]', this.todoItemHandler, this);

            super.disable();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._$todoButton = null;
            this._$removeTasksButton = null;

            this._todoContainer.destroy();
            this._todoContainer = null;

            this._todoCollection.destroy();
            this._todoCollection = null;
        }

        private onDeviceReady(event:Event)
        {
            console.log('Received Event: ' + 'deviceready');
        }

        private addTodoHandler(event:JQueryEventObject)
        {
            //Prompt the user to enter To-Do
            var todoText:string = prompt('Enter Todo:', '');
            if (todoText != null && todoText !== '')
            {
                this.addTodo(todoText);
            }
        }

        private removeTasksHandler(event:JQueryEventObject)
        {
            var completedItems:JQuery = this._todoContainer.$element.find('.completed');
            var length:number = completedItems.length;

            var $todo:JQuery;
            var todoItemId:string;
            var todoItemCid:number;
            for (var i:number = 0; i < length; i++)
            {
                $todo = $(completedItems[i]);
                todoItemId = $todo.data('id');
                todoItemCid = $todo.data('cid');

                this.deleteTodo(todoItemId, todoItemCid);
            }
        }

        private addTodoView(todoVO:TodoItemVO):void
        {
            var todoItem:DOMElement = new DOMElement('templates/TodoItemTemplate.hbs', todoVO);
            this._todoContainer.addChild(todoItem);
        }

        private addTodo(todoText:string)
        {
            var todoVO:TodoItemVO = new TodoItemVO();
            todoVO.id = StringUtil.createUUID();
            todoVO.text = todoText;

            this._todoCollection.addItem(todoVO);
            this.addTodoView(todoVO);
        }

        private todoItemHandler(event:JQueryEventObject)
        {
            var $currentTarget:JQuery = $(event.currentTarget);
            var $parentContainer:JQuery = $currentTarget.parents('tr');

            var todoItemId:string = $parentContainer.data('id');
            var todoItemCid:number = $parentContainer.data('cid');

            var className:string = $currentTarget.attr("class");
            switch (className)
            {
                case 'checkbox':
                    $parentContainer.toggleClass('completed');
                    var isChecked:boolean = $currentTarget.prop('checked');
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
        }

        private deleteTodo(voId:string, cid:number):void
        {
            var child:DOMElement = <DOMElement>this._todoContainer.getChildByCid(cid);
            var vo:TodoItemVO = <TodoItemVO>this._todoCollection.find({id: voId})[0];

            this._todoCollection.removeItem(vo);
            this._todoContainer.removeChild(child);
        }

        private todoChangeHandler(voId:string, newText:string)
        {
            var vo:TodoItemVO = <TodoItemVO>this._todoCollection.find({id: voId})[0];
            vo.text = newText;

            this._todoCollection.saveItem(vo);
        }

        private checkboxClicked(voId:string, isChecked:boolean)
        {
            var vo:TodoItemVO = <TodoItemVO>this._todoCollection.find({id: voId})[0];
            vo.completed = isChecked;

            this._todoCollection.saveItem(vo);
        }

        private viewTodo(voId:string)
        {
            var vo:TodoItemVO = <TodoItemVO>this._todoCollection.find({id: voId})[0];
            alert(vo.text);
        }

    }
}
///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/util/StringUtil.ts'/>

///<reference path='model/vo/TodoItemVO.ts'/>
///<reference path='model/TodoCollection.ts'/>

class ZombieApp extends Stage {

    /**
     * @overridden Stage.CLASS_NAME
     */
    public CLASS_NAME:string = 'ZombieApp';

    private _$todoButton:JQuery = null;
    private _$removeTasksButton:JQuery = null;
    private _todoContainer:DOMElement = null;
    private _todoCollection:TodoCollection = null;

    constructor() {
        super();
    }

    /**
     * @overridden Stage.createChildren
     */
    public createChildren():void {
        super.createChildren();

        this._todoCollection = new TodoCollection();

        var backgroundAndButtons:DOMElement = new DOMElement('templates/MainTemplate.hbs');
        this.addChild(backgroundAndButtons);

        this._$todoButton = this.$element.find('#js-addTodoButton');
        this._$removeTasksButton = this.$element.find('#js-removeTasksButton');

        this._todoContainer = this.getChild('#js-todoContainer');

        // Add all the todoItems that where stored in local storage.
        for (var i:number = 0; i < this._todoCollection.length; i++) {
            var vo:TodoItemVO = <TodoItemVO>this._todoCollection.getItemByIndex(i);
            this.addTodoView(vo);
        }
    }

    /**
     * @overridden Stage.layoutChildren
     */
    public layoutChildren():void {


    }

    /**
     * @overridden Stage.enable
     */
    public enable():void {
        if (this.isEnabled === true) return;

        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        this._$todoButton.addEventListener('click', this.addTodoHandler, this);
        this._$removeTasksButton.addEventListener('click', this.removeTasksHandler, this);

        this._todoContainer.$element.addEventListener('click', 'input', this.todoItemHandler, this);
//        this._todoContainer.$element.addEventListener('change', 'input[type=text]', this.todoChangeHandler, this);

        super.enable();
    }

    /**
     * @overridden Stage.disable
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this._$todoButton.removeEventListener('click', this.addTodoHandler, this);
        this._$removeTasksButton.removeEventListener('click', this.removeTasksHandler, this);

        this._todoContainer.$element.removeEventListener('click', 'input', this.todoItemHandler, this);
//        this._todoContainer.$element.removeEventListener('change', 'input[type=text]', this.todoChangeHandler, this);

        super.disable();
    }

    /**
     * @overridden Stage.destroy
     */
    public destroy():void {
        super.destroy();

    }

    private onDeviceReady(event:Event) {
        console.log('Received Event: ' + 'deviceready');
    }

    private addTodoHandler(event:JQueryEventObject) {
        var todoDictionary = {};

        //Prompt the user to enter To-Do
        var todoText:string = prompt("To-Do", "");
        if (todoText != null) {
            if (todoText == "") {
                alert("To-Do can't be empty!");
            }
            else {
                this.addTodo(todoText);
            }
        }
    }


    private removeTasksHandler(event:JQueryEventObject) {
        /*
         //Get current table
         var table = document.getElementById("dataTable");
         var rowCount = table.rows.length;

         //Loop through all rows
         for(var i=0; i<rowCount; i++)
         {
         //Delete row if checkbox is checked
         var row = table.rows[i];
         var chkbox = row.cells[0].childNodes[0];
         if(null != chkbox && true == chkbox.checked)
         {
         table.deleteRow(i);
         rowCount--;
         i--;
         }



         }

         //Save
         this.saveToDoList();
         alert("Completed Tasks Were Removed Successfully.");
         */

    }

    private addTodoView(todoVO:TodoItemVO):void  {
        var todoItem:DOMElement = new DOMElement('templates/TodoItemTemplate.hbs', todoVO);
        this._todoContainer.addChild(todoItem);
    }


    //Add a row to the table
//    var rowID = 0;
    private addTodo(todoText:string) {
        var todoVO:TodoItemVO = new TodoItemVO();
        todoVO.id = StringUtil.createUUID();
        todoVO.text = todoText;

        this._todoCollection.addItem(todoVO);
        this.addTodoView(todoVO);
    }

    private todoItemHandler(event:JQueryEventObject) {
        var $currentTarget:JQuery = $(event.currentTarget);
        var $parentContainer:JQuery = $currentTarget.parents('tr');

        var todoItemId:string = $parentContainer.data('id');
        var todoItemCid:number = $parentContainer.data('cid');

        var className:string = $currentTarget.attr("class");
        console.log("className", className);
        switch (className) {
            case 'checkbox':
                $parentContainer.toggleClass('completed');
                console.log("$currentTarget.next()", $parentContainer);

//                $currentTarget.toggleClass('completed');
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
    }

    private deleteTodo(voId:string, cid:number):void {
        var child:DOMElement = this._todoContainer.getChildByCid(cid);
//        var vo:TodoItemVO = this._todoCollection.find({id: voId})[0];

        this._todoCollection.removeItem(vo);
        this._todoContainer.removeChild(child);
    }

    private todoChangeHandler(event:JQueryEventObject) {
        console.log("todoChangeHandler");
    }

    private checkboxClicked() {
//        //Save
//        this.saveToDoList();
    }

    //Views textField's content of the selected row
    private viewSelectedRow(todoTextField) {
//        alert(todoTextField.value);
    }


    //Deletes current row
    private deleteSelectedRow(deleteButton) {
//        var p = deleteButton.parentNode.parentNode;
//        p.parentNode.removeChild(p);
//        this.saveToDoList();
    }

    private saveToDoList() {
//        //Create a todoArray
//        var todoArray = {};
//        var checkBoxState = 0;
//        var textValue = "";
//
//        //Get current table
//        var table = document.getElementById("dataTable");
//        var rowCount = table.rows.length;
//
//        if (rowCount != 0) {
//            //Loop through all rows
//            for (var i = 0; i < rowCount; i++) {
//                var row = table.rows[i];
//
//                //Add checkbox state
//                var chkbox = row.cells[0].childNodes[0];
//                if (null != chkbox && true == chkbox.checked) {
//                    checkBoxState = 1;
//                }
//                else {
//                    checkBoxState = 0;
//                }
//
//
//                //Add text data
//                var textbox = row.cells[1].childNodes[0];
//                textValue = textbox.value;
//
//                //Fill the array with check & text data
//                todoArray["row" + i] =
//                {
//                    check: checkBoxState,
//                    text: textValue
//                };
//
//            }
//        }
//        else {
//            todoArray = null;
//        }
//
//        //Use local storage to persist data
//        //We use JSON to preserve objects
//
//        window.localStorage.setItem("todoList", JSON.stringify(todoArray));
    }

    private loadToDoList() {

//        //Get the saved To-Do list array by JSON parsing localStorage
//        var theList = JSON.parse(window.localStorage.getItem("todoList"));
//
//
//        if (null == theList || theList == "null") {
//            this.deleteAllRows();
//        }
//        else {
//            var count = 0;
//            for (var obj in theList) {
//                count++;
//            }
//
//            //Clear table
//            this.deleteAllRows();
//            //Loop through all rows
//            for (var i = 0; i < count; i++) {
//                //Add row
//                this.addTodo(theList["row" + i], true);
//            }
//
//        }

    }

    private deleteAllRows() {
//        //Get current table
//        var table = document.getElementById("dataTable");
//        var rowCount = table.rows.length;
//
//        //Loop through all rows
//        for (var i = 0; i < rowCount; i++) {
//            //delete row
//            table.deleteRow(i);
//            rowCount--;
//            i--;
//        }
//
//        //Save
//        this.saveToDoList();
    }

}
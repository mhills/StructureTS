///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/util/StringUtil.ts'/>

///<reference path='model/vo/TodoItemVO.ts'/>
///<reference path='model/TodoCollection.ts'/>

/**
 * YUIDoc_comment
 *
 * @class ZombieApp
 * @extends Stage
 * @constructor
 **/
class ZombieApp extends Stage {

    /**
     * @overridden Stage.CLASS_NAME
     */
    public CLASS_NAME:string = 'ZombieApp';

    /**
     * YUIDoc_comment
     *
     * @property _$todoButton
     * @type {JQuery}
     * @private
     */
    private _$todoButton:JQuery = null;

    /**
     * YUIDoc_comment
     *
     * @property _$removeTasksButton
     * @type {JQuery}
     * @private
     */
    private _$removeTasksButton:JQuery = null;

    /**
     * YUIDoc_comment
     *
     * @property _todoContainer
     * @type {DOMElement}
     * @private
     */
    private _todoContainer:DOMElement = null;

    /**
     * YUIDoc_comment
     *
     * @property _todoCollection
     * @type {TodoCollection}
     * @private
     */
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

        this._$todoButton.addEventListener('click', this.addTodo, this);
        this._$removeTasksButton.addEventListener('click', this.removeTasks, this);

        this._todoContainer.$element.addEventListener('click', 'input', this.todoItemHandler, this);
//        this._todoContainer.$element.addEventListener('change', 'input[type=text]', this.todoItemHandler, this);

        super.enable();
    }

    /**
     * @overridden Stage.disable
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this._$todoButton.removeEventListener('click', this.addTodo, this);
        this._$removeTasksButton.removeEventListener('click', this.removeTasks, this);

        this._todoContainer.$element.removeEventListener('click', 'input', this.todoItemHandler, this);

        super.disable();
    }

    /**
     * @overridden Stage.destroy
     */
    public destroy():void {
        super.destroy();

    }

    /**
     * YUIDoc_comment
     *
     * @method onDeviceReady
     * @private
     */
    private onDeviceReady(event:Event) {
        console.log('Received Event: ' + 'deviceready');
    }

    /**
     * YUIDoc_comment
     *
     * @method addTodo
     * @private
     */
    private addTodo(event:JQueryEventObject) {
        var todoDictionary = {};

        //Prompt the user to enter To-Do
        var todoText:string = prompt("To-Do", "");
        if (todoText != null) {
            if (todoText == "") {
                alert("To-Do can't be empty!");
            }
            else {
                this.addTableRow(todoText, false);
            }
        }
    }


    /**
     * YUIDoc_comment
     *
     * @method removeTasks
     * @private
     */
    private removeTasks(event:JQueryEventObject) {
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


    //Add a row to the table
//    var rowID = 0;
    private addTableRow(todoText, appIsLoading) {
        var todoVO:TodoItemVO = new TodoItemVO();
        todoVO.id = StringUtil.createUUID();
        todoVO.text = todoText;

        this._todoCollection.addItem(todoVO);

        var todoItem:DOMElement = new DOMElement('templates/TodoItemTemplate.hbs', todoVO);
        this._todoContainer.addChild(todoItem);




console.log("this._todoCollection", this._todoCollection.items);

//        rowID +=1;
//        var table = document.getElementById("dataTable");
//        var rowCount = table.rows.length;
//        var row = table.insertRow(rowCount);
//
//        //Set up the CheckBox
//        var cell1 = row.insertCell(0);
//        var element1 = document.createElement("input");
//        element1.type = "checkbox";
//        element1.name="chkbox[]";
//        element1.checked = todoDictionary["check"];
//        element1.setAttribute("onclick","checkboxClicked()");
//        element1.className = "checkbox";
//        cell1.appendChild(element1);
//
//        //Set up the TextBox
//        var cell2 = row.insertCell(1);
//        var element2 = document.createElement("input");
//        element2.type = "text";
//        element2.name = "txtbox[]";
//        element2.size = 16;
//        element2.id = "text"+rowID;
//        element2.value = todoDictionary["text"];
//        element2.setAttribute("onchange","saveToDoList()");
//        element2.className = "textbox";
//        cell2.appendChild(element2);
//
//        //Set up the View Button
//        var cell3 = row.insertCell(2);
//        var element3 = document.createElement("input");
//        element3.type = "button";
//        element3.id = rowID;
//        element3.setAttribute("onclick","viewSelectedRow(document.getElementById('text'+this.id))");
//        element3.className = "viewButton";
//        cell3.appendChild(element3);
//
//        //Set up the Delete Button
//        var cell4 = row.insertCell(3);
//        var element4 = document.createElement("input");
//        element4.type = "button";
//
//        element4.setAttribute("onclick","deleteSelectedRow(this)");
//        element4.className = "deleteButton";
//        cell4.appendChild(element4);
//
//        //Save & Update UI
//        checkboxClicked();
//        saveToDoList();
//
//        if (!appIsLoading)
//            alert("Task Added Successfully.");
    }

    /**
     * YUIDoc_comment
     *
     * @method todoItemHandler
     * @private
     */
    private todoItemHandler(event:JQueryEventObject) {
        var $currentTarget:JQuery = $(event.currentTarget);
        var $parentContainer:JQuery = $currentTarget.parents('tr');

        console.log($currentTarget)
        var className:string = $currentTarget.attr("class");
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
                break;
            default:
        }
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
//                this.addTableRow(theList["row" + i], true);
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
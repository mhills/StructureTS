///<reference path='_declare/parse.d.ts'/>
///<reference path='_declare/backbone.d.ts'/>

///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/native/MouseEvents.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/EventBroker.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/util/TemplateFactory.ts'/>

///<reference path='event/ListItemEvent.ts'/>
///<reference path='model/AppModel.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import Stage = StructureTS.Stage;
    import MouseEvents = StructureTS.MouseEvents;
    import EventBroker = StructureTS.EventBroker;
    import TemplateFactory = StructureTS.TemplateFactory;

    /**
     *
     * @class TodoApp
     * @extends Stage
     * @constructor
     **/
    export class TodoApp extends Stage
    {
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'TodoApp';

        private _appModel:AppModel = null;

        private _submitBtn:DOMElement = null;
        private _noTasksMessage:DOMElement = null;
        private _incompleteItemList:DOMElement = null;
        private _input:DOMElement = null;

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

            this._appModel = new AppModel();

            this._input = this.getChild('#js-todo-input');
            this._submitBtn = this.getChild('#js-submit-button');
            this._noTasksMessage = TemplateFactory.createView('#noTodoItemsTemplate');

            this._incompleteItemList = this.getChild('#js-incomplete-items');
            this._incompleteItemList.addChild(this._noTasksMessage);

            this.updateItemList();
        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this._submitBtn.$element.addEventListener(MouseEvents.CLICK, this.onSubmitButton, this);
            this._incompleteItemList.$element.addEventListener(MouseEvents.CLICK, '.list-item', this.onTodoSelected, this);

            this._appModel.addEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved, this);
            this._appModel.addEventListener(ListItemEvent.ADD_SUCCESS, this.onAddItemSuccess, this);
            this._appModel.addEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess, this);

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._submitBtn.$element.removeEventListener(MouseEvents.CLICK, this.onSubmitButton, this);
            this._incompleteItemList.$element.removeEventListener(MouseEvents.CLICK, '.list-item', this.onTodoSelected, this);

            this._appModel.removeEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved, this);
            this._appModel.removeEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess, this);

            super.disable();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._appModel.destroy();
            this._appModel = null;

            this._submitBtn.destroy();
            this._submitBtn = null;

            this._noTasksMessage.destroy();
            this._noTasksMessage = null;

            this._incompleteItemList.destroy();
            this._incompleteItemList = null;

            this._input.destroy();
            this._input = null;
        }

        private onSubmitButton(event:JQueryEventObject):void
        {
            var text:string = this._input.$element.val();

            this._appModel.addListItem(text);
        }

        private onTodoSelected(event:JQueryEventObject):void
        {
            var $element:JQuery = $(event.currentTarget);

            var cid:number = $element.data('cid');
            var domElement:DOMElement = this._incompleteItemList.getChildByCid(cid);
            var id:string = domElement.$element.children('input').data('id');

            this._appModel.markItemComplete(id);
            this._incompleteItemList.removeChild(domElement);
        }

        private onRemoveItemSuccess(event:ListItemEvent):void
        {
            if (this._incompleteItemList.numChildren <= 0)
            {
                this._incompleteItemList.addChild(this._noTasksMessage);
            }
        }

        private onAddItemSuccess(event:ListItemEvent):void
        {
            this._input.$element.val('')
                .focus();

            this.updateItemList();
        }

        /**
         * This method will be user to fetch the list items from the AppModel.
         *
         * @method getItemList
         * @return void
         * @private
         */
        private updateItemList():void
        {
            this._appModel.getListItems();
        }

        /**
         * This method will get a list of ListItemVO objects from the ListItemEvent data property to be used to create the list.
         * Fist it will remove all current children in the list and then add the new list items.
         *
         * @param event {ListItemEvent}
         * @method onListRecieved
         * @return void
         * @private
         */
        private onListRecieved(event:ListItemEvent):void
        {
            var listItems:ListItemVO[] = event.data;

            if (listItems.length > 0)
            {
                this._incompleteItemList.removeChildren();
            }

            _.each(listItems, function (item)
            {
                var view:DOMElement = TemplateFactory.createView('#todoItemsTemplate', {
                    id: item.id,
                    content: item.content,
                    isComplete: item.isComplete
                });

                this._incompleteItemList.addChild(view);
            }.bind(this));
        }

    }
}
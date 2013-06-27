///<reference path='../../../src/typescript/_declare/jquery.d.ts'/>
///<reference path='../../../src/typescript/_declare/underscore.d.ts'/>
///<reference path='../../../src/typescript/_declare/parse.d.ts'/>

///<reference path='../../../src/typescript/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../src/typescript/com/codebelt/display/Stage.ts'/>
///<reference path='../../../src/typescript/com/codebelt/events/MouseEventType.ts'/>
///<reference path='../../../src/typescript/com/codebelt/events/RequestEvent.ts'/>
///<reference path='../../../src/typescript/com/codebelt/utils/TemplateFactory.ts'/>
///<reference path='model/ListItemModel.ts'/>

class TodoBootstrap extends Stage
{
    public static BASE_PATH:string = 'images/';

    private APP_ID:string = '5tfOk1NPi4KxQwWDbGdaw0eY0GFKAnrp3upTzRo8';
    private REST_KEY:string = 'Tz2OgC9TZTEgGvMQhtk7IHQT6c46mBuCbF545Dgn';
    private JS_KEY:string = 'NM7u0mZxJbr41J9SrX3qGQA45BNmAnhMqLyw9UsR';

    private _query;
    private _submitBtn:DOMElement;
    private _noTasksMessage:DOMElement;
    private _incompleteItemList:DOMElement;
    private _completeItemList:DOMElement;
    private _input:DOMElement;
    private _listItem:ListItemModel;
    private _selectedItem:JQuery;

    constructor() {
        super('.js-todo');

        Parse.initialize(this.APP_ID, this.JS_KEY);
    }

    public createChildren():void {
        super.createChildren();

        this._submitBtn = this.getChild('#js-submit-button');
        this._noTasksMessage = this.getChild('#js-none-message');
        this._incompleteItemList = this.getChild('#js-incomplete-items');
        this._input = this.getChild('#js-todo-input');
        this._completeItemList = this.getChild('#js-submit-button');

        setTimeout(() => {
            this.updateList();
        }, 500)
    }

    public enabled(value:boolean):void {
        if (value == this.isEnabled) return;

        if (value) {
            this._submitBtn.el.addEventListener(MouseEventType.CLICK, (event:MouseEvent) => this.onSubmitButton(event), false);
//            this._submitBtn.$el.on(MouseEventType.CLICK, this.onSubmitButton.bind(this));
            this._incompleteItemList.$el.on(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this) );
        } else {
            this._submitBtn.el.removeEventListener(MouseEventType.CLICK, (event:MouseEvent) => this.onSubmitButton(event), false);
//            this._submitBtn.$el.off(MouseEventType.CLICK, this.onSubmitButton.bind(this));
            this._incompleteItemList.$el.off(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this));
        }

        super.enabled(value);
    }

    private onSubmitButton(event:MouseEvent):void {
        var text = this._input.$el.val();

        if (text != '') {
            this._listItem = new ListItemModel();
            this._listItem.addEventListener(RequestEvent.SUCCESS, this.onSuccess, this);
            this._listItem.set('content', text);
            this._listItem.set('isComplete', false);
            this._listItem.save();
        }
    }

    private onTodoSelected(event:JQueryEventObject):void {
        this._selectedItem = $(event.currentTarget);

        var id:number = this._selectedItem.children('input').data('id');

        this._query = new Parse.Query('ListItem');
        this._query.get(id, {
            success: this.onGetSuccess.bind(this),
            error: this.onParseError.bind(this)
        });
    }

    private onGetSuccess(item, element:JQuery):void {
        item.set('isComplete', true);
        item.save();

        this._selectedItem.remove();//TODO: what if item was a DOMElement is still a child of this view. Need a way to remove it. Maybe like backbones cid.
        this._selectedItem = null;
//                    if (incompleteItemList.all('li').size() >= 1) {
//                        noTasksMessage.removeClass('hidden');
//                    }
    }

    private onSuccess(event:RequestEvent):void {
        var listItem = event.data;

        this._listItem.removeEventListener(RequestEvent.SUCCESS, this.onSuccess);
        this._input.$el.val('')
            .focus();

        this.updateList();
    }

    private updateList():void {
        //Get 10 most recent incomplete Todos.
        var self = this;

        this._query = new Parse.Query('ListItem');
        this._query.equalTo('isComplete', false)
        this._query.limit(10);
        this._query.descending('createdAt');
        this._query.find({
            success: this.onQuerySuccess.bind(self),
            error: this.onParseError.bind(self)
        });
    }

    private onQuerySuccess(results:any[]):void {
        this._incompleteItemList.removeChildren();

        if (results.length > 0) {
            this._noTasksMessage.$el.addClass('hidden');
        }

        _.each(results, function(item, index, array) {
            var view:DOMElement = TemplateFactory.createView('#todo-items-template', {
                content: item.get('content'),
                id: item.id,
                isComplete: item.get('isComplete')
            });

            this._incompleteItemList.addChild(view);
        }.bind(this));

        this._query = null;
    }

    private onParseError(error):void {
        alert('onParseError: ' + error.code + ' ' + error.message);
    }

}
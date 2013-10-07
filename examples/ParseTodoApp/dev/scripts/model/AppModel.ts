///<reference path='../../../../../src/com/codebelt/structurets/event/EventDispatcher.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/RequestEvent.ts'/>
///<reference path='../event/ListItemEvent.ts'/>
///<reference path='valueobjects/ListItemVO.ts'/>

/**
 * The AppModel will be a proxy between Parse.com and the application.
 * The AppModel will create value objects from the return data.
 * The AppModel will also be the central point to get access to the value objects.
 *
 * @class AppModel
 * @extends EventDispatcher
 * @constructor
 **/
class AppModel extends EventDispatcher
{
    public CLASS_NAME:string = 'AppModel';

    private APP_ID:string = '5tfOk1NPi4KxQwWDbGdaw0eY0GFKAnrp3upTzRo8';
    private REST_KEY:string = 'Tz2OgC9TZTEgGvMQhtk7IHQT6c46mBuCbF545Dgn';
    private JS_KEY:string = 'NM7u0mZxJbr41J9SrX3qGQA45BNmAnhMqLyw9UsR';

    private LIST_ITEM:string = 'ListItem';

    private _query;

    constructor()
    {
        super();

        Parse.initialize(this.APP_ID, this.JS_KEY);
    }

    /**
     * Will make a query/api call for the "ListItem" items to Parse.com.
     * It will get the 10 most recent incomplete Todo items.
     *
     * @method getListItems
     * @public
     */
    public getListItems():void
    {
        this._query = new Parse.Query(this.LIST_ITEM);
        this._query.equalTo('isComplete', false);
        this._query.limit(10);
        this._query.descending('createdAt');
        this._query.find({
            success: this.onQuerySuccess.bind(this),
            error: this.onParseError.bind(this)
        });
    }

    /**
     *
     * @method addListItem
     * @param text {string}
     * @private
     */
    public addListItem(text:string):void
    {
        var ParseListItem = Parse.Object.extend("ListItem");
        var item = new ParseListItem();
        item.set('content', text);
        item.set('isComplete', false);
        item.save(null, {
            success: this.onItemAddSuccess.bind(this),
            error: this.onParseError.bind(this)
        });
    }

    /**
     *
     * @method markItemComplete
     * @param id {string}
     * @private
     */
    public markItemComplete(id:string):void
    {
        if (id == '') {
            throw new Error('[AppModel] The markItemComplete argument can not be an empty string.');
        }

        this._query = new Parse.Query(this.LIST_ITEM);
        this._query.get(id, {
            success: this.onGetSuccess.bind(this),
            error: this.onParseError.bind(this)
        });
    }

    /**
     *
     * @method onItemAddSuccess
     * @param item {Backbone.Model}
     * @private
     */
    private onGetSuccess(item:Backbone.Model):void {
        item.set('isComplete', true);
        item.save();

        var listItemVO = new ListItemVO();
        listItemVO.id = item.id;
        listItemVO.content = item.get('content');
        listItemVO.isComplete = item.get('isComplete');

        this.dispatchEvent(new ListItemEvent(ListItemEvent.REMOVE_SUCCESS, false, false, listItemVO));
    }

    /**
     *
     * @method onItemAddSuccess
     * @param item {Backbone.Model}
     * @private
     */
    private onItemAddSuccess(item:Backbone.Model)
    {
        var listItemVO = new ListItemVO();
        listItemVO.id = item.id;
        listItemVO.content = item.get('content');
        listItemVO.isComplete = item.get('isComplete');

        this.dispatchEvent(new ListItemEvent(ListItemEvent.ADD_SUCCESS, false, false, listItemVO));
    }

    /**
     *
     * @method onQuerySuccess
     * @param results {array}
     * @private
     */
    private onQuerySuccess(results:Backbone.Model[]):void
    {
        var listItem:ListItemVO;
        var list:ListItemVO[] = [];

        _.each(results, function(item) {
            listItem = new ListItemVO();
            listItem.id = item.id;
            listItem.content = item.get('content');
            listItem.isComplete = item.get('isComplete');

            list.push(listItem);
        });

        this.dispatchEvent(new ListItemEvent(ListItemEvent.LIST_SUCCESS, false, false, list));
        this._query = null;
    }

    /**
     * Shows an alert message if one of the API requests fail.
     *
     * @method onParseError
     * @param error
     * @private
     */
    private onParseError(error):void
    {
        alert('onParseError: ' + error.code + ' ' + error.message);
    }

}
///<reference path='../../../../src/typescript/com/codebelt/events/EventDispatcher.ts'/>
///<reference path='../../../../src/typescript/com/codebelt/events/RequestEvent.ts'/>

class ListItemModel extends EventDispatcher {

    private listItem;

    constructor()
    {
        super();

        var ListItem = Parse.Object.extend("ListItem");
        this.listItem = new ListItem();
    }

    public set(key:string, value:any):void {
        this.listItem.set(key, value);
    }

    public save():void {
        var self = this;
        this.listItem.save(null, {
            success: this.onSuccess.bind(self),
            error: this.onError.bind(self)
        });
    }

    private onSuccess(item) {
        //console.log("onSuccess", item);
        this.dispatchEvent(new RequestEvent(RequestEvent.SUCCESS, item));
    }

    private onError(item, error) {
        console.log("Error when saving Todos: " + error.code + " " + error.message);
        this.dispatchEvent(new RequestEvent(RequestEvent.ERROR, error));
    }

}
///<reference path='../../../../../src/com/codebelt/structurets/model/Collection.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/controller/LocalStorageController.ts'/>

///<reference path='vo/TodoItemVO.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TodoCollection
 * @extends Collection
 * @constructor
 **/
class TodoCollection extends Collection {

    public CLASS_NAME:string = 'TodoCollection';

    /**
     * YUIDoc_comment
     *
     * @property _localStorage
     * @type {LocalStorageController}
     * @private
     */
    private _localStorage:LocalStorageController = null;

    constructor() {
        super();

        this._localStorage = new LocalStorageController();
    }


    /**
     * @overridden Collection.addItem
     */
    public addItem(item:TodoItemVO, silent:boolean = false):void {
        super.addItem(item, silent);

        this._localStorage.addItem(item.id, item);
    }

    /**
     * YUIDoc_comment
     *
     * @method removeCompletedItems
     * @public
     */
    public removeCompletedItems() {

    }


}
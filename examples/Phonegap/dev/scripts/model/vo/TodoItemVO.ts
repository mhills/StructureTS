///<reference path='../../../../../../src/com/codebelt/structurets/model/ValueObject.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TodoItemVO
 * @param [data] {any} Provide a way to update the value object upon initialization.
 * @extends ValueObject
 * @constructor
 **/
class TodoItemVO extends ValueObject {

    /**
     * @overridden ValueObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'TodoItemVO';

    public id:string = null;
    public completed:boolean = false;
    public text:string = null;

    constructor(data:any = null) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden ValueObject.update
     */
    public update(data:any):void {
        this.completed = data.completed;
        this.text = data.text;
    }

    /**
     * @overridden ValueObject.copy
     */
    public copy():TodoItemVO {
        var data:IValueObject = super.copy();
        return new TodoItemVO(data);
    }

}
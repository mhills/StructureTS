///<reference path='../../../../../../src/com/codebelt/structurets/models/ValueObject.ts'/>

/**
 * YUIDoc_comment
 *
 * @class ListItemVO
 * @extends ValueObject
 * @constructor
 **/
class ListItemVO extends ValueObject {

    public CLASS_NAME:string = 'ListItemVO';

    /**
     * @type {string}
     */
    public content:string;

    /**
     * @type {string}
     */
    public id:string;

    /**
     * @type {boolean}
     * @default false
     */
    public isComplete:boolean = false;

    constructor() {
        super();
    }

}
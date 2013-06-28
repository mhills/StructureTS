///<reference path='../../../../../src/typescript/com/codebelt/models/ValueObject.ts'/>

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
    public content:string = null;

    /**
     * @type {boolean}
     * @default false
     */
    public isComplete:boolean = false;

    constructor() {
        super();
    }

}
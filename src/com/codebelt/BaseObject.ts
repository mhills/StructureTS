///<reference path=''/>

/**
 * The BaseObject class is an abstract class that provides common properties and functionality for all StructureTS classes.
 *
 * @class BaseObject
 * @constructor
 **/
class BaseObject {

    /**
     * The actually class name for the object.
     *
     * @property CLASS_NAME
     * @type {string}
     * @final
     * @protected
     */
    public CLASS_NAME:string = 'BaseObject';

    /**
     * The cid or client id is a unique identifier automatically assigned to all StructureTS objects
     * when they're first created.
     *
     * @property cid
     * @type {int}
     */
    public cid:number;

    constructor() {
        //TODO: why is it converting to a string and not a number?
        this.cid = _.uniqueId();
    }

    /**
     * Returns the fully qualified class name of an object.
     *
     * @method getQualifiedClassName
     * @returns {string}
     * @public
     */
    public getQualifiedClassName():string
    {
        return this.CLASS_NAME;
    }

}
///<reference path='../../../../../../../src/com/codebelt/structurets/model/ValueObject.ts'/>

module codeBelt
{
    import ValueObject = StructureTS.ValueObject;

    /**
     * YUIDoc_comment
     *
     * @class ListItemVO
     * @extends ValueObject
     * @constructor
     **/
    export class ListItemVO extends ValueObject
    {

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

        constructor()
        {
            super();
        }

    }
}
///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    /**
     * YUIDoc_comment
     *
     * @class HeaderView
     * @constructor
     **/
    export class HeaderView extends DOMElement
    {

        public CLASS_NAME:string = 'HeaderView';

        constructor()
        {
            super();

        }

        /**
         * @copy DisplayObject.createChildren
         * @overridden
         */
        public createChildren():void
        {
            super.createChildren('templates/header/headerTemplate.hbs');

        }

        /**
         * @copy DisplayObject.layoutChildren
         * @overridden
         */
        public layoutChildren():void
        {

        }

        /**
         * @copy DisplayObject.enable
         * @overridden
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @copy DisplayObject.disable
         * @overridden
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
        }

    }
}
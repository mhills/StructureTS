///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;

    /**
     * YUIDoc_comment
     *
     * @class ContentView
     * @extends DOMElement
     * @constructor
     **/
    export class ContentView extends DOMElement
    {
        /**
         * @overridden DOMElement.CLASS_NAME
         */
        public CLASS_NAME:string = 'ContentView';

        constructor()
        {
            super();

        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        public layoutChildren():void
        {

        }

        /**
         * @overridden DOMElement.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
        }

    }
}
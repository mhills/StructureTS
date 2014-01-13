///<reference path='../ContentView.ts'/>

module codeBelt
{
    /**
     * YUIDoc_comment
     *
     * @class MenuView
     * @extends ContentView
     * @constructor
     **/
    export class MenuView extends ContentView
    {
        /**
         * @overridden DOMElement.CLASS_NAME
         */
        public CLASS_NAME:string = 'MenuView';

        constructor()
        {
            super();

        }

        /**
         * @overridden ContentView.createChildren
         */
        public createChildren():void
        {
            super.createChildren('templates/menu/menuTemplate.hbs');

        }

        /**
         * @overridden ContentView.layoutChildren
         */
        public layoutChildren():void
        {

        }

        /**
         * @overridden ContentView.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @overridden ContentView.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

        }

    }
}
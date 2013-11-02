///<reference path='../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/structurets/display/Stage.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import Stage = StructureTS.Stage;

    /**
     *
     * @class EventListenerApp
     * @extends Stage
     * @constructor
     **/
    export class EventListenerApp extends Stage
    {

        private _rec:DOMElement = null;
        private _enableButton:DOMElement = null;
        private _disableButton:DOMElement = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden DOMElement.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            this._rec = this.getChild('.rect');
            this._enableButton = this.getChild('.enable');
            this._disableButton = this.getChild('.disable');

            this._enableButton.$element.addEventListener('click', this.enable, this);
            this._disableButton.$element.addEventListener('click', this.disable, this);
        }

        /**
         * @overridden DisplayObject.layoutChildren
         */
        public layoutChildren():void
        {
        }

        /**
         * @overridden DisplayObject.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;
            console.log("enable");
            this._rec.$element.addEventListener('click', this.changeColor, this);

            super.enable();
        }

        /**
         * @overridden DisplayObject.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;
            console.log("disable");
            this._rec.$element.removeEventListener('click', this.changeColor, this);

            super.disable();
        }

        private changeColor(event:JQueryEventObject):void
        {
            $(event.currentTarget).toggleClass('active')
        }

    }
}
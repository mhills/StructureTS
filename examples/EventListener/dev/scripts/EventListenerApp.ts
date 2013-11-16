///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>

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
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'EventListenerApp';

        private _$stateTest:JQuery = null;
        private _rec:DOMElement = null;
        private _enableButton:DOMElement = null;
        private _disableButton:DOMElement = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden Stage.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            this._$stateTest = this.$element.find('.js-stateText')

            this._rec = this.getChild('.js-Square');
            this._enableButton = this.getChild('#js-enableButton');
            this._disableButton = this.getChild('#js-disableButton');

            this._enableButton.$element.addEventListener('click', this.enable, this);
            this._disableButton.$element.addEventListener('click', this.disable, this);
        }

        /**
         * @overridden Stage.layoutChildren
         */
        public layoutChildren():void
        {
            var text:string = (this.isEnabled === true) ? 'enabled' : 'disabled';
            this._$stateTest.text(text);
        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this._rec.$element.addEventListener('click', this.changeColor, this);

            super.enable();

            this.layoutChildren();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._rec.$element.removeEventListener('click', this.changeColor, this);

            super.disable();

            this.layoutChildren();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._rec.destroy();
            this._rec = null;

            this._enableButton.destroy();
            this._enableButton = null;

            this._disableButton.destroy();
            this._disableButton = null;
        }

        private changeColor(event:JQueryEventObject):void
        {
            $(event.currentTarget).toggleClass('active');
        }

    }
}
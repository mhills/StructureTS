///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

///<reference path='SonView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * YUIDoc_comment
     *
     * @class DadView
     * @constructor
     **/
    export class DadView extends DOMElement
    {
        public CLASS_NAME:string = 'DadView';

        private _childrenContainer:DOMElement = null;
        private _sonView:SonView = null;
        private _dadMessage:DOMElement = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden DisplayObject.createChildren
         */
        public createChildren():void
        {
            super.createChildren('#containerTemplate', {title: this.getQualifiedClassName()});

            this._childrenContainer = this.getChild('.js-childrenArea');

            this._sonView = new SonView();
            this._childrenContainer.addChild(this._sonView);

            this._dadMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DisplayObject.layoutChildren
         */
        public layoutChildren():void
        {
            this._dadMessage.$element.css('opacity', 0);
            this._sonView.layoutChildren();
        }

        /**
         * @overridden DisplayObject.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._sonView.enable();

            super.enable();
        }

        /**
         * @overridden DisplayObject.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._sonView.disable();

            super.disable();
        }

        /**
         * @overridden DisplayObject.destroy
         */
        public destroy():void
        {
            this._sonView.destroy();
            this._sonView = null;

            this._childrenContainer.destroy();
            this._childrenContainer = null;

            super.destroy();
        }

        private onBubbled(event:BaseEvent):void
        {
            var checkbox:boolean = this._childrenContainer.$element.find('[type=checkbox]')
                .first()
                .prop('checked');

            if (checkbox == true)
            {
                event.stopPropagation();
            }

            this._dadMessage.$element.css('opacity', 1);
        }

    }
}
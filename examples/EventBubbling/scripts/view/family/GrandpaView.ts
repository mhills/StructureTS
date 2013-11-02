///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

///<reference path='DadView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * YUIDoc_comment
     *
     * @class GrandpaView
     * @constructor
     **/
    export class GrandpaView extends DOMElement
    {
        public CLASS_NAME:string = 'GrandpaView';

        private _childrenContainer:DOMElement = null;
        private _dadView:DadView = null;
        private _grandpaMessage:DOMElement = null;

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

            this._dadView = new DadView();
            this._childrenContainer.addChild(this._dadView);

            this._grandpaMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DisplayObject.layoutChildren
         */
        public layoutChildren():void
        {
            this._grandpaMessage.$element.css('opacity', 0);
            this._dadView.layoutChildren();
        }

        /**
         * @overridden DisplayObject.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._dadView.enable();

            super.enable();
        }

        /**
         * @overridden DisplayObject.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._dadView.disable();

            super.disable();
        }

        /**
         * @overridden DisplayObject.destroy
         */
        public destroy():void
        {
            this._dadView.destroy();
            this._dadView = null;

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

            this._grandpaMessage.$element.css('opacity', 1);
        }

    }
}
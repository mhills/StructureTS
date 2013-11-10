///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

///<reference path='ParentView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * YUIDoc_comment
     *
     * @class GrandparentView
     * @constructor
     **/
    export class GrandparentView extends DOMElement
    {
        public CLASS_NAME:string = 'GrandparentView';

        private _panelContainer:DOMElement = null;
        private _parentView:ParentView = null;
        private _grandparentMessage:DOMElement = null;

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

            this._panelContainer = this.getChild('.js-panelContent');

            this._parentView = new ParentView();
            this._panelContainer.addChild(this._parentView);

            this._grandparentMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DisplayObject.layoutChildren
         */
        public layoutChildren():void
        {
            this._grandparentMessage.$element.css('opacity', 0);
            this._parentView.layoutChildren();
        }

        /**
         * @overridden DisplayObject.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._parentView.enable();

            super.enable();
        }

        /**
         * @overridden DisplayObject.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._parentView.disable();

            super.disable();
        }

        /**
         * @overridden DisplayObject.destroy
         */
        public destroy():void
        {
            this._parentView.destroy();
            this._parentView = null;

            this._panelContainer.destroy();
            this._panelContainer = null;

            super.destroy();
        }

        private onBubbled(event:BaseEvent):void
        {
            var checkbox:boolean = this._panelContainer.$element.find('[type=checkbox]')
                .first()
                .prop('checked');

            if (checkbox == true)
            {
                event.stopPropagation();
            }

            this._grandparentMessage.$element.css('opacity', 1);
        }

    }
}
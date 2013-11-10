///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

///<reference path='ChildView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * YUIDoc_comment
     *
     * @class ParentView
     * @constructor
     **/
    export class ParentView extends DOMElement
    {
        public CLASS_NAME:string = 'ParentView';

        private _childrenContainer:DOMElement = null;
        private _childView:ChildView = null;
        private _parentMessage:DOMElement = null;

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

            this._childrenContainer = this.getChild('.js-panelContent');

            this._childView = new ChildView();
            this._childrenContainer.addChild(this._childView);

            this._parentMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DisplayObject.layoutChildren
         */
        public layoutChildren():void
        {
            this._parentMessage.$element.css('opacity', 0);
            this._childView.layoutChildren();
        }

        /**
         * @overridden DisplayObject.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._childView.enable();

            super.enable();
        }

        /**
         * @overridden DisplayObject.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._childView.disable();

            super.disable();
        }

        /**
         * @overridden DisplayObject.destroy
         */
        public destroy():void
        {
            this._childView.destroy();
            this._childView = null;

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

            this._parentMessage.$element.css('opacity', 1);
        }

    }
}
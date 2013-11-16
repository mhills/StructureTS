///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/controller/RouterController.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/event/RouterEvent.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import RouterController = StructureTS.RouterController;
    import RouterEvent = StructureTS.RouterEvent;
    /**
     * YUIDoc_comment
     *
     * @class HeaderView
     * @constructor
     **/
    export class HeaderView extends DOMElement
    {
        public CLASS_NAME:string = 'HeaderView';

        private _router:RouterController = null;
        private _$navLinks:JQuery = null;

        constructor(router:RouterController)
        {
            super();

            this._router = router;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        public createChildren():void
        {
            super.createChildren('templates/header/headerTemplate.hbs');

            this._$navLinks = this.$element.find('#js-nav li');
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

            this._router.addEventListener(RouterEvent.CHANGE, this.onRouteChange, this);

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._router.removeEventListener(RouterEvent.CHANGE, this.onRouteChange, this);

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

            // Note: we do not want to call destroy on _router because with was create outside of this class.
            this._router = null;

            this._$navLinks = null;
        }

        private onRouteChange(event:RouterEvent):void
        {
            var route:string = this._router.getHash();
            var $navItem:JQuery = this._$navLinks.find('a[href*="' + route + '"]');

            // Make all nav item not active.
            this._$navLinks.removeClass('active');

            if ($navItem.length != 0) {
                // Make the found nav item active that matches the route.
                $navItem.parent()
                        .addClass('active');
            } else {
                // If there was no match then make the first nav item active.
                this._$navLinks.first()
                               .addClass('active');
            }
        }

    }
}
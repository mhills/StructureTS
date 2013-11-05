///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='view/RootView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import Stage = StructureTS.Stage;

    export class WebsiteApp extends Stage
    {
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'WebsiteApp';

        private _rootView:RootView = null;

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

            this._rootView = new RootView();
            this.addChild(this._rootView);
        }

        /**
         * @overridden DOMElement.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this._rootView.enable();

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._rootView.disable();

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
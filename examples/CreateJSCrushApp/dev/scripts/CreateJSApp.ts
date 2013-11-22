///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>

///<reference path='view/GameView.ts'/>

module codeBelt
{
    import Stage = StructureTS.Stage;
    import DOMElement = StructureTS.DOMElement;

    export class CreateJSApp extends Stage
    {
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'CreateJSApp';

        private _gameView:GameView = null;
        private _preload:createjs.LoadQueue = null;

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

            var manifest = [
                {src:"images/ui/back3.png", id:"background"},
                {src:"images/ui/overlay.png", id:"overlay"},
                {src:"images/ui/frame.png", id:"frame"}
            ];

            this._preload = new createjs.LoadQueue(true);


//            this._preload.addEventListener("progress", handleProgress);
            this._preload.addEventListener("complete", this.preloadComplete.bind(this));
//            this._preload.addEventListener("fileload", handleFileLoad);
            this._preload.loadManifest(manifest);
        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._gameView.destroy();

            super.disable();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._gameView.destroy();
        }


        private preloadComplete():void
        {
            this._gameView = new GameView(this._preload);
            this.addChild(this._gameView);
            this._gameView.enable();
        }

    }
}
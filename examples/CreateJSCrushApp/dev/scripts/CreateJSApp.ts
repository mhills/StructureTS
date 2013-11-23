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
        public static ASSET_LOADER:createjs.LoadQueue = null;

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
                {src:"images/ui/frame.png", id:"frame"},
                {src:"images/ui/overlay.png", id:"overlay"},
                {src:"images/ui/candy/1.png", id:"1"},
                {src:"images/ui/candy/2.png", id:"2"},
                {src:"images/ui/candy/3.png", id:"3"},
                {src:"images/ui/candy/4.png", id:"4"},
                {src:"images/ui/candy/5.png", id:"5"},
                {src:"images/ui/candy/6.png", id:"6"},
                {src:"images/ui/candy/7.png", id:"7"},
                {src:"images/ui/candy/8.png", id:"8"}
            ];

            CreateJSApp.ASSET_LOADER = new createjs.LoadQueue(true);


//            CreateJSApp.ASSET_LOADER.addEventListener("progress", handleProgress);
            CreateJSApp.ASSET_LOADER.addEventListener("complete", this.preloadComplete.bind(this));
//            CreateJSApp.ASSET_LOADER.addEventListener("fileload", handleFileLoad);
            CreateJSApp.ASSET_LOADER.loadManifest(manifest);


//            createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
//            createjs.Sound.addEventListener("fileload", this.loadHandler.bind(this));
//            createjs.Sound.registerSound("sounds/IttyBitty8Bit.mp3", "backgroundSound");

        }

        loadHandler(event) {
            console.log("loadHandler");
            // This is fired for each sound that is registered.
            var instance = createjs.Sound.play("backgroundSound");  // play using id.  Could also use full source path or event.src.
            instance.addEventListener("complete", this.handleComplete.bind(this));
            instance.volume = 0.1;
        }

        handleComplete(event) {
            console.log("complete");
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
            this._gameView = new GameView();
            this.addChild(this._gameView);
            this._gameView.enable();
        }

    }
}
///<reference path='../_declare/easeljs.d.ts'/>
///<reference path='../_declare/preloadjs.d.ts'/>
///<reference path='../_declare/soundjs.d.ts'/>

///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='../CreateJSApp.ts'/>
///<reference path='../util/ImageFactory.ts'/>


module codeBelt
{
    import DOMElement = StructureTS.DOMElement;

    export class GameView extends DOMElement
    {
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'GameView';

        private _canvasStage:createjs.Stage = null;
        private _onEnterFrameReference:any = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden Stage.createChildren
         */
        public createChildren():void
        {
            super.createChildren('canvas', {Width: 1320, Height: 480});// Note the capital Width and Height. This sets the w/h on the element itself and not the style w/h.

            this._canvasStage = new createjs.Stage(<HTMLCanvasElement>this.element);

            var backgroundImage:createjs.Bitmap = ImageFactory.create("background");
            this._canvasStage.addChild(backgroundImage);

            var frameImage:createjs.Bitmap = ImageFactory.create("frame");
            this._canvasStage.addChild(frameImage);

            var candy:createjs.Bitmap = ImageFactory.create("1");
            candy.x = 50;
            candy.y = 100;
            this._canvasStage.addChild(candy);
            this._canvasStage.update();

            createjs.Ticker.setFPS(60);
            this._onEnterFrameReference = this.onEnterFrame.bind(this);
        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

//            createjs.Ticker.addEventListener("tick", this._onEnterFrameReference);

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            createjs.Ticker.removeEventListener("tick", this._onEnterFrameReference);

            super.disable();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();

        }

        private onEnterFrame(event):void
        {
            this._canvasStage.update();
        }

    }
}
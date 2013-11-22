///<reference path='../_declare/easeljs.d.ts'/>
///<reference path='../_declare/preloadjs.d.ts'/>
///<reference path='../_declare/soundjs.d.ts'/>

///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>


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
        private _preload:createjs.LoadQueue = null;
        private _onEnterFrameReference:any = null;

        constructor(preload:createjs.LoadQueue)
        {
            super();

            this._preload = preload;
        }

        /**
         * @overridden Stage.createChildren
         */
        public createChildren():void
        {
            super.createChildren('canvas', {Width: 1320, Height: 480});// Note the capital Width and Height. This sets the w/h on the element itself and not the style w/h.

            this._canvasStage = new createjs.Stage(<HTMLCanvasElement>this.element);

            createjs.Ticker.setFPS(60);

            this._onEnterFrameReference = this.onEnterFrame.bind(this);

            var image:HTMLImageElement = <HTMLImageElement>this._preload.getResult("background");
            var image1:HTMLImageElement = <HTMLImageElement>this._preload.getResult("frame");

            var backgroundImage:createjs.Bitmap = new createjs.Bitmap(image);
            this._canvasStage.addChild(backgroundImage);

            var frameImage:createjs.Bitmap = new createjs.Bitmap(image1);
            this._canvasStage.addChild(frameImage);

            this._canvasStage.update();
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
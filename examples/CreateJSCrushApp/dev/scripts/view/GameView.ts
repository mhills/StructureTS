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
        private _gamePiecesList:createjs.DisplayObject[] = [];

        private CONTAINER_WIDTH:number = 293;
        private CONTAINER_HIEGHT:number = 350;
        private NUM_COLUMNS:number = 6;
        private NUM_ROWS:number = 7;
        private V_SPACE:number = 0;
        private H_SPACE:number = 0;

        private orignalGamePieceWidth:number = 54;
        private orignalGamePieceHeight:number = 54;

        private gamePieceWidth:number = 0;
        private gamePieceHeight:number = 0;

        constructor()
        {
            super();
        }

        /**
         * @overridden Stage.createChildren
         */
        public createChildren():void
        {
            // Note the capital Width and Height. This sets the w/h on the element itself and not the style w/h.
            super.createChildren('canvas', {Width: 320, Height: 480});

            this._canvasStage = new createjs.Stage(<HTMLCanvasElement>this.element);

            var backgroundImage:createjs.Bitmap = ImageFactory.create("background");
            this._canvasStage.addChild(backgroundImage);

            var frameImage:createjs.Bitmap = ImageFactory.create("frame");
            this._canvasStage.addChild(frameImage);

            createjs.Ticker.setFPS(60);
            this._onEnterFrameReference = this.onEnterFrame.bind(this);


            var contianer:createjs.Container =  new createjs.Container();
            contianer.x = 13;
            contianer.y = 70;

//            var itemAspectRatio:number = this.gamePieceWidth / this.gamePieceHeight;
//            var itemWidth:number = ((this.CONTAINER_WIDTH + this.H_SPACE) / this.NUM_COLUMNS) - this.H_SPACE;
//            var itemHeight:number = ((this.CONTAINER_HIEGHT + this.V_SPACE) / this.NUM_ROWS) - this.V_SPACE;


            this.gamePieceWidth = Math.floor(this.CONTAINER_WIDTH / this.NUM_COLUMNS);
            this.gamePieceHeight = Math.floor(this.CONTAINER_HIEGHT / this.NUM_ROWS);

            var scaleX:number = this.gamePieceWidth / this.orignalGamePieceWidth;
            var scaleY:number = this.gamePieceHeight / this.orignalGamePieceHeight;

            var numGamePiece:number = this.NUM_COLUMNS * this.NUM_ROWS;
            var item:createjs.DisplayObject;
            for (var i:number = 0; i < numGamePiece; i++)
            {
                item = ImageFactory.getRandomGamePiece();
                item.x = (i % this.NUM_COLUMNS) * (this.gamePieceWidth + this.H_SPACE);
                item.y = Math.floor(i / this.NUM_COLUMNS) * (this.gamePieceHeight + this.V_SPACE);

                item.scaleX = item.scaleY = scaleX;

                this._gamePiecesList.push(item);
                contianer.addChild(item);
            }


//            var gemSize = this.gamePieceWidth/this.NUM_COLUMNS;
//
//            if(gemSize > this.gamePieceHeight/this.NUM_ROWS) {
//
//                gemSize = this.gamePieceHeight/this.NUM_ROWS;
//
//            }



//            var shape:createjs.Shape = new createjs.Shape();
//            shape.graphics.beginFill('#00ff00');
//            shape.graphics.drawRect(0, 0, this.CONTAINER_WIDTH, this.CONTAINER_HIEGHT);
//            shape.graphics.endFill();
//            shape.alpha = 0.5;
//            contianer.addChild(shape);

                              this._canvasStage.addChild(contianer);

//            var x0 = (this.gamePieceWidth - (this.NUM_COLUMNS * gemSize)) / 2 + gemSize / 2;
//            var y0 = this.gamePieceHeight - (this.gamePieceHeight - (this.NUM_ROWS * gemSize))/2 - gemSize/2  + 4;
//
//            console.log("x0", x0);
//            console.log("y0", y0);
            this._canvasStage.update();


//            var SPACER:Number = 0;
//            var xCounter:Number = 0;
//            var yCounter:Number = 0;
//            var columns:Number = 4;
//            for (var i:Number = 0; i < itemArray.length; i++) {
//                itemArray[i].x = (itemArray[i].width + SPACER) * xCounter;
//                itemArray[i].y = (itemArray[i].height + SPACER) * yCounter;
//
//                if (xCounter < columns - 1) {
//                    xCounter++;
//                } else {
//                    xCounter = 0;
//                    yCounter++;
//                }
//            }

//            //Get the original item aspect ratio
//            _itemAspectRatio = _image.width / _image.height;
//
//            var containerAspectRatio:Number = unscaledWidth/unscaledHeight;
//            if(_itemAspectRatio <= containerAspectRatio){
//                _image.width = unscaledWidth;
//                _image.height = Math.round(unscaledWidth / _itemAspectRatio);
//            }else{
//                _image.height = unscaledHeight;
//                _image.width = Math.round(unscaledHeight * _itemAspectRatio);
//            }
        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            createjs.Ticker.addEventListener("tick", this._onEnterFrameReference);

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
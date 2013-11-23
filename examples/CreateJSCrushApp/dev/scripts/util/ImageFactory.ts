///<reference path='../CreateJSApp.ts'/>

module codeBelt
{
    /**
     * YUIDoc_comment
     *
     * @class ImageFactory
     * @constructor
     **/
    export class ImageFactory {

        public CLASS_NAME:string = 'ImageFactory';

        constructor() {

        }

        public static create(image:string):createjs.Bitmap
        {
            var imageElement:HTMLImageElement = <HTMLImageElement>CreateJSApp.ASSET_LOADER.getResult(image);
            return new createjs.Bitmap(imageElement);
        }

        public static getRandomGamePiece():createjs.Bitmap
        {
            var gamePieces:string[] = ['beanBlue', 'beanPurple', 'candyBlue', 'candyGreen', 'candyOrange', 'candyYellow', 'mintGreen', 'mintRed'];
            var randomIndex:number = ImageFactory.randomRange(0, gamePieces.length);

            var imageElement:HTMLImageElement = <HTMLImageElement>CreateJSApp.ASSET_LOADER.getResult(gamePieces[randomIndex]);
            return new createjs.Bitmap(imageElement);
        }

        public static randomRange(min:number, max:number):number
        {
            return Math.floor(Math.random() * (max - min)) + min;
        }

    }
}
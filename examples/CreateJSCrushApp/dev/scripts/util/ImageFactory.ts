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

    }
}
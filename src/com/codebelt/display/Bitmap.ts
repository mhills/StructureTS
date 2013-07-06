///<reference path='CanvasElement.ts'/>
///<reference path='../utils/NumberUtil.ts'/>

/**
 * The Bitmap...
 *
 * @class Bitmap
 * @extends CanvasElement
 * @constructor
 **/
class Bitmap extends CanvasElement {

    private _image:HTMLImageElement = null;

    public ready:boolean = false;

    constructor(image:HTMLImageElement)
    {
        super();

        this._image = image;
        this.width = this._image.width;
        this.height = this._image.height;
    }

    public createChildren():void
    {
        super.createChildren();
    }

    public render():void
    {
        this.context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
        this.context.scale(this.scaleX, this.scaleY);
        this.context.rotate( NumberUtil.degreesToRadians(this.rotation) );
        this.context.translate(-this.width * 0.5, -this.height * 0.5);

        this.context.drawImage(this._image, 0, 0);
    }

}
///<reference path='../../../src/_declare/jquery.d.ts'/>
///<reference path='../../../src/_declare/underscore.d.ts'/>

///<reference path='../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/display/Stage.ts'/>

class PhotoGalleryApp extends Stage
{
    constructor() {
        super();
    }

    public createChildren():void {
        super.createChildren();

        var thumbnails:DOMElement = this.getChild('.gallery-thumbnails');
        var images:DOMElement[] = thumbnails.getChildren();
        console.log(thumbnails.numChildren)
        console.log(images)
    }

    /**
     * @copy DisplayObject.enable
     */
    public enable():void {
        if (this.isEnabled === true) return;

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     */
    public disable():void {
        if (this.isEnabled === false) return;

        super.disable();
    }

}
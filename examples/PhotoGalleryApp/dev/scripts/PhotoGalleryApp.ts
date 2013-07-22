///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>

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
///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../src/com/codebelt/structurets/display/Stage.ts'/>

class PhotoGalleryApp extends Stage
{
    constructor() {
        super();
    }

    public createChildren():DOMElement {
        super.createChildren();

        var thumbnails:DOMElement = this.getChild('.gallery-thumbnails');
        var images:DOMElement[] = thumbnails.getChildren();
        console.log(thumbnails.numChildren)
        console.log(images)
        return this;
    }

    /**
     * @copy DisplayObject.enable
     */
    public enable():DOMElement {
        if (this.isEnabled === true) return this;

        super.enable();
        return this;
    }

    /**
     * @copy DisplayObject.disable
     */
    public disable():DOMElement {
        if (this.isEnabled === false) return this;

        super.disable();
        return this;
    }

}
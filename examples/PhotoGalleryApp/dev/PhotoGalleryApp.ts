///<reference path='../../../src/_declare/jquery.d.ts'/>
///<reference path='../../../src/_declare/underscore.d.ts'/>

///<reference path='../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/display/Stage.ts'/>

class PhotoGalleryApp extends Stage
{
    constructor(selector:string) {
        super(selector);
    }

    public createChildren():void {
        super.createChildren();

        var thumbnails:DOMElement = this.getChild('.gallery-thumbnails');
        var images:DOMElement[] = thumbnails.getChildren();
        console.log(thumbnails.numChildren)
        console.log(images)
    }

    public enabled(value:boolean):void {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        super.enabled(value);
    }

}
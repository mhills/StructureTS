///<reference path='../../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import Stage = StructureTS.Stage;

    export class PhotoGalleryApp extends Stage
    {
        constructor()
        {
            super();
        }

        public createChildren():void
        {
            super.createChildren();

            var thumbnails:DOMElement = this.getChild('.gallery-thumbnails');
            var images:DOMElement[] = thumbnails.getChildren();
            console.log(thumbnails.numChildren);
            console.log(images);
            console.log(thumbnails.getChildByCid(4));

        }

        /**
         * @overridden DOMElement.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;


            super.enable();
        }


        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
        }

    }
}
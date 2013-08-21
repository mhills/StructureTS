///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

/**
 * YUIDoc_comment
 *
 * @class ContainerView
 * @constructor
 **/
class ContainerView extends DOMElement {

    public CLASS_NAME:string = 'ContainerView';

    constructor() {
        super();

    }

    /**
     * @copy DisplayObject.createChildren
     * @overridden
     */
    public createChildren():void {
//        super.createChildren(function(data){
//            div ({'class': 'container'},
//                div({'class': 'container-hd'},
//                    p(data.name)
//                )
//            )
//        }, {name: 'Alpha Container'});
        super.createChildren();
    }

    /**
     * @copy DisplayObject.layoutChildren
     * @overridden
     */
    public layoutChildren():void {

    }

    /**
     * @copy DisplayObject.enable
     * @overridden
     */
    public enable():void {
        if (this.isEnabled === true) return;

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     * @overridden
     */
    public disable():void {
        if (this.isEnabled === false) return;

        super.disable();
    }

}
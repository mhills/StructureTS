///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='SonView.ts'/>

/**
 * YUIDoc_comment
 *
 * @class DadView
 * @constructor
 **/
class DadView extends DOMElement {

    public CLASS_NAME:string = 'DadView';

    private _sonView:SonView = null;

    constructor() {
        super();
    }

    /**
     * @copy DisplayObject.createChildren
     * @overridden
     */
    public createChildren():void {
        super.createChildren(function(data){
            div ({'class': 'container'},
                div({'class': 'container-hd'},
                    p(data.name)
                )
            )
        }, {name: this.getQualifiedClassName()});

        this._sonView = new SonView();
        this.addChild(this._sonView);
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
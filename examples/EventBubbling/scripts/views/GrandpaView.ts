///<reference path='../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='DadView.ts'/>

/**
 * YUIDoc_comment
 *
 * @class GrandpaView
 * @constructor
 **/
class GrandpaView extends DOMElement {

    public CLASS_NAME:string = 'GrandpaView';

    private _dadView:DadView = null;

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

        this._dadView = new DadView();
        this.addChild(this._dadView);
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
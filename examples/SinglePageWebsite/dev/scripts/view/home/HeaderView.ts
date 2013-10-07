///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/util/TemplateFactory.ts'/>

class HeaderView extends DOMElement
{
    constructor()
    {
        super();
    }

    createChildren():DOMElement
    {
        super.createChildren('templates/Header.tpl');
//        var domElement = this.getChild('#my-slider').$element[0];
//        this._dragDealer = new DragDealer(domElement, {
//            slide: true,
//            animationCallback: function(x, y) {
//                console.log('HeaderView',x,y);
//            }
//        });
        return this;
    }

}

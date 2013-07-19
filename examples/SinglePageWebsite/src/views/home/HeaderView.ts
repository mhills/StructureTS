///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/utils/BulkLoader.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/utils/TemplateFactory.ts'/>

class HeaderView extends DOMElement
{
    constructor()
    {
        super();
    }

    createChildren()
    {
        this.$el = TemplateFactory.createTemplate('templates/Header.tpl');

        super.createChildren();
//        var domElement = this.getChild('#my-slider').$el[0];
//        this._dragDealer = new DragDealer(domElement, {
//            slide: true,
//            animationCallback: function(x, y) {
//                console.log('HeaderView',x,y);
//            }
//        });
    }

    public layoutChildren():void
    {
    }

    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    }

}

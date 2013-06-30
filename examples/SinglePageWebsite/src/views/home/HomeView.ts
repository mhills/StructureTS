///<reference path='../../../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/utils/TemplateFactory.ts'/>

class HomeView extends DOMElement
{
    private TITLE:string = "Home View";

    constructor()
    {
        super();
    }

    public createChildren()
    {
        this.$el = TemplateFactory.createTemplate('templates/HomeBody.tpl', {name: "Robert"});

        super.createChildren();
//        this.addEventListener('test',function(event){console.log("god", event.isPropagationStopped)}, this);
//
//        var grampa = new DOMElement('div');
//        grampa.addEventListener('test',function(event){console.log("grampa", event.isPropagationStopped)}, this);
//        var dad = new DOMElement('div');
//        dad.addEventListener('test',function(event){console.log("dad"); event.stopPropagation();}, this);
//        dad.addEventListener('test',function(event){console.log("dad1", event.isImmediatePropagationStopped); event.stopImmediatePropagation();}, this);
//        dad.addEventListener('test',function(event){console.log("dad2", event.isImmediatePropagationStopped)}, this);
//        dad.addEventListener('test',function(event){console.log("dad3", event.isImmediatePropagationStopped)}, this);
//        dad.addEventListener('test',function(event){console.log("dad4", event.isImmediatePropagationStopped)}, this);
//        var child = new DOMElement('div');
//        child.addEventListener('test',function(event){console.log("child", event.isPropagationStopped)}, this);
//
//        this.addChild(grampa)
//        grampa.addChild(dad)
//        dad.addChild(child)
//
//        child.dispatchEvent('test');

    }

    public layoutChildren():void
    {
        document.title = this.TITLE;
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
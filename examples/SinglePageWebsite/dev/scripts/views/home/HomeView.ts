///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/utils/TemplateFactory.ts'/>

class HomeView extends DOMElement
{
    private TITLE:string = "Home View";

    constructor()
    {
        super();
    }

    public createChildren():DOMElement
    {
        super.createChildren('templates/HomeBody.tpl', {name: "Robert"});
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

        return this;
    }

    public layoutChildren():DOMElement
    {
        document.title = this.TITLE;
        return this;
    }

}
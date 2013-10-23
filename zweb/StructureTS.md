Below is a Getting Started overview of ___StructureTS___ and not a follow a long tutorial.

___StructurTS___ is not just a collection of classes but also a workflow that uses GruntJS. You don’t need to use GruntJS to use StructureTS but it will really help.

Dependances
jQuery
Lodash
Handbars (only if you are using templates)
Hasher & Crossroads (only if you are using the RouterController)

The first class you need to create is your main class that will contain all your other classes or objects. This class needs to extend the Stage class and it will be responsible for choosing a DOM element where you want your application to live. So when you setup your app you would do:

```
<html>
	<head>
		<script>
			window.onload = function(event) {
				var app = new MainClass();
				app.appendTo(‘body’);
			}
		</script>
	</head>
	
	<body>
	</body>
</html>
```


The appendTo method allow you pass in a tag name, id name or a class name.

Note: it will only use the first element found. For example if you do ```app.appendTo(‘.wrapper’);``` and there are multiple __.wrapper__ classes found. It will only attach it to the frist one found.

Lets see how a main class should look when extending stage:

```
///<reference path='com/codebelt/structurets/display/Stage.ts'/>

class MainView extends Stage{

    public CLASS_NAME:string = ‘MainView‘;

    constructor() {
        super();
    }

    public createChildren():void {
        super.createChildren();

    }

    public layoutChildren():void {

    }

    public enable():void {
        if (this.isEnabled === true) return;

        super.enable();
    }

    public disable():void {
        if (this.isEnabled === false) return;

        super.disable();
    }

    public destroy():void {
        super.destroy();

    }

}
```
appendTo


The view or specifically the DOMElement class will be the class you extend the most when working with DOM elements. The DOMElement allows you to add (addChild) and remove (removeChild()) children from itself and other DOMElement’s..

The lifecycle of the DOMElement is when

A normal setup for a view class that extends DOMElement is like the example below below. You will notice it looks identical to the MainView above that extends Stage. Thats because the Stage class extends DOMElement but does a couple of things to get things setup.

```
///<reference path='com/codebelt/structurets/display/DOMElement.ts'/>

class ExampleView extends DOMElement {

    public CLASS_NAME:string = 'ExampleView';

    constructor() {
        super();
    }

    public createChildren():void {
        super.createChildren();
		// Designated area to create your child objects for this class.
    }

    public layoutChildren():void {

    }

    public enable():void {
        if (this.isEnabled === true) return;

        super.enable();
    }

    public disable():void {
        if (this.isEnabled === false) return;

        super.disable();
    }

    public destroy():void {
        super.destroy();

    }

}
```

addChild
removeChild













By default your view class will be a div element. But lets say you wanted the view to be a ul element your would do:

```
public createChildren():void {
	super.createChildren(“ul”);
}
```
    
Lets take it a step further:

```
public createChildren():void {
	super.createChildren(“ul”, {id: “myId”, “class”: “myClass anotherClass”});

	var li:DOMElement = new DOMElement(“li”, {text: “Robert is cool”});
	this.addChild(li);
}
```

So thats cool but what if you wanted a block of html to be your view. We you can send createChild an id name to your Handlebars template that exists in your html file. And if you pass in a second argument of data it will render your Handlebars template with that data.

```
public createChildren():void {
    super.createChildren(“#htmlTemplatel”);

	var another:DOMElement = new DOMElement(“#anotherTemplate”);
	this.addChild(another);
}
```

And if you are using precompiled template you would do:

```
public createChildren():void {
	super.createChildren(“templates/HtmlTemplate.hbs”);

	var another:DOMElement = new DOMElement(“templates/HtmlTemplate.hbs”);
	this.addChild(another);
}
```


Dispatching events
Since StrutureTS is a event driven framework. All view can listen and dispatch events. If bubble up events through the display list.

```
var exampleView:ExampleView  = new ExampleView ();
exampleView.addEventListener(BaseEvent.CHANGE, this.onChange, this);
exampleView.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));

private onChange(event:BaseEvent):void {

}
```

You can learn more about events and custom events…….

That is StrutureTS at it minimaliste and now you can those core classes and started extend and creating applications.

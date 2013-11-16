#Getting Started with ___StructureTS___ 
###An Event Driven JavaScript/TypeScript Framework.

##Overview

___StructurTS___ is not just a collection of classes but also a workflow that uses GruntJS. You don't need to use GruntJS to use StructureTS but it will really help.

1. Who is StructureTS for? Me, Robert S. [www.codebelt.com](http://www.codebelt.com/)
2. Why did you build it? To make my life easier.
3. Can I use it? Sure.

___StructurTS___ is built in TypeScript. If want to learn more about TypeScript checkout these two links:
		
* [What is TypeScript](http://www.codebelt.com/typescript/what-is-typescript/)
* [Namespacing with TypeScript](http://www.codebelt.com/typescript/javascript-namespacing-with-typescript-internal-modules/)



##It's All About Structure!

One of the main classes you will be extending in StructureTS is the DOMElement class. The DOMElement will be used to create all our views when refering to DOM elements. It allows you to create (createChildren()), layout (layoutChildren()), add (addChild()), remove (removeChild()) and destroy (destroy()) children from views. There is a specific lifecycle the DOMElement class follows:

* createChildren - gets called only once when the child view is added to another view. If the child view is removed and added to another view createChildren will not be called again. Example: this.addChild(childView); 
* layoutChildren - gets called right after createChildren but it can be called later to update the children of a view.
* enable - is responsible for enabling event listeners and/or children of the containing view.
* disable - is responsible for disabling event listeners and/or children of the containing view.
* destroy - the destroy method is to make child objects ready for garbage collection.




```
///<reference path='com/codebelt/structurets/display/DOMElement.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;

    export class ExampleView extends DOMElement
    {
        public CLASS_NAME:string = 'ExampleView';

        constructor()
        {
            super();
        }

        public createChildren():void
        {
            super.createChildren();

            // Create and add your child objects to this parent class.
        }

        public layoutChildren():void
        {
            // Layout or update the child objects in this parent class.
        }

        public enable():void
        {
            if (this.isEnabled === true) return;

            // Enable the child objects and add any event listeners.

            super.enable();
        }

        public disable():void
        {
            if (this.isEnabled === false) return;

            // Disable the child objects and remove any event listeners.

            super.disable();
        }

        public destroy():void
        {
            super.destroy();

            // Destroy the child objects and references in this parent class to prevent memory leaks.
        }

    }
}
```
Later you can check out the doc's for the [DOMElement](http://codebelt.github.io/StructureTS/docs/classes/DOMElement.html). StructureTS view recap: 

* createChildren is where you create the child objects for the view.
* layoutChildren is where you layout and update any of the child objects for the view.
* enable is where you enable the child objects for the view.
* disable is where you disable the child objects for the view.
* destroy is where you destroy the child objects for the view.



addChild
removeChild



A normal setup for a view class that extends DOMElement is like the example below below. You will notice it looks identical to the MainView above that extends Stage. Thats because the Stage class extends DOMElement but does a couple of things to get things setup.




The first class you need to create is your main class that will contain all your other classes or objects. This class needs to extend the Stage class and it will be responsible for choosing a DOM element where you want your application to live. So when you setup your app you would do:

```
<html>
	<head>
		<script>
			window.onload = function(event) {
				var app = new MainClass();
				app.appendTo('body');
			}
		</script>
	</head>
	
	<body>
	</body>
</html>
```


The appendTo method allow you pass in a tag name, id name or a class name.

Note: it will only use the first element found. For example if you do ```app.appendTo('.wrapper');``` and there are multiple __.wrapper__ classes found. It will only attach it to the frist one found.

Lets see how a main class should look when extending stage:

```
///<reference path='com/codebelt/structurets/display/Stage.ts'/>

class MainView extends Stage{

    public CLASS_NAME:string = 'MainView';

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

##Dependances

* jQuery
* Lodash
* Handbars (Only if you are using templates. Which you will be.)

You can learn more about events and custom events…….

That is StrutureTS at it minimaliste and now you can those core classes and started extend and creating applications.

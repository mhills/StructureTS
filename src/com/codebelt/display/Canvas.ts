/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

///<reference path='CanvasElement.ts'/>
///<reference path='DOMElement.ts'/>

/**
 * The Canvas...
 *
 * @class Canvas
 * @extends CanvasElement
 * @constructor
 **/
class Canvas extends CanvasElement {

    public element:any = null;

    constructor(canvas:DOMElement)
    {
        super();

        this.stage = this;
        this.element = canvas.element[0];
        this.context = this.element.getContext("2d");

        this.width = this.element.width;
        this.height = this.element.height;
    }

    /**
     * @override
     */
    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {

        } else {

        }

        super.enabled(value);
    }

    /**
     * @override
     */
    public addChild(child:CanvasElement):void
    {
        child.parent = this.stage;
        child.stage = this.stage;
        child.context = this.context;
        child.createChildren();
    }

    public removeChild(child:CanvasElement):void
    {
        child.stage = null;
        child.context = null;
    }

    public render():void
    {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    //Override event listeners becuase Canvas is both and CanvasElement and DOMElement.
    public addEventListener(type:string, callback:Function, scope:any)
    {
        if (document.addEventListener) {
            this.element.addEventListener(type, callback, false);
        } else if (document.attachEvent)  {
            this.element.attachEvent("on" + type, callback);
        } else {
            this.element["on" + type] = callback;
        }
    }

    //Override event listeners becuase Canvas is both and CanvasElement and DOMElement.
    public removeEventListener(type:string, callback:Function)
    {
        if (document.removeEventListener) {
            this.element[0].removeEventListener(type, callback, false);
        } else if (document.detachEvent)  {
            this.element[0].detachEvent("on" + type, callback);
        } else {
            this.element[0]["on" + type] = null;
        }
    }

}
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

///<reference path='DisplayObject.ts'/>
///<reference path='Canvas.ts'/>

/**
 * The CanvasElement...
 *
 * @class CanvasElement
 * @extends DisplayObject
 * @constructor
 **/
class CanvasElement extends DisplayObject {

    public stage:Canvas = null;
    public context:CanvasRenderingContext2D = null;
    public x:number = 0;
    public y:number = 0;
    public width:number = 0;
    public height:number = 0;
    public scaleX:number = 1;
    public scaleY:number = 1;
    public rotation:number = 0;
    public alpha:number = 1;
    public visible:boolean = true;

    constructor()
    {
        super();
        TweenLite.ticker.addEventListener("tick", this.layoutChildren.bind(this), this);
    }

    public  createChildren():void
    {
        //Meant to be overridden.
    }

    public render():void
    {
        //Meant to be overridden.
    }

    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    }

    private readerStart():void
    {
        this.context.save();
    }

    private layoutChildren():void
    {
        if (!this.context || this.alpha <= 0 || !this.visible) return;

        this.readerStart();
        this.context.globalAlpha = this.alpha;
        this.render();
        this.renderEnd();
    }

    private renderEnd():void
    {
        this.context.restore();
    }

    public addChild(child:CanvasElement):void
    {
        //TODO: Add to children array with super DisplayObject.
        child.parent = this;
        child.stage = this.stage;
        child.context = this.context;
        child.createChildren();
    }

    public removeChild(child:CanvasElement):void
    {
        //TODO: Remove children from array with super DisplayObject.
        child.stage = null;
        child.context = null;
    }

}
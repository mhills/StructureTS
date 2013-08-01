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


///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/CarouselEvent.ts'/>
///<reference path='../display/DOMElement.ts'/>

/**
 * YUIDoc_comment
 *
 * @class Carousel
 * @extends EventDispatcher
 * @constructor
 **/
class Carousel extends EventDispatcher
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'Carousel';

    private _numberOfItems:number = -1;
    private _widthOfItem:number = -1;
    private _heightOfItem:number = -1;
    private _itemsVisible:number = -1;

    private _container:DOMElement;

    private _leftOffset:number = 0;

    private _currentIndex:number = 0;
    private _maxIndex:number = 0;
    private _isMoving:boolean = false;

    private _tween:TweenMax = null;

    public loop:boolean = false;

    constructor(numOfItems, itemWidth, itemHeight, totalItemsVisible, container)
    {
        super();

        this._numberOfItems = numOfItems;
        this._widthOfItem = itemWidth;
        this._heightOfItem = itemHeight;
        this._itemsVisible = totalItemsVisible;
        this._container = container;

        this._container.getChildren();


        this._maxIndex = Math.floor((this._numberOfItems - 1) / this._itemsVisible);
    }


    setClipBuckets(bucketList)
    {
//    this.bucketHolder.removeChildren();
//    this.bucketHolder.addChildren(bucketList);
//
//    this.itemList = this.carouselWrapper.getChild("ul").getChildren("li");
//    this._maxIndex = Math.floor((this.numberOfItems - 1) / this.options.itemsVisible);
//
//    this.numberOfItems = this.itemList.length;
//    this._widthOfItem = 202;
//    this._maxIndex = Math.floor((this.numberOfItems - 1) / this.options.itemsVisible);
//    this.carouselWidth = this._widthOfItem * this.numberOfItems + (80 + 60);//(padding-left, btn-next width)
    }

    transitionTo(index)
    {
        this._currentIndex = index;
        this.transition();

        if (this._currentIndex == 0)
        {
            this.dispatchEvent(new CarouselEvent(CarouselEvent.START));
        }
        if (this._currentIndex == this._maxIndex)
        {
            this.dispatchEvent(new CarouselEvent(CarouselEvent.END));
        }
    }

    transition()
    {
//        this._isMoving = true;

//        var leftOffset = this.carouselWrapper.style('left');

//        var transitionTween = new Fx.Tween(this.carouselWrapper.mainElement);
//        transitionTween.addEvent(FxEvent.START, this.onTweenStart.bind(this));
//        transitionTween.addEvent(FxEvent.COMPLETE, this.onTweenComplete.bind(this));
//
        var numberOfFullTransitions = Math.floor(this._numberOfItems / this._itemsVisible);
        var itemsLeftOver = this._numberOfItems - (numberOfFullTransitions * this._itemsVisible);
        var numOfSlidesLeft = this._maxIndex - this._currentIndex;
        var slideWidth = this._widthOfItem * this._itemsVisible;
        var removeAmount = (numOfSlidesLeft == 0) ? slideWidth - (this._widthOfItem * itemsLeftOver) : 0;
        var position = -(slideWidth * this._currentIndex - removeAmount);

        console.log(position, this._container.numChildren);
//        this._tween = TweenMax.to(this._container.$el, 1, {x: position});


        var tl = new TimelineLite();
        for (var i:number = 0; i < 10; i++)
        {
            tl.add( TweenLite.to((<DOMElement>this._container.children[i]).$el, 0.5, {x: position}), 0 );
        }


        this.dispatchEvent(new CarouselEvent(CarouselEvent.CHANGE));
    }

    private moveNext()
    {
        var totalMoves = Math.floor(this._numberOfItems / this._itemsVisible);

        if (this._currentIndex == totalMoves && !this.loop || this._isMoving) return;

        this._currentIndex++;
        if (this._currentIndex > totalMoves)
        {
            this._currentIndex = 0;
        }

        this.transitionTo(this._currentIndex);
        this.dispatchEvent(new CarouselEvent(CarouselEvent.NEXT));
    }

    private movePrevious()
    {
        if (this._currentIndex == 0 && !this.loop || this._isMoving) return;

        this._currentIndex--;
        if (this._currentIndex < 0)
        {
            this._currentIndex = this._maxIndex;
        }
        this.transitionTo(this._currentIndex);
        this.dispatchEvent(new CarouselEvent(CarouselEvent.PREVIOUS));
    }

    onTweenStart()
    {
//        this.tweenProgressTimer = this.onTweenProgress.periodical(10, this);
        this.dispatchEvent(new CarouselEvent(CarouselEvent.START));
    }

    onTweenComplete(event)
    {
//        clearInterval(this.tweenProgressTimer);
//
        this._isMoving = false;
        this.dispatchEvent(new CarouselEvent(CarouselEvent.COMPLETE));
    }

    onTweenProgress(event)
    {
        this.dispatchEvent(new CarouselEvent(CarouselEvent.PROGRESS, false, false, this.getPercent()));
    }

    public prev()
    {
        this.stop();
        this.movePrevious();
    }

    public next()
    {
        this.stop();
        this.moveNext();
    }

    moveTo(index)
    {
        this.stop();
        this.transitionTo(index);
    }

    play()
    {
        this.stop();
//        this.autoSlideTimer = this.moveNext.periodical(this.options.speed, this);
    }

    public stop()
    {
//        clearInterval(this.autoSlideTimer);
    }

    setPercent(value)
    {
//        this.movedPercent = value;
//
//        var maskWidth = this.width();
//        var distance = (this.movedPercent / 100) * (maskWidth - this.carouselWidth);
//        this.carouselWrapper.style("left", distance);
    }

    getPercent()
    {
//        var maskX = this.mainElement.getPosition("left").x;
//        var maskWidth = this.width();
//        var leftMargin = 80;
//        var carouselX = (this.carouselWrapper.getPosition("left").x - leftMargin) - maskX;
//        this.movedPercent = (carouselX / (maskWidth - this.carouselWidth)) * 100;
//
//        return Math.round(this.movedPercent);
    }

    getDropTargets()
    {
//        return this.getChild("ul").getChildren(".drop-target")
    }

}
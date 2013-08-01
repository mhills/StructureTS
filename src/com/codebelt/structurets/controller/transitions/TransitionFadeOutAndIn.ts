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

///<reference path='BaseTransition.ts'/>
///<reference path='../../interfaces/ITransition.ts'/>
///<reference path='../../display/DisplayObject.ts'/>
///<reference path='../../display/DOMElement.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TransitionFadeOutAndIn
 * @extends BaseTransition
 * @module StructureTS
 * @submodule controller
 * @constructor
 **/
class TransitionFadeOutAndIn extends BaseTransition
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'TransitionFadeOutAndIn';

    constructor()
    {
        super();
    }

    public createTransition(transitionType:string, viewContainer:DisplayObject, currentView:DOMElement, nextView:DOMElement, duration:number = 0.5):ITransition
    {
        var varsObject = {
            onStart: this.onTweenStart,
            onStartScope: this,
            onUpdate: this.onTweenUpdate,
            onUpdateScope: this,
            onComplete: this.onTweenComplete,
            onCompleteScope: this
        }
        this.transition = new TimelineMax(varsObject);
        this.transition.add(TweenMax.to(currentView.$el, duration, {opacity: 0, ease: Expo.easeInOut}));
        this.transition.add(TweenMax.from(nextView.$el, duration, {opacity: 0, ease: Expo.easeInOut}));

        return this;
    }

    /**
     * @copy EventDispatcher.destroy
     * @overridden
     */
    public destroy():void
    {
        super.destroy();
    }

}
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
///<reference path='../../display/DisplayObjectContainer.ts'/>
///<reference path='../../display/DOMElement.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TransitionNone
 * @extends BaseTransition
 * @module StructureTS
 * @submodule controller
 * @constructor
 **/
class TransitionNone extends BaseTransition
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'TransitionNone';

    constructor()
    {
        super();
    }

    /**
     * @copy BaseTransition.createTransition
     * @overridden
     */
    public createTransition(transitionType:string, viewContainer:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = 0):ITransition
    {
        // Needs a setTimeout because the events would fire before the addEventListener had time to be setup on the Transition object.
        setTimeout(() =>
        {
            // Calls all event methods right way so the current view can be removed and the next view will added. This transition is just a swap of views.
            this.onTweenStart();
            this.onTweenUpdate();
            this.onTweenComplete();
        }, 100);

        return this;
    }

    /**
     * @copy BaseTransition.destroy
     * @overridden
     */
    public destroy():void
    {
        super.destroy();
    }

}
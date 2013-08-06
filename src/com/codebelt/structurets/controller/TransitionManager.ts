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

///<reference path='BaseController.ts'/>
///<reference path='../display/DOMElement.ts'/>
///<reference path='../utils/TransitionFactory.ts'/>
///<reference path='../interfaces/ITransition.ts'/>
///<reference path='../constants/TransitionType.ts'/>
///<reference path='../events/TransitionManagerEvent.ts'/>
///<reference path='../events/TweenEvent.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TransitionManager
 * @extends BaseController
 * @constructor
 **/
class TransitionManager extends BaseController
{
    public CLASS_NAME:string = 'TransitionManager';

    public static READY:string = 'ready';
    public static TRANSITION_RUNNING:string = 'transitionRunning';

    private _viewContainer:DOMElement = null;
    private _currentView:DOMElement = null;
    private _nextView:DOMElement = null;
    private _state:string = TransitionManager.READY;

    private _transitionFactory:TransitionFactory = new TransitionFactory();
    private _runningTransition:ITransition = null;

    constructor(displayContainer:DOMElement)
    {
        super();

        this._viewContainer = displayContainer;
    }

    public getCurrentView():DisplayObject
    {
        return this._currentView;
    }

    public getSectionStage():DisplayObject
    {
        return this._viewContainer;
    }

    public setTransitionContainer(displayContainer:DOMElement):any
    {
        this._viewContainer = displayContainer;

        return this;
    }

    public isTransitioning():boolean
    {
        return this._state != TransitionManager.READY;
    }

    public getState():string
    {
        return this._state;
    }

    public registerTransition(key:string, transitionFactory:ITransition):any
    {
        this._transitionFactory.registerTransition(key, transitionFactory);

        return this;
    }

    public setCurrentView(currentView:DOMElement):any
    {
        this._currentView = currentView;
        this._viewContainer.addChild(this._currentView);
        this._currentView.enable();

        return this;
    }

    /**
     * @copy BaseController.destroy
     * @overridden
     */
    public destroy():void
    {
        this._viewContainer = null;
        this._currentView = null;
        this._nextView = null;

        this._transitionFactory.destroy();
        this._transitionFactory = null;
        this._runningTransition.destroy();
        this._runningTransition = null;

        super.destroy();
    }

    private removeCurrentView():any
    {
        if (!this._currentView)
        {
            return this;
        }
        this._viewContainer.removeChild(this._currentView);
        this._currentView.disable();
        this._currentView = this._nextView;
        this._nextView = null;

        return this;
    }

    public transitionToNextView(nextView:DOMElement, transitionType:string = TransitionType.NONE, transitionDuration:number = -1):any
    {
        // If the current view is not set then throw an error.
        if (this._currentView == null)
        {
            throw new Error('[TransitionManager] The current view must be set before attempting to transition to another view. See the setCurrentView method');
        }

        // If the transition is running then complete right away so we can start the next one.
        if (this.isTransitioning())
        {
            this._runningTransition.complete();
        }

        // Assign the next view and add it to the reference view container.
        this._nextView = nextView;
        this._viewContainer.addChild(this._nextView);
        this._nextView.enable();

        // Create the transition and listen for events.
        this._runningTransition = this._transitionFactory.createTransition(transitionType, this._viewContainer, this._currentView, this._nextView, transitionDuration);
        this._runningTransition.addEventListener(TweenEvent.START, this.onTransitionStart, this);
        //this._runningTransition.addEventListener(TweenEvent.UPDATE, this.onTransitionUpdate, this);
        this._runningTransition.addEventListener(TweenEvent.COMPLETE, this.onTransitionComplete, this);

        this._state = TransitionManager.TRANSITION_RUNNING;

        return this;
    }

    private onTransitionStart(event:TweenEvent):any
    {
        this.dispatchEvent(new TransitionManagerEvent(TransitionManagerEvent.TRANSITION_START));
        return this;
    }

    private onTransitionComplete(event:TweenEvent):any
    {
        if (this._currentView)
        {
            this.removeCurrentView();
        }

        if (this._runningTransition)
        {
            this._runningTransition.removeEventListener(TweenEvent.START, this.onTransitionStart, this);
            this._runningTransition.removeEventListener(TweenEvent.COMPLETE, this.onTransitionComplete, this);
            this._runningTransition = null;
        }

        this._state = TransitionManager.READY;
        this.dispatchEvent(new TransitionManagerEvent(TransitionManagerEvent.TRANSITION_COMPLETE));

        return this;
    }

}
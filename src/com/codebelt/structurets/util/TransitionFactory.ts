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

///<reference path='../BaseObject.ts'/>
///<reference path='../display/DisplayObjectContainer.ts'/>
///<reference path='../display/DOMElement.ts'/>
///<reference path='../interface/ITransition.ts'/>
///<reference path='../constant/TransitionType.ts'/>
///<reference path='../controller/transition/TransitionNone.ts'/>
///<reference path='../controller/transition/TransitionPushLeft.ts'/>
///<reference path='../controller/transition/TransitionPushRight.ts'/>
///<reference path='../controller/transition/TransitionPushUp.ts'/>
///<reference path='../controller/transition/TransitionPushDown.ts'/>
///<reference path='../controller/transition/TransitionCrossFade.ts'/>
///<reference path='../controller/transition/TransitionFadeOutAndIn.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TransitionFactory
 * @extends BaseObject
 * @module StructureTS
 * @submodule util
 * @constructor
 * @version 0.1.0
 **/
class TransitionFactory extends BaseObject
{
    /**
     * @overridden BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'TransitionFactory';

    /**
     * YUIDoc_comment
     *
     * @property _transitions
     * @type {Object}
     * @private
     */
    private _transitions:Object = {};

    constructor()
    {
        super();

        this.registerTransition(TransitionType.NONE, new TransitionNone());
        this.registerTransition(TransitionType.PUSH_LEFT, new TransitionPushLeft());
        this.registerTransition(TransitionType.PUSH_RIGHT, new TransitionPushRight());
        this.registerTransition(TransitionType.PUSH_UP, new TransitionPushUp());
        this.registerTransition(TransitionType.PUSH_DOWN, new TransitionPushDown());
        this.registerTransition(TransitionType.CROSSFADE, new TransitionCrossFade());
        this.registerTransition(TransitionType.FADE_OUT_AND_IN, new TransitionFadeOutAndIn());
    }

    /**
     * YUIDoc_comment
     *
     * @param transitionType {string}
     * @param sectionStage {DisplayObjectContainer}
     * @param currentView {DOMElement}
     * @param nextView {DOMElement}
     * @param duration {number}
     * @returns {ITransition}
     */
    public createTransition(transitionType:string, sectionStage:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = -1):ITransition
    {
        var concreteFactory:ITransition = this._transitions[transitionType];
        if (concreteFactory == null)
        {
            throw new Error('['+this.getQualifiedClassName()+'] Not found factory for type: ' + transitionType);
        }

        if (duration >= 0)
        {
            return concreteFactory.createTransition(transitionType, sectionStage, currentView, nextView, duration);
        }
        else
        {
            return concreteFactory.createTransition(transitionType, sectionStage, currentView, nextView);
        }
    }

    /**
     * The registerTransition method allows you to add custom transitions to the {{#crossLink "TransitionFactory"}}{{/crossLink}}.
     *
     * @method registerTransition
     * @param key {string} The key value for the transition being passed in.
     * @param transitionFactory{ITransition} A transition that implements {{#crossLink "ITransition"}}{{/crossLink}}.
     * @chainable
     * @public
     */
    public registerTransition(key:string, transitionFactory:ITransition):any
    {
        if (this._transitions.hasOwnProperty(key))
        {
            throw new Error('['+this.getQualifiedClassName()+'] A transition with that key has already been registered.');
        }

        this._transitions[key] = transitionFactory;

        return this;
    }

    /**
     * @overridden BaseObject.destroy
     */
    public destroy():void
    {
        super.destroy();

        this._transitions = null;
    }

}
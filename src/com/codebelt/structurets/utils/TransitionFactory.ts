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
///<reference path='../display/DisplayObject.ts'/>
///<reference path='../display/DOMElement.ts'/>
///<reference path='../interfaces/ITransition.ts'/>
///<reference path='../constants/TransitionType.ts'/>
///<reference path='../controller/transitions/TransitionNone.ts'/>
///<reference path='../controller/transitions/TransitionPushLeft.ts'/>
///<reference path='../controller/transitions/TransitionPushRight.ts'/>
///<reference path='../controller/transitions/TransitionPushUp.ts'/>
///<reference path='../controller/transitions/TransitionPushDown.ts'/>
///<reference path='../controller/transitions/TransitionCrossFade.ts'/>
///<reference path='../controller/transitions/TransitionFadeOutAndIn.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TransitionFactory
 * @extends BaseObject
 * @constructor
 **/
class TransitionFactory extends BaseObject
{
    public CLASS_NAME:string = 'TransitionFactory';

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

    public createTransition(transitionType:string, sectionStage:DisplayObject, currentView:DOMElement, nextView:DOMElement, duration:number = -1):ITransition
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

    public registerTransition(key:string, transitionFactory:ITransition):void
    {
        // TODO: should this throw an error or just not add the ITransition?
        if (this._transitions.hasOwnProperty(key))
        {
            throw new Error('['+this.getQualifiedClassName()+'] A transition with that key has already been registered.');
        }

        this._transitions[key] = transitionFactory;
    }

    /**
     * @copy BaseObject.destroy
     * @overridden
     */
    public destroy():void
    {
        this._transitions = null;

        super.destroy();
    }

}
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

///<reference path='DOMElement.ts'/>

/**
 * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main or root class.
 *
 * @class Stage
 * @extends DOMElement
 * @uses EventDispatcher
 * @param {Object} [target]
 * @example
 * This example illustrates how to setup your main or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
 *
 *      class MainClass extends Stage {
 *
 *          constructor() {
 *              super();
 *          }
 *
 *          public createChildren():void {
 *              super.createChildren();
 *              // Add children classes.
 *          }
 *
 *           public enable():void {
 *              if (this.isEnabled === true) return;
 *              // Add listeners and/or enable children.
 *              super.enable();
 *           }
 *
 *           public disable():void {
 *              if (this.isEnabled === false) return;
 *              // Remove listeners and/or disable children.
 *              super.disable();
 *           }
 *
 *      }
 *
 * <b>Instantiation Example</b><br>
 * This example illustrates how to instantiation your main or root class.
 *
 *      var app = new MainClass();
 *      app.appendTo('body');
 *
 * @module StructureTS
 * @submodule view
 * @constructor
 **/
class Stage extends DOMElement
{
    /**
     * @copy DOMElement.CLASS_NAME
     */
    public CLASS_NAME:string = 'Stage';

    constructor()
    {
        super();
    }

    /**
     *
     * @method appendTo
     * @param type
     * @param enabled
     */
    public appendTo(type:string, enabled:boolean = true)
    {
        this.$el = jQuery(type);

        if (!this.isCreated) {
            this.createChildren();
            this.isCreated = true;
        }

        if (enabled) {
            this.enable();
        } else {
            this.disable();
        }

    }

}

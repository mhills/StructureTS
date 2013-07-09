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
 *          constructor(selector:string) {
 *              super(selector);
 *          }
 *
 *          public createChildren():void {
 *              super.createChildren();
 *              // Add children classes.
 *          }
 *
 *          public enabled(value:boolean):void {
 *              if (value == this.isEnabled) return;
 *
 *              if (value) {
 *                  // Add event listeners.
 *              } else {
 *                  // Remove event listeners.
 *              }
 *              super.enabled(value);
 *          }
 *
 *      }
 *
 * <b>Instantiation Example</b><br>
 * This example illustrates how to instantiation your main or root class.
 *
 *      var app = new MainClass('body');
 *      app.enabled(true);
 *
 * @constructor
 **/
class Stage extends DOMElement
{

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

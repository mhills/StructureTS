
/**
 * Base DOM element that is used to dynamically build up the user interface
 */
var RenderableDOMElement = new Class({
    Extends: EventDispatcher,
    Implements: [Options],

    created: false,
    templateName: "RenderableDOMElement",
    mainElement: null,
    isEnabled: false,
    elementArray: [],

    domString: null,
    parentNode: null,
    markupAttributes: null,
    options: {},

    initialize: function() { },

    /**
     * Provide the method for which the DOM elements will be rendered
     * @protected
     */
    setupElements: function() { },

    /**
     * Render the actual DOM element and return it
     * @protected
     */
    renderMainElement: function()
    {
        var returnElement = null;

        if (this.domString) {
            returnElement = new Element(this.domString);
        } else if (this.parentNode && this.markupAttributes) {
            returnElement = new Element(this.parentNode, this.markupAttributes);
        } else {
            returnElement = Mooml.render(this.templateName, this.options);
        }

        return returnElement
    },

    /**
     * Called after setupElements; Used to add children to the DOM
     * @protected
     */
    createChildren: function()
    {
        if (this.elementArray && this.elementArray.length > 0) {
            this.mainElement.adopt(this.elementArray);
        }
    },

    /**
     * Called after createChildren; Used to update/render children
     * @protected
     */
    layoutChildren: function() { },

    /**
     * Sets a boolean value to change this class element state or add/remove event listeners
     * @param {Boolean} value
     * @public
     */
    enabled: function(value)
    {
        this.isEnabled = value;
    },

    /**
     * Render this control; occurs automatically when integrated into UI by consuming class
     * @protected
     */
    toElement: function()
    {
        if(!this.created)
        {
            this.setupElements();
            this.mainElement = this.renderMainElement();

            this.createChildren();
            this.created = true;
        }

        this.layoutChildren();
//        this.dispatchEvent(Event.RENDER);

        return this.mainElement;
    },

    /**
     * Notify the control that something has changed, so clear out the UI and re-layout
     * @public
     */
    invalidate: function()
    {
        if (!this.mainElement) return;

        this.layoutChildren();
    },

    /**
     * Clear out the UI associated with this control
     * @public
     */
    destroyUI: function()
    {
        this.mainElement.removeEvents();
        this.mainElement.destroy();
        this.mainElement.dispose();
    },

    /**
     * @override Adds an event listener to the class, no matter the nature
     * @public
     */
    addEventListener: function(event, callback)
    {
        if (!this.mainElement) return;
        this.mainElement.addEvent(event, callback);
    },

    /**
     * @override Dispatch an event to be caught by other classes
     * @public
     */
    dispatchEvent: function(event, data)
    {
        var eventString = event;
        var eventData = data
        if (typeOf(event) != "string") {
            eventString = event.type;
            eventData = event;
            eventData.data = data;
        }

        if (!this.mainElement) return;
        this.mainElement.fireEvent(eventString, eventData);
    },

    /**
     * @override Removes all events on this class
     * @public
     */
    removeEventListeners: function()
    {
        this.mainElement.removeEvents();
    }

});

/**
 * The base class for all controls that will be displayed by this application
 */
var DisplayObject = new Class({
    Extends: RenderableDOMElement,

    /** @type {String} Indicates the instance name of the DisplayObject. */
    name: null,
    isVisible: true,

    /**
     * @constructor
     */
    initialize: function(domNode, markupAttribs)
    {
        if (domNode && markupAttribs) {
            this.parentNode = domNode;
            this.markupAttributes = markupAttribs;
        }
    },

    /**
     * Convenience function override to set the domString value in overridden classes
     * @protected
     */
    setupElements: function(domString)
    {
        if (domString) {
            this.domString = domString;
        }
    },

    /**
     * @param {DisplayObject} displayObject Helper method to add a class displayObject to the DOM.
     * If the main element for the class is not added to the DOM then the class holds the added
     * elements to an array that will be rendered to the DOM once the main element is add to the DOM
     * @public
     */
    addChild: function(displayObject)
    {
        //displayObject.parent = this;//TODO: add parent reference. (Make sure to to look at addChildren method and maybe others *NOTE parent is a method name in mootools)

        if (this.mainElement) {
            this.mainElement.grab(displayObject);
        } else {
            this.elementArray.push(displayObject);
        }
        return this;
    },

    /**
     *
     * @param {displayObject}
     * @param {displayIndex}
     * @public
     */
    addChildAt: function(displayObject, displayIndex)
    {
        var children = this.mainElement.getChildren();
        var length = children.length;

        // If the displayIndex passed in is less than 0 and greater than
        // the total number of children then place the item at the end.
        if(displayIndex == undefined || displayIndex < 0 || displayIndex >= length)
        {
            displayObject.toElement();
            this.addChild(displayObject.mainElement);
        }
        // Else get the child in the children array by the
        // displayIndex passed in and place the item before that child.
        else
        {
            displayObject.toElement();// Render the item before adding to the DOM
            children[displayIndex].grab(displayObject.mainElement, 'before');
        }
        return this;
    },

    /**
     *
     * @param {arrayOfChildern}
     * @public
     */
    addChildren: function(arrayOfChildern)
    {
        this.mainElement.adopt(arrayOfChildern);
        return this;
    },

    /**
     *
     * @param {childSelector}
     * @return {DisplayObject}
     * @public
     */
    getChild: function(childSelector)
    {
        var container = new DisplayObject();
        container.mainElement = this.mainElement.getElement(childSelector);
        //container.domString = this.mainElement.getElement(childSelector).toString();
        return container;
    },

    /**
     *
     * @param {displayIndex}
     * @return {DisplayObject}
     * @public
     */
    getChildAt: function(displayIndex)
    {
        var children = this.mainElement.getChildren();
        var display = new DisplayObject();
        display.mainElement = children[displayIndex];
        //display.domString = children[displayIndex].toString();

        return display;
    },

    /**
     *
     * @param childSelector
     * @return {Array}
     * @public
     */
    getChildren: function(childSelector)
    {
        var children = this.mainElement.getChildren(childSelector);
        var displayObjects = [];

        children.each(function (item, index, object)
        {
            var displayObject = new DisplayObject();
            displayObject.mainElement = item;
            //displayObject.domString = item.toString();
            displayObjects.push(displayObject)
        });

        return displayObjects;
    },

    /**
     *
     * @param {child}
        * @public
     */
    removeChild: function(child)
    {
        child.mainElement.removeEvents();
        child.mainElement.dispose();
        return this;
    },

    /**
     *
     * @return {*}
     * @public
     */
    removeChildren: function()
    {
        this.mainElement.removeEvents();
        this.mainElement.empty();
        return this;
    },

    /**
     *
     * @return {int}
     * @public
     */
    numChildren: function ()
    {
        var children = this.mainElement.getChildren();
        return children.length;
    },

    /**
     *
     * @param {Number}
     * @public
     */
    alpha: function (number)
    {
        this.style('opacity', number);
        return this;
    },

    /**
     *
     * @param {Boolean} value
     * @public
     */
    visible: function (value)
    {
        if (value == false) {
            this.isVisible = false;
            this.mainElement.hide();
        } else if (value == true) {
            this.isVisible = true;
            this.mainElement.show();
        } else if (value == undefined) {
            return this.isVisible;
        }
        return this;
    },

    /**
     * Checks a descendant of this display object for a match.
     * @param {DisplayObject} displayObject
     * @return {Boolean}
     */
    contains: function (displayObject)
    {
        return this.mainElement.contains(displayObject.mainElement);
    },

    /**
     *
     * @param {String} property The string key from the Element.Properties Object representing the property to set.
     * @param {Object} - value The value to set for the specified property.
     * @public
     */
    set: function (property, value)
    {
        this.mainElement.set(property, value);
        return this;
    },

    /**
     *
     * @param {String} property The string key from the Element.Properties Object representing the property to get.
     * @public
     */
    get: function (property)
    {
        return this.mainElement.get(property);
    },

    /**
     *
     * @param property
     * @param value
     * @return {*}
     * @public
     */
    style: function (property, value)
    {
        if (value != undefined) {
            this.mainElement.setStyle(property, value);
        } else {
            return this.mainElement.getStyle(property);
        }
        return this;
    },

    /**
     *
     * @param {String} className Adds the passed in class to the Element, if the Element doesn't already have it.
     * @public
     */
    addClass: function (className)
    {
        this.mainElement.addClass(className);
        return this;
    },

    /**
     * Tests the Element to see if it has the passed in className.
     * @param className
     * @return {Boolean} Returns true if the Element has the class, otherwise false.
     */
    hasClass: function (className)
    {
        return this.mainElement.hasClass(className);
    },

    /**
     *
     * @param {String} className Removes the class from the Element.
     * @public
     */
    removeClass: function (className)
    {
        this.mainElement.removeClass(className);
        return this;
    },

    /**
     * Adds or removes the passed in class name to the Element, depending on whether or not it's already present.
     * @param {String} className The class to add or remove.
     * @param {Boolean=} force Force the class to be either added or removed.
     * @public
     */
    toggleClass: function (className, force)
    {
        this.mainElement.toggleClass(className, force);
        return this;
    },

    /**
     * Removes one class and adds the other. If the one to remove is not found the one to add is still added.
     * @param {String} removeClass The class to remove.
     * @param {Boolean=} addClass The css class to add.
     * @public
     */
    swapClass: function (removeClass, addClass)
    {
        this.mainElement.swapClass(removeClass, addClass);
        return this;
    },

    /**
     *
     * @param width
     * @param height
     * @return {*}
     * @public
     */
    setSize: function(width, height)
    {
        this.style('width', width);
        this.style('height', height);
        return this;
    },

//    getOuterWidth: function ()
//    {
//        //TODO: return element width with padding and margin.
//    },

    /**
     *
     * @param {String=} value
     * @return {Number}
     * @public
     */
    width: function (value)
    {
        if (value != undefined) {
            this.mainElement.setStyle('width', value);
        } else {
            return this.mainElement.getStyle('width').toInt();
        }
        return this;
    },

    /**
     *
     * @param {String=} value
     * @return {Number}
     * @public
     */
    height: function (value)
    {
        if (value != undefined) {
            this.mainElement.setStyle('height', value);
        } else {
            return this.mainElement.getStyle('height').toInt();
        }
        return this;
    },

    /**
     * Returns the real offsets of the element.
     * @param {String=} relative
     * @return {Object}
     */
    getPosition: function (relative)
    {
        return this.mainElement.getPosition(relative);
    }

});

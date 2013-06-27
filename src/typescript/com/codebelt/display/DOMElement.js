var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DOMElement = (function (_super) {
    __extends(DOMElement, _super);
    function DOMElement(type, params) {
        if (typeof params === "undefined") { params = {}; }
        _super.call(this);
        this.CLASS_NAME = 'DOMElement';
        this._node = null;
        this._options = {};
        this.templateName = "DOMElement";
        this._isVisible = true;
        this.el = null;
        this.$el = null;

        this._node = type;
        this._options = params;
    }
    DOMElement.prototype.createChildren = function () {
        if (this._node && !this.$el) {
            this.$el = jQuery("<" + this._node + "/>", this._options);
        } else if (!this._node && !this.$el) {
            this.$el = jQuery(Jaml.render(this.templateName, this._options));
        }

        this.el = this.$el[0];
    };

    DOMElement.prototype.addChild = function (displayObject) {
        _super.prototype.addChild.call(this, displayObject);

        if (!displayObject.isCreated) {
            displayObject.createChildren();
            displayObject.isCreated = true;
        }
        displayObject.layoutChildren();
        this.$el.append(displayObject.$el);

        return this;
    };

    DOMElement.prototype.addChildAt = function (displayObject, displayIndex) {
        var children = this.$el.children();
        var length = children.length;

        if (displayIndex < 0 || displayIndex >= length) {
            this.addChild(displayObject);
        } else {
            displayObject.parent = this;
            if (!displayObject.isCreated) {
                displayObject.createChildren();
                displayObject.isCreated = true;
            }
            displayObject.layoutChildren();
            jQuery(children.get(displayIndex)).before(displayObject.$el);

            _super.prototype.addChildAt.call(this, displayObject, displayIndex);
        }

        return this;
    };

    DOMElement.prototype.getChild = function (selector) {
        var jQueryElement = this.$el.find(selector);

        if (jQueryElement.length == 0) {
            throw new Error('[DOMElement] getChild("' + selector + '") Cannot find DOM $el');
        }

        for (var index in this.children) {
            var displayObject = this.children[index];
            if (jQueryElement.is(displayObject.$el)) {
                return displayObject;
            }
        }

        var domElement = new DOMElement();
        domElement.$el = jQueryElement;
        domElement.el = jQueryElement[0];
        return domElement;
    };

    DOMElement.prototype.removeChild = function (displayObject) {
        displayObject.enabled(false);
        displayObject.$el.unbind();
        displayObject.$el.remove();

        _super.prototype.removeChild.call(this, displayObject);

        return this;
    };

    DOMElement.prototype.removeChildren = function () {
        _super.prototype.removeChildren.call(this);

        this.$el.empty();

        return this;
    };

    DOMElement.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        _super.prototype.enabled.call(this, value);
    };

    DOMElement.prototype.invalidateLayout = function () {
        this.layoutChildren();
    };

    DOMElement.prototype.layoutChildren = function () {
    };

    DOMElement.prototype.alpha = function (number) {
        this.$el.css('opacity', number);
        return this;
    };

    DOMElement.prototype.visible = function (value) {
        if (value == false) {
            this._isVisible = false;
            this.$el.hide();
        } else if (value == true) {
            this._isVisible = true;
            this.$el.show();
        } else if (value == undefined) {
            return this._isVisible;
        }
        return this;
    };
    return DOMElement;
})(DisplayObject);

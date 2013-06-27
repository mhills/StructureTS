var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        _super.call(this);
        this.CLASS_NAME = 'DisplayObject';
        this.name = null;
        this.isEnabled = false;
        this.isCreated = false;
        this.children = [];
    }
    DisplayObject.prototype.createChildren = function () {
    };

    DisplayObject.prototype.addChild = function (displayObject) {
        if (displayObject.parent) {
            displayObject.parent.removeChild(displayObject);
        }

        this.children.unshift(displayObject);

        displayObject.parent = this;

        return this;
    };

    DisplayObject.prototype.removeChild = function (displayObject) {
        console.log(displayObject);
        var index = this.children.indexOf(displayObject);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        displayObject.enabled(false);
        displayObject.parent = null;

        return this;
    };

    DisplayObject.prototype.removeChildren = function () {
        while (this.children.length > 0) {
            this.removeChild(this.children.pop());
        }
        return this;
    };

    DisplayObject.prototype.addChildAt = function (displayObject, displayIndex) {
        this.children.unshift(displayObject);

        return this;
    };

    DisplayObject.prototype.getChild = function (displayObject) {
        var index = this.children.indexOf(displayObject);
        return this.children[index];
    };

    DisplayObject.prototype.enabled = function (value) {
        if (value == this.isEnabled)
            return;

        if (value) {
        } else {
        }

        this.isEnabled = value;
    };

    DisplayObject.prototype.invalidateLayout = function () {
        this.layoutChildren();
    };

    DisplayObject.prototype.layoutChildren = function () {
    };
    return DisplayObject;
})(EventDispatcher);

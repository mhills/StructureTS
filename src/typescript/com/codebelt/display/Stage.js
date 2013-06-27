var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(type) {
        _super.call(this, type);

        this._type = type;
        this.createChildren();
    }
    Stage.prototype.createChildren = function () {
        this.$el = jQuery(this._type);
    };
    return Stage;
})(DOMElement);

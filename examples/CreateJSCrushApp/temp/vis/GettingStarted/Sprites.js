var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Sprites = (function (_super) {
    __extends(Sprites, _super);
    function Sprites(bitmapAnimation, cX, cY) {
        _super.call(this, bitmapAnimation.spriteSheet);
        this.animations = [
            "run", 
            "idle"
        ];
        this.animOn = false;
        this.x = cX;
        this.y = cY;
        this.name = Sprites.nam.toString();
        ;
        var rand = Math.floor(Math.random() * 2);
        this.gotoAndPlay(this.animations[rand]);
        var handleMouse_bind = this.handleMouse.bind(this);
        this.addEventListener(Constants.MOUSE_DOWN, handleMouse_bind);
        Sprites.nam++;
    }
    Sprites.nam = 0;
    Sprites.prototype.handleMouse = function (event) {
        if(this.animOn) {
            return;
        }
        this.animOn = true;
        var rand = Math.floor(Math.random() * 2);
        this.gotoAndPlay(this.animations[rand]);
        var animEnd_bind = this.animEnd.bind(this);
        var tween = createjs.Tween.get(this, {
            loop: false
        }).to({
            x: this.x,
            y: this.y - 180
        }, 750, createjs.Ease.linear).to({
            x: this.x,
            y: this.y + 180
        }, 1500, createjs.Ease.linear).to({
            x: this.x,
            y: this.y
        }, 750, createjs.Ease.linear).call(animEnd_bind);
    };
    Sprites.prototype.animEnd = function (event) {
        this.animOn = false;
        this.dispatchEvent(Constants.TWEENS_END, this);
    };
    Sprites.prototype.getBitmapAnimation = function () {
        return this;
    };
    return Sprites;
})(createjs.BitmapAnimation);

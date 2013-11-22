var Game = (function () {
    function Game(manifest) {
        this.canvas = document.getElementById("canvas");
        this.stage = new createjs.Stage(this.canvas);
        this.stage.autoClear = true;
        createjs.Touch.enable(this.stage);
        this.stage.enableMouseOver(5);
        createjs.Ticker.setFPS(60);
        var tick_bind = this.tick.bind(this);
        createjs.Ticker.addEventListener("tick", tick_bind);
        this.container = new createjs.Container();
        this.stage.addChild(this.container);
        this.assetsManagerContainer = new AssetsManager(manifest);
        this.stage.addChild(this.assetsManagerContainer);
        var allAssetsLoaded_bind = this.allAssetsLoaded.bind(this);
        this.assetsManagerContainer.addEventListener(Constants.LOAD_COMPLETE, allAssetsLoaded_bind);
        this.assetsManagerContainer.startDownLoad();
    }
    Game.prototype.allAssetsLoaded = function (event) {
        console.log("All Assets Loaded !");
        event.target.removeEventListener(Constants.LOAD_COMPLETE, this.allAssetsLoaded);
        for(var i = 0; i < 12; i++) {
            var sprite = new Sprites(AssetsManager.array_bitmapAnimation[0].clone(), 64 + i * 70, 250);
            var spriteEvent_bind = this.spriteEvent.bind(this);
            sprite.addEventListener(Constants.TWEENS_END, spriteEvent_bind);
            this.container.addChild(sprite.getBitmapAnimation());
        }
        this.label = new createjs.Text("End tween for sprite n°", "bold 26px Arial", "#000000");
        this.label.textAlign = "center";
        this.label.x = 450;
        this.label.y = 450;
        this.container.addChild(this.label);
    };
    Game.prototype.spriteEvent = function (event) {
        console.log(event.target.name);
        this.label.text = "End tween for sprite n° " + event.target.name;
    };
    Game.prototype.tick = function (event) {
        this.stage.update(event);
    };
    return Game;
})();

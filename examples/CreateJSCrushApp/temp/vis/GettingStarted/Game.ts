/// <reference path="create/easeljs.d.ts" />
/// <reference path="create/preloadjs.d.ts" />
/// <reference path="AssetsManager.ts" />
/// <reference path="Constants.ts" />
/// <reference path="Sprites.ts" />

// Author : Samuel Girardin- http://www.visualiser.fr



class Game {

    private canvas;
    private stage:createjs.Stage;
    private assetsManagerContainer: AssetsManager;   
    private container: createjs.Container;
    private label: createjs.Text; 

    constructor(manifest: any[]) {

        // create stage and point it to the canvas:
        this.canvas = document.getElementById("canvas");
        //check to see if we are running in a browser with touch support
        this.stage = new createjs.Stage(this.canvas);
        this.stage.autoClear = true;
        // enable touch interactions if supported on the current device:
        createjs.Touch.enable(this.stage);
        // enabled mouse over / out events
        this.stage.enableMouseOver(5);
        // tick evvent
        createjs.Ticker.setFPS(60);
       
        // enterframeEvent
        var tick_bind = this.tick.bind(this);
        createjs.Ticker.addEventListener("tick", tick_bind);

        this.container = new createjs.Container();
        this.stage.addChild(this.container); 

        // create assetManagerObject as a container to display label and deal with the queueManager
        this.assetsManagerContainer = new AssetsManager(manifest);
        this.stage.addChild(this.assetsManagerContainer);
        var allAssetsLoaded_bind = this.allAssetsLoaded.bind(this);
        this.assetsManagerContainer.addEventListener(Constants.LOAD_COMPLETE, allAssetsLoaded_bind);
        this.assetsManagerContainer.startDownLoad();

    }

    private allAssetsLoaded(event): void {

        console.log("All Assets Loaded !");
        event.target.removeEventListener(Constants.LOAD_COMPLETE, this.allAssetsLoaded);
        

        // add some sprites
        for (var i: number = 0 ; i < 12 ; i++) {
            var sprite: Sprites = new Sprites(AssetsManager.array_bitmapAnimation[0].clone(), 64 + i * 70, 250);
            var spriteEvent_bind = this.spriteEvent.bind(this);
            sprite.addEventListener(Constants.TWEENS_END, spriteEvent_bind); 
            this.container.addChild(sprite.getBitmapAnimation()); 
        }

        //add one label
        this.label = new createjs.Text("End tween for sprite n°", "bold 26px Arial", "#000000");
        this.label.textAlign = "center";
        this.label.x = 450;
        this.label.y =450;
        this.container.addChild(this.label);

       

    }

    private spriteEvent(event): void {

        console.log(event.target.name);
        this.label.text = "End tween for sprite n° " + event.target.name; 
    }

    private tick(event):void {      
        this.stage.update(event);
    }


}
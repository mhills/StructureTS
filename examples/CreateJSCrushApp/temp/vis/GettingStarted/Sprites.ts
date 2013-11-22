/// <reference path="create/easeljs.d.ts" />
/// <reference path="Constants.ts" />

// Author : Samuel Girardin- http://www.visualiser.fr


class Sprites extends createjs.BitmapAnimation   {


    private animations: string[] = ["run", "idle"];
    private bitmapAnimation: createjs.BitmapAnimation;
    private animOn:bool = false ; 

    private static  nam:number = 0  ;  

    constructor(bitmapAnimation:createjs.BitmapAnimation , cX:number, cY:number) {
        
        super(bitmapAnimation.spriteSheet);       
       
        this.x = cX;
        this.y = cY;
        this.name = Sprites.nam.toString(); ;

        var rand = Math.floor(Math.random() * 2);
        this.gotoAndPlay(this.animations[rand]); 
       
        var handleMouse_bind = this.handleMouse.bind(this);
        this.addEventListener(Constants.MOUSE_DOWN, handleMouse_bind);       

        Sprites.nam++;
    }


    private handleMouse(event): void {

        if (this.animOn) return;

        this.animOn = true; 
        var rand = Math.floor(Math.random() * 2);
        this.gotoAndPlay(this.animations[rand]);
        var animEnd_bind = this.animEnd.bind(this);
        var tween = createjs.Tween.get(this, { loop: false })
                         .to({ x: this.x, y: this.y - 180 }, 750, createjs.Ease.linear)
                         .to({ x: this.x, y: this.y + 180 }, 1500, createjs.Ease.linear)
                         .to({ x: this.x, y: this.y }, 750, createjs.Ease.linear).call(animEnd_bind);

    }

    public animEnd(event) {

        this.animOn = false;
        this.dispatchEvent(Constants.TWEENS_END, this); 
    }

    public  getBitmapAnimation(): createjs.BitmapAnimation {

        return this; 
    }

}
///<reference path='../utils/BrowserUtils.ts'/>

/**
 * The RouterController...
 *
 * @class RouterController
 * @constructor
 **/
class RouterController {

    constructor()
    {
        //only required if you want to set a default value
//        if(! hasher.getHash()){
//            hasher.setHash(DEFAULT_HASH);
//        }
//        console.log("hasher.getHash()", hasher.getHash())
    }

    public addRoute(pattern:string, handler:Function, scope:any, priority?:number):void
    {
        crossroads.addRoute(pattern, handler.bind(scope), priority);
    }

    public start():void
    {
//        crossroads.routed.add(console.log, console); //log all routes

        hasher.initialized.add(this.parseHash); //parse initial hash
        hasher.changed.add(this.parseHash); //parse hash changes
        hasher.init(); //start listening for hash changes
    }

    public parseHash(newHash, oldHash):void
    {
        // second parameter of crossroads.parse() is the "defaultArguments" and should be an array
        // so we ignore the "oldHash" argument to avoid issues.
        crossroads.parse(newHash);
    }

}
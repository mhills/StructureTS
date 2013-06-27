interface Crossroads {

    VERSION:string;

    bypassed:any;//:Signal;
    routed:any;//:Signal;
    normalizeFn:Function;
    shouldTypecast:bool;
    greedy:bool;
    greedyEnabled:bool;
    ignoreState:bool;
    matched:any;//:Signal;

    addRoute(pattern:string, handler?:Function, priority?:number):Route;
    removeRoute(route:Route):void;
    removeAllRoutes():void;
    parse(request:string, defaultArgs?:any[]) :void;
    getNumRoutes():number;
    create():Router;
    resetState():void;
    pipe(Router):void;
    unpipe(Router):void;
}

declare var crossroads:Crossroads;
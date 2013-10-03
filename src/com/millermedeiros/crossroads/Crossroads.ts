///<reference path='../signals/Signal.ts'/>
///<reference path='PatternLexer.ts'/>
///<reference path='Route.ts'/>

module millermedeiros
{
    /**
     * YUIDoc_comment
     *
     * @class Crossroads
     * @constructor
     * @author Miller Medeiros
     * @module millermedeiros
     * @submodule crossroads
     **/
    export class Crossroads {

        /**
         * String representation of the crossroads version number (e.g. "0.6.0").
         *
         * @property VERSION
         * @type {string}
         * @static
         * @final
         */
        public static VERSION:string = '0.12.0';

        public static NORM_AS_ARRAY:Function = function(req, vals) {
            return [vals.vals_];
        };

        public static NORM_AS_OBJECT:Function = function(req, vals) {
            return [vals];
        };

        private _routes:Route[] = [];
        private _prevRoutes:Route[] = [];

        public _piped = [];
        public _prevMatchedRequest = null;
        public _prevBypassedRequest = null;
        public normalizeFn = null;

        public greedy:boolean = false;
        public greedyEnabled:boolean = true;
        public ignoreCase:boolean = true;
        public ignoreState:boolean = false;
        public shouldTypecast:boolean = false;

        public bypassed:Signal = new Signal();
        public routed:Signal = new Signal();
        public patternLexer:PatternLexer = new PatternLexer();

        constructor()
        {
        }

        public resetState()
        {
            this._prevRoutes.length = 0;
            this._prevMatchedRequest = null;
            this._prevBypassedRequest = null;
        }

        public create():Crossroads
        {
            return new Crossroads();
        }

//
//        Creates a new route pattern listener and add it to crossroads routes collection.
//
//        Parameters
//
//        pattern:String|RegExp
//        String pattern or Regular Expression that should be used to match against requests.
//        If pattern is a String it can contain named variables surrounded by "{}" that will be evaluated and passed to handlers as parameters. Each pattern segment is limited by the "/" char, so named variables will match anything until it finds a "/" char or the next string token located after the variable.
//        The pattern "{foo}/{bar}" will match "lorem/ipsum-dolor" but won't match "lorem/ipsum-dolor/sit". Trailing slashes at the end/begin of the request are ignored by default, so /{foo}/ matches same requests as {foo}. - If you need to match segments that may contain "/" use a regular expression instead of a string pattern.
//        A pattern can also have optional segments, which should be surrounded by "::" (e.g. "news/:foo:/:bar:" will match "news", "news/123" and "news/123/asd")
//        If pattern is a RegExp, capturing groups will be passed as parameters to handlers on the same order as they were matched.
//        It also allows "rest" segments (ending with *) which can match multiple segments. Rest segments can be optional and/or required and don't need to be the last segment of the pattern. The pattern "{foo}/:bar*:" will match news "news/123", "news/123/bar", "news/123/lorem/ipsum".
//        After version 0.9.0 crossroads added support to decoding query strings as well by starting the capturing groups with a "?" (eg: {?foo}, :?bar:). The matched value will be converted into an object and values will be typecasted if crossroads.shouldTypecast = true.
//        [handler]:Function (optional)
//        Function that should be executed when a request matches the Route pattern. (This is just a convenient way to attach a handler to the Route.matched Signal)
//    [priority]:Number (optional)
//        Route execution priority.
//        Routes with higher priority will be tested before during crossroads.parse. It is important to note that crossroads will stop pattern tests as soon as it finds a Route that matches the request. Setting the priority is a way to invert “natural” test order. Routes are tested by order of creation if priority is omitted.

        /**
         * Creates a new route pattern listener and add it to crossroads routes collection.
         *
         * @example
            //String rule with param:
            //match '/news/123' passing "123" as param to handler
            var route1 = crossroads.addRoute('/news/{id}', function(id){
                console.log(id);
            });

            //String rule with optional param:
            //match '/foo/123/bar' passing "123" and "bar" as param
            //match '/foo/45' passing 45 as param (slug is optional)
            var route2 = crossroads.addRoute('/foo/{id}/:slug:');
            //addRoute returns a Route object
            route2.matched.add(console.log, console);

            //RegExp rule:
            //match '/lorem/ipsum' passing "ipsum" as param to handler
            //note the capturing group around segment
            var route3 = crossroads.addRoute(/^\/lorem\/([a-z]+)$/, function(id){
                console.log(id);
            });

            //String rule with rest segments:
            //match '/foo/123/edit' passing "123" as argument
            //match '/foo/45/asd/123/edit' passing "45/asd/123" as argument
            var route4 = crossroads.addRoute('/foo/{id*}/edit');
            //addRoute returns a Route object
            route4.matched.add(console.log, console);

            //Query String:
            //match 'foo.php?lorem=ipsum&dolor=amet'
            crossroads.addRoute('foo.php{?query}', function(query){
            // query strings are decoded into objects
                console.log('lorem '+ query.lorem +' dolor sit '+ query.dolor);
            });
         * @method addRoute
         * @param pattern {String|RegExp} String pattern or Regular Expression that should be used to match against requests.
         * @param [priority=0] {number} Route execution priority.
         * @param [callback=null] {Function} Function that should be executed when a request matches the Route pattern.
         * (This is just a convenient way to attach a handler to the {{#crossLink "Route/matched:property"}}Route.matched{{/crossLink}} Signal)
         * @returns {Route} Returns a Route object.
         */
        public addRoute(pattern:any, callback:Function, priority:number = 0)
        {
            var route:Route = new Route(pattern, callback, priority, this);
            this._sortedInsert(route);
            return route;
        }

        /**
         * Remove a single route from crossroads collection.
         *
         * @param route {Route} Reference to the Route object returned by crossroads.addRoute().
         */
        public removeRoute(route:Route)
        {
            this.arrayRemove(this._routes, route);
            route.destroy();
        }

        public arrayRemove(arr, item)
        {
            var i:number = this.arrayIndexOf(arr, item);
            if (i !== -1)
            {
                arr.splice(i, 1);
            }
        }

        public arrayIndexOf(arr, val):number
        {
            if (arr.indexOf)
            {
                return arr.indexOf(val);
            }
            else
            {
                //Array.indexOf doesn't work on IE 6-7
                var n = arr.length;
                while (n--)
                {
                    if (arr[n] === val)
                    {
                        return n;
                    }
                }
                return -1;
            }
        }

        /**
         * Remove all routes from crossroads collection.
         */
        public removeAllRoutes():void
        {
            var n = this.getNumRoutes();
            while (n--)
            {
                this._routes[n].destroy();
            }
            this._routes.length = 0;
        }

        public parse(request = '', defaultArgs = [])
        {
            // should only care about different requests if ignoreState isn't true
            if (!this.ignoreState && (request === this._prevMatchedRequest || request === this._prevBypassedRequest))
            {
                return;
            }

            var routes = this._getMatchedRoutes(request);
            var i:number = 0;
            var n:number = routes.length;
            var cur = null;

            if (n)
            {
                this._prevMatchedRequest = request;

                this._notifyPrevRoutes(routes, request);
                this._prevRoutes = routes;
                //should be incremental loop, execute routes in order
                while (i < n)
                {
                    cur = routes[i];
                    cur.route.matched.dispatch.apply(cur.route.matched, defaultArgs.concat(cur.params));
                    cur.isFirst = !i;
                    this.routed.dispatch.apply(this.routed, defaultArgs.concat([request, cur]));
                    i += 1;
                }
            }
            else
            {
                this._prevBypassedRequest = request;
                this.bypassed.dispatch.apply(this.bypassed, defaultArgs.concat([request]));
            }

            this._pipeParse(request, defaultArgs);
        }

        private _notifyPrevRoutes(matchedRoutes, request)
        {
            var i = 0, prev;
            while (prev = this._prevRoutes[i++])
            {
                //check if switched exist since route may be disposed
                if (prev.route.switched && this._didSwitch(prev.route, matchedRoutes))
                {
                    prev.route.switched.dispatch(request);
                }
            }
        }

        private _didSwitch(route, matchedRoutes)
        {
            var matched,
                i = 0;
            while (matched = matchedRoutes[i++])
            {
                // only dispatch switched if it is going to a different route
                if (matched.route === route)
                {
                    return false;
                }
            }
            return true;
        }

        private _pipeParse(request, defaultArgs)
        {
            var i = 0, route;
            while (route = this._piped[i++])
            {
                route.parse(request, defaultArgs);
            }
        }

        /**
         * Get number of Routes contained on the crossroads collection.
         *
         * @method getNumRoutes
         * @returns {Number}
         * @public
         */
        public getNumRoutes():number
        {
            return this._routes.length;
        }

        private _sortedInsert(route:Route)
        {
            //simplified insertion sort
            var routes = this._routes,
                n = routes.length;
            do {
                --n;
            }
            while (routes[n] && route.priority <= routes[n].priority);
            routes.splice(n + 1, 0, route);
        }

        private _getMatchedRoutes(request)
        {
            var res = [],
                routes = this._routes,
                n = routes.length,
                route;
            //should be decrement loop since higher priorities are added at the end of array
            while (route = routes[--n])
            {
                if ((!res.length || this.greedy || route.greedy) && route.match(request))
                {
                    res.push({
                        route: route,
                        params: route._getParamsArray(request)
                    });
                }
                if (!this.greedyEnabled && res.length)
                {
                    break;
                }
            }
            return res;
        }

        public pipe(otherRouter)
        {
            this._piped.push(otherRouter);
        }

        public unpipe(otherRouter)
        {
            this.arrayRemove(this._piped, otherRouter);
        }

        public toString()
        {
            return '[crossroads numRoutes:' + this.getNumRoutes() + ']';
        }

    }

}
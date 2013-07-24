/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

///<reference path='../BaseObject.ts'/>
///<reference path='../utils/BrowserUtils.ts'/>

/**
 * The RouterController...
 *
 * @class RouterController
 * @module StructureTS
 * @constructor
 **/
class RouterController extends BaseObject {

    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'RouterController';

    constructor()
    {
        super();
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
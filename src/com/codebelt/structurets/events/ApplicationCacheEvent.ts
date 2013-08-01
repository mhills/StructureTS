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

///<reference path='BaseEvent.ts'/>

/**
 * The ApplicationCacheEvent ....
 *
 * @class ApplicationCacheEvent
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: Bubbling will only work with DisplayObject classes throw the display list hierarchy. Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [data=null] {any}
 * @extends BaseEvent
 * @module StructureTS
 * @submodule event
 * @constructor
 **/
class ApplicationCacheEvent extends BaseEvent
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'BaseEvent';

    /**
     * The browser is checking for an update, or is attempting to download
     * the cache manifest for the first time. This is always the first event
     * in the sequence.
     *
     * @event CHECKING
     * @type {string}
     * @static
     */
    public static CHECKING:string = 'checking';

    /**
     * The cache manifest hadn't changed.
     *
     * @event NO_UPDATE
     * @type {string}
     * @static
     */
    public static NO_UPDATE:string = 'noupdate';

    /**
     * The browser has started to download the cache manifest, either for the
     * first time or because changes have been detected.
     *
     * @event DOWNLOADING
     * @type {string}
     * @static
     */
    public static DOWNLOADING:string = 'downloading';

    /**
     * The browser had downloaded and cached an asset. This is fired once for
     * every file that is downloaded (including the current page which is cached implicitly).
     *
     * @event PROGRESS
     * @type {string}
     * @static
     */
    public static PROGRESS:string = 'progress';

    /**
     * The resources listed in the manifest have been fully downloaded, and the application is
     * now cached locally.
     *
     * @event CACHED
     * @type {string}
     * @static
     */
    public static CACHED:string = 'cached';

    /**
     * The resources listed in the manifest have been newly re-downloaded, and the script can
     * use swapCache() to switch to the new cache.
     *
     * @event UPDATE_READY
     * @type {string}
     * @static
     */
    public static UPDATE_READY:string = 'updateready';

    /**
     * The cache manifest file could not be found, indicating that the cache is no longer needed.
     * The application cache is being deleted.
     *
     * @event OBSOLETE
     * @type {string}
     * @static
     */
    public static OBSOLETE:string = 'obsolete';

    /**
     * An error occurred at some point - this could be caused by a number of things. This will
     * always be the last event in the sequence.
     *
     * @event ERROR
     * @type {string}
     * @static
     */
    public static ERROR:string = 'error';

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type, bubbles, cancelable, data);
    }

}
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

///<reference path=''/>

class Cursor
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'Cursor';

    public static x:number = 0;
    public static y:number = 0;

    constructor()
    {
        this.setEvent('mouse');
        this.setEvent('touch');
    }

    public setEvent(type):void
    {
        var self = this;
        var moveHandler = document['on' + type + 'move'] || function ()
        {
        };
        document['on' + type + 'move'] = function (event)
        {
            moveHandler(event);
            Cursor.refresh(event);
        }
    }

    public static refresh(event):void
    {
        if (!event)
        {
            event = window.event;
        }
        if (event.type == 'mousemove')
        {
            this.set(event);
        }
        else if (event.touches)
        {
            this.set(event.touches[0]);
        }
    }

    public static set(event):void
    {
        if (event.pageX || event.pageY)
        {
            this.x = event.pageX;
            this.y = event.pageY;
        }
        else if (event.clientX || event.clientY)
        {
            this.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            this.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
    }

}
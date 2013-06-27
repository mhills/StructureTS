///<reference path=''/>

class Cursor {

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
        var moveHandler = document['on' + type + 'move'] || function(){};
        document['on' + type + 'move'] = function(event)
        {
            moveHandler(event);
            Cursor.refresh(event);
        }
    }

    public static refresh(event):void
    {
        if(!event)
        {
            event = window.event;
        }
        if(event.type == 'mousemove')
        {
            this.set(event);
        }
        else if(event.touches)
        {
            this.set(event.touches[0]);
        }
    }

    public static set(event):void
    {
        if(event.pageX || event.pageY)
        {
            this.x = event.pageX;
            this.y = event.pageY;
        }
        else if(event.clientX || event.clientY)
        {
            this.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            this.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
    }

}
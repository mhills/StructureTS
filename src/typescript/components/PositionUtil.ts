///<reference path=''/>

class PositionUtil {

    constructor() { }

    public static get(obj):any[]
    {
        var curleft = 0;
        var curtop = 0;
        if(obj.offsetParent)
        {
            do
            {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            }
            while((obj = obj.offsetParent));
        }
        return [curleft, curtop];
    }

}
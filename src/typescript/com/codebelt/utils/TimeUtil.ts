///<reference path=''/>

class TimeUtil {

    constructor() {}



//    public static STANDARD:number = 12;
//    public static MILITARY:number = 24;
//
//    function getCurrentTime(timeFormat:number):string {
//    var date:Date = new Date();
//    var hour:uint = date.getHours();
//    var currentTime:String;
//    var timeExtention:String;
//
//    switch(timeFormat)
//    {
//        case 24:
//            hour = (hour == 0) ? 12 : hour;
//            timeExtention = "";
//            break;
//        case 12:
//            if (hour > 12){
//                hour = (hour == 12) ? 12 : hour - 12;
//                timeExtention = " PM";
//            }else{
//                hour = (hour == 0) ? 12 : hour ;
//                timeExtention = " AM";
//            }
//            break;
//    }
//    currentTime = hour.toString();
//    currentTime += ":";
//    currentTime += doubleDigitFormat( date.getMinutes() );
//    currentTime += ":";
//    currentTime += doubleDigitFormat( date.getSeconds() );
//    currentTime += timeExtention;
//
//    return currentTime;
//}
//
//    function doubleDigitFormat($num:uint):String
//{
//    if ($num < 10)
//    {
//        return ("0" + $num);
//    }
//    return String($num);
//}
//
//    public static getDaysBetweenDates(date1:Date,date2:Date):number {
//        var oneDay:number = 1000 * 60 * 60 * 24;
//        var date1Milliseconds:number = date1.getTime();
//        var date2Milliseconds:number = date2.getTime();
//        var differenceMilliseconds:number = Math.abs(date1Milliseconds - date2Milliseconds);
//        return Math.round(differenceMilliseconds/oneDay);
//    }
}
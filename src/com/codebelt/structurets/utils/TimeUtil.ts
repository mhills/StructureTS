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

/**
 * The TimeUtil...
 *
 * @class TimeUtil
 * @constructor
 **/
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
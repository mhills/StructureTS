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
 * The NumberUtil...
 *
 * @class NumberUtil
 * @module StructureTS
 * @submodule util
 * @constructor
 * @version 0.1.0
 **/
class NumberUtil
{
    /**
     * @overridden BaseObject.CLASS_NAME
     */
    public static CLASS_NAME:string = 'NumberUtil';

    constructor()
    {
    }

    /**
     * YUIDoc_comment
     *
     * @method bytesToMegabytes
     * @param bytes {number}
     * @returns {number}
     */
    public static bytesToMegabytes(bytes:number):number
    {
        return bytes / 1048576;
    }

    /**
     * YUIDoc_comment
     *
     * @method centimeterToInch
     * @param cm {number}
     * @returns {number}
     */
    public static centimeterToInch(cm:number):number
    {
        return cm * 0.39370;
    }

    /**
     * YUIDoc_comment
     *
     * @method inchToCentimeter
     * @param inch {number}
     * @returns {number}
     */
    public static inchToCentimeter(inch:number):number
    {
        return inch * 2.54;
    }

    /**
     * YUIDoc_comment
     *
     * @method feetToMeter
     * @param feet {number}
     * @returns {number}
     */
    public static feetToMeter(feet:number):number
    {
        return feet / 3.2808;
    }

    /**
     * YUIDoc_comment
     *
     * @method convertToHHMMSS
     * @param seconds {number}
     * @returns {string}
     */
    public static convertToHHMMSS(seconds:number):string
    {
        var sec:number = isNaN(seconds) ? 0 : seconds;//Changes NaN to 0

        var s:number = sec % 60;
        var m:number = Math.floor((sec % 3600 ) / 60);
        var h:number = Math.floor(sec / (60 * 60));

        var hourStr:string = (h == 0) ? "" : NumberUtil.doubleDigitFormat(h) + ":";
        var minuteStr:string = NumberUtil.doubleDigitFormat(m) + ":";
        var secondsStr:string = NumberUtil.doubleDigitFormat(s);

        return hourStr + minuteStr + secondsStr;
    }

    /**
     * YUIDoc_comment
     *
     * @method doubleDigitFormat
     * @param num {number}
     * @returns {string}
     */
    public static doubleDigitFormat(num:number):string
    {
        if (num < 10)
        {
            return ("0" + num);
        }
        return String(num);
    }

    //http://www.metric-conversions.org/length/inches-conversion.htm

//    public static formatUnit(number:number, decimalPlacement:number = 2, decimalSeparator:string = '.', thousandsSeparator:string = ''):number
//    {
//        var n = number;
//        var decimalPlacement = isNaN(decimalPlacement = Math.abs(decimalPlacement)) ? 2 : decimalPlacement;
//        var decimalSeparator = decimalSeparator == undefined ? "," : decimalSeparator
//        var thousandsSeparator = thousandsSeparator == undefined ? "." : thousandsSeparator, s = n < 0 ? "-" : "";
//        var i = parseInt(n = Math.abs(+n || 0).toFixed(decimalPlacement)) + "";
//        var j = (j = i.length) > 3 ? j % 3 : 0;
//
//        return s + (j ? i.substr(0, j) + thousandsSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandsSeparator) + (decimalPlacement ? decimalPlacement + Math.abs(n - i).toFixed(decimalPlacement).slice(2) : "");
//    }

}
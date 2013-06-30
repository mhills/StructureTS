///<reference path=''/>

class NumberUtil {

    constructor() {}

    public static degreesToRadians(degrees:number):number
    {
        return degrees * Math.PI / 180;
    }

    public static radiansToDegrees(radians:number):number
    {
        return radians * 180 / Math.PI;
    }

    public static bytesToMegabytes(bytes:number):number
    {
        return bytes / 1048576;
    }

    public static centimeterToInch(cm:number):number
    {
        return cm * 0.39370;
    }

    public static inchToCentimeter(inch:number):number
    {
        return inch * 2.54;
    }

    public static feetToMeter(feet:number):number
    {
        return feet / 3.2808;
    }
    //http://www.metric-conversions.org/length/inches-conversion.htm



    public static formatMoney(number:number, decimalPlacement:number = 2, decimalSeparator:string = '.', thousandsSeparator:string = ''):number
    {
        var n = number, decimalPlacement = isNaN(decimalPlacement = Math.abs(decimalPlacement)) ? 2 : decimalPlacement, decimalSeparator = decimalSeparator == undefined ? "," : decimalSeparator, thousandsSeparator = thousandsSeparator == undefined ? "." : thousandsSeparator, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(decimalPlacement)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + thousandsSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandsSeparator) + (decimalPlacement ? decimalPlacement + Math.abs(n - i).toFixed(decimalPlacement).slice(2) : "");
    }

}
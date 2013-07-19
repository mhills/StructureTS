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
 * The StringUtil...
 *
 * @class StringUtil
 * @constructor
 **/
class StringUtil {

    constructor() {}

    public static stringToBoolean(str:string):boolean
    {
        return (str.toLowerCase() == "true" || str.toLowerCase() == "1");
    }

    public static getExtension(filename:string):string
    {
        return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
    }

    public static hyphenToCamelCase(str:string):string
    {
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
    }

    public static hyphenToPascalCase(str:string):string
    {
        return str.replace(/(\-|^)([a-z])/gi, function (match, delimiter, hyphenated) { return hyphenated.toUpperCase(); });
    }

    public static camelCaseToHyphen(str:string):string
    {
        return str.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() });
    }

    public static createUUID():string
    {
        var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function(c) {
            var r = Math.random() * 16|0;
            var v = (c == 'x') ? r : (r&0x3|0x8);
            return v.toString(16);
        };

        return uuid;
    };

    public static queryStringToObject(queryString:string):Object
    {
        var params = {};
        var temp = null;

        // Split into key/value pairs
        var queries = queryString.substring(1).split("&");

        // Convert the array of strings into an object
        var len = queries.length;
        for (var i = 0; i < len; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    }

}
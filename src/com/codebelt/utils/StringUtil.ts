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
define(function(require) {
        "use strict"

        /**
         * @class RequestDataType
         */
        var RequestDataType = function() {

        };

        RequestDataType.TEXT = "text";
        RequestDataType.JSON = "json";
        RequestDataType.JSONP = "jsonp";
        RequestDataType.XML = "xml";
        RequestDataType.HTML = "html";
        RequestDataType.SCRIPT = "script";

        return RequestDataType;
    }
);
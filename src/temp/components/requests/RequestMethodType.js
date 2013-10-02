define(function(require) {
        "use strict"

        /**
         * @class RequestMethodType
         */
        var RequestMethodType = function() {

        };

        RequestMethodType.GET = "GET";
        RequestMethodType.POST = "POST";
        RequestMethodType.DELETE = "DELETE";
        RequestMethodType.PUT = "PUT";
        RequestMethodType.HEAD = "HEAD";
        RequestMethodType.OPTIONS = "OPTIONS";

        return RequestMethodType;
    }
);
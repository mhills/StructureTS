define(function(require) {
        "use strict"

        /**
         * @class NumberUtil
         */
        var NumberUtil = function() {
        };

        /**
         * Checks and returns if the value passed in is a number or not.
         * @param {*} value
         * @returns {boolean}
         */
        NumberUtil.isNumber = function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };

        return NumberUtil;
    }
);
if (Math.toFloat === null || Math.toFloat === undefined) {

    /**
     * Same as toFixed, but will return a number instead of a string
     * http://jsperf.com/number-format-methods
     *
     * @param {number} number Number to round
     * @param {number} [digits=2] Number of decimal places
     * @returns {number}
     */
    Math.toFloat = function(number, digits) {
        var factor = Math.pow(10, Math.round(digits) || 2);
        return Math.round(number * factor) / factor;
    };
}

Number.prototype.format = function(separator, decimalPoints) {
    if (separator === undefined) {
        separator = ',';
    }

    return Math.toFloat(this, decimalPoints).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
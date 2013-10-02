define(function(require) {
    'use strict';

    var _ = require('underscore');

    /**
     * Convert number to feet
     *
     * @type {Function}
     * @returns {number}
     */
    var _toFeet = function(number, squared) {
        var factor = FACTOR_FEET;
        if (squared) {
            factor *= FACTOR_FEET;
        }
        return Math.toFloat(number  / factor, 2);
    };

    /**
     * Convert number to meters
     *
     * @type {Function}
     * @returns {number}
     */
    var _toMeter = function(number, squared) {
        var factor = FACTOR_MILLIMETER;
        if (squared) {
            factor *= FACTOR_MILLIMETER;
        }
        return Math.toFloat(number / factor, 2);
    };

    /**
     * Factor for feet
     *
     * @type {number}
     * @constant
     */
    var FACTOR_FEET = 12;

    /**
     * Factor for millimeters
     *
     * @type {number}
     * @constant
     */
    var FACTOR_MILLIMETER = 1000;

    /**
     * Factor for centimeters
     *
     * @type {number}
     * @constant
     */
    var FACTOR_CENTIMETER = 100;

    /**
     * @namespace MeasurementUtil
     */
    var MeasurementUtil = {};

    /**
     * Convert number to currently set conversion method
     *
     * @type {Function}
     * @returns {number}
     */
    MeasurementUtil.toUnit = _.toUnit = function(type, number, squared) {
        if (type !== 'metric') {
            return _toFeet(number, squared);
        } else {
            return _toMeter(number, squared);
        }
    };

    return MeasurementUtil;
});
define(function(require) {
    'use strict';

    var _ = require('_');

    // Add underscore/lodash mixins here
    _.mixin({
        options: function (options, selectedValue) {
            var str = '';

            _.forOwn(options, function(value, key) {
                str += '<option value="' + key + '"';
                if (key === selectedValue) {
                    str += ' selected="selected"';
                }
                str += '>' + value + '</option>';
            });

            return str;
        },

        sum: function(list, itterator) {
            var sum = 0;

            _.each(list, function(value, key) {
                sum += itterator(value, key) || 0;
            });

            return sum;
        }
    });

    return _;

});
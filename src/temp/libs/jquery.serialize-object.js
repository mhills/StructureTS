(function($, _) {
    'use strict';

    var rsubmitterTypes = /^(?:submit|button|image|reset)$/i;
    var rsubmittable = /^(?:input|select|textarea|keygen)/i;

    var _getValue = function(input) {
        switch ((input.type + '').toLowerCase()) {
            case 'radio' :
            case 'checkbox' :
                return input.checked ? input.value : null;
            default :
                return input.value;
        }
    };

    var serializeArray = function($this) {
        var keys = {};
        var elements = $this
            .map(function() {
                return _.toArray($.prop(this, 'elements'));
            })
            .filter(function(){
                return (
                    this.name &&
                    !$(this).is(":disabled") &&
                    rsubmittable.test(this.nodeName) &&
                    !rsubmitterTypes.test(this.type)
                );
            })
            .get();

        var serialized = _.map(elements, function(input) {
            keys[input.name] = null;
            return {
                name: input.name,
                element: input,
                value: _getValue(input)
            };
        });

        return {
            keys: keys,
            serialize: serialized
        };
    };

    //
    // Use internal serializeArray to get list of form elements which is
    // consistent with $.serialize
    //
    // From version 2.0.0, $.serializeObject will stop converting [name] values
    // to camelCase format. This is *consistent* with other serialize methods:
    //
    //   - $.serialize
    //   - $.serializeArray
    //
    // If you require camel casing, you can either download version 1.0.4 or map
    // them yourself.
    //
    $.fn.serializeObject = function () {
        var data = serializeArray(this);
        var result = data.keys;

        _.each(data.serialize, function(element) {
            var node = result[element.name];

            if (element.value === null && node !== null) {
                return;
            }

            // If node with same name exists already, need to convert it to an array as it
            // is a multi-value field (i.e., checkboxes)
            if ('undefined' !== typeof node && node !== null) {
                if (_.isArray(node)) {
                    node.push(element.value);
                } else {
                    result[element.name] = [node, element.value];
                }
            } else {
                result[element.name] = element.value;
            }
        });
        return result;
    };

}(jQuery, _));
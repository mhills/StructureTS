define(function(require) {
    'use strict';

    var Backbone = require('libs/backbone');
    var _ = require('underscore');
    var $ = require('jquery');

    Backbone.extend = Backbone.Model.extend;

    var originalViewExtend = Backbone.View.extend;
    var originalModelExtend = Backbone.Model.extend;
    var originalGetter = Backbone.Model.prototype.get;
    var originalSetter = Backbone.Model.prototype.set;
    var originalNavigate = Backbone.History.prototype.navigate;

    /**
     * Convert string to title case
     *
     * @example
     *  test-string -> TestString
     *  test STRING -> TestString
     *  test_string -> Test_string
     *
     * @param {string} string
     * @returns {string}
     * @private
     */
    var _titleCase = function(string) {
        string = $.camelCase(string);
        return string[0].toUpperCase() + string.substring(1);
    };

    /**
     * Update view extend method to extend events object
     *
     * @param protoProps
     * @param staticProps
     * @returns {function}
     */
    Backbone.View.extend = function(protoProps, staticProps) {
        if (this.prototype.events && protoProps.events) {
            _.defaults(protoProps.events, this.prototype.events);
        }

        return originalViewExtend.call(this, protoProps, staticProps);
    };

    var modelExtendProps = ['defaults', 'defaultTypes', 'defaultValues', 'readonly'];

    /**
     * Update model extend to extend defaults object
     *
     * @param protoProps
     * @param staticProps
     * @returns {function}
     */
    Backbone.Model.extend = function(protoProps, staticProps) {
        _.each(
            modelExtendProps,
            function(prop) {
                if (this.prototype[prop] && protoProps[prop]) {
                    _.defaults(protoProps[prop], this.prototype[prop]);
                }
            },
            this
        );

        return originalModelExtend.call(this, protoProps, staticProps);
    };

    Backbone.Model.prototype.defaultTypes = {};
    Backbone.Model.prototype.defaultValues = {};
    Backbone.Model.prototype.readonly = {};

    /**
     * Override backbone route to call a validate method before any route is run.
     * If the validate method returns false, the route will not be run
     *
     * @name Backbone.Router#route
     * @param {string} route
     * @param {string} name
     * @param {function} callback
     * @returns {Backbone.Router}
     */
    Backbone.Router.prototype.route = function(route, name, callback) {
        if (!_.isRegExp(route)) route = this._routeToRegExp(route);
        if (!callback) callback = this[name];
        Backbone.history.route(route, _.bind(function(fragment) {
            var args = this._extractParameters(route, fragment);
            var state = this.validate(name, fragment, args);
            if (state === false) {
                return;
            }
            callback && callback.apply(this, args);
            this.trigger.apply(this, ['route:' + name].concat(args));
            this.trigger('route', name, args);
            Backbone.history.trigger('route', this, name, args);
        }, this));
        return this;
    };

    /**
     * Validate route
     *
     * @name Backbone.Router#validate
     * @param {string} routeName
     * @param {string} fragment
     * @param {Array} args
     */
    Backbone.Router.prototype.validate = function(routeName, fragment, args) {};

    /**
     * Update get method to call getter methods
     *
     * @name Backbone.Model#get
     * @param {string} attr
     * @param {object} [options]
     * @param {boolean} [options.raw=false]
     * @returns {*}
     */
    Backbone.Model.prototype.get = function(attr, options) {
        options || (options = {});
        var value = originalGetter.call(this, attr);

        if (options.raw === true) {
            return value;
        }

        var key = 'get' + _titleCase(attr);

        if (this.defaultValues && this.defaultValues.hasOwnProperty(attr)) {
            value = this.defaultValues[attr][value] || null;
        }

        // Call the getter if available
        if (_.isFunction(this[key])) {
            return this[key].call(this, value, attr, options);
        }

        return value;
    };

    /**
     * Update set method to call setting methods
     *
     * @name Backbone.Model#set
     * @param {string|object} key
     * @param {*} value
     * @param {object} [options]
     * @returns {Backbone.Model}
     */
    Backbone.Model.prototype.set = function(key, value, options) {
        var attrs;
        var attr;
        var _key;
        var old;

        // Normalize the key-value into an object
        if (_.isObject(key) || key == null) {
            attrs = _.clone(key);
            options = value;
        } else {
            attrs = {};
            attrs[key] = value;
        }

        options || (options = {});

        // Go over all the set attributes and call the setter if available
        for (attr in attrs) {
            if (!attrs.hasOwnProperty(attr) || _.isEqual(attrs[attr], this.attributes[attr])) {
                continue;
            }

            if (!options.init && this.readonly.hasOwnProperty(attr)) {
                delete attrs[attr];
                continue;
            }

            if (this.defaultValues && this.defaultValues.hasOwnProperty(attr)) {
                if (!this.defaultValues[attr].hasOwnProperty(attrs[attr])) {
                    attrs[attr] = this.defaults[attr];
                }
            }

            if (this.defaultTypes && this.defaultTypes.hasOwnProperty(attr)) {
                old = this.get(attr);

                if (old instanceof this.defaultTypes[attr] && _.isFunction(old.reset) && _.isObject(attrs[attr])) {
                    old.reset(attrs[attr]);
                    attrs[attr] = old;
                }

                if (!(attrs[attr] instanceof this.defaultTypes[attr])) {
                    attrs[attr] = new this.defaultTypes[attr](attrs[attr]);

                    _key = '_onNew' + _titleCase(attr);

                    if (_.isFunction(this[_key])) {
                        this[_key].call(this, attrs[attr], attr, options);
                    }
                }
            }

            _key = 'set' + _titleCase(attr);

            if (_.isFunction(this[_key])) {
                attrs[attr] = this[_key].call(this, attrs[attr], attr, options);
            }
        }

        return originalSetter.call(this, attrs, options);
    };

    /**
     * Public method to retrieve view element
     *
     * @returns {jQuery}
     */
    Backbone.View.prototype.getElement = function() {
        return this.$el;
    };

    /**
     * Ensure route starts with a slash
     *
     * @param {string} [fragment]
     * @param {options} [options]
     * @returns {string}
     */
    Backbone.History.prototype.navigate = function(fragment, options) {
        if (fragment && fragment.indexOf('/') !== 0) {
            fragment = '/' + fragment;
        }
        return originalNavigate.call(this, fragment, options);
    };

    return Backbone;

});
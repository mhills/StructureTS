///<reference path='../signals/Signal.ts'/>

module MillerMedeiros
{
    /**
     * YUIDoc_comment
     *
     * @class Route
     * @constructor
     * @author Miller Medeiros
     * @module MillerMedeiros
     * @submodule Crossroads
     **/
    export class Route
    {

        private _router = null;
        private _pattern = null;
        private _paramsIds = null;
        private _optionalParamsIds = null;
        private _matchRegexp = null;

        public priority:number = 0;

        /**
         *
         * @property matched
         * @type {Signal}
         * @public
         */
        public matched:Signal = null;
        public switched:Signal = null;
        public greedy:boolean = false;
        public rules = null;

        // IE 7-8 capture optional groups as empty strings while other browsers
        // capture as `undefined`
        _hasOptionalGroupBug = (/t(.+)?/).exec('t')[1] === '';
        UNDEF = null;

        constructor(pattern, callback:Function, priority:number = 0, router = null)
        {
            var isRegexPattern = this.isRegExp(pattern);
            var patternLexer = router.patternLexer;

            this._router = router;
            this._pattern = pattern;
            this._paramsIds = isRegexPattern ? null : patternLexer.getParamIds(pattern);
            this._optionalParamsIds = isRegexPattern ? null : patternLexer.getOptionalParamsIds(pattern);
            this._matchRegexp = isRegexPattern ? pattern : patternLexer.compilePattern(pattern, router.ignoreCase);
            this.matched = new Signal();
            this.switched = new Signal();
            if (callback)
            {
                this.matched.add(callback);
            }
        }

        public match(request:string = '')
        {
            return this._matchRegexp.test(request) && this._validateParams(request); //validate params even if regexp because of `request_` rule.
        }

        _validateParams(request)
        {
            var rules = this.rules,
                values = this._getParamsObject(request),
                key;
            for (key in rules)
            {
                //                normalize_ isn't a validation rule... (#39)
                if (key !== 'normalize_' && rules.hasOwnProperty(key) && !this._isValidParam(request, key, values))
                {
                    return false;
                }
            }
            return true;
        }

        private _isValidParam(request, prop, values)
        {
            var validationRule = this.rules[prop],
                val = values[prop],
                isValid = false,
                isQuery = (prop.indexOf('?') === 0);

            if (val == null && this._optionalParamsIds && this.arrayIndexOf(this._optionalParamsIds, prop) !== -1)
            {
                isValid = true;
            }
            else if (this.isRegExp(validationRule))
            {
                if (isQuery)
                {
                    val = values[prop + '_']; //use raw string
                }
                isValid = validationRule.test(val);
            }
            else if (this.isArray(validationRule))
            {
                if (isQuery)
                {
                    val = values[prop + '_']; //use raw string
                }
                isValid = this._isValidArrayRule(validationRule, val);
            }
            else if (this.isFunction(validationRule))
            {
                isValid = validationRule(val, request, values);
            }

            return isValid; //fail silently if validationRule is from an unsupported type
        }

        private _isValidArrayRule(arr, val)
        {
            if (!this._router.ignoreCase)
            {
                return this.arrayIndexOf(arr, val) !== -1;
            }

            if (typeof val === 'string')
            {
                val = val.toLowerCase();
            }

            var n = arr.length,
                item,
                compareVal;

            while (n--)
            {
                item = arr[n];
                compareVal = (typeof item === 'string') ? item.toLowerCase() : item;
                if (compareVal === val)
                {
                    return true;
                }
            }
            return false;
        }

        private _getParamsObject(request)
        {
            var shouldTypecast = this._router.shouldTypecast,
                values = this._router.patternLexer.getParamValues(request, this._matchRegexp, shouldTypecast),
                o:any = {},
                n = values.length,
                param, val;
            while (n--)
            {
                val = values[n];
                if (this._paramsIds)
                {
                    param = this._paramsIds[n];
                    if (param.indexOf('?') === 0 && val)
                    {
                        //                        make a copy of the original string so array and
                        //                        RegExp validation can be applied properly
                        o[param + '_'] = val;
                        //                        update vals_ array as well since it will be used
                        //                        during dispatch
                        val = this.decodeQueryString(val, shouldTypecast);
                        values[n] = val;
                    }
                    //                    IE will capture optional groups as empty strings while other
                    //                    browsers will capture `undefined` so normalize behavior.
                    //                    see: #gh-58, #gh-59, #gh-60
                    if (this._hasOptionalGroupBug && val === '' && this.arrayIndexOf(this._optionalParamsIds, param) !== -1)
                    {
                        val = void(0);
                        values[n] = val;
                    }
                    o[param] = val;
                }
                //                alias to paths and for RegExp pattern
                o[n] = val;
            }
            o.request_ = shouldTypecast ? this.typecastValue(request) : request;
            o.vals_ = values;
            return o;
        }

        //        borrowed from AMD-Utils
        decodeQueryString(str, shouldTypecast)
        {
            var queryArr = (str || '').replace('?', '').split('&'),
                n = queryArr.length,
                obj = {},
                item, val;
            while (n--)
            {
                item = queryArr[n].split('=');
                val = shouldTypecast ? this.typecastValue(item[1]) : item[1];
                obj[item[0]] = (typeof val === 'string') ? decodeURIComponent(val) : val;
            }
            return obj;
        }

        arrayIndexOf(arr, val):number
        {
            if (arr.indexOf)
            {
                return arr.indexOf(val);
            }
            else
            {
                //Array.indexOf doesn't work on IE 6-7
                var n = arr.length;
                while (n--)
                {
                    if (arr[n] === val)
                    {
                        return n;
                    }
                }
                return -1;
            }
        }


        isKind(val, kind)
        {
            return '[object ' + kind + ']' === Object.prototype.toString.call(val);
        }

        isRegExp(val)
        {
            return this.isKind(val, 'RegExp');
        }

        isArray(val)
        {
            return this.isKind(val, 'Array');
        }

        isFunction(val)
        {
            return typeof val === 'function';
        }


        //borrowed from AMD-utils
        typecastValue(val)
        {
            var r;
            if (val === null || val === 'null')
            {
                r = null;
            }
            else if (val === 'true')
            {
                r = true;
            }
            else if (val === 'false')
            {
                r = false;
            }
            else if (val === this.UNDEF || val === 'undefined')
            {
                r = this.UNDEF;
            }
            else if (val === '' || isNaN(val))
            {
                //isNaN('') returns false
                r = val;
            }
            else
            {
                //parseFloat(null || '') returns NaN
                r = parseFloat(val);
            }
            return r;
        }

        private _getParamsArray(request)
        {
            var norm = this.rules ? this.rules.normalize_ : null,
                params;
            norm = norm || this._router.normalizeFn; // default normalize
            if (norm && this.isFunction(norm))
            {
                params = norm(request, this._getParamsObject(request));
            }
            else
            {
                params = this._getParamsObject(request).vals_;
            }
            return params;
        }

        public interpolate(replacements)
        {
            var str = this._router.patternLexer.interpolate(this._pattern, replacements);
            if (!this._validateParams(str))
            {
                throw new Error('Generated string doesn\'t validate against `Route.rules`.');
            }
            return str;
        }

        public dispose()
        {
            this._router.removeRoute(this);
        }

        public destroy()
        {
            this.matched.dispose();
            this.switched.dispose();
            this.matched = this.switched = this._pattern = this._matchRegexp = null;
        }

        public toString()
        {
            return '[Route pattern:"' + this._pattern + '", numListeners:' + this.matched.getNumListeners() + ']';
        }


    }
}
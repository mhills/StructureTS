module MillerMedeiros
{
    /**
     * YUIDoc_comment
     *
     * @class PatternLexer
     * @constructor
     * @author Miller Medeiros
     * @module MillerMedeiros
     * @submodule Crossroads
     **/
    export class PatternLexer
    {

        public LOOSE_SLASH = 1;
        public STRICT_SLASH = 2;
        public LEGACY_SLASH = 3;

        private _slashMode = null;

        UNDEF = null;

        //match chars that should be escaped on string regexp
        private ESCAPE_CHARS_REGEXP:RegExp = /[\\.+*?\^$\[\](){}\/'#]/g;

        //trailing slashes (begin/end of string)
        private LOOSE_SLASHES_REGEXP:RegExp = /^\/|\/$/g;
        private LEGACY_SLASHES_REGEXP:RegExp = /\/$/g;

        //params - everything between `{ }` or `: :`
        private PARAMS_REGEXP:RegExp = /(?:\{|:)([^}:]+)(?:\}|:)/g;

        //used to save params during compile (avoid escaping things that
        //shouldn't be escaped).
        private TOKENS:any = {
            'OS': {
                //optional slashes
                //slash between `::` or `}:` or `\w:` or `:{?` or `}{?` or `\w{?`
                rgx: /([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,
                save: '$1{{id}}$2',
                res: '\\/?'
            },
            'RS': {
                //required slashes
                //used to insert slash between `:{` and `}{`
                rgx: /([:}])\/?(\{)/g,
                save: '$1{{id}}$2',
                res: '\\/'
            },
            'RQ': {
                //required query string - everything in between `{? }`
                rgx: /\{\?([^}]+)\}/g,
                //everything from `?` till `#` or end of string
                res: '\\?([^#]+)'
            },
            'OQ': {
                //optional query string - everything in between `:? :`
                rgx: /:\?([^:]+):/g,
                //everything from `?` till `#` or end of string
                res: '(?:\\?([^#]*))?'
            },
            'OR': {
                //optional rest - everything in between `: *:`
                rgx: /:([^:]+)\*:/g,
                res: '(.*)?' // optional group to avoid passing empty string as captured
            },
            'RR': {
                //rest param - everything in between `{ *}`
                rgx: /\{([^}]+)\*\}/g,
                res: '(.+)'
            },
            // required/optional params should come after rest segments
            'RP': {
                //required params - everything between `{ }`
                rgx: /\{([^}]+)\}/g,
                res: '([^\\/?]+)'
            },
            'OP': {
                //optional params - everything between `: :`
                rgx: /:([^:]+):/g,
                res: '([^\\/?]+)?\/?'
            }
        };

        constructor()
        {
            this._slashMode = this.LOOSE_SLASH;
            this.precompileTokens();
        }

        precompileTokens()
        {
            var key = null;
            var cur = null;
            for (key in this.TOKENS)
            {
                if (this.TOKENS.hasOwnProperty(key))
                {
                    cur = this.TOKENS[key];
                    cur.id = '__CR_' + key + '__';
                    cur.save = ('save' in cur) ? cur.save.replace('{{id}}', cur.id) : cur.id;
                    cur.rRestore = new RegExp(cur.id, 'g');
                }
            }
        }

        captureVals(regex, pattern)
        {
            var vals = [], match;
            // very important to reset lastIndex since RegExp can have "g" flag
            // and multiple runs might affect the result, specially if matching
            // same string multiple times on IE 7-8
            regex.lastIndex = 0;
            while (match = regex.exec(pattern))
            {
                vals.push(match[1]);
            }
            return vals;
        }

        public getParamIds(pattern)
        {
            return this.captureVals(this.PARAMS_REGEXP, pattern);
        }

        public getOptionalParamsIds(pattern)
        {
            return this.captureVals(this.TOKENS.OP.rgx, pattern);
        }

        public compilePattern(pattern, ignoreCase)
        {
            pattern = pattern || '';

            if (pattern)
            {
                if (this._slashMode === this.LOOSE_SLASH)
                {
                    pattern = pattern.replace(this.LOOSE_SLASHES_REGEXP, '');
                }
                else if (this._slashMode === this.LEGACY_SLASH)
                {
                    pattern = pattern.replace(this.LEGACY_SLASHES_REGEXP, '');
                }

                //save tokens
                pattern = this.replaceTokens(pattern, 'rgx', 'save');
                //regexp escape
                pattern = pattern.replace(this.ESCAPE_CHARS_REGEXP, '\\$&');
                //restore tokens
                pattern = this.replaceTokens(pattern, 'rRestore', 'res');

                if (this._slashMode === this.LOOSE_SLASH)
                {
                    pattern = '\\/?' + pattern;
                }
            }

            if (this._slashMode !== this.STRICT_SLASH)
            {
                //single slash is treated as empty and end slash is optional
                pattern += '\\/?';
            }
            return new RegExp('^' + pattern + '$', ignoreCase ? 'i' : '');
        }

        replaceTokens(pattern, regexpName, replaceName)
        {
            var cur, key;
            for (key in this.TOKENS)
            {
                if (this.TOKENS.hasOwnProperty(key))
                {
                    cur = this.TOKENS[key];
                    pattern = pattern.replace(cur[regexpName], cur[replaceName]);
                }
            }
            return pattern;
        }

        public getParamValues(request, regexp, shouldTypecast)
        {
            var vals = regexp.exec(request);
            if (vals)
            {
                vals.shift();
                if (shouldTypecast)
                {
                    vals = this.typecastArrayValues(vals);
                }
            }
            return vals;
        }

        typecastArrayValues(values)
        {
            var n = values.length,
                result = [];
            while (n--)
            {
                result[n] = this.typecastValue(values[n]);
            }
            return result;
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

        public interpolate(pattern, replacements)
        {
            if (typeof pattern !== 'string')
            {
                throw new Error('Route pattern should be a string.');
            }

            var replaceFn = function (match, prop)
            {
                var val;
                prop = (prop.substr(0, 1) === '?') ? prop.substr(1) : prop;
                if (replacements[prop] != null)
                {
                    if (typeof replacements[prop] === 'object')
                    {
                        var queryParts = [];
                        for (var key in replacements[prop])
                        {
                            queryParts.push(encodeURI(key + '=' + replacements[prop][key]));
                        }
                        val = '?' + queryParts.join('&');
                    }
                    else
                    {
                        // make sure value is a string see #gh-54
                        val = String(replacements[prop]);
                    }

                    if (match.indexOf('*') === -1 && val.indexOf('/') !== -1)
                    {
                        throw new Error('Invalid value "' + val + '" for segment "' + match + '".');
                    }
                }
                else if (match.indexOf('{') !== -1)
                {
                    throw new Error('The segment ' + match + ' is required.');
                }
                else
                {
                    val = '';
                }
                return val;
            };

            if (!this.TOKENS.OS.trail)
            {
                this.TOKENS.OS.trail = new RegExp('(?:' + this.TOKENS.OS.id + ')+$');
            }

            return pattern.replace(this.TOKENS.OS.rgx, this.TOKENS.OS.save)
                .replace(this.PARAMS_REGEXP, replaceFn)
                .replace(this.TOKENS.OS.trail, '') // remove trailing
                .replace(this.TOKENS.OS.rRestore, '/'); // add slash between segments
        }

        public strict()
        {
            this._slashMode = this.STRICT_SLASH;
        }

        public loose()
        {
            this._slashMode = this.LOOSE_SLASH;
        }

        public legacy()
        {
            this._slashMode = this.LEGACY_SLASH;
        }

    }
}
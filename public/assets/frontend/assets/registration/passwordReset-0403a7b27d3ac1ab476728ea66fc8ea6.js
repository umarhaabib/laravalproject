var CustomValidator = (function () {
    "use strict";

    console.log('custom validation initialized...');
    var default_date_pattern = "DD.MM.YYYY";
    this._default_date_pattern = default_date_pattern;
    this._default_min_date = moment("01.01.2015", default_date_pattern);
    this._default_max_date = moment("01.01.2500", default_date_pattern);
});


/**
 * Tells CustomValidator object which validators to load.
 * For default mode (load all validators), no parameters required
 *
 * @param validatorName custom validator to load
 */
CustomValidator.prototype.claim = function (validatorName) {
    var self = this;
    if (validatorName && validatorName !== undefined) {
        self[validatorName]();
    } else {
        self.dateValidator();
        self.emailValidator();
        self.passwordValidator();
    }
};

/*
 *  Validates whether input date is in specific range. You can pass min and max dates as
 *  input, or leave empty to work for defaults.
 *
 *  datePattern[0] should return min date to restrict. Default is 2015-01-01
 *  datePattern[1] should return max date to restrict. Default is current date
 */
CustomValidator.prototype.dateValidator = function () {
    var self = this;
    $.validator.addMethod("validDate", function (value, element, datePatterns) {
        if (value) {
            var minDate = datePatterns[0] === undefined ? self._default_min_date : datePatterns[0];
            var maxDate = datePatterns[1] === undefined ? self._default_max_date : datePatterns[1];


            var parsedInput = moment(value, self._default_date_pattern);

            if (!parsedInput.isValid()) {
                return false;
            }

            return parsedInput.isBetween(minDate, maxDate, true);
        }
        return true;
    }, ValidationMessages.get("invalidDate"));
};


CustomValidator.prototype.emailValidator = function () {
    var self = this;
    $.validator.addMethod("validEmail", function (value, element, datePatterns) {
        if (value) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(value);
        }
        return true;
    }, ValidationMessages.get("invalidEmail"));
};

CustomValidator.prototype.estonianNumberValidator = function () {
    $.validator.addMethod("validEstonianNumber", function (value, element, datePatterns) {
        if (value) {
            //todo: implement
        }
        return true;
    }, ValidationMessages.get("incorrectFormat"));
};


CustomValidator.prototype.lessThanEqualValidator = function () {
    $.validator.addMethod('lessThanEqual', function (value, element, param) {
        return this.optional(element) || parseInt(value) <= parseInt(param);
    }, ValidationMessages.get("lessThanEqual"));
};
//! moment.js
//! version : 2.15.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        var k;
        for (k in obj) {
            // even if its not own property I'd still call it non-empty
            return false;
        }
        return true;
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (utils_hooks__hooks.deprecationHandler != null) {
                utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;
    utils_hooks__hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return this._months;
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return this._monthsShort;
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function units_month__handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = create_utc__createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function units_month__monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        if (!m) {
            return this._weekdays;
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function day_of_week__handleStrictParse(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = create_utc__createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        ordinalParse: defaultOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                        'specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/');
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, parentConfig = baseConfig;
            // MERGE
            if (locales[name] != null) {
                parentConfig = locales[name]._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                    a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                        a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                                    a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                                        -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (isDate(input)) {
            config._d = input;
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);

            if (tZone === 0) {
                this.utcOffset(0, true);
            } else {
                this.utcOffset(offsetFromString(matchOffset, this._i));
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
        // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                    'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                        diff < 2 ? 'nextDay' :
                            diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = utils_hooks__hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                    units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                        units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function moment_format__format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
            local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
            local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
            /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
            /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
            /* falls through */
            case 'hour':
                this.minutes(0);
            /* falls through */
            case 'minute':
                this.seconds(0);
            /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIOROITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = moment_format__format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = stringGet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = stringSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    momentPrototype__proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    var momentPrototype = momentPrototype__proto;

    function moment_moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment_moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var prototype__proto = Locale.prototype;

    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto.ordinal         = ordinal;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto.monthsRegex       = units_month__monthsRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    prototype__proto.weekdaysRegex       =        weekdaysRegex;
    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = locale_locales__getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function lists__listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function lists__listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function lists__listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function lists__listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var duration_get__months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
            minutes <= 1           && ['m']           ||
            minutes < thresholds.m && ['mm', minutes] ||
            hours   <= 1           && ['h']           ||
            hours   < thresholds.h && ['hh', hours]   ||
            days    <= 1           && ['d']           ||
            days    < thresholds.d && ['dd', days]    ||
            months  <= 1           && ['M']           ||
            months  < thresholds.M && ['MM', months]  ||
            years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function duration_humanize__getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = duration_get__months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports

    ;


    utils_hooks__hooks.version = '2.15.1';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment_moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment_moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeRounding = duration_humanize__getSetRelativeTimeRounding;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.calendarFormat        = getCalendarFormat;
    utils_hooks__hooks.prototype             = momentPrototype;

    var moment__default = utils_hooks__hooks;


    var af = moment__default.defineLocale('af', {
        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
        meridiemParse: /vm|nm/i,
        isPM : function (input) {
            return /^nm$/i.test(input);
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'vm' : 'VM';
            } else {
                return isLower ? 'nm' : 'NM';
            }
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Vandag om] LT',
            nextDay : '[Môre om] LT',
            nextWeek : 'dddd [om] LT',
            lastDay : '[Gister om] LT',
            lastWeek : '[Laas] dddd [om] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'oor %s',
            past : '%s gelede',
            s : '\'n paar sekondes',
            m : '\'n minuut',
            mm : '%d minute',
            h : '\'n uur',
            hh : '%d ure',
            d : '\'n dag',
            dd : '%d dae',
            M : '\'n maand',
            MM : '%d maande',
            y : '\'n jaar',
            yy : '%d jaar'
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
        },
        week : {
            dow : 1, // Maandag is die eerste dag van die week.
            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
        }
    });


    var ar_ly__symbolMap = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0'
    }, ar_ly__pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    }, ar_ly__plurals = {
        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    }, ar_ly__pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = ar_ly__pluralForm(number),
                str = ar_ly__plurals[u][ar_ly__pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    }, ar_ly__months = [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر'
    ];

    var ar_ly = moment__default.defineLocale('ar-ly', {
        months : ar_ly__months,
        monthsShort : ar_ly__months,
        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/\u200FM/\u200FYYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM : function (input) {
            return 'م' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar : {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'بعد %s',
            past : 'منذ %s',
            s : ar_ly__pluralize('s'),
            m : ar_ly__pluralize('m'),
            mm : ar_ly__pluralize('m'),
            h : ar_ly__pluralize('h'),
            hh : ar_ly__pluralize('h'),
            d : ar_ly__pluralize('d'),
            dd : ar_ly__pluralize('d'),
            M : ar_ly__pluralize('M'),
            MM : ar_ly__pluralize('M'),
            y : ar_ly__pluralize('y'),
            yy : ar_ly__pluralize('y')
        },
        preparse: function (string) {
            return string.replace(/\u200f/g, '').replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return ar_ly__symbolMap[match];
            }).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var ar_ma = moment__default.defineLocale('ar-ma', {
        months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'في %s',
            past : 'منذ %s',
            s : 'ثوان',
            m : 'دقيقة',
            mm : '%d دقائق',
            h : 'ساعة',
            hh : '%d ساعات',
            d : 'يوم',
            dd : '%d أيام',
            M : 'شهر',
            MM : '%d أشهر',
            y : 'سنة',
            yy : '%d سنوات'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var ar_sa__symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    }, ar_sa__numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    };

    var ar_sa = moment__default.defineLocale('ar-sa', {
        months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM : function (input) {
            return 'م' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar : {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'في %s',
            past : 'منذ %s',
            s : 'ثوان',
            m : 'دقيقة',
            mm : '%d دقائق',
            h : 'ساعة',
            hh : '%d ساعات',
            d : 'يوم',
            dd : '%d أيام',
            M : 'شهر',
            MM : '%d أشهر',
            y : 'سنة',
            yy : '%d سنوات'
        },
        preparse: function (string) {
            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return ar_sa__numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return ar_sa__symbolMap[match];
            }).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var ar_tn = moment__default.defineLocale('ar-tn', {
        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });


    var ar__symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    }, ar__numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    }, ar__pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    }, ar__plurals = {
        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    }, ar__pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = ar__pluralForm(number),
                str = ar__plurals[u][ar__pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    }, ar__months = [
        'كانون الثاني يناير',
        'شباط فبراير',
        'آذار مارس',
        'نيسان أبريل',
        'أيار مايو',
        'حزيران يونيو',
        'تموز يوليو',
        'آب أغسطس',
        'أيلول سبتمبر',
        'تشرين الأول أكتوبر',
        'تشرين الثاني نوفمبر',
        'كانون الأول ديسمبر'
    ];

    var ar = moment__default.defineLocale('ar', {
        months : ar__months,
        monthsShort : ar__months,
        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/\u200FM/\u200FYYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM : function (input) {
            return 'م' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar : {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'بعد %s',
            past : 'منذ %s',
            s : ar__pluralize('s'),
            m : ar__pluralize('m'),
            mm : ar__pluralize('m'),
            h : ar__pluralize('h'),
            hh : ar__pluralize('h'),
            d : ar__pluralize('d'),
            dd : ar__pluralize('d'),
            M : ar__pluralize('M'),
            MM : ar__pluralize('M'),
            y : ar__pluralize('y'),
            yy : ar__pluralize('y')
        },
        preparse: function (string) {
            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return ar__numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return ar__symbolMap[match];
            }).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var az__suffixes = {
        1: '-inci',
        5: '-inci',
        8: '-inci',
        70: '-inci',
        80: '-inci',
        2: '-nci',
        7: '-nci',
        20: '-nci',
        50: '-nci',
        3: '-üncü',
        4: '-üncü',
        100: '-üncü',
        6: '-ncı',
        9: '-uncu',
        10: '-uncu',
        30: '-uncu',
        60: '-ıncı',
        90: '-ıncı'
    };

    var az = moment__default.defineLocale('az', {
        months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
        monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
        weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
        weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
        weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[bugün saat] LT',
            nextDay : '[sabah saat] LT',
            nextWeek : '[gələn həftə] dddd [saat] LT',
            lastDay : '[dünən] LT',
            lastWeek : '[keçən həftə] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s sonra',
            past : '%s əvvəl',
            s : 'birneçə saniyyə',
            m : 'bir dəqiqə',
            mm : '%d dəqiqə',
            h : 'bir saat',
            hh : '%d saat',
            d : 'bir gün',
            dd : '%d gün',
            M : 'bir ay',
            MM : '%d ay',
            y : 'bir il',
            yy : '%d il'
        },
        meridiemParse: /gecə|səhər|gündüz|axşam/,
        isPM : function (input) {
            return /^(gündüz|axşam)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'gecə';
            } else if (hour < 12) {
                return 'səhər';
            } else if (hour < 17) {
                return 'gündüz';
            } else {
                return 'axşam';
            }
        },
        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
        ordinal : function (number) {
            if (number === 0) {  // special case for zero
                return number + '-ıncı';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;
            return number + (az__suffixes[a] || az__suffixes[b] || az__suffixes[c]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    function be__plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function be__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
            'dd': 'дзень_дні_дзён',
            'MM': 'месяц_месяцы_месяцаў',
            'yy': 'год_гады_гадоў'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвіліна' : 'хвіліну';
        }
        else if (key === 'h') {
            return withoutSuffix ? 'гадзіна' : 'гадзіну';
        }
        else {
            return number + ' ' + be__plural(format[key], +number);
        }
    }

    var be = moment__default.defineLocale('be', {
        months : {
            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
        },
        monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
        weekdays : {
            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
        },
        weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
        weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY г.',
            LLL : 'D MMMM YYYY г., HH:mm',
            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar : {
            sameDay: '[Сёння ў] LT',
            nextDay: '[Заўтра ў] LT',
            lastDay: '[Учора ў] LT',
            nextWeek: function () {
                return '[У] dddd [ў] LT';
            },
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return '[У мінулую] dddd [ў] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[У мінулы] dddd [ў] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'праз %s',
            past : '%s таму',
            s : 'некалькі секунд',
            m : be__relativeTimeWithPlural,
            mm : be__relativeTimeWithPlural,
            h : be__relativeTimeWithPlural,
            hh : be__relativeTimeWithPlural,
            d : 'дзень',
            dd : be__relativeTimeWithPlural,
            M : 'месяц',
            MM : be__relativeTimeWithPlural,
            y : 'год',
            yy : be__relativeTimeWithPlural
        },
        meridiemParse: /ночы|раніцы|дня|вечара/,
        isPM : function (input) {
            return /^(дня|вечара)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночы';
            } else if (hour < 12) {
                return 'раніцы';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечара';
            }
        },
        ordinalParse: /\d{1,2}-(і|ы|га)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
                case 'D':
                    return number + '-га';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var bg = moment__default.defineLocale('bg', {
        months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
        monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
        weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
        weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'D.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay : '[Днес в] LT',
            nextDay : '[Утре в] LT',
            nextWeek : 'dddd [в] LT',
            lastDay : '[Вчера в] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[В изминалата] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[В изминалия] dddd [в] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'след %s',
            past : 'преди %s',
            s : 'няколко секунди',
            m : 'минута',
            mm : '%d минути',
            h : 'час',
            hh : '%d часа',
            d : 'ден',
            dd : '%d дни',
            M : 'месец',
            MM : '%d месеца',
            y : 'година',
            yy : '%d години'
        },
        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal : function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var bn__symbolMap = {
            '1': '১',
            '2': '২',
            '3': '৩',
            '4': '৪',
            '5': '৫',
            '6': '৬',
            '7': '৭',
            '8': '৮',
            '9': '৯',
            '0': '০'
        },
        bn__numberMap = {
            '১': '1',
            '২': '2',
            '৩': '3',
            '৪': '4',
            '৫': '5',
            '৬': '6',
            '৭': '7',
            '৮': '8',
            '৯': '9',
            '০': '0'
        };

    var bn = moment__default.defineLocale('bn', {
        months : 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
        monthsShort : 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
        weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
        weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
        weekdaysMin : 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
        longDateFormat : {
            LT : 'A h:mm সময়',
            LTS : 'A h:mm:ss সময়',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm সময়',
            LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
        },
        calendar : {
            sameDay : '[আজ] LT',
            nextDay : '[আগামীকাল] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[গতকাল] LT',
            lastWeek : '[গত] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s পরে',
            past : '%s আগে',
            s : 'কয়েক সেকেন্ড',
            m : 'এক মিনিট',
            mm : '%d মিনিট',
            h : 'এক ঘন্টা',
            hh : '%d ঘন্টা',
            d : 'এক দিন',
            dd : '%d দিন',
            M : 'এক মাস',
            MM : '%d মাস',
            y : 'এক বছর',
            yy : '%d বছর'
        },
        preparse: function (string) {
            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
                return bn__numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return bn__symbolMap[match];
            });
        },
        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === 'রাত' && hour >= 4) ||
                (meridiem === 'দুপুর' && hour < 5) ||
                meridiem === 'বিকাল') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'রাত';
            } else if (hour < 10) {
                return 'সকাল';
            } else if (hour < 17) {
                return 'দুপুর';
            } else if (hour < 20) {
                return 'বিকাল';
            } else {
                return 'রাত';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var bo__symbolMap = {
            '1': '༡',
            '2': '༢',
            '3': '༣',
            '4': '༤',
            '5': '༥',
            '6': '༦',
            '7': '༧',
            '8': '༨',
            '9': '༩',
            '0': '༠'
        },
        bo__numberMap = {
            '༡': '1',
            '༢': '2',
            '༣': '3',
            '༤': '4',
            '༥': '5',
            '༦': '6',
            '༧': '7',
            '༨': '8',
            '༩': '9',
            '༠': '0'
        };

    var bo = moment__default.defineLocale('bo', {
        months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
        monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
        weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
        weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
        weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm',
            LLLL : 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar : {
            sameDay : '[དི་རིང] LT',
            nextDay : '[སང་ཉིན] LT',
            nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
            lastDay : '[ཁ་སང] LT',
            lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ལ་',
            past : '%s སྔན་ལ',
            s : 'ལམ་སང',
            m : 'སྐར་མ་གཅིག',
            mm : '%d སྐར་མ',
            h : 'ཆུ་ཚོད་གཅིག',
            hh : '%d ཆུ་ཚོད',
            d : 'ཉིན་གཅིག',
            dd : '%d ཉིན་',
            M : 'ཟླ་བ་གཅིག',
            MM : '%d ཟླ་བ',
            y : 'ལོ་གཅིག',
            yy : '%d ལོ'
        },
        preparse: function (string) {
            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
                return bo__numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return bo__symbolMap[match];
            });
        },
        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
                (meridiem === 'ཉིན་གུང' && hour < 5) ||
                meridiem === 'དགོང་དག') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'མཚན་མོ';
            } else if (hour < 10) {
                return 'ཞོགས་ཀས';
            } else if (hour < 17) {
                return 'ཉིན་གུང';
            } else if (hour < 20) {
                return 'དགོང་དག';
            } else {
                return 'མཚན་མོ';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });


    function relativeTimeWithMutation(number, withoutSuffix, key) {
        var format = {
            'mm': 'munutenn',
            'MM': 'miz',
            'dd': 'devezh'
        };
        return number + ' ' + mutation(format[key], number);
    }
    function specialMutationForYears(number) {
        switch (lastNumber(number)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
                return number + ' bloaz';
            default:
                return number + ' vloaz';
        }
    }
    function lastNumber(number) {
        if (number > 9) {
            return lastNumber(number % 10);
        }
        return number;
    }
    function mutation(text, number) {
        if (number === 2) {
            return softMutation(text);
        }
        return text;
    }
    function softMutation(text) {
        var mutationTable = {
            'm': 'v',
            'b': 'v',
            'd': 'z'
        };
        if (mutationTable[text.charAt(0)] === undefined) {
            return text;
        }
        return mutationTable[text.charAt(0)] + text.substring(1);
    }

    var br = moment__default.defineLocale('br', {
        months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
        monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
        weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
        weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
        weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h[e]mm A',
            LTS : 'h[e]mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D [a viz] MMMM YYYY',
            LLL : 'D [a viz] MMMM YYYY h[e]mm A',
            LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
        },
        calendar : {
            sameDay : '[Hiziv da] LT',
            nextDay : '[Warc\'hoazh da] LT',
            nextWeek : 'dddd [da] LT',
            lastDay : '[Dec\'h da] LT',
            lastWeek : 'dddd [paset da] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'a-benn %s',
            past : '%s \'zo',
            s : 'un nebeud segondennoù',
            m : 'ur vunutenn',
            mm : relativeTimeWithMutation,
            h : 'un eur',
            hh : '%d eur',
            d : 'un devezh',
            dd : relativeTimeWithMutation,
            M : 'ur miz',
            MM : relativeTimeWithMutation,
            y : 'ur bloaz',
            yy : specialMutationForYears
        },
        ordinalParse: /\d{1,2}(añ|vet)/,
        ordinal : function (number) {
            var output = (number === 1) ? 'añ' : 'vet';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    function bs__translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    var bs = moment__default.defineLocale('bs', {
        months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danas u] LT',
            nextDay  : '[sutra u] LT',
            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[jučer u] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[prošlu] dddd [u] LT';
                    case 6:
                        return '[prošle] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prošli] dddd [u] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'par sekundi',
            m      : bs__translate,
            mm     : bs__translate,
            h      : bs__translate,
            hh     : bs__translate,
            d      : 'dan',
            dd     : bs__translate,
            M      : 'mjesec',
            MM     : bs__translate,
            y      : 'godinu',
            yy     : bs__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var ca = moment__default.defineLocale('ca', {
        months : 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
        monthsShort : 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
        monthsParseExact : true,
        weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
        weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
        weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            nextDay : function () {
                return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            lastDay : function () {
                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'fa %s',
            s : 'uns segons',
            m : 'un minut',
            mm : '%d minuts',
            h : 'una hora',
            hh : '%d hores',
            d : 'un dia',
            dd : '%d dies',
            M : 'un mes',
            MM : '%d mesos',
            y : 'un any',
            yy : '%d anys'
        },
        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
        ordinal : function (number, period) {
            var output = (number === 1) ? 'r' :
                (number === 2) ? 'n' :
                    (number === 3) ? 'r' :
                        (number === 4) ? 't' : 'è';
            if (period === 'w' || period === 'W') {
                output = 'a';
            }
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var cs__months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
        cs__monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
    function cs__plural(n) {
        return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
    }
    function cs__translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':  // a few seconds / in a few seconds / a few seconds ago
                return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
            case 'm':  // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
            case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (cs__plural(number) ? 'minuty' : 'minut');
                } else {
                    return result + 'minutami';
                }
                break;
            case 'h':  // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
            case 'hh': // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (cs__plural(number) ? 'hodiny' : 'hodin');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':  // a day / in a day / a day ago
                return (withoutSuffix || isFuture) ? 'den' : 'dnem';
            case 'dd': // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (cs__plural(number) ? 'dny' : 'dní');
                } else {
                    return result + 'dny';
                }
                break;
            case 'M':  // a month / in a month / a month ago
                return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
            case 'MM': // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (cs__plural(number) ? 'měsíce' : 'měsíců');
                } else {
                    return result + 'měsíci';
                }
                break;
            case 'y':  // a year / in a year / a year ago
                return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
            case 'yy': // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (cs__plural(number) ? 'roky' : 'let');
                } else {
                    return result + 'lety';
                }
                break;
        }
    }

    var cs = moment__default.defineLocale('cs', {
        months : cs__months,
        monthsShort : cs__monthsShort,
        monthsParse : (function (months, monthsShort) {
            var i, _monthsParse = [];
            for (i = 0; i < 12; i++) {
                // use custom parser to solve problem with July (červenec)
                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
            }
            return _monthsParse;
        }(cs__months, cs__monthsShort)),
        shortMonthsParse : (function (monthsShort) {
            var i, _shortMonthsParse = [];
            for (i = 0; i < 12; i++) {
                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
            }
            return _shortMonthsParse;
        }(cs__monthsShort)),
        longMonthsParse : (function (months) {
            var i, _longMonthsParse = [];
            for (i = 0; i < 12; i++) {
                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
            }
            return _longMonthsParse;
        }(cs__months)),
        weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
        weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
        weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
        longDateFormat : {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd D. MMMM YYYY H:mm',
            l : 'D. M. YYYY'
        },
        calendar : {
            sameDay: '[dnes v] LT',
            nextDay: '[zítra v] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v neděli v] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [v] LT';
                    case 3:
                        return '[ve středu v] LT';
                    case 4:
                        return '[ve čtvrtek v] LT';
                    case 5:
                        return '[v pátek v] LT';
                    case 6:
                        return '[v sobotu v] LT';
                }
            },
            lastDay: '[včera v] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[minulou neděli v] LT';
                    case 1:
                    case 2:
                        return '[minulé] dddd [v] LT';
                    case 3:
                        return '[minulou středu v] LT';
                    case 4:
                    case 5:
                        return '[minulý] dddd [v] LT';
                    case 6:
                        return '[minulou sobotu v] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : 'před %s',
            s : cs__translate,
            m : cs__translate,
            mm : cs__translate,
            h : cs__translate,
            hh : cs__translate,
            d : cs__translate,
            dd : cs__translate,
            M : cs__translate,
            MM : cs__translate,
            y : cs__translate,
            yy : cs__translate
        },
        ordinalParse : /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var cv = moment__default.defineLocale('cv', {
        months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
        monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
        weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
        weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
        weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
            LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
            LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
        },
        calendar : {
            sameDay: '[Паян] LT [сехетре]',
            nextDay: '[Ыран] LT [сехетре]',
            lastDay: '[Ӗнер] LT [сехетре]',
            nextWeek: '[Ҫитес] dddd LT [сехетре]',
            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
            sameElse: 'L'
        },
        relativeTime : {
            future : function (output) {
                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
                return output + affix;
            },
            past : '%s каялла',
            s : 'пӗр-ик ҫеккунт',
            m : 'пӗр минут',
            mm : '%d минут',
            h : 'пӗр сехет',
            hh : '%d сехет',
            d : 'пӗр кун',
            dd : '%d кун',
            M : 'пӗр уйӑх',
            MM : '%d уйӑх',
            y : 'пӗр ҫул',
            yy : '%d ҫул'
        },
        ordinalParse: /\d{1,2}-мӗш/,
        ordinal : '%d-мӗш',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var cy = moment__default.defineLocale('cy', {
        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
        weekdaysParseExact : true,
        // time formats are the same as en-gb
        longDateFormat: {
            LT: 'HH:mm',
            LTS : 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Heddiw am] LT',
            nextDay: '[Yfory am] LT',
            nextWeek: 'dddd [am] LT',
            lastDay: '[Ddoe am] LT',
            lastWeek: 'dddd [diwethaf am] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'mewn %s',
            past: '%s yn ôl',
            s: 'ychydig eiliadau',
            m: 'munud',
            mm: '%d munud',
            h: 'awr',
            hh: '%d awr',
            d: 'diwrnod',
            dd: '%d diwrnod',
            M: 'mis',
            MM: '%d mis',
            y: 'blwyddyn',
            yy: '%d flynedd'
        },
        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
        ordinal: function (number) {
            var b = number,
                output = '',
                lookup = [
                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
                ];
            if (b > 20) {
                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
                    output = 'fed'; // not 30ain, 70ain or 90ain
                } else {
                    output = 'ain';
                }
            } else if (b > 0) {
                output = lookup[b];
            }
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var da = moment__default.defineLocale('da', {
        months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
        weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd [d.] D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[I dag kl.] LT',
            nextDay : '[I morgen kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[I går kl.] LT',
            lastWeek : '[sidste] dddd [kl] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s siden',
            s : 'få sekunder',
            m : 'et minut',
            mm : '%d minutter',
            h : 'en time',
            hh : '%d timer',
            d : 'en dag',
            dd : '%d dage',
            M : 'en måned',
            MM : '%d måneder',
            y : 'et år',
            yy : '%d år'
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    function de_at__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var de_at = moment__default.defineLocale('de-at', {
        months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            m : de_at__processRelativeTime,
            mm : '%d Minuten',
            h : de_at__processRelativeTime,
            hh : '%d Stunden',
            d : de_at__processRelativeTime,
            dd : de_at__processRelativeTime,
            M : de_at__processRelativeTime,
            MM : de_at__processRelativeTime,
            y : de_at__processRelativeTime,
            yy : de_at__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    function de__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var de = moment__default.defineLocale('de', {
        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            m : de__processRelativeTime,
            mm : '%d Minuten',
            h : de__processRelativeTime,
            hh : '%d Stunden',
            d : de__processRelativeTime,
            dd : de__processRelativeTime,
            M : de__processRelativeTime,
            MM : de__processRelativeTime,
            y : de__processRelativeTime,
            yy : de__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var dv__months = [
        'ޖެނުއަރީ',
        'ފެބްރުއަރީ',
        'މާރިޗު',
        'އޭޕްރީލު',
        'މޭ',
        'ޖޫން',
        'ޖުލައި',
        'އޯގަސްޓު',
        'ސެޕްޓެމްބަރު',
        'އޮކްޓޯބަރު',
        'ނޮވެމްބަރު',
        'ޑިސެމްބަރު'
    ], dv__weekdays = [
        'އާދިއްތަ',
        'ހޯމަ',
        'އަންގާރަ',
        'ބުދަ',
        'ބުރާސްފަތި',
        'ހުކުރު',
        'ހޮނިހިރު'
    ];

    var dv = moment__default.defineLocale('dv', {
        months : dv__months,
        monthsShort : dv__months,
        weekdays : dv__weekdays,
        weekdaysShort : dv__weekdays,
        weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
        longDateFormat : {

            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/M/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /މކ|މފ/,
        isPM : function (input) {
            return 'މފ' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'މކ';
            } else {
                return 'މފ';
            }
        },
        calendar : {
            sameDay : '[މިއަދު] LT',
            nextDay : '[މާދަމާ] LT',
            nextWeek : 'dddd LT',
            lastDay : '[އިއްޔެ] LT',
            lastWeek : '[ފާއިތުވި] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ތެރޭގައި %s',
            past : 'ކުރިން %s',
            s : 'ސިކުންތުކޮޅެއް',
            m : 'މިނިޓެއް',
            mm : 'މިނިޓު %d',
            h : 'ގަޑިއިރެއް',
            hh : 'ގަޑިއިރު %d',
            d : 'ދުވަހެއް',
            dd : 'ދުވަސް %d',
            M : 'މަހެއް',
            MM : 'މަސް %d',
            y : 'އަހަރެއް',
            yy : 'އަހަރު %d'
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '،');
        },
        week : {
            dow : 7,  // Sunday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var el = moment__default.defineLocale('el', {
        monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
        monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
        months : function (momentToFormat, format) {
            if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
                return this._monthsGenitiveEl[momentToFormat.month()];
            } else {
                return this._monthsNominativeEl[momentToFormat.month()];
            }
        },
        monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
        weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
        weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
        weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'μμ' : 'ΜΜ';
            } else {
                return isLower ? 'πμ' : 'ΠΜ';
            }
        },
        isPM : function (input) {
            return ((input + '').toLowerCase()[0] === 'μ');
        },
        meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendarEl : {
            sameDay : '[Σήμερα {}] LT',
            nextDay : '[Αύριο {}] LT',
            nextWeek : 'dddd [{}] LT',
            lastDay : '[Χθες {}] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 6:
                        return '[το προηγούμενο] dddd [{}] LT';
                    default:
                        return '[την προηγούμενη] dddd [{}] LT';
                }
            },
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendarEl[key],
                hours = mom && mom.hours();
            if (isFunction(output)) {
                output = output.apply(mom);
            }
            return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
        },
        relativeTime : {
            future : 'σε %s',
            past : '%s πριν',
            s : 'λίγα δευτερόλεπτα',
            m : 'ένα λεπτό',
            mm : '%d λεπτά',
            h : 'μία ώρα',
            hh : '%d ώρες',
            d : 'μία μέρα',
            dd : '%d μέρες',
            M : 'ένας μήνας',
            MM : '%d μήνες',
            y : 'ένας χρόνος',
            yy : '%d χρόνια'
        },
        ordinalParse: /\d{1,2}η/,
        ordinal: '%dη',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4st is the first week of the year.
        }
    });


    var en_au = moment__default.defineLocale('en-au', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var en_ca = moment__default.defineLocale('en-ca', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'YYYY-MM-DD',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY h:mm A',
            LLLL : 'dddd, MMMM D, YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });


    var en_gb = moment__default.defineLocale('en-gb', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var en_ie = moment__default.defineLocale('en-ie', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var en_nz = moment__default.defineLocale('en-nz', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var eo = moment__default.defineLocale('eo', {
        months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
        weekdays : 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
        weekdaysShort : 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
        weekdaysMin : 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D[-an de] MMMM, YYYY',
            LLL : 'D[-an de] MMMM, YYYY HH:mm',
            LLLL : 'dddd, [la] D[-an de] MMMM, YYYY HH:mm'
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function (input) {
            return input.charAt(0).toLowerCase() === 'p';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'p.t.m.' : 'P.T.M.';
            } else {
                return isLower ? 'a.t.m.' : 'A.T.M.';
            }
        },
        calendar : {
            sameDay : '[Hodiaŭ je] LT',
            nextDay : '[Morgaŭ je] LT',
            nextWeek : 'dddd [je] LT',
            lastDay : '[Hieraŭ je] LT',
            lastWeek : '[pasinta] dddd [je] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'je %s',
            past : 'antaŭ %s',
            s : 'sekundoj',
            m : 'minuto',
            mm : '%d minutoj',
            h : 'horo',
            hh : '%d horoj',
            d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
            dd : '%d tagoj',
            M : 'monato',
            MM : '%d monatoj',
            y : 'jaro',
            yy : '%d jaroj'
        },
        ordinalParse: /\d{1,2}a/,
        ordinal : '%da',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var es_do__monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        es_do__monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var es_do = moment__default.defineLocale('es-do', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return es_do__monthsShort[m.month()];
            } else {
                return es_do__monthsShortDot[m.month()];
            }
        },
        monthsParseExact : true,
        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY h:mm A',
            LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un día',
            dd : '%d días',
            M : 'un mes',
            MM : '%d meses',
            y : 'un año',
            yy : '%d años'
        },
        ordinalParse : /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var es__monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        es__monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var es = moment__default.defineLocale('es', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return es__monthsShort[m.month()];
            } else {
                return es__monthsShortDot[m.month()];
            }
        },
        monthsParseExact : true,
        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY H:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un día',
            dd : '%d días',
            M : 'un mes',
            MM : '%d meses',
            y : 'un año',
            yy : '%d años'
        },
        ordinalParse : /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    function et__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
            'm' : ['ühe minuti', 'üks minut'],
            'mm': [number + ' minuti', number + ' minutit'],
            'h' : ['ühe tunni', 'tund aega', 'üks tund'],
            'hh': [number + ' tunni', number + ' tundi'],
            'd' : ['ühe päeva', 'üks päev'],
            'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
            'MM': [number + ' kuu', number + ' kuud'],
            'y' : ['ühe aasta', 'aasta', 'üks aasta'],
            'yy': [number + ' aasta', number + ' aastat']
        };
        if (withoutSuffix) {
            return format[key][2] ? format[key][2] : format[key][1];
        }
        return isFuture ? format[key][0] : format[key][1];
    }

    var et = moment__default.defineLocale('et', {
        months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
        monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
        weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
        weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
        weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
        longDateFormat : {
            LT   : 'H:mm',
            LTS : 'H:mm:ss',
            L    : 'DD.MM.YYYY',
            LL   : 'D. MMMM YYYY',
            LLL  : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[Täna,] LT',
            nextDay  : '[Homme,] LT',
            nextWeek : '[Järgmine] dddd LT',
            lastDay  : '[Eile,] LT',
            lastWeek : '[Eelmine] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s pärast',
            past   : '%s tagasi',
            s      : et__processRelativeTime,
            m      : et__processRelativeTime,
            mm     : et__processRelativeTime,
            h      : et__processRelativeTime,
            hh     : et__processRelativeTime,
            d      : et__processRelativeTime,
            dd     : '%d päeva',
            M      : et__processRelativeTime,
            MM     : et__processRelativeTime,
            y      : et__processRelativeTime,
            yy     : et__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var eu = moment__default.defineLocale('eu', {
        months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
        monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
        monthsParseExact : true,
        weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
        weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
        weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'YYYY[ko] MMMM[ren] D[a]',
            LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
            LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
            l : 'YYYY-M-D',
            ll : 'YYYY[ko] MMM D[a]',
            lll : 'YYYY[ko] MMM D[a] HH:mm',
            llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
        },
        calendar : {
            sameDay : '[gaur] LT[etan]',
            nextDay : '[bihar] LT[etan]',
            nextWeek : 'dddd LT[etan]',
            lastDay : '[atzo] LT[etan]',
            lastWeek : '[aurreko] dddd LT[etan]',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s barru',
            past : 'duela %s',
            s : 'segundo batzuk',
            m : 'minutu bat',
            mm : '%d minutu',
            h : 'ordu bat',
            hh : '%d ordu',
            d : 'egun bat',
            dd : '%d egun',
            M : 'hilabete bat',
            MM : '%d hilabete',
            y : 'urte bat',
            yy : '%d urte'
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var fa__symbolMap = {
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
        '0': '۰'
    }, fa__numberMap = {
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '۰': '0'
    };

    var fa = moment__default.defineLocale('fa', {
        months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
        weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
        weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /قبل از ظهر|بعد از ظهر/,
        isPM: function (input) {
            return /بعد از ظهر/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'قبل از ظهر';
            } else {
                return 'بعد از ظهر';
            }
        },
        calendar : {
            sameDay : '[امروز ساعت] LT',
            nextDay : '[فردا ساعت] LT',
            nextWeek : 'dddd [ساعت] LT',
            lastDay : '[دیروز ساعت] LT',
            lastWeek : 'dddd [پیش] [ساعت] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'در %s',
            past : '%s پیش',
            s : 'چندین ثانیه',
            m : 'یک دقیقه',
            mm : '%d دقیقه',
            h : 'یک ساعت',
            hh : '%d ساعت',
            d : 'یک روز',
            dd : '%d روز',
            M : 'یک ماه',
            MM : '%d ماه',
            y : 'یک سال',
            yy : '%d سال'
        },
        preparse: function (string) {
            return string.replace(/[۰-۹]/g, function (match) {
                return fa__numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return fa__symbolMap[match];
            }).replace(/,/g, '،');
        },
        ordinalParse: /\d{1,2}م/,
        ordinal : '%dم',
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12 // The week that contains Jan 1st is the first week of the year.
        }
    });


    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
        numbersFuture = [
            'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
            numbersPast[7], numbersPast[8], numbersPast[9]
        ];
    function fi__translate(number, withoutSuffix, key, isFuture) {
        var result = '';
        switch (key) {
            case 's':
                return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
            case 'm':
                return isFuture ? 'minuutin' : 'minuutti';
            case 'mm':
                result = isFuture ? 'minuutin' : 'minuuttia';
                break;
            case 'h':
                return isFuture ? 'tunnin' : 'tunti';
            case 'hh':
                result = isFuture ? 'tunnin' : 'tuntia';
                break;
            case 'd':
                return isFuture ? 'päivän' : 'päivä';
            case 'dd':
                result = isFuture ? 'päivän' : 'päivää';
                break;
            case 'M':
                return isFuture ? 'kuukauden' : 'kuukausi';
            case 'MM':
                result = isFuture ? 'kuukauden' : 'kuukautta';
                break;
            case 'y':
                return isFuture ? 'vuoden' : 'vuosi';
            case 'yy':
                result = isFuture ? 'vuoden' : 'vuotta';
                break;
        }
        result = verbalNumber(number, isFuture) + ' ' + result;
        return result;
    }
    function verbalNumber(number, isFuture) {
        return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
    }

    var fi = moment__default.defineLocale('fi', {
        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
        monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD.MM.YYYY',
            LL : 'Do MMMM[ta] YYYY',
            LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
            l : 'D.M.YYYY',
            ll : 'Do MMM YYYY',
            lll : 'Do MMM YYYY, [klo] HH.mm',
            llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
        },
        calendar : {
            sameDay : '[tänään] [klo] LT',
            nextDay : '[huomenna] [klo] LT',
            nextWeek : 'dddd [klo] LT',
            lastDay : '[eilen] [klo] LT',
            lastWeek : '[viime] dddd[na] [klo] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s päästä',
            past : '%s sitten',
            s : fi__translate,
            m : fi__translate,
            mm : fi__translate,
            h : fi__translate,
            hh : fi__translate,
            d : fi__translate,
            dd : fi__translate,
            M : fi__translate,
            MM : fi__translate,
            y : fi__translate,
            yy : fi__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var fo = moment__default.defineLocale('fo', {
        months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
        weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
        weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D. MMMM, YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Í dag kl.] LT',
            nextDay : '[Í morgin kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[Í gjár kl.] LT',
            lastWeek : '[síðstu] dddd [kl] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'um %s',
            past : '%s síðani',
            s : 'fá sekund',
            m : 'ein minutt',
            mm : '%d minuttir',
            h : 'ein tími',
            hh : '%d tímar',
            d : 'ein dagur',
            dd : '%d dagar',
            M : 'ein mánaði',
            MM : '%d mánaðir',
            y : 'eitt ár',
            yy : '%d ár'
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var fr_ca = moment__default.defineLocale('fr-ca', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Aujourd\'hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        ordinalParse: /\d{1,2}(er|e)/,
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : 'e');
        }
    });


    var fr_ch = moment__default.defineLocale('fr-ch', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Aujourd\'hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        ordinalParse: /\d{1,2}(er|e)/,
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : 'e');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var fr = moment__default.defineLocale('fr', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Aujourd\'hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : '');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var fy__monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
        fy__monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

    var fy = moment__default.defineLocale('fy', {
        months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return fy__monthsShortWithoutDots[m.month()];
            } else {
                return fy__monthsShortWithDots[m.month()];
            }
        },
        monthsParseExact : true,
        weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
        weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
        weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[hjoed om] LT',
            nextDay: '[moarn om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[juster om] LT',
            lastWeek: '[ôfrûne] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'oer %s',
            past : '%s lyn',
            s : 'in pear sekonden',
            m : 'ien minút',
            mm : '%d minuten',
            h : 'ien oere',
            hh : '%d oeren',
            d : 'ien dei',
            dd : '%d dagen',
            M : 'ien moanne',
            MM : '%d moannen',
            y : 'ien jier',
            yy : '%d jierren'
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var gd__months = [
        'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
    ];

    var gd__monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

    var gd__weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

    var gd = moment__default.defineLocale('gd', {
        months : gd__months,
        monthsShort : gd__monthsShort,
        monthsParseExact : true,
        weekdays : gd__weekdays,
        weekdaysShort : weekdaysShort,
        weekdaysMin : weekdaysMin,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[An-diugh aig] LT',
            nextDay : '[A-màireach aig] LT',
            nextWeek : 'dddd [aig] LT',
            lastDay : '[An-dè aig] LT',
            lastWeek : 'dddd [seo chaidh] [aig] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ann an %s',
            past : 'bho chionn %s',
            s : 'beagan diogan',
            m : 'mionaid',
            mm : '%d mionaidean',
            h : 'uair',
            hh : '%d uairean',
            d : 'latha',
            dd : '%d latha',
            M : 'mìos',
            MM : '%d mìosan',
            y : 'bliadhna',
            yy : '%d bliadhna'
        },
        ordinalParse : /\d{1,2}(d|na|mh)/,
        ordinal : function (number) {
            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var gl = moment__default.defineLocale('gl', {
        months : 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
        monthsShort : 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mé_xo_ve_sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY H:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
            },
            nextDay : function () {
                return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
            },
            lastDay : function () {
                return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
            },
            lastWeek : function () {
                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : function (str) {
                if (str.indexOf('un') === 0) {
                    return 'n' + str;
                }
                return 'en ' + str;
            },
            past : 'hai %s',
            s : 'uns segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'unha hora',
            hh : '%d horas',
            d : 'un día',
            dd : '%d días',
            M : 'un mes',
            MM : '%d meses',
            y : 'un ano',
            yy : '%d anos'
        },
        ordinalParse : /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var he = moment__default.defineLocale('he', {
        months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
        monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
        weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
        weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
        weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [ב]MMMM YYYY',
            LLL : 'D [ב]MMMM YYYY HH:mm',
            LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
            l : 'D/M/YYYY',
            ll : 'D MMM YYYY',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd, D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[היום ב־]LT',
            nextDay : '[מחר ב־]LT',
            nextWeek : 'dddd [בשעה] LT',
            lastDay : '[אתמול ב־]LT',
            lastWeek : '[ביום] dddd [האחרון בשעה] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'בעוד %s',
            past : 'לפני %s',
            s : 'מספר שניות',
            m : 'דקה',
            mm : '%d דקות',
            h : 'שעה',
            hh : function (number) {
                if (number === 2) {
                    return 'שעתיים';
                }
                return number + ' שעות';
            },
            d : 'יום',
            dd : function (number) {
                if (number === 2) {
                    return 'יומיים';
                }
                return number + ' ימים';
            },
            M : 'חודש',
            MM : function (number) {
                if (number === 2) {
                    return 'חודשיים';
                }
                return number + ' חודשים';
            },
            y : 'שנה',
            yy : function (number) {
                if (number === 2) {
                    return 'שנתיים';
                } else if (number % 10 === 0 && number !== 10) {
                    return number + ' שנה';
                }
                return number + ' שנים';
            }
        },
        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
        isPM : function (input) {
            return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 5) {
                return 'לפנות בוקר';
            } else if (hour < 10) {
                return 'בבוקר';
            } else if (hour < 12) {
                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
            } else if (hour < 18) {
                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
            } else {
                return 'בערב';
            }
        }
    });


    var hi__symbolMap = {
            '1': '१',
            '2': '२',
            '3': '३',
            '4': '४',
            '5': '५',
            '6': '६',
            '7': '७',
            '8': '८',
            '9': '९',
            '0': '०'
        },
        hi__numberMap = {
            '१': '1',
            '२': '2',
            '३': '3',
            '४': '4',
            '५': '5',
            '६': '6',
            '७': '7',
            '८': '8',
            '९': '9',
            '०': '0'
        };

    var hi = moment__default.defineLocale('hi', {
        months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
        monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
        monthsParseExact: true,
        weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
        weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
        longDateFormat : {
            LT : 'A h:mm बजे',
            LTS : 'A h:mm:ss बजे',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm बजे',
            LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[कल] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[कल] LT',
            lastWeek : '[पिछले] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s में',
            past : '%s पहले',
            s : 'कुछ ही क्षण',
            m : 'एक मिनट',
            mm : '%d मिनट',
            h : 'एक घंटा',
            hh : '%d घंटे',
            d : 'एक दिन',
            dd : '%d दिन',
            M : 'एक महीने',
            MM : '%d महीने',
            y : 'एक वर्ष',
            yy : '%d वर्ष'
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return hi__numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return hi__symbolMap[match];
            });
        },
        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
        meridiemParse: /रात|सुबह|दोपहर|शाम/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'रात') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'सुबह') {
                return hour;
            } else if (meridiem === 'दोपहर') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'शाम') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'रात';
            } else if (hour < 10) {
                return 'सुबह';
            } else if (hour < 17) {
                return 'दोपहर';
            } else if (hour < 20) {
                return 'शाम';
            } else {
                return 'रात';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });


    function hr__translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    var hr = moment__default.defineLocale('hr', {
        months : {
            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
        },
        monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danas u] LT',
            nextDay  : '[sutra u] LT',
            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[jučer u] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[prošlu] dddd [u] LT';
                    case 6:
                        return '[prošle] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prošli] dddd [u] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'par sekundi',
            m      : hr__translate,
            mm     : hr__translate,
            h      : hr__translate,
            hh     : hr__translate,
            d      : 'dan',
            dd     : hr__translate,
            M      : 'mjesec',
            MM     : hr__translate,
            y      : 'godinu',
            yy     : hr__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
    function hu__translate(number, withoutSuffix, key, isFuture) {
        var num = number,
            suffix;
        switch (key) {
            case 's':
                return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
            case 'm':
                return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'mm':
                return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'h':
                return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
            case 'hh':
                return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
            case 'd':
                return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'dd':
                return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'M':
                return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
            case 'MM':
                return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
            case 'y':
                return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
            case 'yy':
                return num + (isFuture || withoutSuffix ? ' év' : ' éve');
        }
        return '';
    }
    function week(isFuture) {
        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
    }

    var hu = moment__default.defineLocale('hu', {
        months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
        monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
        weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
        weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
        weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'YYYY.MM.DD.',
            LL : 'YYYY. MMMM D.',
            LLL : 'YYYY. MMMM D. H:mm',
            LLLL : 'YYYY. MMMM D., dddd H:mm'
        },
        meridiemParse: /de|du/i,
        isPM: function (input) {
            return input.charAt(1).toLowerCase() === 'u';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower === true ? 'de' : 'DE';
            } else {
                return isLower === true ? 'du' : 'DU';
            }
        },
        calendar : {
            sameDay : '[ma] LT[-kor]',
            nextDay : '[holnap] LT[-kor]',
            nextWeek : function () {
                return week.call(this, true);
            },
            lastDay : '[tegnap] LT[-kor]',
            lastWeek : function () {
                return week.call(this, false);
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s múlva',
            past : '%s',
            s : hu__translate,
            m : hu__translate,
            mm : hu__translate,
            h : hu__translate,
            hh : hu__translate,
            d : hu__translate,
            dd : hu__translate,
            M : hu__translate,
            MM : hu__translate,
            y : hu__translate,
            yy : hu__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var hy_am = moment__default.defineLocale('hy-am', {
        months : {
            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
        },
        monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
        weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
        weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
        weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY թ.',
            LLL : 'D MMMM YYYY թ., HH:mm',
            LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
        },
        calendar : {
            sameDay: '[այսօր] LT',
            nextDay: '[վաղը] LT',
            lastDay: '[երեկ] LT',
            nextWeek: function () {
                return 'dddd [օրը ժամը] LT';
            },
            lastWeek: function () {
                return '[անցած] dddd [օրը ժամը] LT';
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s հետո',
            past : '%s առաջ',
            s : 'մի քանի վայրկյան',
            m : 'րոպե',
            mm : '%d րոպե',
            h : 'ժամ',
            hh : '%d ժամ',
            d : 'օր',
            dd : '%d օր',
            M : 'ամիս',
            MM : '%d ամիս',
            y : 'տարի',
            yy : '%d տարի'
        },
        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
        isPM: function (input) {
            return /^(ցերեկվա|երեկոյան)$/.test(input);
        },
        meridiem : function (hour) {
            if (hour < 4) {
                return 'գիշերվա';
            } else if (hour < 12) {
                return 'առավոտվա';
            } else if (hour < 17) {
                return 'ցերեկվա';
            } else {
                return 'երեկոյան';
            }
        },
        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'DDD':
                case 'w':
                case 'W':
                case 'DDDo':
                    if (number === 1) {
                        return number + '-ին';
                    }
                    return number + '-րդ';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var id = moment__default.defineLocale('id', {
        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
        weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'siang') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'sore' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'siang';
            } else if (hours < 19) {
                return 'sore';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Besok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kemarin pukul] LT',
            lastWeek : 'dddd [lalu pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lalu',
            s : 'beberapa detik',
            m : 'semenit',
            mm : '%d menit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    function is__plural(n) {
        if (n % 100 === 11) {
            return true;
        } else if (n % 10 === 1) {
            return false;
        }
        return true;
    }
    function is__translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
            case 'm':
                return withoutSuffix ? 'mínúta' : 'mínútu';
            case 'mm':
                if (is__plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
                } else if (withoutSuffix) {
                    return result + 'mínúta';
                }
                return result + 'mínútu';
            case 'hh':
                if (is__plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
                }
                return result + 'klukkustund';
            case 'd':
                if (withoutSuffix) {
                    return 'dagur';
                }
                return isFuture ? 'dag' : 'degi';
            case 'dd':
                if (is__plural(number)) {
                    if (withoutSuffix) {
                        return result + 'dagar';
                    }
                    return result + (isFuture ? 'daga' : 'dögum');
                } else if (withoutSuffix) {
                    return result + 'dagur';
                }
                return result + (isFuture ? 'dag' : 'degi');
            case 'M':
                if (withoutSuffix) {
                    return 'mánuður';
                }
                return isFuture ? 'mánuð' : 'mánuði';
            case 'MM':
                if (is__plural(number)) {
                    if (withoutSuffix) {
                        return result + 'mánuðir';
                    }
                    return result + (isFuture ? 'mánuði' : 'mánuðum');
                } else if (withoutSuffix) {
                    return result + 'mánuður';
                }
                return result + (isFuture ? 'mánuð' : 'mánuði');
            case 'y':
                return withoutSuffix || isFuture ? 'ár' : 'ári';
            case 'yy':
                if (is__plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
                }
                return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
        }
    }

    var is = moment__default.defineLocale('is', {
        months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
        weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
        weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
        weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] H:mm',
            LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
        },
        calendar : {
            sameDay : '[í dag kl.] LT',
            nextDay : '[á morgun kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[í gær kl.] LT',
            lastWeek : '[síðasta] dddd [kl.] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'eftir %s',
            past : 'fyrir %s síðan',
            s : is__translate,
            m : is__translate,
            mm : is__translate,
            h : 'klukkustund',
            hh : is__translate,
            d : is__translate,
            dd : is__translate,
            M : is__translate,
            MM : is__translate,
            y : is__translate,
            yy : is__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var it = moment__default.defineLocale('it', {
        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
        weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : function (s) {
                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past : '%s fa',
            s : 'alcuni secondi',
            m : 'un minuto',
            mm : '%d minuti',
            h : 'un\'ora',
            hh : '%d ore',
            d : 'un giorno',
            dd : '%d giorni',
            M : 'un mese',
            MM : '%d mesi',
            y : 'un anno',
            yy : '%d anni'
        },
        ordinalParse : /\d{1,2}º/,
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var ja = moment__default.defineLocale('ja', {
        months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
        weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
        weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
        longDateFormat : {
            LT : 'Ah時m分',
            LTS : 'Ah時m分s秒',
            L : 'YYYY/MM/DD',
            LL : 'YYYY年M月D日',
            LLL : 'YYYY年M月D日Ah時m分',
            LLLL : 'YYYY年M月D日Ah時m分 dddd'
        },
        meridiemParse: /午前|午後/i,
        isPM : function (input) {
            return input === '午後';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return '午前';
            } else {
                return '午後';
            }
        },
        calendar : {
            sameDay : '[今日] LT',
            nextDay : '[明日] LT',
            nextWeek : '[来週]dddd LT',
            lastDay : '[昨日] LT',
            lastWeek : '[前週]dddd LT',
            sameElse : 'L'
        },
        ordinalParse : /\d{1,2}日/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                default:
                    return number;
            }
        },
        relativeTime : {
            future : '%s後',
            past : '%s前',
            s : '数秒',
            m : '1分',
            mm : '%d分',
            h : '1時間',
            hh : '%d時間',
            d : '1日',
            dd : '%d日',
            M : '1ヶ月',
            MM : '%dヶ月',
            y : '1年',
            yy : '%d年'
        }
    });


    var jv = moment__default.defineLocale('jv', {
        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
        weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
        weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /enjing|siyang|sonten|ndalu/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'enjing') {
                return hour;
            } else if (meridiem === 'siyang') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'enjing';
            } else if (hours < 15) {
                return 'siyang';
            } else if (hours < 19) {
                return 'sonten';
            } else {
                return 'ndalu';
            }
        },
        calendar : {
            sameDay : '[Dinten puniko pukul] LT',
            nextDay : '[Mbenjang pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kala wingi pukul] LT',
            lastWeek : 'dddd [kepengker pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'wonten ing %s',
            past : '%s ingkang kepengker',
            s : 'sawetawis detik',
            m : 'setunggal menit',
            mm : '%d menit',
            h : 'setunggal jam',
            hh : '%d jam',
            d : 'sedinten',
            dd : '%d dinten',
            M : 'sewulan',
            MM : '%d wulan',
            y : 'setaun',
            yy : '%d taun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var ka = moment__default.defineLocale('ka', {
        months : {
            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
        },
        monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
        weekdays : {
            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
            isFormat: /(წინა|შემდეგ)/
        },
        weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
        weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[დღეს] LT[-ზე]',
            nextDay : '[ხვალ] LT[-ზე]',
            lastDay : '[გუშინ] LT[-ზე]',
            nextWeek : '[შემდეგ] dddd LT[-ზე]',
            lastWeek : '[წინა] dddd LT-ზე',
            sameElse : 'L'
        },
        relativeTime : {
            future : function (s) {
                return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
                    s.replace(/ი$/, 'ში') :
                s + 'ში';
            },
            past : function (s) {
                if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
                    return s.replace(/(ი|ე)$/, 'ის წინ');
                }
                if ((/წელი/).test(s)) {
                    return s.replace(/წელი$/, 'წლის წინ');
                }
            },
            s : 'რამდენიმე წამი',
            m : 'წუთი',
            mm : '%d წუთი',
            h : 'საათი',
            hh : '%d საათი',
            d : 'დღე',
            dd : '%d დღე',
            M : 'თვე',
            MM : '%d თვე',
            y : 'წელი',
            yy : '%d წელი'
        },
        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
        ordinal : function (number) {
            if (number === 0) {
                return number;
            }
            if (number === 1) {
                return number + '-ლი';
            }
            if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
                return 'მე-' + number;
            }
            return number + '-ე';
        },
        week : {
            dow : 1,
            doy : 7
        }
    });


    var kk__suffixes = {
        0: '-ші',
        1: '-ші',
        2: '-ші',
        3: '-ші',
        4: '-ші',
        5: '-ші',
        6: '-шы',
        7: '-ші',
        8: '-ші',
        9: '-шы',
        10: '-шы',
        20: '-шы',
        30: '-шы',
        40: '-шы',
        50: '-ші',
        60: '-шы',
        70: '-ші',
        80: '-ші',
        90: '-шы',
        100: '-ші'
    };

    var kk = moment__default.defineLocale('kk', {
        months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
        monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
        weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
        weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
        weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Бүгін сағат] LT',
            nextDay : '[Ертең сағат] LT',
            nextWeek : 'dddd [сағат] LT',
            lastDay : '[Кеше сағат] LT',
            lastWeek : '[Өткен аптаның] dddd [сағат] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ішінде',
            past : '%s бұрын',
            s : 'бірнеше секунд',
            m : 'бір минут',
            mm : '%d минут',
            h : 'бір сағат',
            hh : '%d сағат',
            d : 'бір күн',
            dd : '%d күн',
            M : 'бір ай',
            MM : '%d ай',
            y : 'бір жыл',
            yy : '%d жыл'
        },
        ordinalParse: /\d{1,2}-(ші|шы)/,
        ordinal : function (number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (kk__suffixes[number] || kk__suffixes[a] || kk__suffixes[b]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var km = moment__default.defineLocale('km', {
        months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
        monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS : 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
            nextDay: '[ស្អែក ម៉ោង] LT',
            nextWeek: 'dddd [ម៉ោង] LT',
            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sទៀត',
            past: '%sមុន',
            s: 'ប៉ុន្មានវិនាទី',
            m: 'មួយនាទី',
            mm: '%d នាទី',
            h: 'មួយម៉ោង',
            hh: '%d ម៉ោង',
            d: 'មួយថ្ងៃ',
            dd: '%d ថ្ងៃ',
            M: 'មួយខែ',
            MM: '%d ខែ',
            y: 'មួយឆ្នាំ',
            yy: '%d ឆ្នាំ'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });


    var ko = moment__default.defineLocale('ko', {
        months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
        weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
        longDateFormat : {
            LT : 'A h시 m분',
            LTS : 'A h시 m분 s초',
            L : 'YYYY.MM.DD',
            LL : 'YYYY년 MMMM D일',
            LLL : 'YYYY년 MMMM D일 A h시 m분',
            LLLL : 'YYYY년 MMMM D일 dddd A h시 m분'
        },
        calendar : {
            sameDay : '오늘 LT',
            nextDay : '내일 LT',
            nextWeek : 'dddd LT',
            lastDay : '어제 LT',
            lastWeek : '지난주 dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 후',
            past : '%s 전',
            s : '몇 초',
            ss : '%d초',
            m : '일분',
            mm : '%d분',
            h : '한 시간',
            hh : '%d시간',
            d : '하루',
            dd : '%d일',
            M : '한 달',
            MM : '%d달',
            y : '일 년',
            yy : '%d년'
        },
        ordinalParse : /\d{1,2}일/,
        ordinal : '%d일',
        meridiemParse : /오전|오후/,
        isPM : function (token) {
            return token === '오후';
        },
        meridiem : function (hour, minute, isUpper) {
            return hour < 12 ? '오전' : '오후';
        }
    });



    var ky__suffixes = {
        0: '-чү',
        1: '-чи',
        2: '-чи',
        3: '-чү',
        4: '-чү',
        5: '-чи',
        6: '-чы',
        7: '-чи',
        8: '-чи',
        9: '-чу',
        10: '-чу',
        20: '-чы',
        30: '-чу',
        40: '-чы',
        50: '-чү',
        60: '-чы',
        70: '-чи',
        80: '-чи',
        90: '-чу',
        100: '-чү'
    };

    var ky = moment__default.defineLocale('ky', {
        months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
        monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
        weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
        weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
        weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Бүгүн саат] LT',
            nextDay : '[Эртең саат] LT',
            nextWeek : 'dddd [саат] LT',
            lastDay : '[Кече саат] LT',
            lastWeek : '[Өткен аптанын] dddd [күнү] [саат] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ичинде',
            past : '%s мурун',
            s : 'бирнече секунд',
            m : 'бир мүнөт',
            mm : '%d мүнөт',
            h : 'бир саат',
            hh : '%d саат',
            d : 'бир күн',
            dd : '%d күн',
            M : 'бир ай',
            MM : '%d ай',
            y : 'бир жыл',
            yy : '%d жыл'
        },
        ordinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
        ordinal : function (number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (ky__suffixes[number] || ky__suffixes[a] || ky__suffixes[b]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    function lb__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eng Minutt', 'enger Minutt'],
            'h': ['eng Stonn', 'enger Stonn'],
            'd': ['een Dag', 'engem Dag'],
            'M': ['ee Mount', 'engem Mount'],
            'y': ['ee Joer', 'engem Joer']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function processFutureTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'a ' + string;
        }
        return 'an ' + string;
    }
    function processPastTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'viru ' + string;
        }
        return 'virun ' + string;
    }
    /**
     * Returns true if the word before the given number loses the '-n' ending.
     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
     *
     * @param number {integer}
     * @returns {boolean}
     */
    function eifelerRegelAppliesToNumber(number) {
        number = parseInt(number, 10);
        if (isNaN(number)) {
            return false;
        }
        if (number < 0) {
            // Negative Number --> always true
            return true;
        } else if (number < 10) {
            // Only 1 digit
            if (4 <= number && number <= 7) {
                return true;
            }
            return false;
        } else if (number < 100) {
            // 2 digits
            var lastDigit = number % 10, firstDigit = number / 10;
            if (lastDigit === 0) {
                return eifelerRegelAppliesToNumber(firstDigit);
            }
            return eifelerRegelAppliesToNumber(lastDigit);
        } else if (number < 10000) {
            // 3 or 4 digits --> recursively check first digit
            while (number >= 10) {
                number = number / 10;
            }
            return eifelerRegelAppliesToNumber(number);
        } else {
            // Anything larger than 4 digits: recursively check first n-3 digits
            number = number / 1000;
            return eifelerRegelAppliesToNumber(number);
        }
    }

    var lb = moment__default.defineLocale('lb', {
        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm [Auer]',
            LTS: 'H:mm:ss [Auer]',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm [Auer]',
            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
        },
        calendar: {
            sameDay: '[Haut um] LT',
            sameElse: 'L',
            nextDay: '[Muer um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gëschter um] LT',
            lastWeek: function () {
                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
                switch (this.day()) {
                    case 2:
                    case 4:
                        return '[Leschten] dddd [um] LT';
                    default:
                        return '[Leschte] dddd [um] LT';
                }
            }
        },
        relativeTime : {
            future : processFutureTime,
            past : processPastTime,
            s : 'e puer Sekonnen',
            m : lb__processRelativeTime,
            mm : '%d Minutten',
            h : lb__processRelativeTime,
            hh : '%d Stonnen',
            d : lb__processRelativeTime,
            dd : '%d Deeg',
            M : lb__processRelativeTime,
            MM : '%d Méint',
            y : lb__processRelativeTime,
            yy : '%d Joer'
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var lo = moment__default.defineLocale('lo', {
        months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
        monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
        weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
        weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
        weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
        isPM: function (input) {
            return input === 'ຕອນແລງ';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ຕອນເຊົ້າ';
            } else {
                return 'ຕອນແລງ';
            }
        },
        calendar : {
            sameDay : '[ມື້ນີ້ເວລາ] LT',
            nextDay : '[ມື້ອື່ນເວລາ] LT',
            nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
            lastDay : '[ມື້ວານນີ້ເວລາ] LT',
            lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ອີກ %s',
            past : '%sຜ່ານມາ',
            s : 'ບໍ່ເທົ່າໃດວິນາທີ',
            m : '1 ນາທີ',
            mm : '%d ນາທີ',
            h : '1 ຊົ່ວໂມງ',
            hh : '%d ຊົ່ວໂມງ',
            d : '1 ມື້',
            dd : '%d ມື້',
            M : '1 ເດືອນ',
            MM : '%d ເດືອນ',
            y : '1 ປີ',
            yy : '%d ປີ'
        },
        ordinalParse: /(ທີ່)\d{1,2}/,
        ordinal : function (number) {
            return 'ທີ່' + number;
        }
    });


    var lt__units = {
        'm' : 'minutė_minutės_minutę',
        'mm': 'minutės_minučių_minutes',
        'h' : 'valanda_valandos_valandą',
        'hh': 'valandos_valandų_valandas',
        'd' : 'diena_dienos_dieną',
        'dd': 'dienos_dienų_dienas',
        'M' : 'mėnuo_mėnesio_mėnesį',
        'MM': 'mėnesiai_mėnesių_mėnesius',
        'y' : 'metai_metų_metus',
        'yy': 'metai_metų_metus'
    };
    function translateSeconds(number, withoutSuffix, key, isFuture) {
        if (withoutSuffix) {
            return 'kelios sekundės';
        } else {
            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
        }
    }
    function translateSingular(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
    }
    function special(number) {
        return number % 10 === 0 || (number > 10 && number < 20);
    }
    function forms(key) {
        return lt__units[key].split('_');
    }
    function lt__translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        if (number === 1) {
            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
        } else if (withoutSuffix) {
            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
        } else {
            if (isFuture) {
                return result + forms(key)[1];
            } else {
                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
            }
        }
    }
    var lt = moment__default.defineLocale('lt', {
        months : {
            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
            isFormat: /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?|MMMM?(\[[^\[\]]*\]|\s+)+D[oD]?/
        },
        monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
        weekdays : {
            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
            isFormat: /dddd HH:mm/
        },
        weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
        weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'YYYY [m.] MMMM D [d.]',
            LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
            l : 'YYYY-MM-DD',
            ll : 'YYYY [m.] MMMM D [d.]',
            lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
        },
        calendar : {
            sameDay : '[Šiandien] LT',
            nextDay : '[Rytoj] LT',
            nextWeek : 'dddd LT',
            lastDay : '[Vakar] LT',
            lastWeek : '[Praėjusį] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'po %s',
            past : 'prieš %s',
            s : translateSeconds,
            m : translateSingular,
            mm : lt__translate,
            h : translateSingular,
            hh : lt__translate,
            d : translateSingular,
            dd : lt__translate,
            M : translateSingular,
            MM : lt__translate,
            y : translateSingular,
            yy : lt__translate
        },
        ordinalParse: /\d{1,2}-oji/,
        ordinal : function (number) {
            return number + '-oji';
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var lv__units = {
        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
        'h': 'stundas_stundām_stunda_stundas'.split('_'),
        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
        'd': 'dienas_dienām_diena_dienas'.split('_'),
        'dd': 'dienas_dienām_diena_dienas'.split('_'),
        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
        'y': 'gada_gadiem_gads_gadi'.split('_'),
        'yy': 'gada_gadiem_gads_gadi'.split('_')
    };
    /**
     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
     */
    function lv__format(forms, number, withoutSuffix) {
        if (withoutSuffix) {
            // E.g. "21 minūte", "3 minūtes".
            return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
        } else {
            // E.g. "21 minūtes" as in "pēc 21 minūtes".
            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
            return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
        }
    }
    function lv__relativeTimeWithPlural(number, withoutSuffix, key) {
        return number + ' ' + lv__format(lv__units[key], number, withoutSuffix);
    }
    function relativeTimeWithSingular(number, withoutSuffix, key) {
        return lv__format(lv__units[key], number, withoutSuffix);
    }
    function relativeSeconds(number, withoutSuffix) {
        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
    }

    var lv = moment__default.defineLocale('lv', {
        months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
        weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY.',
            LL : 'YYYY. [gada] D. MMMM',
            LLL : 'YYYY. [gada] D. MMMM, HH:mm',
            LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
        },
        calendar : {
            sameDay : '[Šodien pulksten] LT',
            nextDay : '[Rīt pulksten] LT',
            nextWeek : 'dddd [pulksten] LT',
            lastDay : '[Vakar pulksten] LT',
            lastWeek : '[Pagājušā] dddd [pulksten] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'pēc %s',
            past : 'pirms %s',
            s : relativeSeconds,
            m : relativeTimeWithSingular,
            mm : lv__relativeTimeWithPlural,
            h : relativeTimeWithSingular,
            hh : lv__relativeTimeWithPlural,
            d : relativeTimeWithSingular,
            dd : lv__relativeTimeWithPlural,
            M : relativeTimeWithSingular,
            MM : lv__relativeTimeWithPlural,
            y : relativeTimeWithSingular,
            yy : lv__relativeTimeWithPlural
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var me__translator = {
        words: { //Different grammatical cases
            m: ['jedan minut', 'jednog minuta'],
            mm: ['minut', 'minuta', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mjesec', 'mjeseca', 'mjeseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = me__translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + me__translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var me = moment__default.defineLocale('me', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact : true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sjutra u] LT',

            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[juče u] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[prošle] [nedjelje] [u] LT',
                    '[prošlog] [ponedjeljka] [u] LT',
                    '[prošlog] [utorka] [u] LT',
                    '[prošle] [srijede] [u] LT',
                    '[prošlog] [četvrtka] [u] LT',
                    '[prošlog] [petka] [u] LT',
                    '[prošle] [subote] [u] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'nekoliko sekundi',
            m      : me__translator.translate,
            mm     : me__translator.translate,
            h      : me__translator.translate,
            hh     : me__translator.translate,
            d      : 'dan',
            dd     : me__translator.translate,
            M      : 'mjesec',
            MM     : me__translator.translate,
            y      : 'godinu',
            yy     : me__translator.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var mi = moment__default.defineLocale('mi', {
        months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
        monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
        monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
        weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
        weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
        weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [i] HH:mm',
            LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
        },
        calendar: {
            sameDay: '[i teie mahana, i] LT',
            nextDay: '[apopo i] LT',
            nextWeek: 'dddd [i] LT',
            lastDay: '[inanahi i] LT',
            lastWeek: 'dddd [whakamutunga i] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'i roto i %s',
            past: '%s i mua',
            s: 'te hēkona ruarua',
            m: 'he meneti',
            mm: '%d meneti',
            h: 'te haora',
            hh: '%d haora',
            d: 'he ra',
            dd: '%d ra',
            M: 'he marama',
            MM: '%d marama',
            y: 'he tau',
            yy: '%d tau'
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var mk = moment__default.defineLocale('mk', {
        months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
        monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
        weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
        weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
        weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'D.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay : '[Денес во] LT',
            nextDay : '[Утре во] LT',
            nextWeek : '[Во] dddd [во] LT',
            lastDay : '[Вчера во] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[Изминатата] dddd [во] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[Изминатиот] dddd [во] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'после %s',
            past : 'пред %s',
            s : 'неколку секунди',
            m : 'минута',
            mm : '%d минути',
            h : 'час',
            hh : '%d часа',
            d : 'ден',
            dd : '%d дена',
            M : 'месец',
            MM : '%d месеци',
            y : 'година',
            yy : '%d години'
        },
        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal : function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var ml = moment__default.defineLocale('ml', {
        months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
        monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
        monthsParseExact : true,
        weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
        weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
        weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
        longDateFormat : {
            LT : 'A h:mm -നു',
            LTS : 'A h:mm:ss -നു',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm -നു',
            LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
        },
        calendar : {
            sameDay : '[ഇന്ന്] LT',
            nextDay : '[നാളെ] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[ഇന്നലെ] LT',
            lastWeek : '[കഴിഞ്ഞ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s കഴിഞ്ഞ്',
            past : '%s മുൻപ്',
            s : 'അൽപ നിമിഷങ്ങൾ',
            m : 'ഒരു മിനിറ്റ്',
            mm : '%d മിനിറ്റ്',
            h : 'ഒരു മണിക്കൂർ',
            hh : '%d മണിക്കൂർ',
            d : 'ഒരു ദിവസം',
            dd : '%d ദിവസം',
            M : 'ഒരു മാസം',
            MM : '%d മാസം',
            y : 'ഒരു വർഷം',
            yy : '%d വർഷം'
        },
        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === 'രാത്രി' && hour >= 4) ||
                meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
                meridiem === 'വൈകുന്നേരം') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'രാത്രി';
            } else if (hour < 12) {
                return 'രാവിലെ';
            } else if (hour < 17) {
                return 'ഉച്ച കഴിഞ്ഞ്';
            } else if (hour < 20) {
                return 'വൈകുന്നേരം';
            } else {
                return 'രാത്രി';
            }
        }
    });


    var mr__symbolMap = {
            '1': '१',
            '2': '२',
            '3': '३',
            '4': '४',
            '5': '५',
            '6': '६',
            '7': '७',
            '8': '८',
            '9': '९',
            '0': '०'
        },
        mr__numberMap = {
            '१': '1',
            '२': '2',
            '३': '3',
            '४': '4',
            '५': '5',
            '६': '6',
            '७': '7',
            '८': '8',
            '९': '9',
            '०': '0'
        };

    function relativeTimeMr(number, withoutSuffix, string, isFuture)
    {
        var output = '';
        if (withoutSuffix) {
            switch (string) {
                case 's': output = 'काही सेकंद'; break;
                case 'm': output = 'एक मिनिट'; break;
                case 'mm': output = '%d मिनिटे'; break;
                case 'h': output = 'एक तास'; break;
                case 'hh': output = '%d तास'; break;
                case 'd': output = 'एक दिवस'; break;
                case 'dd': output = '%d दिवस'; break;
                case 'M': output = 'एक महिना'; break;
                case 'MM': output = '%d महिने'; break;
                case 'y': output = 'एक वर्ष'; break;
                case 'yy': output = '%d वर्षे'; break;
            }
        }
        else {
            switch (string) {
                case 's': output = 'काही सेकंदां'; break;
                case 'm': output = 'एका मिनिटा'; break;
                case 'mm': output = '%d मिनिटां'; break;
                case 'h': output = 'एका तासा'; break;
                case 'hh': output = '%d तासां'; break;
                case 'd': output = 'एका दिवसा'; break;
                case 'dd': output = '%d दिवसां'; break;
                case 'M': output = 'एका महिन्या'; break;
                case 'MM': output = '%d महिन्यां'; break;
                case 'y': output = 'एका वर्षा'; break;
                case 'yy': output = '%d वर्षां'; break;
            }
        }
        return output.replace(/%d/i, number);
    }

    var mr = moment__default.defineLocale('mr', {
        months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
        monthsParseExact : true,
        weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
        weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
        longDateFormat : {
            LT : 'A h:mm वाजता',
            LTS : 'A h:mm:ss वाजता',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm वाजता',
            LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[उद्या] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[काल] LT',
            lastWeek: '[मागील] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future: '%sमध्ये',
            past: '%sपूर्वी',
            s: relativeTimeMr,
            m: relativeTimeMr,
            mm: relativeTimeMr,
            h: relativeTimeMr,
            hh: relativeTimeMr,
            d: relativeTimeMr,
            dd: relativeTimeMr,
            M: relativeTimeMr,
            MM: relativeTimeMr,
            y: relativeTimeMr,
            yy: relativeTimeMr
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return mr__numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return mr__symbolMap[match];
            });
        },
        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'रात्री') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'सकाळी') {
                return hour;
            } else if (meridiem === 'दुपारी') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'सायंकाळी') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'रात्री';
            } else if (hour < 10) {
                return 'सकाळी';
            } else if (hour < 17) {
                return 'दुपारी';
            } else if (hour < 20) {
                return 'सायंकाळी';
            } else {
                return 'रात्री';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var ms_my = moment__default.defineLocale('ms-my', {
        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Esok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kelmarin pukul] LT',
            lastWeek : 'dddd [lepas pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lepas',
            s : 'beberapa saat',
            m : 'seminit',
            mm : '%d minit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var locale_ms = moment__default.defineLocale('ms', {
        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Esok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kelmarin pukul] LT',
            lastWeek : 'dddd [lepas pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lepas',
            s : 'beberapa saat',
            m : 'seminit',
            mm : '%d minit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var my__symbolMap = {
        '1': '၁',
        '2': '၂',
        '3': '၃',
        '4': '၄',
        '5': '၅',
        '6': '၆',
        '7': '၇',
        '8': '၈',
        '9': '၉',
        '0': '၀'
    }, my__numberMap = {
        '၁': '1',
        '၂': '2',
        '၃': '3',
        '၄': '4',
        '၅': '5',
        '၆': '6',
        '၇': '7',
        '၈': '8',
        '၉': '9',
        '၀': '0'
    };

    var my = moment__default.defineLocale('my', {
        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ယနေ.] LT [မှာ]',
            nextDay: '[မနက်ဖြန်] LT [မှာ]',
            nextWeek: 'dddd LT [မှာ]',
            lastDay: '[မနေ.က] LT [မှာ]',
            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'လာမည့် %s မှာ',
            past: 'လွန်ခဲ့သော %s က',
            s: 'စက္ကန်.အနည်းငယ်',
            m: 'တစ်မိနစ်',
            mm: '%d မိနစ်',
            h: 'တစ်နာရီ',
            hh: '%d နာရီ',
            d: 'တစ်ရက်',
            dd: '%d ရက်',
            M: 'တစ်လ',
            MM: '%d လ',
            y: 'တစ်နှစ်',
            yy: '%d နှစ်'
        },
        preparse: function (string) {
            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
                return my__numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return my__symbolMap[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 1st is the first week of the year.
        }
    });


    var nb = moment__default.defineLocale('nb', {
        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
        monthsParseExact : true,
        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
        weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] HH:mm',
            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar : {
            sameDay: '[i dag kl.] LT',
            nextDay: '[i morgen kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[i går kl.] LT',
            lastWeek: '[forrige] dddd [kl.] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s siden',
            s : 'noen sekunder',
            m : 'ett minutt',
            mm : '%d minutter',
            h : 'en time',
            hh : '%d timer',
            d : 'en dag',
            dd : '%d dager',
            M : 'en måned',
            MM : '%d måneder',
            y : 'ett år',
            yy : '%d år'
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var ne__symbolMap = {
            '1': '१',
            '2': '२',
            '3': '३',
            '4': '४',
            '5': '५',
            '6': '६',
            '7': '७',
            '8': '८',
            '9': '९',
            '0': '०'
        },
        ne__numberMap = {
            '१': '1',
            '२': '2',
            '३': '3',
            '४': '4',
            '५': '5',
            '६': '6',
            '७': '7',
            '८': '8',
            '९': '9',
            '०': '0'
        };

    var ne = moment__default.defineLocale('ne', {
        months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
        monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
        monthsParseExact : true,
        weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
        weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
        weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'Aको h:mm बजे',
            LTS : 'Aको h:mm:ss बजे',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, Aको h:mm बजे',
            LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return ne__numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return ne__symbolMap[match];
            });
        },
        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'राति') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'बिहान') {
                return hour;
            } else if (meridiem === 'दिउँसो') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'साँझ') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 3) {
                return 'राति';
            } else if (hour < 12) {
                return 'बिहान';
            } else if (hour < 16) {
                return 'दिउँसो';
            } else if (hour < 20) {
                return 'साँझ';
            } else {
                return 'राति';
            }
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[भोलि] LT',
            nextWeek : '[आउँदो] dddd[,] LT',
            lastDay : '[हिजो] LT',
            lastWeek : '[गएको] dddd[,] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%sमा',
            past : '%s अगाडि',
            s : 'केही क्षण',
            m : 'एक मिनेट',
            mm : '%d मिनेट',
            h : 'एक घण्टा',
            hh : '%d घण्टा',
            d : 'एक दिन',
            dd : '%d दिन',
            M : 'एक महिना',
            MM : '%d महिना',
            y : 'एक बर्ष',
            yy : '%d बर्ष'
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var nl__monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        nl__monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var nl__monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var nl__monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    var nl = moment__default.defineLocale('nl', {
        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return nl__monthsShortWithoutDots[m.month()];
            } else {
                return nl__monthsShortWithDots[m.month()];
            }
        },

        monthsRegex: nl__monthsRegex,
        monthsShortRegex: nl__monthsRegex,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse : nl__monthsParse,
        longMonthsParse : nl__monthsParse,
        shortMonthsParse : nl__monthsParse,

        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'over %s',
            past : '%s geleden',
            s : 'een paar seconden',
            m : 'één minuut',
            mm : '%d minuten',
            h : 'één uur',
            hh : '%d uur',
            d : 'één dag',
            dd : '%d dagen',
            M : 'één maand',
            MM : '%d maanden',
            y : 'één jaar',
            yy : '%d jaar'
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var nn = moment__default.defineLocale('nn', {
        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
        weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
        weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] H:mm',
            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar : {
            sameDay: '[I dag klokka] LT',
            nextDay: '[I morgon klokka] LT',
            nextWeek: 'dddd [klokka] LT',
            lastDay: '[I går klokka] LT',
            lastWeek: '[Føregåande] dddd [klokka] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s sidan',
            s : 'nokre sekund',
            m : 'eit minutt',
            mm : '%d minutt',
            h : 'ein time',
            hh : '%d timar',
            d : 'ein dag',
            dd : '%d dagar',
            M : 'ein månad',
            MM : '%d månader',
            y : 'eit år',
            yy : '%d år'
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var pa_in__symbolMap = {
            '1': '੧',
            '2': '੨',
            '3': '੩',
            '4': '੪',
            '5': '੫',
            '6': '੬',
            '7': '੭',
            '8': '੮',
            '9': '੯',
            '0': '੦'
        },
        pa_in__numberMap = {
            '੧': '1',
            '੨': '2',
            '੩': '3',
            '੪': '4',
            '੫': '5',
            '੬': '6',
            '੭': '7',
            '੮': '8',
            '੯': '9',
            '੦': '0'
        };

    var pa_in = moment__default.defineLocale('pa-in', {
        // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
        months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
        monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
        weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
        weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
        weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
        longDateFormat : {
            LT : 'A h:mm ਵਜੇ',
            LTS : 'A h:mm:ss ਵਜੇ',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
            LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
        },
        calendar : {
            sameDay : '[ਅਜ] LT',
            nextDay : '[ਕਲ] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[ਕਲ] LT',
            lastWeek : '[ਪਿਛਲੇ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ਵਿੱਚ',
            past : '%s ਪਿਛਲੇ',
            s : 'ਕੁਝ ਸਕਿੰਟ',
            m : 'ਇਕ ਮਿੰਟ',
            mm : '%d ਮਿੰਟ',
            h : 'ਇੱਕ ਘੰਟਾ',
            hh : '%d ਘੰਟੇ',
            d : 'ਇੱਕ ਦਿਨ',
            dd : '%d ਦਿਨ',
            M : 'ਇੱਕ ਮਹੀਨਾ',
            MM : '%d ਮਹੀਨੇ',
            y : 'ਇੱਕ ਸਾਲ',
            yy : '%d ਸਾਲ'
        },
        preparse: function (string) {
            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
                return pa_in__numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return pa_in__symbolMap[match];
            });
        },
        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ਰਾਤ') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ਸਵੇਰ') {
                return hour;
            } else if (meridiem === 'ਦੁਪਹਿਰ') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'ਸ਼ਾਮ') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ਰਾਤ';
            } else if (hour < 10) {
                return 'ਸਵੇਰ';
            } else if (hour < 17) {
                return 'ਦੁਪਹਿਰ';
            } else if (hour < 20) {
                return 'ਸ਼ਾਮ';
            } else {
                return 'ਰਾਤ';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
    function pl__plural(n) {
        return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
    }
    function pl__translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'minuta' : 'minutę';
            case 'mm':
                return result + (pl__plural(number) ? 'minuty' : 'minut');
            case 'h':
                return withoutSuffix  ? 'godzina'  : 'godzinę';
            case 'hh':
                return result + (pl__plural(number) ? 'godziny' : 'godzin');
            case 'MM':
                return result + (pl__plural(number) ? 'miesiące' : 'miesięcy');
            case 'yy':
                return result + (pl__plural(number) ? 'lata' : 'lat');
        }
    }

    var pl = moment__default.defineLocale('pl', {
        months : function (momentToFormat, format) {
            if (format === '') {
                // Hack: if format empty we know this is used to generate
                // RegExp by moment. Give then back both valid forms of months
                // in RegExp ready format.
                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
            } else if (/D MMMM/.test(format)) {
                return monthsSubjective[momentToFormat.month()];
            } else {
                return monthsNominative[momentToFormat.month()];
            }
        },
        monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
        weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
        weekdaysShort : 'nie_pon_wt_śr_czw_pt_sb'.split('_'),
        weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Dziś o] LT',
            nextDay: '[Jutro o] LT',
            nextWeek: '[W] dddd [o] LT',
            lastDay: '[Wczoraj o] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[W zeszłą niedzielę o] LT';
                    case 3:
                        return '[W zeszłą środę o] LT';
                    case 6:
                        return '[W zeszłą sobotę o] LT';
                    default:
                        return '[W zeszły] dddd [o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : '%s temu',
            s : 'kilka sekund',
            m : pl__translate,
            mm : pl__translate,
            h : pl__translate,
            hh : pl__translate,
            d : '1 dzień',
            dd : '%d dni',
            M : 'miesiąc',
            MM : pl__translate,
            y : 'rok',
            yy : pl__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var pt_br = moment__default.defineLocale('pt-br', {
        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : '%s atrás',
            s : 'poucos segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um mês',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        ordinalParse: /\d{1,2}º/,
        ordinal : '%dº'
    });


    var pt = moment__default.defineLocale('pt', {
        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays : 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY HH:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : 'há %s',
            s : 'segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um mês',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        ordinalParse: /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    function ro__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
                'mm': 'minute',
                'hh': 'ore',
                'dd': 'zile',
                'MM': 'luni',
                'yy': 'ani'
            },
            separator = ' ';
        if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
            separator = ' de ';
        }
        return number + separator + format[key];
    }

    var ro = moment__default.defineLocale('ro', {
        months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
        monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
        weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
        weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay: '[azi la] LT',
            nextDay: '[mâine la] LT',
            nextWeek: 'dddd [la] LT',
            lastDay: '[ieri la] LT',
            lastWeek: '[fosta] dddd [la] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'peste %s',
            past : '%s în urmă',
            s : 'câteva secunde',
            m : 'un minut',
            mm : ro__relativeTimeWithPlural,
            h : 'o oră',
            hh : ro__relativeTimeWithPlural,
            d : 'o zi',
            dd : ro__relativeTimeWithPlural,
            M : 'o lună',
            MM : ro__relativeTimeWithPlural,
            y : 'un an',
            yy : ro__relativeTimeWithPlural
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    function ru__plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function ru__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
            'hh': 'час_часа_часов',
            'dd': 'день_дня_дней',
            'MM': 'месяц_месяца_месяцев',
            'yy': 'год_года_лет'
        };
        if (key === 'm') {
            return withoutSuffix ? 'минута' : 'минуту';
        }
        else {
            return number + ' ' + ru__plural(format[key], +number);
        }
    }
    var ru__monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

    // http://new.gramota.ru/spravka/rules/139-prop : § 103
    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
    var ru = moment__default.defineLocale('ru', {
        months : {
            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
        },
        monthsShort : {
            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
        },
        weekdays : {
            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
        },
        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        monthsParse : ru__monthsParse,
        longMonthsParse : ru__monthsParse,
        shortMonthsParse : ru__monthsParse,

        // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
        monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // копия предыдущего
        monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // полные названия с падежами
        monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

        // Выражение, которое соотвествует только сокращённым формам
        monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY г.',
            LLL : 'D MMMM YYYY г., HH:mm',
            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar : {
            sameDay: '[Сегодня в] LT',
            nextDay: '[Завтра в] LT',
            lastDay: '[Вчера в] LT',
            nextWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В следующее] dddd [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В следующий] dddd [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В следующую] dddd [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd [в] LT';
                    } else {
                        return '[В] dddd [в] LT';
                    }
                }
            },
            lastWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В прошлое] dddd [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В прошлый] dddd [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В прошлую] dddd [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd [в] LT';
                    } else {
                        return '[В] dddd [в] LT';
                    }
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'через %s',
            past : '%s назад',
            s : 'несколько секунд',
            m : ru__relativeTimeWithPlural,
            mm : ru__relativeTimeWithPlural,
            h : 'час',
            hh : ru__relativeTimeWithPlural,
            d : 'день',
            dd : ru__relativeTimeWithPlural,
            M : 'месяц',
            MM : ru__relativeTimeWithPlural,
            y : 'год',
            yy : ru__relativeTimeWithPlural
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM : function (input) {
            return /^(дня|вечера)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночи';
            } else if (hour < 12) {
                return 'утра';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечера';
            }
        },
        ordinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                case 'w':
                case 'W':
                    return number + '-я';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });



    var se = moment__default.defineLocale('se', {
        months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
        monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
        weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
        weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
        weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'MMMM D. [b.] YYYY',
            LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
            LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
        },
        calendar : {
            sameDay: '[otne ti] LT',
            nextDay: '[ihttin ti] LT',
            nextWeek: 'dddd [ti] LT',
            lastDay: '[ikte ti] LT',
            lastWeek: '[ovddit] dddd [ti] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s geažes',
            past : 'maŋit %s',
            s : 'moadde sekunddat',
            m : 'okta minuhta',
            mm : '%d minuhtat',
            h : 'okta diimmu',
            hh : '%d diimmut',
            d : 'okta beaivi',
            dd : '%d beaivvit',
            M : 'okta mánnu',
            MM : '%d mánut',
            y : 'okta jahki',
            yy : '%d jagit'
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    /*jshint -W100*/
    var si = moment__default.defineLocale('si', {
        months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
        monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
        weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
        weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
        weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'a h:mm',
            LTS : 'a h:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY MMMM D',
            LLL : 'YYYY MMMM D, a h:mm',
            LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
        },
        calendar : {
            sameDay : '[අද] LT[ට]',
            nextDay : '[හෙට] LT[ට]',
            nextWeek : 'dddd LT[ට]',
            lastDay : '[ඊයේ] LT[ට]',
            lastWeek : '[පසුගිය] dddd LT[ට]',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%sකින්',
            past : '%sකට පෙර',
            s : 'තත්පර කිහිපය',
            m : 'මිනිත්තුව',
            mm : 'මිනිත්තු %d',
            h : 'පැය',
            hh : 'පැය %d',
            d : 'දිනය',
            dd : 'දින %d',
            M : 'මාසය',
            MM : 'මාස %d',
            y : 'වසර',
            yy : 'වසර %d'
        },
        ordinalParse: /\d{1,2} වැනි/,
        ordinal : function (number) {
            return number + ' වැනි';
        },
        meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
        isPM : function (input) {
            return input === 'ප.ව.' || input === 'පස් වරු';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'ප.ව.' : 'පස් වරු';
            } else {
                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
            }
        }
    });


    var sk__months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
        sk__monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
    function sk__plural(n) {
        return (n > 1) && (n < 5);
    }
    function sk__translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':  // a few seconds / in a few seconds / a few seconds ago
                return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
            case 'm':  // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
            case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (sk__plural(number) ? 'minúty' : 'minút');
                } else {
                    return result + 'minútami';
                }
                break;
            case 'h':  // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
            case 'hh': // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (sk__plural(number) ? 'hodiny' : 'hodín');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':  // a day / in a day / a day ago
                return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
            case 'dd': // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (sk__plural(number) ? 'dni' : 'dní');
                } else {
                    return result + 'dňami';
                }
                break;
            case 'M':  // a month / in a month / a month ago
                return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
            case 'MM': // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (sk__plural(number) ? 'mesiace' : 'mesiacov');
                } else {
                    return result + 'mesiacmi';
                }
                break;
            case 'y':  // a year / in a year / a year ago
                return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
            case 'yy': // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (sk__plural(number) ? 'roky' : 'rokov');
                } else {
                    return result + 'rokmi';
                }
                break;
        }
    }

    var sk = moment__default.defineLocale('sk', {
        months : sk__months,
        monthsShort : sk__monthsShort,
        weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
        weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
        weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
        longDateFormat : {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay: '[dnes o] LT',
            nextDay: '[zajtra o] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v nedeľu o] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [o] LT';
                    case 3:
                        return '[v stredu o] LT';
                    case 4:
                        return '[vo štvrtok o] LT';
                    case 5:
                        return '[v piatok o] LT';
                    case 6:
                        return '[v sobotu o] LT';
                }
            },
            lastDay: '[včera o] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[minulú nedeľu o] LT';
                    case 1:
                    case 2:
                        return '[minulý] dddd [o] LT';
                    case 3:
                        return '[minulú stredu o] LT';
                    case 4:
                    case 5:
                        return '[minulý] dddd [o] LT';
                    case 6:
                        return '[minulú sobotu o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : 'pred %s',
            s : sk__translate,
            m : sk__translate,
            mm : sk__translate,
            h : sk__translate,
            hh : sk__translate,
            d : sk__translate,
            dd : sk__translate,
            M : sk__translate,
            MM : sk__translate,
            y : sk__translate,
            yy : sk__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    function sl__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
            case 'm':
                return withoutSuffix ? 'ena minuta' : 'eno minuto';
            case 'mm':
                if (number === 1) {
                    result += withoutSuffix ? 'minuta' : 'minuto';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'minute' : 'minutami';
                } else {
                    result += withoutSuffix || isFuture ? 'minut' : 'minutami';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'ena ura' : 'eno uro';
            case 'hh':
                if (number === 1) {
                    result += withoutSuffix ? 'ura' : 'uro';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'uri' : 'urama';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'ure' : 'urami';
                } else {
                    result += withoutSuffix || isFuture ? 'ur' : 'urami';
                }
                return result;
            case 'd':
                return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
            case 'dd':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'dan' : 'dnem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
                } else {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
                }
                return result;
            case 'M':
                return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
            case 'MM':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
                } else {
                    result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
                }
                return result;
            case 'y':
                return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
            case 'yy':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'leto' : 'letom';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'leti' : 'letoma';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'leta' : 'leti';
                } else {
                    result += withoutSuffix || isFuture ? 'let' : 'leti';
                }
                return result;
        }
    }

    var sl = moment__default.defineLocale('sl', {
        months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
        weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
        weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danes ob] LT',
            nextDay  : '[jutri ob] LT',

            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[v] [nedeljo] [ob] LT';
                    case 3:
                        return '[v] [sredo] [ob] LT';
                    case 6:
                        return '[v] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[v] dddd [ob] LT';
                }
            },
            lastDay  : '[včeraj ob] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[prejšnjo] [nedeljo] [ob] LT';
                    case 3:
                        return '[prejšnjo] [sredo] [ob] LT';
                    case 6:
                        return '[prejšnjo] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prejšnji] dddd [ob] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'čez %s',
            past   : 'pred %s',
            s      : sl__processRelativeTime,
            m      : sl__processRelativeTime,
            mm     : sl__processRelativeTime,
            h      : sl__processRelativeTime,
            hh     : sl__processRelativeTime,
            d      : sl__processRelativeTime,
            dd     : sl__processRelativeTime,
            M      : sl__processRelativeTime,
            MM     : sl__processRelativeTime,
            y      : sl__processRelativeTime,
            yy     : sl__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var sq = moment__default.defineLocale('sq', {
        months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
        monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
        weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
        weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
        weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
        weekdaysParseExact : true,
        meridiemParse: /PD|MD/,
        isPM: function (input) {
            return input.charAt(0) === 'M';
        },
        meridiem : function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Sot në] LT',
            nextDay : '[Nesër në] LT',
            nextWeek : 'dddd [në] LT',
            lastDay : '[Dje në] LT',
            lastWeek : 'dddd [e kaluar në] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'në %s',
            past : '%s më parë',
            s : 'disa sekonda',
            m : 'një minutë',
            mm : '%d minuta',
            h : 'një orë',
            hh : '%d orë',
            d : 'një ditë',
            dd : '%d ditë',
            M : 'një muaj',
            MM : '%d muaj',
            y : 'një vit',
            yy : '%d vite'
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var sr_cyrl__translator = {
        words: { //Different grammatical cases
            m: ['један минут', 'једне минуте'],
            mm: ['минут', 'минуте', 'минута'],
            h: ['један сат', 'једног сата'],
            hh: ['сат', 'сата', 'сати'],
            dd: ['дан', 'дана', 'дана'],
            MM: ['месец', 'месеца', 'месеци'],
            yy: ['година', 'године', 'година']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = sr_cyrl__translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + sr_cyrl__translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var sr_cyrl = moment__default.defineLocale('sr-cyrl', {
        months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
        monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
        monthsParseExact: true,
        weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
        weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
        weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[данас у] LT',
            nextDay: '[сутра у] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[у] [недељу] [у] LT';
                    case 3:
                        return '[у] [среду] [у] LT';
                    case 6:
                        return '[у] [суботу] [у] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[у] dddd [у] LT';
                }
            },
            lastDay  : '[јуче у] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[прошле] [недеље] [у] LT',
                    '[прошлог] [понедељка] [у] LT',
                    '[прошлог] [уторка] [у] LT',
                    '[прошле] [среде] [у] LT',
                    '[прошлог] [четвртка] [у] LT',
                    '[прошлог] [петка] [у] LT',
                    '[прошле] [суботе] [у] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'за %s',
            past   : 'пре %s',
            s      : 'неколико секунди',
            m      : sr_cyrl__translator.translate,
            mm     : sr_cyrl__translator.translate,
            h      : sr_cyrl__translator.translate,
            hh     : sr_cyrl__translator.translate,
            d      : 'дан',
            dd     : sr_cyrl__translator.translate,
            M      : 'месец',
            MM     : sr_cyrl__translator.translate,
            y      : 'годину',
            yy     : sr_cyrl__translator.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var sr__translator = {
        words: { //Different grammatical cases
            m: ['jedan minut', 'jedne minute'],
            mm: ['minut', 'minute', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mesec', 'meseca', 'meseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = sr__translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + sr__translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var sr = moment__default.defineLocale('sr', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedelju] [u] LT';
                    case 3:
                        return '[u] [sredu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[juče u] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[prošle] [nedelje] [u] LT',
                    '[prošlog] [ponedeljka] [u] LT',
                    '[prošlog] [utorka] [u] LT',
                    '[prošle] [srede] [u] LT',
                    '[prošlog] [četvrtka] [u] LT',
                    '[prošlog] [petka] [u] LT',
                    '[prošle] [subote] [u] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'pre %s',
            s      : 'nekoliko sekundi',
            m      : sr__translator.translate,
            mm     : sr__translator.translate,
            h      : sr__translator.translate,
            hh     : sr__translator.translate,
            d      : 'dan',
            dd     : sr__translator.translate,
            M      : 'mesec',
            MM     : sr__translator.translate,
            y      : 'godinu',
            yy     : sr__translator.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });



    var ss = moment__default.defineLocale('ss', {
        months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
        monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
        weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
        weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
        weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Namuhla nga] LT',
            nextDay : '[Kusasa nga] LT',
            nextWeek : 'dddd [nga] LT',
            lastDay : '[Itolo nga] LT',
            lastWeek : 'dddd [leliphelile] [nga] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'nga %s',
            past : 'wenteka nga %s',
            s : 'emizuzwana lomcane',
            m : 'umzuzu',
            mm : '%d emizuzu',
            h : 'lihora',
            hh : '%d emahora',
            d : 'lilanga',
            dd : '%d emalanga',
            M : 'inyanga',
            MM : '%d tinyanga',
            y : 'umnyaka',
            yy : '%d iminyaka'
        },
        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'ekuseni';
            } else if (hours < 15) {
                return 'emini';
            } else if (hours < 19) {
                return 'entsambama';
            } else {
                return 'ebusuku';
            }
        },
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ekuseni') {
                return hour;
            } else if (meridiem === 'emini') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
                if (hour === 0) {
                    return 0;
                }
                return hour + 12;
            }
        },
        ordinalParse: /\d{1,2}/,
        ordinal : '%d',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var sv = moment__default.defineLocale('sv', {
        months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
        weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
        weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [kl.] HH:mm',
            LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Idag] LT',
            nextDay: '[Imorgon] LT',
            lastDay: '[Igår] LT',
            nextWeek: '[På] dddd LT',
            lastWeek: '[I] dddd[s] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : 'för %s sedan',
            s : 'några sekunder',
            m : 'en minut',
            mm : '%d minuter',
            h : 'en timme',
            hh : '%d timmar',
            d : 'en dag',
            dd : '%d dagar',
            M : 'en månad',
            MM : '%d månader',
            y : 'ett år',
            yy : '%d år'
        },
        ordinalParse: /\d{1,2}(e|a)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'e' :
                    (b === 1) ? 'a' :
                        (b === 2) ? 'a' :
                            (b === 3) ? 'e' : 'e';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var sw = moment__default.defineLocale('sw', {
        months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
        weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
        weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[leo saa] LT',
            nextDay : '[kesho saa] LT',
            nextWeek : '[wiki ijayo] dddd [saat] LT',
            lastDay : '[jana] LT',
            lastWeek : '[wiki iliyopita] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s baadaye',
            past : 'tokea %s',
            s : 'hivi punde',
            m : 'dakika moja',
            mm : 'dakika %d',
            h : 'saa limoja',
            hh : 'masaa %d',
            d : 'siku moja',
            dd : 'masiku %d',
            M : 'mwezi mmoja',
            MM : 'miezi %d',
            y : 'mwaka mmoja',
            yy : 'miaka %d'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var ta__symbolMap = {
        '1': '௧',
        '2': '௨',
        '3': '௩',
        '4': '௪',
        '5': '௫',
        '6': '௬',
        '7': '௭',
        '8': '௮',
        '9': '௯',
        '0': '௦'
    }, ta__numberMap = {
        '௧': '1',
        '௨': '2',
        '௩': '3',
        '௪': '4',
        '௫': '5',
        '௬': '6',
        '௭': '7',
        '௮': '8',
        '௯': '9',
        '௦': '0'
    };

    var ta = moment__default.defineLocale('ta', {
        months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
        monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
        weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
        weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
        weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, HH:mm',
            LLLL : 'dddd, D MMMM YYYY, HH:mm'
        },
        calendar : {
            sameDay : '[இன்று] LT',
            nextDay : '[நாளை] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[நேற்று] LT',
            lastWeek : '[கடந்த வாரம்] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s இல்',
            past : '%s முன்',
            s : 'ஒரு சில விநாடிகள்',
            m : 'ஒரு நிமிடம்',
            mm : '%d நிமிடங்கள்',
            h : 'ஒரு மணி நேரம்',
            hh : '%d மணி நேரம்',
            d : 'ஒரு நாள்',
            dd : '%d நாட்கள்',
            M : 'ஒரு மாதம்',
            MM : '%d மாதங்கள்',
            y : 'ஒரு வருடம்',
            yy : '%d ஆண்டுகள்'
        },
        ordinalParse: /\d{1,2}வது/,
        ordinal : function (number) {
            return number + 'வது';
        },
        preparse: function (string) {
            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
                return ta__numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return ta__symbolMap[match];
            });
        },
        // refer http://ta.wikipedia.org/s/1er1
        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
        meridiem : function (hour, minute, isLower) {
            if (hour < 2) {
                return ' யாமம்';
            } else if (hour < 6) {
                return ' வைகறை';  // வைகறை
            } else if (hour < 10) {
                return ' காலை'; // காலை
            } else if (hour < 14) {
                return ' நண்பகல்'; // நண்பகல்
            } else if (hour < 18) {
                return ' எற்பாடு'; // எற்பாடு
            } else if (hour < 22) {
                return ' மாலை'; // மாலை
            } else {
                return ' யாமம்';
            }
        },
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'யாமம்') {
                return hour < 2 ? hour : hour + 12;
            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
                return hour;
            } else if (meridiem === 'நண்பகல்') {
                return hour >= 10 ? hour : hour + 12;
            } else {
                return hour + 12;
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var te = moment__default.defineLocale('te', {
        months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
        monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
        monthsParseExact : true,
        weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
        weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
        weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm',
            LLLL : 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar : {
            sameDay : '[నేడు] LT',
            nextDay : '[రేపు] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[నిన్న] LT',
            lastWeek : '[గత] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s లో',
            past : '%s క్రితం',
            s : 'కొన్ని క్షణాలు',
            m : 'ఒక నిమిషం',
            mm : '%d నిమిషాలు',
            h : 'ఒక గంట',
            hh : '%d గంటలు',
            d : 'ఒక రోజు',
            dd : '%d రోజులు',
            M : 'ఒక నెల',
            MM : '%d నెలలు',
            y : 'ఒక సంవత్సరం',
            yy : '%d సంవత్సరాలు'
        },
        ordinalParse : /\d{1,2}వ/,
        ordinal : '%dవ',
        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'రాత్రి') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ఉదయం') {
                return hour;
            } else if (meridiem === 'మధ్యాహ్నం') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'సాయంత్రం') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'రాత్రి';
            } else if (hour < 10) {
                return 'ఉదయం';
            } else if (hour < 17) {
                return 'మధ్యాహ్నం';
            } else if (hour < 20) {
                return 'సాయంత్రం';
            } else {
                return 'రాత్రి';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var th = moment__default.defineLocale('th', {
        months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
        monthsShort : 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
        monthsParseExact: true,
        weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
        weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
        weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY เวลา H:mm',
            LLLL : 'วันddddที่ D MMMM YYYY เวลา H:mm'
        },
        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
        isPM: function (input) {
            return input === 'หลังเที่ยง';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ก่อนเที่ยง';
            } else {
                return 'หลังเที่ยง';
            }
        },
        calendar : {
            sameDay : '[วันนี้ เวลา] LT',
            nextDay : '[พรุ่งนี้ เวลา] LT',
            nextWeek : 'dddd[หน้า เวลา] LT',
            lastDay : '[เมื่อวานนี้ เวลา] LT',
            lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'อีก %s',
            past : '%sที่แล้ว',
            s : 'ไม่กี่วินาที',
            m : '1 นาที',
            mm : '%d นาที',
            h : '1 ชั่วโมง',
            hh : '%d ชั่วโมง',
            d : '1 วัน',
            dd : '%d วัน',
            M : '1 เดือน',
            MM : '%d เดือน',
            y : '1 ปี',
            yy : '%d ปี'
        }
    });


    var tl_ph = moment__default.defineLocale('tl-ph', {
        months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
        monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
        weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
        weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
        weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'MM/D/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY HH:mm',
            LLLL : 'dddd, MMMM DD, YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Ngayon sa] LT',
            nextDay: '[Bukas sa] LT',
            nextWeek: 'dddd [sa] LT',
            lastDay: '[Kahapon sa] LT',
            lastWeek: 'dddd [huling linggo] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'sa loob ng %s',
            past : '%s ang nakalipas',
            s : 'ilang segundo',
            m : 'isang minuto',
            mm : '%d minuto',
            h : 'isang oras',
            hh : '%d oras',
            d : 'isang araw',
            dd : '%d araw',
            M : 'isang buwan',
            MM : '%d buwan',
            y : 'isang taon',
            yy : '%d taon'
        },
        ordinalParse: /\d{1,2}/,
        ordinal : function (number) {
            return number;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

    function translateFuture(output) {
        var time = output;
        time = (output.indexOf('jaj') !== -1) ?
        time.slice(0, -3) + 'leS' :
            (output.indexOf('jar') !== -1) ?
            time.slice(0, -3) + 'waQ' :
                (output.indexOf('DIS') !== -1) ?
                time.slice(0, -3) + 'nem' :
                time + ' pIq';
        return time;
    }

    function translatePast(output) {
        var time = output;
        time = (output.indexOf('jaj') !== -1) ?
        time.slice(0, -3) + 'Hu’' :
            (output.indexOf('jar') !== -1) ?
            time.slice(0, -3) + 'wen' :
                (output.indexOf('DIS') !== -1) ?
                time.slice(0, -3) + 'ben' :
                time + ' ret';
        return time;
    }

    function tlh__translate(number, withoutSuffix, string, isFuture) {
        var numberNoun = numberAsNoun(number);
        switch (string) {
            case 'mm':
                return numberNoun + ' tup';
            case 'hh':
                return numberNoun + ' rep';
            case 'dd':
                return numberNoun + ' jaj';
            case 'MM':
                return numberNoun + ' jar';
            case 'yy':
                return numberNoun + ' DIS';
        }
    }

    function numberAsNoun(number) {
        var hundred = Math.floor((number % 1000) / 100),
            ten = Math.floor((number % 100) / 10),
            one = number % 10,
            word = '';
        if (hundred > 0) {
            word += numbersNouns[hundred] + 'vatlh';
        }
        if (ten > 0) {
            word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
        }
        if (one > 0) {
            word += ((word !== '') ? ' ' : '') + numbersNouns[one];
        }
        return (word === '') ? 'pagh' : word;
    }

    var tlh = moment__default.defineLocale('tlh', {
        months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
        monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
        monthsParseExact : true,
        weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[DaHjaj] LT',
            nextDay: '[wa’leS] LT',
            nextWeek: 'LLL',
            lastDay: '[wa’Hu’] LT',
            lastWeek: 'LLL',
            sameElse: 'L'
        },
        relativeTime : {
            future : translateFuture,
            past : translatePast,
            s : 'puS lup',
            m : 'wa’ tup',
            mm : tlh__translate,
            h : 'wa’ rep',
            hh : tlh__translate,
            d : 'wa’ jaj',
            dd : tlh__translate,
            M : 'wa’ jar',
            MM : tlh__translate,
            y : 'wa’ DIS',
            yy : tlh__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var tr__suffixes = {
        1: '\'inci',
        5: '\'inci',
        8: '\'inci',
        70: '\'inci',
        80: '\'inci',
        2: '\'nci',
        7: '\'nci',
        20: '\'nci',
        50: '\'nci',
        3: '\'üncü',
        4: '\'üncü',
        100: '\'üncü',
        6: '\'ncı',
        9: '\'uncu',
        10: '\'uncu',
        30: '\'uncu',
        60: '\'ıncı',
        90: '\'ıncı'
    };

    var tr = moment__default.defineLocale('tr', {
        months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
        monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
        weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
        weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
        weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[bugün saat] LT',
            nextDay : '[yarın saat] LT',
            nextWeek : '[haftaya] dddd [saat] LT',
            lastDay : '[dün] LT',
            lastWeek : '[geçen hafta] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s sonra',
            past : '%s önce',
            s : 'birkaç saniye',
            m : 'bir dakika',
            mm : '%d dakika',
            h : 'bir saat',
            hh : '%d saat',
            d : 'bir gün',
            dd : '%d gün',
            M : 'bir ay',
            MM : '%d ay',
            y : 'bir yıl',
            yy : '%d yıl'
        },
        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
        ordinal : function (number) {
            if (number === 0) {  // special case for zero
                return number + '\'ıncı';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;
            return number + (tr__suffixes[a] || tr__suffixes[b] || tr__suffixes[c]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
    // This is currently too difficult (maybe even impossible) to add.
    var tzl = moment__default.defineLocale('tzl', {
        months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
        weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
        weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
        weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM [dallas] YYYY',
            LLL : 'D. MMMM [dallas] YYYY HH.mm',
            LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
        },
        meridiemParse: /d\'o|d\'a/i,
        isPM : function (input) {
            return 'd\'o' === input.toLowerCase();
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'd\'o' : 'D\'O';
            } else {
                return isLower ? 'd\'a' : 'D\'A';
            }
        },
        calendar : {
            sameDay : '[oxhi à] LT',
            nextDay : '[demà à] LT',
            nextWeek : 'dddd [à] LT',
            lastDay : '[ieiri à] LT',
            lastWeek : '[sür el] dddd [lasteu à] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'osprei %s',
            past : 'ja%s',
            s : tzl__processRelativeTime,
            m : tzl__processRelativeTime,
            mm : tzl__processRelativeTime,
            h : tzl__processRelativeTime,
            hh : tzl__processRelativeTime,
            d : tzl__processRelativeTime,
            dd : tzl__processRelativeTime,
            M : tzl__processRelativeTime,
            MM : tzl__processRelativeTime,
            y : tzl__processRelativeTime,
            yy : tzl__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    function tzl__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['viensas secunds', '\'iensas secunds'],
            'm': ['\'n míut', '\'iens míut'],
            'mm': [number + ' míuts', '' + number + ' míuts'],
            'h': ['\'n þora', '\'iensa þora'],
            'hh': [number + ' þoras', '' + number + ' þoras'],
            'd': ['\'n ziua', '\'iensa ziua'],
            'dd': [number + ' ziuas', '' + number + ' ziuas'],
            'M': ['\'n mes', '\'iens mes'],
            'MM': [number + ' mesen', '' + number + ' mesen'],
            'y': ['\'n ar', '\'iens ar'],
            'yy': [number + ' ars', '' + number + ' ars']
        };
        return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
    }


    var tzm_latn = moment__default.defineLocale('tzm-latn', {
        months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
        monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
        weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[asdkh g] LT',
            nextDay: '[aska g] LT',
            nextWeek: 'dddd [g] LT',
            lastDay: '[assant g] LT',
            lastWeek: 'dddd [g] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dadkh s yan %s',
            past : 'yan %s',
            s : 'imik',
            m : 'minuḍ',
            mm : '%d minuḍ',
            h : 'saɛa',
            hh : '%d tassaɛin',
            d : 'ass',
            dd : '%d ossan',
            M : 'ayowr',
            MM : '%d iyyirn',
            y : 'asgas',
            yy : '%d isgasn'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var tzm = moment__default.defineLocale('tzm', {
        months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
        monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
        weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
            nextWeek: 'dddd [ⴴ] LT',
            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
            lastWeek: 'dddd [ⴴ] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
            past : 'ⵢⴰⵏ %s',
            s : 'ⵉⵎⵉⴽ',
            m : 'ⵎⵉⵏⵓⴺ',
            mm : '%d ⵎⵉⵏⵓⴺ',
            h : 'ⵙⴰⵄⴰ',
            hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
            d : 'ⴰⵙⵙ',
            dd : '%d oⵙⵙⴰⵏ',
            M : 'ⴰⵢoⵓⵔ',
            MM : '%d ⵉⵢⵢⵉⵔⵏ',
            y : 'ⴰⵙⴳⴰⵙ',
            yy : '%d ⵉⵙⴳⴰⵙⵏ'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });


    function uk__plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function uk__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
            'dd': 'день_дні_днів',
            'MM': 'місяць_місяці_місяців',
            'yy': 'рік_роки_років'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвилина' : 'хвилину';
        }
        else if (key === 'h') {
            return withoutSuffix ? 'година' : 'годину';
        }
        else {
            return number + ' ' + uk__plural(format[key], +number);
        }
    }
    function weekdaysCaseReplace(m, format) {
        var weekdays = {
                'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
                'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
                'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
            },
            nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
                'accusative' :
                ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
                    'genitive' :
                    'nominative');
        return weekdays[nounCase][m.day()];
    }
    function processHoursFunction(str) {
        return function () {
            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
        };
    }

    var uk = moment__default.defineLocale('uk', {
        months : {
            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
        },
        monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
        weekdays : weekdaysCaseReplace,
        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY р.',
            LLL : 'D MMMM YYYY р., HH:mm',
            LLLL : 'dddd, D MMMM YYYY р., HH:mm'
        },
        calendar : {
            sameDay: processHoursFunction('[Сьогодні '),
            nextDay: processHoursFunction('[Завтра '),
            lastDay: processHoursFunction('[Вчора '),
            nextWeek: processHoursFunction('[У] dddd ['),
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return processHoursFunction('[Минулої] dddd [').call(this);
                    case 1:
                    case 2:
                    case 4:
                        return processHoursFunction('[Минулого] dddd [').call(this);
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'за %s',
            past : '%s тому',
            s : 'декілька секунд',
            m : uk__relativeTimeWithPlural,
            mm : uk__relativeTimeWithPlural,
            h : 'годину',
            hh : uk__relativeTimeWithPlural,
            d : 'день',
            dd : uk__relativeTimeWithPlural,
            M : 'місяць',
            MM : uk__relativeTimeWithPlural,
            y : 'рік',
            yy : uk__relativeTimeWithPlural
        },
        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
        meridiemParse: /ночі|ранку|дня|вечора/,
        isPM: function (input) {
            return /^(дня|вечора)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночі';
            } else if (hour < 12) {
                return 'ранку';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечора';
            }
        },
        ordinalParse: /\d{1,2}-(й|го)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });


    var uz = moment__default.defineLocale('uz', {
        months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
        monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
        weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
        weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
        weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'D MMMM YYYY, dddd HH:mm'
        },
        calendar : {
            sameDay : '[Бугун соат] LT [да]',
            nextDay : '[Эртага] LT [да]',
            nextWeek : 'dddd [куни соат] LT [да]',
            lastDay : '[Кеча соат] LT [да]',
            lastWeek : '[Утган] dddd [куни соат] LT [да]',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'Якин %s ичида',
            past : 'Бир неча %s олдин',
            s : 'фурсат',
            m : 'бир дакика',
            mm : '%d дакика',
            h : 'бир соат',
            hh : '%d соат',
            d : 'бир кун',
            dd : '%d кун',
            M : 'бир ой',
            MM : '%d ой',
            y : 'бир йил',
            yy : '%d йил'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var vi = moment__default.defineLocale('vi', {
        months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
        monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
        monthsParseExact : true,
        weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
        weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysParseExact : true,
        meridiemParse: /sa|ch/i,
        isPM : function (input) {
            return /^ch$/i.test(input);
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'sa' : 'SA';
            } else {
                return isLower ? 'ch' : 'CH';
            }
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM [năm] YYYY',
            LLL : 'D MMMM [năm] YYYY HH:mm',
            LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
            l : 'DD/M/YYYY',
            ll : 'D MMM YYYY',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd, D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Hôm nay lúc] LT',
            nextDay: '[Ngày mai lúc] LT',
            nextWeek: 'dddd [tuần tới lúc] LT',
            lastDay: '[Hôm qua lúc] LT',
            lastWeek: 'dddd [tuần rồi lúc] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s tới',
            past : '%s trước',
            s : 'vài giây',
            m : 'một phút',
            mm : '%d phút',
            h : 'một giờ',
            hh : '%d giờ',
            d : 'một ngày',
            dd : '%d ngày',
            M : 'một tháng',
            MM : '%d tháng',
            y : 'một năm',
            yy : '%d năm'
        },
        ordinalParse: /\d{1,2}/,
        ordinal : function (number) {
            return number;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var x_pseudo = moment__default.defineLocale('x-pseudo', {
        months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
        monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
        monthsParseExact : true,
        weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
        weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
        weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[T~ódá~ý át] LT',
            nextDay : '[T~ómó~rró~w át] LT',
            nextWeek : 'dddd [át] LT',
            lastDay : '[Ý~ést~érdá~ý át] LT',
            lastWeek : '[L~ást] dddd [át] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'í~ñ %s',
            past : '%s á~gó',
            s : 'á ~féw ~sécó~ñds',
            m : 'á ~míñ~úté',
            mm : '%d m~íñú~tés',
            h : 'á~ñ hó~úr',
            hh : '%d h~óúrs',
            d : 'á ~dáý',
            dd : '%d d~áýs',
            M : 'á ~móñ~th',
            MM : '%d m~óñt~hs',
            y : 'á ~ýéár',
            yy : '%d ý~éárs'
        },
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var zh_cn = moment__default.defineLocale('zh-cn', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'Ah点mm分',
            LTS : 'Ah点m分s秒',
            L : 'YYYY-MM-DD',
            LL : 'YYYY年MMMD日',
            LLL : 'YYYY年MMMD日Ah点mm分',
            LLLL : 'YYYY年MMMD日ddddAh点mm分',
            l : 'YYYY-MM-DD',
            ll : 'YYYY年MMMD日',
            lll : 'YYYY年MMMD日Ah点mm分',
            llll : 'YYYY年MMMD日ddddAh点mm分'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : function () {
                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
            },
            nextDay : function () {
                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
            },
            lastDay : function () {
                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
            },
            nextWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment__default().startOf('week');
                prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
            },
            lastWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment__default().startOf('week');
                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
            },
            sameElse : 'LL'
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime : {
            future : '%s内',
            past : '%s前',
            s : '几秒',
            m : '1 分钟',
            mm : '%d 分钟',
            h : '1 小时',
            hh : '%d 小时',
            d : '1 天',
            dd : '%d 天',
            M : '1 个月',
            MM : '%d 个月',
            y : '1 年',
            yy : '%d 年'
        },
        week : {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });


    var zh_hk = moment__default.defineLocale('zh-hk', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'Ah點mm分',
            LTS : 'Ah點m分s秒',
            L : 'YYYY年MMMD日',
            LL : 'YYYY年MMMD日',
            LLL : 'YYYY年MMMD日Ah點mm分',
            LLLL : 'YYYY年MMMD日ddddAh點mm分',
            l : 'YYYY年MMMD日',
            ll : 'YYYY年MMMD日',
            lll : 'YYYY年MMMD日Ah點mm分',
            llll : 'YYYY年MMMD日ddddAh點mm分'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '中午') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : '[今天]LT',
            nextDay : '[明天]LT',
            nextWeek : '[下]ddddLT',
            lastDay : '[昨天]LT',
            lastWeek : '[上]ddddLT',
            sameElse : 'L'
        },
        ordinalParse: /\d{1,2}(日|月|週)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd' :
                case 'D' :
                case 'DDD' :
                    return number + '日';
                case 'M' :
                    return number + '月';
                case 'w' :
                case 'W' :
                    return number + '週';
                default :
                    return number;
            }
        },
        relativeTime : {
            future : '%s內',
            past : '%s前',
            s : '幾秒',
            m : '1 分鐘',
            mm : '%d 分鐘',
            h : '1 小時',
            hh : '%d 小時',
            d : '1 天',
            dd : '%d 天',
            M : '1 個月',
            MM : '%d 個月',
            y : '1 年',
            yy : '%d 年'
        }
    });


    var zh_tw = moment__default.defineLocale('zh-tw', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'Ah點mm分',
            LTS : 'Ah點m分s秒',
            L : 'YYYY年MMMD日',
            LL : 'YYYY年MMMD日',
            LLL : 'YYYY年MMMD日Ah點mm分',
            LLLL : 'YYYY年MMMD日ddddAh點mm分',
            l : 'YYYY年MMMD日',
            ll : 'YYYY年MMMD日',
            lll : 'YYYY年MMMD日Ah點mm分',
            llll : 'YYYY年MMMD日ddddAh點mm分'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '中午') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : '[今天]LT',
            nextDay : '[明天]LT',
            nextWeek : '[下]ddddLT',
            lastDay : '[昨天]LT',
            lastWeek : '[上]ddddLT',
            sameElse : 'L'
        },
        ordinalParse: /\d{1,2}(日|月|週)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd' :
                case 'D' :
                case 'DDD' :
                    return number + '日';
                case 'M' :
                    return number + '月';
                case 'w' :
                case 'W' :
                    return number + '週';
                default :
                    return number;
            }
        },
        relativeTime : {
            future : '%s內',
            past : '%s前',
            s : '幾秒',
            m : '1 分鐘',
            mm : '%d 分鐘',
            h : '1 小時',
            hh : '%d 小時',
            d : '1 天',
            dd : '%d 天',
            M : '1 個月',
            MM : '%d 個月',
            y : '1 年',
            yy : '%d 年'
        }
    });

    var moment_with_locales = moment__default;
    moment_with_locales.locale('en');

    return moment_with_locales;

}));
/* Onfido SDK 5.4.0 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Onfido=t():e.Onfido=t()}(window,function(){return function(e){function t(t){for(var n,r,i=t[0],a=t[1],s=0,c=[];s<i.length;s++)r=i[s],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&c.push(o[r][0]),o[r]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(u&&u(t);c.length;)c.shift()()}var n={},r={2:0},o={2:0};function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[];r[e]?t.push(r[e]):0!==r[e]&&{4:1}[e]&&t.push(r[e]=new Promise(function(t,n){for(var o="onfido."+({0:"crossDevice",4:"vendors~crossDevice"}[e]||e)+".css",a=i.p+o,s=document.getElementsByTagName("link"),c=0;c<s.length;c++){var u=(d=s[c]).getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(u===o||u===a))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){var d;if((u=(d=l[c]).getAttribute("data-href"))===o||u===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var o=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.request=o,delete r[e],f.parentNode.removeChild(f),n(i)},f.href=a,document.getElementsByTagName("head")[0].appendChild(f)}).then(function(){r[e]=0}));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=a);var s,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(e){return i.p+"onfido."+({0:"crossDevice",4:"vendors~crossDevice"}[e]||e)+".min.js"}(e);var u=new Error;s=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,n[1](u)}o[e]=void 0}};var l=setTimeout(function(){s({type:"timeout",target:c})},12e4);c.onerror=c.onload=s,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="https://assets.onfido.com/web-sdk-releases/5.4.0/",i.oe=function(e){throw console.error(e),e};var a=window.webpackJsonpOnfido=window.webpackJsonpOnfido||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=s;return i(i.s=525)}([function(e,t,n){!function(e){"use strict";var t=function(){},n={},r=[],o=[];function i(e,i){var a=o,s=void 0,c=void 0,u=void 0,l=void 0;for(l=arguments.length;l-- >2;)r.push(arguments[l]);for(i&&null!=i.children&&(r.length||r.push(i.children),delete i.children);r.length;)if((c=r.pop())&&void 0!==c.pop)for(l=c.length;l--;)r.push(c[l]);else"boolean"==typeof c&&(c=null),(u="function"!=typeof e)&&(null==c?c="":"number"==typeof c?c=String(c):"string"!=typeof c&&(u=!1)),u&&s?a[a.length-1]+=c:a===o?a=[c]:a.push(c),s=u;var d=new t;return d.nodeName=e,d.children=a,d.attributes=null==i?void 0:i,d.key=null==i?void 0:i.key,void 0!==n.vnode&&n.vnode(d),d}function a(e,t){for(var n in t)e[n]=t[n];return e}function s(e,t){e&&("function"==typeof e?e(t):e.current=t)}var c="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function u(e,t){return i(e.nodeName,a(a({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}var l=0,d=1,f=2,p=3,h="__preactattr_",m=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,v=[];function y(e){!e._dirty&&(e._dirty=!0)&&1==v.push(e)&&(n.debounceRendering||c)(g)}function g(){for(var e=void 0;e=v.pop();)e._dirty&&F(e)}function b(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&$(e,t.nodeName):n||e._componentConstructor===t.nodeName}function $(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function _(e){var t=a({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var r in n)void 0===t[r]&&(t[r]=n[r]);return t}function k(e){var t=e.parentNode;t&&t.removeChild(e)}function w(e,t,n,r,o){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)s(n,null),s(r,e);else if("class"!==t||o)if("style"===t){if(r&&"string"!=typeof r&&"string"!=typeof n||(e.style.cssText=r||""),r&&"object"==typeof r){if("string"!=typeof n)for(var i in n)i in r||(e.style[i]="");for(var a in r)e.style[a]="number"==typeof r[a]&&!1===m.test(a)?r[a]+"px":r[a]}}else if("dangerouslySetInnerHTML"===t)r&&(e.innerHTML=r.__html||"");else if("o"==t[0]&&"n"==t[1]){var c=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),r?n||e.addEventListener(t,C,c):e.removeEventListener(t,C,c),(e._listeners||(e._listeners={}))[t]=r}else if("list"!==t&&"type"!==t&&!o&&t in e){try{e[t]=null==r?"":r}catch(e){}null!=r&&!1!==r||"spellcheck"==t||e.removeAttribute(t)}else{var u=o&&t!==(t=t.replace(/^xlink:?/,""));null==r||!1===r?u?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof r&&(u?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),r):e.setAttribute(t,r))}else e.className=r||""}function C(e){return this._listeners[e.type](n.event&&n.event(e)||e)}var x=[],O=0,S=!1,E=!1;function j(){for(var e=void 0;e=x.shift();)n.afterMount&&n.afterMount(e),e.componentDidMount&&e.componentDidMount()}function T(e,t,n,r,o,i){O++||(S=null!=o&&void 0!==o.ownerSVGElement,E=null!=e&&!(h in e));var a=P(e,t,n,r,i);return o&&a.parentNode!==o&&o.appendChild(a),--O||(E=!1,i||j()),a}function P(e,t,n,r,o){var i=e,a=S;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||o)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),N(e,!0))),i[h]=!0,i;var s,c,u=t.nodeName;if("function"==typeof u)return function(e,t,n,r){for(var o=e&&e._component,i=o,a=e,s=o&&e._componentConstructor===t.nodeName,c=s,u=_(t);o&&!c&&(o=o._parentComponent);)c=o.constructor===t.nodeName;return o&&c&&(!r||o._component)?(M(o,u,p,n,r),e=o.base):(i&&!s&&(L(i),e=a=null),o=D(t.nodeName,u,n),e&&!o.nextBase&&(o.nextBase=e,a=null),M(o,u,d,n,r),e=o.base,a&&e!==a&&(a._component=null,N(a,!1))),e}(e,t,n,r);if(S="svg"===u||"foreignObject"!==u&&S,u=String(u),(!e||!$(e,u))&&(s=u,(c=S?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s)).normalizedNodeName=s,i=c,e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),N(e,!0)}var l=i.firstChild,f=i[h],m=t.children;if(null==f){f=i[h]={};for(var v=i.attributes,y=v.length;y--;)f[v[y].name]=v[y].value}return!E&&m&&1===m.length&&"string"==typeof m[0]&&null!=l&&void 0!==l.splitText&&null==l.nextSibling?l.nodeValue!=m[0]&&(l.nodeValue=m[0]):(m&&m.length||null!=l)&&function(e,t,n,r,o){var i=e.childNodes,a=[],s={},c=0,u=0,l=i.length,d=0,f=t?t.length:0,p=void 0,m=void 0,v=void 0,y=void 0,g=void 0;if(0!==l)for(var $=0;$<l;$++){var _=i[$],w=_[h],C=f&&w?_._component?_._component.__key:w.key:null;null!=C?(c++,s[C]=_):(w||(void 0!==_.splitText?!o||_.nodeValue.trim():o))&&(a[d++]=_)}if(0!==f)for(var x=0;x<f;x++){y=t[x],g=null;var O=y.key;if(null!=O)c&&void 0!==s[O]&&(g=s[O],s[O]=void 0,c--);else if(u<d)for(p=u;p<d;p++)if(void 0!==a[p]&&b(m=a[p],y,o)){g=m,a[p]=void 0,p===d-1&&d--,p===u&&u++;break}g=P(g,y,n,r),v=i[x],g&&g!==e&&g!==v&&(null==v?e.appendChild(g):g===v.nextSibling?k(v):e.insertBefore(g,v))}if(c)for(var S in s)void 0!==s[S]&&N(s[S],!1);for(;u<=d;)void 0!==(g=a[d--])&&N(g,!1)}(i,m,n,r,E||null!=f.dangerouslySetInnerHTML),function(e,t,n){var r=void 0;for(r in n)t&&null!=t[r]||null==n[r]||w(e,r,n[r],n[r]=void 0,S);for(r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||w(e,r,n[r],n[r]=t[r],S)}(i,t.attributes,f),S=a,i}function N(e,t){var n=e._component;n?L(n):(null!=e[h]&&s(e[h].ref,null),!1!==t&&null!=e[h]||k(e),A(e))}function A(e){for(e=e.lastChild;e;){var t=e.previousSibling;N(e,!0),e=t}}var I=[];function D(e,t,n){var r=void 0,o=I.length;for(e.prototype&&e.prototype.render?(r=new e(t,n),U.call(r,t,n)):((r=new U(t,n)).constructor=e,r.render=R);o--;)if(I[o].constructor===e)return r.nextBase=I[o].nextBase,I.splice(o,1),r;return r}function R(e,t,n){return this.constructor(e,n)}function M(e,t,r,o,i){e._disable||(e._disable=!0,e.__ref=t.ref,e.__key=t.key,delete t.ref,delete t.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||i?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o)),o&&o!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=o),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,r!==l&&(r!==d&&!1===n.syncComponentUpdates&&e.base?y(e):F(e,d,i)),s(e.__ref,e))}function F(e,t,r,o){if(!e._disable){var i=e.props,s=e.state,c=e.context,u=e.prevProps||i,p=e.prevState||s,h=e.prevContext||c,m=e.base,v=e.nextBase,y=m||v,g=e._component,b=!1,$=h,k=void 0,w=void 0,C=void 0;if(e.constructor.getDerivedStateFromProps&&(s=a(a({},s),e.constructor.getDerivedStateFromProps(i,s)),e.state=s),m&&(e.props=u,e.state=p,e.context=h,t!==f&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(i,s,c)?b=!0:e.componentWillUpdate&&e.componentWillUpdate(i,s,c),e.props=i,e.state=s,e.context=c),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!b){k=e.render(i,s,c),e.getChildContext&&(c=a(a({},c),e.getChildContext())),m&&e.getSnapshotBeforeUpdate&&($=e.getSnapshotBeforeUpdate(u,p));var S=k&&k.nodeName,E=void 0,P=void 0;if("function"==typeof S){var A=_(k);(w=g)&&w.constructor===S&&A.key==w.__key?M(w,A,d,c,!1):(E=w,e._component=w=D(S,A,c),w.nextBase=w.nextBase||v,w._parentComponent=e,M(w,A,l,c,!1),F(w,d,r,!0)),P=w.base}else C=y,(E=g)&&(C=e._component=null),(y||t===d)&&(C&&(C._component=null),P=T(C,k,c,r||!m,y&&y.parentNode,!0));if(y&&P!==y&&w!==g){var I=y.parentNode;I&&P!==I&&(I.replaceChild(P,y),E||(y._component=null,N(y,!1)))}if(E&&L(E),e.base=P,P&&!o){for(var R=e,U=e;U=U._parentComponent;)(R=U).base=P;P._component=R,P._componentConstructor=R.constructor}}for(!m||r?x.push(e):b||(e.componentDidUpdate&&e.componentDidUpdate(u,p,$),n.afterUpdate&&n.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);O||o||j()}}function L(e){n.beforeUnmount&&n.beforeUnmount(e);var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var r=e._component;r?L(r):t&&(null!=t[h]&&s(t[h].ref,null),e.nextBase=t,k(t),I.push(e),A(t)),s(e.__ref,null)}function U(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function B(e,t,n){return T(n,e,{},!1,t,!1)}function W(){return{}}a(U.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=a(a({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),y(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),F(this,f)},render:function(){}});var H={h:i,createElement:i,cloneElement:u,createRef:W,Component:U,render:B,rerender:g,options:n};e.default=H,e.h=i,e.createElement=i,e.cloneElement=u,e.createRef=W,e.Component=U,e.render=B,e.rerender=g,e.options=n,Object.defineProperty(e,"__esModule",{value:!0})}(t)},function(e,t,n){var r=n(123);e.exports=function(e,t,n){return t in e?r(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},function(e,t,n){e.exports=n(210)},function(e,t,n){var r=n(88),o=n(2);e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?o(e):t}},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,n){var r=n(214),o=n(124);function i(t){return e.exports=i=o?r:function(e){return e.__proto__||r(e)},i(t)}e.exports=i},function(e,t,n){var r=n(221),o=n(225);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=r(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}},function(e,t,n){"use strict";var r=n(27),o=n(60).f,i=n(139),a=n(18),s=n(61),c=n(31),u=n(33),l=function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t.prototype=e.prototype,t};e.exports=function(e,t){var n,d,f,p,h,m,v,y,g=e.target,b=e.global,$=e.stat,_=e.proto,k=b?r:$?r[g]:(r[g]||{}).prototype,w=b?a:a[g]||(a[g]={}),C=w.prototype;for(f in t)n=!i(b?f:g+($?".":"#")+f,e.forced)&&k&&u(k,f),h=w[f],n&&(m=e.noTargetGet?(y=o(k,f))&&y.value:k[f]),p=n&&m?m:t[f],n&&typeof h==typeof p||(v=e.bind&&n?s(p,r):e.wrap&&n?l(p):_&&"function"==typeof p?s(Function.call,p):p,(e.sham||p&&p.sham||h&&h.sham)&&c(v,"sham",!0),w[f]=v,_&&(u(a,d=g+"Prototype")||c(a,d,{}),a[d][f]=p,e.real&&C&&!C[f]&&c(C,f,p)))}},function(e,t,n){var r=n(123);function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),r(e,o.key,o)}}e.exports=function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}},function(e,t,n){"use strict";var r=n(14),o=n.n(r),i=n(244),a=n.n(i),s=(n(36),n(0)),c=n(147),u=n(22),l=n(12),d=n.n(l),f=n(81),p=n.n(f),h=n(19),m=n.n(h),v=n(134),y=n.n(v),g=n(337),b=n.n(g),$=n(389),_=n(390),k=n(391),w=n(392),C=n(41),x={en:$,es:_},O={en:k,es:w},S=function(e,t,n,r){return t.locale(e),t.extend(n),u.h||t.extend(r),t},E=function(e,t,n){!function(e,t,n){var r,o=new y.a(t),i=m()(e).call(e,function(e){return!o.has(e)}),a=p()(r=d()(x)).call(r,function(e){return e===n});i.length&&!a&&console.warn("Missing keys:",i)}(d()(t.phrases),function(e){return d()(new b.a({phrases:e}).phrases)}(e),n)},j=function(e,t){if(x[e])return S(e,t,x[e],O[e]);console.warn("Locale not supported")},T=function(e,t){return"string"==typeof e?j(e,t):function(e,t){E(e.phrases,t,e.locale);var n=j(e.locale,t)||t;return S(e.locale,n,e.phrases,e.mobilePhrases)}(e,t)},P=Object(C.c)(function(e){var t=function(){var e=new b.a({onMissingKey:function(){return null}});return S("en",e,x.en,O.en)}();return e&&T(e,t)||t});n.d(t,"a",function(){return A}),n.d(t,"b",function(){return I});var N=Object(c.createContext)({}),A=function(e){var t,n=e.language,r=e.children,o=P(n),i=a()(t=o.t).call(t,o);return Object(s.h)(N.Provider,{value:{language:o.currentLocale,translate:i,parseTranslatedTags:function(e,t){return Object(u.i)(i(e),t)}}},r)},I=function(e){return function(t){return Object(s.h)(N.Consumer,null,function(n){return Object(s.h)(e,o()({},t,n))})}}},function(e,t,n){e.exports=n(159)},function(e,t,n){e.exports=n(181)},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Theme-absolute-center",step:"onfido-sdk-ui-Theme-step",fullScreenStep:"onfido-sdk-ui-Theme-fullScreenStep",fullHeightContainer:"onfido-sdk-ui-Theme-fullHeightContainer",fullHeightMobileContainer:"onfido-sdk-ui-Theme-fullHeightMobileContainer",navigationBar:"onfido-sdk-ui-Theme-navigationBar",content:"onfido-sdk-ui-Theme-content",scrollableContent:"onfido-sdk-ui-Theme-scrollableContent",fullScreenContentWrapper:"onfido-sdk-ui-Theme-fullScreenContentWrapper",footer:"onfido-sdk-ui-Theme-footer",thickWrapper:"onfido-sdk-ui-Theme-thickWrapper","mbottom-large":"onfido-sdk-ui-Theme-mbottom-large",center:"onfido-sdk-ui-Theme-center",icon:"onfido-sdk-ui-Theme-icon",header:"onfido-sdk-ui-Theme-header",help:"onfido-sdk-ui-Theme-help",helpList:"onfido-sdk-ui-Theme-helpList",link:"onfido-sdk-ui-Theme-link",warning:"onfido-sdk-ui-Theme-warning",error:"onfido-sdk-ui-Theme-error"}},function(e,t,n){var r=n(272);function o(){return e.exports=o=r||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}e.exports=o},function(e,t,n){e.exports=n(155)},function(e,t,n){e.exports=n(172)},function(e,t,n){e.exports=n(179)},function(e,t){e.exports={}},function(e,t,n){e.exports=n(175)},function(e,t,n){var r;
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r)&&r.length){var a=o.apply(null,r);a&&e.push(a)}else if("object"===i)for(var s in r)n.call(r,s)&&r[s]&&e.push(s)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},function(e,t,n){var r=n(18),o=n(33),i=n(94),a=n(34).f;e.exports=function(e){var t=r.Symbol||(r.Symbol={});o(t,e)||a(t,e,{value:i.f(e)})}},function(e,t,n){"use strict";n.d(t,"f",function(){return C}),n.d(t,"g",function(){return x}),n.d(t,"k",function(){return O}),n.d(t,"j",function(){return S}),n.d(t,"h",function(){return E}),n.d(t,"a",function(){return N}),n.d(t,"b",function(){return A}),n.d(t,"i",function(){return I}),n.d(t,"e",function(){return D}),n.d(t,"d",function(){return R}),n.d(t,"c",function(){return M});var r=n(383),o=n.n(r),i=n(30),a=n.n(i),s=n(384),c=n.n(s),u=n(19),l=n.n(u),d=n(81),f=n.n(d),p=n(42),h=n.n(p),m=n(3),v=n.n(m),y=n(73),g=n.n(y),b=n(385),$=n.n(b),_=n(0),k=n(386),w=n.n(k),C=function(e,t){return(t[e]||function(){return null})()},x=function(e){return function(e,t){var n,r,o=$()(t),i=g()(o,2),a=i[0],s=i[1];s!==e&&console.warn(v()(n=v()(r="The css @value: ".concat(t," unit is ")).call(r,s," but it should be ")).call(n,e));return a}("ms",e)},O=function(e,t){return Object(_.h)("div",{className:e},t)},S=function(e){return function(t){t.preventDefault(),e()}},E=!/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent||""),j=function(e){return function(t){return function(e,t){try{w()().then(e).catch(t)}catch(e){t(e)}}(function(n){return t(e(n))},function(){return t(!1)})}},T=function(e){var t=e.kind,n=void 0===t?"":t;return h()(n).call(n,"video")},P=function(e){return!!e.label},N=j(function(e){return f()(e).call(e,T)}),A=j(function(e){var t;return f()(t=l()(e).call(e,T)).call(t,P)}),I=function(e,t){var n=(new DOMParser).parseFromString("<l>".concat(e,"</l>"),"application/xml"),r=c()(n.firstChild.childNodes);return a()(r).call(r,function(e){return e.nodeType===document.TEXT_NODE?e.textContent:t({type:e.tagName,text:e.textContent})})},D=function(){return Math.floor(o()()/1e3)},R=function(){return(new Date).getTime()},M=function(e,t){var n=document.createElement("input");document.body.appendChild(n),n.setAttribute("value",e),n.select(),document.execCommand("copy"),document.body.removeChild(n),t()}},function(e,t,n){var r=n(27),o=n(68),i=n(77),a=n(118),s=r.Symbol,c=o("wks");e.exports=function(e){return c[e]||(c[e]=a&&s[e]||(a?s:i)("Symbol."+e))}},function(e,t,n){e.exports=n(150)},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,n){e.exports=n(152)},function(e,t,n){(function(t){var n="object",r=function(e){return e&&e.Math==Math&&e};e.exports=r(typeof globalThis==n&&globalThis)||r(typeof window==n&&window)||r(typeof self==n&&self)||r(typeof t==n&&t)||Function("return this")()}).call(this,n(83))},function(e,t,n){var r=n(25);e.exports=!r(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){e.exports=n(268)},function(e,t,n){var r=n(28),o=n(34),i=n(50);e.exports=r?function(e,t,n){return o.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(18);e.exports=function(e){return r[e+"Prototype"]}},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var r=n(28),o=n(112),i=n(38),a=n(66),s=Object.defineProperty;t.f=r?s:function(e,t,n){if(i(e),t=a(t,!0),i(n),o)try{return s(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(65),o=n(55);e.exports=function(e){return r(o(e))}},function(e,t,n){"use strict";n.r(t),n.d(t,"version",function(){return s}),n.d(t,"DOM",function(){return j}),n.d(t,"Children",function(){return S}),n.d(t,"render",function(){return b}),n.d(t,"hydrate",function(){return b}),n.d(t,"createClass",function(){return B}),n.d(t,"createPortal",function(){return w}),n.d(t,"createFactory",function(){return E}),n.d(t,"createElement",function(){return N}),n.d(t,"cloneElement",function(){return I}),n.d(t,"isValidElement",function(){return D}),n.d(t,"findDOMNode",function(){return L}),n.d(t,"unmountComponentAtNode",function(){return C}),n.d(t,"Component",function(){return K}),n.d(t,"PureComponent",function(){return Y}),n.d(t,"unstable_renderSubtreeIntoContainer",function(){return _}),n.d(t,"unstable_batchedUpdates",function(){return X}),n.d(t,"__spread",function(){return M});var r=n(129),o=n.n(r);n.d(t,"PropTypes",function(){return o.a});var i=n(0);n.d(t,"createRef",function(){return i.createRef});var a=n(147);n.d(t,"createContext",function(){return a.createContext});var s="15.1.0",c="a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan".split(" "),u="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,l="undefined"!=typeof Symbol&&Symbol.for?Symbol.for("__preactCompatWrapper"):"__preactCompatWrapper",d={constructor:1,render:1,shouldComponentUpdate:1,componentWillReceiveProps:1,componentWillUpdate:1,componentDidUpdate:1,componentWillMount:1,componentDidMount:1,componentWillUnmount:1,componentDidUnmount:1},f=/^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/,p={},h=!1;try{h=!1}catch(e){}function m(){return null}var v=Object(i.h)("a",null).constructor;v.prototype.$$typeof=u,v.prototype.preactCompatUpgraded=!1,v.prototype.preactCompatNormalized=!1,Object.defineProperty(v.prototype,"type",{get:function(){return this.nodeName},set:function(e){this.nodeName=e},configurable:!0}),Object.defineProperty(v.prototype,"props",{get:function(){return this.attributes},set:function(e){this.attributes=e},configurable:!0});var y=i.options.event;i.options.event=function(e){return y&&(e=y(e)),e.persist=Object,e.nativeEvent=e,e};var g=i.options.vnode;function b(e,t,n){var r=t&&t._preactCompatRendered&&t._preactCompatRendered.base;r&&r.parentNode!==t&&(r=null),!r&&t&&(r=t.firstElementChild);for(var o=t.childNodes.length;o--;)t.childNodes[o]!==r&&t.removeChild(t.childNodes[o]);var a=Object(i.render)(e,t,r);return t&&(t._preactCompatRendered=a&&(a._component||{base:a})),"function"==typeof n&&n(),a&&a._component||a}i.options.vnode=function(e){if(!e.preactCompatUpgraded){e.preactCompatUpgraded=!0;var t=e.nodeName,n=e.attributes=null==e.attributes?{}:M({},e.attributes);"function"==typeof t?(!0===t[l]||t.prototype&&"isReactComponent"in t.prototype)&&(e.children&&""===String(e.children)&&(e.children=void 0),e.children&&(n.children=e.children),e.preactCompatNormalized||A(e),function(e){var t=e.nodeName,n=e.attributes;e.attributes={},t.defaultProps&&M(e.attributes,t.defaultProps);n&&M(e.attributes,n)}(e)):(e.children&&""===String(e.children)&&(e.children=void 0),e.children&&(n.children=e.children),n.defaultValue&&(n.value||0===n.value||(n.value=n.defaultValue),delete n.defaultValue),function(e,t){var n,r,o;if(t){for(o in t)if(n=f.test(o))break;if(n)for(o in r=e.attributes={},t)t.hasOwnProperty(o)&&(r[f.test(o)?o.replace(/([A-Z0-9])/,"-$1").toLowerCase():o]=t[o])}}(e,n))}g&&g(e)};var $=function(){};function _(e,t,n,r){var o=b(Object(i.h)($,{context:e.context},t),n),a=o._component||o.base;return r&&r.call(a,o),a}function k(e){_(this,e.vnode,e.container)}function w(e,t){return Object(i.h)(k,{vnode:e,container:t})}function C(e){var t=e._preactCompatRendered&&e._preactCompatRendered.base;return!(!t||t.parentNode!==e)&&(Object(i.render)(Object(i.h)(m),e,t),!0)}$.prototype.getChildContext=function(){return this.props.context},$.prototype.render=function(e){return e.children[0]};var x,O=[],S={map:function(e,t,n){return null==e?null:(e=S.toArray(e),n&&n!==e&&(t=t.bind(n)),e.map(t))},forEach:function(e,t,n){if(null==e)return null;e=S.toArray(e),n&&n!==e&&(t=t.bind(n)),e.forEach(t)},count:function(e){return e&&e.length||0},only:function(e){if(1!==(e=S.toArray(e)).length)throw new Error("Children.only() expects only one child.");return e[0]},toArray:function(e){return null==e?[]:O.concat(e)}};function E(e){return N.bind(null,e)}for(var j={},T=c.length;T--;)j[c[T]]=E(c[T]);function P(e){var t,n=e[l];return n?!0===n?e:n:(n=B({displayName:(t=e).displayName||t.name,render:function(){return t(this.props,this.context)}}),Object.defineProperty(n,l,{configurable:!0,value:!0}),n.displayName=e.displayName,n.propTypes=e.propTypes,n.defaultProps=e.defaultProps,Object.defineProperty(e,l,{configurable:!0,value:n}),n)}function N(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return function e(t,n){for(var r=n||0;r<t.length;r++){var o=t[r];Array.isArray(o)?e(o):o&&"object"==typeof o&&!D(o)&&(o.props&&o.type||o.attributes&&o.nodeName||o.children)&&(t[r]=N(o.type||o.nodeName,o.props||o.attributes,o.children))}}(e,2),A(i.h.apply(void 0,e))}function A(e){var t;e.preactCompatNormalized=!0,function(e){var t=e.attributes||(e.attributes={});R.enumerable="className"in t,t.className&&(t.class=t.className);Object.defineProperty(t,"className",R)}(e),"function"!=typeof(t=e.nodeName)||t.prototype&&t.prototype.render||(e.nodeName=P(e.nodeName));var n,r,o=e.attributes.ref,i=o&&typeof o;return!x||"string"!==i&&"number"!==i||(e.attributes.ref=(n=o,(r=x)._refProxies[n]||(r._refProxies[n]=function(e){r&&r.refs&&(r.refs[n]=e,null===e&&(delete r._refProxies[n],r=null))}))),function(e){var t=e.nodeName,n=e.attributes;if(!n||"string"!=typeof t)return;var r={};for(var o in n)r[o.toLowerCase()]=o;r.ondoubleclick&&(n.ondblclick=n[r.ondoubleclick],delete n[r.ondoubleclick]);if(r.onchange&&("textarea"===t||"input"===t.toLowerCase()&&!/^fil|che|rad/i.test(n.type))){var i=r.oninput||"oninput";n[i]||(n[i]=H([n[i],n[r.onchange]]),delete n[r.onchange])}}(e),e}function I(e,t){for(var n=[],r=arguments.length-2;r-- >0;)n[r]=arguments[r+2];if(!D(e))return e;var o=e.attributes||e.props,a=[Object(i.h)(e.nodeName||e.type,M({},o),e.children||o&&o.children),t];return n&&n.length?a.push(n):t&&t.children&&a.push(t.children),A(i.cloneElement.apply(void 0,a))}function D(e){return e&&(e instanceof v||e.$$typeof===u)}var R={configurable:!0,get:function(){return this.class},set:function(e){this.class=e}};function M(e,t){for(var n=arguments,r=1,o=void 0;r<arguments.length;r++)if(o=n[r])for(var i in o)o.hasOwnProperty(i)&&(e[i]=o[i]);return e}function F(e,t){for(var n in e)if(!(n in t))return!0;for(var r in t)if(e[r]!==t[r])return!0;return!1}function L(e){return e&&(e.base||1===e.nodeType&&e)||null}function U(){}function B(e){function t(e,t){!function(e){for(var t in e){var n=e[t];"function"!=typeof n||n.__bound||d.hasOwnProperty(t)||((e[t]=n.bind(e)).__bound=!0)}}(this),K.call(this,e,t,p),q.call(this,e,t)}return(e=M({constructor:t},e)).mixins&&function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=H(t[n].concat(e[n]||O),"getDefaultProps"===n||"getInitialState"===n||"getChildContext"===n))}(e,function(e){for(var t={},n=0;n<e.length;n++){var r=e[n];for(var o in r)r.hasOwnProperty(o)&&"function"==typeof r[o]&&(t[o]||(t[o]=[])).push(r[o])}return t}(e.mixins)),e.statics&&M(t,e.statics),e.propTypes&&(t.propTypes=e.propTypes),e.defaultProps&&(t.defaultProps=e.defaultProps),e.getDefaultProps&&(t.defaultProps=e.getDefaultProps.call(t)),U.prototype=K.prototype,t.prototype=M(new U,e),t.displayName=e.displayName||"Component",t}function W(e,t,n){if("string"==typeof t&&(t=e.constructor.prototype[t]),"function"==typeof t)return t.apply(e,n)}function H(e,t){return function(){for(var n,r=arguments,o=this,i=0;i<e.length;i++){var a=W(o,e[i],r);if(t&&null!=a)for(var s in n||(n={}),a)a.hasOwnProperty(s)&&(n[s]=a[s]);else void 0!==a&&(n=a)}return n}}function q(e,t){V.call(this,e,t),this.componentWillReceiveProps=H([V,this.componentWillReceiveProps||"componentWillReceiveProps"]),this.render=H([V,G,this.render||"render",z])}function V(e,t){if(e){var n=e.children;if(n&&Array.isArray(n)&&1===n.length&&("string"==typeof n[0]||"function"==typeof n[0]||n[0]instanceof v)&&(e.children=n[0],e.children&&"object"==typeof e.children&&(e.children.length=1,e.children[0]=e.children)),h){var r="function"==typeof this?this:this.constructor,i=this.propTypes||r.propTypes,a=this.displayName||r.name;i&&o.a.checkPropTypes(i,e,"prop",a)}}}function G(e){x=this}function z(){x===this&&(x=null)}function K(e,t,n){i.Component.call(this,e,t),this.state=this.getInitialState?this.getInitialState():{},this.refs={},this._refProxies={},n!==p&&q.call(this,e,t)}function Y(e,t){K.call(this,e,t)}function X(e){e()}M(K.prototype=new i.Component,{constructor:K,isReactComponent:{},replaceState:function(e,t){for(var n in this.setState(e,t),this.state)n in e||delete this.state[n]},getDOMNode:function(){return this.base},isMounted:function(){return!!this.base}}),U.prototype=K.prototype,Y.prototype=new U,Y.prototype.isPureReactComponent=!0,Y.prototype.shouldComponentUpdate=function(e,t){return F(this.props,e)||F(this.state,t)};var J={version:s,DOM:j,PropTypes:o.a,Children:S,render:b,hydrate:b,createClass:B,createContext:a.createContext,createPortal:w,createFactory:E,createElement:N,cloneElement:I,createRef:i.createRef,isValidElement:D,findDOMNode:L,unmountComponentAtNode:C,Component:K,PureComponent:Y,unstable_renderSubtreeIntoContainer:_,unstable_batchedUpdates:X,__spread:M};t.default=J},function(e,t,n){var r=n(55);e.exports=function(e){return Object(r(e))}},function(e,t,n){var r=n(29);e.exports=function(e){if(!r(e))throw TypeError(String(e)+" is not an object");return e}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Video-absolute-center",challengeDescription:"onfido-sdk-ui-Video-challengeDescription",challengeTitle:"onfido-sdk-ui-Video-challengeTitle",introCopy:"onfido-sdk-ui-Video-introCopy",introBullets:"onfido-sdk-ui-Video-introBullets",introBullet:"onfido-sdk-ui-Video-introBullet",bolder:"onfido-sdk-ui-Video-bolder",introIcon:"onfido-sdk-ui-Video-introIcon",speak_out_loudIcon:"onfido-sdk-ui-Video-speak_out_loudIcon",two_actionsIcon:"onfido-sdk-ui-Video-two_actionsIcon",movement:"onfido-sdk-ui-Video-movement","movement-turnLeft":"onfido-sdk-ui-Video-movement-turnLeft",recite:"onfido-sdk-ui-Video-recite",actions:"onfido-sdk-ui-Video-actions",btn:"onfido-sdk-ui-Video-btn",captureActionsHint:"onfido-sdk-ui-Video-captureActionsHint",recordAction:"onfido-sdk-ui-Video-recordAction",caption:"onfido-sdk-ui-Video-caption",recordingIndicator:"onfido-sdk-ui-Video-recordingIndicator",recordingIndicatorText:"onfido-sdk-ui-Video-recordingIndicatorText",startRecording:"onfido-sdk-ui-Video-startRecording",stopRecording:"onfido-sdk-ui-Video-stopRecording"}},function(e,t,n){var r=n(228),o=n(277),i=n(279);e.exports=function(e,t){if(null==e)return{};var n,a,s=i(e,t);if(o){var c=o(e);for(a=0;a<c.length;a++)n=c[a],r(t).call(t,n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}},function(e,t,n){"use strict";n.d(t,"b",function(){return s}),n.d(t,"a",function(){return c}),n.d(t,"c",function(){return u}),n.d(t,"d",function(){return l});var r=n(53),o=n.n(r),i=n(393),a=n.n(i),s=function(e){return e},c=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return a()(t).call(t,function(e,t){return function(){return t(e.apply(void 0,arguments))}},s)},u=function(e){var t={};return function(){for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];var a=o()(r);return t[a]||(t[a]=e.apply(void 0,r))}},l=function(){}},function(e,t,n){e.exports=n(285)},function(e,t,n){var r=n(84),o=Math.min;e.exports=function(e){return e>0?o(r(e),9007199254740991):0}},function(e,t,n){"use strict";n.d(t,"a",function(){return j}),n.d(t,"h",function(){return T}),n.d(t,"g",function(){return P}),n.d(t,"e",function(){return N}),n.d(t,"f",function(){return A}),n.d(t,"c",function(){return I}),n.d(t,"d",function(){return D}),n.d(t,"b",function(){return R});var r=n(11),o=n.n(r),i=n(1),a=n.n(i),s=n(73),c=n.n(s),u=n(109),l=n.n(u),d=n(30),f=n.n(d),p=n(243),h=n.n(p),m=n(51),v=n.n(m),y=n(52),g=n.n(y),b=n(42),$=n.n(b),_=n(3),k=n.n(_),w=n(134),C=n.n(w),x=n(12),O=n.n(x),S=n(80),E=n.n(S),j=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return E()(e=O()(t)).call(e,function(e){return n(t[e],e)})},T=function(e,t){if(!e&&!t)return!0;if(!e&&t||e&&!t)return!1;var n=O()(e),r=O()(t),o=new C.a(k()(n).call(n,r));if(n.length!==r.length||n.length!==o.size)return!1;for(var i=0;i<n.length;i++)if(e[n[i]]!==t[n[i]])return!1;return!0},P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return A(e,function(e){return!$()(t).call(t,e)})},N=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return A(e,function(e){return $()(t).call(t,e)})},A=function(e,t){var n;return g()(n=O()(e||{})).call(n,function(n,r){return t(r,e[r])||(n[r]=e[r]),n},{})},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return 0===O()(e).length},D=function(e,t){var n,r;return h.a.apply(Object,k()(n=[{}]).call(n,v()(f()(r=l()(e)).call(r,function(e){var n=c()(e,2),r=n[0],o=n[1];return a()({},r,t(o,r))}))))},R=function(e,t){var n;return o()(n=l()(e)).call(n,function(e){var n=c()(e,2),r=n[0],o=n[1];return t(o,r)})}},function(e,t){e.exports={}},function(e,t,n){var r=n(34).f,o=n(31),i=n(33),a=n(165),s=n(23)("toStringTag"),c=a!=={}.toString;e.exports=function(e,t,n,u){if(e){var l=n?e:e.prototype;i(l,s)||r(l,s,{configurable:!0,value:t}),u&&c&&o(l,"toString",a)}}},function(e,t,n){var r=n(61),o=n(65),i=n(37),a=n(43),s=n(105),c=[].push,u=function(e){var t=1==e,n=2==e,u=3==e,l=4==e,d=6==e,f=5==e||d;return function(p,h,m,v){for(var y,g,b=i(p),$=o(b),_=r(h,m,3),k=a($.length),w=0,C=v||s,x=t?C(p,k):n?C(p,0):void 0;k>w;w++)if((f||w in $)&&(g=_(y=$[w],w,b),e))if(t)x[w]=g;else if(g)switch(e){case 3:return!0;case 5:return y;case 6:return w;case 2:c.call(x,y)}else if(l)return!1;return d?-1:u||l?l:x}};e.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Uploader-absolute-center",container:"onfido-sdk-ui-Uploader-container",instructions:"onfido-sdk-ui-Uploader-instructions",instructionsCopy:"onfido-sdk-ui-Uploader-instructionsCopy",error:"onfido-sdk-ui-Uploader-error",icon:"onfido-sdk-ui-Uploader-icon",identityIcon:"onfido-sdk-ui-Uploader-identityIcon",faceIcon:"onfido-sdk-ui-Uploader-faceIcon",buttons:"onfido-sdk-ui-Uploader-buttons",buttonContainer:"onfido-sdk-ui-Uploader-buttonContainer",button:"onfido-sdk-ui-Uploader-button",proofOfAddressIcon:"onfido-sdk-ui-Uploader-proofOfAddressIcon",uploaderWrapper:"onfido-sdk-ui-Uploader-uploaderWrapper",uploadArea:"onfido-sdk-ui-Uploader-uploadArea"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-crossDevice-CrossDeviceLink-absolute-center",container:"onfido-sdk-ui-crossDevice-CrossDeviceLink-container",subTitle:"onfido-sdk-ui-crossDevice-CrossDeviceLink-subTitle",smsSection:"onfido-sdk-ui-crossDevice-CrossDeviceLink-smsSection",bolder:"onfido-sdk-ui-crossDevice-CrossDeviceLink-bolder",label:"onfido-sdk-ui-crossDevice-CrossDeviceLink-label",numberInputSection:"onfido-sdk-ui-crossDevice-CrossDeviceLink-numberInputSection",inputContainer:"onfido-sdk-ui-crossDevice-CrossDeviceLink-inputContainer",linkText:"onfido-sdk-ui-crossDevice-CrossDeviceLink-linkText",fieldError:"onfido-sdk-ui-crossDevice-CrossDeviceLink-fieldError",numberError:"onfido-sdk-ui-crossDevice-CrossDeviceLink-numberError",sending:"onfido-sdk-ui-crossDevice-CrossDeviceLink-sending",spin:"onfido-sdk-ui-crossDevice-CrossDeviceLink-spin",copyLinkSection:"onfido-sdk-ui-crossDevice-CrossDeviceLink-copyLinkSection",linkContainer:"onfido-sdk-ui-crossDevice-CrossDeviceLink-linkContainer",copySuccess:"onfido-sdk-ui-crossDevice-CrossDeviceLink-copySuccess",actionContainer:"onfido-sdk-ui-crossDevice-CrossDeviceLink-actionContainer",copyToClipboard:"onfido-sdk-ui-crossDevice-CrossDeviceLink-copyToClipboard",divider:"onfido-sdk-ui-crossDevice-CrossDeviceLink-divider",btn:"onfido-sdk-ui-crossDevice-CrossDeviceLink-btn"}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var r=n(301),o=n(302),i=n(308);e.exports=function(e){return r(e)||o(e)||i()}},function(e,t,n){e.exports=n(232)},function(e,t,n){e.exports=n(324)},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t){e.exports=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e}},function(e,t,n){var r=n(114),o=n(91);e.exports=Object.keys||function(e){return r(e,o)}},function(e,t){e.exports={}},function(e,t,n){var r,o,i,a=n(161),s=n(27),c=n(29),u=n(31),l=n(33),d=n(69),f=n(57),p=s.WeakMap;if(a){var h=new p,m=h.get,v=h.has,y=h.set;r=function(e,t){return y.call(h,e,t),t},o=function(e){return m.call(h,e)||{}},i=function(e){return v.call(h,e)}}else{var g=d("state");f[g]=!0,r=function(e,t){return u(e,g,t),t},o=function(e){return l(e,g)?e[g]:{}},i=function(e){return l(e,g)}}e.exports={set:r,get:o,has:i,enforce:function(e){return i(e)?o(e):r(e,{})},getterFor:function(e){return function(t){var n;if(!c(t)||(n=o(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}}},function(e,t){e.exports=!0},function(e,t,n){var r=n(28),o=n(74),i=n(50),a=n(35),s=n(66),c=n(33),u=n(112),l=Object.getOwnPropertyDescriptor;t.f=r?l:function(e,t){if(e=a(e),t=s(t,!0),u)try{return l(e,t)}catch(e){}if(c(e,t))return i(!o.f.call(e,t),e[t])}},function(e,t,n){var r=n(67);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){n(160);var r=n(167),o=n(27),i=n(31),a=n(45),s=n(23)("toStringTag");for(var c in r){var u=o[c],l=u&&u.prototype;l&&!l[s]&&i(l,s,c),a[c]=a.Array}},function(e,t,n){var r=n(54);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-ProofOfAddress-Guidance-absolute-center",content:"onfido-sdk-ui-ProofOfAddress-Guidance-content",subTitle:"onfido-sdk-ui-ProofOfAddress-Guidance-subTitle",bolder:"onfido-sdk-ui-ProofOfAddress-Guidance-bolder",makeSure:"onfido-sdk-ui-ProofOfAddress-Guidance-makeSure",docImageContainer:"onfido-sdk-ui-ProofOfAddress-Guidance-docImageContainer",docImage:"onfido-sdk-ui-ProofOfAddress-Guidance-docImage",label:"onfido-sdk-ui-ProofOfAddress-Guidance-label"}},function(e,t,n){var r=n(25),o=n(54),i="".split;e.exports=r(function(){return!Object("z").propertyIsEnumerable(0)})?function(e){return"String"==o(e)?i.call(e,""):Object(e)}:Object},function(e,t,n){var r=n(29);e.exports=function(e,t){if(!r(e))return e;var n,o;if(t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;if("function"==typeof(n=e.valueOf)&&!r(o=n.call(e)))return o;if(!t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e}},function(e,t,n){var r=n(27),o=n(163),i=n(59),a=r["__core-js_shared__"]||o("__core-js_shared__",{});(e.exports=function(e,t){return a[e]||(a[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.2.1",mode:i?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(e,t,n){var r=n(68),o=n(77),i=r("keys");e.exports=function(e){return i[e]||(i[e]=o(e))}},function(e,t,n){var r=n(38),o=n(113),i=n(91),a=n(57),s=n(140),c=n(102),u=n(69)("IE_PROTO"),l=function(){},d=function(){var e,t=c("iframe"),n=i.length;for(t.style.display="none",s.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),d=e.F;n--;)delete d.prototype[i[n]];return d()};e.exports=Object.create||function(e,t){var n;return null!==e?(l.prototype=r(e),n=new l,l.prototype=null,n[u]=e):n=d(),void 0===t?n:o(n,t)},a[u]=!0},function(e,t,n){"use strict";var r=n(186).charAt,o=n(58),i=n(98),a=o.set,s=o.getterFor("String Iterator");i(String,"String",function(e){a(this,{type:"String Iterator",string:String(e),index:0})},function(){var e,t=s(this),n=t.string,o=t.index;return o>=n.length?{value:void 0,done:!0}:(e=r(n,o),t.index+=e.length,{value:e,done:!1})})},function(e,t,n){"use strict";t.__esModule=!0,t.connect=t.Provider=void 0;var r=i(n(406)),o=i(n(409));function i(e){return e&&e.__esModule?e:{default:e}}t.Provider=r.default,t.connect=o.default},function(e,t,n){var r=n(294),o=n(297),i=n(300);e.exports=function(e,t){return r(e)||o(e,t)||i()}},function(e,t,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!r.call({1:2},1);t.f=i?function(e){var t=o(this,e);return!!t&&t.enumerable}:r},function(e,t,n){var r=n(18),o=n(27),i=function(e){return"function"==typeof e?e:void 0};e.exports=function(e,t){return arguments.length<2?i(r[e])||i(o[e]):r[e]&&r[e][t]||o[e]&&o[e][t]}},function(e,t,n){"use strict";var r=n(66),o=n(34),i=n(50);e.exports=function(e,t,n){var a=r(t);a in e?o.f(e,a,i(0,n)):e[a]=n}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++n+r).toString(36)}},function(e,t,n){"use strict";var r=n(25);e.exports=function(e,t){var n=[][e];return!n||!r(function(){n.call(null,t||function(){throw 1},1)})}},function(e,t,n){var r=n(25),o=n(23)("species");e.exports=function(e){return!r(function(){var t=[];return(t.constructor={})[o]=function(){return{foo:1}},1!==t[e](Boolean).foo})}},function(e,t,n){e.exports=n(264)},function(e,t,n){e.exports=n(430)},function(e,t,n){e.exports=n(468)},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(33),o=n(37),i=n(69),a=n(117),s=i("IE_PROTO"),c=Object.prototype;e.exports=a?Object.getPrototypeOf:function(e){return e=o(e),r(e,s)?e[s]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?c:null}},function(e,t,n){var r=n(54),o=n(23)("toStringTag"),i="Arguments"==r(function(){return arguments}());e.exports=function(e){var t,n,a;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),o))?n:i?r(t):"Object"==(a=r(t))&&"function"==typeof t.callee?"Arguments":a}},function(e,t,n){var r=n(31);e.exports=function(e,t,n,o){o&&o.enumerable?e[t]=n:r(e,t,n)}},function(e,t,n){var r=n(183),o=n(187);function i(e){return(i="function"==typeof o&&"symbol"==typeof r?function(e){return typeof e}:function(e){return e&&"function"==typeof o&&e.constructor===o&&e!==o.prototype?"symbol":typeof e})(e)}function a(t){return"function"==typeof o&&"symbol"===i(r)?e.exports=a=function(e){return i(e)}:e.exports=a=function(e){return e&&"function"==typeof o&&e.constructor===o&&e!==o.prototype?"symbol":i(e)},a(t)}e.exports=a},,function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-DocumentSelector-absolute-center",list:"onfido-sdk-ui-DocumentSelector-list",option:"onfido-sdk-ui-DocumentSelector-option",optionHoverDesktop:"onfido-sdk-ui-DocumentSelector-optionHoverDesktop",content:"onfido-sdk-ui-DocumentSelector-content",optionMain:"onfido-sdk-ui-DocumentSelector-optionMain",label:"onfido-sdk-ui-DocumentSelector-label",hint:"onfido-sdk-ui-DocumentSelector-hint",warning:"onfido-sdk-ui-DocumentSelector-warning",tag:"onfido-sdk-ui-DocumentSelector-tag",icon:"onfido-sdk-ui-DocumentSelector-icon","icon-passport":"onfido-sdk-ui-DocumentSelector-icon-passport","icon-national-identity-card":"onfido-sdk-ui-DocumentSelector-icon-national-identity-card","icon-driving-licence":"onfido-sdk-ui-DocumentSelector-icon-driving-licence","icon-bank-building-society-statement":"onfido-sdk-ui-DocumentSelector-icon-bank-building-society-statement","icon-utility-bill":"onfido-sdk-ui-DocumentSelector-icon-utility-bill","icon-letter":"onfido-sdk-ui-DocumentSelector-icon-letter"}},function(e,t){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(e,t,n){var r=n(114),o=n(91).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,o)}},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){t.f=n(23)},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Confirm-CaptureViewer-absolute-center",pdfIcon:"onfido-sdk-ui-Confirm-CaptureViewer-pdfIcon",pdfWrapper:"onfido-sdk-ui-Confirm-CaptureViewer-pdfWrapper",imageWrapper:"onfido-sdk-ui-Confirm-CaptureViewer-imageWrapper",videoWrapper:"onfido-sdk-ui-Confirm-CaptureViewer-videoWrapper",fullscreenImageWrapper:"onfido-sdk-ui-Confirm-CaptureViewer-fullscreenImageWrapper",image:"onfido-sdk-ui-Confirm-CaptureViewer-image",video:"onfido-sdk-ui-Confirm-CaptureViewer-video"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-PrivacyStatement-absolute-center",privacy:"onfido-sdk-ui-PrivacyStatement-privacy",content:"onfido-sdk-ui-PrivacyStatement-content",actions:"onfido-sdk-ui-PrivacyStatement-actions",list:"onfido-sdk-ui-PrivacyStatement-list",item:"onfido-sdk-ui-PrivacyStatement-item",smallPrint:"onfido-sdk-ui-PrivacyStatement-smallPrint",decline:"onfido-sdk-ui-PrivacyStatement-decline",primary:"onfido-sdk-ui-PrivacyStatement-primary"}},function(e,t){e.exports=function(){}},function(e,t,n){"use strict";var r=n(8),o=n(164),i=n(85),a=n(104),s=n(46),c=n(31),u=n(87),l=n(23),d=n(59),f=n(45),p=n(116),h=p.IteratorPrototype,m=p.BUGGY_SAFARI_ITERATORS,v=l("iterator"),y=function(){return this};e.exports=function(e,t,n,l,p,g,b){o(n,t,l);var $,_,k,w=function(e){if(e===p&&E)return E;if(!m&&e in O)return O[e];switch(e){case"keys":case"values":case"entries":return function(){return new n(this,e)}}return function(){return new n(this)}},C=t+" Iterator",x=!1,O=e.prototype,S=O[v]||O["@@iterator"]||p&&O[p],E=!m&&S||w(p),j="Array"==t&&O.entries||S;if(j&&($=i(j.call(new e)),h!==Object.prototype&&$.next&&(d||i($)===h||(a?a($,h):"function"!=typeof $[v]&&c($,v,y)),s($,C,!0,!0),d&&(f[C]=y))),"values"==p&&S&&"values"!==S.name&&(x=!0,E=function(){return S.call(this)}),d&&!b||O[v]===E||c(O,v,E),f[t]=E,p)if(_={values:w("values"),keys:g?E:w("keys"),entries:w("entries")},b)for(k in _)!m&&!x&&k in O||u(O,k,_[k]);else r({target:t,proto:!0,forced:m||x},_);return _}},function(e,t,n){e.exports={modal_animation_duration:"200ms","absolute-center":"onfido-sdk-ui-Modal-absolute-center",portal:"onfido-sdk-ui-Modal-portal",modalBody:"onfido-sdk-ui-Modal-modalBody",overlay:"onfido-sdk-ui-Modal-overlay","overlay--after-open":"onfido-sdk-ui-Modal-overlay--after-open","overlay--before-close":"onfido-sdk-ui-Modal-overlay--before-close",inner:"onfido-sdk-ui-Modal-inner",closeButton:"onfido-sdk-ui-Modal-closeButton",closeButtonLabel:"onfido-sdk-ui-Modal-closeButtonLabel",closeButtonFullScreen:"onfido-sdk-ui-Modal-closeButtonFullScreen"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Error-absolute-center",container:"onfido-sdk-ui-Error-container","container-error":"onfido-sdk-ui-Error-container-error","container-warning":"onfido-sdk-ui-Error-container-warning",instruction:"onfido-sdk-ui-Error-instruction","instruction-text":"onfido-sdk-ui-Error-instruction-text",title:"onfido-sdk-ui-Error-title","title-text":"onfido-sdk-ui-Error-title-text","title-icon":"onfido-sdk-ui-Error-title-icon","title-icon-error":"onfido-sdk-ui-Error-title-icon-error","title-icon-warning":"onfido-sdk-ui-Error-title-icon-warning",roundedTriangle:"onfido-sdk-ui-Error-roundedTriangle",warningTriangle:"onfido-sdk-ui-Error-warningTriangle",errorTriangle:"onfido-sdk-ui-Error-errorTriangle",dismiss:"onfido-sdk-ui-Error-dismiss"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-crossDevice-CrossDeviceSubmit-absolute-center",icon:"onfido-sdk-ui-crossDevice-CrossDeviceSubmit-icon",uploadList:"onfido-sdk-ui-crossDevice-CrossDeviceSubmit-uploadList",uploadListItem:"onfido-sdk-ui-crossDevice-CrossDeviceSubmit-uploadListItem",listText:"onfido-sdk-ui-crossDevice-CrossDeviceSubmit-listText"}},function(e,t,n){var r=n(27),o=n(29),i=r.document,a=o(i)&&o(i.createElement);e.exports=function(e){return a?i.createElement(e):{}}},function(e,t,n){var r=n(35),o=n(43),i=n(115),a=function(e){return function(t,n,a){var s,c=r(t),u=o(c.length),l=i(a,u);if(e&&n!=n){for(;u>l;)if((s=c[l++])!=s)return!0}else for(;u>l;l++)if((e||l in c)&&c[l]===n)return e||l||0;return!e&&-1}};e.exports={includes:a(!0),indexOf:a(!1)}},function(e,t,n){var r=n(38),o=n(166);e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{(e=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),t=n instanceof Array}catch(e){}return function(n,i){return r(n),o(i),t?e.call(n,i):n.__proto__=i,n}}():void 0)},function(e,t,n){var r=n(29),o=n(63),i=n(23)("species");e.exports=function(e,t){var n;return o(e)&&("function"!=typeof(n=e.constructor)||n!==Array&&!o(n.prototype)?r(n)&&null===(n=n[i])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},function(e,t,n){var r=n(38),o=n(230),i=n(43),a=n(61),s=n(132),c=n(229),u=function(e,t){this.stopped=e,this.result=t};(e.exports=function(e,t,n,l,d){var f,p,h,m,v,y,g=a(t,n,l?2:1);if(d)f=e;else{if("function"!=typeof(p=s(e)))throw TypeError("Target is not iterable");if(o(p)){for(h=0,m=i(e.length);m>h;h++)if((v=l?g(r(y=e[h])[0],y[1]):g(e[h]))&&v instanceof u)return v;return new u(!1)}f=p.call(e)}for(;!(y=f.next()).done;)if((v=c(f,g,y.value,l))&&v instanceof u)return v;return new u(!1)}).stop=function(e){return new u(!0,e)}},function(e,t,n){function r(){var e;try{e=t.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(t=e.exports=n(476)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var n=this.useColors;if(e[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+e[0]+(n?"%c ":" ")+"+"+t.humanize(this.diff),!n)return;var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,i=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r)},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=r,t.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(r())},function(e,t,n){"use strict";t.__esModule=!0,t.compose=t.applyMiddleware=t.bindActionCreators=t.combineReducers=t.createStore=void 0;var r=c(n(347)),o=c(n(422)),i=c(n(423)),a=c(n(424)),s=c(n(350));c(n(349));function c(e){return e&&e.__esModule?e:{default:e}}t.createStore=r.default,t.combineReducers=o.default,t.bindActionCreators=i.default,t.applyMiddleware=a.default,t.compose=s.default},function(e,t,n){e.exports=n(309)},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Confirm-absolute-center",previewsContainer:"onfido-sdk-ui-Confirm-previewsContainer",previewsContainerIsFullScreen:"onfido-sdk-ui-Confirm-previewsContainerIsFullScreen",actionsContainer:"onfido-sdk-ui-Confirm-actionsContainer",title:"onfido-sdk-ui-Confirm-title",retake:"onfido-sdk-ui-Confirm-retake",actions:"onfido-sdk-ui-Confirm-actions","btn-primary":"onfido-sdk-ui-Confirm-btn-primary",error:"onfido-sdk-ui-Confirm-error","btn-secondary":"onfido-sdk-ui-Confirm-btn-secondary"}},function(e,t,n){n(151);var r=n(18).Object,o=e.exports=function(e,t,n){return r.defineProperty(e,t,n)};r.defineProperty.sham&&(o.sham=!0)},function(e,t,n){var r=n(28),o=n(25),i=n(102);e.exports=!r&&!o(function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(28),o=n(34),i=n(38),a=n(56);e.exports=r?Object.defineProperties:function(e,t){i(e);for(var n,r=a(t),s=r.length,c=0;s>c;)o.f(e,n=r[c++],t[n]);return e}},function(e,t,n){var r=n(33),o=n(35),i=n(103).indexOf,a=n(57);e.exports=function(e,t){var n,s=o(e),c=0,u=[];for(n in s)!r(a,n)&&r(s,n)&&u.push(n);for(;t.length>c;)r(s,n=t[c++])&&(~i(u,n)||u.push(n));return u}},function(e,t,n){var r=n(84),o=Math.max,i=Math.min;e.exports=function(e,t){var n=r(e);return n<0?o(n+t,0):i(n,t)}},function(e,t,n){"use strict";var r,o,i,a=n(85),s=n(31),c=n(33),u=n(23),l=n(59),d=u("iterator"),f=!1;[].keys&&("next"in(i=[].keys())?(o=a(a(i)))!==Object.prototype&&(r=o):f=!0),null==r&&(r={}),l||c(r,d)||s(r,d,function(){return this}),e.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:f}},function(e,t,n){var r=n(25);e.exports=!r(function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})},function(e,t,n){var r=n(25);e.exports=!!Object.getOwnPropertySymbols&&!r(function(){return!String(Symbol())})},function(e,t,n){"use strict";var r=n(8),o=n(27),i=n(59),a=n(28),s=n(118),c=n(25),u=n(33),l=n(63),d=n(29),f=n(38),p=n(37),h=n(35),m=n(66),v=n(50),y=n(70),g=n(56),b=n(92),$=n(180),_=n(93),k=n(60),w=n(34),C=n(74),x=n(31),O=n(87),S=n(68),E=n(69),j=n(57),T=n(77),P=n(23),N=n(94),A=n(21),I=n(46),D=n(58),R=n(47).forEach,M=E("hidden"),F=P("toPrimitive"),L=D.set,U=D.getterFor("Symbol"),B=Object.prototype,W=o.Symbol,H=o.JSON,q=H&&H.stringify,V=k.f,G=w.f,z=$.f,K=C.f,Y=S("symbols"),X=S("op-symbols"),J=S("string-to-symbol-registry"),Z=S("symbol-to-string-registry"),Q=S("wks"),ee=o.QObject,te=!ee||!ee.prototype||!ee.prototype.findChild,ne=a&&c(function(){return 7!=y(G({},"a",{get:function(){return G(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=V(B,t);r&&delete B[t],G(e,t,n),r&&e!==B&&G(B,t,r)}:G,re=function(e,t){var n=Y[e]=y(W.prototype);return L(n,{type:"Symbol",tag:e,description:t}),a||(n.description=t),n},oe=s&&"symbol"==typeof W.iterator?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof W},ie=function(e,t,n){e===B&&ie(X,t,n),f(e);var r=m(t,!0);return f(n),u(Y,r)?(n.enumerable?(u(e,M)&&e[M][r]&&(e[M][r]=!1),n=y(n,{enumerable:v(0,!1)})):(u(e,M)||G(e,M,v(1,{})),e[M][r]=!0),ne(e,r,n)):G(e,r,n)},ae=function(e,t){f(e);var n=h(t),r=g(n).concat(le(n));return R(r,function(t){a&&!se.call(n,t)||ie(e,t,n[t])}),e},se=function(e){var t=m(e,!0),n=K.call(this,t);return!(this===B&&u(Y,t)&&!u(X,t))&&(!(n||!u(this,t)||!u(Y,t)||u(this,M)&&this[M][t])||n)},ce=function(e,t){var n=h(e),r=m(t,!0);if(n!==B||!u(Y,r)||u(X,r)){var o=V(n,r);return!o||!u(Y,r)||u(n,M)&&n[M][r]||(o.enumerable=!0),o}},ue=function(e){var t=z(h(e)),n=[];return R(t,function(e){u(Y,e)||u(j,e)||n.push(e)}),n},le=function(e){var t=e===B,n=z(t?X:h(e)),r=[];return R(n,function(e){!u(Y,e)||t&&!u(B,e)||r.push(Y[e])}),r};s||(O((W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=T(e),n=function(e){this===B&&n.call(X,e),u(this,M)&&u(this[M],t)&&(this[M][t]=!1),ne(this,t,v(1,e))};return a&&te&&ne(B,t,{configurable:!0,set:n}),re(t,e)}).prototype,"toString",function(){return U(this).tag}),C.f=se,w.f=ie,k.f=ce,b.f=$.f=ue,_.f=le,a&&(G(W.prototype,"description",{configurable:!0,get:function(){return U(this).description}}),i||O(B,"propertyIsEnumerable",se,{unsafe:!0})),N.f=function(e){return re(P(e),e)}),r({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:W}),R(g(Q),function(e){A(e)}),r({target:"Symbol",stat:!0,forced:!s},{for:function(e){var t=String(e);if(u(J,t))return J[t];var n=W(t);return J[t]=n,Z[n]=t,n},keyFor:function(e){if(!oe(e))throw TypeError(e+" is not a symbol");if(u(Z,e))return Z[e]},useSetter:function(){te=!0},useSimple:function(){te=!1}}),r({target:"Object",stat:!0,forced:!s,sham:!a},{create:function(e,t){return void 0===t?y(e):ae(y(e),t)},defineProperty:ie,defineProperties:ae,getOwnPropertyDescriptor:ce}),r({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:ue,getOwnPropertySymbols:le}),r({target:"Object",stat:!0,forced:c(function(){_.f(1)})},{getOwnPropertySymbols:function(e){return _.f(p(e))}}),H&&r({target:"JSON",stat:!0,forced:!s||c(function(){var e=W();return"[null]"!=q([e])||"{}"!=q({a:e})||"{}"!=q(Object(e))})},{stringify:function(e){for(var t,n,r=[e],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=t=r[1],(d(t)||void 0!==e)&&!oe(e))return l(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!oe(t))return t}),r[1]=t,q.apply(H,r)}}),W.prototype[F]||x(W.prototype,F,W.prototype.valueOf),I(W,"Symbol"),j[M]=!0},function(e,t,n){n(21)("iterator")},function(e,t,n){"use strict";var r=n(8),o=n(25),i=n(63),a=n(29),s=n(37),c=n(43),u=n(76),l=n(105),d=n(79),f=n(23)("isConcatSpreadable"),p=!o(function(){var e=[];return e[f]=!1,e.concat()[0]!==e}),h=d("concat"),m=function(e){if(!a(e))return!1;var t=e[f];return void 0!==t?!!t:i(e)};r({target:"Array",proto:!0,forced:!p||!h},{concat:function(e){var t,n,r,o,i,a=s(this),d=l(a,0),f=0;for(t=-1,r=arguments.length;t<r;t++)if(i=-1===t?a:arguments[t],m(i)){if(f+(o=c(i.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(n=0;n<o;n++,f++)n in i&&u(d,f,i[n])}else{if(f>=9007199254740991)throw TypeError("Maximum allowed index exceeded");u(d,f++,i)}return d.length=f,d}})},function(e,t){},function(e,t,n){e.exports=n(213)},function(e,t,n){e.exports=n(218)},function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-crossDevice-SwitchDevice-absolute-center",switchClickableArea:"onfido-sdk-ui-crossDevice-SwitchDevice-switchClickableArea",container:"onfido-sdk-ui-crossDevice-SwitchDevice-container",copy:"onfido-sdk-ui-crossDevice-SwitchDevice-copy",header:"onfido-sdk-ui-crossDevice-SwitchDevice-header",submessage:"onfido-sdk-ui-crossDevice-SwitchDevice-submessage",icon:"onfido-sdk-ui-crossDevice-SwitchDevice-icon",chevron:"onfido-sdk-ui-crossDevice-SwitchDevice-chevron"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-NavigationBar-absolute-center",navigation:"onfido-sdk-ui-NavigationBar-navigation",fullScreenNav:"onfido-sdk-ui-NavigationBar-fullScreenNav",backHoverDesktop:"onfido-sdk-ui-NavigationBar-backHoverDesktop",iconBack:"onfido-sdk-ui-NavigationBar-iconBack",back:"onfido-sdk-ui-NavigationBar-back",label:"onfido-sdk-ui-NavigationBar-label",disabled:"onfido-sdk-ui-NavigationBar-disabled"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-crossDevice-Intro-absolute-center",content:"onfido-sdk-ui-crossDevice-Intro-content",list:"onfido-sdk-ui-crossDevice-Intro-list",stage:"onfido-sdk-ui-crossDevice-Intro-stage",stageIcon:"onfido-sdk-ui-crossDevice-Intro-stageIcon","stageIcon-sms":"onfido-sdk-ui-crossDevice-Intro-stageIcon-sms","stageIcon-take-photos":"onfido-sdk-ui-crossDevice-Intro-stageIcon-take-photos","stageIcon-take-selfie":"onfido-sdk-ui-crossDevice-Intro-stageIcon-take-selfie","stageIcon-return-computer":"onfido-sdk-ui-crossDevice-Intro-stageIcon-return-computer",stageMessage:"onfido-sdk-ui-crossDevice-Intro-stageMessage","stageMessage-sms":"onfido-sdk-ui-crossDevice-Intro-stageMessage-sms","stageMessage-take-photos":"onfido-sdk-ui-crossDevice-Intro-stageMessage-take-photos","stageMessage-return-computer":"onfido-sdk-ui-crossDevice-Intro-stageMessage-return-computer"}},function(e,t,n){e.exports=n(407)()},function(e,t,n){n(119);var r=n(18);e.exports=r.Object.getOwnPropertySymbols},function(e,t,n){n(182);var r=n(18);e.exports=r.Object.keys},function(e,t,n){var r=n(86),o=n(45),i=n(23)("iterator");e.exports=function(e){if(null!=e)return e[i]||e["@@iterator"]||o[r(e)]}},function(e,t,n){e.exports=n(237)},function(e,t,n){e.exports=n(314)},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Button-absolute-center",button:"onfido-sdk-ui-Button-button","button-text":"onfido-sdk-ui-Button-button-text","button-centered":"onfido-sdk-ui-Button-button-centered","button-primary":"onfido-sdk-ui-Button-button-primary",hoverDesktop:"onfido-sdk-ui-Button-hoverDesktop","button-secondary":"onfido-sdk-ui-Button-button-secondary","button-small":"onfido-sdk-ui-Button-button-small",fallbackButton:"onfido-sdk-ui-Button-fallbackButton"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-PageTitle-absolute-center",title:"onfido-sdk-ui-PageTitle-title",titleSpan:"onfido-sdk-ui-PageTitle-titleSpan",subTitle:"onfido-sdk-ui-PageTitle-subTitle",titleWrapper:"onfido-sdk-ui-PageTitle-titleWrapper",smaller:"onfido-sdk-ui-PageTitle-smaller",fullScreen:"onfido-sdk-ui-PageTitle-fullScreen"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-CameraPermissions-Recover-absolute-center",instructions:"onfido-sdk-ui-CameraPermissions-Recover-instructions",instructionsTitle:"onfido-sdk-ui-CameraPermissions-Recover-instructionsTitle",recovery:"onfido-sdk-ui-CameraPermissions-Recover-recovery",steps:"onfido-sdk-ui-CameraPermissions-Recover-steps",step:"onfido-sdk-ui-CameraPermissions-Recover-step",button:"onfido-sdk-ui-CameraPermissions-Recover-button"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-EnlargedPreview-absolute-center",expanded:"onfido-sdk-ui-EnlargedPreview-expanded",imageContainer:"onfido-sdk-ui-EnlargedPreview-imageContainer",image:"onfido-sdk-ui-EnlargedPreview-image",container:"onfido-sdk-ui-EnlargedPreview-container",button:"onfido-sdk-ui-EnlargedPreview-button","button-text":"onfido-sdk-ui-EnlargedPreview-button-text"}},function(e,t,n){var r=n(25),o=/#|\.prototype\./,i=function(e,t){var n=s[a(e)];return n==u||n!=c&&("function"==typeof t?r(t):!!t)},a=i.normalize=function(e){return String(e).replace(o,".").toLowerCase()},s=i.data={},c=i.NATIVE="N",u=i.POLYFILL="P";e.exports=i},function(e,t,n){var r=n(75);e.exports=r("document","documentElement")},function(e,t,n){n(226);var r=n(18);e.exports=r.Object.assign},function(e,t,n){var r=n(67),o=n(37),i=n(65),a=n(43),s=function(e){return function(t,n,s,c){r(n);var u=o(t),l=i(u),d=a(u.length),f=e?d-1:0,p=e?-1:1;if(s<2)for(;;){if(f in l){c=l[f],f+=p;break}if(f+=p,e?f<0:d<=f)throw TypeError("Reduce of empty array with no initial value")}for(;e?f>=0:d>f;f+=p)f in l&&(c=n(c,l[f],f,u));return c}};e.exports={left:s(!1),right:s(!0)}},function(e,t){e.exports=function(e,t,n){if(!(e instanceof t))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return e}},function(e,t,n){function r(e){if(e)return function(e){for(var t in r.prototype)e[t]=r.prototype[t];return e}(e)}e.exports=r,r.prototype.on=r.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this},r.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+e];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+e],this;for(var o=0;o<r.length;o++)if((n=r[o])===t||n.fn===t){r.splice(o,1);break}return this},r.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),n=this._callbacks["$"+e];if(n)for(var r=0,o=(n=n.slice(0)).length;r<o;++r)n[r].apply(this,t);return this},r.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]},r.prototype.hasListeners=function(e){return!!this.listeners(e).length}},function(e,t,n){var r,o=n(483),i=n(366),a=n(484),s=n(485),c=n(486);"undefined"!=typeof ArrayBuffer&&(r=n(487));var u="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),l="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),d=u||l;t.protocol=3;var f=t.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},p=o(f),h={type:"error",data:"parser error"},m=n(488);function v(e,t,n){for(var r=new Array(e.length),o=s(e.length,n),i=function(e,n,o){t(n,function(t,n){r[e]=n,o(t,r)})},a=0;a<e.length;a++)i(a,e[a],o)}t.encodePacket=function(e,n,r,o){"function"==typeof n&&(o=n,n=!1),"function"==typeof r&&(o=r,r=null);var i=void 0===e.data?void 0:e.data.buffer||e.data;if("undefined"!=typeof ArrayBuffer&&i instanceof ArrayBuffer)return function(e,n,r){if(!n)return t.encodeBase64Packet(e,r);var o=e.data,i=new Uint8Array(o),a=new Uint8Array(1+o.byteLength);a[0]=f[e.type];for(var s=0;s<i.length;s++)a[s+1]=i[s];return r(a.buffer)}(e,n,o);if(void 0!==m&&i instanceof m)return function(e,n,r){if(!n)return t.encodeBase64Packet(e,r);if(d)return function(e,n,r){if(!n)return t.encodeBase64Packet(e,r);var o=new FileReader;return o.onload=function(){t.encodePacket({type:e.type,data:o.result},n,!0,r)},o.readAsArrayBuffer(e.data)}(e,n,r);var o=new Uint8Array(1);o[0]=f[e.type];var i=new m([o.buffer,e.data]);return r(i)}(e,n,o);if(i&&i.base64)return function(e,n){var r="b"+t.packets[e.type]+e.data.data;return n(r)}(e,o);var a=f[e.type];return void 0!==e.data&&(a+=r?c.encode(String(e.data),{strict:!1}):String(e.data)),o(""+a)},t.encodeBase64Packet=function(e,n){var r,o="b"+t.packets[e.type];if(void 0!==m&&e.data instanceof m){var i=new FileReader;return i.onload=function(){var e=i.result.split(",")[1];n(o+e)},i.readAsDataURL(e.data)}try{r=String.fromCharCode.apply(null,new Uint8Array(e.data))}catch(t){for(var a=new Uint8Array(e.data),s=new Array(a.length),c=0;c<a.length;c++)s[c]=a[c];r=String.fromCharCode.apply(null,s)}return o+=btoa(r),n(o)},t.decodePacket=function(e,n,r){if(void 0===e)return h;if("string"==typeof e){if("b"===e.charAt(0))return t.decodeBase64Packet(e.substr(1),n);if(r&&!1===(e=function(e){try{e=c.decode(e,{strict:!1})}catch(e){return!1}return e}(e)))return h;var o=e.charAt(0);return Number(o)==o&&p[o]?e.length>1?{type:p[o],data:e.substring(1)}:{type:p[o]}:h}o=new Uint8Array(e)[0];var i=a(e,1);return m&&"blob"===n&&(i=new m([i])),{type:p[o],data:i}},t.decodeBase64Packet=function(e,t){var n=p[e.charAt(0)];if(!r)return{type:n,data:{base64:!0,data:e.substr(1)}};var o=r.decode(e.substr(1));return"blob"===t&&m&&(o=new m([o])),{type:n,data:o}},t.encodePayload=function(e,n,r){"function"==typeof n&&(r=n,n=null);var o=i(e);if(n&&o)return m&&!d?t.encodePayloadAsBlob(e,r):t.encodePayloadAsArrayBuffer(e,r);if(!e.length)return r("0:");v(e,function(e,r){t.encodePacket(e,!!o&&n,!1,function(e){r(null,function(e){return e.length+":"+e}(e))})},function(e,t){return r(t.join(""))})},t.decodePayload=function(e,n,r){if("string"!=typeof e)return t.decodePayloadAsBinary(e,n,r);var o;if("function"==typeof n&&(r=n,n=null),""===e)return r(h,0,1);for(var i,a,s="",c=0,u=e.length;c<u;c++){var l=e.charAt(c);if(":"===l){if(""===s||s!=(i=Number(s)))return r(h,0,1);if(s!=(a=e.substr(c+1,i)).length)return r(h,0,1);if(a.length){if(o=t.decodePacket(a,n,!1),h.type===o.type&&h.data===o.data)return r(h,0,1);if(!1===r(o,c+i,u))return}c+=i,s=""}else s+=l}return""!==s?r(h,0,1):void 0},t.encodePayloadAsArrayBuffer=function(e,n){if(!e.length)return n(new ArrayBuffer(0));v(e,function(e,n){t.encodePacket(e,!0,!0,function(e){return n(null,e)})},function(e,t){var r=t.reduce(function(e,t){var n;return e+(n="string"==typeof t?t.length:t.byteLength).toString().length+n+2},0),o=new Uint8Array(r),i=0;return t.forEach(function(e){var t="string"==typeof e,n=e;if(t){for(var r=new Uint8Array(e.length),a=0;a<e.length;a++)r[a]=e.charCodeAt(a);n=r.buffer}o[i++]=t?0:1;var s=n.byteLength.toString();for(a=0;a<s.length;a++)o[i++]=parseInt(s[a]);o[i++]=255;for(r=new Uint8Array(n),a=0;a<r.length;a++)o[i++]=r[a]}),n(o.buffer)})},t.encodePayloadAsBlob=function(e,n){v(e,function(e,n){t.encodePacket(e,!0,!0,function(e){var t=new Uint8Array(1);if(t[0]=1,"string"==typeof e){for(var r=new Uint8Array(e.length),o=0;o<e.length;o++)r[o]=e.charCodeAt(o);e=r.buffer,t[0]=0}var i=(e instanceof ArrayBuffer?e.byteLength:e.size).toString(),a=new Uint8Array(i.length+1);for(o=0;o<i.length;o++)a[o]=parseInt(i[o]);if(a[i.length]=255,m){var s=new m([t.buffer,a.buffer,e]);n(null,s)}})},function(e,t){return n(new m(t))})},t.decodePayloadAsBinary=function(e,n,r){"function"==typeof n&&(r=n,n=null);for(var o=e,i=[];o.byteLength>0;){for(var s=new Uint8Array(o),c=0===s[0],u="",l=1;255!==s[l];l++){if(u.length>310)return r(h,0,1);u+=s[l]}o=a(o,2+u.length),u=parseInt(u);var d=a(o,0,u);if(c)try{d=String.fromCharCode.apply(null,new Uint8Array(d))}catch(e){var f=new Uint8Array(d);d="";for(l=0;l<f.length;l++)d+=String.fromCharCode(f[l])}i.push(d),o=a(o,u)}var p=i.length;i.forEach(function(e,o){r(t.decodePacket(e,n,!0),o,p)})}},function(e,t,n){var r;!function(o){"use strict";function i(e,t,n){var r,o=document.createElement("img");return o.onerror=function(r){return i.onerror(o,r,e,t,n)},o.onload=function(r){return i.onload(o,r,e,t,n)},"string"==typeof e?(i.fetchBlob(e,function(t){t?(e=t,r=i.createObjectURL(e)):(r=e,n&&n.crossOrigin&&(o.crossOrigin=n.crossOrigin)),o.src=r},n),o):i.isInstanceOf("Blob",e)||i.isInstanceOf("File",e)?(r=o._objectURL=i.createObjectURL(e))?(o.src=r,o):i.readFile(e,function(e){var n=e.target;n&&n.result?o.src=n.result:t&&t(e)}):void 0}var a=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;function s(e,t){!e._objectURL||t&&t.noRevoke||(i.revokeObjectURL(e._objectURL),delete e._objectURL)}i.fetchBlob=function(e,t,n){t()},i.isInstanceOf=function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},i.transform=function(e,t,n,r,o){n(e,o)},i.onerror=function(e,t,n,r,o){s(e,o),r&&r.call(e,t)},i.onload=function(e,t,n,r,o){s(e,o),r&&i.transform(e,o,r,n,{})},i.createObjectURL=function(e){return!!a&&a.createObjectURL(e)},i.revokeObjectURL=function(e){return!!a&&a.revokeObjectURL(e)},i.readFile=function(e,t,n){if(window.FileReader){var r=new FileReader;if(r.onload=r.onerror=t,r[n=n||"readAsDataURL"])return r[n](e),r}return!1},void 0===(r=function(){return i}.call(t,n,t,e))||(e.exports=r)}(window)},function(e,t,n){!function(e,t){"use strict";var n={register:function(e){console.warn("Consumer used without a Provider")},unregister:function(e){},val:function(e){}};function r(e){var t=e.children;return{child:1===t.length?t[0]:null,children:t}}var o,i=window&&window.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});function a(e){return r(e).child||"render"in e&&e.render}var s=1073741823,c=function(){return s},u=0;function l(e,o){var l="_preactContextProvider-"+u++;return{Provider:function(e){function n(t){var n=e.call(this,t)||this;return n.t=function(e,t){var n=[],r=e,o=function(e){return 0|t(r,e)};return{register:function(e){n.push(e),e(r,o(r))},unregister:function(e){n=n.filter(function(t){return t!==e})},val:function(e){if(void 0===e||e==r)return r;var t=o(e);return r=e,n.forEach(function(n){return n(e,t)}),r}}}(t.value,o||c),n}return i(n,e),n.prototype.getChildContext=function(){var e;return(e={})[l]=this.t,e},n.prototype.componentDidUpdate=function(){this.t.val(this.props.value)},n.prototype.render=function(){var e=r(this.props),n=e.child,o=e.children;return n||t.h("span",null,o)},n}(t.Component),Consumer:function(t){function r(n,r){var o=t.call(this,n,r)||this;return o.i=function(e,t){var n=o.props.unstable_observedBits,r=null==n?s:n;0!=((r|=0)&t)&&o.setState({value:e})},o.state={value:o.u().val()||e},o}return i(r,t),r.prototype.componentDidMount=function(){this.u().register(this.i)},r.prototype.shouldComponentUpdate=function(e,t){return this.state.value!==t.value||a(this.props)!==a(e)},r.prototype.componentWillUnmount=function(){this.u().unregister(this.i)},r.prototype.componentDidUpdate=function(e,t,r){var o=r[l];o!==this.context[l]&&((o||n).unregister(this.i),this.componentDidMount())},r.prototype.render=function(){var e="render"in this.props&&this.props.render,t=a(this.props);if(e&&e!==t&&console.warn("Both children and a render function are defined. Children will be used"),"function"==typeof t)return t(this.state.value);console.warn("Consumer is expecting a function as one and only child but didn't find any")},r.prototype.u=function(){return this.context[l]||n},r}(t.Component)}}var d=l;e.default=l,e.createContext=d,Object.defineProperty(e,"__esModule",{value:!0})}(t,n(0))},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-CameraPermissions-Primer-absolute-center",bodyWrapper:"onfido-sdk-ui-CameraPermissions-Primer-bodyWrapper",instructions:"onfido-sdk-ui-CameraPermissions-Primer-instructions",image:"onfido-sdk-ui-CameraPermissions-Primer-image",reasons:"onfido-sdk-ui-CameraPermissions-Primer-reasons",reason:"onfido-sdk-ui-CameraPermissions-Primer-reason",graphic:"onfido-sdk-ui-CameraPermissions-Primer-graphic",allow:"onfido-sdk-ui-CameraPermissions-Primer-allow",buttonInstructions:"onfido-sdk-ui-CameraPermissions-Primer-buttonInstructions"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-crossDevice-MobileNotificationSent-absolute-center",icon:"onfido-sdk-ui-crossDevice-MobileNotificationSent-icon",submessage:"onfido-sdk-ui-crossDevice-MobileNotificationSent-submessage",boldMessage:"onfido-sdk-ui-crossDevice-MobileNotificationSent-boldMessage",cancel:"onfido-sdk-ui-crossDevice-MobileNotificationSent-cancel"}},function(e,t,n){e.exports=n(111)},function(e,t,n){var r=n(8),o=n(28);r({target:"Object",stat:!0,forced:!o,sham:!o},{defineProperty:n(34).f})},function(e,t,n){e.exports=n(153)},function(e,t,n){n(154);var r=n(18).Object,o=e.exports=function(e,t){return r.defineProperties(e,t)};r.defineProperties.sham&&(o.sham=!0)},function(e,t,n){var r=n(8),o=n(28);r({target:"Object",stat:!0,forced:!o,sham:!o},{defineProperties:n(113)})},function(e,t,n){e.exports=n(156)},function(e,t,n){n(157);var r=n(18);e.exports=r.Object.getOwnPropertyDescriptors},function(e,t,n){var r=n(8),o=n(28),i=n(158),a=n(35),s=n(60),c=n(76);r({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(e){for(var t,n,r=a(e),o=s.f,u=i(r),l={},d=0;u.length>d;)void 0!==(n=o(r,t=u[d++]))&&c(l,t,n);return l}})},function(e,t,n){var r=n(75),o=n(92),i=n(93),a=n(38);e.exports=r("Reflect","ownKeys")||function(e){var t=o.f(a(e)),n=i.f;return n?t.concat(n(e)):t}},function(e,t,n){n(62);var r=n(168),o=n(86),i=Array.prototype,a={DOMTokenList:!0,NodeList:!0};e.exports=function(e){var t=e.forEach;return e===i||e instanceof Array&&t===i.forEach||a.hasOwnProperty(o(e))?r:t}},function(e,t,n){"use strict";var r=n(35),o=n(97),i=n(45),a=n(58),s=n(98),c=a.set,u=a.getterFor("Array Iterator");e.exports=s(Array,"Array",function(e,t){c(this,{type:"Array Iterator",target:r(e),index:0,kind:t})},function(){var e=u(this),t=e.target,n=e.kind,r=e.index++;return!t||r>=t.length?(e.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:t[r],done:!1}:{value:[r,t[r]],done:!1}},"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},function(e,t,n){var r=n(27),o=n(162),i=r.WeakMap;e.exports="function"==typeof i&&/native code/.test(o.call(i))},function(e,t,n){var r=n(68);e.exports=r("native-function-to-string",Function.toString)},function(e,t,n){var r=n(27),o=n(31);e.exports=function(e,t){try{o(r,e,t)}catch(n){r[e]=t}return t}},function(e,t,n){"use strict";var r=n(116).IteratorPrototype,o=n(70),i=n(50),a=n(46),s=n(45),c=function(){return this};e.exports=function(e,t,n){var u=t+" Iterator";return e.prototype=o(r,{next:i(1,n)}),a(e,u,!1,!0),s[u]=c,e}},function(e,t,n){"use strict";var r=n(86),o={};o[n(23)("toStringTag")]="z",e.exports="[object z]"!==String(o)?function(){return"[object "+r(this)+"]"}:o.toString},function(e,t,n){var r=n(29);e.exports=function(e){if(!r(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype");return e}},function(e,t){e.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(e,t,n){e.exports=n(169)},function(e,t,n){n(170);var r=n(32);e.exports=r("Array").forEach},function(e,t,n){"use strict";var r=n(8),o=n(171);r({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},function(e,t,n){"use strict";var r=n(47).forEach,o=n(78);e.exports=o("forEach")?function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}:[].forEach},function(e,t,n){e.exports=n(173)},function(e,t,n){n(174);var r=n(18).Object,o=e.exports=function(e,t){return r.getOwnPropertyDescriptor(e,t)};r.getOwnPropertyDescriptor.sham&&(o.sham=!0)},function(e,t,n){var r=n(8),o=n(25),i=n(35),a=n(60).f,s=n(28),c=o(function(){a(1)});r({target:"Object",stat:!0,forced:!s||c,sham:!s},{getOwnPropertyDescriptor:function(e,t){return a(i(e),t)}})},function(e,t,n){e.exports=n(176)},function(e,t,n){var r=n(177),o=Array.prototype;e.exports=function(e){var t=e.filter;return e===o||e instanceof Array&&t===o.filter?r:t}},function(e,t,n){n(178);var r=n(32);e.exports=r("Array").filter},function(e,t,n){"use strict";var r=n(8),o=n(47).filter;r({target:"Array",proto:!0,forced:!n(79)("filter")},{filter:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},function(e,t,n){e.exports=n(130)},function(e,t,n){var r=n(35),o=n(92).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];e.exports.f=function(e){return a&&"[object Window]"==i.call(e)?function(e){try{return o(e)}catch(e){return a.slice()}}(e):o(r(e))}},function(e,t,n){e.exports=n(131)},function(e,t,n){var r=n(8),o=n(37),i=n(56);r({target:"Object",stat:!0,forced:n(25)(function(){i(1)})},{keys:function(e){return i(o(e))}})},function(e,t,n){e.exports=n(184)},function(e,t,n){e.exports=n(185)},function(e,t,n){n(120),n(71),n(62);var r=n(94);e.exports=r.f("iterator")},function(e,t,n){var r=n(84),o=n(55),i=function(e){return function(t,n){var i,a,s=String(o(t)),c=r(n),u=s.length;return c<0||c>=u?e?"":void 0:(i=s.charCodeAt(c))<55296||i>56319||c+1===u||(a=s.charCodeAt(c+1))<56320||a>57343?e?s.charAt(c):i:e?s.slice(c,c+2):a-56320+(i-55296<<10)+65536}};e.exports={codeAt:i(!1),charAt:i(!0)}},function(e,t,n){e.exports=n(188)},function(e,t,n){e.exports=n(189),n(205),n(206),n(207),n(208),n(209)},function(e,t,n){n(121),n(122),n(119),n(190),n(191),n(192),n(193),n(120),n(194),n(195),n(196),n(197),n(198),n(199),n(200),n(201),n(202),n(203),n(204);var r=n(18);e.exports=r.Symbol},function(e,t,n){n(21)("asyncIterator")},function(e,t){},function(e,t,n){n(21)("hasInstance")},function(e,t,n){n(21)("isConcatSpreadable")},function(e,t,n){n(21)("match")},function(e,t,n){n(21)("matchAll")},function(e,t,n){n(21)("replace")},function(e,t,n){n(21)("search")},function(e,t,n){n(21)("species")},function(e,t,n){n(21)("split")},function(e,t,n){n(21)("toPrimitive")},function(e,t,n){n(21)("toStringTag")},function(e,t,n){n(21)("unscopables")},function(e,t,n){n(46)(Math,"Math",!0)},function(e,t,n){var r=n(27);n(46)(r.JSON,"JSON",!0)},function(e,t,n){n(21)("asyncDispose")},function(e,t,n){n(21)("dispose")},function(e,t,n){n(21)("observable")},function(e,t,n){n(21)("patternMatch")},function(e,t,n){n(21)("replaceAll")},function(e,t,n){e.exports=n(211)},function(e,t,n){var r=n(212),o=Array.prototype;e.exports=function(e){var t=e.concat;return e===o||e instanceof Array&&t===o.concat?r:t}},function(e,t,n){n(121);var r=n(32);e.exports=r("Array").concat},function(e,t,n){e.exports=n(111)},function(e,t,n){e.exports=n(215)},function(e,t,n){e.exports=n(216)},function(e,t,n){n(217);var r=n(18);e.exports=r.Object.getPrototypeOf},function(e,t,n){var r=n(8),o=n(25),i=n(37),a=n(85),s=n(117);r({target:"Object",stat:!0,forced:o(function(){a(1)}),sham:!s},{getPrototypeOf:function(e){return a(i(e))}})},function(e,t,n){e.exports=n(219)},function(e,t,n){n(220);var r=n(18);e.exports=r.Object.setPrototypeOf},function(e,t,n){n(8)({target:"Object",stat:!0},{setPrototypeOf:n(104)})},function(e,t,n){e.exports=n(222)},function(e,t,n){e.exports=n(223)},function(e,t,n){n(224);var r=n(18).Object;e.exports=function(e,t){return r.create(e,t)}},function(e,t,n){n(8)({target:"Object",stat:!0,sham:!n(28)},{create:n(70)})},function(e,t,n){var r=n(124);function o(t,n){return e.exports=o=r||function(e,t){return e.__proto__=t,e},o(t,n)}e.exports=o},function(e,t,n){var r=n(8),o=n(227);r({target:"Object",stat:!0,forced:Object.assign!==o},{assign:o})},function(e,t,n){"use strict";var r=n(28),o=n(25),i=n(56),a=n(93),s=n(74),c=n(37),u=n(65),l=Object.assign;e.exports=!l||o(function(){var e={},t={},n=Symbol();return e[n]=7,"abcdefghijklmnopqrst".split("").forEach(function(e){t[e]=e}),7!=l({},e)[n]||"abcdefghijklmnopqrst"!=i(l({},t)).join("")})?function(e,t){for(var n=c(e),o=arguments.length,l=1,d=a.f,f=s.f;o>l;)for(var p,h=u(arguments[l++]),m=d?i(h).concat(d(h)):i(h),v=m.length,y=0;v>y;)p=m[y++],r&&!f.call(h,p)||(n[p]=h[p]);return n}:l},function(e,t,n){e.exports=n(274)},function(e,t,n){var r=n(38);e.exports=function(e,t,n,o){try{return o?t(r(n)[0],n[1]):t(n)}catch(t){var i=e.return;throw void 0!==i&&r(i.call(e)),t}}},function(e,t,n){var r=n(23),o=n(45),i=r("iterator"),a=Array.prototype;e.exports=function(e){return void 0!==e&&(o.Array===e||a[i]===e)}},function(e,t,n){e.exports=n(295)},function(e,t,n){e.exports=n(233)},function(e,t,n){var r=n(234),o=Array.prototype;e.exports=function(e){var t=e.reduce;return e===o||e instanceof Array&&t===o.reduce?r:t}},function(e,t,n){n(235);var r=n(32);e.exports=r("Array").reduce},function(e,t,n){"use strict";var r=n(8),o=n(142).left;r({target:"Array",proto:!0,forced:n(78)("reduce")},{reduce:function(e){return o(this,e,arguments.length,arguments.length>1?arguments[1]:void 0)}})},function(e,t,n){var r=n(57),o=n(29),i=n(33),a=n(34).f,s=n(77),c=n(318),u=s("meta"),l=0,d=Object.isExtensible||function(){return!0},f=function(e){a(e,u,{value:{objectID:"O"+ ++l,weakData:{}}})},p=e.exports={REQUIRED:!1,fastKey:function(e,t){if(!o(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!i(e,u)){if(!d(e))return"F";if(!t)return"E";f(e)}return e[u].objectID},getWeakData:function(e,t){if(!i(e,u)){if(!d(e))return!0;if(!t)return!1;f(e)}return e[u].weakData},onFreeze:function(e){return c&&p.REQUIRED&&d(e)&&!i(e,u)&&f(e),e}};r[u]=!0},function(e,t,n){e.exports=n(238)},function(e,t,n){n(239);var r=n(18);e.exports=r.parseInt},function(e,t,n){var r=n(8),o=n(240);r({global:!0,forced:parseInt!=o},{parseInt:o})},function(e,t,n){var r=n(27),o=n(241).trim,i=n(125),a=r.parseInt,s=/^[+-]?0[Xx]/,c=8!==a(i+"08")||22!==a(i+"0x16");e.exports=c?function(e,t){var n=o(String(e));return a(n,t>>>0||(s.test(n)?16:10))}:a},function(e,t,n){var r=n(55),o="["+n(125)+"]",i=RegExp("^"+o+o+"*"),a=RegExp(o+o+"*$"),s=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(i,"")),2&e&&(n=n.replace(a,"")),n}};e.exports={start:s(1),end:s(2),trim:s(3)}},function(e,t,n){"use strict";var r=n(67),o=function(e){var t,n;this.promise=new e(function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r}),this.resolve=r(t),this.reject=r(n)};e.exports.f=function(e){return new o(e)}},function(e,t,n){e.exports=n(313)},function(e,t,n){e.exports=n(441)},,function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Overlay-absolute-center",overlay:"onfido-sdk-ui-Overlay-overlay",rectangle:"onfido-sdk-ui-Overlay-rectangle",face:"onfido-sdk-ui-Overlay-face",isWithoutHole:"onfido-sdk-ui-Overlay-isWithoutHole"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-CameraError-absolute-center",uploadFallback:"onfido-sdk-ui-CameraError-uploadFallback",errorContainer:"onfido-sdk-ui-CameraError-errorContainer",errorContainerType:"onfido-sdk-ui-CameraError-errorContainerType",errorHasBackdrop:"onfido-sdk-ui-CameraError-errorHasBackdrop",errorMessage:"onfido-sdk-ui-CameraError-errorMessage"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Camera-absolute-center",step:"onfido-sdk-ui-Camera-step",fullScreenStep:"onfido-sdk-ui-Camera-fullScreenStep",fullHeightContainer:"onfido-sdk-ui-Camera-fullHeightContainer",fullHeightMobileContainer:"onfido-sdk-ui-Camera-fullHeightMobileContainer",navigationBar:"onfido-sdk-ui-Camera-navigationBar",content:"onfido-sdk-ui-Camera-content",scrollableContent:"onfido-sdk-ui-Camera-scrollableContent",fullScreenContentWrapper:"onfido-sdk-ui-Camera-fullScreenContentWrapper",footer:"onfido-sdk-ui-Camera-footer",thickWrapper:"onfido-sdk-ui-Camera-thickWrapper","mbottom-large":"onfido-sdk-ui-Camera-mbottom-large",center:"onfido-sdk-ui-Camera-center",icon:"onfido-sdk-ui-Camera-icon",header:"onfido-sdk-ui-Camera-header",help:"onfido-sdk-ui-Camera-help",helpList:"onfido-sdk-ui-Camera-helpList",link:"onfido-sdk-ui-Camera-link",warning:"onfido-sdk-ui-Camera-warning",error:"onfido-sdk-ui-Camera-error",camera:"onfido-sdk-ui-Camera-camera",container:"onfido-sdk-ui-Camera-container",overlay:"onfido-sdk-ui-Camera-overlay",video:"onfido-sdk-ui-Camera-video",webcamContainer:"onfido-sdk-ui-Camera-webcamContainer"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-ProofOfAddress-PoAIntro-absolute-center",content:"onfido-sdk-ui-ProofOfAddress-PoAIntro-content",requirements:"onfido-sdk-ui-ProofOfAddress-PoAIntro-requirements",requirement:"onfido-sdk-ui-ProofOfAddress-PoAIntro-requirement",bolder:"onfido-sdk-ui-ProofOfAddress-PoAIntro-bolder"}},function(e,t,n){var r=n(275),o=Array.prototype;e.exports=function(e){var t=e.indexOf;return e===o||e instanceof Array&&t===o.indexOf?r:t}},function(e,t,n){n(71),n(283);var r=n(18);e.exports=r.Array.from},function(e,t,n){var r=n(23)("iterator"),o=!1;try{var i=0,a={next:function(){return{done:!!i++}},return:function(){o=!0}};a[r]=function(){return this},Array.from(a,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!o)return!1;var n=!1;try{var i={};i[r]=function(){return{next:function(){return{done:n=!0}}}},e(i)}catch(e){}return n}},function(e,t,n){n(296);var r=n(18);e.exports=r.Array.isArray},function(e,t,n){e.exports=n(298)},function(e,t,n){var r=n(87);e.exports=function(e,t,n){for(var o in t)n&&n.unsafe&&e[o]?e[o]=t[o]:r(e,o,t[o],n);return e}},function(e,t,n){"use strict";var r=n(75),o=n(34),i=n(23),a=n(28),s=i("species");e.exports=function(e){var t=r(e),n=o.f;a&&t&&!t[s]&&n(t,s,{configurable:!0,get:function(){return this}})}},function(e,t){t.encode=function(e){var t="";for(var n in e)e.hasOwnProperty(n)&&(t.length&&(t+="&"),t+=encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t},t.decode=function(e){for(var t={},n=e.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");t[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return t}},function(e,t){e.exports=function(e,t){var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e,t){e.exports=function(e){try{return{error:!1,value:e()}}catch(e){return{error:!0,value:e}}}},function(e,t,n){e.exports=n(514)},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Capture-absolute-center",documentContainer:"onfido-sdk-ui-Capture-documentContainer",faceContainer:"onfido-sdk-ui-Capture-faceContainer"}},function(e,t,n){e.exports=n(504)},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-crossDevice-MobileConnected-absolute-center",icon:"onfido-sdk-ui-crossDevice-MobileConnected-icon",cancel:"onfido-sdk-ui-crossDevice-MobileConnected-cancel"}},function(e,t,n){e.exports=n(265)},function(e,t,n){var r=n(266),o=Array.prototype;e.exports=function(e){var t=e.find;return e===o||e instanceof Array&&t===o.find?r:t}},function(e,t,n){n(267);var r=n(32);e.exports=r("Array").find},function(e,t,n){"use strict";var r=n(8),o=n(47).find,i=n(97),a=!0;"find"in[]&&Array(1).find(function(){a=!1}),r({target:"Array",proto:!0,forced:a},{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),i("find")},function(e,t,n){e.exports=n(269)},function(e,t,n){var r=n(270),o=Array.prototype;e.exports=function(e){var t=e.map;return e===o||e instanceof Array&&t===o.map?r:t}},function(e,t,n){n(271);var r=n(32);e.exports=r("Array").map},function(e,t,n){"use strict";var r=n(8),o=n(47).map;r({target:"Array",proto:!0,forced:!n(79)("map")},{map:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},function(e,t,n){e.exports=n(273)},function(e,t,n){e.exports=n(141)},function(e,t,n){e.exports=n(250)},function(e,t,n){n(276);var r=n(32);e.exports=r("Array").indexOf},function(e,t,n){"use strict";var r=n(8),o=n(103).indexOf,i=n(78),a=[].indexOf,s=!!a&&1/[1].indexOf(1,-0)<0,c=i("indexOf");r({target:"Array",proto:!0,forced:s||c},{indexOf:function(e){return s?a.apply(this,arguments)||0:o(this,e,arguments.length>1?arguments[1]:void 0)}})},function(e,t,n){e.exports=n(278)},function(e,t,n){e.exports=n(130)},function(e,t,n){var r=n(228),o=n(280);e.exports=function(e,t){if(null==e)return{};var n,i,a={},s=o(e);for(i=0;i<s.length;i++)n=s[i],r(t).call(t,n)>=0||(a[n]=e[n]);return a}},function(e,t,n){e.exports=n(281)},function(e,t,n){e.exports=n(131)},function(e,t,n){var r=n(412),o=n(417),i=n(419),a="[object Object]",s=Function.prototype,c=Object.prototype,u=s.toString,l=c.hasOwnProperty,d=u.call(Object);e.exports=function(e){if(!i(e)||r(e)!=a)return!1;var t=o(e);if(null===t)return!0;var n=l.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&u.call(n)==d}},function(e,t,n){var r=n(8),o=n(284);r({target:"Array",stat:!0,forced:!n(252)(function(e){Array.from(e)})},{from:o})},function(e,t,n){"use strict";var r=n(61),o=n(37),i=n(229),a=n(230),s=n(43),c=n(76),u=n(132);e.exports=function(e){var t,n,l,d,f=o(e),p="function"==typeof this?this:Array,h=arguments.length,m=h>1?arguments[1]:void 0,v=void 0!==m,y=0,g=u(f);if(v&&(m=r(m,h>2?arguments[2]:void 0,2)),null==g||p==Array&&a(g))for(n=new p(t=s(f.length));t>y;y++)c(n,y,v?m(f[y],y):f[y]);else for(d=g.call(f),n=new p;!(l=d.next()).done;y++)c(n,y,v?i(d,m,[l.value,y],!0):l.value);return n.length=y,n}},function(e,t,n){e.exports=n(286)},function(e,t,n){var r=n(287),o=n(289),i=Array.prototype,a=String.prototype;e.exports=function(e){var t=e.includes;return e===i||e instanceof Array&&t===i.includes?r:"string"==typeof e||e===a||e instanceof String&&t===a.includes?o:t}},function(e,t,n){n(288);var r=n(32);e.exports=r("Array").includes},function(e,t,n){"use strict";var r=n(8),o=n(103).includes,i=n(97);r({target:"Array",proto:!0},{includes:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),i("includes")},function(e,t,n){n(290);var r=n(32);e.exports=r("String").includes},function(e,t,n){"use strict";var r=n(8),o=n(291),i=n(55);r({target:"String",proto:!0,forced:!n(293)("includes")},{includes:function(e){return!!~String(i(this)).indexOf(o(e),arguments.length>1?arguments[1]:void 0)}})},function(e,t,n){var r=n(292);e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},function(e,t,n){var r=n(29),o=n(54),i=n(23)("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==o(e))}},function(e,t,n){var r=n(23)("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,"/./"[e](t)}catch(e){}}return!1}},function(e,t,n){var r=n(231);e.exports=function(e){if(r(e))return e}},function(e,t,n){e.exports=n(253)},function(e,t,n){n(8)({target:"Array",stat:!0},{isArray:n(63)})},function(e,t,n){var r=n(254);e.exports=function(e,t){var n=[],o=!0,i=!1,a=void 0;try{for(var s,c=r(e);!(o=(s=c.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(e){i=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(i)throw a}}return n}},function(e,t,n){n(62),n(71),e.exports=n(299)},function(e,t,n){var r=n(38),o=n(132);e.exports=function(e){var t=o(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return r(t.call(e))}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}},function(e,t,n){var r=n(231);e.exports=function(e){if(r(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}},function(e,t,n){var r=n(303),o=n(305);e.exports=function(e){if(o(Object(e))||"[object Arguments]"===Object.prototype.toString.call(e))return r(e)}},function(e,t,n){e.exports=n(304)},function(e,t,n){e.exports=n(251)},function(e,t,n){e.exports=n(306)},function(e,t,n){n(62),n(71),e.exports=n(307)},function(e,t,n){var r=n(86),o=n(23),i=n(45),a=o("iterator");e.exports=function(e){var t=Object(e);return void 0!==t[a]||"@@iterator"in t||i.hasOwnProperty(r(t))}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},function(e,t,n){e.exports=n(310)},function(e,t,n){n(311);var r=n(18);e.exports=r.Object.entries},function(e,t,n){var r=n(8),o=n(312).entries;r({target:"Object",stat:!0},{entries:function(e){return o(e)}})},function(e,t,n){var r=n(28),o=n(56),i=n(35),a=n(74).f,s=function(e){return function(t){for(var n,s=i(t),c=o(s),u=c.length,l=0,d=[];u>l;)n=c[l++],r&&!a.call(s,n)||d.push(e?[n,s[n]]:s[n]);return d}};e.exports={entries:s(!0),values:s(!1)}},function(e,t,n){e.exports=n(141)},function(e,t,n){e.exports=n(315)},function(e,t,n){n(316),n(122),n(71),n(62);var r=n(18);e.exports=r.Set},function(e,t,n){"use strict";var r=n(317),o=n(319);e.exports=r("Set",function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}},o)},function(e,t,n){"use strict";var r=n(8),o=n(27),i=n(236),a=n(25),s=n(31),c=n(106),u=n(143),l=n(29),d=n(46),f=n(34).f,p=n(47).forEach,h=n(28),m=n(58),v=m.set,y=m.getterFor;e.exports=function(e,t,n,m,g){var b,$=o[e],_=$&&$.prototype,k=m?"set":"add",w={};if(h&&"function"==typeof $&&(g||_.forEach&&!a(function(){(new $).entries().next()}))){b=t(function(t,n){v(u(t,b,e),{type:e,collection:new $}),null!=n&&c(n,t[k],t,m)});var C=y(e);p(["add","clear","delete","forEach","get","has","set","keys","values","entries"],function(e){var t="add"==e||"set"==e;e in _&&(!g||"clear"!=e)&&s(b.prototype,e,function(n,r){var o=C(this).collection;if(!t&&g&&!l(n))return"get"==e&&void 0;var i=o[e](0===n?0:n,r);return t?this:i})}),g||f(b.prototype,"size",{get:function(){return C(this).collection.size}})}else b=n.getConstructor(t,e,m,k),i.REQUIRED=!0;return d(b,e,!1,!0),w[e]=b,r({global:!0,forced:!0},w),g||n.setStrong(b,e,m),b}},function(e,t,n){var r=n(25);e.exports=!r(function(){return Object.isExtensible(Object.preventExtensions({}))})},function(e,t,n){"use strict";var r=n(34).f,o=n(70),i=n(255),a=n(61),s=n(143),c=n(106),u=n(98),l=n(256),d=n(28),f=n(236).fastKey,p=n(58),h=p.set,m=p.getterFor;e.exports={getConstructor:function(e,t,n,u){var l=e(function(e,r){s(e,l,t),h(e,{type:t,index:o(null),first:void 0,last:void 0,size:0}),d||(e.size=0),null!=r&&c(r,e[u],e,n)}),p=m(t),v=function(e,t,n){var r,o,i=p(e),a=y(e,t);return a?a.value=n:(i.last=a={index:o=f(t,!0),key:t,value:n,previous:r=i.last,next:void 0,removed:!1},i.first||(i.first=a),r&&(r.next=a),d?i.size++:e.size++,"F"!==o&&(i.index[o]=a)),e},y=function(e,t){var n,r=p(e),o=f(t);if("F"!==o)return r.index[o];for(n=r.first;n;n=n.next)if(n.key==t)return n};return i(l.prototype,{clear:function(){for(var e=p(this),t=e.index,n=e.first;n;)n.removed=!0,n.previous&&(n.previous=n.previous.next=void 0),delete t[n.index],n=n.next;e.first=e.last=void 0,d?e.size=0:this.size=0},delete:function(e){var t=p(this),n=y(this,e);if(n){var r=n.next,o=n.previous;delete t.index[n.index],n.removed=!0,o&&(o.next=r),r&&(r.previous=o),t.first==n&&(t.first=r),t.last==n&&(t.last=o),d?t.size--:this.size--}return!!n},forEach:function(e){for(var t,n=p(this),r=a(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.next:n.first;)for(r(t.value,t.key,this);t&&t.removed;)t=t.previous},has:function(e){return!!y(this,e)}}),i(l.prototype,n?{get:function(e){var t=y(this,e);return t&&t.value},set:function(e,t){return v(this,0===e?0:e,t)}}:{add:function(e){return v(this,e=0===e?0:e,e)}}),d&&r(l.prototype,"size",{get:function(){return p(this).size}}),l},setStrong:function(e,t,n){var r=t+" Iterator",o=m(t),i=m(r);u(e,t,function(e,t){h(this,{type:r,target:e,state:o(e),kind:t,last:void 0})},function(){for(var e=i(this),t=e.kind,n=e.last;n&&n.removed;)n=n.previous;return e.target&&(e.last=n=n?n.next:e.state.first)?"keys"==t?{value:n.key,done:!1}:"values"==t?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})},n?"entries":"values",!n,!0),l(t)}}},function(e,t,n){"use strict";var r=Function.prototype.toString,o=/^\s*class\b/,i=function(e){try{var t=r.call(e);return o.test(t)}catch(e){return!1}},a=Object.prototype.toString,s="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;e.exports=function(e){if(!e)return!1;if("function"!=typeof e&&"object"!=typeof e)return!1;if("function"==typeof e&&!e.prototype)return!0;if(s)return function(e){try{return!i(e)&&(r.call(e),!0)}catch(e){return!1}}(e);if(i(e))return!1;var t=a.call(e);return"[object Function]"===t||"[object GeneratorFunction]"===t}},function(e,t,n){"use strict";e.exports=function(){}},function(e,t,n){"use strict";var r=n(323);e.exports=r.call(Function.call,Object.prototype.hasOwnProperty)},function(e,t,n){"use strict";var r=n(447);e.exports=Function.prototype.bind||r},function(e,t,n){e.exports=n(325)},function(e,t,n){var r=n(18),o=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},function(e,t,n){var r=n(75);e.exports=r("navigator","userAgent")||""},function(e,t,n){var r=n(107)("socket.io-parser"),o=n(144),i=n(478),a=n(328),s=n(362);function c(){}t.protocol=4,t.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],t.CONNECT=0,t.DISCONNECT=1,t.EVENT=2,t.ACK=3,t.ERROR=4,t.BINARY_EVENT=5,t.BINARY_ACK=6,t.Encoder=c,t.Decoder=d;var u=t.ERROR+'"encode error"';function l(e){var n=""+e.type;if(t.BINARY_EVENT!==e.type&&t.BINARY_ACK!==e.type||(n+=e.attachments+"-"),e.nsp&&"/"!==e.nsp&&(n+=e.nsp+","),null!=e.id&&(n+=e.id),null!=e.data){var o=function(e){try{return JSON.stringify(e)}catch(e){return!1}}(e.data);if(!1===o)return u;n+=o}return r("encoded %j as %s",e,n),n}function d(){this.reconstructor=null}function f(e){this.reconPack=e,this.buffers=[]}function p(e){return{type:t.ERROR,data:"parser error: "+e}}c.prototype.encode=function(e,n){(r("encoding packet %j",e),t.BINARY_EVENT===e.type||t.BINARY_ACK===e.type)?function(e,t){i.removeBlobs(e,function(e){var n=i.deconstructPacket(e),r=l(n.packet),o=n.buffers;o.unshift(r),t(o)})}(e,n):n([l(e)])},o(d.prototype),d.prototype.add=function(e){var n;if("string"==typeof e)n=function(e){var n=0,o={type:Number(e.charAt(0))};if(null==t.types[o.type])return p("unknown packet type "+o.type);if(t.BINARY_EVENT===o.type||t.BINARY_ACK===o.type){for(var i="";"-"!==e.charAt(++n)&&(i+=e.charAt(n),n!=e.length););if(i!=Number(i)||"-"!==e.charAt(n))throw new Error("Illegal attachments");o.attachments=Number(i)}if("/"===e.charAt(n+1))for(o.nsp="";++n;){if(","===(c=e.charAt(n)))break;if(o.nsp+=c,n===e.length)break}else o.nsp="/";var s=e.charAt(n+1);if(""!==s&&Number(s)==s){for(o.id="";++n;){var c;if(null==(c=e.charAt(n))||Number(c)!=c){--n;break}if(o.id+=e.charAt(n),n===e.length)break}o.id=Number(o.id)}if(e.charAt(++n)){var u=function(e){try{return JSON.parse(e)}catch(e){return!1}}(e.substr(n));if(!(!1!==u&&(o.type===t.ERROR||a(u))))return p("invalid payload");o.data=u}return r("decoded %s as %j",e,o),o}(e),t.BINARY_EVENT===n.type||t.BINARY_ACK===n.type?(this.reconstructor=new f(n),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",n)):this.emit("decoded",n);else{if(!s(e)&&!e.base64)throw new Error("Unknown type: "+e);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(n=this.reconstructor.takeBinaryData(e))&&(this.reconstructor=null,this.emit("decoded",n))}},d.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},f.prototype.takeBinaryData=function(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){var t=i.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null},f.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},function(e,t){var n={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},function(e,t,n){var r=n(481);e.exports=function(e){var t=e.xdomain,n=e.xscheme,o=e.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!t||r))return new XMLHttpRequest}catch(e){}try{if("undefined"!=typeof XDomainRequest&&!n&&o)return new XDomainRequest}catch(e){}if(!t)try{return new(self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(e){}}},function(e,t,n){var r=n(145),o=n(144);function i(e){this.path=e.path,this.hostname=e.hostname,this.port=e.port,this.secure=e.secure,this.query=e.query,this.timestampParam=e.timestampParam,this.timestampRequests=e.timestampRequests,this.readyState="",this.agent=e.agent||!1,this.socket=e.socket,this.enablesXDR=e.enablesXDR,this.pfx=e.pfx,this.key=e.key,this.passphrase=e.passphrase,this.cert=e.cert,this.ca=e.ca,this.ciphers=e.ciphers,this.rejectUnauthorized=e.rejectUnauthorized,this.forceNode=e.forceNode,this.isReactNative=e.isReactNative,this.extraHeaders=e.extraHeaders,this.localAddress=e.localAddress}e.exports=i,o(i.prototype),i.prototype.onError=function(e,t){var n=new Error(e);return n.type="TransportError",n.description=t,this.emit("error",n),this},i.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},i.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},i.prototype.send=function(e){if("open"!==this.readyState)throw new Error("Transport not open");this.write(e)},i.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},i.prototype.onData=function(e){var t=r.decodePacket(e,this.socket.binaryType);this.onPacket(t)},i.prototype.onPacket=function(e){this.emit("packet",e)},i.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},function(e,t,n){(function(t){var r=n(372),o="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{};function i(e){return void 0===e}function a(e){return"[object Object]"===Object.prototype.toString.call(e)}function s(e){return"[object String]"===Object.prototype.toString.call(e)}function c(e){return"[object Array]"===Object.prototype.toString.call(e)}function u(){if(!("fetch"in o))return!1;try{return new Headers,new Request(""),new Response,!0}catch(e){return!1}}function l(e,t){var n,r;if(i(e.length))for(n in e)f(e,n)&&t.call(null,n,e[n]);else if(r=e.length)for(n=0;n<r;n++)t.call(null,n,e[n])}function d(e,t){if("number"!=typeof t)throw new Error("2nd argument to `truncate` function should be a number");return"string"!=typeof e||0===t?e:e.length<=t?e:e.substr(0,t)+"…"}function f(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function p(e){for(var t,n=[],r=0,o=e.length;r<o;r++)s(t=e[r])?n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):t&&t.source&&n.push(t.source);return new RegExp(n.join("|"),"i")}function h(e){var t,n,r,o,i,a=[];if(!e||!e.tagName)return"";if(a.push(e.tagName.toLowerCase()),e.id&&a.push("#"+e.id),(t=e.className)&&s(t))for(n=t.split(/\s+/),i=0;i<n.length;i++)a.push("."+n[i]);var c=["type","name","title","alt"];for(i=0;i<c.length;i++)r=c[i],(o=e.getAttribute(r))&&a.push("["+r+'="'+o+'"]');return a.join("")}function m(e,t){return!!(!!e^!!t)}function v(e,t){if(m(e,t))return!1;var n,r,o=e.frames,i=t.frames;if(void 0===o||void 0===i)return!1;if(o.length!==i.length)return!1;for(var a=0;a<o.length;a++)if(n=o[a],r=i[a],n.filename!==r.filename||n.lineno!==r.lineno||n.colno!==r.colno||n.function!==r.function)return!1;return!0}var y=3,g=51200,b=40;function $(e){return function(e){return~-encodeURI(e).split(/%..|./).length}(JSON.stringify(e))}function _(e){if("string"==typeof e){return d(e,40)}if("number"==typeof e||"boolean"==typeof e||void 0===e)return e;var t=Object.prototype.toString.call(e);return"[object Object]"===t?"[Object]":"[object Array]"===t?"[Array]":"[object Function]"===t?e.name?"[Function: "+e.name+"]":"[Function]":e}e.exports={isObject:function(e){return"object"==typeof e&&null!==e},isError:function(e){switch(Object.prototype.toString.call(e)){case"[object Error]":case"[object Exception]":case"[object DOMException]":return!0;default:return e instanceof Error}},isErrorEvent:function(e){return"[object ErrorEvent]"===Object.prototype.toString.call(e)},isDOMError:function(e){return"[object DOMError]"===Object.prototype.toString.call(e)},isDOMException:function(e){return"[object DOMException]"===Object.prototype.toString.call(e)},isUndefined:i,isFunction:function(e){return"function"==typeof e},isPlainObject:a,isString:s,isArray:c,isEmptyObject:function(e){if(!a(e))return!1;for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},supportsErrorEvent:function(){try{return new ErrorEvent(""),!0}catch(e){return!1}},supportsDOMError:function(){try{return new DOMError(""),!0}catch(e){return!1}},supportsDOMException:function(){try{return new DOMException(""),!0}catch(e){return!1}},supportsFetch:u,supportsReferrerPolicy:function(){if(!u())return!1;try{return new Request("pickleRick",{referrerPolicy:"origin"}),!0}catch(e){return!1}},supportsPromiseRejectionEvent:function(){return"function"==typeof PromiseRejectionEvent},wrappedCallback:function(e){return function(t,n){var r=e(t)||t;return n&&n(r)||r}},each:l,objectMerge:function(e,t){return t?(l(t,function(t,n){e[t]=n}),e):e},truncate:d,objectFrozen:function(e){return!!Object.isFrozen&&Object.isFrozen(e)},hasKey:f,joinRegExp:p,urlencode:function(e){var t=[];return l(e,function(e,n){t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))}),t.join("&")},uuid4:function(){var e=o.crypto||o.msCrypto;if(!i(e)&&e.getRandomValues){var t=new Uint16Array(8);e.getRandomValues(t),t[3]=4095&t[3]|16384,t[4]=16383&t[4]|32768;var n=function(e){for(var t=e.toString(16);t.length<4;)t="0"+t;return t};return n(t[0])+n(t[1])+n(t[2])+n(t[3])+n(t[4])+n(t[5])+n(t[6])+n(t[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})},htmlTreeAsString:function(e){for(var t,n=[],r=0,o=0,i=" > ".length;e&&r++<5&&!("html"===(t=h(e))||r>1&&o+n.length*i+t.length>=80);)n.push(t),o+=t.length,e=e.parentNode;return n.reverse().join(" > ")},htmlElementAsString:h,isSameException:function(e,t){return!m(e,t)&&(e=e.values[0],t=t.values[0],e.type===t.type&&e.value===t.value&&(n=e.stacktrace,r=t.stacktrace,(!i(n)||!i(r))&&v(e.stacktrace,t.stacktrace)));var n,r},isSameStacktrace:v,parseUrl:function(e){if("string"!=typeof e)return{};var t=e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),n=t[6]||"",r=t[8]||"";return{protocol:t[2],host:t[4],path:t[5],relative:t[5]+n+r}},fill:function(e,t,n,r){if(null!=e){var o=e[t];e[t]=n(o),e[t].__raven__=!0,e[t].__orig__=o,r&&r.push([e,t,o])}},safeJoin:function(e,t){if(!c(e))return"";for(var n=[],r=0;r<e.length;r++)try{n.push(String(e[r]))}catch(e){n.push("[value cannot be serialized]")}return n.join(t)},serializeException:function e(t,n,o){if(!a(t))return t;o="number"!=typeof(n="number"!=typeof n?y:n)?g:o;var i=function e(t,n){return 0===n?_(t):a(t)?Object.keys(t).reduce(function(r,o){return r[o]=e(t[o],n-1),r},{}):Array.isArray(t)?t.map(function(t){return e(t,n-1)}):_(t)}(t,n);return $(r(i))>o?e(t,n-1):i},serializeKeysForMessage:function(e,t){if("number"==typeof e||"string"==typeof e)return e.toString();if(!Array.isArray(e))return"";if(0===(e=e.filter(function(e){return"string"==typeof e})).length)return"[object has no keys]";if(t="number"!=typeof t?b:t,e[0].length>=t)return e[0];for(var n=e.length;n>0;n--){var r=e.slice(0,n).join(", ");if(!(r.length>t))return n===e.length?r:r+"…"}return""},sanitize:function(e,t){if(!c(t)||c(t)&&0===t.length)return e;var n,o=p(t),i="********";try{n=JSON.parse(r(e))}catch(t){return e}return function e(t){return c(t)?t.map(function(t){return e(t)}):a(t)?Object.keys(t).reduce(function(n,r){return o.test(r)?n[r]=i:n[r]=e(t[r]),n},{}):t}(n)}}}).call(this,n(83))},,,,,function(e,t,n){e.exports=n(513)},function(e,t,n){"use strict";var r=n(446),o=n(321),i=n(322),a=n(448),s=function(e){o(!1,e)},c=String.prototype.replace,u=String.prototype.split,l="||||",d=function(e){var t=e%100,n=t%10;return 11!==t&&1===n?0:2<=n&&n<=4&&!(t>=12&&t<=14)?1:2},f={arabic:function(e){if(e<3)return e;var t=e%100;return t>=3&&t<=10?3:t>=11?4:5},bosnian_serbian:d,chinese:function(){return 0},croatian:d,french:function(e){return e>1?1:0},german:function(e){return 1!==e?1:0},russian:d,lithuanian:function(e){return e%10==1&&e%100!=11?0:e%10>=2&&e%10<=9&&(e%100<11||e%100>19)?1:2},czech:function(e){return 1===e?0:e>=2&&e<=4?1:2},polish:function(e){if(1===e)return 0;var t=e%10;return 2<=t&&t<=4&&(e%100<10||e%100>=20)?1:2},icelandic:function(e){return e%10!=1||e%100==11?1:0},slovenian:function(e){var t=e%100;return 1===t?0:2===t?1:3===t||4===t?2:3}},p={arabic:["ar"],bosnian_serbian:["bs-Latn-BA","bs-Cyrl-BA","srl-RS","sr-RS"],chinese:["id","id-ID","ja","ko","ko-KR","lo","ms","th","th-TH","zh"],croatian:["hr","hr-HR"],german:["fa","da","de","en","es","fi","el","he","hi-IN","hu","hu-HU","it","nl","no","pt","sv","tr"],french:["fr","tl","pt-br"],russian:["ru","ru-RU"],lithuanian:["lt"],czech:["cs","cs-CZ","sk"],polish:["pl"],icelandic:["is"],slovenian:["sl-SL"]};function h(e){var t,n=(t={},r(p,function(e,n){r(e,function(e){t[e]=n})}),t);return n[e]||n[u.call(e,/-/,1)[0]]||n.en}function m(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var v=/%\{(.*?)\}/g;function y(e,t,n,r){if("string"!=typeof e)throw new TypeError("Polyglot.transformPhrase expects argument #1 to be string");if(null==t)return e;var o=e,s=r||v,d="number"==typeof t?{smart_count:t}:t;if(null!=d.smart_count&&o){var p=u.call(o,l);o=a(p[function(e,t){return f[h(e)](t)}(n||"en",d.smart_count)]||p[0])}return o=c.call(o,s,function(e,t){return i(d,t)&&null!=d[t]?d[t]:e})}function g(e){var t=e||{};this.phrases={},this.extend(t.phrases||{}),this.currentLocale=t.locale||"en";var n=t.allowMissing?y:null;this.onMissingKey="function"==typeof t.onMissingKey?t.onMissingKey:n,this.warn=t.warn||s,this.tokenRegex=function(e){var t=e&&e.prefix||"%{",n=e&&e.suffix||"}";if(t===l||n===l)throw new RangeError('"'+l+'" token is reserved for pluralization');return new RegExp(m(t)+"(.*?)"+m(n),"g")}(t.interpolation)}g.prototype.locale=function(e){return e&&(this.currentLocale=e),this.currentLocale},g.prototype.extend=function(e,t){r(e,function(e,n){var r=t?t+"."+n:n;"object"==typeof e?this.extend(e,r):this.phrases[r]=e},this)},g.prototype.unset=function(e,t){"string"==typeof e?delete this.phrases[e]:r(e,function(e,n){var r=t?t+"."+n:n;"object"==typeof e?this.unset(e,r):delete this.phrases[r]},this)},g.prototype.clear=function(){this.phrases={}},g.prototype.replace=function(e){this.clear(),this.extend(e)},g.prototype.t=function(e,t){var n,r,o=null==t?{}:t;if("string"==typeof this.phrases[e])n=this.phrases[e];else if("string"==typeof o._)n=o._;else if(this.onMissingKey){r=(0,this.onMissingKey)(e,o,this.currentLocale,this.tokenRegex)}else this.warn('Missing translation for key: "'+e+'"'),r=e;return"string"==typeof n&&(r=y(n,o,this.currentLocale,this.tokenRegex)),r},g.prototype.has=function(e){return i(this.phrases,e)},g.transformPhrase=function(e,t,n){return y(e,t,n)},e.exports=g},function(e,t,n){(function(t){var r=n(494),o="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{},i=o.Raven,a=new r;a.noConflict=function(){return o.Raven=i,a},a.afterLoad(),e.exports=a,e.exports.Client=r}).call(this,n(83))},function(e,t,n){e.exports={container:"onfido-sdk-ui-CustomFileInput-container",input:"onfido-sdk-ui-CustomFileInput-input"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Photo-absolute-center",actions:"onfido-sdk-ui-Photo-actions",btn:"onfido-sdk-ui-Photo-btn"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Spinner-absolute-center",loader:"onfido-sdk-ui-Spinner-loader",inner:"onfido-sdk-ui-Spinner-inner","ball-scale-ripple-multiple":"onfido-sdk-ui-Spinner-ball-scale-ripple-multiple"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Complete-absolute-center",wrapper:"onfido-sdk-ui-Complete-wrapper",icon:"onfido-sdk-ui-Complete-icon"}},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-crossDevice-ClientSuccess-absolute-center",icon:"onfido-sdk-ui-crossDevice-ClientSuccess-icon",text:"onfido-sdk-ui-crossDevice-ClientSuccess-text"}},,function(e,t,n){"use strict";t.__esModule=!0;var r,o=n(129),i=(r=o)&&r.__esModule?r:{default:r};t.default=i.default.shape({subscribe:i.default.func.isRequired,dispatch:i.default.func.isRequired,getState:i.default.func.isRequired})},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}},function(e,t,n){"use strict";t.__esModule=!0,t.ActionTypes=void 0,t.default=function e(t,n,i){var s;"function"==typeof n&&void 0===i&&(i=n,n=void 0);if(void 0!==i){if("function"!=typeof i)throw new Error("Expected the enhancer to be a function.");return i(e)(t,n)}if("function"!=typeof t)throw new Error("Expected the reducer to be a function.");var c=t;var u=n;var l=[];var d=l;var f=!1;function p(){d===l&&(d=l.slice())}function h(){return u}function m(e){if("function"!=typeof e)throw new Error("Expected listener to be a function.");var t=!0;return p(),d.push(e),function(){if(t){t=!1,p();var n=d.indexOf(e);d.splice(n,1)}}}function v(e){if(!(0,r.default)(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(f)throw new Error("Reducers may not dispatch actions.");try{f=!0,u=c(u,e)}finally{f=!1}for(var t=l=d,n=0;n<t.length;n++)t[n]();return e}v({type:a.INIT});return s={dispatch:v,subscribe:m,getState:h,replaceReducer:function(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");c=e,v({type:a.INIT})}},s[o.default]=function(){var e,t=m;return(e={subscribe:function(e){if("object"!=typeof e)throw new TypeError("Expected the observer to be an object.");function n(){e.next&&e.next(h())}return n(),{unsubscribe:t(n)}}})[o.default]=function(){return this},e},s};var r=i(n(282)),o=i(n(420));function i(e){return e&&e.__esModule?e:{default:e}}var a=t.ActionTypes={INIT:"@@redux/INIT"}},function(e,t,n){var r=n(413).Symbol;e.exports=r},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];if(0===t.length)return function(e){return e};var r=(o=t[t.length-1],i=t.slice(0,-1),{v:function(){return i.reduceRight(function(e,t){return t(e)},o.apply(void 0,arguments))}});if("object"==typeof r)return r.v;var o,i}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o,i,a,s){if(!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,r,o,i,a,s],l=0;(c=new Error(t.replace(/%s/g,function(){return u[l++]}))).name="Invariant Violation"}throw c.framesToPop=1,c}}},function(e,t,n){"use strict";
    /*!
     * Adapted from jQuery UI core
     *
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */function r(e,t){var n=e.nodeName.toLowerCase();return(/input|select|textarea|button|object/.test(n)?!e.disabled:"a"===n&&e.href||t)&&function(e){for(;e&&e!==document.body;){if((t=e).offsetWidth<=0&&t.offsetHeight<=0||"none"===t.style.display)return!1;e=e.parentNode}var t;return!0}(e)}e.exports=function(e){return[].slice.call(e.querySelectorAll("*"),0).filter(function(e){return function(e){var t=e.getAttribute("tabindex");null===t&&(t=void 0);var n=isNaN(t);return(n||t>=0)&&r(e,!n)}(e)})}},function(e,t,n){"use strict";var r="undefined"!=typeof document?document.body:null;function o(e){a(e),(e||r).setAttribute("aria-hidden","true")}function i(e){a(e),(e||r).removeAttribute("aria-hidden")}function a(e){if(!e&&!r)throw new Error("react-modal: You must set an element with `Modal.setAppElement(el)` to make this accessible")}t.toggle=function(e,t){e?o(t):i(t)},t.setElement=function(e){if("string"==typeof e){var t=document.querySelectorAll(e);e="length"in t?t[0]:t}return r=e||r},t.show=i,t.hide=o,t.resetForTesting=function(){r=document.body}},function(e,t,n){"use strict";var r=n(449),o="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),i=Object.prototype.toString,a=Array.prototype.concat,s=Object.defineProperty,c=s&&function(){var e={};try{for(var t in s(e,"x",{enumerable:!1,value:e}),e)return!1;return e.x===e}catch(e){return!1}}(),u=function(e,t,n,r){var o;t in e&&("function"!=typeof(o=r)||"[object Function]"!==i.call(o)||!r())||(c?s(e,t,{configurable:!0,enumerable:!1,value:n,writable:!0}):e[t]=n)},l=function(e,t){var n=arguments.length>2?arguments[2]:{},i=r(t);o&&(i=a.call(i,Object.getOwnPropertySymbols(t)));for(var s=0;s<i.length;s+=1)u(e,i[s],t[i[s]],n[i[s]])};l.supportsDescriptors=!!c,e.exports=l},function(e,t,n){"use strict";var r=Object.prototype.toString;e.exports=function(e){var t=r.call(e),n="[object Arguments]"===t;return n||(n="[object Array]"!==t&&null!==e&&"object"==typeof e&&"number"==typeof e.length&&e.length>=0&&"[object Function]"===r.call(e.callee)),n}},function(e,t,n){"use strict";var r=n(323),o=n(451),i=r.call(Function.call,String.prototype.replace),a=/^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/,s=/[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;e.exports=function(){var e=o.ToString(o.CheckObjectCoercible(this));return i(i(e,a,""),s,"")}},function(e,t,n){"use strict";var r=Object.getOwnPropertyDescriptor?function(){return Object.getOwnPropertyDescriptor(arguments,"callee").get}():function(){throw new TypeError},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator,i=Object.getPrototypeOf||function(e){return e.__proto__},a=void 0,s="undefined"==typeof Uint8Array?void 0:i(Uint8Array),c={"$ %Array%":Array,"$ %ArrayBuffer%":"undefined"==typeof ArrayBuffer?void 0:ArrayBuffer,"$ %ArrayBufferPrototype%":"undefined"==typeof ArrayBuffer?void 0:ArrayBuffer.prototype,"$ %ArrayIteratorPrototype%":o?i([][Symbol.iterator]()):void 0,"$ %ArrayPrototype%":Array.prototype,"$ %ArrayProto_entries%":Array.prototype.entries,"$ %ArrayProto_forEach%":Array.prototype.forEach,"$ %ArrayProto_keys%":Array.prototype.keys,"$ %ArrayProto_values%":Array.prototype.values,"$ %AsyncFromSyncIteratorPrototype%":void 0,"$ %AsyncFunction%":void 0,"$ %AsyncFunctionPrototype%":void 0,"$ %AsyncGenerator%":void 0,"$ %AsyncGeneratorFunction%":void 0,"$ %AsyncGeneratorPrototype%":void 0,"$ %AsyncIteratorPrototype%":a&&o&&Symbol.asyncIterator?a[Symbol.asyncIterator]():void 0,"$ %Atomics%":"undefined"==typeof Atomics?void 0:Atomics,"$ %Boolean%":Boolean,"$ %BooleanPrototype%":Boolean.prototype,"$ %DataView%":"undefined"==typeof DataView?void 0:DataView,"$ %DataViewPrototype%":"undefined"==typeof DataView?void 0:DataView.prototype,"$ %Date%":Date,"$ %DatePrototype%":Date.prototype,"$ %decodeURI%":decodeURI,"$ %decodeURIComponent%":decodeURIComponent,"$ %encodeURI%":encodeURI,"$ %encodeURIComponent%":encodeURIComponent,"$ %Error%":Error,"$ %ErrorPrototype%":Error.prototype,"$ %eval%":eval,"$ %EvalError%":EvalError,"$ %EvalErrorPrototype%":EvalError.prototype,"$ %Float32Array%":"undefined"==typeof Float32Array?void 0:Float32Array,"$ %Float32ArrayPrototype%":"undefined"==typeof Float32Array?void 0:Float32Array.prototype,"$ %Float64Array%":"undefined"==typeof Float64Array?void 0:Float64Array,"$ %Float64ArrayPrototype%":"undefined"==typeof Float64Array?void 0:Float64Array.prototype,"$ %Function%":Function,"$ %FunctionPrototype%":Function.prototype,"$ %Generator%":void 0,"$ %GeneratorFunction%":void 0,"$ %GeneratorPrototype%":void 0,"$ %Int8Array%":"undefined"==typeof Int8Array?void 0:Int8Array,"$ %Int8ArrayPrototype%":"undefined"==typeof Int8Array?void 0:Int8Array.prototype,"$ %Int16Array%":"undefined"==typeof Int16Array?void 0:Int16Array,"$ %Int16ArrayPrototype%":"undefined"==typeof Int16Array?void 0:Int8Array.prototype,"$ %Int32Array%":"undefined"==typeof Int32Array?void 0:Int32Array,"$ %Int32ArrayPrototype%":"undefined"==typeof Int32Array?void 0:Int32Array.prototype,"$ %isFinite%":isFinite,"$ %isNaN%":isNaN,"$ %IteratorPrototype%":o?i(i([][Symbol.iterator]())):void 0,"$ %JSON%":JSON,"$ %JSONParse%":JSON.parse,"$ %Map%":"undefined"==typeof Map?void 0:Map,"$ %MapIteratorPrototype%":"undefined"!=typeof Map&&o?i((new Map)[Symbol.iterator]()):void 0,"$ %MapPrototype%":"undefined"==typeof Map?void 0:Map.prototype,"$ %Math%":Math,"$ %Number%":Number,"$ %NumberPrototype%":Number.prototype,"$ %Object%":Object,"$ %ObjectPrototype%":Object.prototype,"$ %ObjProto_toString%":Object.prototype.toString,"$ %ObjProto_valueOf%":Object.prototype.valueOf,"$ %parseFloat%":parseFloat,"$ %parseInt%":parseInt,"$ %Promise%":"undefined"==typeof Promise?void 0:Promise,"$ %PromisePrototype%":"undefined"==typeof Promise?void 0:Promise.prototype,"$ %PromiseProto_then%":"undefined"==typeof Promise?void 0:Promise.prototype.then,"$ %Promise_all%":"undefined"==typeof Promise?void 0:Promise.all,"$ %Promise_reject%":"undefined"==typeof Promise?void 0:Promise.reject,"$ %Promise_resolve%":"undefined"==typeof Promise?void 0:Promise.resolve,"$ %Proxy%":"undefined"==typeof Proxy?void 0:Proxy,"$ %RangeError%":RangeError,"$ %RangeErrorPrototype%":RangeError.prototype,"$ %ReferenceError%":ReferenceError,"$ %ReferenceErrorPrototype%":ReferenceError.prototype,"$ %Reflect%":"undefined"==typeof Reflect?void 0:Reflect,"$ %RegExp%":RegExp,"$ %RegExpPrototype%":RegExp.prototype,"$ %Set%":"undefined"==typeof Set?void 0:Set,"$ %SetIteratorPrototype%":"undefined"!=typeof Set&&o?i((new Set)[Symbol.iterator]()):void 0,"$ %SetPrototype%":"undefined"==typeof Set?void 0:Set.prototype,"$ %SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?void 0:SharedArrayBuffer,"$ %SharedArrayBufferPrototype%":"undefined"==typeof SharedArrayBuffer?void 0:SharedArrayBuffer.prototype,"$ %String%":String,"$ %StringIteratorPrototype%":o?i(""[Symbol.iterator]()):void 0,"$ %StringPrototype%":String.prototype,"$ %Symbol%":o?Symbol:void 0,"$ %SymbolPrototype%":o?Symbol.prototype:void 0,"$ %SyntaxError%":SyntaxError,"$ %SyntaxErrorPrototype%":SyntaxError.prototype,"$ %ThrowTypeError%":r,"$ %TypedArray%":s,"$ %TypedArrayPrototype%":s?s.prototype:void 0,"$ %TypeError%":TypeError,"$ %TypeErrorPrototype%":TypeError.prototype,"$ %Uint8Array%":"undefined"==typeof Uint8Array?void 0:Uint8Array,"$ %Uint8ArrayPrototype%":"undefined"==typeof Uint8Array?void 0:Uint8Array.prototype,"$ %Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?void 0:Uint8ClampedArray,"$ %Uint8ClampedArrayPrototype%":"undefined"==typeof Uint8ClampedArray?void 0:Uint8ClampedArray.prototype,"$ %Uint16Array%":"undefined"==typeof Uint16Array?void 0:Uint16Array,"$ %Uint16ArrayPrototype%":"undefined"==typeof Uint16Array?void 0:Uint16Array.prototype,"$ %Uint32Array%":"undefined"==typeof Uint32Array?void 0:Uint32Array,"$ %Uint32ArrayPrototype%":"undefined"==typeof Uint32Array?void 0:Uint32Array.prototype,"$ %URIError%":URIError,"$ %URIErrorPrototype%":URIError.prototype,"$ %WeakMap%":"undefined"==typeof WeakMap?void 0:WeakMap,"$ %WeakMapPrototype%":"undefined"==typeof WeakMap?void 0:WeakMap.prototype,"$ %WeakSet%":"undefined"==typeof WeakSet?void 0:WeakSet,"$ %WeakSetPrototype%":"undefined"==typeof WeakSet?void 0:WeakSet.prototype};e.exports=function(e,t){if(arguments.length>1&&"boolean"!=typeof t)throw new TypeError('"allowMissing" argument must be a boolean');var n="$ "+e;if(!(n in c))throw new SyntaxError("intrinsic "+e+" does not exist!");if(void 0===c[n]&&!t)throw new TypeError("intrinsic "+e+" exists, but is not available. Please file an issue!");return c[n]}},function(e,t,n){"use strict";var r=n(356);e.exports=function(){return String.prototype.trim&&"​"==="​".trim()?String.prototype.trim:r}},function(e,t,n){var r=n(8),o=n(27),i=n(326),a=[].slice,s=function(e){return function(t,n){var r=arguments.length>2,o=r?a.call(arguments,2):void 0;return e(r?function(){("function"==typeof t?t:Function(t)).apply(this,o)}:t,n)}};r({global:!0,bind:!0,forced:/MSIE .\./.test(i)},{setTimeout:s(o.setTimeout),setInterval:s(o.setInterval)})},function(e,t,n){"use strict";t.__esModule=!0;t.addLeadingSlash=function(e){return"/"===e.charAt(0)?e:"/"+e},t.stripLeadingSlash=function(e){return"/"===e.charAt(0)?e.substr(1):e},t.stripPrefix=function(e,t){return 0===e.indexOf(t)?e.substr(t.length):e},t.parsePath=function(e){var t=e||"/",n="",r="",o=t.indexOf("#");-1!==o&&(r=t.substr(o),t=t.substr(0,o));var i=t.indexOf("?");return-1!==i&&(n=t.substr(i),t=t.substr(0,i)),{pathname:t,search:"?"===n?"":n,hash:"#"===r?"":r}},t.createPath=function(e){var t=e.pathname,n=e.search,r=e.hash,o=t||"/";return n&&"?"!==n&&(o+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(o+="#"===r.charAt(0)?r:"#"+r),o}},function(e,t){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];e.exports=function(e){var t=e,o=e.indexOf("["),i=e.indexOf("]");-1!=o&&-1!=i&&(e=e.substring(0,o)+e.substring(o,i).replace(/:/g,";")+e.substring(i,e.length));for(var a=n.exec(e||""),s={},c=14;c--;)s[r[c]]=a[c]||"";return-1!=o&&-1!=i&&(s.source=t,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s}},function(e,t){e.exports=function(e){return n&&Buffer.isBuffer(e)||r&&(e instanceof ArrayBuffer||o(e))};var n="function"==typeof Buffer&&"function"==typeof Buffer.isBuffer,r="function"==typeof ArrayBuffer,o=function(e){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer}},function(e,t,n){var r=n(479),o=n(369),i=n(144),a=n(327),s=n(370),c=n(371),u=n(107)("socket.io-client:manager"),l=n(368),d=n(493),f=Object.prototype.hasOwnProperty;function p(e,t){if(!(this instanceof p))return new p(e,t);e&&"object"==typeof e&&(t=e,e=void 0),(t=t||{}).path=t.path||"/socket.io",this.nsps={},this.subs=[],this.opts=t,this.reconnection(!1!==t.reconnection),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor(t.randomizationFactor||.5),this.backoff=new d({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==t.timeout?2e4:t.timeout),this.readyState="closed",this.uri=e,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[];var n=t.parser||a;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this.autoConnect=!1!==t.autoConnect,this.autoConnect&&this.open()}e.exports=p,p.prototype.emitAll=function(){for(var e in this.emit.apply(this,arguments),this.nsps)f.call(this.nsps,e)&&this.nsps[e].emit.apply(this.nsps[e],arguments)},p.prototype.updateSocketIds=function(){for(var e in this.nsps)f.call(this.nsps,e)&&(this.nsps[e].id=this.generateId(e))},p.prototype.generateId=function(e){return("/"===e?"":e+"#")+this.engine.id},i(p.prototype),p.prototype.reconnection=function(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection},p.prototype.reconnectionAttempts=function(e){return arguments.length?(this._reconnectionAttempts=e,this):this._reconnectionAttempts},p.prototype.reconnectionDelay=function(e){return arguments.length?(this._reconnectionDelay=e,this.backoff&&this.backoff.setMin(e),this):this._reconnectionDelay},p.prototype.randomizationFactor=function(e){return arguments.length?(this._randomizationFactor=e,this.backoff&&this.backoff.setJitter(e),this):this._randomizationFactor},p.prototype.reconnectionDelayMax=function(e){return arguments.length?(this._reconnectionDelayMax=e,this.backoff&&this.backoff.setMax(e),this):this._reconnectionDelayMax},p.prototype.timeout=function(e){return arguments.length?(this._timeout=e,this):this._timeout},p.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},p.prototype.open=p.prototype.connect=function(e,t){if(u("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;u("opening %s",this.uri),this.engine=r(this.uri,this.opts);var n=this.engine,o=this;this.readyState="opening",this.skipReconnect=!1;var i=s(n,"open",function(){o.onopen(),e&&e()}),a=s(n,"error",function(t){if(u("connect_error"),o.cleanup(),o.readyState="closed",o.emitAll("connect_error",t),e){var n=new Error("Connection error");n.data=t,e(n)}else o.maybeReconnectOnOpen()});if(!1!==this._timeout){var c=this._timeout;u("connect attempt will timeout after %d",c);var l=setTimeout(function(){u("connect attempt timed out after %d",c),i.destroy(),n.close(),n.emit("error","timeout"),o.emitAll("connect_timeout",c)},c);this.subs.push({destroy:function(){clearTimeout(l)}})}return this.subs.push(i),this.subs.push(a),this},p.prototype.onopen=function(){u("open"),this.cleanup(),this.readyState="open",this.emit("open");var e=this.engine;this.subs.push(s(e,"data",c(this,"ondata"))),this.subs.push(s(e,"ping",c(this,"onping"))),this.subs.push(s(e,"pong",c(this,"onpong"))),this.subs.push(s(e,"error",c(this,"onerror"))),this.subs.push(s(e,"close",c(this,"onclose"))),this.subs.push(s(this.decoder,"decoded",c(this,"ondecoded")))},p.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},p.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},p.prototype.ondata=function(e){this.decoder.add(e)},p.prototype.ondecoded=function(e){this.emit("packet",e)},p.prototype.onerror=function(e){u("error",e),this.emitAll("error",e)},p.prototype.socket=function(e,t){var n=this.nsps[e];if(!n){n=new o(this,e,t),this.nsps[e]=n;var r=this;n.on("connecting",i),n.on("connect",function(){n.id=r.generateId(e)}),this.autoConnect&&i()}function i(){~l(r.connecting,n)||r.connecting.push(n)}return n},p.prototype.destroy=function(e){var t=l(this.connecting,e);~t&&this.connecting.splice(t,1),this.connecting.length||this.close()},p.prototype.packet=function(e){u("writing packet %j",e);var t=this;e.query&&0===e.type&&(e.nsp+="?"+e.query),t.encoding?t.packetBuffer.push(e):(t.encoding=!0,this.encoder.encode(e,function(n){for(var r=0;r<n.length;r++)t.engine.write(n[r],e.options);t.encoding=!1,t.processPacketQueue()}))},p.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var e=this.packetBuffer.shift();this.packet(e)}},p.prototype.cleanup=function(){u("cleanup");for(var e=this.subs.length,t=0;t<e;t++){this.subs.shift().destroy()}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},p.prototype.close=p.prototype.disconnect=function(){u("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},p.prototype.onclose=function(e){u("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",e),this._reconnection&&!this.skipReconnect&&this.reconnect()},p.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var e=this;if(this.backoff.attempts>=this._reconnectionAttempts)u("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var t=this.backoff.duration();u("will wait %dms before reconnect attempt",t),this.reconnecting=!0;var n=setTimeout(function(){e.skipReconnect||(u("attempting reconnect"),e.emitAll("reconnect_attempt",e.backoff.attempts),e.emitAll("reconnecting",e.backoff.attempts),e.skipReconnect||e.open(function(t){t?(u("reconnect attempt error"),e.reconnecting=!1,e.reconnect(),e.emitAll("reconnect_error",t.data)):(u("reconnect success"),e.onreconnect())}))},t);this.subs.push({destroy:function(){clearTimeout(n)}})}},p.prototype.onreconnect=function(){var e=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",e)}},function(e,t,n){var r=n(329),o=n(482),i=n(489),a=n(490);t.polling=function(e){var t=!1,n=!1,a=!1!==e.jsonp;if("undefined"!=typeof location){var s="https:"===location.protocol,c=location.port;c||(c=s?443:80),t=e.hostname!==location.hostname||c!==e.port,n=e.secure!==s}if(e.xdomain=t,e.xscheme=n,"open"in new r(e)&&!e.forceJSONP)return new o(e);if(!a)throw new Error("JSONP disabled");return new i(e)},t.websocket=a},function(e,t,n){var r=n(330),o=n(257),i=n(145),a=n(258),s=n(367),c=n(107)("engine.io-client:polling");e.exports=l;var u=null!=new(n(329))({xdomain:!1}).responseType;function l(e){var t=e&&e.forceBase64;u&&!t||(this.supportsBinary=!1),r.call(this,e)}a(l,r),l.prototype.name="polling",l.prototype.doOpen=function(){this.poll()},l.prototype.pause=function(e){var t=this;function n(){c("paused"),t.readyState="paused",e()}if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(c("we are currently polling - waiting to pause"),r++,this.once("pollComplete",function(){c("pre-pause polling complete"),--r||n()})),this.writable||(c("we are currently writing - waiting to pause"),r++,this.once("drain",function(){c("pre-pause writing complete"),--r||n()}))}else n()},l.prototype.poll=function(){c("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},l.prototype.onData=function(e){var t=this;c("polling got data %s",e);i.decodePayload(e,this.socket.binaryType,function(e,n,r){if("opening"===t.readyState&&t.onOpen(),"close"===e.type)return t.onClose(),!1;t.onPacket(e)}),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():c('ignoring poll - transport state "%s"',this.readyState))},l.prototype.doClose=function(){var e=this;function t(){c("writing close packet"),e.write([{type:"close"}])}"open"===this.readyState?(c("transport open - closing"),t()):(c("transport not open - deferring close"),this.once("open",t))},l.prototype.write=function(e){var t=this;this.writable=!1;var n=function(){t.writable=!0,t.emit("drain")};i.encodePayload(e,this.supportsBinary,function(e){t.doWrite(e,n)})},l.prototype.uri=function(){var e=this.query||{},t=this.secure?"https":"http",n="";return!1!==this.timestampRequests&&(e[this.timestampParam]=s()),this.supportsBinary||e.sid||(e.b64=1),e=o.encode(e),this.port&&("https"===t&&443!==Number(this.port)||"http"===t&&80!==Number(this.port))&&(n=":"+this.port),e.length&&(e="?"+e),t+"://"+(-1!==this.hostname.indexOf(":")?"["+this.hostname+"]":this.hostname)+n+this.path+e}},function(e,t,n){var r=n(328),o=Object.prototype.toString,i="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===o.call(Blob),a="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===o.call(File);e.exports=function e(t){if(!t||"object"!=typeof t)return!1;if(r(t)){for(var n=0,o=t.length;n<o;n++)if(e(t[n]))return!0;return!1}if("function"==typeof Buffer&&Buffer.isBuffer&&Buffer.isBuffer(t)||"function"==typeof ArrayBuffer&&t instanceof ArrayBuffer||i&&t instanceof Blob||a&&t instanceof File)return!0;if(t.toJSON&&"function"==typeof t.toJSON&&1===arguments.length)return e(t.toJSON(),!0);for(var s in t)if(Object.prototype.hasOwnProperty.call(t,s)&&e(t[s]))return!0;return!1}},function(e,t,n){"use strict";var r,o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),i=64,a={},s=0,c=0;function u(e){var t="";do{t=o[e%i]+t,e=Math.floor(e/i)}while(e>0);return t}function l(){var e=u(+new Date);return e!==r?(s=0,r=e):e+"."+u(s++)}for(;c<i;c++)a[o[c]]=c;l.encode=u,l.decode=function(e){var t=0;for(c=0;c<e.length;c++)t=t*i+a[e.charAt(c)];return t},e.exports=l},function(e,t){var n=[].indexOf;e.exports=function(e,t){if(n)return e.indexOf(t);for(var r=0;r<e.length;++r)if(e[r]===t)return r;return-1}},function(e,t,n){var r=n(327),o=n(144),i=n(492),a=n(370),s=n(371),c=n(107)("socket.io-client:socket"),u=n(257),l=n(366);e.exports=p;var d={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},f=o.prototype.emit;function p(e,t,n){this.io=e,this.nsp=t,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,this.flags={},n&&n.query&&(this.query=n.query),this.io.autoConnect&&this.open()}o(p.prototype),p.prototype.subEvents=function(){if(!this.subs){var e=this.io;this.subs=[a(e,"open",s(this,"onopen")),a(e,"packet",s(this,"onpacket")),a(e,"close",s(this,"onclose"))]}},p.prototype.open=p.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},p.prototype.send=function(){var e=i(arguments);return e.unshift("message"),this.emit.apply(this,e),this},p.prototype.emit=function(e){if(d.hasOwnProperty(e))return f.apply(this,arguments),this;var t=i(arguments),n={type:(void 0!==this.flags.binary?this.flags.binary:l(t))?r.BINARY_EVENT:r.EVENT,data:t,options:{}};return n.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof t[t.length-1]&&(c("emitting packet with ack id %d",this.ids),this.acks[this.ids]=t.pop(),n.id=this.ids++),this.connected?this.packet(n):this.sendBuffer.push(n),this.flags={},this},p.prototype.packet=function(e){e.nsp=this.nsp,this.io.packet(e)},p.prototype.onopen=function(){if(c("transport is open - connecting"),"/"!==this.nsp)if(this.query){var e="object"==typeof this.query?u.encode(this.query):this.query;c("sending connect packet with query %s",e),this.packet({type:r.CONNECT,query:e})}else this.packet({type:r.CONNECT})},p.prototype.onclose=function(e){c("close (%s)",e),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",e)},p.prototype.onpacket=function(e){var t=e.nsp===this.nsp,n=e.type===r.ERROR&&"/"===e.nsp;if(t||n)switch(e.type){case r.CONNECT:this.onconnect();break;case r.EVENT:case r.BINARY_EVENT:this.onevent(e);break;case r.ACK:case r.BINARY_ACK:this.onack(e);break;case r.DISCONNECT:this.ondisconnect();break;case r.ERROR:this.emit("error",e.data)}},p.prototype.onevent=function(e){var t=e.data||[];c("emitting event %j",t),null!=e.id&&(c("attaching ack callback to event"),t.push(this.ack(e.id))),this.connected?f.apply(this,t):this.receiveBuffer.push(t)},p.prototype.ack=function(e){var t=this,n=!1;return function(){if(!n){n=!0;var o=i(arguments);c("sending ack %j",o),t.packet({type:l(o)?r.BINARY_ACK:r.ACK,id:e,data:o})}}},p.prototype.onack=function(e){var t=this.acks[e.id];"function"==typeof t?(c("calling ack %s with %j",e.id,e.data),t.apply(this,e.data),delete this.acks[e.id]):c("bad ack %s",e.id)},p.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},p.prototype.emitBuffered=function(){var e;for(e=0;e<this.receiveBuffer.length;e++)f.apply(this,this.receiveBuffer[e]);for(this.receiveBuffer=[],e=0;e<this.sendBuffer.length;e++)this.packet(this.sendBuffer[e]);this.sendBuffer=[]},p.prototype.ondisconnect=function(){c("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},p.prototype.destroy=function(){if(this.subs){for(var e=0;e<this.subs.length;e++)this.subs[e].destroy();this.subs=null}this.io.destroy(this)},p.prototype.close=p.prototype.disconnect=function(){return this.connected&&(c("performing disconnect (%s)",this.nsp),this.packet({type:r.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},p.prototype.compress=function(e){return this.flags.compress=e,this},p.prototype.binary=function(e){return this.flags.binary=e,this}},function(e,t){e.exports=function(e,t,n){return e.on(t,n),{destroy:function(){e.removeListener(t,n)}}}},function(e,t){var n=[].slice;e.exports=function(e,t){if("string"==typeof t&&(t=e[t]),"function"!=typeof t)throw new Error("bind() requires a function");var r=n.call(arguments,2);return function(){return t.apply(e,r.concat(n.call(arguments)))}}},function(e,t){function n(e,t){for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}function r(e,t){var r=[],o=[];return null==t&&(t=function(e,t){return r[0]===t?"[Circular ~]":"[Circular ~."+o.slice(0,n(r,t)).join(".")+"]"}),function(i,a){if(r.length>0){var s=n(r,this);~s?r.splice(s+1):r.push(this),~s?o.splice(s,1/0,i):o.push(i),~n(r,a)&&(a=t.call(this,i,a))}else r.push(a);return null==e?a instanceof Error?function(e){var t={stack:e.stack,message:e.message,name:e.name};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}(a):a:e.call(this,i,a)}}(e.exports=function(e,t,n,o){return JSON.stringify(e,r(t,o),n)}).getSerialize=r},function(e,t,n){!function(t){var n=-1,r={onVisible:function(e){var t=r.isSupported();if(!t||!r.hidden())return e(),t;var n=r.change(function(t,o){r.hidden()||(r.unbind(n),e())});return n},change:function(e){if(!r.isSupported())return!1;var t=n+=1;return r._callbacks[t]=e,r._listen(),t},unbind:function(e){delete r._callbacks[e]},afterPrerendering:function(e){var t=r.isSupported();if(!t||"prerender"!=r.state())return e(),t;var n=r.change(function(t,o){"prerender"!=o&&(r.unbind(n),e())});return n},hidden:function(){return!(!r._doc.hidden&&!r._doc.webkitHidden)},state:function(){return r._doc.visibilityState||r._doc.webkitVisibilityState||"visible"},isSupported:function(){return!(!r._doc.visibilityState&&!r._doc.webkitVisibilityState)},_doc:document||{},_callbacks:{},_change:function(e){var t=r.state();for(var n in r._callbacks)r._callbacks[n].call(r._doc,e,t)},_listen:function(){if(!r._init){var e="visibilitychange";r._doc.webkitVisibilityState&&(e="webkit"+e);var t=function(){r._change.apply(r,arguments)};r._doc.addEventListener?r._doc.addEventListener(e,t):r._doc.attachEvent(e,t),r._init=!0}}};e.exports?e.exports=r:t.Visibility=r}(this)},function(e,t,n){var r,o,i;!function(a){"use strict";o=[n(146)],void 0===(i="function"==typeof(r=function(e){var t=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);e.blobSlice=t&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},e.metaDataParsers={jpeg:{65505:[]}},e.parseMetaData=function(t,n,r,o){o=o||{};var i=this,a=(r=r||{}).maxMetaDataSize||262144;!!(window.DataView&&t&&t.size>=12&&"image/jpeg"===t.type&&e.blobSlice)&&e.readFile(e.blobSlice.call(t,0,a),function(t){if(t.target.error)return console.log(t.target.error),void n(o);var a,s,c,u,l=t.target.result,d=new DataView(l),f=2,p=d.byteLength-4,h=f;if(65496===d.getUint16(0)){for(;f<p&&((a=d.getUint16(f))>=65504&&a<=65519||65534===a);){if(f+(s=d.getUint16(f+2)+2)>d.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(c=e.metaDataParsers.jpeg[a])for(u=0;u<c.length;u+=1)c[u].call(i,d,f,s,o,r);h=f+=s}!r.disableImageHead&&h>6&&(l.slice?o.imageHead=l.slice(0,h):o.imageHead=new Uint8Array(l).subarray(0,h))}else console.log("Invalid JPEG file: Missing JPEG marker.");n(o)},"readAsArrayBuffer")||n(o)},e.hasMetaOption=function(e){return e&&e.meta};var n=e.transform;e.transform=function(t,r,o,i,a){e.hasMetaOption(r)?e.parseMetaData(i,function(a){n.call(e,t,r,o,i,a)},r,a):n.apply(e,arguments)}})?r.apply(t,o):r)||(e.exports=i)}()},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-PhoneNumberInput-absolute-center",loading:"onfido-sdk-ui-PhoneNumberInput-loading",mobileInput:"onfido-sdk-ui-PhoneNumberInput-mobileInput",phoneNumberContainer:"onfido-sdk-ui-PhoneNumberInput-phoneNumberContainer",flagIcon:"onfido-sdk-ui-PhoneNumberInput-flagIcon"}},function(e,t,n){var r=n(27);e.exports=r.Promise},function(e,t,n){var r=n(38),o=n(67),i=n(23)("species");e.exports=function(e,t){var n,a=r(e).constructor;return void 0===a||null==(n=r(a)[i])?t:o(n)}},function(e,t,n){var r,o,i,a=n(27),s=n(25),c=n(54),u=n(61),l=n(140),d=n(102),f=a.location,p=a.setImmediate,h=a.clearImmediate,m=a.process,v=a.MessageChannel,y=a.Dispatch,g=0,b={},$=function(e){if(b.hasOwnProperty(e)){var t=b[e];delete b[e],t()}},_=function(e){return function(){$(e)}},k=function(e){$(e.data)},w=function(e){a.postMessage(e+"",f.protocol+"//"+f.host)};p&&h||(p=function(e){for(var t=[],n=1;arguments.length>n;)t.push(arguments[n++]);return b[++g]=function(){("function"==typeof e?e:Function(e)).apply(void 0,t)},r(g),g},h=function(e){delete b[e]},"process"==c(m)?r=function(e){m.nextTick(_(e))}:y&&y.now?r=function(e){y.now(_(e))}:v?(i=(o=new v).port2,o.port1.onmessage=k,r=u(i.postMessage,i,1)):!a.addEventListener||"function"!=typeof postMessage||a.importScripts||s(w)?r="onreadystatechange"in d("script")?function(e){l.appendChild(d("script")).onreadystatechange=function(){l.removeChild(this),$(e)}}:function(e){setTimeout(_(e),0)}:(r=w,a.addEventListener("message",k,!1))),e.exports={set:p,clear:h}},function(e,t,n){var r=n(38),o=n(29),i=n(242);e.exports=function(e,t){if(r(e),o(t)&&t.constructor===e)return t;var n=i.f(e);return(0,n.resolve)(t),n.promise}},function(e,t,n){"use strict";var r=n(8),o=n(67),i=n(242),a=n(259),s=n(106);r({target:"Promise",stat:!0},{allSettled:function(e){var t=this,n=i.f(t),r=n.resolve,c=n.reject,u=a(function(){var n=o(t.resolve),i=[],a=0,c=1;s(e,function(e){var o=a++,s=!1;i.push(void 0),c++,n.call(t,e).then(function(e){s||(s=!0,i[o]={status:"fulfilled",value:e},--c||r(i))},function(e){s||(s=!0,i[o]={status:"rejected",reason:e},--c||r(i))})}),--c||r(i)});return u.error&&c(u.value),n.promise}})},function(e,t,n){"use strict";var r={version:"1.7.23",country_calling_codes:{1:["US","AG","AI","AS","BB","BM","BS","CA","DM","DO","GD","GU","JM","KN","KY","LC","MP","MS","PR","SX","TC","TT","VC","VG","VI"],7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],383:["XK"],385:["HR"],386:["SI"],387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],691:["FM"],692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]},countries:{AC:["247","00","(?:[01589]\\d|[46])\\d{4}",[5,6]],AD:["376","00","(?:1|6\\d)\\d{7}|[136-9]\\d{5}",[6,8,9],[["(\\d{3})(\\d{3})","$1 $2",["[136-9]"]],["(\\d{4})(\\d{4})","$1 $2",["1"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]]],AE:["971","00","(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",[5,6,7,8,9,10,11,12],[["(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],["(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"]],"0"],AF:["93","00","[2-7]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],"0"],AG:["1","011","(?:268|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([457]\\d{6})$","268$1",0,"268"],AI:["1","011","(?:264|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2457]\\d{6})$","264$1",0,"264"],AL:["355","00","(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",[6,7,8,9],[["(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],"0"],AM:["374","00","(?:[1-489]\\d|55|60|77)\\d{6}",[8],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0 $1"],["(\\d{3})(\\d{5})","$1 $2",["2|3[12]"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["[3-9]"],"0$1"]],"0"],AO:["244","00","[29]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]]],AR:["54","00","11\\d{8}|(?:[2368]|9\\d)\\d{9}",[10,11],[["(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5(?:[24-6]|3[2-5]))|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],["(\\d)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5(?:[24-6]|3[2-5]))|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",0,"$1 $2 $3-$4"],["(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 15-$3-$4",["91"],"0$1",0,"$1 $2 $3-$4"],["(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9"],"0$1",0,"$1 $2 $3-$4"]],"0",0,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?","9$1"],AS:["1","011","(?:[58]\\d\\d|684|900)\\d{7}",[10],0,"1",0,"1|([267]\\d{6})$","684$1",0,"684"],AT:["43","00","1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",[4,5,6,7,8,9,10,11,12,13],[["(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],["(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],["(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],["(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],["(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],["(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],"0"],AU:["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d{7,8}|8[0-24-9]\\d{7})|(?:[2-478]\\d\\d|550)\\d{6}|1\\d{4,7}",[5,6,7,8,9,10],[["(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|[45]"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]]],"0",0,"0|(183[12])",0,0,0,[["(?:[237]\\d{5}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|(?:[6-8]\\d{3}|9(?:[02-9]\\d\\d|1(?:[0-57-9]\\d|6[0135-9])))\\d))\\d{3}",[9]],["483[0-3]\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,["16\\d{3,7}",[5,6,7,8,9]],["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],AW:["297","00","(?:[25-79]\\d\\d|800)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]]],AX:["358","00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|(?:[147]\\d|3[0-46-9]|50)\\d{4,8}",[5,6,7,8,9,10],0,"0",0,0,0,0,"18",0,"00"],AZ:["994","00","(?:365\\d{3}|900200)\\d{3}|(?:[12457]\\d|60|88)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|365","[12]|365","[12]|365(?:[0-46-9]|5[0-35-9])"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[3-8]"],"0$1"]],"0"],BA:["387","00","6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],"0"],BB:["1","011","(?:246|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","246$1",0,"246"],BD:["880","00","[13469]\\d{9}|8[0-79]\\d{7,8}|[2-7]\\d{8}|[2-9]\\d{7}|[3-689]\\d{6}|[57-9]\\d{5}",[6,7,8,9,10],[["(\\d{2})(\\d{4,6})","$1-$2",["31[5-7]|[459]1"],"0$1"],["(\\d{3})(\\d{3,7})","$1-$2",["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],"0$1"],["(\\d{4})(\\d{3,6})","$1-$2",["[13-9]"],"0$1"],["(\\d)(\\d{7,8})","$1-$2",["2"],"0$1"]],"0"],BE:["32","00","4\\d{8}|[1-9]\\d{7}",[8,9],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[239]|4[23]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-8]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],"0"],BF:["226","00","[025-7]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[025-7]"]]]],BG:["359","00","[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",[6,7,8,9],[["(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],"0"],BH:["973","00","[136-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[13679]|8[047]"]]]],BI:["257","00","(?:[267]\\d|31)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2367]"]]]],BJ:["229","00","[2689]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2689]"]]]],BL:["590","00","(?:590|69\\d)\\d{6}",[9],0,"0",0,0,0,0,0,[["590(?:2[7-9]|5[12]|87)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"]]],BM:["1","011","(?:441|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-8]\\d{6})$","441$1",0,"441"],BN:["673","00","[2-578]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]]],BO:["591","00(?:1\\d)?","(?:[2-467]\\d{3}|80017)\\d{4}",[8,9],[["(\\d)(\\d{7})","$1 $2",["[23]|4[46]"]],["(\\d{8})","$1",["[67]"]],["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["8"]]],"0",0,"0(1\\d)?"],BQ:["599","00","(?:[34]1|7\\d)\\d{5}",[7],0,0,0,0,0,0,"[347]"],BR:["55","00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",[8,9,10,11],[["(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],["(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)"],["(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)"]],"0",0,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2"],BS:["1","011","(?:242|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([3-8]\\d{6})$","242$1",0,"242"],BT:["975","00","[17]\\d{7}|[2-8]\\d{6}",[7,8],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]]],BW:["267","00","90\\d{5}|(?:[2-6]|7\\d)\\d{6}",[7,8],[["(\\d{2})(\\d{5})","$1 $2",["90"]],["(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7"]]]],BY:["375","810","(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",[6,7,8,9,10,11],[["(\\d{3})(\\d{3})","$1 $2",["800"],"8 $1"],["(\\d{3})(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"],["(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:[56]|7[467])|2[1-3]"],"8 0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-4]"],"8 0$1"],["(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["[89]"],"8 $1"]],"8",0,"0|80?",0,0,0,0,"8~10"],BZ:["501","00","(?:0800\\d|[2-8])\\d{6}",[7,11],[["(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],["(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]]],CA:["1","011","(?:[2-8]\\d|90)\\d{8}",[10],0,"1",0,0,0,0,0,[["(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}"],[""],["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],["900[2-9]\\d{6}"],["(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}"],0,0,0,["600[2-9]\\d{6}"]]],CC:["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d|8[0-24-9])\\d{7}|(?:[148]\\d\\d|550)\\d{6}|1\\d{5,7}",[6,7,8,9,10],0,"0",0,"0|([59]\\d{7})$","8$1",0,0,[["8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",[9]],["483[0-3]\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,0,["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],CD:["243","00","[189]\\d{8}|[1-68]\\d{6}",[7,9],[["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],["(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"]],"0"],CF:["236","00","(?:[27]\\d{3}|8776)\\d{4}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]]],CG:["242","00","222\\d{6}|(?:0\\d|80)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]]]],CH:["41","00","8\\d{11}|[2-9]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]|81"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],"0"],CI:["225","00","[02-8]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[02-8]"]]]],CK:["682","00","[2-8]\\d{4}",[5],[["(\\d{2})(\\d{3})","$1 $2",["[2-8]"]]]],CL:["56","(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0","12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",[9,10,11],[["(\\d{5})(\\d{4})","$1 $2",["21"],"($1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9[2-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]]],CM:["237","00","(?:[26]\\d\\d|88)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]]]],CN:["86","00|1(?:[12]\\d|79|9[0235-7])\\d\\d00","1[1279]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-68]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}",[7,8,9,10,11,12],[["(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]","(?:10|2[0-57-9])(?:10|9[56])","(?:10|2[0-57-9])(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1",1],["(\\d{3})(\\d{7,8})","$1 $2",["9"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1",1],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1",1],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"]],["(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",1]],"0",0,"0|(1(?:[12]\\d|79|9[0235-7])\\d\\d)",0,0,0,0,"00"],CO:["57","00(?:4(?:[14]4|56)|[579])","(?:1\\d|3)\\d{9}|[124-8]\\d{7}",[8,10,11],[["(\\d)(\\d{7})","$1 $2",["1[2-79]|[25-8]|(?:18|4)[2-9]"],"($1)"],["(\\d{3})(\\d{7})","$1 $2",["3"]],["(\\d)(\\d{3})(\\d{7})","$1-$2-$3",["1(?:80|9)","1(?:800|9)"],"0$1",0,"$1 $2 $3"]],"0",0,"0([3579]|4(?:[14]4|56))?"],CR:["506","00","(?:8\\d|90)\\d{8}|[24-8]\\d{7}",[8,10],[["(\\d{4})(\\d{4})","$1 $2",["[24-7]|8[3-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]"]]],0,0,"(19(?:0[0-2468]|1[09]|20|66|77|99))"],CU:["53","119","[27]\\d{6,7}|[34]\\d{5,7}|5\\d{7}",[6,7,8],[["(\\d{2})(\\d{4,6})","$1 $2",["2[1-4]|[34]"],"(0$1)"],["(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],["(\\d)(\\d{7})","$1 $2",["5"],"0$1"]],"0"],CV:["238","0","[2-59]\\d{6}",[7],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-59]"]]]],CW:["599","00","(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[3467]"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],0,0,0,0,0,"[69]"],CX:["61","001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","1(?:[0-79]\\d|8[0-24-9])\\d{7}|(?:[148]\\d\\d|550)\\d{6}|1\\d{5,7}",[6,7,8,9,10],0,"0",0,"0|([59]\\d{7})$","8$1",0,0,[["8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",[9]],["483[0-3]\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",[9]],["180(?:0\\d{3}|2)\\d{3}",[7,10]],["190[0-26]\\d{6}",[10]],0,0,0,0,["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",[9]],["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",[6,8,10]]],"0011"],CY:["357","00","(?:[279]\\d|[58]0)\\d{6}",[8],[["(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]]],CZ:["420","00","(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],["(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]]],DE:["49","00","[2579]\\d{5,14}|49(?:[05]\\d{10}|[46][1-8]\\d{4,9})|49(?:[0-25]\\d|3[1-689]|7[1-7])\\d{4,8}|49(?:[0-2579]\\d|[34][1-9]|6[0-8])\\d{3}|49\\d{3,4}|(?:1|[368]\\d|4[0-8])\\d{3,13}",[4,5,6,7,8,9,10,11,12,13,14,15],[["(\\d{2})(\\d{3,13})","$1 $2",["3[02]|40|[68]9"],"0$1"],["(\\d{3})(\\d{3,12})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1","2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],"0$1"],["(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["138"],"0$1"],["(\\d{5})(\\d{2,10})","$1 $2",["3"],"0$1"],["(\\d{3})(\\d{5,11})","$1 $2",["181"],"0$1"],["(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:3|80)|9"],"0$1"],["(\\d{3})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],["(\\d{3})(\\d{7,12})","$1 $2",["8"],"0$1"],["(\\d{5})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{4})(\\d{7})","$1 $2",["18[68]"],"0$1"],["(\\d{5})(\\d{6})","$1 $2",["15[0568]"],"0$1"],["(\\d{4})(\\d{7})","$1 $2",["15[1279]"],"0$1"],["(\\d{3})(\\d{8})","$1 $2",["18"],"0$1"],["(\\d{3})(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"],["(\\d{4})(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],["(\\d{3})(\\d{2})(\\d{8})","$1 $2 $3",["15"],"0$1"]],"0"],DJ:["253","00","(?:2\\d|77)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]]],DK:["45","00","[2-9]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]]],DM:["1","011","(?:[58]\\d\\d|767|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","767$1",0,"767"],DO:["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,0,0,0,"8[024]9"],DZ:["213","00","(?:[1-4]|[5-79]\\d|80)\\d{7}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"]],"0"],EC:["593","00","1800\\d{6,7}|(?:[2-7]|9\\d)\\d{7}",[8,9,10,11],[["(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[2-7]"],"(0$1)",0,"$1-$2-$3"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],["(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],"0"],EE:["372","00","8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d\\d|900)\\d{4}",[7,8,10],[["(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],["(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-4])","[45]|8(?:00[1-9]|[1-4])"]],["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["7"]],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["80"]]]],EG:["20","00","[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",[8,9,10],[["(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],["(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|8[2468]|9[235-7]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[189]"],"0$1"]],"0"],EH:["212","00","[5-8]\\d{8}",[9],0,"0",0,0,0,0,"528[89]"],ER:["291","00","[178]\\d{6}",[7],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[178]"],"0$1"]],"0"],ES:["34","00","(?:51|[6-9]\\d)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]]],ET:["251","00","(?:11|[2-59]\\d)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-59]"],"0$1"]],"0"],FI:["358","00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}|[1-35689]\\d{4}",[5,6,7,8,9,10],[["(\\d)(\\d{4,9})","$1 $2",["[2568][1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"],["(\\d{3})(\\d{3,7})","$1 $2",["(?:[12]0|7)0|[368]"],"0$1"],["(\\d{2})(\\d{4,8})","$1 $2",["[12457]"],"0$1"]],"0",0,0,0,0,"1[03-79]|[2-9]",0,"00"],FJ:["679","0(?:0|52)","45\\d{5}|(?:0800\\d|[235-9])\\d{6}",[7,11],[["(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],0,0,0,0,0,0,0,"00"],FK:["500","00","[2-7]\\d{4}",[5]],FM:["691","00","[39]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[39]"]]]],FO:["298","00","(?:[2-8]\\d|90)\\d{4}",[6],[["(\\d{6})","$1",["[2-9]"]]],0,0,"(10(?:01|[12]0|88))"],FR:["33","00","[1-9]\\d{8}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],"0"],GA:["241","00","(?:0\\d|[2-7])\\d{6}",[7,8],[["(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]]],GB:["44","00","[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",[7,9,10],[["(\\d{3})(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["845","8454","84546","845464"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["800"],"0$1"],["(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],["(\\d{4})(\\d{5,6})","$1 $2",["1(?:[2-69][02-9]|[78])"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[25]|7(?:0|6[024-9])","[25]|7(?:0|6(?:[04-9]|2[356]))"],"0$1"],["(\\d{4})(\\d{6})","$1 $2",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[1389]"],"0$1"]],"0",0,0,0,0,0,[["(?:1(?:(?:1(?:3[0-58]|4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])|3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d\\d|2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d\\d|1(?:[0-7]\\d\\d|80[04589])))|2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d|7(?:(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))\\d|6888[2-46-8]))\\d\\d",[9,10]],["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",[10]],["80[08]\\d{7}|800\\d{6}|8001111"],["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d",[7,10]],["70\\d{8}",[10]],0,["(?:3[0347]|55)\\d{8}",[10]],["76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",[10]],["56\\d{8}",[10]]],0," x"],GD:["1","011","(?:473|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","473$1",0,"473"],GE:["995","00","(?:[3-57]\\d\\d|800)\\d{6}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["32"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[57]"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"]],"0"],GF:["594","00","[56]94\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],"0"],GG:["44","00","(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",[7,9,10],0,"0",0,"0|([25-9]\\d{5})$","1481$1",0,0,[["1481[25-9]\\d{5}",[10]],["7(?:(?:781|839)\\d|911[17])\\d{5}",[10]],["80[08]\\d{7}|800\\d{6}|8001111"],["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d",[7,10]],["70\\d{8}",[10]],0,["(?:3[0347]|55)\\d{8}",[10]],["76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",[10]],["56\\d{8}",[10]]]],GH:["233","00","(?:[235]\\d{3}|800)\\d{5}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],"0"],GI:["350","00","(?:[25]\\d\\d|629)\\d{5}",[8],[["(\\d{3})(\\d{5})","$1 $2",["2"]]]],GL:["299","00","(?:19|[2-689]\\d)\\d{4}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-689]"]]]],GM:["220","00","[2-9]\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]]],GN:["224","00","(?:30|6\\d\\d|722)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]]],GP:["590","00","(?:590|69\\d)\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],"0",0,0,0,0,0,[["590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"]]],GQ:["240","00","222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],["(\\d{3})(\\d{6})","$1 $2",["[89]"]]]],GR:["30","00","(?:[268]\\d|[79]0)\\d{8}",[10],[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],["(\\d{4})(\\d{6})","$1 $2",["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2689]"]]]],GT:["502","00","(?:1\\d{3}|[2-7])\\d{7}",[8,11],[["(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],GU:["1","011","(?:[58]\\d\\d|671|900)\\d{7}",[10],0,"1",0,"1|([3-9]\\d{6})$","671$1",0,"671"],GW:["245","00","[49]\\d{8}|4\\d{6}",[7,9],[["(\\d{3})(\\d{4})","$1 $2",["40"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]]],GY:["592","001","(?:862\\d|9008)\\d{3}|(?:[2-46]\\d|77)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-46-9]"]]]],HK:["852","00(?:30|5[09]|[126-9]?)","8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",[5,6,7,8,9,11],[["(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],["(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],["(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],0,0,0,0,0,0,0,"00"],HN:["504","00","[237-9]\\d{7}",[8],[["(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]]],HR:["385","00","(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",[6,7,8,9],[["(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],"0"],HT:["509","00","[2-489]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-489]"]]]],HU:["36","00","[2357]\\d{8}|[1-9]\\d{7}",[8,9],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"($1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"($1)"]],"06"],ID:["62","00[189]","(?:(?:007803|8\\d{4})\\d|[1-36])\\d{6}|[1-9]\\d{8,10}|[2-9]\\d{7}",[7,8,9,10,11,12,13],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],["(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],["(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],["(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],["(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],["(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],["(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],["(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],"0"],IE:["353","00","(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",[7,8,9,10],[["(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],["(\\d{3})(\\d{5})","$1 $2",["[45]0"],"(0$1)"],["(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2569]|4[1-69]|7[14]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[78]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]],["(\\d{2})(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["4"],"(0$1)"]],"0"],IL:["972","0(?:0|1[2-9])","1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",[7,8,9,10,11,12],[["(\\d{4})(\\d{3})","$1-$2",["125"]],["(\\d{4})(\\d{2})(\\d{2})","$1-$2-$3",["121"]],["(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1-$2-$3",["12"]],["(\\d{4})(\\d{6})","$1-$2",["159"]],["(\\d)(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["15"]]],"0"],IM:["44","00","1624\\d{6}|(?:[3578]\\d|90)\\d{8}",[10],0,"0",0,"0|([5-8]\\d{5})$","1624$1",0,"74576|(?:16|7[56])24"],IN:["91","00","(?:00800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",[8,9,10,11,12,13],[["(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],0,1],["(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],0,1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],0,1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|(?:55|61)2|7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:1(?:29|60|8[06])|261|552|788[01])[2-7]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])"],"0$1",1],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|[4-8])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|[4-8])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]","1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|[4-8])|7(?:1(?:[013-8]|9[6-9])|3179)|807(?:1|9[1-3])|(?:1552|7(?:28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",1],["(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",1],["(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],0,1],["(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],0,1]],"0"],IO:["246","00","3\\d{6}",[7],[["(\\d{3})(\\d{4})","$1 $2",["3"]]]],IQ:["964","00","(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0"],IR:["98","00","[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",[4,5,6,7,10],[["(\\d{4,5})","$1",["96"],"0$1"],["(\\d{2})(\\d{4,5})","$1 $2",["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"]],"0"],IS:["354","00|1(?:0(?:01|[12]0)|100)","(?:38\\d|[4-9])\\d{6}",[7,9],[["(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],0,0,0,0,0,0,0,"00"],IT:["39","00","0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",[6,7,8,9,10,11],[["(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],["(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],["(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],["(\\d{4})(\\d{4})","$1 $2",["894"]],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1[4679]|[38]"]],["(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],["(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],["(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["3"]]],0,0,0,0,0,0,[["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"],["3[1-9]\\d{8}|3[2-9]\\d{7}",[9,10]],["80(?:0\\d{3}|3)\\d{3}",[6,9]],["(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}",[6,8,9,10]],["1(?:78\\d|99)\\d{6}",[9,10]],0,0,0,["55\\d{8}",[10]],["84(?:[08]\\d{3}|[17])\\d{3}",[6,9]]]],JE:["44","00","1534\\d{6}|(?:[3578]\\d|90)\\d{8}",[10],0,"0",0,"0|([0-24-8]\\d{5})$","1534$1",0,0,[["1534[0-24-8]\\d{5}"],["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}"],["80(?:07(?:35|81)|8901)\\d{4}"],["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"],["701511\\d{4}"],0,["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"],["76(?:0[0-2]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}"],["56\\d{8}"]]],JM:["1","011","(?:[58]\\d\\d|658|900)\\d{7}",[10],0,"1",0,0,0,0,"658|876"],JO:["962","00","900\\d{5}|(?:(?:[268]|7\\d)\\d|32|53)\\d{6}",[8,9],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],["(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["70"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0"],JP:["81","010","00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",[8,9,10,11,12,13,14,15,16,17],[["(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],["(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])","[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[279]|49|6[0-24-689]|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|6(?:[0-24]|5[0-3589]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:47[59]|59[89]|8(?:6[68]|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],"0$1"],["(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3[3-8]|5[2-9])","[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3(?:[3-6][2-9]|7|8[2-5])|5[2-9])"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"]],"0"],KE:["254","000","(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",[7,8,9,10],[["(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["[17]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],"0"],KG:["996","00","(?:[235-7]\\d|99)\\d{7}|800\\d{6,7}",[9,10],[["(\\d{4})(\\d{5})","$1 $2",["3(?:1[346]|[24-79])"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-79]"],"0$1"],["(\\d{3})(\\d{3})(\\d)(\\d{2,3})","$1 $2 $3 $4",["8"],"0$1"]],"0"],KH:["855","00[14-9]","1\\d{9}|[1-9]\\d{7,8}",[8,9,10],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-9]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],KI:["686","00","(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",[5,8],0,"0"],KM:["269","00","[3478]\\d{6}",[7],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]]],KN:["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","869$1",0,"869"],KP:["850","00|99","85\\d{6}|(?:19\\d|2)\\d{7}",[8,10],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"]],"0"],KR:["82","00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",[5,6,8,9,10,11,12,13,14],[["(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1"],["(\\d{4})(\\d{4})","$1-$2",["1"]],["(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60|8"],"0$1"],["(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1"]],"0",0,"0(8(?:[1-46-8]|5\\d\\d))?"],KW:["965","00","(?:18|[2569]\\d\\d)\\d{5}",[7,8],[["(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],["(\\d{3})(\\d{5})","$1 $2",["[25]"]]]],KY:["1","011","(?:345|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","345$1",0,"345"],KZ:["7","810","33622\\d{5}|(?:7\\d|80)\\d{8}",[10],0,"8",0,0,0,0,"33|7",0,"8~10"],LA:["856","00","(?:2\\d|3)\\d{8}|(?:[235-8]\\d|41)\\d{6}",[8,9,10],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["3"],"0$1"],["(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2"],"0$1"]],"0"],LB:["961","00","[7-9]\\d{7}|[13-9]\\d{6}",[7,8],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"]]],"0"],LC:["1","011","(?:[58]\\d\\d|758|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","758$1",0,"758"],LI:["423","00","90\\d{5}|(?:[2378]|6\\d\\d)\\d{6}",[7,9],[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[237-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["69"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],"0",0,"0|(10(?:01|20|66))"],LK:["94","00","(?:[1-7]\\d|[89]1)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"]],"0"],LR:["231","00","(?:2|33|5\\d|77|88)\\d{7}|[45]\\d{6}",[7,8,9],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[45]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3578]"],"0$1"]],"0"],LS:["266","00","(?:[256]\\d\\d|800)\\d{5}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[2568]"]]]],LT:["370","00","(?:[3469]\\d|52|[78]0)\\d{6}",[8],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["52[0-79]"],"(8-$1)",1],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",1],["(\\d{2})(\\d{6})","$1 $2",["37|4(?:[15]|6[1-8])"],"(8-$1)",1],["(\\d{3})(\\d{5})","$1 $2",["[3-6]"],"(8-$1)",1]],"8",0,"[08]"],LU:["352","00","35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",[4,5,6,7,8,9,10,11],[["(\\d{2})(\\d{3})","$1 $2",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20[2-689]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["80[01]|90[015]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})","$1 $2 $3 $4",["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]],0,0,"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"],LV:["371","00","(?:[268]\\d|90)\\d{6}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[269]|8[01]"]]]],LY:["218","00","(?:[2569]\\d|71)\\d{7}",[9],[["(\\d{2})(\\d{7})","$1-$2",["[25-79]"],"0$1"]],"0"],MA:["212","00","[5-8]\\d{8}",[9],[["(\\d{5})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[45]"],"0$1"],["(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|9)|892"],"0$1"],["(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"],["(\\d{3})(\\d{6})","$1-$2",["[5-7]"],"0$1"]],"0",0,0,0,0,0,[["5(?:29|38)[89]0\\d{4}|5(?:2(?:[015-7]\\d|2[2-9]|3[2-57]|4[2-46-8]|8[235-7]|90)|3(?:[0-4]\\d|[57][2-9]|6[2-8]|80|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"],["692[12]\\d{5}|(?:6(?:[0-7]\\d|8[0-247-9]|9[013-9])|7(?:0[06-8]|6[1267]|7[0-27]))\\d{6}"],["80\\d{7}"],["89\\d{7}"],0,0,0,0,["5924[01]\\d{4}"]]],MC:["377","00","870\\d{5}|(?:[349]|6\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"]],["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],"0"],MD:["373","00","(?:[235-7]\\d|[89]0)\\d{6}",[8],[["(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"]],"0"],ME:["382","00","(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"0$1"]],"0"],MF:["590","00","(?:590|69\\d)\\d{6}",[9],0,"0",0,0,0,0,0,[["590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}"],["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"]]],MG:["261","00","[23]\\d{8}",[9],[["(\\d{2})(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],"0",0,"0|([24-9]\\d{6})$","20$1"],MH:["692","011","329\\d{4}|(?:[256]\\d|45)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1-$2",["[2-6]"]]],"1"],MK:["389","00","[2-578]\\d{7}",[8],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],"0"],ML:["223","00","(?:[246-9]\\d|50)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]]],MM:["95","00","1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",[6,7,8,9,10],[["(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-7]|8[1-35]"],"0$1"],["(\\d)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92"],"0$1"],["(\\d)(\\d{5})(\\d{4})","$1 $2 $3",["9"],"0$1"]],"0"],MN:["976","001","[12]\\d{7,9}|[57-9]\\d{7}",[8,9,10],[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],["(\\d{4})(\\d{4})","$1 $2",["[57-9]"]],["(\\d{3})(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],["(\\d{4})(\\d{5,6})","$1 $2",["[12](?:27|3[2-8]|4[2-68]|5[1-4689])","[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],"0$1"],["(\\d{5})(\\d{4,5})","$1 $2",["[12]"],"0$1"]],"0"],MO:["853","00","(?:28|[68]\\d)\\d{6}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[268]"]]]],MP:["1","011","[58]\\d{9}|(?:67|90)0\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","670$1",0,"670"],MQ:["596","00","(?:596|69\\d)\\d{6}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],"0"],MR:["222","00","(?:[2-4]\\d\\d|800)\\d{5}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]]],MS:["1","011","66449\\d{5}|(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|(4\\d{6})$","664$1",0,"664"],MT:["356","00","3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]]],MU:["230","0(?:0|[24-7]0|3[03])","(?:[2-468]|5\\d)\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[2-46]|8[013]"]],["(\\d{4})(\\d{4})","$1 $2",["5"]]],0,0,0,0,0,0,0,"020"],MV:["960","0(?:0|19)","(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",[7,10],[["(\\d{3})(\\d{4})","$1-$2",["[3467]|9[14-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],0,0,0,0,0,0,0,"00"],MW:["265","00","1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}",[7,9],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[17-9]"],"0$1"]],"0"],MX:["52","0[09]","(?:1(?:[01467]\\d|[2359][1-9]|8[1-79])|[2-9]\\d)\\d{8}",[10,11],[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"],0,1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"],0,1],["(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 $3 $4",["1(?:33|5[56]|81)"],0,1],["(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 $3 $4",["1"],0,1]],"01",0,"0(?:[12]|4[45])|1",0,0,0,0,"00"],MY:["60","00","1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1-$2 $3",["1(?:[0249]|[367][2-9]|8[1-9])|8"],"0$1"],["(\\d)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1-$2 $3",["1"],"0$1"]],"0"],MZ:["258","00","(?:2|8\\d)\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-7]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]]],NA:["264","00","[68]\\d{7,8}",[8,9],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["87"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],"0"],NC:["687","00","[2-57-9]\\d{5}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-57-9]"]]]],NE:["227","00","[0289]\\d{7}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["08"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[089]|2[01]"]]]],NF:["672","00","[13]\\d{5}",[6],[["(\\d{2})(\\d{4})","$1 $2",["1"]],["(\\d)(\\d{5})","$1 $2",["3"]]],0,0,"([0-258]\\d{4})$","3$1"],NG:["234","009","(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}",[7,8,10,11,12,13,14],[["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"],["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-7]|8[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[7-9]"],"0$1"],["(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]"],"0$1"],["(\\d{3})(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]"],"0$1"]],"0"],NI:["505","00","(?:1800|[25-8]\\d{3})\\d{4}",[8],[["(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]]],NL:["31","00","(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|[89]\\d{6,9}|1\\d{4,5}",[5,6,7,8,9,10],[["(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],["(\\d)(\\d{8})","$1 $2",["6"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-57-9]"],"0$1"]],"0"],NO:["47","00","(?:0|[2-9]\\d{3})\\d{4}",[5,8],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],0,0,0,0,0,"[02-689]|7[0-8]"],NP:["977","00","9\\d{9}|[1-9]\\d{7}",[8,10],[["(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],["(\\d{2})(\\d{6})","$1-$2",["[1-8]|9(?:[1-579]|6[2-6])"],"0$1"],["(\\d{3})(\\d{7})","$1-$2",["9"]]],"0"],NR:["674","00","(?:444|55\\d|888)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[458]"]]]],NU:["683","00","(?:[47]|888\\d)\\d{3}",[4,7],[["(\\d{3})(\\d{4})","$1 $2",["8"]]]],NZ:["64","0(?:0|161)","[28]\\d{7,9}|[346]\\d{7}|(?:508|[79]\\d)\\d{6,7}",[8,9,10],[["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0$1"],["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["24|[346]|7[2-57-9]|9[2-9]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|[59]|80"],"0$1"],["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["2[028]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:[169]|7[0-35-9])|7|86"],"0$1"]],"0",0,0,0,0,0,0,"00"],OM:["968","00","(?:[279]\\d{3}|500)\\d{4}|8007\\d{4,5}",[7,8,9],[["(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],["(\\d{2})(\\d{6})","$1 $2",["2"]],["(\\d{4})(\\d{4})","$1 $2",["[79]"]]]],PA:["507","00","(?:[1-57-9]|6\\d)\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],["(\\d{4})(\\d{4})","$1-$2",["6"]]]],PE:["51","19(?:1[124]|77|90)00","(?:[14-8]|9\\d)\\d{7}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],["(\\d)(\\d{7})","$1 $2",["1"],"(0$1)"],["(\\d{2})(\\d{6})","$1 $2",["[4-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"]]],"0",0,0,0,0,0,0,0," Anexo "],PF:["689","00","[48]\\d{7}|4\\d{5}",[6,8],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[48]"]]]],PG:["675","00|140[1-3]","(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["18|[2-69]|85"]],["(\\d{4})(\\d{4})","$1 $2",["[78]"]]],0,0,0,0,0,0,0,"00"],PH:["63","00","(?:1800|8)\\d{7,9}|2\\d{5}(?:\\d{2})?|(?:[3-7]|9\\d)\\d{8}",[6,8,9,10,11,12,13],[["(\\d)(\\d{5})","$1 $2",["2"],"(0$1)"],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],["(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],["(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|8[2-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],"0"],PK:["92","00","122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[025-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",[8,9,10,11,12],[["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["[89]0"],"0$1"],["(\\d{4})(\\d{5})","$1 $2",["1"]],["(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],["(\\d{3})(\\d{6,7})","$1 $2",["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])","9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],"(0$1)"],["(\\d{5})(\\d{5})","$1 $2",["58"],"(0$1)"],["(\\d{3})(\\d{7})","$1 $2",["3"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[24-9]"],"(0$1)"]],"0"],PL:["48","00","[1-57-9]\\d{6}(?:\\d{2})?|6\\d{5,8}",[6,7,8,9],[["(\\d{5})","$1",["19"]],["(\\d{3})(\\d{3})","$1 $2",["11|64"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1","(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["39|45|5[0137]|6[0469]|7[02389]|8[08]"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2-8]|[2-8]|9[145]"]]]],PM:["508","00","[45]\\d{5}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"]],"0"],PR:["1","011","(?:[589]\\d\\d|787)\\d{7}",[10],0,"1",0,0,0,0,"787|939"],PS:["970","00","[2489]2\\d{6}|(?:1\\d|5)\\d{8}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["5"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],PT:["351","00","(?:[26-9]\\d|30)\\d{7}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"]]]],PW:["680","01[12]","(?:[25-8]\\d\\d|345|488|900)\\d{4}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]]],PY:["595","00","59\\d{4,6}|(?:[2-46-9]\\d|5[0-8])\\d{4,7}",[6,7,8,9],[["(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],["(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],["(\\d{3})(\\d{4,5})","$1 $2",["2[279]|3[13-5]|4[359]|5|6[347]|7[46-8]|85"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["87"]],["(\\d{3})(\\d{6})","$1 $2",["9"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]"],"0$1"]],"0"],QA:["974","00","800\\d{4}|(?:2|[3-7]\\d)\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["2[126]|8"]],["(\\d{4})(\\d{4})","$1 $2",["[3-7]"]]]],RE:["262","00","(?:26|[68]\\d)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[268]"],"0$1"]],"0",0,0,0,0,"262|69|8"],RO:["40","00","(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}",[6,9],[["(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],["(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[237-9]"],"0$1"]],"0",0,0,0,0,0,0,0," int "],RS:["381","00","38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",[6,7,8,9,10,11,12],[["(\\d{3})(\\d{3,9})","$1 $2",["(?:2[389]|39)0|[7-9]"],"0$1"],["(\\d{2})(\\d{5,10})","$1 $2",["[1-36]"],"0$1"]],"0"],RU:["7","810","[347-9]\\d{9}",[10],[["(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",1],["(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",1],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",1]],"8",0,0,0,0,"3[04-689]|[489]",0,"8~10"],RW:["250","00","(?:06|[27]\\d\\d|[89]00)\\d{6}",[8,9],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"]],"0"],SA:["966","00","92\\d{7}|(?:[15]|8\\d)\\d{8}",[9,10],[["(\\d{4})(\\d{5})","$1 $2",["9"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["81"],"0$1"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],"0"],SB:["677","0[01]","(?:[1-6]|[7-9]\\d\\d)\\d{4}",[5,7],[["(\\d{2})(\\d{5})","$1 $2",["7|8[4-9]|9(?:[1-8]|9[0-8])"]]]],SC:["248","010|0[0-2]","8000\\d{3}|(?:[249]\\d|64)\\d{5}",[7],[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]"]]],0,0,0,0,0,0,0,"00"],SD:["249","00","[19]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[19]"],"0$1"]],"0"],SE:["46","00","(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",[6,7,8,9,10],[["(\\d{2})(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1",0,"$1 $2 $3"],["(\\d{3})(\\d{4})","$1-$2",["9(?:00|39|44)"],"0$1",0,"$1 $2"],["(\\d{2})(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1",0,"$1 $2 $3"],["(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["8"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1",0,"$1 $2 $3"],["(\\d{3})(\\d{2,3})(\\d{3})","$1-$2 $3",["9(?:00|39|44)"],"0$1",0,"$1 $2 $3"],["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],"0$1",0,"$1 $2 $3 $4"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["7"],"0$1",0,"$1 $2 $3 $4"],["(\\d)(\\d{3})(\\d{3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9"],"0$1",0,"$1 $2 $3 $4"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["[26]"],"0$1",0,"$1 $2 $3 $4 $5"]],"0"],SG:["65","0[0-3]\\d","(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",[8,10,11],[["(\\d{4})(\\d{4})","$1 $2",["[369]|8[1-8]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],["(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],SH:["290","00","(?:[256]\\d|8)\\d{3}",[4,5],0,0,0,0,0,0,"[256]"],SI:["386","00|10(?:22|66|88|99)","[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",[5,6,7,8],[["(\\d{2})(\\d{3,6})","$1 $2",["8[09]|9"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["59|8"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-57]"],"(0$1)"]],"0",0,0,0,0,0,0,"00"],SJ:["47","00","0\\d{4}|(?:[4589]\\d|79)\\d{6}",[5,8],0,0,0,0,0,0,"79"],SK:["421","00","[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",[6,7,9],[["(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],["(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],["(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],"0"],SL:["232","00","(?:[2378]\\d|99)\\d{6}",[8],[["(\\d{2})(\\d{6})","$1 $2",["[237-9]"],"(0$1)"]],"0"],SM:["378","00","(?:0549|[5-7]\\d)\\d{6}",[8,10],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],["(\\d{4})(\\d{6})","$1 $2",["0"]]],0,0,"([89]\\d{5})$","0549$1"],SN:["221","00","(?:[378]\\d{4}|93330)\\d{4}",[9],[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]]]],SO:["252","00","[346-9]\\d{8}|[12679]\\d{7}|(?:[1-4]\\d|59)\\d{5}|[1348]\\d{5}",[6,7,8,9],[["(\\d{2})(\\d{4})","$1 $2",["8[125]"]],["(\\d{6})","$1",["[134]"]],["(\\d)(\\d{6})","$1 $2",["1|2[0-79]|3[0-46-8]|4[0-7]|59"]],["(\\d)(\\d{7})","$1 $2",["24|[67]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[348]|64|79[0-8]|90"]],["(\\d{2})(\\d{5,7})","$1 $2",["1|28|6[1-35-9]|799|9[2-9]"]]],"0"],SR:["597","00","(?:[2-5]|68|[78]\\d)\\d{5}",[6,7],[["(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],["(\\d{3})(\\d{3})","$1-$2",["[2-5]"]],["(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]]],SS:["211","00","[19]\\d{8}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],"0"],ST:["239","00","(?:22|9\\d)\\d{5}",[7],[["(\\d{3})(\\d{4})","$1 $2",["[29]"]]]],SV:["503","00","[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?",[7,8,11],[["(\\d{3})(\\d{4})","$1 $2",["[89]"]],["(\\d{4})(\\d{4})","$1 $2",["[267]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]]],SX:["1","011","7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|(5\\d{6})$","721$1",0,"721"],SY:["963","00","[1-39]\\d{8}|[1-5]\\d{7}",[8,9],[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",1]],"0"],SZ:["268","00","0800\\d{4}|(?:[237]\\d|900)\\d{6}",[8,9],[["(\\d{4})(\\d{4})","$1 $2",["[0237]"]],["(\\d{5})(\\d{4})","$1 $2",["9"]]]],TA:["290","00","8\\d{3}",[4],0,0,0,0,0,0,"8"],TC:["1","011","(?:[58]\\d\\d|649|900)\\d{7}",[10],0,"1",0,"1|([2-479]\\d{6})$","649$1",0,"649"],TD:["235","00|16","(?:22|[69]\\d|77)\\d{6}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2679]"]]],0,0,0,0,0,0,0,"00"],TG:["228","00","[279]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]]],TH:["66","00[1-9]","1\\d{8,9}|(?:[2-57]|[689]\\d)\\d{7}",[8,9,10],[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["14|[3-9]"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],"0"],TJ:["992","810","(?:[3-59]\\d|77|88)\\d{7}",[9],[["(\\d{6})(\\d)(\\d{2})","$1 $2 $3",["331","3317"],0,1],["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],0,1],["(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3"],0,1],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[457-9]"],0,1]],"8",0,0,0,0,0,0,"8~10"],TK:["690","00","[2-47]\\d{3,6}",[4,5,6,7]],TL:["670","00","7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],["(\\d{4})(\\d{4})","$1 $2",["7"]]]],TM:["993","810","[1-6]\\d{7}",[8],[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"],["(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"]],"8",0,0,0,0,0,0,"8~10"],TN:["216","00","[2-57-9]\\d{7}",[8],[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]]],TO:["676","00","(?:0800|[5-8]\\d{3})\\d{3}|[2-8]\\d{4}",[5,7],[["(\\d{2})(\\d{3})","$1-$2",["[2-4]|50|6[09]|7[0-24-69]|8[05]"]],["(\\d{4})(\\d{3})","$1 $2",["0"]],["(\\d{3})(\\d{4})","$1 $2",["[5-8]"]]]],TR:["90","00","(?:[2-58]\\d\\d|900)\\d{7}|4\\d{6}",[7,10],[["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[0589]|90"],"0$1",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|616)","5(?:[0-59]|6161)"],"0$1",1],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",1]],"0"],TT:["1","011","(?:[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-46-8]\\d{6})$","868$1",0,"868"],TV:["688","00","(?:2|7\\d\\d|90)\\d{4}",[5,6,7]],TW:["886","0(?:0[25-79]|19)","(?:[24589]|7\\d)\\d{8}|[2-8]\\d{7}|2\\d{6}",[7,8,9,10],[["(\\d{2})(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],["(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["[25][2-8]|[346]|7[1-9]|8[237-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[258]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],"0",0,0,0,0,0,0,0,"#"],TZ:["255","00[056]","(?:[26-8]\\d|41|90)\\d{7}",[9],[["(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"]],"0"],UA:["380","00","[89]\\d{9}|[3-9]\\d{8}",[9,10],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]","6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["4[45][0-5]|5(?:0|6[37])|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]","4[45][0-5]|5(?:0|6(?:3[14-7]|7))|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]"],"0$1"],["(\\d{4})(\\d{5})","$1 $2",["[3-6]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],"0",0,0,0,0,0,0,"0~0"],UG:["256","00[057]","800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",[9],[["(\\d{4})(\\d{5})","$1 $2",["202","2024"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["[27-9]|4(?:6[45]|[7-9])"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["[34]"],"0$1"]],"0"],US:["1","011","[2-9]\\d{9}",[10],[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],0,1,"$1-$2-$3"]],"1",0,0,0,0,0,[["(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"],[""],["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],["900[2-9]\\d{6}"],["5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}"],0,["710[2-9]\\d{6}"]]],UY:["598","0(?:0|1[3-9]\\d)","(?:[249]\\d\\d|80)\\d{5}|9\\d{6}",[7,8],[["(\\d{3})(\\d{4})","$1 $2",["8|90"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],["(\\d{4})(\\d{4})","$1 $2",["[24]"]]],"0",0,0,0,0,0,0,"00"," int. "],UZ:["998","810","[679]\\d{8}",[9],[["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[679]"],"8 $1"]],"8",0,0,0,0,0,0,"8~10"],VA:["39","00","0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",[6,7,8,9,10,11],0,0,0,0,0,0,"06698"],VC:["1","011","(?:[58]\\d\\d|784|900)\\d{7}",[10],0,"1",0,"1|([2-7]\\d{6})$","784$1",0,"784"],VE:["58","00","[89]00\\d{7}|(?:[24]\\d|50)\\d{8}",[10],[["(\\d{3})(\\d{7})","$1-$2",["[24589]"],"0$1"]],"0"],VG:["1","011","(?:284|[58]\\d\\d|900)\\d{7}",[10],0,"1",0,"1|([2-578]\\d{6})$","284$1",0,"284"],VI:["1","011","[58]\\d{9}|(?:34|90)0\\d{7}",[10],0,"1",0,"1|([2-9]\\d{6})$","340$1",0,"340"],VN:["84","00","[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",[7,8,9,10],[["(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",1],["(\\d{4})(\\d{4,6})","$1 $2",["1"],0,1],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[69]"],"0$1",1],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3578]"],"0$1",1],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",1],["(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",1]],"0"],VU:["678","00","(?:[23]\\d|[48]8)\\d{3}|(?:[57]\\d|90)\\d{5}",[5,7],[["(\\d{3})(\\d{4})","$1 $2",["[579]"]]]],WF:["681","00","(?:[45]0|68|72|8\\d)\\d{4}",[6],[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[4-8]"]]]],WS:["685","0","[2-6]\\d{4}|8\\d{5}(?:\\d{4})?|[78]\\d{6}",[5,6,7,10],[["(\\d{5})","$1",["[2-6]"]],["(\\d{3})(\\d{3,7})","$1 $2",["8"]],["(\\d{2})(\\d{5})","$1 $2",["7"]]]],XK:["383","00","[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}",[8,9],[["(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-4]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23]"],"0$1"]],"0"],YE:["967","00","(?:1|7\\d)\\d{7}|[1-7]\\d{6}",[7,8,9],[["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],"0"],YT:["262","00","80\\d{7}|(?:26|63)9\\d{6}",[9],0,"0",0,0,0,0,"269|63"],ZA:["27","00","[1-9]\\d{8}|8\\d{4,7}",[5,6,7,8,9],[["(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],"0$1"]],"0"],ZM:["260","00","800\\d{6}|(?:21|76|9\\d)\\d{7}",[9],[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["[79]"],"0$1"]],"0"],ZW:["263","00","2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",[5,6,7,8,9,10],[["(\\d{3})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],"0$1"],["(\\d)(\\d{3})(\\d{2,4})","$1 $2 $3",["[49]"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["80"],"0$1"],["(\\d{2})(\\d{7})","$1 $2",["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2","2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)","2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],"0$1"],["(\\d{4})(\\d{6})","$1 $2",["8"],"0$1"],["(\\d{2})(\\d{3,5})","$1 $2",["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],"0$1"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["29[013-9]|39|54"],"0$1"],["(\\d{4})(\\d{3,5})","$1 $2",["(?:25|54)8","258|5483"],"0$1"]],"0"],"001":["979",0,"\\d{9}",[9],[["(\\d)(\\d{4})(\\d{4})","$1 $2 $3"]]]}},o=2,i=17,a=3,s="0-9０-９٠-٩۰-۹",c="-‐-―−ー－／/．.  ­​⁠　()（）［］\\[\\]~⁓∼～";function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];return new RegExp("^(?:"+t+")$").test(e)}var l=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=this.constructor.name,this.message=t,this.stack=new Error(t).stack},d=l;(l.prototype=Object.create(Error.prototype)).constructor=l;var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var m="1.2.0",v=" ext. ",y=function(){function e(t){h(this,e),function(e){if(!e)throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");if(!k(e)||!k(e.countries)||!k(e.country_calling_codes)&&!k(e.country_phone_code_to_countries))throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` and `.country_calling_codes` child object properties. Got "+(k(e)?"an object of shape: { "+Object.keys(e).join(", ")+" }":"a "+w(e)+": "+e)+".")}(t),this.metadata=t,this.v1=!t.version,this.v2=void 0!==t.version&&-1===function(e,t){for(var n=e.split("."),r=t.split("."),o=0;o<3;o++){var i=Number(n[o]),a=Number(r[o]);if(i>a)return 1;if(a>i)return-1;if(!isNaN(i)&&isNaN(a))return 1;if(isNaN(i)&&!isNaN(a))return-1}return 0}(t.version,m),this.v3=void 0!==t.version}return p(e,[{key:"hasCountry",value:function(e){return void 0!==this.metadata.countries[e]}},{key:"country",value:function(e){if(!e)return this._country=void 0,this.country_metadata=void 0,this;if(!this.hasCountry(e))throw new Error("Unknown country: "+e);return this._country=e,this.country_metadata=this.metadata.countries[e],this}},{key:"getDefaultCountryMetadataForRegion",value:function(){return this.metadata.countries[this.countryCallingCodes()[this.countryCallingCode()][0]]}},{key:"countryCallingCode",value:function(){return this.country_metadata[0]}},{key:"IDDPrefix",value:function(){if(!this.v1&&!this.v2)return this.country_metadata[1]}},{key:"defaultIDDPrefix",value:function(){if(!this.v1&&!this.v2)return this.country_metadata[12]}},{key:"nationalNumberPattern",value:function(){return this.v1||this.v2?this.country_metadata[1]:this.country_metadata[2]}},{key:"possibleLengths",value:function(){if(!this.v1)return this.country_metadata[this.v2?2:3]}},{key:"_getFormats",value:function(e){return e[this.v1?2:this.v2?3:4]}},{key:"formats",value:function(){var e=this,t=this._getFormats(this.country_metadata)||this._getFormats(this.getDefaultCountryMetadataForRegion())||[];return t.map(function(t){return new b(t,e)})}},{key:"nationalPrefix",value:function(){return this.country_metadata[this.v1?3:this.v2?4:5]}},{key:"_getNationalPrefixFormattingRule",value:function(e){return e[this.v1?4:this.v2?5:6]}},{key:"nationalPrefixFormattingRule",value:function(){return this._getNationalPrefixFormattingRule(this.country_metadata)||this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion())}},{key:"nationalPrefixForParsing",value:function(){return this.country_metadata[this.v1?5:this.v2?6:7]||this.nationalPrefix()}},{key:"nationalPrefixTransformRule",value:function(){return this.country_metadata[this.v1?6:this.v2?7:8]}},{key:"_getNationalPrefixIsOptionalWhenFormatting",value:function(){return!!this.country_metadata[this.v1?7:this.v2?8:9]}},{key:"nationalPrefixIsOptionalWhenFormatting",value:function(){return this._getNationalPrefixIsOptionalWhenFormatting(this.country_metadata)||this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion())}},{key:"leadingDigits",value:function(){return this.country_metadata[this.v1?8:this.v2?9:10]}},{key:"types",value:function(){return this.country_metadata[this.v1?9:this.v2?10:11]}},{key:"hasTypes",value:function(){return(!this.types()||0!==this.types().length)&&!!this.types()}},{key:"type",value:function(e){if(this.hasTypes()&&_(this.types(),e))return new $(_(this.types(),e),this)}},{key:"ext",value:function(){return this.v1||this.v2?v:this.country_metadata[13]||v}},{key:"countryCallingCodes",value:function(){return this.v1?this.metadata.country_phone_code_to_countries:this.metadata.country_calling_codes}},{key:"chooseCountryByCountryCallingCode",value:function(e){var t=this.countryCallingCodes()[e][0];this.hasCountry(t)&&this.country(t)}},{key:"selectedCountry",value:function(){return this._country}}]),e}(),g=y,b=function(){function e(t,n){h(this,e),this._format=t,this.metadata=n}return p(e,[{key:"pattern",value:function(){return this._format[0]}},{key:"format",value:function(){return this._format[1]}},{key:"leadingDigitsPatterns",value:function(){return this._format[2]||[]}},{key:"nationalPrefixFormattingRule",value:function(){return this._format[3]||this.metadata.nationalPrefixFormattingRule()}},{key:"nationalPrefixIsOptionalWhenFormatting",value:function(){return!!this._format[4]||this.metadata.nationalPrefixIsOptionalWhenFormatting()}},{key:"nationalPrefixIsMandatoryWhenFormatting",value:function(){return this.usesNationalPrefix()&&!this.nationalPrefixIsOptionalWhenFormatting()}},{key:"usesNationalPrefix",value:function(){return this.nationalPrefixFormattingRule()&&"$1"!==this.nationalPrefixFormattingRule()&&/\d/.test(this.nationalPrefixFormattingRule().replace("$1",""))}},{key:"internationalFormat",value:function(){return this._format[5]||this.format()}}]),e}(),$=function(){function e(t,n){h(this,e),this.type=t,this.metadata=n}return p(e,[{key:"pattern",value:function(){return this.metadata.v1?this.type:this.type[0]}},{key:"possibleLengths",value:function(){if(!this.metadata.v1)return this.type[1]||this.metadata.possibleLengths()}}]),e}();function _(e,t){switch(t){case"FIXED_LINE":return e[0];case"MOBILE":return e[1];case"TOLL_FREE":return e[2];case"PREMIUM_RATE":return e[3];case"PERSONAL_NUMBER":return e[4];case"VOICEMAIL":return e[5];case"UAN":return e[6];case"PAGER":return e[7];case"VOIP":return e[8];case"SHARED_COST":return e[9]}}var k=function(e){return"object"===(void 0===e?"undefined":f(e))},w=function(e){return void 0===e?"undefined":f(e)};function C(e,t){if((t=new y(t)).hasCountry(e))return t.country(e).countryCallingCode();throw new Error("Unknown country: "+e)}function x(e,t){return void 0!==t.countries[e]}var O=";ext=",S="(["+s+"]{1,7})";function E(e){var t="xｘ#＃~～";switch(e){case"parsing":t=",;"+t}return O+S+"|[  \\t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|["+t+"]|int|anexo|ｉｎｔ)[:\\.．]?[  \\t,-]*"+S+"#?|[- ]+(["+s+"]{1,5})#"}var j=E("parsing"),T=E("matching"),P=new RegExp("(?:"+j+")$","i");var N=new RegExp("^"+("["+s+"]{"+o+"}")+"$|^"+("[+＋]{0,1}(?:["+c+"]*["+s+"]){3,}["+c+s+"]*")+"(?:"+j+")?$","i");function A(e){return e.length>=o&&N.test(e)}var I={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","０":"0","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"};function D(e){return I[e]}function R(e){var t="",n=e.split(""),r=Array.isArray(n),o=0;for(n=r?n:n[Symbol.iterator]();;){var i;if(r){if(o>=n.length)break;i=n[o++]}else{if((o=n.next()).done)break;i=o.value}var a=D(i);a&&(t+=a)}return t}function M(e){var t="",n=e.split(""),r=Array.isArray(n),o=0;for(n=r?n:n[Symbol.iterator]();;){var i;if(r){if(o>=n.length)break;i=n[o++]}else{if((o=n.next()).done)break;i=o.value}t+=F(i,t)||""}return t}function F(e,t){if("+"===e){if(t)return;return"+"}return D(e)}var L=["MOBILE","PREMIUM_RATE","TOLL_FREE","SHARED_COST","VOIP","PERSONAL_NUMBER","PAGER","UAN","VOICEMAIL"];function U(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2];if(e.country){if(!(n=new g(n)).hasCountry(e.country))throw new Error("Unknown country: "+e.country);var r=t.v2?e.nationalNumber:e.phone;if(n.country(e.country),u(r,n.nationalNumberPattern())){if(B(r,"FIXED_LINE",n))return n.type("MOBILE")&&""===n.type("MOBILE").pattern()?"FIXED_LINE_OR_MOBILE":n.type("MOBILE")?B(r,"MOBILE",n)?"FIXED_LINE_OR_MOBILE":"FIXED_LINE":"FIXED_LINE_OR_MOBILE";var o=L,i=Array.isArray(o),a=0;for(o=i?o:o[Symbol.iterator]();;){var s;if(i){if(a>=o.length)break;s=o[a++]}else{if((a=o.next()).done)break;s=a.value}var c=s;if(B(r,c,n))return c}}}}function B(e,t,n){return!(!(t=n.type(t))||!t.pattern())&&(!(t.possibleLengths()&&t.possibleLengths().indexOf(e.length)<0)&&u(e,t.pattern()))}function W(e,t,n){var r=n.type(t),o=r&&r.possibleLengths()||n.possibleLengths();if("FIXED_LINE_OR_MOBILE"===t){if(!n.type("FIXED_LINE"))return W(e,"MOBILE",n);var i=n.type("MOBILE");i&&(o=function(e,t){var n=e.slice(),r=t,o=Array.isArray(r),i=0;for(r=o?r:r[Symbol.iterator]();;){var a;if(o){if(i>=r.length)break;a=r[i++]}else{if((i=r.next()).done)break;a=i.value}var s=a;e.indexOf(s)<0&&n.push(s)}return n.sort(function(e,t){return e-t})}(o,i.possibleLengths()))}else if(t&&!r)return"INVALID_LENGTH";var a=e.length,s=o[0];return s===a?"IS_POSSIBLE":s>a?"TOO_SHORT":o[o.length-1]<a?"TOO_LONG":o.indexOf(a,1)>=0?"IS_POSSIBLE":"INVALID_LENGTH"}function H(e,t,n){if(void 0===t&&(t={}),n=new g(n),t.v2){if(!e.countryCallingCode)throw new Error("Invalid phone number object passed");n.chooseCountryByCountryCallingCode(e.countryCallingCode)}else{if(!e.phone)return!1;if(e.country){if(!n.hasCountry(e.country))throw new Error("Unknown country: "+e.country);n.country(e.country)}else{if(!e.countryCallingCode)throw new Error("Invalid phone number object passed");n.chooseCountryByCountryCallingCode(e.countryCallingCode)}}if(!n.possibleLengths())throw new Error("Metadata too old");return q(e.phone||e.nationalNumber,void 0,n)}function q(e,t,n){switch(W(e,void 0,n)){case"IS_POSSIBLE":return!0;default:return!1}}var V=new RegExp("(["+s+"])"),G=/^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;var z=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function K(e){var t=void 0,n=void 0,r=(e=e.replace(/^tel:/,"tel=")).split(";"),o=Array.isArray(r),i=0;for(r=o?r:r[Symbol.iterator]();;){var a;if(o){if(i>=r.length)break;a=r[i++]}else{if((i=r.next()).done)break;a=i.value}var s=a.split("="),c=z(s,2),u=c[0],l=c[1];switch(u){case"tel":t=l;break;case"ext":n=l;break;case"phone-context":"+"===l[0]&&(t=l+t)}}if(!A(t))return{};var d={number:t};return n&&(d.ext=n),d}function Y(e){var t=e.number,n=e.ext;if(!t)return"";if("+"!==t[0])throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');return"tel:"+t+(n?";ext="+n:"")}function X(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2];if(n=new g(n),!e.country)return!1;if(!n.hasCountry(e.country))throw new Error("Unknown country: "+e.country);return n.country(e.country),n.hasTypes()?void 0!==U(e,t,n.metadata):u(t.v2?e.nationalNumber:e.phone,n.nationalNumberPattern())}var J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Z={formatExtension:function(e,t,n){return""+e+n.ext()+t}};function Q(e,t,n,r){if(n=n?J({},Z,n):Z,r=new g(r),e.country){if(!r.hasCountry(e.country))throw new Error("Unknown country: "+e.country);r.country(e.country)}else{if(!e.countryCallingCode)return e.phone||"";r.chooseCountryByCountryCallingCode(e.countryCallingCode)}var o=r.countryCallingCode(),i=n.v2?e.nationalNumber:e.phone;switch(t){case"NATIONAL":return i?oe(ne(i,"NATIONAL",r),e.ext,r,n.formatExtension):"";case"INTERNATIONAL":return i?oe("+"+o+" "+ne(i,"INTERNATIONAL",r),e.ext,r,n.formatExtension):"+"+o;case"E.164":return"+"+o+i;case"RFC3966":return Y({number:"+"+o+i,ext:e.ext});case"IDD":if(!n.fromCountry)return;var a=function(e,t){var n=new g(t);return n.country(e),G.test(n.IDDPrefix())?n.IDDPrefix():n.defaultIDDPrefix()}(n.fromCountry,r.metadata);if(!a)return;if(n.humanReadable){var s=o&&function(e,t,n,r){var o=new g(r.metadata);if(o.country(n),t===o.countryCallingCode())return"1"===t?t+" "+ne(e,"NATIONAL",r):ne(e,"NATIONAL",r)}(i,r.countryCallingCode(),n.fromCountry,r);return oe(s||a+" "+o+" "+ne(i,"INTERNATIONAL",r),e.ext,r,n.formatExtension)}return""+a+o+i;default:throw new Error('Unknown "format" argument passed to "formatNumber()": "'+t+'"')}}var ee=/(\$\d)/;function te(e,t,n,r,o){var i=e.replace(new RegExp(t.pattern()),n?t.internationalFormat():!t.nationalPrefixFormattingRule()||t.nationalPrefixIsOptionalWhenFormatting()&&!r?t.format():t.format().replace(ee,t.nationalPrefixFormattingRule()));return n?re(i):i}function ne(e,t,n){var r=function(e,t){var n=e,r=Array.isArray(n),o=0;for(n=r?n:n[Symbol.iterator]();;){var i;if(r){if(o>=n.length)break;i=n[o++]}else{if((o=n.next()).done)break;i=o.value}var a=i;if(a.leadingDigitsPatterns().length>0){var s=a.leadingDigitsPatterns()[a.leadingDigitsPatterns().length-1];if(0!==t.search(s))continue}if(u(t,a.pattern()))return a}}(n.formats(),e);return r?te(e,r,"INTERNATIONAL"===t,!0):e}function re(e){return e.replace(new RegExp("["+c+"]+","g")," ").trim()}function oe(e,t,n,r){return t?r(e,t,n):e}var ie=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ae=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var se=function(){function e(t,n,r){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),!t)throw new TypeError("`countryCallingCode` not passed");if(!n)throw new TypeError("`nationalNumber` not passed");if(ce(t)){this.country=t;var o=new g(r);o.country(t),t=o.countryCallingCode()}this.countryCallingCode=t,this.nationalNumber=n,this.number="+"+this.countryCallingCode+this.nationalNumber,this.metadata=r}return ae(e,[{key:"isPossible",value:function(){return H(this,{v2:!0},this.metadata)}},{key:"isValid",value:function(){return X(this,{v2:!0},this.metadata)}},{key:"getType",value:function(){return U(this,{v2:!0},this.metadata)}},{key:"format",value:function(e,t){return Q(this,e,t?ie({},t,{v2:!0}):{v2:!0},this.metadata)}},{key:"formatNational",value:function(e){return this.format("NATIONAL",e)}},{key:"formatInternational",value:function(e){return this.format("INTERNATIONAL",e)}},{key:"getURI",value:function(e){return this.format("RFC3966",e)}}]),e}(),ce=function(e){return/^[A-Z]{2}$/.test(e)},ue=250,le=new RegExp("[+＋"+s+"]"),de=new RegExp("[^"+s+"]+$");function fe(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2];if(n=new g(n),t.defaultCountry&&!n.hasCountry(t.defaultCountry)){if(t.v2)throw new d("INVALID_COUNTRY");throw new Error("Unknown country: "+t.defaultCountry)}var r=function(e,t){if(e&&0===e.indexOf("tel:"))return K(e);var n=pe(e,t);if(!n||!A(n))return{};var r=function(e){var t=e.search(P);if(t<0)return{};for(var n=e.slice(0,t),r=e.match(P),o=1;o<r.length;){if(null!=r[o]&&r[o].length>0)return{number:n,ext:r[o]};o++}}(n);if(r.ext)return r;return{number:n}}(e,t.v2),a=r.number,s=r.ext;if(!a){if(t.v2)throw new d("NOT_A_NUMBER");return{}}var c=function(e,t,n){var r=ve(e,t,n.metadata),o=r.countryCallingCode,i=r.number;if(!i)return{countryCallingCode:o};var a=void 0;if(o)n.chooseCountryByCountryCallingCode(o);else{if(!t)return{};n.country(t),a=t,o=C(t,n.metadata)}var s=function(e,t){var n=M(e),r=void 0,o=he(n,t),i=o.number,a=o.carrierCode;if(t.possibleLengths())switch(W(i,void 0,t)){case"TOO_SHORT":case"INVALID_LENGTH":break;default:n=i,r=a}else u(n,t.nationalNumberPattern())&&!u(i,t.nationalNumberPattern())||(n=i,r=a);return{national_number:n,carrier_code:r}}(i,n),c=s.national_number,l=s.carrier_code,d=me(o,c,n);d&&(a=d,n.country(a));return{country:a,countryCallingCode:o,national_number:c,carrierCode:l}}(a,t.defaultCountry,n),l=c.country,f=c.national_number,p=c.countryCallingCode,h=c.carrierCode;if(!n.selectedCountry()){if(t.v2)throw new d("INVALID_COUNTRY");return{}}if(f.length<o){if(t.v2)throw new d("TOO_SHORT");return{}}if(f.length>i){if(t.v2)throw new d("TOO_LONG");return{}}if(t.v2){var m=new se(p,f,n.metadata);return l&&(m.country=l),h&&(m.carrierCode=h),s&&(m.ext=s),m}var v=!(!l||!u(f,n.nationalNumberPattern()));return t.extended?{country:l,countryCallingCode:p,carrierCode:h,valid:v,possible:!!v||!0===t.extended&&n.possibleLengths()&&q(f,0,n),phone:f,ext:s}:v?function(e,t,n){var r={country:e,phone:t};n&&(r.ext=n);return r}(l,f,s):{}}function pe(e,t){if(e)if(e.length>ue){if(t)throw new d("TOO_LONG")}else{var n=e.search(le);if(!(n<0))return e.slice(n).replace(de,"")}}function he(e,t){if(!e||!t.nationalPrefixForParsing())return{number:e};var n=new RegExp("^(?:"+t.nationalPrefixForParsing()+")"),r=n.exec(e);if(!r)return{number:e};var o=void 0,i=r.length-1;if(t.nationalPrefixTransformRule()&&r[i])o=e.replace(n,t.nationalPrefixTransformRule());else{var a=r[0];o=e.slice(a.length)}var s=void 0;return i>0&&(s=r[1]),{number:o,carrierCode:s}}function me(e,t,n){var r=n.countryCallingCodes()[e];return 1===r.length?r[0]:function(e,t,n){n=new g(n);var r=e,o=Array.isArray(r),i=0;for(r=o?r:r[Symbol.iterator]();;){var a;if(o){if(i>=r.length)break;a=r[i++]}else{if((i=r.next()).done)break;a=i.value}var s=a;if(n.country(s),n.leadingDigits()){if(t&&0===t.search(n.leadingDigits()))return s}else if(U({phone:t,country:s},void 0,n.metadata))return s}}(r,t,n.metadata)}function ve(e,t,n){if(!(e=M(e)))return{};if("+"!==e[0]){var r=function(e,t,n){if(t){var r=new g(n);r.country(t);var o=new RegExp(r.IDDPrefix());if(0===e.search(o)){var i=(e=e.slice(e.match(o)[0].length)).match(V);if(!(i&&null!=i[1]&&i[1].length>0&&"0"===i[1]))return e}}}(e,t,n);if(!r||r===e)return{number:e};e="+"+r}if("0"===e[1])return{};n=new g(n);for(var o=2;o-1<=a&&o<=e.length;){var i=e.slice(1,o);if(n.countryCallingCodes()[i])return{countryCallingCode:i,number:e.slice(o)};o++}return{}}var ye=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function ge(e,t,n){return fe(e,ye({},t,{v2:!0}),n)}var be="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},$e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_e=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function ke(e){var t=Array.prototype.slice.call(e),n=_e(t,4),r=n[0],o=n[1],i=n[2],a=n[3],s=void 0,c=void 0,u=void 0;if("string"!=typeof r)throw new TypeError("A text for parsing must be a string.");if(s=r,o&&"string"!=typeof o){if(!we(o))throw new Error("Invalid second argument: "+o);i?(c=o,u=i):u=o}else a?(c=i,u=a):(c=void 0,u=i),o&&(c=$e({defaultCountry:o},c));return{text:s,options:c,metadata:u}}var we=function(e){return"object"===(void 0===e?"undefined":be(e))},Ce=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function xe(){var e=ke(arguments);return function(e,t,n){t&&t.defaultCountry&&!x(t.defaultCountry,n)&&(t=Ce({},t,{defaultCountry:void 0}));try{return ge(e,t,n)}catch(e){if(!(e instanceof d))throw e}}(e.text,e.options,e.metadata)}"function"==typeof Symbol&&Symbol.iterator;"function"==typeof Symbol&&Symbol.iterator;function Oe(e,t){if(e<0||t<=0||t<e)throw new TypeError;return"{"+e+","+t+"}"}function Se(e,t){var n=t.search(e);return n>=0?t.slice(0,n):t}var Ee=/[\\\/] *x/;function je(e){return Se(Ee,e)}var Te=/(?:(?:[0-3]?\d\/[01]?\d)|(?:[01]?\d\/[0-3]?\d))\/(?:[12]\d)?\d{2}/,Pe=/[12]\d{3}[-\/]?[01]\d[-\/]?[0-3]\d +[0-2]\d$/,Ne=/^:[0-5]\d/;function Ae(e,t,n){if(Te.test(e))return!1;if(Pe.test(e)){var r=n.slice(t+e.length);if(Ne.test(r))return!1}return!0}var Ie="   ᠎ - \u2028\u2029  　",De="["+Ie+"]",Re="A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",Me=new RegExp("[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),Fe=new RegExp("[$¢-¥֏؋৲৳৻૱௹฿៛₠-₹꠸﷼﹩＄￠￡￥￦]"),Le=new RegExp("[̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ܑۭܰ-݊ަ-ް߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ࣾऀ-ंऺ़ु-ै्॑-ॗॢॣঁ়ু-ৄ্ৢৣਁਂ਼ੁੂੇੈੋ-੍ੑੰੱੵઁં઼ુ-ૅેૈ્ૢૣଁ଼ିୁ-ୄ୍ୖୢୣஂீ்ా-ీె-ైొ-్ౕౖౢౣ಼ಿೆೌ್ೢೣു-ൄ്ൢൣ්ි-ුූัิ-ฺ็-๎ັິ-ູົຼ່-ໍཱ༹༘༙༵༷-ཾྀ-྄྆྇ྍ-ྗྙ-ྼ࿆ိ-ူဲ-့္်ွှၘၙၞ-ၠၱ-ၴႂႅႆႍႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴឵ិ-ួំ៉-៓៝᠋-᠍ᢩᤠ-ᤢᤧᤨᤲ᤹-᤻ᨘᨗᩖᩘ-ᩞ᩠ᩢᩥ-ᩬᩳ-᩿᩼ᬀ-ᬃ᬴ᬶ-ᬺᬼᭂ᭫-᭳ᮀᮁᮢ-ᮥᮨᮩ᯦᮫ᯨᯩᯭᯯ-ᯱᰬ-ᰳᰶ᰷᳐-᳔᳒-᳢᳠-᳨᳭᳴᷀-ᷦ᷼-᷿⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〭꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠥꠦ꣄꣠-꣱ꤦ-꤭ꥇ-ꥑꦀ-ꦂ꦳ꦶ-ꦹꦼꨩ-ꨮꨱꨲꨵꨶꩃꩌꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫬꫭ꫶ꯥꯨ꯭ﬞ︀-️︠-︦]"),Ue=new RegExp("[\0--ÿĀ-ſḀ-ỿƀ-ɏ̀-ͯ]");function Be(e){return!(!Me.test(e)&&!Le.test(e))&&Ue.test(e)}function We(e){return"%"===e||Fe.test(e)}var He=new RegExp("^[(\\[（［+＋]"),qe=Oe(0,3),Ve=new RegExp("^(?:[(\\[（［])?(?:[^(\\[（［)\\]）］]+[)\\]）］])?[^(\\[（［)\\]）］]+(?:[(\\[（［][^(\\[（［)\\]）］]+[)\\]）］])"+qe+"[^(\\[（［)\\]）］]*$"),Ge=/\d{1,5}-+\d{1,5}\s{0,4}\(\d{1,4}/;function ze(e,t,n,r){if(Ve.test(e)&&!Ge.test(e)){if("POSSIBLE"!==r){if(t>0&&!He.test(e)){var o=n[t-1];if(We(o)||Be(o))return!1}var i=t+e.length;if(i<n.length){var a=n[i];if(We(a)||Be(a))return!1}}return!0}}var Ke=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var Ye="[+＋]{0,1}(?:["+c+"]*["+s+"]){3,}["+c+s+"]*",Xe=new RegExp("^[  ­​⁠　]+"),Je=new RegExp("["+c+"]+$");var Ze=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments[2];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.state="NOT_READY",this.text=t,this.options=n,this.metadata=r,this.regexp=new RegExp(Ye+"(?:"+j+")?","ig")}return Ke(e,[{key:"find",value:function(){var e=this.regexp.exec(this.text);if(e){var t=e[0],n=e.index;t=t.replace(Xe,""),n+=e[0].length-t.length,t=je(t=t.replace(Je,""));var r=this.parseCandidate(t,n);return r||this.find()}}},{key:"parseCandidate",value:function(e,t){if(Ae(e,t,this.text)&&ze(e,t,this.text,this.options.extended?"POSSIBLE":"VALID")){var n=fe(e,this.options,this.metadata);if(n.phone)return n.startsAt=t,n.endsAt=t+e.length,n}}},{key:"hasNext",value:function(){return"NOT_READY"===this.state&&(this.last_match=this.find(),this.last_match?this.state="READY":this.state="DONE"),"READY"===this.state}},{key:"next",value:function(){if(!this.hasNext())throw new Error("No next element");var e=this.last_match;return this.last_match=null,this.state="NOT_READY",e}}]),e}();var Qe=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function et(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var tt=function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;et(this,e),this.key=t,this.value=n,this.next=r,this.prev=o},nt=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;et(this,e),this.size=0,this.limit=t,this.head=null,this.tail=null,this.cache={}}return Qe(e,[{key:"put",value:function(e,t){if(this.ensureLimit(),this.head){var n=new tt(e,t,this.head);this.head.prev=n,this.head=n}else this.head=this.tail=new tt(e,t);this.cache[e]=this.head,this.size++}},{key:"get",value:function(e){if(this.cache[e]){var t=this.cache[e].value;return this.remove(e),this.put(e,t),t}console.log("Item not available in cache for key "+e)}},{key:"ensureLimit",value:function(){this.size===this.limit&&this.remove(this.tail.key)}},{key:"remove",value:function(e){var t=this.cache[e];null!==t.prev?t.prev.next=t.next:this.head=t.next,null!==t.next?t.next.prev=t.prev:this.tail=t.prev,delete this.cache[e],this.size--}},{key:"clear",value:function(){this.head=null,this.tail=null,this.size=0,this.cache={}}}]),e}(),rt=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var ot=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.cache=new nt(t)}return rt(e,[{key:"getPatternForRegExp",value:function(e){var t=this.cache.get(e);return t||(t=new RegExp("^"+e),this.cache.put(e,t)),t}}]),e}(),it={POSSIBLE:function(e,t,n){return!0},VALID:function(e,t,n){return!(!X(e,void 0,n)||!at(e,t.toString(),n))},STRICT_GROUPING:function(e,t,n,r){var o=t.toString();return!(!X(e,void 0,n)||!at(e,o,n)||ct(e,o)||!st(e,n))&&ut(e,t,n,ft,r)},EXACT_GROUPING:function(e,t,n,r){var o=t.toString();return!(!X(e,void 0,n)||!at(e,o,n)||ct(e,o)||!st(e,n))&&ut(e,t,n,dt,r)}};function at(e,t,n){for(var r=0;r<t.length-1;r++){var o=t.charAt(r);if("x"===o||"X"===o){var i=t.charAt(r+1);if("x"===i||"X"===i){if(r++,util.isNumberMatch(e,t.substring(r))!=MatchType.NSN_MATCH)return!1}else if(R(t.substring(r))!==e.ext)return!1}}return!0}function st(e,t){if("FROM_DEFAULT_COUNTRY"!=e.getCountryCodeSource())return!0;var n=util.getRegionCodeForCountryCode(e.getCountryCode()),r=util.getMetadataForRegion(n);if(null==r)return!0;var o=util.getNationalSignificantNumber(e),i=util.chooseFormattingPatternForNumber(r.numberFormats(),o);if(i&&i.getNationalPrefixFormattingRule().length>0){if(i.getNationalPrefixOptionalWhenFormatting())return!0;if(PhoneNumberUtil.formattingRuleHasFirstGroupOnly(i.getNationalPrefixFormattingRule()))return!0;var a=PhoneNumberUtil.normalizeDigitsOnly(e.getRawInput());return util.maybeStripNationalPrefixAndCarrierCode(a,r,null)}return!0}function ct(e,t){var n=t.indexOf("/");if(n<0)return!1;var r=t.indexOf("/",n+1);return!(r<0)&&(!(e.getCountryCodeSource()===CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN||e.getCountryCodeSource()===CountryCodeSource.FROM_NUMBER_WITHOUT_PLUS_SIGN)||PhoneNumberUtil.normalizeDigitsOnly(t.substring(0,n))!==String(e.getCountryCode())||t.slice(r+1).indexOf("/")>=0)}function ut(e,t,n,r,o){var i=normalizeDigits(t,!0),a=lt(n,e,null);if(r(n,e,i,a))return!0;var s=MetadataManager.getAlternateFormatsForCountry(e.getCountryCode()),c=util.getNationalSignificantNumber(e);if(s){var u=s.numberFormats(),l=Array.isArray(u),d=0;for(u=l?u:u[Symbol.iterator]();;){var f;if(l){if(d>=u.length)break;f=u[d++]}else{if((d=u.next()).done)break;f=d.value}var p=f;if(p.leadingDigitsPatterns().length>0)if(!o.getPatternForRegExp("^"+p.leadingDigitsPatterns()[0]).test(c))continue;if(r(n,e,i,a=lt(n,e,p)))return!0}}return!1}function lt(e,t,n){if(n){var r=util.getNationalSignificantNumber(t);return util.formatNsnUsingPattern(r,n,"RFC3966",e).split("-")}var o=formatNumber(t,"RFC3966",e),i=o.indexOf(";");i<0&&(i=o.length);var a=o.indexOf("-")+1;return o.slice(a,i).split("-")}function dt(e,t,n,r){var o=n.split(NON_DIGITS_PATTERN),i=t.hasExtension()?o.length-2:o.length-1;if(1==o.length||o[i].contains(util.getNationalSignificantNumber(t)))return!0;for(var a,s,c=r.length-1;c>0&&i>=0;){if(o[i]!==r[c])return!1;c--,i--}return i>=0&&(a=o[i],s=r[0],a.indexOf(s,a.length-s.length)===a.length-s.length)}function ft(e,t,n,r){var o,i,a=0;if(t.getCountryCodeSource()!==CountryCodeSource.FROM_DEFAULT_COUNTRY){var s=String(t.getCountryCode());a=n.indexOf(s)+s.length()}for(var c=0;c<r.length;c++){if((a=n.indexOf(r[c],a))<0)return!1;if(a+=r[c].length(),0==c&&a<n.length()){var u=util.getRegionCodeForCountryCode(t.getCountryCode());if(null!=util.getNddPrefixForRegion(u,!0)&&Character.isDigit(n.charAt(a))){var l=util.getNationalSignificantNumber(t);return o=n.slice(a-r[c].length),i=l,0===o.indexOf(i)}}}return n.slice(a).contains(t.getExtension())}var pt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ht=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var mt=["\\/+(.*)/","(\\([^(]*)","(?:"+De+"-|-"+De+")"+De+"*(.+)","[‒-―－]"+De+"*(.+)","\\.+"+De+"*([^.]+)",De+"+([^   ᠎ - \u2028\u2029  　]+)"],vt=Oe(0,2),yt=Oe(0,4),gt=i+a,bt=Oe(0,gt),$t="["+c+"]"+yt,_t="[0-9٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꩐-꩙꯰-꯹０-９]"+Oe(1,gt),kt="(?:[(\\[（［+＋]"+$t+")"+vt+_t+"(?:"+$t+_t+")"+bt+"(?:"+T+")?",wt=new RegExp("[^0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൦-൵๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꩐-꩙꯰-꯹０-９"+Re+"#]+$"),Ct=Number.MAX_SAFE_INTEGER||Math.pow(2,53)-1,xt=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments[2];if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.state="NOT_READY",this.searchIndex=0,this.regExpCache=new ot(32),!(n=pt({},n,{defaultCountry:n.defaultCountry&&x(n.defaultCountry,r)?n.defaultCountry:void 0,leniency:n.leniency||n.extended?"POSSIBLE":"VALID",maxTries:n.maxTries||Ct})).leniency)throw new TypeError("`Leniency` not supplied");if(n.maxTries<0)throw new TypeError("`maxTries` not supplied");if(this.text=t,this.options=n,this.metadata=r,this.leniency=it[n.leniency],!this.leniency)throw new TypeError("Unknown leniency: "+n.leniency+".");this.maxTries=n.maxTries,this.PATTERN=new RegExp(kt,"ig")}return ht(e,[{key:"find",value:function(){for(var e=void 0;this.maxTries>0&&null!==(e=this.PATTERN.exec(this.text));){var t=e[0],n=e.index;if(Ae(t=je(t),n,this.text)){var r=this.parseAndVerify(t,n,this.text)||this.extractInnerMatch(t,n,this.text);if(r){if(this.options.v2){var o=new se(r.country,r.phone,this.metadata);return r.ext&&(o.ext=r.ext),{startsAt:r.startsAt,endsAt:r.endsAt,number:o}}return r}}this.maxTries--}}},{key:"extractInnerMatch",value:function(e,t,n){var r=mt,o=Array.isArray(r),i=0;for(r=o?r:r[Symbol.iterator]();;){var a;if(o){if(i>=r.length)break;a=r[i++]}else{if((i=r.next()).done)break;a=i.value}for(var s=!0,c=void 0,u=new RegExp(a,"g");null!==(c=u.exec(e))&&this.maxTries>0;){if(s){var l=Se(wt,e.slice(0,c.index)),d=this.parseAndVerify(l,t,n);if(d)return d;this.maxTries--,s=!1}var f=Se(wt,c[1]),p=this.parseAndVerify(f,t+c.index,n);if(p)return p;this.maxTries--}}}},{key:"parseAndVerify",value:function(e,t,n){if(ze(e,t,n,this.options.leniency)){var r=fe(e,{extended:!0,defaultCountry:this.options.defaultCountry},this.metadata);if(r.possible&&this.leniency(r,e,this.metadata,this.regExpCache)){var o={startsAt:t,endsAt:t+e.length,country:r.country,phone:r.phone};return r.ext&&(o.ext=r.ext),o}}}},{key:"hasNext",value:function(){return"NOT_READY"===this.state&&(this.lastMatch=this.find(),this.lastMatch?this.state="READY":this.state="DONE"),"READY"===this.state}},{key:"next",value:function(){if(!this.hasNext())throw new Error("No next element");var e=this.lastMatch;return this.lastMatch=null,this.state="NOT_READY",e}}]),e}();var Ot=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var St=Dt("9",15),Et=new RegExp("x"),jt=function(){return/\[([^\[\]])*\]/g},Tt=function(){return/\d(?=[^,}][^,}])/g},Pt=new RegExp("^["+c+"]*(\\$\\d["+c+"]*)+$"),Nt=new RegExp("^"+("[+＋]{0,1}["+c+s+"]*")+"$","i"),At=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={},this.metadata=new g(n),t&&this.metadata.hasCountry(t)&&(this.defaultCountry=t),this.reset()}return Ot(e,[{key:"input",value:function(e){var t=pe(e)||"";return t||e&&e.indexOf("+")>=0&&(t="+"),Nt.test(t)?this.processInput(M(t)):this.currentOutput}},{key:"processInput",value:function(e){if("+"===e[0]&&(this.parsedInput||(this.parsedInput+="+",this.resetCountriness()),e=e.slice(1)),this.parsedInput+=e,this.nationalNumber+=e,this.isInternational())if(this.countryCallingCode)this.country||this.determineTheCountry();else{if(!this.nationalNumber)return this.parsedInput;if(!this.extractCountryCallingCode())return this.parsedInput;this.initialize_phone_number_formats_for_this_country_calling_code(),this.resetFormat(),this.determineTheCountry()}else{var t=this.nationalPrefix;this.nationalNumber=this.nationalPrefix+this.nationalNumber,this.extractNationalPrefix(),this.nationalPrefix!==t&&(this.matching_formats=void 0,this.resetFormat())}if(!this.nationalNumber)return this.format_as_non_formatted_number();this.match_formats_by_leading_digits();var n=this.formatNationalNumber(e);return n?this.formatFullNumber(n):this.format_as_non_formatted_number()}},{key:"format_as_non_formatted_number",value:function(){return this.isInternational()&&this.countryCallingCode?"+"+this.countryCallingCode+this.nationalNumber:this.parsedInput}},{key:"formatNationalNumber",value:function(e){var t=void 0;this.chosenFormat&&(t=this.formatNextNationalNumberDigits(e));var n=this.attempt_to_format_complete_phone_number();return n||(this.chooseAnotherFormat()?this.reformatNationalNumber():t)}},{key:"reset",value:function(){return this.parsedInput="",this.currentOutput="",this.nationalPrefix="",this.nationalNumber="",this.carrierCode="",this.resetCountriness(),this.resetFormat(),this}},{key:"resetCountry",value:function(){this.isInternational()?this.country=void 0:this.country=this.defaultCountry}},{key:"resetCountriness",value:function(){this.resetCountry(),this.defaultCountry&&!this.isInternational()?(this.metadata.country(this.defaultCountry),this.countryCallingCode=this.metadata.countryCallingCode(),this.initialize_phone_number_formats_for_this_country_calling_code()):(this.metadata.country(void 0),this.countryCallingCode=void 0,this.available_formats=[],this.matching_formats=void 0)}},{key:"resetFormat",value:function(){this.chosenFormat=void 0,this.template=void 0,this.partially_populated_template=void 0,this.last_match_position=-1}},{key:"reformatNationalNumber",value:function(){return this.formatNextNationalNumberDigits(this.nationalNumber)}},{key:"initialize_phone_number_formats_for_this_country_calling_code",value:function(){this.available_formats=this.metadata.formats().filter(function(e){return Pt.test(e.internationalFormat())}),this.matching_formats=void 0}},{key:"match_formats_by_leading_digits",value:function(){var e=this.nationalNumber,t=e.length-3;t<0&&(t=0);var n=this.had_enough_leading_digits&&this.matching_formats||this.available_formats;this.had_enough_leading_digits=this.shouldFormat(),this.matching_formats=n.filter(function(n){var r=n.leadingDigitsPatterns().length;if(0===r)return!0;var o=Math.min(t,r-1),i=n.leadingDigitsPatterns()[o];return new RegExp("^("+i+")").test(e)}),this.chosenFormat&&-1===this.matching_formats.indexOf(this.chosenFormat)&&this.resetFormat()}},{key:"shouldFormat",value:function(){return this.nationalNumber.length>=3}},{key:"attempt_to_format_complete_phone_number",value:function(){var e=this.matching_formats,t=Array.isArray(e),n=0;for(e=t?e:e[Symbol.iterator]();;){var r;if(t){if(n>=e.length)break;r=e[n++]}else{if((n=e.next()).done)break;r=n.value}var o=r;if(new RegExp("^(?:"+o.pattern()+")$").test(this.nationalNumber)&&this.isFormatApplicable(o)){this.resetFormat(),this.chosenFormat=o;var i=te(this.nationalNumber,o,this.isInternational(),""!==this.nationalPrefix,this.metadata);if(this.nationalPrefix&&"1"===this.countryCallingCode&&(i="1 "+i),this.createFormattingTemplate(o))this.reformatNationalNumber();else{var a=this.formatFullNumber(i);this.template=a.replace(/[\d\+]/g,"x"),this.partially_populated_template=a}return i}}}},{key:"formatFullNumber",value:function(e){return this.isInternational()?"+"+this.countryCallingCode+" "+e:e}},{key:"extractCountryCallingCode",value:function(){var e=ve(this.parsedInput,this.defaultCountry,this.metadata.metadata),t=e.countryCallingCode,n=e.number;if(t)return this.countryCallingCode=t,this.nationalNumber=n,this.metadata.chooseCountryByCountryCallingCode(t),void 0!==this.metadata.selectedCountry()}},{key:"extractNationalPrefix",value:function(){if(this.nationalPrefix="",this.metadata.selectedCountry()){var e=he(this.nationalNumber,this.metadata),t=e.number,n=e.carrierCode;if(n&&(this.carrierCode=n),this.metadata.possibleLengths()&&(!this.isPossibleNumber(this.nationalNumber)||this.isPossibleNumber(t))||!u(this.nationalNumber,this.metadata.nationalNumberPattern())||u(t,this.metadata.nationalNumberPattern()))return this.nationalPrefix=this.nationalNumber.slice(0,this.nationalNumber.length-t.length),this.nationalNumber=t,this.nationalPrefix}}},{key:"isPossibleNumber",value:function(e){switch(W(e,void 0,this.metadata)){case"IS_POSSIBLE":return!0;default:return!1}}},{key:"chooseAnotherFormat",value:function(){var e=this.matching_formats,t=Array.isArray(e),n=0;for(e=t?e:e[Symbol.iterator]();;){var r;if(t){if(n>=e.length)break;r=e[n++]}else{if((n=e.next()).done)break;r=n.value}var o=r;if(this.chosenFormat===o)return;if(this.isFormatApplicable(o)&&this.createFormattingTemplate(o))return this.chosenFormat=o,this.last_match_position=-1,!0}this.resetCountry(),this.resetFormat()}},{key:"isFormatApplicable",value:function(e){return!(!this.isInternational()&&!this.nationalPrefix&&e.nationalPrefixIsMandatoryWhenFormatting())&&!(this.nationalPrefix&&!e.usesNationalPrefix()&&!e.nationalPrefixIsOptionalWhenFormatting())}},{key:"createFormattingTemplate",value:function(e){if(!(e.pattern().indexOf("|")>=0)){var t=this.getTemplateForNumberFormatPattern(e);if(t)return this.partially_populated_template=t,this.isInternational()?this.template="x"+Dt("x",this.countryCallingCode.length)+" "+t:this.template=t.replace(/\d/g,"x"),this.template}}},{key:"getTemplateForNumberFormatPattern",value:function(e){var t=e.pattern();t=t.replace(jt(),"\\d").replace(Tt(),"\\d");var n=St.match(t)[0];if(!(this.nationalNumber.length>n.length)){var r=this.getFormatFormat(e),o=new RegExp("^"+t+"$"),i=this.nationalNumber.replace(/\d/g,"9");return o.test(i)&&(n=i),n.replace(new RegExp(t),r).replace(new RegExp("9","g"),"x")}}},{key:"formatNextNationalNumberDigits",value:function(e){var t=e.split(""),n=Array.isArray(t),r=0;for(t=n?t:t[Symbol.iterator]();;){var o;if(n){if(r>=t.length)break;o=t[r++]}else{if((r=t.next()).done)break;o=r.value}var i=o;if(-1===this.partially_populated_template.slice(this.last_match_position+1).search(Et))return this.chosenFormat=void 0,this.template=void 0,void(this.partially_populated_template=void 0);this.last_match_position=this.partially_populated_template.search(Et),this.partially_populated_template=this.partially_populated_template.replace(Et,i)}return It(this.partially_populated_template,this.last_match_position+1)}},{key:"isInternational",value:function(){return this.parsedInput&&"+"===this.parsedInput[0]}},{key:"getFormatFormat",value:function(e){if(this.isInternational())return re(e.internationalFormat());if(e.nationalPrefixFormattingRule()){if(this.nationalPrefix||!e.usesNationalPrefix())return e.format().replace(ee,e.nationalPrefixFormattingRule())}else if("1"===this.countryCallingCode&&"1"===this.nationalPrefix)return"1 "+e.format();return e.format()}},{key:"determineTheCountry",value:function(){this.country=me(this.countryCallingCode,this.nationalNumber,this.metadata)}},{key:"getNumber",value:function(){if(this.countryCallingCode&&this.nationalNumber){var e=new se(this.country||this.countryCallingCode,this.nationalNumber,this.metadata.metadata);return this.carrierCode&&(e.carrierCode=this.carrierCode),e}}},{key:"getNationalNumber",value:function(){return this.nationalNumber}},{key:"getTemplate",value:function(){if(this.template){for(var e=-1,t=0;t<this.parsedInput.length;)e=this.template.indexOf("x",e+1),t++;return It(this.template,e+1)}}}]),e}();function It(e,t){return")"===e[t]&&t++,function(e){for(var t=[],n=0;n<e.length;)"("===e[n]?t.push(n):")"===e[n]&&t.pop(),n++;var r=0,o="";t.push(e.length);var i=t,a=Array.isArray(i),s=0;for(i=a?i:i[Symbol.iterator]();;){var c;if(a){if(s>=i.length)break;c=i[s++]}else{if((s=i.next()).done)break;c=s.value}var u=c;o+=e.slice(r,u),r=u+1}return o}(e.slice(0,t))}function Dt(e,t){if(t<1)return"";for(var n="";t>1;)1&t&&(n+=e),t>>=1,e+=e;return n+e}function Rt(){var e=Array.prototype.slice.call(arguments);return e.push(r),xe.apply(this,e)}function Mt(e,t){Ze.call(this,e,t,r)}function Ft(e,t){xt.call(this,e,t,r)}function Lt(e){At.call(this,e,r)}function Ut(){var e=Array.prototype.slice.call(arguments);return e.push(r),x.apply(this,e)}n.d(t,"b",function(){return Rt}),n.d(t,"a",function(){return Ut}),Mt.prototype=Object.create(Ze.prototype,{}),Mt.prototype.constructor=Mt,Ft.prototype=Object.create(xt.prototype,{}),Ft.prototype.constructor=Ft,Lt.prototype=Object.create(At.prototype,{}),Lt.prototype.constructor=Lt},function(e,t,n){var r;
    /*!
     * EventEmitter2
     * https://github.com/hij1nx/EventEmitter2
     *
     * Copyright (c) 2013 hij1nx
     * Licensed under the MIT license.
     */!function(o){var i=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},a=10;function s(){this._events={},this._conf&&c.call(this,this._conf)}function c(e){e?(this._conf=e,e.delimiter&&(this.delimiter=e.delimiter),this._events.maxListeners=e.maxListeners!==o?e.maxListeners:a,e.wildcard&&(this.wildcard=e.wildcard),e.newListener&&(this.newListener=e.newListener),this.wildcard&&(this.listenerTree={})):this._events.maxListeners=a}function u(e){console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",e),console.trace&&console.trace()}function l(e){this._events={},this.newListener=!1,c.call(this,e)}function d(e,t,n,r){if(!n)return[];var o,i,a,s,c,u,l,f=[],p=t.length,h=t[r],m=t[r+1];if(r===p&&n._listeners){if("function"==typeof n._listeners)return e&&e.push(n._listeners),[n];for(o=0,i=n._listeners.length;o<i;o++)e&&e.push(n._listeners[o]);return[n]}if("*"===h||"**"===h||n[h]){if("*"===h){for(a in n)"_listeners"!==a&&n.hasOwnProperty(a)&&(f=f.concat(d(e,t,n[a],r+1)));return f}if("**"===h){for(a in(l=r+1===p||r+2===p&&"*"===m)&&n._listeners&&(f=f.concat(d(e,t,n,p))),n)"_listeners"!==a&&n.hasOwnProperty(a)&&("*"===a||"**"===a?(n[a]._listeners&&!l&&(f=f.concat(d(e,t,n[a],p))),f=f.concat(d(e,t,n[a],r))):f=a===m?f.concat(d(e,t,n[a],r+2)):f.concat(d(e,t,n[a],r)));return f}f=f.concat(d(e,t,n[h],r+1))}if((s=n["*"])&&d(e,t,s,r+1),c=n["**"])if(r<p)for(a in c._listeners&&d(e,t,c,p),c)"_listeners"!==a&&c.hasOwnProperty(a)&&(a===m?d(e,t,c[a],r+2):a===h?d(e,t,c[a],r+1):((u={})[a]=c[a],d(e,t,{"**":u},r+1)));else c._listeners?d(e,t,c,p):c["*"]&&c["*"]._listeners&&d(e,t,c["*"],p);return f}function f(e,t){for(var n=0,r=(e="string"==typeof e?e.split(this.delimiter):e.slice()).length;n+1<r;n++)if("**"===e[n]&&"**"===e[n+1])return;for(var i=this.listenerTree,a=e.shift();a!==o;){if(i[a]||(i[a]={}),i=i[a],0===e.length)return i._listeners?("function"==typeof i._listeners&&(i._listeners=[i._listeners]),i._listeners.push(t),!i._listeners.warned&&this._events.maxListeners>0&&i._listeners.length>this._events.maxListeners&&(i._listeners.warned=!0,u(i._listeners.length))):i._listeners=t,!0;a=e.shift()}return!0}l.EventEmitter2=l,l.prototype.delimiter=".",l.prototype.setMaxListeners=function(e){e!==o&&(this._events||s.call(this),this._events.maxListeners=e,this._conf||(this._conf={}),this._conf.maxListeners=e)},l.prototype.event="",l.prototype.once=function(e,t){return this.many(e,1,t),this},l.prototype.many=function(e,t,n){var r=this;if("function"!=typeof n)throw new Error("many only accepts instances of Function");function o(){0==--t&&r.off(e,o),n.apply(this,arguments)}return o._origin=n,this.on(e,o),r},l.prototype.emit=function(){this._events||s.call(this);var e=arguments[0];if("newListener"===e&&!this.newListener&&!this._events.newListener)return!1;var t,n,r,o,i,a=arguments.length;if(this._all&&this._all.length){if(i=this._all.slice(),a>3)for(t=new Array(a),o=0;o<a;o++)t[o]=arguments[o];for(r=0,n=i.length;r<n;r++)switch(this.event=e,a){case 1:i[r].call(this,e);break;case 2:i[r].call(this,e,arguments[1]);break;case 3:i[r].call(this,e,arguments[1],arguments[2]);break;default:i[r].apply(this,t)}}if(this.wildcard){i=[];var c="string"==typeof e?e.split(this.delimiter):e.slice();d.call(this,i,c,this.listenerTree,0)}else{if("function"==typeof(i=this._events[e])){switch(this.event=e,a){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:for(t=new Array(a-1),o=1;o<a;o++)t[o-1]=arguments[o];i.apply(this,t)}return!0}i&&(i=i.slice())}if(i&&i.length){if(a>3)for(t=new Array(a-1),o=1;o<a;o++)t[o-1]=arguments[o];for(r=0,n=i.length;r<n;r++)switch(this.event=e,a){case 1:i[r].call(this);break;case 2:i[r].call(this,arguments[1]);break;case 3:i[r].call(this,arguments[1],arguments[2]);break;default:i[r].apply(this,t)}return!0}if(!this._all&&"error"===e)throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");return!!this._all},l.prototype.emitAsync=function(){this._events||s.call(this);var e=arguments[0];if("newListener"===e&&!this.newListener&&!this._events.newListener)return Promise.resolve([!1]);var t,n,r,o,i,a=[],c=arguments.length;if(this._all){if(c>3)for(t=new Array(c),o=1;o<c;o++)t[o]=arguments[o];for(r=0,n=this._all.length;r<n;r++)switch(this.event=e,c){case 1:a.push(this._all[r].call(this,e));break;case 2:a.push(this._all[r].call(this,e,arguments[1]));break;case 3:a.push(this._all[r].call(this,e,arguments[1],arguments[2]));break;default:a.push(this._all[r].apply(this,t))}}if(this.wildcard){i=[];var u="string"==typeof e?e.split(this.delimiter):e.slice();d.call(this,i,u,this.listenerTree,0)}else i=this._events[e];if("function"==typeof i)switch(this.event=e,c){case 1:a.push(i.call(this));break;case 2:a.push(i.call(this,arguments[1]));break;case 3:a.push(i.call(this,arguments[1],arguments[2]));break;default:for(t=new Array(c-1),o=1;o<c;o++)t[o-1]=arguments[o];a.push(i.apply(this,t))}else if(i&&i.length){if(c>3)for(t=new Array(c-1),o=1;o<c;o++)t[o-1]=arguments[o];for(r=0,n=i.length;r<n;r++)switch(this.event=e,c){case 1:a.push(i[r].call(this));break;case 2:a.push(i[r].call(this,arguments[1]));break;case 3:a.push(i[r].call(this,arguments[1],arguments[2]));break;default:a.push(i[r].apply(this,t))}}else if(!this._all&&"error"===e)return arguments[1]instanceof Error?Promise.reject(arguments[1]):Promise.reject("Uncaught, unspecified 'error' event.");return Promise.all(a)},l.prototype.on=function(e,t){if("function"==typeof e)return this.onAny(e),this;if("function"!=typeof t)throw new Error("on only accepts instances of Function");return this._events||s.call(this),this.emit("newListener",e,t),this.wildcard?(f.call(this,e,t),this):(this._events[e]?("function"==typeof this._events[e]&&(this._events[e]=[this._events[e]]),this._events[e].push(t),!this._events[e].warned&&this._events.maxListeners>0&&this._events[e].length>this._events.maxListeners&&(this._events[e].warned=!0,u(this._events[e].length))):this._events[e]=t,this)},l.prototype.onAny=function(e){if("function"!=typeof e)throw new Error("onAny only accepts instances of Function");return this._all||(this._all=[]),this._all.push(e),this},l.prototype.addListener=l.prototype.on,l.prototype.off=function(e,t){if("function"!=typeof t)throw new Error("removeListener only takes instances of Function");var n,r=[];if(this.wildcard){var a="string"==typeof e?e.split(this.delimiter):e.slice();r=d.call(this,null,a,this.listenerTree,0)}else{if(!this._events[e])return this;n=this._events[e],r.push({_listeners:n})}for(var s=0;s<r.length;s++){var c=r[s];if(n=c._listeners,i(n)){for(var u=-1,l=0,f=n.length;l<f;l++)if(n[l]===t||n[l].listener&&n[l].listener===t||n[l]._origin&&n[l]._origin===t){u=l;break}if(u<0)continue;return this.wildcard?c._listeners.splice(u,1):this._events[e].splice(u,1),0===n.length&&(this.wildcard?delete c._listeners:delete this._events[e]),this.emit("removeListener",e,t),this}(n===t||n.listener&&n.listener===t||n._origin&&n._origin===t)&&(this.wildcard?delete c._listeners:delete this._events[e],this.emit("removeListener",e,t))}return function e(t){if(t!==o){var n=Object.keys(t);for(var r in n){var i=n[r],a=t[i];a instanceof Function||"object"!=typeof a||null===a||(Object.keys(a).length>0&&e(t[i]),0===Object.keys(a).length&&delete t[i])}}}(this.listenerTree),this},l.prototype.offAny=function(e){var t,n=0,r=0;if(e&&this._all&&this._all.length>0){for(n=0,r=(t=this._all).length;n<r;n++)if(e===t[n])return t.splice(n,1),this.emit("removeListenerAny",e),this}else{for(n=0,r=(t=this._all).length;n<r;n++)this.emit("removeListenerAny",t[n]);this._all=[]}return this},l.prototype.removeListener=l.prototype.off,l.prototype.removeAllListeners=function(e){if(0===arguments.length)return!this._events||s.call(this),this;if(this.wildcard)for(var t="string"==typeof e?e.split(this.delimiter):e.slice(),n=d.call(this,null,t,this.listenerTree,0),r=0;r<n.length;r++){var o=n[r];o._listeners=null}else this._events&&(this._events[e]=null);return this},l.prototype.listeners=function(e){if(this.wildcard){var t=[],n="string"==typeof e?e.split(this.delimiter):e.slice();return d.call(this,t,n,this.listenerTree,0),t}return this._events||s.call(this),this._events[e]||(this._events[e]=[]),i(this._events[e])||(this._events[e]=[this._events[e]]),this._events[e]},l.prototype.listenerCount=function(e){return this.listeners(e).length},l.prototype.listenersAny=function(){return this._all?this._all:[]},(r=function(){return l}.call(t,n,t,e))===o||(e.exports=r)}()},function(e,t,n){e.exports=n(426)},function(e,t,n){e.exports=n(429)},function(e,t){e.exports=function(e,t){t||(t=[0,""]),e=String(e);var n=parseFloat(e,10);return t[0]=n,t[1]=e.match(/[\d.\-\+]*\s*(.*)/)[1]||"",t}},function(e,t){e.exports=function(e){if("function"!=typeof Promise){var t=new Error("Device enumeration not supported.");if(t.kind="METHOD_NOT_AVAILABLE",e)return console.warn("module now uses promise based api - callback is deprecated"),e(t);throw t}return new Promise(function(t,n){var r=function(n){for(var r=[],o=0;o<n.length;o++){var i=n[o],a=i.kind||null;a&&"audio"===a.toLowerCase()?a="audioinput":a&&"video"===a.toLowerCase()&&(a="videoinput"),r.push({facing:i.facing||null,deviceId:i.id||i.deviceId||null,label:i.label||null,kind:a,groupId:i.groupId||null})}t(r),e&&(console.warn("module now uses promise based api - callback is deprecated"),e(null,r))};if(window.navigator&&window.navigator.mediaDevices&&window.navigator.mediaDevices.enumerateDevices)window.navigator.mediaDevices.enumerateDevices().then(r);else if(window.MediaStreamTrack&&window.MediaStreamTrack.getSources)window.MediaStreamTrack.getSources(r);else{var o=new Error("Device enumeration not supported.");o.kind="METHOD_NOT_AVAILABLE",n(o),e&&(console.warn("module now uses promise based api - callback is deprecated"),e(o))}})}},function(e,t,n){e.exports=n(434)},function(e,t,n){"use strict";e.exports=n(435)},function(e){e.exports=JSON.parse('{"welcome":{"title":"Open your new bank account","description_p_1":"To open a bank account, we will need to verify your identity.","description_p_2":"It will only take a couple of minutes.","next_button":"Verify Identity"},"document_selector":{"identity":{"title":"Verify your identity","hint":"Select the type of document you would like to upload","passport_hint":"Face photo page","driving_licence_hint":"Front and back","national_identity_card_hint":"Front and back"},"proof_of_address":{"title":"Select a %{country} document","hint":"These are the documents most likely to show your current home address","estatements_accepted":"e-statements accepted","utility_bill_hint":"Gas, electricity, water, landline, or broadband","utility_bill_warning":"Sorry, no mobile phone bills","benefits_letter_hint":"Government authorised household benefits eg. Jobseeker allowance, Housing benefit, Tax credits","government_letter_hint":"Any government issued letter eg. Benefits entitlement, Voting letters, Tax letters, etc"}},"capture":{"driving_licence":{"front":{"title":"Front of driver\'s license","instructions":"Upload front of license from your computer","webcam":"Position the front of license in the frame (it will be automatically detected)"},"back":{"title":"Back of driver\'s license","instructions":"Upload back of license from your computer","webcam":"Position the back of license in the frame (it will be automatically detected)"}},"national_identity_card":{"front":{"title":"Front of identity card","instructions":"Upload front of card from your computer","webcam":"Position the front of card in the frame (it will be automatically detected)"},"back":{"title":"Back of identity card","instructions":"Upload back of card from your computer","webcam":"Position the back of card in the frame (it will be automatically detected)"}},"passport":{"front":{"title":"Passport photo page","instructions":"Upload passport photo page from your computer","webcam":"Position your passport photo page in the frame (it will be automatically detected)"}},"bank_building_society_statement":{"front":{"title":"Bank Statement","sub_title":"Must be issued in the <strong>last 3 months</strong>","instructions":"Provide the whole document page for best results","webcam":"Position your bank statement in the frame (it will be automatically detected)"}},"utility_bill":{"front":{"title":"Utility Bill","sub_title":"Must be issued in the <strong>last 3 months</strong>","instructions":"Provide the whole document page for best results","webcam":"Position your utility bill in the frame (it will be automatically detected)"}},"benefit_letters":{"front":{"title":"Benefits Letter","sub_title":"Must be issued in the <strong>last 12 months</strong>","instructions":"Provide the whole document page for best results","webcam":"Position your benefits letter in the frame (it will be automatically detected)"}},"council_tax":{"front":{"title":"Council Tax Letter","sub_title":"Must be issued in the <strong>last 12 months</strong>","instructions":"Provide the whole document page for best results","webcam":"Position your council tax letter in the frame (it will be automatically detected)"}},"government_letter":{"front":{"title":"Government Letter","sub_title":"Must be issued in the <strong>last 12 months</strong>","instructions":"Provide the whole document page for best results","webcam":"Position your government letter in the frame (it will be automatically detected)"}},"face":{"title":"Take a selfie","upload_title":"Selfie","instructions":"Upload a selfie from your computer"},"liveness":{"start":"Start","stop":"Stop","recording":"Recording","press_record":"Press record and follow the instructions","intro":{"title":"Let’s make sure nobody’s impersonating you","two_actions":"We’ll ask you to film yourself performing <strong>2 simple actions</strong>","speak_out_loud":"One will involve <strong>speaking out loud</strong>","continue":"Continue"},"challenges":{"position_face":"Position your face in the oval","recite":"Say each digit out loud","movement":"Look over your %{side} shoulder","right":"right","left":"left","done_next":"When you’re done, press next","done_stop":"When you’re done, press stop","next":"Next"}},"upload_document":"Upload","upload_file":"Upload file","take_photo":"Take photo"},"confirm":{"document":{"title":"Check readability","alt":"Photo of your document"},"driving_licence":{"message":"Make sure your license details are clear to read, with no blur or glare"},"national_identity_card":{"message":"Make sure your card details are clear to read, with no blur or glare"},"passport":{"message":"Make sure your passport details are clear to read, with no blur or glare"},"bank_building_society_statement":{"message":"Make sure details are clear to read, with no blur or glare"},"utility_bill":{"message":"Make sure details are clear to read, with no blur or glare"},"benefit_letters":{"message":"Make sure details are clear to read, with no blur or glare"},"council_tax":{"message":"Make sure details are clear to read, with no blur or glare"},"face":{"standard":{"title":"Check selfie","message":"Make sure your selfie clearly shows your face","alt":"Photo of your face"},"video":{"title":"Check selfie video"}},"confirm":"Confirm","continue":"Continue","redo":"Redo","enlarge_image":{"enlarge":"Enlarge image","close":"Close"}},"complete":{"message":"Verification complete","submessage":"Thank you."},"cross_device":{"intro":{"document":{"title":"Continue verification on your mobile","take_photos":"We’ll walk you through taking the photos","action":"Continue"},"face":{"title":"Continue face verification on your mobile","take_photos":"Complete face verification to prove it’s really you","action":"Continue"},"sub_title":"It’s easy, fast and secure.","sms":"We’ll SMS a secure link to your mobile (no app download required)","return_computer":"Return to your computer to complete your verification"},"client_success":{"title":"Uploads successful","sub_title":"You can now return to your computer to continue","body":"Your computer may take a few seconds to update"},"link":{"title":"Get your secure link","sub_title":"We’ll text a <em>one-time secure link</em> to your mobile","link_copy":{"action":"Copy","success":"Copied"},"button_copy":{"action":"Send link","status":"Sending"},"sms_label":"Mobile number","copy_link_label":"Copy link instead:"},"submit":{"title":"Great, that’s everything we need","sub_title":"We’re now ready to verify your identity","selfie_uploaded":"Selfie uploaded","video_uploaded":"Video uploaded","action":"Submit verification","multiple_docs_uploaded":"Documents uploaded","one_doc_uploaded":"Document uploaded"},"phone_number_placeholder":"Enter mobile number","loading":"Loading...","mobile_connected":{"title":{"message":"Connected to your mobile","submessage":"Once you\'ve finished we\'ll take you to the next step"},"tips":{"item_1":"Keep this window open while using your mobile","item_2":"Your mobile link will expire in one hour","item_3":"Don\'t refresh this page"}},"mobile_notification_sent":{"title":"Check your mobile","submessage":"We’ve sent a secure link to %{number}","bold_message":"It may take a few minutes to arrive","tips":{"item_1":"Keep this window open while using your mobile","item_2":"Your mobile link will expire in one hour"},"resend_link":"Resend link"},"switch_device":{"header":"Need to use your mobile to take photos?","submessage":"Securely continue verification on your mobile"},"tips":"Tips"},"privacy":{"title":"You\'ll have to upload a photo of your identity document","item_1":"All your document details must be visible","item_2":"Your document must be in colour","item_3":"Avoid light reflections","small_print":"By continuing, you agree to the <terms>Onfido Terms of Use</terms> and understand that your information, including your facial identifiers, will be processed in accordance with the <privacy>Onfido Privacy Policy</privacy>","decline":"Decline","continue":"Continue"},"webcam_permissions":{"allow_access":"Allow camera access","enable_webcam_for_selfie":"When prompted, you must enable camera access to continue","click_allow":"We cannot verify you without using your camera","allow":"Allow","why":"Why do I need to do this?","if_denied":"If you deny camera access, you won\'t be able to take pictures and complete verification process.","enable_webcam":"Enable camera","access_denied":"Camera access is denied","recover_access":"Recover camera access to continue face verification","recovery":"Recovery","follow_steps":"Follow these steps to recover camera access:","grant_access":"Grant access to your camera from your browser settings","refresh_page":"Refresh this page to restart the identity verification process","refresh":"Refresh"},"proof_of_address":{"intro":{"title":"Let’s verify your %{country} address","requirements":"You’ll need a document that:","shows_address":"Shows your <strong>current</strong> address","matches_signup":"<strong>Matches</strong> the address you used on signup","is_recent":"Is your most <strong>recent</strong> document","start":"Start verification"},"guidance":{"logo":"Logo","full_name":"Full Name","make_sure_it_shows":"Make sure it clearly shows:","current_address":"Current Address","issue_date":"Issue date or Summary period","continue":"Continue"}},"errors":{"invalid_capture":{"message":"No document detected","instruction":"Make sure all the document is in the photo"},"invalid_type":{"message":"File not uploading.","instruction":"Try using another file type."},"unsupported_file":{"message":"Unsupported file type","instruction":"Try using a .jpg or .png file"},"invalid_size":{"message":"File size too large.","instruction":"Size needs to be smaller than 10MB."},"no_face":{"message":"No face found","instruction":"Your face is needed in the selfie"},"multiple_faces":{"message":"Multiple faces found","instruction":"Only your face can be in the selfie"},"server_error":{"message":"Connection lost","instruction":"Please try again"},"glare_detected":{"message":"Glare detected","instruction":"All details should be clear and readable"},"sms_failed":{"message":"Something\'s gone wrong","instruction":"Copy the below link to your mobile instead"},"sms_overuse":{"message":"Too many resend attempts","instruction":"Copy the below link to your mobile instead"},"lazy_loading":{"message":"An error occurred while loading the component"},"invalid_number":{"message":"Check your mobile number is correct"},"generic_client_error":{"message":"Something\'s gone wrong","instruction":"You’ll need to restart your verification on your computer"},"forbidden_client_error":{"message":"Something\'s gone wrong","instruction":"You must open this link on a mobile device"},"camera_not_working":{"message":"Your camera isn’t working","instruction":"It may be disconnected or not functional. <fallback>Use your mobile</fallback> to continue verification."},"camera_not_working_no_fallback":{"instruction":"Make sure your device has a working camera"},"liveness_timeout":{"message":"Looks like you took too long","instruction":"Remember to press stop when you\'re done. <fallback>Redo video actions</fallback>"},"camera_inactive":{"message":"Having camera problems?","instruction":"<fallback>Use your mobile</fallback> to continue face verification"},"camera_inactive_no_fallback":{"instruction":"Make sure your device has a working camera"},"interrupted_flow_error":{"message":"No camera detected","instruction":"Restart the process with a different device"}},"accessibility":{"close_sdk_screen":"Close identity verification screen","dismiss_alert":"Dismiss alert","camera_view":"View from camera","shutter":"Take a photo","start_recording":"Start recording","stop_recording":"Stop recording","replay_video":"Replay your recorded video","document_types":"Documents you can use to verify your identity","selfie_video_actions":"Actions to record a selfie video","cross_device_verification":"Steps required to continue verification on your mobile","country_select":"Select country"},"passport":"Passport","driving_licence":"Driver\'s License","national_identity_card":"Identity Card","short_passport":"passport","short_driving_licence":"license","short_national_identity_card":"card","bank_building_society_statement":"Bank/Building Society Statement","utility_bill":"Utility Bill","benefit_letters":"Benefits Letter","government_letter":"Government Letter","council_tax":"Council Tax Letter","loading":"Loading","back":"back","cancel":"Cancel","close":"close"}')},function(e){e.exports=JSON.parse('{"welcome":{"title":"Abra su nueva cuenta bancaria","description_p_1":"Para abrir una cuenta bancaria, necesitaremos verificar su identidad.","description_p_2":"Sólo tomará un par de minutos.","next_button":"Verificar identidad"},"document_selector":{"identity":{"title":"Verifique su identidad","hint":"Seleccione el tipo de documento que desea subir","passport_hint":"Página del pasaporte con su foto","driving_licence_hint":"Frente y reverso","national_identity_card_hint":"Frente y reverso"}},"capture":{"driving_licence":{"front":{"title":"Frente de la licencia de conducir","instructions":"Suba el frente de la licencia desde su computadora","webcam":"Coloque el frente de la licencia en el cuadro (será detectado automáticamente)"},"back":{"title":"Reverso de la licencia de conducir","instructions":"Suba el reverso de la licencia desde su computadora","webcam":"Coloque el reverso de la licencia en el cuadro (será detectado automáticamente)"}},"national_identity_card":{"front":{"title":"Frente de la tarjeta de identificación","instructions":"Suba el frente de la tarjeta desde su computadora","webcam":"Coloque el frente de la tarjeta en el cuadro (será detectado automáticamente)"},"back":{"title":"Reverso de la tarjeta de identificación","instructions":"Suba el reverso de la tarjeta desde su computadora","webcam":"Coloque el reverso de la tarjeta en el cuadro (será detectado automáticamente)"}},"passport":{"front":{"title":"Página del pasaporte con su foto","instructions":"Suba la página del pasaporte con su foto desde su computadora","webcam":"Coloque la página del pasaporte con su foto en el cuadro (será detectado automáticamente)"}},"face":{"title":"Tómese una selfie","upload_title":"Selfie","instructions":"Suba una selfie desde su computadora"},"liveness":{"start":"Iniciar","stop":"Parar","recording":"Grabando","press_record":"Presione grabar y siga las instrucciones","intro":{"title":"Asegurémonos de que nadie se está haciendo pasar por usted","two_actions":"Le pediremos que se grabe en video ejecutando <strong>dos simples acciones</strong>","speak_out_loud":"Una de ellas implicará <strong>hablar en voz alta</strong>","continue":"Continuar"},"challenges":{"position_face":"Coloque su cara en el óvalo","recite":"Lea en voz alta cada dígito","movement":"Mire sobre su hombro %{side}","right":"derecho","left":"izquierdo","done_next":"Cuando esté listo, presione continuar","done_stop":"Cuando esté listo, presione parar","next":"Siguiente"}},"upload_document":"Subir","upload_file":"Subir archivo","take_photo":"Tomar foto"},"confirm":{"document":{"title":"Compruebe la legibilidad","alt":"Foto de su documento"},"driving_licence":{"message":"Asegúrese de que los datos de su licencia se puedan leer claramente, sin borrosidades ni brillo"},"national_identity_card":{"message":"Asegúrese de que los datos de su tarjeta se puedan leer claramente, sin borrosidades ni brillo"},"passport":{"message":"Asegúrese de que los datos de su pasaporte se puedan leer claramente, sin borrosidades ni brillo"},"face":{"standard":{"title":"Verificar selfie","message":"Asegúrese de que la selfie muestre claramente su cara","alt":"Foto de su cara"},"video":{"title":"Verificar video selfie"}},"confirm":"Confirmar","continue":"Continuar","redo":"Reintentar","enlarge_image":{"enlarge":"Ampliar imagen","close":"Cerrar"}},"complete":{"message":"Verificación completa","submessage":"Gracias."},"cross_device":{"intro":{"document":{"title":"Continúe la verificación en su móvil","take_photos":"Lo guiaremos en cómo tomar fotos","action":"Continuar"},"face":{"title":"Continúe la verificación facial en su móvil","take_photos":"Complete la verificación facial para probar que es realmente usted","action":"Continuar"},"sub_title":"Es fácil, rápido y seguro.","sms":"Enviaremos un vínculo seguro a su móvil por SMS (no requiere descargar una aplicación)","return_computer":"Vuelva a su computadora para completar la verificación"},"client_success":{"title":"Carga completa","sub_title":"Ahora puede volver a su computadora para continuar","body":"Su computadora puede tardar unos segundos en actualizarse"},"link":{"title":"Obtenga su link seguro","sub_title":"Le enviaremos un <em>mensaje de texto único</em> con un enlace a su móvil","link_copy":{"action":"Copiar","success":"Copiado"},"button_copy":{"action":"Enviar enlace","status":"Enviando"},"sms_label":"Número de teléfono móvil","copy_link_label":"Copiar enlace en su lugar"},"submit":{"title":"Genial, eso es todo","sub_title":"Estamos listos para verificar su identidad","selfie_uploaded":"Selfie cargado","video_uploaded":"Video cargado","action":"Enviar verificación","multiple_docs_uploaded":"Documentos cargados","one_doc_uploaded":"Documento cargado"},"phone_number_placeholder":"Introduzca su número de móvil","loading":"Cargando...","mobile_connected":{"title":{"message":"Conectado con su móvil","submessage":"Cuando haya terminado, le llevaremos al próximo paso"},"tips":{"item_1":"No cierre esta ventana mientras usa su móvil","item_2":"El enlace móvil caducará en una hora","item_3":"No actualizar esta página"}},"mobile_notification_sent":{"title":"Controle su dispositivo móvil","submessage":"Hemos enviado un enlace seguro a %{number}","bold_message":"Puede tardar unos minutos en llegar","tips":{"item_1":"Mantenga esta ventana abierta mientras usa su dispositivo móvil","item_2":"Su enlace móvil caducará en una hora"},"resend_link":"Reenviar enlace"},"switch_device":{"header":"¿Necesita usar su móvil para tomar fotos?","submessage":"Continúe la verificación de forma segura en su dispositivo móvil"},"tips":"Recomendaciones"},"privacy":{"title":"Tendrá que subir una foto de su documento de identidad","item_1":"Todos los datos de su documento tienen que ser visibles","item_2":"El documento debe ser en color","item_3":"Evite los reflejos","small_print":"Al continuar, usted está de acuerdo con los <terms>Términos de Uso de Onfido</terms> y comprende que su información, incluidos sus identificadores faciales, se procesará de acuerdo con la <privacy>Política de privacidad de Onfido</privacy>","decline":"Declinar","continue":"Continuar"},"webcam_permissions":{"allow_access":"Permitir acceso a la cámara","enable_webcam_for_selfie":"Deberá activar la cámara para continuar","click_allow":"No le podemos verificar sin usar su cámara","allow":"Permitir","why":"¿Por qué necesita hacer esto?","if_denied":"Si niega acceso a la cámara, no podrá tomar fotos para completar el proceso de verificación","enable_webcam":"Activar cámara","access_denied":"Acceso a la cámara no permitido","recover_access":"Recupere acceso a la cámara para continuar la verificación facial","recovery":"Recuperación","follow_steps":"Siga estos pasos para recuperar acceso a la cámara:","grant_access":"Autorice acceso a su cámara desde los ajustes del navegador","refresh_page":"Actualice esta página para reiniciar el proceso de verificación","refresh":"Actualizar"},"errors":{"invalid_capture":{"message":"Documento no detectado","instruction":"Asegúrese de que todo el documento esté en la foto"},"invalid_type":{"message":"Archivo no cargado.","instruction":"Intenta usar otro tipo de archivo."},"unsupported_file":{"message":"Tipo de archivo no admitido","instruction":"Intente usar un archivo .jpg o .png"},"invalid_size":{"message":"Tamaño de archivo demasiado grande.","instruction":"El tamaño debe ser menor de 10 MB."},"no_face":{"message":"Cara no encontrada","instruction":"Su cara tiene que salir en la selfie"},"multiple_faces":{"message":"Múltiples caras encontradas","instruction":"Solo su cara puede estar en la selfie"},"server_error":{"message":"Conexión perdida","instruction":"Inténtalo de nuevo"},"glare_detected":{"message":"Brillo detectado","instruction":"Todos los detalles deben ser claros y legibles"},"sms_failed":{"message":"Algo salió mal","instruction":"Copie el enlace a continuación en su dispositivo móvil"},"sms_overuse":{"message":"Demasiados intentos de reenvío","instruction":"Copie el enlace a continuación en su dispositivo móvil"},"lazy_loading":{"message":"Se produjo un error al cargar el componente"},"invalid_number":{"message":"Compruebe que su número de móvil sea correcto"},"generic_client_error":{"message":"Algo salió mal","instruction":"Deberá reiniciar su verificación en su computadora"},"forbidden_client_error":{"message":"Algo salió mal","instruction":"Debe abrir este enlace en un dispositivo móvil."},"camera_not_working":{"message":"Su cámara no esta funcionando","instruction":"Puede estar desconectada o no funcionando. <fallback>Use su móvil</fallback> para continuar la verificación"},"camera_not_working_no_fallback":{"instruction":"Asegúrese de que su dispositivo tenga una cámara que funcione"},"liveness_timeout":{"message":"Parece que ha demorado demasiado","instruction":"Recuerde presionar detener cuando esté listo. <fallback>Rehacer acciones</fallback>"},"camera_inactive":{"message":"¿Algun problema con su cámara?","instruction":"<fallback>Use su móvil</fallback> para continuar la verificación facial"},"camera_inactive_no_fallback":{"instruction":"Asegúrese de que su dispositivo tenga una cámara que funcione"},"interrupted_flow_error":{"message":"Cámara no detectada","instruction":"Reinicie el proceso con un dispositivo diferente"}},"accessibility":{"close_sdk_screen":"Cerrar pantalla de verificación","camera_view":"Vista desde la camara","dismiss_alert":"Cerrar alerta","shutter":"Tome una foto","start_recording":"Iniciar grabación","stop_recording":"Parar grabación","replay_video":"Reproducir su video grabado","document_types":"Documentos que puede utilizar para verificar su identidad","selfie_video_actions":"Acciones para grabar un video selfie","cross_device_verification":"Pasos requeridos para continuar con la verificación en su móvil","country_select":"Seleccione el país"},"passport":"Pasaporte","driving_licence":"Licencia de conducir","national_identity_card":"Tarjeta de identificación","short_passport":"pasaporte","short_driving_licence":"licencia","short_national_identity_card":"tarjeta","loading":"Cargando","back":"atrás","cancel":"Cancelar","close":"cerrar"}')},function(e){e.exports=JSON.parse('{"capture":{"driving_licence":{"front":{"instructions":"Take a photo of the front of your license"},"back":{"instructions":"Take a photo of the back of your license"}},"national_identity_card":{"front":{"instructions":"Take a photo of the front of your card"},"back":{"instructions":"Take a photo of the back of your card"}},"passport":{"front":{"instructions":"Take a photo of your passport photo page"}},"face":{"instructions":"Take a selfie showing your face"}},"errors":{"camera_not_working":{"instruction":"Take a selfie using the <fallback>basic camera mode</fallback> instead"},"camera_inactive":{"instruction":"Take a selfie using the <fallback>basic camera mode</fallback> instead"}}}')},function(e){e.exports=JSON.parse('{"capture":{"driving_licence":{"front":{"instructions":"Tome una foto del frente de su licencia"},"back":{"instructions":"Tome una foto del reverso de su licencia"}},"national_identity_card":{"front":{"instructions":"Tome una foto del frente de su tarjeta"},"back":{"instructions":"Tome una foto del reverso de su tarjeta"}},"passport":{"front":{"instructions":"Tome una foto de la página del pasaporte que incluye su fotografía"}},"face":{"instructions":"Tome una selfie que muestre su cara"}},"errors":{"camera_not_working":{"instruction":"Tome una selfie usando el <fallback>modo de cámara básica</fallback> en su lugar"},"camera_inactive":{"instruction":"Tome una selfie usando el <fallback>modo de cámara básica</fallback> en su lugar"}}}')},function(e,t,n){e.exports=n(460)},function(e,t,n){e.exports=n(464)},function(e,t,n){"use strict";t.__esModule=!0;"function"==typeof Symbol&&Symbol.iterator;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=(l(n(321)),l(n(351))),i=n(469),a=n(360),s=l(n(472)),c=n(473),u=n(474);function l(e){return e&&e.__esModule?e:{default:e}}var d=function(){try{return window.history.state||{}}catch(e){return{}}};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};c.canUseDOM||(0,o.default)(!1);var t=window.history,n=(0,u.supportsHistory)(),l=!(0,u.supportsPopStateOnHashChange)(),f=e.basename,p=void 0===f?"":f,h=e.forceRefresh,m=void 0!==h&&h,v=e.getUserConfirmation,y=void 0===v?u.getConfirmation:v,g=e.keyLength,b=void 0===g?6:g,$=function(e){var t=e||{},n=t.key,o=t.state,i=window.location,s=i.pathname+i.search+i.hash;return p&&(s=(0,a.stripPrefix)(s,p)),r({},(0,a.parsePath)(s),{state:o,key:n})},_=function(){return Math.random().toString(36).substr(2,b)},k=(0,s.default)(),w=function(e){r(W,e),W.length=t.length,k.notifyListeners(W.location,W.action)},C=function(e){(0,u.isExtraneousPopstateEvent)(e)||S($(e.state))},x=function(){S($(d()))},O=!1,S=function(e){O?(O=!1,w()):k.confirmTransitionTo(e,"POP",y,function(t){t?w({action:"POP",location:e}):E(e)})},E=function(e){var t=W.location,n=T.indexOf(t.key);-1===n&&(n=0);var r=T.indexOf(e.key);-1===r&&(r=0);var o=n-r;o&&(O=!0,I(o))},j=$(d()),T=[j.key],P=function(e){return p+(0,a.createPath)(e)},N=function(e,r){var o=(0,i.createLocation)(e,r,_(),W.location);k.confirmTransitionTo(o,"PUSH",y,function(e){if(e){var r=P(o),i=o.key,a=o.state;if(n)if(t.pushState({key:i,state:a},null,r),m)window.location.href=r;else{var s=T.indexOf(W.location.key),c=T.slice(0,-1===s?0:s+1);c.push(o.key),T=c,w({action:"PUSH",location:o})}else window.location.href=r}})},A=function(e,r){var o=(0,i.createLocation)(e,r,_(),W.location);k.confirmTransitionTo(o,"REPLACE",y,function(e){if(e){var r=P(o),i=o.key,a=o.state;if(n)if(t.replaceState({key:i,state:a},null,r),m)window.location.replace(r);else{var s=T.indexOf(W.location.key);-1!==s&&(T[s]=o.key),w({action:"REPLACE",location:o})}else window.location.replace(r)}})},I=function(e){t.go(e)},D=function(){return I(-1)},R=function(){return I(1)},M=0,F=function(e){1===(M+=e)?((0,u.addEventListener)(window,"popstate",C),l&&(0,u.addEventListener)(window,"hashchange",x)):0===M&&((0,u.removeEventListener)(window,"popstate",C),l&&(0,u.removeEventListener)(window,"hashchange",x))},L=!1,U=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=k.setPrompt(e);return L||(F(1),L=!0),function(){return L&&(L=!1,F(-1)),t()}},B=function(e){var t=k.appendListener(e);return F(1),function(){return F(-1),t()}},W={length:t.length,action:"POP",location:j,createHref:P,push:N,replace:A,go:I,goBack:D,goForward:R,block:U,listen:B};return W}},function(e,t,n){var r=n(475),o=n(327),i=n(363),a=n(107)("socket.io-client");e.exports=t=c;var s=t.managers={};function c(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var n,o=r(e),c=o.source,u=o.id,l=o.path,d=s[u]&&l in s[u].nsps;return t.forceNew||t["force new connection"]||!1===t.multiplex||d?(a("ignoring socket cache for %s",c),n=i(c,t)):(s[u]||(a("new io instance for %s",c),s[u]=i(c,t)),n=s[u]),o.query&&!t.query&&(t.query=o.query),n.socket(o.path,t)}t.protocol=o.protocol,t.connect=c,t.Manager=n(363),t.Socket=n(369)},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-Welcome-absolute-center",text:"onfido-sdk-ui-Welcome-text"}},function(e,t,n){e.exports={wrapper:"onfido-sdk-ui-Select-wrapper",select:"onfido-sdk-ui-Select-select"}},function(e,t,n){e.exports=n(500)},function(e,t,n){"use strict";
    /*! npm.im/supports-webp 1.0.7 */var r="object"==typeof document?document.createElement("canvas"):{};r.width=r.height=1;var o=!!r.toDataURL&&5===r.toDataURL("image/webp").indexOf("image/webp");e.exports=o},function(e,t,n){var r;"undefined"!=typeof self&&self,r=function(e,t,n,r,o,i,a,s,c,u,l,d,f,p,h,m,v,y){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return V});var r,o=n(1),i=n.n(o),a=n(2),s=n.n(a),c=n(3),u=n.n(c),l=n(4),d=n.n(l),f=n(5),p=n.n(f),h=n(6),m=n.n(h),v=n(7),y=n.n(v),g=n(8),b=n.n(g),$=n(9),_=n.n($),k=n(10),w=n.n(k),C=n(11),x=n.n(C),O=n(12),S=n.n(O),E=n(13),j=n.n(E),T=n(14),P=n.n(T),N=n(15),A=n.n(N),I=n(16),D=n.n(I),R=n(17),M=n.n(R),F=n(18),L=n.n(F),U=n(19),B=navigator.mediaDevices,W=B&&B.getUserMedia?M()(r=B.getUserMedia).call(r,B):null,H=!!W,q=["PermissionDeniedError","NotAllowedError","NotFoundError"],V=function(e){function t(e){var n;if(_()(this,t),n=x()(this,S()(t).call(this,e)),A()(j()(n),"state",{hasUserMedia:!1,mirrored:!1}),!H){var r=new Error("getUserMedia is not supported by this browser");n.props.onFailure(r)}return n}return P()(t,e),w()(t,[{key:"componentDidMount",value:function(){t.mountedInstances.push(this),this.requestUserMedia()}},{key:"getConstraints",value:function(e,t,n,r){var o={video:{facingMode:n},audio:r};return e&&(o.video.width=b()(e,10)||e),t&&(o.video.height=b()(t,10)||t),o}},{key:"requestUserMedia",value:function(){if(W&&B&&!t.userMediaRequested){var e,n=this.props,r=n.width,o=n.height,i=n.facingMode,a=n.audio,s=n.fallbackWidth,c=n.fallbackHeight,u=this.getConstraints(r,o,i,a),l=this.getConstraints(s,c,i,a),d=function(e){var n;t.userMediaRequested=!1,m()(n=t.mountedInstances).call(n,function(t){return t.handleUserMedia(e)})};t.userMediaRequested=!0,W(u).then(d).catch(function n(r){var o;t.userMediaRequested=!1,function(e){console.log("error",e,y()(e))}(r),p()(q).call(q,r.name)||e?m()(o=t.mountedInstances).call(o,function(e){return e.handleError(r)}):(e=!0,W(l).then(d).catch(n))})}}},{key:"handleError",value:function(e){this.setState({hasUserMedia:!1}),this.props.onFailure(e)}},{key:"handleUserMedia",value:function(e){this.stream=e;var t=e.getVideoTracks()[0].getSettings();this.setState({hasUserMedia:!0,mirrored:"user"===t.facingMode||!t.facingMode}),this.props.onUserMedia()}},{key:"componentWillUnmount",value:function(){var e,n,r=this,o=d()(e=t.mountedInstances).call(e,this);u()(n=t.mountedInstances).call(n,o,1),s()(function(){return function(e){if(e.getVideoTracks){var t=!0,n=!1,r=void 0;try{for(var o,i=D()(e.getVideoTracks());!(t=(o=i.next()).done);t=!0)o.value.stop()}catch(e){n=!0,r=e}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}}if(e.getAudioTracks){var a=!0,s=!1,c=void 0;try{for(var u,l=D()(e.getAudioTracks());!(a=(u=l.next()).done);a=!0)u.value.stop()}catch(e){s=!0,c=e}finally{try{a||null==l.return||l.return()}finally{if(s)throw c}}}}(r.stream)},1e3)}},{key:"getScreenshot",value:function(){var e=this.getCanvas();return e?e.toDataURL(this.props.screenshotFormat):null}},{key:"getCanvas",value:function(){var e;if(!this.state.hasUserMedia||!this.video)return null;var t=this.video;this.canvas||(this.canvas=document.createElement("canvas"));var n=this.canvas;this.ctx||(this.ctx=n.getContext("2d"));var r=this.ctx;return n.width=t.videoWidth,n.height=t.videoHeight,r.drawImage(t,0,0,n.width,n.height),i()(e="drawn image to canvas: ".concat(n.width,"x")).call(e,n.height),n}},{key:"startRecording",value:function(){this.mediaRecorder=Object(U.a)(this.stream),this.recordedBlobs=Object(U.b)(this.mediaRecorder)}},{key:"stopRecording",value:function(){this.mediaRecorder.stop(this.recordedBlobs)}},{key:"getVideoBlob",value:function(){var e=this.mediaRecorder.mimeType.split(";")[0];return new Blob(this.recordedBlobs,{type:e})}},{key:"render",value:function(){var e=this;return this.stream?L.a.createElement("video",{style:{transform:this.state.mirrored?"scaleX(-1)":""},ref:function(t){return e.video=t},autoPlay:!0,playsinline:!0,srcObject:this.stream,muted:!0,className:this.props.className}):null}}]),t}(F.Component);A()(V,"defaultProps",{audio:!1,screenshotFormat:"image/webp",onUserMedia:function(){},onFailure:function(){}}),A()(V,"mountedInstances",[]),A()(V,"userMediaRequested",!1)},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t){e.exports=o},function(e,t){e.exports=i},function(e,t){e.exports=a},function(e,t){e.exports=s},function(e,t){e.exports=c},function(e,t){e.exports=u},function(e,t){e.exports=l},function(e,t){e.exports=d},function(e,t){e.exports=f},function(e,t){e.exports=p},function(e,t){e.exports=h},function(e,t){e.exports=m},function(e,t){e.exports=v},function(e,t){e.exports=y},function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a});var r=window.MediaRecorder,o=function(e){console.log("Recorder stopped: ",e)},i=function(e){var t=function(){var e=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"],t="";for(var n in e){if(r.isTypeSupported(e[n])){t=e[n];break}console.log("".concat(e[n]," is not Supported"))}return t?{mimeType:t}:{mimeType:""}}();try{return new r(e,t)}catch(e){return void console.error("Exception while creating MediaRecorder: ".concat(e))}},a=function(e){var t=[];return e.onstop=o,e.ondataavailable=function(e){return function(e,t){e.data&&e.data.size>0&&t.push(e.data)}(e,t)},e.start(10),console.log("MediaRecorder started",e),t}}])},e.exports=r(n(3),n(82),n(508),n(336),n(42),n(11),n(88),n(133),n(5),n(9),n(4),n(6),n(2),n(7),n(1),n(254),n(244),n(36))},function(e,t,n){e.exports={"absolute-center":"onfido-sdk-ui-GenericError-absolute-center",icon:"onfido-sdk-ui-GenericError-icon",genericErrorIcon:"onfido-sdk-ui-GenericError-genericErrorIcon",flowInterruptedIcon:"onfido-sdk-ui-GenericError-flowInterruptedIcon"}},function(e,t,n){var r,o,i;o=[],void 0===(i="function"==typeof(r=function(){"use strict";if("undefined"==typeof window||"undefined"==typeof navigator)return!1;var e,t,n,r,o,i,a,s,c,u,l,d=void 0!==navigator.mimeTypes["application/pdf"],f=/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());return t=function(e){var t;try{t=new ActiveXObject(e)}catch(e){t=null}return t},n=function(){return!!(window.ActiveXObject||"ActiveXObject"in window)},r=function(){return!(!t("AcroPDF.PDF")&&!t("PDF.PdfCtrl"))},e=d||n()&&r(),o=function(e){var t,n="";if(e){for(t in e)e.hasOwnProperty(t)&&(n+=encodeURIComponent(t)+"="+encodeURIComponent(e[t])+"&");n&&(n=(n="#"+n).slice(0,n.length-1))}return n},i=function(e){"undefined"!=typeof console&&console.log&&console.log("[PDFObject] "+e)},a=function(e){return i(e),!1},c=function(e){var t=document.body;return"string"==typeof e?t=document.querySelector(e):"undefined"!=typeof jQuery&&e instanceof jQuery&&e.length?t=e.get(0):void 0!==e.nodeType&&1===e.nodeType&&(t=e),t},u=function(e,t,n,r,o){var i=r+"?file="+encodeURIComponent(t)+n,a="<div style='"+(f?"-webkit-overflow-scrolling: touch; overflow-y: scroll; ":"overflow: hidden; ")+"position: absolute; top: 0; right: 0; bottom: 0; left: 0;'><iframe  "+o+" src='"+i+"' style='border: none; width: 100%; height: 100%;' frameborder='0'></iframe></div>";return e.className+=" pdfobject-container",e.style.position="relative",e.style.overflow="auto",e.innerHTML=a,e.getElementsByTagName("iframe")[0]},l=function(e,t,n,r,o,i,a){var s="";return s=t&&t!==document.body?"width: "+o+"; height: "+i+";":"position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;",e.className+=" pdfobject-container",e.innerHTML="<embed "+a+" class='pdfobject' src='"+n+r+"' type='application/pdf' style='overflow: auto; "+s+"'/>",e.getElementsByTagName("embed")[0]},s=function(t,n,r){if("string"!=typeof t)return a("URL is not valid");n=void 0!==n&&n;var i,s=(r=void 0!==r?r:{}).id&&"string"==typeof r.id?"id='"+r.id+"'":"",d=!!r.page&&r.page,f=r.pdfOpenParams?r.pdfOpenParams:{},p=void 0===r.fallbackLink||r.fallbackLink,h=r.width?r.width:"100%",m=r.height?r.height:"100%",v="boolean"==typeof r.forcePDFJS&&r.forcePDFJS,y=!!r.PDFJS_URL&&r.PDFJS_URL,g=c(n),b="";return g?(d&&(f.page=d),i=o(f),v&&y?u(g,t,i,y,s):e?l(g,n,t,i,h,m,s):y?u(g,t,i,y,s):(p&&(b="string"==typeof p?p:"<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>",g.innerHTML=b.replace(/\[url\]/g,t)),a("This browser does not support embedded PDFs"))):a("Target element cannot be determined")},{embed:function(e,t,n){return s(e,t,n)},pdfobjectversion:"2.0.201604172",supportsPDFs:e}})?r.apply(t,o):r)||(e.exports=i)},function(e,t,n){e.exports={container:"onfido-sdk-ui-Pannable-container"}},function(e,t,n){e.exports=n(515),n(520),n(521),n(522),n(523)},function(e,t,n){"use strict";t.__esModule=!0,t.default=void 0;var r=n(36),o=a(n(129)),i=a(n(345));a(n(346));function a(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,n,r));return o.store=n.store,o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.getChildContext=function(){return{store:this.store}},t.prototype.render=function(){return r.Children.only(this.props.children)},t}(r.Component);t.default=s,s.propTypes={store:i.default.isRequired,children:o.default.element.isRequired},s.childContextTypes={store:i.default.isRequired}},function(e,t,n){"use strict";var r=n(408);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e,t,n){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},v=Boolean(e),y=e||d,g=void 0;g="function"==typeof t?t:t?(0,s.default)(t):f;var b=n||p,$=l.pure,_=void 0===$||$,k=l.withRef,w=void 0!==k&&k,C=_&&b!==p,x=m++;return function(e){var t="Connect("+function(e){return e.displayName||e.name||"Component"}(e)+")";var n=function(n){function i(e,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,n.call(this,e,r));o.version=x,o.store=e.store||r.store,(0,u.default)(o.store,'Could not find "store" in either the context or props of "'+t+'". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "'+t+'".');var a=o.store.getState();return o.state={storeState:a},o.clearCache(),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(i,n),i.prototype.shouldComponentUpdate=function(){return!_||this.haveOwnPropsChanged||this.hasStoreStateChanged},i.prototype.computeStateProps=function(e,t){if(!this.finalMapStateToProps)return this.configureFinalMapState(e,t);var n=e.getState();return this.doStatePropsDependOnOwnProps?this.finalMapStateToProps(n,t):this.finalMapStateToProps(n)},i.prototype.configureFinalMapState=function(e,t){var n=y(e.getState(),t),r="function"==typeof n;return this.finalMapStateToProps=r?n:y,this.doStatePropsDependOnOwnProps=1!==this.finalMapStateToProps.length,r?this.computeStateProps(e,t):n},i.prototype.computeDispatchProps=function(e,t){if(!this.finalMapDispatchToProps)return this.configureFinalMapDispatch(e,t);var n=e.dispatch;return this.doDispatchPropsDependOnOwnProps?this.finalMapDispatchToProps(n,t):this.finalMapDispatchToProps(n)},i.prototype.configureFinalMapDispatch=function(e,t){var n=g(e.dispatch,t),r="function"==typeof n;return this.finalMapDispatchToProps=r?n:g,this.doDispatchPropsDependOnOwnProps=1!==this.finalMapDispatchToProps.length,r?this.computeDispatchProps(e,t):n},i.prototype.updateStatePropsIfNeeded=function(){var e=this.computeStateProps(this.store,this.props);return(!this.stateProps||!(0,a.default)(e,this.stateProps))&&(this.stateProps=e,!0)},i.prototype.updateDispatchPropsIfNeeded=function(){var e=this.computeDispatchProps(this.store,this.props);return(!this.dispatchProps||!(0,a.default)(e,this.dispatchProps))&&(this.dispatchProps=e,!0)},i.prototype.updateMergedPropsIfNeeded=function(){var e,t,n,r=(e=this.stateProps,t=this.dispatchProps,n=this.props,b(e,t,n));return!(this.mergedProps&&C&&(0,a.default)(r,this.mergedProps))&&(this.mergedProps=r,!0)},i.prototype.isSubscribed=function(){return"function"==typeof this.unsubscribe},i.prototype.trySubscribe=function(){v&&!this.unsubscribe&&(this.unsubscribe=this.store.subscribe(this.handleChange.bind(this)),this.handleChange())},i.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)},i.prototype.componentDidMount=function(){this.trySubscribe()},i.prototype.componentWillReceiveProps=function(e){_&&(0,a.default)(e,this.props)||(this.haveOwnPropsChanged=!0)},i.prototype.componentWillUnmount=function(){this.tryUnsubscribe(),this.clearCache()},i.prototype.clearCache=function(){this.dispatchProps=null,this.stateProps=null,this.mergedProps=null,this.haveOwnPropsChanged=!0,this.hasStoreStateChanged=!0,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,this.renderedElement=null,this.finalMapDispatchToProps=null,this.finalMapStateToProps=null},i.prototype.handleChange=function(){if(this.unsubscribe){var e=this.store.getState(),t=this.state.storeState;if(!_||t!==e){if(_&&!this.doStatePropsDependOnOwnProps){var n=function(e,t){try{return e.apply(t)}catch(e){return h.value=e,h}}(this.updateStatePropsIfNeeded,this);if(!n)return;n===h&&(this.statePropsPrecalculationError=h.value),this.haveStatePropsBeenPrecalculated=!0}this.hasStoreStateChanged=!0,this.setState({storeState:e})}}},i.prototype.getWrappedInstance=function(){return(0,u.default)(w,"To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."),this.refs.wrappedInstance},i.prototype.render=function(){var t=this.haveOwnPropsChanged,n=this.hasStoreStateChanged,i=this.haveStatePropsBeenPrecalculated,a=this.statePropsPrecalculationError,s=this.renderedElement;if(this.haveOwnPropsChanged=!1,this.hasStoreStateChanged=!1,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,a)throw a;var c=!0,u=!0;_&&s&&(c=n||t&&this.doStatePropsDependOnOwnProps,u=t&&this.doDispatchPropsDependOnOwnProps);var l=!1,d=!1;i?l=!0:c&&(l=this.updateStatePropsIfNeeded()),u&&(d=this.updateDispatchPropsIfNeeded());return!(!!(l||d||t)&&this.updateMergedPropsIfNeeded())&&s?s:(this.renderedElement=w?(0,o.createElement)(e,r({},this.mergedProps,{ref:"wrappedInstance"})):(0,o.createElement)(e,this.mergedProps),this.renderedElement)},i}(o.Component);return n.displayName=t,n.WrappedComponent=e,n.contextTypes={store:i.default},n.propTypes={store:i.default},(0,c.default)(n,e)}};var o=n(36),i=l(n(345)),a=l(n(410)),s=l(n(411)),c=(l(n(346)),l(n(282)),l(n(425))),u=l(n(351));function l(e){return e&&e.__esModule?e:{default:e}}var d=function(e){return{}},f=function(e){return{dispatch:e}},p=function(e,t,n){return r({},n,e,t)};var h={value:null};var m=0},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(e===t)return!0;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var o=Object.prototype.hasOwnProperty,i=0;i<n.length;i++)if(!o.call(t,n[i])||e[n[i]]!==t[n[i]])return!1;return!0}},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e){return function(t){return(0,r.bindActionCreators)(e,t)}};var r=n(108)},function(e,t,n){var r=n(348),o=n(415),i=n(416),a="[object Null]",s="[object Undefined]",c=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?s:a:c&&c in Object(e)?o(e):i(e)}},function(e,t,n){var r=n(414),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n(83))},function(e,t,n){var r=n(348),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,s),n=e[s];try{e[s]=void 0;var r=!0}catch(e){}var o=a.call(e);return r&&(t?e[s]=n:delete e[s]),o}},function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},function(e,t,n){var r=n(418)(Object.getPrototypeOf,Object);e.exports=r},function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},function(e,t,n){"use strict";(function(t){e.exports=n(421)(t||window||this)}).call(this,n(83))},function(e,t,n){"use strict";e.exports=function(e){var t,n=e.Symbol;return"function"==typeof n?n.observable?t=n.observable:(t=n("observable"),n.observable=t):t="@@observable",t}},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e){for(var t=Object.keys(e),n={},o=0;o<t.length;o++){var a=t[o];"function"==typeof e[a]&&(n[a]=e[a])}var s,c=Object.keys(n);try{!function(e){Object.keys(e).forEach(function(t){var n=e[t];if(void 0===n(void 0,{type:r.ActionTypes.INIT}))throw new Error('Reducer "'+t+'" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');if(void 0===n(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+r.ActionTypes.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.')})}(n)}catch(e){s=e}return function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments[1];if(s)throw s;for(var r=!1,o={},a=0;a<c.length;a++){var u=c[a],l=n[u],d=e[u],f=l(d,t);if(void 0===f){var p=i(u,t);throw new Error(p)}o[u]=f,r=r||f!==d}return r?o:e}};var r=n(347);o(n(282)),o(n(349));function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=t&&t.type;return"Given action "+(n&&'"'+n.toString()+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state.'}},function(e,t,n){"use strict";function r(e,t){return function(){return t(e.apply(void 0,arguments))}}t.__esModule=!0,t.default=function(e,t){if("function"==typeof e)return r(e,t);if("object"!=typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var n=Object.keys(e),o={},i=0;i<n.length;i++){var a=n[i],s=e[a];"function"==typeof s&&(o[a]=r(s,t))}return o}},function(e,t,n){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return function(n,o,i){var s,c=e(n,o,i),u=c.dispatch,l={getState:c.getState,dispatch:function(e){return u(e)}};return s=t.map(function(e){return e(l)}),u=a.default.apply(void 0,s)(c.dispatch),r({},c,{dispatch:u})}}};var o,i=n(350),a=(o=i)&&o.__esModule?o:{default:o}},function(e,t,n){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i=Object.defineProperty,a=Object.getOwnPropertyNames,s=Object.getOwnPropertySymbols,c=Object.getOwnPropertyDescriptor,u=Object.getPrototypeOf,l=u&&u(Object);e.exports=function e(t,n,d){if("string"!=typeof n){if(l){var f=u(n);f&&f!==l&&e(t,f,d)}var p=a(n);s&&(p=p.concat(s(n)));for(var h=0;h<p.length;++h){var m=p[h];if(!(r[m]||o[m]||d&&d[m])){var v=c(n,m);try{i(t,m,v)}catch(e){}}}return t}return t}},function(e,t,n){e.exports=n(427)},function(e,t,n){n(428);var r=n(18);e.exports=r.Date.now},function(e,t,n){n(8)({target:"Date",stat:!0},{now:function(){return(new Date).getTime()}})},function(e,t,n){e.exports=n(251)},function(e,t,n){e.exports=n(431)},function(e,t,n){var r=n(432),o=Array.prototype;e.exports=function(e){var t=e.some;return e===o||e instanceof Array&&t===o.some?r:t}},function(e,t,n){n(433);var r=n(32);e.exports=r("Array").some},function(e,t,n){"use strict";var r=n(8),o=n(47).some;r({target:"Array",proto:!0,forced:n(78)("some")},{some:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},function(e,t,n){e.exports=n(253)},function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(36),i=n(36),a=n(436),s=o.createFactory(n(437)),c=n(353),u=n(440),l=n(36).unstable_renderSubtreeIntoContainer,d=a.canUseDOM?window.HTMLElement:{},f=(a.canUseDOM&&document.body,o.createClass({displayName:"Modal",statics:{setAppElement:function(e){c.setElement(e)},injectCSS:function(){}},propTypes:{isOpen:o.PropTypes.bool.isRequired,style:o.PropTypes.shape({content:o.PropTypes.object,overlay:o.PropTypes.object}),portalClassName:o.PropTypes.string,bodyClassName:o.PropTypes.string,appElement:o.PropTypes.instanceOf(d),onAfterOpen:o.PropTypes.func,onRequestClose:o.PropTypes.func,closeTimeoutMS:o.PropTypes.number,ariaHideApp:o.PropTypes.bool,shouldCloseOnOverlayClick:o.PropTypes.bool},getDefaultProps:function(){return{isOpen:!1,portalClassName:"ReactModalPortal",bodyClassName:"ReactModal__Body",ariaHideApp:!0,closeTimeoutMS:0,shouldCloseOnOverlayClick:!0}},componentDidMount:function(){this.node=document.createElement("div"),this.node.className=this.props.portalClassName,document.body.appendChild(this.node),this.renderPortal(this.props)},componentWillReceiveProps:function(e){this.renderPortal(e)},componentWillUnmount:function(){i.unmountComponentAtNode(this.node),document.body.removeChild(this.node),u(document.body).remove(this.openBodyClass())},openBodyClass:function(){return this.props.bodyClassName+"--open"},renderPortal:function(e){e.isOpen?u(document.body).add(this.openBodyClass()):u(document.body).remove(this.openBodyClass()),e.ariaHideApp&&c.toggle(e.isOpen,e.appElement),this.portal=l(this,s(r({},e,{defaultStyles:f.defaultStyles})),this.node)},render:function(){return o.DOM.noscript()}}));f.defaultStyles={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.75)"},content:{position:"absolute",top:"40px",left:"40px",right:"40px",bottom:"40px",border:"1px solid #ccc",background:"#fff",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"4px",outline:"none",padding:"20px"}},e.exports=f},function(e,t,n){var r;
    /*!
      Copyright (c) 2015 Jed Watson.
      Based on code that is Copyright 2013-2015, Facebook, Inc.
      All rights reserved.
    */!function(){"use strict";var o=!("undefined"==typeof window||!window.document||!window.document.createElement),i={canUseDOM:o,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:o&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:o&&!!window.screen};void 0===(r=function(){return i}.call(t,n,t,e))||(e.exports=r)}()},function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(36),i=o.DOM.div,a=n(438),s=n(353),c=n(439),u=0,l={onAfterClose:function(){},style:{overlay:{},content:{}},overlayClassName:"ReactModal__Overlay",className:"ReactModal__Content"};e.exports=o.createClass({displayName:"ModalPortal",shouldClose:null,getDefaultProps:function(){return l},getInitialState:function(){return{afterOpen:!1,beforeClose:!1}},componentDidMount:function(){this.props.isOpen&&(this.setFocusAfterRender(!0),this.open())},componentWillUnmount:function(){clearTimeout(this.closeTimer)},componentWillReceiveProps:function(e){!this.props.isOpen&&e.isOpen?(this.setFocusAfterRender(!0),this.open()):this.props.isOpen&&!e.isOpen&&this.close()},componentDidUpdate:function(){this.focusAfterRender&&(this.focusContent(),this.setFocusAfterRender(!1))},setFocusAfterRender:function(e){this.focusAfterRender=e},open:function(){this.beforeOpen(),this.state.afterOpen&&this.state.beforeClose?(clearTimeout(this.closeTimer),this.setState({beforeClose:!1})):(a.setupScopedFocus(this.node),a.markForFocusLater(),this.setState({isOpen:!0},function(){this.setState({afterOpen:!0}),this.props.isOpen&&this.props.onAfterOpen&&this.props.onAfterOpen()}.bind(this)))},close:function(){this.ownerHandlesClose()&&(this.props.closeTimeoutMS>0?this.closeWithTimeout():this.closeWithoutTimeout())},focusContent:function(){this.refs.content&&!this.contentHasFocus()&&this.refs.content.focus()},closeWithTimeout:function(){this.setState({beforeClose:!0},function(){this.closeTimer=setTimeout(this.closeWithoutTimeout,this.props.closeTimeoutMS)}.bind(this))},closeWithoutTimeout:function(){this.setState({beforeClose:!1,isOpen:!1,afterOpen:!1},this.afterClose)},afterClose:function(){var e=this.props,t=e.appElement,n=e.ariaHideApp,r=e.onAfterClose;n&&u>0&&0===(u-=1)&&s.show(t),a.returnFocus(),a.teardownScopedFocus(),r()},beforeOpen:function(){var e=this.props,t=e.appElement;e.ariaHideApp&&(u+=1,s.hide(t))},handleKeyDown:function(e){9==e.keyCode&&c(this.refs.content,e),27==e.keyCode&&(e.preventDefault(),this.requestClose(e))},handleOverlayMouseDown:function(e){null===this.shouldClose&&(this.shouldClose=!0)},handleOverlayMouseUp:function(e){this.shouldClose&&this.props.shouldCloseOnOverlayClick&&(this.ownerHandlesClose()?this.requestClose(e):this.focusContent()),this.shouldClose=null},handleContentMouseDown:function(e){this.shouldClose=!1},handleContentMouseUp:function(e){this.shouldClose=!1},requestClose:function(e){this.ownerHandlesClose()&&this.props.onRequestClose(e)},ownerHandlesClose:function(){return this.props.onRequestClose},shouldBeClosed:function(){return!this.props.isOpen&&!this.state.beforeClose},contentHasFocus:function(){return document.activeElement===this.refs.content||this.refs.content.contains(document.activeElement)},buildClassName:function(e){var t=e+" ";return this.state.afterOpen&&(t+=e+"--after-open"),this.state.beforeClose&&(t+=e+"--before-close"),t},getPropInlineStyle:function(e,t){var n=e?this.props.defaultStyles[t]:{},o=this.props.style[t]||{};return r({},n,o)},isPropEqualToDefault:function(e){return this.props[e]===l[e]},render:function(){var e=this.getPropInlineStyle(this.isPropEqualToDefault("className"),"content"),t=this.getPropInlineStyle(this.isPropEqualToDefault("overlayClassName"),"overlay");return this.shouldBeClosed()?i():i({ref:"overlay",className:this.buildClassName(this.props.overlayClassName),style:t,onMouseDown:this.handleOverlayMouseDown,onMouseUp:this.handleOverlayMouseUp},i({ref:"content",style:e,className:this.buildClassName(this.props.className),tabIndex:"-1",onKeyDown:this.handleKeyDown,onMouseDown:this.handleContentMouseDown,onMouseUp:this.handleContentMouseUp,role:"dialog","aria-label":this.props.contentLabel},this.props.children))}})},function(e,t,n){"use strict";var r=n(352),o=null,i=null,a=!1;function s(e){a=!0}function c(e){if(a){if(a=!1,!o)return;setTimeout(function(){o.contains(document.activeElement)||(r(o)[0]||o).focus()},0)}}t.markForFocusLater=function(){i=document.activeElement},t.returnFocus=function(){try{i.focus()}catch(e){console.warn("You tried to return focus to "+i+" but it is not in the DOM anymore")}i=null},t.setupScopedFocus=function(e){o=e,window.addEventListener?(window.addEventListener("blur",s,!1),document.addEventListener("focus",c,!0)):(window.attachEvent("onBlur",s),document.attachEvent("onFocus",c))},t.teardownScopedFocus=function(){o=null,window.addEventListener?(window.removeEventListener("blur",s),document.removeEventListener("focus",c)):(window.detachEvent("onBlur",s),document.detachEvent("onFocus",c))}},function(e,t,n){"use strict";var r=n(352);e.exports=function(e,t){var n=r(e);n.length?n[t.shiftKey?0:n.length-1]!==document.activeElement&&e!==document.activeElement||(t.preventDefault(),n[t.shiftKey?n.length-1:0].focus()):t.preventDefault()}},function(e,t){function n(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}function r(e){if(!(this instanceof r))return new r(e);e||(e={}),e.nodeType&&(e={el:e}),this.opts=e,this.el=e.el||document.body,"object"!=typeof this.el&&(this.el=document.querySelector(this.el))}e.exports=function(e){return new r(e)},r.prototype.add=function(e){var t=this.el;if(t){if(""===t.className)return t.className=e;var r=t.className.split(" ");return n(r,e)>-1?r:(r.push(e),t.className=r.join(" "),r)}},r.prototype.remove=function(e){var t=this.el;if(t&&""!==t.className){var r=t.className.split(" "),o=n(r,e);return o>-1&&r.splice(o,1),t.className=r.join(" "),r}},r.prototype.has=function(e){var t=this.el;if(t)return n(t.className.split(" "),e)>-1},r.prototype.toggle=function(e){this.el&&(this.has(e)?this.remove(e):this.add(e))}},function(e,t,n){e.exports=n(442)},function(e,t,n){var r=n(443),o=Function.prototype;e.exports=function(e){var t=e.bind;return e===o||e instanceof Function&&t===o.bind?r:t}},function(e,t,n){n(444);var r=n(32);e.exports=r("Function").bind},function(e,t,n){n(8)({target:"Function",proto:!0},{bind:n(445)})},function(e,t,n){"use strict";var r=n(67),o=n(29),i=[].slice,a={},s=function(e,t,n){if(!(t in a)){for(var r=[],o=0;o<t;o++)r[o]="a["+o+"]";a[t]=Function("C,a","return new C("+r.join(",")+")")}return a[t](e,n)};e.exports=Function.bind||function(e){var t=r(this),n=i.call(arguments,1),a=function(){var r=n.concat(i.call(arguments));return this instanceof a?s(t,r.length,r):t.apply(e,r)};return o(t.prototype)&&(a.prototype=t.prototype),a}},function(e,t,n){"use strict";var r=n(320),o=Object.prototype.toString,i=Object.prototype.hasOwnProperty,a=function(e,t,n){for(var r=0,o=e.length;r<o;r++)i.call(e,r)&&(null==n?t(e[r],r,e):t.call(n,e[r],r,e))},s=function(e,t,n){for(var r=0,o=e.length;r<o;r++)null==n?t(e.charAt(r),r,e):t.call(n,e.charAt(r),r,e)},c=function(e,t,n){for(var r in e)i.call(e,r)&&(null==n?t(e[r],r,e):t.call(n,e[r],r,e))};e.exports=function(e,t,n){if(!r(t))throw new TypeError("iterator must be a function");var i;arguments.length>=3&&(i=n),"[object Array]"===o.call(e)?a(e,t,i):"string"==typeof e?s(e,t,i):c(e,t,i)}},function(e,t,n){"use strict";var r="Function.prototype.bind called on incompatible ",o=Array.prototype.slice,i=Object.prototype.toString;e.exports=function(e){var t=this;if("function"!=typeof t||"[object Function]"!==i.call(t))throw new TypeError(r+t);for(var n,a=o.call(arguments,1),s=function(){if(this instanceof n){var r=t.apply(this,a.concat(o.call(arguments)));return Object(r)===r?r:this}return t.apply(e,a.concat(o.call(arguments)))},c=Math.max(0,t.length-a.length),u=[],l=0;l<c;l++)u.push("$"+l);if(n=Function("binder","return function ("+u.join(",")+"){ return binder.apply(this,arguments); }")(s),t.prototype){var d=function(){};d.prototype=t.prototype,n.prototype=new d,d.prototype=null}return n}},function(e,t,n){"use strict";var r=n(323),o=n(354),i=n(356),a=n(358),s=n(459),c=r.call(Function.call,a());o(c,{getPolyfill:a,implementation:i,shim:s}),e.exports=c},function(e,t,n){"use strict";var r=Array.prototype.slice,o=n(355),i=Object.keys,a=i?function(e){return i(e)}:n(450),s=Object.keys;a.shim=function(){Object.keys?function(){var e=Object.keys(arguments);return e&&e.length===arguments.length}(1,2)||(Object.keys=function(e){return o(e)?s(r.call(e)):s(e)}):Object.keys=a;return Object.keys||a},e.exports=a},function(e,t,n){"use strict";var r;if(!Object.keys){var o=Object.prototype.hasOwnProperty,i=Object.prototype.toString,a=n(355),s=Object.prototype.propertyIsEnumerable,c=!s.call({toString:null},"toString"),u=s.call(function(){},"prototype"),l=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=function(e){var t=e.constructor;return t&&t.prototype===e},f={$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},p=function(){if("undefined"==typeof window)return!1;for(var e in window)try{if(!f["$"+e]&&o.call(window,e)&&null!==window[e]&&"object"==typeof window[e])try{d(window[e])}catch(e){return!0}}catch(e){return!0}return!1}();r=function(e){var t=null!==e&&"object"==typeof e,n="[object Function]"===i.call(e),r=a(e),s=t&&"[object String]"===i.call(e),f=[];if(!t&&!n&&!r)throw new TypeError("Object.keys called on a non-object");var h=u&&n;if(s&&e.length>0&&!o.call(e,0))for(var m=0;m<e.length;++m)f.push(String(m));if(r&&e.length>0)for(var v=0;v<e.length;++v)f.push(String(v));else for(var y in e)h&&"prototype"===y||!o.call(e,y)||f.push(String(y));if(c)for(var g=function(e){if("undefined"==typeof window||!p)return d(e);try{return d(e)}catch(e){return!1}}(e),b=0;b<l.length;++b)g&&"constructor"===l[b]||!o.call(e,l[b])||f.push(l[b]);return f}}e.exports=r},function(e,t,n){"use strict";var r=n(357),o=r("%Object%"),i=r("%TypeError%"),a=r("%String%"),s=n(452),c=n(453),u=n(454),l=n(455),d=n(456),f=n(320),p=n(457),h=n(322),m={ToPrimitive:p,ToBoolean:function(e){return!!e},ToNumber:function(e){return+e},ToInteger:function(e){var t=this.ToNumber(e);return c(t)?0:0!==t&&u(t)?l(t)*Math.floor(Math.abs(t)):t},ToInt32:function(e){return this.ToNumber(e)>>0},ToUint32:function(e){return this.ToNumber(e)>>>0},ToUint16:function(e){var t=this.ToNumber(e);if(c(t)||0===t||!u(t))return 0;var n=l(t)*Math.floor(Math.abs(t));return d(n,65536)},ToString:function(e){return a(e)},ToObject:function(e){return this.CheckObjectCoercible(e),o(e)},CheckObjectCoercible:function(e,t){if(null==e)throw new i(t||"Cannot call method on "+e);return e},IsCallable:f,SameValue:function(e,t){return e===t?0!==e||1/e==1/t:c(e)&&c(t)},Type:function(e){return null===e?"Null":void 0===e?"Undefined":"function"==typeof e||"object"==typeof e?"Object":"number"==typeof e?"Number":"boolean"==typeof e?"Boolean":"string"==typeof e?"String":void 0},IsPropertyDescriptor:function(e){if("Object"!==this.Type(e))return!1;var t={"[[Configurable]]":!0,"[[Enumerable]]":!0,"[[Get]]":!0,"[[Set]]":!0,"[[Value]]":!0,"[[Writable]]":!0};for(var n in e)if(h(e,n)&&!t[n])return!1;var r=h(e,"[[Value]]"),o=h(e,"[[Get]]")||h(e,"[[Set]]");if(r&&o)throw new i("Property Descriptors may not be both accessor and data descriptors");return!0},IsAccessorDescriptor:function(e){return void 0!==e&&(s(this,"Property Descriptor","Desc",e),!(!h(e,"[[Get]]")&&!h(e,"[[Set]]")))},IsDataDescriptor:function(e){return void 0!==e&&(s(this,"Property Descriptor","Desc",e),!(!h(e,"[[Value]]")&&!h(e,"[[Writable]]")))},IsGenericDescriptor:function(e){return void 0!==e&&(s(this,"Property Descriptor","Desc",e),!this.IsAccessorDescriptor(e)&&!this.IsDataDescriptor(e))},FromPropertyDescriptor:function(e){if(void 0===e)return e;if(s(this,"Property Descriptor","Desc",e),this.IsDataDescriptor(e))return{value:e["[[Value]]"],writable:!!e["[[Writable]]"],enumerable:!!e["[[Enumerable]]"],configurable:!!e["[[Configurable]]"]};if(this.IsAccessorDescriptor(e))return{get:e["[[Get]]"],set:e["[[Set]]"],enumerable:!!e["[[Enumerable]]"],configurable:!!e["[[Configurable]]"]};throw new i("FromPropertyDescriptor must be called with a fully populated Property Descriptor")},ToPropertyDescriptor:function(e){if("Object"!==this.Type(e))throw new i("ToPropertyDescriptor requires an object");var t={};if(h(e,"enumerable")&&(t["[[Enumerable]]"]=this.ToBoolean(e.enumerable)),h(e,"configurable")&&(t["[[Configurable]]"]=this.ToBoolean(e.configurable)),h(e,"value")&&(t["[[Value]]"]=e.value),h(e,"writable")&&(t["[[Writable]]"]=this.ToBoolean(e.writable)),h(e,"get")){var n=e.get;if(void 0!==n&&!this.IsCallable(n))throw new TypeError("getter must be a function");t["[[Get]]"]=n}if(h(e,"set")){var r=e.set;if(void 0!==r&&!this.IsCallable(r))throw new i("setter must be a function");t["[[Set]]"]=r}if((h(t,"[[Get]]")||h(t,"[[Set]]"))&&(h(t,"[[Value]]")||h(t,"[[Writable]]")))throw new i("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");return t}};e.exports=m},function(e,t,n){"use strict";var r=n(357),o=r("%TypeError%"),i=r("%SyntaxError%"),a=n(322),s={"Property Descriptor":function(e,t){if("Object"!==e.Type(t))return!1;var n={"[[Configurable]]":!0,"[[Enumerable]]":!0,"[[Get]]":!0,"[[Set]]":!0,"[[Value]]":!0,"[[Writable]]":!0};for(var r in t)if(a(t,r)&&!n[r])return!1;var i=a(t,"[[Value]]"),s=a(t,"[[Get]]")||a(t,"[[Set]]");if(i&&s)throw new o("Property Descriptors may not be both accessor and data descriptors");return!0}};e.exports=function(e,t,n,r){var a=s[t];if("function"!=typeof a)throw new i("unknown record type: "+t);if(!a(e,r))throw new o(n+" must be a "+t);console.log(a(e,r),r)}},function(e,t){e.exports=Number.isNaN||function(e){return e!=e}},function(e,t){var n=Number.isNaN||function(e){return e!=e};e.exports=Number.isFinite||function(e){return"number"==typeof e&&!n(e)&&e!==1/0&&e!==-1/0}},function(e,t){e.exports=function(e){return e>=0?1:-1}},function(e,t){e.exports=function(e,t){var n=e%t;return Math.floor(n>=0?n:n+t)}},function(e,t,n){"use strict";var r=Object.prototype.toString,o=n(458),i=n(320),a=function(e){var t;if((t=arguments.length>1?arguments[1]:"[object Date]"===r.call(e)?String:Number)===String||t===Number){var n,a,s=t===String?["toString","valueOf"]:["valueOf","toString"];for(a=0;a<s.length;++a)if(i(e[s[a]])&&(n=e[s[a]](),o(n)))return n;throw new TypeError("No default value")}throw new TypeError("invalid [[DefaultValue]] hint supplied")};e.exports=function(e){return o(e)?e:arguments.length>1?a(e,arguments[1]):a(e)}},function(e,t){e.exports=function(e){return null===e||"function"!=typeof e&&"object"!=typeof e}},function(e,t,n){"use strict";var r=n(354),o=n(358);e.exports=function(){var e=o();return r(String.prototype,{trim:e},{trim:function(){return String.prototype.trim!==e}}),e}},function(e,t,n){e.exports=n(461)},function(e,t,n){var r=n(462),o=Array.prototype;e.exports=function(e){var t=e.reduceRight;return e===o||e instanceof Array&&t===o.reduceRight?r:t}},function(e,t,n){n(463);var r=n(32);e.exports=r("Array").reduceRight},function(e,t,n){"use strict";var r=n(8),o=n(142).right;r({target:"Array",proto:!0,forced:n(78)("reduceRight")},{reduceRight:function(e){return o(this,e,arguments.length,arguments.length>1?arguments[1]:void 0)}})},function(e,t,n){e.exports=n(465)},function(e,t,n){var r=n(466),o=Array.prototype;e.exports=function(e){var t=e.findIndex;return e===o||e instanceof Array&&t===o.findIndex?r:t}},function(e,t,n){n(467);var r=n(32);e.exports=r("Array").findIndex},function(e,t,n){"use strict";var r=n(8),o=n(47).findIndex,i=n(97),a=!0;"findIndex"in[]&&Array(1).findIndex(function(){a=!1}),r({target:"Array",proto:!0,forced:a},{findIndex:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),i("findIndex")},function(e,t,n){n(359),e.exports=n(18).setTimeout},function(e,t,n){"use strict";t.__esModule=!0,t.locationsAreEqual=t.createLocation=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=s(n(470)),i=s(n(471)),a=n(360);function s(e){return e&&e.__esModule?e:{default:e}}t.createLocation=function(e,t,n,i){var s=void 0;return"string"==typeof e?(s=(0,a.parsePath)(e)).state=t:(void 0===(s=r({},e)).pathname&&(s.pathname=""),s.search?"?"!==s.search.charAt(0)&&(s.search="?"+s.search):s.search="",s.hash?"#"!==s.hash.charAt(0)&&(s.hash="#"+s.hash):s.hash="",void 0!==t&&void 0===s.state&&(s.state=t)),s.key=n,i&&(s.pathname?"/"!==s.pathname.charAt(0)&&(s.pathname=(0,o.default)(s.pathname,i.pathname)):s.pathname=i.pathname),s},t.locationsAreEqual=function(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&(0,i.default)(e.state,t.state)}},function(e,t,n){"use strict";function r(e){return"/"===e.charAt(0)}function o(e,t){for(var n=t,r=n+1,o=e.length;r<o;n+=1,r+=1)e[n]=e[r];e.pop()}n.r(t),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=e&&e.split("/")||[],i=t&&t.split("/")||[],a=e&&r(e),s=t&&r(t),c=a||s;if(e&&r(e)?i=n:n.length&&(i.pop(),i=i.concat(n)),!i.length)return"/";var u=void 0;if(i.length){var l=i[i.length-1];u="."===l||".."===l||""===l}else u=!1;for(var d=0,f=i.length;f>=0;f--){var p=i[f];"."===p?o(i,f):".."===p?(o(i,f),d++):d&&(o(i,f),d--)}if(!c)for(;d--;d)i.unshift("..");!c||""===i[0]||i[0]&&r(i[0])||i.unshift("");var h=i.join("/");return u&&"/"!==h.substr(-1)&&(h+="/"),h}},function(e,t,n){"use strict";t.__esModule=!0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=function e(t,n){if(t===n)return!0;if(null==t||null==n)return!1;if(Array.isArray(t))return Array.isArray(n)&&t.length===n.length&&t.every(function(t,r){return e(t,n[r])});var o=void 0===t?"undefined":r(t);if(o!==(void 0===n?"undefined":r(n)))return!1;if("object"===o){var i=t.valueOf(),a=n.valueOf();if(i!==t||a!==n)return e(i,a);var s=Object.keys(t),c=Object.keys(n);return s.length===c.length&&s.every(function(r){return e(t[r],n[r])})}return!1}},function(e,t,n){"use strict";t.__esModule=!0;var r,o=n(321);(r=o)&&r.__esModule;t.default=function(){var e=null,t=[];return{setPrompt:function(t){return e=t,function(){e===t&&(e=null)}},confirmTransitionTo:function(t,n,r,o){if(null!=e){var i="function"==typeof e?e(t,n):e;"string"==typeof i?"function"==typeof r?r(i,o):o(!0):o(!1!==i)}else o(!0)},appendListener:function(e){var n=!0,r=function(){n&&e.apply(void 0,arguments)};return t.push(r),function(){n=!1,t=t.filter(function(e){return e!==r})}},notifyListeners:function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];t.forEach(function(e){return e.apply(void 0,n)})}}}},function(e,t,n){"use strict";t.__esModule=!0;t.canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement)},function(e,t,n){"use strict";t.__esModule=!0;t.addEventListener=function(e,t,n){return e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)},t.removeEventListener=function(e,t,n){return e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent("on"+t,n)},t.getConfirmation=function(e,t){return t(window.confirm(e))},t.supportsHistory=function(){var e=window.navigator.userAgent;return(-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)},t.supportsPopStateOnHashChange=function(){return-1===window.navigator.userAgent.indexOf("Trident")},t.supportsGoWithoutReloadUsingHash=function(){return-1===window.navigator.userAgent.indexOf("Firefox")},t.isExtraneousPopstateEvent=function(e){return void 0===e.state&&-1===navigator.userAgent.indexOf("CriOS")}},function(e,t,n){var r=n(361),o=n(107)("socket.io-client:url");e.exports=function(e,t){var n=e;t=t||"undefined"!=typeof location&&location,null==e&&(e=t.protocol+"//"+t.host);"string"==typeof e&&("/"===e.charAt(0)&&(e="/"===e.charAt(1)?t.protocol+e:t.host+e),/^(https?|wss?):\/\//.test(e)||(o("protocol-less url %s",e),e=void 0!==t?t.protocol+"//"+e:"https://"+e),o("parse %s",e),n=r(e));n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443"));n.path=n.path||"/";var i=-1!==n.host.indexOf(":")?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+i+":"+n.port,n.href=n.protocol+"://"+i+(t&&t.port===n.port?"":":"+n.port),n}},function(e,t,n){function r(e){var n;function r(){if(r.enabled){var e=r,o=+new Date,i=o-(n||o);e.diff=i,e.prev=n,e.curr=o,n=o;for(var a=new Array(arguments.length),s=0;s<a.length;s++)a[s]=arguments[s];a[0]=t.coerce(a[0]),"string"!=typeof a[0]&&a.unshift("%O");var c=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;c++;var o=t.formatters[r];if("function"==typeof o){var i=a[c];n=o.call(e,i),a.splice(c,1),c--}return n}),t.formatArgs.call(e,a),(r.log||t.log||console.log.bind(console)).apply(e,a)}}return r.namespace=e,r.enabled=t.enabled(e),r.useColors=t.useColors(),r.color=function(e){var n,r=0;for(n in e)r=(r<<5)-r+e.charCodeAt(n),r|=0;return t.colors[Math.abs(r)%t.colors.length]}(e),r.destroy=o,"function"==typeof t.init&&t.init(r),t.instances.push(r),r}function o(){var e=t.instances.indexOf(this);return-1!==e&&(t.instances.splice(e,1),!0)}(t=e.exports=r.debug=r.default=r).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){var n;t.save(e),t.names=[],t.skips=[];var r=("string"==typeof e?e:"").split(/[\s,]+/),o=r.length;for(n=0;n<o;n++)r[n]&&("-"===(e=r[n].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")));for(n=0;n<t.instances.length;n++){var i=t.instances[n];i.enabled=t.enabled(i.namespace)}},t.enabled=function(e){if("*"===e[e.length-1])return!0;var n,r;for(n=0,r=t.skips.length;n<r;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;n<r;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=n(477),t.instances=[],t.names=[],t.skips=[],t.formatters={}},function(e,t){var n=1e3,r=60*n,o=60*r,i=24*o,a=365.25*i;function s(e,t,n){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}e.exports=function(e,t){t=t||{};var c,u=typeof e;if("string"===u&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!t)return;var s=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return s*a;case"days":case"day":case"d":return s*i;case"hours":case"hour":case"hrs":case"hr":case"h":return s*o;case"minutes":case"minute":case"mins":case"min":case"m":return s*r;case"seconds":case"second":case"secs":case"sec":case"s":return s*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return s;default:return}}(e);if("number"===u&&!1===isNaN(e))return t.long?s(c=e,i,"day")||s(c,o,"hour")||s(c,r,"minute")||s(c,n,"second")||c+" ms":function(e){if(e>=i)return Math.round(e/i)+"d";if(e>=o)return Math.round(e/o)+"h";if(e>=r)return Math.round(e/r)+"m";if(e>=n)return Math.round(e/n)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},function(e,t,n){var r=n(328),o=n(362),i=Object.prototype.toString,a="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===i.call(Blob),s="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===i.call(File);t.deconstructPacket=function(e){var t=[],n=e.data,i=e;return i.data=function e(t,n){if(!t)return t;if(o(t)){var i={_placeholder:!0,num:n.length};return n.push(t),i}if(r(t)){for(var a=new Array(t.length),s=0;s<t.length;s++)a[s]=e(t[s],n);return a}if("object"==typeof t&&!(t instanceof Date)){a={};for(var c in t)a[c]=e(t[c],n);return a}return t}(n,t),i.attachments=t.length,{packet:i,buffers:t}},t.reconstructPacket=function(e,t){return e.data=function e(t,n){if(!t)return t;if(t&&t._placeholder)return n[t.num];if(r(t))for(var o=0;o<t.length;o++)t[o]=e(t[o],n);else if("object"==typeof t)for(var i in t)t[i]=e(t[i],n);return t}(e.data,t),e.attachments=void 0,e},t.removeBlobs=function(e,t){var n=0,i=e;!function e(c,u,l){if(!c)return c;if(a&&c instanceof Blob||s&&c instanceof File){n++;var d=new FileReader;d.onload=function(){l?l[u]=this.result:i=this.result,--n||t(i)},d.readAsArrayBuffer(c)}else if(r(c))for(var f=0;f<c.length;f++)e(c[f],f,c);else if("object"==typeof c&&!o(c))for(var p in c)e(c[p],p,c)}(i),n||t(i)}},function(e,t,n){e.exports=n(480),e.exports.parser=n(145)},function(e,t,n){var r=n(364),o=n(144),i=n(107)("engine.io-client:socket"),a=n(368),s=n(145),c=n(361),u=n(257);function l(e,t){if(!(this instanceof l))return new l(e,t);t=t||{},e&&"object"==typeof e&&(t=e,e=null),e?(e=c(e),t.hostname=e.host,t.secure="https"===e.protocol||"wss"===e.protocol,t.port=e.port,e.query&&(t.query=e.query)):t.host&&(t.hostname=c(t.host).host),this.secure=null!=t.secure?t.secure:"undefined"!=typeof location&&"https:"===location.protocol,t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.agent=t.agent||!1,this.hostname=t.hostname||("undefined"!=typeof location?location.hostname:"localhost"),this.port=t.port||("undefined"!=typeof location&&location.port?location.port:this.secure?443:80),this.query=t.query||{},"string"==typeof this.query&&(this.query=u.decode(this.query)),this.upgrade=!1!==t.upgrade,this.path=(t.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!t.forceJSONP,this.jsonp=!1!==t.jsonp,this.forceBase64=!!t.forceBase64,this.enablesXDR=!!t.enablesXDR,this.timestampParam=t.timestampParam||"t",this.timestampRequests=t.timestampRequests,this.transports=t.transports||["polling","websocket"],this.transportOptions=t.transportOptions||{},this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=t.policyPort||843,this.rememberUpgrade=t.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=t.onlyBinaryUpgrades,this.perMessageDeflate=!1!==t.perMessageDeflate&&(t.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=t.pfx||null,this.key=t.key||null,this.passphrase=t.passphrase||null,this.cert=t.cert||null,this.ca=t.ca||null,this.ciphers=t.ciphers||null,this.rejectUnauthorized=void 0===t.rejectUnauthorized||t.rejectUnauthorized,this.forceNode=!!t.forceNode,this.isReactNative="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),("undefined"==typeof self||this.isReactNative)&&(t.extraHeaders&&Object.keys(t.extraHeaders).length>0&&(this.extraHeaders=t.extraHeaders),t.localAddress&&(this.localAddress=t.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,this.open()}e.exports=l,l.priorWebsocketSuccess=!1,o(l.prototype),l.protocol=s.protocol,l.Socket=l,l.Transport=n(330),l.transports=n(364),l.parser=n(145),l.prototype.createTransport=function(e){i('creating transport "%s"',e);var t=function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}(this.query);t.EIO=s.protocol,t.transport=e;var n=this.transportOptions[e]||{};return this.id&&(t.sid=this.id),new r[e]({query:t,socket:this,agent:n.agent||this.agent,hostname:n.hostname||this.hostname,port:n.port||this.port,secure:n.secure||this.secure,path:n.path||this.path,forceJSONP:n.forceJSONP||this.forceJSONP,jsonp:n.jsonp||this.jsonp,forceBase64:n.forceBase64||this.forceBase64,enablesXDR:n.enablesXDR||this.enablesXDR,timestampRequests:n.timestampRequests||this.timestampRequests,timestampParam:n.timestampParam||this.timestampParam,policyPort:n.policyPort||this.policyPort,pfx:n.pfx||this.pfx,key:n.key||this.key,passphrase:n.passphrase||this.passphrase,cert:n.cert||this.cert,ca:n.ca||this.ca,ciphers:n.ciphers||this.ciphers,rejectUnauthorized:n.rejectUnauthorized||this.rejectUnauthorized,perMessageDeflate:n.perMessageDeflate||this.perMessageDeflate,extraHeaders:n.extraHeaders||this.extraHeaders,forceNode:n.forceNode||this.forceNode,localAddress:n.localAddress||this.localAddress,requestTimeout:n.requestTimeout||this.requestTimeout,protocols:n.protocols||void 0,isReactNative:this.isReactNative})},l.prototype.open=function(){var e;if(this.rememberUpgrade&&l.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))e="websocket";else{if(0===this.transports.length){var t=this;return void setTimeout(function(){t.emit("error","No transports available")},0)}e=this.transports[0]}this.readyState="opening";try{e=this.createTransport(e)}catch(e){return this.transports.shift(),void this.open()}e.open(),this.setTransport(e)},l.prototype.setTransport=function(e){i("setting transport %s",e.name);var t=this;this.transport&&(i("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=e,e.on("drain",function(){t.onDrain()}).on("packet",function(e){t.onPacket(e)}).on("error",function(e){t.onError(e)}).on("close",function(){t.onClose("transport close")})},l.prototype.probe=function(e){i('probing transport "%s"',e);var t=this.createTransport(e,{probe:1}),n=!1,r=this;function o(){if(r.onlyBinaryUpgrades){var o=!this.supportsBinary&&r.transport.supportsBinary;n=n||o}n||(i('probe transport "%s" opened',e),t.send([{type:"ping",data:"probe"}]),t.once("packet",function(o){if(!n)if("pong"===o.type&&"probe"===o.data){if(i('probe transport "%s" pong',e),r.upgrading=!0,r.emit("upgrading",t),!t)return;l.priorWebsocketSuccess="websocket"===t.name,i('pausing current transport "%s"',r.transport.name),r.transport.pause(function(){n||"closed"!==r.readyState&&(i("changing transport and sending upgrade packet"),f(),r.setTransport(t),t.send([{type:"upgrade"}]),r.emit("upgrade",t),t=null,r.upgrading=!1,r.flush())})}else{i('probe transport "%s" failed',e);var a=new Error("probe error");a.transport=t.name,r.emit("upgradeError",a)}}))}function a(){n||(n=!0,f(),t.close(),t=null)}function s(n){var o=new Error("probe error: "+n);o.transport=t.name,a(),i('probe transport "%s" failed because of error: %s',e,n),r.emit("upgradeError",o)}function c(){s("transport closed")}function u(){s("socket closed")}function d(e){t&&e.name!==t.name&&(i('"%s" works - aborting "%s"',e.name,t.name),a())}function f(){t.removeListener("open",o),t.removeListener("error",s),t.removeListener("close",c),r.removeListener("close",u),r.removeListener("upgrading",d)}l.priorWebsocketSuccess=!1,t.once("open",o),t.once("error",s),t.once("close",c),this.once("close",u),this.once("upgrading",d),t.open()},l.prototype.onOpen=function(){if(i("socket open"),this.readyState="open",l.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){i("starting upgrade probes");for(var e=0,t=this.upgrades.length;e<t;e++)this.probe(this.upgrades[e])}},l.prototype.onPacket=function(e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(i('socket receive: type "%s", data "%s"',e.type,e.data),this.emit("packet",e),this.emit("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var t=new Error("server error");t.code=e.data,this.onError(t);break;case"message":this.emit("data",e.data),this.emit("message",e.data)}else i('packet received with socket readyState "%s"',this.readyState)},l.prototype.onHandshake=function(e){this.emit("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},l.prototype.onHeartbeat=function(e){clearTimeout(this.pingTimeoutTimer);var t=this;t.pingTimeoutTimer=setTimeout(function(){"closed"!==t.readyState&&t.onClose("ping timeout")},e||t.pingInterval+t.pingTimeout)},l.prototype.setPing=function(){var e=this;clearTimeout(e.pingIntervalTimer),e.pingIntervalTimer=setTimeout(function(){i("writing ping packet - expecting pong within %sms",e.pingTimeout),e.ping(),e.onHeartbeat(e.pingTimeout)},e.pingInterval)},l.prototype.ping=function(){var e=this;this.sendPacket("ping",function(){e.emit("ping")})},l.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},l.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(i("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},l.prototype.write=l.prototype.send=function(e,t,n){return this.sendPacket("message",e,t,n),this},l.prototype.sendPacket=function(e,t,n,r){if("function"==typeof t&&(r=t,t=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){(n=n||{}).compress=!1!==n.compress;var o={type:e,data:t,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}},l.prototype.close=function(){if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var e=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?r():t()}):this.upgrading?r():t()}function t(){e.onClose("forced close"),i("socket closing - telling transport to close"),e.transport.close()}function n(){e.removeListener("upgrade",n),e.removeListener("upgradeError",n),t()}function r(){e.once("upgrade",n),e.once("upgradeError",n)}return this},l.prototype.onError=function(e){i("socket error %j",e),l.priorWebsocketSuccess=!1,this.emit("error",e),this.onClose("transport error",e)},l.prototype.onClose=function(e,t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){i('socket close with reason: "%s"',e);clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",e,t),this.writeBuffer=[],this.prevBufferLen=0}},l.prototype.filterUpgrades=function(e){for(var t=[],n=0,r=e.length;n<r;n++)~a(this.transports,e[n])&&t.push(e[n]);return t}},function(e,t){try{e.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(t){e.exports=!1}},function(e,t,n){var r=n(329),o=n(365),i=n(144),a=n(258),s=n(107)("engine.io-client:polling-xhr");function c(){}function u(e){if(o.call(this,e),this.requestTimeout=e.requestTimeout,this.extraHeaders=e.extraHeaders,"undefined"!=typeof location){var t="https:"===location.protocol,n=location.port;n||(n=t?443:80),this.xd="undefined"!=typeof location&&e.hostname!==location.hostname||n!==e.port,this.xs=e.secure!==t}}function l(e){this.method=e.method||"GET",this.uri=e.uri,this.xd=!!e.xd,this.xs=!!e.xs,this.async=!1!==e.async,this.data=void 0!==e.data?e.data:null,this.agent=e.agent,this.isBinary=e.isBinary,this.supportsBinary=e.supportsBinary,this.enablesXDR=e.enablesXDR,this.requestTimeout=e.requestTimeout,this.pfx=e.pfx,this.key=e.key,this.passphrase=e.passphrase,this.cert=e.cert,this.ca=e.ca,this.ciphers=e.ciphers,this.rejectUnauthorized=e.rejectUnauthorized,this.extraHeaders=e.extraHeaders,this.create()}if(e.exports=u,e.exports.Request=l,a(u,o),u.prototype.supportsBinary=!0,u.prototype.request=function(e){return(e=e||{}).uri=this.uri(),e.xd=this.xd,e.xs=this.xs,e.agent=this.agent||!1,e.supportsBinary=this.supportsBinary,e.enablesXDR=this.enablesXDR,e.pfx=this.pfx,e.key=this.key,e.passphrase=this.passphrase,e.cert=this.cert,e.ca=this.ca,e.ciphers=this.ciphers,e.rejectUnauthorized=this.rejectUnauthorized,e.requestTimeout=this.requestTimeout,e.extraHeaders=this.extraHeaders,new l(e)},u.prototype.doWrite=function(e,t){var n="string"!=typeof e&&void 0!==e,r=this.request({method:"POST",data:e,isBinary:n}),o=this;r.on("success",t),r.on("error",function(e){o.onError("xhr post error",e)}),this.sendXhr=r},u.prototype.doPoll=function(){s("xhr poll");var e=this.request(),t=this;e.on("data",function(e){t.onData(e)}),e.on("error",function(e){t.onError("xhr poll error",e)}),this.pollXhr=e},i(l.prototype),l.prototype.create=function(){var e={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};e.pfx=this.pfx,e.key=this.key,e.passphrase=this.passphrase,e.cert=this.cert,e.ca=this.ca,e.ciphers=this.ciphers,e.rejectUnauthorized=this.rejectUnauthorized;var t=this.xhr=new r(e),n=this;try{s("xhr open %s: %s",this.method,this.uri),t.open(this.method,this.uri,this.async);try{if(this.extraHeaders)for(var o in t.setDisableHeaderCheck&&t.setDisableHeaderCheck(!0),this.extraHeaders)this.extraHeaders.hasOwnProperty(o)&&t.setRequestHeader(o,this.extraHeaders[o])}catch(e){}if("POST"===this.method)try{this.isBinary?t.setRequestHeader("Content-type","application/octet-stream"):t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(e){}try{t.setRequestHeader("Accept","*/*")}catch(e){}"withCredentials"in t&&(t.withCredentials=!0),this.requestTimeout&&(t.timeout=this.requestTimeout),this.hasXDR()?(t.onload=function(){n.onLoad()},t.onerror=function(){n.onError(t.responseText)}):t.onreadystatechange=function(){if(2===t.readyState)try{var e=t.getResponseHeader("Content-Type");n.supportsBinary&&"application/octet-stream"===e&&(t.responseType="arraybuffer")}catch(e){}4===t.readyState&&(200===t.status||1223===t.status?n.onLoad():setTimeout(function(){n.onError(t.status)},0))},s("xhr data %s",this.data),t.send(this.data)}catch(e){return void setTimeout(function(){n.onError(e)},0)}"undefined"!=typeof document&&(this.index=l.requestsCount++,l.requests[this.index]=this)},l.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},l.prototype.onData=function(e){this.emit("data",e),this.onSuccess()},l.prototype.onError=function(e){this.emit("error",e),this.cleanup(!0)},l.prototype.cleanup=function(e){if(void 0!==this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=c:this.xhr.onreadystatechange=c,e)try{this.xhr.abort()}catch(e){}"undefined"!=typeof document&&delete l.requests[this.index],this.xhr=null}},l.prototype.onLoad=function(){var e;try{var t;try{t=this.xhr.getResponseHeader("Content-Type")}catch(e){}e="application/octet-stream"===t&&this.xhr.response||this.xhr.responseText}catch(e){this.onError(e)}null!=e&&this.onData(e)},l.prototype.hasXDR=function(){return"undefined"!=typeof XDomainRequest&&!this.xs&&this.enablesXDR},l.prototype.abort=function(){this.cleanup()},l.requestsCount=0,l.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",f);else if("function"==typeof addEventListener){var d="onpagehide"in self?"pagehide":"unload";addEventListener(d,f,!1)}function f(){for(var e in l.requests)l.requests.hasOwnProperty(e)&&l.requests[e].abort()}},function(e,t){e.exports=Object.keys||function(e){var t=[],n=Object.prototype.hasOwnProperty;for(var r in e)n.call(e,r)&&t.push(r);return t}},function(e,t){e.exports=function(e,t,n){var r=e.byteLength;if(t=t||0,n=n||r,e.slice)return e.slice(t,n);if(t<0&&(t+=r),n<0&&(n+=r),n>r&&(n=r),t>=r||t>=n||0===r)return new ArrayBuffer(0);for(var o=new Uint8Array(e),i=new Uint8Array(n-t),a=t,s=0;a<n;a++,s++)i[s]=o[a];return i.buffer}},function(e,t){function n(){}e.exports=function(e,t,r){var o=!1;return r=r||n,i.count=e,0===e?t():i;function i(e,n){if(i.count<=0)throw new Error("after called too many times");--i.count,e?(o=!0,t(e),t=r):0!==i.count||o||t(null,n)}}},function(e,t){
    /*! https://mths.be/utf8js v2.1.2 by @mathias */
    var n,r,o,i=String.fromCharCode;function a(e){for(var t,n,r=[],o=0,i=e.length;o<i;)(t=e.charCodeAt(o++))>=55296&&t<=56319&&o<i?56320==(64512&(n=e.charCodeAt(o++)))?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),o--):r.push(t);return r}function s(e,t){if(e>=55296&&e<=57343){if(t)throw Error("Lone surrogate U+"+e.toString(16).toUpperCase()+" is not a scalar value");return!1}return!0}function c(e,t){return i(e>>t&63|128)}function u(e,t){if(0==(4294967168&e))return i(e);var n="";return 0==(4294965248&e)?n=i(e>>6&31|192):0==(4294901760&e)?(s(e,t)||(e=65533),n=i(e>>12&15|224),n+=c(e,6)):0==(4292870144&e)&&(n=i(e>>18&7|240),n+=c(e,12),n+=c(e,6)),n+=i(63&e|128)}function l(){if(o>=r)throw Error("Invalid byte index");var e=255&n[o];if(o++,128==(192&e))return 63&e;throw Error("Invalid continuation byte")}function d(e){var t,i;if(o>r)throw Error("Invalid byte index");if(o==r)return!1;if(t=255&n[o],o++,0==(128&t))return t;if(192==(224&t)){if((i=(31&t)<<6|l())>=128)return i;throw Error("Invalid continuation byte")}if(224==(240&t)){if((i=(15&t)<<12|l()<<6|l())>=2048)return s(i,e)?i:65533;throw Error("Invalid continuation byte")}if(240==(248&t)&&(i=(7&t)<<18|l()<<12|l()<<6|l())>=65536&&i<=1114111)return i;throw Error("Invalid UTF-8 detected")}e.exports={version:"2.1.2",encode:function(e,t){for(var n=!1!==(t=t||{}).strict,r=a(e),o=r.length,i=-1,s="";++i<o;)s+=u(r[i],n);return s},decode:function(e,t){var s=!1!==(t=t||{}).strict;n=a(e),r=n.length,o=0;for(var c,u=[];!1!==(c=d(s));)u.push(c);return function(e){for(var t,n=e.length,r=-1,o="";++r<n;)(t=e[r])>65535&&(o+=i((t-=65536)>>>10&1023|55296),t=56320|1023&t),o+=i(t);return o}(u)}}},function(e,t){!function(){"use strict";for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=new Uint8Array(256),r=0;r<e.length;r++)n[e.charCodeAt(r)]=r;t.encode=function(t){var n,r=new Uint8Array(t),o=r.length,i="";for(n=0;n<o;n+=3)i+=e[r[n]>>2],i+=e[(3&r[n])<<4|r[n+1]>>4],i+=e[(15&r[n+1])<<2|r[n+2]>>6],i+=e[63&r[n+2]];return o%3==2?i=i.substring(0,i.length-1)+"=":o%3==1&&(i=i.substring(0,i.length-2)+"=="),i},t.decode=function(e){var t,r,o,i,a,s=.75*e.length,c=e.length,u=0;"="===e[e.length-1]&&(s--,"="===e[e.length-2]&&s--);var l=new ArrayBuffer(s),d=new Uint8Array(l);for(t=0;t<c;t+=4)r=n[e.charCodeAt(t)],o=n[e.charCodeAt(t+1)],i=n[e.charCodeAt(t+2)],a=n[e.charCodeAt(t+3)],d[u++]=r<<2|o>>4,d[u++]=(15&o)<<4|i>>2,d[u++]=(3&i)<<6|63&a;return l}}()},function(e,t){var n=void 0!==n?n:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder&&MozBlobBuilder,r=function(){try{return 2===new Blob(["hi"]).size}catch(e){return!1}}(),o=r&&function(){try{return 2===new Blob([new Uint8Array([1,2])]).size}catch(e){return!1}}(),i=n&&n.prototype.append&&n.prototype.getBlob;function a(e){return e.map(function(e){if(e.buffer instanceof ArrayBuffer){var t=e.buffer;if(e.byteLength!==t.byteLength){var n=new Uint8Array(e.byteLength);n.set(new Uint8Array(t,e.byteOffset,e.byteLength)),t=n.buffer}return t}return e})}function s(e,t){t=t||{};var r=new n;return a(e).forEach(function(e){r.append(e)}),t.type?r.getBlob(t.type):r.getBlob()}function c(e,t){return new Blob(a(e),t||{})}"undefined"!=typeof Blob&&(s.prototype=Blob.prototype,c.prototype=Blob.prototype),e.exports=r?o?Blob:c:i?s:void 0},function(e,t,n){(function(t){var r=n(365),o=n(258);e.exports=l;var i,a=/\n/g,s=/\\n/g;function c(){}function u(){return"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{}}function l(e){if(r.call(this,e),this.query=this.query||{},!i){var t=u();i=t.___eio=t.___eio||[]}this.index=i.length;var n=this;i.push(function(e){n.onData(e)}),this.query.j=this.index,"function"==typeof addEventListener&&addEventListener("beforeunload",function(){n.script&&(n.script.onerror=c)},!1)}o(l,r),l.prototype.supportsBinary=!1,l.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),r.prototype.doClose.call(this)},l.prototype.doPoll=function(){var e=this,t=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),t.async=!0,t.src=this.uri(),t.onerror=function(t){e.onError("jsonp poll error",t)};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(t,n):(document.head||document.body).appendChild(t),this.script=t,"undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent)&&setTimeout(function(){var e=document.createElement("iframe");document.body.appendChild(e),document.body.removeChild(e)},100)},l.prototype.doWrite=function(e,t){var n=this;if(!this.form){var r,o=document.createElement("form"),i=document.createElement("textarea"),c=this.iframeId="eio_iframe_"+this.index;o.className="socketio",o.style.position="absolute",o.style.top="-1000px",o.style.left="-1000px",o.target=c,o.method="POST",o.setAttribute("accept-charset","utf-8"),i.name="d",o.appendChild(i),document.body.appendChild(o),this.form=o,this.area=i}function u(){l(),t()}function l(){if(n.iframe)try{n.form.removeChild(n.iframe)}catch(e){n.onError("jsonp polling iframe removal error",e)}try{var e='<iframe src="javascript:0" name="'+n.iframeId+'">';r=document.createElement(e)}catch(e){(r=document.createElement("iframe")).name=n.iframeId,r.src="javascript:0"}r.id=n.iframeId,n.form.appendChild(r),n.iframe=r}this.form.action=this.uri(),l(),e=e.replace(s,"\\\n"),this.area.value=e.replace(a,"\\n");try{this.form.submit()}catch(e){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===n.iframe.readyState&&u()}:this.iframe.onload=u}}).call(this,n(83))},function(e,t,n){var r,o,i=n(330),a=n(145),s=n(257),c=n(258),u=n(367),l=n(107)("engine.io-client:websocket");if("undefined"!=typeof WebSocket)r=WebSocket;else if("undefined"!=typeof self)r=self.WebSocket||self.MozWebSocket;else try{o=n(491)}catch(e){}var d=r||o;function f(e){e&&e.forceBase64&&(this.supportsBinary=!1),this.perMessageDeflate=e.perMessageDeflate,this.usingBrowserWebSocket=r&&!e.forceNode,this.protocols=e.protocols,this.usingBrowserWebSocket||(d=o),i.call(this,e)}e.exports=f,c(f,i),f.prototype.name="websocket",f.prototype.supportsBinary=!0,f.prototype.doOpen=function(){if(this.check()){var e=this.uri(),t=this.protocols,n={agent:this.agent,perMessageDeflate:this.perMessageDeflate};n.pfx=this.pfx,n.key=this.key,n.passphrase=this.passphrase,n.cert=this.cert,n.ca=this.ca,n.ciphers=this.ciphers,n.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(n.headers=this.extraHeaders),this.localAddress&&(n.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket&&!this.isReactNative?t?new d(e,t):new d(e):new d(e,t,n)}catch(e){return this.emit("error",e)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},f.prototype.addEventListeners=function(){var e=this;this.ws.onopen=function(){e.onOpen()},this.ws.onclose=function(){e.onClose()},this.ws.onmessage=function(t){e.onData(t.data)},this.ws.onerror=function(t){e.onError("websocket error",t)}},f.prototype.write=function(e){var t=this;this.writable=!1;for(var n=e.length,r=0,o=n;r<o;r++)!function(e){a.encodePacket(e,t.supportsBinary,function(r){if(!t.usingBrowserWebSocket){var o={};if(e.options&&(o.compress=e.options.compress),t.perMessageDeflate)("string"==typeof r?Buffer.byteLength(r):r.length)<t.perMessageDeflate.threshold&&(o.compress=!1)}try{t.usingBrowserWebSocket?t.ws.send(r):t.ws.send(r,o)}catch(e){l("websocket closed before onclose event")}--n||i()})}(e[r]);function i(){t.emit("flush"),setTimeout(function(){t.writable=!0,t.emit("drain")},0)}},f.prototype.onClose=function(){i.prototype.onClose.call(this)},f.prototype.doClose=function(){void 0!==this.ws&&this.ws.close()},f.prototype.uri=function(){var e=this.query||{},t=this.secure?"wss":"ws",n="";return this.port&&("wss"===t&&443!==Number(this.port)||"ws"===t&&80!==Number(this.port))&&(n=":"+this.port),this.timestampRequests&&(e[this.timestampParam]=u()),this.supportsBinary||(e.b64=1),(e=s.encode(e)).length&&(e="?"+e),t+"://"+(-1!==this.hostname.indexOf(":")?"["+this.hostname+"]":this.hostname)+n+this.path+e},f.prototype.check=function(){return!(!d||"__initialize"in d&&this.name===f.prototype.name)}},function(e,t){},function(e,t){e.exports=function(e,t){for(var n=[],r=(t=t||0)||0;r<e.length;r++)n[r-t]=e[r];return n}},function(e,t){function n(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}e.exports=n,n.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),n=Math.floor(t*this.jitter*e);e=0==(1&Math.floor(10*t))?e-n:e+n}return 0|Math.min(e,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(e){this.ms=e},n.prototype.setMax=function(e){this.max=e},n.prototype.setJitter=function(e){this.jitter=e}},function(e,t,n){(function(t){var r=n(495),o=n(372),i=n(496),a=n(497),s=n(331),c=s.isErrorEvent,u=s.isDOMError,l=s.isDOMException,d=s.isError,f=s.isObject,p=s.isPlainObject,h=s.isUndefined,m=s.isFunction,v=s.isString,y=s.isArray,g=s.isEmptyObject,b=s.each,$=s.objectMerge,_=s.truncate,k=s.objectFrozen,w=s.hasKey,C=s.joinRegExp,x=s.urlencode,O=s.uuid4,S=s.htmlTreeAsString,E=s.isSameException,j=s.isSameStacktrace,T=s.parseUrl,P=s.fill,N=s.supportsFetch,A=s.supportsReferrerPolicy,I=s.serializeKeysForMessage,D=s.serializeException,R=s.sanitize,M=n(498).wrapMethod,F="source protocol user pass host port path".split(" "),L=/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;function U(){return+new Date}var B="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{},W=B.document,H=B.navigator;function q(e,t){return m(t)?function(n){return t(n,e)}:t}function V(){for(var e in this._hasJSON=!("object"!=typeof JSON||!JSON.stringify),this._hasDocument=!h(W),this._hasNavigator=!h(H),this._lastCapturedException=null,this._lastData=null,this._lastEventId=null,this._globalServer=null,this._globalKey=null,this._globalProject=null,this._globalContext={},this._globalOptions={release:B.SENTRY_RELEASE&&B.SENTRY_RELEASE.id,logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],headers:null,collectWindowErrors:!0,captureUnhandledRejections:!0,maxMessageLength:0,maxUrlLength:250,stackTraceLimit:50,autoBreadcrumbs:!0,instrument:!0,sampleRate:1,sanitizeKeys:[]},this._fetchDefaults={method:"POST",referrerPolicy:A()?"origin":""},this._ignoreOnError=0,this._isRavenInstalled=!1,this._originalErrorStackTraceLimit=Error.stackTraceLimit,this._originalConsole=B.console||{},this._originalConsoleMethods={},this._plugins=[],this._startTime=U(),this._wrappedBuiltIns=[],this._breadcrumbs=[],this._lastCapturedEvent=null,this._keypressTimeout,this._location=B.location,this._lastHref=this._location&&this._location.href,this._resetBackoff(),this._originalConsole)this._originalConsoleMethods[e]=this._originalConsole[e]}V.prototype={VERSION:"3.27.2",debug:!1,TraceKit:r,config:function(e,t){var n=this;if(n._globalServer)return this._logDebug("error","Error: Raven has already been configured"),n;if(!e)return n;var o=n._globalOptions;t&&b(t,function(e,t){"tags"===e||"extra"===e||"user"===e?n._globalContext[e]=t:o[e]=t}),n.setDSN(e),o.ignoreErrors.push(/^Script error\.?$/),o.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),o.ignoreErrors=C(o.ignoreErrors),o.ignoreUrls=!!o.ignoreUrls.length&&C(o.ignoreUrls),o.whitelistUrls=!!o.whitelistUrls.length&&C(o.whitelistUrls),o.includePaths=C(o.includePaths),o.maxBreadcrumbs=Math.max(0,Math.min(o.maxBreadcrumbs||100,100));var i={xhr:!0,console:!0,dom:!0,location:!0,sentry:!0},a=o.autoBreadcrumbs;"[object Object]"==={}.toString.call(a)?a=$(i,a):!1!==a&&(a=i),o.autoBreadcrumbs=a;var s={tryCatch:!0},c=o.instrument;return"[object Object]"==={}.toString.call(c)?c=$(s,c):!1!==c&&(c=s),o.instrument=c,r.collectWindowErrors=!!o.collectWindowErrors,n},install:function(){var e=this;return e.isSetup()&&!e._isRavenInstalled&&(r.report.subscribe(function(){e._handleOnErrorStackInfo.apply(e,arguments)}),e._globalOptions.captureUnhandledRejections&&e._attachPromiseRejectionHandler(),e._patchFunctionToString(),e._globalOptions.instrument&&e._globalOptions.instrument.tryCatch&&e._instrumentTryCatch(),e._globalOptions.autoBreadcrumbs&&e._instrumentBreadcrumbs(),e._drainPlugins(),e._isRavenInstalled=!0),Error.stackTraceLimit=e._globalOptions.stackTraceLimit,this},setDSN:function(e){var t=this._parseDSN(e),n=t.path.lastIndexOf("/"),r=t.path.substr(1,n);this._dsn=e,this._globalKey=t.user,this._globalSecret=t.pass&&t.pass.substr(1),this._globalProject=t.path.substr(n+1),this._globalServer=this._getGlobalServer(t),this._globalEndpoint=this._globalServer+"/"+r+"api/"+this._globalProject+"/store/",this._resetBackoff()},context:function(e,t,n){return m(e)&&(n=t||[],t=e,e={}),this.wrap(e,t).apply(this,n)},wrap:function(e,t,n){var r=this;if(h(t)&&!m(e))return e;if(m(e)&&(t=e,e=void 0),!m(t))return t;try{if(t.__raven__)return t;if(t.__raven_wrapper__)return t.__raven_wrapper__}catch(e){return t}function o(){var o=[],i=arguments.length,a=!e||e&&!1!==e.deep;for(n&&m(n)&&n.apply(this,arguments);i--;)o[i]=a?r.wrap(e,arguments[i]):arguments[i];try{return t.apply(this,o)}catch(t){throw r._ignoreNextOnError(),r.captureException(t,e),t}}for(var i in t)w(t,i)&&(o[i]=t[i]);return o.prototype=t.prototype,t.__raven_wrapper__=o,o.__raven__=!0,o.__orig__=t,o},uninstall:function(){return r.report.uninstall(),this._detachPromiseRejectionHandler(),this._unpatchFunctionToString(),this._restoreBuiltIns(),this._restoreConsole(),Error.stackTraceLimit=this._originalErrorStackTraceLimit,this._isRavenInstalled=!1,this},_promiseRejectionHandler:function(e){this._logDebug("debug","Raven caught unhandled promise rejection:",e),this.captureException(e.reason,{mechanism:{type:"onunhandledrejection",handled:!1}})},_attachPromiseRejectionHandler:function(){return this._promiseRejectionHandler=this._promiseRejectionHandler.bind(this),B.addEventListener&&B.addEventListener("unhandledrejection",this._promiseRejectionHandler),this},_detachPromiseRejectionHandler:function(){return B.removeEventListener&&B.removeEventListener("unhandledrejection",this._promiseRejectionHandler),this},captureException:function(e,t){if(t=$({trimHeadFrames:0},t||{}),c(e)&&e.error)e=e.error;else{if(u(e)||l(e)){var n=e.name||(u(e)?"DOMError":"DOMException"),o=e.message?n+": "+e.message:n;return this.captureMessage(o,$(t,{stacktrace:!0,trimHeadFrames:t.trimHeadFrames+1}))}if(d(e))e=e;else{if(!p(e))return this.captureMessage(e,$(t,{stacktrace:!0,trimHeadFrames:t.trimHeadFrames+1}));t=this._getCaptureExceptionOptionsFromPlainObject(t,e),e=new Error(t.message)}}this._lastCapturedException=e;try{var i=r.computeStackTrace(e);this._handleStackInfo(i,t)}catch(t){if(e!==t)throw t}return this},_getCaptureExceptionOptionsFromPlainObject:function(e,t){var n=Object.keys(t).sort(),r=$(e,{message:"Non-Error exception captured with keys: "+I(n),fingerprint:[i(n)],extra:e.extra||{}});return r.extra.__serialized__=D(t),r},captureMessage:function(e,t){if(!this._globalOptions.ignoreErrors.test||!this._globalOptions.ignoreErrors.test(e)){var n,o=$({message:e+=""},t=t||{});try{throw new Error(e)}catch(e){n=e}n.name=null;var i=r.computeStackTrace(n),a=y(i.stack)&&i.stack[1];a&&"Raven.captureException"===a.func&&(a=i.stack[2]);var s=a&&a.url||"";if((!this._globalOptions.ignoreUrls.test||!this._globalOptions.ignoreUrls.test(s))&&(!this._globalOptions.whitelistUrls.test||this._globalOptions.whitelistUrls.test(s))){if(this._globalOptions.stacktrace||t.stacktrace||""===o.message){o.fingerprint=null==o.fingerprint?e:o.fingerprint,(t=$({trimHeadFrames:0},t)).trimHeadFrames+=1;var c=this._prepareFrames(i,t);o.stacktrace={frames:c.reverse()}}return o.fingerprint&&(o.fingerprint=y(o.fingerprint)?o.fingerprint:[o.fingerprint]),this._send(o),this}}},captureBreadcrumb:function(e){var t=$({timestamp:U()/1e3},e);if(m(this._globalOptions.breadcrumbCallback)){var n=this._globalOptions.breadcrumbCallback(t);if(f(n)&&!g(n))t=n;else if(!1===n)return this}return this._breadcrumbs.push(t),this._breadcrumbs.length>this._globalOptions.maxBreadcrumbs&&this._breadcrumbs.shift(),this},addPlugin:function(e){var t=[].slice.call(arguments,1);return this._plugins.push([e,t]),this._isRavenInstalled&&this._drainPlugins(),this},setUserContext:function(e){return this._globalContext.user=e,this},setExtraContext:function(e){return this._mergeContext("extra",e),this},setTagsContext:function(e){return this._mergeContext("tags",e),this},clearContext:function(){return this._globalContext={},this},getContext:function(){return JSON.parse(o(this._globalContext))},setEnvironment:function(e){return this._globalOptions.environment=e,this},setRelease:function(e){return this._globalOptions.release=e,this},setDataCallback:function(e){var t=this._globalOptions.dataCallback;return this._globalOptions.dataCallback=q(t,e),this},setBreadcrumbCallback:function(e){var t=this._globalOptions.breadcrumbCallback;return this._globalOptions.breadcrumbCallback=q(t,e),this},setShouldSendCallback:function(e){var t=this._globalOptions.shouldSendCallback;return this._globalOptions.shouldSendCallback=q(t,e),this},setTransport:function(e){return this._globalOptions.transport=e,this},lastException:function(){return this._lastCapturedException},lastEventId:function(){return this._lastEventId},isSetup:function(){return!!this._hasJSON&&(!!this._globalServer||(this.ravenNotConfiguredError||(this.ravenNotConfiguredError=!0,this._logDebug("error","Error: Raven has not been configured.")),!1))},afterLoad:function(){var e=B.RavenConfig;e&&this.config(e.dsn,e.config).install()},showReportDialog:function(e){if(W){if(!(e=$({eventId:this.lastEventId(),dsn:this._dsn,user:this._globalContext.user||{}},e)).eventId)throw new a("Missing eventId");if(!e.dsn)throw new a("Missing DSN");var t=encodeURIComponent,n=[];for(var r in e)if("user"===r){var o=e.user;o.name&&n.push("name="+t(o.name)),o.email&&n.push("email="+t(o.email))}else n.push(t(r)+"="+t(e[r]));var i=this._getGlobalServer(this._parseDSN(e.dsn)),s=W.createElement("script");s.async=!0,s.src=i+"/api/embed/error-page/?"+n.join("&"),(W.head||W.body).appendChild(s)}},_ignoreNextOnError:function(){var e=this;this._ignoreOnError+=1,setTimeout(function(){e._ignoreOnError-=1})},_triggerEvent:function(e,t){var n,r;if(this._hasDocument){for(r in t=t||{},e="raven"+e.substr(0,1).toUpperCase()+e.substr(1),W.createEvent?(n=W.createEvent("HTMLEvents")).initEvent(e,!0,!0):(n=W.createEventObject()).eventType=e,t)w(t,r)&&(n[r]=t[r]);if(W.createEvent)W.dispatchEvent(n);else try{W.fireEvent("on"+n.eventType.toLowerCase(),n)}catch(e){}}},_breadcrumbEventHandler:function(e){var t=this;return function(n){if(t._keypressTimeout=null,t._lastCapturedEvent!==n){var r;t._lastCapturedEvent=n;try{r=S(n.target)}catch(e){r="<unknown>"}t.captureBreadcrumb({category:"ui."+e,message:r})}}},_keypressEventHandler:function(){var e=this;return function(t){var n;try{n=t.target}catch(e){return}var r=n&&n.tagName;if(r&&("INPUT"===r||"TEXTAREA"===r||n.isContentEditable)){var o=e._keypressTimeout;o||e._breadcrumbEventHandler("input")(t),clearTimeout(o),e._keypressTimeout=setTimeout(function(){e._keypressTimeout=null},1e3)}}},_captureUrlChange:function(e,t){var n=T(this._location.href),r=T(t),o=T(e);this._lastHref=t,n.protocol===r.protocol&&n.host===r.host&&(t=r.relative),n.protocol===o.protocol&&n.host===o.host&&(e=o.relative),this.captureBreadcrumb({category:"navigation",data:{to:t,from:e}})},_patchFunctionToString:function(){var e=this;e._originalFunctionToString=Function.prototype.toString,Function.prototype.toString=function(){return"function"==typeof this&&this.__raven__?e._originalFunctionToString.apply(this.__orig__,arguments):e._originalFunctionToString.apply(this,arguments)}},_unpatchFunctionToString:function(){this._originalFunctionToString&&(Function.prototype.toString=this._originalFunctionToString)},_instrumentTryCatch:function(){var e=this,t=e._wrappedBuiltIns;function n(t){return function(n,r){for(var o=new Array(arguments.length),i=0;i<o.length;++i)o[i]=arguments[i];var a=o[0];return m(a)&&(o[0]=e.wrap({mechanism:{type:"instrument",data:{function:t.name||"<anonymous>"}}},a)),t.apply?t.apply(this,o):t(o[0],o[1])}}var r=this._globalOptions.autoBreadcrumbs;function o(n){var o=B[n]&&B[n].prototype;o&&o.hasOwnProperty&&o.hasOwnProperty("addEventListener")&&(P(o,"addEventListener",function(t){return function(o,i,a,s){try{i&&i.handleEvent&&(i.handleEvent=e.wrap({mechanism:{type:"instrument",data:{target:n,function:"handleEvent",handler:i&&i.name||"<anonymous>"}}},i.handleEvent))}catch(e){}var c,u,l;return r&&r.dom&&("EventTarget"===n||"Node"===n)&&(u=e._breadcrumbEventHandler("click"),l=e._keypressEventHandler(),c=function(e){if(e){var t;try{t=e.type}catch(e){return}return"click"===t?u(e):"keypress"===t?l(e):void 0}}),t.call(this,o,e.wrap({mechanism:{type:"instrument",data:{target:n,function:"addEventListener",handler:i&&i.name||"<anonymous>"}}},i,c),a,s)}},t),P(o,"removeEventListener",function(e){return function(t,n,r,o){try{n=n&&(n.__raven_wrapper__?n.__raven_wrapper__:n)}catch(e){}return e.call(this,t,n,r,o)}},t))}P(B,"setTimeout",n,t),P(B,"setInterval",n,t),B.requestAnimationFrame&&P(B,"requestAnimationFrame",function(t){return function(n){return t(e.wrap({mechanism:{type:"instrument",data:{function:"requestAnimationFrame",handler:t&&t.name||"<anonymous>"}}},n))}},t);for(var i=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],a=0;a<i.length;a++)o(i[a])},_instrumentBreadcrumbs:function(){var e=this,t=this._globalOptions.autoBreadcrumbs,n=e._wrappedBuiltIns;function r(t,n){t in n&&m(n[t])&&P(n,t,function(n){return e.wrap({mechanism:{type:"instrument",data:{function:t,handler:n&&n.name||"<anonymous>"}}},n)})}if(t.xhr&&"XMLHttpRequest"in B){var o=B.XMLHttpRequest&&B.XMLHttpRequest.prototype;P(o,"open",function(t){return function(n,r){return v(r)&&-1===r.indexOf(e._globalKey)&&(this.__raven_xhr={method:n,url:r,status_code:null}),t.apply(this,arguments)}},n),P(o,"send",function(t){return function(){var n=this;function o(){if(n.__raven_xhr&&4===n.readyState){try{n.__raven_xhr.status_code=n.status}catch(e){}e.captureBreadcrumb({type:"http",category:"xhr",data:n.__raven_xhr})}}for(var i=["onload","onerror","onprogress"],a=0;a<i.length;a++)r(i[a],n);return"onreadystatechange"in n&&m(n.onreadystatechange)?P(n,"onreadystatechange",function(t){return e.wrap({mechanism:{type:"instrument",data:{function:"onreadystatechange",handler:t&&t.name||"<anonymous>"}}},t,o)}):n.onreadystatechange=o,t.apply(this,arguments)}},n)}t.xhr&&N()&&P(B,"fetch",function(t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;++r)n[r]=arguments[r];var o,i=n[0],a="GET";if("string"==typeof i?o=i:"Request"in B&&i instanceof B.Request?(o=i.url,i.method&&(a=i.method)):o=""+i,-1!==o.indexOf(e._globalKey))return t.apply(this,n);n[1]&&n[1].method&&(a=n[1].method);var s={method:a,url:o,status_code:null};return t.apply(this,n).then(function(t){return s.status_code=t.status,e.captureBreadcrumb({type:"http",category:"fetch",data:s}),t}).catch(function(t){throw e.captureBreadcrumb({type:"http",category:"fetch",data:s,level:"error"}),t})}},n),t.dom&&this._hasDocument&&(W.addEventListener?(W.addEventListener("click",e._breadcrumbEventHandler("click"),!1),W.addEventListener("keypress",e._keypressEventHandler(),!1)):W.attachEvent&&(W.attachEvent("onclick",e._breadcrumbEventHandler("click")),W.attachEvent("onkeypress",e._keypressEventHandler())));var i=B.chrome,a=!(i&&i.app&&i.app.runtime)&&B.history&&B.history.pushState&&B.history.replaceState;if(t.location&&a){var s=B.onpopstate;B.onpopstate=function(){var t=e._location.href;if(e._captureUrlChange(e._lastHref,t),s)return s.apply(this,arguments)};var c=function(t){return function(){var n=arguments.length>2?arguments[2]:void 0;return n&&e._captureUrlChange(e._lastHref,n+""),t.apply(this,arguments)}};P(B.history,"pushState",c,n),P(B.history,"replaceState",c,n)}if(t.console&&"console"in B&&console.log){var u=function(t,n){e.captureBreadcrumb({message:t,level:n.level,category:"console"})};b(["debug","info","warn","error","log"],function(e,t){M(console,t,u)})}},_restoreBuiltIns:function(){for(var e;this._wrappedBuiltIns.length;){var t=(e=this._wrappedBuiltIns.shift())[0],n=e[1],r=e[2];t[n]=r}},_restoreConsole:function(){for(var e in this._originalConsoleMethods)this._originalConsole[e]=this._originalConsoleMethods[e]},_drainPlugins:function(){var e=this;b(this._plugins,function(t,n){var r=n[0],o=n[1];r.apply(e,[e].concat(o))})},_parseDSN:function(e){var t=L.exec(e),n={},r=7;try{for(;r--;)n[F[r]]=t[r]||""}catch(t){throw new a("Invalid DSN: "+e)}if(n.pass&&!this._globalOptions.allowSecretKey)throw new a("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");return n},_getGlobalServer:function(e){var t="//"+e.host+(e.port?":"+e.port:"");return e.protocol&&(t=e.protocol+":"+t),t},_handleOnErrorStackInfo:function(e,t){(t=t||{}).mechanism=t.mechanism||{type:"onerror",handled:!1},this._ignoreOnError||this._handleStackInfo(e,t)},_handleStackInfo:function(e,t){var n=this._prepareFrames(e,t);this._triggerEvent("handle",{stackInfo:e,options:t}),this._processException(e.name,e.message,e.url,e.lineno,n,t)},_prepareFrames:function(e,t){var n=this,r=[];if(e.stack&&e.stack.length&&(b(e.stack,function(t,o){var i=n._normalizeFrame(o,e.url);i&&r.push(i)}),t&&t.trimHeadFrames))for(var o=0;o<t.trimHeadFrames&&o<r.length;o++)r[o].in_app=!1;return r=r.slice(0,this._globalOptions.stackTraceLimit)},_normalizeFrame:function(e,t){var n={filename:e.url,lineno:e.line,colno:e.column,function:e.func||"?"};return e.url||(n.filename=t),n.in_app=!(this._globalOptions.includePaths.test&&!this._globalOptions.includePaths.test(n.filename)||/(Raven|TraceKit)\./.test(n.function)||/raven\.(min\.)?js$/.test(n.filename)),n},_processException:function(e,t,n,r,o,i){var a,s=(e?e+": ":"")+(t||"");if((!this._globalOptions.ignoreErrors.test||!this._globalOptions.ignoreErrors.test(t)&&!this._globalOptions.ignoreErrors.test(s))&&(o&&o.length?(n=o[0].filename||n,o.reverse(),a={frames:o}):n&&(a={frames:[{filename:n,lineno:r,in_app:!0}]}),(!this._globalOptions.ignoreUrls.test||!this._globalOptions.ignoreUrls.test(n))&&(!this._globalOptions.whitelistUrls.test||this._globalOptions.whitelistUrls.test(n)))){var c=$({exception:{values:[{type:e,value:t,stacktrace:a}]},transaction:n},i),u=c.exception.values[0];null==u.type&&""===u.value&&(u.value="Unrecoverable error caught"),!c.exception.mechanism&&c.mechanism&&(c.exception.mechanism=c.mechanism,delete c.mechanism),c.exception.mechanism=$({type:"generic",handled:!0},c.exception.mechanism||{}),this._send(c)}},_trimPacket:function(e){var t=this._globalOptions.maxMessageLength;if(e.message&&(e.message=_(e.message,t)),e.exception){var n=e.exception.values[0];n.value=_(n.value,t)}var r=e.request;return r&&(r.url&&(r.url=_(r.url,this._globalOptions.maxUrlLength)),r.Referer&&(r.Referer=_(r.Referer,this._globalOptions.maxUrlLength))),e.breadcrumbs&&e.breadcrumbs.values&&this._trimBreadcrumbs(e.breadcrumbs),e},_trimBreadcrumbs:function(e){for(var t,n,r,o=["to","from","url"],i=0;i<e.values.length;++i)if((n=e.values[i]).hasOwnProperty("data")&&f(n.data)&&!k(n.data)){r=$({},n.data);for(var a=0;a<o.length;++a)t=o[a],r.hasOwnProperty(t)&&r[t]&&(r[t]=_(r[t],this._globalOptions.maxUrlLength));e.values[i].data=r}},_getHttpData:function(){if(this._hasNavigator||this._hasDocument){var e={};return this._hasNavigator&&H.userAgent&&(e.headers={"User-Agent":H.userAgent}),B.location&&B.location.href&&(e.url=B.location.href),this._hasDocument&&W.referrer&&(e.headers||(e.headers={}),e.headers.Referer=W.referrer),e}},_resetBackoff:function(){this._backoffDuration=0,this._backoffStart=null},_shouldBackoff:function(){return this._backoffDuration&&U()-this._backoffStart<this._backoffDuration},_isRepeatData:function(e){var t=this._lastData;return!(!t||e.message!==t.message||e.transaction!==t.transaction)&&(e.stacktrace||t.stacktrace?j(e.stacktrace,t.stacktrace):e.exception||t.exception?E(e.exception,t.exception):!e.fingerprint&&!t.fingerprint||Boolean(e.fingerprint&&t.fingerprint)&&JSON.stringify(e.fingerprint)===JSON.stringify(t.fingerprint))},_setBackoffState:function(e){if(!this._shouldBackoff()){var t=e.status;if(400===t||401===t||429===t){var n;try{n=N()?e.headers.get("Retry-After"):e.getResponseHeader("Retry-After"),n=1e3*parseInt(n,10)}catch(e){}this._backoffDuration=n||(2*this._backoffDuration||1e3),this._backoffStart=U()}}},_send:function(e){var t=this._globalOptions,n={project:this._globalProject,logger:t.logger,platform:"javascript"},r=this._getHttpData();r&&(n.request=r),e.trimHeadFrames&&delete e.trimHeadFrames,(e=$(n,e)).tags=$($({},this._globalContext.tags),e.tags),e.extra=$($({},this._globalContext.extra),e.extra),e.extra["session:duration"]=U()-this._startTime,this._breadcrumbs&&this._breadcrumbs.length>0&&(e.breadcrumbs={values:[].slice.call(this._breadcrumbs,0)}),this._globalContext.user&&(e.user=this._globalContext.user),t.environment&&(e.environment=t.environment),t.release&&(e.release=t.release),t.serverName&&(e.server_name=t.serverName),e=this._sanitizeData(e),Object.keys(e).forEach(function(t){(null==e[t]||""===e[t]||g(e[t]))&&delete e[t]}),m(t.dataCallback)&&(e=t.dataCallback(e)||e),e&&!g(e)&&(m(t.shouldSendCallback)&&!t.shouldSendCallback(e)||(this._shouldBackoff()?this._logDebug("warn","Raven dropped error due to backoff: ",e):"number"==typeof t.sampleRate?Math.random()<t.sampleRate&&this._sendProcessedPayload(e):this._sendProcessedPayload(e)))},_sanitizeData:function(e){return R(e,this._globalOptions.sanitizeKeys)},_getUuid:function(){return O()},_sendProcessedPayload:function(e,t){var n=this,r=this._globalOptions;if(this.isSetup())if(e=this._trimPacket(e),this._globalOptions.allowDuplicates||!this._isRepeatData(e)){this._lastEventId=e.event_id||(e.event_id=this._getUuid()),this._lastData=e,this._logDebug("debug","Raven about to send:",e);var o={sentry_version:"7",sentry_client:"raven-js/"+this.VERSION,sentry_key:this._globalKey};this._globalSecret&&(o.sentry_secret=this._globalSecret);var i=e.exception&&e.exception.values[0];this._globalOptions.autoBreadcrumbs&&this._globalOptions.autoBreadcrumbs.sentry&&this.captureBreadcrumb({category:"sentry",message:i?(i.type?i.type+": ":"")+i.value:e.message,event_id:e.event_id,level:e.level||"error"});var a=this._globalEndpoint;(r.transport||this._makeRequest).call(this,{url:a,auth:o,data:e,options:r,onSuccess:function(){n._resetBackoff(),n._triggerEvent("success",{data:e,src:a}),t&&t()},onError:function(r){n._logDebug("error","Raven transport failed to send: ",r),r.request&&n._setBackoffState(r.request),n._triggerEvent("failure",{data:e,src:a}),r=r||new Error("Raven send failed (no additional details provided)"),t&&t(r)}})}else this._logDebug("warn","Raven dropped repeat event: ",e)},_makeRequest:function(e){var t=e.url+"?"+x(e.auth),n=null,r={};if(e.options.headers&&(n=this._evaluateHash(e.options.headers)),e.options.fetchParameters&&(r=this._evaluateHash(e.options.fetchParameters)),N()){r.body=o(e.data);var i=$({},this._fetchDefaults),a=$(i,r);return n&&(a.headers=n),B.fetch(t,a).then(function(t){if(t.ok)e.onSuccess&&e.onSuccess();else{var n=new Error("Sentry error code: "+t.status);n.request=t,e.onError&&e.onError(n)}}).catch(function(){e.onError&&e.onError(new Error("Sentry error code: network unavailable"))})}var s=B.XMLHttpRequest&&new B.XMLHttpRequest;s&&(("withCredentials"in s||"undefined"!=typeof XDomainRequest)&&("withCredentials"in s?s.onreadystatechange=function(){if(4===s.readyState)if(200===s.status)e.onSuccess&&e.onSuccess();else if(e.onError){var t=new Error("Sentry error code: "+s.status);t.request=s,e.onError(t)}}:(s=new XDomainRequest,t=t.replace(/^https?:/,""),e.onSuccess&&(s.onload=e.onSuccess),e.onError&&(s.onerror=function(){var t=new Error("Sentry error code: XDomainRequest");t.request=s,e.onError(t)})),s.open("POST",t),n&&b(n,function(e,t){s.setRequestHeader(e,t)}),s.send(o(e.data))))},_evaluateHash:function(e){var t={};for(var n in e)if(e.hasOwnProperty(n)){var r=e[n];t[n]="function"==typeof r?r():r}return t},_logDebug:function(e){this._originalConsoleMethods[e]&&(this.debug||this._globalOptions.debug)&&Function.prototype.apply.call(this._originalConsoleMethods[e],this._originalConsole,[].slice.call(arguments,1))},_mergeContext:function(e,t){h(t)?delete this._globalContext[e]:this._globalContext[e]=$(this._globalContext[e]||{},t)}},V.prototype.setUser=V.prototype.setUserContext,V.prototype.setReleaseContext=V.prototype.setRelease,e.exports=V}).call(this,n(83))},function(e,t,n){(function(t){var r=n(331),o={collectWindowErrors:!0,debug:!1},i="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{},a=[].slice,s="?",c=/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;function u(){return"undefined"==typeof document||null==document.location?"":document.location.href}o.report=function(){var e,t,n=[],l=null,d=null,f=null;function p(e,t){var r=null;if(!t||o.collectWindowErrors){for(var i in n)if(n.hasOwnProperty(i))try{n[i].apply(null,[e].concat(a.call(arguments,2)))}catch(e){r=e}if(r)throw r}}function h(t,n,i,a,l){var d=r.isErrorEvent(l)?l.error:l,h=r.isErrorEvent(t)?t.message:t;if(f)o.computeStackTrace.augmentStackTraceWithInitialElement(f,n,i,h),m();else if(d&&r.isError(d))p(o.computeStackTrace(d),!0);else{var v,y={url:n,line:i,column:a},g=void 0;if("[object String]"==={}.toString.call(h))(v=h.match(c))&&(g=v[1],h=v[2]);y.func=s,p({name:g,message:h,url:u(),stack:[y]},!0)}return!!e&&e.apply(this,arguments)}function m(){var e=f,t=l;l=null,f=null,d=null,p.apply(null,[e,!1].concat(t))}function v(e,t){var n=a.call(arguments,1);if(f){if(d===e)return;m()}var r=o.computeStackTrace(e);if(f=r,d=e,l=n,setTimeout(function(){d===e&&m()},r.incomplete?2e3:0),!1!==t)throw e}return v.subscribe=function(r){!function(){if(t)return;e=i.onerror,i.onerror=h,t=!0}(),n.push(r)},v.unsubscribe=function(e){for(var t=n.length-1;t>=0;--t)n[t]===e&&n.splice(t,1)},v.uninstall=function(){!function(){if(!t)return;i.onerror=e,t=!1,e=void 0}(),n=[]},v}(),o.computeStackTrace=function(){function e(e){if(void 0!==e.stack&&e.stack){for(var t,n,r,o=/^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,i=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,a=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,c=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,l=/\((\S*)(?::(\d+))(?::(\d+))\)/,d=e.stack.split("\n"),f=[],p=(/^(.*) is undefined$/.exec(e.message),0),h=d.length;p<h;++p){if(n=o.exec(d[p])){var m=n[2]&&0===n[2].indexOf("native");n[2]&&0===n[2].indexOf("eval")&&(t=l.exec(n[2]))&&(n[2]=t[1],n[3]=t[2],n[4]=t[3]),r={url:m?null:n[2],func:n[1]||s,args:m?[n[2]]:[],line:n[3]?+n[3]:null,column:n[4]?+n[4]:null}}else if(n=i.exec(d[p]))r={url:n[2],func:n[1]||s,args:[],line:+n[3],column:n[4]?+n[4]:null};else{if(!(n=a.exec(d[p])))continue;n[3]&&n[3].indexOf(" > eval")>-1&&(t=c.exec(n[3]))?(n[3]=t[1],n[4]=t[2],n[5]=null):0!==p||n[5]||void 0===e.columnNumber||(f[0].column=e.columnNumber+1),r={url:n[3],func:n[1]||s,args:n[2]?n[2].split(","):[],line:n[4]?+n[4]:null,column:n[5]?+n[5]:null}}if(!r.func&&r.line&&(r.func=s),r.url&&"blob:"===r.url.substr(0,5)){var v=new XMLHttpRequest;if(v.open("GET",r.url,!1),v.send(null),200===v.status){var y=v.responseText||"",g=(y=y.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);if(g){var b=g[1];"~"===b.charAt(0)&&(b=("undefined"==typeof document||null==document.location?"":document.location.origin?document.location.origin:document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:""))+b.slice(1)),r.url=b.slice(0,-4)}}}f.push(r)}return f.length?{name:e.name,message:e.message,url:u(),stack:f}:null}}function t(e,t,n,r){var o={url:t,line:n};if(o.url&&o.line){if(e.incomplete=!1,o.func||(o.func=s),e.stack.length>0&&e.stack[0].url===o.url){if(e.stack[0].line===o.line)return!1;if(!e.stack[0].line&&e.stack[0].func===o.func)return e.stack[0].line=o.line,!1}return e.stack.unshift(o),e.partial=!0,!0}return e.incomplete=!0,!1}function n(e,i){for(var a,c,l=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,d=[],f={},p=!1,h=n.caller;h&&!p;h=h.caller)if(h!==r&&h!==o.report){if(c={url:null,func:s,line:null,column:null},h.name?c.func=h.name:(a=l.exec(h.toString()))&&(c.func=a[1]),void 0===c.func)try{c.func=a.input.substring(0,a.input.indexOf("{"))}catch(e){}f[""+h]?p=!0:f[""+h]=!0,d.push(c)}i&&d.splice(0,i);var m={name:e.name,message:e.message,url:u(),stack:d};return t(m,e.sourceURL||e.fileName,e.line||e.lineNumber,e.message||e.description),m}function r(t,r){var i=null;r=null==r?0:+r;try{if(i=e(t))return i}catch(e){if(o.debug)throw e}try{if(i=n(t,r+1))return i}catch(e){if(o.debug)throw e}return{name:t.name,message:t.message,url:u()}}return r.augmentStackTraceWithInitialElement=t,r.computeStackTraceFromStackProp=e,r}(),e.exports=o}).call(this,n(83))},function(e,t){function n(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function r(e,t,r,o,i,a){return n((s=n(n(t,e),n(o,a)))<<(c=i)|s>>>32-c,r);var s,c}function o(e,t,n,o,i,a,s){return r(t&n|~t&o,e,t,i,a,s)}function i(e,t,n,o,i,a,s){return r(t&o|n&~o,e,t,i,a,s)}function a(e,t,n,o,i,a,s){return r(t^n^o,e,t,i,a,s)}function s(e,t,n,o,i,a,s){return r(n^(t|~o),e,t,i,a,s)}function c(e,t){var r,c,u,l,d;e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;var f=1732584193,p=-271733879,h=-1732584194,m=271733878;for(r=0;r<e.length;r+=16)c=f,u=p,l=h,d=m,f=o(f,p,h,m,e[r],7,-680876936),m=o(m,f,p,h,e[r+1],12,-389564586),h=o(h,m,f,p,e[r+2],17,606105819),p=o(p,h,m,f,e[r+3],22,-1044525330),f=o(f,p,h,m,e[r+4],7,-176418897),m=o(m,f,p,h,e[r+5],12,1200080426),h=o(h,m,f,p,e[r+6],17,-1473231341),p=o(p,h,m,f,e[r+7],22,-45705983),f=o(f,p,h,m,e[r+8],7,1770035416),m=o(m,f,p,h,e[r+9],12,-1958414417),h=o(h,m,f,p,e[r+10],17,-42063),p=o(p,h,m,f,e[r+11],22,-1990404162),f=o(f,p,h,m,e[r+12],7,1804603682),m=o(m,f,p,h,e[r+13],12,-40341101),h=o(h,m,f,p,e[r+14],17,-1502002290),f=i(f,p=o(p,h,m,f,e[r+15],22,1236535329),h,m,e[r+1],5,-165796510),m=i(m,f,p,h,e[r+6],9,-1069501632),h=i(h,m,f,p,e[r+11],14,643717713),p=i(p,h,m,f,e[r],20,-373897302),f=i(f,p,h,m,e[r+5],5,-701558691),m=i(m,f,p,h,e[r+10],9,38016083),h=i(h,m,f,p,e[r+15],14,-660478335),p=i(p,h,m,f,e[r+4],20,-405537848),f=i(f,p,h,m,e[r+9],5,568446438),m=i(m,f,p,h,e[r+14],9,-1019803690),h=i(h,m,f,p,e[r+3],14,-187363961),p=i(p,h,m,f,e[r+8],20,1163531501),f=i(f,p,h,m,e[r+13],5,-1444681467),m=i(m,f,p,h,e[r+2],9,-51403784),h=i(h,m,f,p,e[r+7],14,1735328473),f=a(f,p=i(p,h,m,f,e[r+12],20,-1926607734),h,m,e[r+5],4,-378558),m=a(m,f,p,h,e[r+8],11,-2022574463),h=a(h,m,f,p,e[r+11],16,1839030562),p=a(p,h,m,f,e[r+14],23,-35309556),f=a(f,p,h,m,e[r+1],4,-1530992060),m=a(m,f,p,h,e[r+4],11,1272893353),h=a(h,m,f,p,e[r+7],16,-155497632),p=a(p,h,m,f,e[r+10],23,-1094730640),f=a(f,p,h,m,e[r+13],4,681279174),m=a(m,f,p,h,e[r],11,-358537222),h=a(h,m,f,p,e[r+3],16,-722521979),p=a(p,h,m,f,e[r+6],23,76029189),f=a(f,p,h,m,e[r+9],4,-640364487),m=a(m,f,p,h,e[r+12],11,-421815835),h=a(h,m,f,p,e[r+15],16,530742520),f=s(f,p=a(p,h,m,f,e[r+2],23,-995338651),h,m,e[r],6,-198630844),m=s(m,f,p,h,e[r+7],10,1126891415),h=s(h,m,f,p,e[r+14],15,-1416354905),p=s(p,h,m,f,e[r+5],21,-57434055),f=s(f,p,h,m,e[r+12],6,1700485571),m=s(m,f,p,h,e[r+3],10,-1894986606),h=s(h,m,f,p,e[r+10],15,-1051523),p=s(p,h,m,f,e[r+1],21,-2054922799),f=s(f,p,h,m,e[r+8],6,1873313359),m=s(m,f,p,h,e[r+15],10,-30611744),h=s(h,m,f,p,e[r+6],15,-1560198380),p=s(p,h,m,f,e[r+13],21,1309151649),f=s(f,p,h,m,e[r+4],6,-145523070),m=s(m,f,p,h,e[r+11],10,-1120210379),h=s(h,m,f,p,e[r+2],15,718787259),p=s(p,h,m,f,e[r+9],21,-343485551),f=n(f,c),p=n(p,u),h=n(h,l),m=n(m,d);return[f,p,h,m]}function u(e){var t,n="",r=32*e.length;for(t=0;t<r;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}function l(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;var r=8*e.length;for(t=0;t<r;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}function d(e){var t,n,r="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),r+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return r}function f(e){return unescape(encodeURIComponent(e))}function p(e){return function(e){return u(c(l(e),8*e.length))}(f(e))}function h(e,t){return function(e,t){var n,r,o=l(e),i=[],a=[];for(i[15]=a[15]=void 0,o.length>16&&(o=c(o,8*e.length)),n=0;n<16;n+=1)i[n]=909522486^o[n],a[n]=1549556828^o[n];return r=c(i.concat(l(t)),512+8*t.length),u(c(a.concat(r),640))}(f(e),f(t))}e.exports=function(e,t,n){return t?n?h(t,e):d(h(t,e)):n?p(e):d(p(e))}},function(e,t){function n(e){this.name="RavenConfigError",this.message=e}n.prototype=new Error,n.prototype.constructor=n,e.exports=n},function(e,t,n){var r=n(331);e.exports={wrapMethod:function(e,t,n){var o=e[t],i=e;if(t in e){var a="warn"===t?"warning":t;e[t]=function(){var e=[].slice.call(arguments),s=r.safeJoin(e," "),c={level:a,logger:"console",extra:{arguments:e}};"assert"===t?!1===e[0]&&(s="Assertion failed: "+(r.safeJoin(e.slice(1)," ")||"console.assert"),c.extra.arguments=e.slice(1),n&&n(s,c)):n&&n(s,c),o&&Function.prototype.apply.call(o,i,e)}}}}},function(e,t){(function(){!function(e,t){"use strict";var n,r,o,i,a={},s=[],c=!1,u=!1,l=!0,d="__woopraid";!function(e,t){function n(e){var n=t[e];t[e]=function(e){return i(n(e))}}function r(t,n,r){return r=this,a.unshift([r,t,n,function(t){(t=t||e.event).preventDefault=t.preventDefault||function(){t.returnValue=!1},t.stopPropagation=t.stopPropagation||function(){t.cancelBubble=!0},t.currentTarget=r,t.target=t.srcElement||r,n.call(r,t)}]),this.attachEvent("on"+t,a[0][3])}function o(e,t){for(var n,r=0;n=a[r];++r)if(n[0]==this&&n[1]==e&&n[2]==t)return this.detachEvent("on"+e,a.splice(r,1)[0][3])}function i(e,t){if(e&&(t=e.length))for(;t--;)e[t].addEventListener=r,e[t].removeEventListener=o;else e&&(e.addEventListener=r,e.removeEventListener=o);return e}if(!e.addEventListener){var a=[];i([t,e]),"Element"in e?(e.Element.prototype.addEventListener=r,e.Element.prototype.removeEventListener=o):(t.attachEvent("onreadystatechange",function(){i(t.all)}),n("getElementsByTagName"),n("getElementById"),n("createElement"),i(t.all))}}(e,t),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var n=this.length>>>0;for(t=+t||0,Math.abs(t)===1/0&&(t=0),t<0&&((t+=n)<0&&(t=0));t<n;t++)if(this[t]===e)return t;return-1}),a.extend=function(e,t){for(var n in t)e[n]=t[n]},a.serializeForm=function(e,t){if(e&&"FORM"===e.nodeName){var n,r,o=(t||{}).exclude||[],i={};for(n=e.elements.length-1;n>=0;n-=1)if(!(""===e.elements[n].name||o.indexOf(e.elements[n].name)>-1))switch(e.elements[n].nodeName){case"INPUT":switch(e.elements[n].type){case"text":case"hidden":case"button":case"reset":case"submit":i[e.elements[n].name]=e.elements[n].value;break;case"checkbox":case"radio":e.elements[n].checked&&(i[e.elements[n].name]=e.elements[n].value)}break;case"TEXTAREA":i[e.elements[n].name]=e.elements[n].value;break;case"SELECT":switch(e.elements[n].type){case"select-one":i[e.elements[n].name]=e.elements[n].value;break;case"select-multiple":for(r=e.elements[n].options.length-1;r>=0;r-=1)e.elements[n].options[r].selected&&(i[e.elements[n].name]=e.elements[n].options[r].value)}break;case"BUTTON":switch(e.elements[n].type){case"reset":case"submit":case"button":i[e.elements[n].name]=e.elements[n].value}}return i}};var f={getItem:function(e){return e&&decodeURIComponent(t.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},setItem:function(e,n,r,o,i,a){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(r)switch(r.constructor){case Number:s=r===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+r;break;case String:s="; expires="+r;break;case Date:s="; expires="+r.toUTCString()}return t.cookie=encodeURIComponent(e)+"="+encodeURIComponent(n)+s+(i?"; domain="+i:"")+(o?"; path="+o:"")+(a?"; secure":""),!0},removeItem:function(e,n,r){return!!this.hasItem(e)&&(t.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(r?"; domain="+r:"")+(n?"; path="+n:""),!0)},hasItem:function(e){return!!e&&new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(t.cookie)},keys:function(){for(var e=t.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),n=e.length,r=0;r<n;r++)e[r]=decodeURIComponent(e[r]);return e}};a.docCookies=f,a.location=function(t,n){if(void 0!==e.location[t]){if(void 0===n)return e.location[t];e.location[t]=n}},a.getCampaignData=function(){for(var e,t,n=a.getUrlParams(),r={},o=["source","medium","content","campaign","term"],i=0;i<o.length;i++)void 0!==(t=n["utm_"+(e=o[i])]||n["woo_"+e])&&(r["campaign_"+("campaign"===e?"name":e)]=t);return r},a.mapQueryParams=function(e){var t=a.getUrlParams(),n={};for(var r in e){var o=t[r];void 0!==o&&(n[e[r]]=o)}return n},a.getCustomData=function(e,t){var n,r,o,i=a.getUrlParams(),s=t||"wv_";for(n in i)i.hasOwnProperty(n)&&(o=i[n],n.substring(0,s.length)===s&&(r=n.substring(s.length),e.call(this,r,o)))},a.getVisitorUrlData=function(e){a.getCustomData.call(e,e.identify,"wv_")},a.hideCampaignData=function(){return a.hideUrlParams(["wv_","woo_","utm_"])},a.hideCrossDomainId=function(){return a.hideUrlParams([d])},a.hideUrlParams=function(t){var n=new RegExp("[?&]+((?:"+t.join("|")+")[^=&]*)=([^&#]*)","gi"),r=a.location("href").replace(n,"");return e.history&&e.history.replaceState&&e.history.replaceState(null,null,r),r},a.getUrlParams=function(){var e={},t=a.location("href");return t&&t.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(t,n,r){e[n]=decodeURIComponent(r.split("+").join(" "))}),e},a.buildUrlParams=function(e,t){var n,r=t||"",o=[];if(void 0===e)return e;for(n in e)e.hasOwnProperty(n)&&"undefined"!==e[n]&&"null"!==e[n]&&void 0!==e[n]&&o.push(r+encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return o.join("&")},a.randomString=function(){var e,t,n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",r="";for(e=0;e<12;e++)t=Math.floor(Math.random()*n.length),r+=n.substring(t,t+1);return r},a.loadScript=function(e,n){var r,o,i=t.createElement("script");i.type="text/javascript",i.async=!0,n&&"function"==typeof n&&(o=n),void 0!==i.onreadystatechange?i.onreadystatechange=function(){4!==this.readyState&&"complete"!==this.readyState&&"loaded"!==this.readyState||(o&&o(),a.removeScript(i))}:(i.onload=function(){o&&o(),a.removeScript(i)},i.onerror=function(){a.removeScript(i)}),i.src=e,(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(i,r)},a.removeScript=function(e){e&&e.parentNode&&e.parentNode.removeChild(e)},a.getElement=function(e,n){var r="string"==typeof e?n||{}:e||{},o=e;if(r.el)return r.el;if("string"==typeof e){if(t.querySelectorAll)return t.querySelectorAll(o);if("#"===e[0])return o=e.substr(1),t.getElementById(o);if("."===e[0])return o=e.substr(1),t.getElementsByClassName(o)}},a.getDomain=function(e){var t=e||a.location("hostname"),n=t.substring(t.lastIndexOf(".",t.lastIndexOf(".")-1)+1);return{"com.au":1,"net.au":1,"org.au":1,"co.hu":1,"com.ru":1,"ac.za":1,"net.za":1,"com.za":1,"co.za":1,"co.uk":1,"org.uk":1,"me.uk":1,"net.uk":1}[n]&&(n=t.substring(t.lastIndexOf(".",t.indexOf(n)-2)+1)),n},a.getHostnameNoWww=function(){var e=a.location("hostname");return 0===e.indexOf("www.")?e.replace("www.",""):e},a.endsWith=function(e,t){return-1!==e.indexOf(t,e.length-t.length)},a.startsWith=function(e,t){return 0===e.indexOf(t)},n=a._on=function(e,t,n){var r=e.instanceName;s[t]||(s[t]={}),s[t][r]=e,e.__l&&(e.__l[t]||(e.__l[t]=[]),e.__l[t].push(n))},a._fire=function(e){var t,n,r=s[e];if(r)for(var o in r)if(r.hasOwnProperty(o)&&((n=(t=r[o])&&t.__l)&&n[e]))for(var i=0;i<n[e].length;i++)n[e][i].apply(this,Array.prototype.slice.call(arguments,1))},a.attachEvent=function(e,t,n){e.addEventListener?e.addEventListener(t,n):e.attachEvent&&e.attachEvent("on"+t,function(e){(e=e||win.event).preventDefault=e.preventDefault||function(){e.returnValue=!1},e.stopPropagation=e.stopPropagation||function(){e.cancelBubble=!0},n.call(self,e)})},a.leftClick=function(t){return(void 0!==(t=t||e.event).which&&1===t.which||void 0!==t.button&&0===t.button)&&!t.metaKey&&!t.altKey&&!t.ctrlKey&&!t.shiftKey},a.redirect=function(e){a.location("href",e)},a.isOutgoingLink=function(e){var t=a.location("hostname"),n=a.getDomain(t);return!(e===t||e.replace(/^www\./,"")===t.replace(/^www\./,"")||l&&n===a.getDomain(e)||a.startsWith(e,"javascript")||""===e||"#"===e)},function(n,s){n(t,"mousedown",function(e){var t;if(s("mousemove",e,new Date),i){for(t=e.srcElement||e.target;null!=t&&(!t.tagName||"a"!==t.tagName.toLowerCase());)t=t.parentNode;null!=t&&s("auto_decorate",t)}}),n(t,"click",function(t){var n,i,l,d="_blank";if(n=t.srcElement||t.target,a.leftClick(t)&&s("click",t,n),c||u){for(;null!=n&&(!n.tagName||"a"!==n.tagName.toLowerCase());)n=n.parentNode;null==n||n.getAttribute("data-woopra-tracked")||(l=(i=n).pathname.match(/(?:doc|dmg|eps|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3|mp4|m4v)($|\&)/),c&&l&&(s("download",i.href),i.target!==d&&a.leftClick(t)&&(t.preventDefault(),t.stopPropagation(),i.setAttribute("data-woopra-tracked",!0),e.setTimeout(function(){i.click()},r))),u&&!l&&a.isOutgoingLink(i.hostname)&&(s("outgoing",i.href),i.target!==d&&a.leftClick(t)&&(t.preventDefault(),t.stopPropagation(),i.setAttribute("data-woopra-tracked",!0),e.setTimeout(function(){i.click()},o))))}}),n(t,"mousemove",function(e){s("mousemove",e,new Date)}),n(t,"keydown",function(){s("keydown")})}(a.attachEvent,a._fire);var p=function(t){this.visitorData={},this.sessionData={},this.options={app:"js-client",use_cookies:!0,ping:!0,ping_interval:12e3,idle_timeout:3e5,idle_threshold:1e4,download_pause:r||200,outgoing_pause:o||200,download_tracking:!1,outgoing_tracking:!1,outgoing_ignore_subdomain:!0,hide_campaign:!1,hide_xdm_data:!1,campaign_once:!1,third_party:!1,save_url_hash:!0,cross_domain:!1,region:null,ignore_query_url:!1,map_query_params:{},cookie_name:"wooTracker",cookie_domain:"."+a.getHostnameNoWww(),cookie_path:"/",cookie_expire:new Date((new Date).setDate((new Date).getDate()+730))},this.instanceName=t||"woopra",this.idle=0,this.cookie="",this.last_activity=new Date,this.loaded=!1,this.dirtyCookie=!1,this.sentCampaign=!1,this.version=11,t&&""!==t&&(e[t]=this)};p.prototype={docCookies:f,init:function(){var e,t=this;this.__l={},this._processQueue("config"),this._setupCookie(),this._bindEvents(),setTimeout(function(){t._processQueue()},1),this.loaded=!0,(e=this.config("initialized"))&&"function"==typeof e&&e(this.instanceName),this.config("hide_xdm_data")&&a.hideCrossDomainId()},_processQueue:function(t){var n,r,o,i;if(i=e.__woo?e.__woo[this.instanceName]:i,(i=e._w?e._w[this.instanceName]:i)&&i._e)for(o=i._e,n=0;n<o.length;n++)void 0===(r=o[n])||!this[r[0]]||void 0!==t&&t!==r[0]||this[r[0]].apply(this,Array.prototype.slice.call(r,1))},_setupCookie:function(){var e=this.getUrlId();this.cookie=this.getCookie(),e&&(this.cookie=e),(!this.cookie||this.cookie.length<1)&&(this.cookie=a.randomString()),f.setItem(this.config("cookie_name"),this.cookie,this.config("cookie_expire"),this.config("cookie_path"),this.config("cookie_domain")),this.dirtyCookie=!0},_bindEvents:function(){var e=this;n(this,"mousemove",function(){e.moved.apply(e,arguments)}),n(this,"keydown",function(){e.typed.apply(e,arguments)}),n(this,"download",function(){e.downloaded.apply(e,arguments)}),n(this,"outgoing",function(){e.outgoing.apply(e,arguments)}),n(this,"auto_decorate",function(){e.autoDecorate.apply(e,arguments)})},_dataSetter:function(e,t,n){var r;if(void 0===t)return e;if(void 0===n){if("string"==typeof t)return e[t];if("object"==typeof t)for(r in t)t.hasOwnProperty(r)&&("cookie_"===r.substring(0,7)&&(this.dirtyCookie=!0),e[r]=t[r])}else"cookie_"===t.substring(0,7)&&(this.dirtyCookie=!0),e[t]=n;return this},_push:function(e){var t,n,r,o,i,s=e||{},c="ra="+a.randomString(),u=[["visitorData","cv_"],["eventData","ce_"],["sessionData","cs_"]],l=[];for(i in t=this.getEndpoint(s.endpoint),a.getVisitorUrlData(this),this.config("hide_campaign")&&a.hideCampaignData(),l.push(c),l.push(a.buildUrlParams(this.getOptionParams())),s.eventName&&l.push("event="+s.eventName),u)u.hasOwnProperty(i)&&(s[(o=u[i])[0]]&&((n=a.buildUrlParams(s[o[0]],o[1]))&&l.push(n)));r=t+("?"+l.join("&")),a.loadScript(r,s.callback)},getCookie:function(){return f.getItem(this.config("cookie_name"))},getEndpoint:function(e){var t,n=this.config("protocol"),r=e||"",o=(n&&""!==n?n+":":"")+"//",i=this.config("region");if(this.config("third_party")&&!this.config("domain"))throw new Error("Error: `domain` is not set.");return o+=i?i+".t.":"www.",t=this.config("third_party")?"tp/"+this.config("domain"):"",r&&!a.endsWith(r,"/")&&(r+="/"),t&&!a.startsWith(r,"/")&&(t+="/"),o+"woopra.com/track/"+t+r},config:function(e,t){var n=this._dataSetter(this.options,e,t);return n===this&&(this.options.ping_interval<6e3?this.options.ping_interval=6e3:this.options.ping_interval>6e4&&(this.options.ping_interval=6e4),u=this.options.outgoing_tracking,o=this.options.outgoing_pause,c=this.options.download_tracking,r=this.options.download_pause,i=void 0===i&&this.options.cross_domain?this.options.cross_domain:i,l=this.options.outgoing_ignore_subdomain,this.dirtyCookie&&this.loaded&&this._setupCookie()),n},visit:function(e,t){return this._dataSetter(this.sessionData,e,t)},identify:function(e,t){return this._dataSetter(this.visitorData,e,t)},call:function(e){this[e]&&"function"==typeof this[e]&&this[e].apply(this,Array.prototype.slice.call(arguments,1))},track:function(e,t){var n,r,o={},i="",s=arguments[arguments.length-1];this.config("campaign_once")&&this.sentCampaign||(a.extend(o,a.getCampaignData()),this.sentCampaign=!0),a.extend(o,a.mapQueryParams(this.config("map_query_params"))),"function"==typeof s&&(n=s),void 0===e||e===n?i="pv":void 0===t||t===n?("string"==typeof e&&(i=e),"object"==typeof e&&(e.name&&"pv"===e.name&&(i="pv"),this._dataSetter(o,e))):(this._dataSetter(o,t),i=e),"pv"===i&&(o.url=o.url||this.getPageUrl(),o.title=o.title||this.getPageTitle(),o.domain=o.domain||this.getDomainName(),o.uri=o.uri||this.getURI(),this.config("save_url_hash")&&(""!==(r=o.hash||this.getPageHash())&&(o.hash=r))),this._push({endpoint:"ce",visitorData:this.visitorData,sessionData:this.sessionData,eventName:i,eventData:o,callback:n}),this.startPing()},trackForm:function(e,t,n){var r,o,i=e||"Tracked Form",s="string"==typeof t?n||{}:t||{},c=this;if(o=function(e,t,n,r){a.attachEvent(e,"submit",function(n){c.trackFormHandler(n,e,t,s)})},(r=s.elements?s.elements:a.getElement(t,s))&&r.length>0)for(var u in r)o(r[u],i)},trackFormHandler:function(e,t,n,r){var o,i,s=!1;t.getAttribute("data-tracked")||(o=a.serializeForm(t,r),r.identify&&"function"==typeof r.identify&&((i=r.identify(o)||{})&&this.identify(i)),r.noSubmit?this.track(n,o,function(){"function"==typeof r.callback&&r.callback(o)}):(e.preventDefault(),e.stopPropagation(),t.setAttribute("data-tracked",1),this.track(n,o,function(){s=!0,"function"==typeof r.callback&&r.callback(o),t.submit()}),setTimeout(function(){s||t.submit()},250)))},trackClick:function(e,t,n,r){var o,i,s,c=r||{},u=e||"Item Clicked",l=this;if(i=function(e,t,n,r){a.attachEvent(e,"click",function(o){l.trackClickHandler(o,e,t,n,r)})},s=c.elements?c.elements:a.getElement(t,c))for(o=0;o<s.length;o++)i(s[o],u,n,c)},trackClickHandler:function(e,t,n,r,o){var i=!1;t.getAttribute("data-tracked")||(o.noNav?this.track(n,r):(e.preventDefault(),t.setAttribute("data-tracked",1),this.track(n,r,function(){i=!0,"function"==typeof o.callback&&o.callback(),t.click()}),setTimeout(function(){i||t.click()},250)))},startPing:function(){var t=this;void 0===this.pingInterval&&(this.pingInterval=e.setInterval(function(){t.ping()},this.config("ping_interval")))},stopPing:function(){void 0!==this.pingInterval&&(e.clearInterval(this.pingInterval),delete this.pingInterval)},ping:function(){var e;return this.config("ping")&&this.idle<this.config("idle_timeout")?this._push({endpoint:"ping"}):this.stopPing(),(e=new Date)-this.last_activity>this.config("idle_threshold")&&(this.idle=e-this.last_activity),this},push:function(e){return this._push({endpoint:"identify",visitorData:this.visitorData,sessionData:this.sessionData,callback:e}),this},sleep:function(){},moved:function(e,t){this.last_activity=t,this.idle=0},typed:function(){this.vs=2},downloaded:function(e){this.track("download",{url:e})},outgoing:function(e){this.track("outgoing",{url:e})},autoDecorate:function(e){var t,n,r=this.config("cross_domain");if(r){if("string"==typeof r)n=e.hostname.indexOf(r)>-1;else if(r.push)for(var o=0;o<r.length;o++)if(-1!==e.hostname.indexOf(r[o])){n=!0;break}n&&((t=this.decorate(e))&&(e.href=t))}},reset:function(){f.removeItem(this.config("cookie_name"),this.config("cookie_path"),this.config("cookie_domain")),this.cookie=null,this._setupCookie()},decorate:function(e){var n,r,o,i;if("string"==typeof e?((n=t.createElement("a")).href=e,r=n.search?"&":"?"):e&&e.href&&(n=e),n)return r=n.search?"&":"?",o=n.pathname&&"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname,i=n.hostname+(n.port&&""!==n.port&&"80"!==n.port&&"0"!==n.port?":"+n.port:""),n.protocol+"//"+i+o+n.search+r+d+"="+this.cookie+n.hash},undecorate:function(e){var t=new RegExp("[?&]+(?:"+d+")=([^&#]*)","gi"),n=e;if(e&&e.href&&(n=e.href),n)return n.replace(t,"")},getPageUrl:function(){return this.options.ignore_query_url?a.location("pathname"):a.location("pathname")+a.location("search")},getPageHash:function(){return a.location("hash")},getPageTitle:function(){return 0===t.getElementsByTagName("title").length?"":t.getElementsByTagName("title")[0].innerHTML},getDomainName:function(){return a.location("hostname")},getURI:function(){return a.location("href")},getUrlId:function(e){var t,n=e||a.location("href"),r=new RegExp(d+"=([^&#]+)");if((t=n.match(r))&&t[1])return t[1]},getOptionParams:function(){var n={alias:this.config("domain")||a.getHostnameNoWww(),instance:this.instanceName,ka:this.config("keep_alive")||2*this.config("ping_interval"),meta:f.getItem("wooMeta")||"",screen:e.screen.width+"x"+e.screen.height,language:e.navigator.browserLanguage||e.navigator.language||"",app:this.config("app"),referer:t.referrer,idle:""+parseInt(this.idle/1e3,10),vs:"i"};return this.config("domain")||(n._warn="no_domain",a.getHostnameNoWww()!==a.getDomain()&&(n._warn+=",domain_mismatch")),this.config("use_cookies")&&(n.cookie=this.getCookie()||this.cookie),this.config("ip")&&(n.ip=this.config("ip")),2===this.vs?(n.vs="w",this.vs=0):0===this.idle&&(n.vs="r"),n},dispose:function(){for(var t in this.stopPing(),this.__l)this.__l.hasOwnProperty(t)&&(s[t][this.instanceName]=null);if(this.__l=null,void 0!==e[this.instanceName])try{delete e[this.instanceName]}catch(t){e[this.instanceName]=void 0}}},e.WoopraTracker=p,e.WoopraLoadScript=a.loadScript,void 0!==e.exports&&(a.Tracker=p,e.exports.Woopra=a,"function"==typeof e.woopraLoaded&&(e.woopraLoaded(),e.woopraLoaded=null));var h=e.__woo||e._w;if(void 0!==h)for(var m in h)if(h.hasOwnProperty(m)){var v=new p(m);v.init(),void 0===e.woopraTracker&&(e.woopraTracker=v)}}(onfidoSafeWindow8xmy484y87m239843m20,document)}).call(onfidoSafeWindow8xmy484y87m239843m20)},function(e,t,n){e.exports=n(501)},function(e,t,n){var r=n(502),o=Array.prototype;e.exports=function(e){var t=e.every;return e===o||e instanceof Array&&t===o.every?r:t}},function(e,t,n){n(503);var r=n(32);e.exports=r("Array").every},function(e,t,n){"use strict";var r=n(8),o=n(47).every;r({target:"Array",proto:!0,forced:n(78)("every")},{every:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},function(e,t,n){!function(t){var r=-1,o=function(e){return e.every=function(t,n,o){e._time(),o||(o=n,n=null);var i=r+=1;return e._timers[i]={visible:t,hidden:n,callback:o},e._run(i,!1),e.isSupported()&&e._listen(),i},e.stop=function(t){return!!e._timers[t]&&(e._stop(t),delete e._timers[t],!0)},e._timers={},e._time=function(){e._timed||(e._timed=!0,e._wasHidden=e.hidden(),e.change(function(){e._stopRun(),e._wasHidden=e.hidden()}))},e._run=function(n,r){var o,i=e._timers[n];if(e.hidden()){if(null===i.hidden)return;o=i.hidden}else o=i.visible;var a=function(){i.last=new Date,i.callback.call(t)};if(r){var s=new Date-i.last;o>s?i.delay=setTimeout(function(){i.id=setInterval(a,o),a()},o-s):(i.id=setInterval(a,o),a())}else i.id=setInterval(a,o)},e._stop=function(t){var n=e._timers[t];clearInterval(n.id),clearTimeout(n.delay),delete n.id,delete n.delay},e._stopRun=function(t){var n=e.hidden(),r=e._wasHidden;if(n&&!r||!n&&r)for(var o in e._timers)e._stop(o),e._run(o,!n)},e};e.exports?e.exports=o(n(373)):o(t.Visibility||n(373))}(window)},function(e,t,n){var r,o,i;!function(a){"use strict";o=[n(146),n(506),n(374)],void 0===(i="function"==typeof(r=function(e){var t=e.hasCanvasOption,n=e.hasMetaOption,r=e.transformCoordinates,o=e.getTransformedOptions;e.hasCanvasOption=function(n){return!!n.orientation||t.call(e,n)},e.hasMetaOption=function(t){return t&&!0===t.orientation||n.call(e,t)},e.transformCoordinates=function(t,n){r.call(e,t,n);var o=t.getContext("2d"),i=t.width,a=t.height,s=t.style.width,c=t.style.height,u=n.orientation;if(u&&!(u>8))switch(u>4&&(t.width=a,t.height=i,t.style.width=c,t.style.height=s),u){case 2:o.translate(i,0),o.scale(-1,1);break;case 3:o.translate(i,a),o.rotate(Math.PI);break;case 4:o.translate(0,a),o.scale(1,-1);break;case 5:o.rotate(.5*Math.PI),o.scale(1,-1);break;case 6:o.rotate(.5*Math.PI),o.translate(0,-a);break;case 7:o.rotate(.5*Math.PI),o.translate(i,-a),o.scale(-1,1);break;case 8:o.rotate(-.5*Math.PI),o.translate(-i,0)}},e.getTransformedOptions=function(t,n,r){var i,a,s=o.call(e,t,n),c=s.orientation;if(!0===c&&r&&r.exif&&(c=r.exif.get("Orientation")),!c||c>8||1===c)return s;for(a in i={},s)s.hasOwnProperty(a)&&(i[a]=s[a]);switch(i.orientation=c,c){case 2:i.left=s.right,i.right=s.left;break;case 3:i.left=s.right,i.top=s.bottom,i.right=s.left,i.bottom=s.top;break;case 4:i.top=s.bottom,i.bottom=s.top;break;case 5:i.left=s.top,i.top=s.left,i.right=s.bottom,i.bottom=s.right;break;case 6:i.left=s.top,i.top=s.right,i.right=s.bottom,i.bottom=s.left;break;case 7:i.left=s.bottom,i.top=s.right,i.right=s.top,i.bottom=s.left;break;case 8:i.left=s.bottom,i.top=s.left,i.right=s.top,i.bottom=s.right}return i.orientation>4&&(i.maxWidth=s.maxHeight,i.maxHeight=s.maxWidth,i.minWidth=s.minHeight,i.minHeight=s.minWidth,i.sourceWidth=s.sourceHeight,i.sourceHeight=s.sourceWidth),i}})?r.apply(t,o):r)||(e.exports=i)}()},function(e,t,n){var r,o,i;!function(a){"use strict";o=[n(146)],void 0===(i="function"==typeof(r=function(e){var t=e.transform;e.transform=function(n,r,o,i,a){t.call(e,e.scale(n,r,a),r,o,i,a)},e.transformCoordinates=function(){},e.getTransformedOptions=function(e,t){var n,r,o,i,a=t.aspectRatio;if(!a)return t;for(r in n={},t)t.hasOwnProperty(r)&&(n[r]=t[r]);return n.crop=!0,(o=e.naturalWidth||e.width)/(i=e.naturalHeight||e.height)>a?(n.maxWidth=i*a,n.maxHeight=i):(n.maxWidth=o,n.maxHeight=o/a),n},e.renderImageToCanvas=function(e,t,n,r,o,i,a,s,c,u){return e.getContext("2d").drawImage(t,n,r,o,i,a,s,c,u),e},e.hasCanvasOption=function(e){return e.canvas||e.crop||!!e.aspectRatio},e.scale=function(t,n,r){n=n||{};var o,i,a,s,c,u,l,d,f,p,h,m=document.createElement("canvas"),v=t.getContext||e.hasCanvasOption(n)&&m.getContext,y=t.naturalWidth||t.width,g=t.naturalHeight||t.height,b=y,$=g;function _(){var e=Math.max((a||b)/b,(s||$)/$);e>1&&(b*=e,$*=e)}function k(){var e=Math.min((o||b)/b,(i||$)/$);e<1&&(b*=e,$*=e)}if(v&&(l=(n=e.getTransformedOptions(t,n,r)).left||0,d=n.top||0,n.sourceWidth?(c=n.sourceWidth,void 0!==n.right&&void 0===n.left&&(l=y-c-n.right)):c=y-l-(n.right||0),n.sourceHeight?(u=n.sourceHeight,void 0!==n.bottom&&void 0===n.top&&(d=g-u-n.bottom)):u=g-d-(n.bottom||0),b=c,$=u),o=n.maxWidth,i=n.maxHeight,a=n.minWidth,s=n.minHeight,v&&o&&i&&n.crop?(b=o,$=i,(h=c/u-o/i)<0?(u=i*c/o,void 0===n.top&&void 0===n.bottom&&(d=(g-u)/2)):h>0&&(c=o*u/i,void 0===n.left&&void 0===n.right&&(l=(y-c)/2))):((n.contain||n.cover)&&(a=o=o||a,s=i=i||s),n.cover?(k(),_()):(_(),k())),v){if((f=n.pixelRatio)>1&&(m.style.width=b+"px",m.style.height=$+"px",b*=f,$*=f,m.getContext("2d").scale(f,f)),(p=n.downsamplingRatio)>0&&p<1&&b<c&&$<u)for(;c*p>b;)m.width=c*p,m.height=u*p,e.renderImageToCanvas(m,t,l,d,c,u,0,0,m.width,m.height),l=0,d=0,c=m.width,u=m.height,(t=document.createElement("canvas")).width=c,t.height=u,e.renderImageToCanvas(t,m,0,0,c,u,0,0,c,u);return m.width=b,m.height=$,e.transformCoordinates(m,n),e.renderImageToCanvas(m,t,l,d,c,u,0,0,b,$)}return t.width=b,t.height=$,t}})?r.apply(t,o):r)||(e.exports=i)}()},function(e,t,n){var r,o,i;!function(a){"use strict";o=[n(146),n(374)],void 0===(i="function"==typeof(r=function(e){e.ExifMap=function(){return this},e.ExifMap.prototype.map={Orientation:274},e.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},e.getExifThumbnail=function(e,t,n){var r,o,i;if(n&&!(t+n>e.byteLength)){for(r=[],o=0;o<n;o+=1)i=e.getUint8(t+o),r.push((i<16?"0":"")+i.toString(16));return"data:image/jpeg,%"+r.join("%")}console.log("Invalid Exif data: Invalid thumbnail data.")},e.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,n){return e.getUint16(t,n)},size:2},4:{getValue:function(e,t,n){return e.getUint32(t,n)},size:4},5:{getValue:function(e,t,n){return e.getUint32(t,n)/e.getUint32(t+4,n)},size:8},9:{getValue:function(e,t,n){return e.getInt32(t,n)},size:4},10:{getValue:function(e,t,n){return e.getInt32(t,n)/e.getInt32(t+4,n)},size:8}},e.exifTagTypes[7]=e.exifTagTypes[1],e.getExifValue=function(t,n,r,o,i,a){var s,c,u,l,d,f,p=e.exifTagTypes[o];if(p){if(!((c=(s=p.size*i)>4?n+t.getUint32(r+8,a):r+8)+s>t.byteLength)){if(1===i)return p.getValue(t,c,a);for(u=[],l=0;l<i;l+=1)u[l]=p.getValue(t,c+l*p.size,a);if(p.ascii){for(d="",l=0;l<u.length&&"\0"!==(f=u[l]);l+=1)d+=f;return d}return u}console.log("Invalid Exif data: Invalid data offset.")}else console.log("Invalid Exif data: Invalid tag type.")},e.parseExifTag=function(t,n,r,o,i){var a=t.getUint16(r,o);i.exif[a]=e.getExifValue(t,n,r,t.getUint16(r+2,o),t.getUint32(r+4,o),o)},e.parseExifTags=function(e,t,n,r,o){var i,a,s;if(n+6>e.byteLength)console.log("Invalid Exif data: Invalid directory offset.");else{if(!((a=n+2+12*(i=e.getUint16(n,r)))+4>e.byteLength)){for(s=0;s<i;s+=1)this.parseExifTag(e,t,n+2+12*s,r,o);return e.getUint32(a,r)}console.log("Invalid Exif data: Invalid directory size.")}},e.parseExifData=function(t,n,r,o,i){if(!i.disableExif){var a,s,c,u=n+10;if(1165519206===t.getUint32(n+4))if(u+8>t.byteLength)console.log("Invalid Exif data: Invalid segment size.");else if(0===t.getUint16(n+8)){switch(t.getUint16(u)){case 18761:a=!0;break;case 19789:a=!1;break;default:return void console.log("Invalid Exif data: Invalid byte alignment marker.")}42===t.getUint16(u+2,a)?(s=t.getUint32(u+4,a),o.exif=new e.ExifMap,(s=e.parseExifTags(t,u,u+s,a,o))&&!i.disableExifThumbnail&&(c={exif:{}},s=e.parseExifTags(t,u,u+s,a,c),c.exif[513]&&(o.exif.Thumbnail=e.getExifThumbnail(t,u+c.exif[513],c.exif[514]))),o.exif[34665]&&!i.disableExifSub&&e.parseExifTags(t,u,u+o.exif[34665],a,o),o.exif[34853]&&!i.disableExifGps&&e.parseExifTags(t,u,u+o.exif[34853],a,o)):console.log("Invalid Exif data: Missing TIFF marker.")}else console.log("Invalid Exif data: Missing byte alignment offset.")}},e.metaDataParsers.jpeg[65505].push(e.parseExifData)})?r.apply(t,o):r)||(e.exports=i)}()},function(e,t,n){e.exports=n(509)},function(e,t,n){e.exports=n(510)},function(e,t,n){var r=n(511),o=Array.prototype;e.exports=function(e){var t=e.splice;return e===o||e instanceof Array&&t===o.splice?r:t}},function(e,t,n){n(512);var r=n(32);e.exports=r("Array").splice},function(e,t,n){"use strict";var r=n(8),o=n(115),i=n(84),a=n(43),s=n(37),c=n(105),u=n(76),l=n(79),d=Math.max,f=Math.min;r({target:"Array",proto:!0,forced:!l("splice")},{splice:function(e,t){var n,r,l,p,h,m,v=s(this),y=a(v.length),g=o(e,y),b=arguments.length;if(0===b?n=r=0:1===b?(n=0,r=y-g):(n=b-2,r=f(d(i(t),0),y-g)),y+n-r>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(l=c(v,r),p=0;p<r;p++)(h=g+p)in v&&u(l,p,v[h]);if(l.length=r,n<r){for(p=g;p<y-r;p++)m=p+n,(h=p+r)in v?v[m]=v[h]:delete v[m];for(p=y;p>y-r+n;p--)delete v[p-1]}else if(n>r)for(p=y-r;p>g;p--)m=p+n-1,(h=p+r-1)in v?v[m]=v[h]:delete v[m];for(p=0;p<n;p++)v[p+g]=arguments[p+2];return v.length=y-r+n,l}})},function(e,t,n){e.exports=n(250)},function(e,t,n){n(359),e.exports=n(18).setInterval},function(e,t,n){n(122),n(71),n(62),n(516),n(380),n(519);var r=n(18);e.exports=r.Promise},function(e,t,n){"use strict";var r,o,i,a,s=n(8),c=n(59),u=n(27),l=n(18),d=n(376),f=n(87),p=n(255),h=n(46),m=n(256),v=n(29),y=n(67),g=n(143),b=n(54),$=n(106),_=n(252),k=n(377),w=n(378).set,C=n(517),x=n(379),O=n(518),S=n(242),E=n(259),j=n(326),T=n(58),P=n(139),N=n(23)("species"),A="Promise",I=T.get,D=T.set,R=T.getterFor(A),M=d,F=u.TypeError,L=u.document,U=u.process,B=u.fetch,W=U&&U.versions,H=W&&W.v8||"",q=S.f,V=q,G="process"==b(U),z=!!(L&&L.createEvent&&u.dispatchEvent),K=P(A,function(){var e=M.resolve(1),t=function(){},n=(e.constructor={})[N]=function(e){e(t,t)};return!((G||"function"==typeof PromiseRejectionEvent)&&(!c||e.finally)&&e.then(t)instanceof n&&0!==H.indexOf("6.6")&&-1===j.indexOf("Chrome/66"))}),Y=K||!_(function(e){M.all(e).catch(function(){})}),X=function(e){var t;return!(!v(e)||"function"!=typeof(t=e.then))&&t},J=function(e,t,n){if(!t.notified){t.notified=!0;var r=t.reactions;C(function(){for(var o=t.value,i=1==t.state,a=0;r.length>a;){var s,c,u,l=r[a++],d=i?l.ok:l.fail,f=l.resolve,p=l.reject,h=l.domain;try{d?(i||(2===t.rejection&&te(e,t),t.rejection=1),!0===d?s=o:(h&&h.enter(),s=d(o),h&&(h.exit(),u=!0)),s===l.promise?p(F("Promise-chain cycle")):(c=X(s))?c.call(s,f,p):f(s)):p(o)}catch(e){h&&!u&&h.exit(),p(e)}}t.reactions=[],t.notified=!1,n&&!t.rejection&&Q(e,t)})}},Z=function(e,t,n){var r,o;z?((r=L.createEvent("Event")).promise=t,r.reason=n,r.initEvent(e,!1,!0),u.dispatchEvent(r)):r={promise:t,reason:n},(o=u["on"+e])?o(r):"unhandledrejection"===e&&O("Unhandled promise rejection",n)},Q=function(e,t){w.call(u,function(){var n,r=t.value;if(ee(t)&&(n=E(function(){G?U.emit("unhandledRejection",r,e):Z("unhandledrejection",e,r)}),t.rejection=G||ee(t)?2:1,n.error))throw n.value})},ee=function(e){return 1!==e.rejection&&!e.parent},te=function(e,t){w.call(u,function(){G?U.emit("rejectionHandled",e):Z("rejectionhandled",e,t.value)})},ne=function(e,t,n,r){return function(o){e(t,n,o,r)}},re=function(e,t,n,r){t.done||(t.done=!0,r&&(t=r),t.value=n,t.state=2,J(e,t,!0))},oe=function(e,t,n,r){if(!t.done){t.done=!0,r&&(t=r);try{if(e===n)throw F("Promise can't be resolved itself");var o=X(n);o?C(function(){var r={done:!1};try{o.call(n,ne(oe,e,r,t),ne(re,e,r,t))}catch(n){re(e,r,n,t)}}):(t.value=n,t.state=1,J(e,t,!1))}catch(n){re(e,{done:!1},n,t)}}};K&&(M=function(e){g(this,M,A),y(e),r.call(this);var t=I(this);try{e(ne(oe,this,t),ne(re,this,t))}catch(e){re(this,t,e)}},(r=function(e){D(this,{type:A,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0})}).prototype=p(M.prototype,{then:function(e,t){var n=R(this),r=q(k(this,M));return r.ok="function"!=typeof e||e,r.fail="function"==typeof t&&t,r.domain=G?U.domain:void 0,n.parent=!0,n.reactions.push(r),0!=n.state&&J(this,n,!1),r.promise},catch:function(e){return this.then(void 0,e)}}),o=function(){var e=new r,t=I(e);this.promise=e,this.resolve=ne(oe,e,t),this.reject=ne(re,e,t)},S.f=q=function(e){return e===M||e===i?new o(e):V(e)},c||"function"!=typeof d||(a=d.prototype.then,f(d.prototype,"then",function(e,t){var n=this;return new M(function(e,t){a.call(n,e,t)}).then(e,t)}),"function"==typeof B&&s({global:!0,enumerable:!0,forced:!0},{fetch:function(e){return x(M,B.apply(u,arguments))}}))),s({global:!0,wrap:!0,forced:K},{Promise:M}),h(M,A,!1,!0),m(A),i=l.Promise,s({target:A,stat:!0,forced:K},{reject:function(e){var t=q(this);return t.reject.call(void 0,e),t.promise}}),s({target:A,stat:!0,forced:c||K},{resolve:function(e){return x(c&&this===i?M:this,e)}}),s({target:A,stat:!0,forced:Y},{all:function(e){var t=this,n=q(t),r=n.resolve,o=n.reject,i=E(function(){var n=y(t.resolve),i=[],a=0,s=1;$(e,function(e){var c=a++,u=!1;i.push(void 0),s++,n.call(t,e).then(function(e){u||(u=!0,i[c]=e,--s||r(i))},o)}),--s||r(i)});return i.error&&o(i.value),n.promise},race:function(e){var t=this,n=q(t),r=n.reject,o=E(function(){var o=y(t.resolve);$(e,function(e){o.call(t,e).then(n.resolve,r)})});return o.error&&r(o.value),n.promise}})},function(e,t,n){var r,o,i,a,s,c,u,l,d=n(27),f=n(60).f,p=n(54),h=n(378).set,m=n(326),v=d.MutationObserver||d.WebKitMutationObserver,y=d.process,g=d.Promise,b="process"==p(y),$=f(d,"queueMicrotask"),_=$&&$.value;_||(r=function(){var e,t;for(b&&(e=y.domain)&&e.exit();o;){t=o.fn,o=o.next;try{t()}catch(e){throw o?a():i=void 0,e}}i=void 0,e&&e.enter()},b?a=function(){y.nextTick(r)}:v&&!/(iphone|ipod|ipad).*applewebkit/i.test(m)?(s=!0,c=document.createTextNode(""),new v(r).observe(c,{characterData:!0}),a=function(){c.data=s=!s}):g&&g.resolve?(u=g.resolve(void 0),l=u.then,a=function(){l.call(u,r)}):a=function(){h.call(d,r)}),e.exports=_||function(e){var t={fn:e,next:void 0};i&&(i.next=t),o||(o=t,a()),i=t}},function(e,t,n){var r=n(27);e.exports=function(e,t){var n=r.console;n&&n.error&&(1===arguments.length?n.error(e):n.error(e,t))}},function(e,t,n){"use strict";var r=n(8),o=n(59),i=n(376),a=n(75),s=n(377),c=n(379),u=n(87);r({target:"Promise",proto:!0,real:!0},{finally:function(e){var t=s(this,a("Promise")),n="function"==typeof e;return this.then(n?function(n){return c(t,e()).then(function(){return n})}:e,n?function(n){return c(t,e()).then(function(){throw n})}:e)}}),o||"function"!=typeof i||i.prototype.finally||u(i.prototype,"finally",a("Promise").prototype.finally)},function(e,t,n){var r=n(8),o=n(85),i=n(104),a=n(70),s=n(50),c=n(106),u=n(31),l=function(e,t){var n=this;if(!(n instanceof l))return new l(e,t);i&&(n=i(new Error(t),o(n)));var r=[];return c(e,r.push,r),u(n,"errors",r),void 0!==t&&u(n,"message",String(t)),n};l.prototype=a(Error.prototype,{constructor:s(5,l),name:s(5,"AggregateError")}),r({global:!0},{AggregateError:l})},function(e,t,n){n(380)},function(e,t,n){"use strict";var r=n(8),o=n(242),i=n(259);r({target:"Promise",stat:!0},{try:function(e){var t=o.f(this),n=i(e);return(n.error?t.reject:t.resolve)(n.value),t.promise}})},function(e,t,n){"use strict";var r=n(8),o=n(67),i=n(75),a=n(242),s=n(259),c=n(106);r({target:"Promise",stat:!0},{any:function(e){var t=this,n=a.f(t),r=n.resolve,u=n.reject,l=s(function(){var n=o(t.resolve),a=[],s=0,l=1,d=!1;c(e,function(e){var o=s++,c=!1;a.push(void 0),l++,n.call(t,e).then(function(e){c||d||(d=!0,r(e))},function(e){c||d||(c=!0,a[o]=e,--l||u(new(i("AggregateError"))(a,"No one promise resolved")))})}),--l||u(new(i("AggregateError"))(a,"No one promise resolved"))});return l.error&&u(l.value),n.promise}})},,function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"setIdDocumentType",function(){return Ie}),n.d(r,"setPoADocumentType",function(){return De}),n.d(r,"setRoomId",function(){return Re}),n.d(r,"setSocket",function(){return Me}),n.d(r,"setClientSuccess",function(){return Fe}),n.d(r,"setMobileNumber",function(){return Le}),n.d(r,"mobileConnected",function(){return Ue}),n.d(r,"acceptTerms",function(){return Be}),n.d(r,"setNavigationDisabled",function(){return We}),n.d(r,"setFullScreen",function(){return He});var o={};n.r(o),n.d(o,"createCapture",function(){return Ge}),n.d(o,"deleteCapture",function(){return ze}),n.d(o,"setCaptureMetadata",function(){return Ke});var i=n(24),a=n.n(i),s=n(26),c=n.n(s),u=n(15),l=n.n(u),d=n(11),f=n.n(d),p=n(16),h=n.n(p),m=n(19),v=n.n(m),y=n(17),g=n.n(y),b=n(12),$=n.n(b),_=n(80),k=n.n(_),w=n(30),C=n.n(w),x=n(88),O=n.n(x),S=n(3),E=n.n(S),j=n(5),T=n.n(j),P=n(9),N=n.n(P),A=n(4),I=n.n(A),D=n(6),R=n.n(D),M=n(2),F=n.n(M),L=n(7),U=n.n(L),B=n(1),W=n.n(B),H=n(14),q=n.n(H),V=n(40),G=n.n(V),z=n(0),K=n(72),Y=n(382),X=n.n(Y),J=n(381),Z=n(22),Q=function(e){var t=e.split(".")[1].replace("-","+").replace("_","/");return JSON.parse(atob(t))},ee=function(e){var t=Q(e).exp;return Object(Z.e)()>t},te=n(108),ne="SET_ID_DOCUMENT_TYPE",re="SET_POA_DOCUMENT_TYPE",oe="SET_ROOM_ID",ie="SET_SOCKET",ae="SET_MOBILE_NUMBER",se="SET_CLIENT_SUCCESS",ce="MOBILE_CONNECTED",ue="ACCEPT_TERMS",le="SET_NAVIGATION_DISABLED",de="SET_FULL_SCREEN",fe="CAPTURE_CREATE",pe="CAPTURE_DELETE",he="SET_CAPTURE_METADATA",me=n(51),ve=n.n(me),ye=n(52),ge=n.n(ye),be=n(387),$e=n.n(be),_e=function(e){return v()(e).call(e,function(e){return e})},ke=function(e){return $e()(e)?e:[e]},we=n(44);function Ce(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function xe(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=Ce(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=Ce(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var Oe={},Se=function(e){return _e(e).join("_")},Ee=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return k()(e=$()(t)).call(e,function(e){return t[e].id===n})};function je(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function Te(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=je(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=je(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var Pe={documentType:null,poaDocumentType:null,roomId:null,socket:null,sms:{number:null,valid:!1},clientSuccess:!1,termsAccepted:!1,isNavigationDisabled:!1,isFullScreen:!1};var Ne=Object(te.combineReducers)({captures:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Oe,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.payload,r=void 0===n?{}:n,o=t.type,i=r.captureId?Ee(e,r.captureId):Se([r.method,r.side]);switch(o){case fe:return xe({},e,W()({},i,r));case pe:return Object(we.e)(e,[i]);case he:return xe({},e,W()({},i,xe({},e[i],{metadata:r.metadata})));default:return e}},globals:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ne:return Te({},e,{documentType:t.payload,poaDocumentType:null});case re:return Te({},e,{poaDocumentType:t.payload});case oe:return Te({},e,{roomId:t.payload});case ie:return Te({},e,{socket:t.payload});case ae:return Te({},e,{sms:t.payload});case se:return Te({},e,{clientSuccess:t.payload});case ce:return Te({},e,{mobileConnected:t.payload});case ue:return Te({},e,{termsAccepted:!0});case le:return Te({},e,{isNavigationDisabled:!!t.payload});case de:return Te({},e,{isFullScreen:!!t.payload});default:return e}}}),Ae=Object(te.createStore)(function(e,t){return"RESET_STORE"===t.type?Ne({},{}):Ne(e,t)},window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():void 0);function Ie(e){return{type:ne,payload:e}}var De=function(e){return{type:re,payload:e}};function Re(e){return{type:oe,payload:e}}function Me(e){return{type:ie,payload:e}}function Fe(e){return{type:se,payload:e}}function Le(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return{type:ae,payload:{number:e,valid:t}}}function Ue(e){return{type:ce,payload:e}}function Be(){return{type:ue}}function We(e){return{type:le,payload:e}}function He(e){return{type:de,payload:e}}function qe(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function Ve(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=qe(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=qe(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var Ge=function(e){return{type:fe,payload:e}},ze=function(){return{type:pe}},Ke=function(e){var t=e.capture,n=e.apiResponse,r={captureId:t.id,metadata:Object(we.f)(Ve({},Object(we.g)(n,["id","side","type"]),{variant:"face"===t.method&&t.variant}),function(e,t){return!t})};return{type:he,payload:r}};function Ye(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}var Xe=function(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=Ye(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=Ye(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}({},r,{},o,{reset:function(e){return{type:"RESET_STORE",payload:e}}}),Je=Object(te.bindActionCreators)(Xe,Ae.dispatch),Ze=n(99),Qe=n.n(Ze),et=n(388),tt=n.n(et),nt=n(20),rt=n.n(nt),ot=n(36),it=function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.props.setFullScreen(!0)}},{key:"componentWillUnmount",value:function(){this.props.setFullScreen(!1)}},{key:"render",value:function(){return null}}]),t}(z.Component),at=Object(K.connect)(function(e){return{isFullScreen:e.globals.isFullScreen}}),st=Object(K.connect)(null,function(e){return{setFullScreen:function(t){return e(He(t))}}}),ct=st(it),ut=n(10),lt=Object(Z.g)(Qe.a.modal_animation_duration),dt=function(e){var t=e.children;return Object(Z.k)(Qe.a.inner,t)},ft=function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"render",value:function(){var e=this.props,t=e.translate,n=e.isFullScreen,r=e.containerId,o=e.shouldCloseOnOverlayClick;return Object(z.h)(tt.a,{isOpen:this.props.isOpen,onRequestClose:this.props.onRequestClose,portalClassName:Qe.a.portal,overlayClassName:Qe.a.overlay,bodyClassName:Qe.a.modalBody,className:Qe.a.inner,shouldCloseOnOverlayClick:o,closeTimeoutMS:lt,appElement:document.getElementById(r)},Object(z.h)("button",{type:"button","aria-label":t("accessibility.close_sdk_screen"),onClick:this.props.onRequestClose,className:rt()(Qe.a.closeButton,W()({},Qe.a.closeButtonFullScreen,n))},Object(z.h)("span",{className:Qe.a.closeButtonLabel,"aria-hidden":"true"},t("close"))),this.props.children)}}]),t}(z.Component);W()(ft,"defaultProps",{shouldCloseOnOverlayClick:!0});var pt=at(Object(ut.b)(ft)),ht=function(e){var t=e.useModal,n=e.children,r=G()(e,["useModal","children"]);return t?Object(z.h)(pt,r,n):Object(z.h)(dt,null,n)},mt=n(42),vt=n.n(mt),yt=n(394),gt=n.n(yt),bt=n(82),$t=n.n(bt),_t=n(395),kt=n.n(_t),wt=n(396),Ct=n.n(wt),xt={path:"/v2/socket.io",upgrade:!1,autoConnect:!1,transports:["websocket","polling"]},Ot=function(e){return Ct()(e,xt)},St=n(81),Et=n.n(St),jt=n(136),Tt=n.n(jt),Pt=at(function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.container.focus()}},{key:"render",value:function(){var e,t=this,n=this.props,r=n.title,o=n.subTitle,i=n.smaller,a=n.isFullScreen,s=n.className;return Object(z.h)("div",{className:rt()(Tt.a.titleWrapper,(e={},W()(e,Tt.a.smaller,i&&!a),W()(e,Tt.a.fullScreen,a),e),s)},Object(z.h)("div",{className:Tt.a.title},Object(z.h)("span",{className:Tt.a.titleSpan,role:"heading","aria-level":"1","aria-live":"assertive",tabindex:"-1",ref:function(e){return t.container=e}},r)),o&&Object(z.h)("div",{className:Tt.a.subTitle},o))}}]),t}(z.Component)),Nt=n(13),At=n.n(Nt),It=n(397),Dt=n.n(It),Rt=n(135),Mt=n.n(Rt),Ft=function(e){var t,n=e.className,r=e.textClassName,o=e.variants,i=void 0===o?[]:o,a=e.disabled,s=e.children,c=e.onClick,u=e.ariaLive,l=e.ariaBusy;return Object(z.h)("button",{type:"button","aria-live":u,"aria-busy":l,disabled:a,onClick:c,className:rt.a.apply(void 0,E()(t=[n,Mt.a.button]).call(t,ve()(C()(i).call(i,function(e){return Mt.a["button-"+e]})),[W()({},Mt.a.hoverDesktop,Z.h)]))},Object(z.h)("span",{className:rt()(r,Mt.a["button-text"])},s))},Lt=n(53),Ut=n.n(Lt),Bt=n(338),Wt=n.n(Bt),Ht=n(244),qt=n.n(Ht);function Vt(){var e=this,t=function(t){a()(e,t,{get:function(){var n=window[t];return"function"==typeof n?qt()(n).call(n,window):"window"===t?e:n},set:function(e){window[t]=e}})};for(var n in window)t(n)}Vt.prototype=Window.prototype;var Gt=window.onfidoSafeWindow8xmy484y87m239843m20=new Vt;n(499),delete window.onfidoSafeWindow8xmy484y87m239843m20;var zt=Gt.WoopraTracker,Kt=n(41),Yt=function(e){return e.substr(0,1).toUpperCase()+e.substr(1)},Xt=/([A-Z])/g,Jt=function(e){return e.replace(Xt," $1").split(" ")},Zt=Object(Kt.a)(_e,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return ge()(t).call(t,function(e,t){var n,r;return(n=E()(e)).call.apply(n,E()(r=[e]).call(r,ve()(ke(t))))},[])}),Qt=/[^\s_-]+/g,en=function(e){return(e||"").toLowerCase()},tn=function(e){return(e||"").toUpperCase()},nn=function(e){var t,n;return C()(t=Zt(C()(n=(e||"").match(Qt)||[]).call(n,Jt))).call(t,en)},rn=function(){return Math.random().toString(36).substring(7)},on=!1,an=window.location.hostname,sn=Wt.a.config("https://6e3dc0335efc49889187ec90288a84fd@sentry.io/109946",{environment:"production",release:"5.4.0",debug:!0,autoBreadcrumbs:{console:!1},breadcrumbCallback:function(e){var t,n,r,o="xhr"===e.category&&(n=e.data.url,r=/^https:\/\/[A-Za-z0-9.]*\.?onfido\.com$/g,!!n.match(r)),i="ui.click"===e.category&&vt()(t=e.message).call(t,".onfido-sdk-ui");return!!(o||i)&&e},whitelistUrls:[/onfido[A-z.]*\.min.js/g],shouldSendCallback:function(){return!0}}),cn=new zt("onfidojssdkwoopra"),un=function(e,t){on&&cn.track(e,function(e){return e?Object(we.d)(e,function(e){return"object"===O()(e)?Ut()(e):e}):null}(t))},ln=function(e,t){return un(function(e){return"screen_".concat(_e(e).join("_"))}(e),t)},dn=function(e,t){return function(n){function r(){var n,o,i;T()(this,r);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return i=I()(this,(n=R()(r)).call.apply(n,E()(o=[this]).call(o,s))),W()(F()(i),"trackScreen",function(e){for(var n,r,o,a=arguments.length,s=new Array(a>1?a-1:0),c=1;c<a;c++)s[c-1]=arguments[c];return(n=i.props).trackScreen.apply(n,E()(r=[E()(o=[]).call(o,ve()(ke(t)),ve()(ke(e)))]).call(r,s))}),W()(F()(i),"render",function(){return Object(z.h)(e,q()({},i.props,{trackScreen:i.trackScreen}))}),i}return U()(r,n),r}(z.Component)},fn=function(e,t){return function(n){function r(){var t,n,o;T()(this,r);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return o=I()(this,(t=R()(r)).call.apply(t,E()(n=[this]).call(n,a))),W()(F()(o),"render",function(){return Object(z.h)(e,o.props)}),o}return U()(r,n),N()(r,[{key:"componentDidMount",value:function(){this.props.trackScreen(t)}}]),r}(z.Component)},pn=function(e,t,n){return dn(function(e,t){return function(n){function r(){var t,n,o;T()(this,r);for(var i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return o=I()(this,(t=R()(r)).call.apply(t,E()(n=[this]).call(n,a))),W()(F()(o),"render",function(){return Object(z.h)(e,o.props)}),o}return U()(r,n),N()(r,[{key:"componentDidMount",value:function(){this.trackScreen(this.props)}},{key:"trackScreen",value:function(e){var n,r=e[t],o=r?[t,W()({},t,r)]:[];(n=this.props).trackScreen.apply(n,o)}},{key:"componentWillReceiveProps",value:function(e){this.props[t]!==e[t]&&this.trackScreen(e)}}]),r}(z.Component)}(e,n),t)},hn=function(e,t){sn.captureException(new Error(e),{extra:t})},mn=function(e){var t=cn.config("cookie_name"),n=cn.config("cookie_expire"),r=cn.config("cookie_path"),o=cn.config("cookie_domain");cn.docCookies.setItem(t,e,n,r,o),cn.cookie=e},vn=function(){return cn.cookie},yn=fn(Object(ut.b)(function(e){var t=e.title,n=e.descriptions,r=e.nextStep,o=e.translate,i=t||o("welcome.title"),a=n||function(e){return[e("welcome.description_p_1"),e("welcome.description_p_2")]}(o);return Object(z.h)("div",null,Object(z.h)(Pt,{title:i}),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)("div",{className:Dt.a.text},C()(a).call(a,function(e){return Object(z.h)("p",null,e)})),Object(z.h)(Ft,{onClick:r,variants:["centered","primary"]},o("welcome.next_button"))))})),gn=n(398),bn=n.n(gn),$n=n(90),_n=n.n($n),kn={passport:{hint:"passport_hint"},driving_licence:{hint:"driving_licence_hint"},national_identity_card:{hint:"national_identity_card_hint"}},wn=$()(kn),Cn=function(e){return"GBR"===tn(e)},xn={bank_building_society_statement:{eStatementAccepted:!0},utility_bill:{hint:"utility_bill_hint",warning:"utility_bill_warning",eStatementAccepted:!0},council_tax:{icon:"icon-letter",checkAvailableInCountry:Cn},benefit_letters:{hint:"benefits_letter_hint",icon:"icon-letter",checkAvailableInCountry:Cn},government_letter:{hint:"government_letter_hint",icon:"icon-letter",checkAvailableInCountry:function(e){return"GBR"!==tn(e)}}},On=$()(xn);function Sn(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}var En=function(){return!0},jn=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"getOptions",function(){var e,t=r.props,n=t.documentTypes,o=t.defaultOptions,i=t.country,a=void 0===i?"GBR":i,s=v()(e=o()).call(e,function(e){var t=e.checkAvailableInCountry;return(void 0===t?En:t)(a)}),c=Object(we.c)(n)?En:function(e){return n[e]},u=v()(s).call(s,function(e){var t=e.value;return c(t)});return u.length?u:s}),W()(F()(r),"handleSelect",function(e){var t=r.props,n=t.group,o=t.actions,i=t.nextStep;"proof_of_address"===n?o.setPoADocumentType(e):o.setIdDocumentType(e),i()}),W()(F()(r),"renderOption",function(e){var t;return Object(z.h)("li",null,Object(z.h)("button",{type:"button",onClick:function(){return r.handleSelect(e.value)},className:rt()(_n.a.option,W()({},_n.a.optionHoverDesktop,Z.h))},Object(z.h)("div",{className:E()(t="".concat(_n.a.icon," ")).call(t,_n.a[e.icon])}),Object(z.h)("div",{className:_n.a.content},Object(z.h)("div",{className:_n.a.optionMain},Object(z.h)("p",{className:_n.a.label},e.label),e.hint&&Object(z.h)("div",{className:_n.a.hint},e.hint),e.warning&&Object(z.h)("div",{className:_n.a.warning},e.warning)),e.eStatementAccepted&&Object(z.h)("div",{className:_n.a.tag},r.props.translate("document_selector.proof_of_address.estatements_accepted")))))}),r}return U()(t,e),N()(t,[{key:"render",value:function(){var e=this.getOptions(),t=this.props,n=t.className,r=t.translate;return Object(z.h)("ul",{"aria-label":r("accessibility.document_types"),className:rt()(_n.a.list,n)},C()(e).call(e,this.renderOption))}}]),t}(z.Component),Tn=Object(ut.b)(jn),Pn=function(e){return function(t){return Object(z.h)(Tn,q()({},t,{defaultOptions:function(){var n=$()(e),r=t.group;return C()(n).call(n,function(n){var o,i,s=e[n],u=s.icon,d=void 0===u?"icon-".concat(nn(n).join("-")):u,p=s.hint,m=s.warning;return function(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=Sn(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=Sn(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}({},G()(s,["icon","hint","warning"]),{icon:d,value:n,label:t.translate(n),hint:p?t.translate(E()(o="document_selector.".concat(r,".")).call(o,p)):"",warning:m?t.translate(E()(i="document_selector.".concat(r,".")).call(i,m)):""})})}}))}},Nn=Pn(kn),An=Pn(xn);function In(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}var Dn,Rn=function(e){return function(t){var n=t.translate,r=t.country,o="proof_of_address"===e?An:Nn;return Object(z.h)("div",{className:bn.a.wrapper},Object(z.h)(Pt,{title:n("document_selector.".concat(e,".title"),{country:r&&"GBR"!==r?"":"UK"}),subTitle:n("document_selector.".concat(e,".hint"))}),Object(z.h)(o,function(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=In(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=In(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}({},t,{group:e})))}},Mn=fn(Object(ut.b)(Rn("proof_of_address")),"type_select"),Fn=fn(Object(ut.b)(Rn("identity")),"type_select"),Ln=n(399),Un=n.n(Ln),Bn=n(262),Wn=n.n(Bn),Hn=n(400),qn=n.n(Hn),Vn=n(146),Gn=n.n(Vn),zn=(n(505),n(507),function(e){var t=function(e){for(var t=atob(e.split(",")[1]),n=e.split(",")[0].split(":")[1].split(";")[0],r=new Uint8Array(t.length),o=0;o<t.length;o++)r[o]=t.charCodeAt(o);return{integerArray:r,mimeString:n}}(e);return new Blob([t.integerArray],{type:t.mimeString})}),Kn="image/".concat(qn.a?"webp":"jpeg"),Yn=(Dn=Kn,function(e,t){return t(e.toDataURL(Dn))}),Xn=function(e,t,n,r){var o=function(){return function(e,t,n){var r=new FileReader;r.readAsDataURL(e),r.onload=function(){t(r.result)},r.onerror=function(e){console.warn("File Reading Error: ",e),n(e)}}(e,t,n)};return Zn(["pdf"],e)?o():function(e,t,n,r){var o=r||{},i=o.maxWidth,a=void 0===i?960:i,s=o.maxHeight,c=void 0===s?960:s,u=o.orientation,l=void 0===u||u;return Gn()(e,function(e){"error"===e.type?n(e):t(e)},{maxWidth:a,maxHeight:c,orientation:l})}(e,function(e){return Yn(e,t)},o,r)},Jn=function(e){return e.type.split("/")[1]},Zn=function(e,t){return Et()(e).call(e,function(e){return e===Jn(t)})},Qn=function(e,t){var n=e&&e.getCanvas();if(n){var r=tr(e.stream);!function(e,t){if(!HTMLCanvasElement.prototype.toBlob){var n=e.toDataURL();return t(zn(n))}e.toBlob(t,"image/png")}(n,function(e){return t(e,r)})}else console.error("webcam canvas is null")},er=function(e,t){t({blob:e.getVideoBlob(),sdkMetadata:tr(e.stream)})},tr=function(e){if(e){var t=e.getVideoTracks()[0]||{},n=e.getAudioTracks()[0]||{};return{camera_name:t.label,microphone_name:n.label}}return{}},nr=n(246),rr=n.n(nr),or=at(function(e){var t,n=e.isFullScreen,r=e.isWithoutHole;return Object(z.h)("div",{className:rt()((t={},W()(t,rr.a.fullScreenOverlay,n),W()(t,rr.a.isWithoutHole,r),t))},Object(z.h)("span",{className:rr.a.face}))}),ir=function(){return Object(z.h)("span",{className:rr.a.rectangle})},ar=n(401),sr=n.n(ar),cr={INVALID_CAPTURE:{message:"errors.invalid_capture.message",instruction:"errors.invalid_capture.instruction"},INVALID_TYPE:{message:"errors.invalid_type.message",instruction:"errors.invalid_type.instruction"},UNSUPPORTED_FILE:{message:"errors.unsupported_file.message",instruction:"errors.unsupported_file.instruction"},INVALID_SIZE:{message:"errors.invalid_size.message",instruction:"errors.invalid_size.instruction"},NO_FACE_ERROR:{message:"errors.no_face.message",instruction:"errors.no_face.instruction"},MULTIPLE_FACES_ERROR:{message:"errors.multiple_faces.message",instruction:"errors.multiple_faces.instruction"},SERVER_ERROR:{message:"errors.server_error.message",instruction:"errors.server_error.instruction"},GLARE_DETECTED:{message:"errors.glare_detected.message",instruction:"errors.glare_detected.instruction"},SMS_FAILED:{message:"errors.sms_failed.message",instruction:"errors.sms_failed.instruction"},SMS_OVERUSE:{message:"errors.sms_overuse.message",instruction:"errors.sms_overuse.instruction"},CAMERA_NOT_WORKING:{message:"errors.camera_not_working.message",instruction:"errors.camera_not_working.instruction"},CAMERA_NOT_WORKING_NO_FALLBACK:{message:"errors.camera_not_working.message",instruction:"errors.camera_not_working_no_fallback.instruction"},CAMERA_INACTIVE:{message:"errors.camera_inactive.message",instruction:"errors.camera_inactive.instruction"},CAMERA_INACTIVE_NO_FALLBACK:{message:"errors.camera_inactive.message",instruction:"errors.camera_inactive_no_fallback.instruction"},LIVENESS_TIMEOUT:{message:"errors.liveness_timeout.message",instruction:"errors.liveness_timeout.instruction"},GENERIC_CLIENT_ERROR:{message:"errors.generic_client_error.message",instruction:"errors.generic_client_error.instruction"},FORBIDDEN_CLIENT_ERROR:{message:"errors.forbidden_client_error.message",instruction:"errors.forbidden_client_error.instruction"},INTERRUPTED_FLOW_ERROR:{message:"errors.interrupted_flow_error.message",instruction:"errors.interrupted_flow_error.instruction",icon:"flowInterruptedIcon"}},ur=n(100),lr=n.n(ur),dr=function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.props.focusOnMount&&this.container&&this.container.focus()}},{key:"render",value:function(){var e,t=this,n=this.props,r=n.role,o=n.className,i=n.error,a=n.translate,s=n.withArrow,c=n.renderMessage,u=void 0===c?Kt.b:c,l=n.renderInstruction,d=void 0===l?Kt.b:l,f=n.isDismissible,p=n.onDismiss,h=void 0===p?Kt.d:p,m=cr[i.name],v=m.message,y=m.instruction,g="error"===i.type?"error":"warning";return Object(z.h)("div",{role:r,ref:function(e){return t.container=e},tabIndex:-1,className:rt()(lr.a["container-".concat(g)],o)},s&&Object(z.h)("div",{className:rt()(lr.a.roundedTriangle,lr.a["".concat(g,"Triangle")])}),Object(z.h)("div",null,Object(z.h)("div",{className:lr.a.title},Object(z.h)("span",{className:lr.a["title-icon-".concat(g)]}),Object(z.h)("span",{role:"heading",className:lr.a["title-text"]},u(a(v)))),Object(z.h)("p",{className:lr.a.instruction},Object(z.h)("span",{className:lr.a["instruction-text"]},d(a(y))))),f&&Object(z.h)("button",{type:"button","aria-label":a("accessibility.dismiss_alert"),onClick:h,className:E()(e="".concat(lr.a.dismiss," ")).call(e,At.a[g])}))}}]),t}(z.Component),fr=Object(ut.b)(dr),pr=n(247),hr=n.n(pr),mr=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"state",{isDimissed:!1}),W()(F()(r),"trackFallbackClick",function(){"warning"===r.props.error.type&&r.props.trackScreen("fallback_triggered")}),W()(F()(r),"handleDismiss",function(){return r.setState({isDimissed:!0})}),W()(F()(r),"render",function(){var e=r.props,t=e.error,n=e.hasBackdrop,o=e.renderFallback,i=e.isDismissible;return!r.state.isDimissed&&Object(z.h)("div",{className:rt()(hr.a.errorContainer,hr.a["".concat(t.type,"ContainerType")],W()({},hr.a.errorHasBackdrop,n))},Object(z.h)(fr,{role:"alertdialog",className:hr.a.errorMessage,error:t,focusOnMount:!0,isDismissible:i,onDismiss:r.handleDismiss,renderInstruction:function(e){return Object(Z.i)(e,function(e){var t=e.text;return o(t,r.trackFallbackClick)})}}))}),r}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){"error"===this.props.error.type&&this.props.trackScreen("camera_error")}},{key:"componentDidUpdate",value:function(e){e.error.name!==this.props.error.name&&this.setState({isDimissed:!1})}}]),t}(z.Component),vr=n(148),yr=n.n(vr),gr=fn(Object(ut.b)(function(e){var t,n=e.onNext,r=e.translate;return Object(z.h)("div",{className:At.a.fullHeightContainer},Object(z.h)(Pt,{title:r("webcam_permissions.allow_access"),subTitle:r("webcam_permissions.enable_webcam_for_selfie")}),Object(z.h)("div",{className:E()(t="".concat(At.a.thickWrapper," ")).call(t,yr.a.bodyWrapper)},Object(z.h)("div",{className:yr.a.image},Object(z.h)("div",{className:yr.a.graphic})),Object(z.h)("div",{className:yr.a.buttonInstructions},Object(z.h)("p",{className:yr.a.instructions},r("webcam_permissions.click_allow")),Object(z.h)(Ft,{variants:["centered","primary"],onClick:n},r("webcam_permissions.enable_webcam")))))})),br=n(137),$r=n.n(br),_r=fn(Object(ut.b)(function(e){var t,n=e.translate;return Object(z.h)("div",{className:At.a.fullHeightContainer},Object(z.h)(Pt,{title:n("webcam_permissions.access_denied"),subTitle:n("webcam_permissions.recover_access")}),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)("div",{className:$r.a.instructions},Object(z.h)("span",{className:$r.a.recovery},n("webcam_permissions.recovery")),Object(z.h)("p",{className:$r.a.instructionsTitle},n("webcam_permissions.follow_steps")),Object(z.h)("ol",{className:$r.a.steps},C()(t=["grant_access","refresh_page"]).call(t,function(e){return Object(z.h)("li",{key:e,className:$r.a.step},n("webcam_permissions.".concat(e)))})))),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)(Ft,{className:$r.a.button,variants:["primary"],onClick:function(){return window.location.reload()}},n("webcam_permissions.refresh"))))})),kr=["PermissionDeniedError","NotAllowedError","NotFoundError"],wr=n(248),Cr=n.n(wr),xr=Object(Kt.a)(ut.b,function(e){var t,n;return n=t=function(t){function n(){var e,t,r;T()(this,n);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(n)).call.apply(e,E()(t=[this]).call(t,i))),W()(F()(r),"state",{hasError:!1}),W()(F()(r),"handleFailure",function(e){r.setState({hasError:!0}),r.props.onError(e)}),W()(F()(r),"generalError",function(){return{name:r.props.isUploadFallbackDisabled?"CAMERA_NOT_WORKING_NO_FALLBACK":"CAMERA_NOT_WORKING",type:"error"}}),r}return U()(n,t),N()(n,[{key:"render",value:function(){var t=this.state.hasError;return Object(z.h)(e,q()({},this.props,t?{renderError:Object(z.h)(mr,q()({},this.props,{error:this.generalError()}))}:{},{onFailure:this.handleFailure}))}}]),n}(z.Component),W()(t,"defaultProps",{onError:function(){}}),n},function(e){var t,n;return n=t=function(t){function n(){var e,t,r;T()(this,n);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(n)).call.apply(e,E()(t=[this]).call(t,i))),W()(F()(r),"state",{hasGrantedPermission:null,hasSeenPermissionsPrimer:!1,checkingWebcamPermissions:!0}),W()(F()(r),"setPermissionsPrimerSeen",function(){r.setState({hasSeenPermissionsPrimer:!0})}),W()(F()(r),"handleUserMedia",function(){r.setState({hasGrantedPermission:!0}),r.props.onUserMedia()}),W()(F()(r),"handleWebcamFailure",function(e){vt()(kr).call(kr,e.name)?r.setState({hasGrantedPermission:!1}):r.props.onFailure()}),r}return U()(n,t),N()(n,[{key:"componentDidMount",value:function(){var e=this;Object(Z.b)(function(t){return e.setState({checkingWebcamPermissions:!1,hasGrantedPermission:t||null})})}},{key:"render",value:function(){var t=this.state,n=t.hasSeenPermissionsPrimer,r=t.hasGrantedPermission,o=t.checkingWebcamPermissions,i=this.props.trackScreen;return o?null:!1===r?Object(z.h)(_r,{trackScreen:i}):r||n?Object(z.h)(e,q()({},this.props,{hasGrantedPermission:r,onUserMedia:this.handleUserMedia,onFailure:this.handleWebcamFailure})):Object(z.h)(gr,q()({trackScreen:i},{onNext:this.setPermissionsPrimerSeen}))}}]),n}(z.Component),W()(t,"defaultProps",{onUserMedia:function(){},onFailure:function(){}}),n})(function(e){var t=e.className,n=e.containerClassName,r=e.renderTitle,o=e.renderError,i=e.children,a=e.webcamRef,s=e.onUserMedia,c=e.onFailure,u=e.video,l=e.translate;return Object(z.h)("div",{className:rt()(Cr.a.camera,t)},r,Object(z.h)("div",{className:rt()(Cr.a.container,n)},Object(z.h)("div",{className:Cr.a.webcamContainer,role:"group","aria-describedby":"cameraViewAriaLabel"},Object(z.h)(sr.a,q()({className:Cr.a.video,audio:!!u,height:720,facingMode:"user"},{onUserMedia:s,ref:a,onFailure:c}))),Object(z.h)("div",{id:"cameraViewAriaLabel","aria-label":l("accessibility.camera_view")}),i,o))}),Or=function(e,t,n){var r=e.payload,o=e.endpoint,i=e.contentType,a=e.token,s=new XMLHttpRequest;s.open("POST",o),i&&s.setRequestHeader("Content-Type",i),s.setRequestHeader("Authorization",a),s.onload=function(){200===s.status||201===s.status?t(JSON.parse(s.response)):n(s)},s.onerror=function(){return n(s)},s.send(r)},Sr=function(e,t,n,r,o){var i="".concat(t,"/validate_document");Or({payload:e,endpoint:i,token:n,contentType:"application/json"},r,function(e){return function(e,t){var n,r=e.status,o=e.response;hn(E()(n="".concat(r," - ")).call(n,o)),t({status:r,response:o})}(e,o)})},Er=3,jr={name:"SERVER_ERROR",type:"error"},Tr=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"webcam",null),W()(F()(r),"captureIds",[]),W()(F()(r),"state",{hasError:!1}),W()(F()(r),"screenshot",function(){r.captureIds.length<Er?Qn(r.webcam,function(e){return r.handleScreenshotBlob(e)}):console.warn("Screenshotting is slow, waiting for responses before uploading more")}),W()(F()(r),"handleScreenshotBlob",function(e){return Xn(e,function(t){return r.handleScreenshot(e,t)},function(e){return console.error("Error converting screenshot to base64",e)},{maxWidth:200})}),W()(F()(r),"handleScreenshot",function(e,t){if(t){var n=rn();r.captureIds.push(n),r.validate(t,n,function(o){return o?r.props.onValidCapture({blob:e,base64:t,id:n}):null})}}),W()(F()(r),"validate",function(e,t,n){var o=r.props,i=o.urls,a=o.token,s=i.detect_document_url,c=Ut()({image:e,id:t});Sr(c,s,a,function(e){var o=e.valid;r.setProcessed(t),n(o)},r.handleValidationError)}),W()(F()(r),"handleValidationError",function(e){r.setState({hasError:!0}),r.props.triggerOnError(e),r.props.onError()}),r}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.start()}},{key:"componentWillUnmount",value:function(){this.stop()}},{key:"start",value:function(){this.stop(),this.interval=Un()(Wn.a).call(Wn.a,1e3,this.screenshot)}},{key:"stop",value:function(){Wn.a.stop(this.interval)}},{key:"setProcessed",value:function(e){var t;this.captureIds=v()(t=this.captureIds).call(t,function(t){return t===e})}},{key:"render",value:function(){var e=this,t=this.state.hasError,n=this.props,r=n.trackScreen,o=n.renderFallback;return Object(z.h)("div",null,Object(z.h)(xr,q()({},this.props,{webcamRef:function(t){return e.webcam=t},renderError:t?Object(z.h)(mr,q()({error:jr},{trackScreen:r,renderFallback:o})):void 0}),Object(z.h)(ir,null)))}}]),t}(z.Component),Pr=n(48),Nr=n.n(Pr),Ar=n(339),Ir=n.n(Ar),Dr=function(){},Rr=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"handleClick",function(){r.input&&r.input.click(),r.props.onClick()}),W()(F()(r),"handleChange",function(e){r.input&&r.props.onChange(r.input.files[0]),e.currentTarget.value=""}),W()(F()(r),"handleDragOverEvent",function(e){e.preventDefault()}),W()(F()(r),"getFileFromDragEvent",function(e){var t=e.dataTransfer,n=t.items,r=t.files;return n?n[0].getAsFile():r?r[0]:void 0}),W()(F()(r),"handleDropEvent",function(e){e.preventDefault();var t=r.getFileFromDragEvent(e);t&&r.props.onChange(t)}),W()(F()(r),"render",function(){var e=r.props,t=e.children,n=e.className,o=(e.onClick,e.onChange,G()(e,["children","className","onClick","onChange"]));return Object(z.h)("span",{onClick:r.handleClick,className:rt()(Ir.a.container,n),onDrop:r.handleDropEvent,onDragOver:r.handleDragOverEvent},t,Object(z.h)("input",q()({type:"file",className:Ir.a.input,ref:function(e){return r.input=e},onChange:r.handleChange},o)))}),r}return U()(t,e),t}(z.Component);W()(Rr,"defaultProps",{children:null,className:"",onClick:Dr,onChange:Dr});var Mr=n(126),Fr=n.n(Mr),Lr=Object(ut.b)(function(e){var t=e.translate,n=e.changeFlowTo;return Object(z.h)("a",{href:"#",className:Fr.a.switchClickableArea,onClick:Object(Z.j)(function(){return n("crossDeviceSteps")})},Object(z.h)("div",{className:Fr.a.container},Object(z.h)("div",{className:Fr.a.icon}),Object(z.h)("div",{className:Fr.a.copy},Object(z.h)("div",{className:Fr.a.header},t("cross_device.switch_device.header")),Object(z.h)("p",{className:Fr.a.submessage},t("cross_device.switch_device.submessage"))),Object(z.h)("div",{className:Fr.a.chevron})))}),Ur=Object(ut.b)(function(e){var t,n=e.error,r=e.translate,o=cr[n.name],i=o.message,a=o.instruction;return Object(z.h)("div",{className:Nr.a.error},E()(t="".concat(r(i)," ")).call(t,r(a)))}),Br=Object(ut.b)(function(e){var t=e.onFileSelected,n=e.children,r=e.isPoA,o=e.translate;return Object(z.h)("div",{className:rt()(Nr.a.uploadArea,Nr.a.uploadAreaMobile)},n,Object(z.h)("div",{className:Nr.a.buttons},Object(z.h)(Rr,{className:Nr.a.buttonContainer,onChange:t,accept:"image/*",capture:!0},Object(z.h)(Ft,{variants:["centered",r?"secondary":"primary"],className:Nr.a.button},o("capture.take_photo"))),r&&Object(z.h)(Rr,{onChange:t,className:Nr.a.buttonContainer},Object(z.h)(Ft,{variants:["centered","primary"],className:Nr.a.button},o("capture.upload_".concat(Z.h?"file":"document"))))))}),Wr=Object(ut.b)(function(e){var t=e.onFileSelected,n=e.translate,r=e.children;return Object(z.h)(Rr,{className:rt()(Nr.a.uploadArea,Nr.a.uploadAreaDesktop),onChange:t},r,Object(z.h)("div",{className:Nr.a.buttons},Object(z.h)(Ft,{variants:["centered","secondary"],className:Nr.a.button},n("capture.upload_".concat(Z.h?"file":"document")))))}),Hr=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"setError",function(e){return r.setState({error:{name:e}})}),W()(F()(r),"findError",function(e){var t=r.props,n=t.acceptedTypes,o=t.maxSize;return Object(we.a)({INVALID_TYPE:function(e){return!Zn(n,e)},INVALID_SIZE:function(e){return e.size>o}},function(t){return t(e)})}),W()(F()(r),"handleFileSelected",function(e){var t=r.findError(e);return t?r.setError(t):r.props.onUpload(e)}),r}return U()(t,e),N()(t,[{key:"render",value:function(){var e,t,n=this.props,r=n.title,o=n.subTitle,i=n.changeFlowTo,a=n.allowCrossDeviceFlow,s=n.documentType,c=n.poaDocumentType,u=n.instructions,l=!!c,d=function(e){return Object(we.a)({proof_of_address:On,identity:wn},function(t){return vt()(t).call(t,e)})}(c||s)||"face",f=Z.h?Wr:Br,p=this.state.error;return Object(z.h)("div",{className:rt()(At.a.fullHeightContainer,Nr.a.container)},Object(z.h)(Pt,{title:r,subTitle:o}),Object(z.h)("div",{className:rt()(Nr.a.uploaderWrapper,W()({},Nr.a.crossDeviceClient,!a))},a&&Object(z.h)(Lr,{changeFlowTo:i}),Object(z.h)(f,q()({onFileSelected:this.handleFileSelected},{isPoA:l}),Object(z.h)("div",{className:Nr.a.instructions},Object(z.h)("span",{className:rt()(At.a.icon,Nr.a.icon,Nr.a["".concat((e=d,ge()(t=nn(e)).call(t,function(e,t,n){var r;return E()(r="".concat(e)).call(r,(n>0?Yt:Kt.b)(t))},"")),"Icon")])}),p?Object(z.h)(Ur,{error:p}):Object(z.h)("div",{className:Nr.a.instructionsCopy},u)))))}}]),t}(z.Component);W()(Hr,"defaultProps",{onUpload:function(){},acceptedTypes:["jpg","jpeg","png","pdf"],maxSize:1e7});var qr=pn(Hr,"file_upload","error"),Vr=n(96),Gr=n.n(Vr),zr={terms:"https://onfido.com/termsofuse",privacy:"https://onfido.com/privacy"},Kr=function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){ln(["privacy"])}},{key:"render",value:function(){var e,t=this.props,n=t.translate,r=t.parseTranslatedTags,o=t.back,i=t.actions,a=n("privacy.title");return Object(z.h)("div",{className:Gr.a.privacy},Object(z.h)(Pt,{title:a}),Object(z.h)("div",{className:E()(e="".concat(At.a.thickWrapper," ")).call(e,Gr.a.content)},Object(z.h)("ul",{className:Gr.a.list},Object(z.h)("li",{className:Gr.a.item},n("privacy.item_1")),Object(z.h)("li",{className:Gr.a.item},n("privacy.item_2")),Object(z.h)("li",{className:Gr.a.item},n("privacy.item_3"))),Object(z.h)("div",null,Object(z.h)("div",{className:Gr.a.smallPrint},r("privacy.small_print",function(e){return Object(z.h)("a",{href:zr[e.type],target:"_blank"},e.text)})),Object(z.h)("div",{className:Gr.a.actions},Object(z.h)(Ft,{onClick:o,className:Gr.a.decline},n("privacy.decline")),Object(z.h)(Ft,{className:Gr.a.primary,variant:["primary"],onClick:i.acceptTerms},n("privacy.continue"))))))}}]),t}(z.Component),Yr=(Object(ut.b)(Kr),Kt.b),Xr=n(260),Jr=n.n(Xr),Zr=function(e){return function(t){function n(){var e,t,r;T()(this,n);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(n)).call.apply(e,E()(t=[this]).call(t,i))),W()(F()(r),"state",{hasCamera:null}),W()(F()(r),"checkCameraSupport",function(){return Object(Z.a)(function(e){return r.setState({hasCamera:e})})}),r}return U()(n,t),N()(n,[{key:"componentDidMount",value:function(){this.cameraChecker=Jr()(this.checkCameraSupport,2e3),this.checkCameraSupport()}},{key:"componentWillUnmount",value:function(){clearInterval(this.cameraChecker)}},{key:"render",value:function(){return null===this.state.hasCamera?null:Object(z.h)(e,q()({},this.props,{hasCamera:this.state.hasCamera}))}}]),n}(ot.PureComponent)},Qr=function(e){return function(t){function n(){var e,t,r;T()(this,n);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(n)).call.apply(e,E()(t=[this]).call(t,i))),W()(F()(r),"attemptForwardToCrossDevice",function(){var e=r.props,t=e.hasCamera,n=e.forceCrossDevice,o=e.changeFlowTo,i="face"===e.componentsList[e.step].step.type&&!t;if(i&&console.warn("Camera required: Either device has no camera or browser is unable to detect camera"),i||n){if(r.props.mobileFlow)return void console.warn("Already on cross device flow but no camera detected");if(r.props.mobileFlow&&!r.props.uploadFallback)return void console.error("Unable to complete the flow: upload fallback not allowed");if(!Z.h)return;o("crossDeviceSteps",0,!0)}}),r}return U()(n,t),N()(n,[{key:"componentDidMount",value:function(){this.attemptForwardToCrossDevice()}},{key:"componentDidUpdate",value:function(e){var t=this,n=["currentStep","mobileFlow","hasCamera","allowCrossDeviceFlow","forceCrossDevice"];Et()(n).call(n,function(n){return e[n]!==t.props[n]})&&this.props.allowCrossDeviceFlow&&this.attemptForwardToCrossDevice()}},{key:"render",value:function(){return Object(z.h)(e,this.props)}}]),n}(z.Component)},eo=n(261),to=n.n(eo);function no(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function ro(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=no(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=no(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var oo=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"handleCapture",function(e){var t=r.props,n=t.isPoA,o=t.documentType,i=t.poaDocumentType,a=t.actions,s=t.side,c=t.nextStep;a.createCapture(ro({},e,{method:"document",documentType:n?i:o,side:s,id:e.id||rn()})),c()}),W()(F()(r),"handleUpload",function(e){return r.handleCapture({blob:e})}),W()(F()(r),"handleError",function(){return r.props.actions.deleteCapture()}),W()(F()(r),"renderUploadFallback",function(e){return Object(z.h)(Rr,{onChange:r.handleUpload,accept:"image/*",capture:!0},e)}),W()(F()(r),"renderCrossDeviceFallback",function(e){return Object(z.h)("span",{onClick:function(){return r.props.changeFlowTo("crossDeviceSteps")}},e)}),r}return U()(t,e),N()(t,[{key:"render",value:function(){var e,t=this.props,n=t.useWebcam,r=t.hasCamera,o=t.documentType,i=t.poaDocumentType,a=t.isPoA,s=t.side,c=t.translate,u=t.subTitle,l=E()(e="capture.".concat(a?i:o,".")).call(e,s),d=c("".concat(l,".title")),f=ro({},this.props,{onError:this.handleError});return n&&r?Object(z.h)(Tr,q()({},f,{renderTitle:Object(z.h)(Pt,q()({title:d,subTitle:u},{smaller:!0})),renderFallback:Z.h?this.renderCrossDeviceFallback:this.renderUploadFallback,containerClassName:to.a.documentContainer,onValidCapture:this.handleCapture})):Object(z.h)(qr,q()({},f,{onUpload:this.handleUpload,title:c("".concat(l,".upload_title"))||d,instructions:c("".concat(l,".instructions"))}))}}]),t}(z.Component);W()(oo,"defaultProps",{side:"front",forceCrossDevice:!1});var io=Object(Kt.a)(dn,ut.b,Yr,Zr,Qr)(oo),ao=n(73),so=n.n(ao),co=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"state",{hasTimedOut:!1}),W()(F()(r),"clearInactivityTimeout",function(){return clearTimeout(r.timeoutId)}),r}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){var e=this;this.timeoutId||(this.clearInactivityTimeout(),this.timeoutId=$t()(function(){return e.setState({hasTimedOut:!0})},1e3*this.props.seconds))}},{key:"componentWillUnmount",value:function(){this.clearInactivityTimeout()}},{key:"componentDidUpdate",value:function(e,t){!t.hasTimedOut&&this.state.hasTimedOut&&this.props.onTimeout()}},{key:"render",value:function(){return null}}]),t}(z.Component);W()(co,"defaultProps",{seconds:0,onTimeout:function(){}});var uo=n(340),lo=n.n(uo);function fo(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}var po=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),s=0;s<o;s++)i[s]=arguments[s];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"webcam",null),W()(F()(r),"snapshotIntervalRef",null),W()(F()(r),"state",{hasBecomeInactive:!1,hasCameraError:!1,snapshotBuffer:[]}),W()(F()(r),"handleTimeout",function(){return r.setState({hasBecomeInactive:!0})}),W()(F()(r),"handleCameraError",function(){return r.setState({hasCameraError:!0})}),W()(F()(r),"handleSelfie",function(e,t){var n={blob:e,sdkMetadata:t,filename:"applicant_selfie.".concat(Jn(e))},o=r.state.snapshotBuffer[0]||r.state.snapshotBuffer[1],i=r.props.useMultipleSelfieCapture?function(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=fo(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=fo(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}({snapshot:o},n):n;r.props.onCapture(i)}),W()(F()(r),"handleSnapshot",function(e,t){r.setState(function(n){return{snapshotBuffer:[so()(n.snapshotBuffer,2)[1],{blob:e,sdkMetadata:t,filename:"applicant_snapshot.".concat(Jn(e))}]}})}),W()(F()(r),"takeSnapshot",function(){return r.webcam&&Qn(r.webcam,r.handleSnapshot)}),W()(F()(r),"takeSelfie",function(){return Qn(r.webcam,r.handleSelfie)}),W()(F()(r),"setupSnapshots",function(){r.props.useMultipleSelfieCapture&&(un("Starting Multiple Selfie Capture"),$t()(r.takeSnapshot,r.props.snapshotInterval/4),r.snapshotIntervalRef=Jr()(r.takeSnapshot,r.props.snapshotInterval))}),r}return U()(t,e),N()(t,[{key:"componentWillUnmount",value:function(){this.snapshotIntervalRef&&clearInterval(this.snapshotIntervalRef)}},{key:"render",value:function(){var e=this,t=this.props,n=t.translate,r=t.trackScreen,o=t.renderFallback,i=t.inactiveError,a=this.state,s=a.hasBecomeInactive,c=a.hasCameraError;return Object(z.h)(xr,q()({},this.props,{webcamRef:function(t){return e.webcam=t},onUserMedia:this.setupSnapshots,onError:this.handleCameraError,renderError:s?Object(z.h)(mr,q()({trackScreen:r,renderFallback:o},{error:i,isDismissible:!0})):null}),!c&&Object(z.h)(co,{seconds:10,onTimeout:this.handleTimeout}),Object(z.h)(ct,null),Object(z.h)(or,null),Object(z.h)("div",{className:lo.a.actions},Object(z.h)("button",{type:"button","aria-label":n("accessibility.shutter"),disabled:c,onClick:this.takeSelfie,className:lo.a.btn})))}}]),t}(z.Component),ho=n(39),mo=n.n(ho),vo=fn(Object(ut.b)(function(e){var t,n=e.translate,r=e.parseTranslatedTags,o=e.continueFlow;return Object(z.h)("div",{className:At.a.fullHeightContainer},Object(z.h)(Pt,{title:n("capture.liveness.intro.title")}),Object(z.h)("div",{className:rt()(At.a.thickWrapper,mo.a.introCopy)},Object(z.h)("ul",{className:mo.a.introBullets,"aria-label":n("cross_device.selfie_video_actions")},C()(t=["two_actions","speak_out_loud"]).call(t,function(e){return Object(z.h)("li",{key:e,className:mo.a.introBullet},Object(z.h)("span",{className:rt()(mo.a.introIcon,mo.a["".concat(e,"Icon")])}),r("capture.liveness.intro.".concat(e),function(e){var t=e.text;return Object(z.h)("span",{className:mo.a.bolder},t)}))}))),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)(Ft,{variants:["primary","centered"],onClick:o},n("capture.liveness.intro.continue"))))}),"video_intro"),yo=function(e){var t,n=e.text,r=e.onClick;return Object(z.h)("button",{type:"button",className:E()(t="".concat(Mt.a.fallbackButton," ")).call(t,At.a.warning),onClick:r},n)},go=function(e){var t=e.title,n=e.renderInstructions;return Object(z.h)("div",null,Object(z.h)(Pt,{title:t,className:mo.a.challengeTitle}),Object(z.h)("div",{"aria-level":"2",className:mo.a.challengeDescription},n()))},bo=Object(ut.b)(function(e){var t=e.translate,n=e.query;return Object(z.h)(go,{title:t("capture.liveness.challenges.recite"),renderInstructions:function(){return Object(z.h)("span",{className:mo.a.recite},n.join(" – "))}})}),$o=Object(ut.b)(function(e){var t=e.translate,n=e.query,r=void 0===n?"":n,o=r.replace("turn","").toLowerCase();return Object(z.h)(go,{title:t("capture.liveness.challenges.movement",{side:t("capture.liveness.challenges.".concat(o))}),renderInstructions:function(){return Object(z.h)("span",{className:rt()(mo.a.movement,mo.a["movement-".concat(r)])})}})}),_o=function(e){return Object(Z.f)(e.type,{recite:function(){return Object(z.h)(bo,e)},movement:function(){return Object(z.h)($o,e)}})};function ko(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}var wo=Object(ut.b)(function(e){var t=e.onTimeout,n=e.onStop,r=e.onNext,o=e.currentChallenge,i=e.isLastChallenge,s=e.hasError,u=e.disableInteraction,d=e.translate;return Object(z.h)("div",null,!s&&Object(z.h)(co,{key:"recording",seconds:20,onTimeout:t}),Object(z.h)("div",{className:mo.a.caption},Object(z.h)("div",null,Object(z.h)("div",{className:mo.a.recordingIndicator},Object(z.h)("span",{role:"status",className:mo.a.recordingIndicatorText},d("capture.liveness.recording"))),Object(z.h)(_o,function(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=ko(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=ko(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}({},o)))),Object(z.h)("div",{className:mo.a.actions},Object(z.h)("div",{className:mo.a.captureActionsHint},d("capture.liveness.challenges.done_".concat(i?"stop":"next"))),i?Object(z.h)("button",{type:"button","aria-label":d("accessibility.stop_recording"),disabled:u,onClick:n,className:rt()(mo.a.btn,mo.a.stopRecording)}):Object(z.h)(Ft,{variants:["centered","primary"],disabled:u,onClick:r},d("capture.liveness.challenges.next"))))}),Co=Object(ut.b)(function(e){var t=e.translate,n=e.onStart,r=e.hasError,o=e.disableInteraction,i=e.onTimeout;return Object(z.h)("div",null,r?null:Object(z.h)(co,{key:"notRecording",seconds:12,onTimeout:i}),Object(z.h)("div",{className:mo.a.actions},Object(z.h)("div",{className:rt()(mo.a.captureActionsHint,mo.a.recordAction)},t("capture.liveness.press_record")),Object(z.h)("button",{type:"button","aria-label":t("accessibility.start_recording"),disabled:o,onClick:n,className:rt()(mo.a.btn,mo.a.startRecording)})))}),xo=n(341),Oo=n.n(xo),So=Object(Kt.a)(ut.b)(function(e){var t=e.translate;return Object(z.h)("div",{className:Oo.a.loader,"aria-live":"assertive",tabindex:"-1",autoFocus:!0,"aria-label":t("loading")},Object(z.h)("div",{className:Oo.a.inner},Object(z.h)("div",null),Object(z.h)("div",null),Object(z.h)("div",null)))});function Eo(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function jo(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=Eo(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=Eo(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var To=function(e,t){var n=e.response,r=e.status;try{t({status:r,response:JSON.parse(n)})}catch(e){t({status:r,response:{}})}},Po=function(e,t,n,r,o){var i=e,a=i.validations;e=jo({},G()(i,["validations"]),{sdk_validations:Ut()(a)});var s="".concat(t,"/v2/documents");Do(s,e,n,r,o)},No=function(e,t,n,r,o){var i=e.sdkMetadata,a=void 0===i?{}:i,s=G()(e,["sdkMetadata"]),c="".concat(t,"/v2/live_photos");Do(c,jo({},s,{sdk_metadata:Ut()(a)}),n,r,o)},Ao=function(e,t,n,r,o){var i=e.challengeData,a=e.blob,s=e.language,c=e.sdkMetadata,u=void 0===c?{}:c,l=i.challenges,d=i.id,f=i.switchSeconds,p={file:a,languages:Ut()([{source:"sdk",language_code:s}]),challenge:Ut()(l),challenge_id:d,challenge_switch_at:f,sdk_metadata:Ut()(u)},h="".concat(t,"/v2/live_videos");Do(h,p,n,r,o)},Io=function(e,t,n,r){var o={endpoint:"".concat(e,"/v2/live_video_challenge"),contentType:"application/json",token:"Bearer ".concat(t)};Or(o,n,function(e){return To(e,r)})},Do=function(e,t,n,r,o){t=jo({},t,{sdk_source:"onfido_web_sdk",sdk_version:"5.4.0"});var i,a,s={payload:(i=t,a=new FormData,Object(we.b)(i,function(e,t){"object"===O()(e)&&e.blob&&e.filename?a.append(t,e.blob,e.filename):a.append(t,e)}),a),endpoint:e,token:"Bearer ".concat(n)};Or(s,r,function(e){return To(e,o)})};function Ro(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function Mo(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=Ro(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=Ro(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var Fo={name:"SERVER_ERROR",type:"error"},Lo={challengesId:"",challenges:[],hasLoaded:!1,hasError:!1,challengeRequestedAt:0},Uo=function(e){return function(t){function n(){var e,t,r;T()(this,n);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(n)).call.apply(e,E()(t=[this]).call(t,i))),W()(F()(r),"state",Mo({},Lo)),W()(F()(r),"loadChallenges",function(){r.setState(Mo({},Lo,{challengeRequestedAt:Object(Z.d)()}),function(){var e=r.props.urls.onfido_api_url;Io(e,r.props.token,r.handleResponse,r.handleError),ln(["face_video_challenge_requested"])})}),W()(F()(r),"handleResponse",function(e){var t=e.data.challenge,n=String(e.data.id);r.setState({challenges:t,challengesId:n,hasLoaded:!0}),ln(["face_video_challenge_loaded"],{challenge_loading_time:r.challengeLoadingTime()})}),W()(F()(r),"handleError",function(e){r.setState({hasLoaded:!0,hasError:!0}),r.props.triggerOnError(e),ln(["face_video_challenge_load_failed"],{challenge_loading_time:r.challengeLoadingTime()})}),W()(F()(r),"challengeLoadingTime",function(){return Object(Z.d)()-r.state.challengeRequestedAt}),W()(F()(r),"renderError",function(){var e=r.props,t=e.trackScreen,n=e.renderFallback;return Object(z.h)(mr,q()({trackScreen:t,renderFallback:n},{error:Fo,hasBackdrop:!0}))}),r}return U()(n,t),N()(n,[{key:"componentDidMount",value:function(){this.loadChallenges()}},{key:"render",value:function(){var t=this.state,n=t.hasLoaded,r=t.hasError,o=t.challenges,i=t.challengesId;return Object(z.h)("div",null,n?Object(z.h)(e,q()({},Mo({},this.props,{challengesId:i,challenges:o,onRedo:this.loadChallenges}),r?{renderError:this.renderError()}:{})):Object(z.h)(So,null))}}]),n}(z.Component)};function Bo(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function Wo(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=Bo(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=Bo(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var Ho={displayView:"intro",startedAt:void 0,switchSeconds:void 0,currentIndex:0,isRecording:!1,hasMediaStream:!1,hasBecomeInactive:!1,hasRecordingTakenTooLong:!1,hasCameraError:!1},qo={name:"LIVENESS_TIMEOUT",type:"warning"},Vo=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"webcam",null),W()(F()(r),"state",Wo({},Ho)),W()(F()(r),"handleContinueFlowClick",function(){r.setState({displayView:"camera"})}),W()(F()(r),"startRecording",function(){r.webcam&&r.webcam.startRecording(),r.setState({isRecording:!0,hasBecomeInactive:!1})}),W()(F()(r),"stopRecording",function(){r.webcam&&r.webcam.stopRecording(),r.setState({isRecording:!1})}),W()(F()(r),"handleRecordingStart",function(){r.state.hasMediaStream&&(r.startRecording(),r.setState({startedAt:Object(Z.d)()}),ln(["face_video_capture_step_1"]))}),W()(F()(r),"handleRecordingStop",function(){var e=r.state,t=e.switchSeconds,n=e.hasRecordingTakenTooLong,o=r.props,i={challenges:o.challenges,id:o.challengesId,switchSeconds:t};r.stopRecording(),r.webcam&&!n&&er(r.webcam,function(e){return r.props.onVideoCapture(Wo({},e,{challengeData:i}))})}),W()(F()(r),"handleNextChallenge",function(){var e=r.state,t=e.startedAt,n=e.currentIndex;r.setState({currentIndex:n+1}),t&&(r.setState({switchSeconds:Object(Z.d)()-t}),ln(["face_video_capture_step_2"]))}),W()(F()(r),"handleMediaStream",function(){r.setState({hasMediaStream:!0})}),W()(F()(r),"handleInactivityTimeout",function(){r.setState({hasBecomeInactive:!0})}),W()(F()(r),"handleRecordingTimeout",function(){r.setState({hasRecordingTakenTooLong:!0}),r.stopRecording()}),W()(F()(r),"handleCameraError",function(){r.setState({hasCameraError:!0})}),W()(F()(r),"handleFallbackClick",function(e){r.props.onRedo(),e()}),W()(F()(r),"renderRedoActionsFallback",function(e,t){return Object(z.h)(yo,{text:e,onClick:function(){return r.handleFallbackClick(t)}})}),W()(F()(r),"renderError",function(){var e=r.props,t=e.trackScreen,n=e.renderFallback,o=e.inactiveError;return Object(z.h)(mr,q()({trackScreen:t},r.state.hasRecordingTakenTooLong?{error:qo,renderFallback:r.renderRedoActionsFallback,hasBackdrop:!0}:{error:o,isDismissible:!0,renderFallback:n}))}),W()(F()(r),"render",function(){var e=r.props,t=e.trackScreen,n=e.translate,o=e.challenges,i=void 0===o?[]:o,a=r.state,s=a.displayView,c=a.isRecording,u=a.currentIndex,l=a.hasBecomeInactive,d=a.hasRecordingTakenTooLong,f=a.hasCameraError,p=i[u]||{},h=u===i.length-1,m=l||d;return"intro"===s?Object(z.h)(vo,{trackScreen:t,continueFlow:r.handleContinueFlowClick}):Object(z.h)("div",null,Object(z.h)(xr,q()({},r.props,{webcamRef:function(e){return r.webcam=e},onUserMedia:r.handleMediaStream,onError:r.handleCameraError,renderTitle:!c&&Object(z.h)(Pt,{title:n("capture.liveness.challenges.position_face")})},m?{renderError:r.renderError()}:{},{video:!0}),Object(z.h)(ct,null),Object(z.h)(or,{isWithoutHole:m||f||c}),c?Object(z.h)(wo,q()({currentChallenge:p,isLastChallenge:h,hasError:m||f,disableInteraction:m||f},{onNext:r.handleNextChallenge,onStop:r.handleRecordingStop,onTimeout:r.handleRecordingTimeout})):Object(z.h)(Co,q()({hasError:d||f,disableInteraction:d||f},{onStart:r.handleRecordingStart,onTimeout:r.handleInactivityTimeout}))))}),r}return U()(t,e),N()(t,[{key:"componentDidUpdate",value:function(e){e.challenges!==this.props.challenges&&this.setState(Wo({},Ho))}}]),t}(z.Component),Go=Object(ut.b)(Uo(Vo)),zo=n(402),Ko=n.n(zo),Yo=function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){ln(["".concat(en(this.props.error.name))])}},{key:"render",value:function(e){var t,n=e.translate,r=e.error,o=cr[r.name],i=o.message,a=o.instruction,s=o.icon,c=s||"genericErrorIcon";return Object(z.h)("div",null,Object(z.h)(Pt,{title:n(i),subTitle:n(a)}),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)("span",{className:E()(t="".concat(At.a.icon," ")).call(t,Ko.a[c])})))}}]),t}(z.Component),Xo=Object(ut.b)(Yo);function Jo(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function Zo(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=Jo(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=Jo(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var Qo={method:"face",variant:"standard",side:null},ei=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"handleCapture",function(e){var t=r.props,n=t.actions,o=t.nextStep,i=rn();n.createCapture(Zo({},Qo,{},e,{id:i})),o()}),W()(F()(r),"handleVideoCapture",function(e){return r.handleCapture(Zo({},e,{variant:"video"}))}),W()(F()(r),"handleUpload",function(e){return r.handleCapture({blob:e})}),W()(F()(r),"handleError",function(e){r.props.triggerOnError(e),r.props.actions.deleteCapture()}),W()(F()(r),"handleFallbackClick",function(e){r.props.changeFlowTo("crossDeviceSteps"),e()}),W()(F()(r),"renderUploadFallback",function(e){return Object(z.h)(Rr,{onChange:r.handleUpload,accept:"image/*",capture:"user"},e)}),W()(F()(r),"renderCrossDeviceFallback",function(e,t){return Object(z.h)(yo,{text:e,onClick:function(){return r.handleFallbackClick(t)}})}),W()(F()(r),"isUploadFallbackDisabled",function(){return!Z.h&&!r.props.uploadFallback}),W()(F()(r),"inactiveError",function(){return{name:r.isUploadFallbackDisabled()?"CAMERA_INACTIVE_NO_FALLBACK":"CAMERA_INACTIVE",type:"warning"}}),r}return U()(t,e),N()(t,[{key:"render",value:function(){var e=this.props,t=e.hasCamera,n=e.requestedVariant,r=e.translate,o=e.useMultipleSelfieCapture,i=e.snapshotInterval,a=e.uploadFallback,s=r("capture.face.title"),c=Zo({onError:this.handleError},this.props),u=Zo({renderTitle:Object(z.h)(Pt,{title:s,smaller:!0}),containerClassName:to.a.faceContainer,renderFallback:Z.h?this.renderCrossDeviceFallback:this.renderUploadFallback,inactiveError:this.inactiveError(),isUploadFallbackDisabled:this.isUploadFallbackDisabled()},c);if(null!==t){if(t){var l=r("accessibility.selfie_camera_view");if("video"===n)return Object(z.h)(Go,q()({},u,{onVideoCapture:this.handleVideoCapture,ariaLabel:l}));if(!0===this.props.useWebcam)return Object(z.h)(po,q()({},u,{onCapture:this.handleCapture,useMultipleSelfieCapture:o,snapshotInterval:i,ariaLabel:l}))}return this.props.useWebcam&&!1!==t||!a?Object(z.h)(Xo,{error:{name:"INTERRUPTED_FLOW_ERROR"}}):Object(z.h)(qr,q()({},c,{onUpload:this.handleUpload,title:r("capture.face.upload_title")||s,instructions:r("capture.face.instructions")}))}}}]),t}(z.Component);W()(ei,"defaultProps",{useWebcam:!0,requestedVariant:"standard",uploadFallback:!0,useMultipleSelfieCapture:!1,snapshotInterval:1e3});var ti,ni=Object(Kt.a)(dn,ut.b,Yr,Zr,Qr)(ei),ri=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(n){return Object(z.h)(e,q()({},n,t))}},oi=dn(ri(io),"front_capture"),ii=dn(ri(io,{side:"back"}),"back_capture"),ai=dn(ri(ni,{requestedVariant:"standard"}),"selfie_capture"),si=dn(ri(ni,{requestedVariant:"video"}),"video_capture"),ci=dn(ri(io,{isPoA:!0,forceCrossDevice:!1}),"poa"),ui=n(109),li=n.n(ui),di=n(336),fi=n.n(di),pi=n(110),hi=n.n(pi),mi=n(403),vi=n.n(mi),yi=URL.createObjectURL,gi=URL.revokeObjectURL,bi=function(e){return function(t){function n(e){var t;T()(this,n),t=I()(this,R()(n).call(this,e)),W()(F()(t),"createPreviewUrl",function(e){return e?yi(e):null});var r=e.blob;return t.state={previewUrl:t.createPreviewUrl(r)},t}return U()(n,t),N()(n,[{key:"updateBlobPreview",value:function(e){this.revokePreviewURL(),this.setState({previewUrl:this.createPreviewUrl(e)})}},{key:"revokePreviewURL",value:function(){gi(this.state.previewUrl)}},{key:"componentWillReceiveProps",value:function(e){var t=e.blob;this.props.blob!==t&&this.updateBlobPreview(t)}},{key:"componentWillUnmount",value:function(){this.revokePreviewURL()}},{key:"render",value:function(){return Object(z.h)(e,q()({previewUrl:this.state.previewUrl},this.props))}}]),n}(z.Component)},$i=n(95),_i=n.n($i),ki=function(e){var t=e.blob;return Object(z.h)("a",{href:"#",onClick:Object(Z.j)(function(){window.navigator.msSaveOrOpenBlob(t,"document.pdf")}),className:_i.a.pdfIcon})},wi=0,Ci=bi(function(e){function t(e){var n;return T()(this,t),n=I()(this,R()(t).call(this,e)),W()(F()(n),"options",{width:"100%",height:"18.125em","max-height":"70vh",border:0,fallbackLink:"<a href='[url]' class=".concat(_i.a.pdfIcon," download/>")}),n.id="pdfContainer"+wi++,n}return U()(t,e),N()(t,[{key:"embedPDF",value:function(e){vi.a.embed(e,"#".concat(this.id),this.options)}},{key:"componentDidMount",value:function(){var e=this.props.previewUrl;this.embedPDF(e)}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"componentWillReceiveProps",value:function(e){var t=e.previewUrl;this.props.pdfPreview!==t&&this.embedPDF(t)}},{key:"render",value:function(){return Object(z.h)("div",{id:this.id})}}]),t}(z.Component)),xi=function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){var e=this.props.blob;return Object(z.h)("div",{className:_i.a.pdfWrapper},window.navigator.msSaveOrOpenBlob?Object(z.h)(ki,{blob:e}):Object(z.h)(Ci,{blob:e}))}}]),t}(z.Component),Oi=n(138),Si=n.n(Oi),Ei=n(404),ji=n.n(Ei),Ti=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"state",{clientX:0,clientY:0}),W()(F()(r),"handleTouchStart",function(e){if(1===e.touches.length){var t=e.touches[0],n=t.clientX,o=t.clientY;r.setState({clientX:n,clientY:o})}}),W()(F()(r),"handleTouchMove",function(e){if(e.preventDefault(),1===e.touches.length){var t=e.touches[0],n=t.clientX,o=t.clientY;r.handlePan(r.state.clientX-n,r.state.clientY-o),r.setState({clientX:n,clientY:o})}}),W()(F()(r),"handlePan",function(e,t){r.container&&(r.container.scrollLeft+=e,r.container.scrollTop+=t)}),r}return U()(t,e),N()(t,[{key:"center",value:function(){if(this.container){var e=this.container,t=e.clientWidth,n=e.scrollWidth,r=e.clientHeight,o=e.scrollHeight;this.container.scrollLeft=(n-t)/2,this.container.scrollTop=(o-r)/2}}},{key:"render",value:function(){var e=this,t=this.props,n=t.children,r=t.className;return Object(z.h)("div",{ref:function(t){return e.container=t},className:rt()(ji.a.container,r),onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove},n)}}]),t}(z.Component),Pi=n(127),Ni=n.n(Pi),Ai=Object(K.connect)(function(e){return{isNavigationDisabled:e.globals.isNavigationDisabled}}),Ii=Object(K.connect)(null,function(e){return{setNavigationDisabled:function(t){return e(We(t))}}}),Di=Object(Kt.a)(at,ut.b)(function(e){var t,n=e.back,r=e.translate,o=e.disabled,i=e.isFullScreen,a=e.className;return Object(z.h)("div",{className:rt()(a,Ni.a.navigation,W()({},Ni.a.fullScreenNav,i))},Object(z.h)("button",{type:"button","aria-label":r("back"),onClick:n,className:rt()(Ni.a.back,(t={},W()(t,Ni.a.disabled,o),W()(t,Ni.a.backHoverDesktop,Z.h),t))},Object(z.h)("span",{className:Ni.a.iconBack}),Object(z.h)("span",{className:Ni.a.label,"aria-hidden":"true"},r("back"))))}),Ri=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"state",{isExpanded:!1}),W()(F()(r),"handleImageLoad",function(){r.image&&r.image.center()}),W()(F()(r),"toggle",function(){return r.setState({isExpanded:!r.state.isExpanded},function(){r.previewContainer&&r.previewContainer.focus()})}),r}return U()(t,e),N()(t,[{key:"componentWillUpdate",value:function(e,t){t.isExpanded!==e.isNavigationDisabled&&this.props.setNavigationDisabled(t.isExpanded),t.isExpanded!==e.isFullScreen&&this.props.setFullScreen(t.isExpanded)}},{key:"componentWillUnmount",value:function(){this.props.setNavigationDisabled(!1),this.props.setFullScreen(!1)}},{key:"render",value:function(){var e=this,t=this.state.isExpanded,n=this.props,r=n.translate,o=n.src,i=n.altTag;return Object(z.h)("div",{className:rt()(W()({},Si.a.expanded,t),Si.a.container)},Object(z.h)("div",{ref:function(t){return e.previewContainer=t},tabIndex:-1,"aria-label":i,"aria-live":t?"assertive":"","aria-expanded":t.toString(),role:"img"},t&&Object(z.h)(Ti,{ref:function(t){return e.image=t},className:Si.a.imageContainer},Object(z.h)("img",{onLoad:this.handleImageLoad,className:Si.a.image,src:o,alt:""}))),Object(z.h)(Ft,{className:Si.a.button,textClassName:Si.a["button-text"],variants:["small"],onClick:this.toggle},r(t?"confirm.enlarge_image.close":"confirm.enlarge_image.enlarge")))}}]),t}(z.Component),Mi=Object(Kt.a)(Ai,Ii,at,st,ut.b)(Ri),Fi=function(e){var t=e.src,n=e.id,r=e.isDocument,o=e.isFullScreen,i=e.altTag;return Object(z.h)("span",{className:rt()(_i.a.imageWrapper,W()({},_i.a.fullscreenImageWrapper,o))},r&&Object(z.h)(Mi,{src:t,altTag:i}),!o&&Object(z.h)("img",{key:n,className:_i.a.image,src:t,alt:i,"aria-hidden":r}))},Li=bi(function(e){var t=e.previewUrl,n=G()(e,["previewUrl"]);return Object(z.h)(Fi,q()({src:t},n))}),Ui=(ti=function(e){var t=e.base64,n=G()(e,["base64"]);return Object(z.h)(Fi,q()({src:t},n))},function(e){function t(e){var n;T()(this,t),n=I()(this,R()(t).call(this,e));var r=e.blob;return n.state={base64:null},n.updateBase64(r),n}return U()(t,e),N()(t,[{key:"updateBase64",value:function(e){var t=this;Xn(e,function(e){return t.setState({base64:e})},function(){return console.error("An error occurred converting a blob to base64")})}},{key:"componentWillReceiveProps",value:function(e){var t=e.blob;this.props.blob!==t&&this.updateBase64(t)}},{key:"render",value:function(){return this.state.base64?Object(z.h)(ti,q()({base64:this.state.base64},this.props)):null}}]),t}(z.Component)),Bi=function(e){var t=e.blob,n=G()(e,["blob"]);return t instanceof File?Object(z.h)(Ui,q()({blob:t},n)):Object(z.h)(Li,q()({blob:t},n))},Wi=bi(function(e){var t=e.ariaLabel,n=e.previewUrl;return Object(z.h)("div",{className:_i.a.videoWrapper},Object(z.h)("video",{"aria-label":t,className:_i.a.video,src:n,controls:!0}))}),Hi=function(e){var t=e.capture,n=t.blob,r=t.id,o=t.variant,i=e.method,a=e.isFullScreen,s=e.imageAltTag,c=e.videoAriaLabel;return Zn(["pdf"],n)?Object(z.h)(xi,{blob:n}):"video"===o?Object(z.h)(Wi,{ariaLabel:c,blob:n}):Object(z.h)(Bi,{blob:n,id:r,isDocument:"document"===i,isFullScreen:a,altTag:s})};function qi(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function Vi(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=qi(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=qi(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var Gi=Object(ut.b)(function(e){var t=e.retakeAction,n=e.translate;return Object(z.h)(Ft,{onClick:t,className:hi.a.retake,variants:["secondary"]},n("confirm.redo"))}),zi=Object(ut.b)(function(e){var t=e.confirmAction,n=e.translate,r=e.error;return Object(z.h)(Ft,{className:hi.a["btn-primary"],variants:["primary"],onClick:t},"warn"===r.type?n("confirm.continue"):n("confirm.confirm"))}),Ki=function(e){var t=e.retakeAction,n=e.confirmAction,r=e.error;return Object(z.h)("div",{className:hi.a.actionsContainer},Object(z.h)("div",{className:rt()(hi.a.actions,W()({},hi.a.error,"error"===r.type))},Object(z.h)(Gi,{retakeAction:t}),"error"===r.type?null:Object(z.h)(zi,{confirmAction:n,error:r})))},Yi=Object(ut.b)(function(e){var t=e.capture,n=e.retakeAction,r=e.confirmAction,o=e.error,i=e.method,a=e.documentType,s=e.translate,c=e.isFullScreen,u="face"===i?"confirm.face.".concat(t.variant):"confirm.".concat(i),l=s("".concat(u,".title")),d=s("".concat(u,".alt")),f=s("accessibility.replay_video"),p=s("face"===i?"confirm.face.".concat(t.variant,".message"):"confirm.".concat(a,".message"));return Object(z.h)("div",{className:rt()(hi.a.previewsContainer,At.a.fullHeightContainer,W()({},hi.a.previewsContainerIsFullScreen,c))},c?null:o.type?Object(z.h)(fr,{error:o,withArrow:!0,role:"alert",focusOnMount:!1}):Object(z.h)(Pt,{title:l,subTitle:p,smaller:!0,className:hi.a.title}),Object(z.h)(Hi,{capture:t,method:i,isFullScreen:c,imageAltTag:d,videoAriaLabel:f}),!c&&Object(z.h)(Ki,{retakeAction:n,confirmAction:r,error:o}))}),Xi=function(e,t,n,r,o,i){var a={file:{blob:e.blob,filename:e.filename},sdkMetadata:e.sdkMetadata,snapshot:!0,advanced_validation:!1},s=t.blob,c=t.filename,u=t.sdkMetadata;No(a,r,n,function(){return No({file:{blob:s,filename:c},sdkMetadata:u},r,n,o,i)},i)},Ji=function(e){function t(e){var n;return T()(this,t),n=I()(this,R()(t).call(this,e)),W()(F()(n),"onGlareWarning",function(){n.setWarning("GLARE_DETECTED")}),W()(F()(n),"setError",function(e){return n.setState({error:{name:e,type:"error"}})}),W()(F()(n),"setWarning",function(e){return n.setState({error:{name:e,type:"warn"}})}),W()(F()(n),"onfidoErrorFieldMap",function(e){var t,n=so()(e,2),r=n[0],o=n[1];return"document_detection"===r?"INVALID_CAPTURE":"file"===r?"INVALID_TYPE":"attachment"===r||"attachment_content_type"===r?"UNSUPPORTED_FILE":"face_detection"===r?-1===fi()(t=o[0]).call(t,"Multiple faces")?"NO_FACE_ERROR":"MULTIPLE_FACES_ERROR":void 0}),W()(F()(n),"onfidoErrorReduce",function(e){var t,r=e.fields,o=C()(t=li()(r)).call(t,n.onfidoErrorFieldMap);return so()(o,1)[0]}),W()(F()(n),"onApiError",function(e){var t,r,o=e.status,i=e.response;if(n.props.mobileFlow&&401===o)return n.props.triggerOnError({status:o,response:i}),n.props.crossDeviceClientError();422===o?t=n.onfidoErrorReduce(i.error):(n.props.triggerOnError({status:o,response:i}),hn(E()(r="".concat(o," - ")).call(r,i)),t="SERVER_ERROR"),n.setState({uploadInProgress:!1}),n.setError(t)}),W()(F()(n),"onApiSuccess",function(e){var t=n.props,r=t.method,o=t.nextStep,i=t.actions,a=n.state.capture,s=Math.round(performance.now()-n.startTime);un("Completed upload",{duration:s,method:r}),i.setCaptureMetadata({capture:a,apiResponse:e});var c=e.sdk_warnings;c&&!c.detect_glare.valid?(n.setState({uploadInProgress:!1}),n.onGlareWarning()):$t()(o,0)}),W()(F()(n),"handleSelfieUpload",function(e,t){var r=e.snapshot,o=G()(e,["snapshot"]),i=n.props.urls.onfido_api_url;if(r)un("Starting multiframe selfie upload"),Xi(r,o,t,i,n.onApiSuccess,n.onApiError);else{var a=o.blob,s=o.filename,c=o.sdkMetadata;No({file:s?{blob:a,filename:s}:a,sdkMetadata:c},i,t,n.onApiSuccess,n.onApiError)}}),W()(F()(n),"uploadCaptureToOnfido",function(){var e=n.props,t=e.urls,r=e.capture,o=e.method,i=e.side,a=e.token,s=e.poaDocumentType,c=e.language,u=t.onfido_api_url;n.startTime=performance.now(),un("Starting upload",{method:o}),n.setState({uploadInProgress:!0});var l=r.blob,d=r.documentType,f=r.variant,p=r.challengeData,h=r.sdkMetadata;if(n.setState({capture:r}),"document"===o){var m=vt()(On).call(On,s),v=Vi({},!m?{detect_document:"error"}:{},{},!Zn(["pdf"],l)&&!m?{detect_glare:"warn"}:{}),y=Vi({file:l,type:d,side:i,validations:v},m?{issuing_country:n.props.country||"GBR"}:{});Po(y,u,a,n.onApiSuccess,n.onApiError)}else if("face"===o){if("video"===f)Ao({challengeData:p,blob:l,language:c,sdkMetadata:h},u,a,n.onApiSuccess,n.onApiError);else n.handleSelfieUpload(r,a)}}),W()(F()(n),"onConfirm",function(){"warn"===n.state.error.type?n.props.nextStep():n.uploadCaptureToOnfido()}),W()(F()(n),"render",function(e){var t=e.capture,r=e.previousStep,o=e.method,i=e.documentType,a=e.isFullScreen;return n.state.uploadInProgress?Object(z.h)(So,null):Object(z.h)(Yi,{isFullScreen:a,capture:t,retakeAction:r,confirmAction:n.onConfirm,error:n.state.error,method:o,documentType:i})}),n.state={uploadInProgress:!1,error:{},capture:null},n}return U()(t,e),t}(z.Component),Zi=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return _e(t).join("_")},Qi=pn(Ji,"confirmation","error"),ea=Object(K.connect)(function(e,t){var n=t.method,r=t.side;return{capture:e.captures[Zi(n,r)],isFullScreen:e.globals.isFullScreen}})(Object(ut.b)(Qi)),ta=function(e){return Object(z.h)(ea,q()({},e,{method:"face"}))},na=dn(function(e){return Object(z.h)(ea,q()({},e,{method:"document",side:"front"}))},"front"),ra=dn(function(e){return Object(z.h)(ea,q()({},e,{method:"document",side:"back"}))},"back"),oa=dn(ta,"selfie"),ia=dn(ta,"video"),aa=n(342),sa=n.n(aa),ca=function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.props.nextStep()}},{key:"render",value:function(e){var t,n=e.message,r=e.submessage,o=e.translate,i=n||o("complete.message"),a=r||o("complete.submessage");return Object(z.h)("div",{className:sa.a.wrapper},Object(z.h)("span",{className:E()(t="".concat(At.a.icon,"  ")).call(t,sa.a.icon)}),Object(z.h)(Pt,{title:i,subTitle:a}))}}]),t}(z.Component),ua=fn(Object(ut.b)(ca)),la=n(263),da=n.n(la),fa=fn(Object(ut.b)(function(e){var t,n,r,o=e.translate,i=e.back;return Object(z.h)("div",null,Object(z.h)(Pt,{title:o("cross_device.mobile_connected.title.message"),subTitle:o("cross_device.mobile_connected.title.submessage")}),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)("span",{className:E()(t="".concat(At.a.icon," ")).call(t,da.a.icon)}),Object(z.h)("div",{className:At.a.header},o("cross_device.tips")),Object(z.h)("div",{className:E()(n="".concat(da.a.help," ")).call(n,At.a.help)},Object(z.h)("ul",{className:At.a.helpList,"aria-label":o("cross_device.tips")},Object(z.h)("li",null,o("cross_device.mobile_connected.tips.item_1")),Object(z.h)("li",null,o("cross_device.mobile_connected.tips.item_2")),Object(z.h)("li",null,o("cross_device.mobile_connected.tips.item_3")))),Object(z.h)("a",{href:"#",className:E()(r="".concat(At.a.link," ")).call(r,da.a.cancel),onClick:Object(Z.j)(i)},o("cancel"))))}),"mobile_connected"),pa=n(101),ha=n.n(pa),ma=function(e){function t(){var e;return T()(this,t),e=I()(this,R()(t).call(this)),W()(F()(e),"hasMultipleDocuments",function(){var t=e.props.steps;return v()(t).call(t,function(e){return"document"===e.type}).length>1}),W()(F()(e),"hasFaceCaptureStep",function(){var t;return Et()(t=e.props.steps).call(t,function(e){return"face"===e.type})}),W()(F()(e),"getFaceCaptureVariant",function(){var t=e.props.captures,n=(void 0===t?{}:t).face,r=void 0===n?{}:n;return r&&r.metadata?r.metadata.variant:"standard"}),W()(F()(e),"handleSubmitButtonClick",function(){e.setState({isSubmitDisabled:!0}),e.props.nextStep()}),e.state={isSubmitDisabled:!1},e}return U()(t,e),N()(t,[{key:"render",value:function(){var e,t,n=this.props.translate,r=this.hasMultipleDocuments()?"cross_device.submit.multiple_docs_uploaded":"cross_device.submit.one_doc_uploaded",o="standard"===this.getFaceCaptureVariant()?"selfie":"video";return Object(z.h)("div",null,Object(z.h)(Pt,{title:n("cross_device.submit.title"),subTitle:n("cross_device.submit.sub_title")}),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)("ul",{className:ha.a.uploadList,"aria-label":n("cross_device.tips")},Object(z.h)("li",{className:ha.a.uploadListItem},Object(z.h)("span",{className:E()(e="".concat(At.a.icon," ")).call(e,ha.a.icon)}),Object(z.h)("span",{className:rt()(ha.a.listText,ha.a.documentUploadedLabel)},n(r))),this.hasFaceCaptureStep()&&Object(z.h)("li",{className:ha.a.uploadListItem},Object(z.h)("span",{className:E()(t="".concat(At.a.icon," ")).call(t,ha.a.icon)}),Object(z.h)("span",{className:rt()(ha.a.listText,ha.a["".concat(o,"UploadedLabel")])},n("cross_device.submit.".concat(o,"_uploaded"))))),Object(z.h)("div",null,Object(z.h)(Ft,{variants:["primary","centered"],onClick:this.handleSubmitButtonClick,disabled:this.state.isSubmitDisabled},n("cross_device.submit.action")))))}}]),t}(z.Component),va=Object(K.connect)(function(e){return{captures:e.captures}})(fn(Object(ut.b)(ma),"desktop_submit")),ya=n(149),ga=n.n(ya),ba=fn(Object(ut.b)(function(e){var t,n,r,o=e.sms,i=e.translate,a=e.previousStep;return Object(z.h)("div",null,Object(z.h)(Pt,{title:i("cross_device.mobile_notification_sent.title")}),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)("div",{className:ga.a.submessage},i("cross_device.mobile_notification_sent.submessage",{number:o.number})),Object(z.h)("div",{className:ga.a.boldMessage},i("cross_device.mobile_notification_sent.bold_message")),Object(z.h)("span",{className:E()(t="".concat(At.a.icon," ")).call(t,ga.a.icon)}),Object(z.h)("div",{className:At.a.header},i("cross_device.tips")),Object(z.h)("div",{className:E()(n="".concat(ga.a.help," ")).call(n,At.a.help)},Object(z.h)("ul",{className:At.a.helpList,"aria-label":i("cross_device.tips")},Object(z.h)("li",null,i("cross_device.mobile_notification_sent.tips.item_1")),Object(z.h)("li",null,i("cross_device.mobile_notification_sent.tips.item_2")))),Object(z.h)("a",{href:"#",className:E()(r="".concat(At.a.link," ")).call(r,ga.a.cancel),onClick:Object(Z.j)(a)},i("cross_device.mobile_notification_sent.resend_link"))))}),"mobile_notification_sent"),$a=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"sendConfig",function(e){var t=r.props,n=t.roomId,o=t.mobileConfig,i=t.socket,a=t.actions;n&&n!==e.roomId&&i.emit("leave",{roomId:n}),a.setRoomId(e.roomId),a.mobileConnected(!0),r.sendMessage("config",e.roomId,o)}),W()(F()(r),"sendMessage",function(e,t,n){r.props.socket.emit("message",{event:e,payload:n,roomId:t})}),W()(F()(r),"onClientSuccess",function(e){var t;f()(t=e.captures||[]).call(t,function(e){return r.props.actions.createCapture(e)}),r.props.actions.setClientSuccess(!0)}),W()(F()(r),"onDisconnectPing",function(e){r.sendMessage("disconnect pong",e.roomId)}),W()(F()(r),"render",function(e){return r.props.clientSuccess?Object(z.h)(va,e):r.props.mobileConnected?Object(z.h)(fa,e):Object(z.h)(ba,e)}),r}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.props.socket.on("disconnect ping",this.onDisconnectPing),this.props.socket.on("get config",this.sendConfig),this.props.socket.on("client success",this.onClientSuccess)}},{key:"componentWillUnmount",value:function(){this.props.socket.off("disconnect ping"),this.props.socket.off("get config"),this.props.socket.off("client success");var e=this.props,t=e.socket,n=e.roomId,r=e.actions;t.emit("disconnecting",{roomId:n}),r.mobileConnected(!1)}}]),t}(z.Component),_a=n(49),ka=n.n(_a),wa=n(375),Ca=n.n(wa),xa=n(405),Oa=n.n(xa);window.Promise||(window.Promise=Oa.a);var Sa=Object(ut.b)(function(e){var t=e.translate;return Object(z.h)("div",{className:Ca.a.loading},t("cross_device.loading"))}),Ea=function(e){function t(e){var r,o=this;return T()(this,t),r=I()(this,R()(t).call(this,e)),W()(F()(r),"render",function(e){return Object(z.h)(o.state.component,e)}),r.state={component:Sa},Promise.all([n.e(4),n.e(0)]).then(n.bind(null,602)).then(function(e){r.setState({component:e.default})}).catch(function(){return e.translate("errors.lazy_loading.message")}),r}return U()(t,e),t}(z.Component),ja=Object(ut.b)(Ea),Ta=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"render",function(e){var t=e.error;return Object(z.h)(fr,q()({role:"alert"},{error:t}))}),r}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){var e=this.props.error.name.toLowerCase();this.props.trackScreen([e])}}]),t}(z.Component),Pa=function(e){function t(e){var n;if(T()(this,t),n=I()(this,R()(t).call(this,e)),W()(F()(n),"unlisten",function(e){e&&(e.off("get config",n.onGetConfig),e.off("client success",n.onClientSuccess))}),W()(F()(n),"listen",function(e){e&&(e.on("get config",n.onGetConfig),e.on("client success",n.onClientSuccess))}),W()(F()(n),"onJoined",function(e){var t=n.props,r=t.actions;t.roomId||r.setRoomId(e.roomId)}),W()(F()(n),"onGetConfig",function(e){var t=n.props,r=t.roomId,o=t.mobileConfig,i=t.socket,a=t.actions,s=t.nextStep;r&&r!==e.roomId&&i.emit("leave",{roomId:r}),a.mobileConnected(!0),n.sendMessage("config",e.roomId,o),s()}),W()(F()(n),"onClientSuccess",function(){n.props.actions.setClientSuccess(!0),n.props.nextStep()}),W()(F()(n),"sendMessage",function(e,t,r){n.props.socket.emit("message",{event:e,payload:r,roomId:t})}),W()(F()(n),"render",function(){return n.props.roomId?Object(z.h)(Na,n.props):Object(z.h)(So,null)}),!e.socket){var r=e.urls.sync_url,o=Ot(r);o.on("connect",function(){var e=n.props.roomId||null;o.emit("join",{roomId:e})}),o.on("joined",n.onJoined),o.open(),e.actions.setSocket(o)}return n}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.listen(this.props.socket)}},{key:"componentWillReceiveProps",value:function(e){e.socket!==this.props.socket&&(this.unlisten(this.props.socket),this.listen(e.socket))}},{key:"componentWillUnmount",value:function(){this.unlisten(this.props.socket)}}]),t}(z.Component),Na=function(e){function t(e){var n,r;return T()(this,t),r=I()(this,R()(t).call(this,e)),W()(F()(r),"linkId",E()(n="".concat("AV")).call(n,r.props.roomId)),W()(F()(r),"linkCopiedTimeoutId",null),W()(F()(r),"onCopySuccess",function(){r.setState({copySuccess:!0}),r.clearLinkCopiedTimeout(),r.linkCopiedTimeoutId=$t()(function(){r.setState({copySuccess:!1}),r.linkText.focus()},5e3)}),W()(F()(r),"clearLinkCopiedTimeout",function(){r.linkCopiedTimeoutId&&clearTimeout(r.linkCopiedTimeoutId)}),W()(F()(r),"setError",function(e){return r.setState({error:{name:e,type:"error"}})}),W()(F()(r),"clearErrors",function(){r.clearSendLinkClickTimeout(),r.setState({error:{},validNumber:!0})}),W()(F()(r),"handleResponse",function(e){r.clearSendLinkClickTimeout(),r.setState({sending:!1}),"OK"===e.status?r.props.nextStep():r.setError("SMS_FAILED")}),W()(F()(r),"handleSMSError",function(e){r.clearSendLinkClickTimeout(),r.setState({sending:!1}),r.props.triggerOnError(e),429===status?r.setError("SMS_OVERUSE"):r.setError("SMS_FAILED")}),W()(F()(r),"handleSendLinkClick",function(){r.props.sms.valid?r.sendLinkClickTimeoutId||(r.sendLinkClickTimeoutId=$t()(r.sendSms,500)):(r.clearSendLinkClickTimeout(),r.setState({validNumber:!1}))}),W()(F()(r),"sendSms",function(){r.setState({sending:!0});var e=r.props,t=e.language,n=e.sms,o=e.token,i=e.urls.telephony_url,a={payload:Ut()({to:n.number,id:r.linkId,language:t}),endpoint:"".concat(i,"/v1/cross_device_sms"),contentType:"application/json",token:"Bearer ".concat(o)};Or(a,r.handleResponse,r.handleSMSError)}),W()(F()(r),"mobileUrl",function(e){var t,n=e.hosted_sdk_url;return E()(t="".concat(n,"/")).call(t,r.linkId)}),r.state={copySuccess:!1,sending:!1,error:{},validNumber:!0},r}return U()(t,e),N()(t,[{key:"clearSendLinkClickTimeout",value:function(){this.sendLinkClickTimeoutId&&clearTimeout(this.sendLinkClickTimeoutId)}},{key:"componentWillUnmount",value:function(){this.clearSendLinkClickTimeout()}},{key:"render",value:function(){var e=this,t=this.props,n=t.urls,r=t.translate,o=t.trackScreen,i=this.mobileUrl(n),a=this.state.error,s=this.state.copySuccess?r("cross_device.link.link_copy.success"):r("cross_device.link.link_copy.action"),c=this.state.sending?r("cross_device.link.button_copy.status"):r("cross_device.link.button_copy.action"),u=!this.state.validNumber;return Object(z.h)("div",{className:ka.a.container},a.type?Object(z.h)(Ta,{error:a,trackScreen:o}):Object(z.h)(Pt,{title:r("cross_device.link.title")}),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)("div",{className:ka.a.subTitle},Object(Z.i)(r("cross_device.link.sub_title"),function(e){var t=e.text;return Object(z.h)("span",{className:ka.a.bolder},t)})),Object(z.h)("div",{className:ka.a.smsSection},Object(z.h)("div",{className:ka.a.label},r("cross_device.link.sms_label")),Object(z.h)("div",{className:ka.a.numberInputSection},Object(z.h)("div",{className:rt()(ka.a.inputContainer,W()({},ka.a.fieldError,u))},Object(z.h)(ja,q()({},this.props,{clearErrors:this.clearErrors}))),Object(z.h)(Ft,{ariaLive:"polite",ariaBusy:this.state.sending,className:rt()(ka.a.btn,W()({},ka.a.sending,this.state.sending)),variants:["primary"],onClick:this.handleSendLinkClick,disabled:this.state.sending},c))),Object(z.h)("div",{role:"alert","aria-atomic":"true"},u&&Object(z.h)("div",{className:ka.a.numberError},r("errors.invalid_number.message"))),Object(z.h)("div",{className:ka.a.copyLinkSection},Object(z.h)("div",{tabIndex:"0",className:ka.a.label},r("cross_device.link.copy_link_label")),Object(z.h)("div",{className:rt()(ka.a.linkContainer,this.state.copySuccess&&ka.a.copySuccess)},Object(z.h)("span",{className:ka.a.linkText,ref:function(t){return e.linkText=t}},i),document.queryCommandSupported("copy")&&Object(z.h)("div",{className:ka.a.actionContainer,"aria-live":"polite"},Object(z.h)("button",{type:"button",onClick:function(){return Object(Z.c)(i,e.onCopySuccess)},className:ka.a.copyToClipboard},s))),Object(z.h)("hr",{className:ka.a.divider}))))}}]),t}(z.Component),Aa=fn(Object(ut.b)(Pa),"crossdevice_link"),Ia=n(343),Da=n.n(Ia),Ra=function(e){function t(){return T()(this,t),I()(this,R()(t).apply(this,arguments))}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.props.sendClientSuccess()}},{key:"render",value:function(){var e,t=this.props.translate;return Object(z.h)("div",null,Object(z.h)(Pt,{title:t("cross_device.client_success.title"),subTitle:t("cross_device.client_success.sub_title")}),Object(z.h)("div",{class:At.a.thickWrapper},Object(z.h)("span",{className:E()(e="".concat(At.a.icon,"  ")).call(e,Da.a.icon)}),Object(z.h)("div",{className:Da.a.text},t("cross_device.client_success.body"))))}}]),t}(z.Component),Ma=fn(Object(ut.b)(Ra),"crossdevice_mobile_success"),Fa=n(128),La=n.n(Fa);function Ua(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}var Ba=fn(Object(ut.b)(function(e){var t,n,r,o,i,s,u,d=e.translate,p=e.nextStep,m=e.mobileConfig,v="face"===(n=(t=m).flow,r=void 0===n?"captureSteps":n,o=t.documentType,i=t.poaDocumentType,s=t.steps,u=t.step,Ya({flow:r,documentType:o,poaDocumentType:i,steps:s})[u||0].step.type),y=function(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=Ua(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=Ua(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}({sms:"sms"},v?{"take-selfie":"face.take_photos"}:{"take-photos":"document.take_photos"},{"return-computer":"return_computer"}),g=$()(y);return Object(z.h)("div",{className:At.a.fullHeightMobileContainer},Object(z.h)(Pt,{title:d("cross_device.intro.".concat(v?"face":"document",".title"))}),Object(z.h)("ol",{"aria-label":d("accessibility.cross_device_verification"),className:rt()(At.a.thickWrapper,La.a.content,La.a.list)},C()(g).call(g,function(e){return Object(z.h)("li",{key:e,className:La.a.stage},Object(z.h)("div",{className:rt()(La.a.stageIcon,La.a["stageIcon-".concat(e)])}),Object(z.h)("div",{className:rt()(La.a.stageMessage,La.a["stageMessage-".concat(e)])},d("cross_device.intro.".concat(y[e]))))})),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)(Ft,{variants:["primary","centered"],onClick:p},d("cross_device.intro.".concat(v?"face":"document",".action")))))})),Wa=n(64),Ha=n.n(Wa),qa=function(){return Object(z.h)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 272 217",preserveAspectRatio:"xMidYMin meet",className:Ha.a.docImage},Object(z.h)("text",{transform:"translate(0 59)",className:Ha.a.label},"Full name"),Object(z.h)("text",{transform:"translate(0 90)",className:Ha.a.label},"Current"),Object(z.h)("text",{transform:"translate(0 110)",className:Ha.a.label},"Address"),Object(z.h)("text",{transform:"translate(0 141)",className:Ha.a.label},"Issue date or"),Object(z.h)("text",{transform:"translate(84.314 141)",className:Ha.a.label}),Object(z.h)("text",{transform:"translate(0 161)",className:Ha.a.label},"Summary period"),Object(z.h)("text",{transform:"translate(0 28)",className:Ha.a.label},"Logo"),Object(z.h)("g",{transform:"translate(119)"},Object(z.h)("path",{fill:"#2C3E4F",d:"M8 0h122.79c1.985.002 3.9.744 5.37 2.08l8.65 7.84c.092.084.182.171.27.26l5.57 5.56A8 8 0 0 1 153 21.4V209a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z"}),Object(z.h)("path",{fill:"#FFF",d:"M8.03 4.02h126.2a4.002 4.002 0 0 1 2.83 1.17L147.8 15.9a4.005 4.005 0 0 1 1.171 2.83v190.241a4 4 0 0 1-4 4H8.03a4 4 0 0 1-4-4V8.02a4 4 0 0 1 4-4z"}),Object(z.h)("path",{fill:"#2C3E4F",d:"M135.189 2.95L142 9c.034.029.068.059.1.09l7.521 7.6a2 2 0 0 1-1.42 3.4H133.85a2 2 0 0 1-2-2V4.45a2 2 0 0 1 3.33-1.5h.009z"}),Object(z.h)("path",{fill:"#F3F3F4",d:"M101.66 63.29h30.21a1 1 0 0 1 1 1v2.02a1 1 0 0 1-1 1h-30.21a1 1 0 0 1-1-1v-2.02a1 1 0 0 1 1-1z"}),Object(z.h)("path",{fill:"#D8DADC",d:"M101.66 51.24h38.26a1 1 0 0 1 1 1v6.04a1 1 0 0 1-1 1h-38.26a1 1 0 0 1-1-1v-6.04a1 1 0 0 1 1-1zM13.08 99.46h90.609a1 1 0 0 1 1 1v6.04a1 1 0 0 1-1 1H13.08a1 1 0 0 1-1-1v-6.04a1 1 0 0 1 1-1z"}),Object(z.h)("path",{fill:"#F3F3F4","fill-opacity":".5",d:"M13.08 111.51h130.87a1 1 0 0 1 1 1v71.34a1 1 0 0 1-1 1H13.08a1 1 0 0 1-1-1v-71.34a1 1 0 0 1 1-1z"}),Object(z.h)("path",{fill:"#D8DADC",d:"M41.6 79.37v7.03c0 .55-.399 1-.92 1H13c-.5 0-.92-.45-.92-1V64.3c0-.56.41-1 .92-1h42.45c.5 0 .92.44.92 1v14.06c0 .56-.41 1-.92 1H41.6v.01zM13.08 51.24h66.449a1 1 0 0 1 1 1v6.04a1 1 0 0 1-1 1H13.08a1 1 0 0 1-1-1v-6.04a1 1 0 0 1 1-1z"}),Object(z.h)("ellipse",{fill:"#D8DADC",cx:"28.18",cy:"28.13",rx:"16.11",ry:"16.07"})),Object(z.h)("path",{fill:"#8B9094",d:"M36.5 23h102a.5.5 0 0 1 0 1h-102a.5.5 0 0 1 0-1zM68.5 54h70a.5.5 0 0 1 0 1h-70a.5.5 0 0 1 0-1zM55.5 84h83a.5.5 0 0 1 0 1h-83a.5.5 0 0 1 0-1z"}),Object(z.h)("g",{fill:"#8B9094"},Object(z.h)("path",{d:"M89.5 136h142c.275 0 .5.225.5.5s-.225.5-.5.5h-142a.5.5 0 0 1 0-1z"}),Object(z.h)("path",{d:"M139.5 102a.5.5 0 0 1 .5.5v34a.5.5 0 0 1-1 0v-34a.5.5 0 0 1 .5-.5zM231.5 56a.5.5 0 0 1 .5.5v80c0 .275-.225.5-.5.5a.501.501 0 0 1-.5-.5v-80a.5.5 0 0 1 .5-.5z"})))},Va=fn(Object(ut.b)(function(e){var t=e.translate,n=e.parseTranslatedTags,r=e.poaDocumentType,o=e.nextStep;return Object(z.h)("div",{className:At.a.fullHeightContainer},Object(z.h)(Pt,{title:t("capture.".concat(r,".front.title")),subTitle:Object(z.h)("span",{className:Ha.a.subTitle},n("capture.".concat(r,".front.sub_title"),function(e){var t=e.text;return Object(z.h)("span",{className:Ha.a.bolder},t)}))}),Object(z.h)("div",{className:Ha.a.content},Object(z.h)("div",{className:Ha.a.makeSure},t("proof_of_address.guidance.make_sure_it_shows")),Object(z.h)("div",{className:Ha.a.docImageContainer},Object(z.h)(qa,null))),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)(Ft,{variants:["primary","centered"],onClick:o},t("proof_of_address.guidance.continue"))))})),Ga=n(249),za=n.n(Ga),Ka=fn(Object(ut.b)(function(e){var t,n=e.country,r=e.translate,o=e.parseTranslatedTags,i=e.nextStep;return Object(z.h)("div",{className:At.a.fullHeightContainer},Object(z.h)(Pt,{title:r("proof_of_address.intro.title",{country:n&&"GBR"!==n?"":"UK"})}),Object(z.h)("div",{className:za.a.content},Object(z.h)("p",{className:za.a.requirements},r("proof_of_address.intro.requirements")),C()(t=["shows_address","matches_signup","is_recent"]).call(t,function(e){return Object(z.h)("div",{key:e,className:za.a.requirement},Object(z.h)("span",null,o("proof_of_address.intro.".concat(e),function(e){var t=e.text;return Object(z.h)("span",{className:za.a.bolder},t)})))})),Object(z.h)("div",{className:At.a.thickWrapper},Object(z.h)(Ft,{variants:["primary","centered"],onClick:i},r("proof_of_address.intro.start"))))})),Ya=function(e){var t=e.flow,n=e.documentType,r=e.steps,o=e.mobileFlow,i=o?Za(r):r;return"captureSteps"===t?os(es(n,o,r),i):os(rs,ns(r))},Xa=function(e){return"complete"===e.type},Ja=function(e){return Et()(e).call(e,Xa)},Za=function(e){var t;return Ja(e)?e:E()(t=[]).call(t,ve()(e),[{type:"complete"}])},Qa=function(e){var t,n=k()(e).call(e,function(e){return"document"===e.type}),r=n&&n.options&&n.options.documentTypes;return r?v()(t=$()(r)).call(t,function(e){return r[e]}):[]},es=function(e,t,n){var r=t?[Ma]:[ua];return{welcome:function(){return[yn]},face:function(){return function(e){return"video"===((k()(e).call(e,function(e){return"face"===e.type})||{}).options||{}).requestedVariant&&window.MediaRecorder}(n)?[si,ia]:[ai,oa]},document:function(){return ts(e,function(e){return 1===Qa(e).length}(n))},poa:function(){return[Ka,Mn,Va,ci,na]},complete:function(){return r}}},ts=function(e,t){var n,r,o=["driving_licence","national_identity_card"],i=[oi,na],a=E()(n=[Fn]).call(n,i),s=t?i:a;return vt()(o).call(o,e)?E()(r=[]).call(r,ve()(s),[ii,ra]):s},ns=function(e){var t,n=[{type:"crossDevice"}],r=k()(e).call(e,Xa);return Ja(e)?E()(t=[]).call(t,n,[r]):n},rs={crossDevice:function(){return[Ba,Aa,$a]},complete:function(){return[ua]}},os=function(e,t){return ss(C()(t).call(t,function(t,n){return is(e,t,n)}))},is=function(e,t,n){var r,o=t.type;return o in e||console.error("No such step: "+o),C()(r=e[o]()).call(r,as(t,n))},as=function(e,t){return function(n){return{component:n,step:e,stepIndex:t}}},ss=function(e){var t,n,r;return(n=E()(t=[])).call.apply(n,E()(r=[t]).call(r,ve()(e)))};function cs(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function us(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=cs(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=cs(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var ls=at(function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"trackScreen",function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=r.currentComponent(),i=o.step;ln(E()(t=[i.type]).call(t,ve()(ke(e))),us({},n,{},i.options))}),W()(F()(r),"currentComponent",function(){return r.props.componentsList[r.props.step]}),W()(F()(r),"render",function(){var e,t=r.props,n=t.back,o=t.disableNavigation,i=t.isFullScreen,a=q()({},t.options),s=G()(t,["back","disableNavigation","isFullScreen","options"]),c=r.currentComponent(),u=c.component,l=c.step.options;return Object(z.h)("div",{className:rt()(At.a.step,W()({},At.a.fullScreenStep,i))},Object(z.h)(Di,{back:n,disabled:o,className:At.a.navigationBar}),Object(z.h)("div",{className:rt()(At.a.content,(e={},W()(e,At.a.fullScreenContentWrapper,i),W()(e,At.a.scrollableContent,!i),e))},Object(z.h)(u,q()({},us({},l,{},a,{},s,{back:n}),{trackScreen:r.trackScreen}))),Object(z.h)("div",{className:At.a.footer}))}),r}return U()(t,e),t}(z.Component)),ds=function(e){return function(t){var n=t.back,r=t.disableNavigation;return Object(z.h)("div",{className:At.a.step},Object(z.h)(Di,{back:n,disabled:r,className:At.a.navigationBar}),Object(z.h)("div",{className:At.a.content},Object(z.h)(e,t)),Object(z.h)("div",{className:At.a.footer}))}};function fs(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function ps(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=fs(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=fs(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}var hs=kt()(),ms=!0,vs=ds(So),ys=ds(Xo),gs=function(e){function t(e){var n;T()(this,t),n=I()(this,R()(t).call(this,e)),W()(F()(n),"configTimeoutId",null),W()(F()(n),"pingTimeoutId",null),W()(F()(n),"sendMessage",function(e,t){var r=n.state.roomId;n.state.socket.emit("message",{roomId:r,event:e,payload:t})}),W()(F()(n),"requestMobileConfig",function(){n.sendMessage("get config"),n.clearConfigTimeout(),n.configTimeoutId=$t()(function(){n.state.loading&&n.setError()},1e4)}),W()(F()(n),"clearConfigTimeout",function(){return n.configTimeoutId&&clearTimeout(n.configTimeoutId)}),W()(F()(n),"clearPingTimeout",function(){n.pingTimeoutId&&(clearTimeout(n.pingTimeoutId),n.pingTimeoutId=null)}),W()(F()(n),"setMobileConfig",function(e){return function(t){var r=t.token,o=t.steps,i=t.language,a=t.documentType,s=t.poaDocumentType,c=t.step,u=t.clientStepIndex,l=t.woopraCookie;if(mn(l),!r)return console.error("Desktop did not send token"),hn("Desktop did not send token"),n.setError();if(ee(r))return console.error("Desktop token has expired"),hn("Token has expired: ".concat(r)),n.setError();var d="face"===o[u].type;n.setState({token:r,steps:o,step:d?u:c,stepIndexType:d?"client":"user",crossDeviceError:!1,language:i},function(){return n.setState({loading:!1})}),s?e.setPoADocumentType(s):e.setIdDocumentType(a),e.acceptTerms()}}),W()(F()(n),"setError",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"GENERIC_CLIENT_ERROR";n.setState({crossDeviceError:{name:e},loading:!1})}),W()(F()(n),"onDisconnect",function(){n.pingTimeoutId=$t()(n.setError,3e3),n.sendMessage("disconnect ping")}),W()(F()(n),"onDisconnectPong",function(){return n.clearPingTimeout()}),W()(F()(n),"sendClientSuccess",function(){var e;n.state.socket.off("custom disconnect",n.onDisconnect);var t=ge()(e=$()(n.props.captures)).call(e,function(e,t){return E()(e).call(e,Object(we.g)(n.props.captures[t],["documentType","poaDocumentType","id","metadata","method","side"]))},[]);n.sendMessage("client success",{captures:t})}),W()(F()(n),"render",function(){var e=n.state.language;return Object(z.h)(ut.a,{language:e},n.state.loading?Object(z.h)(vs,{disableNavigation:!0}):n.state.crossDeviceError?Object(z.h)(ys,{disableNavigation:!0,error:n.state.crossDeviceError}):Object(z.h)(_s,q()({},n.props,n.state,{sendClientSuccess:n.sendClientSuccess,crossDeviceClientError:n.setError})))});var r=e.options.urls.sync_url,o=window.location.pathname.substring(3)||e.options.roomId;return n.state={token:null,steps:null,step:null,socket:Ot(r),roomId:o,crossDeviceError:!1,loading:!0},ms&&Z.h?I()(n,n.setError("FORBIDDEN_CLIENT_ERROR")):(n.state.socket.on("config",n.setMobileConfig(e.actions)),n.state.socket.on("connect",function(){n.state.socket.emit("join",{roomId:n.state.roomId})}),n.state.socket.open(),n.requestMobileConfig(),n)}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.state.socket.on("custom disconnect",this.onDisconnect),this.state.socket.on("disconnect pong",this.onDisconnectPong)}},{key:"componentWillUnmount",value:function(){this.clearConfigTimeout(),this.clearPingTimeout(),this.state.socket.close()}}]),t}(z.Component),bs=function(e){function t(e){var n;return T()(this,t),n=I()(this,R()(t).call(this,e)),W()(F()(n),"mobileConfig",function(){var e=n.props,t=e.documentType,r=e.poaDocumentType,o=e.options;return{steps:o.steps,token:o.token,language:o.language,documentType:t,poaDocumentType:r,woopraCookie:vn(),step:n.state.crossDeviceInitialStep,clientStepIndex:n.state.crossDeviceInitialClientStep}}),W()(F()(n),"onFlowChange",function(e,t,r,o){var i=o.userStepIndex,a=o.clientStepIndex;"crossDeviceSteps"===e&&n.setState({crossDeviceInitialStep:i,crossDeviceInitialClientStep:a})}),W()(F()(n),"render",function(e){return Object(z.h)(_s,q()({},e,{steps:e.options.steps,onFlowChange:n.onFlowChange,mobileConfig:n.mobileConfig()}))}),n.state={crossDeviceInitialStep:null},n}return U()(t,e),t}(z.Component),$s=function(e,t){return gt()(e).call(e,function(e){return e.stepIndex===t})},_s=function(e){function t(e){var n;T()(this,t),n=I()(this,R()(t).call(this,e)),W()(F()(n),"onHistoryChange",function(e){var t=e.state;n.setState(ps({},t))}),W()(F()(n),"getStepType",function(e){var t=n.getComponentsList();return t[e]?t[e].step.type:null}),W()(F()(n),"disableNavigation",function(){return n.props.isNavigationDisabled||n.initialStep()||"complete"===n.getStepType(n.state.step)}),W()(F()(n),"initialStep",function(){return n.state.initialStep===n.state.step&&"captureSteps"===n.state.flow}),W()(F()(n),"changeFlowTo",function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=n.state,i=o.flow,a=o.step;if(i!==e){var s=n.getComponentsList()[a];n.props.onFlowChange(e,t,i,{userStepIndex:a,clientStepIndex:s.stepIndex,clientStep:s}),n.setStepIndex(t,e,r)}}),W()(F()(n),"nextStep",function(){var e=n.state.step+1;n.getComponentsList().length===e?n.triggerOnComplete():n.setStepIndex(e)}),W()(F()(n),"triggerOnComplete",function(){var e,t=n.props.captures,r=ge()(e=$()(t)).call(e,function(e,n){return ps({},e,W()({},n,t[n].metadata))},{});n.props.options.events.emit("complete",r)}),W()(F()(n),"formattedError",function(e,t){if("string"==typeof e){var n;try{var r=JSON.parse(e);n=r.unauthorized||r.error||e}catch(t){n=e}return{type:vt()(n).call(n,"expired")?"expired_token":"exception",message:n}}var o=e.error||{};return{type:401===t&&"expired_token"===o.type?"expired_token":"exception",message:o.message||e.reason}}),W()(F()(n),"triggerOnError",function(e){var t,r=e.status,o=e.response;if(0!==r){var i=n.formattedError(o,r),a=i.type,s=i.message;n.props.options.events.emit("error",{type:a,message:s}),hn(E()(t="".concat(a," - ")).call(t,s))}}),W()(F()(n),"previousStep",function(){var e=n.state.step;n.setStepIndex(e-1)}),W()(F()(n),"back",function(){hs.goBack()}),W()(F()(n),"setStepIndex",function(e,t,r){var o=n.state.flow,i={step:e,flow:t||o};if(r)n.setState(i);else{var a,s,c=E()(a=E()(s="".concat(location.pathname)).call(s,location.search)).call(a,location.hash);hs.push(c,i)}}),W()(F()(n),"getComponentsList",function(){return n.buildComponentsList(n.state,n.props)}),W()(F()(n),"buildComponentsList",function(e,t){var n=e.flow,r=t.documentType,o=t.poaDocumentType,i=t.steps,a=t.options.mobileFlow;return Ya({flow:n,documentType:r,poaDocumentType:o,steps:i,mobileFlow:a})}),W()(F()(n),"render",function(e){return Object(z.h)(ls,q()({},e,{componentsList:n.getComponentsList(),step:n.state.step,disableNavigation:n.disableNavigation(),changeFlowTo:n.changeFlowTo,nextStep:n.nextStep,previousStep:n.previousStep,triggerOnError:n.triggerOnError,back:n.back}))});var r=n.buildComponentsList({flow:"captureSteps"},n.props),o="client"===n.props.stepIndexType?$s(r,n.props.step||0):n.props.step||0;return n.state={flow:"captureSteps",step:o,initialStep:o},n.unlisten=hs.listen(n.onHistoryChange),n.setStepIndex(n.state.step,n.state.flow),n}return U()(t,e),N()(t,[{key:"componentWillUnmount",value:function(){this.unlisten()}}]),t}(z.Component);_s.defaultProps={onFlowChange:function(){},stepIndexType:"user"};var ks=Object(K.connect)(function(e){return ps({},e.globals,{captures:e.captures})},function(e){return{actions:Object(te.bindActionCreators)(Xe,e)}})(function(e){var t=e.options.mobileFlow?gs:bs;return Object(z.h)(t,q()({},e,{allowCrossDeviceFlow:!e.options.mobileFlow&&Z.h}))});function ws(e,t){var n=$()(e);if(g.a){var r=g()(e);t&&(r=v()(r).call(r,function(t){return h()(e,t).enumerable})),n.push.apply(n,r)}return n}function Cs(e){for(var t=1;t<arguments.length;t++){var n,r=null!=arguments[t]?arguments[t]:{};if(t%2)f()(n=ws(r,!0)).call(n,function(t){W()(e,t,r[t])});else if(l.a)c()(e,l()(r));else{var o;f()(o=ws(r)).call(o,function(t){a()(e,t,h()(r,t))})}}return e}n.d(t,"init",function(){return Ms});var xs=new X.a;cn.init(),cn.config({domain:"onfido-js-sdk.com",cookie_name:"onfido-js-sdk-woopra",cookie_domain:location.hostname,referer:location.href}),cn.identify(an.match(/^(id|id-dev)\.onfido\.com$/)?{sdk_version:"5.4.0"}:{sdk_version:"5.4.0",client:an}),Wt.a.TraceKit.collectWindowErrors=!0;var Os=function(e){var t=e.options,n=t.useModal,r=t.isModalOpen,o=t.onModalRequestClose,i=t.containerId,a=t.shouldCloseOnOverlayClick,s=G()(t,["useModal","isModalOpen","onModalRequestClose","containerId","shouldCloseOnOverlayClick"]),c=G()(e,["options"]);return Object(z.h)(ht,{useModal:n,isOpen:r,onRequestClose:o,containerId:i,shouldCloseOnOverlayClick:a},Object(z.h)(ks,q()({options:s},c)))},Ss=function(e){function t(){var e,n,r;T()(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return r=I()(this,(e=R()(t)).call.apply(e,E()(n=[this]).call(n,i))),W()(F()(r),"prepareInitialStore",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.userDetails,r=(n=void 0===n?{}:n).smsNumber,o=e.steps,i=t.userDetails,a=(i=void 0===i?{}:i).smsNumber,s=t.steps;if(r&&r!==a&&Je.setMobileNumber(r),o&&o!==s){var c=Qa(o);1===c.length&&Je.setIdDocumentType(c[0])}}),r}return U()(t,e),N()(t,[{key:"componentDidMount",value:function(){this.prepareInitialStore(this.props.options)}},{key:"componentDidUpdate",value:function(e){this.prepareInitialStore(this.props.options,e.options)}},{key:"render",value:function(){var e=this.props.options;return Object(z.h)(K.Provider,{store:Ae},Object(z.h)(ut.a,{language:e.language},Object(z.h)(Os,{options:e})))}}]),t}(z.Component),Es=function(e,t,n){return Object(z.render)(Object(z.h)(Ss,{options:e}),t,n)};xs.on("complete",function(){return un("completed flow")});var js=function(e){var t=e.onComplete,n=e.onError;xs.on("complete",t),xs.on("error",n)},Ts=function(){},Ps={token:void 0,urls:{onfido_api_url:"".concat("https://api.onfido.com"),telephony_url:"".concat("https://telephony.onfido.com"),hosted_sdk_url:"".concat("https://id.onfido.com"),detect_document_url:"".concat("https://sdk.onfido.com"),sync_url:"".concat("https://sync.onfido.com")},containerId:"onfido-mount",onComplete:Ts,onError:Ts},Ns=function(e){return t=e,"object"===O()(t)?e:{type:e};var t},As=function(e){var t,n=e.steps,r=e.smsNumberCountryCode,o=G()(e,["steps","smsNumberCountryCode"]);return Cs({},o,{urls:Rs(o),smsNumberCountryCode:Is(r),steps:C()(t=n||["welcome","document","face","complete"]).call(t,Ns)})},Is=function(e){return e&&function(e){var t=Object(J.a)(e);return t||console.warn("`smsNumberCountryCode` must be a valid two-characters ISO Country Code. 'GB' will be used instead."),t}(e)?tn(e):"GB"},Ds=function(){xs.emit("error",{type:"exception",message:"Invalid token"})},Rs=function(e){var t=e.token,n=t&&function(e,t){var n=null;try{n=Q(e).urls}catch(e){console.error("Invalid token:",e.message),t()}return n}(t,Ds);return Cs({},Ps.urls,{},n)},Ms=function(e){console.log("onfido_sdk_version","5.4.0"),sn.install(),on=!0;var t,n,r=As(Cs({},Ps,{},e,{events:xs}));t=r.steps,(n=k()(t).call(t,function(e){return"document"===e.type}))&&n.options&&n.options.useWebcam&&console.warn("`useWebcam` is an experimental option and is currently discouraged"),js(r);var o=document.getElementById(r.containerId);return{options:r,element:Es(r,o),setOptions:function(e){var t=this.options;return this.options=As(Cs({},this.options,{},e)),this.options.token||Ds(),function(e,t){xs.off("complete",e.onComplete),xs.off("error",e.onError),js(t)}(t,this.options),this.element=Es(this.options,o,this.element),this.options},tearDown:function(){var e=Ae.getState().globals.socket;e&&e.close(),Je.reset(),xs.removeAllListeners("complete","error"),Object(z.render)(null,o,this.element),sn.uninstall(),cn.dispose(),on=!1}}}}])});
//# sourceMappingURL=onfido.min.js.map


var ValidationMessages = function () {
};

ValidationMessages.resolveLang = function () {
    let locale = $("#locale").val();
    return typeof locale !== 'undefined' ? locale.substring(0, 2) : "en";
};

ValidationMessages.messages = {
    cantBeBlank: {
        "en": "Required field",
        "ee": "Required field",
        "lv": "Required field",
        "lt": "Required field",
        "de": "Required field",
        "ru": "Required field"
    },

    customMinLength: {
        "en": "Please enter at least {0} characters",
        "ee": "Please enter at least {0} characters",
        "lv": "Please enter at least {0} characters",
        "lt": "Please enter at least {0} characters",
        "de": "Please enter at least {0} characters",
        "ru": "Please enter at least {0} characters"
    },

    incorrectFormat: {
        "en": "Incorrect format",
        "ee": "Incorrect format",
        "lv": "Incorrect format",
        "lt": "Incorrect format",
        "de": "Incorrect format",
        "ru": "Incorrect format"
    },

    invalidDate: {
        "en": "Invalid date",
        "ee": "Kehtetu kuupäev",
        "lv": "Nederīgs datums",
        "lt": "Neteisinga data",
        "de": "Invalid date",
        "ru": "Invalid date"
    },

    invalidEmail: {
        "en": "Provided email is not a valid e-mail address",
        "ee": "Sisestatud e-mail on vale",
        "lv": "Norādītais e-pasts nav derīga e-pasta adrese",
        "lt": "Pateiktas elektronio pašto adresas negalioja",
        "de": "Die angegebene E-Mail-Adresse ist nicht gültig",
        "ru": "Provided email is not a valid e-mail address"
    },

    lessThanEqual: {
        "en": "The value should not exceed {0}",
        "ee": "The value should not exceed {0}",
        "lv": "The value should not exceed {0}",
        "lt": "The value should not exceed {0}",
        "de": "The value should not exceed {0}",
        "ru": "The value should not exceed {0}"
    }
};

ValidationMessages.get = function (code, lang) {
    var self = this;
    lang = ((typeof lang !== 'undefined') ? lang : self.resolveLang());
    return this.messages[code][lang];
};
//= require validationMessages.js
//= require customValidators.js
//= require_self

console.debug('validation manifest loaded...');

var FormValidation = (function (formName) {
    "use strict";

    if (formName === undefined || formName === '' || $('#' + formName) === undefined) {
        console.error("form validation requires valid form name...")
    } else {
        this.formName = formName;
    }

    this.commonValidators = new CustomValidator();
});

/**
 * @param validatorArray array of validator names to load. Leave empty to load all
 */
FormValidation.prototype.init = function (validatorArray) {

    var self = this;

    if (validatorArray.length > 0) {
        $.each(validatorArray, function () {
            self.commonValidators.claim(this);
        });
    } else {
        this.commonValidators.claim();
    }


    $("#" + self.formName).validate({
        ignore: [],
        rules: {},
        messages: {},
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("bmd-help help-block");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element)
                .parents(".form-group")
                .addClass("jq-has-error")
                .removeClass("jq-has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element)
                .parents(".form-group")
                .addClass("jq-has-success")
                .removeClass("jq-has-error");
        }
    });

};
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).veriffSDK={})}(this,function(e){"use strict";"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var n,t,o=(function(e,n){!function(e){function r(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0});var u=!1;if("undefined"!=typeof window){var n={get passive(){u=!0}};window.addEventListener("testPassive",null,n),window.removeEventListener("testPassive",null,n)}var a="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],d=!1,l=-1,f=void 0,s=void 0,m=function(n){return c.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(n))})},v=function(e){var n=e||window.event;return!!m(n.target)||(1<n.touches.length||(n.preventDefault&&n.preventDefault(),!1))},t=function(){setTimeout(function(){void 0!==s&&(document.body.style.paddingRight=s,s=void 0),void 0!==f&&(document.body.style.overflow=f,f=void 0)})};e.disableBodyScroll=function(i,e){if(a){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var n={targetElement:i,options:e||{}};c=[].concat(r(c),[n]),i.ontouchstart=function(e){1===e.targetTouches.length&&(l=e.targetTouches[0].clientY)},i.ontouchmove=function(e){var n,t,o,r;1===e.targetTouches.length&&(t=i,r=(n=e).targetTouches[0].clientY-l,!m(n.target)&&(t&&0===t.scrollTop&&0<r?v(n):(o=t)&&o.scrollHeight-o.scrollTop<=o.clientHeight&&r<0?v(n):n.stopPropagation()))},d||(document.addEventListener("touchmove",v,u?{passive:!1}:void 0),d=!0)}}else{o=e,setTimeout(function(){if(void 0===s){var e=!!o&&!0===o.reserveScrollBarGap,n=window.innerWidth-document.documentElement.clientWidth;e&&0<n&&(s=document.body.style.paddingRight,document.body.style.paddingRight=n+"px")}void 0===f&&(f=document.body.style.overflow,document.body.style.overflow="hidden")});var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t])}var o},e.clearAllBodyScrollLocks=function(){a?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),d&&(document.removeEventListener("touchmove",v,u?{passive:!1}:void 0),d=!1),c=[],l=-1):(t(),c=[])},e.enableBodyScroll=function(n){if(a){if(!n)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");n.ontouchstart=null,n.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==n}),d&&0===c.length&&(document.removeEventListener("touchmove",v,u?{passive:!1}:void 0),d=!1)}else(c=c.filter(function(e){return e.targetElement!==n})).length||t()}}(n)}(n={exports:{}},n.exports),n.exports);(t=o)&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")&&t.default;function r(e){for(var n=Array(e.length),t=0;t<e.length;++t)n[t]=e[t];return n}function l(e){return Array.isArray(e)?e:[e]}function i(e,n){var t=e.tabIndex-n.tabIndex,o=e.index-n.index;if(t){if(!e.tabIndex)return 1;if(!n.tabIndex)return-1}return t||o}function f(e,n,t){return r(e).map(function(e,n){return{node:e,index:n,tabIndex:t&&-1===e.tabIndex?(e.dataset||{}).focusGuard?0:-1:e.tabIndex}}).filter(function(e){return!n||0<=e.tabIndex}).sort(i)}function s(e,t){return e.reduce(function(e,n){return e.concat(r(n.querySelectorAll(t?F:L)),n.parentNode?r(n.parentNode.querySelectorAll(O.join(","))).filter(function(e){return e===n}):[])},[])}function u(e,n){var t=1<arguments.length&&void 0!==n?n:[];return t.push(e),e.parentNode&&u(e.parentNode,t),t}function m(e,n){for(var t=u(e),o=u(n),r=0;r<t.length;r+=1){var i=t[r];if(0<=o.indexOf(i))return i}return!1}function v(e){return r(e).filter(function(e){return function e(n){return!n||n===document||n.nodeType===Node.DOCUMENT_NODE||!function(e){return!(!e||!e.getPropertyValue)&&("none"===e.getPropertyValue("display")||"hidden"===e.getPropertyValue("visibility"))}(window.getComputedStyle(n,null))&&e(n.parentNode)}(e)}).filter(function(e){return function(e){return!(("INPUT"===e.tagName||"BUTTON"===e.tagName)&&("hidden"===e.type||e.disabled))}(e)})}function p(e,n){return f(v(s(e,n)),!0,n)}function g(e){return v(function(e){var n=e.querySelectorAll("[data-autofocus-inside]");return r(n).map(function(e){return s([e])}).reduce(function(e,n){return e.concat(n)},[])}(e))}function a(e){return"INPUT"===e.tagName&&"radio"===e.type}function y(e){return e[0]&&1<e.length&&a(e[0])&&e[0].name?function(n,e){return e.filter(a).filter(function(e){return e.name===n.name}).filter(function(e){return e.checked})[0]||n}(e[0],e):e[0]}function h(e){return l(e).filter(Boolean).reduce(function(e,n){var t=n.getAttribute(B);return e.push.apply(e,t?function e(t){for(var n=t.length,o=0;o<n;o+=1)for(var r=function(n){if(o!==n&&t[o].contains(t[n]))return{v:e(t.filter(function(e){return e!==t[n]}))}},i=0;i<n;i+=1){var u=r(i);if("object"===(void 0===u?"undefined":P(u)))return u.v}return t}(r(function e(n){return n.parentNode?e(n.parentNode):n}(n).querySelectorAll("["+B+'="'+t+'"]:not([data-focus-lock-disabled="disabled"])'))):[n]),e},[])}function b(e){return e.dataset&&e.dataset.focusGuard}function w(e){return!b(e)}function c(e,n){var t=document&&document.activeElement,o=h(e).filter(w),r=function(e,n,t){var o=l(e),r=l(n),i=o[0],u=null;return r.filter(Boolean).forEach(function(e){u=m(u||e,e)||u,t.filter(Boolean).forEach(function(e){var n=m(i,e);n&&(u=!u||n.contains(u)?n:m(n,u))})}),u}(t||e,e,o),i=p(o).filter(function(e){var n=e.node;return w(n)});if(i[0]||(i=function(e){return f(v(s(e)),!1)}(o).filter(function(e){var n=e.node;return w(n)}))[0]){var u=p([r]).map(function(e){return e.node}),a=function(e,n){var t=new Map;return n.forEach(function(e){return t.set(e.node,e)}),e.map(function(e){return t.get(e)}).filter(Boolean)}(u,i),c=a.map(function(e){return e.node}),d=function(e,n,t,o,r){var i=e.length,u=e[0],a=e[i-1];if(!(0<=e.indexOf(t))){var c=n.indexOf(t),d=n.indexOf(o||c),l=e.indexOf(o),f=c-d,s=n.indexOf(u),m=n.indexOf(a);return-1===c||-1===l?e.indexOf(r.length?y(r):y(e)):!f&&0<=l?l:c<=s&&b(t)&&1<Math.abs(f)?0:f&&1<Math.abs(f)?l:c<=s?i-1:m<c?0:f?1<Math.abs(f)?l:(i+l+f)%i:void 0}}(c,u,t,n,c.filter(function(n){return function(e){return!!e.autofocus||e.dataset&&!!e.dataset.autofocus||0<=n.indexOf(e)}}(function(e){return e.reduce(function(e,n){return e.concat(g(n))},[])}(o))));return void 0===d?d:a[d]}}function d(e){return e===document.activeElement}function E(e){var t=document&&document.activeElement;return!(!t||t.dataset&&t.dataset.focusGuard)&&h(e).reduce(function(e,n){return e||n.contains(t)||function(e){return!!function(e,n){return e.filter(function(e){return e===n})[0]}(r(e.querySelectorAll("iframe")),d)}(n)},!1)}function x(){return document&&document.activeElement===document.body||document&&r(document.querySelectorAll("[data-no-focus-lock]")).some(function(e){return e.contains(document.activeElement)})}function S(){var e=!1;if(M){var n=M;x()||(n&&!E(n)&&(e=function(e,n){var t=c(e,n);if(!D&&t){if(2<k)return console.error("FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting"),D=!0,void setTimeout(function(){D=!1},1);k++,function(e){e.focus(),e.contentWindow&&e.contentWindow.focus()}(t.node),k--}}(n,_)),_=document.activeElement)}return e}function N(e){return!!function(e){(M=e)&&S()}(function(e){return e.filter(function(e){return e}).slice(-1)[0]}(R))&&(e&&e.preventDefault(),!0)}var I=o.disableBodyScroll,T=o.enableBodyScroll,A=o.clearAllBodyScrollLocks,O=["button:enabled:not([readonly])","select:enabled:not([readonly])","textarea:enabled:not([readonly])","input:enabled:not([readonly])","a[href]","area[href]","iframe","object","embed","[tabindex]","[contenteditable]","[autofocus]"],B="data-focus-lock",L=O.join(","),F=L+", [data-focus-guard]",P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k=0,D=!1,M=0,_=null,R=[],C={on:function(e){0===R.length&&document.addEventListener("focusin",N),R.indexOf(e)<0&&(R.push(e),N())},off:function(n){R=R.filter(function(e){return e!==n}),N(),0===R.length&&document.removeEventListener("focusin",N)}},V="VERIFF_HANDSHAKE",j="VERIFF_RENDER",q="VERIFF_FINISHED",H="VERIFF_CANCELED",U="FINISHED",W="CANCELED",G="\n  position: fixed !important;\n  top: 0 !important;\n  right: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  z-index: 9999999;\n  display: block !important;\n  width: 100vw;\n  height: 100%;\n  margin: 0 !important;\n  padding: 0 !important;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  background: rgba(0, 0, 0, 0.6);\n",K="\n  position: absolute !important;\n  top: 0 !important;\n  right: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  width: 100vw;\n  height: 100%;\n  margin: 0 !important;\n  padding: 0 !important;\n  background: none;\n  border: none\n",Y="veriffFrame";e.createVeriffFrame=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=e.url,t=e.onEvent,o=void 0===t?function(){}:t;if(!n)throw new Error("URL is not provided. Please provide a valid Veriff session url.");function r(){var e=document.getElementById(Y);e&&e.parentNode?(C.off(e),T(e),e.parentNode.parentNode.removeChild(e.parentNode)):A();window.removeEventListener("message",i)}function i(e){var n=document.getElementById(Y);e.data===V&&n.contentWindow.postMessage(j,"*"),e.data===H&&(r(),o(W)),e.data===q&&(r(),o(U))}return function(e){var n=document.createElement("iframe");n.src=e,n.allow="camera; microphone",n.id=Y,n.style.cssText=K;var t=document.createElement("div");t.style.cssText=G,t.appendChild(n),document.body.appendChild(t),C.on(n),I(n)}(n),window.addEventListener("message",i),{close:r}},Object.defineProperty(e,"__esModule",{value:!0})});

//= require_tree /validation
//= require_self

console.debug('password reset validation manifest loaded...');

$(document).ready(function () {
    "use strict";

    var passwordForgotForm = new FormValidation('forgotPasswordForm');
    passwordForgotForm.init(['emailValidator']);

    initFieldValidations();
});


function initFieldValidations() {
    $("#emailAddress").rules("add", {
        required: true,
        validEmail: true
    });
}

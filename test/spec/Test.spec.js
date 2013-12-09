var StructureTS;
(function (StructureTS) {
    var NumberUtil = (function () {
        function NumberUtil() {
        }
        NumberUtil.bytesToMegabytes = function (bytes) {
            return bytes / 1048576;
        };

        NumberUtil.centimeterToInch = function (cm) {
            return cm * 0.39370;
        };

        NumberUtil.inchToCentimeter = function (inch) {
            return inch * 2.54;
        };

        NumberUtil.feetToMeter = function (feet) {
            return feet / 3.2808;
        };

        NumberUtil.convertToHHMMSS = function (seconds) {
            var sec = isNaN(seconds) ? 0 : seconds;

            var s = sec % 60;
            var m = Math.floor((sec % 3600) / 60);
            var h = Math.floor(sec / (60 * 60));

            var hourStr = (h == 0) ? "" : NumberUtil.doubleDigitFormat(h) + ":";
            var minuteStr = NumberUtil.doubleDigitFormat(m) + ":";
            var secondsStr = NumberUtil.doubleDigitFormat(s);

            return hourStr + minuteStr + secondsStr;
        };

        NumberUtil.doubleDigitFormat = function (num) {
            if (num < 10) {
                return ("0" + num);
            }
            return String(num);
        };
        NumberUtil.CLASS_NAME = 'NumberUtil';
        return NumberUtil;
    })();
    StructureTS.NumberUtil = NumberUtil;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var ValidationUtil = (function () {
        function ValidationUtil() {
        }
        ValidationUtil.isValidEmailAddress = function (email) {
            var expression = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            return expression.test(email);
        };

        ValidationUtil.isValidPhoneNumber = function (phoneNumber) {
            var expression = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
            return expression.test(phoneNumber);
        };

        ValidationUtil.isZipCode = function (zipCode) {
            var expression = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
            return expression.test(zipCode);
        };

        ValidationUtil.isPostalCode = function (postalCode) {
            var expression = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
            return expression.test(postalCode);
        };

        ValidationUtil.isSocialSecurityNumber = function (ssn) {
            var expression = /^\d{3}-?\d{2}-?\d{4}$/;
            return expression.test(ssn);
        };
        ValidationUtil.CLASS_NAME = 'ValidationUtil';
        return ValidationUtil;
    })();
    StructureTS.ValidationUtil = ValidationUtil;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.stringToBoolean = function (str) {
            return (str.toLowerCase() == "true" || str.toLowerCase() == "1");
        };

        StringUtil.getExtension = function (filename) {
            return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
        };

        StringUtil.hyphenToCamelCase = function (str) {
            str = str.toLowerCase();

            return str.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
        };

        StringUtil.hyphenToPascalCase = function (str) {
            str = str.toLowerCase();

            return str.replace(/(\-|^)([a-z])/gi, function (match, delimiter, hyphenated) {
                return hyphenated.toUpperCase();
            });
        };

        StringUtil.camelCaseToHyphen = function (str) {
            return str.replace(/([a-z][A-Z])/g, function (g) {
                return g[0] + '-' + g[1].toLowerCase();
            });
        };

        StringUtil.createUUID = function () {
            var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = (c == 'x') ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            return uuid;
        };

        StringUtil.queryStringToObject = function (queryString) {
            var params = {};
            var temp = null;

            var queries = queryString.substring(1).split("&");

            var len = queries.length;
            for (var i = 0; i < len; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }

            return params;
        };

        StringUtil.removeAllWhitespace = function (str) {
            return str.replace(/\s+/g, '');
        };

        StringUtil.removeLeadingTrailingWhitespace = function (str) {
            return str.replace(/(^\s+|\s+$)/g, '');
        };

        StringUtil.truncate = function (text, length) {
            if (text.length <= length) {
                return text;
            } else {
                return text.substr(0, length) + "...";
            }
        };
        StringUtil.CLASS_NAME = 'StringUtil';
        return StringUtil;
    })();
    StructureTS.StringUtil = StringUtil;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var MerchantUtil = (function () {
        function MerchantUtil() {
        }
        MerchantUtil.isCreditCard = function (cardNumber) {
            if (cardNumber.length < 7 || cardNumber.length > 19 || Number(cardNumber) < 1000000) {
                return false;
            }

            var pre;
            var sum = 0;
            var alt = true;

            var i = cardNumber.length;
            while (--i > -1) {
                if (alt) {
                    sum += Number(cardNumber.substr(i, 1));
                } else {
                    pre = Number(cardNumber.substr(i, 1)) * 2;
                    sum += (pre > 8) ? pre -= 9 : pre;
                }

                alt = !alt;
            }

            return sum % 10 == 0;
        };

        MerchantUtil.encodeCreditCardNumber = function (strNumber, digitsShown, encodeChar) {
            if (typeof digitsShown === "undefined") { digitsShown = 4; }
            if (typeof encodeChar === "undefined") { encodeChar = "*"; }
            var encoded = "";
            for (var i = 0; i < strNumber.length - digitsShown; i++) {
                encoded += encodeChar;
            }
            encoded += strNumber.slice(-digitsShown);
            return encoded;
        };

        MerchantUtil.getCreditCardProvider = function (cardNumber) {
            if (!MerchantUtil.isCreditCard(cardNumber)) {
                return 'invalid';
            }

            if (cardNumber.length == 13 || cardNumber.length == 16 && cardNumber.indexOf('4') == 0) {
                return 'visa';
            } else if (cardNumber.indexOf('51') == 0 || cardNumber.indexOf('52') == 0 || cardNumber.indexOf('53') == 0 || cardNumber.indexOf('54') == 0 || cardNumber.indexOf('55') == 0 && cardNumber.length == 16) {
                return 'mastercard';
            } else if (cardNumber.length == 16 && cardNumber.indexOf('6011') == 0) {
                return 'discover';
            } else if (cardNumber.indexOf('34') == 0 || cardNumber.indexOf('37') == 0 && cardNumber.length == 15) {
                return 'amex';
            } else if (cardNumber.indexOf('300') == 0 || cardNumber.indexOf('301') == 0 || cardNumber.indexOf('302') == 0 || cardNumber.indexOf('303') == 0 || cardNumber.indexOf('304') == 0 || cardNumber.indexOf('305') == 0 || cardNumber.indexOf('36') == 0 || cardNumber.indexOf('38') == 0 && cardNumber.length == 14) {
                return 'diners';
            } else {
                return 'other';
            }
        };

        MerchantUtil.isValidExpirationDate = function (month, year) {
            var d = new Date();
            var currentMonth = d.getMonth() + 1;
            var currentYear = d.getFullYear();
            if ((year > currentYear) || (year == currentYear && month >= currentMonth)) {
                return true;
            }
            return false;
        };
        MerchantUtil.CLASS_NAME = 'MerchantUtil';
        return MerchantUtil;
    })();
    StructureTS.MerchantUtil = MerchantUtil;
})(StructureTS || (StructureTS = {}));
var NumberUtil = StructureTS.NumberUtil;
describe("NumberUtil", function () {
    it("centimeterToInch() 1 centimeter should be 0.3937 inches", function () {
        expect(NumberUtil.centimeterToInch(1)).toEqual(0.3937);
    });

    it("bytesToMegabytes() 100000 bytes should be 0.095367432 megabytes", function () {
        expect(Number(NumberUtil.bytesToMegabytes(100000).toFixed(9))).toEqual(0.095367432);
    });

    it("inchToCentimeter() 1 inch should be 2.54 centimeters", function () {
        expect(NumberUtil.inchToCentimeter(1)).toEqual(2.54);
    });

    it("feetToMeter() 1 foot should be 0.3048 meters", function () {
        expect(Number(NumberUtil.feetToMeter(1).toFixed(4))).toEqual(0.3048);
    });

    it("convertToHHMMSS() 33333 seconds should be 09:15:33", function () {
        expect(NumberUtil.convertToHHMMSS(33333)).toEqual('09:15:33');
    });

    it("doubleDigitFormat() 8 seconds should be 08", function () {
        expect(NumberUtil.doubleDigitFormat(8)).toEqual('08');
    });
});

var ValidationUtil = StructureTS.ValidationUtil;
describe("ValidationUtil", function () {
    it("isValidEmailAddress()", function () {
        expect(ValidationUtil.isValidEmailAddress('a@a.org')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('a@b.co-foo.uk')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('a@a.a')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('a+co@a.a')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('first.last@iana.org')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('first.last@123.iana.org')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('asdf@adsf.adsf')).toBeTruthy();
        expect(ValidationUtil.isValidEmailAddress('test@xn--example.com')).toBeTruthy();

        expect(ValidationUtil.isValidEmailAddress('first.last@sub.do,com')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('first\@last@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('"first@last"@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('"first\\last"@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('.first.last@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('first..last@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('first.last@com')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('nicolas.@gmail..com')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('a@bar.com.')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('test@@iana.org')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('NotAnEmail')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('@NotAnEmail')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('NotAnEmail@asdf')).toBeFalsy();
        expect(ValidationUtil.isValidEmailAddress('a@b')).toBeFalsy();
    });

    it("isValidPhoneNumber()", function () {
        expect(ValidationUtil.isValidPhoneNumber('1234567899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('123 456 7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('123-456-7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('123.456.7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('(123)-456-7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('(123).456.7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('(123) 456 7899')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('1 123-234-4567')).toBeTruthy();
        expect(ValidationUtil.isValidPhoneNumber('1 123.234.4567')).toBeTruthy();

        expect(ValidationUtil.isValidPhoneNumber('3456')).toBeFalsy();
    });

    it("isZipCode()", function () {
        expect(ValidationUtil.isZipCode('55067')).toBeTruthy();
        expect(ValidationUtil.isZipCode('55067-4434')).toBeTruthy();
        expect(ValidationUtil.isZipCode('55067 4434')).toBeTruthy();
        expect(ValidationUtil.isZipCode('550674434')).toBeTruthy();

        expect(ValidationUtil.isZipCode('550673')).toBeFalsy();
        expect(ValidationUtil.isZipCode('55067-44343')).toBeFalsy();
        expect(ValidationUtil.isZipCode('55067 44343')).toBeFalsy();
        expect(ValidationUtil.isZipCode('P8N 3G3')).toBeFalsy();
    });

    it("isPostalCode()", function () {
        expect(ValidationUtil.isPostalCode('P8N 3G3')).toBeTruthy();
        expect(ValidationUtil.isPostalCode('P8N3G3')).toBeTruthy();

        expect(ValidationUtil.isPostalCode('P8N-3G3')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('P8N3G32')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('P8N 3G32')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('ADF REE')).toBeFalsy();
    });

    it("isSocialSecurityNumber()", function () {
        expect(ValidationUtil.isSocialSecurityNumber('078051120')).toBeTruthy();
        expect(ValidationUtil.isSocialSecurityNumber('078-05-1120')).toBeTruthy();

        expect(ValidationUtil.isSocialSecurityNumber('078 05 1120')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('078-05-11203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('078 05 11203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('0780511203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('346774')).toBeFalsy();
    });
});

var StringUtil = StructureTS.StringUtil;
describe("StringUtil", function () {
    it("stringToBoolean()", function () {
        expect(StringUtil.stringToBoolean("1")).toBeTruthy();
        expect(StringUtil.stringToBoolean("true")).toBeTruthy();
        expect(StringUtil.stringToBoolean("TRUE")).toBeTruthy();
        expect(StringUtil.stringToBoolean("FALSE")).toBeFalsy();
        expect(StringUtil.stringToBoolean("false")).toBeFalsy();
        expect(StringUtil.stringToBoolean("0")).toBeFalsy();
    });

    it("getExtension()", function () {
        expect(StringUtil.getExtension("file.exe")).toEqual("exe");
        expect(StringUtil.getExtension("file.jpg.zip")).toEqual("zip");
    });

    it("hyphenToCamelCase()", function () {
        expect(StringUtil.hyphenToCamelCase("hyphen-to-camel-case")).toEqual("hyphenToCamelCase");
        expect(StringUtil.hyphenToCamelCase("hyphen-TO-camel-CASE")).toEqual("hyphenToCamelCase");
    });

    it("hyphenToPascalCase()", function () {
        expect(StringUtil.hyphenToPascalCase("hyphen-to-camel-case")).toEqual("HyphenToCamelCase");
        expect(StringUtil.hyphenToPascalCase("hyphen-TO-camel-CASE")).toEqual("HyphenToCamelCase");
    });

    it("camelCaseToHyphen()", function () {
        expect(StringUtil.camelCaseToHyphen("hyphenToCamelCase")).toEqual("hyphen-to-camel-case");
    });

    it("removeAllWhitespace()", function () {
        expect(StringUtil.removeAllWhitespace("   a b    c d e f g ")).toEqual("abcdefg");
    });

    it("removeLeadingTrailingWhitespace()", function () {
        expect(StringUtil.removeLeadingTrailingWhitespace("   a b    c d e f g ")).toEqual("a b    c d e f g");
    });

    it("truncate()", function () {
        expect(StringUtil.truncate("Robert is cool and he knows it.", 14)).toEqual("Robert is cool...");
    });
});

var MerchantUtil = StructureTS.MerchantUtil;
describe("MerchantUtil", function () {
    it("isCreditCard()", function () {
        expect(MerchantUtil.isCreditCard("1234567890123456")).toBeTruthy();
    });
});

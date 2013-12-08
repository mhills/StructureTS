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
            var expression = /^\d{5}([\-]\d{4})?$/;
            return expression.test(zipCode);
        };

        ValidationUtil.isPostalCode = function (postalCode) {
            var expression = /^([ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9])*$/;
            return expression.test(postalCode);
        };

        ValidationUtil.isSocialSecurityNumber = function (ssn) {
            var expression = /^\d{3}-\d{2}-\d{4}$/;
            return expression.test(ssn);
        };
        ValidationUtil.CLASS_NAME = 'ValidationUtil';
        return ValidationUtil;
    })();
    StructureTS.ValidationUtil = ValidationUtil;
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
    });
});

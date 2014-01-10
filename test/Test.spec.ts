///<reference path='jasmine.d.ts'/>
///<reference path='../src/com/codebelt/structurets/util/NumberUtil.ts'/>
///<reference path='../src/com/codebelt/structurets/util/ValidationUtil.ts'/>
///<reference path='../src/com/codebelt/structurets/util/StringUtil.ts'/>
///<reference path='../src/com/codebelt/structurets/util/MerchantUtil.ts'/>

//http://net.tutsplus.com/tutorials/javascript-ajax/testing-your-javascript-with-jasmine/

import NumberUtil = StructureTS.NumberUtil;
describe("NumberUtil", function() {
    it("centimeterToInch() 1 centimeter should be 0.3937 inches", function() {
        expect(NumberUtil.centimeterToInch(1)).toEqual(0.3937);
    });

    it("bytesToMegabytes() 100000 bytes should be 0.095367432 megabytes", function() {
        expect(Number(NumberUtil.bytesToMegabytes(100000).toFixed(9))).toEqual(0.095367432);
    });

    it("inchToCentimeter() 1 inch should be 2.54 centimeters", function() {
        expect(NumberUtil.inchToCentimeter(1)).toEqual(2.54);
    });

    it("feetToMeter() 1 foot should be 0.3048 meters", function() {
        expect(Number(NumberUtil.feetToMeter(1).toFixed(4))).toEqual(0.3048);
    });

    it("convertToHHMMSS() 33333 seconds should be 09:15:33", function() {
        expect(NumberUtil.convertToHHMMSS(33333)).toEqual('09:15:33');
    });

    it("doubleDigitFormat() 8 seconds should be 08", function() {
        expect(NumberUtil.doubleDigitFormat(8)).toEqual('08');
    });

    it("unformat()", function() {
        expect(NumberUtil.unformatUnit("$1,234,567.89")).toEqual(1234567.89);
        expect(NumberUtil.unformatUnit("1.234.567,89 €")).toEqual(1234567.89);
        expect(NumberUtil.unformatUnit("1 234 567,89£")).toEqual(1234567.89);
        expect(NumberUtil.unformatUnit("123 456 789,99 $")).toEqual(123456789.99);
        expect(NumberUtil.unformatUnit("-123.456.789,99 $")).toEqual(-123456789.99);
        expect(NumberUtil.unformatUnit("$-123,456,789.99")).toEqual(-123456789.99);
    });

    it("formatCost()", function() {
        expect(NumberUtil.formatUnit(1234567.89, 2, "*", ",", "$", 0)).toEqual('$1,234,567.89');
        expect(NumberUtil.formatUnit(1234.5676, 2, "*", ",",  " $", 1)).toEqual('1,234.57 $');
        expect(NumberUtil.formatUnit(12341234.56, 2, "*", ",",  " €", 1)).toEqual('12,341,234.56 €');
    });
});

import ValidationUtil = StructureTS.ValidationUtil;
describe("ValidationUtil", function() {
    it("isValidEmailAddress()", function() {
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

    it("isValidPhoneNumber()", function() {
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

    it("isZipCode()", function() {
        expect(ValidationUtil.isZipCode('55067')).toBeTruthy();
        expect(ValidationUtil.isZipCode('55067-4434')).toBeTruthy();
        expect(ValidationUtil.isZipCode('55067 4434')).toBeTruthy();
        expect(ValidationUtil.isZipCode('550674434')).toBeTruthy();

        expect(ValidationUtil.isZipCode('550673')).toBeFalsy();
        expect(ValidationUtil.isZipCode('55067-44343')).toBeFalsy();
        expect(ValidationUtil.isZipCode('55067 44343')).toBeFalsy();
        expect(ValidationUtil.isZipCode('P8N 3G3')).toBeFalsy();
    });

    it("isPostalCode()", function() {
        expect(ValidationUtil.isPostalCode('P8N 3G3')).toBeTruthy();
        expect(ValidationUtil.isPostalCode('P8N3G3')).toBeTruthy();

        expect(ValidationUtil.isPostalCode('P8N-3G3')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('P8N3G32')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('P8N 3G32')).toBeFalsy();
        expect(ValidationUtil.isPostalCode('ADF REE')).toBeFalsy();
    });

    it("isSocialSecurityNumber()", function() {
        expect(ValidationUtil.isSocialSecurityNumber('078051120')).toBeTruthy();
        expect(ValidationUtil.isSocialSecurityNumber('078-05-1120')).toBeTruthy();

        expect(ValidationUtil.isSocialSecurityNumber('078 05 1120')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('078-05-11203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('078 05 11203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('0780511203')).toBeFalsy();
        expect(ValidationUtil.isSocialSecurityNumber('346774')).toBeFalsy();
    });
});

import StringUtil = StructureTS.StringUtil;
describe("StringUtil", function() {
    it("stringToBoolean()", function() {
        expect(StringUtil.stringToBoolean("1")).toBeTruthy();
        expect(StringUtil.stringToBoolean("true")).toBeTruthy();
        expect(StringUtil.stringToBoolean("TRUE")).toBeTruthy();
        expect(StringUtil.stringToBoolean("FALSE")).toBeFalsy();
        expect(StringUtil.stringToBoolean("false")).toBeFalsy();
        expect(StringUtil.stringToBoolean("0")).toBeFalsy();
    });

    it("getExtension()", function() {
        expect(StringUtil.getExtension("file.exe")).toEqual("exe");
        expect(StringUtil.getExtension("file.jpg.zip")).toEqual("zip");
    });

    it("hyphenToCamelCase()", function() {
        expect(StringUtil.hyphenToCamelCase("hyphen-to-camel-case")).toEqual("hyphenToCamelCase");
        expect(StringUtil.hyphenToCamelCase("hyphen-TO-camel-CASE")).toEqual("hyphenToCamelCase");
    });

//    it("hyphenToPascalCase()", function() {
//        expect(StringUtil.hyphenToPascalCase("hyphen-to-camel-case")).toEqual("HyphenToCamelCase");
//        expect(StringUtil.hyphenToPascalCase("hyphen-TO-camel-CASE")).toEqual("HyphenToCamelCase");
//    });

    it("camelCaseToHyphen()", function() {
        expect(StringUtil.camelCaseToHyphen("hyphenToCamelCase")).toEqual("hyphen-to-camel-case");
    });

//    it("queryStringToObject()", function() {
//    });

    it("removeAllWhitespace()", function() {
        expect(StringUtil.removeAllWhitespace("   a b    c d e f g ")).toEqual("abcdefg");
    });

    it("removeLeadingTrailingWhitespace()", function() {
        expect(StringUtil.removeLeadingTrailingWhitespace("   a b    c d e f g ")).toEqual("a b    c d e f g");
    });

    it("truncate()", function() {
        expect(StringUtil.truncate("Robert is cool and he knows it.", 14)).toEqual("Robert is cool...");
    });
});


import MerchantUtil = StructureTS.MerchantUtil;
describe("MerchantUtil", function() {
    //http://www.freeformatter.com/credit-card-number-generator-validator.html
    it("isCreditCard()", function() {
        expect(MerchantUtil.isCreditCard("4556106734384949")).toBeTruthy();
        expect(MerchantUtil.isCreditCard("1234567890123456")).toBeFalsy();
    });

    it("encodeCreditCardNumber()", function() {
        expect(MerchantUtil.encodeCreditCardNumber("4556106734384949")).toEqual("************4949");
        expect(MerchantUtil.encodeCreditCardNumber("4556106734384949", 5, "x")).toEqual("xxxxxxxxxxx84949");
    });

    it("getCreditCardProvider()", function() {
        expect(MerchantUtil.getCreditCardProvider("1234567890123456")).toEqual("invalid");
        expect(MerchantUtil.getCreditCardProvider("4556106734384949")).toEqual("visa");
        expect(MerchantUtil.getCreditCardProvider("5428070016026573")).toEqual("mastercard");
        expect(MerchantUtil.getCreditCardProvider("344499834236852")).toEqual("amex");
        expect(MerchantUtil.getCreditCardProvider("30047198581956")).toEqual("diners");
        expect(MerchantUtil.getCreditCardProvider("6771593131817460")).toEqual("other");
    });

    it("isValidExpirationDate()", function() {
        expect(MerchantUtil.isValidExpirationDate(8, 2090)).toBeTruthy();
        expect(MerchantUtil.isValidExpirationDate(11, 2013)).toBeFalsy();
    });
});
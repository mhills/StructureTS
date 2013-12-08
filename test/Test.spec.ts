///<reference path='jasmine.d.ts'/>
///<reference path='../src/com/codebelt/structurets/util/NumberUtil.ts'/>
///<reference path='../src/com/codebelt/structurets/util/ValidationUtil.ts'/>

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
    });
});
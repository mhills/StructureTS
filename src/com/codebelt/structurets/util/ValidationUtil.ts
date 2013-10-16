/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * A ValidationUtility class that has several static methods to assist in development.
 *
 * @class ValidationUtil
 * @module StructureTS
 * @submodule util
 * @constructor
 * @version 0.1.0
 **/
class ValidationUtil
{
    /**
     * @overridden BaseObject.CLASS_NAME
     */
    public static CLASS_NAME:string = 'ValidationUtil';

    constructor()
    {
    }

    /**
     * Determines if the String passed in is a valid email address.
     *
     * @method isValidEmailAddress
     * @param email {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isValidEmailAddress(email:string):boolean
    {
        var expression:RegExp = /[^@]+@[^@]+\.[a-zA-Z]{2,6}/;
        return email.match(expression) != null;
    }

    /**
     * Determines if the String passed in is a phone number.
     *
     * @method isValidPhoneNumber
     * @param phoneNumber {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isValidPhoneNumber(phoneNumber:string):boolean
    {
        var expression:RegExp = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/i;
        return expression.test(phoneNumber);
    }

    /**
     * Determines if the String passed in is a zip code.
     *
     * @method isZipCode
     * @param zipCode {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isZipCode(zipCode:string):boolean
    {
        var expression:RegExp = /^\d{5}([\-]\d{4})?$/;
        return expression.test(zipCode);
    }

    /**
     * Determines if the String passed in is a postal code.
     *
     * @method isPostalCode
     * @param postalCode {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isPostalCode(postalCode:string):boolean
    {
        var expression:RegExp = /^([ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9])*$/;
        return expression.test(postalCode);
    }

}
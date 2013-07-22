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

///<reference path='../display/DOMElement.ts'/>

/**
 * The TemplateFactory...
 *
 * @class TemplateFactory
 * @module StructureTS
 * @submodule util
 * @constructor
 **/
class TemplateFactory {

    public static UNDERSCORE:string = 'underscore';
    public static HANDLEBARS:string = 'handlebars';

    public static templateEngine:string = TemplateFactory.HANDLEBARS;
    public static templateNamespace:string = 'JST';

    constructor() {}

    public static createTemplate(templatePath:string, data?:Object)
    {
        var template:string = TemplateFactory.create(templatePath, data);

        return jQuery( template );
    }

    public static createView(templatePath:string, data?:Object):DOMElement
    {
        var template:string = TemplateFactory.create(templatePath, data);

        var view:DOMElement = new DOMElement();
        view.$el = jQuery( template );
        return view;
    }

    private static create(templatePath:string, data?:Object):string
    {
        //Checks the first charactor to see if it is a "." or "#".
        var regex = /^([.#])(.+)/;
        var template:string;
        var isClassOrIdName:boolean = regex.test(templatePath);


        if (isClassOrIdName) {
            if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                // Underscore Template:
                var templateMethod:Function = _.template( $(templatePath).html() );
                template = templateMethod(data);
            } else {
                // Handlebars Template
                var templateMethod:Function = Handlebars.compile( $(templatePath).html() );
                template = templateMethod(data);
            }
        } else {
            var templateObj:Object = window[TemplateFactory.templateNamespace];
            if (!templateObj) {
                throw new ReferenceError('[TemplateFactory] Make sure the TemplateFactory.templateNamespace value is correct. Currently the value is ' + TemplateFactory.templateNamespace);
            }

            var templateFunction:Function = templateObj[templatePath];
            if (!templateFunction) {
                throw new ReferenceError('[TemplateFactory] Template not found for ' + templatePath);
            }

            //The templatePath gets a function storage in the associative array.
            //we call the function by passing in the data as the argument.
            template = templateFunction(data);
        }

        if (!template) {
            throw new ReferenceError('[TemplateFactory] Template not found for ' + templatePath);
        }

        return template;
    }

}
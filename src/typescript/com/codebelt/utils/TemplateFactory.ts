///<reference path='../display/DOMElement.ts'/>

class TemplateFactory {

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
            var templateMethod:Function = _.template( $(templatePath).html() );
            template = templateMethod(data);
        } else {
            //The templatePath gets a function storage in the associative array.
            //we call the function by passing in the data as the argument.
            template = window['JST'][templatePath](data);
        }

        return template;
    }

}
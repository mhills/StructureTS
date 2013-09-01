///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>


/**
 * YUIDoc_comment
 *
 * @class SelectBoxTemp
 * @constructor
 **/
class SelectBoxTemp extends DOMElement {

    public CLASS_NAME:string = 'SelectBoxTemp';

    constructor() {
        super();
    }

    public createChildren():DOMElement {
        super.createChildren(function(data) {
            select(
                option({value: 'en'}, 'English'),
                option({value: 'fr'}, data.car),
                option({value: 'sp'}, 'Spanish')
            )
        }, {car: 'red'});

        return this;
    }

}
///<reference path='../../../../../src/com/codebelt/display/DOMElement.ts'/>


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

        this._options = {
            car: "red"
        }
    }

    public createChildren():void {
        super.createChildren(function(data) {
            select(
                option({value: 'en'}, 'English'),
                option({value: 'fr'}, data.car),
                option({value: 'sp'}, 'Spanish')
            )
        });
    }

}
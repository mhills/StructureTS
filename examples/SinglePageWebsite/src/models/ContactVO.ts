///<reference path='../../../../src/com/codebelt/models/ValueObject.ts'/>

class ContactVO extends ValueObject {

    public photo = "images/placeholder.png";
    public name = "";
    public address = "";
    public tel = "";
    public email = "";
    public type = "uncategorized";

    constructor(data?:any)
    {
        super();
    }

}
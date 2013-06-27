///<reference path='../ValueObject.ts'/>

class LanguageConfigVO extends ValueObject {

    public id:string = null;
    public type:string = null;
    public path:string = null;

    constructor(data:any)
    {
        super();

        if (data) {
            this.update(data);
        }
    }

    public update(data:any):void
    {
        this.id = data.id;
        this.type = data.type;
        this.path = data.path;
    }
}
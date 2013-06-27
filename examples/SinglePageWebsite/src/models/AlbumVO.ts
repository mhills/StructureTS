///<reference path='../../../../src/typescript/com/codebelt/models/ValueObject.ts'/>

class AlbumVO extends ValueObject {

    public pid:number = null;
    public artist:string = "";
    public image:string = "";
    public large_image:string = "";
    public price:string = "";
    public title:string = "";
    public url:string = "";

    constructor(data?:any)
    {
        super();

        if (data) {
            this.update(data);
        }
    }

    public update(data:any):void
    {
        this.pid = data.pid;
        this.artist = data.artist;
        this.image = data.image;
        this.large_image = data.large_image;
        this.price = data.price;
        this.title = data.title;
        this.url = data.url;
    }

}
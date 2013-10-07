///<reference path='../../../../../src/com/codebelt/structurets/model/ValueObject.ts'/>
///<reference path='AlbumVO.ts'/>

class ArtistVO extends ValueObject {

    public pid:number = null;
    public artist:string = "";
    public title:string = "";
    public years:string = "";
    public url:string = "";
    public image:string = "";
    public albumList:AlbumVO[] = [];
                
    constructor(data?:any)
    {
        super();

        if (data) {
            this.update(data);
        }
    }

    public update(data:any):ValueObject
    {
        this.pid = data.pid;
        this.artist = data.artist;
        this.title = data.title;
        this.years = data.years;
        this.url = data.url;
        this.image = data.image;

        var len:number = data.albums.length;
        for (var i:number = 0; i < len; i++) {
            this.albumList.push( new AlbumVO(data.albums[i]) );
        }

        return this;
    }

}
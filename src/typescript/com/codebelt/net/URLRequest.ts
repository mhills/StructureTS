///<reference path='URLRequestMethod.ts'/>
///<reference path='URLContentType.ts'/>

class URLRequest {

    public url:string = null;
    public method:string = URLRequestMethod.GET;
    public contentType:string = URLContentType.DEFAULT;
    public data:any = null;

    constructor(url:string = null)
    {
        this.url = url;
    }
}

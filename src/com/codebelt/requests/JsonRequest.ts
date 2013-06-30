///<reference path='BaseRequest'/>

class JsonRequest extends BaseRequest {

    constructor()
    {
        super("asdf", "sdfg");
    }
}

//public class BookSaveDataRequest extends BaseDataRequest
//{
//    private const ENDPOINT:String = "/api/book/";
//
//    private var _bookJSON:String;
//
//    public function BookSaveDataRequest(json:String)
//    {
//        _bookJSON = json;
//
//        super(FlashVarParams.apiUrl, ENDPOINT);
//    }
//
//    override protected function configureRequest():void
//    {
//        super.configureRequest();
//
//    var params:URLVariables = new URLVariables();
//    params.book = _bookJSON;
//
//    _request.data = params;
//    _request.method = URLRequestMethod.POST;
//}
//}
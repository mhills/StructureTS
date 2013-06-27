///<reference path='../../../src/typescript/_declare/jquery.d.ts'/>
///<reference path='../../../src/typescript/_declare/crossroads.d.ts'/>
///<reference path='../../../src/typescript/_declare/signals.d.ts'/>
///<reference path='../../../src/typescript/_declare/route.d.ts'/>
///<reference path='../../../src/typescript/_declare/hasher.d.ts'/>
///<reference path='../../../src/typescript/_declare/greensock.d.ts'/>
///<reference path='../../../src/typescript/_declare/underscore.d.ts'/>
///<reference path='../../../src/typescript/_declare/parse.d.ts'/>

///<reference path='../../../src/typescript/com/codebelt/display/Stage.ts'/>
///<reference path='../../../src/typescript/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../src/typescript/com/codebelt/controller/RouterController.ts'/>
///<reference path='../../../src/typescript/com/codebelt/utils/BulkLoader.ts'/>
///<reference path='../../../src/typescript/com/codebelt/requests/JsonRequest.ts'/>
///<reference path='../../../src/typescript/com/codebelt/utils/LanguageManager.ts'/>
///<reference path='../../../src/typescript/com/codebelt/controller/LocalStorageController.ts'/>

///<reference path='views/layout/NavigationView.ts'/>
///<reference path='views/layout/FooterView.ts'/>
///<reference path='views/MainView.ts'/>

class WebsiteBootstrap extends Stage
{
    static BASE_PATH:string = "images/";


    private _router:RouterController = null;

    private _pageContainer:DOMElement = null;
    private _navigationView:NavigationView = null;
    private _footerView:FooterView = null;
    private _mainView:MainView = null;

    private _languageManager:LanguageManager;
    private _request:JsonRequest;
//    private _bulkLoader:BulkLoader;


    //http://www.codeproject.com/Articles/499490/JavaScript-UI-Control-Suite-using-TypeScript

    constructor() {
        super('body');

        var ls = LocalStorageController.getInstance();
        var languageId = ls.getItem('language') || 'en';

        this._languageManager = LanguageManager.getInstance();
        this._languageManager.addEventListener(LoaderEvent.COMPLETE, this.init, this);
        this._languageManager.setLang( languageId );
        this._languageManager.loadConfig('data/languages/languages.json');

        this._router = new RouterController();

        this._request = new JsonRequest();
//        http://qa3mred.nerderylabs.com/user/authenticate.json
    }

    /*private loadHtmlTemplates(event:LoaderEvent):void
     {
     this._bulkLoader = BulkLoader.getInstance();
     this._bulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.init, this);
     this._bulkLoader.addFile(new HtmlLoader("templates/templates.html"), "masterTemplates");
     this._bulkLoader.load();
     }*/


    public createChildren():void {
        super.createChildren();
    }

    public enabled(value:boolean):void {
        if (value == this.isEnabled) return;

        if (value) {
        } else {
        }

        super.enabled(value);
    }

    private init(event):void
    {
//        this._bulkLoader.removeEventListener(LoaderEvent.LOAD_COMPLETE, this.init);

        this._pageContainer = new DOMElement("div", {id: "page"});
        this.addChild(this._pageContainer);

        this._navigationView = new NavigationView();
        this._pageContainer.addChild(this._navigationView);

        //Add the main content to manage the changing views
        this._mainView = new MainView("div", {id: "content"}, this._router);
        this._pageContainer.addChild(this._mainView);

        this._footerView = new FooterView();
        this._pageContainer.addChild(this._footerView);
    }
}



//http://blog.parse.com/2012/01/19/javascript-and-user-authentication-for-the-rest-api/
//http://www.adobe.com/devnet/phonegap/articles/using-parse-with-phonegap-a-marriage-made-in-awesome.html
//http://net.tutsplus.com/tutorials/javascript-ajax/getting-started-with-parse/
/*$.ajax({
 url : 'https://api.parse.com/1/users',
 type : 'POST',
 dataType: 'json',
 contentType : 'application/json',
 beforeSend: function(request) {
 request.setRequestHeader("X-Parse-Application-Id", '5tfOk1NPi4KxQwWDbGdaw0eY0GFKAnrp3upTzRo8');
 request.setRequestHeader("X-Parse-REST-API-Key", 'Tz2OgC9TZTEgGvMQhtk7IHQT6c46mBuCbF545Dgn');
 },
 data : JSON.stringify({
 username : 'codebelt',
 password: 'password',
 email: 'test@example.com'
 }),
 error : function(data) {
 var response:any = JSON.parse(data.responseText);
 console.log('error', response);
 },
 success : function(data) {
 console.log('success', data);
*/


//http://www.jsobfuscate.com/index.php
//http://code.ovidiu.ch/dragdealer/
//http://blogs.creative-jar.com/post/Dragdealer.aspx




//Content-Type	application/x-www-form-urlencoded; charset=UTF-8
//emailAddress=rsavian%40nerdery.com&password=testing&voType=AuthenticateVO

//{
//    "status":"success",
//    "data":{
//    "user":{
//        "id":"11",
//            "firstName":"Robert",
//            "lastName":"Savian",
//            "dealer":null,
//            "language":"en",
//            "country":"BY",
//            "email":"rsavian@nerdery.com",
//            "status":"active",
//            "role":"super_admin",
//            "measurementType":"imperial",
//            "glassChecklistRegion":"apac",
//            "dateRegistered":"Thu, 14 Mar 2013 14:49:32 -0500",
//            "created":"Thu, 14 Mar 2013 14:49:32 -0500",
//            "updated":"Sat, 25 May 2013 14:07:57 -0500",
//            "lastLogon":"Sat, 25 May 2013 14:07:57 -0500"
//    },
//    "userSession":{
//        "token":"b274558c-cfc5-45be-8891-202c53c8afba"
//    }
//}
//}
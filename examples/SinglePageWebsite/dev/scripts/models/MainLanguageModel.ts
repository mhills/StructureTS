///<reference path='../../../../../src/com/codebelt/structurets/models/LanguageModel.ts'/>

/**
 * YUIDoc_comment
 *
 * @class MainLanguageModel
 * @extends LanguageModel
 * @constructor
 **/
class MainLanguageModel extends LanguageModel {

    public CLASS_NAME:string = 'MainLanguageModel';

    private static _instance:MainLanguageModel;

    constructor() {
        super();
        if(MainLanguageModel._instance){
            throw new Error('['+this.getQualifiedClassName()+'] Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.');
        }
        MainLanguageModel._instance = this;
    }

    public static getInstance():MainLanguageModel {
        if (MainLanguageModel._instance == null) {
            MainLanguageModel._instance = new MainLanguageModel();
        }
        return MainLanguageModel._instance;
    }

    /**
     * @copy LanguageModel.onLanguageDataLoad
     * @overridden
     */
    public onLanguageDataLoad(event:LoaderEvent):void {
        var data = JSON.parse(event.target.data);

        console.log(data)
//        this.homePageData = new HomePageVO(data.main);
//        this.classes = new ClassCollection(data.classes);
//        this.products = new ProductCollection(data.products);
//        this.productPageData = new ProductPageVO(data.productPage);

        super.onLanguageDataLoad(event);
    }

}
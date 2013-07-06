///<reference path='BaseEvent.ts'/>

/**
 * The LanguageEvent...
 *
 * @class LanguageEvent
 * @constructor
 **/
class LanguageEvent extends BaseEvent {

    public CLASS_NAME:string = 'LanguageEvent';

    static LANGUAGE_CHANGE:string = "LanguageEvent.languageChange";

    constructor(type:string, data:any=null)
    {
        super(type, data);
    }

}
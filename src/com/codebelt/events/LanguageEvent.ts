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

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type, bubbles, cancelable, data);
    }

}
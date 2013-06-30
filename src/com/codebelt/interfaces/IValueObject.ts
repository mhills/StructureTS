interface IValueObject extends IEventDispatcher
{
    clone():IValueObject;
    toJson():string;
    parseJson(json:Object):void;
//    setItem()
//    getItem()
}
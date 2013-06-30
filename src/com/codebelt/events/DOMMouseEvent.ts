//module org.structurejs {
//
//    export

class DOMMouseEvent {

    static CLICK:string = "click";

    public pageX:number;
    public offsetY:number;
    public x:number;
    public y:number;
    public altKey:boolean;
    public metaKey:boolean;
    public ctrlKey:boolean;
    public offsetX:number;
    public screenX:number;
    public clientY:number;
    public shiftKey:boolean;
    public screenY:number;
    public relatedTarget:EventTarget;
    public button:number;
    public pageY:number;
    public buttons:number;
    public clientX:number;

    constructor()
    {
    }


    public initMouseEvent(typeArg:string, canBubbleArg:boolean, cancelableArg:boolean, viewArg:AbstractView, detailArg:number, screenXArg:number, screenYArg:number, clientXArg:number, clientYArg:number, ctrlKeyArg:boolean, altKeyArg:boolean, shiftKeyArg:boolean, metaKeyArg:boolean, buttonArg:number, relatedTargetArg:EventTarget):void {

    public initMouseEvent(typeArg:string, canBubbleArg:boolean, cancelableArg:boolean, viewArg:AbstractView, detailArg:number, screenXArg:number, screenYArg:number, clientXArg:number, clientYArg:number, ctrlKeyArg:boolean, altKeyArg:boolean, shiftKeyArg:boolean, metaKeyArg:boolean, buttonArg:number, relatedTargetArg:EventTarget):void
    {

    }

    public getModifierState(keyArg:string):boolean
    {
        return false;
    }
}

//}
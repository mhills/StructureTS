///<reference path='../../../src/_declare/jquery.d.ts'/>
///<reference path='../../../src/_declare/underscore.d.ts'/>

///<reference path='../../../src/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../src/com/codebelt/display/Stage.ts'/>
///<reference path='../../../src/com/codebelt/events/MouseEventType.ts'/>
///<reference path='../../../src/com/codebelt/events/RequestEvent.ts'/>
///<reference path='../../../src/com/codebelt/utils/TemplateFactory.ts'/>

class WindowFilmApp extends Stage
{
    public static BASE_PATH:string = 'images/';

    constructor() {
        super('.js-todo');
    }

    public createChildren():void {
        super.createChildren();
    }

    public enabled(value:boolean):void {
        if (value == this.isEnabled) return;

        if (value) {
//            this._submitBtn.el.addEventListener(MouseEventType.CLICK, (event:MouseEvent) => this.onSubmitButton(event), false);
//            this._incompleteItemList.$el.on(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this) );
        } else {
//            this._submitBtn.el.removeEventListener(MouseEventType.CLICK, (event:MouseEvent) => this.onSubmitButton(event), false);
//            this._incompleteItemList.$el.off(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this));
        }

        super.enabled(value);
    }

}
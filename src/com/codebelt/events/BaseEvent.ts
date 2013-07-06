///<reference path='../BaseObject.ts'/>
///<reference path='../interfaces/ICore.ts'/>

/**
 * The BaseEvent...
 *
 * @class BaseEvent
 * @requires ICore
 * @constructor
 * @static
 **/
class BaseEvent extends BaseObject implements ICore {

    public CLASS_NAME:string = 'BaseEvent';

    /**
     * The BaseEvent.ACTIVATE constant defines the value of the type property of an activate event object.
     *
     * @event BaseEvent.activate
     * @type {string}
     * @static
     */
    public static ACTIVATE:string = 'BaseEvent.activate';

    /**
     * The BaseEvent.ADDED constant defines the value of the type property of an added event object.
     *
     * @event BaseEvent.added
     * @type {string}
     * @static
     */
    public static ADDED:string = 'BaseEvent.added';

    /**
     * The BaseEvent.ADDED_TO_STAGE constant defines the value of the type property of an addedToStage event object.
     *
     * @event BaseEvent.addedToStage
     * @type {string}
     * @static
     */
    public static ADDED_TO_STAGE:string = 'BaseEvent.addedToStage';

    /**
     * The BaseEvent.CANCEL constant defines the value of the type property of a cancel event object.
     *
     * @event BaseEvent.cancel
     * @type {string}
     * @static
     */
    public static CANCEL:string = 'BaseEvent.cancel';

    /**
     * The BaseEvent.CHANGE constant defines the value of the type property of a change event object.
     *
     * @event BaseEvent.change
     * @type {string}
     * @static
     */
    public static CHANGE:string = 'BaseEvent.change';

    /**
     * The BaseEvent.CLEAR constant defines the value of the type property of a clear event object.
     *
     * @event BaseEvent.clear
     * @type {string}
     * @static
     */
    public static CLEAR:string = 'BaseEvent.clear';

    /**
     * The BaseEvent.CLOSE constant defines the value of the type property of a close event object.
     *
     * @event BaseEvent.close
     * @type {string}
     * @static
     */
    public static CLOSE:string = 'BaseEvent.close';

    /**
     * The BaseEvent.CLOSING constant defines the value of the type property of a closing event object.
     *
     * @event BaseEvent.closing
     * @type {string}
     * @static
     */
    public static CLOSING:string = 'BaseEvent.closing';

    /**
     * The BaseEvent.COMPLETE constant defines the value of the type property of a complete event object.
     *
     * @event BaseEvent.complete
     * @type {string}
     * @static
     */
    public static COMPLETE:string = 'BaseEvent.complete';

    /**
     * The BaseEvent.CONNECT constant defines the value of the type property of a connect event object.
     *
     * @event BaseEvent.connect
     * @type {string}
     * @static
     */
    public static CONNECT:string = 'BaseEvent.connect';

    /**
     * Defines the value of the type property of a copy event object.
     *
     * @event BaseEvent.copy
     * @type {string}
     * @static
     */
    public static COPY:string = 'BaseEvent.copy';

    /**
     * Defines the value of the type property of a cut event object.
     *
     * @event BaseEvent.cut
     * @type {string}
     * @static
     */
    public static CUT:string = 'BaseEvent.cut';

    /**
     * The BaseEvent.DEACTIVATE constant defines the value of the type property of a deactivate event object.
     *
     * @event BaseEvent.deactivate
     * @type {string}
     * @static
     */
    public static DEACTIVATE:string = 'BaseEvent.deactivate';

    /**
     * The BaseEvent.DISPLAYING constant defines the value of the type property of a displaying event object.
     *
     * @event BaseEvent.displaying
     * @type {string}
     * @static
     */
    public static DISPLAYING:string = 'BaseEvent.displaying';

    /**
     * The BaseEvent.ENTER_FRAME constant defines the value of the type property of an enterFrame event object.
     *
     * @event BaseEvent.enterFrame
     * @type {string}
     * @static
     */
    public static ENTER_FRAME:string = 'BaseEvent.enterFrame';

    /**
     * The BaseEvent.EXIT_FRAME constant defines the value of the type property of an exitFrame event object.
     *
     * @event BaseEvent.exitFrame
     * @type {string}
     * @static
     */
    public static EXIT_FRAME:string = 'BaseEvent.exitFrame';

    /**
     * The BaseEvent.EXITING constant defines the value of the type property of an exiting event object.
     *
     * @event BaseEvent.exiting
     * @type {string}
     * @static
     */
    public static EXITING:string = 'BaseEvent.exiting';

    /**
     * The BaseEvent.FULL_SCREEN constant defines the value of the type property of a fullScreen event object.
     *
     * @event BaseEvent.fullScreen
     * @type {string}
     * @static
     */
    public static FULLSCREEN:string = 'BaseEvent.fullScreen';

    /**
     * The BaseEvent.INIT constant defines the value of the type property of an init event object.
     *
     * @event BaseEvent.init
     * @type {string}
     * @static
     */
    public static INIT:string = 'BaseEvent.init';

    /**
     * The BaseEvent.NETWORK_CHANGE constant defines the value of the type property of a networkChange event object.
     *
     * @event BaseEvent.networkChange
     * @type {string}
     * @static
     */
    public static NETWORK_CHANGE:string = 'BaseEvent.networkChange';

    /**
     * The BaseEvent.OPEN constant defines the value of the type property of an open event object.
     *
     * @event BaseEvent.open
     * @type {string}
     * @static
     */
    public static OPEN:string = 'BaseEvent.open';

    /**
     * The BaseEvent.PASTE constant defines the value of the type property of a paste event object.
     *
     * @event BaseEvent.paste
     * @type {string}
     * @static
     */
    public static PASTE:string = 'BaseEvent.paste';

    /**
     * The BaseEvent.PREPARING constant defines the value of the type property of a preparing event object.
     *
     * @event BaseEvent.preparing
     * @type {string}
     * @static
     */
    public static PREPARING:string = 'BaseEvent.preparing';

    /**
     * The BaseEvent.REMOVED constant defines the value of the type property of a removed event object.
     *
     * @event BaseEvent.removed
     * @type {string}
     * @static
     */
    public static REMOVED:string = 'BaseEvent.removed';

    /**
     * The BaseEvent.RENDER constant defines the value of the type property of a render event object.
     *
     * @event BaseEvent.render
     * @type {string}
     * @static
     */
    public static RENDER:string = 'BaseEvent.render';

    /**
     * The BaseEvent.RESIZE constant defines the value of the type property of a resize event object.
     *
     * @event BaseEvent.resize
     * @type {string}
     * @static
     */
    public static RESIZE:string = 'BaseEvent.resize';


    public type:string = null;
    public target:any = null;
    public data:any = null;

    public bubble:boolean = true;
    public isPropagationStopped:boolean = true;
    public isImmediatePropagationStopped:boolean = true;

    constructor(type:string, data:any = null) {
        super();

        this.type = type;
//        this.target = target;
        this.data = data;
    }

    stopPropagation():void {
        this.isPropagationStopped = false;
    }

    stopImmediatePropagation():void {
        this.stopPropagation();
        this.isImmediatePropagationStopped = false;
    }

}
var BaseEvent = (function () {
    function BaseEvent(type, data) {
        if (typeof data === "undefined") { data = null; }
        this.CLASS_NAME = 'BaseEvent';
        this.type = null;
        this.target = null;
        this.data = null;
        this.bubble = true;
        this.isPropagationStopped = true;
        this.isImmediatePropagationStopped = true;
        this.type = type;

        this.data = data;
    }
    BaseEvent.prototype.stopPropagation = function () {
        this.isPropagationStopped = false;
    };

    BaseEvent.prototype.stopImmediatePropagation = function () {
        this.stopPropagation();
        this.isImmediatePropagationStopped = false;
    };

    BaseEvent.prototype.getQualifiedClassName = function () {
        return this.CLASS_NAME;
    };
    BaseEvent.CHANGE = "Event.change";
    BaseEvent.COMPLETE = "Event.complete";
    BaseEvent.ENTER_FRAME = "Event.enterFrame";
    return BaseEvent;
})();

define(function(require) {
    'use strict';

    var $ = require('jquery');

    /**
     * Document
     *
     * @type {HTMLDocument}
     * @private
     */
    var _document = document;

    /**
     * Element to apply event handlers to
     *
     * @type {HTMLDocument}
     * @private
     */
    var _root = document;

    /**
     * Max duration between down and up to be considered a swipe
     *
     * @type {number}
     * @constant
     */
    var SWIPE_MAX_DURATION = 400;

    /**
     * Minimun delta from down and up to determine swipe direction
     *
     * @type {number}
     * @constant
     */
    var SWIPE_MIN_DELTA = 30;

    /**
     * Max duration of a touch
     *
     * @type {number}
     * @constant
     */
    var TAP_MAX_DURATION = 400;

    /**
     * Native Object.defineProperty function
     *
     * @function
     * @private
     */
    var _defineProp = Object.defineProperty;

    /**
     * Native Date.now function
     *
     * @function
     * @private
     */
    var _dateNow = Date.now;

    var _eventPropertyName = '__e__';

    /**
     * Touch settings
     *
     * @type {object}
     * @property {HTMLElement} el
     * @property {number} x1
     * @property {number} y1
     * @property {number} x2
     * @property {number} y2
     * @property {number} last
     * @static
     */
    var touch = {};

    /**
     * Flag to determine if a touch/mouse is currently being tracked
     *
     * @type {boolean}
     * @private
     */
    var _isTracking = false;

    /**
     * Event names to bind
     *
     * @type {object}
     * @static
     */
    var _eventNames = {
        mousedown: {
            move: 'mousemove',
            up: 'mouseup',
            cancel: 'touchcancel'
        },
        touchstart: {
            move: 'touchmove',
            up: 'touchend',
            cancel: 'touchcancel'
        }
    };

    /**
     * Current event binding names
     *
     * @type {object}
     * @static
     */
    var _currentEventNames;

    /**
     * If node is a textNode, return the parent
     *
     * @param {HTMLElement} node
     * @returns {HTMLElement}
     * @private
     */
    var _getParentIfText = function(node) {
        return node && 'tagName' in node ? node : node.parentNode;
    };

    /**
     * Determine swipe direction and return the direction as a string
     *
     * @returns {string}
     * @private
     */
    var _getSwipeDirection = function() {
        var x1 = touch.x1;
        var x2 = touch.x2;
        var y1 = touch.y1;
        var y2 = touch.y2;
        var xDelta = Math.abs(x1 - x2);
        var yDelta = Math.abs(y1 - y2);

        return xDelta >= yDelta ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');
    };

    /**
     * Determine if touch was a swipe
     *
     * @returns {boolean}
     * @private
     */
    var _isSwipe = function() {
        return (
            _dateNow() - touch.last < SWIPE_MAX_DURATION &&
            (
                (touch.x2 && Math.abs(touch.x1 - touch.x2) > SWIPE_MIN_DELTA) ||
                (touch.y2 && Math.abs(touch.y1 - touch.y2) > SWIPE_MIN_DELTA)
            )
        );
    };

    /**
     * Create a new event
     *
     * @param {string} type Event name
     * @param {MouseEvent|TouchEvent} e Event to pull position data from (clientX/Y, screenX/Y)
     * @returns {MouseEvent}
     * @private
     */
    var _createEvent = function(type, e) {
        var ev = e.changedTouches ? e.changedTouches[0] : e;
        var event = _document.createEvent('MouseEvents');

        event.initMouseEvent(
            type, true, true, window, null,
            ev.screenX, ev.screenY, ev.clientX, ev.clientY,
            false, false, false, false, 0, null
        );

        // IE will not calculate pageX/pageY, and because event is readonly
        // directly setting the values will not change them. Instead, setup
        // a getter method and return the original event's pageX/Y position.
        // Supported in IE8+
        if (event.pageX !== ev.pageX && _defineProp) {
            _defineProp(event, 'pageX', {
                get: function() {
                    return ev.pageX;
                }
            });
        }

        if (event.pageY !== ev.pageY && _defineProp) {
            _defineProp(event, 'pageY', {
                get: function() {
                    return ev.pageY;
                }
            });
        }

        return event;
    };

    /**
     * Mousedown/touchstart event handler.
     *
     * Log current event data dn bind move and up events
     *
     * @param {MouseEvent|TouchEvent} e
     * @private
     */
    var _onDown = function(e) {
        if (
            _isTracking ||
            (e.type === 'mousedown' && e.which !== 1) ||
            (e.touches && e.touches.length > 1)
        ) {
            return;
        }

        _isTracking = true;

        var ev = e.touches ? e.touches[0] : e;

        touch.el = _getParentIfText(ev.target);
        touch.x1 = ev.pageX;
        touch.y1 = ev.pageY;
        touch.last = _dateNow();

        _currentEventNames = _eventNames[e.type];

        // bind move/up events
        _root.addEventListener(_currentEventNames.move, _onMove, false);
        _root.addEventListener(_currentEventNames.up, _onUp, false);
        _root.addEventListener(_currentEventNames.cancel, _onCancel, false);
    };

    /**
     * Mousemove/touchmove event handler.
     * Track changed x and y coordinates
     *
     * @param {MouseEvent|TouchEvent} e
     * @private
     */
    var _onMove = function(e) {
        var ev = e.touches ? e.touches[0] : e;
        touch.x2 = ev.pageX;
        touch.y2 = ev.pageY;
    };

    /**
     * Mouseup/touchend event handler.
     * Determine what kind to tap event to trigger (if any at all)
     *
     * @param {MouseEvent|TouchEvent} e
     * @private
     */
    var _onUp = function(e) {
        var ev = e.changedTouches ? e.changedTouches[0] : e;
        var target = _getParentIfText(ev.target);
        var event;

        if (touch.el !== target || (e.touches && e.touches.length)) {
            _onCancel();
            return;
        }

        if (_isSwipe()) {
            target.dispatchEvent(_createEvent('swipe', e));
            event = _createEvent('swipe' + _getSwipeDirection(), e);
            target.dispatchEvent(event);
            target[_eventPropertyName] = event;
            target.addEventListener('click', _preventDefault, false);

            // normal tap
        } else if (_dateNow() - touch.last < TAP_MAX_DURATION) {
            event = _createEvent('tap', e);
            target.dispatchEvent(event);
            target[_eventPropertyName] = event;
            target.addEventListener('click', _preventDefault, false);
        }

        _onCancel();

        return false;
    };

    /**
     * Prevent default click event
     *
     * @param {MouseEvent} e
     * @private
     */
    var _preventDefault = function(e) {
        if (this[_eventPropertyName]) {
            if (this[_eventPropertyName].defaultPrevented) {
                e.preventDefault();
            }
            delete this[_eventPropertyName];
        }

        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }

        this.removeEventListener('click', _preventDefault, false);
    };

    /**
     * Reset all data currently being tracked. Unbind event listeners
     *
     * @private
     */
    var _onCancel = function() {
        _isTracking = false;
        touch = {};
        _root.removeEventListener(_currentEventNames.move, _onMove, false);
        _root.removeEventListener(_currentEventNames.up, _onUp, false);
        _root.removeEventListener(_currentEventNames.cancel, _onCancel, false);
    };

    // Bind mousedown and touchstart event listeners
    _root.addEventListener('mousedown', _onDown, false);
    _root.addEventListener('touchstart', _onDown, false);

    $.event.fixHooks.tap = $.event.mouseHooks;

});
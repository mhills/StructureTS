///<reference path='Signal.ts'/>

module millermedeiros
{
    /**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     *
     * @class SignalBinding
     * @constructor
     * @author Miller Medeiros
     * @module millermedeiros
     * @submodule singals
     * @internal
     * @name SignalBinding
     * @param signal {Signal} Reference to Signal object that listener is currently bound to.
     * @param listener {Function} Handler function bound to the signal.
     * @param isOnce {boolean} If binding should be executed just once.
     * @param [listenerContext] {Object} Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param [priority=0] {Number} The priority level of the event listener. (default = 0).
     */
    export class SignalBinding {

        /**
         * If binding should be executed just once.
         *
         * @property _isOnce
         * @type boolean
         * @default false
         * @private
         */
        private _isOnce:boolean = false;

        /**
         * Reference to Signal object that listener is currently bound to.
         *
         * @property _signal
         * @type Signal
         * @private
         */
        private _signal:Signal = null;

        /**
         * Handler function bound to the signal.
         *
         * @property listener
         * @type {Function}
         * @public
         */
        public listener:Function = null;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         *
         * @property context
         * @name context
         * @type {Object}
         * @public
         */
        public context:any = null;

        /**
         * Listener priority
         *
         * @property priority
         * @type {Number}
         * @default 0
         * @private
         */
        public priority:number = 0;

        /**
         * If binding is active and should be executed.
         *
         * @property active
         * @type {boolean}
         * @default true
         * @public
         */
        public active:boolean = true;

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         *
         * @property params
         * @type {Array}
         * @public
         */
        public params:any[] = null;

        constructor(signal:Signal, listener:Function, isOnce:boolean, listenerContext:any = null, priority:number = 0)
        {
            this.listener = listener;
            this._isOnce = isOnce;
            this.context = listenerContext;
            this._signal = signal;
            this.priority = priority;
        }

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue,
         * this method is used internally for the signal dispatch.</p>
         *
         * @method execute
         * @param [paramsArr=[]] {Array} Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         * @public
         */
        public execute(paramsArr:any[] = [])
        {
            var handlerReturn = null;
            var params:any[] = null;

            if (this.active && !!this.listener)
            {
                params = this.params ? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this.listener.apply(this.context, params);
                if (this._isOnce)
                {
                    this.detach();
                }
            }
            return handlerReturn;
        }

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         *
         * @method detach
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         * @public
         */
        public detach():Function
        {
            return this.isBound() ? this._signal.remove(this.listener, this.context) : null;
        }

        /**
         * YUIDoc_comment
         *
         * @method isBound
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         * @public
         */
        public isBound():boolean
        {
            return (!!this._signal && !!this.listener);
        }

        /**
         * YUIDoc_comment
         *
         * @method isOnce
         * @return {boolean} If SignalBinding will only be executed once.
         * @public
         */
        public isOnce():boolean
        {
            return this._isOnce;
        }

        /**
         * YUIDoc_comment
         *
         * @method getListener
         * @return {Function} Handler function bound to the signal.
         * @public
         */
        public getListener():Function
        {
            return this.listener;
        }

        /**
         * YUIDoc_comment
         *
         * @method getSignal
         * @return {Signal} Signal that listener is currently bound to.
         * @public
         */
        public getSignal():Signal
        {
            return this._signal;
        }

        /**
         * Delete instance properties
         *
         * @method destroy
         * @public
         */
        public destroy():void
        {
            this._signal = null;
            this.listener = null;
            this.context = null;
        }

        /**
         * YUIDoc_comment
         *
         * @method toString
         * @return {string} String representation of the object.
         * @public
         */
        public toString():string
        {
            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
        }

    }
}
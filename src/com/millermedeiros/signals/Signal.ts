///<reference path='SignalBinding.ts'/>

module MillerMedeiros
{
    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     *
     * @class Signal
     * @constructor
     * @author Miller Medeiros
     * @module MillerMedeiros
     * @submodule Signals
     * @requires SignalBinding
     * @constructor
     */
    export class Signal
    {

        /**
         * Signals Version Number.
         *
         * @property VERSION
         * @type string
         * @final
         * @public
         * @static
         */
        public static VERSION:string = '1.0.0';

        /**
         * YUIDoc_comment
         *
         * @property _bindings
         * @type Array.<SignalBinding>
         * @private
         */
        private _bindings:SignalBinding[] = [];

        /**
         * YUIDoc_comment
         *
         * @property _prevParams
         * @type Array.<SignalBinding>
         * @private
         */
        private _prevParams:SignalBinding[] = [];

        /**
         * YUIDoc_comment
         *
         * @property _shouldPropagate
         * @type {boolean}
         * @default true
         * @private
         */
        private _shouldPropagate:boolean = true;

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         *
         * @property memorize
         * @type {boolean}
         * @default false
         * @public
         */
        public memorize:boolean = false;

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         *
         * @property active
         * @type {boolean}
         * @default true
         * @public
         */
        public active:boolean = true;

        constructor()
        {
        }

        /**
         * Check if listener was attached to Signal.
         *
         * @method has
         * @param listener {Function}
         * @param [context=null] {Object}
         * @return {boolean} if Signal has the specified listener.
         */
        public has(listener:Function, context:any = null):boolean
        {
            return this._indexOfListener(listener, context) !== -1;
        }

        /**
         * Add a listener to the signal.
         *
         * @method add
         * @param listener {Function} Signal handler function.
         * @param [listenerContext=null] {Object}  Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param [priority=0] {Number} The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        public add(listener:Function, listenerContext:any = null, priority:number = 0):SignalBinding
        {
            this._validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        }

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         *
         * @method addOnce
         * @param listener {Function}  Signal handler function.
         * @param [listenerContext] {Object} Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param [priority=0] {Number} The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        public addOnce(listener:Function, listenerContext:any = null, priority:number = 0):SignalBinding
        {
            this._validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        }

        /**
         * Remove a single listener from the dispatch queue.
         *
         * @method remove
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        public remove(listener:Function, context:any = null):Function
        {
            this._validateListener(listener, 'remove');

            var i:number = this._indexOfListener(listener, context);
            if (i !== -1)
            {
                this._bindings[i].destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        }

        /**
         * Remove all listeners from the Signal.
         *
         * @method removeAll
         * @return {void}
         * @public
         */
        public removeAll():void
        {
            var n:number = this._bindings.length;
            while (n--)
            {
                this._bindings[n].destroy();
            }
            this._bindings.length = 0;
        }

        /**
         * YUIDoc_comment
         *
         * @method getNumListeners
         * @return {number} Number of listeners attached to the Signal.
         * @public
         */
        public getNumListeners():number
        {
            return this._bindings.length;
        }

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.disable
         *
         * @method halt
         * @return {void}
         * @public
         */
        public halt():void
        {
            this._shouldPropagate = false;
        }

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         *
         * @method dispatch
         * @param [params] {...rest} Parameters that should be passed to each handler.
         * @return {void}
         * @public
         */
        public dispatch(...params):void
        {
            if (!this.active)
            {
                return;
            }

            var n:number = this._bindings.length;
            var bindings:SignalBinding[] = null;

            if (this.memorize)
            {
                this._prevParams = params;
            }

            if (!n)
            {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(0); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do {
                n--;
            }
            while (bindings[n] && this._shouldPropagate && bindings[n].execute(params) !== false);
        }

        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         *
         * @method forget
         * @return {void}
         * @public
         */
        public forget():void
        {
            this._prevParams = null;
        }

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         *
         * @method dispose
         * @return {void}
         * @public
         */
        public dispose():void
        {
            this.removeAll();
            this._bindings = null;
            this._prevParams = null;
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
            return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
        }

        /**
         * YUIDoc_comment
         *
         * @method _registerListener
         * @param listener {Function}
         * @param isOnce {boolean}
         * @param [listenerContext=null] {Object}
         * @param [priority=0] {Number}
         * @return {SignalBinding}
         * @private
         */
        private _registerListener(listener:Function, isOnce:boolean, listenerContext:any = null, priority:number = 0):SignalBinding
        {
            var prevIndex:number = this._indexOfListener(listener, listenerContext);
            var binding:SignalBinding = null;

            if (prevIndex !== -1)
            {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce)
                {
                    throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                }
            }
            else
            {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if (this.memorize && this._prevParams)
            {
                binding.execute(this._prevParams);
            }

            return binding;
        }

        /**
         * YUIDoc_comment
         *
         * @method _addBinding
         * @param binding {SignalBinding}
         * @return {void}
         * @private
         */
        private _addBinding(binding:SignalBinding):void
        {
            //simplified insertion sort
            var n:number = this._bindings.length;
            do {
                --n;
            }
            while (this._bindings[n] && binding.priority <= this._bindings[n].priority);
            this._bindings.splice(n + 1, 0, binding);
        }

        /**
         * YUIDoc_comment
         *
         * @method _indexOfListener
         * @param listener {Function}
         * @return {number}
         * @private
         */
        private _indexOfListener(listener:Function, context:number):number
        {
            var n:number = this._bindings.length;
            var cur:SignalBinding = null;
            while (n--)
            {
                cur = this._bindings[n];
                if (cur.listener === listener && cur.context === context)
                {
                    return n;
                }
            }
            return -1;
        }

        /**
         * YUIDoc_comment
         *
         * @method _validateListener
         * @param listener {Function}
         * @param fnName {string}
         * @return {void}
         * @private
         */
        private _validateListener(listener:Function, fnName:string):void
        {
            if (typeof listener !== 'function')
            {
                throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
            }
        }
    }
}
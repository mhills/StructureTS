define(function(require) {
    'use strict';

    var SubView = require('views/SubView');
    var Collection = require('collections/Collection');

    /**
     * @class LayoutView
     * @extends SubView
     */
    var LayoutView = SubView.extend({

        /**
         * Create view object
         *
         * @param {object} options
         * @returns {LayoutView}
         */
        initialize: function(options) {
            this.children = new Collection();

            this.children
                .on('add', this.onAdd, this)
                .on('remove', this.onRemove, this);

            return SubView.prototype.initialize.call(this, options);
        },

        /**
         * Render projects in list
         *
         * @returns {LayoutView}
         */
        render:function() {
            this.children.invoke('render', this);

            return this;
        },

        /**
         * Add view to layout
         *
         * @param {string} id
         * @param {BaseView} view
         * @returns {LayoutView}
         */
        addView: function(id, view) {
            return this.addViewAtIndex(id, view, this.children.length);
        },

        /**
         * Add view to layout at specific index
         *
         * @param {string} id
         * @param {BaseView} view
         * @param {number} index
         * @returns {LayoutView}
         */
        addViewAtIndex: function(id, view, index) {
            view.id = id;
            this.children.add(view, { at: index || 0 });

            return this;
        },

        /**
         * Remove view from layout
         *
         * @param {string} id
         * @returns {LayoutView}
         */
        removeView: function(id) {
            var view = this.getView(id);
            this.children.remove(view);
            if (view && view.destroy) {
                view.destroy();
            }

            return this;
        },

        /**
         * Replace view with a new view
         *
         * @param {string} id
         * @param {BaseView} newView
         * @returns {LayoutView}
         */
        replaceView: function(id, newView) {
            var view = this.getView(id);
            var index = this.children.indexOf(view);

            if (index >= 0) {
                this.removeView(id).addViewAtIndex(id, newView, index);
            } else {
                this.addView(id, newView);
            }

            return this;
        },

        /**
         * Get view by ID
         *
         * @param {string} id
         * @returns {BaseView}
         */
        getView: function(id) {
            return this.children.get(id);
        },

        /**
         * Add child to layout
         *
         * @param {BaseView} view
         * @param {Backbone.Collection} collection
         * @param {object} options
         * @param {number} options.at
         * @returns {LayoutView}
         */
        onAdd: function(view, collection, options) {
            view
                .on('all', this._onChildEvent, this)
                .enabled(this.isEnabled);

            return this.addChildAt(view, options.at);
        },

        /**
         * Remove child from layout
         *
         * @param {BaseView} view
         * @returns {LayoutView}
         */
        onRemove: function(view) {
            view.off('all', this._onChildEvent, this);

            return this.removeChild(view);
        },

        /**
         * Enable children views
         *
         * @param {boolean} state
         * @returns {LayoutView}
         */
        enabled: function(state) {
            state = state !== false;

            if (state === this.isEnabled) {
                return this;
            }

            this.children.invoke('enabled', state);

            return SubView.prototype.enabled.call(this, state);
        },

        destroy: function() {
            this.enabled(false);
            this.children.invoke('destroy');
//            this.children.each(function(child) {
//                if (child && child.destroy) {
//                    child.destroy();
//                }
//            });

            return this
                .off()
                .stopListening();
        },

        /**
         * Internal method called every time a child in the set fires an event.
         * Sets need to update their indexes when children change ids. All other
         * events simply proxy through. "add" and "remove" events that originate
         * in other collections are ignored.
         *
         * @param {string} event
         * @param {BaseView} view
         * @param {object} collection
         * @param {object} options
         * @private
         */
        _onChildEvent: function(event, view, collection, options) {
            if (event === 'add' || event === 'remove') {
                return this;
            }

            if (event === 'destroy') {
                this.removeView(view.id);
            }

            return this.trigger.apply(this, arguments);
        }

    });

    return LayoutView;

});
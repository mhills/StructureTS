define(function(require) {
    'use strict';

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var BaseView = require('components/views/BaseView');

    /**
     * @class PaginationComponent
     */
    var PaginationComponent = BaseView.extend({

        paginationVO: null,

        render: function() {
            if (this.paginationVO) {
                var options = {
                    currentPage: this.paginationVO.get('currentPage'),
                    totalPages: this.paginationVO.get('pageCount'),
                    numberOfPages: 5
                }

                this.$el.bootstrapPaginator(options)
            }

            return this;
        },

        enabled: function(state) {
            state = state !== false;

            if (state === this.isEnabled) {
                return this;
            }

            if (state) {
                this.$el.on('page-clicked', this.onPageClicked.bind(this));
            } else {
                this.$el.off('page-clicked', this.onPageClicked.bind(this));
            }

            return BaseView.prototype.enabled.call(this, state);
        },

        onPageClicked: function(event,originalEvent,type,page) {
            this.trigger(PaginationComponent.CHANGE_PAGE, page);
            return this;
        },

        update: function(paginationVO) {
            this.paginationVO = paginationVO;
            return this.render();
        }

    }, {

        /**
         * @event
         *
         * @name PaginationComponent.CHANGE_PAGE
         */
        CHANGE_PAGE: 'CHANGE_PAGE'

    });

    return PaginationComponent;
});

(function($, window, document){

    $.fn.addEventListener = function(type, selector, data, callback, scope)
    {
        var _callback;
        var _scope;
        switch (arguments.length) {
            case 3:
                _callback = selector;
                _scope = data;
                this.on(type, $.proxy(_callback, _scope));
                break;
            case 4:
                _callback = data;
                _scope = callback;
                this.on(type, selector, $.proxy(_callback, _scope));
                break;
            case 5:
                this.on(type, selector, data, $.proxy(callback, scope));
                break;
            default:
                throw new Error('jQuery addEventListener plugin requires at least 3 arguments.')
        }
        return this;
    }

    $.fn.removeEventListener = function(type, selector, callback, scope)
    {
        switch (arguments.length) {
            case 3:
                var _callback = selector;
                var _scope = callback;
                this.off(type, $.proxy(_callback, _scope));
                break;
            case 4:
                this.off(type, selector, $.proxy(callback, scope));
                break;
            default:
                throw new Error('jQuery removeEventListener plugin requires at least 3 arguments.')
        }
        return this;
    }

})(jQuery, window, document);
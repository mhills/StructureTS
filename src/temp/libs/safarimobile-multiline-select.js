/* 
 ===============================================================
 jQuery plugin to expand/collapse a content element when a
 expander element is clicked. When expanding/collapsing the plug-in
 also toggles a class on the element.
 See https://github.com/redhotsly/simple-expand
 ===============================================================
 Copyright (C) 2012 Sylvain Hamel

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify,
 merge, publish, distribute, sublicense, and/or sell copies of the
 Software, and to permit persons to whom the Software is furnished
 to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ===============================================================
 */
/*global $:false, window:false, navigator:false */
(function ($) {
    "use strict";

    // set isSafari to true to bypass user agent check when 
    // testing in a browser other than safari mobile 
    function SelectConverter(forceSafariMobileMode) {

        var that = this;
        var $select = null;//TODO: make sure this can handle multiple SelectConverter's.
        var $ul = null;//TODO: make sure this can handle multiple SelectConverter's.

        var styles =
            '<style type="text/css">' +
                '    /* styles for the safarimobile-multiline-select plug-in */ \r\n'  +
                '    .multilineselect {border: 1px solid silver; display:inline-block; margin:0px; padding:2px; height: 100px; overflow:auto; -webkit-overflow-scrolling: touch; width:300px; vertical-align: text-bottom;} \r\n' +
                '    .multilineselect li {list-style-type: none; list-style-position:inside; margin:0px; padding:0px; cursor:default;}  \r\n' +
                '    .multilineselect li.selected {color: white; background-color: darkgrey;}  \r\n' +
                '</style>';


        that.isMobile = function () {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) || forceSafariMobileMode;
        };

        that.selectIsMultiline = function (item) {
            var value = item.attr('size');
            return  !( value === undefined || value === "1");
        };

        that.selectValue = function(ul, val){
            ul.children('li').removeClass('selected');
            var toSelect = ul.find('li[data-value="' + val + '"]');
            toSelect.addClass('selected');
        };

        that.createListFromSelectElement = function (select) {
            $select = select;//TODO: make sure this can handle multiple SelectConverter's.

            $ul = $('<ul class="multilineselect">');//TODO: make sure this can handle multiple SelectConverter's.
            $ul.css( $select.attr('class') );

            var selectid = $select.attr("id");
            if ( selectid !== undefined ){
                $ul.attr("id", selectid + "_safarimobile");
            }

            // when the <select> value change, select the corresponding item in the list
            $select.change(function () {
                var selected = $(this).children('option:selected');
                that.selectValue($ul, selected.val());
            });

            that.update();

            return $ul;
        };

        that.update = function() {
            $ul.empty();
            $select.children('option').each(function() {
                var option = $(this);
                var li = $('<li>');
                li.addClass( option.attr('class') );
                li.attr('data-value', option.val());
                li.html(option.html());

                // If the option is already selected then we add the selected class to the li element.
                if (option.is(':selected')) {
                    li.addClass( 'selected' );
                }

                // when items is clicked, push value to the original <select>
                li.on('click', function() {
                    var value = $(this).attr('data-value');
                    $select.val(value);
                    $select.change();
                });

                $ul.append(li);
            });
        };

        that.fixForSafariMobile = function (selectElements) {
            if (!that.isMobile())
            {
                return;
            }

            $("head").prepend(styles);

            selectElements.each(function () {
                var select = $(this);

                if ( !that.selectIsMultiline(select))
                {
                    return;
                }

                // hide the select element but keep it in the DOM to allow existing code to
                // keep on binding to it 
                select.hide();
                var newlist = that.createListFromSelectElement(select);

                select.after(newlist);

            });
        };
    }

    // export SelectConverter (to instantiate in unit tests)
    window.SelectConverter = SelectConverter;

    // expose SelectConverter as a jQuery plugin
    $.fn.fixForSafariMobile = function (forceSafariMobileMode) {
        var instance = new SelectConverter(forceSafariMobileMode);
        instance.fixForSafariMobile(this);
        return instance;
    };
}(jQuery));

this["TEMPLATES"] = this["TEMPLATES"] || {};

this["TEMPLATES"]["templates/LoadingTemplate.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="progress progress-striped active" style="margin: 20% 20% 0">\n  <div class="bar bar-warning" style="width: 100%;"></div>\n</div>';

}
return __p
};

this["TEMPLATES"]["templates/NoContentTemplate.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="nothing-found">' +
((__t = ( message )) == null ? '' : __t) +
'</div>';

}
return __p
};

this["TEMPLATES"]["templates/PaginationTemplate.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="pagination">\n    <ul>\n        <li><a class="js-previous">Prev</a></li>\n            ';


                if (!paginationVO) {
                    return
                }

                var pages = paginationVO.attributes.pageCount;
                var currentPage = paginationVO.attributes.currentPage;

                for (var i = 1; i <= pages; i++) {
                    if (pages == pages) {
                        var cls = (i == currentPage) ? 'active' : '';
            ;
__p += '\n                        <li class="' +
((__t = ( cls )) == null ? '' : __t) +
'"><a class="js-page-number" data-id="' +
((__t = ( i )) == null ? '' : __t) +
'">' +
((__t = ( i )) == null ? '' : __t) +
'</a></li>\n            ';

                    }
                }
            ;
__p += '\n        <li><a class="js-next">Next</a></li>\n    </ul>\n</div>';

}
return __p
};
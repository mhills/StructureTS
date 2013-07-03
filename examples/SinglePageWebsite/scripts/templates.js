this["TEMPLATES"] = this["TEMPLATES"] || {};

this["TEMPLATES"]["templates/AboutTemplate.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="leftcol">\n    <div class="block">\n        <div class="block-top"></div>\n        <div class="block-content">\n            <h2>About the <span>DelliStore!</span></h2>\n            <p>liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condimentum, magna. Aliquam augue dolor, tempus sit amet, pharetra nec, blandit elementum, diam. Proin pharetra odio eu lectus sollicitudin ultricies. Suspendisse turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.</p>\n            <div class="clear">\n                <div class="border-left-top">\n                    <div class="border-right-top">\n                        <div class="border-left-bottom">\n                            <div class="border-right-bottom">\n                                <img src="img/img-interier.jpg" alt="Interier" />\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <p>liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condime ntum, magna. Aliquam augue dolor, tempus sit amet, pharetra nec.liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condime ntum, magna. Aliquam augue dolor, tempus sit amet, pharetra nec.liquam suscipit. liquam su scipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condime ntum, magna.</p>\n        </div>\n        <div class="block-bottom"></div>\n    </div>\n\n\n</div>\n<div id="rightcol">\n    <div class="block">\n        <div class="block-top"></div>\n        <div class="block-content">\n            <h3>The <span>Store!</span></h3>\n            <ul>\n                <li><a href="#">The History</a></li>\n                <li><a href="#">Meet The Staff</a></li>\n                <li><a href="#">Contacting Us</a></li>\n            </ul>\n        </div>\n        <div class="block-bottom"></div>\n    </div>\n    <div class="block">\n        <div class="block-top"></div>\n        <div class="block-content">\n            <h3><span>Sign Up!</span></h3>\n            <form id="signup-form" action="#">\n                <fieldset>\n                    <label>Email Address</label>\n                    <input type="text" />\n                    <input class="submit" type="submit" value="Sing Up!" />\n                </fieldset>\n            </form>\n        </div>\n        <div class="block-bottom"></div>\n    </div>\n</div>';

}
return __p
};

this["TEMPLATES"]["templates/Albums.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


var artist = data;
console.log(artist, albumCollection)
var albumCollection = artist.albumList;

var length = albumCollection.length;
for (var index = 0; index < length; index++){
var album = albumCollection[index];
;
__p += '\n<div class="item drop-shadow round">\n    <div class="item-image  subalbum"">\n    <a href="#artists/' +
((__t = ( artist.pid )) == null ? '' : __t) +
'/' +
((__t = ( album.pid )) == null ? '' : __t) +
'"><img src="' +
((__t = ( album.image )) == null ? '' : __t) +
'" alt="' +
((__t = ( album.title )) == null ? '' : __t) +
'" alt="No images in this folder"/></a>\n</div>\n<div class="item-artist">' +
((__t = ( album.artist )) == null ? '' : __t) +
'</div>\n<div class="item-title">' +
((__t = ( album.title )) == null ? '' : __t) +
'</div>\n<div class="item-price">$' +
((__t = ( album.price )) == null ? '' : __t) +
'</div>\n</div>\n';
 } ;


}
return __p
};

this["TEMPLATES"]["templates/Artists.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


var length = data.length;
for (var index = 0; index < length; index++){
var attributes = data[index];
;
__p += '\n\n<div class="item drop-shadow round">\n    <div class="item-image">\n        <a href="#artists/' +
((__t = ( attributes.pid )) == null ? '' : __t) +
'"><img src="' +
((__t = ( attributes.image )) == null ? '' : __t) +
'" alt="' +
((__t = ( attributes.title )) == null ? '' : __t) +
'" /></a>\n    </div>\n    <div class="item-artist">' +
((__t = ( attributes.artist )) == null ? '' : __t) +
'</div>\n    <div class="item-title">' +
((__t = ( attributes.title )) == null ? '' : __t) +
'</div>\n    <div class="item-years">' +
((__t = ( attributes.years )) == null ? '' : __t) +
'</div>\n</div>\n';
 } ;


}
return __p
};

this["TEMPLATES"]["templates/BuyAlbum.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="item-detail">\n    <div class="item-image drop-shadow round"><img src="' +
((__t = ( data.large_image )) == null ? '' : __t) +
'" alt="' +
((__t = ( data.title )) == null ? '' : __t) +
'" /></div>\n    <div class="item-info">\n        <div class="item-artist">' +
((__t = ( data.artist )) == null ? '' : __t) +
'</div>\n        <div class="item-title">' +
((__t = ( data.title )) == null ? '' : __t) +
'</div>\n        <div class="item-price">$' +
((__t = ( data.price )) == null ? '' : __t) +
'</div>\n        <br />\n        <div class="item-link"><a href="' +
((__t = ( data.url )) == null ? '' : __t) +
'" class="button">Buy this item</a></div>\n        <div class="back-link"><a href="javascript:window.history.back();" class="button">&laquo; Back to Albums</a></div>\n    </div>\n</div>';

}
return __p
};

this["TEMPLATES"]["templates/ContactTemplate.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="leftcol">\n    <div class="block">\n        <div class="block-top"></div>\n        <div class="block-content">\n            <h2>Contact the <span>DelliStore!</span></h2>\n            <p>liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condimentum, magna. Aliquam augue dolor, tempus sit amet, pharetra nec, blandit elementum, diam. Proin pharetra odio eu lectus sollicitudin ultricies.</p>\n            <form id="contact-form" action="#">\n                <fieldset>\n                    <ul>\n                        <li>\n                            <label>Full Name <span>*</span></label>\n                            <input type="text" />\n                        </li>\n                        <li>\n                            <label>Email Address <span>*</span></label>\n                            <input type="text" />\n                        </li>\n                        <li>\n                            <label>Your Message  <span>*</span></label>\n                            <textarea cols="50" rows="5"></textarea>\n                        </li>\n                        <li class="submit">\n                            <p><span>*</span> These are required fields</p>\n                            <input type="submit" value="Send Message"/>\n                        </li>\n                    </ul>\n                </fieldset>\n            </form>\n        </div>\n        <div class="block-bottom"></div>\n    </div>\n</div>\n<div id="rightcol">\n    <div class="block">\n        <div class="block-top"></div>\n        <div class="block-content">\n            <h3>The <span>Store!</span></h3>\n            <ul>\n                <li><a href="#">The History</a></li>\n                <li><a href="#">Meet The Staff</a></li>\n                <li><a href="#">Contacting Us</a></li>\n                <li><a href="#">Hours of Operation</a></li>\n            </ul>\n        </div>\n        <div class="block-bottom"></div>\n    </div>\n    <div class="block">\n        <div class="block-top"></div>\n        <div class="block-content">\n            <h3><span>Get it Free!</span></h3>\n            <div class="free-cake">\n                <img src="img/img-cake-small.jpg" alt="Cake" />\n                <p>Get Your <strong>FREE Cake!</strong></p>\n                <a class="yellow-button"><span>Get It!</span></a>\n            </div>\n        </div>\n        <div class="block-bottom"></div>\n    </div>\n</div>';

}
return __p
};

this["TEMPLATES"]["templates/Footer.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="footer">\n    <p>©2009 The DelliStore. Design by <a href="http://www.dellustrations.com/templates.html">Dellustrations.com</a> for <a href="http://www.smashingmagazine.com">Smashing Magazine</a></p>\n    <ul>\n        <li><a href="index.html">Home</a></li>\n        <li><a href="about.html">About Us</a></li>\n        <li><a href="services.html">Services </a></li>\n        <li><a href="contact.html">Contact us</a></li>\n    </ul>\n</div>';

}
return __p
};

this["TEMPLATES"]["templates/Header.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="header">\n    <div class="background">\n        <h1><a href="index.html">DelliStore</a></h1>\n        <ul>\n            <li class="active"><a href="index.html">Home</a></li>\n            <li><a href="about.html">About Us</a></li>\n            <li><a href="services.html">Services</a></li>\n            <li><a href="contact.html">Contact Us</a></li>\n        </ul>\n    </div>\n</div>\n';

}
return __p
};

this["TEMPLATES"]["templates/HomeBody.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="leftcol">\n    <div class="block">\n        <div class="block-top"></div>\n        <div class="block-content">\n            <h2>Welcome to the <span>DelliStore!</span></h2>\n            <p>\n                <img class="cake" src="img/img-cake.jpg" alt="Cake" />\n                liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condimentum, magna. Aliquam augue dolor,\n                tempus sit amet, pharetra nec, blandit elementum, diam. Proin pharetra odio eu lectus sollicitudin ultricies. Suspend<br />\n                isse turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.</p>\n            <a class="yellow-button" href="#"><span>Learn More</span></a>\n            <div class="links">\n                <ul>\n                    <li><a href="#">The History</a></li>\n                    <li><a href="#">Meet The Staff</a></li>\n                    <li><a href="#">Contacting Us</a></li>\n                </ul>\n                <ul>\n                    <li><a href="#">The History</a></li>\n                    <li><a href="#">Meet The Staff</a></li>\n                    <li><a href="#">Contacting Us</a></li>\n                </ul>\n                <ul>\n                    <li><a href="#">The History</a></li>\n                    <li><a href="#">Meet The Staff</a></li>\n                    <li><a href="#">Contacting Us</a></li>\n                </ul>\n            </div>\n        </div>\n        <div class="block-bottom"></div>\n    </div>\n</div>\n<div id="rightcol">\n    <div class="block">\n        <div class="block-top"></div>\n        <div class="block-content">\n            <h3>Our <span>Specials!</span></h3>\n            <ul>\n                <li><a href="#">Burger</a><strong>$4.99</strong></li>\n                <li><a href="#">Chicken Wings</a><strong>$5.99</strong></li>\n                <li><a href="#">French Fries</a><strong>$4.99</strong></li>\n                <li><a href="#">Large Pizza</a><strong>$12.99</strong></li>\n            </ul>\n            <a class="yellow-button"><span>See Menu</span></a>\n        </div>\n        <div class="block-bottom"></div>\n    </div>\n</div>';

}
return __p
};
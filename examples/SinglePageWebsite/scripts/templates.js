this["JST"] = this["JST"] || {};

this["JST"]["templates/AboutTemplate.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="leftcol">\r\n    <div class="block">\r\n        <div class="block-top"></div>\r\n        <div class="block-content">\r\n            <h2>About the <span>DelliStore!</span></h2>\r\n            <p>liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condimentum, magna. Aliquam augue dolor, tempus sit amet, pharetra nec, blandit elementum, diam. Proin pharetra odio eu lectus sollicitudin ultricies. Suspendisse turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.</p>\r\n            <div class="clear">\r\n                <div class="border-left-top">\r\n                    <div class="border-right-top">\r\n                        <div class="border-left-bottom">\r\n                            <div class="border-right-bottom">\r\n                                <img src="img/img-interier.jpg" alt="Interier" />\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <p>liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condime ntum, magna. Aliquam augue dolor, tempus sit amet, pharetra nec.liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condime ntum, magna. Aliquam augue dolor, tempus sit amet, pharetra nec.liquam suscipit. liquam su scipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condime ntum, magna.</p>\r\n        </div>\r\n        <div class="block-bottom"></div>\r\n    </div>\r\n\r\n\r\n</div>\r\n<div id="rightcol">\r\n    <div class="block">\r\n        <div class="block-top"></div>\r\n        <div class="block-content">\r\n            <h3>The <span>Store!</span></h3>\r\n            <ul>\r\n                <li><a href="#">The History</a></li>\r\n                <li><a href="#">Meet The Staff</a></li>\r\n                <li><a href="#">Contacting Us</a></li>\r\n            </ul>\r\n        </div>\r\n        <div class="block-bottom"></div>\r\n    </div>\r\n    <div class="block">\r\n        <div class="block-top"></div>\r\n        <div class="block-content">\r\n            <h3><span>Sign Up!</span></h3>\r\n            <form id="signup-form" action="#">\r\n                <fieldset>\r\n                    <label>Email Address</label>\r\n                    <input type="text" />\r\n                    <input class="submit" type="submit" value="Sing Up!" />\r\n                </fieldset>\r\n            </form>\r\n        </div>\r\n        <div class="block-bottom"></div>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["templates/Albums.tpl"] = function(obj) {
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
__p += '\r\n<div class="item drop-shadow round">\r\n    <div class="item-image  subalbum"">\r\n    <a href="#artists/' +
((__t = ( artist.pid )) == null ? '' : __t) +
'/' +
((__t = ( album.pid )) == null ? '' : __t) +
'"><img src="' +
((__t = ( album.image )) == null ? '' : __t) +
'" alt="' +
((__t = ( album.title )) == null ? '' : __t) +
'" alt="No images in this folder"/></a>\r\n</div>\r\n<div class="item-artist">' +
((__t = ( album.artist )) == null ? '' : __t) +
'</div>\r\n<div class="item-title">' +
((__t = ( album.title )) == null ? '' : __t) +
'</div>\r\n<div class="item-price">$' +
((__t = ( album.price )) == null ? '' : __t) +
'</div>\r\n</div>\r\n';
 } ;


}
return __p
};

this["JST"]["templates/Artists.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


var length = data.length;
for (var index = 0; index < length; index++){
var attributes = data[index];
;
__p += '\r\n\r\n<div class="item drop-shadow round">\r\n    <div class="item-image">\r\n        <a href="#artists/' +
((__t = ( attributes.pid )) == null ? '' : __t) +
'"><img src="' +
((__t = ( attributes.image )) == null ? '' : __t) +
'" alt="' +
((__t = ( attributes.title )) == null ? '' : __t) +
'" /></a>\r\n    </div>\r\n    <div class="item-artist">' +
((__t = ( attributes.artist )) == null ? '' : __t) +
'</div>\r\n    <div class="item-title">' +
((__t = ( attributes.title )) == null ? '' : __t) +
'</div>\r\n    <div class="item-years">' +
((__t = ( attributes.years )) == null ? '' : __t) +
'</div>\r\n</div>\r\n';
 } ;


}
return __p
};

this["JST"]["templates/BuyAlbum.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="item-detail">\r\n    <div class="item-image drop-shadow round"><img src="' +
((__t = ( data.large_image )) == null ? '' : __t) +
'" alt="' +
((__t = ( data.title )) == null ? '' : __t) +
'" /></div>\r\n    <div class="item-info">\r\n        <div class="item-artist">' +
((__t = ( data.artist )) == null ? '' : __t) +
'</div>\r\n        <div class="item-title">' +
((__t = ( data.title )) == null ? '' : __t) +
'</div>\r\n        <div class="item-price">$' +
((__t = ( data.price )) == null ? '' : __t) +
'</div>\r\n        <br />\r\n        <div class="item-link"><a href="' +
((__t = ( data.url )) == null ? '' : __t) +
'" class="button">Buy this item</a></div>\r\n        <div class="back-link"><a href="javascript:window.history.back();" class="button">&laquo; Back to Albums</a></div>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["templates/ContactTemplate.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="leftcol">\r\n    <div class="block">\r\n        <div class="block-top"></div>\r\n        <div class="block-content">\r\n            <h2>Contact the <span>DelliStore!</span></h2>\r\n            <p>liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condimentum, magna. Aliquam augue dolor, tempus sit amet, pharetra nec, blandit elementum, diam. Proin pharetra odio eu lectus sollicitudin ultricies.</p>\r\n            <form id="contact-form" action="#">\r\n                <fieldset>\r\n                    <ul>\r\n                        <li>\r\n                            <label>Full Name <span>*</span></label>\r\n                            <input type="text" />\r\n                        </li>\r\n                        <li>\r\n                            <label>Email Address <span>*</span></label>\r\n                            <input type="text" />\r\n                        </li>\r\n                        <li>\r\n                            <label>Your Message  <span>*</span></label>\r\n                            <textarea cols="50" rows="5"></textarea>\r\n                        </li>\r\n                        <li class="submit">\r\n                            <p><span>*</span> These are required fields</p>\r\n                            <input type="submit" value="Send Message"/>\r\n                        </li>\r\n                    </ul>\r\n                </fieldset>\r\n            </form>\r\n        </div>\r\n        <div class="block-bottom"></div>\r\n    </div>\r\n</div>\r\n<div id="rightcol">\r\n    <div class="block">\r\n        <div class="block-top"></div>\r\n        <div class="block-content">\r\n            <h3>The <span>Store!</span></h3>\r\n            <ul>\r\n                <li><a href="#">The History</a></li>\r\n                <li><a href="#">Meet The Staff</a></li>\r\n                <li><a href="#">Contacting Us</a></li>\r\n                <li><a href="#">Hours of Operation</a></li>\r\n            </ul>\r\n        </div>\r\n        <div class="block-bottom"></div>\r\n    </div>\r\n    <div class="block">\r\n        <div class="block-top"></div>\r\n        <div class="block-content">\r\n            <h3><span>Get it Free!</span></h3>\r\n            <div class="free-cake">\r\n                <img src="img/img-cake-small.jpg" alt="Cake" />\r\n                <p>Get Your <strong>FREE Cake!</strong></p>\r\n                <a class="yellow-button"><span>Get It!</span></a>\r\n            </div>\r\n        </div>\r\n        <div class="block-bottom"></div>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["templates/Footer.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="footer">\r\n    <p>©2009 The DelliStore. Design by <a href="http://www.dellustrations.com/templates.html">Dellustrations.com</a> for <a href="http://www.smashingmagazine.com">Smashing Magazine</a></p>\r\n    <ul>\r\n        <li><a href="index.html">Home</a></li>\r\n        <li><a href="about.html">About Us</a></li>\r\n        <li><a href="services.html">Services </a></li>\r\n        <li><a href="contact.html">Contact us</a></li>\r\n    </ul>\r\n</div>';

}
return __p
};

this["JST"]["templates/Header.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="header">\r\n    <div class="background">\r\n        <h1><a href="index.html">DelliStore</a></h1>\r\n        <ul>\r\n            <li class="active"><a href="index.html">Home</a></li>\r\n            <li><a href="about.html">About Us</a></li>\r\n            <li><a href="services.html">Services</a></li>\r\n            <li><a href="contact.html">Contact Us</a></li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/HomeBody.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="leftcol">\r\n    <div class="block">\r\n        <div class="block-top"></div>\r\n        <div class="block-content">\r\n            <h2>Welcome to the <span>DelliStore!</span></h2>\r\n            <p>\r\n                <img class="cake" src="img/img-cake.jpg" alt="Cake" />\r\n                liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condimentum, magna. Aliquam augue dolor,\r\n                tempus sit amet, pharetra nec, blandit elementum, diam. Proin pharetra odio eu lectus sollicitudin ultricies. Suspend<br />\r\n                isse turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.</p>\r\n            <a class="yellow-button" href="#"><span>Learn More</span></a>\r\n            <div class="links">\r\n                <ul>\r\n                    <li><a href="#">The History</a></li>\r\n                    <li><a href="#">Meet The Staff</a></li>\r\n                    <li><a href="#">Contacting Us</a></li>\r\n                </ul>\r\n                <ul>\r\n                    <li><a href="#">The History</a></li>\r\n                    <li><a href="#">Meet The Staff</a></li>\r\n                    <li><a href="#">Contacting Us</a></li>\r\n                </ul>\r\n                <ul>\r\n                    <li><a href="#">The History</a></li>\r\n                    <li><a href="#">Meet The Staff</a></li>\r\n                    <li><a href="#">Contacting Us</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class="block-bottom"></div>\r\n    </div>\r\n</div>\r\n<div id="rightcol">\r\n    <div class="block">\r\n        <div class="block-top"></div>\r\n        <div class="block-content">\r\n            <h3>Our <span>Specials!</span></h3>\r\n            <ul>\r\n                <li><a href="#">Burger</a><strong>$4.99</strong></li>\r\n                <li><a href="#">Chicken Wings</a><strong>$5.99</strong></li>\r\n                <li><a href="#">French Fries</a><strong>$4.99</strong></li>\r\n                <li><a href="#">Large Pizza</a><strong>$12.99</strong></li>\r\n            </ul>\r\n            <a class="yellow-button"><span>See Menu</span></a>\r\n        </div>\r\n        <div class="block-bottom"></div>\r\n    </div>\r\n</div>';

}
return __p
};
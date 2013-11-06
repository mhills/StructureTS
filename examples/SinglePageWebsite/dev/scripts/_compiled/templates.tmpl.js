this["JST"] = this["JST"] || {};

this["JST"]["templates/footer/footerTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"footer\">\n    <p>©2009 The DelliStore. Design by <a href=\"http://www.dellustrations.com/templates.html\">Dellustrations.com</a> for <a href=\"http://www.smashingmagazine.com\">Smashing Magazine</a></p>\n    <ul>\n        <li><a href=\"index.html\">Home</a></li>\n        <li><a href=\"about.html\">About Us</a></li>\n        <li><a href=\"services.html\">Services </a></li>\n        <li><a href=\"contact.html\">Contact us</a></li>\n    </ul>\n</div>";
  });

this["JST"]["templates/header/headerTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"header\">\n    <div class=\"background\">\n        <h1><a href=\"index.html\">DelliStore</a></h1>\n        <ul>\n            <li class=\"active\"><a href=\"index.html\">Home</a></li>\n            <li><a href=\"about.html\">About Us</a></li>\n            <li><a href=\"services.html\">Services</a></li>\n            <li><a href=\"contact.html\">Contact Us</a></li>\n        </ul>\n    </div>\n</div>";
  });

this["JST"]["templates/home/homeTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"content\">\n    <div id=\"leftcol\">\n        <div class=\"block\">\n            <div class=\"block-top\"></div>\n            <div class=\"block-content\">\n                <h2>Welcome to the <span>DelliStore!</span></h2>\n                <p>\n                    <img class=\"cake\" src=\"images/img-cake.jpg\" alt=\"Cake\" />\n                    liquam suscipit. <strong>Integer justo</strong> erat, bibendum sed, lacinia eu, tristique condimentum, magna. Aliquam augue dolor,\n                    tempus sit amet, pharetra nec, blandit elementum, diam. Proin pharetra odio eu lectus sollicitudin ultricies. Suspend<br />\n                    isse turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.</p>\n                <a class=\"yellow-button\" href=\"#\"><span>Learn More</span></a>\n            </div>\n            <div class=\"block-bottom\"></div>\n        </div>\n    </div>\n    <div id=\"rightcol\">\n        <div class=\"block\">\n            <div class=\"block-top\"></div>\n            <div class=\"block-content\">\n                <h3>Our <span>Specials!</span></h3>\n                <ul>\n                    <li><a href=\"#\">Burger</a><strong>$4.99</strong></li>\n                    <li><a href=\"#\">Chicken Wings</a><strong>$5.99</strong></li>\n                    <li><a href=\"#\">French Fries</a><strong>$4.99</strong></li>\n                    <li><a href=\"#\">Large Pizza</a><strong>$12.99</strong></li>\n                </ul>\n                <a class=\"yellow-button\"><span>See Menu</span></a>\n            </div>\n            <div class=\"block-bottom\"></div>\n        </div>\n\n\n    </div>\n</div>";
  });
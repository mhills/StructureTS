this["JST"] = this["JST"] || {};

this["JST"]["templates/MainTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\n    <img src=\"img/header.png\" width=\"100%\"/>\n    <br/>\n    <button type=\"button\" id=\"js-addTodoButton\" class=\"addToDo\"><img src=\"img/button_addtodo.png\"/></button>\n    <button type=\"button\" id=\"js-removeTasksButton\" class=\"removeTasks\"><img src=\"img/button_removetasks.png\"/></button>\n    <br/><br/><br/>\n    <table id=\"js-todoContainer\" width=\"100%\" border=\"0\">\n    </table>\n</div>\n";
  });

this["JST"]["templates/PhoneGapTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"app\">\n    <h1>PhoneGap</h1>\n    <div id=\"deviceready\" class=\"blink\">\n        <p class=\"event listening\">Connecting to Device</p>\n        <p class=\"event received\">Device is Ready</p>\n    </div>\n</div>";
  });

this["JST"]["templates/TodoItemTemplate.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr data-id=\""
    + escapeExpression(((stack1 = depth0.id),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"todoItem\">\n    <td><input type=\"checkbox\" name=\"chkbox[]\" class=\"checkbox\"></td>\n    <td><input type=\"text\" name=\"txtbox[]\" class=\"textbox\" value=\""
    + escapeExpression(((stack1 = depth0.text),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></td>\n    <td><input type=\"button\" class=\"viewButton\"></td>\n    <td><input type=\"button\" class=\"deleteButton\"></td>\n</tr>";
  return buffer;
  });
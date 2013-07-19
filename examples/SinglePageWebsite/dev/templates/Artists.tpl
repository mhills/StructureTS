<%
var length = data.length;
for (var index = 0; index < length; index++){
var attributes = data[index];
%>

<div class="item drop-shadow round">
    <div class="item-image">
        <a href="#artists/<%= attributes.pid %>"><img src="<%= attributes.image %>" alt="<%= attributes.title %>" /></a>
    </div>
    <div class="item-artist"><%= attributes.artist %></div>
    <div class="item-title"><%= attributes.title %></div>
    <div class="item-years"><%= attributes.years %></div>
</div>
<% } %>
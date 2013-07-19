<%
var artist = data;
console.log(artist, albumCollection)
var albumCollection = artist.albumList;

var length = albumCollection.length;
for (var index = 0; index < length; index++){
var album = albumCollection[index];
%>
<div class="item drop-shadow round">
    <div class="item-image  subalbum"">
    <a href="#artists/<%= artist.pid %>/<%= album.pid %>"><img src="<%= album.image %>" alt="<%= album.title %>" alt="No images in this folder"/></a>
</div>
<div class="item-artist"><%= album.artist %></div>
<div class="item-title"><%= album.title %></div>
<div class="item-price">$<%= album.price %></div>
</div>
<% } %>
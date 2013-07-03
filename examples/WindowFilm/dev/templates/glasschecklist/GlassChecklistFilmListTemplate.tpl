<option value="" selected>Choose One</option>
<% _.each(films, function(item, index, array) { %>
<option class="<%= (item.valid) ? 'valid' : 'invalid' %>" value="<%= item.FILM_TYPE %>"<%= (item.FILM_TYPE === chosenFilm) ? ' selected="selected"' : '' %>><%= item.FILM_TYPE %></option>
<% }) %>
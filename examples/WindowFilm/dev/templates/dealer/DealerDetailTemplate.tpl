<% items.each(function(dealer) { %>
<tr>
    <td><%= dealer.get('name') %></td>
    <td><%= dealer.get('code') %></td>
    <td><a href="<%= dealer.url('view') %>" class="js-edited online-only"><i class="icon-pencil"></i></a></td>
</tr>
<% }); %>
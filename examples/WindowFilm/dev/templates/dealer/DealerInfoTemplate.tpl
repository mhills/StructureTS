<li><b>Partner Name:</b> <%= dealer.get('name') %></li>
<li><b>Partner Company Code:</b> <%= dealer.get('code') %></li>
<li class="text-center">
    <a href="<%= dealer.url('edit') %>" class="btn btn-primary">Edit</a>
</li>
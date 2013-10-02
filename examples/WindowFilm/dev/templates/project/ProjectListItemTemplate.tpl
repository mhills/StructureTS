<% if (project.getSyncState()) { %>
<div class="infoBlock-hd js-infoBlock-header <%= (active === true) ? 'active' : '' %>">
    <h2 class="hdg-listing js-view"><%= project.get('customer').get('buildingName') %></h2>
    <% if (!project.isActive()) { %>
    <span class="label label-warning project-sync-button">Archived <i class="icon-lock icon-white"></i></span>
    <% } %>
</div>
<% } else { %>
<a href="<%= project.url('view') %>" class="link-project">
<div class="infoBlock-hd js-infoBlock-header <%= (active === true) ? 'active' : '' %>">
    <h2 class="hdg-listing js-view"><%= project.get('customer').get('buildingName') %></h2>
    <% if (!project.isActive()) { %>
    <span class="label label-warning project-sync-button">Archived <i class="icon-lock icon-white"></i></span>
    <% } %>
</div>
<% } %>
<% if (!project.isRemote()) { %>
<button class="btn btn-mini project-sync-button <%= project.hasChanged() ? 'btn-danger' : 'btn-success' %> js-sync" type="button"<%= (project.getSyncState()) ? ' disabled="disabled"' : '' %>>
    Sync <i class="icon-white icon-refresh"></i>
</button>
<% } %>
<div class="infoBlock-bd">
    <div class="inset">
        <ul class="unstyled">
            <li><%= project.get('customer').get('companyName') %></li>
            <li><%= project.get('customer').get('contactName') %> <div class="pull-right"><%= project.get('customer').get('phoneNumber') %></div></li>
            <li>Last Edited: <div class="pull-right"><%= project.get('updatedDate') %></div></li>
            <li>Total area: <%= project.get('totalArea') %> <%= project.isImperial() ? 'square feet' : 'square meters' %></li>
        </ul>
    </div>
</div>
<% if (!project.getSyncState()) { %>
</a>
<% } %>
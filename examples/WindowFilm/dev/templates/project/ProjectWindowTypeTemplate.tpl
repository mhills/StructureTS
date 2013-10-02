<div class="accordion-group">
    <div class="accordion-heading">
        <span class="windowName">
            <a class="accordion-toggle" data-toggle="collapse" data-parent="#windowTypes-accordion" data-target="#window-type-<%= windowType.get('id') %>">
                <%= windowType.get('name') %>
            </a>
        </span>
        <div class="accordion-heading-actions pull-right">
            <% if (windowType.get('glassChecklist').get('complete')) { %>
            <span class="note">Checklist completed: <%= windowType.get('glassChecklist').get('completeDate')  %></span>
            <a href="<%= windowType.url(isProjectRemote ? !project.isActive() ? 'project-archive-glass-checklist-view' : 'glass-checklist-view' : 'glass-checklist') %>" class="label label-important">Checklist Completed</a>
            <% } else { %>
            <a href="<%= windowType.url(isProjectRemote ? !project.isActive() ? 'project-archive-glass-checklist-view' : 'glass-checklist-view' : 'glass-checklist') %>" class="btn btn-mini"><%= (isAdmin || isProjectRemote) ? "View" : "Run" %> Glass Checklist</a>
            <% } %>
            <% if (!project.isRemote()) { %>
            <a href="<%= windowType.url('edit') %>" class="btn btn-mini btn-info">Edit <i class="icon-edit icon-white"></i></a>
            <button class="btn btn-mini btn-danger js-delete" data-id="<%= windowType.get('id') %>">Delete <i class="icon-trash icon-white"></i></button>
            <% } %>
        </div>
    </div>
    <div id="window-type-<%= windowType.get('id') %>" class="accordion-body collapse">
        <div class="accordion-inner">
            <ul class="unstyled">
                <li><strong>Glass Type:</strong> <%= window.get('glassType') %></li>
                <li><strong>Width:</strong> <%= window.get('width') %> <%= window.isImperial() ? 'in' : 'mm' %></li>
                <li><strong>Height:</strong> <%= window.get('height') %> <%= window.isImperial() ? 'in' : 'mm' %></li>
                <li><strong>Count:</strong> <%= window.get('count') %></li>
                <li><strong>Area:</strong> <%= window.get('totalArea') %> <%= (window.isImperial()) ? 'square feet' : 'square meters' %></li>
                <li><strong>Linear Width:</strong> <%= window.get('linearWidth') %> <%= (window.isImperial()) ? 'linear feet' : 'linear meters' %></li>
                <li><strong>Linear Height:</strong> <%= window.get('linearHeight') %> <%= (window.isImperial()) ? 'linear feet' : 'linear meters' %></li>
                <li><strong>Side:</strong> <%= windowType.get('side') %></li>
                <li><strong>Film Chosen:</strong> <%= windowType.get('glassChecklist').get('chosenFilm') %></li>
            </ul>
            <h4>Window Information</h4>
            <ul class="unstyled">
                <li><strong>Interior Shading:</strong> <%= windowType.get('shadingInterior') %></li>
                <li><strong>Outdoor Shading:</strong> <%= windowType.get('shadingOutdoor') %></li>
                <li><strong>Architectural Window Type:</strong> <%= windowType.get('architecturalWindow') %></li>
            </ul>
            <% if (windowType.get('notes')) { %>
            <div class="notes">
                <div class="notes-hd">
                    <h4>Notes</h4>
                </div>
                <div class="notes-bd">
                    <%= windowType.get('notes') %>
                </div>
            </div>
            <% } %>
        </div>
    </div>
</div>
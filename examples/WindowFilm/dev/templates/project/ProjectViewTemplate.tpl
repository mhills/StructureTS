<h2 class="hdg-section">Project Information
    <div class="pull-right">

        <% var isProjectRemote = project.isRemote() %>
        <% if (!isProjectRemote) { %>
            <a href="<%= project.url('edit') %>" class="btn btn-mini btn-info">Edit <i class="icon-edit icon-white"></i></a>
            <a href="deploy/data/efilm/EFILM_Form_askeland.pdf" target="_blank" class="btn btn-mini btn-success">E-Film <i class="icon-list-alt icon-white"></i></a>
        <% } %>

        <a href="javascript:void(0);" id="js-export-button" class="btn btn-mini btn-primary" data-id="<%= project.get('id') %>">Export <i class="icon-share-alt icon-white"></i></a>

        <% if (!isProjectRemote) { %>
            <button class="btn btn-mini btn-warning js-archive">Archive <i class="icon-lock icon-white"></i></button>
        <% } else if (!project.isActive() && !isAdmin) { %>
            <button class="btn btn-mini btn-warning js-unarchive">Un-archive <i class="icon-lock icon-white"></i></button>
        <% } %>
    </div>
</h2>
<div>
    <div class="well-alt">
        <ul class="unstyled project">
            <li><strong>Project:</strong> <%= project.get('customer').get('buildingName') %><div class="pull-right"><strong>Last Edited:</strong> <%= project.get('updatedDate') %></div></li>
            <% if (project.get('customer').has('companyName')) { %>
            <li><strong>Company:</strong> <%= project.get('customer').get('companyName') %></li>
            <% } %>
            <% if (project.get('customer').has('contactName')) { %>
            <li><strong>Contact:</strong> <%= project.get('customer').get('contactName') %></li>
            <% } %>
            <% if (project.get('customer').has('phoneNumber')) { %>
            <li><strong>Phone:</strong> <%= project.get('customer').get('phoneNumber') %></li>
            <% } %>
            <li>
                <form class="form-horizontal pull-right">
                    <div class="control-group">
                        <div class="controls">
                            <label class="checkbox js-project-sold">
                                <input type="checkbox" <%= isProjectRemote ? 'disabled' : '' %> <%= (project.get('sold')) ? 'checked' : '' %> > Project Sold
                            </label> 
                        </div>
                    </div>
                </form>
            </li>
            <li><strong>Address:</strong> <span class="address"><%= project.get('customer').getAddress() %></span></li>
        </ul>
    </div>
    <div class="well-alt">
        <ul class="unstyled project">
            <li><strong>Project Totals:</strong>
                <ul class="unstyled">
                    <li><strong>Total Area:</strong> <%= project.get('totalArea') %> <%= (project.isImperial()) ? 'square feet' : 'square meters' %></li>
                    <li><strong>Linear Width:</strong> <%= project.get('linearWidth') %> <%= (project.isImperial()) ? 'linear feet' : 'linear meters' %></li>
                    <li><strong>Linear Height:</strong> <%= project.get('linearHeight') %> <%= (project.isImperial()) ? 'linear feet' : 'linear meters' %></li>
                    <li><strong>Window Count:</strong> <%= project.get('windowCount') %></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="windowTypes">
        <div class="windowTypes-hd">
            <h2 class="hdg-section">Window Types
                <% if (!isProjectRemote) { %>
                <div class="pull-right">
                    <a href="<%= project.get('windowTypes').url('new') %>" class="btn btn-mini btn-success">New Window <i class="icon-plus icon-white"></i></a>
                </div>
                <% } %>
            </h2>
        </div>
        <div class="windowTypes-bd">
            <div class="accordion" id="windowTypes-accordion">
                <% project.get('windowTypes').each(function(window) { %>
                <%= windowTemplate({ windowType: window, window: window.get('window'), project: project, isProjectRemote: isProjectRemote, isAdmin: isAdmin }) %>
                <% }) %>
            </div>
        </div>
    </div>
</div>
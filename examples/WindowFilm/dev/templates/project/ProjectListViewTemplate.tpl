<div id="navbarWindowType" class="navbar navbar-static navbarPanel">
    <div class="navbar-inner">
        <div class="container">
            <ul class="nav" role="navigation">
                <li class="dropdown">
                    <a id="drop1" role="button" class="dropdown-toggle" data-toggle="dropdown">Menu <i class="icon-align-justify"></i></a>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
                        <li><a href="<%= _.route('home') %>">Main Menu</a></li>
                        <li><a href="<%= _.route('project-new') %>">New Project</a></li>
                        <li><a href="<%= _.route('projects') %>">Active Projects</a></li>
                        <li><a href="<%= _.route('project-archives') %>" class="online-only" >Archived Projects</a></li>
                        <li><a href="<%= _.route('calculator') %>">Energy Calculator</a></li>
                        <li><a href="<%= _.route('product-info') %>" class="online-only" target="_blank">Product Information</a></li>
                        <li><a href="<%= _.route('help') %>">Help</a></li>
                    </ul>
                </li>
                <li class="divider-vertical"></li>
                <li class="dropdown">
                    <a id="drop2" role="button" class="dropdown-toggle" data-toggle="dropdown">Sort <i class="icon-chevron-down"></i></a>
                    <ul class="dropdown-menu js-sort" role="menu" aria-labelledby="drop2">
                        <li><a data-sort="updatedDate" data-sort-dir="asc">Date Updated (0-9)</a></li>
                        <li class="active"><a data-sort="updatedDate" data-sort-dir="desc">Date Updated (9-0)</a></li>
                        <li><a data-sort="name" data-sort-dir="asc">Project/Building Name (A-Z)</a></li>
                        <li><a data-sort="name" data-sort-dir="desc">Project/Building Name (Z-A)</a></li>
                        <li><a data-sort="contact" data-sort-dir="asc">Contact Name (A-Z)</a></li>
                        <li><a data-sort="contact" data-sort-dir="desc">Contact Name (Z-A)</a></li>
                    </ul>
                </li>
                <% if (showSync) { %>
                <li class="divider-vertical"></li>
                <li>
                    <a class="js-sync-all">Sync All <i class="icon-refresh"></i></a>
                </li>
                <% } else if (!archive) { %>
                <li class="divider-vertical"></li>
                <li >
                    <a href="<%= _.route('user-edit', { id: userId }) %>">Edit User <i class="icon-edit"></i></a>
                </li>
                <% } %>
            </ul>
        </div>
    </div>
</div>
<div class="sidebarScroller">
    <div class="js-project-list"></div>
</div>
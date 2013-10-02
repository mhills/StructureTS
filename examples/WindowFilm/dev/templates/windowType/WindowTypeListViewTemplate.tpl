<div id="navbarWindowType" class="navbar navbar-static navbarPanel">
    <div class="navbar-inner">
        <div class="container">
            <ul class="nav" role="navigation">
                <li class="dropdown">
                    <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Menu <i class="icon-align-justify"></i></a>
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
                    <a href="#" id="drop2" role="button" class="dropdown-toggle" data-toggle="dropdown"><span class="js-filter-title"><%= windowSides.All %></span> <i class="icon-chevron-down"></i></a>
                    <ul class="dropdown-menu js-filter" role="menu" aria-labelledby="drop2">
                        <% _.forOwn(windowSides, function(value, key) { %>
                        <li><a data-filter="side" data-filter-value="<%= key %>" href="#"><%= value %></a></li>
                        <% }) %>
                    </ul>
                </li>
                <li class="divider-vertical"></li>
                <li>
                    <a href="<%= project.url('view') %>">View Project <i class="icon-briefcase"></i></a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="sidebarScroller">
    <div class="infoBlock">
        <div class="infoBlock-hd">
            <h2 class="hdg-listing">Project Information <a href="<%= project.get('windowTypes').url('new') %>" class="btn btn-mini btn-success pull-right">New Window <i class="icon-plus icon-white"></i></a></h2>
        </div>
        <!-- /infoBlock-hd -->
        <div class="infoBlock-bd">
            <div class="inset projectInformationPanel">
                <ul class="unstyled">
                    <li>Project: <%= project.get('customer').get('buildingName') %></li>
                    <li>Total: <span class="js-totalSquare"><%= project.get('totalArea') %></span> <%= (project.isImperial()) ? 'square feet' : 'square meters' %></li>
                    <li>W: <span class="js-linearWidth"><%= project.get('linearWidth') %></span> <%= (project.isImperial()) ? 'linear feet' : 'linear meters' %></li>
                    <li>H: <span class="js-linearHeight"><%= project.get('linearHeight') %></span> <%= (project.isImperial()) ? 'linear feet' : 'linear meters' %></li>
                    <li>Window Count: <span class="js-totalCount"><%= project.get('windowCount') %></span></li>
                </ul>
            </div>
            <!-- /inset -->
        </div>
        <!-- /infoBlock-bd -->
    </div>
    <!-- /infoBlock -->
    <div class="windowTypesPanel">
        <div class="windowTypesPanel-hd">
            <h2 class="hdg-section">Window Types</h2>
        </div>
        <!-- /windowTypesPanel-hd -->
        <div class="windowTypesPanel-bd js-window-type-list"></div>
        <!-- /windowTypesPanel-bd -->
    </div>
</div>
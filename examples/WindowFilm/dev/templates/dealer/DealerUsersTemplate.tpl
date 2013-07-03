<div class="frame">
    <div class="frame-hd">

        <div class="altSidebar">
            <div id="navbarWindowType" class="navbar navbar-static navbarPanel">
                <div class="navbar-inner">
                    <ul class="nav" role="navigation">
                        <li class="dropdown">
                            <a id="drop1" href="#" role="button" class="dropdown-toggle btn-menu" data-toggle="dropdown">Menu <i class="icon-align-justify icon-right"></i></a>
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
                    </ul>
                </div>
            </div>
        </div>
        <!-- /altSidebar -->

        <div class="hdg-section">
            <h2 class="hd hd_6">Partner Information</h2>
        </div>
        <!-- /hdg-section -->

        <div class="inset">
            <ul id="js-dealer-info" class="unstyled">

            </ul>
        </div>
        <!-- /inset -->

    </div>
    <!-- /span4 -->
    <div class="frame-bd">
        <div class="hdg-section">
            <form novalidate="novalidate"  class="js-filter form form-inline">
                <div class="row-fluid">
                    <div class="span8">
                        <h2 class="hd hd_6">Partner Users</h2>
                    </div>
                    <!-- /span -->
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="search">Search:</label>
                            <div class="controls">
                                <input type="text" id="search" value="" class="js-search input-medium" />
                            </div>
                        </div>
                        <!-- /control-group -->
                    </div>
                    <!-- /span -->
                    <div class="span1 text-right">
                        <input type="submit" class="btn btn-primary online-only" value="Filter" />
                    </div>
                    <!-- /span -->
                </div>
                <!-- /row -->
            </form>
            <!-- /row -->
        </div>
        <!-- /hdg-section -->

        <div class="js-list-container">
            <div class="well well_noBottom">
                <table class="table table-striped ">
                    <thead>
                    <tr>
                        <th class="sortable col col-firstName active ascending" data-sort="firstName">Name<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></th>
                        <th class="sortable col col-email" data-sort="email">Email<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></th>
                        <th class="sortable col col-dealerCode" data-sort="dealerCode">Partner<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></th>
                        <th class="sortable col col-role" data-sort="role">Role<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></th>
                        <th class="sortable col col-status" data-sort="status"><div class="text-center">Status<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></div></th>
                        <th class="sortable col col-created" data-sort="created">Created<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></th>
                        <th class="sortable col col-lastLogon" data-sort="lastLogon">Last Login<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <!-- /span8 -->
</div>
<!-- /row-fluid -->
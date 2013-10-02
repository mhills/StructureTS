<div>

    <div class="btn-toolbar">
        <div class="hdg-section">
            <form novalidate="novalidate"  class="js-filter form form-inline">
                <div class="row-fluid">
                    <div class="span2">
                        <a href="<%= _.route('user-new') %>" class="btn btn-primary online-only">Invite User</a>
                    </div>
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="role">Roles:</label>
                            <div class="controls">
                                <select class="js-filter-role input-medium" id="role">
                                    <option value="">All</option>
                                    <%= _.options(userRoles) %>
                                </select>
                            </div>
                        </div>
                        <!-- /control-group -->
                    </div>
                    <!-- /span -->
                    <div class="span3">
                        <div class="control-group">
                            <label class="control-label" for="status">Status:</label>
                            <div class="controls">
                                <select class="js-filter-status input-medium" id="status">
                                    <option value="">All</option>
                                    <%= _.options(userStatus) %>
                                </select>
                            </div>
                        </div>
                        <!-- /control-group -->
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
        </div>
    </div>
    <!-- /btn-toolbar -->

    <div class="js-list-container">
        <div class="well">
            <table class="table table-striped">
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
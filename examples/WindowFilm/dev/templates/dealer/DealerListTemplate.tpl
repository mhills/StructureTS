<div>
    <div class="btn-toolbar">
        <div class="hdg-section">
            <form novalidate="novalidate"  class="js-filter form form-inline">
                <div class="row-fluid">
                    <div class="span2">
                        <a href="<%= _.route('dealer-new') %>" class="btn btn-primary online-only">Add Partner</a>
                    </div>
                    <!-- /span -->
                    <div class="span3 offset6">
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
            <table class="table table-striped ">
                <thead>
                <tr>
                    <th class="sortable col col-name active ascending" data-sort="name">Name<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></th>
                    <th class="sortable col col-code" data-sort="code">Code<span class="icon-arrow-down"></span><span class="icon-arrow-up"></span></th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>
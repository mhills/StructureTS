<div class="hdg-section">
    <h2 class="hd hd_6">Window Information</h2>
</div>
<!-- /hdg-section -->

<form novalidate="novalidate" >

    <div class="well-indent well_noBottom form-horizontal">
        <div class="control-group">
            <label class="control-label">Window Name</label>
            <div class="controls">
                <input name="name" type="text" value="<%= windowType.get('name') %>" />
            </div>
        </div>

        <div class="control-group">
            <label class="control-label">Glass Type</label>
            <div class="controls">
                <select name="window-glassType" class="input-xlarge required">
                    <option value="">Select a Glass Type</option>
                    <%= _.options(window.enum('glassType'), window.get('glassType', { raw: true })) %>
                </select>
                <a href="javascript:void(0);" class="js-glassTypeInfo btn"><i class="icon-info-sign icon-black"></i></a>
            </div>
        </div>
    </div>

    <!-- /well-indent -->

    <div class="well">
        <div class="row-fluid">

            <div class="span3 text-center">
                <div class="control-group">
                    <label class="control-label">Height</label>
                    <div class="controls">
                        <div class="input-append">
                            <input name="window-height" type="number" value="<%= window.get('height') %>" step="any" class="input-mini required">
                            <span class="add-on"><%= window.isImperial() ? 'in' : 'mm' %></span>
                        </div>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->

            <div class="span3 text-center">
                <div class="control-group">
                    <label class="control-label">Width</label>
                    <div class="controls">
                        <div class="input-append">
                            <input name="window-width" type="number" value="<%= window.get('width') %>" step="any" class="input-mini required">
                            <span class="add-on"><%= window.isImperial() ? 'in' : 'mm' %></span>
                        </div>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->

            <div class="span3 text-center">
                <div class="control-group">
                    <label class="control-label">Window Count</label>
                    <div class="controls">
                        <input name="window-count" type="number" value="<%= window.get('count') %>" step="1" class="input-mini required">
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->

            <div class="span3 text-center">
                <div class="control-group">
                    <label class="control-label">Select Side</label>
                    <div class="controls">
                        <select id="selectSide" name="side" class="input-medium required">
                            <%= _.options(windowType.enum('side'), windowType.get('side', {raw: true})) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->

        <div class="row-fluid">
            <div class="span6">
                <label class="control-label text-right" for="selectInterior">Interior Shading</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select id="selectInterior" name="shadingInterior" class="input-small required">
                    <%= _.options(windowType.enum('shadingInterior'), windowType.get('shadingInterior', {raw: true})) %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->
        <div class="row-fluid">
            <div class="span6">
                <label class="control-label text-right" for="selectOutdoor">Outdoor Shading</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select id="selectOutdoor" name="shadingOutdoor" class="input-small required">
                    <%= _.options(windowType.enum('shadingOutdoor'), windowType.get('shadingOutdoor', {raw: true})) %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->
        <div class="row-fluid">
            <div class="span6">
                <label class="control-label text-right" for="selectWindowType">Architectural Window Type</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select id="selectWindowType" name="architecturalWindow" class="input-small required">
                    <%= _.options(windowType.enum('architecturalWindow'), windowType.get('architecturalWindow', {raw: true})) %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->

        <div class="row-fluid gapBottom gapTop">
            <div class="span4 text-center">
                Height: <span class="textHightlight js-linear-height"><%= window.get('linearHeight') %></span> <%= (window.isImperial()) ? 'linear feet' : 'linear meters' %>
            </div>
            <!-- /span -->
            <div class="span4 text-center">
                Width: <span class="textHightlight js-linear-width"><%= window.get('linearWidth') %></span> <%= (window.isImperial()) ? 'linear feet' : 'linear meters' %>
            </div>
            <!-- /span -->
            <div class="span4 text-center">
                Total Area: <span class="textHightlight js-total-square"><%= window.get('totalArea') %></span> <%= (window.isImperial()) ? 'square feet' : 'square meters' %>
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->

        <div class="row-fluid">
            <div class="span1">
                <label class="control-label" for="areaNotes">Notes</label>
            </div>
            <!-- /span -->

            <div class="span11">
                <textarea row-fluids="5" name="notes" id="areaNotes" style="width: 100%"><%= windowType.get('notes') %></textarea>
            </div>
            <!-- /span -->

        </div>
        <!-- /row-fluid -->

        <div class="row-fluid">
            <div class="span12 text-center">
                <input type="submit" class="btn btn-primary" value="<%= submit %>" />
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->

    </div>
    <!-- /well -->

</form>
<div class="frame">
<div class="frame-hd">
    <div id="navbarWindowType" class="navbar navbar-static navbarPanel">
        <div class="navbar-inner">
            <div class="container">
                <ul class="nav" role="navigation">
                    <li class="dropdown">
                        <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Menu <i
                                    class="icon-align-justify"></i></a>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
                            <li><a href="<%= _.route('home') %>">Main Menu</a></li>
                            <li><a href="<%= _.route('project-new') %>">New Project</a></li>
                            <li><a href="<%= _.route('projects') %>">Active Projects</a></li>
                            <li><a href="<%= _.route('project-archives') %>" class="online-only">Archived Projects</a>
                            </li>
                            <li><a href="<%= _.route('calculator') %>">Energy Calculator</a></li>
                            <li><a href="<%= _.route('product-info') %>" class="online-only" target="_blank">Product
                                    Information</a></li>
                            <li><a href="<%= _.route('help') %>">Help</a></li>
                        </ul>
                    </li>
                    <li class="divider-vertical"></li>
                    <li>
                        <a href="<%= archiveView ? project.url('archive') : project.url() %>">Back to Project <i
                                    class="icon-briefcase"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="sidebarScroller">
        <div id="js-glass-checklist-nav">
        </div>
    </div>
</div>
<!-- /frame-hd -->

<div class="frame-bd">
<form novalidate="novalidate">
<div class="subFrame2">

<div class="subFrame-bd">
<fieldset id="building">
    <div class="hdg-section">
        <h2 class="hd hd_6">Building Information</h2>
    </div>
    <div class="well-indent well_noBottom form-inline">
        <div class="control-group">
            <label class="control-label" for="glassType">Glass Type</label>

            <div class="controls">
                <select name="glassType" class="required input-large">
                    <%= _.options(window.enum('glassType'), window.get('glassType', { raw: true })) %>
                </select>
                <a href="javascript:void(0);" class="js-glassTypeInfo btn"><i class="icon-info-sign icon-black"></i></a>
            </div>
        </div>
    </div>
    <!-- /well-indent -->
    <div id="js-single-pane" class="well well_noBottom">
        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="singlePane">Single Pane</label>

                    <div class="controls">
                        <select name="singlePane" class="required input-large">
                            <%= _.options(window.get('singlePane').enum('type'), window.get('singlePane').get('type', {
                            raw: true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label">Thickness</label>

                    <div class="controls">
                        <div class="input-append">
                            <input name="singlePaneThickness" type="number"
                                   value="<%= window.get('singlePane').get('thickness') %>"
                                   class="decimal required input-mini">
                            <span class="add-on"><%= window.isImperial() ? 'in' : 'mm' %></span>
                        </div>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
    <div id="js-double-pane" class="well well_noBottom">
        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="doublePaneInterior">Double Pane (interior)</label>

                    <div class="controls">
                        <select name="doublePaneInterior" class="required input-large">
                            <%= _.options(window.get('interiorPane').enum('type'),
                            window.get('interiorPane').get('type', { raw: true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label">Thickness</label>

                    <div class="controls">
                        <div class="input-append">
                            <input name="doublePaneInteriorThickness" type="number"
                                   value="<%= window.get('interiorPane').get('thickness') %>"
                                   class="decimal required input-mini">
                            <span class="add-on"><%= window.isImperial() ? 'in' : 'mm' %></span>
                        </div>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="doublePaneExterior">Double Pane (exterior)</label>

                    <div class="controls">
                        <select name="doublePaneExterior" class="required input-large">
                            <%= _.options(window.get('exteriorPane').enum('type'),
                            window.get('exteriorPane').get('type', { raw: true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label">Thickness</label>

                    <div class="controls">
                        <div class="input-append">
                            <input name="doublePaneExteriorThickness" type="number"
                                   value="<%= window.get('exteriorPane').get('thickness') %>"
                                   class="decimal required input-mini">
                            <span class="add-on"><%= window.isImperial() ? 'in' : 'mm' %></span>
                        </div>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
    <div class="well-indent well_noTop">
        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label">Height</label>
                    <div class="controls">
                        <div class="input-append">
                            <input name="height" type="number" value="<%= window.get('height') %>" class="decimal required input-mini">
                            <span class="add-on"><%= window.isImperial() ? 'in' : 'mm' %></span>
                        </div>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label">Width</label>

                    <div class="controls">
                        <div class="input-append">
                            <input name="width" type="number" value="<%= window.get('width') %>" class="decimal required input-mini">
                            <span class="add-on"><%= window.isImperial() ? 'in' : 'mm' %></span>
                        </div>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="age">Window Age (Years)</label>

                    <div class="controls">
                        <select name="age" class="required input-large">
                            <%= _.options(window.enum('age'), window.get('age', { raw: true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label">Window Count</label>

                    <div class="controls">
                        <input name="count" type="number" value="<%= window.get('count') %>" class="required input-mini">
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->

        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="previousGlassFailure">Previous Glass Failure</label>

                    <div class="controls">
                        <select name="previousGlassFailure" class="required input-large">
                            <%= _.options(window.enum('previousGlassFailure'), window.get('previousGlassFailure', { raw:
                            true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label">If yes, annual Percent</label>

                    <div class="controls">
                        <div class="input-append">
                            <input name="annualPercent" type="number" value="<%= window.get('annualPercent') %>"
                                   class="decimal required input-mini">
                            <span class="add-on">%</span>
                        </div>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well-indent -->
</fieldset>

<fieldset style="display: none;" id="interior">
    <div class="hdg-section">
        <h2 class="hd hd_6">Interior Shading</h2>
    </div>
    <div class="well-indent well_noBottom form-inline">
        <div class="control-group">
            <label class="control-label" for="interiorShadingType">Type</label>

            <div class="controls">
                <select name="interiorShadingType" class="required input-large">
                    <%= _.options(interiorShading.enum('type'), interiorShading.get('type', { raw: true })) %>
                </select>
            </div>
        </div>
        <!-- /control-group -->
    </div>
    <!-- /well-indent -->
    <div id="js-drapes" class="well well_noBottom">
        <div class="row-fluid">
            <div class="span6">
                <div class="control-group">
                    <label class="control-label" for="drapesColor">Drapes Color</label>

                    <div class="controls">
                        <select name="drapesColor" class="required input-large">
                            <%= _.options(interiorShading.enum('drapesColor'), interiorShading.get('drapesColor', { raw:
                            true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span6">
                <div class="control-group">
                    <label class="control-label" for="drapesWeave">Drapes Weave</label>

                    <div class="controls">
                        <select name="drapesWeave" class="required input-large">
                            <%= _.options(interiorShading.enum('drapesWeave'), interiorShading.get('drapesWeave', { raw:
                            true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
    <div id="js-blinds" class="well well_noBottom">
        <div class="row-fluid">
            <div class="span6">
                <label class="control-label text-right" for="blindsColor">Blinds Color</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select name="blindsColor" class="required input-large">
                    <%= _.options(interiorShading.enum('blindsColor'), interiorShading.get('blindsColor', { raw: true
                    })) %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->
    </div>
    <!-- /well -->
    <div class="well-indent">
        <div class="row-fluid">
            <div class="span6">
                <label class="control-label text-right" for="ventilationOfIndoorShading">Ventilation of Indoor
                    Shading</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select name="ventilationOfIndoorShading" class="required input-large">
                    <%= _.options(interiorShading.enum('ventilationOfIndoorShading'), interiorShading.get('ventilationOfIndoorShading', { raw: true })) %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->
        <div class="row-fluid">
            <div class="span6">
                <label class="control-label text-right" for="spaceBetweenGlassShading">Space Between Glass and
                    Shading</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select name="spaceBetweenGlassShading" class="required input-large">
                    <%= _.options(interiorShading.enum('spaceBetweenGlassShading'),
                    interiorShading.get('spaceBetweenGlassShading', { raw: true })) %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row-fluid -->
    </div>
    <!-- /well-indent -->
</fieldset>

<fieldset style="display: none;" id="outdoor">
    <div class="hdg-section">
        <h2 class="hd hd_6">Outdoor Shading</h2>
    </div>
    <div class="well">
        <div class="row-fluid">
            <div class="span3">75% Shaded</div>
            <!-- /span -->
            <div class="span9">
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="vert_75">
                    <img src="deploy/images/glass-checklist/vertical_75.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="hor_75">
                    <img src="deploy/images/glass-checklist/horizontal_75.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="diag_75">
                    <img src="deploy/images/glass-checklist/diagonal_75.png">
                </label>
                <br>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="vdiag_75">
                    <img src="deploy/images/glass-checklist/verticalDiagonal_75.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="hdiag_75">
                    <img src="deploy/images/glass-checklist/horizontalDiagonal_75.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="vhor_75">
                    <img src="deploy/images/glass-checklist/verticalHorizontal_75.png">
                </label>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
        <hr>
        <div class="row-fluid">
            <div class="span3">25% Shaded</div>
            <!-- /span -->
            <div class="span9">
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="vert_25">
                    <img src="deploy/images/glass-checklist/vertical_25.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="hor_25">
                    <img src="deploy/images/glass-checklist/horizontal_25.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="diag_25">
                    <img src="deploy/images/glass-checklist/diagonal_25.png">
                </label>
                <br>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="vdiag_25">
                    <img src="deploy/images/glass-checklist/verticalDiagonal_25.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="hdiag_25">
                    <img src="deploy/images/glass-checklist/horizontalDiagonal_25.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="vhor_25">
                    <img src="deploy/images/glass-checklist/verticalHorizontal_25.png">
                </label>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
    <div class="well">
        <div class="row-fluid">
            <div class="span3">Double Diagonal<br>75% Shading</div>
            <!-- /span -->
            <div class="span9">
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="dd1_75">
                    <img src="deploy/images/glass-checklist/doubleDiagonal_75_0.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="dd2_75">
                    <img src="deploy/images/glass-checklist/doubleDiagonal_75_1.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="dd3_75">
                    <img src="deploy/images/glass-checklist/doubleDiagonal_75_2.png">
                </label>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
        <hr>
        <div class="row-fluid">
            <div class="span3">Double Diagonal<br>25% Shading</div>
            <!-- /span -->
            <div class="span9">
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="dd1_25">
                    <img src="deploy/images/glass-checklist/doubleDiagonal_25_0.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="dd2_25">
                    <img src="deploy/images/glass-checklist/doubleDiagonal_25_1.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="dd3_25">
                    <img src="deploy/images/glass-checklist/doubleDiagonal_25_2.png">
                </label>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
    <div class="well">
        <div class="row-fluid">
            <div class="span3">None</div>
            <!-- /span -->
            <div class="span9">
                <label class="radio inline">
                    <input type="radio" name="outdoorShadingGroup" value="none_0">
                </label>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
</fieldset>

<fieldset style="display: none;" id="framing">
    <div class="hdg-section">
        <h2 class="hd hd_6">Window Framing</h2>
    </div>
    <div class="well well_noBottom">
        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="frame">Framing System</label>

                    <div class="controls">
                        <select name="frame" class="required input-large">
                            <%= _.options(windowFraming.enum('frame'), windowFraming.get('frame', { raw: true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label" for="frameCondition">Framing System Condition</label>

                    <div class="controls">
                        <select name="frameCondition" class="required input-large">
                            <%= _.options(windowFraming.enum('frameCondition'), windowFraming.get('frameCondition', {
                            raw: true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
    <div class="well well_noBottom">
        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="sealantType">Sealant Type</label>

                    <div class="controls">
                        <select name="sealantType" class="required input-large">
                            <%= _.options(windowFraming.enum('sealantType'), windowFraming.get('sealantType', { raw:
                            true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label" for="sealantCondition">Condition of Sealant</label>

                    <div class="controls">
                        <select name="sealantCondition" class="required input-large">
                            <%= _.options(windowFraming.enum('sealantCondition'), windowFraming.get('sealantCondition',
                            { raw: true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
    <div class="well well_noBottom">
        <div class="row-fluid">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="outdoorGlazingStopColor">Outdoor Glazing Stop Color</label>

                    <div class="controls">
                        <select name="outdoorGlazingStopColor" class="required input-large">
                            <%= _.options(windowFraming.enum('outdoorGlazingStopColor'),
                            windowFraming.get('outdoorGlazingStopColor', { raw: true })) %>
                        </select>
                    </div>
                </div>
                <!-- /control-group -->
            </div>
            <!-- /span -->
            <div class="span5">
                <div class="control-group">
                    <label class="control-label" for="indoorStructuralPocket">Indoor Structural Pocket</label>

                    <div class="controls">
                        <select name="indoorStructuralPocket" class="required input-large">
                            <%= _.options(windowFraming.enum('indoorStructuralPocket'),
                            windowFraming.get('indoorStructuralPocket', { raw: true })) %>
                        </select>
                    </div>
                </div>
            </div>
            <!-- /control-group -->
        </div>
        <!-- /span -->
    </div>
    <!-- /row -->

</fieldset>

<fieldset style="display: none;" id="type">
    <div class="hdg-section">
        <h2 class="hd hd_6">Architectural Window Type</h2>
    </div>
    <div class="well">
        <div class="row-fluid">
            <div class="span3">Window Type</div>
            <!-- /span -->
            <div class="span9">
                <label class="radio inline">
                    <input type="radio" name="architecturalWindowType" value="hemispheric">
                    <img src="deploy/images/glass-checklist/hemispheric.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="architecturalWindowType" value="circular">
                    <img src="deploy/images/glass-checklist/circular.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="architecturalWindowType" value="pentagonal">
                    <img src="deploy/images/glass-checklist/pentagonal.png">
                </label>
                <br>
                <label class="radio inline">
                    <input type="radio" name="architecturalWindowType" value="trapezoidal">
                    <img src="deploy/images/glass-checklist/trapezoidal.png">
                </label>
                <label class="radio inline">
                    <input type="radio" name="architecturalWindowType" value="eyebrow">
                    <img src="deploy/images/glass-checklist/eyebrow.png">
                </label>
                <br>
                {*<label class="radio inline">
                    <input type="radio" name="architecturalWindowType" value="other">
                   Other: <input type="text" name="" value="">
                </label>
                <br>*}
                <label class="radio inline">
                    <input type="radio" name="architecturalWindowType" value="none">
                    None
                </label>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->
    <div class="well well_noBottom">
        <div class="form-inline">
            <div class="control-group">
                <label class="control-label" for="windowOver20SquareFeet">Architectural Windows over 20 square
                    feet?</label>

                <div class="controls">
                    <select name="windowOver20SquareFeet" class="required input-large">
                        <%= _.options(architecturalWindowType.enum('windowOver20SquareFeet'),
                        architecturalWindowType.get('windowOver20SquareFeet', { raw: true })) %>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <!-- /well -->
</fieldset>

<fieldset style="display: none;" id="location">
    <div class="hdg-section">
        <h2 class="hd hd_6">Heating Register Location</h2>
    </div>
    <div class="well well_noBottom">
        <div class="control-group">
            <label class="control-label" for="roomSideIndoorShadingOrNoShading">Room Side of Indoor Shading or No
                Shading</label>

            <div class="controls">
                <select name="roomSideIndoorShadingOrNoShading" class="required input-large">
                    <%= _.options(heatRegisterLocation.enum('roomSide'), heatRegisterLocation.get('roomSide', { raw:
                    true })) %>
                </select>
            </div>
        </div>
        <div class="strikethoughHeading">
            <span class="strikethoughHeading-indent">OR</span>
        </div>
        <!-- /row -->
        <div class="control-group">
            <label class="control-label" for="betweenGlassInnerShading">Between Glass and Inner Shading</label>

            <div class="controls">
                <select name="betweenGlassInnerShading" class="required input-large">
                    <%= _.options(heatRegisterLocation.enum('betweenGlassInnerShading'),
                    heatRegisterLocation.get('betweenGlassInnerShading', { raw: true })) %>
                </select>
            </div>
        </div>
    </div>
    <!-- /well -->
</fieldset>

<fieldset style="display: none;" id="other">
    <div class="hdg-section">
        <h2 class="hd hd_6">Other Considerations</h2>
    </div>
    <div class="well">
        <div class="row-fluid">
            <div class="span6 text-right">
                <label class="control-label" for="winterTemperature">Design Winter Temperature</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select name="winterTemperature" class="required input-medium">
                    <%= _.options(windowEnvironment.enum('winterTemperature'),
                    windowEnvironment.get('winterTemperature', { raw: true })) %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->

        <div class="row-fluid">
            <div class="span6 text-right">
                <label class="control-label" for="altitude">Altitude</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select name="altitude" class="required input-large">
                    <%= _.options(windowEnvironment.enum('altitude'), windowEnvironment.get('altitude', { raw: true }))
                    %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->

        <div class="row-fluid">
            <div class="span6 text-right">
                <label class="control-label" for="adjacentReflectingSurface">Adjacent Reflecting Surface</label>
            </div>
            <!-- /span -->
            <div class="span6">
                <select name="adjacentReflectingSurface" class="required input-small">
                    <%= _.options(windowEnvironment.enum('adjacentReflectingSurface'),
                    windowEnvironment.get('adjacentReflectingSurface', { raw: true })) %>
                </select>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <!-- /well -->

    <% if (!archiveView) { %>
    <div class="alert">Important: To complete this step please select a valid film from the Window Film Choices.</div>
    <div class="alert">Important: When all step indications are checked, click the Finish button to complete your Glass
        Checklist.
    </div>

    <div class="text-center">
        <button type="submit" class="btn btn-primary">Finish</button>
    </div>
    <% } %>

    <div class="leagalize" style="padding-top: 20px;">
        IMPORTANT NOTICE: This glass checklist is intended to help assess the compatibility of The Window Films with specific glazing constructions. The checklist is not intended to replace the customer's careful evaluation of The Window Film for the customer's intended application. The will not be liable for any loss or damage, whether direct, indirect, special, incidental,or consequential resulting from or in any way related to the information contained in this checklist.
    </div>
</fieldset>
</div>
<!-- /subFrame-bd -->

<div class="subFrame-ft">
    <div class="control-group">
        <div class="hdg-section">
            <label class="control-label hd hd_6">Window Film Choices</label>
        </div>
        <div class="controls">
            <select size=<%= (!archiveView) ? "32" : "0" %> name="filmType" id="js-film-list" class="required input-filmChoices">
            </select>
        </div>
    </div>
    <!-- /control-group -->
</div>
<!-- /subFrame-ft -->

</div>
<!-- /subFramess -->
</form>
</div>
<!-- /frame-bd -->

</div>
<!-- /row -->
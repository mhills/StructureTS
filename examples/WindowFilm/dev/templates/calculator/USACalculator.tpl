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

<div class="row-fluid">
    <div class="span6">
        <div class="well well_noBottom">
            <h4>US Commercial Energy Calculator</h4>
            <h5>Building Information</h5>
            <form novalidate="novalidate"  class="form-horizontal">
                <div class="control-group">
                    <label class="control-label" for="numberOfFloors">Number of Floors</label>
                    <div class="controls">
                        <input type="number" name="numberOfFloors" class="required input-small" data-rule-min="0" value="<%= defaultFloorCount %>" />
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="totalSquareFootage">Total Building Square Footage</label>
                    <div class="controls">
                        <input type="number" name="totalSquareFootage" class="required input-small" data-rule-min="0" value="<%= defaultSquareFootage %>" />
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="skylights">% of roof covered in skylights</label>
                    <div class="controls">
                        <input type="number" name="skylights" class="required input-small" data-rule-min="0" value="<%= defaultSkylightCount %>" />
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="buildingCoverage">% of building envelope covered in windows</label>
                    <div class="controls">
                        <select name="buildingCoverage" >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40" selected>40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="windowType">Window Type</label>
                    <div class="controls">
                        <select name="windowType" >
                            <% for (var key in filmTypes) { %>
                            <% if (!filmTypes.hasOwnProperty(key)) continue; %>
                            <option value="<%= key %>"><%= filmTypes[key].windowType["@name"] %></option>
                            <% } %>
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="filmType">Film Type</label>
                    <div class="controls">
                        <select name="filmType" >
                            <option value="0">High Performance</option>
                            <option value="1">Medium Performance</option>
                            <option value="2">Basic Performance</option>
                            <option value="3">Low E Film</option>
                            <option value="4">Exterior</option>
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="nearestCity">Nearest City</label>
                    <div class="controls">
                        <select name="nearestCity" >
                            <% for (var key in cities) { %>
                            <% if (!cities.hasOwnProperty(key)) continue; %>
                            <option value="<%= key %>"><%= cities[key].stCity %></option>
                            <% } %>
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label"></label>
                    <div class="controls">
                        <input type="submit" class="btn btn-primary" value="Calculate" />
                    </div>
                </div>

            </form>
        </div>
        <!-- /well -->
    </div>
    <!-- /span -->

    <div class="span6">
        <div class="well well_noBottom">
            <h4>Potential Savings</h4>
            <h5>Results</h5>
            <div class="form-horizontal">
                <div class="control-group">
                    <label class="control-label">Heat reduction through windows</label>
                    <div class="controls">
                        <div class="input-append">
                            <span id="js-heat-reduction" class="textHightlight text-right input-small">result</span>
                            <span class="add-on">%</span>
                        </div>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">Approximate payback period</label>
                    <div class="controls">
                        <div class="input-append">
                            <div id="js-payback-period" class="textHightlight text-right input-small">result</div>
                            <span class="add-on">years</span>
                        </div>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">Annual savings of total utilities</label>
                    <div class="controls">
                        <div class="input-append">
                            <div id="js-annual-savings" class="textHightlight text-right input-small">result</div>
                            <span class="add-on">%</span>
                        </div>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">Annual CO<sup>2</sup> emission savings</label>
                    <div class="controls">
                        <div class="input-append">
                            <div id="js-co2-savings" class="textHightlight text-right input-small">result</div>
                            <span class="add-on">lbs.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /well -->
        {*<h3>Other Energy Calculators</h3>
        <ul>
            <li><a href="#" target="_blank">International commercial energy calculator</a></li>
            <li><a href="#" target="_blank">International residential energy calculator</a></li>
            <li><a href="#" target="_blank">US residential energy calculator</a></li>
        </ul>*}
    </div>
    <!-- /span -->
</div>
<!-- /row -->
<div class="leagalize">Potential savings values are approximate and provided for general reference purposes only. Regional temperatures‚ energy costs‚ and emissions based on national averages published by the US Department of Energy and the US Environmental Protection Agency. Actual energy savings will vary depending on the HVAC system‚ average indoor/outdoor temperature‚ length of cooling season‚ geography‚ actual energy costs‚ and other factors. Data shown represents center of glass values in accordance to NFRC 100/200‚ and is measured on NFRC required glass types‚ actual performance will vary with specific glass type. Emission savings estimates are based on average CO2 emissions from electric power generation per region in the United States as determined by the United States Environmental Protection Agency as of July 2000. These savings estimates account for emission reductions resulting from potential decreased electricity usage for home cooling only; they do not account for CO2 emissions that may result from manufacturing processes.
</div>
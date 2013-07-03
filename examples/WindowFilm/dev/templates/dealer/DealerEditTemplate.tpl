<div class="frame">
    <div class="gapTop-secondary largePanel">
        <div class="well">
            <form novalidate="novalidate"  class="form-horizontal" action='' method="POST">
                <fieldset>
                    <h2 class="hd hd_3"><%= title %></h2>

                    <% if (!dealer.get('code')) { %>
                        <div class="control-group input-append">
                            <label class="control-label" for="code">Partner Company Code:</label>
                            <div class="controls">
                                <input type="text" id="code" name="code" class="required" value="<%= dealer.get('code') %>" />
                                <span class="add-on"><i class="icon-flag"></i></span>
                            </div>
                        </div>
                    <% } else { %>
                        <div class="control-group">
                            <label class="control-label">Partner Company Code:</label>
                            <div class="controls">
                                <div class="textHightlight input-large"><%= dealer.get('code') %></div>
                                <input type="hidden" id="code" name="code" value="<%= dealer.get('code') %>" />
                            </div>
                        </div>
                    <% } %>

                    <div class="control-group input-append">
                        <label class="control-label" for="name">Partner Name:</label>
                        <div class="controls">
                            <input type="text" id="name" name="name" class="required" value="<%= dealer.get('name') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group">
                        <div class="controls">
                            <input type="submit" class="btn btn-success online-only" value="<%= submit %>" />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</div>
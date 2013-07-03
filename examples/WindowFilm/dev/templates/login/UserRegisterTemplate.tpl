<div class="frame">
    <div class="gapTop-secondary largePanel">
        <div class="well">
            <form novalidate="novalidate"  class="form-horizontal">
                <h2 class="hd hd_3">User Registration</h2>

                <div class="control-group input-append">
                    <label class="control-label" for="firstName">First Name</label>
                    <div class="controls">
                        <input type="text" name="firstName" class="required" value="<%= user.get('firstName') %>" />
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="lastName">Last Name</label>
                    <div class="controls">
                        <input type="text" name="lastName" class="required" value="<%= user.get('lastName') %>" />
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">Email Address</label>
                    <div class="controls">
                        <div class="textHightlight input-large" style="overflow: auto"><%= user.get('email') %></div>
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="language">Language</label>
                    <div class="controls">
                        <select name="language" class="required">
                            <option value="">Choose One</option>
                            <%= _.options(user.enum('language'), user.get('language', { raw: true })) %>
                        </select>
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="country">Country</label>
                    <div class="controls">
                        <select id="country" name="country" class="required">
                            <option value="">Choose One</option>
                            <%= _.options(countries) %>
                        </select>
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="glassChecklistRegion">Glass Checklist Region</label>
                    <div class="controls">
                        <select id="glassChecklistRegion" name="glassChecklistRegion" class="required">
                            <option value="">Choose One</option>
                            <%= _.options(user.enum('glassChecklistRegion')) %>
                        </select>
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label">Measurement Type</label>
                    <div class="controls">
                        <% _.forOwn(user.enum('measurementType'), function(value, key) { %>
                        <label class="radio inline">
                            <input type="radio" name="measurementType" value="<%= key %>" <%= (key === user.get('measurementType', { raw: true })) ? ' checked="checked"' : '' %>>
                            <%= value %>
                        </label>
                        <% }) %>
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="password">Password</label>
                    <div class="controls">
                        <input type="password" id="password" name="password" class="required" data-rule-minlength="8"/>
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="confirm-password">Confirm Password</label>
                    <div class="controls">
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="" class="required" data-rule-equalto="#password" />
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group">
                    <div class="controls">
                        <input type="submit" class="btn btn-success online-only" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
        <!-- /well -->
    </div>
    <!-- /gapTop-primary -->
</div>
<!-- /row -->
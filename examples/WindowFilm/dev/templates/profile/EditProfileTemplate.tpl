<div class="frame wrapperFixed wrapper-profileImage">
    <div class="gapTop-secondary largePanel">
        <div class="well">
            <form novalidate="novalidate"  class="form-horizontal">
                <h2 class="hd hd_3">Edit Profile</h2>

                <div class="control-group input-append">
                    <label class="control-label" for="firstName">First Name</label>
                    <div class="controls">
                        <input type="text" name="firstName" class=" required" value="<%= user.get('firstName') %>" />
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="lastName">Last Name</label>
                    <div class="controls">
                        <input type="text" name="lastName" class=" required" value="<%= user.get('lastName') %>" />
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
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="country">Country</label>
                    <div class="controls">
                        <select name="country" class="required">
                            <option value="">Choose One</option>
                            <%= _.options(countries, user.get('country', { raw: true })) %>
                        </select>
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
                    <label class="control-label" for="glassChecklistRegion">Glass Checklist Region</label>
                    <div class="controls">
                        <select id="glassChecklistRegion" name="glassChecklistRegion" class="required">
                            <option value="">Choose One</option>
                            <%= _.options(user.enum('glassChecklistRegion'), user.get('glassChecklistRegion', { raw: true })) %>
                        </select>
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="password">New Password</label>
                    <div class="controls">
                        <input type="password" id="password" name="password" placeholder="" class="" data-rule-minlength="8" />
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="confirmPassword">Confirm Password</label>
                    <div class="controls">
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="" class="" data-rule-equalto="#password" />
                    </div>
                </div>

                <div class="control-group input-append">
                    <label class="control-label" for="currentPassword">Current Password</label>
                    <div class="controls">
                        <input type="password" id="currentPassword" name="currentPassword" placeholder="" class="required" />
                        <span class="add-on"><i class="icon-flag"></i></span>
                    </div>
                </div>

                <div class="control-group">
                    <div class="controls">
                        <input type="submit" class="btn btn-success online-only" value="Submit" />
                        <a class="btn btn-success" href="<%= _.route('home') %>">Cancel</a>
                    </div>
                </div>
            </form>
            <div><i class="icon-flag"></i> indicates a required field</div>
        </div>
        <!-- /well -->
    </div>
    <!-- /gapTop-primary -->
</div>
<!-- /row -->
<div class="frame">
    <div class="gapTop-secondary largePanel">
        <div class="well">
            <form novalidate="novalidate"  class="form-horizontal" action='' method="POST">
                <fieldset>
                    <h2 class="hd hd_3"><%= title %></h2>

                    <div class="control-group input-append">
                        <label class="control-label" for="buildingName">Project/Building Name</label>
                        <div class="controls">
                            <input type="text" id="buildingName" name="customer-buildingName" class="required" value="<%= project.get('customer').get('buildingName') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="companyName">Company Name</label>
                        <div class="controls">
                            <input type="text" id="companyName" name="customer-companyName" class="required" value="<%= project.get('customer').get('companyName') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="contactName">Customer Contact Name</label>
                        <div class="controls">
                            <input type="text" id="contactName" name="customer-contactName" class="required" value="<%= project.get('customer').get('contactName') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="referralAgentCompany">Referral Agent Company</label>
                        <div class="controls">
                            <input type="text" id="referralAgentCompany" name="customer-referralAgentCompany" class="" value="<%= project.get('customer').get('referralAgentCompany') %>" />
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="referralAgentName">Referral Agent Name</label>
                        <div class="controls">
                            <input type="text" id="referralAgentName" name="customer-referralAgentName" class="" value="<%= project.get('customer').get('referralAgentName') %>" />
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label">Building Type</label>
                        <div class="controls">
                            <% _.forOwn(project.get('customer').enum('buildingType'), function(value, key) { %>
                            <label class="radio inline">
                                <input type="radio" name="customer-buildingType" value="<%= key %>" <%= (key === project.get('customer').get('buildingType', { raw: true })) ? ' checked="checked"' : '' %>>
                                <%= value %>
                            </label>
                            <% }) %>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="address1">Building Address</label>
                        <div class="controls">
                            <input type="text" id="address1" name="customer-address1" class="" value="<%= project.get('customer').get('address1') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="address2">Building Address 2</label>
                        <div class="controls">
                            <input type="text" id="address2" name="customer-address2" value="<%= project.get('customer').get('address2') %>" />
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="city">City</label>
                        <div class="controls">
                            <input type="text" id="city" name="customer-city" class="" value="<%= project.get('customer').get('city') %>" />
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="country">Country</label>
                        <div class="controls">
                            <select id="country" name="customer-country" class="required">
                                <option value="">Choose One</option>
                                <%= _.options(countries, project.get('customer').get('country', { raw: true })) %>
                            </select>
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="state">State/Province</label>
                        <div class="controls">
                            <input type="text" name="customer-state" id="state" value="<%= project.get('customer').get('state') %>" />
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="zipPostal">Zip or Postal Code</label>
                        <div class="controls">
                            <input type="text" id="zipPostal" name="customer-zipPostal" class="" data-rule-maxlength="10" value="<%= project.get('customer').get('zipPostal') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="phoneNumber">Customer Phone Number</label>
                        <div class="controls">
                            <input type="tel" pattern="[0-9]*" id="phoneNumber" name="customer-phoneNumber" class="required" data-rule-minlength="7" value="<%= project.get('customer').get('phoneNumber') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="email">Customer Email Address</label>
                        <div class="controls">
                            <input type="email" id="email" name="customer-email" class="email" value="<%= project.get('customer').get('email') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group">
                        <div class="controls">
                            <input type="submit" class="btn btn-success" value="<%= submit %>" />
                            <% if (isNew) { %>
                            <a class="btn btn-success" href="<%= _.route('home') %>">Cancel</a>
                            <% } %>
                        </div>
                    </div>
                </fieldset>
            </form>
            <div><i class="icon-flag"></i> Identified fields are required.  These fields are critical to your account management as well as being required for the Glass Checklist and future eWarranty module.</div>
        </div>
    </div>
</div>
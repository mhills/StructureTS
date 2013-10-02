<div class="frame">
    <div class="gapTop-secondary largePanel">
        <div class="well">
            <form novalidate="novalidate"  class="form-horizontal" action='' method="POST">
                <fieldset>
                    <h2 class="hd hd_3"><%= (isNew) ? 'Invite User' : 'Edit ' + user.getName() %></h2>

                    <div class="control-group input-append">
                        <label class="control-label" for="firstName">First Name</label>
                        <div class="controls">
                            <input type="text" id="firstName" name="firstName" placeholder="" class="required" value="<%= user.get('firstName') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="lastName">Last Name</label>
                        <div class="controls">
                            <input type="text" id="lastName" name="lastName" placeholder="" class="required" value="<%= user.get('lastName') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <% if (!isNew) { %>
                    <div class="control-group">
                        <label class="control-label">Email Address</label>
                        <div class="controls">
                            <div class="textHightlight input-large" style="overflow: auto"><%= user.get('email') %></div>
                        </div>
                    </div>
                    <% } else { %>
                    <div class="control-group input-append">
                        <label class="control-label" for="email">Email Address</label>
                        <div class="controls">
                            <input type="email" id="email" name="email" placeholder="" class="required email" value="<%= user.get('email') %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="confirm-email">Confirm Email Address</label>
                        <div class="controls">
                            <input type="email" id="confirm-email" name="confirmEmailAddress" class="required email" data-rule-equalto="#email" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>
                    <% } %>


                    <% if (canChangeDealer) { %>
                    <div id="js-dealer" class="control-group input-append">
                        <label class="control-label" for="dealer">Partner Company Code</label>
                        <div class="controls">
                            <input type="text" id="dealer" name="dealer-code" placeholder="" class="required" value="<%= dealer ? dealer.get('code') : '' %>" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>
                    <% } else { %>
                    <div class="control-group">
                        <label class="control-label">Partner Company Code</label>
                        <div class="controls">
                            <div class="textHightlight input-large" style="overflow: auto"><%= dealer ? dealer.get('code') : '' %></div>
                            <input type="hidden" id="dealer" name="dealer-code" value="<%= dealer ? dealer.get('code') : '' %>" />
                        </div>
                    </div>
                    <% } %>



                    <div class="control-group input-append">
                        <label class="control-label" for="role">Role</label>
                        <div class="controls">
                            <select name="role" id="role" class="required">
                                <option value="">Choose One</option>
                                <%= _.options(allowedRoles, user.get('role', { raw: true })) %>
                            </select>
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>


                    <% if (!isNew) { %>
                    <div class="control-group input-append">
                        <label class="control-label" for="country">Country</label>
                        <div class="controls">
                            <select id="country" name="country" class="required">
                                <option value="">Choose One</option>
                                <%= _.options(countries, user.get('country', { raw: true })) %>
                            </select>
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="status">Status</label>
                        <div class="controls">
                            <select name="status" id="status" class="required">
                                <option value="">Choose One</option>
                                <%= _.options(user.enum('status'), user.get('status', { raw: true })) %>
                            </select>
                            <span class="add-on"><i class="icon-flag"></i></span>
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

                    <div class="control-group<%= (isNew) ? ' input-append' : '' %>">
                        <label class="control-label" for="new-password"><%= (isNew) ? '' : 'New ' %>Password</label>
                        <div class="controls">
                            <input type="password" id="new-password" name="password" placeholder="" class="<%= (isNew) ? 'required' : '' %>" data-rule-minlength="8" />
                            <% if (isNew) { %>
                            <span class="add-on"><i class="icon-flag"></i></span>
                            <% } %>
                        </div>
                    </div>

                    <div class="control-group<%= (isNew) ? ' input-append' : '' %>">
                        <label class="control-label" for="confirm-password">Confirm <%= (isNew) ? '' : 'New ' %>Password</label>
                        <div class="controls">
                            <input type="password" id="confirm-password" data-rule-equalto="#new-password" name="confirm-password" placeholder="" class="<%= (isNew) ? 'required' : '' %>" />
                            <% if (isNew) { %>
                            <span class="add-on"><i class="icon-flag"></i></span>
                            <% } %>
                        </div>
                    </div>
                    <% } %>

                    <div class="control-group">
                        <div class="controls">
                            <input type="submit" class="btn btn-success online-only" value="<%= (isNew) ? 'Invite User' : 'Save User' %>" />
                        </div>
                    </div>
                </fieldset>
            </form>
            <div><i class="icon-flag"></i> indicates a required field</div>
        </div>
    </div>

</div>
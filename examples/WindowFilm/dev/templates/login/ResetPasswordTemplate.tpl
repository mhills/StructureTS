<div class="frame">
    <div class="gapTop-secondary largePanel">
        <div class="well">
            <form novalidate="novalidate"  class="form-horizontal" action='' method="POST">
                <fieldset>
                    <h2 class="hd hd_3">Reset Password</h2>

                    <div class="control-group input-append">
                        <label class="control-label" for="new-password">New Password</label>
                        <div class="controls">
                            <input type="password" id="new-password" name="password" placeholder="" class="required" data-rule-minlength="8" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group input-append">
                        <label class="control-label" for="confirm-password">Confirm Password</label>
                        <div class="controls">
                            <input type="password" id="confirm-password" name="confirm-password" placeholder="" class="required" data-rule-equalto="#new-password" />
                            <span class="add-on"><i class="icon-flag"></i></span>
                        </div>
                    </div>

                    <div class="control-group">
                        <div class="controls">
                            <input type="submit" value="Change Password" class="btn btn-success online-only" />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</div>
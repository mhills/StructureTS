<div class="frame">
    <div class="gapTop-secondary largePanel">
        <div class="well">
            <form novalidate="novalidate"  class="form-horizontal" action='' method="POST">
                <fieldset>
                    <h2 class="hd hd_3">Forgot Password</h2>

                    <div class="control-group input-append">
                        <label class="control-label" for="email">Email Address</label>
                        <div class="controls">
                            <input type="email" id="email" name="emailAddress" class="js-email required email" />
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

                    <div class="control-group">
                        <div class="controls">
                            <input type="submit" value="Submit" class="btn btn-success online-only" />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</div>
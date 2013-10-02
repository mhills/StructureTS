<div class="modal small show" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="false">×</button>
        <h3 id="myModalLabel">Export Project</h3>
    </div>
    <div class="modal-body">
        <div class="row-fluid">
            <div class="span5">
                <h4>Download Project File</h4>
                <div class="gapTop-secondary text-center">
                    <a class="btn btn-primary js-download online-only" target="_blank">Download</a>
                </div>
            </div>
            <!-- /span -->
            <div class="span7">
                <div class="dividerEmail">
                    <h4>Email Project File</h4>
                    <form novalidate="novalidate" >
                        <div class="control-group">
                            <label class="control-label">To Email:</label>
                            <div class="controls">
                                <input type="email" name="toEmail" class="required email" placeholder="Email">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Message:</label>
                            <div class="controls">
                                <textarea rows="3" name="bodyText"></textarea>
                            </div>
                        </div>

                        <div class="control-group">
                            <div class="controls">
                                <input type="submit" class="btn btn-primary online-only" value="Send File" />
                            </div>
                        </div>
                    </form>
                    <div class="alert alert-success">
                        Email successfully sent.
                    </div>
                </div>
            </div>
            <!-- /span -->
        </div>
        <!-- /row -->
    </div>
    <div class="modal-footer">
        <button class="btn js-cancel" aria-hidden="false">Cancel</button>
    </div>
</div>
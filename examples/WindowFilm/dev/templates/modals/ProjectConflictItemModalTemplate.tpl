<tr data-id="<%= conflict.get('id') %>">
    <th><%= conflict.get('project').get('customer').get('buildingName') %>:</th>
    <td>
        <div class="nowrap">
            <div data-toggle="buttons-radio">
                <button type="button" class="btn btn-primary" data-decision="1">Keep Local</button>
                <button type="button" class="btn btn-primary" data-decision="2">Keep Server: <%= conflict.get('lastEditedDate') %></button>
                <button type="button" class="btn btn-primary" data-decision="0">Ignore</button>
            </div>
        </div>
    </td>
</tr>
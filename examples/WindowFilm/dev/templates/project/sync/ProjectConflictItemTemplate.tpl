<tr>
    <th><%= project.get('customer').get('buildingName') %>:
    </th>
    <td>
        <div class="pull-right nowrap">
            <div data-toggle="buttons-radio">
                <button type="button" class="btn btn-primary js-local">Keep Local</button>
                <button type="button" class="btn btn-primary js-remote">Keep Server: <%= remoteDate %></button>
                <button type="button" class="btn btn-primary js-ignore">Ignore</button>
            </div>
        </div>
    </td>
</tr>
<%
_.each(items, function(model, index) {
var dealer = model.get('dealer');
var status = model.get('status');
var statusStyle = '';
switch(status) {
    case userStatus.active:
        statusStyle = 'label-success';
        break;
    case userStatus.pending:
        statusStyle = 'label-warning';
        break;
    case userStatus.inactive:
        statusStyle = 'label-important';
        break;
}
%>
    <tr>
        <td><div class="wrapWord"><%= model.getName() %></div></td>
        <td><div class="wrapWord"><%= model.get('email') %></div></td>
        <td><%= (dealer) ? dealer.get('name') : '' %></td>
        <td><%= model.get('role') %></td>
        <td><div class="text-center"><span class="label <%= statusStyle %>"><%= model.get('status') %></span></div></td>
        <td><%= model.get('created') %></td>
        <td><%= model.get('lastLogon') %></td>
        <td>
            <a href="<%= model.url('view') %>" class="js-edited online-only" data-id="<%= model.id %>"><i class="icon-pencil"></i></a>
        </td>
    </tr>
<% }); %>
<div class="item-detail">
    <div class="item-image drop-shadow round"><img src="<%= data.large_image %>" alt="<%= data.title %>" /></div>
    <div class="item-info">
        <div class="item-artist"><%= data.artist %></div>
        <div class="item-title"><%= data.title %></div>
        <div class="item-price">$<%= data.price %></div>
        <br />
        <div class="item-link"><a href="<%= data.url %>" class="button">Buy this item</a></div>
        <div class="back-link"><a href="javascript:window.history.back();" class="button">&laquo; Back to Albums</a></div>
    </div>
</div>
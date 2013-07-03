<div class="pagination">
    <ul>
        <li><a class="js-previous">Prev</a></li>
            <%

                if (!paginationVO) {
                    return
                }

                var pages = paginationVO.attributes.pageCount;
                var currentPage = paginationVO.attributes.currentPage;

                for (var i = 1; i <= pages; i++) {
                    if (pages == pages) {
                        var cls = (i == currentPage) ? 'active' : '';
            %>
                        <li class="<%= cls %>"><a class="js-page-number" data-id="<%= i %>"><%= i %></a></li>
            <%
                    }
                }
            %>
        <li><a class="js-next">Next</a></li>
    </ul>
</div>
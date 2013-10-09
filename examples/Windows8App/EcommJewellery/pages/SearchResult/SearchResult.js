﻿(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var searchPageURI = "/pages/SearchResult/SearchResult.html";
    var appModel = Windows.ApplicationModel;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    ui.Pages.define("/pages/SearchResult/SearchResult.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var listView = element.querySelector(".groupeditemslist").winControl;
            listView.groupHeaderTemplate = element.querySelector(".headertemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this._itemInvoked.bind(this);

            document.querySelector(".pagetitle").textContent = "Search Results " + "for '" + options.queryText + "'";

            // Set up a keyboard shortcut (ctrl + alt + g) to navigate to the
            // current group when not in snapped mode.
            listView.addEventListener("keydown", function (e) {
                if (appView.value !== appViewState.snapped && e.ctrlKey && e.keyCode === WinJS.Utilities.Key.g && e.altKey) {
                    var data = listView.itemDataSource.list.getAt(listView.currentItem.index);
                    this.navigateToGroup(data.group.key);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }.bind(this), true);

            this._initializeLayout(listView, appView.value);
            listView.element.focus();
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            var listView = element.querySelector(".groupeditemslist").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    this._initializeLayout(listView, viewState);
                }
            }
        },

        // This function updates the ListView with new layouts
        _initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.itemDataSource = SearchData.items.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();
            } else {
                listView.itemDataSource = SearchData.items.dataSource;
                listView.groupDataSource = SearchData.groups.dataSource;
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
            }
        },

        _itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                // If the page is snapped, the user invoked a group.
                var item = SearchData.items.getAt(args.detail.itemIndex);
                nav.navigate("/pages/detailPage/detailPage.html", { item: SearchData.getItemReference(item) });
            } else {
                // If the page is not snapped, the user invoked an item.
                var item = SearchData.items.getAt(args.detail.itemIndex);
                nav.navigate("/pages/detailPage/detailPage.html", { item: SearchData.getItemReference(item) });
            }
        }
    });

    Windows.UI.WebUI.WebUIApplication.onactivated = function (eventObject) {
        if (eventObject.kind === appModel.Activation.ActivationKind.search) {
            ui.processAll();
            nav.navigate(searchPageURI, { queryText: eventObject.queryText });
        }
    };

    appModel.Search.SearchPane.getForCurrentView().onquerysubmitted = function (eventObject) { nav.navigate(searchPageURI, eventObject); };
    appModel.Search.SearchPane.getForCurrentView().onresultsuggestionchosen = function (eventObject) { onResultSuggestionChosen(item, eventObject); };
})();

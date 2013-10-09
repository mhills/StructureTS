(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var itemRenderer;

    var RecordType = Object.freeze({
        big: 1,
        semibig: 2,
        medium: 3,
        small: 4,
        wide: 5,
        length: 6
    });

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {
        // Navigates to the groupHeaderPage. Called from the groupHeaders,
        // keyboard shortcut and iteminvoked.
        navigateToGroup: function (key) {
            nav.navigate("/pages/spokePage/spokePage.html", { groupKey: key });
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var listView = element.querySelector(".groupeditemslist").winControl;
            listView.groupHeaderTemplate = element.querySelector(".headertemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this._itemInvoked.bind(this);

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
            //listView.element.focus();

            sendTileLocalImageNotification();
        },

        groupInfo: function () {
            return {
                enableCellSpanning: true,

                cellWidth: 1 + 10.7,
                cellHeight: 1 + 10.7
            };
        },

        computeItemSize: function (index) {
            var size = {
                width: 163,
                height: 163
            };

            if (index != null) {
                index = index + 1;
                if (typeof (index) === "number") {
                    if (Data.items._groupedItems[index] != undefined) {
                        if (Data.items._groupedItems[index].data.recordType === RecordType.big) {
                            size.width = 338;
                            size.height = 338;
                        }
                        else if (Data.items._groupedItems[index].data.recordType === RecordType.semibig) {
                            size.width = 248;
                            size.height = 248;
                        }
                        else if (Data.items._groupedItems[index].data.recordType === RecordType.medium) {
                            size.width = 270;
                            size.height = 162;
                        }
                        else if (Data.items._groupedItems[index].data.recordType === RecordType.small) {
                            size.width = 163;
                            size.height = 163;
                        }
                        else if (Data.items._groupedItems[index].data.recordType === RecordType.wide) {
                            size.width = 336;
                            size.height = 163;
                        }
                        else if (Data.items._groupedItems[index].data.recordType === RecordType.length) {
                            size.width = 163;
                            size.height = 337;
                        }
                    }
                }
            }
            return size;
        },

        renderItem: function (item, recycledElement) {
            var renderer = document.querySelector(".itemtemplate");
            if (item._value.data.recordType === RecordType.big) {
                renderer = document.querySelector(".BigBoxTemplate");
            }
            else if (item._value.data.recordType === RecordType.semibig) {
                renderer = document.querySelector(".SemiBigBoxTemplate");
            }
            else if (item._value.data.recordType === RecordType.medium) {
                renderer = document.querySelector(".MediumBoxTemplate");
            }
            else if (item._value.data.recordType === RecordType.small) {
                renderer = document.querySelector(".SmallBoxTemplate");
            }
            else if (item._value.data.recordType === RecordType.wide) {
                renderer = document.querySelector(".WildBoxTemplate");
            }
            else if (item._value.data.recordType === RecordType.length) {
                renderer = document.querySelector(".LengthBoxTemplate");
            }

            if (renderer.renderItem != null)
                return renderer.renderItem.call(this, item, recycledElement);
            else
                return renderer;
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
                listView.itemDataSource = Data.groups.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();
            } else {

                listView.itemDataSource = Data.items.dataSource;
                listView.groupDataSource = Data.groups.dataSource;
                listView.itemTemplate = this.renderItem;
                listView.layout = new ui.GridLayout({
                    groupHeaderPosition: "top",
                    groupInfo: this.groupInfo,
                    itemInfo: this.computeItemSize
                });
            }
        },

        _itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                // If the page is snapped, the user invoked a group.
                var group = Data.groups.getAt(args.detail.itemIndex);
                this.navigateToGroup(group.key);
            } else {
                // If the page is not snapped, the user invoked an item.
                var item = Data.items.getAt(args.detail.itemIndex);
                nav.navigate("/pages/detailPage/detailPage.html", { item: Data.getItemReference(item) });
            }
        }
    });

    function sendTileLocalImageNotification() {
        // Note: This sample contains an additional project, NotificationsExtensions.
        // NotificationsExtensions exposes an object model for creating notifications, but you can also modify the xml
        // of the notification directly. See the additional function sendTileLocalImageNotificationWithXml to see how
        // to do it by modifying Xml directly, or sendLocalImageNotificationWithStringManipulation to see how to do it
        // by modifying strings directly

        //Clear Existing Notification
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().clear();

        var imgSource = "ms-appx:///images/BigLiveTile1.jpg";
        var imgSmallSource = "ms-appx:///images/SmallLiveTile1.jpg";

        var tileContent = Windows.UI.Notifications.TileTemplateType.tileWideImageAndText01;
        var tileXml = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(tileContent);
        var tileImageAttributes = tileXml.getElementsByTagName("image");
        var tileTextAttributes = tileXml.getElementsByTagName("text");

        tileImageAttributes[0].setAttribute("src", imgSource);
        tileImageAttributes[0].setAttribute("alt", "A Wide Live Tile.");
        tileTextAttributes[0].innerText = "Ecommerce Jewellery";

        var binding = tileXml.getElementsByTagName("binding");

        // create the square template and attach it to the wide template
        var template = Windows.UI.Notifications.TileTemplateType.tileSquareImage;
        var squareTileXml = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(template);
        var squareTileImageElements = squareTileXml.getElementsByTagName("image");
        squareTileImageElements[0].setAttribute("src", imgSmallSource);
        squareTileImageElements[0].setAttribute("alt", "A Square Live Tile.");

        var binding = squareTileXml.getElementsByTagName("binding").item(0);
        var node = tileXml.importNode(binding, true);
        tileXml.getElementsByTagName("visual").item(0).appendChild(node);

        var tileNotification = new Windows.UI.Notifications.TileNotification(tileXml);
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().enableNotificationQueue(true);

        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
    }
})();

(function () {
    "use strict";

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    // TODO: Replace the data with your real data.
    // You can add data from asynchronous sources whenever it becomes available.
    generateSampleData().forEach(function (item) {
        list.push(item);
    });

    WinJS.Namespace.define("spokePagedata", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    // Get the unique group corresponding to the provided group key.
    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    // Get a unique item from the provided string array, which should contain a
    // group key and an item title.
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    // Returns an array of sample data that can be added to the application's
    // data list. 
    function generateSampleData() {
        var itemContent = "<p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat</p><p>Curabitur class aliquam vestibulum nam curae maecenas sed integer cras phasellus suspendisse quisque donec dis praesent accumsan bibendum pellentesque condimentum adipiscing etiam consequat vivamus dictumst aliquam duis convallis scelerisque est parturient ullamcorper aliquet fusce suspendisse nunc hac eleifend amet blandit facilisi condimentum commodo scelerisque faucibus aenean ullamcorper ante mauris dignissim consectetuer nullam lorem vestibulum habitant conubia elementum pellentesque morbi facilisis arcu sollicitudin diam cubilia aptent vestibulum auctor eget dapibus pellentesque inceptos leo egestas interdum nulla consectetuer suspendisse adipiscing pellentesque proin lobortis sollicitudin augue elit mus congue fermentum parturient fringilla euismod feugiat";
        var itemDescription = "Item Description: Pellentesque porta mauris quis interdum vehicula urna sapien ultrices velit nec venenatis dui odio in augue cras posuere enim a cursus convallis neque turpis malesuada erat ut adipiscing neque tortor ac erat";
        var groupDescription = "Group Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor scelerisque lorem in vehicula. Aliquam tincidunt, lacus ut sagittis tristique, turpis massa volutpat augue, eu rutrum ligula ante a ante";
        var RecordType1 = Object.freeze({
            big1: 1,
            semibig1: 2,
            medium1: 3,
            small1: 4,
            wide1: 5,
            length1: 6
        });

        // These three strings encode placeholder images. You will want to set the
        // backgroundImage property in your real data to be URLs to images.
        var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";
        var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
        var mediumGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY5g8dcZ/AAY/AsAlWFQ+AAAAAElFTkSuQmCC";

        // Each of these sample groups must have a unique key to be displayed
        // separately.
        var sampleGroups = [
            { key: "group1", title: "Party", subtitle: "Group Subtitle: 1", backgroundImage: "../../images/Assets/small1.jpg", description: groupDescription },
            { key: "group2", title: "Casual", subtitle: "Group Subtitle: 2", backgroundImage: "../../images/Assets/small13.jpg", description: groupDescription },
            { key: "group3", title: "On Sale", subtitle: "Group Subtitle: 3", backgroundImage: "../../images/Assets/small11.jpg", description: groupDescription },
        ];

        // Each of these sample items should have a reference to a particular
        // group.
        var sampleItems = [
            { group: sampleGroups[0], title: "Lorem Ipsum Dolor", subtitle: "550", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small1.jpg" },
            { group: sampleGroups[0], title: "Lorem Ipsum Dolor", subtitle: "400", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small2.jpg" },
            { group: sampleGroups[0], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small3.jpg" },
            { group: sampleGroups[0], title: "Lorem Ipsum Dolor", subtitle: "399", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small4.jpg" },
            { group: sampleGroups[0], title: "Lorem Ipsum Dolor", subtitle: "1250", recordType: RecordType1.big1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/big.jpg" },
            { group: sampleGroups[0], title: "Lorem Ipsum Dolor", subtitle: "225", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small5.jpg" },

            { group: sampleGroups[1], title: "Lorem Ipsum Dolor", subtitle: "550", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small13.jpg" },
            { group: sampleGroups[1], title: "Lorem Ipsum Dolor", subtitle: "1250", recordType: RecordType1.big1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/big4.jpg" },
            { group: sampleGroups[1], title: "Lorem Ipsum Dolor", subtitle: "400", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small10.jpg" },
            { group: sampleGroups[1], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small11.jpg" },
            { group: sampleGroups[1], title: "Lorem Ipsum Dolor", subtitle: "399", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small14.jpg" },
            { group: sampleGroups[1], title: "Lorem Ipsum Dolor", subtitle: "225", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small12.jpg" },

            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small11.jpg" },
            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small12.jpg" },
            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small3.jpg" },
            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small2.jpg" },
            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small15.jpg" },
            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small16.jpg" },
            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small10.jpg" },
            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small1.jpg" },
            { group: sampleGroups[2], title: "Lorem Ipsum Dolor", subtitle: "350", recordType: RecordType1.small1, description: itemDescription, content: itemContent, backgroundImage: "../../images/Assets/small12.jpg" },
        ];

        return sampleItems;
    }
})();

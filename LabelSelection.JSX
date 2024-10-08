function addMarkerPanel(thisObj) {
    // Create the UI panel
    var panel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Add Marker", undefined, {resizeable: true});
    panel.orientation = "column";
    
    // Comment input field
    var commentGroup = panel.add("group");
    commentGroup.add("statictext", undefined, "Comment:");
    var commentInput = commentGroup.add("edittext", undefined, "Your Comment Here");
    commentInput.characters = 30;

    // Label color dropdown
    var labelGroup = panel.add("group");
    labelGroup.add("statictext", undefined, "Label Color:");
    var labelDropdown = labelGroup.add("dropdownlist", undefined, ["Red", "Yellow", "Aqua", "Pink", "Lavender", "Green", "Cyan", "Blue", "Orange", "Brown", "Purple", "Fuchsia", "Tan", "Peach", "Mint", "Gray"]);
    labelDropdown.selection = 0; // Default to "Red"

    // Protected region checkbox
    var protectedRegionGroup = panel.add("group");
    var protectedRegionCheckbox = protectedRegionGroup.add("checkbox", undefined, "Enable Protected Region");

    // Add Marker button
    var addButton = panel.add("button", undefined, "Add Marker");

    // Define what happens when the button is clicked
    addButton.onClick = function() {
        var comp = app.project.activeItem;

        if (comp && comp instanceof CompItem) {
            app.beginUndoGroup("Add Marker with Custom UI");

            // Get the current time from the timeline cursor (playhead)
            var markerTime = comp.time; // Get current time

            // Get input values from the panel
            var markerComment = commentInput.text;
            var markerLabel = labelDropdown.selection.index + 1; // Get the index of the label (1-based)

            // Create the marker with the comment
            var marker = new MarkerValue(markerComment);
            marker.label = markerLabel; // Set the label color

            // Check if the protected region checkbox is enabled
            if (protectedRegionCheckbox.value) {
                marker.protectedRegion = true; // Enable protected region if checkbox is checked
            }

            // Add marker to the composition's timeline at the current playhead time
            comp.markerProperty.setValueAtTime(markerTime, marker);

            app.endUndoGroup();
        } else {
            alert("Please select an active composition.");
        }
    };

    // Show the panel
    if (panel instanceof Window) {
        panel.center();
        panel.show();
    }
}

addMarkerPanel(this);

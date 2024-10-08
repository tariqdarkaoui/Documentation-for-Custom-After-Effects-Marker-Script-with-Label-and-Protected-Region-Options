# Documentation-for-Custom-After-Effects-Marker-Script-with-Label-and-Protected-Region-Options
### Documentation for Custom After Effects Marker Script with Label and Protected Region Options

---

In this documentation, I'll explain how to use a custom After Effects script to add timeline markers with customizable comments, label colors, and the option to enable **protected regions**. The script is designed to be run directly via AE Juice Toolbar, allowing you to click an icon for easy execution.

---

### Overview

This script allows you to add a composition marker at the exact position of the playhead in the timeline. It features:
- **Custom Comments**: You can enter any text for the marker's comment.
- **Label Color Selection**: Choose from 16 different After Effects label colors to help organize your timeline visually.
- **Protected Regions**: Enable protected regions to safeguard certain sections of your composition for templates or editing purposes.

This script is designed for After Effects users who want to streamline their workflow and easily add markers with custom properties. By integrating the script into AE Juice Toolbar, you can trigger it directly by clicking an assigned icon.

---

### Features

- **Add Marker at Playhead Position**: The marker is added exactly where the playhead is currently positioned on the timeline, ensuring precise placement.
- **Custom Comment**: You can input any text as the marker's comment, helping you to label specific points in your composition.
- **Label Color Selection**: Choose from a list of 16 label colors that correspond to After Effects' standard label system (e.g., Red, Yellow, Green, etc.).
- **Protected Region Checkbox**: An option to enable protected regions, which are useful when working with templates or preventing edits in certain areas of your composition.

---

### Script Installation and Usage Instructions

#### 1. **Setup in After Effects**

1. **Install the Script**: 
    - Save the script as a `.jsx` file and place it in a location where After Effects can access it.

2. **Running the Script via AE Juice Toolbar**:
    - Open AE Juice Toolbar and navigate to the toolbar customization options.
    - Create or select an icon (e.g., a label icon) to represent the script.
    - Assign the saved `.jsx` script file to the icon, so clicking the icon will run the script.

#### 2. **Using the Script**

1. **Position the Playhead**: Move the playhead to the exact point in the timeline where you want to add the marker.
2. **Click the Icon**: Click the icon you've assigned to the script in AE Juice Toolbar.
3. **Fill Out the Panel**:
    - **Comment**: Enter a comment for the marker.
    - **Label Color**: Choose a label color from the dropdown (16 available colors).
    - **Enable Protected Region**: If you want to protect this region, check the checkbox.
4. **Add the Marker**: Click the "Add Marker" button, and the marker will be added at the playhead’s current position with your custom settings.

---

### Script Code

Here’s the full code for the script, which you can copy and save as a `.jsx` file for use in After Effects:

```javascript
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
```

---

### Example Usage

1. **Label a Critical Section**: Add a marker at a critical point in your timeline and choose a distinct label color (e.g., Red) to draw attention to it.
2. **Mark a Protected Region**: If you are working on a project template and want to prevent certain areas from being modified, you can enable the protected region checkbox to safeguard that section.
3. **Easily Identify Timeline Events**: Using the comment and label color options, you can quickly identify different sections of your composition at a glance.

---

### Conclusion

This custom After Effects script provides an easy and efficient way to manage composition markers, with additional options for comments, labels, and protected regions. By integrating it with AE Juice Toolbar, you can assign the script to an icon, making the process even faster and more intuitive.

Feel free to modify the script as needed, and share your results or improvements! Happy animating!

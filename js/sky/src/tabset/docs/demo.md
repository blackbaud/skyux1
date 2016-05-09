---
name: Tabset
icon: folder-open-o
summary: The tabset module contains directives for enhancing ui-bootstrap tabs.
---

### Additional Dependencies ###

### Tabset Options ###

The `bb-tabset-add` attribute creates an add button in the tab area and takes a callback that will be executed when the add button is clicked.

The `bb-tabset-open` attribute creates an open button in the tab area and takes a callback that will be executed when the open button is clicked.

### Collapsing Tabs ###

To make tabs collapse into a dropdown on a small (mobile device) screen, use the `bb-tabset-collapsible` attribute on a ui-bootstrap `tabset`.
You must then use the `bb-tab-collapse-header` attribute on your ui-bootstrap `tab` to specify a title for the dropdown that will display when a tab is active.

### Tab Options ###

The `bb-tab-heading-xs` attribute specifies a heading that will appear for a tab on small screen sizes.

### Tab Close Icon ###

If you wish to add a close icon to a tab, just add the `bb-tab-close` class to the ui-bootstrap `tab` element, and add an `i` element with the `bb-tab-close-icon` class inside of the ui-bootstrap `tab-heading` directive.

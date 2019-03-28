---
name: Reorder
icon: arrows
summary: The reorder component provides an interface to display a list where users can drag-and-drop rows into their preferred order.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The reorder component creates a list where users can drag-and-drop rows into their preferred order. The rows can display a title and description.

### Reorder settings ###
- `bb-reorder` &mdash; Creates a list where users can drag-and-drop rows.
    - `bb-reorder-items` &mdash; Specifies an array of items that users can sort. The array should contain objects that provide `title` and `description` properties.

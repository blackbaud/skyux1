---
name: Sort
icon: sort
summary: The sort component displays a button and dropdown menu to allow users to select sorting criteria.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The sort component allows users to select sorting criteria. The component creates a button and dropdown menu to provide sorting options.

### Sort settings ###
  - `bb-sort` &mdash; Creates a button and dropdown menu to provide sorting options.
    - `bb-sort-item` &mdash; Specifies a sorting option to include in the menu.
      - `bb-sort-item-select` &mdash; Specifies a function to be called when users click the sorting option.
      - `bb-sort-item-active` &mdash; *(Optional.)* Indicates whether the sorting option is active. *(Default: `false`)*
    - `bb-sort-append-to-body` &mdash; *(Optional.)* Appends the dropdown menu to the document body. To append the menu, include this attribute with no value in the `bb-sort` element.

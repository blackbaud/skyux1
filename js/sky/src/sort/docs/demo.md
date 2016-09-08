---
name: Sort
icon: sort
summary: The sort component allows users to select sorting criteria.
---

The sort component allows users to select sorting criteria. The component creates a button and menu to provide sorting options.

### Sort settings ###
  - `bb-sort` &mdash; Component that creates a button and menu to provide sorting options.
    - `bb-sort-item` &mdash; Component that contains the content of a sort option.
      - `bb-sort-item-select` &mdash; The function to be called when the sort item is clicked.
      - `bb-sort-item-active` &mdash; *(Optional.)* Specifies whether the item is active sorting option. *(Default: `false`)*
    - `bb-sort-append-to-body` &mdash; *(Optional.)* When present, the sort dropdown menu is appended to the body.
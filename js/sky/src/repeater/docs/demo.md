---
name: Repeater
icon: check-square
summary: The repeater component creates a container to display formatted information for a list of objects.
---

The repeater directive creates a container to display formatted information for a list of objects. As an alternative to [the grid layout](../grids), repeaters are particularly effective for mobile-intensive contexts and other scenarios where you need to display information compactly.

When you create a repeater, you can specify whether to let users collapse and expand list items to hide and view their content. The default standard layout does not allow users to collapse items. The multiple-expand layout allows users to collapse and expand items as necessary. And the single-expand layout allows users to collapse and expand one item at a time.

### Repeater settings ###
- `bb-repeater` &mdash; Creates a container to display formatted information for a list of objects.
    - `bb-repeater-expand-mode` &mdash; *(Optional.)* Specifies the layout for the repeater list. The layout indicates whether users can collapse and expand repeater items. Items  in a collapsed state still display their titles. *(Default: `none`)*
        - `none` &mdash; Loads repeater items in an expanded state and does not allow users to collapse items. This standard layout provides the quickest access to the details about objects. It is best-suited for scenarios where the main content is concise and users need to view it frequently.
        - `multiple` &mdash; Loads repeater items in a collapsed state by default and allows users to expand and collapse items as necessary. This multiple-expand layout provides a more compact view but still allows users to expand as many items as necessary. It is best-suited for scenarios where the most important information is the titles and users only occasionally need to view the content in the body of repeater items.
        - `single` &mdash; Loads repeater items in a collapsed state by default and allows users to expand one item at a time. This single-expand layout provides the most compact view because users can only expand one item at a time. It is best-suited for scenarios where the most important information is the titles and users only occasionally need to view the content in the body of one repeater item at a time.
    - `bb-repeater-item` &mdash; Creates an item to display in the repeater list.
        - `bb-repeater-item-expanded` &mdash; *(Optional.)* Indicates whether to load an item in expanded mode. It can also specify to expand the item programmatically after the item loads. To load an item in expanded mode, set this flag to `true`. *(Default: `false`)*  
        - `bb-repeater-item-context-menu` &mdash; Specifies a context menu to display beside the repeater title. To specify actions to include in the context menu, use [the `bb-context-menu` directive](../contextmenu) within this property.
        - `bb-repeater-item-title` &mdash; Specifies a title to identify an object in the repeater list. The title is particularly important for expandable repeater layouts because it remains visible when users collapse items.
        - `bb-repeater-item-content` &mdash; Specifies the content to display in the body of a repeater item. The content to display depends on the type of object and the use case that the repeater supports.
---

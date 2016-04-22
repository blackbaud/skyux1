---
name: Context Menu
icon: ellipsis-h
summary: The context menu creates simple or complicated dropdown menus that you can incorporate into buttons.
---

The context menu directives allow you to create SKY UX-themed [UI Bootstrap dropdowns](https://angular-ui.github.io/bootstrap/#/dropdown). The context menu module includes multiple directives.

### Context Menu Settings
    - `bb-context-menu` &mdash; Creates a dropdown menu with the context menu button.
        - `bb-context-menu-label` &mdash; Assigns a label to the context menu button for screen readers.
        - `bb-context-menu-item` &mdash; Creates an entry within a dropdown menu.
            - `bb-context-menu-action` &mdash; Specifies a function to be called when users click the menu item.
    - `bb-context-menu-button` &mdash; Creates a button with the SKY UX context menu styles.
    - `bb-submenu` &mdash; Creates an accordion-style submenu within a dropdown menu. You can place the submenu within a dropdown list element.
        - `bb-submenu-heading` &mdash; Specifies a header for a submenu. To specify a static header, apply this as an attribute of `bb-submenu`. To place arbitrary content in the header, apply this as a directive within `bb-submenu`.

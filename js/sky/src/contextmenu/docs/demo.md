---
name: Context Menu
icon: ellipsis-h
summary: The context menu creates simple or complicated dropdown menus that you can incorporate into buttons.
---

The context menu directives allow you to create SKY UX-themed [dropdown](https://angular-ui.github.io/bootstrap/#/dropdown) menus. The context menu module includes three directives.
  - `bb-context-menu` &mdash; Creates a dropdown menu within the context menu button.
  - `bb-context-menu-item` &mdash; Creates an entry within a dropdown menu. When clicked, the menu item executes `bb-context-menu-action`.
  - `bb-context-menu-button` &mdash; Creates a button with the SKY UX context menu styles.
  - `bb-submenu` &mdash; Creates an accordion-style submenu within a dropdown menu. You can place the submenu within a dropdown list element.
    - `bb-submenu-heading` &mdash; Specifies a header for a submenu. To specify a static header, apply this as an attribute of `bb-submenu`. To place arbitrary content in th header, apply this as a directive within `bb-submenu`.
---
name: Action bar
icon: bolt
summary: The action bar provides a SKY UX-themed container for buttons that can collapse when the screen is in extra-small mode.
---

The action bar creates a SKY UX-themed container for buttons. It includes an option to collapse groups of buttons into dropdowns when the screen is in extra-small mode.

To apply action bar styling to more complicated scenarios, you can place content in a `div` with the `bb-action-bar` class. For example, this technique allows you to hide and show buttons at breakpoints other than xs and to collapse dropdowns into submenus. Bootstrap convenience classes to show or hide content include `hidden-xs`, `hidden-sm`, `hidden-md`, and `hidden-lg`. For information about these classes, see the [Bootstrap documentation](http://getbootstrap.com/css/#responsive-utilities-classes).

### Action bar settings ###
    - `bb-action-bar` &mdash; Wraps the content in the action bar to create a SKY UX-themed container for buttons.
        - `bb-action-bar-item` &mdash; Wraps the content in an action button. Any `ng-click` applied to this directive is applied to the action button.
          - `bb-action-bar-item-label` &mdash; Assigns a label to the action bar item for screen readers (only necessary if the action bar item does not contain visible text).
        - `bb-action-bar-item-group` &mdash; Wraps `bb-action-bar-item` directives to collapse the buttons into a dropdown in extra-small mode. 
            - `bb-action-bar-item-group-title` &mdash; *(Optional.)* Edits the default **Actions** label for the dropdown.

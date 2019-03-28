---
name: Navbar
icon: compass
summary: The navbar creates a Bootstrap nav element and applies SKY UX classes to it.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The navbar component creates a Bootstrap `nav` element and applies the appropriate SKY UX classes to it and its children. It also adds behavior such as displaying sub-navigation items when users hover over a dropdown. If you do not want to collapse the navbar into a mobile menu on small screens, then place the `bb-navbar-showmobile` class on the `bb-navbar` component.

### Navbar settings ###
- `bb-navbar` &mdash; Creates a Bootstrap `nav` element and applies SKY UX classes.
    - `bb-navbar-showmobile` &mdash; Indicates not to collapse the navbar into a mobile menu for small screen sizes. Within the `bb-navbar` element, you add a `class` attribute and set its value to  `bb-navbar-showmobile`.
    - `bb-navbar-active` &mdash; Indicates the active navigation item in the navbar. Within the `li` element for that item, you add a `class` attribute and set its value to  `bb-navbar-active`.

---
name: Popover
icon: newspaper-o
summary: The popover component wraps the Angular UI Bootstrap popover directive to create an HTML-formatted popover that is displayed by a trigger element.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The `bb-popover-template` directive enables an HTML-formatted popover for a trigger element to display. This directive is an alternative to the Angular UI Bootstrap `uib-popover` directive, making it easier to define markup in a template rather than directly in the view's controller.

The `bb-popover-template` attribute should specify a URL for a template in the `$templateCache` that will be used as the popover content. The scope applied to this template inherits the current scope. A `hide` function is also
provided on the scope to dismiss the popover.

The directive is built as a thin wrapper of the [Angular UI Bootstrap Popover](http://angular-ui.github.io/bootstrap/) directive and supports all of its optional properties.

### Popover settings ###
- `bb-popover-template` &mdash; Creates an HTML-formatted popover for a trigger element to display.

### Accessibility ###

By default, the popover is appended to its parent element to make it available in the correct reading sequence and focus order. Do not use the Angular UI Bootstrap `popover-append-to-body` property to append the popover to the `body` element because this makes access difficult for people who use assistive technology or keyboard input. 

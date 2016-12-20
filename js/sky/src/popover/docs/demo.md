---
name: Popover
icon: newspaper-o
summary: The popover component wraps the Angular UI Bootstrap popover directive to create an HTML-formatted popover that is displayed by a trigger element.
---

The `bb-popover-template` directive enables an HTML-formatted popover for a trigger element to display. This directive is an alternative to the Angular UI Bootstrap `uib-popover` directive, making it easier to define markup in a template rather than directly in the view's controller.

The `bb-popover-template` attribute should specify a URL for a template in the `$templateCache` that will be used as the popover content. The scope applied to this template inherits the current scope. A `hide` function is also
provided on the scope to dismiss the popover.

The directive is built as a thin wrapper of the [Angular UI Bootstrap Popover](http://angular-ui.github.io/bootstrap/) directive and supports all of its optional properties.

### Popover settings ###
- `bb-popover-template` &mdash; Creates an HTML-formatted popover for a trigger element to display.

### Accessibility ###

By default the popover is appended to the parent element making it available in the correct reading sequence and focus order. It is not recommended to use the `popover-append-to-body` property in Angular UI Bootstrap to append the popover to the body element. This would make it difficult for people who use assistive technology or keyboard input to access. 

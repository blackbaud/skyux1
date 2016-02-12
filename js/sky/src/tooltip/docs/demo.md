---
name: Tooltip
icon: info
summary: This directive is no longer being maintained. For adding templated tooltips, use the Angular UI Bootstrap Tooltip uib-tooltip-template attribute.
deprecated: true
---

### *Deprecated* ###

 This directive is no longer being maintained. For adding templated tooltips, use the [Angular UI Bootstrap Tooltip](http://angular-ui.github.io/bootstrap/) uib-tooltip-template attribute.

### Tooltip Settings ##

In addition to all the properties from the [Angular UI Bootstrap Tooltip](http://angular-ui.github.io/bootstrap/) directive, these properties may also be specified:

 - `bb-tooltip` URL for a template in the `$templateCache`. The template HTML may contain bindings to properties in the current scope.

 - `tooltip-updater` Optional. A property on the scope that can be watched by the directive so that when this property's value changes, the contents of the tooltip are refreshed.

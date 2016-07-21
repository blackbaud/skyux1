---
name: Media breakpoints
icon: mobile
summary: The media breakpoints service calls callback functions when a Bootstrap grid system breakpoint is hit.
---

The media breakpoints service calls callback functions when a [Bootstrap grid system breakpoint](http://getbootstrap.com/css/#grid-media-queries) is hit. This allows you to manipulate the user interface programmatically when CSS media queries are not sufficient.

### Dependencies ##

 - **[enquire.js](http://wicky.nillia.ms/enquire.js/) (2.1.2 or later)**

---

### Media breakpoint methods ###

 - `register(callback)` &mdash; Registers a callback method with the service to be called any time a media breakpoint is hit. The callback function is called with the following arguments:
  - `breakpoint` &mdash; An object with `xs`, `sm`, `md`, and `lg` properties. The property that corresponds to the current breakpoint is set to `true` and the rest are set to `false`.
 - `unregister(callback)` &mdash; Unregisters the specified callback method. This should be called whenever the controller's `$scope` is destroyed.
 - `getCurrent()` &mdash; Gets the current media breakpoint object.
---
name: Media Breakpoints
icon: mobile
summary: The media breakpoints service calls callback functions when a Bootstrap grid system breakpoint is hit to manipulate the user interface programmatically when CSS media queries are not sufficient.
---

The media breakpoints service can call one or more callback functions whenever a [Bootstrap grid system breakpoint](http://getbootstrap.com/css/#grid-media-queries) is hit. This allows for manipulating the UI programmatically in cases where CSS media queries are not sufficient.

### Dependencies ##

 - **[enquire.js](http://wicky.nillia.ms/enquire.js/) (2.1.2 or later)**

---

### Media Breakpoint Methods ###

 - `register(callback)` Registers a callback method with the service that will be called any time a media breakpoint is hit. The callback function will be called with the following arguments:
  - `breakpoint` An object with `xs`, `sm`, `md` and `lg` properties. The property corresponding with the current breakpoint will be set to `true` and the rest set to `false`.
 - `unregister(callback)` Unregisters the specified callback method. This should be called whenever the controller's `$scope` is destroyed.
 - `getCurrent()` Gets the current media breakpoint object.
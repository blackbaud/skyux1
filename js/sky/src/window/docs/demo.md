---
name: Window
icon: desktop
summary: The window services provides helper methods to edit the browser’s window title and to obtain the browser’s scrollbar width.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


An Angular service with the following functions:

  - `setWindowTitle(title)` &mdash; Changes the browser window's title. If a product name is specified in `bbWindowConfig`, then the product name will be appended to the passed title.
  - `getScrollbarWidth` &mdash; Calculates and returns the width of the scrollbar for the current browser.
  - `isIosUserAgent` &mdash; Uses window navigator user agent to determine if current user agent is an iPod, iPad, or iPhone.

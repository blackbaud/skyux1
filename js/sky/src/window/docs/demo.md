---
name: Window
icon: desktop
summary: The window services provides helper methods to edit the browser’s window title and to obtain the browser’s scrollbar width.
---

An Angular service with the following functions:

  - `setWindowTitle(title)` &mdash; Changes the browser window's title. If a product name is specified in `bbWindowConfig`, then the product name will be appended to the passed title.
  - `getScrollbarWidth` &mdash; Calculates and returns the width of the scrollbar for the current browser.
  - `isIosUserAgent` &mdash; Uses window navigator user agent to determine if current user agent is an iPod, iPad, or iPhone.
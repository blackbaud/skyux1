---
name: Tab Scroll
icon: arrows-h
summary: The tab scroll component makes a row of tabs horizontally scrollable when the row is wider than its container.
---

### Dependencies ###

The `bb-tab-scroll` directive causes the row of tabs to be horizontally scrollable when the width of the tabs exceeds the width of its container.  The tabs are also animated to indicate to the user that they can be scrolled.

### Tab Scroll Settings ###

 - `bb-tab-scroll-ready` Used to indicate the tabs are ready to be animated.  This should be used when the tabs are loaded dynamically based on some asynchronous logic like loading data from a web server.
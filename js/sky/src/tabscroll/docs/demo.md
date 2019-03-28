---
name: Tab scroll
icon: arrows-h
summary: The tab scroll component makes a row of tabs horizontally scrollable when the row is wider than its container.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


### Dependencies ###

The `bb-tab-scroll` directive causes the row of tabs to be horizontally scrollable when the width of the tabs exceeds the width of its container.  The tabs are also animated to indicate to the user that they can be scrolled.

### Tab scroll settings ###

 - `bb-tab-scroll-ready` &mdash; Used to indicate the tabs are ready to be animated.  This should be used when the tabs are loaded dynamically based on some asynchronous logic like loading data from a web server.

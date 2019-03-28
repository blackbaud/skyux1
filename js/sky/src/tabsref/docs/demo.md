---
name: Tab sref
icon: link
summary: The tab sref component provides tab info in page URLs so that hyperlinks can point to specific tabs.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The tab sref directive adds the ability to change the page's URL when the user clicks a tab. This also allows for users to navigate straight to a selected tab from a hyperlink.

### Dependencies ###

 - **[Angular UI Router](https://github.com/angular-ui/ui-router) (0.2.13 or higher)**

---

### Tab sref settings ###

 - `bb-tab-sref="stateName"` &mdash; The name of the state where the application should navigate when the tab is selected.

Optional state parameters can be provided
  - `bb-tab-sref="stateName({param: value, param: value})"` &mdash; Navigate to state, with params.

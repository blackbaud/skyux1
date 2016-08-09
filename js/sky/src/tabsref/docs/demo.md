---
name: Tab sref
icon: link
summary: The tab sref component provides tab info in page URLs so that hyperlinks can point to specific tabs.
---

The tab sref directive adds the ability to change the page's URL when the user clicks a tab. This also allows for users to navigate straight to a selected tab from a hyperlink.

### Dependencies ###

 - **[Angular UI Router](https://github.com/angular-ui/ui-router) (0.2.13 or higher)**

---

### Tab sref settings ###

 - `bb-tab-sref="stateName"` &mdash; The name of the state where the application should navigate when the tab is selected.

Optional state parameters can be provided
  - `bb-tab-sref="stateName({param: value, param: value})"` &mdash; Navigate to state, with params.
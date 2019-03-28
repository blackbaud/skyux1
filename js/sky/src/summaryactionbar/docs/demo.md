---
name: Summary action bar
icon: sun-o
summary: The summary action bar contains actions and a responsive summary section.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The summary action bar contains actions and a responsive summary section.

### Summary action bar settings ###
- `bb-summary-actionbar` &mdash; Specifies the container for the actions and summary.
  - `bb-summary-actionbar-actions` &mdash; Specifies the container for the actions.
    - `bb-summary-actionbar-primary` &mdash; Specifies a primary action button.
      - `bb-summary-action-disabled` &mdash; *(Optional.)* Specifies whether the action should be disabled.
      - `bb-summary-action-click` &mdash; *(Optional.)* Specifies a callback that will be executed when the action is clicked.
    - `bb-summary-actionbar-secondary-actions` &mdash; Specifies the container for secondary actions. When more than 2 secondary actions exist, or on small screens, the secondary actions become a dropdown.
      - `bb-summary-actionbar-secondary` &mdash; Specifies a secondary action button.
        - `bb-summary-action-disabled` &mdash; *(Optional.)* Specifies whether the action should be disabled.
        - `bb-summary-action-click` &mdash; *(Optional.)* Specifies a callback that will be executed when the action is clicked.
    - `bb-summary-actionbar-cancel` &mdash; Specifies a button with the styling of a cancel button. You need to provide your own click handler for the cancel action.
      - `bb-summary-action-disabled` &mdash; *(Optional.)* Specifies whether the action should be disabled.
      - `bb-summary-action-click` &mdash; *(Optional.)* Specifies a callback that will be executed when the action is clicked.
  - `bb-summary-actionbar-summary` &mdash; Specifies the container for the summary section.

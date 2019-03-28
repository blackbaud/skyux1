---
name: Search
icon: search
summary: The search component creates a mobile-responsive input control for users to enter search criteria.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The search component creates a mobile-responsive input control for users to enter search criteria.

### Search settings ###
- `bb-search-input` &mdash; Creates an input control for users to enter search criteria. On mobile devices, the component displays a search button that users can click to display the input control.
  - `bb-on-search` &mdash; Specifies a function to be called when users execute searches. The callback should have the following arguments:
    - `searchText` &mdash; Search text that has been applied.
  - `bb-on-search-text-changed` &mdash; *(Optional.)* Specifies a function to be called when search text in the input changes. The callback should have the following arguments:
    - `searchText` &mdash; New search text in the search input.
  - `bb-search-text` &mdash; *(Optional.)* Specifies search text that users can supply to the search component.
  - `bb-search-placeholder` &mdash; *(Optional.)* Specifies placeholder text to display in the search input. If you include this attribute but do not specify a value, then the search input displays the default placeholder text "Find in this list."

  - `bb-search-mobile-response-enabled` &mdash; *(Optional.)* Indicates whether to hide the text input and display a search button on mobile devices. *(Default: `true`)*
  - `bb-search-full-width` &mdash; *(Optional.)* Indicates whether the search input should grow to its container's width. *(Default: `false`)*
  - `bb-search-input-id` &mdash; *(Optional.)* Specifies an ID for the search input.
  - `bb-search-skip-button-while-tabbing` &mdash; *(Optional.)* Indicates whether to skip over the search button when a user tabs through the search input. *(Default: `false`)*

- `bb-search-container` &mdash; Makes the `bb-search-input` component responsive on small screens. You include this directive as an attribute with no value on the container for the `bb-search-input` component.

### Search events ###
- `bbSearchInputApply` &mdash; When the search input control receives this event, it applies search text as if a user clicked the search button. If the event includes the optional `searchText` as an argument, then the text in the input is updated. If the event does not include `searchText`, then the existing text in the input is applied.



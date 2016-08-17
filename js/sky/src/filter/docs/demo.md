---
name: Filter
icon: filter
summary: The filter module provides components that allow users to select filter criteria.
---

The filter module provides components that allow users to select filter criteria. These components create a button to expose filtering options, a modal footer to display buttons that apply and clear filters, and a summary to indicate which filters have been applied.

## Filter modal footer
The filter modal footer component wraps [the `bb-modal-footer` directive](../modal) to provide filter-specific buttons that apply and clear filters.
- `bb-filter-modal-footer` &mdash; Specifies the buttons to display in the filter modal's footer.
  - `bb-filter-modal-apply` &mdash; Specifies a function to be called when users click the button to apply filters.
  - `bb-filter-modal-clear` &mdash; Specifies a function to be called when users click the button to clear filters.

## Filter button
The filter button component creates a button that exposes filtering options.
- `bb-filter-button` &mdash; Creates a button that kicks off a function to expose filtering options.
  - `bb-filter-button-on-click` &mdash; Specifies a function to be called when users click the filter button. 

## Filter summary
The filter summary component indicates which filters have been applied.
- `bb-filter-summary` &mdash; Displays summary items for the filters that users apply.
  - `bb-filter-summary-item` &mdash; Displays an entry in the summary for a  filter that has been applied.
    - `bb-filter-summary-item-on-click` &mdash; *(Optional.)* Specifies a function to be called when users click a summary item.
    - `bb-filter-summary-item-is-dismissable` &mdash; *(Optional.)* Indicates whether to include close icons on summary items. *(Default: `true`)*
    - `bb-filter-summary-item-on-dismiss` &mdash; *(Optional.)* Specifies a function to be called when users click the close icons on summary items.

---
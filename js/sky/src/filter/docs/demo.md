---
name: Filter
icon: filter
summary: The filter module contains components for filtering data.
---

The filter module contains components for filtering data

## Filter modal footer
The filter modal footer component wraps the `bb-modal-footer` directive with filter-specific `Apply filters` and `Clear all filters` buttons. It has the following attributes: 
- `bb-filter-modal-footer`
  - `bb-filter-modal-apply` &mdash; Specifies a function to be called when the `Apply filters` button is clicked.
  - `bb-filter-modal-clear` &mdash; Specifies a function to be called when the `Clear all filters` buton is clicked.

## Filter button
The filter button component creates a styled button that launches a modal which can contain filtering options.
- `bb-filter-button`
  - `bb-filter-button-on-click` &mdash; Specifies a function to be called when the filter button is clicked. 

## Filter Summary
The filter summary component displays information about applied filters.
- `bb-filter-summary` &mdash; A component that contains filter summary items.
  - `bb-filter-summary-item` &mdash; A component for a filter summary item.
    - `bb-filter-summary-item-on-click` &mdash; *(Optional.)* Specifies a function to be called when the filter summary item is clicked.
    - `bb-filter-summary-item-is-dismissable` &mdash; *(Optional.)* Specifies whether the filter summary has a close icon.
    - `bb-filter-summary-item-on-dismiss` &mdash; *(Optional.)* Specifies a function to be called when close icon is clicked.

---
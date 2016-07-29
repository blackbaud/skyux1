---
name: Filter
icon: filter
summary: The filter module contains components for filtering data.
---

The filter module contains components for filtering data

## Filter modal footer
The filter modal footer component wraps the `bb-modal-footer` directive with filter-specific `Apply filters` and `Clear all filters` buttons. It has the following attributes: 
  - `bb-filter-modal-apply` &mdash; Specifies a function to be called when the `Apply filters` button is clicked.
  - `bb-filter-modal-clear` &mdash; Specifies a function to be called when the `Clear all filters` buton is clicked.

## Filter button
- `bb-filter-button` &mdash; Component that creates a filter button in the listbuilder toolbar.
  - `bb-filter-modal-open` &mdash; The object to be passed to be `bbModal.open` function when the filter button is clicked. For available options see [UI Bootstrap $uibModal](https://angular-ui.github.io/bootstrap/#modal).
  - `bb-filter-apply` &mdash; A function that will be called when the filter modal is closed. It takes a `filter` argument which will mirror the argument of the `$uibModalInstance.close` function.

---
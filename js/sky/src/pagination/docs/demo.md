---
name: Pagination
icon: files-o
summary: The pagination component displays list data across multiple pages and inserts a pagination control to page through the list.
---

The pagination component allows you to display list data across multiple pages. When the list exceeds the number of items that fit on a page, the directive displays a pagination control.

The `bb-pagination` directive uses the `bb-pagination-content` directive in conjunction with the `bbPaging` service. The `bb-pagination-content` directive wraps the paged content to maintain a constant height regardless of the page content. When the list data is bound, the wrapper sets the height based on the largest page so that the height does not fluctuate.
The `bbPaging` service creates the paged data and responds to changes in the pagination directive.

### Pagination settings ###

 - `bb-pagination` &mdash; Specifies the paged data that the `bbPaging` service initializes.
 - `bb-pagination-disabled` &mdash; Determines whether the user can interact with the pagination control.

### Pagination content settings ##

 - `bb-pagination-content` &mdash; Specifies the paged data that the `bbPaging` service initializes.

### Paging settings ##
These are optional properties of the object passed to `bbPaging.init()`

 - `currentPage` &mdash; Specifies the initial page to display. *(Default: `1`)*
 - `itemsPerPage` &mdash; Specifies the number of items to display per page. *(Default: `5`)*
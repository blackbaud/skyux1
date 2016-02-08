---
name: Pagination
icon: files-o
summary: The pagination component displays data across multiple pages and inserts a pagination control to page through the data.
---

The pagination directive allows list data to be displayed across multiple pages. When the number of items in the list exceeds the page size, a pagination control is displayed.

The `bb-pagination-content` directive and the `bbPaging` service are used in conjunction with this directive. The `bb-pagination-content` is used to wrap the paged content so that the height of the wrapper can be kept as a constant height across pages regardless of contents. When the list data is bound, the height of the largest page will be used for the wrapper so that the height of the list will not fluctuate as the user pages through it.
The `bbPaging` service is used to create the paged data and responds to changes in the pagination directive.

### Pagination Settings ###

 - `bb-pagination` The paged data initialized by the `bbPaging` service.
 - `bb-pagination-disabled` Determines whether the use can interact with the pagination control.

### Pagination Content Settings ##

 - `bb-pagination-content` The paged data initialized by the `bbPaging` service.

### Paging Settings ##
These are optional properties of the object passed to `bbPaging.init()`

 - `currentPage` *(Default: `1`)* The initial page to display.
 - `itemsPerPage` *(Default: `5`)* The number of items to display per page.
---
name: Pagination
icon: files-o
summary: The pagination component displays list data across multiple pages and inserts a pagination control to page through the list.
---

The pagination component allows you to display list data across multiple pages. The component uses the `bb-pagination` and `bb-pagination-content` directives in conjunction with the `bbPaging` service.

The `bb-pagination-content` directive wraps the paged content to maintain a constant height regardless of the page content. When the list data is bound, the wrapper sets the height based on the largest page so that the height does not fluctuate. When the list exceeds the number of items that fit on a page, the `bb-pagination` directive displays a pagination control. The `bbPaging` service wraps the paged data and responds to changes in the pagination directives.

### Pagination settings ###
 - `bb-pagination` &mdash; When the paged data that the `bbPaging` service initializes exceeds the number of items that fit on a page, this directive displays a pagination control. 
 - `bb-pagination-disabled` &mdash; Determines whether the user can interact with the pagination control.
 - `bb-pagination-content` &mdash; Wraps the paged data that the `bbPaging` service initializes to maintain a constant height regardless of the page content.

### Paging settings ##
The `bbPaging` service wraps paged data, and you can pass an optional object to `bbPaging.init()` to edit its display properties.

 - `currentPage` &mdash; Specifies the initial page to display. *(Default: `1`)*
 - `itemsPerPage` &mdash; Specifies the number of items to display per page. *(Default: `5`)*
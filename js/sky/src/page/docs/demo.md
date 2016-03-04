---
name: Page
icon: file-o
summary: The page component handles functionality around loading pages.
---

The page directive provides functionality around loading pages.

### Page Settings ###

 - `bb-page-status` The status of the page.
    - `LOADING` Denotes the page is currently loading.
    - `LOADED` Denotes the page has successfully finished loading.
    - `NOT_AUTHORIZED` Denotes the page has finished loading and should show the unauthorized content.
    - `NOT_FOUND` Denotes the page is has finished loading and should redirect to the not found page.
 - `bb-page-uses-load-manager` Allow the page to use the bb-data load manager.
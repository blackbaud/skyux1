---
name: Page
icon: file-o
summary: The page component handles functionality around loading pages.
---

The page directive handles functionality around loading pages.

### Page Settings ###
- `bb-page-status` &mdash; Indicates the status of the page.
    - `LOADING` &mdash; Denotes that the page is loading.
    - `LOADED` &mdash; Denotes that the page loaded successfully.
    - `NOT_AUTHORIZED` &mdash; Denotes that the page loaded and should display the unauthorized content.
    - `NOT_FOUND` &mdash; Denotes that the page loaded and should redirect to the not-found page.
- `bb-page-uses-load-manager` &mdash; Allows the page to use the `bb-data` load manager.
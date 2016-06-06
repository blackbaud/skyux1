---
name: Page
icon: file-o
summary: The page component handles functionality around loading pages.
---

The page directive handles functionality around loading pages.

### Page settings ###
- `bb-page`
  - `bb-page-status` &mdash; Indicates the status of the page.
    - `LOADING` &mdash; Denotes that the page is loading.
    - `LOADED` &mdash; Denotes that the page loaded successfully.
    - `NOT_AUTHORIZED` &mdash; Denotes that the page loaded and displays a message that the user does not have right to view the content on the page.
    - `NOT_FOUND` &mdash; Denotes that the page was not found and should redirect to the not-found page.
  - `bb-page-uses-load-manager` &mdash; Allows the page to use the `bb-data` load manager to detect when components within `bb-page` are loading.
- `bb-page-config`
  - `redirectUrl` &mdash; *(Optional.)* Provides a url for the `NOT_AUTHORIZED` redirect button. If not specified, the `NOT_AUTHORIZED` redirect button sends the user to the website root.
  - `notFoundUrl` &mdash; *(Optional.)* Provides a url that `$location.path` will be set to when `bb-page-status` is set to `NOT_FOUND`.
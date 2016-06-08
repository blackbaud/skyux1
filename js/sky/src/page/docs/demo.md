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
    - `NOT_FOUND` &mdash; Denotes that the page was not found and redirects to the not-found URL specified in `bb-page-config`.
  - `bb-page-uses-load-manager` &mdash; Allows the page to use the `bb-data` load manager to detect when components within `bb-page` are loading.
- `bb-page-config` &mdash; A global configuration object that applies options to pages throughout an application.
  - `redirectUrl` &mdash; *(Optional.)* Provides a URL for the `NOT_AUTHORIZED` redirect button. If you do not specify a URL, the `NOT_AUTHORIZED` redirect button sends users to the website root.
  - `notFoundUrl` &mdash; *(Optional.)* Provides a URL to set `$location.path` to when `bb-page-status` is `NOT_FOUND`.
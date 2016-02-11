---
name: Error
icon: exclamation-circle
summary: The error component allows a component to show indication of a degraded state.
---

The error directive shows indication of a degraded state. The parent `bb-error` directive can contain multiple directives, and each one is optional.

### Error Settings
  - `bb-error` &mdash; Wraps the content in a Sky UX-themed error container.
    - `bb-error-image` &mdash; Place an image in this directive to display it above the error.
    - `bb-error-title` &mdash; Place content for the title for the error in this directive.
    - `bb-error-description` &mdash; Place content for the description of an error in this directive to give the user additional details.
    - `bb-error-action` &mdash; Place an action associated with the error in this directive. This might include a button that reloads the page or attempts to refresh data.

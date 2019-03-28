---
name: Error
icon: exclamation-circle
summary: The error component provides a template that allows other components to display error messages when errors occur.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The error directive provides a template that allows other components to display error messages when errors occur. The parent `bb-error` directive can contain multiple directives, and each one is optional.

### Error settings
  - `bb-error` &mdash; Wraps the error message in a SKY UX-themed container.
    - `bb-error-image` &mdash; Specifies an image to display in the error message.
    - `bb-error-title` &mdash; Specifies a title to display in the error message.
    - `bb-error-description` &mdash; Specifies a description to provide additional details in the error message.
    - `bb-error-action` &mdash; Specifies an action to include in the error message. For example, you can include a button to reload the page or to refresh data.
    - `bb-error-type` &mdash; Attribute to specify a set of pre-defined `bb-error-image`, `bb-error-title`, and `bb-error-description` directives. The user can provide `bb-error-image`, `bb-error-title`, and `bb-error-description` directives to override any of the pre-defined types. It can have the following values, and each of these values can also be applied as an error-type for `bb-error-image`, `bb-error-title`, and `bb-error-description` individually:
      - `broken` &mdash; An error indicating that some functionality on the page is broken.
      - `construction` &mdash; An error indicating that some functionality on the page is under construction.
      - `notFound` &mdash; An error indicating that a page was not found.

In addition to the directive, the error component includes a service that can display simple error messages in a modal window.

### Error modal settings

 - `bbErrorModal` &mdash; The service to inject in order to display an error message in a modal window.
   - `show(options)` &mdash; The function to call to display the error modal.  The `options` parameter supports the following properties:
     - `errorTitle` &mdash; Specifies a title to display in the error message.
     - `errorDescription` &mdash; Specifies a description to provide additional details in the error message.

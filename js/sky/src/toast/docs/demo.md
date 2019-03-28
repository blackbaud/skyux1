---
name: Toast
icon: envelope-o
summary: The toast service launches toast messages basic string messages or complex toast messages that use HTML templates.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The toast service can be used to launch toast in a consistent way in a Sky UX application. The service has a single method, `bbToast.open` used to launch a toast. Optionally include the `ngAnimate` module in the application for toasts to fade in and out.

### Dependencies ###

 - **[angular-toastr](https://github.com/Foxandxss/angular-toastr) (1.0.0-beta.2 or higher)**
 - **[ng-animate](https://docs.angularjs.org/api/ngAnimate) (optional, 1.3 or higher)**

---

### Toast settings ##
 - `message` &mdash; Provides a basic string message for simple toasts.
 - `templateUrl` &mdash; URL for a template in the `$templateCache`. Used to provide an HTML template when displaying complex toasts.  Cannot be combined with the `message` option.
 - `controller` &mdash; Used in conjunction with `templateUrl`. Specifies the name of a controller to apply to the template's scope.
 - `resolve` &mdash; Items that will be resolved and passed to the controller as locals.
 - `toastType` &mdash; Specifies a style for the toast. The valid options are `success`, `info`, `warning`, and `danger`. *(Default: `info`)*
 - `timeout` &mdash; Specifies the amount of time in milliseconds to display the toast message before it is automatically dismissed.  Specifying a value of `infinite` will show the toast message until the user clicks the close button. *(Default: `10000`)*

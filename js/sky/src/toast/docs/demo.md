---
name: Toast
icon: envelop-o
summary: The toast service launches toast messages basic string messages or complex toast messages that use HTML templates.
---

The toast service can be used to launch toast in a consistent way in a Sky UX application. The service has a single method, `bbToast.open` used to launch a toast. Optionally include the `ngAnimate` module in the application for toasts to fade in and out.

### Dependencies ###

 - **[angular-toastr](https://github.com/Foxandxss/angular-toastr) (1.0.0-beta.2 or higher)**
 - **[ng-animate](https://docs.angularjs.org/api/ngAnimate) (optional, 1.3 or higher)**

---

### Toast Settings ##

 - `message` Used to provide a basic string message for simple toasts.
 - `templateUrl` Url for a template in the `$templateCache`. Used to provide an HTML template when displaying complex toasts.  Cannot be combined with the `message` option.
 - `controller` Used in conjunction with `templateUrl`. Specifies the name of a controller to apply to the template's scope.
 - `resolve` Items that will be resolved and passed to the controller as locals.
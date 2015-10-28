/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Toast
@icon envelop-o
@summary The toast service launches toast messages basic string messages or complex toast messages that use HTML templates.
 @description The toast service can be used to launch toast in a consistent way in a Sky UX application. The service has a single method, `bbToast.open` used to launch a toast. Optionally include the `ngAnimate` module in the application for toasts to fade in and out.

### Dependencies ###

 - **[angular-toastr](https://github.com/Foxandxss/angular-toastr) (1.0.0-beta.2 or higher)**
 - **[ng-animate](https://docs.angularjs.org/api/ngAnimate) (optional, 1.3 or higher)**

---

### Toast Settings ##

 - `message` Used to provide a basic string message for simple toasts.
 - `templateUrl` Url for a template in the `$templateCache`. Used to provide an HTML template when displaying complex toasts.  Cannot be combined with the `message` option.
 - `controller` Used in conjunction with `templateUrl`. Specifies the name of a controller to apply to the template's scope.
 - `resolve` Items that will be resolved and passed to the controller as locals.
 */

(function () {
    'use strict';

    function nextId() {
        nextId.index = nextId.index || 0;
        nextId.index++;
        return 'bbtoast-' + nextId.index;
    }

    function validateOptions(opts) {
        if (opts.message && opts.templateUrl) {
            throw 'You must not provide both a message and a templateUrl.';
        } else if (!opts.message && !opts.templateUrl) {
            throw 'You must provide either a message or a templateUrl.';
        }
    }

    angular.module('sky.toast', ['toastr'])
        .config(['toastrConfig', function (toastrConfig) {
            angular.extend(toastrConfig, {
                closeButton: true,
                newestOnTop: true,
                positionClass: 'toast-bottom-right',
                tapToDismiss: false,
                timeOut: 6000
            });
        }])
        .factory('bbToast', ['toastr', '$templateCache', '$compile', '$controller', '$rootScope', '$q', '$injector', function (toastr, $templateCache, $compile, $controller, $rootScope, $q, $injector) {
            //Based on $modal approach to resolves
            function getResolvePromises(resolves) {
                var promisesArr = [];
                angular.forEach(resolves, function (value) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.when($injector.invoke(value)));
                    }
                });
                return promisesArr;
            }

            function open(message, config) {
                config = config || {};
                config.iconClass = 'bb-toast';
                return toastr.info(message, '', config);
            }

            function openMessage(opts) {
                return open(opts.message);
            }

            function openWithTemplate(opts) {
                var controller = opts.controller,
                    controllerLocals,
                    elId,
                    resolveIter = 0,
                    resolvesPromise,
                    templateHtml,
                    toast,
                    toastScope;

                function insertTemplateInToast() {
                    var templateEl = toast.el.find('#' + elId);

                    templateEl.html(templateHtml);

                    if (controller) {
                        $controller(controller, controllerLocals);
                        $compile(templateEl)(controllerLocals.$scope);
                    }
                }

                opts.resolve = opts.resolve || {};

                resolvesPromise = $q.all(getResolvePromises(opts.resolve));

                resolvesPromise.then(function (resolvedVars) {
                    if (controller) {
                        controllerLocals = {};
                        controllerLocals.$scope = $rootScope.$new();
                        angular.forEach(opts.resolve, function (value, key) {
                            controllerLocals[key] = resolvedVars[resolveIter++];
                        });
                    }

                    templateHtml = $templateCache.get(opts.templateUrl);

                    elId = nextId();

                    toast = open("<div id='" + elId + "'></div>", { allowHtml: true });
                    toastScope = toast.scope;

                    //We need to hook in after the toast element has been created and the temporary message
                    //defined above exists, but before the toast is visually displayed.  The toastr code adds
                    //an init function to the scope when the toast directive is being linked.  An EvalAsync
                    //after this occurs will allow us to hook in at the correct moment.
                    toastScope.$watch('init', function () {
                        toastScope.$evalAsync(function () {
                            insertTemplateInToast();
                        });
                    });
                });
            }

            return {
                open: function (opts) {
                    opts = opts || {};
                    validateOptions(opts);

                    if (opts.templateUrl) {
                        openWithTemplate(opts);
                    } else {
                        openMessage(opts);
                    }
                }
            };
        }]);
}());

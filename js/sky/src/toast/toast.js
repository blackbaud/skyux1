/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    var DEFAULT_TIMEOUT = 10000;

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

        switch (opts.toastType) {
        case 'info':
        case 'warning':
        case 'success':
        case 'error':
            break;
        case 'danger':
            opts.toastType = 'error';
            break;
        default:
            opts.toastType = 'info';
        }
    }

    angular.module('sky.toast', ['toastr'])
        .config(['toastrConfig', function (toastrConfig) {
            angular.extend(toastrConfig, {
                closeButton: true,
                extendedTimeOut: DEFAULT_TIMEOUT,
                newestOnTop: true,
                positionClass: 'toast-bottom-right',
                tapToDismiss: false,
                timeOut: DEFAULT_TIMEOUT,
                toastClass: 'toast bb-toast'
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

            function open(message, config, opts) {
                config = config || {};

                config.iconClass = 'bb-toast-' + opts.toastType;

                switch (opts.timeout) {
                case 'infinite':
                    config.timeOut = config.extendedTimeOut = 0;
                    break;
                default:
                    if (!isNaN(opts.timeout)) {
                        config.timeOut = config.extendedTimeOut = +opts.timeout;
                    }
                }

                return toastr[opts.toastType](message, '', config);
            }

            function openMessage(opts) {
                return open(opts.message, null, opts);
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

                    toast = open("<div id='" + elId + "'></div>", { allowHtml: true }, opts);
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
                    // Clone the options so as we make changes we don't alter the object
                    // passed to us.
                    opts = angular.extend({}, opts);

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

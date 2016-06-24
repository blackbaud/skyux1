/*global angular, jQuery */

(function ($) {
    'use strict';

    var DEFAULT_PROP = '__DEFAULT__',
        REQUEST_TYPE_DATA = 0,
        REQUEST_TYPE_RESOURCES = 1,
        REQUEST_TYPE_TEXT = 2;

    function fillUrls(option, props, urls) {
        var item,
            p,
            url;

        /*istanbul ignore else */
        /* sanity check */
        if (option) {
            if (angular.isString(option) || option.BB_DATA_POST) {
                url = option;

                option = {};
                option[DEFAULT_PROP] = url;
            }

            for (p in option) {
                /*istanbul ignore else */
                if (option.hasOwnProperty(p)) {
                    item = option[p];
                    url = item;

                    props.push(p);
                    urls.push(url);
                }
            }
        }
    }

    function loadManager(options) {
        // A service endpoint for tracking loading items.

        var item,
            loadingItems = [],
            nonblockingForAdditionalItems = false,
            result,
            scope,
            waitingForFirstItem = false;

        function cancelWaiting() {
            options.waitForFirstItem = false;
            options.nonblockWaitForAdditionalItems = false;

            if (nonblockingForAdditionalItems) {
                nonblockingForAdditionalItems = false;
                scope.$emit("bbEndWait", { nonblocking: true });
            }

            if (waitingForFirstItem) {
                waitingForFirstItem = false;
                scope.$emit("bbEndWait");
            }
        }

        function startNonblockingForAdditionalItems() {
            nonblockingForAdditionalItems = true;
            scope.$emit("bbBeginWait", { nonblocking: true });
        }

        function markCompleted(item) {
            var i = loadingItems.indexOf(item);

            if (i !== -1) {
                loadingItems.splice(i, 1);
                if (loadingItems.length === 0) {
                    result.isLoading = false;

                    if (nonblockingForAdditionalItems) {
                        nonblockingForAdditionalItems = false;
                        scope.$emit("bbEndWait", { nonblocking: true });
                    }
                }
            }

            if (!result.isFirstItemLoaded) {
                result.isFirstItemLoaded = true;
                if (waitingForFirstItem) {
                    waitingForFirstItem = false;
                    scope.$emit("bbEndWait");
                }
            }

            if (result.isLoading && options.nonblockWaitForAdditionalItems && !nonblockingForAdditionalItems) {
                startNonblockingForAdditionalItems();
            }
        }

        function registerItem(item) {
            if (!result.isLoading) {
                if (result.isFirstItemLoaded && options.nonblockWaitForAdditionalItems) {
                    startNonblockingForAdditionalItems();
                }
            }
            loadingItems.push(item);
            result.isLoading = true;
        }

        // Initialize values
        scope = options.scope;

        if (options.load) {
            item = {
                name: options.name,
                load: options.load
            };
        }

        result = {
            isFirstItemLoaded: false,
            isLoading: false,
            loadingItems: loadingItems,
            cancelWaiting: cancelWaiting
        };

        if (options.waitForFirstItem) {
            waitingForFirstItem = true;
            scope.$emit("bbBeginWait");
        }

        // Start loading any item that is handed directly to the loader.
        if (item) {
            // Add the current item to the list.
            registerItem(item);

            // Start loading the item.
            result.loaded = item.load().finally(function () {
                markCompleted(item);
                scope.$parent.$emit("bbData.loadManager.markCompleted", item);
            });

            scope.$parent.$emit("bbData.loadManager.registerItem", item);
        }

        if (options.isAggregate) {
            // Listen to items being registered by child loadManagers.
            scope.$on("bbData.loadManager.registerItem", function (e, item) {
                e.stopPropagation();
                registerItem(item);
            });

            // Listen to items being marked completed by child loadManagers.
            scope.$on("bbData.loadManager.markCompleted", function (e, item) {
                e.stopPropagation();
                markCompleted(item);
            });
        }

        return result;
    }

    function bbData($http, $q, $templateCache, bbDataConfig, $window) {
        function ajaxUrl(url, requestType) {
            var filter,
                parts;

            requestType = requestType || 0;

            if ($window.define && $window.define.amd && $window.require) {
                parts = url.split('?');

                // Grab the portion before the query string and get the fully-qualified URL.
                url = parts.shift();
                url = $window.require.toUrl(url);

                // If there was anything after the first question mark, put it back.
                url += '?' + parts.join('');
            }

            switch (requestType) {
            case REQUEST_TYPE_DATA:
                filter = bbDataConfig.dataUrlFilter;
                break;
            case REQUEST_TYPE_RESOURCES:
                filter = bbDataConfig.resourceUrlFilter;
                break;
            case REQUEST_TYPE_TEXT:
                filter = bbDataConfig.textUrlFilter;
                break;
            }

            if (angular.isFunction(filter)) {
                url = filter(url);
            }

            return url;
        }

        function createAjaxPromise(item, isPost, requestType, timeoutPromise) {
            var data,
                httpOptions,
                isGet,
                textContent,
                type,
                url;

            requestType = requestType || 0;

            if (item.BB_DATA_POST || isPost) {
                data = item.data;
                type = item.type || 'post';
                url = item.url;
            } else {
                type = 'get';
                url = item;
                isGet = true;
            }

            if (isGet && requestType === REQUEST_TYPE_TEXT) {
                // Check the Angular template cache using the raw URL first in case the text content is compiled into
                // the module bundle.
                textContent = $templateCache.get(url);

                if (textContent) {
                    return $q(function (resolve) {
                        resolve({
                            data: textContent
                        });
                    });
                }
            }

            url = ajaxUrl(url, requestType);

            httpOptions = {
                method: type,
                url: url,
                cache: requestType !== 0,
                data: data ? JSON.stringify(data) : null,
                dataType: requestType !== 0 ? 'text' : 'json',
                withCredentials: requestType === 0,
                timeout: timeoutPromise
            };

            if (data instanceof $window.FormData) {
                // Angular sets the Content-Type to application/json by default, but when posting FormData
                // it should clear out the Content-Type and let the browser determine it.
                // https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
                angular.extend(httpOptions, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                });
            }

            return $http(httpOptions);
        }

        function addPromises(items, urls, requestType, timeoutPromise) {
            var i,
                n,
                url;

            if (urls) {
                for (i = 0, n = urls.length; i < n; i++) {
                    url = urls[i];
                    items.push(createAjaxPromise(url, null, requestType, timeoutPromise));
                }
            }
        }

        function nextId() {
            nextId.index = nextId.index || 0;
            nextId.index++;
            return nextId.index;
        }

        function trackHTTPTimeoutForPromise(fn) {
            var id = nextId(),
                promise,
                httpTimeout = $q.defer();

            trackHTTPTimeoutForPromise[id] = httpTimeout;

            promise = fn(httpTimeout.promise);
            promise._id = id;

            function clearPromiseId() {
                delete trackHTTPTimeoutForPromise[id];
            }

            promise.then(clearPromiseId, clearPromiseId);

            return promise;
        }

        function loadData(options) {
            return trackHTTPTimeoutForPromise(function (timeoutPromise) {
                return $q(function (resolve, reject) {
                    var dataOption,
                        dataProps,
                        dataUrls,
                        resourcesOption,
                        resourcesProps,
                        resourcesUrls,
                        promises = [],
                        textOption,
                        textProps,
                        textUrls;

                    function success(args) {
                        var argIndex = 0,
                            result = {
                                httpResults: {}
                            };

                        function addResult(name, props) {
                            var resultData,
                                httpResult,
                                i,
                                n,
                                p,
                                resultItem,
                                resultItemHttpResults;

                            if (props) {
                                for (i = 0, n = props.length; i < n; i++) {
                                    p = props[i];
                                    httpResult = args[argIndex];
                                    resultData = httpResult.data;

                                    if (p === DEFAULT_PROP) {
                                        resultItem = resultData;
                                        resultItemHttpResults = httpResult;
                                    } else {
                                        resultItem = resultItem || {};
                                        resultItem[p] = resultData;

                                        resultItemHttpResults = resultItemHttpResults || {};
                                        resultItemHttpResults[p] = httpResult;
                                    }

                                    argIndex++;
                                }
                            }

                            if (angular.isDefined(resultItem)) {
                                result[name] = resultItem;
                            }

                            if (angular.isDefined(resultItemHttpResults)) {
                                result.httpResults[name] = resultItemHttpResults;
                            }
                        }

                        addResult('data', dataProps, true);
                        addResult('resources', resourcesProps);
                        addResult('text', textProps);

                        resolve(result);
                    }

                    function failure() {
                        /*jshint validthis: true */
                        reject.apply(this, arguments);
                    }

                    dataOption = options.data;
                    resourcesOption = options.resources;
                    textOption = options.text;

                    if (dataOption) {
                        dataProps = [];
                        dataUrls = [];
                        fillUrls(dataOption, dataProps, dataUrls);
                    }

                    if (resourcesOption) {
                        resourcesProps = [];
                        resourcesUrls = [];
                        fillUrls(resourcesOption, resourcesProps, resourcesUrls);
                    }

                    if (textOption) {
                        textProps = [];
                        textUrls = [];
                        fillUrls(textOption, textProps, textUrls);
                    }

                    addPromises(promises, dataUrls, REQUEST_TYPE_DATA, timeoutPromise);
                    addPromises(promises, resourcesUrls, REQUEST_TYPE_RESOURCES, timeoutPromise);
                    addPromises(promises, textUrls, REQUEST_TYPE_TEXT, timeoutPromise);

                    $q.all(promises)
                        .then(success)
                        .catch(failure);
                });
            });
        }

        return {
            cancel: function (promise) {
                if (promise && promise._id && trackHTTPTimeoutForPromise[promise._id]) {
                    trackHTTPTimeoutForPromise[promise._id].resolve();
                }
            },
            load: function (options) {
                if (options.loadManager) {
                    options.loadManager.load = function () {
                        return loadData(options);
                    };

                    return loadManager(options.loadManager).loaded;
                }

                return loadData(options);
            },
            loadManager: loadManager,
            query: function (url, params) {
                return url + '?' + $.param(params);
            },
            post: function (url, data) {
                return {
                    url: url,
                    data: data,
                    BB_DATA_POST: true
                };
            },
            save: function (options) {
                return trackHTTPTimeoutForPromise(function (timeoutPromise) {
                    return createAjaxPromise(options, true, null, timeoutPromise);
                });
            }
        };
    }

    bbData.$inject = ['$http', '$q', '$templateCache', 'bbDataConfig', '$window'];

    angular.module('sky.data', [])
        .constant('bbDataConfig', {})
        .factory('bbData', bbData);
}(jQuery));

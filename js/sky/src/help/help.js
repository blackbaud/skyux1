/*jslint browser: true, plusplus: true */
/*global angular, jQuery */

/** @module Help
@icon question
@summary The help service allows Angular components to open and close the help panel programmatically.
 @description The help service allows other Angular components to open or close the help panel programmatically. When the widget opens, it interrogates the page to identify the current help topic and display the relevant help content. Settings for this service are controlled with the `bbHelpConfig` object.
 
 ### Dependencies ###

 - **[easyXDM](http://easyxdm.net/wp/) (2.4.19 or higher)** Used to make cross-domain requests to the help server

---

### bbHelp Methods ###

- `init()` Adds a global help button to the top-right corner of the page.  The appropriate `bbHelpConfig` options should be supplied before calling `init()`.
- `open()` Opens help using the specified help key.  If `init()` has not yet been called then the global add button will be added to the page before opening the help topic.
- `close()` Closes the current help topic.

### bbHelpConfig Settings ###

 - `productId` The current product identifier used to build the URL to the product's help content.
 - `url` The URL to the Help Widget that will be included.
 - `customLocales` Optional.  An array of additional locales for which the product has help content other than the default help content locale.  This array should contain strings like 'en-gb' or 'fr'.

 */

(function () {
    'use strict';

    angular.module('sky.help', ['ui.router'])
        .constant('bbHelpConfig', {
            onHelpLoaded: null,
            productId: 'Sky',
            customLocales: [],
            url: null
        })
        .factory('bbHelp', ['$q', '$state', '$window', 'bbHelpConfig', function ($q, $state, $window, bbHelpConfig) {
            var initPromise;

            function helpwidgetLoaded() {
                return !!($window.BBHELP && $window.BBHELP.HelpWidget);
            }

            function init() {
                var configOnHelpLoaded,
                    deferred;

                if (!initPromise) {
                    deferred = $q.defer();
                    initPromise = deferred.promise;

                    if (helpwidgetLoaded()) {
                        deferred.resolve();
                    } else if (bbHelpConfig.url) {
                        jQuery.ajax({
                            cache: true,
                            dataType: 'script',
                            url: bbHelpConfig.url
                        }).done(function () {
                            var config = angular.extend({}, bbHelpConfig);

                            if (!config.getCurrentHelpKey) {
                                config.getCurrentHelpKey = function () {
                                    // $state.current.helpKeyOverride outranks $state.current.pageData.helpKey
                                    if ($state.current.helpKeyOverride) {
                                        return $state.current.helpKeyOverride;
                                    }

                                    if ($state.current.pageData) {
                                        return $state.current.pageData.helpKey;
                                    }
                                    return null;
                                };
                            }

                            configOnHelpLoaded = config.onHelpLoaded;

                            config.onHelpLoaded = function () {
                                if (angular.isFunction(configOnHelpLoaded)) {
                                    configOnHelpLoaded.apply(this, arguments);
                                }

                                deferred.resolve();
                            };

                            $window.BBHELP.HelpWidget.load(config);
                        });
                    } else {
                        initPromise = null;
                        throw new Error('bbHelpConfig.url is not defined.');
                    }
                }

                return initPromise;
            }

            function open() {
                var args = arguments;

                init().then(function () {
                    $window.BBHELP.HelpWidget.open.apply($window.BBHELP.HelpWidget, args);
                });
            }

            function close() {
                if (helpwidgetLoaded()) {
                    $window.BBHELP.HelpWidget.close.apply($window.BBHELP.HelpWidget, arguments);
                }
            }

            return {
                init: init,
                open: open,
                close: close
            };
        }]);

}());

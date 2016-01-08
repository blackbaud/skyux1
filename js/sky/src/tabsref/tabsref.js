/*global angular */

/** @module Tab Sref
@icon link
@summary The tab sref component provides tab info in page URLs so that hyperlinks can point to specific tabs.
 @description The tab sref directive adds the ability to change the page's URL when the user clicks a tab. This also allows for users to navigate straight to a selected tab from a hyperlink.

### Dependencies ###

 - **[Angular UI Router](https://github.com/angular-ui/ui-router) (0.2.13 or higher)**

---

### Tab Sref Settings ###

 - `bb-tab-sref` The name of the state where the application should navigate when the tab is selected.
 */

(function () {
    'use strict';

    angular.module('sky.tabsref', ['ui.bootstrap.tabs'])
        .directive('bbTabSref', ['$rootScope', '$state', '$timeout', function ($rootScope, $state, $timeout) {
            return {
                require: ['^?tabset', '^?uibTabset'],
                link: function (scope, el, attrs, controllers) {
                    var active = attrs.active,
                        sref = attrs.bbTabSref,
                        stateChangeDeregistration,
                        tabsetCtrl;

                    tabsetCtrl = controllers[0] !== null ? controllers[0] : controllers[1];
                    

                    function checkCurrentState() {
                        if ($state.is(sref)) {
                            tabsetCtrl.select(el.isolateScope());
                        }
                    }

                    /*istanbul ignore else sanity check */
                    if (active && sref) {
                        checkCurrentState();

                        stateChangeDeregistration = $rootScope.$on('$stateChangeSuccess', function () {
                            checkCurrentState();
                        });

                        scope.$watch(active, function (newValue) {
                            if (newValue && !$state.is(sref)) {
                                // JPB - Delay calling state.go because the state change will fail
                                // if it is triggered while in the middle of processing of another state change.
                                // This can happen if you browse to the page without specifying the state of a particular tab
                                // and then this code tries to switch you over to the state of the first tab.
                                $timeout(function () {
                                    $state.go(sref);
                                });
                            }
                        });

                        scope.$on('$destroy', function () {
                            stateChangeDeregistration();
                        });
                    }
                }
            };
        }]);
}());

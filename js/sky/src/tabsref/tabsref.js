/*global angular */

(function () {
    'use strict';

    angular.module('sky.tabsref', ['sky.tabset', 'ui.bootstrap.tabs'])
        .directive('bbTabSref', ['$rootScope', '$state', '$timeout', function ($rootScope, $state, $timeout) {
            return {
                require: '^uibTabset',
                link: function (scope, el, attrs, tabsetCtrl) {
                    var sref = attrs.bbTabSref,
                        stateChangeDeregistration;

                    function checkCurrentState() {
                        if ($state.is(sref)) {
                            tabsetCtrl.select(el.isolateScope().index);
                        }
                    }

                    /*istanbul ignore else */
                    /* sanity check */
                    if (sref) {
                        checkCurrentState();

                        stateChangeDeregistration = $rootScope.$on('$stateChangeSuccess', function () {
                            checkCurrentState();
                        });

                        scope.$watch(function () {
                            return tabsetCtrl.active;
                        }, function (newValue) {
                            if (newValue === el.isolateScope().index && !$state.is(sref)) {
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

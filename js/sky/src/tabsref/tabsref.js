/*global angular */

(function () {
    'use strict';

    angular.module('sky.tabsref', ['sky.tabset', 'ui.bootstrap.tabs'])
        .directive('bbTabSref', ['$rootScope', '$state', '$timeout', function ($rootScope, $state, $timeout) {
            return {
                require: '^uibTabset',
                link: function (scope, el, attrs, tabsetCtrl) {
                    var sref = parseStateRef(attrs.bbTabSref, scope, $state),
                        stateChangeDeregistration;

                    /*istanbul ignore else */
                    /* sanity check */
                    if (sref.state) {
                        setActiveTab(sref, el, tabsetCtrl, $state);

                        stateChangeDeregistration = $rootScope.$on('$stateChangeSuccess', function () {
                            setActiveTab(sref, el, tabsetCtrl, $state);
                        });

                        scope.$watch(function () {
                            return tabsetCtrl.active;
                        }, function (newValue) {
                            if (newValue === el.isolateScope().index && !$state.includes(sref.state)) {
                                // JPB - Delay calling state.go because the state change will fail
                                // if it is triggered while in the middle of processing of another state change.
                                // This can happen if you browse to the page without specifying the state of a particular tab
                                // and then this code tries to switch you over to the state of the first tab.
                                $timeout(function () {
                                    $state.go(sref.state, sref.params);
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

    function parseStateRef(ref, scope, $state) {
        var parsedRef;

        ref = checkForAndWrapRefWithStateName(ref, $state);

        parsedRef = parseAndValidateRef(ref);

        return {
            state: parsedRef[1],
            params: evaluateAngularExpression(parsedRef[3], scope)
        };
    }

    function checkForAndWrapRefWithStateName(ref, $state) {
        var newRef,
            preparsedRef = ref.match(/^\s*({[^}]*})\s*$/);

        if (preparsedRef && $state.current) {
            newRef = $state.current.name + '(' + preparsedRef[1] + ')';
        }

        return newRef || ref;
    }

    function parseAndValidateRef(ref) {
        var parsedRef = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);

        if (!parsedRef || parsedRef.length !== 4) {
            throw new Error("Invalid state ref '" + parsedRef + "'");
        }

        return parsedRef;
    }

    function evaluateAngularExpression(exp, scope) {
        return angular.copy(scope.$eval(exp)) || null;
    }

    function setActiveTab(sref, el, tabsetCtrl, $state) {
        if ($state.includes(sref.state)) {
            tabsetCtrl.select(el.isolateScope().index);
        }
    }
}());

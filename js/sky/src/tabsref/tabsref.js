/*global angular */

(function () {
    'use strict';

    function evaluateAngularExpression(exp, scope) {
        return angular.copy(scope.$eval(exp)) || null;
    }

    function checkForAndWrapRefWithStateName(ref, $state) {
        var newRef,
            parsedRef;

        // Match against statename({ param: value }) syntax, as specified for ui-sref in angular-ui-router v0.2.15
        // Produces the following matches, in this order, if no statename is present:
        //   - original string, Ex: statename({ param: value })
        //   - parameter object string, Ex: { param: value }
        parsedRef = ref.match(/^\s*({[^}]*})\s*$/);

        // Wrap the parameter string with the current statename if no statename was provided
        if (parsedRef && $state.current) {
            newRef = $state.current.name + '(' + parsedRef[1] + ')';
        }

        return newRef || ref;
    }

    function parseAndValidateRef(ref) {
        // Match against statename({ param: value }) syntax, as specified for ui-sref in angular-ui-router v0.2.15
        // Produces the following matches in this order:
        //   - original string, Ex: statename({ param: value })
        //   - state name, Ex: statename
        //   - parameter object string w/ wrapping parenthesis, Ex: ({ param: value })
        //   - parameter object string, Ex: { param: value }
        var parsedRefSubstrings = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);

        if (!parsedRefSubstrings || parsedRefSubstrings.length !== 4) {
            throw new Error("Invalid state ref '" + ref + "'");
        }

        return parsedRefSubstrings;
    }

    function parseStateRef(ref, scope, $state) {
        var parsedRef;

        ref = checkForAndWrapRefWithStateName(ref, $state);

        parsedRef = parseAndValidateRef(ref);

        return {
            state: parsedRef[1],
            params: evaluateAngularExpression(parsedRef[3], scope)
        };
    }

    function findTabNumberIndex(index, tabsetCtrl) {
        var i;
        for (i = 0; i < tabsetCtrl.tabs.length; i++) {
            if (tabsetCtrl.tabs[i].index === index) {
                return i;
            }
        }
    }

    function setActiveTab(sref, el, tabsetCtrl, $state) {
        var index;
        if ($state.includes(sref.state)) {
            index = el.isolateScope().index;
            if (angular.isNumber(index)) {
                tabsetCtrl.select(index);
            } else {
                tabsetCtrl.select(findTabNumberIndex(index, tabsetCtrl));
            }
           
        }
    }

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
}());

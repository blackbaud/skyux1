/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.wizard', ['sky.resources', 'sky.tabset', 'ui.bootstrap.tabs'])
        .directive('bbWizard', function () {
            return {
                link: function (scope, el) {
                    /*jslint unparam: true */
                    el.addClass('bb-wizard');
                },
                restrict: 'A'
            };
        })
        .directive('bbWizardStepComplete', function () {
            return {
                link: function (scope, el, attrs) {
                    scope.$watch(attrs.bbWizardStepComplete, function (newValue) {
                        el[newValue ? 'addClass' : 'removeClass']('bb-wizard-step-complete');
                    });
                }
            };
        })
        .factory('bbWizardNavigator', ['bbResources', function (bbResources) {
            function stepIsDisabled(step) {
                return angular.isFunction(step.disabled) && step.disabled();
            }

            return {
                init: function (options) {
                    /*jslint unparam: true */
                    var steps,
                        finish;

                    function getPreviousStep() {
                        var i,
                            index,
                            n,
                            previousStep,
                            step;

                        for (i = 0, n = steps.length; i < n; i++) {
                            step = steps[i];
                            index = step.index || i;

                            if ((step.active || options.active === index) && i > 0) {
                                previousStep = steps[i - 1];

                                if (!stepIsDisabled(previousStep)) {
                                    if (angular.isDefined(options.active)) {
                                        return previousStep.index || (i - 1);
                                    } else {
                                        return previousStep;
                                    }

                                }

                                break;
                            }
                        }

                        return null;
                    }

                    function getNextStep() {
                        var i,
                            index,
                            n,
                            nextStep,
                            step;

                        for (i = 0, n = steps.length; i < n; i++) {
                            step = steps[i];
                            index = step.index || i;

                            if ((step.active || options.active === index) && i + 1 < n) {
                                nextStep = steps[i + 1];

                                if (!stepIsDisabled(nextStep)) {
                                    if (angular.isDefined(options.active)) {
                                        return nextStep.index || (i + 1); // There can be a custom index name, or the position of the tab
                                    } else {
                                        return nextStep;
                                    }

                                }

                                break;
                            }
                        }

                        return null;
                    }

                    function setActiveStep(step) {
                        if (step !== null) {
                            if (angular.isDefined(options.active)) {
                                options.active = step;
                            } else {
                                step.active = true;
                            }

                        }

                    }

                    function lastStepIsActive() {
                        if (angular.isDefined(options.active)) {
                            return options.active === steps[steps.length - 1].index || options.active === steps.length - 1;
                        } else {
                            return steps[steps.length - 1].active;
                        }

                    }

                    options = options || {};

                    steps = options.steps;
                    finish = options.finish;

                    return {
                        previousText: function () {
                            return bbResources.wizard_navigator_previous;
                        },
                        nextText: function () {
                            return lastStepIsActive() ? bbResources.wizard_navigator_finish : bbResources.wizard_navigator_next;
                        },
                        goToPrevious: function () {
                            setActiveStep(getPreviousStep());
                        },
                        goToNext: function () {
                            if (lastStepIsActive()) {

                                if (angular.isFunction(finish)) {
                                    finish();
                                }
                            } else {
                                setActiveStep(getNextStep());
                            }

                        },
                        previousDisabled: function () {
                            return !getPreviousStep();
                        },
                        nextDisabled: function () {
                            return !getNextStep() && !lastStepIsActive();
                        }
                    };
                }
            };
        }]);
}());

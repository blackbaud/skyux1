/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.wizard', ['sky.resources', 'ui.bootstrap.tabs'])
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
                            n,
                            previousStep,
                            step;

                        for (i = 0, n = steps.length; i < n; i++) {
                            step = steps[i];

                            if (step.active && i > 0) {
                                previousStep = steps[i - 1];

                                if (!stepIsDisabled(previousStep)) {
                                    return previousStep;
                                }

                                break;
                            }
                        }

                        return null;
                    }

                    function getNextStep() {
                        var i,
                            n,
                            nextStep,
                            step;

                        for (i = 0, n = steps.length; i < n; i++) {
                            step = steps[i];

                            if (step.active && i + 1 < n) {
                                nextStep = steps[i + 1];

                                if (!stepIsDisabled(nextStep)) {
                                    return nextStep;
                                }

                                break;
                            }
                        }

                        return null;
                    }

                    function setActiveStep(step) {
                        if (step) {
                            step.active = true;
                        }
                    }

                    function lastStepIsActive() {
                        return steps[steps.length - 1].active;
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

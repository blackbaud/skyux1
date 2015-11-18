/*global angular */
(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
        .controller('WizardTestController', ['$scope', 'bbModal', function ($scope, bbModal) {
            $scope.locals = {
                openForm: function () {
                    bbModal.open({
                        templateUrl: 'demo/wizard/wizardform.html'
                    });
                }
            };
        }])
        .controller('WizardTestModalController', ['$scope', '$window', 'bbWizardNavigator', function ($scope, $window, bbWizardNavigator) {
            var steps,
                wizardNav;

            steps = [
                {
                    heading: '1. Step 1',
                    templateUrl: 'demo/wizard/step1.html',
                    complete: function () {
                        return !!$scope.locals.requiredValue1;
                    },
                    active: true
                },
                {
                    heading: '2. Step 2',
                    templateUrl: 'demo/wizard/step2.html',
                    complete: function () {
                        return !!$scope.locals.requiredValue2;
                    },
                    disabled: function () {
                        return !$scope.locals.requiredValue1;
                    }
                },
                {
                    heading: '3. Step 3',
                    templateUrl: 'demo/wizard/step3.html',
                    complete: function () {
                        return !!$scope.locals.requiredValue3;
                    },
                    disabled: function () {
                        return !$scope.locals.requiredValue1 || !$scope.locals.requiredValue2;
                    }
                }
            ];

            wizardNav = bbWizardNavigator.init(
                {
                    steps: steps,
                    finish: function () {
                        $window.alert('Finished!');
                    }
                }
            );

            $scope.locals = {
                steps: steps,
                wizardNav: wizardNav,
                firstStepComplete: function () {
                    return !!$scope.locals.requiredValue1;
                },
                secondStepComplete: function () {
                    return !!$scope.locals.requiredValue2;
                }
            };
        }]);
}());
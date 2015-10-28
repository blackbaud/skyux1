angular.module('KitchenSink').controller('WizardsPatternController', ['$scope', function ($scope) {

}]);

angular.module('KitchenSink')
    .controller('WizardsPatternController', ['$scope', 'bbModal', function ($scope, bbModal) {
        $scope.locals = {
            openForm: function () {
                bbModal.open({
                    templateUrl: 'patterns/wizards/wizardform.html'
                });
            }
        };
    }])
    .controller('WizardsModalPatternController', ['$scope', '$window', 'bbWizardNavigator', function ($scope, $window, bbWizardNavigator) {
        var steps,
            wizardNav;

        steps = [
            {
                heading: '1. Step 1',
                templateUrl: 'patterns/wizards/step1.html',
                complete: function () {
                    return !!$scope.locals.requiredValue1;
                },
                active: true
            },
            {
                heading: '2. Step 2',
                templateUrl: 'patterns/wizards/step2.html',
                complete: function () {
                    return !!$scope.locals.requiredValue2;
                },
                disabled: function () {
                    return !$scope.locals.requiredValue1;
                }
            },
            {
                heading: '3. Step 3',
                templateUrl: 'patterns/wizards/step3.html',
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
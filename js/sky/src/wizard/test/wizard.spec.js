/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Wizard', function () {
    'use strict';

    var $compile,
        $scope,
        bbResources;

    beforeEach(module(
        'ngMock',
        'sky.templates',
        'sky.wizard',
        'template/tabs/tabset.html',
        'template/tabs/tab.html'
    ));

    beforeEach(inject(function (_$rootScope_, _$compile_, _bbResources_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        bbResources = _bbResources_;
    }));
    
    describe('directive', function () {
        it('should add the expected CSS class to the associated tabset', function () {
            var el = $compile('<tabset bb-wizard></tabset>')($scope);

            $scope.$digest();

            expect(el).toHaveClass('bb-wizard');
        });

        it('should change the style of a step when it is complete', function () {
            /*jslint white: true */
            var el = $compile(
                '<tabset bb-wizard>' +
                    '<tab bb-wizard-step-complete="tabComplete"></tab>' +
                '</tabset>')($scope);
            /*jslint white: false */

            $scope.tabComplete = true;
            $scope.$digest();

            expect(el.find('li:first')).toHaveClass('bb-wizard-step-complete');

            $scope.tabComplete = false;
            $scope.$digest();

            expect(el.find('li:first')).not.toHaveClass('bb-wizard-step-complete');
        });
    });

    describe('navigator service', function () {
        var bbWizardNavigator;

        beforeEach(inject(function (_bbWizardNavigator_) {
            bbWizardNavigator = _bbWizardNavigator_;

            /*jslint white: true */
            $compile(
                '<tabset bb-wizard>' +
                    '<tab ng-repeat="step in steps" active="step.active"></tab>' +
                '</tabset>')($scope);
            /*jslint white: false */
        }));

        it('should go to next step', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    active: true
                },
                {
                    active: false
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            $scope.steps = steps;
            wizardNav.goToNext();
            $scope.$digest();

            expect(steps[0].active).toBe(false);
            expect(steps[1].active).toBe(true);
        });

        it('should go to next step', function () {
            var finished,
                steps,
                wizardNav;

            steps = [
                {
                    active: false
                },
                {
                    active: true
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps,
                finish: function () {
                    finished = true;
                }
            });

            $scope.steps = steps;
            $scope.$digest();

            wizardNav.goToNext();
            $scope.$digest();

            expect(finished).toBe(true);
        });

        it('should stay on last step if no finish is specified', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    active: false
                },
                {
                    active: true
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            $scope.steps = steps;
            $scope.$digest();

            wizardNav.goToNext();
            $scope.$digest();

            expect(steps[1].active).toBe(true);
        });

        it('should go to previous step', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    active: false
                },
                {
                    active: true
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            $scope.steps = steps;
            $scope.$digest();

            wizardNav.goToPrevious();
            $scope.$digest();

            expect(steps[0].active).toBe(true);
            expect(steps[1].active).toBe(false);
        });

        it('should indicate that previous is disabled when the previous step is disabled', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    disabled: function () {
                        return true;
                    }
                },
                {
                    active: true
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            expect(wizardNav.previousDisabled()).toBe(true);
        });

        it('should stay on current step if there is no previous step', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    active: true
                },
                {
                    active: false
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            $scope.steps = steps;
            $scope.$digest();

            wizardNav.goToPrevious();
            $scope.$digest();

            expect(steps[0].active).toBe(true);
            expect(steps[1].active).toBe(false);
        });

        it('should return expected previous text', function () {
            var wizardNav;

            wizardNav = bbWizardNavigator.init();
            expect(wizardNav.previousText()).toBe(bbResources.wizard_navigator_previous);
        });

        it('should change "next" text to "finish" text when the last step is active', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    active: true
                },
                {
                    active: false
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            $scope.steps = steps;
            $scope.$digest();

            expect(wizardNav.nextText()).toBe(bbResources.wizard_navigator_next);
            
            wizardNav.goToNext();
            $scope.$digest();

            expect(wizardNav.nextText()).toBe(bbResources.wizard_navigator_finish);
            expect(wizardNav.nextDisabled()).toBe(false);
        });

        it('should indicate that previous is disabled when no previous step exists', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    active: true
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            expect(wizardNav.previousDisabled()).toBe(true);
        });

        it('should indicate that next is not disabled when the next step is not disabled', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    active: true
                },
                {
                    disabled: function () {
                        return false;
                    }
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            expect(wizardNav.nextDisabled()).toBe(false);
        });

        it('should indicate that next is disabled when the next step is disabled', function () {
            var steps,
                wizardNav;

            steps = [
                {
                    active: true
                },
                {
                    disabled: function () {
                        return true;
                    }
                }
            ];

            wizardNav = bbWizardNavigator.init({
                steps: steps
            });

            expect(wizardNav.nextDisabled()).toBe(true);
        });
    });
});
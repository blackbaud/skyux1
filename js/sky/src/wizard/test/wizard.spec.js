/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Wizard', function () {
    'use strict';

    var $compile,
        $scope,
        bbResources,
        $timeout;

    beforeEach(module(
        'ngMock',
        'sky.templates',
        'sky.wizard',
        'uib/template/tabs/tabset.html',
        'uib/template/tabs/tab.html'
    ));

    beforeEach(inject(function (_$rootScope_, _$compile_, _bbResources_, _$timeout_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        bbResources = _bbResources_;
        $timeout = _$timeout_;
    }));

    describe('directive', function () {
        it('should add the expected CSS class to the associated tabset', function () {
            var el = $compile('<uib-tabset bb-wizard></uib-tabset>')($scope);

            $scope.$digest();

            expect(el).toHaveClass('bb-wizard');
        });

        it('should change the style of a step when it is complete', function () {
            /*jslint white: true */
            var el = $compile(
                '<uib-tabset bb-wizard>' +
                    '<uib-tab bb-wizard-step-complete="tabComplete"></uib-tab>' +
                '</uib-tabset>')($scope);
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


        }));

        describe('using tabset level active', function () {

            beforeEach(function () {
                /*jslint white: true */
                $compile(
                    '<uib-tabset bb-wizard active="options.active">' +
                        '<uib-tab ng-repeat="step in options.steps"></uib-tab>' +
                    '</uib-tabset>')($scope);
                /*jslint white: false */
            });

            it('should go to next step', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1'
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    active: 0,
                    steps: steps
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                $scope.$digest();

                $scope.steps = steps;
                wizardNav.goToNext();
                $scope.$digest();

                expect($scope.options.active).toBe(1);
            });

            it('should go to next step with finish function', function () {
                var finished,
                    steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1'
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps,
                    finish: function () {
                        finished = true;
                    },
                    active: 1
                };

                wizardNav = bbWizardNavigator.init($scope.options);

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
                        heading: '1'
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps,
                    active: 1
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                $scope.steps = steps;
                $scope.$digest();

                wizardNav.goToNext();
                $scope.$digest();

                expect($scope.options.active).toBe(1);
            });

            it('should go to previous step', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1'
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps,
                    active: 1
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                $scope.steps = steps;
                $scope.$digest();

                wizardNav.goToPrevious();
                $scope.$digest();

                expect($scope.options.active).toBe(0);
            });

            it('should indicate that previous is disabled when the previous step is disabled', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1',
                        disabled: function () {
                            return true;
                        }
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps,
                    active: 1
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                expect(wizardNav.previousDisabled()).toBe(true);
            });

            it('should indicate that previous is enabled when on the second step', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1'
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps,
                    active: 1
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                expect(wizardNav.previousDisabled()).toBe(false);
            });

            it('should stay on current step if there is no previous step', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1'
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    active: 0,
                    steps: steps
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                $scope.steps = steps;
                $scope.$digest();

                wizardNav.goToPrevious();
                $scope.$digest();

                expect($scope.options.active).toBe(0);

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
                        heading: '1'
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps,
                    active: 0
                };

                wizardNav = bbWizardNavigator.init($scope.options);

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
                        heading: '1'
                    }
                ];

                $scope.options = {
                    steps: steps,
                    active: 0
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                expect(wizardNav.previousDisabled()).toBe(true);
            });

            it('should indicate that next is not disabled when the next step is not disabled', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1'
                    },
                    {
                        heading: '2',
                        disabled: function () {
                            return false;
                        }
                    }
                ];

                $scope.options = {
                    steps: steps,
                    active: 0
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                expect(wizardNav.nextDisabled()).toBe(false);
            });

            it('should indicate that next is disabled when the next step is disabled', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1'
                    },
                    {
                        heading: '2',
                        disabled: function () {
                            return true;
                        }
                    }
                ];

                $scope.options = {
                    steps: steps,
                    active: 0
                };

                wizardNav = bbWizardNavigator.init($scope.options);

                expect(wizardNav.nextDisabled()).toBe(true);
            });
        });

        describe('using tab level active', function () {

            beforeEach(function () {
                /*jslint white: true */
                $compile(
                    '<uib-tabset bb-wizard>' +
                        '<uib-tab ng-repeat="step in options.steps" active="step.active"></uib-tab>' +
                    '</uib-tabset>')($scope);
                /*jslint white: false */


            });

            it('should go to the next step', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1',
                        active: true
                    },
                    {
                        heading: '2',
                        active: false
                    }
                ];

                $scope.options = {
                    steps: steps
                };

                $scope.$digest();
                $timeout.flush();

                expect($scope.options.steps[0].active).toBe(true);
                expect($scope.options.steps[1].active).toBe(false);

                wizardNav = bbWizardNavigator.init($scope.options);

                wizardNav.goToNext();
                $scope.$digest();

                expect($scope.options.steps[0].active).toBe(false);
                expect($scope.options.steps[1].active).toBe(true);

            });

            it('should stay on last step if no finish is specified', function () {
                var steps,
                    wizardNav;

                steps = [
                    {

                        heading: '1'
                    },
                    {
                        active: true,
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps
                };

                $scope.$digest();
                $timeout.flush();

                expect($scope.options.steps[1].active).toBe(true);
                expect($scope.options.steps[0].active).toBe(false);

                wizardNav = bbWizardNavigator.init($scope.options);

                $scope.$digest();

                wizardNav.goToNext();
                $scope.$digest();

                expect($scope.options.steps[1].active).toBe(true);
                expect($scope.options.steps[0].active).toBe(false);
            });

            it('should go to previous step', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        heading: '1'
                    },
                    {
                        active: true,
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps
                };
                $scope.$digest();
                $timeout.flush();

                expect($scope.options.steps[0].active).toBe(false);
                expect($scope.options.steps[1].active).toBe(true);

                wizardNav = bbWizardNavigator.init($scope.options);

                wizardNav.goToPrevious();
                $scope.$digest();

                expect($scope.options.steps[0].active).toBe(true);
                expect($scope.options.steps[1].active).toBe(false);
            });

            it('should stay on current step if there is no previous step', function () {
                var steps,
                    wizardNav;

                steps = [
                    {
                        active: true,
                        heading: '1'
                    },
                    {
                        heading: '2'
                    }
                ];

                $scope.options = {
                    steps: steps
                };
                $scope.$digest();
                $timeout.flush();
                expect($scope.options.steps[0].active).toBe(true);

                wizardNav = bbWizardNavigator.init($scope.options);

                $scope.steps = steps;
                $scope.$digest();

                wizardNav.goToPrevious();
                $scope.$digest();

                expect($scope.options.steps[0].active).toBe(true);

            });
        });


    });
});

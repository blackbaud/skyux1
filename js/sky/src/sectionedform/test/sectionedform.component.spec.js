/*jshint jasmine: true */
/*global angular */

describe('SectionedForm', function () {
    'use strict';

    var $compile,
        $document,
        $scope,
        $templateCache,
        bbMediaBreakpoints,
        $timeout,
        element;

    beforeEach(function () {
        angular.mock.module(
            'sky.templates',
            'sky.sectionedform',
            'uib/template/tabs/tabset.html',
            'uib/template/tabs/tab.html'
        );

        element = null;

        angular.mock.inject(function (_$rootScope_, _$compile_, _$document_, _$templateCache_, _bbMediaBreakpoints_, _$timeout_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
            $templateCache = _$templateCache_;
            bbMediaBreakpoints = _bbMediaBreakpoints_;
            $timeout = _$timeout_;
        });
    });

    afterEach(function () {
        if (element) {
            element.remove();
        }
    });

    function compileSectionedForm() {
        var el = $compile(
            '<form>' +
                '<bb-sectioned-form bb-sectioned-form-sections="sections" bb-sectioned-form-active-section-index="activeSectionIndex" bb-sectioned-form-on-active-section-index-change="activeSectionIndex = index"></bb-sectioned-form>' +
            '</form>')($scope);

        element = el;
        $document.find('body').append(element);

        $scope.$digest();

        return el.children();
    }

    function getContentElement(el) {
        return el.find('div.tab-content:first');
    }

    function getFirstSectionTabElement(el) {
        return el.find('uib-tab-heading:first > span:first');
    }

    function getSectionsElement(el) {
        return el.find('ul.nav-tabs:first');
    }

    function expectSectionsHiddenContentVisible(el) {
        expect(getSectionsElement(el)).toBeHidden();
        expect(getContentElement(el)).toBeVisible();
    }

    function expectSectionsVisibleContentHidden(el) {
        expect(getSectionsElement(el)).toBeVisible();
        expect(getContentElement(el)).toBeHidden();
    }

    describe('component', function () {
        it('should show the first section by default on initial load', function () {
            var sutView;
            
            $scope.sections = [
                {
                    templateUrl: 'test/sectionedform/form1.html'
                },
                {
                    templateUrl: 'test/sectionedform/form2.html'
                }
            ];

            $templateCache.put(
                'test/sectionedform/form1.html',
                '<ng-form>' +
                    '<div class="section1"></div>' +
                '</ng-form>');

            $templateCache.put(
                'test/sectionedform/form2.html',
                '<ng-form>' +
                    '<div class="section2"></div>' +
                '</ng-form>');

            sutView = compileSectionedForm();
            $timeout.flush();

            expect(getContentElement(sutView).find('.section1:visible').length).toBe(1);
            expect(getContentElement(sutView).find('.section2:visible').length).toBe(0);
            expect($scope.activeSectionIndex).toBe(0);
        });

        it('should show the first section when invalid number passed', function () {
            var sutView;
            
            $scope.sections = [
                {
                    templateUrl: 'test/sectionedform/form1.html'
                },
                {
                    templateUrl: 'test/sectionedform/form2.html'
                }
            ];

            $scope.activeSectionIndex = -1;
            $templateCache.put(
                'test/sectionedform/form1.html',
                '<ng-form>' +
                    '<div class="section1"></div>' +
                '</ng-form>');

            $templateCache.put(
                'test/sectionedform/form2.html',
                '<ng-form>' +
                    '<div class="section2"></div>' +
                '</ng-form>');

            sutView = compileSectionedForm();

            expect(getContentElement(sutView).find('.section1:visible').length).toBe(1);
            expect(getContentElement(sutView).find('.section2:visible').length).toBe(0);
        });

        it('should show the specified section on initial load', function () {
            var sutView;
            
            $scope.sections = [
                {
                    templateUrl: 'test/sectionedform/form1.html'
                },
                {
                    templateUrl: 'test/sectionedform/form2.html'
                }
            ];
            
            $scope.activeSectionIndex = 1;

            $templateCache.put(
                'test/sectionedform/form1.html',
                '<ng-form>' +
                    '<div class="section1"></div>' +
                '</ng-form>');

            $templateCache.put(
                'test/sectionedform/form2.html',
                '<ng-form>' +
                    '<div class="section2"></div>' +
                '</ng-form>');

            sutView = compileSectionedForm();

            expect(getContentElement(sutView).find('.section1:visible').length).toBe(0);
            expect(getContentElement(sutView).find('.section2:visible').length).toBe(1);
        });

        it('should change the displayed section when index input is changed', function () {
            var sutView;
            
            $scope.sections = [
                {
                    templateUrl: 'test/sectionedform/form1.html'
                },
                {
                    templateUrl: 'test/sectionedform/form2.html'
                }
            ];

            $templateCache.put(
                'test/sectionedform/form1.html',
                '<ng-form>' +
                    '<div class="section1"></div>' +
                '</ng-form>');

            $templateCache.put(
                'test/sectionedform/form2.html',
                '<ng-form>' +
                    '<div class="section2"></div>' +
                '</ng-form>');

            sutView = compileSectionedForm();

            expect(getContentElement(sutView).find('.section1:visible').length).toBe(1);
            expect(getContentElement(sutView).find('.section2:visible').length).toBe(0);

            $scope.activeSectionIndex = 1;
            $scope.$digest();

            expect(getContentElement(sutView).find('.section1:visible').length).toBe(0);
            expect(getContentElement(sutView).find('.section2:visible').length).toBe(1);
        });

        it('should trigger index changed callback when use changes the visible section', function () {
            var sutView;
            
            $scope.sections = [
                {
                    templateUrl: 'test/sectionedform/form1.html'
                },
                {
                    templateUrl: 'test/sectionedform/form2.html'
                }
            ];

            $templateCache.put(
                'test/sectionedform/form1.html',
                '<ng-form>' +
                    '<div class="section1"></div>' +
                '</ng-form>');

            $templateCache.put(
                'test/sectionedform/form2.html',
                '<ng-form>' +
                    '<div class="section2"></div>' +
                '</ng-form>');

            sutView = compileSectionedForm();

            $scope.activeSectionIndex = 0;

            angular.element(sutView.find('.nav-link')[0]).click();

            $scope.activeSectionIndex = 1;
        });

        it('should change the style of a section if a required field exists in the content', function () {
            var sutView;
            
            $scope.sections = [
                {
                    formName: 'formName',
                    templateUrl: 'test/sectionedform/form.html'
                }
            ];

            $templateCache.put(
                'test/sectionedform/form.html',
                '<ng-form name="formName">' +
                    '<input name="reqField" ng-model="reqField" required />' +
                '</ng-form>');

            sutView = compileSectionedForm();

            expect(getFirstSectionTabElement(sutView)).toHaveClass('required');
        });

        it('should change the style of a section if the section is invalid', function () {
            var sutController,
                sutView;
            
            $scope.sections = [
                {
                    formName: 'formName',
                    templateUrl: 'test/sectionedform/form.html'
                }
            ];

            $templateCache.put(
                'test/sectionedform/form.html',
                '<ng-form name="formName">' +
                    '<input name="reqField" ng-model="reqField" required />' +
                '</ng-form>');

            sutView = compileSectionedForm();

            sutController = sutView.controller('bbSectionedForm');
            sutController.form.$submitted = true;
            $scope.$digest();

            expect(getFirstSectionTabElement(sutView)).toHaveClass('invalid');
            expect(getFirstSectionTabElement(sutView)).not.toHaveClass('required');
        });

        it('should show the item count in the section heading', function () {
            var sutView;

            $scope.sections = [
                {
                    heading: 'testHeading',
                    itemCount: 5
                }
            ];

            sutView = compileSectionedForm();

            expect(getFirstSectionTabElement(sutView)).toHaveText('testHeading (5)');
        });
        
        it('should transition from sections to content when a section is selected on mobile', function () {
            var bbMediaBreakpointsCallback,
                sutController,
                sutView;

            $scope.sections = [{}];
            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                bbMediaBreakpointsCallback = callback;
            });

            sutView = compileSectionedForm();

            sutController = sutView.controller('bbSectionedForm');
            bbMediaBreakpointsCallback({xs: true});
            $scope.$digest();

            expectSectionsVisibleContentHidden(sutView);

            sutController.activeSection = 0;
            $scope.$digest();

            expectSectionsHiddenContentVisible(sutView); 
        });
        
        it('should transition from content to sections when event is triggered on mobile', function () {
            var bbMediaBreakpointsCallback,
                sutController,
                sutView;

            $scope.sections = [{}];
            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                bbMediaBreakpointsCallback = callback;
            });

            sutView = compileSectionedForm();

            sutController = sutView.controller('bbSectionedForm');
            bbMediaBreakpointsCallback({xs: true});
            $scope.$digest();

            sutController.activeSection = 0;
            $scope.$digest();

            expectSectionsHiddenContentVisible(sutView);

            $scope.$broadcast('reinitializeSectionDisplay');

            expectSectionsVisibleContentHidden(sutView);
        });
    });
});
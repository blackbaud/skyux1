/*jshint jasmine: true */
/*global angular */

describe('SectionedForm', function () {
    'use strict';

    var $compile,
        $document,
        $scope,
        $templateCache,
        bbMediaBreakpoints;

    beforeEach(function () {
        angular.mock.module(
            'sky.templates',
            'sky.sectionedform',
            'uib/template/tabs/tabset.html',
            'uib/template/tabs/tab.html'
        );

        angular.mock.inject(function (_$rootScope_, _$compile_, _$templateCache_, _bbMediaBreakpoints_, _$document_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $templateCache = _$templateCache_;
            bbMediaBreakpoints = _bbMediaBreakpoints_;
            $document = _$document_;
        });
    });

    function compileSectionedForm() {
        var el = $compile(
            '<form>' +
                '<bb-sectioned-form bb-sectioned-form-sections="sections"></bb-sectioned-form>' +
            '</form>')($scope);

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
            var sutController,
                sutView;

            $scope.sections = [{}];

            sutView = compileSectionedForm();
            $document.find('body:first').append(sutView);

            sutController = sutView.controller('bbSectionedForm');
            sutController.isMobile = true;
            $scope.$digest();

            expectSectionsVisibleContentHidden(sutView);

            sutController.activeSection = 0;
            $scope.$digest();

            expectSectionsHiddenContentVisible(sutView); 
        });
        
        it('should transition from content to sections when event is triggered on mobile', function () {
            var sutController,
                sutView;

            $scope.sections = [{}];

            sutView = compileSectionedForm();
            $document.find('body:first').append(sutView);

            sutController = sutView.controller('bbSectionedForm');
            sutController.isMobile = true;
            $scope.$digest();

            sutController.activeSection = 0;
            $scope.$digest();

            expectSectionsHiddenContentVisible(sutView);

            $scope.$broadcast('reinitializeSectionDisplay');

            expectSectionsVisibleContentHidden(sutView);
        });
    });
});
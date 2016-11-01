/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    

    describe('Summary actionbar component', function () {
        var $compile,
            $scope,
            $document,
            bbMediaBreakpoints,
            fxOff;

        beforeEach(module(
            'sky.summary.actionbar',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _bbMediaBreakpoints_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
            bbMediaBreakpoints = _bbMediaBreakpoints_;
            fxOff = $.fx.off;
            $.fx.off = true;
        }));

        afterEach(function () {
            $.fx.off = fxOff;
        });

        it('should create an actionbar with action and summary sections', function () {
            var actionbarHtml = '<bb-summary-actionbar>' +
                '<bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-primary>Primary action</bb-summary-actionbar-primary>' +
                '<bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-secondary ng-click="summaryCtrl.action1()">Secondary action</bb-summary-actionbar-secondary>' +
                '<bb-summary-actionbar-secondary ng-click="summaryCtrl.action2()">Secondary action 2</bb-summary-actionbar-secondary>' +
                '</bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-cancel>Cancel</bb-summary-actionbar-cancel>' +
                '</bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-summary>' +
                '<div class="bb-test-summary">' +
                'My Content' +
                '</div>' +
                '</bb-summary-actionbar-summary>' +
                '</bb-summary-actionbar>',
                actionbarEl;

            actionbarEl = $compile(actionbarHtml)($scope);
            $document.find('body').append(actionbarEl);
            $scope.$digest();


        });

        it('should have actions collapse into a dropdown when more than 2 actions exist', function () {

        });

        it('should have actions collapse into a dropdown when on a small screen', function () {

        });

        it('should show the expanded summary when on a small screen and allow toggle of hide and show', function () {

        });

        it('should adjust the margin on the document when window resizes', function () {

        });

        it('should adjust the margin on the document as the summary height changes', function () {

        });

        describe('modal', function () {
            it('should set modal styles and call fit to window when in a modal', function () {

            });

            describe('no full page', function () {
                it('should animate the modal body and fit to window when expanding and collapsing the summary', function () {

                }); 

                it('should be always in collapse mode when in a modal', function () {

                });
            });

            describe('full page', function () {
                it('should set modal body styles on hiding modal', function () {

                });

                it('should show the expanded summary when on a small screen and side by side on a large screen', function () {

                });
            });

            
        });
    });
})();
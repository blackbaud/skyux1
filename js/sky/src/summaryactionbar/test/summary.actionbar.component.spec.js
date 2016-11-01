/* jshint jasmine: true */
/* global module, inject, $ */
(function () {
    'use strict';
    

    describe('Summary actionbar component', function () {
        var $compile,
            $scope,
            $document,
            bbMediaBreakpoints,
            fxOff,
            cancelClicked = false,
            secondary1Clicked = false,
            secondary2Clicked = false,
            secondary3Clicked = false,
            primaryClicked = false,
            actionbar2SecondaryHtml = '<bb-summary-actionbar>' +
                '<bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-primary ng-click="summaryCtrl.primaryAction()">Primary action</bb-summary-actionbar-primary>' +
                '<bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-secondary ng-click="summaryCtrl.action1()">Secondary action</bb-summary-actionbar-secondary>' +
                '<bb-summary-actionbar-secondary ng-click="summaryCtrl.action2()">Secondary action 2</bb-summary-actionbar-secondary>' +
                '</bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-cancel ng-click="summaryCtrl.cancel()">Cancel</bb-summary-actionbar-cancel>' +
                '</bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-summary>' +
                '<div class="bb-test-summary">' +
                'My Content' +
                '</div>' +
                '</bb-summary-actionbar-summary>' +
                '</bb-summary-actionbar>',
            actionbar3SecondaryHtml = '<bb-summary-actionbar>' +
                '<bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-primary ng-click="summaryCtrl.primaryAction()">Primary action</bb-summary-actionbar-primary>' +
                '<bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-secondary ng-click="summaryCtrl.action1()">Secondary action</bb-summary-actionbar-secondary>' +
                '<bb-summary-actionbar-secondary ng-click="summaryCtrl.action2()">Secondary action 2</bb-summary-actionbar-secondary>' +
                '<bb-summary-actionbar-secondary ng-click="summaryCtrl.action3()">Secondary action 3</bb-summary-actionbar-secondary>' +
                '</bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-cancel ng-click="summaryCtrl.cancel()">Cancel</bb-summary-actionbar-cancel>' +
                '</bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-summary>' +
                '<div class="bb-test-summary">' +
                'My Content' +
                '</div>' +
                '</bb-summary-actionbar-summary>' +
                '</bb-summary-actionbar>';

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

            cancelClicked = false;
            secondary1Clicked = false;
            secondary2Clicked = false;
            primaryClicked = false;

            $scope.summaryCtrl = {
                primaryAction: function () {
                    primaryClicked = true;
                },
                action1: function () {
                    secondary1Clicked = true;
                },
                action2: function () {
                    secondary2Clicked = true;
                },
                action3: function () {
                    secondary3Clicked = true;
                },
                cancel: function () {
                    cancelClicked = true;
                }
            };
            
        }));

        afterEach(function () {
            $.fx.off = fxOff;
        });

        function getPrimaryActionButton(el) {
            return el.find('.bb-summary-actionbar .bb-summary-actionbar-actions .btn.btn-primary');
        }

        function getSecondaryButtonsExpanded(el) {
            return el.find('.bb-summary-actionbar .bb-summary-actionbar-actions .bb-summary-actionbar-secondary-actions .bb-summary-actionbar-secondary-buttons .btn.bb-btn-secondary');
        }

        function getCancelButton(el) {
            return el.find('.bb-summary-actionbar .bb-summary-actionbar-actions .btn.btn-link');
        }

        function getSummary(el) {
            return el.find('.bb-summary-actionbar .bb-summary-actionbar-summary .bb-summary-actionbar-summary-items');
        }

        function getDropdownButton(el) {
            return el.find('.bb-summary-actionbar .bb-summary-actionbar-actions .bb-summary-actionbar-secondary-actions .dropup .btn.bb-btn-secondary');
        }

        function getDropdownItems(el) {
            return el.find('.bb-summary-actionbar .bb-summary-actionbar-actions .bb-summary-actionbar-secondary-actions .bb-dropdown-menu .bb-dropdown-item .btn.bb-btn-secondary');
        }

        function initActionbar(template) {
            var el = $compile(template)($scope);
            $document.find('body').append(el);
            $scope.$digest();
            return el;
        }

        it('should create an actionbar with action and summary sections', function () {
            var primaryButtonEl,
                secondaryButtonEl,
                cancelButtonEl,
                summaryEl,
                actionbarEl;
            
            actionbarEl = initActionbar(actionbar2SecondaryHtml);

            primaryButtonEl = getPrimaryActionButton(actionbarEl);
            expect(primaryButtonEl.length).toBe(1);
            expect(primaryButtonEl).toHaveText('Primary action');
            primaryButtonEl.click();
            $scope.$digest();
            expect(primaryClicked).toBe(true);

            secondaryButtonEl = getSecondaryButtonsExpanded(actionbarEl);
            expect(secondaryButtonEl.length).toBe(2);
            expect(secondaryButtonEl.eq(0)).toHaveText('Secondary action');
            expect(secondaryButtonEl.eq(1)).toHaveText('Secondary action 2');
            expect(secondaryButtonEl.eq(0)).toBeVisible();
            expect(secondaryButtonEl.eq(1)).toBeVisible();

            secondaryButtonEl.eq(0).click(); 
            $scope.$digest();
            expect(secondary1Clicked).toBe(true);

            secondaryButtonEl.eq(1).click(); 
            $scope.$digest();
            expect(secondary2Clicked).toBe(true);

            cancelButtonEl = getCancelButton(actionbarEl);
            expect(cancelButtonEl.length).toBe(1);
            expect(cancelButtonEl).toHaveText('Cancel');
            cancelButtonEl.click();
            $scope.$digest();

            expect(cancelClicked).toBe(true);

            summaryEl = getSummary(actionbarEl);
            expect(summaryEl.find('.bb-test-summary')).toHaveText('My Content');

            actionbarEl.remove();

        });

        function verifySecondaryActions(actionbarEl, isCollapsed, numActions) {
            var secondaryButtonEl = getSecondaryButtonsExpanded(actionbarEl),
                dropdownButtonEl,
                i,
                dropdownItemsEl;

            dropdownButtonEl = getDropdownButton(actionbarEl);
            dropdownItemsEl = getDropdownItems(actionbarEl);
            expect(secondaryButtonEl.length).toBe(numActions);
            expect(dropdownItemsEl.length).toBe(numActions);
            if (isCollapsed) {      
                for (i = 0; i < numActions; i++) {
                    expect(secondaryButtonEl.eq(i)).not.toBeVisible();
                }
                expect(dropdownButtonEl).toBeVisible();  
            } else {
                for (i = 0; i < numActions; i++) {
                    expect(secondaryButtonEl.eq(i)).toBeVisible();
                }
                expect(dropdownButtonEl).not.toBeVisible();
            }
        }

        it('should have actions collapse into a dropdown when more than 2 actions exist', function () {
            var actionbarEl;
            
            actionbarEl = initActionbar(actionbar3SecondaryHtml);
            verifySecondaryActions(actionbarEl, true, 3);

            actionbarEl.remove();
        });

        it('should have actions collapse into a dropdown when on a small screen', function () {
            var actionbarEl,
                i,
                breakpointCallbacks = [];

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                breakpointCallbacks.push(callback);
            });

            actionbarEl = initActionbar(actionbar2SecondaryHtml);

            for (i = 0; i < breakpointCallbacks.length; i++) {
                breakpointCallbacks[i]({xs: true});
            }
            $scope.$digest();

            verifySecondaryActions(actionbarEl, true, 2);

            for (i = 0; i < breakpointCallbacks.length; i++) {
                breakpointCallbacks[i]({xs: false});
            }
            $scope.$digest();

            verifySecondaryActions(actionbarEl, false, 2);

            actionbarEl.remove();
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
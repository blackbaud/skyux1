/* jshint jasmine: true */
/* global module, inject, angular, $ */
(function () {
    'use strict';
    

    describe('Summary actionbar component', function () {
        var $compile,
            $scope,
            $timeout,
            $document,
            $animate,
            bbModal,
            $window,
            bbMediaBreakpoints,
            fxOff,
            cancelClicked = false,
            secondary1Clicked = false,
            secondary2Clicked = false,
            secondary3Clicked = false,
            primaryClicked = false,
            actionbar2SecondaryHtml = '<bb-summary-actionbar>' +
                '<bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-primary bb-summary-action-disabled="summaryCtrl.primaryDisabled" bb-summary-action-click="summaryCtrl.primaryAction()">Primary action</bb-summary-actionbar-primary>' +
                '<bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-secondary bb-summary-action-disabled="summaryCtrl.secondaryDisabled" bb-summary-action-click="summaryCtrl.action1()">Secondary action</bb-summary-actionbar-secondary>' +
                '<bb-summary-actionbar-secondary bb-summary-action-click="summaryCtrl.action2()">Secondary action 2</bb-summary-actionbar-secondary>' +
                '</bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-cancel bb-summary-action-disabled="summaryCtrl.cancelDisabled" bb-summary-action-click="summaryCtrl.cancel()">Cancel</bb-summary-actionbar-cancel>' +
                '</bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-summary>' +
                '<div class="bb-test-summary" style="width: 100px; height: 100px;">' +
                'My Content' +
                '</div>' +
                '</bb-summary-actionbar-summary>' +
                '</bb-summary-actionbar>',
            actionbar3SecondaryHtml = '<bb-summary-actionbar>' +
                '<bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-primary bb-summary-action-click="summaryCtrl.primaryAction()">Primary action</bb-summary-actionbar-primary>' +
                '<bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-secondary bb-summary-action-click="summaryCtrl.action1()">Secondary action</bb-summary-actionbar-secondary>' +
                '<bb-summary-actionbar-secondary bb-summary-action-click="summaryCtrl.action2()">Secondary action 2</bb-summary-actionbar-secondary>' +
                '<bb-summary-actionbar-secondary bb-summary-action-click="summaryCtrl.action3()">Secondary action 3</bb-summary-actionbar-secondary>' +
                '</bb-summary-actionbar-secondary-actions>' +
                '<bb-summary-actionbar-cancel bb-summary-action-click="summaryCtrl.cancel()">Cancel</bb-summary-actionbar-cancel>' +
                '</bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-summary>' +
                '<div class="bb-test-summary">' +
                'My Content' +
                '</div>' +
                '</bb-summary-actionbar-summary>' +
                '</bb-summary-actionbar>',
            actionbar4SecondaryHtml = '<bb-summary-actionbar>' +
                '<bb-summary-actionbar-actions>' +
                '</bb-summary-actionbar-actions>' +
                '<bb-summary-actionbar-summary>' +
                '</bb-summary-actionbar-summary>' +
                '</bb-summary-actionbar>',
            actionbar5SecondaryHtml = '<bb-summary-actionbar>' +
                '<bb-summary-actionbar-actions>' +
                '</bb-summary-actionbar-actions>' +
                '</bb-summary-actionbar>';

        beforeEach(module(
            'ngMock',
            'ngAnimateMock',
            'sky.summary.actionbar',
            'sky.modal',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_, _$window_, _$animate_, _bbMediaBreakpoints_, _bbModal_) {
            $scope = _$rootScope_;
            $compile = _$compile_;
            $timeout = _$timeout_;
            $document = _$document_;
            $animate = _$animate_;
            $window = _$window_;
            bbModal = _bbModal_;
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

        function getHideToggle(el) {
            return el.find('.bb-summary-actionbar-summary .bb-summary-actionbar-details-collapse .btn.bb-btn-secondary');
        }

        function getShowToggle(el) {
            return el.find('.bb-summary-actionbar .bb-summary-actionbar-details-expand .btn.bb-btn-secondary');
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
            
            $scope.summaryCtrl.primaryDisabled = true;
            $scope.summaryCtrl.secondaryDisabled = true;
            $scope.summaryCtrl.cancelDisabled = true;

            actionbarEl = initActionbar(actionbar2SecondaryHtml);

            primaryButtonEl = getPrimaryActionButton(actionbarEl);
            expect(primaryButtonEl.length).toBe(1);
            expect(primaryButtonEl).toHaveText('Primary action');
            expect(primaryButtonEl).toBeDisabled();
            primaryButtonEl.click();
            $scope.$digest();

            $scope.summaryCtrl.primaryDisabled = false;
            $scope.$digest();

            expect(primaryButtonEl).not.toBeDisabled();
            primaryButtonEl.click();
            $scope.$digest();
            expect(primaryClicked).toBe(true);

            secondaryButtonEl = getSecondaryButtonsExpanded(actionbarEl);
            expect(secondaryButtonEl.length).toBe(2);
            expect(secondaryButtonEl.eq(0)).toHaveText('Secondary action');
            expect(secondaryButtonEl.eq(1)).toHaveText('Secondary action 2');
            expect(secondaryButtonEl.eq(0)).toBeVisible();
            expect(secondaryButtonEl.eq(1)).toBeVisible();

            expect(secondaryButtonEl.eq(0)).toBeDisabled();

            secondaryButtonEl.eq(0).click(); 
            $scope.$digest();

            $scope.summaryCtrl.secondaryDisabled = false;
            $scope.$digest();

            expect(secondaryButtonEl.eq(0)).not.toBeDisabled();
            secondaryButtonEl.eq(0).click();
            $scope.$digest();
            expect(secondary1Clicked).toBe(true);

            secondaryButtonEl.eq(1).click(); 
            $scope.$digest();
            expect(secondary2Clicked).toBe(true);

            cancelButtonEl = getCancelButton(actionbarEl);
            expect(cancelButtonEl.length).toBe(1);
            expect(cancelButtonEl).toHaveText('Cancel');
            expect(cancelButtonEl).toBeDisabled();
            cancelButtonEl.click();
            $scope.$digest();

            $scope.summaryCtrl.cancelDisabled = false;
            $scope.$digest();

            expect(cancelButtonEl).not.toBeDisabled();
            cancelButtonEl.click();
            $scope.$digest();
            expect(cancelClicked).toBe(true);

            summaryEl = getSummary(actionbarEl);
            expect(summaryEl.find('.bb-test-summary')).toHaveText('My Content');
            expect(summaryEl.find('.bb-test-summary')).toBeVisible();

            actionbarEl.remove();

        });

        it('should not show the summary section if there is no content', function () {
            var summaryEl,
                actionbarEl;

            actionbarEl = initActionbar(actionbar4SecondaryHtml);

            summaryEl = getSummary(actionbarEl);
            expect(summaryEl).not.toBeVisible();

            actionbarEl.remove();

        });

        it('should not show the summary section if it is not provided', function () {
            var summaryEl,
                actionbarEl;

            actionbarEl = initActionbar(actionbar5SecondaryHtml);

            summaryEl = getSummary(actionbarEl);
            expect(summaryEl).not.toBeVisible();

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

        function changeBreakpoint(isSmall, breakpointCallbacks) {
            var i;
            for (i = 0; i < breakpointCallbacks.length; i++) {
                breakpointCallbacks[i]({xs: isSmall});
            }
            $scope.$digest();
        }

        it('should have actions collapse into a dropdown when on a small screen', function () {
            var actionbarEl,
                breakpointCallbacks = [];

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                breakpointCallbacks.push(callback);
            });

            actionbarEl = initActionbar(actionbar2SecondaryHtml);

            changeBreakpoint(true, breakpointCallbacks);

            verifySecondaryActions(actionbarEl, true, 2);

            changeBreakpoint(false, breakpointCallbacks);

            verifySecondaryActions(actionbarEl, false, 2);

            actionbarEl.remove();
        });

        function verifyMarginBodyHeight(el) {
            var summaryHeight = el.find('.bb-summary-actionbar').outerHeight(),
                bodyEl = $('body');

            summaryHeight = summaryHeight.toString() + 'px';
            expect(bodyEl).toHaveCss({'margin-bottom': summaryHeight});
        }

        function verifySummaryStateHidden(isHidden, el, isModal) {
            var hideEl = getHideToggle(el),
                showEl = getShowToggle(el),
                summaryEl = getSummary(el);

            if (isHidden) {
                expect(hideEl).not.toBeVisible();
                expect(summaryEl).not.toBeVisible();
                expect(showEl).toBeVisible();
            } else {
                expect(hideEl).toBeVisible();
                expect(summaryEl).toBeVisible();
                expect(showEl).not.toBeVisible();
            }
            
            if (!isModal) {
                verifyMarginBodyHeight(el);
            }
            
        }

        function getModalBodyMaxHeight() {
            return parseInt($('.modal-body').css('max-height'), 10);
        }

        function timeoutFlushIfAvailable() {
            try {
                $timeout.verifyNoPendingTasks();
            } catch (aException) {
                $timeout.flush();
            }
        }

        function toggleSummaryHide(show, el, noTimeout) {
            var hideEl = getHideToggle(el),
                showEl = getShowToggle(el);

            if (show) {
                showEl.click();
            } else {
                hideEl.click();
            }

            $scope.$digest();
            if (!noTimeout) {
                $timeout.flush();
            }
            
        }

        it('should show the expanded summary when on a small screen and allow toggle of hide and show', function () {
            var actionbarEl,
                breakpointCallbacks = [],
                summaryEl,
                hideEl,
                showEl;

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                breakpointCallbacks.push(callback);
            });

            actionbarEl = initActionbar(actionbar2SecondaryHtml);

            //expect no toggle buttons to exist
            hideEl = getHideToggle(actionbarEl);
            
            showEl = getShowToggle(actionbarEl);
            expect(showEl).not.toBeVisible();
            expect(hideEl).not.toBeVisible();

            //change to xs mode
            changeBreakpoint(true, breakpointCallbacks);

            //expect collapse toggle to exist and summary to be visible
            expect(actionbarEl.find('.bb-summary-actionbar')).toHaveClass('bb-summary-actionbar-summary-collapsed');
            expect(hideEl).toBeVisible();
            summaryEl = getSummary(actionbarEl);
            expect(summaryEl).toBeVisible();
            expect(showEl).not.toBeVisible();

            toggleSummaryHide(false, actionbarEl);

            verifySummaryStateHidden(true, actionbarEl);

            
            toggleSummaryHide(true, actionbarEl);

            verifySummaryStateHidden(false, actionbarEl);

            changeBreakpoint(false, breakpointCallbacks);

            expect(showEl).not.toBeVisible();
            expect(hideEl).not.toBeVisible();
            expect(summaryEl).toBeVisible();
            expect(actionbarEl.find('.bb-summary-actionbar')).not.toHaveClass('bb-summary-actionbar-summary-collapsed');

            actionbarEl.remove();
        });

        it('should adjust the margin on the document when window resizes', function () {
            var actionbarEl,
                windowEl; 
            
            timeoutFlushIfAvailable(); 

            actionbarEl = initActionbar(actionbar2SecondaryHtml);
            windowEl = angular.element($window);
            
            $timeout.flush();

            verifyMarginBodyHeight(actionbarEl);

            actionbarEl.find('.bb-summary-actionbar').outerHeight(600);

            windowEl.resize();
            $scope.$digest();
            $timeout.flush();

            verifyMarginBodyHeight(actionbarEl);

            actionbarEl.remove();
        });

        it('should adjust the margin on the document as the summary height changes', function () {
            var actionbarEl; 
            
            timeoutFlushIfAvailable(); 

            actionbarEl = initActionbar(actionbar2SecondaryHtml);
            
            $timeout.flush();

            verifyMarginBodyHeight(actionbarEl);

            actionbarEl.find('.bb-summary-actionbar').outerHeight(600);
            $scope.$digest();
            $timeout.flush();

            verifyMarginBodyHeight(actionbarEl);

            actionbarEl.remove();
        });

        describe('modal', function () {

            
            var modalSummaryActionbarHtml = '<bb-modal><bb-modal-header>Heyo</bb-modal-header><div bb-modal-body></div><bb-modal-footer>' + actionbar2SecondaryHtml + '</bb-modal-footer></bb-modal>';
            
            function closeModalInstance(modalInstance) {
                modalInstance.close();
                $scope.$digest();
                $animate.flush();
                $scope.$digest();
                $animate.flush();
                $scope.$digest();
            }
            
            it('should set modal styles and call fit to window when in a modal', function () {
                var modalInstance = bbModal.open(
                {
                    template: modalSummaryActionbarHtml
                });
                $scope.$digest();
                $animate.flush();

                $timeout.flush();

                //modal footer has class
                expect($('.modal-footer')).toHaveClass('bb-modal-footer-summary-actionbar-container');

                closeModalInstance(modalInstance);
            });

            function getModalBodyMinHeight() {
                return parseInt($('.modal-body').css('min-height'), 10);
            }

            describe('no full page', function () {
                it('should animate the modal body and fit to window when expanding and collapsing the summary', function () {
                    var actionbarEl,
                        bodyMaxHeight,
                        summaryHeight,
                        modalInstance;
                        
                    modalInstance = bbModal.open(
                        {
                            template: modalSummaryActionbarHtml
                        });

                    $scope.$digest();
                    $animate.flush();

                    timeoutFlushIfAvailable();
                    actionbarEl = $('bb-summary-actionbar');

                    expect(actionbarEl.find('.bb-summary-actionbar')).toHaveClass('bb-summary-actionbar-summary-collapsed');

                    verifySummaryStateHidden(false, actionbarEl, true);

                    bodyMaxHeight = getModalBodyMaxHeight();
                    summaryHeight = actionbarEl.find('.bb-summary-actionbar-summary').outerHeight();
                    //hide actionbar
                    toggleSummaryHide(false, actionbarEl, true);
                    expect(getModalBodyMaxHeight()).toBe(bodyMaxHeight + summaryHeight);
                    $timeout.flush();
                    verifySummaryStateHidden(true, actionbarEl, true);

                    bodyMaxHeight = getModalBodyMaxHeight();
                    //show actionbar
                    toggleSummaryHide(true, actionbarEl, true);
                    expect(getModalBodyMaxHeight()).toBe(bodyMaxHeight - summaryHeight);
                    $timeout.flush();
                    verifySummaryStateHidden(false, actionbarEl, true);
                    closeModalInstance(modalInstance);
                }); 
            });

            describe('full page', function () {
                it('should set modal body styles on hiding summary', function () {
                    var actionbarEl,
                        bodyMinHeight,
                        summaryHeight,
                        showEl,
                        hideEl,
                        summaryEl,
                        modalInstance,
                        breakpointCallbacks = [];

                    timeoutFlushIfAvailable();
                        
                    spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                        breakpointCallbacks.push(callback);
                    });    
                    modalInstance = bbModal.open(
                        {
                            template: modalSummaryActionbarHtml
                        },
                        {
                            fullPage: true
                        });

                    $scope.$digest();
                    $animate.flush();

                    timeoutFlushIfAvailable();

                    $scope.$digest();
                    actionbarEl = $('bb-summary-actionbar');

                    //expect large screen mode

                    showEl = getShowToggle(actionbarEl);
                    hideEl = getHideToggle(actionbarEl);
                    summaryEl = getSummary(actionbarEl);

                    expect(showEl).not.toBeVisible();
                    expect(hideEl).not.toBeVisible();
                    expect(summaryEl).toBeVisible();
                    expect(actionbarEl.find('.bb-summary-actionbar')).not.toHaveClass('bb-summary-actionbar-summary-collapsed');

                    //small breakpoint trigger
                    changeBreakpoint(true, breakpointCallbacks);
                    $scope.$digest();
                    timeoutFlushIfAvailable();

                    expect(actionbarEl.find('.bb-summary-actionbar')).toHaveClass('bb-summary-actionbar-summary-collapsed');
                    verifySummaryStateHidden(false, actionbarEl, true);
                    summaryHeight = actionbarEl.find('.bb-summary-actionbar-summary').outerHeight();
                    
                    //hide
                    toggleSummaryHide(false, actionbarEl);
                    verifySummaryStateHidden(true, actionbarEl, true);
                    bodyMinHeight = getModalBodyMinHeight();

                    //show 
                    toggleSummaryHide(true, actionbarEl);
                    verifySummaryStateHidden(false, actionbarEl, true);
                    expect(getModalBodyMinHeight()).toBe(bodyMinHeight - summaryHeight);

                    bodyMinHeight = getModalBodyMinHeight();
                    toggleSummaryHide(false, actionbarEl);
                    verifySummaryStateHidden(true, actionbarEl, true);
                    expect(getModalBodyMinHeight()).toBe(bodyMinHeight + summaryHeight);

                    closeModalInstance(modalInstance);
                });

            });

            
        });
    });
})();
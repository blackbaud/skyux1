/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Search component', function () {
        var $compile,
            $scope,
            $document,
            bbMediaBreakpoints,
            noContainerHtml =  '<bb-search-input ' +
                'bb-search-text="searchCtrl.searchText" ' +
                'bb-on-search="searchCtrl.applySearchText(searchText)"> ' +
            '</bb-search-input>',
            searchHtml = '<div><div bb-search-container>' +
                '<div class="bb-test-other-item">Another Item</div>' +
                noContainerHtml +
            '</bb-search-input>' +
            '</div></div>',
            fxOff;

        beforeEach(module(
            'sky.search',
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

        function initSearch(template) {
            var searchEl = $compile(template)($scope);
            $document.find('body').append(searchEl);
            $scope.$digest();
            return searchEl;
        }

        function findSearchInput(el) {
            return el.find('.bb-search-input');
        }

        function findSearchButton(el) {
            return el.find('.bb-search-btn-apply');
        }

        function findSearchOpen(el) {
            return el.find('.bb-search-btn-open');
        }

        function findDismissButton(el) {
            return el.find('.bb-search-btn-dismiss');
        }

        function findClearButton(el) {
            return el.find('.bb-search-btn-clear');
        }

        function findContainerEl(el) {
            return el.find('.bb-search-input-component-container');
        }

        function findOpenButtonWrapper(el) {
            return el.find('.bb-search-open-wrapper'); 
        }

        function findInputContainerEl(el) {
            return el.find('.bb-search-input-container');
        }

        function triggerEnterKeyup(el) {
            var e,
                inputEl;
            inputEl = findSearchInput(el);
            e = $.Event('keyup');
            e.which = 13;
            e.keyCode = 13;
            inputEl.trigger(e);
            $scope.$digest();
                
        }

        function changeInput(el, val) {
            var inputEl;
            inputEl = findSearchInput(el);
            inputEl.val(val);
            inputEl.trigger('change');
            $scope.$digest();
        }

        function verifySmallScreenDismissable(openButtonEl, inputContainerEl, dismissEl, componentContainerEl, isVisible) {
            if (isVisible) {
                expect(componentContainerEl).toHaveClass('bb-search-input-component-container-hidden');
                expect(openButtonEl).toHaveClass('bb-search-open-hidden');
                expect(inputContainerEl).not.toHaveClass('bb-search-input-container-hidden');
                expect(dismissEl).toBeVisible();
            } else {
                expect(componentContainerEl).not.toHaveClass('bb-search-input-component-container-hidden');
                expect(openButtonEl).not.toHaveClass('bb-search-open-hidden');
                expect(inputContainerEl).toHaveClass('bb-search-input-container-hidden');
                expect(dismissEl).not.toBeVisible();
            }
            
        }

        function verifyLargeScreenDismissable(openButtonEl, inputContainerEl, dismissEl, componentContainerEl) {
            expect(openButtonEl).not.toBeVisible();
            expect(inputContainerEl).not.toHaveClass('bb-search-input-container-hidden');
            expect(dismissEl).not.toBeVisible();
            expect(componentContainerEl).not.toHaveClass('bb-search-input-component-container-hidden');
        }

        it('creates an input that will execute a callback on enter press or search button click', function () {
            var actualSearchText,
                searchEl,
                searchButtonEl;
            
            $scope.searchCtrl = {
                applySearchText: function (searchText) {
                    actualSearchText = searchText;
                }
            };

            searchEl = initSearch(searchHtml);

            changeInput(searchEl, 'myText');

            expect(angular.isUndefined(actualSearchText)).toBe(true);

            searchButtonEl = findSearchButton(searchEl);
            searchButtonEl.click();
            $scope.$digest();
            expect(actualSearchText).toBe('myText');

            changeInput(searchEl, 'yourText');
            triggerEnterKeyup(searchEl);
            expect(actualSearchText).toBe('yourText');

            searchEl.remove();

        });

        it('can change the search text in the input using bb-search-text binding', function () {
            var inputEl,
                searchEl;
            
            $scope.searchCtrl = {
                searchText: 'myText'
            };

            searchEl = initSearch(searchHtml);

            inputEl = findSearchInput(searchEl);
            expect(inputEl).toHaveValue('myText');

            $scope.searchCtrl.searchText = 'yourText';
            $scope.$digest();
            expect(inputEl).toHaveValue('yourText');

            $scope.searchCtrl.searchText = '';
            $scope.$digest();
            expect(inputEl).toHaveValue('');

            changeInput(searchEl, 'myText');

            searchEl.remove();
        });

        it('will create a dismissable search input on mobile breakpoints that will toggle input shown', function () {
            var searchCallback,
                searchEl,
                inputEl,
                inputContainerEl,
                openButtonEl,
                openButtonWrapperEl,
                dismissEl,
                containerEl;
            
            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                searchCallback = callback;
            });

            searchEl = initSearch(searchHtml);

            searchCallback({xs: true});
            $scope.$digest();

            openButtonEl = findSearchOpen(searchEl);
            inputEl = findSearchInput(searchEl);
            dismissEl = findDismissButton(searchEl);
            containerEl = findContainerEl(searchEl);
            inputContainerEl = findInputContainerEl(searchEl);
            openButtonWrapperEl = findOpenButtonWrapper(searchEl);

            verifySmallScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl,  false);

            openButtonEl.click();
            $scope.$digest();
            
            verifySmallScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl, true);
            expect(inputEl).toBeFocused();

            dismissEl.click();
            $scope.$digest();

            verifySmallScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl, false);

            inputEl.blur();
            searchCallback({xs: false});
            $scope.$digest();

            verifyLargeScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl);
            expect(inputEl).not.toBeFocused();

            searchCallback({xs: true});
            $scope.$digest();
            

            verifySmallScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl, false);
            
            searchEl.remove();

        });

        it('does not error on toggling input shown if container is not specified', function () {
            var searchEl,
                searchCallback,
                dismissEl,
                openButtonEl;

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                searchCallback = callback;
            });

            searchEl = initSearch(noContainerHtml);

            searchCallback({xs: true});
            $scope.$digest();

            openButtonEl = findSearchOpen(searchEl);
            dismissEl = findDismissButton(searchEl);

            openButtonEl.click();
            $scope.$digest();

            dismissEl.click();
            $scope.$digest();

            searchEl.remove();

        });

        it('can clear search text after it is applied using the clear search button', function () {
            var actualSearchText,
                searchEl,
                searchButtonEl,
                inputEl,
                clearButtonEl;
            
            $scope.searchCtrl = {
                applySearchText: function (searchText) {
                    actualSearchText = searchText;
                }
            };

            searchEl = initSearch(searchHtml);

            changeInput(searchEl, 'myText');

            searchButtonEl = findSearchButton(searchEl);
            clearButtonEl = findClearButton(searchEl);
            inputEl = findSearchInput(searchEl);
            expect(clearButtonEl).not.toBeVisible();

            searchButtonEl.click();
            $scope.$digest();
            
            expect(clearButtonEl).toBeVisible();
            expect(searchButtonEl).toBeVisible();

            clearButtonEl.click();
            $scope.$digest();
            expect(actualSearchText).toBe('');
            expect(clearButtonEl).not.toBeVisible();
            expect(searchButtonEl).toBeVisible();
            expect(inputEl).toBeFocused();

            changeInput(searchEl, 'anotherText');
            searchButtonEl.click();
            changeInput(searchEl, '');
            searchButtonEl.click();
            expect(clearButtonEl).not.toBeVisible();
            expect(searchButtonEl).toBeVisible();

            searchEl.remove();
        });

        it('shows the clear button, and on xs breakpoints shows the dismissable input on init and binding changes', function () {
            var inputEl,
                searchEl,
                searchButtonEl,
                openButtonEl,
                openButtonWrapperEl,
                dismissEl,
                containerEl,
                clearButtonEl,
                inputContainerEl,
                searchCallback;
            
            $scope.searchCtrl = {
                searchText: 'myText'
            };

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                searchCallback = callback;
                searchCallback({xs: true});
            });

            searchEl = initSearch(searchHtml);

            openButtonEl = findSearchOpen(searchEl);
            inputEl = findSearchInput(searchEl);
            dismissEl = findDismissButton(searchEl);
            clearButtonEl = findClearButton(searchEl);
            searchButtonEl = findSearchButton(searchEl);
            containerEl = findContainerEl(searchEl);
            inputContainerEl = findInputContainerEl(searchEl);
            openButtonWrapperEl = findOpenButtonWrapper(searchEl);

            verifySmallScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl,  true);
            expect(clearButtonEl).toBeVisible();
            expect(searchButtonEl).toBeVisible();

            clearButtonEl.click();
            $scope.$digest();
            dismissEl.click();
            $scope.$digest();

            $scope.searchCtrl.searchText = 'yourText';
            $scope.$digest();

            verifySmallScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl,  true);
            expect(clearButtonEl).toBeVisible();
            expect(searchButtonEl).toBeVisible();
            expect(inputEl).toBeFocused();

            searchCallback({xs: false});
            $scope.$digest();
            $scope.searchCtrl.searchText = 'aText';
            $scope.$digest();


            verifyLargeScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl);
            expect(clearButtonEl).toBeVisible();
            expect(searchButtonEl).toBeVisible();

            searchEl.remove();
        });

        it('adds and removes the appropriate class on focus', function () {
            var searchEl,
                inputContainerEl,
                inputEl;

            searchEl = initSearch(searchHtml);

            inputEl = findSearchInput(searchEl);
            inputContainerEl = findInputContainerEl(searchEl);
            inputEl.focus();
            inputEl.triggerHandler('focus');
            $scope.$digest();

            expect(inputEl).toBeFocused();

            inputContainerEl = findInputContainerEl(searchEl);

            expect(inputContainerEl).toHaveClass('bb-search-input-focused');

            inputEl.blur();
            inputEl.triggerHandler('blur');
            $scope.$digest();

            inputContainerEl = findInputContainerEl(searchEl);

            expect(inputContainerEl).not.toHaveClass('bb-search-input-focused');

            searchEl.remove();

        });
    });
})();
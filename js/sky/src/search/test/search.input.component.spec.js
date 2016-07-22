/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Search component', function () {
        var $compile,
            $scope,
            $document,
            bbMediaBreakpoints,
            searchHtml = '<div bb-search-container>' +
                '<div class="bb-test-other-item"></div>' +
                '<bb-search-input ' +
                'bb-search-text="searchCtrl.searchText" ' +
                'bb-on-search="searchCtrl.applySearchText(searchText)" ' +
                'bb-on-search-input-toggled="searchCtrl.searchInputToggled(isVisible)"> ' +
            '</bb-search-input>' +
            '</div>';

        beforeEach(module(
            'sky.search',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _bbMediaBreakpoints_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
            bbMediaBreakpoints = _bbMediaBreakpoints_;
        }));

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
            return el.find('.bb-search-open');
        }

        function findDismissButton(el) {
            return el.find('.bb-search-btn-dismiss');
        }

        function findClearButton(el) {
            return el.find('.bb-search-btn-clear');
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

        function verifySmallScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible, isVisible) {
            if (isVisible) {
                expect(openButtonEl).not.toBeVisible();
                expect(inputEl).toBeVisible();
                expect(dismissEl).toBeVisible();
            } else {
                expect(openButtonEl).toBeVisible();
                expect(inputEl).not.toBeVisible();
                expect(dismissEl).not.toBeVisible();
            }
            expect(dismissableInputVisible).toBe(isVisible);
            
        }

        function verifyLargeScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible) {
            expect(openButtonEl).not.toBeVisible();
            expect(inputEl).toBeVisible();
            expect(dismissEl).not.toBeVisible();
            expect(dismissableInputVisible).toBe(false);
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

        it('will create a dismissable search input on mobile breakpoints that will execute a callback on dismiss toggle', function () {
            var searchCallback,
                searchEl,
                inputEl,
                openButtonEl,
                dismissEl,
                dismissableInputVisible;

            $scope.searchCtrl = {
                searchInputToggled: function (isVisible) {
                    dismissableInputVisible = isVisible;
                }
            };
            
            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                searchCallback = callback;
            });

            searchEl = initSearch(searchHtml);

            searchCallback({xs: true});
            $scope.$digest();

            openButtonEl = findSearchOpen(searchEl);
            inputEl = findSearchInput(searchEl);
            dismissEl = findDismissButton(searchEl);

            verifySmallScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible,  false);


            openButtonEl.click();
            $scope.$digest();
            
            verifySmallScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible, true);

            dismissEl.click();
            $scope.$digest();

            verifySmallScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible, false);

            searchCallback({xs: false});
            $scope.$digest();

            verifyLargeScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible);

            searchCallback({xs: true});
            $scope.$digest();

            verifySmallScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible, false);
            
            searchEl.remove();

        });

        it('can clear search text after it is applied using the clear search button', function () {
            var actualSearchText,
                searchEl,
                searchButtonEl,
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
                dismissEl,
                dismissableInputVisible,
                clearButtonEl,
                searchCallback;
            
            $scope.searchCtrl = {
                searchText: 'myText',
                searchInputToggled: function (isVisible) {
                    dismissableInputVisible = isVisible;
                }
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

            verifySmallScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible,  true);
            expect(clearButtonEl).toBeVisible();
            expect(searchButtonEl).toBeVisible();

            clearButtonEl.click();
            $scope.$digest();
            dismissEl.click();
            $scope.$digest();

            $scope.searchCtrl.searchText = 'yourText';
            $scope.$digest();

            verifySmallScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible,  true);
            expect(clearButtonEl).toBeVisible();
            expect(searchButtonEl).toBeVisible();

            searchCallback({xs: false});
            $scope.$digest();
            $scope.searchCtrl.searchText = 'aText';
            $scope.$digest();

            verifyLargeScreenDismissable(openButtonEl, inputEl, dismissEl, dismissableInputVisible);
            expect(clearButtonEl).toBeVisible();
            expect(searchButtonEl).toBeVisible();

            searchEl.remove();
        });

        it('does not explode when bbOnSearchToggled is not defined', function () {
            var searchEl,
                searchCallback,
                dismissEl;

            $scope.searchCtrl = {
                searchText: 'myText'
            };

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (callback) {
                searchCallback = callback;
                searchCallback({xs: true});
            });
            
            searchHtml = '<bb-search-input ' +
                'bb-search-text="searchCtrl.searchText" ' +
                'bb-on-search="searchCtrl.applySearchText(searchText)" ' +
            '</bb-search-input>';

            searchEl = initSearch(searchHtml);

            dismissEl = findDismissButton(searchEl);
            dismissEl.click();
            $scope.$digest();

            $scope.searchCtrl.applySearchText = function () {
                angular.noop();
            };
            $scope.$digest();

        });
    });
})();
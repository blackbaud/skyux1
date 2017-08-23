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

        it('can call a change function when the user types in the input', function () {
            var newText,
                searchEl;

            $scope.searchCtrl = {
                searchChanged: function (searchText) {
                    newText = searchText;
                }
            };

            searchEl = initSearch('<div><div bb-search-container>' +
                '<div class="bb-test-other-item">Another Item</div>' +
                '<bb-search-input ' +
                'bb-search-text="searchCtrl.searchText" ' +
                'bb-on-search="searchCtrl.applySearchText(searchText)" ' +
                'bb-on-search-text-changed="searchCtrl.searchChanged(searchText)"> ' +
            '</bb-search-input>' +
            '</bb-search-input>' +
            '</div></div>');

            changeInput(searchEl, 'new value');
            expect(newText).toBe('new value');
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

        it('does not register the mobile-dismiss-input callback is bb-search-mobile-response-enabled is false', function () {
            var searchEl,
                inputEl,
                inputContainerEl,
                openButtonWrapperEl,
                dismissEl,
                containerEl,
                nonDismissableHtml = '<bb-search-input bb-search-mobile-response-enabled="false"></bb-search-input>';

            spyOn(bbMediaBreakpoints, 'register');

            searchEl = initSearch(nonDismissableHtml);
            $scope.$digest();

            inputEl = findSearchInput(searchEl);
            dismissEl = findDismissButton(searchEl);
            containerEl = findContainerEl(searchEl);
            inputContainerEl = findInputContainerEl(searchEl);
            openButtonWrapperEl = findOpenButtonWrapper(searchEl);

            expect(bbMediaBreakpoints.register).not.toHaveBeenCalled();

            $scope.currentBreakpoint = { xs: true };
            $scope.$digest();

            verifyLargeScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl);

            $scope.currentBreakpoint = { xs: false };
            $scope.$digest();

            verifyLargeScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl);
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

            $scope.searchCtrl.searchText = '';
            $scope.$digest();

            verifySmallScreenDismissable(openButtonWrapperEl, inputContainerEl, dismissEl, containerEl,  true);
            expect(clearButtonEl).not.toBeVisible();
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

        describe('id', function () {
            it('should have no id when not specified', function () {
                var searchEl,
                    inputEl;

                searchEl = initSearch(searchHtml);

                inputEl = findSearchInput(searchEl);

                expect(inputEl).not.toHaveAttr('id');

                searchEl.remove();
            });

            it('should have an id when specified', function () {
                var searchEl,
                    inputEl,
                    placeholderHtml = '<bb-search-input ' +
                    'bb-search-input-id="\'myid\'" ' +
                    'bb-on-search="searchCtrl.applySearchText(searchText)"> ' +
                '</bb-search-input>';

                searchEl = initSearch(placeholderHtml);

                inputEl = findSearchInput(searchEl);

                expect(inputEl).toHaveAttr('id', 'myid');

                searchEl.remove();
            });
        });

        describe('full width', function () {
            it('should not have the full width class when not specified', function () {
                var searchEl;

                searchEl = initSearch(searchHtml);

                expect(searchEl.find('.bb-search-input-inline')).not.toHaveClass('bb-search-full-width');

                searchEl.remove();
            });

            it('should have the full width class when specified', function () {
                var searchEl,
                    placeholderHtml = '<bb-search-input ' +
                    'bb-search-full-width="true" ' +
                    'bb-on-search="searchCtrl.applySearchText(searchText)"> ' +
                '</bb-search-input>';

                searchEl = initSearch(placeholderHtml);

                expect(searchEl.find('.bb-search-input-inline')).toHaveClass('bb-search-full-width');

                searchEl.remove();
            });
        });

        describe('placeholder text', function () {
            it('has no placeholder text when bbSearchPlaceholder is undefined', function () {
                var searchEl,
                    inputEl;

                searchEl = initSearch(searchHtml);

                inputEl = findSearchInput(searchEl);

                expect(inputEl).not.toHaveAttr('placeholder');

                searchEl.remove();
            });

            it('has predefined placeholder text when bbSearchPlaceholder is defined', function () {
                var searchEl,
                    inputEl,
                    placeholderHtml = '<bb-search-input ' +
                    'bb-search-placeholder ' +
                    'bb-on-search="searchCtrl.applySearchText(searchText)"> ' +
                '</bb-search-input>';

                searchEl = initSearch(placeholderHtml);

                inputEl = findSearchInput(searchEl);

                expect(inputEl).toHaveAttr('placeholder', 'Find in this list');

                searchEl.remove();
            });

            it('has predefined placeholder text when bbSearchPlaceholder is present but undefined', function () {
                var searchEl,
                    inputEl,
                    placeholderHtml = '<bb-search-input ' +
                    'bb-search-placeholder="searchCtrl.placeholder" ' +
                    'bb-on-search="searchCtrl.applySearchText(searchText)"> ' +
                '</bb-search-input>';

                searchEl = initSearch(placeholderHtml);

                inputEl = findSearchInput(searchEl);

                expect(inputEl).toHaveAttr('placeholder', 'Find in this list');

                searchEl.remove();
            });

            it('changes placeholder text when binding changes', function () {
                var searchEl,
                    inputEl,
                    placeholderHtml = '<bb-search-input ' +
                    'bb-search-placeholder="searchCtrl.placeholder" ' +
                    'bb-on-search="searchCtrl.applySearchText(searchText)"> ' +
                '</bb-search-input>';

                $scope.searchCtrl = {

                };

                searchEl = initSearch(placeholderHtml);

                inputEl = findSearchInput(searchEl);

                expect(inputEl).toHaveAttr('placeholder', 'Find in this list');

                $scope.searchCtrl.placeholder = undefined;
                $scope.$digest();
                expect(inputEl).toHaveAttr('placeholder', 'Find in this list');

                $scope.searchCtrl.placeholder = 'New text';
                $scope.$digest();
                expect(inputEl).toHaveAttr('placeholder', 'New text');

                searchEl.remove();
            });

            it('has user defined placeholder text when bbSearchPlaceholder has a string', function () {
                var searchEl,
                    inputEl,
                    placeholderHtml = '<bb-search-input ' +
                    'bb-search-placeholder="searchCtrl.placeholder" ' +
                    'bb-on-search="searchCtrl.applySearchText(searchText)"> ' +
                '</bb-search-input>';

                $scope.searchCtrl = {
                    placeholder: 'Search'
                };

                searchEl = initSearch(placeholderHtml);

                inputEl = findSearchInput(searchEl);

                expect(inputEl).toHaveAttr('placeholder', 'Search');
                searchEl.remove();
            });
        });

        describe('apply search text event', function () {
            it('should apply current search text when searchText is not defined in the event', function () {
                var actualSearchText,
                searchEl,
                clearButtonEl;

                $scope.searchCtrl = {
                    applySearchText: function (searchText) {
                        actualSearchText = searchText;
                    }
                };

                searchEl = initSearch(searchHtml);

                changeInput(searchEl, 'myText');

                expect(angular.isUndefined(actualSearchText)).toBe(true);
                clearButtonEl = findClearButton(searchEl);
                expect(clearButtonEl).not.toBeVisible();

                $scope.$broadcast('bbSearchInputApply');
                $scope.$digest();

                expect(actualSearchText).toBe('myText');
                expect(clearButtonEl).toBeVisible();

                searchEl.remove();
            });

            it('should apply given search text when searchText is defined in the event', function () {
                var actualSearchText,
                searchEl,
                clearButtonEl;

                $scope.searchCtrl = {
                    applySearchText: function (searchText) {
                        actualSearchText = searchText;
                    }
                };

                searchEl = initSearch(searchHtml);

                changeInput(searchEl, 'myText');

                expect(angular.isUndefined(actualSearchText)).toBe(true);
                clearButtonEl = findClearButton(searchEl);
                expect(clearButtonEl).not.toBeVisible();

                $scope.$broadcast('bbSearchInputApply', 'new text');
                $scope.$digest();

                expect(actualSearchText).toBe('new text');
                expect(clearButtonEl).toBeVisible();

                searchEl.remove();
            });
        });
    });
})();

/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Listbuilder toolbar', function () {
        var $compile,
            $scope,
            simpleCardContentHtml = '<bb-listbuilder-content>' +
                    '<bb-listbuilder-cards>' +
                    '<bb-card>' +
                    '<bb-card-title>' +
                    'First' +
                    '</bb-card-title>' +
                    '<bb-card-content>' +
                    'First Content' +
                    '</bb-card-content>' +
                    '</bb-card>' +
                    '</bb-listbuilder-cards>' +
                    '</bb-listbuilder-content>';

        beforeEach(module(
            'sky.listbuilder',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
        }));
        
        
        describe('search', function () {
            var $document,
                $timeout,
                searchHtml,
                localSearchText,
                listCtrl = {
                    onSearch: function (searchText, highlightResults) {
                        localSearchText = searchText;
                        highlightResults();
                    }
                };
            
            beforeEach(inject(function (_$document_, _$timeout_) {
                $document = _$document_;
                $timeout = _$timeout_;
                searchHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText, highlightResults)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText">' +
                    '</bb-listbuilder-toolbar>' +
                    simpleCardContentHtml +
                    '</bb-listbuilder>');
                
            }));

            function findSearchInput(el) {
                return el.find('.bb-listbuilder-search-input');
            }

            function findSearchButton(el) {
                return el.find('.bb-listbuilder-search-button button');
            }

            function initListbuilderTest() {
                var el;
                el = $compile(searchHtml)($scope);

                $document.find('body').append(el);

                $scope.$digest();

                return el;
            }

            function changeInput(el, val) {
                var inputEl;
                inputEl = findSearchInput(el);
                inputEl.val(val);
                inputEl.trigger('change');
                $scope.$digest();
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

            function verifyCardTitleHighlight(el) {
                expect(el.find('bb-card-title span')).toHaveClass('highlight');
            }

            function verifySearchResults(el, val) {
                expect(localSearchText).toBe(val);

                $timeout.flush();
                verifyCardTitleHighlight(el);
            }

            function verifyInputBinding(el, val) {
                var inputEl;

                inputEl = findSearchInput(el);
                expect(inputEl).toHaveValue(val);
            }

            it('selects the input, calls the search callback, and resolves highlight promise on input enter', function () {
                var el;

                $scope.listCtrl = listCtrl;

                el = initListbuilderTest();

                changeInput(el, 'First');
                triggerEnterKeyup(el);
                
                verifySearchResults(el, 'First');
                
                el.remove();

            });

            it('selects the input, calls the search callback, and resolves highlight promise on search button click', function () {
                var el,
                    searchButtonEl;

                $scope.listCtrl = listCtrl;

                el = initListbuilderTest();
                changeInput(el, 'First');

                searchButtonEl = findSearchButton(el);
                searchButtonEl.click();
                $scope.$digest();

                verifySearchResults(el, 'First');
                el.remove();
            });

            it('watches changes to search text binding to apply to input and highlight', function () {
                var el;
                
                $scope.listCtrl = listCtrl;

                el = initListbuilderTest();
                $scope.listCtrl.searchText = 'First';
                $scope.$digest();
                $timeout.flush();
                verifyInputBinding(el, 'First');
                verifyCardTitleHighlight(el);

                el.remove();

            });

            it('applies search text binding to input and highlights on initialization', function () {
                var el;
                
                $scope.listCtrl = listCtrl;
                $scope.listCtrl.searchText = 'First';
                el = initListbuilderTest();
                $scope.$digest();
                $timeout.flush();
                verifyInputBinding(el, 'First');
                verifyCardTitleHighlight(el);

                el.remove();
            });
        });

        describe('viewkeeper', function () {
            var viewKeeperHtml,
                bbViewKeeperBuilder;

            beforeEach(inject(function (_bbViewKeeperBuilder_) {
                bbViewKeeperBuilder = _bbViewKeeperBuilder_;
                viewKeeperHtml = angular.element(
                    '<bb-listbuilder bb-listbuilder-vertical-offset-el-id="\'myoffsetid\'">' +
                    '<bb-listbuilder-toolbar ' + 
                    'bb-listbuilder-toolbar-fixed="{{ctrl.isFixed}}">' +
                    '</bb-listbuilder-toolbar>' +
                    simpleCardContentHtml +
                    '</bb-listbuilder>');
            }));


            it('creates a view keeper on toolbar init', function () {
                var el,
                    spyArgs;

                $scope.ctrl = {
                    isFixed: false
                };

                spyOn(bbViewKeeperBuilder, 'create').and.callThrough();

                el = $compile(viewKeeperHtml)($scope);
                $scope.$digest();

                spyArgs = bbViewKeeperBuilder.create.calls.mostRecent().args[0];
                expect(spyArgs.el).toEqual(el.find('.bb-listbuilder-toolbar'));
                expect(spyArgs.boundaryEl).toEqual(el.find('.bb-listbuilder-content'));
                expect(spyArgs.setWidth).toBe(true);
                expect(spyArgs.verticalOffSetElId).toBe('myoffsetid');

                $scope.$destroy();
            });

            it('will not create a view keeper if fixed is set to true', function () {
                var el;

                $scope.ctrl = {
                    isFixed: true
                };
                spyOn(bbViewKeeperBuilder, 'create').and.callThrough();
                $scope.$digest();

                el = $compile(viewKeeperHtml)($scope);

                expect(bbViewKeeperBuilder.create).not.toHaveBeenCalled();
                $scope.$destroy();
            });

        });
    });
}());

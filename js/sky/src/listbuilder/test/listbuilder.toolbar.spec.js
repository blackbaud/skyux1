/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Listbuilder toolbar', function () {
        
        beforeEach(module(
            'sky.listbuilder',
            'sky.templates'
        ));
        
        
        describe('search', function () {
            var $scope,
                $compile,
                $document,
                $timeout,
                searchHtml,
                localSearchText,
                listCtrl = {
                    onSearch: function (searchText, highlightResults) {
                        localSearchText = searchText;
                        highlightResults();
                    },
                    data: [
                    {
                        name: 'First',
                        content: 'Content 1'
                    },
                    {
                        name: 'Second',
                        content: 'Content 2'
                    }]
                };
            
            beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_) {
                $scope = _$rootScope_.$new();
                $compile = _$compile_;
                $document = _$document_;
                $timeout = _$timeout_;
                searchHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText, highlightResults)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText">' +
                    '</bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-content>' +
                    '<bb-listbuilder-cards>' +
                    '<bb-card ng-repeat="item in listCtrl.data">' +
                    '<bb-card-title>' +
                    '{{item.name}}' +
                    '</bb-card-title>' +
                    '<bb-card-content>' +
                    '{{item.content}}' +
                    '</bb-card-content>' +
                    '</bb-card>' +
                    '</bb-listbuilder-cards>' +
                    '</bb-listbuilder-content>' +
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
    });
}());

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
                searchHtml;
            
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

            it('selects the input, calls the search callback, and resolves highlight promise on input enter', function () {
                var el,
                    localSearchText,
                    inputEl,
                    e;

                $scope.listCtrl = {
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

                el = $compile(searchHtml)($scope);

                $document.find('body').append(el);

                $scope.$digest();

                inputEl = findSearchInput(el);
                inputEl.val('First');
                inputEl.trigger('change');
                e = $.Event('keyup');
                e.which = 13;
                e.keyCode = 13;

                inputEl.trigger(e);
                $scope.$digest();
                expect(localSearchText).toBe('First');

                $timeout.flush();
                expect(el.find('bb-card-title span')).toHaveClass('highlight');
                el.remove();

            });

            it('selects the input, calls the search callback, and resolves highlight promise on search button click', function () {

            });

            it('watches changes to search text binding to apply to input and highlight', function () {

            });

            it('applies search text binding to input and highlights on initialization', function () {

            });
        });
    });
}());

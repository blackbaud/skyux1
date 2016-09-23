/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Listbuilder footer', function () {
        var $compile,
            $scope,
            $document,
            $timeout,
            bbViewKeeperBuilder,
            listbuilderHtml,
            $window;

        beforeEach(module(
            'sky.listbuilder',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_, _bbViewKeeperBuilder_, _$window_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
            $timeout = _$timeout_;
            bbViewKeeperBuilder = _bbViewKeeperBuilder_;
            $window = _$window_;
        }));

        function timeoutFlushIfAvailable() {
            try {
                $timeout.verifyNoPendingTasks();
            } catch (aException) {
                $timeout.flush();
            }
        }

        beforeEach(function () {
            listbuilderHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)"> ' +
                    '</bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-footer bb-listbuilder-on-load-more="listCtrl.onLoadMore()" ' +
                    'bb-listbuilder-show-load-more="listCtrl.showLoadMore">' +
                    '</bb-listbuilder-footer>' + 
                    '</bb-listbuilder>');
        });

        describe('load more', function () {
            var loadCalls,
                windowEl;

            function setupScrollInfinite(inView) {
                var windowVal = 10,
                    offsetVal;
                offsetVal = inView ? 0 : 30; 
                spyOn($.fn, 'scrollTop').and.returnValue(windowVal);
                spyOn($.fn, 'height').and.returnValue(windowVal);
                spyOn($.fn, 'offset').and.returnValue({ top: offsetVal });
            }


            function findSearchInput(el) {
                return el.find('.bb-search-input');
            }

            function findSearchButton(el) {
                return el.find('.bb-search-btn-apply');
            }

            function changeInput(el, val) {
                var inputEl;
                inputEl = findSearchInput(el);
                inputEl.val(val);
                inputEl.trigger('change');
                $scope.$digest();
            }

           

            beforeEach(function () {
                loadCalls = 0;
                $scope.listCtrl = {
                    showLoadMore: true,
                    onLoadMore: function () {
                        loadCalls++;
                    },
                    onSearch: function (searchText) {
                        return searchText;
                    }
                };
                windowEl = angular.element($window);
            });

            it('should load more data when the footer is in view and bbListbuilderShowLoadMore is true', function () {
                var el;
                
                setupScrollInfinite(true);
                
                el = $compile(listbuilderHtml)($scope);
                $scope.$digest();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(1);

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(2);
            });

            it('should not load more data when the footer is in view and bbListbuilderShowLoadMore is false', function () {
                var el;
            
                setupScrollInfinite(true);
                
                el = $compile(listbuilderHtml)($scope);
                $scope.$digest();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(1);

                $scope.listCtrl.showLoadMore = false;
                $scope.$digest();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(1);
            });
            
            it('should not load more data when the footer is not in view and bbListbuilderShowLoadMore is true', function () {
                var el;
            
                setupScrollInfinite(false);
                
                el = $compile(listbuilderHtml)($scope);
                $scope.$digest();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(0);

            });

            function validateHighlight(onLoadMore) {
                var el,
                    searchButtonEl,
                    highlightedEl;

                listbuilderHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)"> ' +
                    '</bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-content>' +
                    '<bb-listbuilder-cards>' +
                    '<bb-listbuilder-card ng-repeat="card in listCtrl.cards">' +
                    '<bb-card>' +
                    '<bb-card-title>' +
                    '{{card.title}}' +
                    '</bb-card-title>' +
                    '<bb-card-content>' +
                    '{{card.content}}' +
                    '</bb-card-content>' +
                    '</bb-card>' +
                    '</bb-listbuilder-card>' +
                    '</bb-listbuilder-cards>' +
                    '</bb-listbuilder-content>' +
                    '<bb-listbuilder-footer bb-listbuilder-on-load-more="listCtrl.onLoadMore()" ' +
                    'bb-listbuilder-show-load-more="listCtrl.showLoadMore">' +
                    '</bb-listbuilder-footer>' + 
                    '</bb-listbuilder>');

                $scope.listCtrl.cards = [
                    {
                        title: 'First',
                        content: 'Content'
                    }
                ];
                
                setupScrollInfinite(true);

                $scope.listCtrl.onLoadMore = onLoadMore;

                el = $compile(listbuilderHtml)($scope);
                el.appendTo($document.find('body'));
                $scope.$digest();

                changeInput(el, 'Content');

                searchButtonEl = findSearchButton(el);
                searchButtonEl.click();
                $scope.$digest();

                $timeout.flush();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                highlightedEl = el.find('span.highlight');
                expect(highlightedEl.length).toBe(2);


                el.remove();
            }

            it('should highlight using the last search text when load more does not return a promise', function () {
                function onLoadMore() {
                    $scope.listCtrl.cards.push({ title: 'Second', content: 'Content'});
                }
                validateHighlight(onLoadMore);

            });

            it('should highlight using the last search text when load more returns a promise', function () {
                function onLoadMore() {
                    $scope.listCtrl.cards.push({ title: 'Second', content: 'Content'});
                    return {
                        then: function (callback) {
                            
                            callback();
                        }
                        
                    };
                }
                validateHighlight(onLoadMore);

            });
        });
        
    });
}());

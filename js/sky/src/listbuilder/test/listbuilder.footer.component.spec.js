/* jshint jasmine: true */
/* global module, angular, inject */
(function () {
    'use strict';
    describe('Listbuilder footer', function () {
        var $compile,
            $scope,
            $document,
            $timeout,
            bbViewKeeperBuilder;

        beforeEach(module(
            'sky.listbuilder',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_, _bbViewKeeperBuilder_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
            $timeout = _$timeout_;
            bbViewKeeperBuilder = _bbViewKeeperBuilder_;
        }));

        function getActionBar() {
            return $document.find('body .bb-listbuilder-actionbar');
        }

        describe('actionbar', function () {
            var listbuilderHtml;
            beforeEach(function () {
                listbuilderHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar>' +
                    '</bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-footer bb-listbuilder-on-load-more="listCtrl.onLoadMore(loadingComplete)" ' +
                    'bb-listbuilder-show-load-more="true">' +
                    '</bb-listbuilder-footer>' + 
                    '</bb-listbuilder>');
            });
           
            it('should create an actionbar at the bottom of the page when scroll to top is available', function () {
                var el,
                    actionbarEl,
                    onStateChangedCallback,
                    scrollToTopCalled = false;

                spyOn(bbViewKeeperBuilder, 'create').and.callFake(function (args) {

                    onStateChangedCallback = args.onStateChanged;
                    return {
                        destroy: function () {

                        },
                        scrollToTop: function () {
                            scrollToTopCalled = true;
                        },
                        syncElPosition: function () {

                        },
                        isFixed: true
                    };
                });

                el = $compile(listbuilderHtml)($scope);
                el.appendTo($document.find('body'));
                $scope.$digest();

                onStateChangedCallback();
                $timeout.flush();

                actionbarEl = getActionBar();

                expect(actionbarEl).toBeVisible();

                actionbarEl.find('.btn.btn-link').click();
                $scope.$digest();
                expect(scrollToTopCalled).toBe(true);
                
                el.remove();
                
            });

            it('should not create an actionbar at the bottom of the page when scroll to top is not available', function () {
                var el,
                    actionbarEl,
                    onStateChangedCallback;

                spyOn(bbViewKeeperBuilder, 'create').and.callFake(function (args) {

                    onStateChangedCallback = args.onStateChanged;
                    return {
                        destroy: function () {

                        },
                        scrollToTop: function () {

                        },
                        syncElPosition: function () {

                        },
                        isFixed: false
                    };
                });

                el = $compile(listbuilderHtml)($scope);
                el.appendTo($document.find('body'));
                $scope.$digest();

                onStateChangedCallback();
                $timeout.flush();

                actionbarEl = getActionBar();

                expect(actionbarEl).not.toBeVisible();
                
                el.remove();
            });

            it('does not scroll to top if scrollbar is not specified', function () {
                var el,
                    actionbarEl,
                    onStateChangedCallback,
                    scrollToTopCalled = false,
                    listbuilderHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-footer bb-listbuilder-on-load-more="listCtrl.onLoadMore(loadingComplete)" ' +
                    'bb-listbuilder-show-load-more="true">' +
                    '</bb-listbuilder-footer>' + 
                    '</bb-listbuilder>');

                spyOn(bbViewKeeperBuilder, 'create').and.callFake(function (args) {

                    onStateChangedCallback = args.onStateChanged;
                    return {
                        destroy: function () {

                        },
                        scrollToTop: function () {
                            scrollToTopCalled = true;
                        },
                        syncElPosition: function () {

                        },
                        isFixed: true
                    };
                });

                el = $compile(listbuilderHtml)($scope);
                el.appendTo($document.find('body'));
                $scope.$digest();
                actionbarEl = getActionBar();

                actionbarEl.find('.btn.btn-link').click();
                $scope.$digest();
                expect(scrollToTopCalled).toBe(false);
                
                el.remove();
            });
        });

        describe('load more', function () {
            it('should load more data when the footer is in view and bbListbuilderShowLoadMore is true', function () {

            });

            it('should not load more data when the footer is in view and bbListbuilderShowLoadMore is false', function () {

            });
            
            it('should not load more data when the footer is not in view and bbListbuilderShowLoadMore is true', function () {

            });
        });
        
    });
}());

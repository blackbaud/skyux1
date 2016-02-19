/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Pagination', function () {
    'use strict';

    var $compile,
        $scope,
        $timeout,
        bbPaging,
        testItems,
        $animate;

    beforeEach(function () {
        testItems = [
            {text: 'Item 1'},
            {text: 'Item 2'},
            {text: 'Item 3'},
            {text: 'Item 4'},
            {text: 'Item 5'},
            {text: 'Item 6'},
            {text: 'Item 7', height: 200},
            {text: 'Item 8'},
            {text: 'Item 9'},
            {text: 'Item 10'},
            {text: 'Item 11'},
            {text: 'Item 12'}
        ];
    });

    beforeEach(module('ngMock'));
    beforeEach(module('uib/template/pagination/pagination.html'));
    beforeEach(module('sky.pagination'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _bbPaging_, _$animate_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $timeout = _$timeout_;
        bbPaging = _bbPaging_;
        $animate = _$animate_;

    }));

    describe('service', function () {
        it('should page the provided data', function () {
            var itemsPaged;

            itemsPaged = bbPaging.init(testItems);

            expect(itemsPaged.items).toEqual(testItems.slice(0, 5));

            itemsPaged.currentPage = 2;
            itemsPaged.pageChanged();

            expect(itemsPaged.items).toEqual(testItems.slice(5, 10));
        });

        it('should support setting initial page', function () {
            var itemsPaged;

            itemsPaged = bbPaging.init(
                testItems,
                {
                    currentPage: 2
                }
            );

            expect(itemsPaged.items).toEqual(testItems.slice(5, 10));
        });

        it('should support custom items per page', function () {
            var itemsPaged;

            itemsPaged = bbPaging.init(
                testItems,
                {
                    itemsPerPage: 3
                }
            );

            expect(itemsPaged.items).toEqual(testItems.slice(0, 3));

            itemsPaged.currentPage = 2;
            itemsPaged.pageChanged();

            expect(itemsPaged.items).toEqual(testItems.slice(3, 6));
        });

        it('should set totalItems property to 0 when no source data is present', function () {
            var itemsPaged;

            itemsPaged = bbPaging.init();

            expect(itemsPaged.totalItems).toBe(0);
        });
    });

    describe('directive', function () {

        it('should change pages when page number is clicked', function () {
            var el = $compile('<div bb-pagination="pagedData"></div>')($scope);

            $scope.pagedData = bbPaging.init(testItems);

            $scope.$digest();

            el.find('a').eq(2).click();

            expect($scope.pagedData.items).toEqual(testItems.slice(5, 10));
        });

        it('should be disabled when the paginationDisabled property is set to true', function () {
            var el = $compile('<div bb-pagination="pagedData" bb-pagination-disabled="disabled"></div>')($scope);

            el.appendTo(document.body);

            $scope.pagedData = bbPaging.init(testItems);

            $scope.disabled = true;
            $scope.$digest();

            expect(el).toContainElement('.bb-pagination-dummy');
            expect(el.find('.pagination')).toBeHidden();

            $scope.disabled = false;
            $scope.$digest();

            expect(el).not.toContainElement('.bb-pagination-dummy');
            expect(el.find('.pagination')).toBeVisible();

            el.remove();
        });

        it('should have the correct arrow class applied', function () {

            var el = $compile('<div bb-pagination="pagedData"></div>')($scope),
                aEl;

            el.appendTo(document.body);

            $scope.pagedData = bbPaging.init(testItems);

            $scope.$digest();
            $timeout.flush();

            aEl = el.find(".pagination li[ng-if='::directionLinks'] a");
            expect(aEl.length).toBe(2);

            el.remove();
        });
    });

    describe('content directive', function () {
        function createPaginationContent() {
            return $compile(
                '<div bb-pagination-content="pagedData">' +
                    '<div ng-repeat="item in pagedData.items">' +
                        '<div ng-style="{height: item.height || 20}">{{item.text}}</span>' +
                    '</div>' +
                '</div>')($scope);
        }

        it('should set its min-height to the height of the tallest page', function () {
            var el = createPaginationContent();

            spyOn($animate, 'enabled');

            el.appendTo(document.body);

            $scope.pagedData = bbPaging.init(testItems);

            $scope.$digest();
            $timeout.flush();

            expect(el.css('min-height')).toBe('280px');

            expect($animate.enabled).toHaveBeenCalled();

            el.remove();
        });

        it('should reset its min-height when the window resizes', function () {
            var el = createPaginationContent(),
                addClassSpy,
                removeClassSpy;

            el.appendTo(document.body);

            $scope.pagedData = bbPaging.init(testItems);

            $scope.$digest();
            $timeout.flush();

            addClassSpy = spyOn($.fn, 'addClass').and.callThrough();
            removeClassSpy = spyOn($.fn, 'removeClass').and.callThrough();

            $(window).resize();

            // Two flushes are needed here; one for the delay after the window resizes and one for the
            // delay after trying to set the min-height.
            $timeout.flush();
            $timeout.flush();

            expect(addClassSpy).toHaveBeenCalledWith('bb-pagination-content bb-pagination-content-calculating');
            expect(removeClassSpy).toHaveBeenCalledWith('bb-pagination-content-calculating');

            el.remove();
        });

        it('should not cause an error when items per page is somehow set to 0', function () {
            createPaginationContent();

            $scope.pagedData = bbPaging.init(
                testItems,
                {
                    itemsPerPage: 0
                }
            );

            $scope.$digest();
            $timeout.flush();
        });

        it('should not set the min-height when there is no paged data', function () {
            createPaginationContent();

            $scope.$digest();

            // No deferred tasks should exist when there is no paged data.
            expect($timeout.flush).toThrow();
        });

        it('should not set the min-height when there is only one page of data', function () {

            createPaginationContent();

            $scope.pagedData = bbPaging.init(testItems.slice(1, 2));

            $scope.$digest();

            // No deferred tasks should exist when there is no paged data.
            expect($timeout.flush).toThrow();
        });

    });
});

/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('UibPagination', function () {
    'use strict';

    var $compile,
        $scope,
        $timeout,
        $animate;

    beforeEach(module('ngMock'));
    beforeEach(module('uib/template/pagination/pagination.html'));
    beforeEach(module('sky.pagination.uibpagination'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _$animate_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $timeout = _$timeout_;
        $animate = _$animate_;

    }));

    describe('directive', function () {
        it('should create a pagination component when ngModel is defined', function () {
            var paginationTemplate = '<div><uib-pagination ' +
            'total-items="locals.count" ' +
            'ng-model="locals.currentPage"> ' +
            '</uib-pagination></div>',
            el;

            $scope.locals = {
                currentPage: 1,
                count: 15
            };

            el = $compile(paginationTemplate)($scope);
            el.appendTo(document.body);

            $scope.$digest();
            expect(el.find('li').length).toBe(5);
            el.remove();
        });

    });
});
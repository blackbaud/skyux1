/*jshint jasmine: true */
/*global angular */

describe('SectionedModal', function () {
    'use strict';

    var $compile,
        $scope;

    beforeEach(function () {
        angular.mock.module('sky.sectionedform');

        angular.mock.inject(function (_$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
        });
    });

    describe('directive', function () {
        it('should apply styling to the element', function () {
            var sut;
            
            sut = $compile('<div bb-sectioned-modal></div>')($scope);

            expect(sut).toHaveClass('bb-sectionedmodal');
        });
    });
});
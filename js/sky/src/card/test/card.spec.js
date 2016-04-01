/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Card directive', function () {
    'use strict';

    var $compile,
        $rootScope;

    beforeEach(module(
        'ngMock',
        'sky.card',
        'sky.templates'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should place the individual components in their respective placeholders', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(
            '<bb-card>' +
            '   <bb-card-title>Title</bb-card-title>' +
            '</bb-card>'
        )($scope);

        $scope.$digest();

        expect(el.find('.bb-card-title bb-card-title')).toHaveText('Title');
    });
});

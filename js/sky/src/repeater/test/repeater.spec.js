/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Repeater directive', function () {
    'use strict';

    var $compile,
        $rootScope;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.repeater'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should ', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile('<bb-repeater></bb-repeater>')($scope);
    });
});

/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Autofocus directive', function () {
    'use strict';

    var $compile,
        $scope,
        $timeout;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.autofocus'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $timeout = _$timeout_;

    }));

    it('should autofocus', function () {
        var el = angular.element('<input type="text" bb-autofocus />');

        // The element has to be in the document in order to receive focus.
        $(document.body).append(el);

        $compile(el)($scope);

        $timeout.flush();

        expect(el).toBeFocused();

        el.blur();
        el.remove();
    });
});

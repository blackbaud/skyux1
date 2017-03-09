/*jshint browser: true, jasmine: true */
/*global inject, angular, module, document */

describe('Popover', function () {
    'use strict';

    var $compile,
        $scope,
        $timeout,
        $window,
        body,
        el,
        popoverLink,
        $rootScope;

    beforeEach(module(
        'ngMock',
        'ui.bootstrap.popover',
        'sky.popover',
        'sky.templates'
    ));

    beforeEach(inject(function (_$window_, _$timeout_) {
        $window = _$window_;
        $timeout = _$timeout_;
    }));

    beforeEach(inject(function (_$templateCache_) {
        _$templateCache_.put('bbPopover/testpopover.html',
            '<div>' +
            '<div id="messageWrapper">{{message}}</div>' +
            '<a id="hidelink" ng-click="hide()">Close me</a>' +
            '</div>');
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        el = $compile('<div><a id="popoverTrigger" bb-popover-template="bbPopover/testpopover.html">{{message}}</a></div>')($scope);

        body = $window.document.body;
        el.appendTo(body);
        $scope.$digest();
        $scope.message = "Hello World";
        $scope.$digest();

        popoverLink = el.find('#popoverTrigger');

    }));
    afterEach(inject(function () {
        el.remove();
    }));

    function trigger(element, evt) {
        var myEvent = document.createEvent('Event');
        myEvent.initEvent(evt, true, false);
        element[0].dispatchEvent(myEvent);
        $rootScope.$digest();
    }

    describe('directive', function () {
        it('should bind scope data into the template', function () {
            trigger(popoverLink, 'click');
            $scope.$digest();
            expect(el.find('#messageWrapper')).toHaveText($scope.message);

        });

        it('should close when clicking outside of flyout', function () {
            trigger(popoverLink, 'click');
            $scope.$digest();
            $timeout.flush();

            expect(el.find('#messageWrapper').length).toBe(1);

            angular.element(body).trigger('click');
            $scope.$digest();

            $timeout.flush();
            expect(el.find('#messageWrapper').length).toBe(0);
        });

        it('should close when calling close function on scope', function () {
            expect(el.find('#messageWrapper').length).toBe(0);

            trigger(popoverLink, 'click');
            $scope.$digest();
            
            expect(el.find('#messageWrapper').length).toBe(1);

            el.find('#hidelink').click();
            $scope.$digest();
            $rootScope.$digest();
            $timeout.flush();
            expect(el.find('#messageWrapper').length).toBe(0);
        });

        it('should use the existing popover-is-open attribute if available', function () {
            var popOverIsOpenEl = $compile('<div><a id="popoverTrigger" popover-is-open="locals.isOpen" bb-popover-template="bbPopover/testpopover.html">{{message}}</a></div>')($scope);
            $scope.locals = {
                isOpen: false
            };

            body = $window.document.body;
            popOverIsOpenEl.appendTo(body);
            $scope.$digest();
            $scope.message = "Hello World";
            $scope.$digest();

            popoverLink = popOverIsOpenEl.find('#popoverTrigger');

            trigger(popoverLink, 'click');
            $scope.$digest();
            $timeout.flush();

            expect(popOverIsOpenEl.find('#messageWrapper').length).toBe(1);
            expect($scope.locals.isOpen).toBe(true);

            angular.element(body).trigger('click');
            $scope.$digest();

            $timeout.flush();
            expect(popOverIsOpenEl.find('#messageWrapper').length).toBe(0);
            expect($scope.locals.isOpen).toBe(false);
            popOverIsOpenEl.remove();
        });
    });
});

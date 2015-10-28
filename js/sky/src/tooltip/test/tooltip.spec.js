/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Tooltip', function () {
    'use strict';

    var $compile,
        $rootScope,
        $timeout,
        $window;

    beforeEach(module(
        'ngMock',
        'sky.tooltip',
        'ui.bootstrap.tooltip',
        'sky.templates',
        'template/tooltip/tooltip-html-unsafe-popup.html'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_, _$timeout_, _$window_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $window = _$window_;

        _$templateCache_.put('test/tooltip/testtooltip.html',
            '<div>' +
            '<div id="messageWrapper">{{message}}</div>' +
            '</div>'
        );
    }));

    function trigger(element, evt) {
        var myEvent = document.createEvent('Event');
        myEvent.initEvent(evt, true, false);
        element[0].dispatchEvent(myEvent);
    }

    describe('directive', function () {
        function removeTooltips() {
            $('.tooltip').remove();
        }

        function testTooltip($scope, el, message, expectedText, updater) {
            $scope.message = message;
            $scope.updater = updater;
            $scope.$digest();
            $timeout.flush();

            trigger(el, 'click');
            expect($('#messageWrapper')).toHaveText(expectedText || message);
            trigger(el, 'click');

            removeTooltips();

        }

        it('should bind scope data into the template', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(
                '<a bb-tooltip="test/tooltip/testtooltip.html" tooltip-trigger="click">{{message}}</a>'
            )($scope);

            el.appendTo(document.body);

            testTooltip($scope, el, 'Hello World');
            $timeout.flush();

            el.remove();
        });

        it('should update the template when a tooltip updater flag is set', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(
                '<a bb-tooltip="test/tooltip/testtooltip.html" tooltip-trigger="click" tooltip-updater="updater">{{message}}</a>'
            )($scope);

            el.appendTo(document.body);

            testTooltip($scope, el, 'Hello World');

            testTooltip($scope, el, 'Hello World2', 'Hello World');
            $timeout.flush();
            testTooltip($scope, el, 'Hello World2', 'Hello World2', 1);
            $timeout.flush();

            el.remove();
        });
    });
});

/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';

    var $scope,
        $timeout,
        $compile,
        listbuilderHtml;

    beforeEach(module(
        'sky.listbuilder',
        'sky.templates'
    ));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $timeout = _$timeout_;
    }));

    it('does not show the view switcher if only one view exists', function () {

    });

    it('shows the view switcher if more than one view exists', function () {

    });

    it('changes views when a different view is selected in the switcher', function () {

    });

    it('can set views programmatically', function () {

    });

    it('highlights search text properly in repeater view', function () {

    });

    it('removes entries from the view switcher on destroy', function () {

    });

    describe('custom views', function () {
        it('creates a custom item in the view switcher', function () {

        });

        it('shows the custom view when selected', function () {

        });

        it('can update the view information', function () {

        });

        it('highlights custom view information properly', function () {

        });

        it('removes entries from the view switcher on destroy', function () {

        });
    });

})();
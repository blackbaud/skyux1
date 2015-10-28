/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Navbar directive', function () {
    'use strict';

    var $compile,
        $scope;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.navbar'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    describe('subnav', function () {
        var dropdownEl,
            dropdownMenuEl,
            el;

        beforeEach(function () {
            /*jslint white: true */
            el = $compile(
                '<bb-navbar>' +
                    '<ul class="nav navbar-nav">' +
                        '<li class="dropdown">' +
                            '<a href="#">Dropdown</a>' +
                            '<ul class="dropdown-menu" role="menu">' +
                                '<li><a href="#">Item</a></li>' +
                            '</ul>' +
                        '</li>' +
                    '</ul>' +
                '</bb-navbar>'
            )($scope);

            $scope.$digest();

            dropdownEl = el.find('.dropdown');
            dropdownMenuEl = el.find('.dropdown-menu');
        });

        it('should show/hide subnav on mouse events', function () {
            expect(dropdownEl.mouseenter()).toHaveClass('open');
            expect(dropdownEl.mouseleave()).not.toHaveClass('open');
        });

        it('should hide subnav when user clicks an item', function () {
            expect(dropdownEl.mouseenter()).toHaveClass('open');

            dropdownMenuEl.find('a').click();

            expect(dropdownEl).not.toHaveClass('open');
        });
    });
});
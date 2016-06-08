/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Actionbar directive', function () {
    'use strict';
    var bbMediaBreakpoints,
        $compile,
        $document,
        $scope;

    beforeEach(module('ngMock'));
    beforeEach(module(
                'sky.actionbar',
                'sky.templates'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _bbMediaBreakpoints_) {
        $compile = _$compile_;
        $document = _$document_;
        $scope = _$rootScope_.$new();
        bbMediaBreakpoints = _bbMediaBreakpoints_;
    }));

    it('should wrap the content of the action bar', function () {
        var el = angular.element([
            '<div>',
            '   <bb-action-bar>',
            '   </bb-action-bar>',
            '</div>'
        ].join(''));
        $compile(el)($scope);
        $scope.$digest();
        expect(el.find('.bb-action-bar').length).toBe(1);
    });

    it('should convert each action-bar-item to a button, passing along the title and click', function () {
        var element,
            source = '',
            emptyButtonEl,
            items = [
                {
                    clicked: false,
                    title: 'First Item'
                },
                {
                    clicked: false,
                    title: 'Second Item'
                }
            ];

        $scope.click = function (index) {
            items[index].clicked = true;
        };

        items.forEach(function (el, index, arr) {
            source += [
                '<bb-action-bar-item ng-click="click(' + index + ')">',
                arr[index].title,
                '</bb-action-bar-item>'
            ].join('');
        });

        source += '<bb-action-bar-item bb-action-bar-item-label="Hidden"></bb-action-bar-item';

        element = angular.element('<bb-action-bar>' + source + '</bb-action-bar>');
        $compile(element)($scope);
        $scope.$digest();

        items.forEach(function (el, index, arr) {
            var btn = element.find('button:eq(' + index + ')');
            expect(btn.length).toBe(1);
            expect(btn).toHaveText(arr[index].title);

            btn.click();
            expect(arr[index].clicked).toBe(true);
        });

        emptyButtonEl = element.find('button[aria-label="Hidden"]');
        expect(emptyButtonEl.length).toBe(1);

    });

    describe('action bar item group', function () {

        function validateDropdown(el, index, arr, element) {

            var a = element.find('.bb-action-bar-group ul.dropdown-menu li:eq(' + index + ') button');
            expect(a.length).toBe(1);
            expect(a).toHaveText(arr[index].title);

            a.click();
            expect(arr[index].clicked).toBe(true);
        }

        function executeCallbacks(callbacks, callbackParam) {
            var i;
            if (angular.isDefined(callbacks)) {
                for (i = 0; i < callbacks.length; i++) {
                    callbacks[i](callbackParam);
                }
            }
            $scope.$digest();

        }

        it('should create a dropdown for items in the item group, passing along the title and click', function () {

            var element,
                source = '',
                items = [
                    {
                        clicked: false,
                        title: 'First Item'
                    },
                    {
                        clicked: false,
                        title: 'Second Item'
                    }
                ],
                callbacks = [];

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (actionBarCallback) {
                callbacks.push(actionBarCallback);
            });

            $scope.click = function (index) {
                items[index].clicked = true;
            };

            items.forEach(function (el, index, arr) {
                source += [
                    '<bb-action-bar-item ng-click="click(' + index + ')">',
                    arr[index].title,
                    '</bb-action-bar-item>'
                ].join('');
            });

            element = angular.element([
                '<bb-action-bar>',
                '<bb-action-bar-item-group>',
                source,
                '</bb-action-bar-item-group>',
                '</bb-action-bar>'].join(''));


            $compile(element)($scope);
            $scope.$digest();

            executeCallbacks(callbacks, {xs: true});
            items.forEach(function (el, index, arr) {
                validateDropdown(el, index, arr, element);
            });
        });

        it('should be able to handle interpolated values in the dropdown', function () {
            var element,
                source = '',
                items = [
                    {
                        clicked: false,
                        title: 'First Item'
                    },
                    {
                        clicked: false,
                        title: 'Second Item'
                    }
                ],
                callbacks = [];

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (actionBarCallback) {
                callbacks.push(actionBarCallback);
            });

            $scope.click = function (index) {
                items[index].clicked = true;
            };

            $scope.items = items;

            items.forEach(function (el, index) {
                source += [
                    '<bb-action-bar-item ng-click="click(' + index + ')">',
                    '{{items[' + index + '].title}}',
                    '</bb-action-bar-item>'
                ].join('');
            });

            element = angular.element([
                '<bb-action-bar>',
                '<bb-action-bar-item-group>',
                source,
                '</bb-action-bar-item-group>',
                '</bb-action-bar>'].join(''));


            $compile(element)($scope);
            $scope.$digest();
            executeCallbacks(callbacks, {xs: true});

            items.forEach(function (el, index, arr) {
                validateDropdown(el, index, arr, element);
            });

            $scope.items[0].title = 'Blurst Item';
            $scope.$digest();
            items.forEach(function (el, index, arr) {
                validateDropdown(el, index, arr, element);
            });

        });

        it('should be able to handle adding and removing action items', function () {
            var element,
                source = '',
                items = [
                    {
                        clicked: false,
                        title: 'First Item',
                        visible: true
                    },
                    {
                        clicked: false,
                        title: 'Second Item',
                        visible: true
                    },
                    {
                        clicked: false,
                        title: 'Third Item',
                        visible: true
                    }
                ],
                aEl,
                callbacks = [];

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (actionBarCallback) {
                callbacks.push(actionBarCallback);
            });

            $scope.click = function (index) {
                items[index].clicked = true;
            };

            $scope.items = items;

            items.forEach(function (el, index) {
                source += [
                    '<bb-action-bar-item ng-if="items[' + index + '].visible" ng-click="click(' + index + ')">',
                    '{{items[' + index + '].title}}',
                    '</bb-action-bar-item>'
                ].join('');
            });

            element = angular.element([
                '<bb-action-bar>',
                '<bb-action-bar-item-group>',
                source,
                '</bb-action-bar-item-group>',
                '</bb-action-bar>'].join(''));


            $compile(element)($scope);
            $scope.$digest();

            executeCallbacks(callbacks, {xs: true});

            items.forEach(function (el, index, arr) {
                validateDropdown(el, index, arr, element);
            });

            $scope.items[1].visible = false;
            $scope.$digest();
            aEl = element.find('.bb-action-bar-group ul li button');
            expect(aEl.length).toBe(2);
            expect(aEl.eq(0)).toHaveText($scope.items[0].title);
            expect(aEl.eq(1)).toHaveText($scope.items[2].title);

            $scope.items[1].visible = true;
            items[1].visible = true;
            $scope.$digest();

            executeCallbacks(callbacks, {xs: true});

            items.forEach(function (el, index, arr) {
                validateDropdown(el, index, arr, element);
            });

            executeCallbacks(callbacks, {lg: true});
            items.forEach(function (el, index, arr) {
                var btn = element.find('.bb-action-bar-buttons button:eq(' + index + ')');
                expect(btn.length).toBe(1);
                expect(btn).toHaveText(arr[index].title);

                btn.click();
                expect(arr[index].clicked).toBe(true);
            });

            $scope.$destroy();
        });

        it ('should allow a configurable action dropdown title', function () {
            var title = 'Custom Title',
                element = angular.element([
                    '<div>',
                    '   <bb-action-bar>',
                    '       <bb-action-bar-item-group bb-action-bar-item-group-title="\'' + title + '\'">',
                    '           <bb-action-bar-item>Test</bb-action-bar-item>',
                    '       </bb-action-bar-item-group>',
                    '   </bb-action-bar>',
                    '</div>'].join('')),
                dropdown;

            $compile(element)($scope);
            $scope.$digest();

            dropdown = element.find('button.dropdown-toggle');
            expect(dropdown.length).toBe(1);
            expect(dropdown).toHaveText(title);
        });
    });
});

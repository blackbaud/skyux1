/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Select field directive', function () {
    'use strict';

    var bbResources,
        $animate,
        $compile,
        $rootScope,
        $templateCache;

    function closeCurrentModal() {
        $('.bb-modal .close').click();

        // This has to be called twice to force the modal to be removed from the DOM.
        $animate.flush();
        $animate.flush();
    }

    beforeEach(module('ngMock'));
    beforeEach(module('ngAnimateMock'));
    beforeEach(module('sky.selectfield'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$animate_, _$compile_, _$rootScope_, _$templateCache_, _bbResources_) {
        $animate = _$animate_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = _$templateCache_;
        bbResources = _bbResources_;
    }));

    describe('single-select', function () {
        beforeEach(function () {
            $templateCache.put(
                'bbSelectField/single/test.html',
                ''
            );
        });

        it('should display the selected value in the button used to invoke the picker', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-style="single" bb-select-field-selected-items="selectedItems"></bb-select-field>')($scope);

            $scope.$digest();

            $scope.selectedItems = [
                {
                    title: 'Selected item'
                }
            ];

            $scope.$digest();

            expect(el.find('.bb-select-field-single-title').text()).toBe('Selected item');
        });

        it('should display a dialog without footer buttons when clicked', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(
                '<bb-select-field bb-select-field-style="single">' +
                    '<bb-select-field-picker bb-select-field-picker-template="bbSelectField/single/test.html"></bb-select-field-picker>' +
                '</bb-select-field>'
            )($scope);

            el.appendTo(document.body);

            $scope.$digest();

            el.find('.bb-select-field-single').click();

            $animate.flush();

            expect('.bb-modal').toExist();
            expect('.bb-modal .modal-footer').not.toExist();

            closeCurrentModal();

            el.remove();
        });
    });

    describe('multi-select', function () {
        it('should display up to 5 selected values as individual items', function () {

        });

        it('should display 6 or more selected values as one summary item', function () {

        });
    });

    describe('API exposed to dependent directives', function () {
        it('should allow a picker to be specified', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope,
                picker = {};

            el = $compile('<bb-select-field></bb-select-field')($scope);

            $scope.$digest();

            elScope = el.scope();

            elScope.bbSelectField.setPicker(picker);

            expect(elScope.bbSelectField.picker).toBe(picker);
        });

        describe('selectedItems method', function () {
            it('should return an empty array when no selected items are present', function () {
                var $scope = $rootScope.$new(),
                    el,
                    elScope;

                el = $compile('<bb-select-field bb-select-field-selected-items="selectedItems"></bb-select-field')($scope);

                $scope.$digest();

                elScope = el.scope();

                expect(elScope.bbSelectField.getSelectedItems()).toEqual([]);
            });

            it('should return a copy of the selected items when selected items are present so that changes to the selected items in child directives do not make their way back up to the parent scope', function () {
                var $scope = $rootScope.$new(),
                    el,
                    elScope;

                el = $compile('<bb-select-field bb-select-field-selected-items="selectedItems"></bb-select-field')($scope);

                $scope.$digest();

                $scope.selectedItems = [
                    {
                        title: 'Selected item'
                    }
                ];

                $scope.$digest();

                elScope = el.scope();

                expect(elScope.bbSelectField.getSelectedItems()).not.toBe($scope.selectedItems);
                expect(elScope.bbSelectField.getSelectedItems()).toEqual($scope.selectedItems);
            });
        });
    });
});

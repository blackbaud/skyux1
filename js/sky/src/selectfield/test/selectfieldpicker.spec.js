/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Select field picker directive', function () {
    'use strict';

    var bbResources,
        $animate,
        $compile,
        $rootScope,
        $templateCache;

    function afterModalOpen() {
        $animate.flush();
    }

    function afterModalClose() {
        // This has to be called twice to force the modal to be removed from the DOM.
        $animate.flush();
        $animate.flush();
    }

    function closeCurrentModal() {
        $('.bb-modal .close').click();
        afterModalClose();
    }

    beforeEach(module('ngMock'));
    beforeEach(module('ngAnimateMock'));
    beforeEach(module('sky.checklist'));
    beforeEach(module('sky.selectfield'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$animate_, _$compile_, _$rootScope_, _$templateCache_, _bbResources_) {
        $animate = _$animate_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = _$templateCache_;
        bbResources = _bbResources_;
    }));

    beforeEach(function () {
        $templateCache.put(
            'bbSelectFieldPicker/single/test.html',
            '<bb-checklist ' +
                'bb-checklist-items="items" ' +
                'bb-checklist-mode="list"' +
                'bb-checklist-select-style="single"' +
                '>' +
            '</bb-checklist>'
        );

        $templateCache.put(
            'bbSelectFieldPicker/multiple/test.html',
            '<bb-checklist ' +
                'bb-checklist-items="items" ' +
                'bb-checklist-mode="list"' +
                '>' +
            '</bb-checklist>'
        );
    });

    function validateHeaderText(mode, expected, isCustomHeader) {
        var $scope = $rootScope.$new(),
            el;

        el = $(
            '<bb-select-field bb-select-field-style="' + mode + '">' +
                '<bb-select-field-picker bb-select-field-picker-template="bbSelectFieldPicker/single/test.html"></bb-select-field-picker>' +
            '</bb-select-field>'
        );

        if (isCustomHeader) {
            el.find('bb-select-field-picker').attr('bb-select-field-picker-header', '{{customHeader}}');
            $scope.customHeader = expected;
        }

        el = $compile(el)($scope);

        el.appendTo(document.body);

        $scope.$digest();

        el.find('.bb-select-field-' + mode).click();

        afterModalOpen();

        expect($('.bb-dialog-header span').text()).toBe(expected);

        closeCurrentModal();

        el.remove();
    }

    it('should display localizable default dialog header text', function () {
        bbResources.selectfieldpicker_select_value = '#@%&#%)(#@%&@#%()&@#%)';
        bbResources.selectfieldpicker_select_values = 'BEOI#)(W(BHFWKDVJNLWQKERU%#))';

        validateHeaderText('single', bbResources.selectfieldpicker_select_value);
        validateHeaderText('multiple', bbResources.selectfieldpicker_select_values);
    });

    it('should display custom dialog header text when specified', function () {
        validateHeaderText('single', 'Some custom header', true);
    });

    describe('single-select', function () {
        it('should close and set selected items when a value is selected', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $(
                '<bb-select-field bb-select-field-style="single">' +
                    '<bb-select-field-picker bb-select-field-picker-template="bbSelectFieldPicker/single/test.html"></bb-select-field-picker>' +
                '</bb-select-field>'
            );

            $scope.items = [
                {
                    title: 'Title 1'
                }
            ];

            el = $compile(el)($scope);

            el.appendTo(document.body);

            $scope.$digest();

            el.find('.bb-select-field-single').click();

            afterModalOpen();

            $('.bb-modal button.bb-checklist-list-row').click();

            afterModalClose();

            expect('.bb-modal').not.toExist();

            el.remove();
        });
    });

    describe('multi-select', function () {
        it('should set selected items when the user confirms the dialog by clicking the Select button', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $(
                '<bb-select-field bb-select-field-style="multiple" bb-select-field-selected-items="selectedItems">' +
                    '<bb-select-field-picker bb-select-field-picker-template="bbSelectFieldPicker/multiple/test.html"></bb-select-field-picker>' +
                '</bb-select-field>'
            );

            $scope.items = [
                {
                    title: 'Title 1'
                },
                {
                    title: 'Title 2'
                }
            ];

            el = $compile(el)($scope);

            el.appendTo(document.body);

            $scope.$digest();

            el.find('.bb-select-field-multiple').click();

            afterModalOpen();

            $('.bb-modal .bb-checklist-list-row').eq(1).find('.bb-check-wrapper input').click();
            $('.bb-modal .modal-footer .btn-primary').click();

            afterModalClose();

            $scope.$digest();

            expect($scope.selectedItems).toEqual([$scope.items[1]]);

            el.remove();
        });
    });
});

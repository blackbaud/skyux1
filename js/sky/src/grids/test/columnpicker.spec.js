/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Grid column picker', function () {
    'use strict';

    var $animate,
        basicGridHtml,
        $compile,
        $document,
        el,
        fxOff,
        locals,
        $scope,
        $timeout;

    function setUpGrid(gridHtml, setLocals) {
        var el = angular.element(gridHtml);

        $document.find('body').eq(0).append(el);

        if (angular.isDefined(setLocals)) {
            $scope.locals = setLocals;
        } else {
            $scope.locals = locals;
        }

        $compile(el)($scope);

        $scope.$digest();

        return el;
    }

    function getColumnChooserButton(el) {
        return el.find('.bb-grid-container .bb-table-toolbar .bb-column-picker-btn');
    }

    function getColumnChooserRows(modalEl) {
        return modalEl.find('.bb-checklist-list-row');
    }

    function getModal() {
        return $document.find('body .bb-modal-content-wrapper');
    }

    function closeModal(modalEl, alreadyClosing) {
        if (!alreadyClosing) {
            modalEl.find('.modal-footer button.btn-link').click();
        }

        // https://github.com/angular-ui/bootstrap/blob/0.14.x/src/modal/test/modal.spec.js
        $scope.$digest();
        $animate.flush();
        $scope.$digest();
        $animate.flush();
        $scope.$digest();
        $scope.$digest();
    }

    function getHeaders(el) {
        return el.find('.bb-grid-container .table-responsive .ui-jqgrid-hbox > table > thead > tr > th');
    }

    function getChecklistItemTitleEl(rowEls, rowIndex) {
        return rowEls.eq(rowIndex).find('.bb-checklist-list-title');
    }

    angular.module('disableNgAnimate', []).run(['$animate', function ($animate) {
        $animate.enabled(false);
    }]);

    beforeEach(module('ngMock'));
    beforeEach(module('ngAnimateMock'));
    beforeEach(module(
        'sky.grids',
        'sky.templates'
    ));

    beforeEach(inject(function (_$animate_, _$rootScope_, _$compile_, _$document_, _$timeout_) {
        $animate = _$animate_;
        $scope = _$rootScope_;
        $compile = _$compile_;
        $document = _$document_;
        $timeout = _$timeout_;

        locals = {
            gridOptions: {
                columns: [
                    {
                        caption: 'Name',
                        jsonmap: 'name',
                        id: 1,
                        name: 'name'
                    },
                    {
                        caption: 'Instrument',
                        jsonmap: 'instrument',
                        id: 2,
                        name: 'instrument'
                    },
                    {
                        caption: 'Biography',
                        jsonmap: 'bio',
                        id: 3,
                        name: 'bio'
                    }
                ],
                data: [],
                selectedColumnIds: [1, 2, 3]
            }
        };

        basicGridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

        el = {};
        fxOff =  $.fx.off;
        //turn off jquery animate.
        $.fx.off = true;
    }));

    afterEach(function () {
        if (angular.isDefined(el)) {
            if (angular.isFunction(el.remove)) {
                el.remove();
            }
        }
        $.fx.off = fxOff;
    });

    it('can have its button hidden', function () {
        var columnChooserButtonEl;
        locals.gridOptions.hideColPicker = true;
        el = setUpGrid(basicGridHtml, locals);

        columnChooserButtonEl = getColumnChooserButton(el);

        expect(columnChooserButtonEl.eq(0)).toHaveCss({"display": "none"});
    });

    it('opens a modal with the correct columns', function () {
        var modalEl,
            modalTitleEl,
            modalRowsEl,
            columnChooserButtonEl;
        el = setUpGrid(basicGridHtml);

        columnChooserButtonEl = getColumnChooserButton(el);

        expect(columnChooserButtonEl.eq(0)).not.toHaveCss({"display": "none"});
        columnChooserButtonEl.click();

        $scope.$digest();

        modalEl = getModal();

        //verify title
        modalTitleEl = modalEl.eq(0).find('.modal-header .bb-dialog-header span');
        expect(modalTitleEl.eq(0)).toHaveText('Choose columns to show in the list');

        //make sure the expected check boxes are here
        modalRowsEl = getColumnChooserRows(modalEl.eq(0));

        expect(getChecklistItemTitleEl(modalRowsEl, 0)).toHaveText('Biography');
        expect(getChecklistItemTitleEl(modalRowsEl, 1)).toHaveText('Instrument');
        expect(getChecklistItemTitleEl(modalRowsEl, 2)).toHaveText('Name');

        closeModal(modalEl.eq(0));
    });

    it('creates column category filters if they exist', function () {
        var modalEl,
            modalRowsEl,
            categoryEl,
            columnChooserButtonEl;

        locals.gridOptions.columns[0].category = 'Nonesense';
        locals.gridOptions.columns[1].category = 'Specialness';
        locals.gridOptions.columns[2].category = 'Specialness';
        locals.gridOptions.columns.push(
            {
                caption: 'AAA',
                jsonmap: 'aaa',
                id: 4,
                name: 'aaa'
            }
        );

        locals.gridOptions.columns.push(
            {
                caption: 'AAAA',
                jsonmap: 'aaaaa',
                id: 6,
                name: 'aaaaa'
            }
        );

        locals.gridOptions.columns.unshift(
            {
                caption: 'AAAA',
                jsonmap: 'aaaa',
                id: 5,
                name: 'aaaa'
            }
        );

        el = setUpGrid(basicGridHtml, locals);

        columnChooserButtonEl = getColumnChooserButton(el);

        columnChooserButtonEl.click();

        $scope.$digest();

        modalEl = getModal();

        //make sure the expected check boxes are here
        modalRowsEl = getColumnChooserRows(modalEl.eq(0));

        expect(getChecklistItemTitleEl(modalRowsEl, 0)).toHaveText('AAA');
        expect(getChecklistItemTitleEl(modalRowsEl, 1)).toHaveText('AAAA');
        expect(getChecklistItemTitleEl(modalRowsEl, 2)).toHaveText('AAAA');
        expect(getChecklistItemTitleEl(modalRowsEl, 3)).toHaveText('Biography');
        expect(getChecklistItemTitleEl(modalRowsEl, 4)).toHaveText('Instrument');
        expect(getChecklistItemTitleEl(modalRowsEl, 5)).toHaveText('Name');

        //get categories
        categoryEl = modalEl.eq(0).find('.bb-checklist-filter-bar button');

        expect(categoryEl.eq(0)).toHaveText('All');
        expect(categoryEl.eq(0)).toHaveClass('btn-primary');

        expect(categoryEl.eq(1)).toHaveText('Specialness');
        expect(categoryEl.eq(1)).toHaveClass('btn-default');

        expect(categoryEl.eq(2)).toHaveText('Nonesense');
        expect(categoryEl.eq(2)).toHaveClass('btn-default');

        closeModal(modalEl.eq(0));
    });

    it('applies search and category filters', function () {
        var modalEl,
            modalRowsEl,
            categoryEl,
            columnChooserButtonEl,
            searchEl;

        locals.gridOptions.columns[0].category = 'Nonesense';
        locals.gridOptions.columns[1].category = 'Specialness';
        locals.gridOptions.columns[2].category = 'Specialness';
        locals.gridOptions.columns[2].description = 'Description';

        el = setUpGrid(basicGridHtml, locals);

        columnChooserButtonEl = getColumnChooserButton(el);
        columnChooserButtonEl.click();

        $scope.$digest();

        modalEl = getModal();

        //get categories
        categoryEl = modalEl.eq(0).find('.bb-checklist-filter-bar button');

        categoryEl.eq(1).click();

        $scope.$digest();

        //make sure the expected check boxes are here
        modalRowsEl = getColumnChooserRows(modalEl);

        expect(modalRowsEl.length).toBe(2);
        expect(getChecklistItemTitleEl(modalRowsEl, 0)).toHaveText('Biography');
        expect(getChecklistItemTitleEl(modalRowsEl, 1)).toHaveText('Instrument');

        searchEl = modalEl.eq(0).find('.bb-checklist-filter-bar input');

        searchEl.eq(0).val('In').trigger('change');

        modalRowsEl = getColumnChooserRows(modalEl);

        expect(modalRowsEl.length).toBe(1);
        expect(getChecklistItemTitleEl(modalRowsEl, 0)).toHaveText('Instrument');

        searchEl.eq(0).val('Des').trigger('change');

        modalRowsEl = getColumnChooserRows(modalEl);

        expect(modalRowsEl.length).toBe(1);
        expect(getChecklistItemTitleEl(modalRowsEl, 0)).toHaveText('Biography');

        searchEl.eq(0).val('').trigger('change');
        categoryEl.eq(0).click();

        modalRowsEl = getColumnChooserRows(modalEl);

        expect(getChecklistItemTitleEl(modalRowsEl, 0)).toHaveText('Biography');
        expect(getChecklistItemTitleEl(modalRowsEl, 1)).toHaveText('Instrument');
        expect(getChecklistItemTitleEl(modalRowsEl, 2)).toHaveText('Name');
        closeModal(modalEl.eq(0));
    });

    it('applies the correct column picker ids on confirmation', function () {
        var columnChooserButtonEl,
            headerEl,
            modalEl,
            modalRowsEl;

        locals.gridOptions.selectedColumnIds = [1, 2];

        el = setUpGrid(basicGridHtml, locals);

        columnChooserButtonEl = getColumnChooserButton(el);

        expect(columnChooserButtonEl.eq(0)).not.toHaveCss({"display": "none"});
        columnChooserButtonEl.click();

        $scope.$digest();

        modalEl = getModal();

        // Causes the checkboxes in the checkbox list to render.
        $timeout.flush();

        $scope.$digest();

        modalRowsEl = getColumnChooserRows(modalEl.eq(0));

        modalRowsEl.eq(0).find('.bb-check-wrapper input').eq(0).click();
        modalRowsEl.eq(2).find('.bb-check-wrapper input').eq(0).click();

        modalEl.eq(0).find('.modal-footer .btn-primary').eq(0).click();
        closeModal(modalEl.eq(0), true);

        headerEl = getHeaders(el);

        expect(headerEl.length).toBe(2);

        expect(headerEl.eq(0)).toHaveText('Instrument');
        expect(headerEl.eq(1)).toHaveText('Biography');
    });


});

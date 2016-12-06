/*jshint browser: true, jasmine: true */
/* global angular, inject, module, $ */

describe('Grid multiselect', function () {
    'use strict';

    var $compile,
        $document,
        $scope,
        $timeout,
        locals,
        dataSet1,
        basicGridHtml,
        el,
        fxOff;

    function setUpGrid(gridHtml, setLocals) {
        var el = angular.element(gridHtml);
        el.appendTo($document.find('body'));

        if (angular.isDefined(setLocals)) {
            $scope.locals = setLocals;
        } else {
            $scope.locals = locals;
        }

        $compile(el)($scope);

        $scope.$digest();

        return el;
    }

    function setGridData(data) {
        $scope.locals.gridOptions.data = data;
        $scope.$digest();
    }

    function getGridRows(el) {
        return el.find('.ui-jqgrid-bdiv tr.ui-row-ltr');
    }

    function findCheckBox(rowEl) {
        return rowEl.find('td .bb-check-wrapper input').eq(0);
    }

    function clickRowMultiselect(rowEl, index) {
        rowEl.eq(index).find('td input.cbox').click();
    }

    function getHeaders(el) {
        return el.find('.bb-grid-container .table-responsive .ui-jqgrid-hbox > table > thead > tr > th');
    }

    function clickSelectAll(headerEl) {
        headerEl.eq(0).find('.bb-check-wrapper input').click();
    }

    function shiftClickRowMultiselect(rowEl, index) {
        var checkBoxEl = rowEl.eq(index).find('td'),
            e = $.Event("click");
        e.shiftKey = true;

        checkBoxEl.eq(0).trigger(e);
    }

    beforeEach(module('ngMock'));
    beforeEach(module(
        'sky.grids',
        'sky.templates'
    ));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_) {
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
                        name: 'name',
                        title: false
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
                selectedColumnIds: [1, 2, 3],
                multiselect: true
            }
        };

        dataSet1 = [
            {
                id: 0,
                name: 'John',
                instrument: 'Rhythm guitar'
            },
            {
                id: 1,
                name: 'Paul',
                instrument: 'Bass',
                bio: 'Lorem'
            },
            {
                id: 2,
                name: 'George',
                instrument: 'Lead guitar'
            },
            {
                id: 3,
                name: 'Ringo',
                instrument: 'Drums'
            }
        ];

        basicGridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions" bb-grid-multiselect-id-property="id" bb-grid-multiselect-selected-ids="locals.selectedIds"></bb-grid></div>';

        $scope.$on('bbGridMultiselectSelectedIdsChanged', function (event, data) {
            $scope.locals.selectedIds = data;
        });

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

    it('emits an event with updated selectedIds when a row is selected', function () {
        var rowEl;

        el = setUpGrid(basicGridHtml, locals);

        setGridData(dataSet1);

        rowEl = getGridRows(el);
        //make sure it also works with clicking fancy check
        rowEl.eq(0).find('td .bb-check-checkbox').click();
        $timeout.flush();

        expect($scope.locals.selectedIds).toEqual([dataSet1[0].id]);

        expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl.eq(0))).toBeChecked();

        clickRowMultiselect(rowEl, 0);
        $timeout.flush();
        expect($scope.locals.selectedIds).toEqual([]);

        expect(rowEl.eq(0)).not.toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl.eq(0))).not.toBeChecked();
    });

    it('selects correctly when nothing is selected before shift click', function () {
        var rowEl;

        el = setUpGrid(basicGridHtml, locals);

        setGridData(dataSet1);

        rowEl = getGridRows(el);

        shiftClickRowMultiselect(rowEl, 2);
        $timeout.flush();
        expect($scope.locals.selectedIds).toEqual([dataSet1[2].id, dataSet1[1].id, dataSet1[0].id]);
        expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');

        expect(findCheckBox(rowEl.eq(0))).toBeChecked();
        expect(findCheckBox(rowEl.eq(1))).toBeChecked();
        expect(findCheckBox(rowEl.eq(2))).toBeChecked();

    });

    it('selects correctly when last selected is before shift click', function () {
        var rowEl;

        el = setUpGrid(basicGridHtml, locals);

        setGridData(dataSet1);

        rowEl = getGridRows(el);

        clickRowMultiselect(rowEl, 1);
        $timeout.flush();

        shiftClickRowMultiselect(rowEl, 2);

        expect($scope.locals.selectedIds).toEqual([dataSet1[2].id, dataSet1[1].id]);

        expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');

        expect(findCheckBox(rowEl.eq(1))).toBeChecked();
        expect(findCheckBox(rowEl.eq(2))).toBeChecked();
    });

    it('selects correctly when last selected is after shift click', function () {
        var rowEl;

        el = setUpGrid(basicGridHtml, locals);

        setGridData(dataSet1);

        rowEl = getGridRows(el);

        clickRowMultiselect(rowEl, 3);
        $timeout.flush();

        shiftClickRowMultiselect(rowEl, 1);
        expect($scope.locals.selectedIds).toEqual([dataSet1[1].id, dataSet1[2].id, dataSet1[3].id]);
        expect(rowEl.eq(3)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');

        expect(findCheckBox(rowEl.eq(3))).toBeChecked();
        expect(findCheckBox(rowEl.eq(1))).toBeChecked();
        expect(findCheckBox(rowEl.eq(2))).toBeChecked();
    });

    it('selects correctly when last selected is the shift click', function () {
        var rowEl;

        el = setUpGrid(basicGridHtml, locals);

        setGridData(dataSet1);

        rowEl = getGridRows(el);

        clickRowMultiselect(rowEl, 1);
        $timeout.flush();
        shiftClickRowMultiselect(rowEl, 1);
        $timeout.flush();
        expect($scope.locals.selectedIds).toEqual([dataSet1[1].id]);
        expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');

        expect(findCheckBox(rowEl.eq(1))).toBeChecked();

    });

    it('clears other selections that are not in the shift click path', function () {
        var rowEl;

        el = setUpGrid(basicGridHtml, locals);

        setGridData(dataSet1);

        rowEl = getGridRows(el);
        clickRowMultiselect(rowEl, 3);
        $timeout.flush();
        clickRowMultiselect(rowEl, 0);
        $timeout.flush();
        shiftClickRowMultiselect(rowEl, 2);
        expect($scope.locals.selectedIds).toEqual([dataSet1[2].id, dataSet1[1].id, dataSet1[0].id]);
        expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');

        expect(findCheckBox(rowEl.eq(0))).toBeChecked();
        expect(findCheckBox(rowEl.eq(1))).toBeChecked();
        expect(findCheckBox(rowEl.eq(2))).toBeChecked();

    });

    it('selects all correctly', function () {
        var headerEl,
                rowEl;

        locals.selectedIds = [50];

        el = setUpGrid(basicGridHtml, locals);

        headerEl = getHeaders(el);

        clickSelectAll(headerEl);

        expect($scope.locals.selectedIds).toEqual([50]);

        clickSelectAll(headerEl);

        setGridData(dataSet1);
        rowEl = getGridRows(el);

        clickSelectAll(headerEl);

        expect($scope.locals.selectedIds).toEqual([50, dataSet1[0].id, dataSet1[1].id, dataSet1[2].id, dataSet1[3].id]);

        expect(rowEl).toHaveClass('ui-state-highlight');
        expect(rowEl.find('td .bb-check-wrapper input')).toBeChecked();
        expect(headerEl.find('.bb-check-wrapper input').eq(0)).toBeChecked();

        clickSelectAll(headerEl);
        $scope.$digest();

        expect($scope.locals.selectedIds).toEqual([50]);
        expect(rowEl).not.toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl)).not.toBeChecked();
        expect(headerEl.find('.bb-check-wrapper input').eq(0)).not.toBeChecked();
    });

    it('sets selected state on load data', function () {
        var headerEl,
                rowEl;

        el = setUpGrid(basicGridHtml, locals);

        headerEl = getHeaders(el);

        setGridData(dataSet1);

        clickSelectAll(headerEl);
        expect($scope.locals.selectedIds).toEqual([dataSet1[0].id, dataSet1[1].id, dataSet1[2].id, dataSet1[3].id]);

        $scope.locals.gridOptions.data.push({
            id: 4,
            name: 'Jimmy',
            instrument: 'Rhythm tamborine'
        });
        $scope.$digest();

        rowEl = getGridRows(el);

        expect($scope.locals.selectedIds).toEqual([dataSet1[0].id, dataSet1[1].id, dataSet1[2].id, dataSet1[3].id]);
        expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(3)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(4)).not.toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl.eq(0))).toBeChecked();
        expect(findCheckBox(rowEl.eq(1))).toBeChecked();
        expect(findCheckBox(rowEl.eq(2))).toBeChecked();
        expect(findCheckBox(rowEl.eq(3))).toBeChecked();
        expect(findCheckBox(rowEl.eq(4))).not.toBeChecked();
    });

    it('sets selected state on load data when using a new data object', function () {
        var headerEl,
            copiedData,
            rowEl;

        el = setUpGrid(basicGridHtml, locals);

        headerEl = getHeaders(el);

        setGridData(dataSet1);

        clickSelectAll(headerEl);
        expect($scope.locals.selectedIds).toEqual([dataSet1[0].id, dataSet1[1].id, dataSet1[2].id, dataSet1[3].id]);

        copiedData = angular.copy($scope.locals.gridOptions.data);
        copiedData.push({
            id: 4,
            name: 'Jimmy',
            instrument: 'Rhythm tamborine'
        });

        $scope.locals.gridOptions.data = copiedData;

        $scope.$digest();

        rowEl = getGridRows(el);

        expect($scope.locals.selectedIds).toEqual([dataSet1[0].id, dataSet1[1].id, dataSet1[2].id, dataSet1[3].id]);
        expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(3)).toHaveClass('ui-state-highlight');
        expect(rowEl.eq(4)).not.toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl.eq(0))).toBeChecked();
        expect(findCheckBox(rowEl.eq(1))).toBeChecked();
        expect(findCheckBox(rowEl.eq(2))).toBeChecked();
        expect(findCheckBox(rowEl.eq(3))).toBeChecked();
        expect(findCheckBox(rowEl.eq(4))).not.toBeChecked();
    });

    it('updates selected items when selectedIds are changed', function () {
        var rowEl;

        el = setUpGrid(basicGridHtml, locals);

        setGridData(dataSet1);

        rowEl = getGridRows(el);
        //make sure it also works with clicking fancy check
        rowEl.eq(0).find('td .bb-check-checkbox').click();
        $timeout.flush();
        expect($scope.locals.selectedIds).toEqual([dataSet1[0].id]);

        expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl.eq(0))).toBeChecked();

        $scope.locals.selectedIds = [1, 2, 43];

        $scope.$digest();
        expect(rowEl.eq(0)).not.toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl.eq(0))).not.toBeChecked();

        expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl.eq(1))).toBeChecked();
        expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');
        expect(findCheckBox(rowEl.eq(2))).toBeChecked();
    });
});
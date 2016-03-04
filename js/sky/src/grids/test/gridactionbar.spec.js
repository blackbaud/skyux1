/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Grid actionbar', function () {
    'use strict';

    var actionbarGridHtml,
        action1,
        action2,
        action1Called,
        action2Called,
        bbMediaBreakpoints,
        bbViewKeeperBuilder,
        $compile,
        dataSet1,
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

    function setGridData(data) {
        $scope.locals.gridOptions.data = data;
        $scope.$digest();
    }

    function getGridRows(el) {
        return el.find('.ui-jqgrid-bdiv tr.ui-row-ltr');
    }

    function clickRowMultiselect(rowEl, index) {
        rowEl.eq(index).find('td input.cbox').click();
    }

    function action1Clicked() {
        action1Called = true;
    }

    function action2Clicked() {
        action2Called = true;
    }

    function updateActions(selections) {
        var i,
            selection;

        action1.selections = [];
        action2.selections = [];

        for (i = 0; i < selections.length; i++) {
            selection = selections[i];
            if (selection.instrument.indexOf('guitar') > -1) {
                action1.selections.push(selection);
            } else if (selection.instrument.indexOf('Drum') > -1) {
                action2.selections.push(selection);
            }
        }
    }

    beforeEach(module('ngMock'));
    beforeEach(module(
        'sky.grids',
        'sky.templates'
    ));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _bbMediaBreakpoints_, _$timeout_, _bbViewKeeperBuilder_) {
        $scope = _$rootScope_;
        $compile = _$compile_;

        $document = _$document_;
        bbMediaBreakpoints = _bbMediaBreakpoints_;
        bbViewKeeperBuilder = _bbViewKeeperBuilder_;

        $timeout = _$timeout_;

        action1 = {
            actionCallback: action1Clicked,
            automationId: 'Action1Button',
            isPrimary: true,
            selections: [],
            title: 'Guitar Action'
        };

        action2 = {
            actionCallback: action2Clicked,
            automationId: 'Action2Button',
            isPrimary: false,
            selections: [],
            title: 'Drum Action'
        };

        locals = {
            gridActions: [
                action1,
                action2
            ],
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
                multiselect: true,
                selectedColumnIds: [1, 2, 3]
            },
            selectedRows: [],
            updateActions: updateActions
        };

        dataSet1 = [
            {
                name: 'John',
                instrument: 'Rhythm guitar'
            },
            {
                name: 'Paul',
                instrument: 'Bass',
                bio: 'Lorem'
            },
            {
                name: 'George',
                instrument: 'Lead guitar'
            },
            {
                name: 'Ringo',
                instrument: 'Drums'
            }
        ];

        action1Called = false;
        action2Called = false;

        actionbarGridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions" bb-multiselect-actions="locals.gridActions" bb-selections-updated="locals.updateActions(selections)" bb-selected-rows="locals.selectedRows"></bb-grid></div>';

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

    it('watches the selected rows in the grid, passes them to the selections updated function, and shows the action bar if actions are available', function () {
        var actionBarEl,
            actionEl,
            rowEl,
            callback;

        spyOn(bbMediaBreakpoints, 'register').and.callFake(function (gridCallback) {
            callback = gridCallback;
        });

        el = setUpGrid(actionbarGridHtml);

        setGridData(dataSet1);

        callback({xs: false});

        rowEl = getGridRows(el);

        clickRowMultiselect(rowEl, 0);

        $timeout.flush();
        $scope.$digest();

        expect($scope.locals.gridActions[0].selections).toEqual([dataSet1[0]]);
        expect($scope.locals.gridActions[1].selections).toEqual([]);

        //make sure action bar is visible
        actionBarEl = el.find('.bb-grid-action-bar');

        expect(actionBarEl.eq(0)).toBeVisible();

        //make sure actions with titles are in action bar
        actionEl = actionBarEl.eq(0).find('.bb-grid-action-bar-buttons button');

        expect(actionEl.length).toBe(2);

        expect(actionEl.eq(0)).toHaveText('Guitar Action (1)');
        expect(actionEl.eq(0)).toHaveClass('btn-primary');

        expect(actionEl.eq(1)).toHaveText('Drum Action (0)');
        expect(actionEl.eq(1)).toHaveClass('bb-btn-secondary');
        expect(actionEl.eq(1)).toBeDisabled();


        //select the drums row and do the relevant checks again
        clickRowMultiselect(rowEl, 3);
        $timeout.flush();
        expect(actionEl.eq(0)).toHaveText('Guitar Action (1)');

        expect(actionEl.eq(1)).toHaveText('Drum Action (1)');
        expect(actionEl.eq(1)).not.toBeDisabled();

    });

    it('syncs actionbar viewkeeper after it becomes visible and timeout flushed', function () {
        var rowEl,
            syncElPositionCalled = false;

        spyOn(bbViewKeeperBuilder, 'create').and.returnValue(
            {
                destroy: function () {

                },
                scrollToTop: function () {

                },
                syncElPosition: function () {
                    syncElPositionCalled = true;
                }

            }
        );

        el = setUpGrid(actionbarGridHtml);

        setGridData(dataSet1);

        rowEl = getGridRows(el);

        clickRowMultiselect(rowEl, 0);

        $scope.$digest();

        $timeout.flush();

        expect(syncElPositionCalled).toBe(true);

    });

    it('clears the grid multiselect when the clear selection button is pressed', function () {
        var actionBarEl,
            rowEl,
            clearButtonEl;

        el = setUpGrid(actionbarGridHtml);

        setGridData(dataSet1);

        rowEl = getGridRows(el);

        clickRowMultiselect(rowEl, 0);

        $scope.$digest();
        $timeout.flush();

        clearButtonEl = el.find('.bb-grid-action-bar .bb-grid-action-bar-clear-selection');

        clearButtonEl.click();

        expect($scope.locals.gridActions[0].selections).toEqual([]);
        expect($scope.locals.gridActions[1].selections).toEqual([]);

        actionBarEl = el.find('.bb-grid-action-bar');
        expect(actionBarEl.eq(0)).toBeHidden();
    });

    it('calls the action function when the action button is pressed', function () {
        var rowEl,
            actionEl,
            callback;

        spyOn(bbMediaBreakpoints, 'register').and.callFake(function (gridCallback) {
            callback = gridCallback;
        });


        el = setUpGrid(actionbarGridHtml);

        setGridData(dataSet1);

        rowEl = getGridRows(el);

        callback({xs: false});

        clickRowMultiselect(rowEl, 0);
        $scope.$digest();

        $timeout.flush();

        clickRowMultiselect(rowEl, 1);
        $scope.$digest();

        $timeout.flush();

        actionEl = el.find('.bb-grid-action-bar .bb-grid-action-bar-buttons button');


        actionEl.eq(0).click();
        $scope.$digest();
        expect(action1Called).toBe(true);

        actionEl.eq(1).click();
        $scope.$digest();
        expect(action2Called).toBe(true);
    });

    it('shows mobile buttons when in xs breakpoint mode', function () {
        var callback,
            mobileButtonsEl,
            mobileActionsEl,
            cancelChooseActionEl,
            rowEl;

        spyOn(bbMediaBreakpoints, 'register').and.callFake(function (gridCallback) {
            callback = gridCallback;
        });

        el = setUpGrid(actionbarGridHtml);

        setGridData(dataSet1);

        rowEl = getGridRows(el);

        clickRowMultiselect(rowEl, 0);

        $scope.$digest();
        $timeout.flush();

        callback({xs: true});
        $scope.$digest();

        mobileButtonsEl = el.find('.bb-grid-action-bar .bb-grid-action-bar-buttons button');

        expect(mobileButtonsEl.eq(0)).toBeVisible();

        expect(mobileButtonsEl.eq(0).find('span').eq(0)).toHaveText('Choose an action');

        mobileButtonsEl.eq(0).click();
        $scope.$digest();


        mobileActionsEl = el.find('.bb-grid-action-bar-mobile-buttons .bb-grid-action-bar-btn-container button');

        expect(mobileActionsEl.length).toBe(2);

        expect(mobileActionsEl.eq(0)).toHaveText('Guitar Action (1)');
        expect(mobileActionsEl.eq(0)).toHaveClass('btn-primary');

        expect(mobileActionsEl.eq(1)).toHaveText('Drum Action (0)');
        expect(mobileActionsEl.eq(1)).toHaveClass('bb-btn-secondary');
        expect(mobileActionsEl.eq(1)).toBeDisabled();

        cancelChooseActionEl = el.find('.bb-grid-action-bar-mobile-buttons .bb-grid-action-bar-mobile-cancel');
        cancelChooseActionEl.click();
        $scope.$digest();

        mobileButtonsEl = el.find('.bb-grid-action-bar .bb-grid-action-bar-buttons button');
        expect(mobileButtonsEl.eq(0)).toBeVisible();
    });

    it('handles actions being undefined', function () {
        var rowEl,
            actionBarDirectiveEl;

        el = setUpGrid(actionbarGridHtml);

        setGridData(dataSet1);

        rowEl = getGridRows(el);
        actionBarDirectiveEl = el.find('[bb-multiselect-actions="multiselectActions"]');
        expect(actionBarDirectiveEl.length).toBe(1);

        actionBarDirectiveEl.isolateScope().locals.actions = null;

        clickRowMultiselect(rowEl, 0);

        $timeout.flush();
        expect(actionBarDirectiveEl.isolateScope().locals.showActionBar).toBe(false);
    });

    describe('filtered data', function () {
        it('will only show the selected items that are in the data', function () {
            var rowEl;

            el = setUpGrid(actionbarGridHtml);

            setGridData(dataSet1);

            rowEl = getGridRows(el);

            clickRowMultiselect(rowEl, 0);
            $timeout.flush();

            clickRowMultiselect(rowEl, 2);
            $timeout.flush();

            $scope.$digest();

            expect($scope.locals.gridActions[0].selections).toEqual([dataSet1[0], dataSet1[2]]);
            expect($scope.locals.gridActions[1].selections).toEqual([]);

            $scope.locals.gridOptions.data = [dataSet1[0]];

            $scope.$digest();

            expect($scope.locals.gridActions[0].selections).toEqual([dataSet1[0]]);
            expect($scope.locals.gridActions[1].selections).toEqual([]);
            expect($scope.locals.selectedRows).toEqual([dataSet1[0], dataSet1[2]]);

        });

        it('will only clear the selected items that are in the data', function () {
            var rowEl,
                clearButtonEl;

            el = setUpGrid(actionbarGridHtml);

            setGridData(dataSet1);

            rowEl = getGridRows(el);

            clickRowMultiselect(rowEl, 0);

            clickRowMultiselect(rowEl, 2);

            $timeout.flush();

            $scope.$digest();

            expect($scope.locals.gridActions[0].selections).toEqual([dataSet1[0], dataSet1[2]]);
            expect($scope.locals.gridActions[1].selections).toEqual([]);

            $scope.locals.gridOptions.data = [dataSet1[0]];

            $scope.$digest();

            expect($scope.locals.gridActions[0].selections).toEqual([dataSet1[0]]);
            expect($scope.locals.gridActions[1].selections).toEqual([]);
            expect($scope.locals.selectedRows).toEqual([dataSet1[0], dataSet1[2]]);


            clearButtonEl = el.find('.bb-grid-action-bar .bb-grid-action-bar-clear-selection');

            clearButtonEl.click();

            $timeout.flush();

            expect($scope.locals.gridActions[0].selections).toEqual([]);
            expect($scope.locals.gridActions[1].selections).toEqual([]);

            expect($scope.locals.selectedRows).toEqual([dataSet1[2]]);

            $scope.locals.gridOptions.data = dataSet1;

            $scope.$digest();

            expect($scope.locals.gridActions[0].selections).toEqual([dataSet1[2]]);
            expect($scope.locals.gridActions[1].selections).toEqual([]);
            expect($scope.locals.selectedRows).toEqual([dataSet1[2]]);

        });
    });


});

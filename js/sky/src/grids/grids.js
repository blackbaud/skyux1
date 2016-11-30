/*jslint plusplus: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var DEFAULT_ITEMS_PER_PAGE = 5,
        DEFAULT_MAX_PAGES = 5,
        DEFAULT_COLUMN_SIZE = 150,
        MULTISELECT_COLUMN_SIZE = 35,
        DROPDOWN_TOGGLE_COLUMN_SIZE = 40,
        DROPDOWN_TOGGLE_COLUMN_NAME = 'dropdownToggle',
        MULTISELECT_COLUMN_NAME = 'cb';


    function arrayObjectIndexOf(array, obj) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (angular.equals(array[i], obj)) {
                return i;
            }
        }
        return -1;
    }

    angular.module('sky.grids', 
            [
                'sky.infinitescroll',
                'sky.contextmenu', 
                'sky.mediabreakpoints', 
                'sky.viewkeeper', 
                'sky.highlight', 
                'sky.resources', 
                'sky.data', 
                'sky.grids.filters', 
                'sky.grids.actionbar', 
                'sky.window', 
                'sky.grids.toolbar'
                ])
        .controller('bbGridContextMenuController', ['$scope', function ($scope) {
            function toggleDropdown($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.locals.is_open = !$scope.locals.is_open;
            }

            $scope.locals = {
                is_open: false,
                items: [],
                toggleDropdown: toggleDropdown
            };

            /*istanbul ignore else */
            /* sanity check */
            if (angular.isFunction($scope.getContextMenuItems)) {
                $scope.locals.items = $scope.getContextMenuItems($scope.rowData.id, $scope.rowData);
            }
        }])


        .directive('bbGrid', ['$window', '$compile', '$templateCache', 'bbMediaBreakpoints', 'bbViewKeeperBuilder', 'bbHighlight', 'bbResources', 'bbData', '$controller', '$timeout', 'bbWindow', '$q',

            function ($window, $compile, $templateCache, bbMediaBreakpoints, bbViewKeeperBuilder, bbHighlight, bbResources, bbData, $controller, $timeout, bbWindow, $q) {
                return {
                    replace: true,
                    transclude: {
                        'bbGridToolbar': '?bbGridToolbar'    
                    },
                    require: ['bbGrid', '?^^bbListbuilder'],
                    restrict: 'E',
                    scope: {
                        options: '=bbGridOptions',
                        multiselectActions: '=?bbMultiselectActions',
                        updateMultiselectActions: '&bbSelectionsUpdated',
                        paginationOptions: '=?bbGridPagination',
                        selectedRows: '=?bbSelectedRows'
                    },
                    controller: ['$scope', function ($scope) {
                        var locals,
                            self = this;

                        function searchApplied(searchText) {
                            locals.appliedSearchText = searchText;
                            /*istanbul ignore else */
                            /* sanity check */
                            if (angular.isFunction(locals.highlightSearchText)) {
                                locals.highlightSearchText(locals.appliedSearchText);
                            }
                        }

                        self.searchApplied = searchApplied;

                        self.setFilters = function (filters) {
                            /*istanbul ignore else */
                            /* sanity check */
                            if (angular.isFunction(locals.setFilters)) {
                                locals.setFilters(filters);
                            }
                        };

                        self.syncViewKeepers = function () {
                            /*istanbul ignore else */
                            /* sanity check */
                            if ($scope.syncViewKeepers) {
                                $scope.syncViewKeepers();
                            }
                        };

                        self.syncActionBarViewKeeper = function () {
                            /*istanbul ignore else */
                            /* sanity check */
                            if (angular.isFunction($scope.syncActionBarViewKeeper)) {
                                $scope.syncActionBarViewKeeper();
                            }
                        };

                        self.resetMultiselect = function () {
                            /*istanbul ignore else */
                            /* sanity check */
                            if (angular.isFunction(locals.resetMultiselect)) {
                                locals.resetMultiselect();
                            }
                        };

                        self.getVisibleSelections = function (data, selected) {
                            var i,
                                index,
                                result = [];

                            for (i = 0; i < selected.length; i++) {
                                index = arrayObjectIndexOf(data, selected[i]);
                                if (index > -1) {
                                    result.push(selected[i]);
                                }
                            }
                            return result;
                        };

                        self.toggleMultiselectRows = function (visibleSelectedRows) {
                            /*istanbul ignore else */
                            /* sanity check */
                            if (angular.isFunction(locals.toggleMultiselectRows)) {
                                locals.toggleMultiselectRows(visibleSelectedRows);
                            }
                        };

                        self.syncGridHeaderScrollToTopScrollbar = function () {
                            /*istanbul ignore else */
                            /* sanity check */
                            if (angular.isFunction(locals.topScrollbarScroll)) {
                                locals.topScrollbarScroll();
                            }
                        };

                        self.highlightSearchText = function () {
                            /*istanbul ignore else */
                            /* sanity check */
                            if (angular.isFunction(locals.highlightSearchText)) {
                                locals.highlightSearchText();
                            }
                        };

                        

                        self.scope = $scope;

                        $scope.resources = bbResources;

                        locals = $scope.locals = {
                            gridId: 'bbgrid-table-' + $scope.$id,
                            hasAdd: false,
                            hasColPicker: true,
                            hasFilters: true,
                            applySearchText: function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (angular.isFunction(self.applySearchText)) {
                                    self.applySearchText();
                                }
                            }
                        };

                        $scope.$watch('options.viewKeeperOffsetElId', function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                if (self.viewKeeperChangedHandler) {
                                    self.viewKeeperChangedHandler(newValue);
                                }
                            }
                        });
                    }],
                    link: function ($scope, element, attr, ctrls, $transclude) {
                        var bbGrid = ctrls[0],
                            listbuilderCtrl = ctrls[1];
                            
                        $scope.hasListbuilder = ctrls[1] !== null;

                        $scope.customToolbar = {
                            hasCustomToolbar: false
                        };
                        $scope.customToolbar.hasCustomToolbar = $transclude.isSlotFilled('bbGridToolbar');

                        $scope.$watch('locals.hasCustomToolbar', function () {
                            var breakpoints = {},
                                cellScopes,
                                columnCount = 0,
                                columnModel,
                                compiledTemplates = [],
                                currentExtendedColumnWidth,
                                extendedColumnIndex,
                                extendedColumnName,
                                fullGrid,
                                getContextMenuItems,
                                hasTemplatedColumns,
                                header,
                                id,
                                locals = $scope.locals,
                                localRowSelect = false,
                                needsExtendedColumnResize,
                                originalExtendedColumnWidth,
                                seemore_template = 'sky/templates/grids/seemore.html',
                                dropdown_template = 'sky/templates/grids/dropdown.html',
                                reorderingColumns,
                                tableBody,
                                tableEl = element.find('table'),
                                tableDomEl = tableEl[0],
                                tableWrapper = element.find('.table-responsive'),
                                tableWrapperWidth,
                                toolbarContainer = element.find('.bb-grid-toolbar-viewkeeper'),
                                toolbarContainerId,
                                totalColumnWidth,
                                verticalOffSetElId,
                                vkActionBarAndBackToTop,
                                vkToolbars,
                                vkHeader,
                                windowEl = $($window),
                                windowEventId,
                                resizeStartColWidth,
                                hasPristineColumns = true,
                                doNotResetRows = false;

                            function getTopScrollbar() {
                                if (!$scope.hasListbuilder) {
                                    return element.find('.bb-grid-top-scrollbar');
                                } else {
                                    return listbuilderCtrl.getListbuilderToolbarTopScrollbarEl();
                                }
                                
                            }

                            function getTopScrollbarDiv() {
                                if (!$scope.hasListbuilder) {
                                    return element.find('.bb-grid-top-scrollbar > div');
                                } else {
                                    return listbuilderCtrl.getListbuilderToolbarTopScrollbarEl().find(' > div');
                                }
                            }

                            function updateGridLoadedTimestampAndRowCount(count) {
                                $scope.locals.timestamp = new Date().getTime();
                                $scope.locals.rowcount = count;
                            }

                            function reInitGrid() {
                                if ($scope.options && $scope.options.selectedColumnIds && $scope.options.selectedColumnIds.length > 0 && tableEl[0].grid) {

                                    initGrid();

                                    if ($scope.options.data && $scope.options.data.length > 0) {
                                        setRows($scope.options.data);
                                    }
                                }
                            }

                            function mediaBreakpointHandler(newBreakpoints) {
                                breakpoints = newBreakpoints;
                                reInitGrid();
                            }

                            function buildColumnClasses(column) {
                                var classes = '';

                                //if this column does not allow search then add the appropriate class. This is used when highlighting search results
                                if (column.exclude_from_search) {
                                    classes += "bb-grid-no-search ";
                                }

                                return classes;
                            }

                            function getEmptyString() {
                                return '';
                            }

                            function buildCellAttribute(rowId, cellValue, rawObject, column) {
                                /*jslint unparam: true*/
                                return "data-grid-field='" + column.name + "'" + "data-bbauto-field='" + column.name + "'" + "data-bbauto-index='" + (tableEl.getInd(rowId) - 1) + "'";
                            }

                            function getColumnById(columns, id) {
                                var column,
                                    i;

                                for (i = 0; i < columns.length; i++) {
                                    column = columns[i];
                                    if (column.id === id) {
                                        return column;
                                    }
                                }
                            }

                            function resetExtendedColumn() {
                                //wipe out extended column stuff
                                extendedColumnName = null;
                                currentExtendedColumnWidth = null;
                                originalExtendedColumnWidth = null;
                                extendedColumnIndex = null;
                                needsExtendedColumnResize = false;
                            }

                            function getBreakpointsWidth(column) {
                                var columnDefault;

                                if (column.width_all > 0) {
                                    columnDefault = column.width_all;
                                } else {
                                    columnDefault = DEFAULT_COLUMN_SIZE;
                                }

                                if (breakpoints.xs) {
                                    return column.width_xs > 0 ? column.width_xs : columnDefault;
                                } else if (breakpoints.sm) {
                                    return column.width_sm > 0 ? column.width_sm : columnDefault;
                                } else if (breakpoints.md) {
                                    return column.width_md > 0 ? column.width_md : columnDefault;
                                } else if (breakpoints.lg) {
                                    return column.width_lg > 0 ? column.width_lg : columnDefault;
                                }

                                return columnDefault;
                            }

                            function buildColumnModel(columns, selectedColumnIds) {
                                var colModel = [],
                                    column,
                                    colWidth,
                                    index,
                                    gridColumn;

                                hasTemplatedColumns = false;

                                if (getContextMenuItems) {
                                    colModel.push({
                                        classes: 'bb-grid-dropdown-cell',
                                        fixed: true,
                                        sortable: false,
                                        name: DROPDOWN_TOGGLE_COLUMN_NAME,
                                        label: ' ',
                                        width: DROPDOWN_TOGGLE_COLUMN_SIZE,
                                        title: false,
                                        hidedlg: true,
                                        resizable: false,
                                        search: false,
                                        template_url: dropdown_template,
                                        controller: 'bbGridContextMenuController',
                                        cellattr: buildCellAttribute,
                                        formatter: getEmptyString,
                                        is_context_menu: true
                                    });

                                    /*istanbul ignore else */
                                    /* sanity check */
                                    if (!compiledTemplates[dropdown_template]) {
                                        compiledTemplates[dropdown_template] = $compile($templateCache.get(dropdown_template));
                                    }

                                    hasTemplatedColumns = true;

                                    totalColumnWidth = totalColumnWidth + DROPDOWN_TOGGLE_COLUMN_SIZE;
                                }


                                resetExtendedColumn();

                                for (index = 0; index < selectedColumnIds.length; index++) {
                                    column = getColumnById(columns, selectedColumnIds[index]);

                                    if (column) {

                                        colWidth = getBreakpointsWidth(column);

                                        //If this is the last selected column and the sum of the columns is shorter than the area available, extend the last column
                                        if ((index === (selectedColumnIds.length - 1)) && (tableWrapper.width() > (colWidth + totalColumnWidth))) {
                                            needsExtendedColumnResize = true;
                                            originalExtendedColumnWidth = colWidth;
                                            extendedColumnName = column.name;
                                            extendedColumnIndex = index;

                                            //If multiselect and/or contextmenu exist, then the last column index is shifted.
                                            if (locals.multiselect) {
                                                extendedColumnIndex =  extendedColumnIndex + 1;
                                            }
                                            if (getContextMenuItems) {
                                                extendedColumnIndex = extendedColumnIndex + 1;
                                            }

                                            colWidth = tableWrapper.width() - totalColumnWidth;
                                            currentExtendedColumnWidth = colWidth;
                                        }

                                        gridColumn = {
                                            index: column.id.toString(),
                                            sortable: false,
                                            id: column.id,
                                            name: column.name,
                                            label: column.caption,
                                            align: (column.right_align ? 'right' : (column.center_align ? 'center' : 'left')),
                                            classes: buildColumnClasses(column),
                                            cellattr: buildCellAttribute,
                                            controller: column.controller,
                                            template_url: column.template_url,
                                            jsonmap: column.jsonmap,
                                            allow_see_more: column.allow_see_more,
                                            title: angular.isUndefined(column.title) || column.title,
                                            width: colWidth
                                        };

                                        if (column.allow_see_more && !gridColumn.template_url) {
                                            gridColumn.template_url = seemore_template;

                                            if (!compiledTemplates[seemore_template]) {
                                                compiledTemplates[seemore_template] = $compile($templateCache.get(seemore_template));
                                            }
                                        }

                                        if (gridColumn.template_url) {
                                            //Setup a formatter to return an empty string until the
                                            //angular template is processed for the cell.
                                            gridColumn.formatter = getEmptyString;
                                            hasTemplatedColumns = true;
                                        } else if (column.colFormatter) {
                                            gridColumn.formatter = column.colFormatter;
                                        }

                                        colModel.push(gridColumn);

                                        totalColumnWidth = totalColumnWidth + colWidth;
                                    }
                                }

                                return colModel;
                            }

                            function getColumnElementIdFromName(columnName) {
                                return locals.gridId + "_" + columnName;
                            }

                            function getColumnNameFromElementId(columnName) {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (columnName) {
                                    return columnName.replace(locals.gridId + "_", "");
                                }
                            }

                            function getDesiredGridWidth() {
                                var width = tableWrapper.width();

                                if (width < totalColumnWidth) {
                                    width = totalColumnWidth;
                                    tableWrapper.addClass('bb-grid-table-wrapper-overflow');
                                } else {
                                    tableWrapper.addClass('bb-grid-table-wrapper');
                                }

                                return width;
                            }

                            function setScrollbarHeight() {
                                var topScrollbar = getTopScrollbar(),
                                    topScrollbarDiv = getTopScrollbarDiv(),
                                    scrollbarWidth = bbWindow.getScrollbarWidth();

                                if (totalColumnWidth > (topScrollbar.width()) && !breakpoints.xs) {
                                    topScrollbar.height(scrollbarWidth);
                                    topScrollbarDiv.height(scrollbarWidth);
                                } else {
                                    topScrollbar.height(0);
                                    topScrollbarDiv.height(0);
                                }
                            }

                            function resetTopScrollbar() {
                                var topScrollbarDiv = getTopScrollbarDiv();
                                topScrollbarDiv.width(totalColumnWidth);
                                setScrollbarHeight();
                            }

                            function setColumnSize(columnName, columnSize, totalWidth) {
                                var gridHeaders,
                                    colSizePx = columnSize + 'px',
                                    bodyScrollLeft,
                                    tableGrid = tableEl[0].grid;

                                gridHeaders = tableGrid.headers;
                                bodyScrollLeft = tableGrid.bDiv.scrollLeft;
                                /* jqGrid does not provide a function to change a single column column size.
                                   This code snippet mirrors how jqGrid changes column size in their own dragEnd
                                   function.
                                */
                                tableEl[0].p.colModel[extendedColumnIndex].width = columnSize;
                                gridHeaders[extendedColumnIndex].width = columnSize;
                                gridHeaders[extendedColumnIndex].el.style.width = colSizePx;
                                tableGrid.cols[extendedColumnIndex].style.width = colSizePx;
                                /* istanbul ignore next */
                                /* sanity check */
                                tableEl[0].p.tblwidth = totalWidth || tableEl[0].p.tblwidth;
                                tableGrid.hDiv.scrollLeft = bodyScrollLeft;
                            }

                            function resizeExtendedColumn(changedWidth, isIncreasing) {
                                var extendedShrinkWidth = currentExtendedColumnWidth - originalExtendedColumnWidth;

                                //If the extended portion of the last column is less than the amount resized
                                if (extendedShrinkWidth <= changedWidth) {
                                    //decrease extended column to original size


                                    //increase grid width by remainder and wipe out all the extended stuff
                                    if (isIncreasing) {
                                        totalColumnWidth = totalColumnWidth + (changedWidth - extendedShrinkWidth);
                                    } else {
                                        totalColumnWidth = totalColumnWidth - extendedShrinkWidth;
                                    }
                                    setColumnSize(extendedColumnName, originalExtendedColumnWidth, totalColumnWidth);

                                    tableWrapper.addClass('bb-grid-table-wrapper-overflow');
                                    resetExtendedColumn();

                                } else {
                                    //decrease extended column width by changedWidth
                                    currentExtendedColumnWidth = currentExtendedColumnWidth - changedWidth;


                                    if (!isIncreasing) {
                                        totalColumnWidth = totalColumnWidth - changedWidth;
                                    }
                                    setColumnSize(extendedColumnName, currentExtendedColumnWidth, totalColumnWidth);

                                }
                                tableEl.setGridWidth(totalColumnWidth, false);
                                resetTopScrollbar();
                            }

                            function resetGridWidth(oldWidth, newWidth) {
                                var changedWidth,
                                    topScrollbar = getTopScrollbar(),
                                    width;

                                topScrollbar.width(tableWrapper.width());
                                if (needsExtendedColumnResize && newWidth < oldWidth) {
                                    changedWidth = oldWidth - newWidth;
                                    resizeExtendedColumn(changedWidth, false);
                                } else {
                                    if (totalColumnWidth === oldWidth) {
                                        totalColumnWidth = newWidth;
                                    }

                                    width = getDesiredGridWidth();

                                    /*istanbul ignore else */
                                    /* sanity check */
                                    if (width > 0) {
                                        tableEl.setGridWidth(width);
                                        resetTopScrollbar();
                                    }
                                }
                            }

                            function getLastIndex() {
                                var lastIndex = $scope.options.selectedColumnIds.length - 1;

                                if (locals.multiselect) {
                                    lastIndex = lastIndex + 1;
                                }
                                if (getContextMenuItems) {
                                    lastIndex = lastIndex + 1;
                                }

                                return lastIndex;
                            }

                            function resizeStart(event, index) {
                                var lastIndex = getLastIndex(),
                                    jqGridEl,
                                    thEls;

                                hasPristineColumns = false;

                                jqGridEl = element.find('.ui-jqgrid');

                                //if resizing last element and tableEl smaller than table wrapper

                                if (index === lastIndex && tableWrapperWidth > jqGridEl.width()) {
                                    //increase width of child of table-responsive
                                    jqGridEl.width(tableWrapperWidth);
                                    //increase width of hdiv
                                    element.find('.ui-jqgrid-hdiv').width(tableWrapperWidth);
                                    //make padding right on tr of headers
                                    element.find('.ui-jqgrid-hdiv tr').css('padding-right', tableWrapperWidth.toString() + 'px');
                                }

                                fullGrid.find('.ui-jqgrid-resize-mark').height(fullGrid.height());
                                thEls = element.find('.ui-jqgrid .ui-jqgrid-hdiv .ui-jqgrid-htable th');
                                resizeStartColWidth = parseInt(thEls[index].style.width);

                            }

                            function syncHeaderToTableWrapper() {
                                if (vkHeader && vkHeader.isFixed) {
                                    header.width(tableWrapper.width());
                                    header.scrollLeft(tableWrapper.scrollLeft());
                                }
                            }

                            function resizeStop(newWidth, index) {
                                var changedWidth,
                                    resizedColumnIndex = index;

                                //If multiselect and/or contextmenu exist, then the resized column index is shifted.
                                if (locals.multiselect) {
                                    resizedColumnIndex =  resizedColumnIndex - 1;
                                }
                                if (getContextMenuItems) {
                                    resizedColumnIndex =  resizedColumnIndex - 1;
                                }

                                $scope.$emit("columnsResized", { newWidth: newWidth, index: resizedColumnIndex });

                                tableWrapper.addClass('bb-grid-table-wrapper-overflow');

                                changedWidth = newWidth - resizeStartColWidth;

                                //If your last column was extended and this is the first resize
                                if (needsExtendedColumnResize) {
                                    //If the column you're resizing is not the extended column and you're increasing the size
                                    if (index !== extendedColumnIndex && changedWidth > 0) {

                                        resizeExtendedColumn(changedWidth, true);

                                        resetExtendedColumn();
                                        syncHeaderToTableWrapper();

                                        return;
                                    }
                                    resetExtendedColumn();
                                }

                                totalColumnWidth = totalColumnWidth + changedWidth;
                                tableEl.setGridWidth(totalColumnWidth, false);
                                resetTopScrollbar();
                                syncHeaderToTableWrapper();

                                return;
                            }

                            function setSortStyles() {
                                var className,
                                    headerElId,
                                    sortOptions;
                                /*istanbul ignore else */
                                /* sanity check */
                                if (header) {
                                    header.find('th').removeClass('sorting-asc').removeClass('sorting-desc');
                                    /* istanbul ignore else */
                                    /* sanity check */
                                    if ($scope.options) {
                                        sortOptions = $scope.options.sortOptions;
                                        if (sortOptions && sortOptions.column) {
                                            headerElId = getColumnElementIdFromName(sortOptions.column);

                                            if (sortOptions.descending) {
                                                className = 'sorting-desc';
                                            } else {
                                                className = 'sorting-asc';
                                            }

                                            header.find('#' + headerElId).addClass(className);
                                        }
                                    }
                                }
                            }

                            function columnIsSortable(columnName) {
                                var excludedColumns,
                                    sortOptions = $scope.options.sortOptions;

                                if (columnName === DROPDOWN_TOGGLE_COLUMN_NAME || columnName === MULTISELECT_COLUMN_NAME) {
                                    return false;
                                }


                                /*istanbul ignore else */
                                /* sanity check */
                                if (sortOptions) {
                                    excludedColumns = sortOptions.excludedColumns;
                                    if (excludedColumns) {
                                        if (excludedColumns.indexOf(columnName) > -1) {
                                            return false;
                                        }
                                    }
                                }
                                return true;
                            }

                            function highlightSearchText(highlightText) {
                                var options = $scope.options;
                                
                                if (!highlightText && options && options.searchText) {
                                    highlightText = options.searchText;
                                }

                                bbHighlight.clear(tableEl);
                                if (highlightText) {
                                    bbHighlight(tableEl.find("td").not('.bb-grid-no-search'), highlightText, 'highlight');
                                }
                            }

                            function linkCellValue(scope, cell, linkFunction) {
                                linkFunction(scope, function (cloned) {
                                    cell.append(cloned);
                                });
                            }

                            function afterInsertRow(rowid, rowdata, rowelem) {
                                /*jshint validthis: true */
                                var cell,
                                    column,
                                    columnData,
                                    i,
                                    itemScope,
                                    row,
                                    rowIndex;

                                if (hasTemplatedColumns) {

                                    if (!tableBody) {
                                        tableBody = $(this);
                                    }

                                    row = tableBody.find('#' + rowid);

                                    for (i = 0; i < columnModel.length; i++) {
                                        column = columnModel[i];

                                        if (column.template_url) {

                                            cell = row.find('[data-grid-field="' + column.name + '"]');
                                            columnData = rowdata[column.name];

                                            //Create a new scope and apply the cell object's properties to it.
                                            itemScope = $scope.$new(true);

                                            itemScope.data = columnData;
                                            itemScope.rowData = rowelem;

                                            if (column.allow_see_more) {
                                                itemScope.skyResources = $scope.resources;
                                            }

                                            if (column.is_context_menu) {
                                                itemScope.getContextMenuItems = getContextMenuItems;
                                            }

                                            //make the resources from the caller available to the column templates
                                            if ($scope.options.resources) {
                                                itemScope.resources = $scope.options.resources;
                                            }

                                            if (column.controller) {
                                                $controller(column.controller, {
                                                    $scope: itemScope
                                                });
                                            }

                                            cellScopes.push(itemScope); //Stash scope for cleanup later.

                                            linkCellValue(itemScope, cell, compiledTemplates[column.template_url]);
                                        }
                                    }
                                }

                                rowIndex = tableEl.getInd(rowid);

                                //check if row should be multiselected
                                if ($scope.selectedRows && $scope.selectedRows.length > 0) {

                                    row = $scope.options.data[(rowIndex - 1)];
                                    if (row && arrayObjectIndexOf($scope.selectedRows, row) > -1) {
                                        tableEl.setSelection(rowid, false);
                                    }
                                }
                            }

                            function setColumnHeaderAlignment() {
                                var alignmentClass,
                                    column,
                                    i;

                                for (i = 0; i < columnModel.length; i++) {
                                    column = columnModel[i];
                                    if (column.align === 'center') {
                                        alignmentClass = 'bb-grid-th-center';
                                    } else if (column.align === 'right') {
                                        alignmentClass = 'bb-grid-th-right';
                                    } else {
                                        alignmentClass = 'bb-grid-th-left';
                                    }

                                    tableEl.setLabel(column.name, '', alignmentClass);

                                }
                            }

                            function gridComplete() {
                                setColumnHeaderAlignment();
                            }

                            function gridColumnsReordered(orderedColumns) {
                                var i,
                                    offset = 0,
                                    oldIndex,
                                    selectedColumnIds = $scope.options.selectedColumnIds,
                                    newSelectedColumnIds = [];

                                resetExtendedColumn();

                                //Need to account for context menu if it exists.  It will always be the first
                                //column before and after the reorder
                                if (angular.isFunction(getContextMenuItems)) {
                                    offset += 1;
                                }

                                if (locals.multiselect) {
                                    offset += 1;
                                }

                                for (i = offset; i < orderedColumns.length; i++) {
                                    oldIndex = orderedColumns[i];
                                    newSelectedColumnIds.push(selectedColumnIds[oldIndex - offset]);
                                }

                                reorderingColumns = true;
                                $scope.options.selectedColumnIds = newSelectedColumnIds;
                                $scope.$apply();
                            }

                            function getSortable() {
                                /*  The clone option for jquery ui clones the element that is being dragged.
                                    This prevents the click event from being invoked while users are reordering
                                    columns http://api.jqueryui.com/sortable/#option-helper
                                */
                                var sortable = {
                                    update: gridColumnsReordered,
                                    options: {
                                        helper: 'clone'
                                    }

                                };

                                if (getContextMenuItems) {
                                    sortable.exclude = "#" + $scope.locals.gridId + "_" + DROPDOWN_TOGGLE_COLUMN_NAME;
                                }
                                return sortable;
                            }

                            function clearSelectedRowsObject() {
                                $scope.selectedRows = [];
                            }


                            function resetMultiselect() {
                                clearSelectedRowsObject();
                                tableEl.resetSelection();
                            }



                            function onSelectAll(rowIds, status) {
                                /*jslint unparam: true */
                                var allRowData;

                                localRowSelect = true;

                                clearSelectedRowsObject();

                                if (status === true) {
                                    allRowData = $scope.options.data;
                                    if (allRowData && allRowData.length > 0) {
                                        $scope.selectedRows = allRowData.slice();
                                    }
                                }
                                $scope.$apply();
                            }


                            function toggleMultiselectRows(visibleSelectedRows) {
                                var i,
                                    index,
                                    rowIds;

                                rowIds = tableEl.getDataIDs();

                                for (i = 0; i < visibleSelectedRows.length; i++) {
                                    index = arrayObjectIndexOf($scope.options.data, visibleSelectedRows[i]);
                                    tableEl.setSelection(rowIds[index], true);
                                }
                            }


                            function onSelectRow(rowId, status) {
                                $timeout(function () {
                                    var index,
                                        rowIndex = tableEl.getInd(rowId),
                                        row;
                                    row = $scope.options.data[(rowIndex - 1)];

                                    localRowSelect = true;

                                    index = arrayObjectIndexOf($scope.selectedRows, row);

                                    if (status === true && index === -1 && row) {
                                        $scope.selectedRows.push(row);
                                    } else if (status === false && index > -1) {
                                        $scope.selectedRows.splice(index, 1);
                                    }
                                });
                            }

                            function setMultiselectRow(rowId, rowIndex) {
                                var row;

                                tableEl.setSelection(rowId, false);
                                row  = $scope.options.data[(rowIndex - 1)];
                                $scope.selectedRows.push(row);
                            }

                            function beforeSelectRow(rowId, e) {
                                var endIndex,
                                    i,
                                    lastSelectedRow,
                                    rowIds,
                                    startIndex = parseInt(tableEl.getInd(rowId));

                                localRowSelect = true;

                                if (e.shiftKey) {
                                    lastSelectedRow = tableEl.getInd(tableEl.getGridParam('selrow'));
                                    resetMultiselect();

                                    //if lastSelectedRow is undefined or null, set to 1
                                    if (angular.isUndefined(lastSelectedRow) || lastSelectedRow === null) {
                                        lastSelectedRow = 1;
                                    }

                                    endIndex = parseInt(lastSelectedRow);

                                    rowIds = tableEl.getDataIDs();

                                    //set shift click selection first so last selected row is set properly
                                    if (endIndex < startIndex) {
                                        for (i = startIndex; i >  endIndex - 1; i = i - 1) {
                                            setMultiselectRow(rowIds[(i - 1)], i);
                                        }
                                    } else if (endIndex > startIndex) {
                                        for (i = startIndex; i <  endIndex + 1; i = i + 1) {
                                            setMultiselectRow(rowIds[(i - 1)], i);
                                        }
                                    } else {
                                        $scope.$apply();
                                        return true;
                                    }

                                    $scope.$apply();
                                    return false;
                                }
                                return true;
                            }

                            function pageChanged() {
                                var skip = ($scope.paginationOptions.currentPage - 1) * $scope.paginationOptions.itemsPerPage,
                                    top = $scope.paginationOptions.itemsPerPage;

                                $scope.$emit('loadMoreRows', {top: top, skip: skip});

                            }

                            function initializePagination() {
                                if (angular.isDefined($scope.paginationOptions)) {

                                    if (!$scope.paginationOptions.itemsPerPage) {
                                        $scope.paginationOptions.itemsPerPage = DEFAULT_ITEMS_PER_PAGE;
                                    }

                                    if (!$scope.paginationOptions.maxPages) {
                                        $scope.paginationOptions.maxPages = DEFAULT_MAX_PAGES;
                                    }

                                    if (!$scope.paginationOptions.currentPage) {
                                        $scope.paginationOptions.currentPage = 1;
                                    }

                                    $scope.paginationOptions.pageChanged = pageChanged;


                                }
                            }

                            function fancyCheckOff() {
                                element.find('td .bb-check-checkbox').off();
                            }

                            function wrapCheckboxEl(checkboxEl) {
                                checkboxEl.wrap('<label class="bb-check-wrapper"></label>');
                                checkboxEl.after('<span class="bb-check-checkbox"></span>');
                            }

                            function setUpFancyCheckHeader() {
                                var headerCheckEl =  header.find('th .cbox');
                                wrapCheckboxEl(headerCheckEl);
                            }

                            function setUpFancyCheckCell() {
                                var checkCellEl = element.find('td > .cbox');
                                wrapCheckboxEl(checkCellEl);
                                element.find('td .bb-check-checkbox').on('click', function (event) {
                                    event.preventDefault();
                                });
                            }

                            function getIdPrefix() {
                                return 'bb-grid-row-' + $scope.$id + '-';
                            }

                            function initGrid() {
                                var columns,
                                    jqGridOptions,
                                    selectedColumnIds,
                                    useGridView = true,
                                    hoverrows = false;

                                totalColumnWidth = 0;

                                hasPristineColumns = true;

                                tableWrapperWidth = tableWrapper.width();

                                locals.multiselect = false;

                                //Clear reference to the table body since it will be recreated.
                                tableBody = null;

                                //Unload grid if it already exists.
                                tableEl.jqGrid('GridUnload');
                                fancyCheckOff();

                                tableEl = element.find('table');
                                tableDomEl = tableEl[0];

                                /*istanbul ignore else */
                                /* sanity check */
                                if ($scope.options) {

                                    columns = $scope.options.columns;
                                    selectedColumnIds = $scope.options.selectedColumnIds;
                                    getContextMenuItems = $scope.options.getContextMenuItems;

                                    if ($scope.options.multiselect) {
                                        locals.multiselect = true;
                                        hoverrows = true;

                                        totalColumnWidth = totalColumnWidth + MULTISELECT_COLUMN_SIZE;
                                    }
                                    $scope.searchText = $scope.options.searchText;
                                }

                                // Allow grid styles to be changed when grid is in multiselect mode (such as the
                                // header checkbox alignment).
                                element[locals.multiselect ? 'addClass' : 'removeClass']('bb-grid-multiselect');


                                if (getContextMenuItems) {
                                    useGridView = false;
                                }

                                if (columns && selectedColumnIds) {


                                    columnModel = buildColumnModel(columns, selectedColumnIds);
                                    columnCount = columnModel.length;

                                    jqGridOptions = {
                                        afterInsertRow: afterInsertRow,
                                        autoencode: true,
                                        beforeSelectRow: beforeSelectRow,
                                        colModel: columnModel,
                                        datatype: angular.noop,
                                        gridComplete: gridComplete,
                                        gridView: useGridView,
                                        height: 'auto',
                                        hoverrows: hoverrows,
                                        idPrefix: getIdPrefix(),
                                        multiselect: locals.multiselect,
                                        multiselectWidth: MULTISELECT_COLUMN_SIZE,
                                        onSelectAll: onSelectAll,
                                        onSelectRow: onSelectRow,
                                        resizeStart: resizeStart,
                                        resizeStop: resizeStop,
                                        rowNum: -1,
                                        shrinktofit: false,
                                        sortable: getSortable(),
                                        width: getDesiredGridWidth()
                                    };


                                    tableEl.jqGrid(jqGridOptions);

                                    header = $(tableDomEl.grid.hDiv);

                                    //Attach click handler for sorting columns
                                    header.find('th').on('click', function () {
                                        var sortOptions = $scope.options.sortOptions,
                                            columnName;

                                        if (!sortOptions) {
                                            sortOptions = $scope.options.sortOptions = {};
                                        }

                                        columnName = getColumnNameFromElementId(this.id);

                                        if (columnIsSortable(columnName) && !bbGrid.headerSortInactive) {
                                            sortOptions.column = columnName;
                                            sortOptions.descending = $(this).hasClass('sorting-asc');
                                            $scope.$apply();
                                        }
                                    });

                                    fullGrid = header.parents('.ui-jqgrid:first');

                                    if (vkHeader) {
                                        vkHeader.destroy();
                                    }

                                    $scope.locals.showToolbar = true;

                                    getTopScrollbar().width(tableWrapper.width());
                                    resetTopScrollbar();

                                    if (!$scope.options.fixedToolbar && !$scope.hasListbuilder) {
                                        vkHeader = new bbViewKeeperBuilder.create({
                                            el: header[0],
                                            boundaryEl: tableWrapper[0],
                                            verticalOffSetElId: toolbarContainerId,
                                            setWidth: true,
                                            onStateChanged: function () {
                                                if (vkHeader.isFixed) {
                                                    header.scrollLeft(tableWrapper.scrollLeft());
                                                } else {
                                                    header.scrollLeft(0);
                                                }

                                            }
                                        });
                                    } else if ($scope.hasListbuilder) {
                                        vkHeader = new bbViewKeeperBuilder.create({
                                            el: header[0],
                                            boundaryEl: tableWrapper[0],
                                            verticalOffSetElId: listbuilderCtrl.getListbuilderToolbarId(),
                                            setWidth: true,
                                            onStateChanged: function () {
                                                if (vkHeader.isFixed) {
                                                    header.scrollLeft(tableWrapper.scrollLeft());
                                                } else {
                                                    header.scrollLeft(0);
                                                }

                                            }
                                        });
                                    }

                                    setSortStyles();

                                    setUpFancyCheckHeader();

                                    $scope.gridCreated = true;

                                }

                            }

                            function destroyCellScopes() {
                                var i;
                                if (cellScopes) {
                                    for (i = 0; i < cellScopes.length; i++) {
                                        cellScopes[i].$destroy();
                                    }
                                }
                                cellScopes = [];
                            }

                            function loadColumnTemplates(callback) {
                                var columns,
                                    templateUrlsToLoad = {};

                                //Identify any template URLs that haven't been compiled
                                /*istanbul ignore else */
                                /* sanity check */
                                if ($scope.options) {
                                    columns = $scope.options.columns;
                                    /*istanbul ignore else */
                                    /* sanity check */
                                    if (columns) {
                                        angular.forEach(columns, function (column) {
                                            var templateUrl = column.template_url;

                                            if (templateUrl && !compiledTemplates[templateUrl]) {
                                                templateUrlsToLoad[templateUrl] = templateUrl;
                                            }
                                        });
                                    }
                                }

                                //Load template URLs that need compiling
                                bbData.load({
                                    text: templateUrlsToLoad
                                }).then(function (result) {
                                    var p,
                                        template;

                                    // Compile templates and store them for use when adding rows.
                                    for (p in result.text) {
                                        /*istanbul ignore else */
                                        /* sanity check */
                                        if (result.text.hasOwnProperty(p)) {
                                            template = result.text[p];

                                            /*istanbul ignore else */
                                            /* sanity check */
                                            if (template) {
                                                compiledTemplates[p] = $compile(template);
                                            }
                                        }
                                    }

                                    callback();
                                });
                            }

                            function handleTableWrapperResize() {
                                var newWidth = tableWrapper.width(),
                                    topScrollbar = getTopScrollbar();

                                if (tableWrapperWidth && tableWrapperWidth !== newWidth) {
                                    if (hasPristineColumns) {
                                        resetGridWidth(tableWrapperWidth, newWidth);
                                    } else {
                                        topScrollbar.width(newWidth);
                                    }
                                    tableWrapperWidth = newWidth;
                                } else {
                                    tableWrapperWidth = newWidth;
                                }
                            }

                            function setRows(rows) {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (tableDomEl.addJSONData) {
                                    loadColumnTemplates(function () {

                                        if (locals.multiselect) {
                                            element.find('td').off('mousedown.gridmousedown');
                                        }

                                        tableEl.resetSelection();

                                        fancyCheckOff();

                                        destroyCellScopes();
                                        tableDomEl.addJSONData(rows);
                                        $timeout(function () {
                                            highlightSearchText(locals.appliedSearchText);
                                        });
                                        handleTableWrapperResize();
                                        /*istanbul ignore next */
                                        /* sanity check */
                                        updateGridLoadedTimestampAndRowCount(rows ? rows.length : 0);

                                        setUpFancyCheckCell();

                                    });
                                }
                            }

                            function setupToolbarViewKeepers() {
                                if (vkToolbars) {
                                    vkToolbars.destroy();
                                }

                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.destroy();
                                }

                                /*istanbul ignore else */
                                /* sanity check */
                                if ($scope.options) {
                                    verticalOffSetElId = $scope.options.viewKeeperOffsetElId;
                                }

                                if (!$scope.options || !$scope.options.fixedToolbar) {
                                    vkToolbars = new bbViewKeeperBuilder.create({
                                        el: toolbarContainer[0],
                                        boundaryEl: tableWrapper[0],
                                        setWidth: true,
                                        verticalOffSetElId: verticalOffSetElId,
                                        onStateChanged: function () {
                                            $timeout(function () {
                                                locals.isScrolled = vkToolbars.isFixed;
                                            });
                                        }
                                    });
                                }


                                vkActionBarAndBackToTop = new bbViewKeeperBuilder.create({
                                    el: element.find('.bb-grid-action-bar-and-back-to-top')[0],
                                    boundaryEl: element[0],
                                    setWidth: true,
                                    verticalOffSetElId: verticalOffSetElId,
                                    fixToBottom: true
                                });
                            }

                            function backToTop() {
                                vkToolbars.scrollToTop();
                            }

                            locals.resetMultiselect = resetMultiselect;

                            locals.toggleMultiselectRows = toggleMultiselectRows;

                            locals.highlightSearchText = highlightSearchText;

                            locals.setFilters = function (filters) {
                                $scope.options.filters = filters;
                                $scope.locals.applySearchText();
                            };

                            function addMoreRowsToGrid(moreRows) {
                                tableEl.addRowData('', moreRows);
                                $scope.options.data = $scope.options.data.concat(moreRows);
                                setUpFancyCheckCell();
                                doNotResetRows = true;
                            }

                            function loadMore() {
                                var deferred = $q.defer(),
                                    loadMorePromise = deferred.promise;

                                loadMorePromise.then(addMoreRowsToGrid);

                                $scope.$emit('loadMoreRows', {
                                    promise: deferred
                                });

                                return loadMorePromise;

                            }

                            if (angular.isDefined(attr.bbGridInfiniteScroll)) {
                                $scope.locals.hasInfiniteScroll = true;
                            }

                            $scope.locals.loadMore = loadMore;

                            if (angular.isUndefined($scope.selectedRows) || !angular.isArray($scope.selectedRows)) {
                                $scope.selectedRows = [];
                            }

                            id = $scope.$id;
                            toolbarContainerId = id + '-toolbar-container';

                            locals.backToTop = backToTop;

                            //Apply unique id to the table.  ID is required by jqGrid.
                            toolbarContainer.attr('id', toolbarContainerId);

                            $scope.$watch('options.selectedColumnIds', function (newValue) {
                                var columnChangedData;

                                /*istanbul ignore else */
                                /* sanity check */
                                if (newValue) {
                                    if (reorderingColumns) {
                                        reorderingColumns = false;
                                        return;
                                    }

                                    initGrid();

                                    // re-evaluated so the grid won't automatically be reloaded with existing data.
                                    columnChangedData = {
                                        willResetData: false
                                    };

                                    $scope.$emit('includedColumnsChanged', columnChangedData);


                                    if (!columnChangedData.willResetData && $scope.options.data && $scope.options.data.length > 0) {
                                        // Data won't change as a result of the columns changing; reload existing data.
                                        setRows($scope.options.data);
                                    }
                                }
                            }, true);

                            $scope.$watchCollection('selectedRows', function (newSelections) {
                                var i,
                                    index,
                                    rowIds;

                                if (localRowSelect) {
                                    localRowSelect = false;
                                    return;
                                }

                                if (tableEl[0].grid && $scope.options.data && $scope.options.data.length > 0) {
                                    //blow away existing selections
                                    tableEl.resetSelection();

                                    rowIds = tableEl.getDataIDs();

                                    for (i = 0; i < newSelections.length; i++) {

                                        index = arrayObjectIndexOf($scope.options.data, newSelections[i]);

                                        if (index > -1) {
                                            tableEl.setSelection(rowIds[index], false);
                                        }

                                    }
                                }

                            });

                            $scope.$watch('paginationOptions', initializePagination, true);

                            $scope.$watchCollection('options.data', function (newValue) {
                                if (doNotResetRows) {
                                    doNotResetRows = false;
                                } else {
                                    setRows(newValue);
                                }
                            });

                            $scope.syncViewKeepers = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkToolbars) {
                                    vkToolbars.syncElPosition();
                                }
                            };

                            $scope.syncActionBarViewKeeper = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.syncElPosition();
                                }
                            };

                            $scope.$watch('options.sortOptions', setSortStyles, true);

                            $scope.$watchGroup(['options.viewKeeperOffsetElId', 'options.fixedToolbar'], function () {
                                setupToolbarViewKeepers();
                            });

                            $scope.$watch('options.filters', function (f) {
                                $scope.$broadcast('updateAppliedFilters', f);
                            });

                            $scope.$on("reInitGrid", function () {
                                reInitGrid();
                            });

                            bbMediaBreakpoints.register(mediaBreakpointHandler);

                            tableWrapper.on('scroll', function () {

                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkHeader) {
                                    vkHeader.syncElPosition();
                                }

                                if (header.hasClass('bb-viewkeeper-fixed')) {
                                    header.scrollLeft(tableWrapper.scrollLeft());
                                }

                                getTopScrollbar().scrollLeft(tableWrapper.scrollLeft());
                            });

                            windowEventId = 'bbgrid' + id;

                            windowEl.on('resize.' + windowEventId + ', orientationchange.' + windowEventId, function () {
                                handleTableWrapperResize();
                            });

                            // Reinitialize grid when grid element resizes from 0
                            $scope.$watch(function () {
                                return element.width();
                            }, function (newValue, oldValue) {
                                if (newValue !== oldValue && oldValue === 0) {
                                    reInitGrid();
                                }
                            });

                            $scope.locals.topScrollbarScroll = function () {
                                var topScrollbar = getTopScrollbar();
                                tableWrapper.scrollLeft(topScrollbar.scrollLeft());
                                if (header.hasClass('bb-viewkeeper-fixed')) {
                                    header.scrollLeft(topScrollbar.scrollLeft());
                                }
                            };

                            if ($scope.hasListbuilder) {
                                listbuilderCtrl.topScrollbarScrollAction = $scope.locals.topScrollbarScroll;
                            }

                            function destroyListbuilder() {
                                var topScrollbarEl,
                                    topScrollbarDivEl;
                                
                                if ($scope.hasListbuilder) {
                                    listbuilderCtrl.topScrollbarScrollAction = undefined;
                                    topScrollbarEl = getTopScrollbar();
                                    topScrollbarDivEl = getTopScrollbarDiv();
                                    topScrollbarEl.width(0);
                                    topScrollbarEl.height(0);
                                    topScrollbarDivEl.width(0);
                                    topScrollbarDivEl.height(0);
                                }
                                
                            }

                            $scope.locals.hasWaitAndEmpty = function () {
                                return $scope.options && $scope.options.loading && (!$scope.options.data || $scope.options.data.length < 1);
                            };


                            element.on('$destroy', function () {

                                destroyListbuilder();

                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkToolbars) {
                                    vkToolbars.destroy();
                                }

                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkHeader) {
                                    vkHeader.destroy();
                                }

                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.destroy();
                                }

                                windowEl.off('resize.' + windowEventId + ', orientationchange.' + windowEventId);

                                fancyCheckOff();

                                bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                            });
                        });
                    },
                    templateUrl: 'sky/templates/grids/grid.html'
                };
            }]);
}(jQuery));

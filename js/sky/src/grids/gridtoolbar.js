/*global angular */

(function () {
    'use strict';


    function BBGridToolbar(bbResources, bbColumnPicker) {
        return {
            require: '?^bbGrid',
            scope: {
                options: '=?bbToolbarOptions',
                bbGridFilterClick: '&?bbGridFilterClick',
                bbGridSearch: '&?bbGridSearch',
                bbGridSearchText: '<?bbGridSearchText',
                bbGridSearchTextChanged: '&?',
                bbGridSearchPlaceholder: '<?bbGridSearchPlaceholder'
            },
            transclude: {
                'bbGridToolbarFilterSummary': '?bbGridToolbarFilterSummary',
                'bbGridToolbarSort': '?bbGridToolbarSort'    
            },
            link: function ($scope, el, attr, bbGrid, $transclude) {
                var topScrollbarEl = el.find('.bb-grid-top-scrollbar');

                function applySearchText() {
                    var searchEl;

                    searchEl = el.find('.bb-search-container input');
                    /*istanbul ignore else */
                    /* sanity check */
                    if (angular.isFunction(searchEl.select) && searchEl.length > 0 && $scope.toolbarLocals.searchText) {
                        searchEl.eq(0).select();
                    }

                    $scope.options.searchText = $scope.toolbarLocals.searchText;

                    /*istanbul ignore else */
                    /* sanity check */
                    if (bbGrid !== null) {
                        bbGrid.highlightSearchText();
                    }
                }

                function toolbarSearch(searchText) {
                    $scope.bbGridSearch({searchText: searchText});

                    /*istanbul ignore else */
                    /* sanity check */
                    if (bbGrid !== null) {
                        bbGrid.searchApplied(searchText);
                    }
                    
                }

                function searchTextChanged(searchText) {
                    if (angular.isFunction($scope.bbGridSearchTextChanged)) {
                        $scope.bbGridSearchTextChanged({searchText: searchText});
                    }
                }

                function openColumnPicker() {
                    bbColumnPicker.openColumnPicker({
                        columns: $scope.options.columns,
                        selectedColumnIds: $scope.options.selectedColumnIds,
                        helpKey: $scope.options.columnPickerHelpKey,
                        subsetLabel: $scope.options.columnPickerSubsetLabel,
                        subsetProperty: $scope.options.columnPickerSubsetProperty,
                        subsetExclude: $scope.options.columnPickerSubsetExclude,
                        onlySelected: $scope.options.columnPickerOnlySelected,
                        selectedColumnIdsChangedCallback: function (selectedColumnIds) {
                            $scope.options.selectedColumnIds = selectedColumnIds;
                        }
                    });
                }

                function toggleFilterMenu(isOpen) {
                    if ($scope.options && $scope.options.hasInlineFilters) {
                        if (angular.isDefined(isOpen)) {
                            $scope.toolbarLocals.filtersVisible = isOpen;
                        } else {
                            $scope.toolbarLocals.filtersVisible = !$scope.toolbarLocals.filtersVisible;
                        }
                    /*istanbul ignore else */
                    /* sanity check */
                    } else if (bbGrid !== null && angular.isFunction(bbGrid.toggleFilterMenu)) {
                        bbGrid.toggleFilterMenu(isOpen);
                    }
                }

                function moveInlineFilters() {
                    el.parents('.bb-grid-container').find('.bb-filters-inline')
                        .appendTo(el.find('.bb-grid-filter-inline-container'));

                }

                $scope.toolbarLocals = {
                    applySearchText: applySearchText,
                    searchTextChanged: searchTextChanged,
                    openColumnPicker: openColumnPicker,
                    toggleFilterMenu: toggleFilterMenu,
                    toolbarSearch: toolbarSearch
                };

                $scope.resources = bbResources;

                /*istanbul ignore else */
                /* sanity check */
                if (bbGrid !== null && angular.isUndefined($scope.options)) {
                    $scope.$watch(function () {
                        return bbGrid.scope.options;
                    }, function (newValue) {
                        $scope.options = newValue;
                    });
                }

                //grid columns changed, initialize toolbar stuff
                $scope.$watch('options.selectedColumnIds', function (newValue) {
                    if (angular.isDefined(newValue)) {

                        $scope.toolbarLocals.searchText = $scope.options.searchText;

                        if ($scope.options.hasInlineFilters) {
                            moveInlineFilters();
                        }

                        /*istanbul ignore else */
                        /* sanity check */
                        if (bbGrid !== null) {
                            bbGrid.applySearchText = applySearchText;
                            bbGrid.headerSortInactive = $transclude.isSlotFilled('bbGridToolbarSort');
                        }

                        if (angular.isFunction($scope.options.onAddClick)) {
                            $scope.toolbarLocals.hasAdd = true;
                        }
                    }
                }, true);

                $scope.$watch('options.searchText', function (newValue) {
                    if (newValue !== $scope.toolbarLocals.searchText) {
                        $scope.toolbarLocals.searchText = newValue;
                    }
                });

                $scope.$watch('options.filtersOpen', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        toggleFilterMenu(newValue);
                    }
                });

                /*istanbul ignore else */
                /* sanity check */
                if (bbGrid !== null) {
                    topScrollbarEl.on('scroll', function () {
                        bbGrid.syncGridHeaderScrollToTopScrollbar();
                    });
                }

                $scope.$on('$destroy', function () {
                    /*istanbul ignore else */
                    /* sanity check */
                    if (bbGrid !== null) {
                        topScrollbarEl.off();
                    }
                });


            },
            templateUrl: 'sky/templates/grids/gridtoolbar.html'
        };
    }

    BBGridToolbar.$inject = ['bbResources', 'bbColumnPicker'];

    angular.module('sky.grids.toolbar', 
        [
            'sky.resources', 
            'sky.grids.columnpicker.factory', 
            'sky.filter', 
            'sky.search', 
            'sky.sort'
        ])
        .directive('bbGridToolbar', BBGridToolbar);
}());

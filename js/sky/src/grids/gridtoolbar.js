/*global angular */

(function () {
    'use strict';


    function BBGridToolbar(bbResources, bbModal) {
        return {
            require: '?^bbGrid',
            scope: {
                options: '=?bbToolbarOptions',
                bbGridFilterClick: '&?bbGridFilterClick',
                bbGridSearch: '&?bbGridSearch',
                bbGridSearchText: '<?bbGridSearchText'
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

                function openColumnPicker() {
                    bbModal.open({
                        templateUrl: 'sky/templates/grids/columnpicker.html',
                        controller: 'BBGridColumnPickerController',
                        resolve: {
                            columns: function () {
                                return $scope.options.columns;
                            },
                            selectedColumnIds: function () {
                                return $scope.options.selectedColumnIds;
                            },
                            columnPickerHelpKey: function () {
                                return $scope.options.columnPickerHelpKey;
                            },
                            subsetLabel: function () {
                                return $scope.options.columnPickerSubsetLabel;
                            },
                            subsetProperty: function () {
                                return $scope.options.columnPickerSubsetProperty;
                            },
                            subsetExclude: function () {
                                return $scope.options.columnPickerSubsetExclude;
                            },
                            onlySelected: function () {
                                return $scope.options.columnPickerOnlySelected;
                            }
                        }
                    }).result.then(function (selectedColumnIds) {
                        $scope.options.selectedColumnIds = selectedColumnIds;
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

    BBGridToolbar.$inject = ['bbResources', 'bbModal'];

    angular.module('sky.grids.toolbar', ['sky.resources', 'sky.modal', 'sky.grids.columnpicker', 'sky.filter', 'sky.search', 'sky.sort'])
        .directive('bbGridToolbar', BBGridToolbar);
}());

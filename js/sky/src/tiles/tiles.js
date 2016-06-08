/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    //Removes the specified tiles from the source container and appends them
    //in the specified order to the target container.
    function moveTilesToContainer(sourceContainer, targetContainer, tiles) {
        angular.forEach(tiles, function (tileId) {
            var tile = sourceContainer.find('[data-tile-id="' + tileId + '"]');
            targetContainer.append(tile);
        });
    }

    //Returns an array of tile names in the order they appear in the specified container.
    function parseTileOrder(container) {
        var tiles = [];
        container.find('[data-tile-id]').each(function () {
            tiles.push(angular.element(this).data('tile-id'));
        });
        return tiles;
    }

    function BBTileController($scope, $timeout) {
        var vm = this,
            displayModeChanging = false;

        vm.setHeaderContentEl = function (el) {
            vm.headerContentEl = el;

            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(vm.updateHeaderContent)) {
                vm.updateHeaderContent();
            }
        };

        //determines whether or not a tile is collapsed
        function tileIsCollapsed(tileId, tiles) {
            var i,
                len = tiles.length,
                tile;

            for (i = 0; i < len; i++) {
                tile = tiles[i];

                if (tile.id === tileId) {
                    return vm.smallTileDisplayMode ? tile.collapsed_small : tile.collapsed;
                }
            }

            return !!vm.smallTileDisplayMode;
        }

        //sets the collapsed state of the tile based on the tile settings and the display mode
        function updateTileState(tiles) {
            var collapsed,
                oldCollapsed;

            tiles = tiles || /*istanbul ignore next: default value */ [];

            oldCollapsed = vm.isCollapsed;

            collapsed = tileIsCollapsed(vm.tileId, tiles);

            if (oldCollapsed === collapsed) {
                displayModeChanging = false;
            }

            vm.isCollapsed = collapsed;

        }

        vm.updateTileState = updateTileState;

        vm.isCollapsed = vm.bbTileCollapsed || false;
        vm.smallTileDisplayMode = false;
        vm.tileId = '';

        vm.titleClick = function () {
            vm.isCollapsed = !vm.isCollapsed;
            vm.scrollIntoView = !vm.isCollapsed;
        };

        //listens for the tileModeChanged event from the tileDashboard and updates the collapsed state of the tiles based on whether or not the tiles are in small display mode
        $scope.$on('tileDisplayModeChanged', function (event, data) {
            /*jslint unparam: true */
            vm.smallTileDisplayMode = data.smallTileDisplayMode || false;

            if (vm.tileInitialized) {
                displayModeChanging = true;
                vm.updateTileState(data.tiles);
            }
        });

        //if the collapsed state changes, notify the tileDashboard
        $scope.$watch(function () {
            return vm.isCollapsed;
        }, function () {
            if (vm.tileInitialized && !displayModeChanging) {
                $timeout(function () {
                    $scope.$emit('tileStateChanged', {
                        tileId: vm.tileId,
                        collapsed: vm.isCollapsed
                    });
                });
            }
            displayModeChanging = false;

            if (!vm.isCollapsed) {
                $timeout(function () {
                    $scope.$broadcast('tileRepaint');
                });
            }

            vm.bbTileCollapsed = vm.isCollapsed;

        });
    }

    BBTileController.$inject = ['$scope', '$timeout'];

    function bbTile($timeout) {
        function link($scope, el, attrs, ctrls) {
            var dashboardCtrl = ctrls[1],
                vm = ctrls[0],
                dashboardState = {};

            function updateHeaderContent() {
                var wrapperEl;

                vm.hasHeaderContent = !!vm.headerContentEl;

                if (vm.headerContentEl) {
                    wrapperEl = el.find('.bb-tile-header-with-content:first');

                    wrapperEl.append(vm.headerContentEl);
                }
            }

            vm.updateHeaderContent = updateHeaderContent;

            function initializeTile(data) {
                $timeout(function () {
                    var tiles = data.tiles || /*istanbul ignore next */ [];

                    if (!vm.tileInitialized) {
                        //retrieve the tile id from the parent container
                        vm.tileId = el.parent().attr('data-tile-id') || /*istanbul ignore next */ '';
                        vm.smallTileDisplayMode = data.smallTileDisplayMode || false;
                    }

                    vm.updateTileState(tiles);

                    vm.tileInitialized = true;
                });
            }

            //listens for the tilesInitialized event from the tileDashboard and updates the initial collapsed state of the tiles
            $scope.$on('tilesInitialized', function (event, data) {
                /*jslint unparam: true */

                initializeTile(data);
            });

            if (attrs.bbTileCollapsed) {
                $scope.$watch(function () {
                    return vm.bbTileCollapsed;
                }, function (newValue) {
                    vm.isCollapsed = newValue;
                });
            }

            vm.hasSettings = !!attrs.bbTileSettingsClick;

            updateHeaderContent();

            //If the dashboard has already been initialized and this tile hasn't, initialize tile.
            if (dashboardCtrl !== null) {
                if (dashboardCtrl.dashboardInitialized && !vm.tileInitialized) {
                    dashboardState = dashboardCtrl.getDashboardState();
                    initializeTile(dashboardState);
                    dashboardCtrl.layoutTiles();
                }
            }
        }
        return {
            link: link,
            replace: true,
            restrict: 'E',
            require: ['bbTile', '?^^bbTileDashboard'],
            scope: {},
            controller: BBTileController,
            controllerAs: 'bbTile',
            bindToController: {
                bbTileCollapsed: '=?',
                bbTileSettingsClick: '&?',
                tileHeader: '=bbTileHeader'
            },
            templateUrl: 'sky/templates/tiles/tile.html',
            transclude: true
        };
    }

    bbTile.$inject = ['$timeout'];

    function bbTileHeaderContent() {
        return {
            replace: true,
            require: '^bbTile',
            restrict: 'E',
            link: function (scope, el, attrs, tileCtrl) {
                tileCtrl.setHeaderContentEl(el);
            },
            templateUrl: 'sky/templates/tiles/tileheadercontent.html',
            transclude: true
        };
    }

    function bbTileHeaderCheck() {
        return {
            replace: true,
            require: '^bbTileHeaderContent',
            restrict: 'E',
            templateUrl: 'sky/templates/tiles/tileheadercheck.html'
        };
    }

    function bbTileSection() {
        return {
            restrict: 'A',
            template: function (el) {
                el.addClass('bb-tile-content-section');
            }
        };
    }

    function BBTileDashboardController($scope, $timeout) {
        var vm = this;

        function fireDisplayModeChanged() {
            $scope.$broadcast('tileDisplayModeChanged', {
                smallTileDisplayMode: vm.smallTileDisplayMode,
                tiles: vm.tiles
            });
        }

        vm.getDashboardState = function () {
            return {tiles: vm.tiles, smallTileDisplayMode: vm.smallTileDisplayMode};
        };

        vm.layoutTiles = function () {
            /* This timeout is in place to allow a state change to
               complete before laying out tiles
            */
            $timeout(function () {
                vm.layoutTileColumns();
            });
        };

        vm.dashboardInitialized = false;
        vm.smallTileDisplayMode = false;

        vm.fireDisplayModeChanged = fireDisplayModeChanged;

        $scope.$watch(function () {
            return vm.tiles;
        }, function () {
            $timeout(function () {
                vm.layoutTileColumns();
                $scope.$broadcast('tilesInitialized', {
                    smallTileDisplayMode: vm.smallTileDisplayMode,
                    tiles: vm.tiles
                });

                vm.dashboardInitialized = true;
            });
        });

        $scope.$watch(function () {
            return vm.allCollapsed;
        }, function (newValue) {
            var i,
                n,
                tiles = vm.tiles;

            // Check for an explicit true/false here since null/undefined is the
            // indeterminate state.
            if (newValue === true || newValue === false) {
                for (i = 0, n = tiles.length; i < n; i++) {
                    if (vm.smallTileDisplayMode) {
                        tiles[i].collapsed_small = newValue;
                    } else {
                        tiles[i].collapsed = newValue;
                    }
                }

                vm.fireDisplayModeChanged();
            }
        });
    }

    BBTileDashboardController.$inject = ['$scope', '$timeout'];

    function bbTileDashboard($timeout, bbMediaBreakpoints) {

        function link($scope, element, attrs, vm) {
            var column1 = element.find('[data-dashboard-column="1"]'),
                column2 = element.find('[data-dashboard-column="2"]'),
                singleColumnMode = false,
                sortableOptions;

            //Layouts out the tiles based on the current one column or two column configuration
            function layoutTileColumns() {
                var layout = vm.layout;

                if (layout) {
                    if (singleColumnMode) {
                        moveTilesToContainer(element, column1, layout.one_column_layout);
                    } else {
                        moveTilesToContainer(element, column1, layout.two_column_layout[0]);
                        moveTilesToContainer(element, column2, layout.two_column_layout[1]);
                    }
                }
            }

            vm.layoutTileColumns = layoutTileColumns;


            //Inspects the tiles in each column and updates model accordingly.
            function parseColumnTiles() {
                $scope.$apply(function () {
                    var layout = vm.layout;

                    if (singleColumnMode) {
                        layout.one_column_layout = parseTileOrder(column1);
                    } else {
                        layout.two_column_layout[0] = parseTileOrder(column1);
                        layout.two_column_layout[1] = parseTileOrder(column2);
                    }
                });
            }

            function mediabreakpointChangeHandler(breakPoints) {
                singleColumnMode = (breakPoints.xs || breakPoints.sm);
                vm.layoutTileColumns();

                if (singleColumnMode) {
                    element.removeClass('bb-page-content-multicolumn');
                    column2.hide();
                } else {
                    element.addClass('bb-page-content-multicolumn');
                    column2.show();
                }

                vm.smallTileDisplayMode = breakPoints.xs;

                vm.fireDisplayModeChanged();
            }

            //Setup jQuery sortable (drag and drop) options for the dashboard columns
            sortableOptions = {
                connectWith: '[data-dashboard-column]',
                update: parseColumnTiles,
                opacity: 0.8,
                handle: '.bb-tile-grab-handle',
                placeholder: 'placeholder bb-tile',
                forcePlaceholderSize: true,
                revert: 250
            };

            //Setup jQuery sortable drag/drop for the columns
            column1.sortable(sortableOptions);
            column2.sortable(sortableOptions);

            bbMediaBreakpoints.register(mediabreakpointChangeHandler);

            element.on('$destroy', function () {
                bbMediaBreakpoints.unregister(mediabreakpointChangeHandler);
            });

            $scope.$on('tileStateChanged', function (event, data) {
                /*jslint unparam: true */
                $scope.$apply(function () {
                    var allCollapsed = null,
                        collapsed,
                        collapsedProp,
                        i,
                        n,
                        tile,
                        tileId = data.tileId || /*istanbul ignore next */ '',
                        tiles = vm.tiles;

                    collapsed = data.collapsed || false;
                    collapsedProp = vm.smallTileDisplayMode ? 'collapsed_small' : 'collapsed';

                    for (i = 0, n = tiles.length; i < n; i++) {
                        tile = tiles[i];

                        if (tile.id === tileId) {
                            tile[collapsedProp] = collapsed;
                        }

                        if (i > 0 && tile[collapsedProp] !== allCollapsed) {
                            allCollapsed = null;
                        } else {
                            allCollapsed = tile[collapsedProp];
                        }
                    }

                    if (attrs.bbTileDashboardAllCollapsed) {
                        vm.allCollapsed = allCollapsed;
                    }
                });
            });
        }

        return {
            replace: true,
            require: 'bbTileDashboard',
            restrict: 'E',
            bindToController: {
                tiles: '=bbTiles',
                layout: '=bbLayout',
                allCollapsed: '=bbTileDashboardAllCollapsed'
            },
            scope: {},
            link: link,
            controller: BBTileDashboardController,
            controllerAs: 'bbTileDashboard',
            templateUrl: 'sky/templates/tiles/tiledashboard.html'
        };
    }

    bbTileDashboard.$inject = ['$timeout', 'bbMediaBreakpoints'];

    angular.module('sky.tiles', ['sky.mediabreakpoints'])
        .directive('bbTile', bbTile)
        .directive('bbTileHeaderContent', bbTileHeaderContent)
        .directive('bbTileHeaderCheck', bbTileHeaderCheck)
        .directive('bbTileSection', bbTileSection)
        .directive('bbTileDashboard', bbTileDashboard);
}());

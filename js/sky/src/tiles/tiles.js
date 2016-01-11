/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Tile
@icon th-large
@summary The tile provides a collapsible container that is the building block for pages and forms in Sky UX applications.
 @description The `bb-tile` directive creates a collapsible container and is the bulding block for pages and forms in a Sky UX application. The `bb-tile-section` directive is used to create padded sections inside a `bb-tile` element. Additionally, the `bb-tile-header-content` directive may be placed inside the `bb-tile` directive to add summary information to the tile. If you simply need to show a check mark indicating the tile has data, you can add a `bb-tile-header-check` element to the `bb-tile-header-content` element.

When used on forms, it automatically adjusts the background color on the form and shrinks the tile header.

### Tile Settings ###

 - `bb-tile-header` The header text for the tile.
 - `bb-tile-settings-click` A function to call when the user clicks the settings button (indicated by a wrench icon) in the tile header.  If not specified, the settings button is not displayed.
 - `bb-tile-collapsed` (optional) binds to the collapsed state of the tile so that the tile can respond to user setting collapsed state.

### Tile Dashboard Directive ###

The `bb-tile-dashboard` directive allows you to have a set of tiles within a page which have controllable layouts and collapsed states. It depends on [angular-ui router](https://github.com/angular-ui/ui-router/wiki) to define states that map to tile controllers and templates.

### Tile Dashboard Settings ###

- `bb-tiles` An array of tile objects to be contained in the dashboard. Contains the following object:
    - `id` Unique ID for the tile.
    - `view_name` The name of the view for the tile defined in the ui-router `$stateProvider`.
    - `collapsed` True if the tile should be collapsed, false otherwise.
    - `collapsed_small` True if the tile should be collapsed in small screen state, false otherwise.
- `bb-layout` An object containing information about how the tiles should be organized within the tile dashboard. Contains the following:
    - `one_column_layout` Array of tile ids that correspond with how the tiles should be ordered in a one column layout (small screen) ex: `layout.one_column_layout = ['Tile1', 'Tile2'];`.
    - `two_column_layout` Array that corresponds with how tiles should be ordered in a two column layout. ex: `layout.two_column_layout = [['Tile1'], ['Tile2']];` where `Tile1` is in the left hand column and `Tile2` is in the right hand column.
- `bb-tile-dashboard-all-collapsed` If set to true, then collapses all tiles in the dashboard, if set to false, expands all tiles in the dashboard.

 */

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

    angular.module('sky.tiles', ['sky.mediabreakpoints'])
        .directive('bbTile', ['$timeout', function ($timeout) {
            return {
                link: function (scope, el, attrs, dashboardCtrl) {
                    var dashboardState = {},
                        displayModeChanging = false,
                        tileInitialized = false;

                    //determines whether or not a tile is collapsed
                    function tileIsCollapsed(tileId, tiles) {
                        var i,
                            len = tiles.length,
                            tile;

                        for (i = 0; i < len; i++) {
                            tile = tiles[i];

                            if (tile.id === tileId) {
                                return scope.smallTileDisplayMode ? tile.collapsed_small : tile.collapsed;
                            }
                        }

                        return !!scope.smallTileDisplayMode;
                    }

                    //sets the collapsed state of the tile based on the tile settings and the display mode
                    function updateTileState(tiles) {
                        var collapsed,
                            oldCollapsed;

                        tiles = tiles || /*istanbul ignore next: default value */ [];

                        oldCollapsed = scope.isCollapsed;

                        collapsed = tileIsCollapsed(scope.tileId, tiles);

                        if (oldCollapsed === collapsed) {
                            displayModeChanging = false;
                        }

                        scope.isCollapsed = collapsed;

                        if (collapsed && !tileInitialized) {
                            //in some cases the tile-content div is left in a partially collapsed state.
                            //   this will ensure that the tile is styled corretly and the tile is completely collapsed
                            $timeout(function () {
                                var contentEl;
                                contentEl = el.find('.bb-tile-content');
                                contentEl.removeClass('collapsing').addClass('collapse');
                            }, 1);
                        }
                    }

                    function updateHeaderContent() {
                        var wrapperEl;

                        scope.hasHeaderContent = !!scope.headerContentEl;

                        if (scope.headerContentEl) {
                            wrapperEl = el.find('.bb-tile-header-with-content:first');

                            wrapperEl.append(scope.headerContentEl);
                        }
                    }

                    function initializeTile(data) {
                        $timeout(function () {
                            var tiles = data.tiles || /*istanbul ignore next: default value */ [];

                            if (!tileInitialized) {
                                //retrieve the tile id from the parent container
                                scope.tileId = el.parent().attr('data-tile-id') || /*istanbul ignore next: default value */ '';
                                scope.smallTileDisplayMode = data.smallTileDisplayMode || false;
                            }

                            updateTileState(tiles);

                            tileInitialized = true;
                        });
                    }

                    scope.isCollapsed = scope.bbTileCollapsed || false;
                    scope.smallTileDisplayMode = false;
                    scope.tileId = '';

                    scope.titleClick = function () {
                        scope.isCollapsed = !scope.isCollapsed;
                        scope.scrollIntoView = !scope.isCollapsed;
                    };

                    //listens for the tileModeChanged event from the tileDashboard and updates the collapsed state of the tiles based on whether or not the tiles are in small display mode
                    scope.$on('tileDisplayModeChanged', function (event, data) {
                        /*jslint unparam: true */
                        scope.smallTileDisplayMode = data.smallTileDisplayMode || false;

                        if (tileInitialized) {
                            displayModeChanging = true;
                            updateTileState(data.tiles);
                        }
                    });

                    //listens for the tilesInitialized event from the tileDashboard and updates the initial collapsed state of the tiles
                    scope.$on('tilesInitialized', function (event, data) {
                        /*jslint unparam: true */

                        initializeTile(data);
                    });

                    //if the collapsed state changes, notify the tileDashboard
                    scope.$watch('isCollapsed', function () {
                        if (tileInitialized && !displayModeChanging) {
                            $timeout(function () {
                                scope.$emit('tileStateChanged', {
                                    tileId: scope.tileId,
                                    collapsed: scope.isCollapsed
                                });
                            });
                        }
                        displayModeChanging = false;

                        if (!scope.isCollapsed) {
                            $timeout(function () {
                                scope.$broadcast('tileRepaint');
                            });
                        }

                        scope.bbTileCollapsed = scope.isCollapsed;
                    });

                    if (attrs.bbTileCollapsed) {
                        scope.$watch('bbTileCollapsed', function (newValue) {
                            scope.isCollapsed = newValue;
                        });
                    }

                    scope.hasSettings = !!attrs.bbTileSettingsClick;

                    updateHeaderContent();

                    //If the dashboard has already been initialized and this tile hasn't, initialize tile.
                    if (dashboardCtrl !== null) {
                        if (dashboardCtrl.dashboardInitialized() && !tileInitialized) {
                            dashboardState = dashboardCtrl.getDashboardState();
                            initializeTile(dashboardState);
                            dashboardCtrl.layoutTiles();
                        }
                    }
                },
                replace: true,
                restrict: 'E',
                require: '?^^bbTileDashboard',
                scope: {
                    bbTileCollapsed: '=?',
                    bbTileSettingsClick: '&?',
                    tileHeader: '=bbTileHeader'
                },
                controller: ['$scope', function ($scope) {
                    this.setHeaderContentEl = function (el) {
                        $scope.headerContentEl = el;
                    };
                }],
                templateUrl: 'sky/templates/tiles/tile.html',
                transclude: true
            };
        }])
        .directive('bbTileHeaderContent', function () {
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
        })
        .directive('bbTileHeaderCheck', function () {
            return {
                replace: true,
                require: '^bbTileHeaderContent',
                restrict: 'E',
                templateUrl: 'sky/templates/tiles/tileheadercheck.html'
            };
        })
        .directive('bbTileSection', function () {
            return {
                restrict: 'A',
                template: function (el) {
                    el.addClass('bb-tile-content-section');
                }
            };
        })
        .directive('bbTileDashboard', ['$timeout', 'bbMediaBreakpoints', function ($timeout, bbMediaBreakpoints) {
            return {
                replace: true,
                restrict: 'E',
                scope: {
                    tiles: '=bbTiles',
                    layout: '=bbLayout',
                    allCollapsed: '=bbTileDashboardAllCollapsed'
                },
                link: function (scope, element, attrs) {
                    var column1 = element.find('[data-dashboard-column="1"]'),
                        column2 = element.find('[data-dashboard-column="2"]'),
                        singleColumnMode = false,
                        sortableOptions;

                    scope.dashboardInitialized = false;
                    scope.smallTileDisplayMode = false;

                    //Inspects the tiles in each column and updates model accordingly.
                    function parseColumnTiles() {
                        scope.$apply(function () {
                            var layout = scope.layout;

                            if (singleColumnMode) {
                                layout.one_column_layout = parseTileOrder(column1);
                            } else {
                                layout.two_column_layout[0] = parseTileOrder(column1);
                                layout.two_column_layout[1] = parseTileOrder(column2);
                            }
                        });
                    }

                    //Layouts out the tiles based on the current one column or two column configuration
                    function layoutTiles() {
                        var layout = scope.layout;

                        if (layout) {
                            if (singleColumnMode) {
                                moveTilesToContainer(element, column1, layout.one_column_layout);
                            } else {
                                moveTilesToContainer(element, column1, layout.two_column_layout[0]);
                                moveTilesToContainer(element, column2, layout.two_column_layout[1]);
                            }
                        }
                    }

                    function fireDisplayModeChanged() {
                        scope.$broadcast('tileDisplayModeChanged', {
                            smallTileDisplayMode: scope.smallTileDisplayMode,
                            tiles: scope.tiles
                        });
                    }

                    function mediabreakpointChangeHandler(breakPoints) {
                        singleColumnMode = (breakPoints.xs || breakPoints.sm);
                        layoutTiles();

                        if (singleColumnMode) {
                            element.removeClass('bb-page-content-multicolumn');
                            column2.hide();
                        } else {
                            element.addClass('bb-page-content-multicolumn');
                            column2.show();
                        }

                        scope.smallTileDisplayMode = breakPoints.xs;

                        fireDisplayModeChanged();
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

                    scope.layoutTiles = layoutTiles;

                    element.on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediabreakpointChangeHandler);
                    });

                    scope.$watch('tiles', function () {
                        $timeout(function () {
                            layoutTiles();
                            scope.$broadcast('tilesInitialized', {
                                smallTileDisplayMode: scope.smallTileDisplayMode,
                                tiles: scope.tiles
                            });

                            scope.dashboardInitialized = true;
                        });
                    });

                    scope.$watch('allCollapsed', function (newValue) {
                        var i,
                            n,
                            tiles = scope.tiles;

                        // Check for an explicit true/false here since null/undefined is the
                        // indeterminate state.
                        if (newValue === true || newValue === false) {
                            for (i = 0, n = tiles.length; i < n; i++) {
                                if (scope.smallTileDisplayMode) {
                                    tiles[i].collapsed_small = newValue;
                                } else {
                                    tiles[i].collapsed = newValue;
                                }
                            }

                            fireDisplayModeChanged();
                        }
                    });

                    scope.$on('tileStateChanged', function (event, data) {
                        /*jslint unparam: true */
                        scope.$apply(function () {
                            var allCollapsed = null,
                                collapsed,
                                collapsedProp,
                                i,
                                n,
                                tile,
                                tileId = data.tileId || /*istanbul ignore next: default value */ '',
                                tiles = scope.tiles;

                            collapsed = data.collapsed || false;
                            collapsedProp = scope.smallTileDisplayMode ? 'collapsed_small' : 'collapsed';

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
                                scope.allCollapsed = allCollapsed;
                            }
                        });
                    });
                },
                controller: ['$scope', function ($scope) {
                    var self = this;

                    self.getDashboardState = function () {
                        return {tiles: $scope.tiles, smallTileDisplayMode: $scope.smallTileDisplayMode};
                    };

                    self.dashboardInitialized = function () {
                        return $scope.dashboardInitialized;
                    };

                    self.layoutTiles = function () {
                        /* This timeout is in place to allow a state change to
                           complete before laying out tiles
                        */
                        $timeout(function () {
                            $scope.layoutTiles();
                        });
                    };
                }],
                templateUrl: 'sky/templates/tiles/tiledashboard.html'
            };
        }]);
}());

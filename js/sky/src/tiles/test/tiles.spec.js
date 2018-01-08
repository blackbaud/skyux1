/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Tile', function () {
    'use strict';

    var $compile,
        $rootScope,
        $timeout,
        bbMediaBreakpoints;

    function getHeaderEl(el) {
        return el.find('h2.bb-tile-header');
    }

    beforeEach(module(
        'ngMock',
        'sky.tiles',
        'sky.templates'
    ));

    beforeEach(module(function ($provide) {
        bbMediaBreakpoints = {
            register: function (handler) {
                this.handlers = this.handlers || [];

                this.handlers.push(handler);

                handler(this.getCurrent());
            },
            unregister: angular.noop,
            getCurrent: function () {
                return {xs: true};
            }
        };

        $provide.value('bbMediaBreakpoints', bbMediaBreakpoints);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    describe('directive', function () {
        var testTiles;

        function createTileIdSpy(tileId) {
            spyOn($.fn, 'parent').and.callFake(function () {
                return {
                    attr: function (name) {
                        if (name === 'data-tile-id') {
                            return tileId;
                        }
                    }
                };
            });
        }
        function initializeTile($scope, tileId) {
            var el = $compile(
                '<bb-tile bb-tile-collapsed="tileCollapsed">a</bb-tile>'
            )($scope);

            $scope.$digest();

            createTileIdSpy(tileId);

            $rootScope.$broadcast('tilesInitialized', {
                tiles: testTiles
            });
            $scope.$digest();
            $timeout.flush();

            return el;
        }

        beforeEach(function () {
            testTiles  = [
                {
                    id: 'Tile1',
                    collapsed: false,
                    collapsed_small: true
                },
                {
                    id: 'Tile2',
                    collapsed: true
                }
            ];
        });

        it('should render the header text in the expected element', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-tile bb-tile-header="tileHeader"></bb-tile>')($scope);

            $scope.tileHeader = 'Test header';

            $scope.$digest();

            expect(getHeaderEl(el)).toHaveText($scope.tileHeader);
        });

        it('should collapse/expand when the header is clicked', function () {
            var $scope = $rootScope.$new(),
                el,
                headerEl;

            el = $compile(
                '<bb-tile bb-tile-header="tileHeader" bb-tile-collapsed="tileCollapsed">a</bb-tile>'
            )($scope);

            $scope.tileHeader = 'Test header';

            $scope.$digest();
            headerEl = getHeaderEl(el);

            expect(el).not.toHaveClass('collapsed');
            expect($scope.tileCollapsed).toBeFalsy();

            headerEl.click();

            expect(el).toHaveClass('collapsed');
            expect($scope.tileCollapsed).toBe(true);

            headerEl.click();

            expect(el).not.toHaveClass('collapsed');
            expect($scope.tileCollapsed).toBe(false);
        });

        it('should collapse/expand when the bb-tile-collapsed value changes', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope;

            el = $compile(
                '<bb-tile bb-tile-collapsed="tileCollapsed">a</bb-tile>'
            )($scope);

            $scope.$digest();

            elScope = el.isolateScope();

            expect(el).not.toHaveClass('collapsed');
            expect(elScope.bbTile.isCollapsed).toBeFalsy();

            $scope.tileCollapsed = true;
            $scope.$digest();

            expect(el).toHaveClass('collapsed');
            expect(elScope.bbTile.isCollapsed).toBe(true);

            $scope.tileCollapsed = false;
            $scope.$digest();

            expect(el).not.toHaveClass('collapsed');
            expect(elScope.bbTile.isCollapsed).toBe(false);
        });

        it('should collapse/expand when the bb-tile-collapsed is initialized to true', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope;

            el = $compile(
                '<bb-tile bb-tile-collapsed="true">a</bb-tile>'
            )($scope);

            $scope.$digest();

            elScope = el.isolateScope();
            expect(el).toHaveClass('collapsed');
            expect(elScope.bbTile.isCollapsed).toBe(true);
        });

        it('should update the tile state the tile dashboard is initialized', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope;

            el = initializeTile($scope, 'Tile2');
            elScope = el.isolateScope();

            expect(elScope.bbTile.tileId).toBe('Tile2');
        });

        it('should notify the tile dashboard when the tile is collapsed', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope,
                stateChangedFired;

            el = initializeTile($scope, 'Tile1');
            elScope = el.isolateScope();

            $rootScope.$on('tileStateChanged', function (event, data) {
                stateChangedFired = true;

                expect(data).toEqual({
                    tileId: 'Tile1',
                    collapsed: true
                });
            });

            $scope.tileCollapsed = true;
            $scope.$digest();
            $timeout.flush();

            expect(stateChangedFired).toBe(true);
        });

        it('should notify the tile that repaint is required when the tile is expanded', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope,
                repaintSpy;

            el = initializeTile($scope, 'Tile1');
            elScope = el.isolateScope();

            repaintSpy = spyOn(elScope, '$broadcast').and.callThrough();

            $scope.tileCollapsed = true;
            $scope.$digest();
            $timeout.flush();

            expect(repaintSpy).not.toHaveBeenCalledWith('tileRepaint');

            $scope.tileCollapsed = false;
            $scope.$digest();
            $timeout.flush();

            expect(repaintSpy).toHaveBeenCalledWith('tileRepaint');
        });

        it('should react when tile display mode changes', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope;

            el = initializeTile($scope, 'Tile1');
            elScope = el.isolateScope();

            $rootScope.$broadcast('tileDisplayModeChanged', {
                smallTileDisplayMode: true,
                tiles: testTiles
            });

            expect(elScope.bbTile.smallTileDisplayMode).toBe(true);
            expect(elScope.bbTile.isCollapsed).toBe(true);

            $rootScope.$broadcast('tileDisplayModeChanged', {
                smallTileDisplayMode: false,
                tiles: testTiles
            });

            expect(elScope.bbTile.smallTileDisplayMode).toBe(false);
            expect(elScope.bbTile.isCollapsed).toBe(false);

            // Missing tile should just return whatever the small tile display mode is.
            $rootScope.$broadcast('tileDisplayModeChanged', {
                smallTileDisplayMode: true,
                tiles: []
            });

            expect(elScope.bbTile.smallTileDisplayMode).toBe(true);
            expect(elScope.bbTile.isCollapsed).toBe(true);
        });

        it('should not update tile state when display mode changed but the tile have not been initialized by the tile dashboard', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope;

            el = $compile('<bb-tile bb-tile-collapsed="isCollapsed"></bb-tile>')($scope);

            $scope.isCollapsed = false;
            $scope.$digest();

            createTileIdSpy('Tile1');

            elScope = el.isolateScope();

            $rootScope.$broadcast('tileDisplayModeChanged', {
                smallTileDisplayMode: true,
                tiles: testTiles
            });

            expect(elScope.bbTile.isCollapsed).toBe(false);
        });

        it('should not update tile state when display mode changed but the tile have not been initialized by the tile dashboard', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope;

            el = $compile('<bb-tile bb-tile-collapsed="isCollapsed"></bb-tile>')($scope);

            $scope.isCollapsed = false;
            $scope.$digest();

            createTileIdSpy('Tile1');

            elScope = el.isolateScope();

            $rootScope.$broadcast('tilesInitialized', {
                smallTileDisplayMode: true
            });

            $timeout.flush();

            expect(elScope.bbTile.smallTileDisplayMode).toBe(true);

            // This should have no effect if the tile has already been initialized.
            $rootScope.$broadcast('tilesInitialized', {
                smallTileDisplayMode: false
            });
            $timeout.flush();

            expect(elScope.bbTile.smallTileDisplayMode).toBe(true);
        });

        describe('settings button', function () {
            function createTileWithSettings($scope) {
                var el;

                $scope.settingsClick = angular.noop;

                el = $compile('<bb-tile bb-tile-settings-click="settingsClick()"></bb-tile>')($scope);

                $scope.$digest();

                return el;
            }

            it('should be present only if a callback is provided', function () {
                var $scope = $rootScope.$new(),
                    el,
                    settingsEl;

                el = $compile('<bb-tile></bb-tile>')($scope);

                $scope.$digest();

                expect(el.find('.bb-tile-settings')).not.toExist();

                el = createTileWithSettings($scope);

                settingsEl = el.find('.bb-tile-settings');

                expect(settingsEl).toExist();
            });

            it('should call the specified callback when clicked', function () {
                var $scope = $rootScope.$new(),
                    clickSpy,
                    el;

                el = createTileWithSettings($scope);

                clickSpy = spyOn($scope, 'settingsClick');

                el.find('.bb-tile-settings').click();

                expect(clickSpy).toHaveBeenCalled();
            });

            it('should not collapse the tile when clicked', function () {
                var $scope = $rootScope.$new(),
                    el;

                el = createTileWithSettings($scope);

                el.find('.bb-tile-settings').click();

                expect(el.isolateScope().isCollapsed).toBeFalsy();
            });
        });
    });

    describe('section directive', function () {
        it('should add the expected CSS class to the element', function () {
            var el = $compile('<div bb-tile-section></div>')($rootScope);

            expect(el).toHaveClass('bb-tile-content-section');
        });
    });

    describe('header content directive', function () {
        it('should render header content next to the tile header', function () {
            var $scope = $rootScope.$new(),
                el,
                headerContentEl,
                headerEl,
                wrapperEl;

            el = $compile('<bb-tile bb-tile-header="\'Test\'"><bb-tile-header-content>a</bb-tile-header-content></bb-tile>')($scope);

            $scope.$digest();

            wrapperEl = el.find('.bb-tile-header-with-content');

            expect(wrapperEl).toExist();

            headerEl = wrapperEl.find('.bb-tile-header');
            headerContentEl = wrapperEl.find('.bb-tile-header-content');

            expect(headerEl).toHaveText('Test');

            expect(headerContentEl).toHaveText('a');
        });
    });

    describe('header check directive', function () {
        it('should render a check mark next to the tile header', function () {
            var $scope = $rootScope.$new(),
                checkEl,
                el,
                headerContentEl,
                wrapperEl;

            el = $compile(
                '<bb-tile bb-tile-header="\'Test\'">' +
                    '<bb-tile-header-content>' +
                        '<bb-tile-header-check></bb-tile-header-check>' +
                    '</bb-tile-header-content>' +
                '</bb-tile>')($scope);

            $scope.$digest();

            wrapperEl = el.find('.bb-tile-header-with-content');

            expect(wrapperEl).toExist();

            headerContentEl = wrapperEl.find('.bb-tile-header-content');

            checkEl = wrapperEl.find('.bb-tile-header-check');

            expect(checkEl).toHaveClass('fa');
            expect(checkEl).toHaveClass('fa-check');
        });
    });

    describe('dashboard directive', function () {
        function validateTileColumn(breakpoint, expectedColumn, shouldHaveTwoColumns) {
            var $scope = $rootScope.$new(),
                el,
                fakeBreakpoint = {};

            bbMediaBreakpoints.getCurrent = function () {
                return fakeBreakpoint;
            };

            el = $compile('<bb-tile-dashboard bb-layout="layout" bb-tiles="tiles"></bb-tile-dashboard>')($scope);

            el.appendTo(document.body);

            fakeBreakpoint[breakpoint] = true;

            $scope.layout = {
                two_column_layout: [
                    [],
                    [
                        'Tile1'
                    ]
                ]
            };

            $scope.tiles = [
                {
                    id: 'Tile1'
                }
            ];

            $scope.$digest();
            $timeout.flush();

            expect(el.hasClass('bb-page-content-multicolumn')).toBe(shouldHaveTwoColumns);
            expect(el.find('[data-dashboard-column="2"]').is(':visible')).toBe(shouldHaveTwoColumns);
            expect(el.find('[data-dashboard-column="' + expectedColumn + '"] > [data-tile-id="Tile1"]').length).toBe(1);

            el.remove();
        }

        function createTileDashboard($scope, breakpoint, addAllCollapsed) {
            var el,
                fakeBreakpoint = {},
                sortableSpy,
                updateCallback;

            sortableSpy = spyOn($.fn, 'sortable').and.callFake(function (sortableOptions) {
                if ($(this).attr('data-dashboard-column') && sortableOptions.update) {
                    updateCallback = sortableOptions.update;
                }
            });

            bbMediaBreakpoints.getCurrent = function () {
                return fakeBreakpoint;
            };

            el = $compile(
                '<bb-tile-dashboard bb-layout="layout" bb-tiles="tiles"' +
                (addAllCollapsed ? ' bb-tile-dashboard-all-collapsed="allCollapsed"' : '') +
                '></bb-tile-dashboard>'
            )($scope);

            fakeBreakpoint[breakpoint] = true;

            return {
                el: el,
                update: function () {
                    updateCallback();
                }
            };
        }

        it('should put the tile in the expected column for each breakpoint', function () {
            validateTileColumn('lg', 2, true);
            validateTileColumn('md', 2, true);
            validateTileColumn('sm', 1, false);
            validateTileColumn('xs', 1, false);
        });

        it('should remove the media breakpoint listener when destroyed', function () {
            var $scope = $rootScope.$new(),
                el,
                registerSpy,
                unregisterSpy;

            el = $compile('<bb-tile-dashboard></bb-dashboard>')($scope);

            registerSpy = spyOn(bbMediaBreakpoints, 'register').and.callThrough();
            unregisterSpy = spyOn(bbMediaBreakpoints, 'unregister').and.callThrough();

            $scope.$digest();

            expect(registerSpy).toHaveBeenCalled();

            el.remove();

            expect(unregisterSpy).toHaveBeenCalled();
        });

        it('should parse tile order when tile moves to another column', function () {
            var $scope = $rootScope.$new(),
                dashboard;

            dashboard = createTileDashboard($scope, 'lg');

            $scope.layout = {
                two_column_layout: [
                    [],
                    [
                        'Tile1'
                    ]
                ]
            };

            $scope.tiles = [
                {
                    id: 'Tile1'
                }
            ];

            $scope.$digest();
            $timeout.flush();

            // Simulate drag-drop of tile from one column to another
            dashboard.el.find('[data-tile-id="Tile1"]').appendTo(dashboard.el.find('[data-dashboard-column="1"]'));
            dashboard.update();

            $scope.$digest();

            expect($scope.layout.two_column_layout).toEqual([
                [
                    'Tile1'
                ],
                []
            ]);
        });

        it('should parse tile order when tile moves within a column', function () {
            var $scope = $rootScope.$new(),
                dashboard;

            dashboard = createTileDashboard($scope, 'xs');

            $scope.layout = {
                one_column_layout: [
                    'Tile1',
                    'Tile2'
                ]
            };

            $scope.tiles = [
                {
                    id: 'Tile1'
                },
                {
                    id: 'Tile2'
                }
            ];

            $scope.$digest();
            $timeout.flush();

            // Simulate drag-drop of tile to the bottom of the column
            dashboard.el.find('[data-tile-id="Tile1"]').appendTo(dashboard.el.find('[data-dashboard-column="1"]'));
            dashboard.update();

            $scope.$digest();

            expect($scope.layout.one_column_layout).toEqual([
                'Tile2',
                'Tile1'
            ]);
        });

        it('should update the tile collapsed state when the tile is collapsed', function () {
            var $scope = $rootScope.$new(),
                dashboard;

            dashboard = createTileDashboard($scope, 'lg');

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1',
                        'Tile2'
                    ],
                    []
                ]
            };

            $scope.tiles = [
                {
                    id: 'Tile1',
                    collapsed: false
                },
                {
                    id: 'Tile2'
                }
            ];

            $scope.$digest();
            $timeout.flush();

            $rootScope.$broadcast('tileStateChanged', {
                tileId: 'Tile1',
                collapsed: true
            });

            expect($scope.tiles[0].collapsed).toBe(true);

            $rootScope.$broadcast('tileStateChanged', {
                tileId: 'Tile1'
                // Leaving out the collapsed property should default to false
            });

            expect($scope.tiles[0].collapsed).toBe(false);
        });

        it('should update the tile collapsed small state when the tile is collapsed on a small screen', function () {
            var $scope = $rootScope.$new(),
                dashboard;

            dashboard = createTileDashboard($scope, 'xs');

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1',
                        'Tile2'
                    ],
                    []
                ]
            };

            $scope.tiles = [
                {
                    id: 'Tile1',
                    collapsed_small: false
                },
                {
                    id: 'Tile2'
                }
            ];

            $scope.$digest();
            $timeout.flush();

            $rootScope.$broadcast('tileStateChanged', {
                tileId: 'Tile1',
                collapsed: true
            });

            expect($scope.tiles[0].collapsed_small).toBe(true);

            $rootScope.$broadcast('tileStateChanged', {
                tileId: 'Tile1'
                // Leaving out the collapsed property should default to false
            });

            expect($scope.tiles[0].collapsed_small).toBe(false);
        });

        it('should update the all-collapsed state when a tile\'s collapsed state changes', function () {
            var $scope = $rootScope.$new(),
                dashboard;

            dashboard = createTileDashboard($scope, 'lg', true);

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1',
                        'Tile2'
                    ],
                    []
                ]
            };

            $scope.tiles = [
                {
                    id: 'Tile1',
                    collapsed: false
                },
                {
                    id: 'Tile2',
                    collapsed: true
                }
            ];

            $scope.$digest();
            $timeout.flush();

            $scope.tiles[0].collapsed = true;

            $rootScope.$broadcast('tileStateChanged', {
                tileId: 'Tile1',
                collapsed: true
            });

            expect($scope.allCollapsed).toBe(true);

            $scope.tiles[0].collapsed = false;

            $rootScope.$broadcast('tileStateChanged', {
                tileId: 'Tile1',
                collapsed: false
            });

            expect($scope.allCollapsed).toBe(null);

            $scope.tiles[1].collapsed = false;

            $rootScope.$broadcast('tileStateChanged', {
                tileId: 'Tile2',
                collapsed: false
            });

            expect($scope.allCollapsed).toBe(false);
        });

        it('should update the tile collapsed state when the tile all-collapsed attribute changes', function () {
            var $scope = $rootScope.$new(),
                dashboard,
                tile1,
                tile2;

            dashboard = createTileDashboard($scope, 'lg', true);

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1',
                        'Tile2'
                    ],
                    []
                ]
            };

            tile1 = {
                id: 'Tile1',
                collapsed: true,
                collapsed_small: false
            };

            tile2 = {
                id: 'Tile2',
                collapsed: false,
                collapsed_small: true
            };

            $scope.tiles = [tile1, tile2];

            $scope.allCollapsed = true;

            $scope.$digest();

            expect(tile1.collapsed).toBe(true);
            expect(tile1.collapsed_small).toBe(false);

            expect(tile2.collapsed).toBe(true);
            expect(tile2.collapsed_small).toBe(true);

            $scope.allCollapsed = false;

            $scope.$digest();

            expect(tile1.collapsed).toBe(false);
            expect(tile1.collapsed_small).toBe(false);

            expect(tile2.collapsed).toBe(false);
            expect(tile2.collapsed_small).toBe(true);
        });

        it('should not update tile state when display mode changed but the tile collapse state is not changed by tile dashboard', function () {
            var $scope = $rootScope.$new(),
                tile1Scope,
                dashboard,
                tile1,
                tile1El,
                tile2,
                tile1TitleEl;

            dashboard = createTileDashboard($scope, 'lg', true);

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1',
                        'Tile2'
                    ],
                    []
                ]
            };

            tile1 = {
                id: 'Tile1',
                collapsed: false,
                collapsed_small: false
            };

            tile2 = {
                id: 'Tile2',
                collapsed: false,
                collapsed_small: true
            };

            $scope.tiles = [tile1, tile2];

            $scope.$digest();

            tile1Scope = dashboard.el.isolateScope().$new();

            tile1El = $compile(
                '<bb-tile>Tile 1</bb-tile>'
            )(tile1Scope);

            dashboard.el.find('div[data-tile-id="Tile1"]').append(tile1El);

            $timeout.flush();

            tile1TitleEl = dashboard.el.find('div[data-tile-id="Tile1"] .bb-tile-title');
            expect(tile1TitleEl.length).toBe(1);

            expect(tile1.collapsed).toBe(false);

            tile1TitleEl.click();

            tile1Scope.$digest();
            $scope.$digest();

            $timeout.flush();

            $scope.$digest();
            tile1Scope.$digest();

            expect($scope.tiles[0].collapsed).toBe(true);
            expect($scope.tiles[0].collapsed_small).toBe(false);

            $scope.allCollapsed = true;

            $scope.$digest();
            tile1Scope.$digest();

            expect(tile1.collapsed).toBe(true);
            expect(tile1.collapsed_small).toBe(false);

            expect(tile2.collapsed).toBe(true);
            expect(tile2.collapsed_small).toBe(true);

            tile1TitleEl.click();

            tile1Scope.$digest();
            $scope.$digest();

            $timeout.flush();
            $scope.$digest();

            expect($scope.tiles[0].collapsed).toBe(false);
            expect($scope.allCollapsed).toBe(null);

        });

        it('should not update tile state when display mode changed but the tile collapse state is not changed by tile dashboard and tile intialization occurs after dashboard initialization', function () {
            var $scope = $rootScope.$new(),
                tile1Scope,
                dashboard,
                tile1,
                tile1El,
                tile2,
                tile2El,
                tile2Scope,
                tile1TitleEl,
                tile2TitleEl;

            dashboard = createTileDashboard($scope, 'lg', true);

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1'

                    ],
                    [
                        'Tile2'
                    ]
                ]
            };

            tile1 = {
                id: 'Tile1',
                collapsed: false,
                collapsed_small: false
            };

            tile2 = {
                id: 'Tile2',
                collapsed: false,
                collapsed_small: true
            };

            $scope.tiles = [tile1, tile2];

            $scope.$digest();

            $timeout.flush();

            $scope.$digest();

            tile1Scope = dashboard.el.isolateScope().$new();
            tile2Scope = dashboard.el.isolateScope().$new();

            tile1El = $compile(
                '<bb-tile>Tile 1</bb-tile>'
            )(tile1Scope);

            tile2El = $compile(
                '<bb-tile>Tile 2</bb-tile>'
            )(tile2Scope);

            dashboard.el.find('div[data-tile-id="Tile1"]').append(tile1El);

            tile1Scope.$digest();

            $timeout.flush();

            dashboard.el.find('div[data-tile-id="Tile2"]').append(tile2El);

            tile2Scope.$digest();


            tile1TitleEl = dashboard.el.find('div[data-dashboard-column="1"] div[data-tile-id="Tile1"] .bb-tile-title');
            expect(tile1TitleEl.length).toBe(1);

            tile2TitleEl = dashboard.el.find('div[data-dashboard-column="2"] div[data-tile-id="Tile2"] .bb-tile-title');
            expect(tile2TitleEl.length).toBe(1);

            expect(tile1.collapsed).toBe(false);

            tile1TitleEl.click();

            tile1Scope.$digest();
            $scope.$digest();

            $timeout.flush();

            $scope.$digest();
            tile1Scope.$digest();

            expect($scope.tiles[0].collapsed).toBe(true);
            expect($scope.tiles[0].collapsed_small).toBe(false);

            $scope.allCollapsed = true;

            $scope.$digest();
            tile1Scope.$digest();

            expect(tile1.collapsed).toBe(true);
            expect(tile1.collapsed_small).toBe(false);

            expect(tile2.collapsed).toBe(true);
            expect(tile2.collapsed_small).toBe(true);

            tile1TitleEl.click();

            tile1Scope.$digest();
            $scope.$digest();

            $timeout.flush();
            $scope.$digest();

            expect($scope.tiles[0].collapsed).toBe(false);
            expect($scope.allCollapsed).toBe(null);
        });

        it('should update the tile collapsed small state when the tile all-collapsed attribute changes', function () {
            var $scope = $rootScope.$new(),
                dashboard,
                tile1,
                tile2;

            dashboard = createTileDashboard($scope, 'xs', true);

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1',
                        'Tile2'
                    ],
                    []
                ]
            };

            tile1 = {
                id: 'Tile1',
                collapsed: true,
                collapsed_small: false
            };

            tile2 = {
                id: 'Tile2',
                collapsed: false,
                collapsed_small: true
            };

            $scope.tiles = [tile1, tile2];

            $scope.allCollapsed = true;

            $scope.$digest();

            expect(tile1.collapsed).toBe(true);
            expect(tile1.collapsed_small).toBe(true);

            expect(tile2.collapsed).toBe(false);
            expect(tile2.collapsed_small).toBe(true);

            $scope.allCollapsed = false;

            $scope.$digest();

            expect(tile1.collapsed).toBe(true);
            expect(tile1.collapsed_small).toBe(false);

            expect(tile2.collapsed).toBe(false);
            expect(tile2.collapsed_small).toBe(false);
        });

        it('should not reload the layout when new tiles are initialized if they are in an existing tile view that has already been placed into the layout', function () {
            var $scope = $rootScope.$new(),
                tile1Scope,
                dashboard,
                tile1,
                tile1El,
                tile2,
                tile2El,
                tile2Scope,
                tile1TitleEl,
                tile2TitleEl;

            dashboard = createTileDashboard($scope, 'lg', true);

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1',
                        'Tile2'
                    ]
                ]
            };

            tile1 = {
                id: 'Tile1'
            };

            tile2 = {
                id: 'Tile2'
            };

            $scope.tiles = [tile1, tile2];

            $scope.$digest();

            $timeout.flush();

            $scope.$digest();

            tile1Scope = dashboard.el.isolateScope().$new();
            tile2Scope = dashboard.el.isolateScope().$new();

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1'

                    ],
                    [
                        'Tile2'
                    ]
                ]
            };

            tile1El = $compile(
                '<bb-tile>Tile 1</bb-tile>'
            )(tile1Scope);

            tile2El = $compile(
                '<bb-tile>Tile 2</bb-tile>'
            )(tile2Scope);

            dashboard.el.find('div[data-tile-id="Tile1"]').append(tile1El);
            dashboard.el.find('div[data-tile-id="Tile2"]').append(tile2El);

            tile1Scope.$digest();
            tile2Scope.$digest();
            $timeout.flush();            

            tile1TitleEl = dashboard.el.find('div[data-dashboard-column="1"] div[data-tile-id="Tile1"] .bb-tile-title');
            expect(tile1TitleEl.length).toBe(1);

            //Tile 2 should still in column 1, because the tiles are not layed out after a tile comes into an existing tile view
            tile2TitleEl = dashboard.el.find('div[data-dashboard-column="1"] div[data-tile-id="Tile2"] .bb-tile-title');
            expect(tile2TitleEl.length).toBe(1);            
        });

        it('should reload the layout when new tiles are initialized if they are in an  tile view that has not already been placed into the layout', function () {
            var $scope = $rootScope.$new(),
                tile1Scope,
                dashboard,
                tile1,
                tile1El,
                tile2,
                tile2El,
                tile2Scope,
                tile1TitleEl,
                tile2TitleEl;

            dashboard = createTileDashboard($scope, 'lg', true);

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1',
                        'Tile2'
                    ]
                ]
            };

            tile1 = {
                id: 'Tile1'
            };

            tile2 = {
                id: 'Tile2'
            };

            $scope.tiles = [tile1, tile2];

            $scope.$digest();

            $timeout.flush();

            $scope.$digest();

            tile1Scope = dashboard.el.isolateScope().$new();
            tile2Scope = dashboard.el.isolateScope().$new();

            $scope.layout = {
                two_column_layout: [
                    [
                        'Tile1'

                    ],
                    [
                        'Tile2'
                    ]
                ]
            };

            tile1El = $compile(
                '<bb-tile>Tile 1</bb-tile>'
            )(tile1Scope);

            tile2El = $compile(
                '<bb-tile>Tile 2</bb-tile>'
            )(tile2Scope);

            dashboard.el.find('div[data-tile-id="Tile1"]').append(tile1El);
            dashboard.el.find('div[data-tile-id="Tile2"]').append(tile2El);

            //Remove flag that notes the tile view has already been layed out.  In practice this is removed when the view
            //is created/destroyed based on state change.
            dashboard.el.find('div[data-tile-id="Tile2"]').removeAttr('data-tile-initial-layout-complete');

            tile1Scope.$digest();
            tile2Scope.$digest();
            $timeout.flush();

            tile1TitleEl = dashboard.el.find('div[data-dashboard-column="1"] div[data-tile-id="Tile1"] .bb-tile-title');
            expect(tile1TitleEl.length).toBe(1);

            //Tile 2 should now be in column 2, because the tiles are layed out after a tile comes into an tile view that has not been layed out
            tile2TitleEl = dashboard.el.find('div[data-dashboard-column="2"] div[data-tile-id="Tile2"] .bb-tile-title');
            expect(tile2TitleEl.length).toBe(1);            
        });
    });
});

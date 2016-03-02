/*global angular, alert */
(function () {
    'use strict';

    function TileDashboardConfig($stateProvider) {
        $stateProvider
        .state('tiledashboard', {
            url: '',
            views: {
                'tile1': {
                    controller: 'Tile1Controller as tile1Ctrl',
                    templateUrl: 'demo/tile/tile1.html'
                },
                'tile2': {
                    controller: 'Tile2Controller',
                    templateUrl: 'demo/tile/tile2.html'
                }
            }
        });
    }

    function Tile1Controller($timeout) {
        var self = this;

        self.resources = {
            tile_header: 'Tile header'
        };

        self.openSettings = function () {
            alert('Settings invoked!');
        };

        $timeout(function () {
            self.is_visible = true;
        }, 500);
    }

    Tile1Controller.$inject = ['$timeout'];

    function TileTestController(bbModal) {
        var self = this;


        function collapseAll() {
            self.allCollapsed = true;
        }

        self.collapseAll = collapseAll;

        function expandAll() {
            self.allCollapsed = false;
        }

        self.expandAll = expandAll;

        self.open = function () {
            bbModal.open({
                template: '<bb-modal>' +
                      '    <div class="modal-form">' +
                      '        <bb-modal-header bb-modal-help-key="\'bb-security-users.html\'">Form Header</bb-modal-header>' +
                      '        <div class="bb-modal-body-tiled" bb-modal-body>' +
                      '            <bb-tile bb-tile-header="\'Tile header\'">' +
                      '                <div bb-tile-section>' +
                      '                    Test.' +
                      '                </div>' +
                      '            </bb-tile>' +
                      '        </div>' +
                      '        <bb-modal-footer>' +
                      '            <bb-modal-footer-button-primary></bb-modal-footer-button-primary>' +
                      '            <bb-modal-footer-button-cancel></bb-modal-footer-button-cancel>' +
                      '        </bb-modal-footer>' +
                      '    </div>' +
                      '</bb-modal>'
            });
        };

        self.tiles = [
            {
                id: 'Tile1',
                view_name: 'tile1',
                collapsed: true,
                collapsed_small: true
            },
            {
                id: 'Tile2',
                view_name: 'tile2',
                collapsed: 'true',
                collapsed_small: true
            }
        ];

        self.layout = {
            one_column_layout: [
                'Tile1',
                'Tile2'
            ],
            two_column_layout: [
                [
                    'Tile1'
                ],
                [
                    'Tile2'
                ]

            ]
        };

    }

    TileDashboardConfig.$inject = ['$stateProvider'];
    TileTestController.$inject = ['bbModal'];


    angular.module('stache')
    .config(TileDashboardConfig)
    .controller('TileTestController', TileTestController)
    .controller('Tile1Controller', Tile1Controller)
    .controller('Tile2Controller', angular.noop);
}());

/*global angular */
(function () {
    'use strict';

    function TileTestController($scope) {
        $scope.locals = {
            openSettings: angular.noop,
            tileHeader: 'Tile with header content and a really really really long title ya know Im talking real talk extraordinarily long title, you wouldnt let ya boy write this'
        };
    }

    TileTestController.$inject = ['$scope'];

    angular.module('screenshots', ['sky'])
        .controller('TileTestController', TileTestController);
}());

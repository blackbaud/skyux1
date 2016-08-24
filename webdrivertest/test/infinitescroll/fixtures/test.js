/*global angular */
(function () {
    'use strict';

    function InfiniteScrollTestController($timeout) {
        var vm = this,
            idCount = 1;

        function addData() {
            var i,
                newStuff = [];
            for (i = 0; i < 2; i++) {
                newStuff.push({
                    id: idCount,
                    name: 'Title ' + idCount,
                    description: 'A description for ' + idCount
                });
                idCount++;
            }
            vm.data = vm.data.concat(newStuff);
        }
        vm.data = [];
        addData();
        
        vm.hasMore = true;

        vm.loadFn = function () {
            return $timeout(function () {

            }, 4000);

        };
    }

    InfiniteScrollTestController.$inject = ['$timeout'];

    angular.module('screenshots', ['sky'])
        .controller('InfiniteScrollTestController', InfiniteScrollTestController);
})();
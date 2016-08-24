/*global angular */
(function () {
    'use strict';

    function InfiniteScrollDemoController($timeout) {
        var vm = this,
            idCount = 1;

        function addData() {
            var i,
                newStuff = [];
            for (i = 0; i < 5; i++) {
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

                addData();

                if (idCount > 25) {
                    vm.hasMore = false;
                }
            }, 4000);

        };
    }

    InfiniteScrollDemoController.$inject = ['$timeout'];

    angular.module('stache')
        .controller('InfiniteScrollDemoController', InfiniteScrollDemoController);
})();
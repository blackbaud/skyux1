/*global angular */
(function () {
    'use strict';

    function InfinityScrollDemoController($timeout) {
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

        vm.loadFn = function (loadingComplete) {
            $timeout(function () {

                addData();

                if (idCount > 25) {
                    vm.hasMore = false;
                }
                loadingComplete();
            }, 4000);

        };
    }

    InfinityScrollDemoController.$inject = ['$timeout'];

    angular.module('stache')
        .controller('InfinityScrollDemoController', InfinityScrollDemoController);
}());
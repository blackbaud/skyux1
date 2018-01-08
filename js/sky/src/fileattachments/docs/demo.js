/*global angular */
(function () {
    'use strict';

    function FileAttachmentDemoController($scope) {
        var vm = this;

        function removeFromArray(items, obj) {
            var i,
                n;

            if (items) {
                for (i = 0, n = items.length; i < n; i++) {
                    if (items[i] === obj) {
                        items.splice(i, 1);
                        break;
                    }
                }
            }
        }

        vm.attachments = [];
        vm.links = [];
        vm.rejected = [];
        vm.allItems = [];
        vm.singleFile = null;

        vm.fileDropped = function (files, rejectedFiles) {
            vm.attachments = vm.attachments.concat(files);
            vm.allItems = vm.allItems.concat(files);
            vm.rejected = rejectedFiles;
        };

        vm.fileLinked = function (link) {
            vm.links.push(link);
            vm.allItems.push(link);
        };

        vm.deleteAttachment = function (file) {
            removeFromArray(vm.links, file);
            removeFromArray(vm.attachments, file);
            removeFromArray(vm.allItems, file);
        };

        vm.fileValidate = function (file) {
            if (file.name.indexOf('a') === 0) {
                return 'You may not upload a file that begins with the letter "a."';
            }
        };

        vm.fileChange = function (file, rejectedFiles) {
            if (file) {
                vm.fileDropped([file], rejectedFiles);
            } else {
                vm.fileDropped([], rejectedFiles);
            }
        };

        vm.fileLinkAction = function () {
            alert(vm.singleFile.name);
        };

        $scope.$watch(function () {
            return vm.alertClosed;
        }, function () {
            if (vm.alertClosed) {
                vm.rejected = null;
                vm.alertClosed = false;
            }
        });
    }

    FileAttachmentDemoController.$inject = ['$scope'];

    angular.module('stache')
        .controller('FileAttachmentDemoController', FileAttachmentDemoController);

}());

/*global angular */
(function () {
    'use strict';

    function TabsetTestController(bbModal) {
        var self = this,
            tabCount = 4;

        self.tabs = [
            {
                title: 'Tab 1',
                content: '1 content'
            },
            {
                title: 'Tab 2',
                content: '2 content'
            },
            {
                title: 'Tab 3',
                content: '3 content'
            }
        ];

        self.closeTab = function (index, event) {
            event.preventDefault();
            self.tabs.splice(index, 1);
        };

        self.addTab = function () {
            var newTitle = 'Tab ' + tabCount.toString(),
                newContent = tabCount.toString() + ' content';
            self.tabs.push({
                title: newTitle,
                content: newContent
            });
            tabCount++;
        };
        self.openTab = function () {
            bbModal.open({
                controller: 'CheckModalController as checkCtrl',
                templateUrl: 'demo/tabset/checklist.html',
                resolve: {
                    currentTabs: function () {
                        return angular.copy(self.tabs);
                    }
                }
            }).result.then(function (selectedTabs) {
                self.tabs = selectedTabs;
            });
        };
    }

    function CheckModalController($scope, currentTabs) {
        var self = this;

        self.availableTabs = [
            {
                title: 'Opened Tab 1',
                description: 'The first tab that can be opened',
                content: 'Opened Tab 1 Content'
            },
            {
                title: 'Opened Tab 2',
                description: 'The second tab that can be opened',
                content: 'Opened Tab 2 Content'
            },
            {
                title: 'Opened Tab 3',
                description: 'The third tab that can be opened',
                content: 'Opened Tab 3 Content'
            }
        ];

        if (!currentTabs) {
            self.selectedTabs = [];
        } else {
            self.selectedTabs = currentTabs;
        }

        self.applyChanges = function () {
            $scope.$close(self.selectedTabs);
        };
    }

    CheckModalController.$inject = ['$scope', 'currentTabs'];

    TabsetTestController.$inject = ['bbModal'];


    angular.module('stache')
        .controller('CheckModalController', CheckModalController)
        .controller('TabsetTestController', TabsetTestController);
}());

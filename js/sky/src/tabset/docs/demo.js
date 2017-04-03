/*global angular */
(function () {
    'use strict';

    function TabsetTestController(bbModal) {
        var self = this,
            tabCount = 4;

        self.tabs = [
            {
                title: 'Tab 1',
                content: 'Placeholder content for Tab 1'
            },
            {
                title: 'Tab 2',
                content: 'Placeholder content for Tab 2'
            },
            {
                title: 'Tab 3',
                content: 'Placeholder content for Tab 3'
            }
        ];

        self.closeTab = function (index, event) {
            event.preventDefault();
            self.tabs.splice(index, 1);
        };

        self.addTab = function () {
            var newTitle = 'Tab ' + tabCount.toString(),
                newContent = 'Placeholder content for Tab ' + tabCount.toString();
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
                title: 'Opened tab 1',
                description: 'The first tab that the modal can open',
                content: 'Placeholder content for Opened tab 1'
            },
            {
                title: 'Opened tab 2',
                description: 'The second tab that the modal can open',
                content: 'Placeholder content for Opened tab 2'
            },
            {
                title: 'Opened tab 3',
                description: 'The third tab that the modal can open',
                content: 'Placeholder content for Opened tab 3'
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

    function TabsetPageController() {
        var self = this;
        self.pages = [
            {
                title: "Records",
                count: 10,
                content: "Placeholder content for a tab that displays 10 records."
            },
            {
                title: "Gifts",
                count: 14,
                content: "Placeholder content for a tab that displays 14 gifts."
            },
                            {
                title: "Users",
                count: 144,
                content: "Placeholder content for a tab that displays 144 users."
            }

        ]
    }

    CheckModalController.$inject = ['$scope', 'currentTabs'];

    TabsetTestController.$inject = ['bbModal'];

    function VerticalTabsetDemoController() {

    }

    VerticalTabsetDemoController.$inject = [];

    angular.module('stache')
        .controller('CheckModalController', CheckModalController)
        .controller('TabsetTestController', TabsetTestController)
        .controller('TabsetPageController', TabsetPageController)
        .controller('VerticalTabsetDemoController', VerticalTabsetDemoController);
}());

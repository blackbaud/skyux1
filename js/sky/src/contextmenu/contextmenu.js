/* global angular */

(function () {
    'use strict';

    function getTemplateUrl(name) {
        return 'sky/templates/contextmenu/' + name + '.html';
    }

    function bbContextMenu() {
        return {
            replace: true,
            restrict: 'E',
            transclude: true,
            templateUrl: getTemplateUrl('contextmenu'),
            link: function ($scope) {
                $scope.contextButtonStopPropagation = function ($event) {
                    $event.stopPropagation();
                };
            }
        };
    }

    function bbContextMenuItem() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                clickItem: '&bbContextMenuAction'
            },
            templateUrl: getTemplateUrl('menuitem')
        };
    }

    function bbContextMenuButton() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: getTemplateUrl('menubutton')
        };
    }

    function toggleAccordion($event, $scope) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.accordionLocals.accordionOpen = !$scope.accordionLocals.accordionOpen;
    }

    function BBSubmenuController($scope) {
        var self = this;

        self.toggleAccordion = function ($event) {
            toggleAccordion($event, $scope);
        };
    }

    BBSubmenuController.$inject = ['$scope'];

    function bbSubmenu() {
        return {
            controller: 'bbSubmenuController',
            restrict: 'E',
            scope: {
                heading: '=?bbSubmenuHeading'
            },
            link: function ($scope, el, attrs) {
                $scope.accordionLocals = {
                    accordionOpen: false,
                    staticHeader: false
                };

                if (angular.isDefined(attrs.bbSubmenuHeading)) {
                    $scope.accordionLocals.staticHeader = true;
                }

                $scope.toggleAccordion = function ($event) {
                    toggleAccordion($event, $scope);
                };
            },
            transclude: true,
            templateUrl: getTemplateUrl('submenu')
        };
    }

    function bbSubmenuHeading() {
        return {
            restrict: 'E',
            require: '^bbSubmenu',
            scope: true,
            link: function ($scope, el, attrs, submenuCtrl) {
                $scope.toggleAccordion = function ($event) {
                    submenuCtrl.toggleAccordion($event);
                };
            },
            transclude: true,
            templateUrl: getTemplateUrl('submenuheading')
        };
    }

    angular.module('sky.contextmenu', ['ui.bootstrap.dropdown', 'ui.bootstrap.accordion'])
        .controller('bbSubmenuController', BBSubmenuController)
        .directive('bbContextMenu', bbContextMenu)
        .directive('bbContextMenuItem', bbContextMenuItem)
        .directive('bbContextMenuButton', bbContextMenuButton)
        .directive('bbSubmenu', bbSubmenu)
        .directive('bbSubmenuHeading', bbSubmenuHeading);
}());

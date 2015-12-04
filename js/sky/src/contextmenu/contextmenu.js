/* global angular */

/** @module Context Menu

@icon ellipsis-h
@summary The context menu creates simple or complicated dropdown menus that you can incorporate into buttons.
@description The context menu directives allow you to easily create Sky-styled  [dropdown](https://angular-ui.github.io/bootstrap/#/dropdown) menus. There are 3 directives in the context menu module:
  - `bb-context-menu` creates a dropdown with the context menu button.
  - `bb-context-menu-item` creates dropdown menu items within a dropdown that execute `bb-context-menu-action` on click.
  - `bb-context-menu-button` creates a button with the Sky context menu styles.
  - `bb-submenu` creates an accordion style submenu in a dropdown, you can place it in a dropdown list element.
    - `bb-submenu-heading` Can be either an attribute on `bb-submenu` that can be set equal to static header text, or can be used as a directive inside of `bb-submenu` to place arbitrary content in an accordion heading.
*/

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

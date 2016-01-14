/* global angular */

/** @module Context Menu

@icon ellipsis-h
@summary The context menu creates simple or complicated dropdown menus that you can incorporate into buttons.
@description The context menu directives allow you to create {{ stache.config.product_name_short }}-themed [dropdown](https://angular-ui.github.io/bootstrap/#/dropdown) menus. The context menu module includes three directives.
  - `bb-context-menu` &mdash; Creates a dropdown menu within the context menu button.
  - `bb-context-menu-item` &mdash; Creates an entry within a dropdown menu. When clicked, the menu item executes `bb-context-menu-action`.
  - `bb-context-menu-button` &mdash; Creates a button with the {{ stache.config.product_name_short }} context menu styles.
  - `bb-submenu` &mdash; Creates an accordion-style submenu within a dropdown menu. You can place the submenu within a dropdown list element.
    - `bb-submenu-heading` &mdash; Specifies a header for a submenu. To specify a static header, apply this as an attribute of `bb-submenu`. To place arbitrary content in th header, apply this as a directive within `bb-submenu`.
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

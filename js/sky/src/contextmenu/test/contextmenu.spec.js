/*jshint jasmine: true */
/*global angular, inject, module */

describe('Context menu', function () {
    'use strict';

    var $compile,
        $document,
        $scope;

    beforeEach(module(
                'sky.contextmenu',
                'sky.templates',
                'template/accordion/accordion.html',
                'template/accordion/accordion-group.html'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();

        $document = _$document_;

        $scope.locals = {
            items: [
                {
                    onClick: function () {
                        $scope.locals.items[0].clicked = true;
                    },
                    text: 'Item 1',
                    clicked: false
                },
                {
                    onClick: function () {
                        $scope.locals.items[1].clicked = true;
                    },
                    text: 'Item 2',
                    clicked: false
                },
                {
                    onClick: function () {
                        $scope.locals.items[2].clicked = true;
                    },
                    text: 'Item 3',
                    clicked: false
                }
            ]
        };

    }));

    function verifyContextMenuDropdown(el) {
        var i,
            itemsEl;

        $compile(el)($scope);
        $scope.$digest();

        expect(el.find('div.bb-context-menu.dropdown').length).toBe(1);
        expect(el.find('button.btn.bb-btn-secondary.bb-context-menu-btn.dropdown-toggle i.fa.fa-ellipsis-h').length).toBe(1);

        itemsEl = el.find('ul li a');
        expect(itemsEl.length).toBe(3);

        for (i = 0; i < $scope.locals.items.length; i++) {
            expect(itemsEl.eq(i)).toHaveText($scope.locals.items[i].text);

            itemsEl.eq(i).click();
            expect($scope.locals.items[i].clicked).toBe(true);
        }
    }

    it('can create a context menu dropdown using bb-context-menu-item', function () {
        var el = angular.element([
            '<div>',
            '<bb-context-menu>',
            '   <bb-context-menu-item ng-repeat="item in locals.items" bb-context-menu-action="item.onClick()">',
            '   {{item.text}}',
            '   </bb-context-menu-item>',
            '</bb-context-menu>',
            '</div>'
        ].join(''));

        verifyContextMenuDropdown(el);

    });

    it('can create a context menu dropdown using bb-context-menu and li', function () {
        var el = angular.element([
            '<div>',
            '<bb-context-menu>',
            '   <li role="presentation" ng-repeat="item in locals.items">',
            '       <a role="menuitem" href="javascript:void(0)" ng-click="item.onClick()">{{item.text}}</a></li>',
            '</bb-context-menu>',
            '</div>'
        ].join(''));

        verifyContextMenuDropdown(el);
    });

    it('can create a context menu dropdown using angular ui bootstrap dropdown and bb-context-menu-button', function () {
        var el = angular.element([
            '<div>',
            '<div class="bb-context-menu" dropdown>',
            '<bb-context-menu-button dropdown-toggle></bb-context-menu-button>',
            '<ul class="dropdown-menu" role="menu">',
            '   <li role="presentation" ng-repeat="item in locals.items">',
            '       <a role="menuitem" href="javascript:void(0)" ng-click="item.onClick()">{{item.text}}</a></li>',
            '</ul>',
            '</div>',
            '</div>'
        ].join(''));
        verifyContextMenuDropdown(el);
    });

    describe('submenu directive', function () {
        function getAccordionTitle(el) {
            return el.find('.bb-submenu .panel-title .accordion-toggle > span > div span');
        }

        function getChevronIcon(el) {
            return el.find('.bb-submenu .panel-title .accordion-toggle .fa-chevron-down');
        }

        function getAccordionItems(el) {
            return el.find('.bb-submenu .panel-collapse .panel-body a');
        }

        function getAccordionPanel(el) {
            return el.find('.bb-submenu .panel-collapse');
        }

        function getAccordionHeading(el) {
            return el.find('.bb-submenu .panel-title .accordion-toggle > span > div');
        }

        function getDropdownMenu(el) {
            return el.find('ul.dropdown-menu');
        }

        function getDropdownButton(el) {
            return el.find('button.bb-context-menu-btn');
        }

        function testSubmenu(el) {
            var submenuItems,
                firstClicked = false,
                secondClicked = false;

            $scope.locals.firstClick = function () {
                firstClicked = true;
            };

            $scope.locals.secondClick = function () {
                secondClicked = true;
            };

            $scope.locals.heading = 'Submenu';
            $document.find('body').eq(0).append(el);
            $compile(el)($scope);
            $scope.$digest();

            getDropdownButton(el).click();

            expect(getAccordionTitle(el)).toHaveText('Submenu');
            expect(getChevronIcon(el).length).toBe(1);

            expect(getAccordionPanel(el)).not.toHaveClass('in');

            getAccordionHeading(el).click();
            $scope.$digest();

            submenuItems = getAccordionItems(el);
            expect(getAccordionPanel(el)).toHaveClass('in');

            submenuItems.eq(0).click();
            $scope.$digest();
            expect(firstClicked).toBe(true);

            expect(getDropdownMenu(el)).not.toBeVisible();

            getDropdownButton(el).click();

            submenuItems = getAccordionItems(el);

            submenuItems.eq(1).click();
            $scope.$digest();
            expect(firstClicked).toBe(true);
            el.remove();
        }

        it('can have a collapsible submenu with heading attribute', function () {
            var el = angular.element([
                '<div>',
                '<div class="bb-context-menu" dropdown>',
                '<bb-context-menu-button dropdown-toggle></bb-context-menu-button>',
                '<ul class="dropdown-menu" role="menu">',
                '   <li role="presentation" ng-repeat="item in locals.items">',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="item.onClick()">{{item.text}}</a></li>',
                '   <li role="presentation">',
                '   <bb-submenu bb-submenu-heading="locals.heading">',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="locals.firstClick()">First Item</a>',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="locals.secondClick()">Second Item</a>',
                '   </bb-submenu>',
                '   </li>',
                '</ul>',
                '</div>',
                '</div>'
            ].join(''));

            testSubmenu(el);

        });

        it('can have a collapsible submenu with bbSubmenuHeading directive', function () {
            var el = angular.element([
                '<div>',
                '<div class="bb-context-menu" dropdown>',
                '<bb-context-menu-button dropdown-toggle></bb-context-menu-button>',
                '<ul class="dropdown-menu" role="menu">',
                '   <li role="presentation" ng-repeat="item in locals.items">',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="item.onClick()">{{item.text}}</a></li>',
                '   <li role="presentation">',
                '   <bb-submenu>',
                '       <bb-submenu-heading>',
                '           {{locals.heading}}',
                '       </bb-submenu-heading>',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="locals.firstClick()">First Item</a>',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="locals.secondClick()">Second Item</a>',
                '   </bb-submenu>',
                '   </li>',
                '</ul>',
                '</div>',
                '</div>'
            ].join(''));

            testSubmenu(el);
        });
    });
});

/*jshint jasmine: true */
/*global angular, inject, module */

describe('Context menu', function () {
    'use strict';

    var $animate,
        $compile,
        $document,
        $scope,
        bbResources;

    beforeEach(module(
        'ngAnimateMock',
        'sky.contextmenu',
        'sky.templates',
        'uib/template/accordion/accordion.html',
        'uib/template/accordion/accordion-group.html'
    ));


    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$animate_, _bbResources_) {

        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $document = _$document_;
        $animate = _$animate_;
        bbResources = _bbResources_;

        bbResources.context_menu_default_label = '##(G)JG#F()DBNEWT#@)G';

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
        expect(el.find('bb-context-menu-button button.btn.dropdown-toggle.bb-btn-secondary.bb-context-menu-btn i.fa.fa-ellipsis-h').length).toBe(1);
        el.find('.bb-context-menu-btn').click();
        $scope.$digest();

        itemsEl = el.find('.bb-dropdown-menu .bb-dropdown-item a');
        expect(itemsEl.length).toBe(3);

        for (i = 0; i < $scope.locals.items.length; i++) {
            expect(itemsEl.eq(i)).toHaveText($scope.locals.items[i].text);

            itemsEl.eq(i).click();
            expect($scope.locals.items[i].clicked).toBe(true);
        }
    }

    function validateButtonLabel(el, label) {
        expect(el.find('.bb-context-menu-btn')).toHaveAttr('aria-label', label);
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
            '   <div class="bb-dropdown-item" role="presentation" ng-repeat="item in locals.items">',
            '       <a role="menuitem" href="javascript:void(0)" ng-click="item.onClick()">{{item.text}}</a></div>',
            '</bb-context-menu>',
            '</div>'
        ].join(''));

        verifyContextMenuDropdown(el);
    });

    it('can create a context menu dropdown using angular ui bootstrap dropdown and bb-context-menu-button', function () {
        var el = angular.element([
            '<div>',
            '<div class="bb-context-menu" uib-dropdown>',
            '<bb-context-menu-button bb-context-menu-button-dropdown-toggle></bb-context-menu-button>',
            '<div class="dropdown-menu bb-dropdown-menu" role="menu">',
            '   <div class="bb-dropdown-item" role="presentation" ng-repeat="item in locals.items">',
            '       <a role="menuitem" href="javascript:void(0)" ng-click="item.onClick()">{{item.text}}</a></div>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));
        verifyContextMenuDropdown(el);
    });

    it('should add a default localizable accessibility label to the context menu button', function () {
        var el = $compile(
            '<bb-context-menu></bb-context-menu>'
        )($scope);

        $scope.$digest();

        validateButtonLabel(el, bbResources.context_menu_default_label);
    });

    it('should allow a custom accessibility label to be specified', function () {
        var el = $compile(
            '<bb-context-menu bb-context-menu-label="{{label}}"></bb-context-menu>'
        )($scope);

        $scope.label = 'Test label';
        $scope.$digest();

        validateButtonLabel(el, 'Test label');
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
            return el.find('.dropdown-menu');
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
            $animate.flush();
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
                '<div class="dropdown-menu bb-dropdown-menu" role="menu">',
                '   <div class="bb-dropdown-item" role="presentation" ng-repeat="item in locals.items">',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="item.onClick()">{{item.text}}</a></div>',
                '   <div class="bb-dropdown-item" role="presentation">',
                '   <bb-submenu bb-submenu-heading="locals.heading">',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="locals.firstClick()">First Item</a>',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="locals.secondClick()">Second Item</a>',
                '   </bb-submenu>',
                '   </div>',
                '</div>',
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
                '<div class="dropdown-menu bb-dropdown-menu" role="menu">',
                '   <div class="bb-dropdown-item" role="presentation" ng-repeat="item in locals.items">',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="item.onClick()">{{item.text}}</a></div>',
                '   <div class="bb-dropdown-item" role="presentation">',
                '   <bb-submenu>',
                '       <bb-submenu-heading>',
                '           {{locals.heading}}',
                '       </bb-submenu-heading>',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="locals.firstClick()">First Item</a>',
                '       <a role="menuitem" href="javascript:void(0)" ng-click="locals.secondClick()">Second Item</a>',
                '   </bb-submenu>',
                '   </div>',
                '</div>',
                '</div>',
                '</div>'
            ].join(''));

            testSubmenu(el);
        });

    });
});

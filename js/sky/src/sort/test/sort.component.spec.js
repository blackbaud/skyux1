/* jshint jasmine: true */
/* global module, inject */
(function () {
    'use strict';
    describe('Sort component', function () {
        var $compile,
            $scope,
            $document,
            sortHtml =  '<bb-sort>' +
                '<bb-sort-item ' +
                'ng-repeat="item in sortCtrl.items" ' +
                'bb-sort-item-active="sortCtrl.initialState === item.id" ' +
                'bb-sort-item-select="sortCtrl.sortItems(item)">' +
                '{{item.label}}' +
                '</bb-sort-item>' +
                '</bb-sort>';

        beforeEach(module(
            'sky.sort',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;

            $scope.sortCtrl = {
                items: [{
                    id: '1',
                    label: 'label 1'
                },
                {
                    id: '2',
                    label: 'label 2'
                }]
            };
            
        }));

        function getSortButton(el) {
            return el.find('button.bb-btn-secondary');
        }

        function getSortMenu(el) {
            return el.find('.dropdown-menu');
        }

        function getSortItems(el) {
            return el.find('bb-sort-item .bb-dropdown-item a');
        }

        function getDropdownItems(el) {
            return el.find('bb-sort-item .bb-dropdown-item');
        }

        function initSort(templateHtml) {
            var sortEl = $compile(templateHtml)($scope);
            $document.find('body').append(sortEl);
            $scope.$digest();
            return sortEl;
        }

        it('creates a sort button and items', function () {

            var sortEl,
                sortButtonEl,
                sortItems,
                sortMenu;

            sortEl = initSort(sortHtml);

            sortButtonEl = getSortButton(sortEl);
            expect(sortButtonEl.find('i.fa-sort').length).toBe(1);

            sortButtonEl.click();

            sortMenu = getSortMenu(sortEl);

            expect(sortMenu).toBeVisible();

            expect(sortMenu.find('.bb-subsection-heading')).toHaveText('Sort by');

            sortItems = getSortItems(sortEl);

            expect(sortItems.eq(0)).toHaveText('label 1');

            expect(sortItems.eq(1)).toHaveText('label 2');

            sortEl.remove();

        });

        function verifyStyles(sortEl, index, isSelected) {
            var dropdownItems = getDropdownItems(sortEl),
                sortItems = getSortItems(sortEl);
            if (isSelected) {
                expect(sortItems.eq(index)).toHaveClass('bb-emphasized');
                expect(dropdownItems.eq(index)).toHaveClass('bb-sort-selected');
            } else {
                expect(sortItems.eq(index)).not.toHaveClass('bb-emphasized');
                expect(dropdownItems.eq(index)).not.toHaveClass('bb-sort-selected');
            }
        }

        it('calls the proper function on sort item select and applies styling', function () {
            var sortEl,
                sortButtonEl,
                selectedItem,
                sortItems;
            
            $scope.sortCtrl.sortItems = function (item) {
                selectedItem = item;
            };
            
            sortEl = initSort(sortHtml);

            sortButtonEl = getSortButton(sortEl);

            sortButtonEl.click();

            sortItems = getSortItems(sortEl);
            sortItems.eq(0).click();
            $scope.$digest();
            expect(selectedItem).toEqual($scope.sortCtrl.items[0]);
            verifyStyles(sortEl, 0, true);

            sortItems.eq(1).click();
            $scope.$digest();
            expect(selectedItem).toEqual($scope.sortCtrl.items[1]);
            verifyStyles(sortEl, 0, false);
            verifyStyles(sortEl, 1, true);

            sortEl.remove();
        });

        it('updates the applied styling on active binding change', function () {
            var sortEl;
            
            sortEl = initSort(sortHtml);

            $scope.sortCtrl.initialState = '1';
            $scope.$digest();

            verifyStyles(sortEl, 0, true);

            $scope.sortCtrl.initialState = '2';
            $scope.$digest();

            verifyStyles(sortEl, 0, false);
            verifyStyles(sortEl, 1, true);

            sortEl.remove();
        });

        it('updates the applied styling on initialization', function () {
            var sortEl;
            $scope.sortCtrl.initialState = '1';
            sortEl = initSort(sortHtml);

            verifyStyles(sortEl, 0, true);

            sortEl.remove();
        });

        it('applies the dropdown-append-to-body attribute when necessary', function () {
            var sortEl,
                appendHtml = '<bb-sort bb-sort-append-to-body>' +
                '<bb-sort-item ' +
                'ng-repeat="item in sortCtrl.items" ' +
                'bb-sort-item-active="sortCtrl.initialState === item.id" ' +
                'bb-sort-item-select="sortCtrl.sortItems(item)">' +
                '{{item.label}}' +
                '</bb-sort-item>' +
                '</bb-sort>';

            sortEl = initSort(appendHtml);

            expect($document.find('body').children('.bb-dropdown-menu').length).toBe(1);
            sortEl.remove();
        });
    });
})();
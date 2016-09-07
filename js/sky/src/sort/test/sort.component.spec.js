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

        it('creates a sort button and items', function () {

            var sortEl = $compile(sortHtml)($scope),
                sortButtonEl,
                sortItems,
                sortMenu;
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

            $document.find('body').append(sortEl);
            $scope.$digest();

            sortButtonEl = getSortButton(sortEl);
            expect(sortButtonEl.find('i.fa-sort').length).toBe(1);

            sortButtonEl.click();

            sortMenu = getSortMenu(sortEl);

            expect(sortMenu).toBeVisible();

            expect(sortMenu.find('.bb-subsection-heading')).toHaveText('Sort by');

            sortItems = getSortItems(sortEl);

            expect(sortItems.eq(0)).toHaveText('label 1');

            expect(sortItems.eq(0)).toHaveText('label 2');

            sortEl.remove();

        });

        it('calls the proper function on sort item select and applies styling', function () {

        });

        it('updates the applied styling on active binding change', function () {

        });

        it('updates the applied styling on initialization', function () {

        });

    });
})();
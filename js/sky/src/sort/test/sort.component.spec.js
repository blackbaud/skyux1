/* jshint jasmine: true */
/* global module, angular, inject */
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

        it('creates a sort buttons and items', function () {

        });

        it('calls the proper function on sort item select and applies styling', function () {

        });

        it('updates the applied styling on active binding change', function () {

        });

    });
})();
/* jshint jasmine: true */
/* global module, inject*/
(function () {
    'use strict';
    describe('Filter button', function () {
        var $compile,
            $scope;

        beforeEach(module(
            'sky.filter',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
        }));

        it('should create a filter button which calls a function on click', function () {
            var filterBtnHtml = ' <div> ' +
                    '<bb-filter-button ' +
                        'bb-filter-button-on-click="filterCtrl.appliedFilterCallback()" ' +
                    '>' +
                    '</div>',
                    filterCalled = false,
                    el;

            $scope.filterCtrl = {
                appliedFilterCallback: function () {
                    filterCalled = true;
                }
            };

            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();

            el.find('.btn.bb-btn-secondary').click();

            expect(filterCalled).toBe(true);
        });
        
    });
})();
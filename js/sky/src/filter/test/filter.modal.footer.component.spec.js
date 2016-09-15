/* jshint jasmine: true */
/* global module, inject*/
(function () {
    'use strict';
    describe('Filter modal footer', function () {
        var $compile,
            $scope,
            $document;

        beforeEach(module(
            'sky.filter',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
        }));


        it('Creates a modal footer with apply and clear filter buttons', function () {
            var modalHtml = '<div><bb-modal><bb-filter-modal-footer ' + 
                'bb-filter-modal-apply="modalCtrl.applyFilters()" ' +
                'bb-filter-modal-clear="modalCtrl.clearAllFilters()"> ' +
            '</bb-filter-modal-footer></bb-modal></div>',
                footerEl,
                filtersApplied = false,
                filtersCleared = false,
                applyEl,
                clearEl;

            $scope.modalCtrl = {
                applyFilters: function () {
                    filtersApplied = true;
                },
                clearAllFilters: function () {
                    filtersCleared = true;
                }
            };

            footerEl = $compile(modalHtml)($scope);
            $document.find('body').append(footerEl);

            $scope.$digest();

            applyEl = footerEl.find('.modal-footer .btn-primary');

            expect(applyEl).toHaveText('Apply filters');
            applyEl.click();
            expect(filtersApplied).toBe(true);

            clearEl = footerEl.find('.modal-footer .btn-link').eq(0);

            expect(clearEl).toHaveText('Clear all filters');
            clearEl.click();
            expect(filtersCleared).toBe(true);

            footerEl.remove();
        });


    });
})();
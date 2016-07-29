/* jshint jasmine: true */
/* global module, inject*/
(function () {
    'use strict';
    describe('Filter button', function () {
        var $compile,
            $scope,
            bbModal;

        beforeEach(module(
            'sky.filter',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _bbModal_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            bbModal = _bbModal_;
        }));

        it('should create a filter button which launches a modal with the appropriate object', function () {
            var filterBtnHtml = ' <div> ' +
                    '<bb-filter-button ' +
                        'bb-filter-button-modal-open="filterCtrl.openObject" ' +
                        'bb-filter-button-apply="filterCtrl.appliedFilterCallback(filters)" ' +
                    '>' +
                    '</div>',
                    actualFilters = {
                        filter: 'blue'
                    },
                    actualOpen,
                    expectedFilters,
                    el;

            spyOn(bbModal, 'open').and.callFake(function (openObject) {
                actualOpen = openObject;
                return {
                    result: {
                        then: function (callback) {
                            callback(actualFilters);
                        }
                    }
                };
            });

            $scope.filterCtrl = {
                openObject: {
                    templateUrl: 'myUrl',
                    controller: 'myController'
                },
                appliedFilterCallback: function (filters) {
                    expectedFilters = filters;
                }
            };

            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();

            el.find('.btn.bb-btn-secondary').click();

            expect(actualOpen).toEqual($scope.filterCtrl.openObject);
            expect(expectedFilters).toEqual(actualFilters);
        });
        
    });
})();
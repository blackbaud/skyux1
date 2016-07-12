/* jshint jasmine: true */
/* global module, inject*/
(function () {
    'use strict';
    describe('Listbuilder filter', function () {
        var $compile,
            $scope,
            bbModal;

        beforeEach(module(
            'sky.listbuilder',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _bbModal_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            bbModal = _bbModal_;
        }));

        it('should create a filter button which launches a modal with the appropriate object', function () {
            var filterBtnHtml = ' <bb-listbuilder> ' +
                    '<bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-filter ' +
                        'bb-listbuilder-filter-modal-open="listCtrl.openObject" ' +
                        'bb-listbuilder-filter-apply="listCtrl.appliedFilterCallback(filters)" ' +
                    '>' +
                    '</bb-listbuilder-filter>' +
                    '</bb-listbuilder-toolbar>' +
                    '</bb-listbuilder>',
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

            $scope.listCtrl = {
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

            expect(actualOpen).toEqual($scope.listCtrl.openObject);
            expect(expectedFilters).toEqual(actualFilters);
        });
        
    });
})();
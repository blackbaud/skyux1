/* jshint jasmine: true */
/* global module, inject*/
(function () {
    'use strict';
    describe('Filter summary', function () {
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

        it('should create a filter summary with header label', function () {
            
        });

        it('should create filter summary items', function () {

        });

        it('should not show the close icon on filter summary items when bbFilterSummaryItemIsDismissable is false', function() {

        });
        
    });
})();
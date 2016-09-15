/* jshint jasmine: true */
/* global module, inject, $*/
(function () {
    'use strict';
    describe('Filter summary', function () {
        var $compile,
            $document,
            $scope;

        beforeEach(module(
            'sky.filter',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
        }));

        function findDismissEl(el) {
            return el.find('.bb-filter-summary-item .close');
        }

        function findSummaryItemEl(el) {
            return el.find('.bb-filter-summary .bb-filter-summary-item');
        }

        it('should create a filter summary with header label', function () {
            var summaryHtml = '<bb-filter-summary></bb-filter-summary>',
                summaryEl;

            summaryEl = $compile(summaryHtml)($scope);

            $scope.$digest();

            expect(summaryEl.find('.bb-filter-summary .bb-filter-summary-header')).toHaveText('Filter:');

        });

        it('should create filter summary items', function () {
            var summaryHtml = '<bb-filter-summary >' +
                '<bb-filter-summary-item ' +
                    'bb-filter-summary-item-on-click="filterCtrl.filterButtonClicked()" ' +
                    'bb-filter-summary-item-on-dismiss="filterCtrl.onDismiss($index)"> ' +
                    '{{filterCtrl.appliedName}} ' +
                '</bb-filter-summary-item> ' +
                '</bb-filter-summary>',
                summaryEl,
                dismissEl,
                itemEl,
                e,
                itemClicked = false,
                itemDismissed = false;

            $scope.filterCtrl = {
                filterButtonClicked: function () {
                    itemClicked = true;
                },
                onDismiss: function () {
                    itemDismissed = true;
                },
                appliedName: 'filterName'
            };

            summaryEl = $compile(summaryHtml)($scope);

            summaryEl.appendTo($document.find('body'));

            $scope.$digest();

            itemEl =  findSummaryItemEl(summaryEl);

            expect(itemEl).toHaveText('filterName');
            itemEl.click();
            expect(itemClicked).toEqual(true);

            itemClicked = false;

            e = $.Event('keypress');
            e.which = 13;
            e.keyCode = 13;

            itemEl.trigger(e);
            $scope.$digest();

            expect(itemClicked).toEqual(true);

            dismissEl = findDismissEl(summaryEl);
            expect(dismissEl).toBeVisible();
            dismissEl.click();
            expect(itemDismissed).toEqual(true);

            itemDismissed = false;
            dismissEl.trigger(e);
            $scope.$digest();

            expect(itemDismissed).toEqual(true);

            summaryEl.remove();

        });

        function dismissibleTest(testHtml) {
            var summaryEl,
                dismissEl,
                itemClicked = false;

            $scope.filterCtrl = {
                filterButtonClicked: function () {
                    itemClicked = true;
                },
                appliedName: 'filterName'
            };

            summaryEl = $compile(testHtml)($scope);
            summaryEl.appendTo($document.find('body'));

            $scope.$digest();

            dismissEl = findDismissEl(summaryEl);
            expect(dismissEl).not.toBeVisible();

            summaryEl.remove();
        }

        it('should not show the close icon on filter summary items when bbFilterSummaryItemIsDismissable is false', function () {
            var summaryHtml = '<bb-filter-summary >' +
                '<bb-filter-summary-item ' +
                    'bb-filter-summary-item-on-click="filterCtrl.filterButtonClicked()" ' +
                    'bb-filter-summary-item-is-dismissable="false"> ' +
                    '{{filterCtrl.appliedName}} ' +
                '</bb-filter-summary-item> ' +
                '</bb-filter-summary>';

            dismissibleTest(summaryHtml);
        });

        it('should not show the close icon on filter summary items when bbFilterSummaryItemIsDismissible is false', function () {
            var summaryHtml = '<bb-filter-summary >' +
                '<bb-filter-summary-item ' +
                    'bb-filter-summary-item-on-click="filterCtrl.filterButtonClicked()" ' +
                    'bb-filter-summary-item-is-dismissible="false"> ' +
                    '{{filterCtrl.appliedName}} ' +
                '</bb-filter-summary-item> ' +
                '</bb-filter-summary>';

            dismissibleTest(summaryHtml);
        });

        it('should not blow up if a dismiss function is not provided', function () {
            var summaryHtml = '<bb-filter-summary >' +
                '<bb-filter-summary-item ' +
                    'bb-filter-summary-item-on-click="filterCtrl.filterButtonClicked()"> ' +
                    '{{filterCtrl.appliedName}} ' +
                '</bb-filter-summary-item> ' +
                '</bb-filter-summary>',
                summaryEl,
                dismissEl,
                itemClicked = false;

            $scope.filterCtrl = {
                filterButtonClicked: function () {
                    itemClicked = true;
                },
                appliedName: 'filterName'
            };

            summaryEl = $compile(summaryHtml)($scope);
            summaryEl.appendTo($document.find('body'));

            $scope.$digest();

            dismissEl = findDismissEl(summaryEl);
            dismissEl.click();
            $scope.$digest();

            summaryEl.remove();
        });
        
    });
})();
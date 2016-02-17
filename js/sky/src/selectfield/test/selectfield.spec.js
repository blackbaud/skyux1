/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Select field directive', function () {
    'use strict';

    var bbFormat,
        bbResources,
        $animate,
        $compile,
        $filter,
        $rootScope,
        $templateCache;

    function closeCurrentModal() {
        $('.bb-modal .close').click();

        // This has to be called twice to force the modal to be removed from the DOM.
        $animate.flush();
        $animate.flush();
    }

    beforeEach(module(
        'ngMock',
        'ngAnimateMock',
        'sky.selectfield',
        'sky.templates'
    ));

    beforeEach(inject(function (_$animate_, _$compile_, _$filter_, _$rootScope_, _$templateCache_, _bbFormat_, _bbResources_) {
        $animate = _$animate_;
        $compile = _$compile_;
        $filter = _$filter_;
        $rootScope = _$rootScope_;
        $templateCache = _$templateCache_;
        bbFormat = _bbFormat_;
        bbResources = _bbResources_;
    }));

    describe('single-select', function () {
        beforeEach(function () {
            $templateCache.put(
                'bbSelectField/single/test.html',
                ''
            );
        });

        it('should display the selected value in the button used to invoke the picker', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-style="single" bb-select-field-selected-items="selectedItems"></bb-select-field>')($scope);

            $scope.$digest();

            $scope.selectedItems = [
                {
                    title: 'Selected item'
                }
            ];

            $scope.$digest();

            expect(el.find('.bb-select-field-single-title').text()).toBe('Selected item');
        });

        it('should display a dialog without footer buttons when clicked', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(
                '<bb-select-field bb-select-field-style="single">' +
                    '<bb-select-field-picker bb-select-field-picker-template="bbSelectField/single/test.html"></bb-select-field-picker>' +
                '</bb-select-field>'
            )($scope);

            el.appendTo(document.body);

            $scope.$digest();

            el.find('.bb-select-field-single').click();

            $animate.flush();

            expect('.bb-modal').toExist();
            expect('.bb-modal .modal-footer').not.toExist();

            closeCurrentModal();

            el.remove();
        });

        it('should not cause an error if the user clicks the field and no picker is defined', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-style="single"></bb-select-field>')($scope);

            $scope.$digest();

            el.find('.bb-select-field-single').click();
        });
    });

    describe('multi-select', function () {
        function createItems(count) {
            var i,
                items = [];

            for (i = 0; i < count; i++) {
                items.push({
                    title: 'Title ' + (i + 1)
                });
            }

            return items;
        }

        it('should display up to 5 selected values as individual items', function () {
            var $scope = $rootScope.$new(),
                el,
                i,
                itemEls,
                totalItems = 5;

            el = $compile('<bb-select-field bb-select-field-selected-items="selectedItems"></bb-select-field')($scope);

            $scope.selectedItems = createItems(totalItems);

            $scope.$digest();

            itemEls = el.find('.bb-select-field-multiple-item');

            expect(itemEls.length).toBe(totalItems);

            for (i = 0; i < totalItems; i++) {
                expect(itemEls.eq(i).find('.bb-select-field-multiple-item-title')).toHaveText($scope.selectedItems[i].title);
            }
        });

        it('should display 6 or more selected values as one localizable summary item', function () {
            var $scope = $rootScope.$new(),
                el,
                title,
                totalItems = 1000, // Using 1,000 items so that we can test that the count is formatted properly.
                totalItemsFormatted;

            bbResources.selectfield_summary_text = '{0} #BD#N%#%#()HB&DSFRHW$#@';

            el = $compile('<bb-select-field bb-select-field-selected-items="selectedItems"></bb-select-field')($scope);

            $scope.selectedItems = createItems(totalItems);

            $scope.$digest();

            totalItemsFormatted = $filter('bbAutonumeric', totalItems);

            title = bbFormat.formatText(bbResources.selectfield_summary_text, totalItemsFormatted);

            expect(el.find('.bb-select-field-multiple-summary')).toHaveText(title);
        });

        it('should remove a selected item when its corresponding delete button is clicked', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-selected-items="selectedItems"></bb-select-field')($scope);

            $scope.selectedItems = createItems(2);

            $scope.$digest();

            el.find('.bb-select-field-multiple-item').eq(1).find('button.bb-select-field-multiple-item-delete').click();

            expect($scope.selectedItems).toEqual([$scope.selectedItems[0]]);
        });

        it('should remove all selected items when the summary item\'s delete button is clicked', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-selected-items="selectedItems"></bb-select-field')($scope);

            $scope.selectedItems = createItems(6);

            $scope.$digest();

            el.find('.bb-select-field-multiple-item').eq(0).find('button.bb-select-field-multiple-item-delete').click();

            expect($scope.selectedItems).toEqual([]);
        });
    });

    describe('API exposed to dependent directives', function () {
        it('should allow a picker to be specified', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope,
                picker = {};

            el = $compile('<bb-select-field></bb-select-field')($scope);

            $scope.$digest();

            elScope = el.scope();

            elScope.bbSelectField.setPicker(picker);

            expect(elScope.bbSelectField.picker).toBe(picker);
        });

        describe('selectedItems method', function () {
            it('should return an empty array when no selected items are present', function () {
                var $scope = $rootScope.$new(),
                    el,
                    elScope;

                el = $compile('<bb-select-field bb-select-field-selected-items="selectedItems"></bb-select-field')($scope);

                $scope.$digest();

                elScope = el.scope();

                expect(elScope.bbSelectField.getSelectedItems()).toEqual([]);
            });

            it('should return a copy of the selected items when selected items are present so that changes to the selected items in child directives do not make their way back up to the parent scope', function () {
                var $scope = $rootScope.$new(),
                    el,
                    elScope;

                el = $compile('<bb-select-field bb-select-field-selected-items="selectedItems"></bb-select-field')($scope);

                $scope.$digest();

                $scope.selectedItems = [
                    {
                        title: 'Selected item'
                    }
                ];

                $scope.$digest();

                elScope = el.scope();

                expect(elScope.bbSelectField.getSelectedItems()).not.toBe($scope.selectedItems);
                expect(elScope.bbSelectField.getSelectedItems()).toEqual($scope.selectedItems);
            });
        });
    });
});

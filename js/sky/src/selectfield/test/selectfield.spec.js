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

    beforeEach(function () {
        $templateCache.put(
            'bbSelectField/single/test.html',
            ''
        );
    });

    describe('single-select', function () {

        it('should show the search icon when specified', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-style="single" bb-select-field-icon="search" ng-model="selectedItems"></bb-select-field>')($scope);
            $scope.$digest();

            expect(el.find('.bb-select-field-single-icon i')).toHaveClass('fa-search');
        });

        it('should show the close icon when bbSelectFieldClear is specified and an item is selected and clear properly when used', function () {

        });


        it('should display the selected value in the button used to invoke the picker', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-style="single" ng-model="selectedItems"></bb-select-field>')($scope);

            $scope.$digest();

            $scope.selectedItems = [
                {
                    title: 'Selected item'
                }
            ];

            $scope.$digest();

            expect(el.find('.bb-select-field-single-title').text()).toBe('Selected item');
        });

        it('should display a dialog with one footer button when clicked', function () {
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
            expect('.bb-modal .modal-footer').toExist();
            expect('.bb-modal .modal-footer button.bb-btn-secondary').toHaveText('Clear selection');

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

        it('should display placeholder text when no items are selected and bb-select-field-text is defined', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-style="single" bb-select-field-text="{{placeholderText}}" ng-model="selectedItems"></bb-select-field>')($scope);

            $scope.$digest();


            $scope.placeholderText = 'Select an item';

            $scope.$digest();

            expect(el.find('.bb-select-field-single-title').text()).toBe($scope.placeholderText);
        });

        it('should call bbSelectFieldClick when the select picker is clicked', function () {
            var $scope = $rootScope.$new(),
                el,
                wasClicked = false;

            function pickerClicked() {
                wasClicked = true;
            }

            el = $compile('<bb-select-field bb-select-field-style="single" bb-select-field-click="pickerClicked()" ng-model="selectedItems">' +
            '<bb-select-field-picker bb-select-field-picker-template="bbSelectField/single/test.html"></bb-select-field-picker>' +
            '</bb-select-field>')($scope);
            el.appendTo(document.body);

            $scope.$digest();

            $scope.pickerClicked = pickerClicked;


            $scope.$digest();

            el.find('.bb-select-field-single').click();

            $animate.flush();

            expect(wasClicked).toBe(true);

            closeCurrentModal();
            el.remove();
        });

        it('should set valid and touched state appropriately for ng-model when the field is required', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<form name="myForm"> <bb-select-field name="myField" bb-select-field-style="single" ng-model="selectedItems" required>' +
            '<bb-select-field-picker bb-select-field-picker-template="bbSelectField/single/test.html"></bb-select-field-picker>' +
            '</bb-select-field>')($scope);

            el.appendTo(document.body);

            $scope.$digest();

            expect($scope.myForm.$valid).toBe(false);
            expect($scope.myForm.myField.$touched).toBe(false);
            expect($scope.myForm.myField.$error.required).toBe(true);

            $scope.selectedItems = [
                {
                    title: 'Selected item'
                }
            ];

            $scope.$digest();

            expect($scope.myForm.$valid).toBe(true);
            expect($scope.myForm.myField.$touched).toBe(false);

            el.find('.bb-select-field-single').click();

            $animate.flush();

            closeCurrentModal();

            $scope.$digest();

            expect($scope.myForm.$valid).toBe(true);
            expect($scope.myForm.myField.$touched).toBe(true);

            $scope.selectedItems = [
            ];
            $scope.$digest();

            expect($scope.myForm.$valid).toBe(false);
            expect($scope.myForm.myField.$touched).toBe(true);
            expect($scope.myForm.myField.$error.required).toBe(true);

            el.remove();
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

        it('should display appropriate text for the button', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field bb-select-field-text="{{placeholderText}}" ng-model="selectedItems"></bb-select-field>')($scope);

            $scope.$digest();

            $scope.placeholderText = 'Select items';

            $scope.$digest();

            expect(el.find('.bb-select-field-multiple-title').text()).toBe($scope.placeholderText);
        });

        it('should call bbSelectFieldClick when the select picker is clicked', function () {
            var $scope = $rootScope.$new(),
                el,
                wasClicked = false;

            function pickerClicked() {
                wasClicked = true;
            }

            el = $compile('<bb-select-field bb-select-field-click="pickerClicked()" ng-model="selectedItems">' +
            '<bb-select-field-picker bb-select-field-picker-template="bbSelectField/single/test.html"></bb-select-field-picker>' +
            '</bb-select-field>')($scope);
            el.appendTo(document.body);

            $scope.$digest();

            $scope.pickerClicked = pickerClicked;


            $scope.$digest();

            el.find('.bb-select-field-multiple').click();

            $animate.flush();

            expect(wasClicked).toBe(true);

            closeCurrentModal();
            el.remove();
        });

        it('should set valid and touched state appropriately for ng-model when the field is required', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<form name="myForm"> <bb-select-field name="myField" ng-model="selectedItems" required>' +
            '<bb-select-field-picker bb-select-field-picker-template="bbSelectField/single/test.html"></bb-select-field-picker>' +
            '</bb-select-field>')($scope);

            $scope.$digest();

            expect($scope.myForm.$valid).toBe(false);
            expect($scope.myForm.myField.$touched).toBe(false);
            expect($scope.myForm.myField.$error.required).toBe(true);

            $scope.selectedItems = [
                {
                    title: 'Selected item'
                }
            ];

            $scope.$digest();

            expect($scope.myForm.$valid).toBe(true);
            expect($scope.myForm.myField.$touched).toBe(false);

            el.find('.bb-select-field-multiple-item-delete').click();

            $scope.$digest();

            expect($scope.myForm.$valid).toBe(false);
            expect($scope.myForm.myField.$touched).toBe(true);
            expect($scope.myForm.myField.$error.required).toBe(true);

        });

        it('should display up to 5 selected values as individual items', function () {
            var $scope = $rootScope.$new(),
                el,
                i,
                itemEls,
                totalItems = 5;

            el = $compile('<bb-select-field ng-model="selectedItems"></bb-select-field')($scope);

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
                totalItems = 1000; // Using 1,000 items so that we can test that the count is formatted properly.


            bbResources.selectfield_summary_text = '{0} #BD#N%#%#()HB&DSFRHW$#@';

            el = $compile('<bb-select-field ng-model="selectedItems"></bb-select-field')($scope);

            $scope.selectedItems = createItems(totalItems);

            $scope.$digest();

            title = bbFormat.formatText(bbResources.selectfield_summary_text, '1,000');

            expect(el.find('.bb-select-field-multiple-summary')).toHaveText(title);
        });

        it('should remove a selected item when its corresponding delete button is clicked', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field ng-model="selectedItems"></bb-select-field')($scope);

            $scope.selectedItems = createItems(2);

            $scope.$digest();

            el.find('.bb-select-field-multiple-item').eq(1).find('button.bb-select-field-multiple-item-delete').click();

            expect($scope.selectedItems).toEqual([$scope.selectedItems[0]]);
        });

        it('should remove all selected items when the summary item\'s delete button is clicked', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile('<bb-select-field ng-model="selectedItems"></bb-select-field')($scope);

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

                el = $compile('<bb-select-field ng-model="selectedItems"></bb-select-field')($scope);

                $scope.$digest();

                elScope = el.scope();

                expect(elScope.bbSelectField.getSelectedItems()).toEqual([]);
            });

            it('should return a copy of the selected items when selected items are present so that changes to the selected items in child directives do not make their way back up to the parent scope', function () {
                var $scope = $rootScope.$new(),
                    el,
                    elScope;

                el = $compile('<bb-select-field ng-model="selectedItems"></bb-select-field')($scope);

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

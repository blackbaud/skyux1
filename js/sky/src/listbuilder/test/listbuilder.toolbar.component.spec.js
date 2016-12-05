/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Listbuilder toolbar', function () {
        var $compile,
            $scope,
            $timeout,
            $document,
            simpleCardContentHtml = '<bb-listbuilder-content>' +
                    '<bb-listbuilder-cards>' +
                    '<bb-listbuilder-card>' +
                    '<bb-card>' +
                    '<bb-card-title>' +
                    'First' +
                    '</bb-card-title>' +
                    '<bb-card-content>' +
                    'First Content' +
                    '</bb-card-content>' +
                    '</bb-card>' +
                    '</bb-listbuilder-card>' +
                    '</bb-listbuilder-cards>' +
                    '</bb-listbuilder-content>';

        beforeEach(module(
            'sky.listbuilder',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_, _$document_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $timeout = _$timeout_;
            $document = _$document_;
        }));
        
        
        describe('search', function () {
            var searchHtml,
                localSearchText,
                listCtrl = {
                    onSearch: function (searchText) {
                        localSearchText = searchText;
                    }
                };
            
            beforeEach(function () {

                searchHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText">' +
                    '</bb-listbuilder-toolbar>' +
                    simpleCardContentHtml +
                    '</bb-listbuilder>');
                
            });

            function findSearchInput(el) {
                return el.find('.bb-search-input');
            }

            function findSearchButton(el) {
                return el.find('.bb-search-btn-apply');
            }

            function initListbuilderTest(customHtml) {
                var el;
                if (customHtml) {
                    el = $compile(customHtml)($scope);
                } else {
                    el = $compile(searchHtml)($scope);
                }

                $document.find('body').append(el);

                $scope.$digest();

                return el;
            }

            function changeInput(el, val) {
                var inputEl;
                inputEl = findSearchInput(el);
                inputEl.val(val);
                inputEl.trigger('change');
                $scope.$digest();
            }

            function triggerEnterKeyup(el) {
                var e,
                    inputEl;
                inputEl = findSearchInput(el);
                e = $.Event('keyup');
                e.which = 13;
                e.keyCode = 13;
                inputEl.trigger(e);
                $scope.$digest();
                
            }

            function verifyCardTitleHighlight(el, hasHighlight) {

                var cardTitleSpan = el.find('bb-card-title span');

                if (hasHighlight) {
                    expect(cardTitleSpan).toHaveClass('highlight');
                } else {
                    expect(cardTitleSpan.length).toBe(0);
                }
                
            }

            function verifySearchResults(el, val) {
                expect(localSearchText).toBe(val);

                $timeout.flush();
                verifyCardTitleHighlight(el, true);
            }

            function verifyInputBinding(el, val) {
                var inputEl;

                inputEl = findSearchInput(el);
                expect(inputEl).toHaveValue(val);
            }

            it('calls the search callback, and resolves highlight promise on input enter', function () {
                var el;

                $scope.listCtrl = listCtrl;

                el = initListbuilderTest();

                changeInput(el, 'First');
                triggerEnterKeyup(el);
                
                verifySearchResults(el, 'First');
                
                el.remove();

            });

            it('can set placeholder text if specified', function () {
                var el,
                    placeholderHtml;

                $scope.listCtrl = listCtrl;
                $scope.listCtrl.placeholder = 'New text';

                placeholderHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText" ' +
                    'bb-listbuilder-search-placeholder="listCtrl.placeholder" ' +
                    '>' +
                    '</bb-listbuilder-toolbar>' +
                    simpleCardContentHtml +
                    '</bb-listbuilder>');

                el = initListbuilderTest(placeholderHtml);

                expect(el.find('.bb-search-input-container input')).toHaveAttr('placeholder', $scope.listCtrl.placeholder);

                el.remove();
            });

            it('will call a function on search text changed if specified', function () {
                var el,
                    newText,
                    searchChangeHtml;

                $scope.listCtrl = listCtrl;
                $scope.listCtrl.searchTextChanged = function (searchText) {
                    newText = searchText;
                };

                searchChangeHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)" ' +
                    'bb-listbuilder-on-search-text-changed="listCtrl.searchTextChanged(searchText)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText" ' +
                    'bb-listbuilder-search-placeholder="listCtrl.placeholder" ' +
                    '>' +
                    '</bb-listbuilder-toolbar>' +
                    simpleCardContentHtml +
                    '</bb-listbuilder>');

                el = initListbuilderTest(searchChangeHtml);

                changeInput(el, 'First');

                expect(newText).toBe('First');

                el.remove();
            });

            it('calls the search callback, and resolves highlight promise on input enter when returning a promise', function () {
                var el,
                    searchButtonEl;

                $scope.listCtrl = listCtrl;

                $scope.listCtrl.onSearch = function (searchText) {

                    return {
                        then: function (callback) {
                            localSearchText = searchText;
                            callback();
                        }
                    };
                };

                el = initListbuilderTest();
                changeInput(el, 'First');

                searchButtonEl = findSearchButton(el);
                searchButtonEl.click();
                $scope.$digest();

                verifySearchResults(el, 'First');
                el.remove();

            });

            it('selects the input, calls the search callback, and resolves highlight promise on search button click', function () {
                var el,
                    searchButtonEl;

                $scope.listCtrl = listCtrl;

                el = initListbuilderTest();
                changeInput(el, 'First');

                searchButtonEl = findSearchButton(el);
                searchButtonEl.click();
                $scope.$digest();

                verifySearchResults(el, 'First');
                el.remove();
            });

            it('watches changes to search text binding to apply to input and highlight', function () {
                var el;
                
                $scope.listCtrl = listCtrl;

                el = initListbuilderTest();
                $scope.listCtrl.searchText = 'First';
                $scope.$digest();
                verifyInputBinding(el, 'First');
                verifyCardTitleHighlight(el, true);

                $scope.listCtrl.searchText = '';
                $scope.$digest();
                verifyInputBinding(el, '');
                verifyCardTitleHighlight(el, false);

                el.remove();
            });

            it('applies search text binding to input and highlights card on initialization', function () {
                var el;
                
                $scope.listCtrl = listCtrl;
                $scope.listCtrl.searchText = 'First';
                el = initListbuilderTest();
                $scope.$digest();
                $timeout.flush();
                verifyInputBinding(el, 'First');
                verifyCardTitleHighlight(el, true);

                el.remove();
            });


            it('does not apply highlight when card does not exist', function () {
                var el,
                    noCardHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText">' +
                    '</bb-listbuilder-toolbar>' +
                    '</bb-listbuilder>');
                
                $scope.listCtrl = listCtrl;
                $scope.listCtrl.searchText = 'First';
                el = initListbuilderTest(noCardHtml);
                $scope.$digest();
                $timeout.flush();
                verifyInputBinding(el, 'First');
                verifyCardTitleHighlight(el, false);

                el.remove();
            });
        });

        describe('filters', function () {
            it('should transclude a filter button and filter summary', function () {
                var el,
                    filterHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-filter> ' +
                    '<bb-filter-button bb-filter-button-on-click="listCtrl.onFilterClick()"> ' +
                    '</bb-filter-button> ' +
                    '</bb-listbuilder-filter> ' +
                    '<bb-listbuilder-filter-summary> ' +
                    '<bb-filter-summary> ' +
                    '<bb-filter-summary-item ' +
                    'bb-filter-summary-item-on-click="listCtrl.openFilters()" ' +
                    'bb-filter-summary-item-on-dismiss="listCtrl.onDismissFilter()" ' +
                    '> ' +
                    'Filter item' +
                    '</bb-filter-summary-item> ' +
                    '</bb-filter-summary> ' +
                    '</bb-listbuilder-filter-summary> ' +
                    '</bb-listbuilder-toolbar>' +
                    '</bb-listbuilder>');


                el = $compile(filterHtml)($scope);

                $scope.$digest();

                expect(el.find('.bb-listbuilder-toolbar .bb-listbuilder-toolbar-item .bb-btn-secondary .fa-filter').length).toBe(1);
                expect(el.find('.bb-listbuilder-toolbar-summary-container .bb-listbuilder-filter-summary-container .bb-filter-summary').length).toBe(1);
            });
        });

        describe('sorting', function () {
            it('should transclude a sort button', function () {
                var el,
                    sortHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-sort> ' +
                    '<bb-sort> ' +
                    '<bb-sort-item ' +
                    'bb-sort-item-select="listCtrl.sortItems(item)"> ' +
                    'Sort item' +
                    '</bb-sort-item> ' +
                    '</bb-sort>' +
                    '</bb-listbuilder-sort> ' +
                    '</bb-listbuilder-toolbar>' +
                    '</bb-listbuilder>');


                el = $compile(sortHtml)($scope);

                $scope.$digest();
                expect(el.find('.bb-listbuilder-toolbar .bb-listbuilder-toolbar-item .bb-btn-secondary .fa-sort').length).toBe(1);
            });
        });

        describe('viewkeeper', function () {
            var viewKeeperHtml,
                bbViewKeeperBuilder;

            beforeEach(inject(function (_bbViewKeeperBuilder_) {
                bbViewKeeperBuilder = _bbViewKeeperBuilder_;
                viewKeeperHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar ' + 
                    'bb-listbuilder-vertical-offset-el-id="\'myoffsetid\'" ' + 
                    'bb-listbuilder-toolbar-fixed="{{ctrl.isFixed}}">' +
                    '</bb-listbuilder-toolbar>' +
                    simpleCardContentHtml +
                    '</bb-listbuilder>');
            }));


            it('creates a view keeper on toolbar init', function () {
                var el,
                    spyArgs;

                $scope.ctrl = {
                    isFixed: false
                };

                spyOn(bbViewKeeperBuilder, 'create').and.callThrough();

                el = $compile(viewKeeperHtml)($scope);
                $scope.$digest();
                spyArgs = bbViewKeeperBuilder.create.calls.mostRecent().args[0];
                expect(spyArgs.el).toEqual(el.find('.bb-listbuilder-toolbar-summary-container'));
                expect(spyArgs.boundaryEl).toEqual(el.find('.bb-listbuilder-content'));
                expect(spyArgs.setWidth).toBe(true);
                expect(spyArgs.verticalOffSetElId).toBe('myoffsetid');

                $scope.$destroy();
            });

            it('will not create a view keeper if fixed is set to true', function () {
                var el;

                $scope.ctrl = {
                    isFixed: true
                };
                spyOn(bbViewKeeperBuilder, 'create').and.callThrough();

                el = $compile(viewKeeperHtml)($scope);
                $scope.$digest();

                $scope.ctrl.isFixed = false;
                $scope.$digest();

                expect(bbViewKeeperBuilder.create).not.toHaveBeenCalled();
                $scope.$destroy();
            });
        });

        describe('add button', function () {

            function getAddButton(el) {
                return el.find('.btn.btn-primary');
            }

            it('creates an add button when bb-listbuilder-add is specified', function () {
                var addButtonHtml = '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-add bb-listbuilder-add-action="listCtrl.addAction()"></bb-listbuilder-add>' +
                    '</bb-listbuilder-toolbar>' +
                    '</bb-listbuilder>',
                    el,
                    addCalled = false,
                    addButtonEl;

                $scope.listCtrl = {
                    addAction: function () {
                        addCalled = true;
                    }
                };

                el = $compile(addButtonHtml)($scope);

                $scope.$digest();

                addButtonEl = getAddButton(el);

                expect(addButtonEl.length).toBe(1);
                addButtonEl.click();
                expect(addCalled).toBe(true);
                expect(addButtonEl).toHaveAttr('title', 'Add');
            });

            it('creates an add button with a label ', function () {
                var addButtonHtml = '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-add bb-listbuilder-add-action="listCtrl.addAction()" bb-listbuilder-add-label="listCtrl.addLabel"></bb-listbuilder-add>' +
                    '</bb-listbuilder-toolbar>' +
                    '</bb-listbuilder>',
                    el,
                    addCalled = false,
                    addButtonEl;

                $scope.listCtrl = {
                    addAction: function () {
                        addCalled = true;
                    },
                    addLabel: 'Add thing'
                };

                el = $compile(addButtonHtml)($scope);

                $scope.$digest();

                addButtonEl = getAddButton(el);

                expect(addButtonEl.length).toBe(1);
                addButtonEl.click();
                expect(addCalled).toBe(true);
                expect(addButtonEl).toHaveAttr('title', $scope.listCtrl.addLabel);
            });
        });

        describe('secondary actions', function () {

            var secondaryHtml;

            beforeEach(function () {
                secondaryHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-toolbar-secondary-actions> ' +
                    '<bb-listbuilder-secondary-actions bb-listbuilder-secondary-actions-append-to-body="listCtrl.appendToBody"> ' +
                    '<bb-listbuilder-secondary-action ' +
                    'bb-listbuilder-secondary-action-click="listCtrl.action1()" ' +
                    'ng-if="!listCtrl.hideActions" ' +
                    'bb-listbuilder-secondary-action-disabled="true"> ' +
                    'Action 1' +
                    '</bb-listbuilder-secondary-action>' +
                    '<bb-listbuilder-secondary-action ' +
                    'ng-if="!listCtrl.hideActions" ' +
                    'bb-listbuilder-secondary-action-click="listCtrl.action2()"> ' +
                    'Action 2' +
                    '</bb-listbuilder-secondary-action>' +
                    '</bb-listbuilder-secondary-actions>' +
                    '</bb-listbuilder-toolbar-secondary-actions>' +
                    '</bb-listbuilder-toolbar>' +
                    '</bb-listbuilder>');
            });

            function getSecondaryActions(el, appendToBody) {
                if (appendToBody) {
                    return $('body .bb-dropdown-menu bb-listbuilder-secondary-action .bb-dropdown-item .btn');
                } else {
                    return el.find('.bb-listbuilder-toolbar .bb-listbuilder-toolbar-item .bb-dropdown-menu .bb-dropdown-item .btn');
                }
            }

            function getSecondaryDropdownButton(el) {
                return el.find('.bb-listbuilder-toolbar .bb-listbuilder-toolbar-item .bb-btn-secondary .fa-ellipsis-h');
            }

            it('creates a secondary action dropdown with items that can be clicked and disabled', function () {
                var el,
                    action1Clicked,
                    action2Clicked,
                    dropdownEl,
                    actionEl;

                $scope.listCtrl = {
                    action1: function () {
                        action1Clicked = true;
                    }, 
                    action2: function () {
                        action2Clicked = true;
                    }
                };

                el = $compile(secondaryHtml)($scope);
                el.appendTo($document.find('body'));

                $scope.$digest();

                dropdownEl = getSecondaryDropdownButton(el);

                expect(dropdownEl.length).toBe(1);
                expect(dropdownEl).toBeVisible();

                actionEl = getSecondaryActions(el); 

                expect(actionEl.eq(0)).toBeDisabled();
                actionEl.eq(0).click();
                $scope.$digest();
                expect(action1Clicked).toBe(true);

                expect(actionEl.eq(1)).not.toBeDisabled();
                actionEl.eq(1).click();
                $scope.$digest();
                expect(action2Clicked).toBe(true);

                el.remove();
            });

            it('can append the secondary action dropdown to the body', function () {
                var el,
                    actionEl;
                
                $scope.listCtrl = {
                    appendToBody: true
                };

                el = $compile(secondaryHtml)($scope);
                el.appendTo($document.find('body'));

                $scope.$digest();

                actionEl = getSecondaryActions(el, true); 

                expect(actionEl.length).toBe(2);

                el.remove();
            });

            it('does not show the secondary actions dropdown button if none exist', function () {
                var el,
                    actionEl;
                
                $scope.listCtrl = {
                    appendToBody: true
                };

                el = $compile(secondaryHtml)($scope);
                el.appendTo($document.find('body'));

                $scope.$digest();

                actionEl = getSecondaryActions(el, true); 

                expect(actionEl.length).toBe(2);

                $scope.listCtrl.hideActions = true;

                $scope.$digest();

                actionEl = getSecondaryActions(el, true); 
                expect(actionEl.length).toBe(0);
                
                expect(getSecondaryDropdownButton(el)).not.toBeVisible();

                el.remove();
            });


        });
    });
}());

/* jshint jasmine: true */
/* global module, inject, $ */
(function () {
    'use strict';

    describe('listbuilder content', function () {
        var $scope,
        $timeout,
        $compile,
        $document,
        simpleCardContentHtml = 
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
                    '</bb-listbuilder-cards>',
        simpleRepeaterContentHtml = '<bb-listbuilder-repeater>' +
                    '<bb-repeater>' +
                    '<bb-listbuilder-repeater-item>' +
                    '<bb-repeater-item>' +
                    '<bb-repeater-item-title>' +
                    'First' +
                    '</bb-repeater-item-title>' +
                    '<bb-repeater-item-content>' +
                    'First Content' +
                    '</bb-repeater-item-content>' +
                    '</bb-repeater-item>' +
                    '</bb-listbuilder-repeater-item>' +
                    '</bb-repeater>',
        simpleCustomContentHtml = '<bb-listbuilder-content-custom>' + 
                    '<div class="bb-test-custom">' +
                    '<div class="bb-test-custom-title">' + 
                    'First' +
                    '</div>' +
                    '<div class="bb-test-custom-content">' +
                    'First Content' +
                    '</div>' +
                    '</div>' +
                    '</bb-listbuilder-content-custom>',
        listbuilderToolBarHtml =  
                    '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText">' +
                    '</bb-listbuilder-toolbar>';

        beforeEach(module(
            'sky.listbuilder',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $timeout = _$timeout_;
            $document = _$document_;
        }));

        function initListbuilder(contentHtml) {
            var listbuilderHtml = '<bb-listbuilder>' +
                            listbuilderToolBarHtml +
                            '<bb-listbuilder-content bb-listbuilder-content-active-view="{{listCtrl.activeView}}" ' +
                            'bb-listbuilder-content-view-changed="listCtrl.viewChanged(newView)">' +
                            contentHtml +
                            '</bb-listbuilder-content>' +
                            '</bb-listbuilder>',
                            el;
            
            el = $compile(listbuilderHtml)($scope);
            $document.find('body').append(el);
            $scope.$digest();
            return el;
        }

        function getCards(el) {
            return el.find('.bb-card');
        }

        function getSwitcher(el) {
            return el.find('.bb-listbuilder-switcher');
        }

        function getSwitcherButton(el) {
            return el.find('.bb-listbuilder-switcher button');
        }

        function getSwitcherItems() {
            return $('.bb-listbuilder-switcher-menu li');
        }

        function getRepeaterItems(el) {
            return el.find('.bb-repeater-item');
        }

        it('does not show the view switcher if only one view exists', function () {
            var cardListEl,
                switcherEl,
                cardEl;
            
            cardListEl = initListbuilder(simpleCardContentHtml);

            cardEl = getCards(cardListEl);
            expect(cardEl.length).toBe(1);

            switcherEl = getSwitcher(cardListEl);
            expect(switcherEl.length).toBe(0);

            cardListEl.remove();

        });

        function verifyRepeaterActive(el) {
            var cardEl,
            switcherEl,
            switcherButtonEl,
            switcherMenuItemsEl,
            repeaterItemEl;

            cardEl = getCards(el);
            expect(cardEl.length).toBe(0);

            switcherEl = getSwitcher(el);
            expect(switcherEl.length).toBe(1);

            switcherButtonEl = getSwitcherButton(el);
            expect(switcherButtonEl.find('i')).toHaveClass('fa-list');
            expect(switcherButtonEl).toHaveAttr('title', 'Switch to repeater view');

            switcherMenuItemsEl = getSwitcherItems();
            expect(switcherMenuItemsEl.length).toBe(1);
            expect(switcherMenuItemsEl.find('a')).toHaveAttr('title', 'Switch to card view');
            expect(switcherMenuItemsEl.find('i')).toHaveClass('fa-th-large');

            repeaterItemEl = getRepeaterItems(el);
            expect(repeaterItemEl.length).toBe(1);
        }

        function verifyCardActive(el) {
            var cardEl,
            switcherEl,
            switcherButtonEl,
            switcherMenuItemsEl,
            repeaterItemEl;
            cardEl = getCards(el);
            expect(cardEl.length).toBe(1);

            switcherEl = getSwitcher(el);
            expect(switcherEl.length).toBe(1);

            switcherButtonEl = getSwitcherButton(el);
            expect(switcherButtonEl.find('i')).toHaveClass('fa-th-large');
            expect(switcherButtonEl).toHaveAttr('title', 'Switch to card view');

            switcherMenuItemsEl = getSwitcherItems();
            expect(switcherMenuItemsEl.length).toBe(1);

            expect(switcherMenuItemsEl.find('a')).toHaveAttr('title', 'Switch to repeater view');
            expect(switcherMenuItemsEl.find('i')).toHaveClass('fa-list');

            repeaterItemEl = getRepeaterItems(el);
            expect(repeaterItemEl.length).toBe(0);
        }

        function clickSwitcherItem(index) {
            var switcherMenuItemsEl;
            switcherMenuItemsEl = getSwitcherItems();
            switcherMenuItemsEl.eq(index).find('a').click();
            $scope.$digest();
        }

        it('shows the view switcher if more than one view exists', function () {
            var repeaterCardEl;

            repeaterCardEl = initListbuilder(simpleCardContentHtml + simpleRepeaterContentHtml);

            verifyCardActive(repeaterCardEl);

            repeaterCardEl.remove();
        });

        it('changes views when a different view is selected in the switcher', function () {
            var el;
            
            el = initListbuilder(simpleCardContentHtml + simpleRepeaterContentHtml);

            verifyCardActive(el);

            clickSwitcherItem(0);

            verifyRepeaterActive(el);
            el.remove();
        });

        it('can set views programmatically', function () {
            var el;

            $scope.listCtrl = {
                activeView: 'repeater',
                viewChanged: function (newView) {
                    $scope.listCtrl.activeView = newView;
                }
            };
            el = initListbuilder(simpleCardContentHtml + simpleRepeaterContentHtml);

            verifyRepeaterActive(el);
            clickSwitcherItem(0);
            verifyCardActive(el);
            expect($scope.listCtrl.activeView).toBe('card');

            $scope.listCtrl.activeView = 'repeater';
            $scope.$digest();
            verifyRepeaterActive(el);
            expect($scope.listCtrl.activeView).toBe('repeater');
            el.remove();
        });

        function findSearchInput(el) {
            return el.find('.bb-search-input');
        }

        function changeInput(el, val) {
            var inputEl;
            inputEl = findSearchInput(el);
            inputEl.val(val);
            inputEl.trigger('change');
            $scope.$digest();
        }
        
        function findSearchButton(el) {
            return el.find('.bb-search-btn-apply');
        }

        function verifyRepeaterTitleHighlight(el, hasHighlight) {

            var repeaterTitleSpan = el.find('bb-repeater-item-title span');

            if (hasHighlight) {
                expect(repeaterTitleSpan).toHaveClass('highlight');
            } else {
                expect(repeaterTitleSpan.length).toBe(0);
            }
            
        }

        function verifySearchResults(el) {

            $timeout.flush();
            verifyRepeaterTitleHighlight(el, true);
        }

        it('highlights search text properly in repeater view', function () {
            var el,
                searchButtonEl;
            el = initListbuilder(simpleRepeaterContentHtml);

            changeInput(el, 'First');

            searchButtonEl = findSearchButton(el);
            searchButtonEl.click();
            $scope.$digest();
            verifySearchResults(el);
            el.remove();
        });

        it('highlights search text properly on initializationin repeater view', function () {
            var el;

            $scope.listCtrl = {
                searchText: 'First'
            };

            el = initListbuilder(simpleRepeaterContentHtml);
            verifySearchResults(el);
            el.remove();
        });

        it('removes entries from the view switcher on destroy', function () {

        });

        describe('custom views', function () {
            it('creates a custom item in the view switcher', function () {

            });

            it('shows the custom view when selected', function () {

            });

            it('can update the view information', function () {

            });

            it('highlights custom view information properly', function () {

            });

            it('removes entries from the view switcher on destroy', function () {

            });
        });
    });

    

})();
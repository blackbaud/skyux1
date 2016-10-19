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
                    '<bb-listbuilder-cards ng-if="!listCtrl.cardIsDestroyed">' +
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
        simpleRepeaterContentHtml = '<bb-listbuilder-repeater ng-if="!listCtrl.repeaterIsDestroyed">' +
                    '<bb-repeater>' +
                    '<bb-repeater-item bb-listbuilder-repeater-item>' +
                    '<bb-repeater-item-title>' +
                    'First' +
                    '</bb-repeater-item-title>' +
                    '<bb-repeater-item-content>' +
                    'First Content' +
                    '</bb-repeater-item-content>' +
                    '</bb-repeater-item>' +
                    '</bb-repeater>' +
                    '</bb-listbuilder-repeater>',
        simpleCustomContentHtml = '<bb-listbuilder-content-custom ng-if="!listCtrl.customIsDestroyed" ' +  
                    'bb-listbuilder-content-custom-view-name="custom-1" ' +
                    'bb-listbuilder-content-custom-view-switcher-class="fa-pied-piper" ' +
                    'bb-listbuilder-content-custom-highlight-class="bb-test-custom" ' +
                    'bb-listbuilder-content-custom-view-switcher-label="Switch to custom"> ' + 
                    '<div class="bb-test-custom" bb-listbuilder-content-custom-item>' +
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
            $timeout.flush();
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

        function getCustomItems(el) {
            return el.find('.bb-test-custom');
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

        function verifySwitcherButton(el, type) {
            var switcherButtonEl = getSwitcherButton(el),
                className,
                title;
            switch (type) {
                case 'card':
                    className = 'fa-th-large';
                    title = 'Switch to card view';
                    break;
                case 'repeater':
                    className = 'fa-list';
                    title = 'Switch to repeater view';
                    break;
                case 'custom':
                    className = 'fa-pied-piper';
                    title = 'Switch to custom';
                    break;
            }
            expect(switcherButtonEl.find('i')).toHaveClass(className);
            expect(switcherButtonEl).toHaveAttr('title', title);
        }

        function verifySwitcherItems(el, types) {
            var switcherMenuItemsEl = getSwitcherItems(el),
                className,
                title,
                i;

            expect(switcherMenuItemsEl.length).toBe(types.length);
            
            for (i = 0; i < types.length; i++) {
                switch (types[i]) {
                    case 'card':
                        className = 'fa-th-large';
                        title = 'Switch to card view';
                        break;
                    case 'repeater':
                        className = 'fa-list';
                        title = 'Switch to repeater view';
                        break;
                    case 'custom':
                        className = 'fa-pied-piper';
                        title = 'Switch to custom';
                        break;
                }
                expect(switcherMenuItemsEl.find('a').eq(i)).toHaveAttr('title', title);
                expect(switcherMenuItemsEl.find('i').eq(i)).toHaveClass(className);
            }

        }

        function verifyRepeaterActive(el, hasCustomEntry) {
            var cardEl,
                switcherEl,
                customEl,
                types,
                repeaterItemEl;

            cardEl = getCards(el);
            expect(cardEl.length).toBe(0);

            switcherEl = getSwitcher(el);
            expect(switcherEl.length).toBe(1);

            verifySwitcherButton(el, 'repeater');
            if (hasCustomEntry) {
                types = ['card', 'custom'];
            } else {
                types = ['card'];
            }
            verifySwitcherItems(el, types);

            repeaterItemEl = getRepeaterItems(el);
            expect(repeaterItemEl.length).toBe(1);

            if (hasCustomEntry) {
                customEl = getCustomItems(el);
                expect(customEl.length).toBe(0);
            }
        }

        function verifyCardActive(el, hasCustomEntry) {
            var cardEl,
                switcherEl,
                types,
                customEl,
                repeaterItemEl;

            cardEl = getCards(el);
            expect(cardEl.length).toBe(1);

            switcherEl = getSwitcher(el);
            expect(switcherEl.length).toBe(1);

            verifySwitcherButton(el, 'card');
            if (hasCustomEntry) {
                types = ['repeater', 'custom'];
            } else {
                types = ['repeater'];
            }
            verifySwitcherItems(el, types);

            repeaterItemEl = getRepeaterItems(el);
            expect(repeaterItemEl.length).toBe(0);

            if (hasCustomEntry) {
                customEl = getCustomItems(el);
                expect(customEl.length).toBe(0);
            }
        }

        function verifyCustomActive(el) {
            var cardEl,
                customEl,
                repeaterItemEl;
            cardEl = getCards(el);
            expect(cardEl.length).toBe(0);
            repeaterItemEl = getRepeaterItems(el);
            expect(repeaterItemEl.length).toBe(0);
            customEl = getCustomItems(el);
            expect(customEl.length).toBe(1);

            verifySwitcherButton(el, 'custom');

            verifySwitcherItems(el, ['card', 'repeater']);

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

        function verifyRepeaterTitleHighlight(el, className, hasHighlight) {

            var repeaterTitleSpan = el.find('.' + className + ' span');

            if (hasHighlight) {
                expect(repeaterTitleSpan).toHaveClass('highlight');
            } else {
                expect(repeaterTitleSpan.length).toBe(0);
            }
            
        }

        function timeoutFlushIfAvailable() {
            try {
                $timeout.verifyNoPendingTasks();
            } catch (aException) {
                $timeout.flush();
            }
        }

        function verifySearchResults(el, className) {

            timeoutFlushIfAvailable();
            verifyRepeaterTitleHighlight(el, className, true);
        }
        

        it('highlights search text properly in repeater view', function () {
            var el,
                searchButtonEl;
            el = initListbuilder(simpleRepeaterContentHtml);

            changeInput(el, 'First');

            searchButtonEl = findSearchButton(el);
            searchButtonEl.click();
            $scope.$digest();
            verifySearchResults(el, 'bb-repeater-item');
            el.remove();
        });

        it('highlights search text properly on initialization in repeater view', function () {
            var el;

            $scope.listCtrl = {
                searchText: 'First'
            };

            el = initListbuilder(simpleRepeaterContentHtml);
            verifySearchResults(el, 'bb-repeater-item');
            el.remove();
        });

        it('removes entries from the view switcher on destroy', function () {
            var el,
                cardEl,
                switcherEl,
                repeaterEl;

            el = initListbuilder(simpleCardContentHtml + simpleRepeaterContentHtml);
            $scope.listCtrl = {
                cardIsDestroyed: true
            };
            $scope.$digest();

            repeaterEl = getRepeaterItems(el);
            expect(repeaterEl.length).toBe(1);

            switcherEl = getSwitcher(el);
            expect(switcherEl.length).toBe(0);

            $scope.listCtrl = {
                cardIsDestroyed: false
            };
            $scope.$digest();

            verifyRepeaterActive(el);

            $scope.listCtrl = {
                repeaterIsDestroyed: true
            };
            $scope.$digest();

            cardEl = getCards(el);
            expect(cardEl.length).toBe(1);
            switcherEl = getSwitcher(el);
            expect(switcherEl.length).toBe(0);

            el.remove();

        });

        describe('custom views', function () {
            it('creates a custom item in the view switcher', function () {
                var el;
                $scope.listCtrl = {
                    activeView: 'card'
                };
                el = initListbuilder(simpleCardContentHtml + simpleRepeaterContentHtml + simpleCustomContentHtml);
                verifyCardActive(el, true);
                el.remove();
            });

            it('shows the custom view when selected', function () {
                var el;
                $scope.listCtrl = {
                    activeView: 'card'
                };

                el = initListbuilder(simpleCardContentHtml + simpleRepeaterContentHtml + simpleCustomContentHtml);

                verifyCardActive(el, true);

                clickSwitcherItem(1);

                verifyCustomActive(el);
                el.remove();
            });

            it('can update the view information', function () {
                var el,
                    advancedCustomContentHtml,
                    switcherItemsEl,
                    switcherButtonEl;
                
                $scope.listCtrl = {
                    activeView: 'custom-1',
                    className: 'fa-wut'
                };
                
                advancedCustomContentHtml = '<bb-listbuilder-content-custom ' +  
                    'bb-listbuilder-content-custom-view-name="{{listCtrl.viewName}}" ' +
                    'bb-listbuilder-content-custom-view-switcher-class="{{listCtrl.className}}" ' +
                    'bb-listbuilder-content-custom-highlight-class="bb-test-custom" ' +
                    'bb-listbuilder-content-custom-view-switcher-label="Switch to custom"> ' + 
                    '<div class="bb-test-custom">' +
                    '<bb-listbuilder-content-custom-item>' +
                    '<div class="bb-test-custom-title">' + 
                    'First' +
                    '</div>' +
                    '<div class="bb-test-custom-content">' +
                    'First Content' +
                    '</div>' +
                    '</bb-listbuilder-content-custom-item>' +
                    '</div>' +
                    '</bb-listbuilder-content-custom>';

                el = initListbuilder(simpleCardContentHtml + simpleRepeaterContentHtml + advancedCustomContentHtml);
                
                $scope.listCtrl.viewName = 'custom-1';
                $scope.$digest();

                switcherButtonEl = getSwitcherButton(el);
                expect(switcherButtonEl.find('i')).toHaveClass('fa-wut');

                $scope.listCtrl.className = 'fa-yuy';
                $scope.$digest();

                switcherButtonEl = getSwitcherButton(el);
                expect(switcherButtonEl.find('i')).toHaveClass('fa-yuy');

                $scope.listCtrl.viewName = 'custom-2';
                $scope.listCtrl.className = 'fa-change';
                $scope.$digest();
                switcherButtonEl = getSwitcherButton(el);
                expect(switcherButtonEl.find('i')).toHaveClass('fa-change');

                clickSwitcherItem(0);

                $scope.listCtrl.className = 'fa-huh';
                $scope.$digest();
                switcherItemsEl = getSwitcherItems();
                expect(switcherItemsEl.find('i').eq(1)).toHaveClass('fa-huh');

                el.remove();
            });

            it('highlights custom view information properly', function () {
                var el,
                    searchButtonEl;

                el = initListbuilder(simpleCustomContentHtml);

                changeInput(el, 'First');

                searchButtonEl = findSearchButton(el);
                searchButtonEl.click();
                $scope.$digest();
                verifySearchResults(el, 'bb-test-custom-title');

                el.remove();
            });

            it('removes entries from the view switcher on destroy', function () {
                var el,
                    cardEl,
                    switcherEl;
                el = initListbuilder(simpleCardContentHtml + simpleRepeaterContentHtml + simpleCustomContentHtml);
                $scope.listCtrl = {
                    customIsDestroyed: true
                };
                $scope.$digest();

                cardEl = getCards(el);
                expect(cardEl.length).toBe(1);

                switcherEl = getSwitcher(el);
                expect(switcherEl.length).toBe(1);

                el.remove();

            });
        });
    });

    

})();
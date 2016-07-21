/*jshint browser: true, jasmine: true */
/*global $, inject, module */

describe('Repeater directive', function () {
    'use strict';

    var $compile,
        $rootScope,
        $timeout,
        bbResources,
        fxOff,
        repeaterHtml;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.repeater'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _bbResources_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        bbResources = _bbResources_;

        fxOff = $.fx.off;
        $.fx.off = true;

        repeaterHtml = '<bb-repeater bb-repeater-expand-mode="{{expandMode}}">' +
            '   <bb-repeater-item>' +
            '       <bb-repeater-item-context-menu ng-if="showContextMenu">' +
            '           <bb-context-menu>' +
            '           </bb-context-menu>' +
            '       </bb-repeater-item-context-menu>' +
            '       <bb-repeater-item-title>Title 1</bb-repeater-item-title>' +
            '       <bb-repeater-item-content>Content 1</bb-repeater-item-content>' +
            '   </bb-repeater-item>' +
            '   <bb-repeater-item>' +
            '       <bb-repeater-item-context-menu ng-if="showContextMenu">' +
            '           <bb-context-menu>' +
            '           </bb-context-menu>' +
            '       </bb-repeater-item-context-menu>' +
            '       <bb-repeater-item-title>Title 2</bb-repeater-item-title>' +
            '       <bb-repeater-item-content>Content 2</bb-repeater-item-content>' +
            '   </bb-repeater-item>' +
            '   <bb-repeater-item ng-if="!removeLastItem">' +
            '       <bb-repeater-item-context-menu ng-if="showContextMenu">' +
            '           <bb-context-menu>' +
            '           </bb-context-menu>' +
            '       </bb-repeater-item-context-menu>' +
            '       <bb-repeater-item-title>Title 3</bb-repeater-item-title>' +
            '       <bb-repeater-item-content>Content 3</bb-repeater-item-content>' +
            '   </bb-repeater-item>' +
            '</bb-repeater>';
    }));

    afterEach(function () {
        $.fx.off = fxOff;
    });

    function getItems(repeaterEl) {
        return repeaterEl.find('.bb-repeater-item');
    }

    function getExpandedContentItems(repeaterEl) {
        return repeaterEl.find('.bb-repeater-item-content:visible');
    }

    function getContentItemAt(repeaterEl, index) {
        return repeaterEl.find('.bb-repeater-item-content').eq(index);
    }

    function getChevronAt(repeaterEl, index) {
        return repeaterEl.find('.bb-chevron').eq(index);
    }

    function toggleCollapseAt(repeaterEl, index) {
        repeaterEl.find('.bb-repeater-item-header').eq(index).click();
    }

    it('should remove the corresponding item from DOM when item is removed', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(repeaterHtml)($scope);

        $scope.$digest();

        expect(getItems(el).length).toBe(3);

        $scope.removeLastItem = true;
        $scope.$digest();

        expect(getItems(el).length).toBe(2);
    });

    it('should add the appropriate class to an item when a context menu is present', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(repeaterHtml)($scope);

        $scope.showContextMenu = true;
        $scope.$digest();

        expect(getItems(el).eq(0)).toHaveClass('bb-repeater-item-with-context-menu');
    });

    describe('repeater item multiselect', function () {

        var repeaterMultiselectHtml; 

        function getItemCheck(el) {
            return el.find('.bb-repeater-item.bb-repeater-item-selectable .bb-repeater-item-left .bb-repeater-item-multiselect .bb-check-wrapper');
        } 

        beforeEach(function () {
            repeaterMultiselectHtml = '<bb-repeater>' +
                '<bb-repeater-item bb-repeater-item-selectable="{{locals.selectable}}" bb-repeater-item-input-label="locals.inputLabel" bb-repeater-item-selected="locals.selected">' +
                '<bb-repeater-item-title>My Title</bb-repeater-item-title>' +
                '<bb-repeater-item-content>My Content</bb-repeater-item-content>' +
                '</bb-repeater-item>' +
                '</bb-repeater>';
        });

        it('should display a checkbox when the selectable attribute is set to true', function () {
            var $scope = $rootScope.$new(),
                el;

            $scope.locals = {
                selectable: true
            };

            el = $compile(repeaterMultiselectHtml)($scope);

            $scope.$digest();

            expect(getItemCheck(el).length).toBe(1);
        });

        it('should display a checkbox when the selectable attribute is set to false', function () {
            var $scope = $rootScope.$new(),
                el;

            $scope.locals = {
                selectable: false
            };

            el = $compile(repeaterMultiselectHtml)($scope);

            $scope.$digest();

            expect(getItemCheck(el).length).toBe(0);
        });

        it('should use bbRepeaterItemInputLabel as aria-label when specified', function () {
            var $scope = $rootScope.$new(),
                el;

            $scope.locals = {
                selectable: true,
                inputLabel: 'Yo dawg'
            };

            el = $compile(repeaterMultiselectHtml)($scope);

            $scope.$digest();

            expect(getItemCheck(el).length).toBe(1);
            expect(el.find('input').attr('aria-label')).toBe('Yo dawg');
        });

        it('should use the title contents as aria-label when bbRepeaterItemInputLabel is not specified', function () {
            var $scope = $rootScope.$new(),
                el;

            $scope.locals = {
                selectable: true
            };

            el = $compile(repeaterMultiselectHtml)($scope);

            $scope.$digest();

            expect(getItemCheck(el).length).toBe(1);
            expect(el.find('input').attr('aria-label')).toBe('My Title');
        });


        it('should update the bound values the user clicks the checkbox', function () {
            var $scope = $rootScope.$new(),
                checkEl,
                el;

            $scope.locals = {
                selectable: true,
                selected: false
            };

            el = $compile(repeaterMultiselectHtml)($scope);

            // The element has to be in the DOM to trigger its click event in Firefox.
            el.appendTo(document.body);

            $scope.$digest();

            checkEl = el.find('.bb-check-wrapper input');

            checkEl.click();

            expect(el.find('.bb-repeater-item')).toHaveClass('bb-repeater-item-selected');
            expect($scope.locals.selected).toBe(true);

            checkEl.click();

            expect(el.find('.bb-repeater-item')).not.toHaveClass('bb-repeater-item-selected');
            expect($scope.locals.selected).toBe(false);

            el.remove();
        });

        it('should allow the user to click the header or content to select the item when there is no collapse', function () {
            var $scope = $rootScope.$new(),
                el;

            $scope.locals = {
                selectable: true,
                selected: false
            };

            el = $compile(repeaterMultiselectHtml)($scope);

            // The element has to be in the DOM to trigger its click event in Firefox.
            el.appendTo(document.body);

            $scope.$digest();

            el.find('.bb-repeater-item-right').click();

            expect(el.find('.bb-repeater-item')).toHaveClass('bb-repeater-item-selected');
            expect($scope.locals.selected).toBe(true);

            el.find('.bb-repeater-item-header').click();

            expect(el.find('.bb-repeater-item')).not.toHaveClass('bb-repeater-item-selected');
            expect($scope.locals.selected).toBe(false);
            
            el.remove();
        });

        it('should not allow the user to click the header to select the item when there is collapse', function () {
            var $scope = $rootScope.$new(),
                el;

            $scope.locals = {
                selectable: true,
                selected: false,
                expanded: true
            };

            el = $compile(
                '<bb-repeater bb-repeater-expand-mode="single">' +
                '<bb-repeater-item bb-repeater-item-selectable="{{locals.selectable}}" bb-repeater-item-selected="locals.selected" bb-repeater-item-expanded="locals.expanded">' +
                '<bb-repeater-item-title>My Title</bb-repeater-item-title>' +
                '<bb-repeater-item-content>My Content</bb-repeater-item-content>' +
                '</bb-repeater-item>' +
                '</bb-repeater>'
            )($scope);

            // The element has to be in the DOM to trigger its click event in Firefox.
            el.appendTo(document.body);
            $scope.$digest();

            el.find('.bb-repeater-item-right').click();

            expect(el.find('.bb-repeater-item')).toHaveClass('bb-repeater-item-selected');
            expect($scope.locals.selected).toBe(true);

            el.find('.bb-repeater-item-header').click();

            expect(el.find('.bb-repeater-item')).toHaveClass('bb-repeater-item-selected');
            expect($scope.locals.selected).toBe(true);
            
            el.remove();
        });
    });

    it('should enable expand/collapse animation only after an item is initially rendered', function () {
        var $scope = $rootScope.$new(),
            animateSpy = spyOn($.fn, 'animate').and.callThrough(),
            el;

        function validateAnimation(duration) {
            expect(animateSpy.calls.argsFor(0)[1]).toEqual(jasmine.objectContaining({
                duration: duration
            }));
        }

        $scope.items = [
            {
                expanded: false,
                title: 'Title'
            }
        ];

        el = $compile(
            '<bb-repeater bb-repeater-expand-mode="single">' +
            '   <bb-repeater-item ng-repeat="item in items" bb-repeater-item-expanded="item.expanded">' +
            '       <bb-repeater-item-title>{{item.title}}</bb-repeater-item-title>' +
            '   </bb-repeater-item>' +
            '</bb-repeater>'
        )($scope);

        $scope.$digest();

        validateAnimation(0);

        animateSpy.calls.reset();

        $timeout.flush();

        $scope.items[0].expanded = true;
        $scope.$digest();

        validateAnimation(250);
    });

    describe('with expand mode of "single"', function () {
        it('should collapse other items when an item is expanded', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(repeaterHtml)($scope);

            el.appendTo(document.body);

            $scope.expandMode = 'single';
            $scope.$digest();

            // Verify items are initially collapsed.
            expect(getContentItemAt(el, 0)).toBeHidden();
            expect(getContentItemAt(el, 1)).toBeHidden();
            expect(getContentItemAt(el, 2)).toBeHidden();

            // Verify that expanding one item works.
            toggleCollapseAt(el, 0);

            expect(getContentItemAt(el, 0)).toBeVisible();
            expect(getContentItemAt(el, 1)).toBeHidden();
            expect(getContentItemAt(el, 2)).toBeHidden();

            // Verify that expanding the next item collapses other items.
            toggleCollapseAt(el, 1);

            expect(getContentItemAt(el, 0)).toBeHidden();
            expect(getContentItemAt(el, 1)).toBeVisible();
            expect(getContentItemAt(el, 2)).toBeHidden();

            el.remove();
        });
    });

    describe('with expand mode of "multiple"', function () {
        it('should not collapse other items when an item is expanded', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(repeaterHtml)($scope);

            el.appendTo(document.body);

            $scope.expandMode = 'multiple';
            $scope.$digest();

            // Verify items are initially collapsed.
            expect(getContentItemAt(el, 0)).toBeHidden();
            expect(getContentItemAt(el, 1)).toBeHidden();
            expect(getContentItemAt(el, 2)).toBeHidden();

            // Verify that expanding one item works.
            toggleCollapseAt(el, 0);

            expect(getContentItemAt(el, 0)).toBeVisible();
            expect(getContentItemAt(el, 1)).toBeHidden();
            expect(getContentItemAt(el, 2)).toBeHidden();

            // Verify that expanding the next item does not collapse other items.
            toggleCollapseAt(el, 1);

            expect(getContentItemAt(el, 0)).toBeVisible();
            expect(getContentItemAt(el, 1)).toBeVisible();
            expect(getContentItemAt(el, 2)).toBeHidden();

            el.remove();
        });
    });

    describe('with expand mode of "none"', function () {
        it('should not allow items to be collapsed', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(repeaterHtml)($scope);

            el.appendTo(document.body);

            $scope.expandMode = 'none';
            $scope.$digest();

            // Verify items are initially expanded.
            expect(getExpandedContentItems(el).length).toBe(3);

            // Verify that clicking an item's header does not expand it.
            toggleCollapseAt(el, 0);

            expect(getContentItemAt(el, 0)).toBeVisible();
            expect(getContentItemAt(el, 1)).toBeVisible();
            expect(getContentItemAt(el, 2)).toBeVisible();

            el.remove();
        });

        it('should hide each item\'s chevron button', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(repeaterHtml)($scope);

            el.appendTo(document.body);

            $scope.expandMode = 'none';
            $scope.$digest();

            expect(getChevronAt(el, 0)).toBeHidden();

            el.remove();
        });

        it('should expand all items when mode was previously set to "single" or "multiple"', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(repeaterHtml)($scope);

            el.appendTo(document.body);

            $scope.expandMode = 'multiple';
            $scope.$digest();

            // Verify items are initially collapsed.
            expect(getExpandedContentItems(el).length).toBe(0);

            $scope.expandMode = 'none';
            $scope.$digest();

            // Verify all items are now expanded.
            expect(getExpandedContentItems(el).length).toBe(3);

            $scope.expandMode = 'single';
            $scope.$digest();

            // Verify all but one item has been collapsed.
            expect(getExpandedContentItems(el).length).toBe(1);

            $scope.expandMode = 'none';
            $scope.$digest();

            // Verify all items are now expanded.
            expect(getExpandedContentItems(el).length).toBe(3);

            el.remove();
        });
    });
});

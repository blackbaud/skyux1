/*jshint browser: true, jasmine: true */
/*global $, inject, module */

describe('Repeater directive', function () {
    'use strict';

    var $compile,
        $rootScope,
        bbResources,
        fxOff,
        repeaterHtml;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.repeater'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _bbResources_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        bbResources = _bbResources_;

        fxOff = $.fx.off;
        $.fx.off = true;

        repeaterHtml = '<bb-repeater bb-repeater-expand-mode="expandMode">' +
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
        return repeaterEl.find('.bb-repeater-item-chevron').eq(index);
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

    it('should make item chevrons accessible with localizable text', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(repeaterHtml)($scope);

        $scope.expandMode = 'multiple';
        $scope.$digest();

        expect(getChevronAt(el, 0)).toHaveAttr('aria-label', bbResources.chevron_expand);

        toggleCollapseAt(el, 0);

        expect(getChevronAt(el, 0)).toHaveAttr('aria-label', bbResources.chevron_collapse);
    });

    it('should add the appropriate class to an item when a context menu is present', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(repeaterHtml)($scope);

        $scope.showContextMenu = true;
        $scope.$digest();

        expect(getItems(el).eq(0)).toHaveClass('bb-repeater-item-with-context-menu');
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

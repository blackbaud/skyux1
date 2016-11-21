/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Card directive', function () {
    'use strict';

    var $compile,
        $timeout,
        $rootScope,
        cardAllChildrenHtml;

    cardAllChildrenHtml = '<bb-card>' +
        '   <bb-card-title>Title</bb-card-title>' +
        '   <bb-card-content>Content</bb-card-content>' +
        '   <bb-card-actions><button type="button" class="btn btn-default">Button</button></bb-card-actions>' +
        '</bb-card>';

    beforeEach(module(
        'ngMock',
        'sky.card',
        'sky.templates'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    it('should place the individual components in their respective placeholders', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(cardAllChildrenHtml)($scope);

        $scope.$digest();

        expect(el.find('.bb-card-title bb-card-title')).toHaveText('Title');
        expect(el.find('.bb-card-content bb-card-content')).toHaveText('Content');
        expect(el.find('.bb-card-actions button')).toHaveText('Button');
    });

    it('should add the appropriate CSS class for small cards', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(
            '<bb-card bb-card-size="small">' +
            '</bb-card>'
        )($scope);

        $scope.$digest();

        expect(el.find('section.bb-card')).toHaveClass('bb-card-small');
    });

    it('should display a checkbox when the selectable attribute is set to true', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(
            '<bb-card bb-card-selectable="true">' +
            '</bb-card>'
        )($scope);

        $scope.$digest();

        expect(el.find('.bb-card.bb-card-selectable .bb-card-header .bb-card-check .bb-check-wrapper')).toExist();
    });

    it('should not display a checkbox when the selectable attribute is set to false', function () {
        var $scope = $rootScope.$new(),
            el;
        el = $compile(
            '<bb-card bb-card-selectable="false">' +
            '</bb-card>'
        )($scope);

        $scope.$digest();

        expect(el.find('.bb-card.bb-card-selectable .bb-card-header .bb-card-check .bb-check-wrapper')).not.toExist();
    });

    it('should update the bound values the user clicks the checkbox', function () {
        var $scope = $rootScope.$new(),
            checkEl,
            el;

        el = $compile(
            '<bb-card bb-card-selectable="true" bb-card-selected="cardSelected">' +
            '</bb-card>'
        )($scope);

        // The element has to be in the DOM to trigger its click event in Firefox.
        el.appendTo(document.body);

        $scope.$digest();

        checkEl = el.find('.bb-check-wrapper input');

        checkEl.click();
        $timeout.flush();

        expect(el.find('.bb-card')).toHaveClass('bb-card-selected');
        expect($scope.cardSelected).toBe(true);

        checkEl.click();
        $timeout.flush();

        expect(el.find('.bb-card')).not.toHaveClass('bb-card-selected');
        expect($scope.cardSelected).toBe(false);

        el.remove();
    });

    it('should allow the user to click the entire card to select the card', function () {
        var $scope = $rootScope.$new(),
            checkId,
            el;

        el = $compile(
            '<bb-card bb-card-selectable="true" bb-card-selected="cardSelected">' +
            '</bb-card>'
        )($scope);

        $scope.$digest();

        checkId = el.find('.bb-card-header .bb-check-wrapper input').attr('id');

        expect(el.find('.bb-card-content')).toHaveAttr('for', checkId);
    });

    it('should call the function on selection change when provided', function () {
        var $scope = $rootScope.$new(),
            actualIsSelected,
            checkEl,
            el;

        $scope.onSelected = function onSelected(isSelected) {
            actualIsSelected = isSelected;
        };

        el = $compile(
            '<bb-card bb-card-selectable="true" bb-card-selected="cardSelected" bb-card-selection-toggled="onSelected(isSelected)">' +
            '</bb-card>'
        )($scope);

        // The element has to be in the DOM to trigger its click event in Firefox.
        el.appendTo(document.body);

        $scope.$digest();

        checkEl = el.find('.bb-check-wrapper input');

        checkEl.click();
        $timeout.flush();

        expect(el.find('.bb-card')).toHaveClass('bb-card-selected');
        expect($scope.cardSelected).toBe(true);
        expect(actualIsSelected).toBe(true);

        checkEl.click();
        $timeout.flush();

        expect(el.find('.bb-card')).not.toHaveClass('bb-card-selected');
        expect($scope.cardSelected).toBe(false);
        expect(actualIsSelected).toBe(false);
        el.remove();
    });

    it('should emit an event to allow users to initialize card controller options', function () {
        var $scope = $rootScope.$new(),
            actualIsSelected,
            checkEl,
            el;

        function onSelected(selectedArgs) {
            actualIsSelected = selectedArgs.isSelected;
        }

        $scope.$on('bbCardInitialized', function (event, data) {
            data.cardCtrl.bbCardSelectionToggled = onSelected;
            event.stopPropagation();
            event.preventDefault();
        });

        el = $compile(
            '<bb-card bb-card-selectable="true" bb-card-selected="cardSelected" bb-card-selection-toggled="onSelected(isSelected)">' +
            '</bb-card>'
        )($scope);

        // The element has to be in the DOM to trigger its click event in Firefox.
        el.appendTo(document.body);

        $scope.$digest();

        checkEl = el.find('.bb-check-wrapper input');

        checkEl.click();
        $timeout.flush();

        expect(el.find('.bb-card')).toHaveClass('bb-card-selected');
        expect($scope.cardSelected).toBe(true);
        expect(actualIsSelected).toBe(true);

        el.remove();
    });

    it('should dereference child controllers when destroyed', function () {
        var $scope = $rootScope.$new(),
            cardScope,
            children,
            el;

        children = [
            'title',
            'content',
            'actions'
        ];

        el = $compile(cardAllChildrenHtml)($scope);

        $scope.$digest();

        cardScope = el.isolateScope();

        children.forEach(function (child) {
            expect(cardScope.bbCard[child + 'Ctrl']).toBeDefined();
            expect(cardScope.bbCard[child + 'Ctrl']).not.toBeNull();
        });

        $scope.$destroy();

        children.forEach(function (child) {
            expect(cardScope.bbCard[child + 'Ctrl']).toBeNull();
        });
    });
});

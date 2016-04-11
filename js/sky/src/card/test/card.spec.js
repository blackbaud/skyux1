/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Card directive', function () {
    'use strict';

    var $compile,
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

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
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
            '<bb-card bb-card-size="\'small\'">' +
            '</bb-card>'
        )($scope);

        $scope.$digest();

        expect(el.find('section.bb-card')).toHaveClass('bb-card-small');
    });

    it('should display a checkbox when the selectable attribute is set to true', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(
            '<bb-card bb-card-selectable="\'true\'">' +
            '</bb-card>'
        )($scope);

        $scope.$digest();

        expect(el.find('.bb-card.bb-card-selectable .bb-card-header .bb-card-check .bb-check-wrapper')).toExist();
    });

    it('should update the bound values the user clicks the checkbox', function () {
        var $scope = $rootScope.$new(),
            checkEl,
            el;

        el = $compile(
            '<bb-card bb-card-selectable="\'true\'" bb-card-selected="cardSelected">' +
            '</bb-card>'
        )($scope);

        // The element has to be in the DOM to trigger its click event in Firefox.
        el.appendTo(document.body);

        $scope.$digest();

        checkEl = el.find('.bb-check-wrapper input');

        checkEl.click();

        expect(el.find('.bb-card')).toHaveClass('bb-card-selected');
        expect($scope.cardSelected).toBe(true);

        checkEl.click();

        expect(el.find('.bb-card')).not.toHaveClass('bb-card-selected');
        expect($scope.cardSelected).toBe(false);

        el.remove();
    });

    it('should allow the user to click the entire card to select the card', function () {
        var $scope = $rootScope.$new(),
            checkId,
            el;

        el = $compile(
            '<bb-card bb-card-selectable="\'true\'" bb-card-selected="cardSelected">' +
            '</bb-card>'
        )($scope);

        $scope.$digest();

        checkId = el.find('.bb-card-header .bb-check-wrapper input').attr('id');

        expect(el.find('.bb-card-content')).toHaveAttr('for', checkId);
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

/*jshint browser: true, jasmine: true */
/*global $, inject, module */

describe('Carousel component', function () {
    'use strict';

    var $compile,
        $rootScope,
        bbFormat,
        bbResources,
        styleEl;

    function createCarouselEl($scope, itemCount, style, useRepeater) {
        var html,
            i;

        html = '<bb-carousel ' + 
                'class="bb-carousel-card" ' +
                'bb-carousel-selected-index="selectedIndex" ' +
                'bb-carousel-selected-index-change="selectedIndexChange(index)"';
                
        if (style) {
            html += ' bb-carousel-style="' + style + '"';
        }

        html += '>';
        
        if (!useRepeater) {
            for (i = 0; i < itemCount; i++) {
                html += 
                    '<bb-carousel-item>' +
                        '<bb-card><button></button></bb-card>' +
                    '</bb-carousel-item>';
            }
        } else {
            html += '<bb-carousel-item ng-repeat="item in items">' +
                        '<bb-card><button></button></bb-card>' +
                    '</bb-carousel-item>';

            $scope.items = [];
            for (i = 0; i < itemCount; i++) {
                $scope.items.push({
                    id: i
                });
            }
        }
         
        html += '</bb-carousel>';

        return $compile(html)($scope);
    }

    function validateItemSelected(el, index) {
        expect(el.find('.bb-carousel-item').eq(index).position().left).toBe(0);  
    }

    function getDotBtns(el) {
        return el.find('.bb-carousel-dot-btn');
    }

    function validateDotSelected(el, index) {
        var dotBtnEl = getDotBtns(el).eq(index);

        expect(dotBtnEl).toHaveClass('bb-carousel-dot-btn-selected');
    }

    function clickCarouselItem(el, index) {
        el.find('.bb-carousel-item').eq(index).click();        
    }

    function swipeCarousel(el, startX) {
        var carouselEl = el.find('.bb-carousel');

        carouselEl.trigger({
            type: 'touchstart',
            clientX: startX,
            clientY: 0
        });

        carouselEl.trigger({
            type: 'touchend',
            clientX: 0,
            clientY: 0
        });
    }

    function swipeCarouselLeft(el) {
        swipeCarousel(el, 40);
    }

    function swipeCarouselRight(el) {
        swipeCarousel(el, -40);
    }

    function getNextBtn(el) {
        return el.find('.bb-carousel-btn-next');
    }

    function getPreviousBtn(el) {
        return el.find('.bb-carousel-btn-previous');
    }

    function validateAriaLabel(el, label) {
        expect(el).toHaveAttr('aria-label', label);
    }

    function buildDotBtnLabel(itemIndex) {
        return bbFormat.formatText(bbResources.carousel_dot_label, itemIndex + 1);
    }

    beforeEach(module(
        'ngTouch',
        'ngMock',
        'sky.card',
        'sky.carousel',
        'sky.templates'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _bbFormat_, _bbResources_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        bbFormat = _bbFormat_;
        bbResources = _bbResources_;

        // Disable CSS animations
        styleEl = $('<style>* {transition: none !important;}</style>').appendTo(document.body);
    }));

    afterEach(inject(function () {
        styleEl.remove();
    }));

    it('should select an item when it is clicked', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 10);

        el.appendTo(document.body);

        $scope.$digest();

        clickCarouselItem(el, 1);
        validateItemSelected(el, 1);

        el.remove();
    });

    it('should select an item when a child element is focused', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 10);

        el.appendTo(document.body);

        $scope.$digest();

        el.find('.bb-carousel-item').eq(1).focusin();

        $scope.$digest();

        validateItemSelected(el, 1);

        el.remove();
    });

    it('should allow the user to navigate through items with a swipe gesture', function () {
        var $scope = $rootScope.$new(),
            carouselEl,
            el;

        el = createCarouselEl($scope, 2);

        el.appendTo(document.body);

        $scope.$digest();

        carouselEl = el.find('.bb-carousel');

        swipeCarouselLeft(el);
        validateItemSelected(el, 1);

        swipeCarouselRight(el);
        validateItemSelected(el, 0);

        el.remove();
    });

    it('should allow the user to navigate through items with the arrow buttons', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 2);

        el.appendTo(document.body);

        $scope.$digest();

        validateItemSelected(el, 0);

        getNextBtn(el).click();
        validateItemSelected(el, 1);

        getPreviousBtn(el).click();
        validateItemSelected(el, 0);

        el.remove();
    });

    it('should add accessibility labels to the arrow buttons', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 2);

        $scope.$digest();

        validateAriaLabel(getNextBtn(el), bbResources.carousel_button_label_next);
        validateAriaLabel(getPreviousBtn(el), bbResources.carousel_button_label_previous);
    });

    it('should show/hide arrows depending on the selected item', function () {
        var $scope = $rootScope.$new(),
            el,
            nextBtn,
            itemEls,
            previousBtn;

        el = createCarouselEl($scope, 3);

        el.appendTo(document.body);

        $scope.$digest();

        itemEls = el.find('.bb-carousel-item');
        previousBtn = getPreviousBtn(el);
        nextBtn = getNextBtn(el); 

        expect(previousBtn).not.toBeVisible();
        expect(nextBtn).toBeVisible();

        nextBtn.click();

        expect(previousBtn).toBeVisible();
        expect(nextBtn).toBeVisible();

        nextBtn.click();

        expect(previousBtn).toBeVisible();
        expect(nextBtn).not.toBeVisible();

        el.remove();
    });

    it('should allow the user to navigate through items with the dot buttons', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 2);

        el.appendTo(document.body);

        $scope.$digest();

        validateItemSelected(el, 0);

        getDotBtns(el).eq(1).click(); 

        validateItemSelected(el, 1);
        validateDotSelected(el, 1);

        el.remove();
    });

    it('should add accessibility labels to the dot buttons', function () {
        var $scope = $rootScope.$new(),
            dotBtnEls,
            el,
            expectedLabel,
            i,
            itemCount = 10;

        el = createCarouselEl($scope, itemCount);

        $scope.$digest();

        dotBtnEls = getDotBtns(el);

        for (i = 0; i < itemCount; i++) {
            expectedLabel = bbFormat.formatText(bbResources.carousel_dot_label, i + 1);
        }
    });

    it('should limit the number of dot buttons', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 20);

        el.appendTo(document.body);

        $scope.$digest();

        expect(getDotBtns(el).length).toBe(10);

        el.remove();
    });

    it(
        'should approximate the carousel position when there are more items than dots', 
        function () {
            var $scope = $rootScope.$new(),
                dotBtnEls,
                el;

            el = createCarouselEl($scope, 20);

            el.appendTo(document.body);

            $scope.$digest();

            dotBtnEls = getDotBtns(el);
            
            validateAriaLabel(dotBtnEls.eq(1), buildDotBtnLabel(2));
            validateAriaLabel(dotBtnEls.eq(2), buildDotBtnLabel(4));
            validateAriaLabel(dotBtnEls.eq(9), buildDotBtnLabel(18));

            dotBtnEls.eq(1).click();
            validateDotSelected(el, 1);
            validateItemSelected(el, 2);

            dotBtnEls.eq(2).click();
            validateDotSelected(el, 2);
            validateItemSelected(el, 4);

            dotBtnEls.eq(9).click();
            validateDotSelected(el, 9);
            validateItemSelected(el, 18);

            el.remove();
        }
    );

    it(
        'should set the selected dot when there are more items than dots and an item ' + 
        'is selected that is not precisely represented by a dot', 
        function () {
            var $scope = $rootScope.$new(),
                el;

            el = createCarouselEl($scope, 20);

            el.appendTo(document.body);

            $scope.$digest();

            clickCarouselItem(el, 1);
            validateDotSelected(el, 0);

            clickCarouselItem(el, 19);
            validateDotSelected(el, 9);

            el.remove();
        }
    );

    it('should notify the host when an item is selected', function () {
        var $scope = $rootScope.$new(),
            el,
            selectedSpy;

        $scope.selectedIndexChange = function () { };

        selectedSpy = spyOn($scope, 'selectedIndexChange');

        el = createCarouselEl($scope, 10);

        el.appendTo(document.body);

        $scope.$digest();

        clickCarouselItem(el, 1);
        validateItemSelected(el, 1);

        expect(selectedSpy).toHaveBeenCalledWith(1);

        el.remove();
    });

    it('should allow the host to set the selected index', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 10);

        el.appendTo(document.body);

        $scope.selectedIndex = 1;
        $scope.$digest();

        validateItemSelected(el, 1);

        $scope.selectedIndex = 0;
        $scope.$digest();

        validateItemSelected(el, 0);

        el.remove();
    });

    it('should allow the host to set the selected index with ng-repeat', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 10, false, true);

        el.appendTo(document.body);

        $scope.selectedIndex = 1;
        $scope.$digest();

        validateItemSelected(el, 1);

        $scope.selectedIndex = 0;
        $scope.$digest();

        validateItemSelected(el, 0);

        el.remove();
    });

    it('should allow the host to have selected index 0 with ng-repeat with one item', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 1, false, true);

        el.appendTo(document.body);
        $scope.$digest();

        validateItemSelected(el, 0);

        el.remove();
    });

    it('should default to a style of card', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 10);

        el.appendTo(document.body);

        $scope.$digest();
        
        expect('.bb-carousel-wrapper').toHaveClass('bb-carousel-card');

        el.remove();
    });

    it('should support displaying small cards as items', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 10, 'card-small');

        el.appendTo(document.body);

        $scope.$digest();
        
        expect('.bb-carousel-wrapper').toHaveClass('bb-carousel-card-small');

        el.remove();
    });

    it('should allow cards to be removed', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 3, false, true);

        el.appendTo(document.body);

        $scope.selectedIndex = 2;
        $scope.$digest();

        validateItemSelected(el, 2);
        expect(getDotBtns(el).length).toBe(3);
        validateDotSelected(el, 2);

        $scope.items.splice($scope.items.length -1, 1);
        $scope.$digest();

        validateItemSelected(el, 1);
        expect(getDotBtns(el).length).toBe(2);
        validateDotSelected(el, 1);

        el.remove();
    });
});

/*jshint browser: true, jasmine: true */
/*global $, inject, module */

describe('Carousel component', function () {
    'use strict';

    var $compile,
        $rootScope,
        styleEl;

    function createCarouselEl($scope, itemCount) {
        var html = '<bb-carousel class="bb-carousel-card">',
            i;
        
        for (i = 0; i < itemCount; i++) {
            html += 
                '<bb-carousel-item>' +
                    '<bb-card></bb-card>' +
                '</bb-carousel-item>';
        }
         
        html += '</bb-carousel>';

        return $compile(html)($scope);
    }

    function validateItemSelected(el, index) {
        expect(el.find('.bb-carousel-item').eq(index).position().left).toBe(0);  
    }

    function validateDotSelected(el, index) {
        var dotBtnEl = el.find('.bb-carousel-dot-btn').eq(index);

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

    beforeEach(module(
        'ngTouch',
        'ngMock',
        'sky.card',
        'sky.carousel',
        'sky.templates'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        // Disable CSS animations
        styleEl = $('<style>* {transition: none !important;}</style>').appendTo(document.body);
    }));

    afterEach(inject(function () {
        styleEl.remove();
    }));

    it('should select a card when it is clicked', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 10);

        el.appendTo(document.body);

        $scope.$digest();

        clickCarouselItem(el, 1);
        validateItemSelected(el, 1);

        el.remove();
    });

    it('should allow the user to navigate through cards with a swipe gesture', function () {
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

    it('should allow the user to navigate through cards with the arrow buttons', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 2);

        el.appendTo(document.body);

        $scope.$digest();

        validateItemSelected(el, 0);

        el.find('.bb-carousel-btn-next').click();
        validateItemSelected(el, 1);

        el.find('.bb-carousel-btn-previous').click();
        validateItemSelected(el, 0);

        el.remove();
    });

    it('should show/hide arrows depending on the selected card', function () {
        var $scope = $rootScope.$new(),
            el,
            nextBtn,
            itemEls,
            previousBtn;

        el = createCarouselEl($scope, 3);

        el.appendTo(document.body);

        $scope.$digest();

        itemEls = el.find('.bb-carousel-item');
        previousBtn = $('.bb-carousel-btn-previous');
        nextBtn = $('.bb-carousel-btn-next'); 

        expect(previousBtn).not.toBeVisible();
        expect(nextBtn).toBeVisible();

        el.find('.bb-carousel-btn-next').click();

        expect(previousBtn).toBeVisible();
        expect(nextBtn).toBeVisible();

        el.find('.bb-carousel-btn-next').click();

        expect(previousBtn).toBeVisible();
        expect(nextBtn).not.toBeVisible();

        el.remove();
    });

    it('should allow the user to navigate through cards with the dot buttons', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 2);

        el.appendTo(document.body);

        $scope.$digest();

        validateItemSelected(el, 0);

        el.find('.bb-carousel-dot-btn').eq(1).click(); 

        validateItemSelected(el, 1);
        validateDotSelected(el, 1);

        el.remove();
    });

    it('should limit the number of dot buttons', function () {
        var $scope = $rootScope.$new(),
            el;

        el = createCarouselEl($scope, 20);

        el.appendTo(document.body);

        $scope.$digest();

        expect(el.find('.bb-carousel-dot-btn').length).toBe(10);

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

            dotBtnEls = el.find('.bb-carousel-dot-btn');
            
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
        ' is selected that is not precisely represented by a dot', 
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
});

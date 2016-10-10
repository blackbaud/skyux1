
/*global describe, it, browser */

describe('Carousel', function () {
    'use strict';

    var CAROUSEL_BTN_NEXT_LARGE,
        CAROUSEL_SELECTOR_LARGE = '#screenshot-carousel',
        CAROUSEL_SELECTOR_SMALL = '#screenshot-carousel-small';

    CAROUSEL_BTN_NEXT_LARGE = '#screenshot-carousel .bb-carousel-btn-next';

    function doTest(testFn, screenshotName, selector) {
        var result;

        result = 
            browser
                .setupTest('/carousel/fixtures/test.full.html');

        if (testFn) {
            result = testFn(result);
        }

        return result
            .moveCursorOffScreen()
            .pause(1000)
            .compareScreenshot({
                screenshotName: screenshotName,
                selector: selector,
                checkAccessibility: true
            });
    }

    it('should match previous screenshot when the first card is selected', function () {
        return doTest(undefined, 'carousel-first-item', CAROUSEL_SELECTOR_LARGE);
    });

    it('should match previous screenshot when a card in the middle is selected', function () {
        return doTest(
            function (result) {
                return result
                    .click(CAROUSEL_BTN_NEXT_LARGE)
                    .click(CAROUSEL_BTN_NEXT_LARGE)
                    .click('#remove-focus');
            }, 
            'carousel-middle-item', 
            CAROUSEL_SELECTOR_LARGE
        );
    });

    it('should match previous screenshot when the last card is selected', function () {
        return doTest(
            function (result) {
                return result
                    .click('.bb-carousel-dot-btn:last-child')
                    .click(CAROUSEL_BTN_NEXT_LARGE)
                    .click('#remove-focus');
            }, 
            'carousel-last-item', 
            CAROUSEL_SELECTOR_LARGE
        );
    });

    it('should match previous screenshot when the carousel style is card-small', function () {
        return doTest(undefined, 'carousel-card-small', CAROUSEL_SELECTOR_SMALL);
    });

    it('should match previous screenshot when a dot button has focus', function () {
        return doTest(
            function (result) {
                return result.focusElement(
                    CAROUSEL_SELECTOR_LARGE + ' .bb-carousel-dot-btn:first-child'
                );
            }, 
            'carousel-dot-focus', 
            CAROUSEL_SELECTOR_LARGE + ' .bb-carousel-dots'
        );
    });
});


/*global describe, it, browser,require */

describe('Card', function () {
    'use strict';

    var CAROUSEL_BTN_NEXT_LARGE,
        CAROUSEL_SELECTOR_LARGE = '#screenshot-carousel',
        CAROUSEL_SELECTOR_SMALL = '#screenshot-carousel-small',
        common = require('../common');

    CAROUSEL_BTN_NEXT_LARGE = '#screenshot-carousel .bb-carousel-btn-next';

    function doTest(testFn, screenshotName, selector, done) {
        var result;

        result = browser.url('/carousel/fixtures/test.full.html');

        if (testFn) {
            testFn(result);
        }

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: screenshotName,
            selector: selector,
            done: done,
            checkAccessibility: true
        });
    }

    it('should match previous screenshot when the first card is selected', function (done) {
        doTest(undefined, 'carousel-first-item', CAROUSEL_SELECTOR_LARGE, done);
    });

    it('should match previous screenshot when a card in the middle is selected', function (done) {
        doTest(
            function (result) {
                result
                    .click(CAROUSEL_BTN_NEXT_LARGE)
                    .click(CAROUSEL_BTN_NEXT_LARGE)
                    .click('body');
            }, 
            'carousel-middle-item', 
            CAROUSEL_SELECTOR_LARGE, 
            done
        );
    });

    it('should match previous screenshot when the last card is selected', function (done) {
        doTest(
            function (result) {
                result
                    .click('.bb-carousel-dot-btn:last-child')
                    .click(CAROUSEL_BTN_NEXT_LARGE)
                    .click('body');
            }, 
            'carousel-last-item', 
            CAROUSEL_SELECTOR_LARGE, 
            done
        );
    });

    it('should match previous screenshot when the carousel style is card-small', function (done) {
        doTest(undefined, 'carousel-card-small', CAROUSEL_SELECTOR_SMALL, done);
    });

    it('should match previous screenshot when a dot button has focus', function (done) {
        doTest(
            function (result) {
                result
                    .moveToObject(CAROUSEL_SELECTOR_LARGE + ' .bb-carousel-dot-btn:first-child')
                    .buttonDown();
            }, 
            'carousel-dot-focus', 
            CAROUSEL_SELECTOR_LARGE + ' .bb-carousel-dots', 
            done
        );
    });
});


/*global describe, it, browser,require */

describe('Card', function () {
    'use strict';

    function clickTest(screenshotName, visibleComponents, selectable, done, extraStep) {
        var result,
            common = require('../common');

        result = browser.url('/card/fixtures/test.full.html')
            .setValue('#screenshots-card-items', visibleComponents.join(',') + (selectable ? ':selectable' : ''));

        if (extraStep) {
            result = extraStep(result);
        }

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: ('card_' + screenshotName),
            selector: '#screenshots-card',
            done: done
        });
    }

    it('should match previous screenshot when all components are present', function (done) {
        clickTest(
            'all',
            [
                'Title',
                'HeaderLeftContent',
                'HeaderRightContent',
                'Content',
                'Actions'
            ],
            false,
            done
        );
    });

    it('should match previous screenshot when no header left or right content is present', function (done) {
        clickTest(
            'noheaderleftright',
            [
                'Title',
                'Content',
                'Actions'
            ],
            false,
            done
        );
    });

    it('should match previous screenshot when no header is present', function (done) {
        clickTest(
            'noheader',
            [
                'Content',
                'Actions'
            ],
            false,
            done
        );
    });

    it('should match previous screenshot when no actions are present', function (done) {
        clickTest(
            'noactions',
            [
                'Title',
                'Content'
            ],
            false,
            done
        );
    });

    it('should match previous screenshot when selectable', function (done) {
        clickTest(
            'selectable',
            [
                'Title',
                'Content',
                'Actions'
            ],
            true,
            done
        );
    });

    it('should match previous screenshot when the card is selected', function (done) {
        clickTest(
            'selected',
            [
                'Title',
                'Content',
                'Actions'
            ],
            true,
            done,
            function (result) {
                return result.click('.bb-card-title');
            }
        );
    });

});


/*global describe, it, browser */

describe('Card', function () {
    'use strict';

    function clickTest(screenshotName, visibleComponents, selectable, extraStep) {
        var result;

        result = browser
            .setupTest('/card/fixtures/test.full.html')
            .setValue('#screenshots-card-items', visibleComponents.join(',') + (selectable ? ':selectable' : ''));

        if (extraStep) {
            result = extraStep(result);
        }

        return result.compareScreenshot({
            screenshotName: ('card_' + screenshotName),
            selector: '#screenshots-card',
            checkAccessibilty: true
        });
    }

    it('should match previous screenshot when all components are present', function () {
        return clickTest(
            'all',
            [
                'Title',
                'Content',
                'Actions'
            ],
            false
        );
    });

    it('should match previous screenshot when no header is present', function () {
        return clickTest(
            'noheader',
            [
                'Content',
                'Actions'
            ],
            false
        );
    });

    it('should match previous screenshot when no actions are present', function () {
        return clickTest(
            'noactions',
            [
                'Title',
                'Content'
            ],
            false
        );
    });

    it('should match previous screenshot when selectable', function () {
        return clickTest(
            'selectable',
            [
                'Title',
                'Content',
                'Actions'
            ],
            true
        );
    });

    it('should match previous screenshot when the card is selected', function () {
        return clickTest(
            'selected',
            [
                'Title',
                'Content',
                'Actions'
            ],
            true,
            function (result) {
                return result.click('.bb-card-title');
            }
        );
    });

});

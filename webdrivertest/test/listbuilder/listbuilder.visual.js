/*global describe, it, browser */

describe('listbuilder', function () {
    'use strict';


    function listbuilderTest(screenWidth) {

        return browser
            .setupTest('/listbuilder/fixtures/test.full.html', screenWidth)
            .compareScreenshot({
                screenshotName: 'listbuilder',
                selector: '#screenshot-listbuilder',
                checkAccessibility: true
            });
    }

    it('match the baseline listbuilder screenshot', function () {
        return listbuilderTest(1280);
    });

    it('match the baseline listbuilder screenshot on small screens', function () {
        return listbuilderTest(480);
    });

    it('match the listbuilder open view switcher screenshot', function () {
        return browser
            .setupTest('/listbuilder/fixtures/test.full.html')
            .click('.bb-listbuilder-switcher button')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'listbuilder_switcher',
                selector: '#screenshot-listbuilder',
                checkAccessibility: true
            });
    });

    it('match the listbuilder repeater screenshot', function () {
        return browser
            .setupTest('/listbuilder/fixtures/test.full.html')
            .click('.bb-listbuilder-switcher button')
            .click('.bb-listbuilder-switcher-menu a[title="Switch to repeater view"]')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'listbuilder_repeater',
                selector: '#screenshot-listbuilder',
                checkAccessibility: true
            });
    });

    it('match the listbuilder grid screenshot', function () {
        return browser
            .setupTest('/listbuilder/fixtures/test.full.html')
            .click('.bb-listbuilder-switcher button')
            .click('.bb-listbuilder-switcher-menu a[title="Switch to grid view"]')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'listbuilder_grid',
                selector: '#screenshot-listbuilder'
            });
    });

    it('match the listbuilder screenshot when using multiselect', function () {
        return browser
            .setupTest('/listbuilder/fixtures/test.full.html')
            .click('.bb-list-multiselect-button')
            .click('.bb-card input')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'listbuilder_multiselect',
                selector: '#screenshot-listbuilder'
            });
    });
});
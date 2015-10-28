/*global phantom */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    function goToNextStep() {
        casper.click('.modal-footer .btn-primary');
    }
    
    function takeWizardScreenshot(name) {
        phantomcss.screenshot('.modal-content', name);
    }
    
    casper.thenOpen(phantom.rootUrl + 'wizard/fixtures/test.full.html')
        .then(function () {
            casper.click('#screenshots-wizard-open');
        })
        .then(function () {
            takeWizardScreenshot('wizard step 1');
        })
        .then(function () {
            casper.sendKeys('#screenshots-text1', 'test');
        })
        .then(function () {
            takeWizardScreenshot('wizard step 1 (step 2 enabled)');
        })
        .then(function () {
            goToNextStep();
        })
        .then(function () {
            takeWizardScreenshot('wizard step 2');
        })
        .then(function () {
            casper.click('#screenshots-checkbox1');
        })
        .then(function () {
            takeWizardScreenshot('wizard step 2 (step 3 enabled)');
        })
        .then(function () {
            goToNextStep();
        })
        .then(function () {
            takeWizardScreenshot('wizard step 3');
        });
}());
/*global angular */
(function () {
    'use strict';

    function helpTestConfig(bbHelpConfig) {
        // Example:
        // bbHelpConfig.url = 'your url';
    }

    helpTestConfig.$inject = ['bbHelpConfig'];

    function helpTestRun(bbHelp) {
        bbHelp.init();
    }

    helpTestRun.$inject = ['bbHelp'];

    function HelpTestController(bbHelp) {
        var self = this;

        self.open = function () {
            bbHelp.open('bb-gifts.html');
        };

        self.close = function () {
            bbHelp.close();
        };
    }

    HelpTestController.$inject = ['bbHelp'];

    angular.module('stache')
        .config(helpTestConfig)
        .run(helpTestRun)
        .controller('HelpTestController', HelpTestController);
}());

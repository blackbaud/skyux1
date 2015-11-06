/*jshint browser: true */
/*globals angular, FastClick, jQuery */

(function ($) {
    'use strict';
    angular
        .module('skyuxDemo', ['stache'])
        .run(['bbOmnibarConfig', 'bbHelpConfig', 'bbScrollIntoViewConfig', function (bbOmnibarConfig, bbHelpConfig, bbScrollIntoViewConfig) {
            bbOmnibarConfig.enableSearch = true;
            bbOmnibarConfig.enableHelp = true;
            bbScrollIntoViewConfig.reservedTop = 30;
        }]);

    $(function () {
        if (typeof FastClick !== 'undefined') {
            FastClick.attach(document.body);
        }
    });

}(jQuery));

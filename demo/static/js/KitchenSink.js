/*jshint browser: true */
/*globals angular, $, FastClick */

(function ($) {
    'use strict';
    angular
      .module('stache', ['sky', 'ngAnimate', 'ui.bootstrap', 'ui.select'])
      .run(['bbOmnibarConfig', 'bbHelpConfig', 'bbScrollIntoViewConfig', function (bbOmnibarConfig, bbHelpConfig, bbScrollIntoViewConfig) {
        bbOmnibarConfig.enableSearch = true;
        bbOmnibarConfig.enableHelp = true;
        bbScrollIntoViewConfig.reservedTop = 30;
      }]);

    $(function () {
      'use strict';
      if (typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
      }
    });

}(jQuery));

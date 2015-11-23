/*global angular */

/** @module Popover
@icon newspaper-o
@summary The popover component wraps the Angular UI Bootstrap popover directive to create an HTML-formatted popover that is displayed by a trigger element.
 @description The `bb-popover-template` directive enables an HTML-formatted popover to be displayed via a trigger element. This directive is an alternative to the `popover` directive from Angular UI Bootstrap, making it easier to define markup in a template rather than directly in the view's controller.

The `bb-popover-template` attribute should specify a URL for a template in the `$templateCache` that will be used as the popover content. The scope applied to this template inherits the current scope. A `hide` function is also
provided on the scope to dismiss the popover.

The directive is built as a thin wrapper of the [Angular UI Bootstrap Popover](http://angular-ui.github.io/bootstrap/) directive and supports all of it's optional properties.
 */

(function () {
    'use strict';

    function bbPopoverTemplate($compile) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, el) {

                //prevent breaking change by adding quotes around template url and
                //passing to new directive
                /*istanbul ignore else */
                if (!el.attr('bb-uib-popover-template')) {
                    el.attr('bb-uib-popover-template', "'" + el.attr('bb-popover-template') + "'");
                }

                el.removeAttr('bb-popover-template');
                $compile(el)($scope);
            }
        };
    }

    bbPopoverTemplate.$inject = ['$compile'];

    function bbUibPopoverTemplate($uibTooltip) {
        return $uibTooltip('bbUibPopoverTemplate', 'popover', 'focus', {
            useContentExp: true
        });
    }

    bbUibPopoverTemplate.$inject = ['$uibTooltip'];

    function bbUibPopoverTemplatePopup() {
        return {
            replace: true,
            scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&', originScope: '&' },
            templateUrl: 'sky/templates/popover/popup.html'
        };
    }


    angular.module('sky.popover', ['ui.bootstrap.tooltip'])
        .directive('bbUibPopoverTemplatePopup', bbUibPopoverTemplatePopup)
        .directive('bbUibPopoverTemplate', bbUibPopoverTemplate)
        .directive('bbPopoverTemplate', bbPopoverTemplate);
}());

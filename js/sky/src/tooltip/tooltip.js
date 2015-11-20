/*global angular */

/** @module Tooltip
@icon info
@summary The tooltip creates an HTML-formatted tooltip that is displayed by a trigger element.
 @description The tooltip directive enables an HTML-formatted tooltip to be displayed by a trigger element. This directive wraps up the Angular UI Bootstrap Tooltip directive while making it easier to define markup in a template rather than directly in the view's controller.

### Tooltip Settings ##

In addition to all the properties from the [Angular UI Bootstrap Tooltip](http://angular-ui.github.io/bootstrap/) directive, these properties may also be specified:

 - `bb-tooltip` URL for a template in the `$templateCache`. The template HTML may contain bindings to properties in the current scope.

 - `tooltip-updater` Optional. A property on the scope that can be watched by the directive so that when this property's value changes, the contents of the tooltip are refreshed.
 */

(function () {
    'use strict';


    function bbTooltip($compile) {
        // Based on Adomas.NET's answer to this StackOverflow question:
        // http://stackoverflow.com/questions/19029676/angular-ui-tooltip-with-html
        // This allows us to use an HTML template with Angular binding instead of building
        // HTML in the controller which leaves open the potential for HTML injection.
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, el) {
                //Add bootstrap directive
                /*istanbul ignore else */
                if (!el.attr('uib-tooltip-template')) {
                    el.attr('uib-tooltip-template', "'" + el.attr('bb-tooltip') + "'");
                }

                el.removeAttr('bb-tooltip');
                $compile(el)($scope);
            }
        };
    }

    bbTooltip.$inject = ['$compile'];

    angular.module('sky.tooltip', ['ui.bootstrap.tooltip'])
        .directive('bbTooltip', bbTooltip);

}());

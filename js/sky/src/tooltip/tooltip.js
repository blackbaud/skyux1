/*global angular */

/** @module Tooltip
@deprecated
@icon info
@summary This directive is no longer being maintained. For adding templated tooltips, use the Angular UI Bootstrap Tooltip uib-tooltip-template attribute.
 @description ### *Deprecated* ###

 This directive is no longer being maintained. For adding templated tooltips, use the [Angular UI Bootstrap Tooltip](http://angular-ui.github.io/bootstrap/) uib-tooltip-template attribute.

### Tooltip Settings ##

In addition to all the properties from the [Angular UI Bootstrap Tooltip](http://angular-ui.github.io/bootstrap/) directive, these properties may also be specified:

 - `bb-tooltip` URL for a template in the `$templateCache`. The template HTML may contain bindings to properties in the current scope.

 - `tooltip-updater` Optional. A property on the scope that can be watched by the directive so that when this property's value changes, the contents of the tooltip are refreshed.
 */

(function () {
    'use strict';


    function bbTooltip($compile) {
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

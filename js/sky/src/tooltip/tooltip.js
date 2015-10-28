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


    function bbTooltip($compile, $timeout, bbData) {
        // Based on Adomas.NET's answer to this StackOverflow question:
        // http://stackoverflow.com/questions/19029676/angular-ui-tooltip-with-html
        // This allows us to use an HTML template with Angular binding instead of building
        // HTML in the controller which leaves open the potential for HTML injection.
        return {
            restrict: 'A',
            scope: true,
            compile: function (tElem) {
                //Add bootstrap directive
                /*istanbul ignore else */
                if (!tElem.attr('tooltip-html-unsafe')) {
                    tElem.attr('tooltip-html-unsafe', '{{tooltip}}');
                }

                return function (scope, el, attrs) {
                    function loadTemplate() {
                        bbData.load({
                            text: attrs.bbTooltip
                        }).then(function (result) {
                            var container = angular.element('<div></div>'),
                                tplContent = result.text;

                            container.html($compile(tplContent.trim())(scope));

                            $timeout(function () {
                                scope.tooltip = container.html();
                            });
                        });
                    }

                    //remove our direcive to avoid infinite loop
                    el.removeAttr('bb-tooltip');

                    //compile element to attach tooltip binding
                    $compile(el)(scope);

                    if (angular.isDefined(attrs.tooltipUpdater)) {
                        scope.$watch(attrs.tooltipUpdater, function () {
                            loadTemplate();
                        });
                    } else {
                        loadTemplate();
                    }
                };
            }
        };
    }


    bbTooltip.$inject = ['$compile', '$timeout', 'bbData'];

    angular.module('sky.tooltip', ['sky.data'])
        .directive('bbTooltip', bbTooltip);

}());

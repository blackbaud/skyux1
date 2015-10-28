/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Highlight
@icon paint-brush
@summary The highlight component highlights portions of text inside DOM elements.
 @description The highlight directive allows you to highlight portions of text inside DOM elements. Set the `bb-highlight` attribute to the text you want to highlight, and all matching text within the element will be highlighted.

### Highlight Options ###

- `bb-highlight-beacon` A property on your scope that will cause highlighting to occur when its value changes. This is needed when the highlight directive can't tell that the contents of the element to be highlighted has changed. For instance, if the element with the `bb-highlight` attribute also has the `ng-bind` attribute, the highlight directive can detect this and update highlighting whenever this value changes. However if you use a different directive to update the element's contents or the `bb-highlight` attribute is specified on a parent element of the element to be highlighted, you will need to use `bb-highlight-beacon` to notify the highlight directive to update the highlighted text.
 */

(function () {
    'use strict';

    angular.module('sky.highlight', [])
        .factory('bbHighlight', function () {
            var DATA_CLASS_NAME = 'bb-hightlight-class',
                DEFAULT_CLASS_NAME = 'highlight';

            // Copied and modified from here so we don't have yet another jQuery plugin dependency.
            // http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
            function highlight(el, pat, classn) {
                function innerHighlight(node, pat) {
                    var pos,
                        skip = 0,
                        spannode,
                        middlebit,
                        i,
                        middleclone;

                    classn = classn || DEFAULT_CLASS_NAME;

                    el.data(DATA_CLASS_NAME, classn);

                    if (node.nodeType === 3) {
                        pos = node.data.toUpperCase().indexOf(pat);
                        if (pos >= 0) {
                            spannode = document.createElement('span');
                            spannode.className = String(classn);
                            middlebit = node.splitText(pos);
                            middlebit.splitText(pat.length);
                            middleclone = middlebit.cloneNode(true);
                            spannode.appendChild(middleclone);
                            middlebit.parentNode.replaceChild(spannode, middlebit);
                            skip = 1;
                        }
                    } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                        for (i = 0; i < node.childNodes.length; ++i) {
                            i += innerHighlight(node.childNodes[i], pat);
                        }
                    }
                    return skip;
                }

                return el.length && pat && pat.length ? el.each(function () {
                    innerHighlight(this, pat.toUpperCase());
                }) : el;
            }

            function removeHighlight(el) {
                var classn = el.data(DATA_CLASS_NAME) || DEFAULT_CLASS_NAME;

                return el.find('span.' + classn).each(function () {
                    var parentNode = this.parentNode;

                    parentNode.replaceChild(this.firstChild, this);
                    parentNode.normalize();
                }).end();
            }

            highlight.clear = removeHighlight;

            return highlight;
        })
        .directive('bbHighlight', ['bbHighlight', function (bbHighlight) {
            return {
                link: function (scope, el, attrs) {
                    function highlight() {
                        var highlightText = scope.$eval(attrs.bbHighlight);
                        
                        bbHighlight.clear(el);

                        if (highlightText) {
                            bbHighlight(el, highlightText);
                        }
                    }
                    
                    scope.$watch(attrs.bbHighlight, function () {
                        highlight();
                    });

                    if (attrs.bbHighlightBeacon) {
                        scope.$watch(attrs.bbHighlightBeacon, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                scope.$evalAsync(highlight);
                            }
                        }, true);
                    }
                    
                    if (attrs.ngBind) {
                        scope.$watch(attrs.ngBind, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                highlight();
                            }
                        });
                    }
                },
                priority: 1, // Make sure ng-bind (which has a priortiy of 0) is processed before this
                restrict: 'A'
            };
        }]);
}());

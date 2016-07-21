/*jslint plusplus: true */
/*global angular */

(function () {
    'use strict';

    var modules = [
            'sky.resources',
            'sky.scrollintoview',
            'sky.modal'
        ];

    function getNewlineCount(value) {
        var matches = value.match(/\n/gi);

        if (matches) {
            return matches.length;
        }

        return 0;
    }

    function createEl($templateCache, templateName) {
        return angular.element($templateCache.get('sky/templates/textexpand/' + templateName + '.html'));
    }

    function BBTextExpandController(textExpandContent, headerContent, closeText) {
        var self = this;
        self.textExpandContent = textExpandContent;
        self.headerContent = headerContent;
        self.closeText = closeText;
    }

    BBTextExpandController.$inject = ['textExpandContent', 'headerContent', 'closeText'];

    angular.module('sky.textexpand', modules)
        .directive('bbTextExpandRepeater', ['$templateCache', 'bbResources', function ($templateCache, bbResources) {
            function link(scope, el, attrs) {
                scope.$watch(attrs.bbTextExpandRepeaterData, function (data) {
                    var length,
                        maxToShow,
                        seeMoreEl,
                        seeMoreText = bbResources.text_expand_see_more,
                        seeLessText = bbResources.text_expand_see_less;

                    if (data) {
                        length = data.length;
                        maxToShow = +attrs.bbTextExpandRepeaterMax;
                        seeMoreEl = createEl($templateCache, 'seemore').text(seeMoreText);

                        if (length > maxToShow) {
                            el.find('li:gt(' + (maxToShow - 1) + ')').addClass('bb-text-expand-toggle-li').hide().end().append(
                                seeMoreEl.click(function () {
                                    seeMoreEl.siblings('.bb-text-expand-toggle-li').toggle(100);
                                    if (seeMoreEl.hasClass('bb-text-expand-see-more')) {
                                        seeMoreEl.text(seeLessText);
                                    } else {
                                        seeMoreEl.text(seeMoreText);
                                    }

                                    seeMoreEl.toggleClass('bb-text-expand-see-more');

                                    return false;
                                })
                            );
                        }
                    }
                });
            }

            return {
                link: link
            };
        }])
        .directive('bbTextExpand', ['$templateCache', 'bbResources', 'bbScrollIntoView', 'bbModal', function ($templateCache, bbResources, bbScrollIntoView, bbModal) {
            function link(scope, el, attrs) {
                var isExpanded,
                    maxLength = +attrs.bbTextExpandMaxLength || 200,
                    maxExpandedLength = +attrs.bbTextExpandMaxExpandedLength || 600,
                    maxNewlines = 1,
                    maxExpandedNewlines = +attrs.bbTexExpandMaxExpandedNewlines || 3;

                function getTruncatedText(value, length, newlines) {
                    var i;

                    if (newlines && getNewlineCount(value) >= newlines) {
                        value = value.replace(/\s+/gi, ' ');
                    }

                    // Jump ahead one character and see if it's a space, and if it isn't,
                    // back up to the first space and break there so a word doesn't get cut
                    // in half.
                    for (i = length; i > length - 10; i--) {
                        if (/\s/.test(value.charAt(i))) {
                            length = i;
                            break;
                        }
                    }

                    return value.substr(0, length);
                }

                scope.$watch(attrs.bbTextExpand, function (newValue) {
                    var collapsedText,
                        expandedText,
                        containerEl,
                        currentHeight,
                        ellipsisEl,
                        expandEl,
                        newHeight,
                        textEl,
                        spaceEl;

                    function animateText(previousText, newText, newExpandText, showEllipsis) {
                        // Measure the current height so we can animate from it.
                        currentHeight = containerEl.height();

                        expandEl.text(newExpandText);
                        textEl.text(newText);

                        newHeight = containerEl.height();

                        if (newHeight < currentHeight) {
                            // The new text is smaller than the old text, so put the old text back before doing
                            // the collapse animation to avoid showing a big chunk of whitespace.
                            textEl.text(previousText);
                        }

                        ellipsisEl.text(showEllipsis ? '...' : '');

                        containerEl
                            .height(currentHeight)
                            .animate(
                                {
                                    height: newHeight
                                },
                                250,
                                function () {
                                    if (newHeight < currentHeight) {
                                        textEl.text(newText);
                                    }
                                    containerEl.css('height', 'auto');
                                }
                            );
                    }

                    containerEl = createEl($templateCache, 'container');

                    /* istanbul ignore else */
                    /* nothing happens when there's no value, so there's nothing to test. */
                    if (newValue) {
                        collapsedText = getTruncatedText(newValue, maxLength, maxNewlines);
                        expandedText = getTruncatedText(newValue, maxExpandedLength, maxExpandedNewlines); // Get text based on max expanded length

                        if (collapsedText !== newValue) {
                            isExpanded = true;

                            textEl = createEl($templateCache, 'text').text(collapsedText);
                            ellipsisEl = createEl($templateCache, 'ellipsis');
                            spaceEl = createEl($templateCache, 'space');
                            expandEl = createEl($templateCache, 'seemore').text(bbResources.text_expand_see_more);


                            containerEl
                                .empty()
                                .append(textEl)
                                .append(ellipsisEl)
                                .append(spaceEl)
                                .append(expandEl);

                            if (getNewlineCount(newValue) >= maxExpandedNewlines || newValue.length > maxExpandedLength) {
                                expandEl.on('click', function () {
                                    bbModal.open({
                                        templateUrl: 'sky/templates/textexpand/expandmodal.html',
                                        controller: BBTextExpandController,
                                        controllerAs: 'expandCtrl',
                                        resolve: {
                                            textExpandContent: function () {
                                                return newValue;
                                            },
                                            headerContent: function () {
                                                return scope.$eval(attrs.bbTextExpandModalTitle) || bbResources.text_expand_modal_title;
                                            },
                                            closeText: function () {
                                                return bbResources.text_expand_close_text;
                                            }
                                        }
                                    });
                                });

                            } else {
                                expandEl.on('click', function () {
                                    if (isExpanded) {
                                        animateText(collapsedText, expandedText, bbResources.text_expand_see_less, (expandedText !== newValue));
                                    } else {
                                        animateText(expandedText, collapsedText, bbResources.text_expand_see_more, true);
                                    }

                                    bbScrollIntoView(expandEl);
                                    isExpanded = !isExpanded;

                                    return false;
                                });
                            }


                        } else {
                            containerEl.text(newValue);
                        }
                    }

                    el.empty().append(containerEl);

                    /* istanbul ignore next */
                    /* these internal variables can't be tested. */
                    el.on('$destroy', function () {
                        containerEl = null;
                        expandEl = null;
                        textEl = null;
                        spaceEl = null;
                    });
                });
            }

            return {
                link: link
            };
        }]);
}());

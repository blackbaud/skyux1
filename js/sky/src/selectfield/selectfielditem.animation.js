/*global angular */

(function () {
    'use strict';

    function bbSelectFieldMultipleItemAnimation() {
        var duration = 250,
            slideOptions;

        function getFadeOptions(doneFn) {
            return {
                duration: duration,
                always: doneFn,
                queue: false
            };
        }

        slideOptions = {
            duration: duration,
            queue: false
        };

        return {
            enter: function (el, doneFn) {
                el
                    .css({
                        display: 'none',
                        opacity: 0
                    })
                    .slideDown(slideOptions)
                    .animate({
                        opacity: 1
                    }, getFadeOptions(doneFn));
            },
            leave: function (el, doneFn) {
                // Take focus off the close button
                el.find('.close').blur();

                el
                    .slideUp(slideOptions)
                    .fadeOut(getFadeOptions(doneFn));
            }
        };
    }

    angular.module('sky.selectfield.item.animation', [])
        .animation('.bb-select-field-multiple-item', bbSelectFieldMultipleItemAnimation);
}());

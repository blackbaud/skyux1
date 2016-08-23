/*global angular */

(function () {
    'use strict';

    function bbSelectFieldMultipleItemAnimation() {
        var duration = 250;

        function getFadeOptions(doneFn) {
            return {
                duration: duration,
                always: doneFn,
                queue: false
            };
        }

        return {
            enter: function (el, doneFn) {
                el
                    .css({
                        opacity: 0
                    })
                    .animate({
                        opacity: 1,
                        display: 'inline-flex'
                    }, getFadeOptions(doneFn));
            },
            leave: function (el, doneFn) {
                // Take focus off the close button
                el.find('.close').blur();

                el.fadeOut(getFadeOptions(doneFn));
            }
        };
    }

    angular.module('sky.selectfield.item.animation', [])
        .animation('.bb-select-field-multiple-item', bbSelectFieldMultipleItemAnimation);
}());

/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbProfilePhoto($window, bbPalette) {
        return {
            scope: {},
            bindToController: {
                url: '=bbProfilePhotoUrl',
                name: '=bbProfilePhotoName'
            },
            controller: angular.noop,
            controllerAs: 'bbProfilePhoto',
            link: function (scope, el, attr, vm) {
                var templateLoaded;

                function setImageUrl(url) {
                    el.find('.bb-profile-photo').css('background-image', 'url(' + url + ')');
                }

                function getInitial(name) {
                    return name.charAt(0).toUpperCase();
                }

                function getInitials(name) {
                    var initials,
                        nameSplit;

                    nameSplit = name.split(' ');
                    initials = getInitial(nameSplit[0]);

                    /* istanbul ignore else this is tested through a visual regression test */
                    if (nameSplit.length > 1) {
                        initials += getInitial(nameSplit[nameSplit.length - 1]);
                    }

                    return initials;
                }

                function getPlaceholderColor(name) {
                    var colorIndex,
                        colors = bbPalette.getColorSequence(6),
                        seed;

                    // Generate a unique-ish color based on the record name.  This is deterministic
                    // so that a given name will always generate the same color.
                    seed = name.charCodeAt(0) + name.charCodeAt(name.length - 1) + name.length;
                    colorIndex = Math.abs(seed % colors.length);

                    return colors[colorIndex];
                }

                function drawPlaceolderImage() {
                    var canvas,
                        context,
                        devicePixelRatio,
                        fontSize = "46px",
                        initials,
                        name,
                        size = 100;

                    name = vm.name;
                    initials = getInitials(name);

                    canvas = el.find('.bb-profile-photo-initials')[0];
                    context = canvas.getContext('2d');

                    devicePixelRatio = $window.devicePixelRatio;

                    /* istanbul ignore else */
                    if (devicePixelRatio) {
                        $(canvas)
                            .attr('width', size * devicePixelRatio)
                            .attr('height', size * devicePixelRatio);

                        context.scale(devicePixelRatio, devicePixelRatio);
                    }

                    context.fillStyle = getPlaceholderColor(name);
                    context.fillRect (0, 0, canvas.width, canvas.height);
                    context.font = fontSize + ' Arial';
                    context.textAlign = 'center';
                    context.fillStyle = '#FFF';
                    context.fillText(initials, size * 0.5, size * (2 / 3));
                }

                function loadPhoto() {
                    if (templateLoaded) {
                        if (vm.url) {
                            setImageUrl(vm.url);
                        } else {
                            drawPlaceolderImage();
                        }
                    }
                }

                vm.onTemplateLoad = function () {
                    templateLoaded = true;
                };

                scope.$watch(function () {
                    return templateLoaded;
                }, loadPhoto);

                scope.$watch(function () {
                    return vm.url;
                }, loadPhoto);
            },
            templateUrl: 'sky/templates/profilephoto/profilephoto.directive.html'
        };
    }

    bbProfilePhoto.$inject = ['$window', 'bbPalette'];

    angular.module('sky.profilephoto.directive', ['sky.palette'])
        .directive('bbProfilePhoto', bbProfilePhoto);
}(jQuery));

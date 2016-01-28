/*global angular, jQuery */

/** @module Profile Photo
 @icon user
 @summary The profile photo displays an image with the option to allow the user to change the image.
 @description The profile photo displays an image for a record with the option to allow the user to change the image.  It is typically used as a profile photo much like on social media sites.

 In addition to displaying the photo you specify, the profile photo can fill in for missing photos by displaying the initials of a name you specify.  It also optionally allows the user to click the photo or drag a new photo onto it to change the photo.

 ### Profile Photo Settings
     - `bb-profile-photo-src` &mdash; A reference to a URL or `File` object representing the profile photo.
     - `bb-profile-photo-name` &mdash; The name of the record represented by the profile photo.  When no image is specified for `bb-profile-photo-src` the initials will be extracted from the name by pulling the first letter of the first word in the name and the first letter of the last word in the name.  For best results you will want to specify a name that does not contain a prefix (e.g. "Dr.", "Mrs.") or suffix (e.g. "Jr.", "Esq.") so that the initials can be properly extracted.  If you already know the initials you may provide them separated by a space (e.g. "R H").
     - `bb-profile-photo-change` &mdash; When you specify a function for this attribute the profile photo will allow the user to select a new photo in much the same way that the `bb-file-drop` directive functions.  When the user selects a new photo the specified function will be called with the `File` object representing the new image that was chosen.  This file can then be uploaded and the `bb-profile-photo-src` property updated to show the new photo either with the provided File or the URL where the image was uploaded.
**/

(function ($) {
    'use strict';

    function bbProfilePhoto($window, bbPalette) {
        function link(scope, el, attrs, vm) {
            var blobUrl,
                templateLoaded;

            function setImageUrl(url) {
                el.find('.bb-profile-photo-image').css('background-image', 'url(' + url + ')');
            }

            function getInitial(name) {
                return name.charAt(0).toUpperCase();
            }

            function getInitials(name) {
                var initials,
                    nameSplit;

                if (name) {
                    nameSplit = name.split(' ');
                    initials = getInitial(nameSplit[0]);

                    /* istanbul ignore else this is tested through a visual regression test */
                    if (nameSplit.length > 1) {
                        initials += getInitial(nameSplit[nameSplit.length - 1]);
                    }
                }

                return initials;
            }

            function getPlaceholderColor(name) {
                var colorIndex,
                    colors = bbPalette.getColorSequence(6),
                    seed;

                if (name) {
                    // Generate a unique-ish color based on the record name.  This is deterministic
                    // so that a given name will always generate the same color.
                    seed = name.charCodeAt(0) + name.charCodeAt(name.length - 1) + name.length;
                    colorIndex = Math.abs(seed % colors.length);
                } else {
                    colorIndex = 0;
                }

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

                name = vm.bbProfilePhotoName;
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
                context.fillRect(0, 0, canvas.width, canvas.height);

                if (initials) {
                    context.font = fontSize + ' Arial';
                    context.textAlign = 'center';
                    context.fillStyle = '#FFF';
                    context.fillText(initials, size * 0.5, size * (2 / 3));
                }
            }

            function revokeBlobUrl() {
                if (blobUrl) {
                    $window.URL.revokeObjectURL(blobUrl);
                    blobUrl = null;
                }
            }

            function loadPhoto() {
                var src,
                    url;

                revokeBlobUrl();

                if (templateLoaded) {
                    src = vm.bbProfilePhotoSrc;

                    if (src) {
                        if (src instanceof $window.File) {
                            url = $window.URL.createObjectURL(src);

                            // Keep the last blob URL around so we can revoke it later.
                            // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
                            blobUrl = url;
                        } else {
                            url = src;
                        }

                        setImageUrl(url);
                    } else {
                        drawPlaceolderImage();
                    }
                }
            }

            vm.onTemplateLoad = function () {
                templateLoaded = true;
            };

            vm.photoDrop = function (files) {
                vm.bbProfilePhotoChange({
                    file: files[0]
                });
            };

            if (attrs.bbProfilePhotoChange) {
                vm.canChange = true;
            }

            scope.$watch(function () {
                return templateLoaded;
            }, loadPhoto);

            scope.$watch(function () {
                return vm.bbProfilePhotoSrc;
            }, loadPhoto);

            scope.$on('$destroy', function () {
                revokeBlobUrl();
            });
        }

        return {
            scope: {},
            bindToController: {
                bbProfilePhotoSrc: '=',
                bbProfilePhotoName: '=',
                bbProfilePhotoChange: '&'
            },
            controller: angular.noop,
            controllerAs: 'bbProfilePhoto',
            link: link,
            templateUrl: 'sky/templates/profilephoto/profilephoto.directive.html'
        };
    }

    bbProfilePhoto.$inject = ['$window', 'bbPalette'];

    angular.module('sky.profilephoto.directive', ['sky.palette'])
        .directive('bbProfilePhoto', bbProfilePhoto);
}(jQuery));

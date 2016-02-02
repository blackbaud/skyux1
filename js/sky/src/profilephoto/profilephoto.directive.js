/*global angular, jQuery */

/** @module Profile Photo
 @icon user
 @summary The profile photo component displays an image. It includes an option to let users change the image.
 @description The profile photo directive displays an image to identify a record. Typically, the directive displays profile photos like on social media sites.

 The directive also includes an option to let users change the image. To select a different image, users can click the image or drag another image on top of it. In addition, when images are missing, the profile photo directive can display the initials of a name that you provide. 

 ### Profile Photo Settings
    - `bb-profile-photo` &mdash; Displays a profile image to identify a record.
        - `bb-profile-photo-src` &mdash; Provides a reference to a URL or `File` object that represents the profile image.
        - `bb-profile-photo-name` &mdash; Specifies the name of the record that the profile photo represents. If `bb-profile-photo-src` does not specify an image, the directive extracts initials from the first and last words of this name and displays them in place of the missing image. To ensure that the directive extracts the correct initials, specify a name with no prefix (e.g. "Dr.", "Mrs.") or suffix (e.g. "Jr.", "Esq."). You can also provide the initials with a space between them (e.g. "R H").
        - `bb-profile-photo-change` &mdash; Specifies a function to allow users to select different images, much like [the `bb-file-drop` directive](../fileattachments). When a user changes an image, the directive calls this function with the `File` object that represents the new image. The directive then uploads the image and updates the `bb-profile-photo-src` property with the provided `File` object or the URL of the uploaded image.
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

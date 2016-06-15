/*global angular, jQuery */

(function ($) {
    'use strict';

    function Controller($filter, $templateCache, $window, bbAvatarConfig, bbErrorModal, bbFormat, bbPalette, bbResources, $element, $scope) {
        var vm = this, blobUrl, templateLoaded;

        function setImageUrl(url) {
            $element.find('.bb-avatar-image').css('background-image', 'url(' + url + ')');
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

                /* istanbul ignore else */ 
                /* this is tested through a visual regression test */
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

            name = vm.bbAvatarName;
            initials = getInitials(name);

            canvas = $element.find('.bb-avatar-initials')[0];
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
                src = vm.bbAvatarSrc;

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
        function handleInvalidFileDrop(rejectedFile) {
        
            var errorDescription,
            errorTitle,
            maxFileSizeFormatted;

            if (rejectedFile.type.toUpperCase().indexOf('IMAGE/') !== 0) {
                errorDescription = bbResources.avatar_error_not_image_description;
                errorTitle = bbResources.avatar_error_not_image_title;
            } else {
                maxFileSizeFormatted = $filter('bbFileSize')(bbAvatarConfig.maxFileSize);

                errorDescription = bbFormat.formatText(bbResources.avatar_error_too_large_description, maxFileSizeFormatted);
                errorTitle = bbResources.avatar_error_too_large_title;
            }

            bbErrorModal.open({
                errorDescription: errorDescription,
                errorTitle: errorTitle
            });
        }

        vm.onTemplateLoad = function () {
            templateLoaded = true;
        };

        vm.photoDrop = function (files, rejectedFiles) {
            if (angular.isArray(rejectedFiles) && rejectedFiles.length > 0) {
                handleInvalidFileDrop(rejectedFiles[0]);
            } else {
                vm.bbAvatarChange({
                    file: files[0]
                });
            }
        };

        vm.showInitials = function () {
            return !!(vm.bbAvatarName && !vm.bbAvatarSrc);
        };

        if (angular.isFunction(vm.bbAvatarChange)) {
            vm.canChange = true;
        }

        $scope.$watch(function () {
            return templateLoaded;
        }, loadPhoto);

        $scope.$watch(function () {
            return vm.bbAvatarSrc;
        }, loadPhoto);

        $scope.$watch(function () {
            return vm.bbAvatarName;
        }, loadPhoto);

        $scope.$on('$destroy', function () {
            revokeBlobUrl();
        });

        vm.maxFileSize = bbAvatarConfig.maxFileSize;
    
    }
    
    Controller.$inject = ['$filter', '$templateCache', '$window', 'bbAvatarConfig', 'bbErrorModal', 'bbFormat', 'bbPalette', 'bbResources', '$element', '$scope'];

    function template($element, $templateCache, bbAvatarConfig) {
        var dropEl;

        $element.html($templateCache.get('sky/templates/avatar/avatar.component.html'));

        dropEl = $element.find('.bb-avatar-file-drop');

        dropEl.attr('bb-file-drop-max-size', bbAvatarConfig.maxFileSize);
    }
    
    template.$inject = ['$element', '$templateCache', 'bbAvatarConfig'];
    
    angular.module('sky.avatar.component', ['sky.avatar.config', 'sky.error', 'sky.format', 'sky.palette', 'sky.resources'])
        .component('bbAvatar', {
            bindings: {
                bbAvatarSrc: '=',
                bbAvatarName: '=',
                bbAvatarChange: '&'
            }, 
            controller: Controller,
            template: template
        });
    
}(jQuery));

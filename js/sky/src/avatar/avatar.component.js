/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbAvatar($filter, $templateCache, $window, bbAvatarConfig, bbErrorModal, bbFormat, bbPalette, bbResources) {
        

        function template(el) {
            var dropEl;

            el.html($templateCache.get('sky/templates/avatar/avatar.component.html'));

            dropEl = el.find('.bb-avatar-file-drop');

            dropEl.attr('bb-file-drop-max-size', bbAvatarConfig.maxFileSize);
        }
    }

    bbAvatar.$inject = ['$filter', '$templateCache', '$window', 'bbAvatarConfig', 'bbErrorModal', 'bbFormat', 'bbPalette', 'bbResources'];

    angular.module('sky.avatar.component', ['sky.avatar.config', 'sky.error', 'sky.format', 'sky.palette', 'sky.resources'])
        .component('bbAvatar', {
            bindings: {
                bbAvatarSrc: '=',
                bbAvatarName: '=',
                bbAvatarChange: '&'
            },
            controller: angular.noop,
            controllerAs: 'bbAvatar'
        });
}(jQuery));

/*global angular */

(function () {
    'use strict';

    function bbProfilePhoto() {
        return {
            scope: {},
            bindToController: {
                url: '=bbProfilePhotoUrl'
            },
            controller: angular.noop,
            controllerAs: 'bbProfilePhoto',
            link: function (scope, el, attr, vm) {
                function setImageUrl(url) {
                    el.find('.bb-profile-photo').css('background-image', 'url(\'' + url + '\')');
                }

                scope.$watch(function () {
                    return vm.url;
                }, function (newValue) {
                    if (newValue) {
                        setImageUrl(newValue);
                    }
                });
            },
            templateUrl: 'sky/templates/profilephoto/profilephoto.directive.html'
        };
    }

    angular.module('sky.profilephoto')
        .directive('bbProfilePhoto', bbProfilePhoto);
}());

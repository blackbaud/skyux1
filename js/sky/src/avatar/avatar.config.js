/*global angular */

(function () {
    'use strict';

    var bbAvatarConfig = {
        maxFileSize: 500000
    };

    angular.module('sky.avatar.config', [])
        .constant('bbAvatarConfig', bbAvatarConfig);
}());

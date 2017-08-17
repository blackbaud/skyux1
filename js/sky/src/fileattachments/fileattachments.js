/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.fileattachments',
        [
            'sky.fileattachments.filedrop',
            'sky.fileattachments.fileitem',
            'sky.fileattachments.filesingle',
            'sky.fileattachments.filesize'
        ]
    );
}());

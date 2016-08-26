/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.modal',
        [
            'sky.modal.directive',
            'sky.modal.body.directive',
            'sky.modal.header.directive',
            'sky.modal.footer.directive',
            'sky.modal.footer.button.directive',
            'sky.modal.footer.button.primary.directive',
            'sky.modal.footer.button.cancel.directive',
            'sky.modal.factory'
        ]
    );
}());

/*global angular */

(function () {
    'use strict';

    function ToastTestController(bbToast, $templateCache) {
        var self = this;

        $templateCache.put('bbToast/samples/complexToast.html',
            '<div>' +
            'Open for <span>{{templateToastCtrl.timeOpen}}</span> seconds' +
            '</div>' +
            '<br />' +
            '<div>{{templateToastCtrl.message}}</div');

        self.openMessage = function () {
            bbToast.open({ message: "A simple message in which <html> is ignored." });
        };

        self.openTemplate = function () {
            bbToast.open({
                templateUrl: "bbToast/samples/complexToast.html",
                controller: 'TemplatedToastController as templateToastCtrl',
                resolve: {
                    message: function () {
                        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, massa ac sollicitudin vestibulum, nulla nulla faucibus.';
                    }
                }
            });
        };
    }

    function TemplatedToastController($interval, message) {
        var self = this;

        self.timeOpen = 0;
        self.message = message;

        $interval(function () {
            self.timeOpen += 1;
        }, 20000);
    }

    ToastTestController.$inject = ['bbToast', '$templateCache'];
    TemplatedToastController.$inject = ['$interval', 'message'];

    angular.module('stache')
        .controller('ToastTestController', ToastTestController)
        .controller('TemplatedToastController', TemplatedToastController);

}());

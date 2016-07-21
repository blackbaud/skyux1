/*global angular */

(function () {
    'use strict';

    function bbErrorModal(bbModal) {
        return {
            open: function (options) {
                return bbModal.open({
                    controller: 'BBErrorModalController as bbErrorModal',
                    templateUrl: 'sky/templates/error/errormodal.template.html',
                    resolve: {
                        options: function () {
                            return options;
                        }
                    }
                });
            }
        };
    }

    bbErrorModal.$inject = ['bbModal'];

    angular.module('sky.errormodal.service', ['sky.errormodal.controller', 'sky.modal'])
        .factory('bbErrorModal', bbErrorModal);
}());

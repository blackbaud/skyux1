/*jshint browser: true */
/*global angular, jQuery */

(function () {
    'use strict';

    function Controller(bbResources, $element) {
        var btnEl = $element.find('.btn');
        
        if (btnEl.children().length === 0) {
            btnEl.append("<span>" + bbResources.modal_footer_primary_button + "</span>");
        }
    }
    
    Controller.$inject = ['bbResources', '$element'];
    
    angular.module('sky.modalfooterbuttonprimary.component', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .component('bbModalFooterButtonPrimary', {
            transclude: true,
            require: {
                bbModalFooter: '^bbModalFooter'
            },
            templateUrl: 'sky/templates/modal/modalfooterbuttonprimary.html', 
            controller: Controller
        });
}());

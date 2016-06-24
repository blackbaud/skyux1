/*jshint browser: true */
/*global angular, jQuery */

(function () {
    'use strict';
    
    function Controller(bbResources, $element) {
        var btnEl = $element.find('.btn');
        
        if (btnEl.children().length === 0) {
            btnEl.append("<span>" + bbResources.modal_footer_cancel_button + "</span>");
        }
    }
    
    Controller.$inject = ['bbResources', '$element'];
    
    angular.module('sky.modalfooterbuttoncancel.component', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .component('bbModalFooterButtonCancel',  {
            replace: true,
            transclude: true,
            require: '^bbModalFooter',
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooterbuttoncancel.html',
            controller: Controller
        });
}(jQuery));

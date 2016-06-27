/*global angular */

(function () {
    'use strict';

    angular.module('sky.modal', 
    ['sky.modal.directive', 
    'sky.modalbody.directive', 
    'sky.modalfooter.directive', 
    'sky.modalfooterbutton.directive', 
    'sky.modalfooterbuttoncancel.directive',
    'sky.modalfooterbuttonprimary.directive', 
    'sky.modalheader.directive',  
    'sky.modal.factory']);

}());
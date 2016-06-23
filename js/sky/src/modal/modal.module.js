/*global angular */

(function () {
    'use strict';

    angular.module('sky.modal', 
    ['sky.modal.directive', 
    'sky.modalbody.directive', 
    'sky.modalfooter.component', 
    'sky.modalfooterbutton.component', 
    'sky.modalfooterbuttoncancel.directive',
    'sky.modalfooterbuttonprimary.component', 
    'sky.modalheader.component',  
    'sky.modal.factory']);

}());
/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.modal', 
    ['sky.modal.directive', 
    'sky.modalbody.directive', 
    'sky.modalheader.directive', 
    'sky.modalfooter.directive', 
    'sky.modalfooterbutton.directive', 
    'sky.modalfooterbuttoncancel.directive',
    'sky.modalfooterbuttonprimary.directive', 
    'sky.modal.factory']);
    
}());

/*global angular */

(function () {
    'use strict';
    
    function FileAttachmentTestController() {
        var self = this;
        
        self.fileLinked = function (link) {
            angular.noop();
        };
        
        self.deleteAttachment = function (file) {
            angular.noop();
        };
        
        self.fileDroppped = function (files, rejectedFiles) {
            angular.noop();
        };
        
        self.item = {
            name: 'myfile.pdf',
            size: 50,
            type: 'pdf'
        };
    }
    
    angular.module('screenshots', ['sky'])
    .controller('FileAttachmentTestController', FileAttachmentTestController);
}());
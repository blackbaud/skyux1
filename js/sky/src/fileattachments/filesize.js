/*global angular */

(function () {
    'use strict';
    
    function bbFileSize($filter, bbFormat, bbResources) {
        return function (input) {
            var decimalPlaces = 0,
                dividend = 1,
                formattedSize,
                roundedSize,
                template;
            
            if (input === null || angular.isUndefined(input)) {
                return '';
            }
            
            if (Math.abs(input) === 1) {
                template = bbResources.file_size_b_singular;
            } else if (input < 1000) {
                template = bbResources.file_size_b_plural;
            } else if (input < 1e6) {
                template = bbResources.file_size_kb;
                dividend = 1000;
            } else if (input < 1e9) {
                template = bbResources.file_size_mb;
                dividend = 1e6;
                decimalPlaces = 1;
            } else {
                template = bbResources.file_size_gb;
                dividend = 1e9;
                decimalPlaces = 1;
            }

            roundedSize = Math.floor(input / (dividend / Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces);

            formattedSize = $filter('number')(roundedSize);

            return bbFormat.formatText(template, formattedSize);
        };
    }
    
    bbFileSize.$inject = ['$filter', 'bbFormat', 'bbResources'];
    
    angular.module('sky.fileattachments.filesize', ['sky.format', 'sky.resources'])
        .filter('bbFileSize', bbFileSize);
}());
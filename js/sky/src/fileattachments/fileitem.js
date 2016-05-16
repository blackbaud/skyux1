/*global angular */

(function () {
    'use strict';

    function bbFileItem() {
        return {
            link: function (scope) {
                function getFileTypeUpper() {
                    var fileType = '';

                    if (scope.item) {
                        fileType = scope.item.type || '';
                    }

                    return fileType.toUpperCase();
                }

                function getFileExtensionUpper() {
                    var extension = '',
                        name;

                    if (scope.item) {
                        name = scope.item.name || '';

                        extension = name.substr(name.lastIndexOf('.')) || '';
                    }

                    return extension.toUpperCase();
                }

                scope.bbFileItem = {
                    isFile: function () {
                        var item = scope.item;

                        return item && angular.isDefined(item.size) && item.size !== '' && item.size !== null;
                    },

                    isImg: function () {
                        var fileTypeUpper = getFileTypeUpper(),
                            slashIndex;

                        slashIndex = fileTypeUpper.indexOf('/');

                        if (slashIndex >= 0) {
                            switch (fileTypeUpper.substr(fileTypeUpper.indexOf('/') + 1)) {
                            case 'BMP':
                            case 'GIF':
                            case 'JPEG':
                            case 'PNG':
                                return true;
                            }
                        }

                        return false;
                    }
                };

                scope.$watch('item.type', function () {
                    var cls,
                        extensionUpper = getFileExtensionUpper(),
                        fileTypeUpper;

                    switch (extensionUpper) {
                        case '.PDF':
                            cls = 'pdf';
                            break;
                        case '.GZ':
                        case '.RAR':
                        case '.TGZ':
                        case '.ZIP':
                            cls = 'archive';
                            break;
                        case '.PPT':
                        case '.PPTX':
                            cls = 'powerpoint';
                            break;
                        case '.DOC':
                        case '.DOCX':
                            cls = 'word';
                            break;
                        case '.XLS':
                        case '.XLSX':
                            cls  = 'excel';
                            break;
                        case '.TXT':
                            cls = 'text';
                            break;
                        case '.HTM':
                        case '.HTML':
                            cls = 'code';
                            break;
                    }

                    if (!cls) {
                        fileTypeUpper = getFileTypeUpper();

                        switch (fileTypeUpper.substr(0, fileTypeUpper.indexOf('/'))) {
                            case 'AUDIO':
                                cls = 'audio';
                                break;
                            case 'IMAGE':
                                // Normally images are displayed as thumbnails, but if an image type is not recognized
                                // as being widely supported by modern browsers (e.g. TIFF files) then an icon should
                                // be displayed instead.
                                cls = 'image';
                                break;
                            case 'TEXT':
                                cls = 'text';
                                break;
                            case 'VIDEO':
                                cls = 'video';
                                break;
                        }
                    }

                    scope.bbFileItem.otherCls = 'fa-file-' + (cls ? cls + '-' : '') + 'o';
                });
            },
            scope: {
                item: '=bbFileItem',
                itemDelete: '&bbFileItemDelete'
            },
            templateUrl: 'sky/templates/fileattachments/fileitem.html',
            transclude: true
        };
    }

    angular.module('sky.fileattachments.fileitem', ['ngFileUpload', 'sky.fileattachments.filesize', 'sky.resources'])
        .directive('bbFileItem', bbFileItem);
}());

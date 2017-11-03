/*global angular */

(function () {
    'use strict';

    function bbFileSingle($parse, $templateCache) {
        return {
            link: function (scope) {
                function getFileTypeUpper() {
                    var fileType = '';

                    if (scope.bbFileSingleItem) {
                        fileType = scope.bbFileSingleItem.type || '';
                    }

                    return fileType.toUpperCase();
                }

                scope.bbFileSingle = {
                    fileChange: function ($files, $event, $invalidFiles) {
                        if ($files.length > 0 || $invalidFiles.length > 0) {

                            if ($files.length === 1) {
                                scope.bbFileSingleItem = $files[0];
                            }

                            scope.bbFileSingleChange({
                                file: scope.bbFileSingleItem,
                                rejectedFiles: $invalidFiles
                            });
                        }
                    },
                    validate: function ($file) {
                        return scope.bbFileSingleValidateFn({
                            file: $file
                        });
                    },
                    remove: function () {
                        var removed = scope.bbFileSingleItem;
                        scope.bbFileSingleItem = null;
                        scope.bbFileSingleRemove(removed);
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
                    },
                    action: function () {
                        scope.bbFileSingleLinkAction();
                    }
                };
            },
            scope: {
                bbFileSingleChange: '&',
                bbFileSingleItem: '=',
                bbFileSingleLinkAction: '&?',
                bbFileSingleRemove: '&',
                bbFileSingleRequired: '&?',
                bbFileSingleValidateFn: '&'
            },
            template: function (el, attrs) {
                var dropEl,
                    inputEl,
                    selectEl;

                el.html($templateCache.get('sky/templates/fileattachments/filesingle.html'));

                dropEl = el.find('.bb-file-single-drop');
                inputEl = el.find('.bb-file-single-input');
                selectEl = el.find('.bb-file-single-select');

                dropEl.attr({
                    'ngf-allow-dir': 'true',
                    'ngf-pattern': attrs.bbFileSingleAccept,
                    'ngf-multiple': 'false',
                    'ngf-min-size': attrs.bbFileSingleMinSize || '0',
                    'ngf-max-size': attrs.bbFileSingleMaxSize || '500000'
                });

                selectEl.attr({
                    'ngf-allow-dir': 'true',
                    'ngf-pattern': attrs.bbFileSingleAccept,
                    'ngf-multiple': 'false',
                    'ngf-min-size': attrs.bbFileSingleMinSize || '0',
                    'ngf-max-size': attrs.bbFileSingleMaxSize || '500000'
                });

                inputEl.attr({
                    'id': attrs.bbFileSingleId,
                    'name': attrs.bbFileSingleId
                });
            }
        };
    }

    bbFileSingle.$inject = ['$parse', '$templateCache'];

    angular.module('sky.fileattachments.filesingle', ['ngFileUpload', 'sky.resources'])
        .directive('bbFileSingle', bbFileSingle);
}());

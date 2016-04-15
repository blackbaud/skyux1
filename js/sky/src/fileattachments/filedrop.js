/*global angular, jQuery */

(function ($) {
    'use strict';

    function run($window) {
        $($window).on('dragover drop', function (e) {
            if (!$(e.target).hasClass('bb-file-drop-target')) {
                e.preventDefault();
            }
        });
    }

    run.$inject = ['$window'];

    function bbFileDrop($parse, $templateCache) {
        return {
            link: function (scope, el, attrs) {
                scope.bbFileDrop = {
                    hasTranscludeContents: $.trim(el.find('.bb-file-drop-contents-custom').html()).length > 0,
                    allowLinks: angular.isDefined(attrs.bbFileDropLink),
                    addLink: function ($event) {
                        $event.preventDefault();
                        scope.bbFileDropLinkChange({
                            link: {
                                url: scope.bbFileDrop.url
                            }
                        });

                        scope.bbFileDrop.url = null;
                    },
                    fileChange: function ($files, $event, $invalidFiles) {
                        scope.bbFileDropChange({
                            files: $files,
                            rejectedFiles: $invalidFiles
                        });
                    }
                };
            },
            scope: {
                bbFileDropChange: '&',
                bbFileDropLinkChange: '&'
            },
            template: function (el, attrs) {
                var dropEl;

                el.html($templateCache.get('sky/templates/fileattachments/filedrop.html'));

                dropEl = el.find('.bb-file-drop');

                dropEl.attr({
                    'ngf-allow-dir': attrs.bbFileDropAllowDir,
                    'ngf-pattern': attrs.bbFileDropAccept,
                    'ngf-multiple': attrs.bbFileDropMultiple || 'true',
                    'ngf-min-size': attrs.bbFileDropMinSize || '0',
                    'ngf-max-size': attrs.bbFileDropMaxSize || '500000'
                });

                if (angular.isDefined(attrs.bbFileDropNoclick)) {
                    dropEl.addClass('bb-file-drop-noclick');
                } else {
                    dropEl.attr('ngf-select', '');
                }
            },
            transclude: true
        };
    }

    bbFileDrop.$inject = ['$parse', '$templateCache'];

    angular.module('sky.fileattachments.filedrop', ['ngFileUpload', 'sky.resources'])
        .run(run)
        .directive('bbFileDrop', bbFileDrop);
}(jQuery));

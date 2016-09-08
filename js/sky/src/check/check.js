/*jshint browser: true */
/*global angular */

(function () {
    'use strict';
    angular.module('sky.check', [])
        .directive('bbCheck', ['$templateCache', '$compile', function ($templateCache, $compile) {
            function createEl(name, scope) {
                var templateHtml;
                
                templateHtml = $templateCache.get('sky/templates/check/' + name + '.html');
                if (scope) {
                    templateHtml = $compile(templateHtml)(scope);
                }
                return angular.element(templateHtml);
            }

            return {
                link: function (scope, el, attr) {
                    var labelEl = el.parent('label'),
                        styledEl;

                    if (labelEl.length < 1) {
                        el.wrap(createEl('wrapper'));
                    } else {
                        labelEl.addClass('bb-check-wrapper');

                        /*  wrap non-whitespace label text to set
                            vertical-align middle properly */ 
                        labelEl.contents()
                        .filter(function () {
                            return this.nodeType === 3 && /\S/.test(this.textContent);
                        })
                        .wrap(createEl('labeltext'));
                    }
                    
                    
                    styledEl = createEl(('styled' + attr.type), scope);


                    el.after(styledEl);
                }
            };
        }]);
}());

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
                require: 'ngModel',
                link: function (scope, el, attr, ngModel) {
                    var labelEl = el.parent('label'),
                        styledEl,
                        typeClass;

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
                    
                    scope.checkModel = ngModel;
                    
                    if (attr.type === 'radio') {

                        scope.$watch(function () {
                            return scope.$eval(attr.ngValue);
                        }, function (newValue) {
                           scope.checkValue = newValue; 
                        });

                        typeClass = 'bb-check-radio';
                    } else {
                        typeClass = 'bb-check-checkbox';
                    }
                    
                    styledEl = createEl(('styled' + attr.type), scope);
                    
                    styledEl.addClass(typeClass);

                    el.after(styledEl);
                }
            };
        }]);
}());

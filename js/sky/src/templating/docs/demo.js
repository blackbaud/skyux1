/*global angular */
(function () {
    'use strict';

    function TemplateTestController() {
        var self = this;
        self.template = '{0} is an important number. {1} is important, too, but not as important as {0}.';

        self.number1 = '39,210';
        self.number2 = '78';
    }

    angular.module('stache').controller('TemplateTestController', TemplateTestController);
}());

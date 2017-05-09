///* global angular */
//(function () {
//    'use strict';

//    angular.module('sky.splitpanel.list.fixed.header.filter.component', [])
//        .directive('bbSplitpanelListFixedHeaderFilter',  {
//                templateUrl: 'sky/templates/splitpanel/splitpanel.list.fixed.header.filter.component.html',
//                replace: true,
//                transclude: true,
//        });
//}());


/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.list.fixed.header.filter.component', [])
        .component('bbSplitpanelListFixedHeaderFilter', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.list.fixed.header.filter.component.html',
            transclude: true
        });
}());

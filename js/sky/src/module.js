/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    var modules = [
        'sky.actionbar',
        'sky.alert',
        'sky.autonumeric',
        'sky.avatar',
        'sky.card',
        'sky.check',
        'sky.checklist',
        'sky.chevron',
        'sky.contextmenu',
        'sky.data',
        'sky.datepicker',
        'sky.daterangepicker',
        'sky.error',
        'sky.format',
        'sky.grids',
        'sky.help',
        'sky.helpbutton',
        'sky.highlight',
        'sky.keyinfo',
        'sky.mediabreakpoints',
        'sky.modal',
        'sky.moment',
        'sky.navbar',
        'sky.omnibar',
        'sky.palette',
        'sky.page',
        'sky.pagesummary',
        'sky.pagination',
        'sky.phonefield',
        'sky.popover',
        'sky.reorder',
        'sky.repeater',
        'sky.resources',
        'sky.scrollintoview',
        'sky.selectfield',
        'sky.tabscroll',
        'sky.tabset',
        'sky.tabsref',
        'sky.templates',
        'sky.templating',
        'sky.textexpand',
        'sky.tiles',
        'sky.utilities',
        'sky.validation',
        'sky.viewkeeper',
        'sky.wait',
        'sky.window',
        'sky.wizard'
    ];

    try {
        angular.module('toastr');
        modules.push('sky.toast');
    } catch (ignore) {
        /* The toastr module isn't defined.  Do not load sky.toast module */
    }

    try {
        angular.module('ngFileUpload');
        modules.push('sky.fileattachments');
    } catch (ignore) {

    }

    angular.module('sky', modules);

}());

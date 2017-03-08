/*jshint node: true */

/**
 * Karma configuration options shared between CI and local versions.
 * Files array is set in grunt/test so we can use grunt.config.
 */
module.exports = {
    singleRun: false,
    autoWatch: false,
    basePath: '../../',
    frameworks: [
        'jasmine'
    ],
    // Look into moving this grunt so skyux.paths.libsJs can be used
    files: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-ui-bundle/jquery-ui.js',
        'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js',
        'node_modules/enquire.js/dist/enquire.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-touch/angular-touch.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'libs/easyXDM.js',
        'node_modules/moment/moment.js',
        'node_modules/autonumeric/autonumeric.js',
        'node_modules/free-jqgrid/js/jquery.jqGrid.js',
        'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/block-ui/jquery.blockUI.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
        'node_modules/ng-file-upload/dist/ng-file-upload.js',
        'node_modules/intl-tel-input/build/js/utils.js',
        'node_modules/intl-tel-input/build/js/intlTelInput.min.js',
        'js/sky/src/*/*.module.js',
        'js/sky/src/*/*.js',
        'js/sky/templates/templates.js.tmp',
        'js/sky/test/config.js',
        'js/**/datepicker.spec.js'
    ],
    exclude: [
        'src/**/docs/*'
    ],
    preprocessors: {
        'js/sky/src/*/*.js': [
            'coverage'
        ]
    },
    reporters: [
        'dots',
        'coverage'
    ],
    coverageReporter: {
        dir: 'coverage/',
        reporters: [
            {
                type: 'html'
            },
            {
                type: 'json',
                // Necessary in order to match codecov's auto-detect
                file: 'coverage.json'
            }
        ]
    }
};

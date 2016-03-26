/*global module*/
module.exports = function (grunt, env, utils) {
    'use strict';

    grunt.config.merge({
        skyux: {
            paths: {
                dist: (env.isCurrent(env.SUPPORTED.LOCAL) ? 'bin/' : 'dist/'),
                src: 'js/sky/src/',
                paletteCss: '.tmp/palette/palette.css',
                paletteTemplate: 'js/sky/palette/',
                templates: 'js/sky/templates/',
                skyJs: [
                    '<%= skyux.paths.src %>*/*.module.js',
                    '<%= skyux.paths.src %>*/*.js',
                    '<%= skyux.paths.src %>module.js',
                    '<%= skyux.paths.dist %>js/locales/sky-locale-<%= skyux.defaultLocale %>.js',
                    '<%= skyux.paths.templates %>templates.js.tmp'
                ],
                libsCss: [
                    'bower_components/free-jqgrid/css/ui.jqgrid.css',
                    'bower_components/angular-toastr/dist/angular-toastr.min.css',
                    'bower_components/angular-ui-select/dist/select.min.css'
                ],
                libsJs: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-ui/jquery-ui.js',
                    'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/enquire/dist/enquire.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-messages/angular-messages.js',
                    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/moment/moment.js',
                    'bower_components/autoNumeric/autoNumeric.js',
                    'bower_components/free-jqgrid/js/jquery.jqGrid.js',
                    'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
                    'bower_components/blockui/jquery.blockUI.js',
                    'bower_components/angular-ui-select/dist/select.js',
                    'bower_components/fastclick/lib/fastclick.js',
                    'bower_components/ng-file-upload/ng-file-upload.js',
                    'libs/easyXDM.js'
                ]
            }
        },
        concat_sourcemap: {
            options: {
                sourcesContent: true,
                sourceRoot: '../..'
            },
            dist: {
                files: {
                    '<%= skyux.paths.dist %>js/libs.js': '<%= skyux.paths.libsJs %>',
                    '<%= skyux.paths.dist %>js/sky.js': '<%= skyux.paths.skyJs %>'
                }
            },
            skybundle: {
                files: {
                    '<%= skyux.paths.dist %>js/sky-bundle.js': [
                        '<%= skyux.paths.libsJs %>',
                        '<%= skyux.paths.skyJs %>'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
                    cwd: 'scss',
                    dest: '<%= skyux.paths.dist %>css/fonts'
                }]
            }
        },
        html2js: {
            options: {
                base: 'js/',
                indentString: '    ',
                module: 'sky.templates',
                quoteChar: '\'',
                singleModule: true
            },
            main: {
                src: ['<%= skyux.paths.templates %>**/*.html'],
                dest: '<%= skyux.paths.templates %>templates.js.tmp'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= skyux.paths.dist %>css/sky.css': 'scss/sky.scss'
                }
            },
            palette: {
                options: {
                    sourcemap: 'none',
                    style: 'compact'
                },
                files: {
                    '<%= skyux.paths.paletteCss %>': '<%= skyux.paths.paletteTemplate %>template.scss'
                }
            },
            skybundle: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= skyux.paths.dist %>css/sky-bundle.css': '.tmp/sky-bundle.scss'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= skyux.paths.dist %>css/libs.css': '<%= skyux.paths.libsCss %>'
                }
            }
        },
        // Renamed the original grunt-contrib-watch task
        watchRenamed: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    '<%= skyux.paths.skyJs %>',
                    '<%= skyux.paths.locales %>**/*.*',
                    '<%= skyux.paths.templates %>**/*.html'
                ],
                tasks: ['watch-scripts']
            },
            skylint: {
                files: ['js/sky/linter/skylint.js'],
                tasks: ['uglify:skylint']
            },
            jshint: {
                files: ['gruntfile.js', 'js/**/*.js'],
                tasks: ['lint']
            },
            sass: {
                files: ['scss/**/*.scss'],
                tasks: ['watch-styles']
            }
        },
        uglify: {
            options: {
                // Source map isn't perfect here, but it's serviceable.  Be on the lookout for updates to this task
                // in case it's fixed.
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            libs: {
                options: {
                    sourceMapIn: '<%= skyux.paths.dist %>js/libs.js.map'
                },
                src: ['<%= skyux.paths.dist %>js/libs.js'],
                dest: '<%= skyux.paths.dist %>js/libs.min.js'
            },
            dist: {
                options: {
                    sourceMapIn: '<%= skyux.paths.dist %>js/sky.js.map'
                },
                src: ['<%= skyux.paths.dist %>js/sky.js'],
                dest: '<%= skyux.paths.dist %>js/sky.min.js'
            },
            skybundle: {
                options: {
                    sourceMapIn: '<%= skyux.paths.dist %>js/sky-bundle.js.map'
                },
                src: ['<%= skyux.paths.dist %>js/sky-bundle.js'],
                dest: '<%= skyux.paths.dist %>js/sky-bundle.min.js'
            },
            skylint: {
                src: ['js/sky/linter/skylint.js'],
                dest: '<%= skyux.paths.dist %>js/skylint.min.js'
            }
        }
    });

    function getDestFile(libCss) {
        return libCss.substr(libCss.lastIndexOf('/') + 1).replace('.css', '.scss');
    }

    // Generate our JS config for the bbPalette service
    grunt.registerTask('buildpaletteservice', function () {
        var template = grunt.file.read(grunt.config('skyux.paths.paletteTemplate') + 'template.js'),
            configPath = grunt.config('skyux.paths.src') + 'palette/config.js',
            css = grunt.file.read(grunt.config('skyux.paths.paletteCss')),
            regex = /bb-palette-(.*)-\d+ { background-color: (.*); }/gi,
            matches = {
                multi: [],
                mono: []
            },
            match,
            json;

        match = regex.exec(css);
        while (match) {
            matches[match[1]].push(match[2]);
            match = regex.exec(css);
        }

        json = JSON.stringify(matches, null, 4);
        template = template.replace('/*PALETTE_CONFIG*/', 'bbPaletteConfig = ' + json + ';');
        grunt.file.write(configPath, template);
    });

    grunt.registerTask('skybundlecss', function () {
        var destFile,
            i,
            libCss,
            libsCss,
            skyBundleScss = '',
            n;

        libsCss = grunt.config.get('skyux.paths.libsCss');
        for (i = 0, n = libsCss.length; i < n; i++) {
            libCss = libsCss[i];
            destFile = getDestFile(libCss);

            grunt.file.copy(libCss, '.tmp/' + destFile);

            skyBundleScss += '@import "' + destFile + '";\n';
        }

        skyBundleScss += '@import "../scss/sky-all";';

        grunt.file.write('.tmp/sky-bundle.scss', skyBundleScss);

        grunt.task.run('sass:skybundle');
        grunt.task.run('cleanupskybundlecss');
    });

    grunt.registerTask('cleanupskybundlecss', function () {
        var i,
            libsCss,
            n;

        libsCss = grunt.config.get('skyux.paths.libsCss');
        grunt.file.delete('.tmp/sky-bundle.scss');

        for (i = 0, n = libsCss.length; i < n; i++) {
            grunt.file.delete('.tmp/' + getDestFile(libsCss[i]));
        }
    });

    // The watch task supports the "--rapid" flag.
    grunt.registerTask('scripts', function () {
        utils.run({
            'l10n': true,
            'buildpaletteservice': true,
            'html2js': true,
            'concat_sourcemap': true,
            'uglify': false
        });
    });

    // The styles task supports the "--rapid" flag.
    grunt.registerTask('styles', function () {
        utils.run({
            'sass:dist': true,
            'sass:palette': true,
            'cssmin:dist': false,
            'skybundlecss': true,
            'copy:dist': false
        });
    });

    // The watch task supports the "--rapid" flag.
    grunt.registerTask('watch', function () {
        utils.run({
            'build': false,
            'docs': false,
            'connect:docs': true,
            'karma:watch:start': false,
            'watchRenamed': true
        });
    });

    // The watch-scripts task supports the "--rapid" flag.
    grunt.registerTask('watch-scripts', function () {
        utils.run({
            'scripts': true,
            'karma:watch:run': false,
            'copy:docs': true,
            'docs': true
        });
    });

    // The watch task supports the "--rapid" flag.
    grunt.registerTask('watch-styles', function () {
        utils.run({
            'styles': true,
            'karma:watch:run': false,
            'copy:docs': true,
            'docs': true
        });
    });

    // Main build task
    grunt.registerTask('build', ['styles', 'scripts']);
};

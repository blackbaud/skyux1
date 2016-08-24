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
                    'node_modules/free-jqgrid/css/ui.jqgrid.css',
                    'node_modules/angular-toastr/dist/angular-toastr.min.css',
                    'node_modules/intl-tel-input/build/css/intlTelInput.css'
                ],
                libsJs: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/jquery-ui-bundle/jquery-ui.js',
                    'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js',
                    'node_modules/enquire.js/dist/enquire.js',
                    'node_modules/angular/angular.js',
                    'node_modules/angular-animate/angular-animate.js',
                    'node_modules/angular-messages/angular-messages.js',
                    'node_modules/angular-touch/angular-touch.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.js',
                    'node_modules/moment/moment.js',
                    'node_modules/autonumeric/autonumeric.js',
                    'node_modules/free-jqgrid/js/jquery.jqGrid.js',
                    'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
                    'node_modules/block-ui/jquery.blockUI.js',
                    'node_modules/fastclick/lib/fastclick.js',
                    'node_modules/ng-file-upload/dist/ng-file-upload.js',
                    'node_modules/intl-tel-input/build/js/utils.js',
                    'node_modules/intl-tel-input/build/js/intlTelInput.min.js',
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
                    src: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '!images/*.svg'],
                    cwd: 'scss',
                    dest: '<%= skyux.paths.dist %>css/fonts'
                },
                {
                    expand: true,
                    flatten: true,
                    src: ['images/*.svg', 'images/*.png'],
                    cwd: 'scss',
                    dest: '<%= skyux.paths.dist %>css/images'
                },
                {
                    expand: true,
                    flatten: true,
                    src: ['images/*.png'],
                    cwd: 'node_modules/intl-tel-input/build/img',
                    dest: '<%= skyux.paths.dist %>css/images'
                }]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                sourceMap: true,
                sourceMapInlineSources: true
            },
            dist: {
                files: {
                    '<%= skyux.paths.dist %>css/libs.css': '<%= skyux.paths.libsCss %>'
                }
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
                    style: 'compressed',
                    sourcemap: 'inline'
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
                    sourcemap: 'inline',
                    style: 'compressed'
                },
                files: {
                    '<%= skyux.paths.dist %>css/sky-bundle.css': '.tmp/sky-bundle.scss'
                }
            }
        },
        sri: {
            dist: {
                options: {
                    algorithms: ['sha384'],
                    dest: '<%= skyux.paths.dist %>sri.json'
                },
                src: [
                    '<%= skyux.paths.dist %>/**/*.js',
                    '<%= skyux.paths.dist %>/**/*.css'
                ]
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

    function generateRequires(depList, skyContents) {
        var contents = '',
            distDirectory = 'dist/';

        depList.forEach(function (dep) {
            contents += 'require("./' + dep + '");' + grunt.util.linefeed;
        });

        contents += 'require("./' + distDirectory + skyContents + '");' + grunt.util.linefeed;
        contents +=  grunt.util.linefeed;

        return contents;
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

    grunt.registerTask('generateIndexJs', function () {
        var libs = grunt.config.get('skyux').paths.libsJs,
            cssLibs = grunt.config.get('skyux').paths.libsCss,
            indexFileContents = '';

        indexFileContents += generateRequires(libs, 'js/sky.js');
        indexFileContents += generateRequires(cssLibs, 'css/sky.css');

        indexFileContents +=  grunt.util.linefeed;
        indexFileContents += 'module.exports="sky";' + grunt.util.linefeed;

        grunt.file.write('index.js', indexFileContents);
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
    grunt.registerTask('build', ['styles', 'scripts', 'sri', 'generateIndexJs']);
};

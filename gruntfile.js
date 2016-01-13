/// <vs BeforeBuild='default' SolutionOpened='watchandtest' />
/*global module,process */

module.exports = function (grunt) {
    'use strict';

    // Variables defined here are at least needed throughout the method, and possibly in grunt config.
    var fontFiles = ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
        jsHintFiles = ['gruntfile.js', 'js/**/*.js'],
        libsCss,
        libsJs,
        neutralLocale = 'en-US',
        skyDistPath,
        skyJs,
        skyLocalesPath = 'js/sky/locales/',
        skySrcPath = 'js/sky/src/',
        src = [
            '<%= skySrcPath %>*/*.module.js',
            '<%= skySrcPath %>*/*.js',
            '<%= skySrcPath %>module.js'
        ],
        target = 'local',
        screenshotBasePath = 'screenshots/',
        skipTest,
        webdriverTestPort = 8000;

    libsCss = [
        'bower_components/free-jqgrid/css/ui.jqgrid.css',
        'bower_components/angular-toastr/dist/angular-toastr.min.css',
        'bower_components/angular-ui-select/dist/select.min.css'
    ];

    libsJs = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/enquire/dist/enquire.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
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
    ];

    skyJs = src.concat([
        '<%= skyDistPath %>js/locales/sky-locale-<%= neutralLocale %>.js',
        '<%= skyTemplatesPath %>templates.js.tmp'
    ]);

    // Logging some TRAVIS environment variables
    (function () {
        var props = [
            'TRAVIS',
            'TRAVIS_REPO_SLUG',
            'TRAVIS_SECURE_ENV_VARS',
            'TRAVIS_BRANCH',
            'TRAVIS_PULL_REQUEST',
            'TRAVIS_OS_NAME',
            'TRAVIS_TAG',
            'TRAVIS_JOB_NUMBER',
            'TRAVIS_BUILD_NUMBER',
            'TRAVIS_COMMIT',
            'IS_RELEASE'
        ];

        if (process.env.TRAVIS === 'true') {
            props.forEach(function (prop) {
                grunt.log.writeln(prop + ': ' + process.env[prop] + ' (' + typeof process.env[prop] + ')');
            });
        }
    }());

    // Determine which environment we're running in.
    // Travis environment variables are strings representing booleans.
    (function () {
        var lastCommitMessage;

        if (process.env.TRAVIS) {
            if (process.env.TRAVIS_SECURE_ENV_VARS === 'true') {
                if (process.env.TRAVIS_PULL_REQUEST === 'false' &&
                    process.env.TRAVIS_REPO_SLUG === 'blackbaud/skyux') {
                    target = 'travis-push';
                } else {
                    target = 'travis-pr-branch';
                }
            } else {
                target = 'travis-pr-fork';
            }

            lastCommitMessage = process.env.LAST_COMMIT_MESSAGE;

            if (lastCommitMessage && lastCommitMessage.indexOf('[test skip]') >= 0) {
                skipTest = true;
            }
        }

        grunt.log.writeln('Building for target: ' + target);

        if (target === 'local') {
            skyDistPath = 'bin/';
            screenshotBasePath += '_local/';
        } else {
            skyDistPath = 'dist/';
        }
    }());

    // Temporary.  Deprecating some original tasks.
    (function () {
        var task,
            tasks = {
                'buildall': 'build',
                'compilescripts': 'scripts',
                'compilestyles': 'styles',
                'generatedocs': 'docs',
                'watchandtest': 'watch'
            };
        function register(deprecated, replacement) {
            grunt.registerTask(deprecated, function () {
                grunt.log.writeln('');
                grunt.log.warn([
                    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
                    '`grunt ' + deprecated + '` is deprecated and will be removed in the future.',
                    'Please use `grunt ' + replacement + '` instead, which I will run now.',
                    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
                ].join('\n'));
                grunt.log.writeln('');
                grunt.task.run(replacement);
            });
        }
        for (task in tasks) {
            if (tasks.hasOwnProperty(task)) {
                register(task, tasks[task]);
            }
        }
    }());

    // Variables that are only needed in the grunt config can be defined here
    grunt.config.init({
        neutralLocale: neutralLocale,
        skyDistPath: skyDistPath,
        skyLocalesPath: skyLocalesPath,
        skySrcPath: skySrcPath,
        stacheConfig: grunt.file.readYAML('stache.yml'),
        skyTemplatesPath: 'js/sky/templates/',
        paletteTemplatesPath: 'js/sky/palette/',
        paletteCssPath: '.tmp/palette/palette.css',
        html2js: {
            options: {
                base: 'js/',
                indentString: '    ',
                module: 'sky.templates',
                quoteChar: '\'',
                singleModule: true
            },
            main: {
                src: ['<%= skyTemplatesPath %>**/*.html'],
                dest: '<%= skyTemplatesPath %>templates.js.tmp'
            }
        },
        // We used to use grunt-contrib-concat here but the source maps never came out right.  This one works much better.
        concat_sourcemap: {
            options: {
                sourcesContent: true,
                sourceRoot: '../..'
            },
            dist: {
                files: {
                    '<%= skyDistPath %>js/libs.js': libsJs,
                    '<%= skyDistPath %>js/sky.js': skyJs
                }
            },
            skybundle: {
                files: {
                    '<%= skyDistPath %>js/sky-bundle.js': libsJs.concat(skyJs)
                }
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
                    sourceMapIn: '<%= skyDistPath %>js/libs.js.map'
                },
                src: ['<%= skyDistPath %>js/libs.js'],
                dest: '<%= skyDistPath %>js/libs.min.js'
            },
            dist: {
                options: {
                    sourceMapIn: '<%= skyDistPath %>js/sky.js.map'
                },
                src: ['<%= skyDistPath %>js/sky.js'],
                dest: '<%= skyDistPath %>js/sky.min.js'
            },
            skybundle: {
                options: {
                    sourceMapIn: '<%= skyDistPath %>js/sky-bundle.js.map'
                },
                src: ['<%= skyDistPath %>js/sky-bundle.js'],
                dest: '<%= skyDistPath %>js/sky-bundle.min.js'
            },
            skylint: {
                src: ['js/sky/linter/skylint.js'],
                dest: '<%= skyDistPath %>js/skylint.min.js'
            }
        },
        // Renamed the original grunt-contrib-watch task
        watchNoConflict: {
            scripts: {
                files: src.concat(['<%= skyLocalesPath %>**/*.*', '<%= skyTemplatesPath %>**/*.html']),
                tasks: ['scripts', 'karma:watch:run']
            },
            skylint: {
                files: ['js/sky/linter/skylint.js'],
                tasks: ['uglify:skylint']
            },
            test: {
                files: ['**/test/*.js'],
                tasks: ['karma:watch:run']
            },
            jshint: {
                files: jsHintFiles,
                tasks: ['lint']
            },
            demo: {
                files: ['<%= skySrcPath %>*/docs/*.js', '<%= skySrcPath %>*/docs/*.html'],
                tasks: ['docs']
            },
            sass: {
                files: ['**/*.scss'],
                tasks: ['styles', 'karma:watch:run']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= skyDistPath %>/css/sky.css': 'scss/sky.scss'
                }
            },
            palette: {
                options: {
                    sourcemap: 'none',
                    style: 'compact'
                },
                files: {
                    '<%= paletteCssPath %>': '<%= paletteTemplatesPath %>template.scss'
                }
            },
            skybundle: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= skyDistPath %>/css/sky-bundle.css': '.tmp/sky-bundle.scss'
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
                    '<%= skyDistPath %>css/libs.css': libsCss
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: fontFiles,
                    cwd: 'scss',
                    dest: '<%= skyDistPath %>css/fonts'
                }]
            },
            demo: {
                expand: true,
                src: '<%= skyDistPath %>**',
                dest: '<%= stacheConfig.build %>'
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf-local.js'
            },
            internal: {
                configFile: 'karma.conf-ci.js'
            },
            unit: {
                singleRun: true
            },
            watch: {
                background: true
            }
        },
        bump: {
            options: {
                files: [
                    'bower.json',
                    'package.json'
                ],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: jsHintFiles
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: jsHintFiles
        },
        stache: {
            pages: [{
                url: '<%= stacheConfig.data %>sky.json',
                dest: 'components/',
                type: 'jsdoc'
            }]
        },
        stache_jsdoc: {
            options: {
                src: '<%= skySrcPath %>*/*.js',
                dest: '<%= stacheConfig.data %>sky.json'
            }
        },
        connect: {
            webdrivertest: {
                options: {
                    port: webdriverTestPort
                }
            }
        },
        webdriver: {
            test: {
                configFile: './webdrivertest/wdio.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('blackbaud-stache');
    grunt.loadNpmTasks('blackbaud-stache-jsdoc');
    grunt.loadNpmTasks('grunt-webdriver');

    // We like clean task names too, rename a few of the defaults.
    grunt.task.renameTask('build', 'stache');
    grunt.task.renameTask('watch', 'watchNoConflict');

    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('docs', ['stache_jsdoc', 'status:demo/build', 'stache', 'copy:demo']);
    grunt.registerTask('scripts', ['l10n', 'buildpaletteservice', 'html2js', 'concat_sourcemap', 'uglify']);
    grunt.registerTask('styles', ['sass:dist', 'sass:palette', 'cssmin:dist', 'skybundlecss', 'copy:dist']);
    grunt.registerTask('build', ['styles', 'scripts']);
    grunt.registerTask('watch', ['build', 'karma:watch:start', 'watchNoConflict']);
    grunt.registerTask('visualtest', ['cleanupwebdrivertestfixtures', 'buildwebdrivertestfixtures', 'connect:webdrivertest', 'webdriver:test', 'cleanupwebdrivertestfixtures']);

    // Generate our JS config for each supported locale
    grunt.registerTask('l10n', function () {
        var RESOURCES_PREFIX = 'resources_',
            template = grunt.file.read(skyLocalesPath + 'template.js');

        grunt.file.expand(
            {
                filter: 'isFile',
                cwd: '.'
            },
            skyLocalesPath + RESOURCES_PREFIX + '*'
        ).forEach(function (path) {
            var destFile,
                fileName,
                js,
                locale,
                p,
                parts = path.split('/'),
                stringsIn,
                stringsOut = {};

            fileName = parts[parts.length - 1];

            // Before restructuring the resource files we used a different file name format, so we are jumping
            // through some hoops here to maintain the previous file name format for backwards compatibility.
            locale = fileName
                .substring(RESOURCES_PREFIX.length, fileName.length - 5) // Remove resources_ prefix and file extension ('.json')
                .replace(/_/g, '-');

            stringsIn = grunt.file.readJSON(path);

            for (p in stringsIn) {
                if (stringsIn.hasOwnProperty(p)) {
                    stringsOut[p] = stringsIn[p].message;
                }
            }

            js = 'bbResourcesOverrides = ' + JSON.stringify(stringsOut) + ';';
            js = template.replace('/*LOCALEJSON*/', js);

            destFile = skyDistPath + 'js/locales/sky-locale-' + locale + '.js';

            grunt.file.write(destFile, js);

            grunt.log.writeln('File "' + destFile + '" created.');
        });
    });

    function buildTestFixtures(root) {
        var template = grunt.file.read((root + '/fixtures/template.html')),
            pattern = root + '/test/**/fixtures/*.html';

        grunt.file.expand(
            {
                filter: 'isFile',
                cwd: '.'
            },
            pattern
        ).forEach(function (file) {
            var destFile,
                html;

            // Avoid processing already-built files in case the cleanup step failed to run.
            if (file.indexOf('.full.html') < 0) {
                html = grunt.file.read(file);
                html = template.replace(/##TEST_HTML##/gi, html);
                html = html.replace(/##DIST_PATH##/gi, skyDistPath);
                destFile = file.replace('.html', '.full.html');
                grunt.file.write(destFile, html);

                grunt.log.writeln('File "' + destFile + '" created.');
            }
        });
    }

    function cleanupTestFixtures(root) {
        var pattern = root + '/test/**/fixtures/*.full.html';

        grunt.file.expand(
            {
                filter: 'isFile',
                cwd: '.'
            },
            pattern
        ).forEach(function (file) {
            grunt.file.delete(file);
        });

        grunt.log.writeln('Visual test fixture temp files deleted.');
    }

    // Generate the files needed for visual tests
    grunt.registerTask('buildwebdrivertestfixtures', function () {
        buildTestFixtures('webdrivertest');
    });

    // Remove the temporary files needed for visual tests
    grunt.registerTask('cleanupwebdrivertestfixtures', function () {
        cleanupTestFixtures('webdrivertest');
    });

    // Generate our JS config for the bbPalette service
    grunt.registerTask('buildpaletteservice', function () {
        var template = grunt.file.read(grunt.config('paletteTemplatesPath') + 'template.js'),
            configPath = grunt.config('skySrcPath') + 'palette/config.js',
            css = grunt.file.read(grunt.config('paletteCssPath')),
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

    (function () {
        function getDestFile(libCss) {
            return libCss.substr(libCss.lastIndexOf('/') + 1).replace('.css', '.scss');
        }

        grunt.registerTask('skybundlecss', function () {
            var destFile,
                i,
                libCss,
                skyBundleScss = '',
                n;

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
                n;

            grunt.file.delete('.tmp/sky-bundle.scss');

            for (i = 0, n = libsCss.length; i < n; i++) {
                grunt.file.delete('.tmp/' + getDestFile(libsCss[i]));
            }
        });
    }());

    // This is the main entry point for testing sky, supporting 4 scenarios:
    // local, Travis PR (from fork), Travis PR (from branch), Travis Push
    // It expects the target variable to be correctly set.
    grunt.registerTask('test', function () {
        var tasks = [
                'lint',
                'build'
            ];

        function checkSkipTest(karmaTarget) {
            if (!skipTest) {
                tasks.push('visualtest');
                tasks.push('karma:' + karmaTarget);
            }
        }

        switch (target) {
        case 'local':
            checkSkipTest('unit');
            tasks.push('docs');
            break;
        case 'travis-pr-branch':
            checkSkipTest('internal');
            break;
        case 'travis-push':
            checkSkipTest('internal');
            tasks.push('stache_jsdoc');
            break;
        }

        if (target === 'travis-pr-fork') {
            grunt.log.writeln('Pull requests from forks are ran via blackbaud-sky-savage.');
        } else {
            grunt.task.run(tasks);
        }
    });


};

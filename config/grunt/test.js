/*global module*/
module.exports = function (grunt, env, utils) {
    'use strict';

    grunt.config.merge({
        skyux: {
            paths: {
                jsHint: [
                    'gruntfile.js',
                    'config/grunt/*.js',
                    'js/**/*.js'
                ],
                webdriver: 'webdriver-screenshots' + (env.isCurrent(env.SUPPORTED.LOCAL) ? 'local' : '')
            }
        },
        connect: {
            webdrivertest: {
                options: {
                    port: 8000
                }
            }
        },
        exec: {
            ciBrowserStackTunnel: {
                cmd: './scripts/browserstack-local-start.sh'
            },
            localBrowserStackTunnelStart: {
                cmd: './scripts/browserstack-local-dev.sh'
            },
            localBrowserStackTunnelStop: {
                cmd: './scripts/browserstack-local-stop.sh'
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: '<%= skyux.paths.jsHint %>'
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: '<%= skyux.paths.jsHint %>'
        },
        karma: {
            options: {
                configFile: './config/karma/karma.conf-local.js'
            },
            ci: {
                configFile: './config/karma/karma.conf-ci.js'
            },
            unit: {
                singleRun: true
            },
            watch: {
                background: true
            }
        },
        mkdir: {
            webdriver: {
                options: {
                    create: [
                        '<%= skyux.paths.webdriver %>/MAC_chrome',
                        '<%= skyux.paths.webdriver %>/MAC_firefox',
                        '<%= skyux.paths.webdriver %>-diffs/MAC_chrome',
                        '<%= skyux.paths.webdriver %>-diffs/MAC_firefox'
                    ]
                }
            }
        },
        // Renamed the original grunt-contrib-watch task
        watchRenamed: {
            test: {
                files: ['<%= skyux.paths.src %>**/test/*.js'],
                tasks: ['karma:watch:run']
            }
        },
        webdriver: {
            ci: {
                configFile: './config/wdio/wdio.conf-ci.js'
            },
            local: {
                configFile: './config/wdio/wdio.conf-local.js'
            },
            localBrowserStack: {
                configFile: './config/wdio/wdio.conf-local-browserstack.js'
            }
        }
    });

    function buildTestFixtures(root) {
        var pathDist = grunt.config.get('skyux.paths.dist'),
            template = grunt.file.read((root + '/fixtures/template.html')),
            pattern = root + '/test/**/fixtures/*.html',
            options = {
                filter: 'isFile',
                cwd: '.'
            };

        grunt.file.expand(options, pattern).forEach(function (file) {
            var destFile,
                html;

            // Avoid processing already-built files in case the cleanup step failed to run.
            if (file.indexOf('.full.html') < 0) {
                html = grunt.file.read(file);
                html = template.replace(/##TEST_HTML##/gi, html);
                html = html.replace(/##DIST_PATH##/gi, pathDist);
                destFile = file.replace('.html', '.full.html');
                grunt.file.write(destFile, html);

                utils.log('File "' + destFile + '" created.');
            }
        });
    }

    function cleanupWorkingScreenshots(root) {
        var pattern = root + '/**/*px.png';

        grunt.file.expand(
            {
                filter: 'isFile',
                cwd: '.'
            },
            pattern
        ).forEach(function (file) {
            grunt.file.delete(file);
        });

        utils.log('Visual test working screenshots deleted.');
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

        utils.log('Visual test fixture temp files deleted.');
    }

    // Generate the files needed for visual tests
    grunt.registerTask('buildwebdrivertestfixtures', function () {
        buildTestFixtures('webdrivertest');
    });

    // Remove the temporary files needed for visual tests
    grunt.registerTask('cleanupwebdrivertestfixtures', function () {
        cleanupTestFixtures('webdrivertest');
    });

    grunt.registerTask('cleanupworkingscreenshots', function () {
        cleanupWorkingScreenshots(grunt.config.get('skyux.paths.webdriver'));
    });

    grunt.registerTask('lint', ['jshint', 'jscs']);

    grunt.registerTask('unittest', function () {
        var tasks = [];

        switch (env.get()) {
        case env.SUPPORTED.LOCAL:
            tasks.push('karma:unit');
            break;
        case env.SUPPORTED.LOCAL_BS:
        case env.SUPPORTED.CI_PUSH:
        case env.SUPPORTED.CI_PR_BRANCH:
            tasks.push('karma:ci');
            break;
        default:
            utils.log('grunt unittest is not configured to run in this environment.');
            return;
        }

        grunt.task.run(tasks);
    });

    // visualtest task supports an optional target.
    // defaults to local
    grunt.registerTask('visualtest', function () {
        var tasks = [
            'cleanupwebdrivertestfixtures',
            'cleanupworkingscreenshots',
            'buildwebdrivertestfixtures',
            'connect:webdrivertest',
            'mkdir:webdriver'
        ];

        switch (env.get()) {
        case env.SUPPORTED.CI_PR_FORK:
        case env.SUPPORTED.CI_PR_BRANCH:
        case env.SUPPORTED.CI_PUSH:
            tasks.push('exec:ciBrowserStackTunnel');
            tasks.push('webdriver:ci');
            break;
        case env.SUPPORTED.LOCAL_BS:
            tasks.push('exec:localBrowserStackTunnelStart');
            tasks.push('webdriver:localBrowserStack');
            tasks.push('exec:localBrowserStackTunnelStop');
            break;
        case env.SUPPORTED.LOCAL:
            tasks.push('webdriver:local');
            break;
        default:
            utils.log('grunt visualtest is not configured to run in this environment.');
        }

        tasks.push('cleanupwebdrivertestfixtures');
        tasks.push('cleanupworkingscreenshots');
        grunt.task.run(tasks);
    });

    // This is the main entry point for testing skyux.
    grunt.registerTask('test', function () {
        var tasks = [
            'lint',
            'build',
            'unittest',
            'visualtest'
        ];

        switch (env.get()) {
        case env.SUPPORTED.CI_PR_BRANCH:
            break;
        case env.SUPPORTED.LOCAL:
        case env.SUPPORTED.LOCAL_BS:
        case env.SUPPORTED.CI_PUSH:
            tasks.push('docs');
            break;
        case env.SUPPORTED.CI_PR_FORK:
            utils.log('Pull requests from forks are ran via blackbaud-sky-savage.');
            return;
        default:
            utils.log('grunt test is not configured to run in this environment.');
            return;
        }

        grunt.task.run(tasks);
    });
};

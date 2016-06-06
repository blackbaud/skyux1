/*global module, require*/
module.exports = function (grunt, env, utils) {
    'use strict';
    var webdriverFolderRoot = 'webdriver-screenshots' + (env.isCurrent(env.SUPPORTED.LOCAL) || env.isCurrent(env.SUPPORTED.LOCAL_BS) ? 'local' : '');
    
    grunt.config.merge({
        skyux: {
            paths: {
                jsHint: [
                    'gruntfile.js',
                    'config/grunt/*.js',
                    'js/**/*.js'
                ],
                webdriver: webdriverFolderRoot
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
            },
            uploadCoverage: {
                cmd: './node_modules/.bin/codecov'
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
        var pattern = root + '/**/*px.png',
            regressionPattern = root + '/**/*.regression.png';
        grunt.file.expand(
            {
                filter: 'isFile',
                cwd: '.'
            },
            pattern,
            regressionPattern
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
    
    function getCapabilitiesObject(configName) {
        
        var i,
            capability,
            os,
            browser,
            capabilities = [],
            wdioCapabilities = require('../wdio/' + configName).config.capabilities;
        
        for (i = 0; i < wdioCapabilities.length; i++) {
            capability = wdioCapabilities[i];
            os = capability.os;
            if (os === 'OS X') {
                os = 'MAC';
            } else {
                os = 'WIN';
            }
            
            browser = capability.browserName;
            capabilities.push({ os: os, browser: browser });
            
        }
        
        return capabilities;
    }
    
    function getWebDriverCapabilities() {
        var capabilities,
            configName;
            
        switch (env.get()) {
        case env.SUPPORTED.CI_PR_FORK:
        case env.SUPPORTED.CI_PR_BRANCH:
        case env.SUPPORTED.CI_PUSH:
            configName = 'wdio.conf-ci.js';
            break;
        case env.SUPPORTED.LOCAL_BS:
            configName = 'wdio.conf-local-browserstack.js';
            break;
        case env.SUPPORTED.LOCAL:
            configName = 'wdio.conf-local.js';
           
            break;
        default:
            utils.log('grunt visualtest is not configured to run in this environment.');
        }
        
        capabilities = getCapabilitiesObject(configName);
        
        return capabilities;
    }
    
    function createWebdriverFolders(capabilities) {
        var i,
            capability,
            mkdirp = require('mkdirp');
        for (i = 0; i < capabilities.length; i++) {
            capability = capabilities[i];
            mkdirp.sync(webdriverFolderRoot + '/' + capability.os + '_' + capability.browser);
            mkdirp.sync(webdriverFolderRoot + '-diffs/' + capability.os + '_' + capability.browser);
        }
    }
    
    grunt.registerTask('createWebdriverFolders', function () {
        var capabilities;
            
        capabilities = getWebDriverCapabilities();
        createWebdriverFolders(capabilities);

    });

    // visualtest task supports an optional target.
    // defaults to local
    grunt.registerTask('visualtest', function () {
        var tasks = [
            'cleanupwebdrivertestfixtures',
            'cleanupworkingscreenshots',
            'buildwebdrivertestfixtures',
            'connect:webdrivertest',
            'createWebdriverFolders'
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
        var tasks;

        switch (env.get()) {
        case env.SUPPORTED.CI_PR_BRANCH:

        case env.SUPPORTED.CI_PUSH:
        case env.SUPPORTED.LOCAL:
            tasks = [
                'lint',
                'build',
                'unittest',
                'exec:uploadCoverage',
                'visualtest'
            ];
            break;
        case env.SUPPORTED.LOCAL_BS:
            tasks = [
                'lint',
                'build',
                'unittest',
                'visualtest'
            ];
            break;
        case env.SUPPORTED.CI_PR_FORK:
            utils.log('Pull requests from forks are ran via blackbaud-sky-savage.');
            return;
        default:
            utils.log('grunt test is not configured to run in this environment.');
            return;
        }

        // Only a push to master needs the docs
        if (env.isCurrent(env.SUPPORTED.CI_PUSH)) {
            tasks.push('docs');
        }

        grunt.task.run(tasks);
    });
};

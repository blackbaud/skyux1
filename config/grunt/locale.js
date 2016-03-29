/*global module */
module.exports = function (grunt, env, utils) {
    'use strict';

    grunt.config.merge({
        skyux: {
            defaultLocale: 'en-US',
            paths: {
                locales: 'js/sky/locales/'
            }
        }
    });

    // Generate our JS config for each supported locale
    grunt.registerTask('l10n', function () {

        var RESOURCES_PREFIX = 'resources_',
            pathLocales = grunt.config.get('skyux.paths.locales'),
            pathDist = grunt.config.get('skyux.paths.dist'),
            template = grunt.file.read(pathLocales + 'template.js'),
            options = {
                filter: 'isFile',
                cwd: '.'
            };

        grunt.file.expand(options, pathLocales + RESOURCES_PREFIX + '*').forEach(function (path) {
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

            destFile = pathDist + 'js/locales/sky-locale-' + locale + '.js';

            grunt.file.write(destFile, js);
            utils.log('File "' + destFile + '" created.');
        });
    });
};

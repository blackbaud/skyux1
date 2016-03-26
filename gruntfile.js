/*global module,require*/
module.exports = function (grunt) {
    'use strict';

    var env,
        utils;

    // Load Stache here so we can rename it's build task before we define our own.
    grunt.loadNpmTasks('blackbaud-stache');
    grunt.task.renameTask('build', 'stache-build');

    // Overloading the watch task as well
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.task.renameTask('watch', 'watchRenamed');

    // env + utils are shared
    utils = require('./config/grunt/_utils')(grunt);
    env = require('./config/grunt/_env')(grunt, utils);

    // Load remaining modules
    require('./config/grunt/build')(grunt, env, utils);
    require('./config/grunt/docs')(grunt, env, utils);
    require('./config/grunt/locale')(grunt, env, utils);
    require('./config/grunt/release')(grunt, env, utils);
    require('./config/grunt/test')(grunt, env, utils);

    // Load required external modules
    grunt.loadNpmTasks('grunt-browserstack-tunnel');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-sri');
    grunt.loadNpmTasks('grunt-webdriver');
};

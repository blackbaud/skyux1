/*global module*/
module.exports = function (grunt) {
    'use strict';

    var prefix = 'SKYUX '.blue;

    // Adds the colorized SKYUX prefix to any message.
    function log(message) {
        grunt.log.writeln(prefix + message);
    }

    // Same as log but kinda serious
    function warn(message) {
        grunt.log.error(prefix + message);
    }

    // Same as warn but deadly
    function fatal(message) {
        grunt.fail.fatal(prefix + message);
    }

    // Runs a map of tasks based on the "--rapid" flag
    function run(map) {
        var rapid = grunt.option('rapid'),
            tasks = Object.keys(map).filter(function (key) {
                return rapid ? map[key] : true;
            });
        grunt.task.run(tasks);
    }

    // Expose our public members
    return {
        log: log,
        warn: warn,
        fatal: fatal,
        run: run
    };
};

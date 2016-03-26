/*global module*/
module.exports = function (grunt) {
    'use strict';

    // Adds the colorized SKYUX prefix to any message.
    function log(message) {
        grunt.log.writeln('SKYUX '.blue + message);
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
        run: run
    };
};

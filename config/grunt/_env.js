/*global module,require,process*/
module.exports = function (grunt, utils) {
    'use strict';

    var SUPPORTED,
        current;

    // Set our support environments
    SUPPORTED = {
        LOCAL: 'local',
        LOCAL_BS: 'local-browserstack',
        CI_PR_FORK: 'ci-pullrequest-fork',
        CI_PR_BRANCH: 'ci-pullrequest-branch',
        CI_PUSH: 'ci-push'
    };

    // Validate a requested environment
    function validate(requested) {
        var env,
            valid = false;
        for (env in SUPPORTED) {
            if (SUPPORTED.hasOwnProperty(env) && SUPPORTED[env] === requested) {
                valid = true;
                break;
            }
        }
        return valid;
    }

    // Utility function for comparing requestedEnvironment to currentEnvironment
    function isCurrent(requested) {
        return requested === current;
    }

    // Get the current environment
    // Supports a one-time requested environment,
    // which will be validated and returned if present, but not globally set.
    function get(requested) {
        return requested && validate(requested) ?
            requested : current;
    }

    // Set the current environment
    function set(requested) {
        if (!validate(requested)) {
            utils.log('Error setting current environment: ' + requested);
        } else {
            utils.log('Setting current environment: ' + requested);
            current = requested;
        }
    }

    // Determine which environment we're running in.
    // Travis environment variables are strings representing booleans.
    // Supports the "--browserstack" flag for running browserstack localy.
    // Supports the "--env=*" flag for manually setting the environment.
    function setDefault() {
        var environment = SUPPORTED.LOCAL;

        if (grunt.option('env')) {
            environment = grunt.option('env');
        } else if (grunt.option('browserstack')) {
            environment = SUPPORTED.LOCAL_BS;
            if (!grunt.file.exists('browserstack.env')) {
                utils.fatal('Expected browserstack.env file to exist.');
            } else {
                require('dotenv').config({ path: 'browserstack.env' });
            }
        } else if (process.env.TRAVIS) {
            if (process.env.TRAVIS_SECURE_ENV_VARS === 'true') {
                if (process.env.TRAVIS_PULL_REQUEST === 'false' && process.env.TRAVIS_REPO_SLUG === 'blackbaud/skyux') {
                    environment = SUPPORTED.CI_PUSH;
                } else {
                    environment = SUPPORTED.CI_PR_BRANCH;
                }
            } else {
                environment = SUPPORTED.CI_PR_FORK;
            }
        }
        set(environment);
    }

    // Set the default environment
    setDefault();

    // Expose our public members
    return {
        SUPPORTED: SUPPORTED,
        validate: validate,
        get: get,
        set: set,
        isCurrent: isCurrent
    };
};

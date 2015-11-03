# Sky UX

[![release](https://img.shields.io/bower/v/blackbaud-skyux.svg)](http://skyux.developer.blackbaud.com)
[![status](https://travis-ci.org/blackbaud/skyux.svg?branch=master)](https://travis-ci.org/blackbaud/skyux)
[![coverage](https://coveralls.io/repos/blackbaud/skyux/badge.svg?branch=master&service=github)](https://coveralls.io/github/blackbaud/skyux?branch=master)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/blackbaud/skyux/blob/master/LICENSE)

SKY UX provides an HTML, CSS, and JavaScript framework to implement Blackbaud’s design patterns, along with the guidance to handle visual design and interaction patterns.

http://skyux.developer.blackbaud.com/

## Installation

You have two options for consuming Sky UX.  The first and easiest is to point your site to our CDN:

    <!-- Put this in your page's HEAD element -->
    <link rel="stylesheet" type="text/css" src="//sky.blackbaudcdn.net/skyux/1.4.0/css/libs.css" />
    <link rel="stylesheet" type="text/css" src="//sky.blackbaudcdn.net/skyux/1.4.0/css/sky.css" />

    <!-- Put this at the bottom of your page's BODY element -->
    <script src="//sky.blackbaudcdn.net/skyux/1.4.0/js/libs.min.js"></script>
    <script src="//sky.blackbaudcdn.net/skyux/1.4.0/js/sky.min.js"></script>

The second option is to install Sky UX via [Bower](http://bower.io/):

    bower install blackbaud-skyux

If you install via Bower you will need to include the same files as above but with the URL pointing to your own server rather than the CDN.

## Contributing

We highly encourage contributions from all users of Sky UX.  We just ask that you follow the coding conventions already established in the existing code, and that you write the appropriate documentation and unit tests to go along with your feature.

### Getting the code

1. Fork the master branch into your own repo
2. Create a branch named after the feature you will be contributing (.e.g. my-new-feature)
3. Clone your repo locally, then run `npm install` and `bower install` from your local repo's directory to install all required dependencies
4. Run `grunt buildall` to do your initial build.  As you write your code, the individual pieces will be built (see step 1 below)

### Writing the code

1. Launch a command prompt, `cd` to the folder where you cloned your branch, then run `grunt watchandtest`.  
2. Write your code, documentation and unit tests.  All new code must have 100% unit test coverage and include documentation for how to use the feature or the pull request will not be accepted.  

  - You should include documentation for each Sky UX module you create within your source code. We use JSDoc-style comments at the top of our JavaScript files to generate Markdown documentation. You can generate the Markdown documentation by running the command `grunt generatedocs` from the command line.
  - Your documentation should also include demo HTML, and demo JS in a folder called `docs` under your feature's folder in `src/js`.  As you update these files, the `grunt watchandtest` task will generate documentation which you can find under `demo/build`.  The documentation page will need to be hosted by a web server; you can use a Node package like [http-server](https://github.com/indexzero/http-server) to start a web server in any folder on your drive.
 - Your unit tests should be located in a folder called `test` under your feature's folder in `src/js` and should consist of one or more JavaScript files named `<featurename>.spec.js`.  As you write unit tests or change code, the `grunt watchandtest` task will run your unit tests and generate code coverage.  Code coverage reports can be located under `coverage/<browser version>/index.html` and can be launched straight from disk.

### Submitting the code

1. Commit and push your changes to your repo
2. Submit a pull request

## Filing Issues

To file a bug, just go to the [issues](https://github.com/blackbaud/skyux/issues) page and create a new issue. You can assign the We are operating under the expectation that we will close bugs within two weeks of filing. On the newly created issue, there will be an option for you to subscribe to notifications which will send you emails about commits, comments, and releases related to the bug so you can know exactly where the bug is within its lifecycle.

# Sky UX

[![release](https://img.shields.io/bower/v/blackbaud-skyux.svg)](http://skyux.developer.blackbaud.com)
[![status](https://travis-ci.org/blackbaud/skyux.svg?branch=master)](https://travis-ci.org/blackbaud/skyux)
[![devDependencies](https://david-dm.org/blackbaud/skyux/dev-status.svg)](https://david-dm.org/blackbaud/skyux#info=devDependencies)
[![coverage](https://coveralls.io/repos/blackbaud/skyux/badge.svg?branch=master&service=github)](https://coveralls.io/github/blackbaud/skyux?branch=master)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/blackbaud/skyux/blob/master/LICENSE)
[![Slack](https://blackbaud-skyux-slackin.herokuapp.com/badge.svg)](https://blackbaud-skyux-slackin.herokuapp.com/)

SKY UX provides an HTML, CSS, and JavaScript framework to implement Blackbaud’s design patterns, along with the guidance to handle visual design and interaction patterns.

http://skyux.developer.blackbaud.com/

## Installation

You have two options for consuming Sky UX.  The first and easiest is to point your site to our CDN:

    <!-- Put this in your page's HEAD element -->
    <link rel="stylesheet" type="text/css" href="https://sky.blackbaudcdn.net/skyux/1.5.1/css/sky-bundle.css" />

    <!-- Put this at the bottom of your page's BODY element -->
    <script src="https://sky.blackbaudcdn.net/skyux/1.5.1/js/sky-bundle.min.js"></script>

The second option is to install Sky UX via [Bower](http://bower.io/):

    bower install blackbaud-skyux

If you install via Bower you will need to include the same files as above but with the URL pointing to your own server rather than the CDN.

## Contributing

We highly encourage contributions from all users of Sky UX.  We just ask that you follow the coding conventions already established in the existing code, and that you write the appropriate documentation and unit tests to go along with your feature.

### Getting the code

1. Fork the master branch into your own repo
2. Create a branch named after the feature you will be contributing (.e.g. my-new-feature)
3. Clone your repo locally, then run `npm install` and `bower install` from your local repo's directory to install all required dependencies
4. Run `grunt build` to do your initial build.  As you write your code, the individual pieces will be built (see step 1 below)

### Writing the code

1. Launch a command prompt, `cd` to the folder where you cloned your branch, then run `grunt watch`.  
2. Write your code, documentation and unit tests.  All new code must have 100% unit test coverage and include documentation for how to use the feature or the pull request will not be accepted.  

  - You should include documentation for each Sky UX module you create within your source code. We use JSDoc-style comments at the top of our JavaScript files to generate Markdown documentation. You can generate the Markdown documentation by running the command `grunt docs` from the command line.
  - Your documentation should also include demo HTML, and demo JS in a folder called `docs` under your feature's folder in `src/js`.  As you update these files, the `grunt watch` task will generate documentation which you can find under `demo/build`.  The documentation page will need to be hosted by a web server; you can use a Node package like [http-server](https://github.com/indexzero/http-server) to start a web server in any folder on your drive.
  - Your unit tests should be located in a folder called `test` under your feature's folder in `src/js` and should consist of one or more JavaScript files named `<featurename>.spec.js`.  As you write unit tests or change code, the `grunt watch` task will run your unit tests and generate code coverage.  Code coverage reports can be located under `coverage/<browser version>/index.html` and can be launched straight from disk.

### Visual regression tests

We run visual regression tests through Browserstack using [webdrivercss](https://github.com/webdriverio/webdrivercss). To run these tests against a local selenium server you will need [GraphicsMagick](http://www.graphicsmagick.org/) for image processing installed on your system.

##### Mac OS X using [Homebrew](http://mxcl.github.io/homebrew/)
```sh
$ brew install graphicsmagick
```

##### Ubuntu using apt-get
```sh
$ sudo apt-get install graphicsmagick
```

##### Windows

Download and install executables for [GraphicsMagick](http://www.graphicsmagick.org/download.html).
Please make sure you install the right binaries desired for your system (32bit vs 64bit).

You will also require a local selenium instance.
```
npm install -g selenium-standalone
selenium-standalone install
selenium-standalone start
```

After installing these prerequisites you can run the visual regression tests using `grunt visualtest`, which will create and compare screenshots in the `webdriver-screenshotslocal` folder.

### Submitting the code

1. Commit and push your changes to your repo
2. Submit a pull request

## Filing Issues

To file a bug, just go to the [issues](https://github.com/blackbaud/skyux/issues) page and create a new issue. We are operating under the expectation that we will close bugs within two weeks of filing. On the newly created issue, there will be an option for you to subscribe to notifications which will send you emails about commits, comments, and releases related to the bug so you can know exactly where the bug is within its lifecycle.

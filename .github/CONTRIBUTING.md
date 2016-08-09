##Contributing##

We highly encourage contributions from all SKY UX users. We just ask you to follow the coding conventions in the existing code and to write the appropriate documentation and unit tests for your feature.

For more information about working with SKY UX, see the [SKY UX README](https://github.com/blackbaud/skyux/blob/master/README.md).

### Prerequisites
Before you can contribute to SKY UX, you must have the following prerequisites in place:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/package/blackbaud-skyux)
- [Grunt](http://gruntjs.com/getting-started)
- [Ruby SASS](http://sass-lang.com/install)

### Getting the code

1. Fork the master branch into your own repo.
2. Create a branch named after the feature you will be contributing (.e.g. my-new-feature).
3. Clone your repo locally, then run `npm install` from your local repo's directory to install all required dependencies.
4. Run `grunt build` to do your initial build.  As you write your code, the individual pieces will be built (see step 1 below).

### Writing the code

1. Launch a command prompt, `cd` to the folder where you cloned your branch, then run `grunt watch`.  
2. Write your code, documentation and unit tests.  All new code must have 100% unit test coverage and include documentation for how to use the feature or the pull request will not be accepted.  

  - You should include documentation for each SKY UX module you create within your source code. We use JSDoc-style comments at the top of our JavaScript files to generate Markdown documentation. You can generate the Markdown documentation by running the command `grunt docs` from the command line.
  - Your documentation should also include demo HTML, and demo JS in a folder called `docs` under your feature's folder in `src/js`.  As you update these files, the `grunt watch` task will generate documentation which you can find under `demo/build`.  The documentation page will need to be hosted by a web server; you can use a Node package like [http-server](https://github.com/indexzero/http-server) to start a web server in any folder on your drive.
  - Your unit tests should be located in a folder called `test` under your feature's folder in `src/js` and should consist of one or more JavaScript files named `<featurename>.spec.js`.  As you write unit tests or change code, the `grunt watch` task will run your unit tests and generate code coverage.  Code coverage reports can be located under `coverage/<browser version>/index.html` and can be launched straight from disk.
  - We've also written a code analysis tool for validating SKYUX components.  Visit [grunt-skylint](https://github.com/blackbaud/grunt-skylint) to learn more.

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

After installing these prerequisites you can run the visual regression tests using `grunt visualtest`, which will create and compare screenshots in the `webdriver-screenshotslocal` folder. You can run specific test suites using the `--components` option with the name of the component you wish to test e.g. `grunt visualtest --components=actionbar,alert`.

### Submitting the code

1. Commit and push your changes to your repo
2. Submit a pull request
# This file only runs if there are results from the visualtests
# It's using the deploy key specified in Travis since Secure Environemnt Variables aren't available to forks.

if [ -d screenshots/baseline ]; then
  echo -e "Starting to update skyux-visualtest-results.\n"

  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"
  git clone --quiet https://${GH_TOKEN}@github.com/blackbaud/skyux-visualtest-results.git skyux-visualtest-results > /dev/null

  cd skyux-visualtest-results

  git checkout -b $TRAVIS_BUILD_NUMBER

  mkdir -p failures

  cp -rf ../screenshots/baseline/*.* failures/

  mkdir -p all

  cd ../visualtest/test/

  # The --parents flag is only valid on Linux.  If you need to test this on a Mac, install coreutils and use the gcp command.
  # https://www.topbug.net/blog/2013/04/14/install-and-use-gnu-command-line-tools-in-mac-os-x/
  cp -rf **/screenshots/ ../../skyux-visualtest-results/all/ --parents

  cd ../../skyux-visualtest-results

  git add -A
  if [ -z "$(git status --porcelain)" ]; then
    echo -e "No changes to commit to skyux visual test results."
  else
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER screenshot results pushed to skyux-visualtest-results"
    git push -fq origin $TRAVIS_BUILD_NUMBER > /dev/null
    echo -e "skyux-visualtest-results successfully updated.\nTest results may be viewed at https://github.com/blackbaud/skyux-visualtest-results"
  fi
  cd ..
fi

if [ -d webdriver-screenshot-diffs ]; then
  echo -e "Starting to update webdriver test results.\n"

  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"
  git clone --quiet https://${GH_TOKEN}@github.com/blackbaud/skyux-visualtest-results.git skyux-visualtest-results-webdriver > /dev/null

  cd skyux-visualtest-results-webdriver

  git checkout -b ${TRAVIS_BUILD_NUMBER}-webdriver

  mkdir -p failures

  cp -rf ../webdriver-screenshot-diffs/ failures/

  mkdir -p all

  cp -rf ../webdriver-screenshots/ all/

  git add -A
  if [ -z "$(git status --porcelain)" ]; then
    echo -e "No changes to commit to skyux visual test webdriver results."
  else
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER webdriver screenshot results pushed to skyux-visualtest-results"
    git push -fq origin ${TRAVIS_BUILD_NUMBER}-webdriver > /dev/null
    echo -e "skyux-visualtest-results webdriver successfully updated.\nTest results may be viewed at https://github.com/blackbaud/skyux-visualtest-results"
  fi
fi

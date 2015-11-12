# Fail the build if this step fails
set -e

# Update the dist folder of the current branch, as long as it's a push and not a savage- branch.
if [[ "$TRAVIS_PULL_REQUEST" == "false" && ! $TRAVIS_BRANCH =~ $SAVAGE_BRANCH ]]; then
  echo -e "Starting to update skyux.\n"

  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"
  git clone --quiet --branch=$TRAVIS_BRANCH https://${GH_TOKEN}@github.com/blackbaud/skyux.git skyux > /dev/null

  cp -rf dist/ skyux/

  # The --parents flag is only valid on Linux.  If you need to test this on a Mac, install coreutils and use the gcp command.
  # https://www.topbug.net/blog/2013/04/14/install-and-use-gnu-command-line-tools-in-mac-os-x/
  cp -rf visualtest/test/**/screenshots/baseline/ skyux/ --parents

  cp -rf webdriver-screenshots/ skyux/

  cd skyux
  git add dist/
  git add visualtest/test/**/screenshots/
  git add webdriver-screenshots/

  if [ -z "$(git status --porcelain)" ]; then
    echo -e "No changes to commit to skyux."
  else
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to skyux [ci skip]"
    git push -fq origin $TRAVIS_BRANCH > /dev/null
    echo -e "skyux successfully updated.\n"
  fi
fi

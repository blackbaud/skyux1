# Fail the build if this step fails
set -e

# Update the dist folder of the current branch, as long as it's a push and not a savage- branch.
if [[ "$TRAVIS_PULL_REQUEST" == "false" && ! $TRAVIS_BRANCH =~ $SAVAGE_BRANCH ]]; then
  echo -e "Starting to update skyux.\n"

  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"
  git clone --quiet --branch=$TRAVIS_BRANCH https://${GH_TOKEN}@github.com/blackbaud/skyux.git skyux > /dev/null

  cp -rf dist/ skyux/
  cp -rf webdriver-screenshots/ skyux/
  cd skyux

  # Update version in README.md
  if [[ "$IS_RELEASE" == "true" && "$IS_PRERELEASE" == "false" ]]; then
    sed -i '' -E -e 's/blackbaudcdn.net\/skyux\/[0-9]+\.[0-9]+\.[0-9]+\//blackbaudcdn.net\/skyux\/'"$RELEASE_VERSION"'\//g' README.md
    git add README.md
  fi

  git add dist/
  git add webdriver-screenshots/

  if [ -z "$(git status --porcelain)" ]; then
    echo -e "No changes to commit to skyux."
  else
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to skyux [ci skip]"
    git push -fq origin $TRAVIS_BRANCH > /dev/null
    echo -e "skyux successfully updated.\n"
  fi
fi

# Fail the build if this step fails
set -e

# Only run for a release
if [[ "$IS_RELEASE" == "true" ]]; then
  echo -e "Starting to update skyux-releases.\n"

  # What user will be committing to the sky-docs repo
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"

  # Clones the sky-docs repo into a "gh/" folder
  git clone --quiet https://${GH_TOKEN}@github.com/blackbaud/skyux-releases.git gh > /dev/null

  # Verify the version doesn't already exist
  if [[ -d "gh/releases/skyux/$RELEASE_VERSION" ]]; then
    echo "skyux-releases already contains version $RELEASE_VERSION"
    exit 1
  else

    # Copy the dist folder
    cp -rf dist/. gh/releases/skyux/$RELEASE_VERSION/

    # Commit and push all our changes to the repo
    cd gh
    git add -f .
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed $RELEASE_VERSION to skyux-releases"
    git push -fq origin master > /dev/null

    echo -e "skyux-releases successfully updated.\n"

    # Publish to NPM
    echo -e "blackbaud-skyux\n$NPM_PASSWORD\nsky-build-user@blackbaud.com" | npm login
    npm publish
    echo -e "skyux successfully deployed to NPM.\n"

  fi
fi

# Fail the build if this step fails
set -e

# Only run for a release
if [[ "$IS_RELEASE" == "true" ]]; then
  echo -e "Starting to update sky docs\n"

  # This is normally master
  branch="bbcon"

  # What user will be committing to the sky-docs repo
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"

  # Clones the sky-docs repo into a "docs/" folder
  git clone --quiet --branch=$branch https://${GH_TOKEN}@github.com/blackbaud/sky-docs.git docs > /dev/null

  # Copy jsdoc output
  cp -f demo/data/sky.json docs/sky-jsdoc/sky-$RELEASE_VERSION.json

  # Updating this file will cause the documentation to be updated
  echo "$RELEASE_VERSION" > docs/includes/latest-release.txt

  # Create a timestamp file for stache to read
  echo "`date -u`" > docs/includes/timestamp.txt

  # Commit and push all our changes to the repo
  cd docs
  git add -f .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed $RELEASE_VERSION to sky-docs"
  git push -fq origin $branch > /dev/null

  echo -e "Sky Docs successfully updated.\n"
fi

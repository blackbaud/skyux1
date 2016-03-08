# Even though we cache node_modules/bower_components, npm/bower install is still slow.
# This allows us to only run npm/bower install when necessary.
# We stash the json file back in the cached directory.

# Read mode passed in as first argument
mode=$1

# Verify npm or bower scenario
case $mode in
  npm)
    json_file="package.json"
    cache_dir="$TRAVIS_BUILD_DIR/node_modules"
    ;;
  bower)
    json_file="bower.json"
    cache_dir="$TRAVIS_BUILD_DIR/bower_components"
    ;;
  *)
    echo "Unknown install mode: $mode"
    exit 1
    ;;
esac

# Verify cache directories exist and no difference in config files
if [[ -d "$cache_dir" ]] && cmp --silent $TRAVIS_BUILD_DIR/$json_file /$cache_dir/$json_file; then
  echo "$mode install successfully bypassed with cache."
else
  echo "Unable to use cache for $mode.  Beginning install now."
  $mode install

  echo "Caching $json_file for future builds."
  cp $TRAVIS_BUILD_DIR/$json_file $cache_dir/$json_file
fi

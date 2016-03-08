# Assumes the binary is created and stored via the karma process.
$BROWSER_STACK_BINARY_BASE_PATH/BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSER_STACK_ACCESS_KEY &
BROWSER_STACK_BINARY_PID=$!
echo "Saved BrowserStack PID as $BROWSER_STACK_BINARY_PID."
sleep 3

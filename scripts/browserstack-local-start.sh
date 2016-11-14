# Assumes the binary is created and stored via the karma process.
$BROWSER_STACK_BINARY_BASE_PATH/BrowserStackLocal --key $BROWSER_STACK_ACCESS_KEY --version --only-automate --force-local --force --local-identifier SKYUXBROWSERSTACKCI --parallel-runs 10 & sleep 3

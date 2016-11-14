# Assumes the binary is created and stored via the karma process.
$BROWSER_STACK_BINARY_BASE_PATH/BrowserStackLocal -v --onlyAutomate --forcelocal --force --local-identifier SKYUXBROWSERSTACK --parallel-runs $BROWSER_STACK_ACCESS_KEY &
sleep 3

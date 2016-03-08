if [[ $BROWSER_STACK_BINARY_PID -ne 0 ]]; then
  echo "Killing BrowserStack PID $BROWSER_STACK_BINARY_PID."
  kill $BROWSER_STACK_BINARY_PID
fi

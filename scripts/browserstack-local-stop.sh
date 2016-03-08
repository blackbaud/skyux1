# Kill any remaining BrowserStack tunnels
echo "Cleaning up BrowerStack instances"
echo "--- Before ---"
ps -ef | grep BrowserStackLocal
pkill BrowserStackLocal

echo "--- After ---"
ps -ef | grep BrowserStackLocal

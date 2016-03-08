# Kill any remaining BrowserStack tunnels
echo "Cleaning up BrowerStack instances"
echo "--- Before ---"
ps -ef | grep BrowserStackLocal
pkill -9 -f BrowserStackLocal

echo "--- After ---"
ps -ef | grep BrowserStackLocal

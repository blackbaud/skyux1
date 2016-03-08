# Kill any remaining BrowserStack tunnels
echo "Cleaning up BrowerStack instances"
echo "--- Before ---"
ps -ef | grep BrowserStackLocal
pkill -f BrowserStackLocal

echo "--- After ---"
ps -ef | grep BrowserStackLocal

# Kill any remaining BrowserStack tunnels
echo "Killing any rogue BrowserStack tunnels."
ps -ef | grep BrowserStackLocal
pkill BrowserStackLocal
ps -ef | grep BrowserStackLocal

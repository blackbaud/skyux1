# This file is built explicitly for the SKY UX team to dev locally using BrowserStack
binaryFolder=browserstack-binary
binaryFile=./BrowserStackLocal

# Confirm folder exists
if [[ ! -d $binaryFolder ]]; then
  echo "Creating $binaryFolder"
  mkdir $binaryFolder
fi

cd $binaryFolder

# Confirm the binary exists
if [[ ! -e $binaryFile ]]; then
  binaryZip="BrowserStackLocal-darwin-x64.zip"
  echo "Downloading $binaryZip"
  curl -o $binaryZip -L https://www.browserstack.com/browserstack-local/$binaryZip
  unzip $binaryZip
fi

$binaryFile -v -onlyAutomate -forcelocal $BROWSER_STACK_ACCESS_KEY &
sleep 3

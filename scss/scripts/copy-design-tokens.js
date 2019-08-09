const fs = require('fs-extra');
const path = require('path');

const vendor = path.resolve(process.cwd(), 'scss/vendor');

fs.ensureDirSync(vendor);

fs.copySync(
  path.resolve(process.cwd(), 'node_modules/@blackbaud/skyux-design-tokens/scss/variables.scss'),
  path.resolve(vendor, 'skyux-design-tokens-variables.scss')
);
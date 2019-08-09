const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.cwd(), 'scss/vendor');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

fs.copyFileSync(
  path.resolve(process.cwd(), 'node_modules/@blackbaud/skyux-design-tokens/scss/variables.scss'),
  path.resolve(dir, 'skyux-design-tokens-variables.scss')
);
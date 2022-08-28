const fs = require('node:fs');
const path = require('node:path');
const generate = require('./generate');

const THEME_DIR = path.join(__dirname, '..', 'theme');

if (!fs.existsSync(THEME_DIR)) {
  fs.mkdirSync(THEME_DIR);
}

module.exports = async () => {
  const { baseLight, baseDark } = await generate();

  return Promise.all([
    fs.promises.writeFile(
      path.join(THEME_DIR, 'dopamine.json'),
      JSON.stringify(baseLight, null, 4)
    ),
    fs.promises.writeFile(
      path.join(THEME_DIR, 'dopamine-dark.json'),
      JSON.stringify(baseDark, null, 4)
    )
  ]);
};

if (require.main === module) {
  module.exports();
}

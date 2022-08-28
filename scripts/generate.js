const fs = require('node:fs').promises;
const path = require('node:path');
const { Type, DEFAULT_SCHEMA, load } = require('js-yaml');

const withAlphaType = new Type('!alpha', {
  kind: 'sequence',
  construct: ([hexRGB, alpha]) => hexRGB + alpha,
  represent: ([hexRGB, alpha]) => hexRGB + alpha
});

const schema = DEFAULT_SCHEMA.extend([withAlphaType]);

module.exports = async () => {
  const light = await fs.readFile(
    path.join(__dirname, '..', 'source', 'schema.yml'),
    'utf-8'
  );

  const dark = await fs.readFile(
    path.join(__dirname, '..', 'source', 'schema.dark.yml'),
    'utf-8'
  );

  const baseLight = load(light, { schema });
  const baseDark = load(dark, { schema });

  for (const key of Object.keys(baseLight.colors)) {
    if (!baseLight.colors[key]) {
      delete baseLight.colors[key];
    }
  }

  for (const key of Object.keys(baseDark.colors)) {
    if (!baseDark.colors[key]) {
      delete baseDark.colors[key];
    }
  }

  return {
    baseLight,
    baseDark
  };
};

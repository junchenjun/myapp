const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  // eslint-disable-next-line no-undef
  const config = getDefaultConfig(__dirname);

  // for storybook
  config.resolver.resolverMainFields.unshift('sbmodern');

  return config;
})();

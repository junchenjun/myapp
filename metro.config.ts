import { getDefaultConfig } from 'expo/metro-config';

const config = getDefaultConfig(__dirname);
// for storybook
if (config.resolver && config.resolver.resolverMainFields) {
  config.resolver.resolverMainFields = ['sbmodern', ...config.resolver.resolverMainFields];
}

module.exports = config;

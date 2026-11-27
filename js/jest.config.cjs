const path = require('path');
const config = require('@flarum/jest-config')();

// pnpm keeps core's frontend dependencies next to the preset in node_modules/.pnpm/, so core's source in ../vendor can't
// resolve them from node_modules/, and the preset's own path starts with node_modules/.pnpm/, which its pattern skips.
module.exports = {
  ...config,
  modulePaths: [path.resolve(require.resolve('@flarum/jest-config/package.json'), '../../..')],
  transformIgnorePatterns: [
    '/node_modules/(?!\\.pnpm/|@flarum/jest-config/)',
    ...config.transformIgnorePatterns.filter((pattern) => !pattern.startsWith('/node_modules/')),
  ],
};

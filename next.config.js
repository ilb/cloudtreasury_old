const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@ilb/uniformscomponents']);
const basePath = '/cloudtreasury';
const config = {
  basePath,
  assetPrefix: basePath
};
module.exports = config;
module.exports = withPlugins([withTM], config);

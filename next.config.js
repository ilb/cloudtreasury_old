const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['ajv', '@ilb/uniformscomponents', 'uniforms']);

const basePath = process.env.BASEPATH || '/cloudtreasury';
module.exports = withPlugins([withTM], {
  basePath,
  assetPrefix: basePath,
  trailingSlash: false,
  env: {
    API_PATH: basePath + '/api',
    BASE_URL: process.env.BASE_URL
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
});

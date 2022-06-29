// const withRpc = require("next-rpc")();
// const withPlugins = require("next-compose-plugins");
// const withTM = require("next-transpile-modules")([
//   "@ilb/node_context",
//   "@ilb/node_ldap",
// ]);
const basePath = "/dictionaries";
const config = {
  basePath,
  assetPrefix: basePath
};
module.exports = config;
// module.exports = withPlugins([withRpc], config);

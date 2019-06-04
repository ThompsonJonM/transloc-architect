const fs = require('fs-extra');
const path = require('path');
const cucumber = require('cypress-cucumber-preprocessor').default;

/**
* Function for selecting an environment file, then returning its JSON
*
* @param environmentFile        The name of the env we wish to use
* @param {*}                    The JSON of the environment file
*/
const getEnvironmentByFile = (environmentFile) => {
  const pathToEnvFile = path.resolve(__dirname, '..', 'config', `${environmentFile}.json`);

  return fs.readJson(pathToEnvFile)
}

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// `on` is used to hook into various events Cypress emits
// `config` is the resolved Cypress config
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  const file = config.env.environment || 'local';
  console.log(`Using environment: ${file}`);
  return getEnvironmentByFile(file)
}

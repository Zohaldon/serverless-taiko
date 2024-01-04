const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const mkdtemp = promisify(fs.mkdtemp);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

module.exports = async function setupJestProject({testFileName, testFileContent, testEnvVariables}) {
  // create a tmp folder to store data
  const specFolder = path.resolve(`/tmp/${String(Math.round(Math.random() * 1000000))}-`);
  const projectRootDir = await mkdtemp(specFolder);
  // write req files to the temp folder
  await writeFile(path.resolve(projectRootDir, testFileName), testFileContent);
  await writeFile(path.resolve(projectRootDir, 'variables.env'), testEnvVariables);
  await writeFile(path.resolve(projectRootDir, 'setup-jest-global-variables.js'), `require('dotenv').config({path: '${path.resolve(projectRootDir, 'variables.env')}'});`);
  
  // setup jest config
  await writeFile(path.resolve(projectRootDir, 'jest.config.js'), `
  module.exports = { setupFiles: ["${path.resolve(projectRootDir, 'setup-jest-global-variables.js')}"], setupFilesAfterEnv: ["${path.resolve('.', 'setup-jest-runtime-env.js')}"] }`);
  
  // return spec dir to execute the spec
  return projectRootDir;
};

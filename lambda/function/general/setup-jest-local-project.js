const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const mkdtemp = promisify(fs.mkdtemp);
const writeFile = promisify(fs.writeFile);

module.exports = async function setupJestProject({testFileName, testFileContent}) {
  const specFolder = path.resolve(`/tmp/${String(Math.round(Math.random() * 1000000))}-`);
  const projectRootDir = await mkdtemp(specFolder);
  await writeFile(path.resolve(projectRootDir, testFileName), testFileContent);
  await writeFile(path.resolve(projectRootDir, 'jest.config.js'), `
    module.exports = { setupFilesAfterEnv: ["${path.resolve('.', 'setup-jest-runtime-env.js')}"] }
  `);
  return projectRootDir;
}
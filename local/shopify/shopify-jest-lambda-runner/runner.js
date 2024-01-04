const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const testRunner = async ({ testPath, globalConfig }) => {
  const { base } = path.parse(testPath);
  const contents = fs.readFileSync(testPath, 'utf8');
  const varPath = path.join(globalConfig.rootDir, 'shopify-jest-lambda-runner', 'variables.env');
  const varContents = fs.readFileSync(varPath, 'utf-8');
  const lambda = new AWS.Lambda();
  const { Payload } = await new Promise((resolve, reject) => {
    lambda.invoke({
      FunctionName: 'test-taiko-app-ShopifyTaikoJestFunction-1I18RLCQRV1PC',
      Payload: JSON.stringify({
        testFileName: base,
        testFileContent: contents,
        testEnvVariables: varContents
      })
    }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  })
  const results = JSON.parse(Payload);
  try {
    return results.results.testResults[0];
  } catch (error) {
    throw new Error(results.errorMessage + '\n' + ((results.trace || []).join('\n')));
  }
};

module.exports = testRunner;
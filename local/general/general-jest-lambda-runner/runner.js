const fs = require('fs');
const path = require('path')
const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

// const testRunner = async ({ testPath }) => {
const testRunner = async (all_the_things) => {
  const myCustomConsole = console.Console(fs.WriteStream(`./output_${String(Math.round(Math.random() * 100 ))}.txt`));
  myCustomConsole.log(all_the_things);
  // const { base } = path.parse(testPath)
  // const contents = fs.readFileSync(testPath, 'utf8');

  // const lambda = new AWS.Lambda();
  // const { Payload } = await new Promise((resolve, reject) => {
  //   lambda.invoke({
  //     FunctionName: 'test-taiko-app-SledTaikoJestFunction-1IA66JF117G4O',
  //     Payload: JSON.stringify({
  //       testFileName: base,
  //       testFileContent: contents
  //     })
  //   }, (err, data) => {
  //     if (err) reject(err);
  //     else resolve(data);
  //   });
  // })
  // const results = JSON.parse(Payload)
  // try {
  //   return results.results.testResults[0]
  // } catch (error) {
  //   throw new Error(results.errorMessage + '\n' + ((results.trace || []).join('\n')))
  // }
};

module.exports = testRunner
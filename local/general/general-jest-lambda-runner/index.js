const { createJestRunner } = require('create-jest-runner');
// parth@Parths-MBP __TESTS__ % npm run test --test_env=integration-5 
console.log('your req var is:', process.env.npm_config_test_env);
// module.exports = createJestRunner(require.resolve('./runner'));
module.exports = createJestRunner(require.resolve('./runner'),{getExtraOptions: ()=> {return process.env.npm_config_test_env}});

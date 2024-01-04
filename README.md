# AWS Lambda-based Jest + Taiko + Chrome Test Framework

This README provides an overview of an AWS Lambda-based testing framework using Taiko, Jest, and Chrome for running massively scalable tests in parallel. The framework is designed to allow thousands of tests to run simultaneously. It is structured using AWS Serverless Application Model (AWS SAM).

## Table of Contents

1. [Introduction](#introduction)
2. [AWS SAM Template](#aws-sam-template)
3. [Components](#components)
   - [Lambda Functions](#lambda-functions)
   - [Lambda Layers](#lambda-layers)
4. [Getting Started](#getting-started)
5. [Scaling for Parallel Testing](#scaling-for-parallel-testing)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

This AWS Lambda-based testing framework is designed to execute Jest and Taiko tests using a headless Chrome browser in parallel. This approach allows you to efficiently run a large number of tests simultaneously, making it suitable for mass-scale testing scenarios. The framework uses AWS Lambda functions and layers to manage dependencies efficiently.

## AWS SAM Template

The AWS SAM template defines the AWS resources required for the testing framework. Here's a simplified version of the template:

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Transform: "AWS::Serverless-2016-10-31"
Description: Sled Taiko Jest Chrome AWS Lambda

Resources:
  SledTaikoJestFunction:
    Type: "AWS::Serverless::Function"
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      CodeUri: ./general/
      Description: Sled sample project uses Taiko, Jest, and Chrome AWS Lambda
      MemorySize: 824
      Timeout: 60
      Layers:
        - SledChromiumLayer # Replace with actual layer name

  ShopifyTaikoJestFunction:
    Type: "AWS::Serverless::Function"
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      CodeUri: ./shopify/
      Description: Sled sample project uses Taiko, Jest, and Chrome AWS Lambda
      MemorySize: 824
      Timeout: 240
      Layers:
        - ShopifyTestLayer # Replace with actual layer name
```

This template defines two Lambda functions for different test suites, each with its respective code and dependencies.

## Components

### Lambda Functions

1. **SledTaikoJestFunction**: This Lambda function runs Jest and Taiko tests using a headless Chrome browser. It is configured with specific memory and timeout settings.

2. **ShopifyTaikoJestFunction**: Similar to the first function but designed for running Jest and Taiko tests specific to Shopify.

### Lambda Layers

The Lambda layers include the necessary dependencies for the testing framework:

1. **SledChromiumLayer**: This layer provides the Chromium browser, allowing headless Chrome execution.

2. **JestTaikoLayer**: This layer contains the Taiko and Jest dependencies, enabling the execution of the tests.

3. **ShopifyTestLayer**: This layer includes dependencies required for Shopify-specific testing scenarios.

## Getting Started

To use this testing framework, follow these steps:

1. Clone the repository containing your testing code and AWS SAM template.
2. Modify the template to define your AWS resources and dependencies.
3. Deploy the AWS SAM application using the SAM CLI or AWS CloudFormation.
4. Upload your testing code to the Lambda functions.

## Scaling for Parallel Testing

To enable massive scaling for parallel testing, you can configure AWS Lambda to run multiple instances of your functions concurrently. You can adjust the `Concurrency` setting in the AWS Lambda console or use an autoscaling mechanism based on your specific testing needs.

## Contributing

If you'd like to contribute to this framework or have suggestions for improvements, please submit a pull request or open an issue on the project's GitHub repository.

## License

This testing framework is open source and available under the MIT License. See the [LICENSE](#) file for more details.

Feel free to customize and extend this framework to meet your specific testing requirements. Happy testing!

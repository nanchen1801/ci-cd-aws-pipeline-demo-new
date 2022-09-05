# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## purpose:  retrieve context and environment variables such as stage, region, user, account, etc.

* 1. add env deployment into cdk.json, e.g. "it"/"de"
* 2. (optional) create config file for country, e.g. confilg/it.yaml
* 3. create getConfig function to read context value and assign them to newly created BuildConfig interface
* 4. The config for each env is passed down to every stack by BuildConfig interface
* 5. create shell script: build.sh to run the pipeline according to selected env, e.g: npx cdk synth -c config=de
* 6. so only need to change build.sh to run pipeline for each env. 

## structure
* app: ci-cd-aws-pipeline-demo.ts
* pipeline stack: ci-cd-aws-pipeline-demo-stack.ts
* stage: stage.ts
* lambda stack: lambda-stack.ts 

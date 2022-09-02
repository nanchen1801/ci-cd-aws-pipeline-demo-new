import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';
import {BuildConfig} from "./build-config";
import * as path from 'path';

export class CiCdAwsPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);
 

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'NanTestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('nanchen1801/ci-cd-aws-pipeline-demo-new', 'main'), //Remember to change 
        commands: ['npm ci', 
                   'npm run build', 
                   'npx cdk synth']
      })
    });


    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", buildConfig,
      {
        env:
          {
              region: buildConfig.dev_region,
              account: buildConfig.dev_account
          }
      }
    ));


    // testingStage.addPre(new ShellStep("Run Unit Tests", { commands: ['npm install', 'npm test'] }));
    // testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    // const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
    //   env: { account: "273769601437", region: "us-east-1" }
    // }));
  }
}


import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from "@aws-cdk/core";
import { Construct } from "constructs";
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';
import {BuildConfig} from "./build-config";
import * as path from 'path';
import { MyLambdaStack } from './lambda-stack';

export class CiCdAwsPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StackProps) {
    super(scope, id, props);
 

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'NanTestPipeline',
      //selfMutation: false,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('nanchen1801/ci-cd-aws-pipeline-demo-new', 'main'), 
        commands: ['/bin/bash build.sh']
      })
      
    });

    //use wave to run stage in paralel     
    const wave = pipeline.addWave('wave');

    //id is prefix + stage (nan-it-test)
    const testStage = wave.addStage(new MyPipelineAppStage(this, (buildConfig.prefix + "-" + buildConfig.stage_test), buildConfig,
      {
        env:
          {
              region: buildConfig.dev_region,
              account: buildConfig.dev_account
          }
      }
    ));

    //adding post stage to validate the resource just deployed
    testStage.addPost(new ShellStep("validate lambda", {
      //envFromCfnOutputs: {myLambdaName: lambdaOutput}
      commands: ['echo nan']
    }));

    const devStage = wave.addStage(new MyPipelineAppStage(this, (buildConfig.prefix + "-" + buildConfig.stage_dev), buildConfig,
    {
      env:
        {
            region: buildConfig.dev_region,
            account: buildConfig.dev_account
        }
    }
  ));

    // devStage.addPre(new ShellStep("Run Unit Tests", { commands: ['npm install', 'npm test'] }));
    // devStage.addPost(new ManualApprovalStep('Manual approval before production'));

    // const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
    //   env: { account: "273769601437", region: "us-east-1" }
    // }));
  }
}


import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { MyLambdaStack } from './lambda-stack';
import {BuildConfig} from "./build-config";


export class MyPipelineAppStage extends cdk.Stage {
    
      constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StageProps) {
      super(scope, id, props);
  
      const lambdaStack = new MyLambdaStack(this, "LambdaStack", buildConfig);      
    }
}



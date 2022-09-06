import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { MyLambdaStack} from './lambda-stack';
import {BuildConfig} from "./build-config";
import { CfnOutput } from "@aws-cdk/core";


export class MyPipelineAppStage extends cdk.Stage {
    
    public readonly myLambdaName: CfnOutput; 

      constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StageProps) {
      super(scope, id, props);
  
      const myLambdaStack = new MyLambdaStack(this, "LambdaStack", buildConfig);

        
        
      };


}



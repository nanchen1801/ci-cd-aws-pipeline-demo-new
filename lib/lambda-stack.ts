// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import { Function, InlineCode, Runtime, Code} from 'aws-cdk-lib/aws-lambda';
// import * as path from 'path';

// export class MyLambdaStack extends cdk.Stack {
//     constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
//       super(scope, id, props);
//       new Function(this, 'LambdaFunction', {
//         runtime: Runtime.NODEJS_12_X, //using node for this, but can easily use python or other
//         handler: 'handler.handler',
//         code: Code.fromAsset(path.join(__dirname, 'lambda')), //resolving to ./lambda directory
//         environment: { "stageName": stageName } //inputting stagename
//       });
//     }
    
    
// }

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import {BuildConfig} from './build-config';

export class MyLambdaStack extends cdk.Stack {
    
    constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StackProps)
    {
      super(scope, id, props);

      // function name(name: string): string {
      //     return id + "-" + name;
      // }

      //id is prefix + stage (nan-it-dev)
      new Function(this, (buildConfig.prefix + "-" + buildConfig.stage_dev), {
        runtime: Runtime.NODEJS_12_X, //using node for this, but can easily use python or other
        handler: 'handler.handler',
        code: Code.fromAsset(path.join(__dirname, 'lambda')), //resolving to ./lambda directory
        environment: { "stageName": buildConfig.stage_dev}
      });
    }
}
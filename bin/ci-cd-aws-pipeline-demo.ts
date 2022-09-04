//import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CiCdAwsPipelineDemoStack } from '../lib/ci-cd-aws-pipeline-demo-stack';
import {BuildConfig} from '../lib/build-config';
const yaml = require('js-yaml');
import * as fs from 'fs'
import * as path from 'path';

const app = new cdk.App();

// new CiCdAwsPipelineDemoStack(app, 'CiCdAwsPipelineDemoStack', {
//   env: {
//     account: '273769601437',
//     region: 'us-east-1',
//   }
// });

//app.synth();

// check the config items exist 
function ensureString(object: { [name: string]: any }, propName: string ): string
{
    if(!object[propName] || object[propName].trim().length === 0)
        throw new Error(propName +" does not exist or is empty");

    return object[propName];
}


// get config items from yaml file by config. config pass in via build.sh `-c config=XXX`
function getConfig()
{
    let country_env = app.node.tryGetContext('config');
    if (!country_env)
        throw new Error("Context variable missing on CDK command. Pass in as `-c config=XXX`");

    let unparsedEnv = yaml.load(fs.readFileSync(path.resolve("./config/"+country_env+".yaml"), "utf8"));
    
    let buildConfig: BuildConfig = {
        dev_account: ensureString(unparsedEnv, 'dev_account'),
        dev_region: ensureString(unparsedEnv, 'dev_region'),
        prod_account: ensureString(unparsedEnv, 'prod_account'),
        prod_region: ensureString(unparsedEnv, 'prod_region'),
        stage_dev: ensureString(unparsedEnv, 'stage_dev'),
        stage_prod: ensureString(unparsedEnv, 'stage_prod'),
        prefix: ensureString(unparsedEnv, 'prefix'),

    };

    return buildConfig;
}


async function Main()
{
    let buildConfig: BuildConfig = getConfig();

    //let mainStackName = buildConfig.prefix + "-" + buildConfig.stage_dev;
    const mainStack = new CiCdAwsPipelineDemoStack(app, 'CiCdAwsPipelineDemoStack',
        {
            env:
                {
                    region: buildConfig.dev_region,
                    account: buildConfig.dev_account
                }
        }, buildConfig);
}
Main();
#!/usr/bin/env node
import 'source-map-support/register';
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


function ensureString(object: { [name: string]: any }, propName: string ): string
{
    if(!object[propName] || object[propName].trim().length === 0)
        throw new Error(propName +" does not exist or is empty");

    return object[propName];
}

function getConfig()
{
    let env = app.node.tryGetContext('config');
    if (!env)
        throw new Error("Context variable missing on CDK command. Pass in as `-c config=XXX`");

    let unparsedEnv = yaml.load(fs.readFileSync(path.resolve("./config/"+env+".yaml"), "utf8"));

    let buildConfig: BuildConfig = {
        dev_account: ensureString(unparsedEnv, 'dev_account'),
        dev_region: ensureString(unparsedEnv, 'dev_region'),
        prod_account: ensureString(unparsedEnv, 'prod_account'),
        prod_region: ensureString(unparsedEnv, 'prod_region'),
        stage_dev: ensureString(unparsedEnv, 'stage_dev'),
        stage_prod: ensureString(unparsedEnv, 'stage_prod'),

    };

    return buildConfig;
}


async function Main()
{
    let buildConfig: BuildConfig = getConfig();

    //let mainStackName = buildConfig.App + "-" + buildConfig.Environment + "-main";
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
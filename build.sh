#!/bin/bash
# change config to different countries, it, de, uk
npm ci
npm run build
npx cdk synth -c config=it